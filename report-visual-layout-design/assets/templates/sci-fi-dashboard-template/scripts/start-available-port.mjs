import { spawn } from 'node:child_process';
import net from 'node:net';

const argv = process.argv.slice(2);
const signalExitCodes = {
  SIGINT: 130,
  SIGTERM: 143,
};

function readArg(names, fallback) {
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--') {
      continue;
    }

    if (names.includes(arg)) {
      const value = argv[index + 1];
      return value && value !== '--' ? value : fallback;
    }

    for (const name of names) {
      if (arg.startsWith(`${name}=`)) {
        return arg.slice(name.length + 1);
      }
    }
  }

  return fallback;
}

const mode = readArg(['--mode'], 'dev');
const host = readArg(['--host'], process.env.HOST || '0.0.0.0');
const requestedPort = Number.parseInt(
  readArg(['--port', '--preferred'], process.env.PORT || process.env.VITE_PORT || '5173'),
  10,
);
const maxAttempts = Number.parseInt(readArg(['--attempts'], '50'), 10);

if (!['dev', 'preview'].includes(mode)) {
  console.error(`[start-available-port] invalid mode: ${mode}. Use "dev" or "preview".`);
  process.exit(1);
}

if (!Number.isInteger(requestedPort) || requestedPort <= 0) {
  console.error('[start-available-port] invalid port:', requestedPort);
  process.exit(1);
}

if (!Number.isInteger(maxAttempts) || maxAttempts <= 0) {
  console.error('[start-available-port] invalid attempts:', maxAttempts);
  process.exit(1);
}

function canListen(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => resolve(false));
    server.listen({ host, port }, () => {
      server.close(() => resolve(true));
    });
  });
}

async function findPort() {
  for (let offset = 0; offset < maxAttempts; offset += 1) {
    const port = requestedPort + offset;
    if (await canListen(port)) {
      return port;
    }
  }

  return null;
}

const selectedPort = await findPort();

if (!selectedPort) {
  console.error(
    `[start-available-port] no available port found from ${requestedPort} after ${maxAttempts} attempts`,
  );
  process.exit(1);
}

const viteBin = process.platform === 'win32' ? 'vite.cmd' : 'vite';
const viteArgs = mode === 'preview' ? ['preview'] : [];
viteArgs.push('--host', host, '--port', String(selectedPort));

const urlHost = host === '0.0.0.0' || host === '::' ? '127.0.0.1' : host;
const url = `http://${urlHost}:${selectedPort}/`;

console.log(`[start-available-port] selected ${url}`);

const child = spawn(viteBin, viteArgs, {
  env: {
    ...process.env,
    HOST: host,
    PORT: String(selectedPort),
    VITE_PORT: String(selectedPort),
  },
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

let shuttingDown = false;

function stopChild(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  child.kill(signal);

  setTimeout(() => {
    process.exit(signalExitCodes[signal] ?? 1);
  }, 3000).unref();
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => stopChild(signal));
}

child.on('error', (error) => {
  console.error('[start-available-port] failed to start Vite:', error.message);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  process.exit(code ?? signalExitCodes[signal] ?? 0);
});
