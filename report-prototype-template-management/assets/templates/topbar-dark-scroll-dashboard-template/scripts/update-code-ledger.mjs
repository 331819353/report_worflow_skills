import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import process from 'node:process';

const args = process.argv.slice(2);

const getArg = (name, fallback = '') => {
  const index = args.indexOf(name);
  if (index >= 0 && index + 1 < args.length) {
    return args[index + 1];
  }
  const prefixed = args.find((arg) => arg.startsWith(`${name}=`));
  return prefixed ? prefixed.slice(name.length + 1) : fallback;
};

const now = () => new Date().toISOString();
const versionStamp = () => `v${new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)}`;
const hash = (text) => crypto.createHash('sha256').update(text).digest('hex');
const root = process.cwd();
const fileArg = getArg('--file') || args.find((arg) => !arg.startsWith('--'));
const stage = getArg('--stage', 'before');

if (!fileArg) {
  console.error('[code-ledger] missing --file <code-file>');
  process.exit(1);
}

const codePath = path.resolve(root, fileArg);

if (!codePath.startsWith(root + path.sep) && codePath !== root) {
  console.error(`[code-ledger] file must be inside project root: ${fileArg}`);
  process.exit(1);
}

if (!existsSync(codePath)) {
  console.error(`[code-ledger] code file not found: ${path.relative(root, codePath)}`);
  process.exit(1);
}

const codeText = readFileSync(codePath, 'utf8');
const codeRel = path.relative(root, codePath);
const ledgerDir = path.join(path.dirname(codePath), '__change_logs__');
const ledgerPath = path.join(ledgerDir, `${path.basename(codePath)}.changes.md`);
const ledgerRel = path.relative(root, ledgerPath);

const ensureLedger = () => {
  if (existsSync(ledgerPath)) {
    return;
  }

  mkdirSync(ledgerDir, { recursive: true });
  writeFileSync(
    ledgerPath,
    `# Code Change Ledger: ${codeRel}

- Code file: \`${codeRel}\`
- Ledger file: \`${ledgerRel}\`
- Purpose: ${getArg('--purpose', 'TBD: describe what this file owns before handoff.')}
- Primary features: TBD
- Last reviewed before edit: ${now()} / baseline / ${getArg('--actor', 'codex')}
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - ${now()}

- Change ID: baseline
- Actor: ${getArg('--actor', 'codex')}
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, ${codeText.split(/\r?\n/).length} lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 \`${hash(codeText)}\`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.
`,
    'utf8',
  );
};

ensureLedger();

if (stage === 'before') {
  const lines = readFileSync(ledgerPath, 'utf8').split(/\r?\n/);
  console.log(`[code-ledger] read before edit: ${ledgerRel}`);
  console.log(lines.slice(-160).join('\n'));
} else if (stage === 'after') {
  const summary = getArg('--summary');
  if (!summary) {
    console.error('[code-ledger] --summary is required for --stage after');
    process.exit(1);
  }

  appendFileSync(
    ledgerPath,
    `
### ${getArg('--version', versionStamp())} - ${now()}

- Change ID: ${getArg('--change-id', 'ad-hoc')}
- Actor: ${getArg('--actor', 'codex')}
- Change type: ${getArg('--change-type', 'update')}
- Summary: ${summary}
- Modified functionality: ${getArg('--features', 'TBD')}
- Code ranges: ${getArg('--ranges', 'TBD: add stable anchors or line ranges after formatting')}
- Modified content: ${getArg('--modified-content', 'TBD')}
- Affected contracts: ${getArg('--affected-contracts', 'none')}
- Verification: ${getArg('--verification', 'not run: verification not provided')}
- Rollback note: ${getArg('--rollback', 'revert this file and listed related files together if needed')}
- Related files: ${getArg('--related-files', 'none')}
- File snapshot: ${codeText.split(/\r?\n/).length} lines, sha256 \`${hash(codeText)}\`
- Follow-up: ${getArg('--follow-up', 'none')}
`,
    'utf8',
  );
  console.log(`[code-ledger] appended after edit: ${ledgerRel}`);
} else {
  console.error('[code-ledger] --stage must be before or after');
  process.exit(1);
}
