import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
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
const lineCount = (text) => (text ? text.split(/\r?\n/).length : 0);
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
const snapshotDir = path.join(ledgerDir, '.snapshots');
const beforeSnapshotPath = path.join(snapshotDir, `${path.basename(codePath)}.before.txt`);
const beforeMetaPath = path.join(snapshotDir, `${path.basename(codePath)}.before.json`);
const patchDir = path.join(ledgerDir, 'patches');

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
- Code ranges: full file, ${lineCount(codeText)} lines
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

const writeBeforeSnapshot = () => {
  mkdirSync(snapshotDir, { recursive: true });
  writeFileSync(beforeSnapshotPath, codeText, 'utf8');
  writeFileSync(
    beforeMetaPath,
    JSON.stringify(
      {
        codeFile: codeRel,
        capturedAt: now(),
        actor: getArg('--actor', 'codex'),
        lines: lineCount(codeText),
        sha256: hash(codeText),
      },
      null,
      2,
    ),
    'utf8',
  );
};

const readBeforeSnapshot = () => {
  if (!existsSync(beforeSnapshotPath) || !existsSync(beforeMetaPath)) {
    if (args.includes('--allow-missing-before')) {
      return {
        text: '',
        meta: {
          codeFile: codeRel,
          capturedAt: 'missing',
          lines: 0,
          sha256: 'missing',
        },
      };
    }

    console.error(
      '[code-ledger] missing pre-edit snapshot; run --stage before before editing or pass --allow-missing-before with an exact external VCS/release reference',
    );
    process.exit(1);
  }

  return {
    text: readFileSync(beforeSnapshotPath, 'utf8'),
    meta: JSON.parse(readFileSync(beforeMetaPath, 'utf8')),
  };
};

const buildUnifiedDiff = () => {
  try {
    return execFileSync(
      'diff',
      ['-u', '--label', `a/${codeRel}`, '--label', `b/${codeRel}`, beforeSnapshotPath, codePath],
      { encoding: 'utf8' },
    );
  } catch (error) {
    if (error.status === 1) {
      return error.stdout || '';
    }
    throw error;
  }
};

const inferRangesFromDiff = (diffText) => {
  const ranges = [];
  const regex = /@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/g;
  let match = regex.exec(diffText);

  while (match) {
    const oldStart = Number(match[1]);
    const oldCount = Number(match[2] || '1');
    const newStart = Number(match[3]);
    const newCount = Number(match[4] || '1');
    const oldEnd = oldStart + Math.max(oldCount, 1) - 1;
    const newEnd = newStart + Math.max(newCount, 1) - 1;
    ranges.push(`L${newStart}-L${newEnd} (was L${oldStart}-L${oldEnd})`);
    match = regex.exec(diffText);
  }

  return ranges.join(', ');
};

const changeEvidence = (version) => {
  const before = readBeforeSnapshot();

  if (before.text === codeText) {
    return {
      beforeMeta: before.meta,
      ranges: 'none',
      evidence: 'No text diff: before snapshot and after file are identical.',
    };
  }

  const diffText = buildUnifiedDiff();
  const maxInlineDiffLines = Number(getArg('--max-inline-diff-lines', '400'));
  const diffLines = diffText.split(/\r?\n/).filter(Boolean);

  if (diffLines.length <= maxInlineDiffLines) {
    return {
      beforeMeta: before.meta,
      ranges: inferRangesFromDiff(diffText),
      evidence: `inline unified diff:

\`\`\`diff
${diffText.trimEnd()}
\`\`\``,
    };
  }

  mkdirSync(patchDir, { recursive: true });
  const safeVersion = version.replace(/[^A-Za-z0-9_.-]+/g, '-').replace(/^-+|-+$/g, '') || 'change';
  const patchPath = path.join(patchDir, `${safeVersion}-${path.basename(codePath)}.diff`);
  writeFileSync(patchPath, diffText, 'utf8');

  return {
    beforeMeta: before.meta,
    ranges: inferRangesFromDiff(diffText),
    evidence: `sidecar patch \`${path.relative(root, patchPath)}\` (${diffLines.length} diff lines, sha256 \`${hash(diffText)}\`)`,
  };
};

if (stage === 'before') {
  writeBeforeSnapshot();
  const lines = readFileSync(ledgerPath, 'utf8').split(/\r?\n/);
  console.log(`[code-ledger] read before edit: ${ledgerRel}`);
  console.log(`[code-ledger] captured before snapshot: ${path.relative(root, beforeSnapshotPath)}`);
  console.log(`[code-ledger] captured before metadata: ${path.relative(root, beforeMetaPath)}`);
  console.log(lines.slice(-160).join('\n'));
} else if (stage === 'after') {
  const summary = getArg('--summary');
  if (!summary) {
    console.error('[code-ledger] --summary is required for --stage after');
    process.exit(1);
  }

  const entryVersion = getArg('--version', versionStamp());
  const evidence = changeEvidence(entryVersion);
  const ranges = getArg('--ranges') || evidence.ranges || 'TBD: add stable anchors or line ranges after formatting';

  appendFileSync(
    ledgerPath,
    `
### ${entryVersion} - ${now()}

- Change ID: ${getArg('--change-id', 'ad-hoc')}
- Actor: ${getArg('--actor', 'codex')}
- Change type: ${getArg('--change-type', 'update')}
- Summary: ${summary}
- Modified functionality: ${getArg('--features', 'TBD')}
- Code ranges: ${ranges}
- Modified content: ${getArg('--modified-content', 'TBD')}
- Affected contracts: ${getArg('--affected-contracts', 'none')}
- Verification: ${getArg('--verification', 'not run: verification not provided')}
- Rollback note: ${getArg('--rollback', 'revert this file and listed related files together if needed')}
- Related files: ${getArg('--related-files', 'none')}
- Before snapshot: ${evidence.beforeMeta.lines ?? 'unknown'} lines, sha256 \`${evidence.beforeMeta.sha256 ?? 'unknown'}\`, captured \`${evidence.beforeMeta.capturedAt ?? 'unknown'}\`
- After snapshot: ${lineCount(codeText)} lines, sha256 \`${hash(codeText)}\`
- Change evidence: ${evidence.evidence}
- Follow-up: ${getArg('--follow-up', 'none')}
`,
    'utf8',
  );
  console.log(`[code-ledger] appended after edit: ${ledgerRel}`);
} else {
  console.error('[code-ledger] --stage must be before or after');
  process.exit(1);
}
