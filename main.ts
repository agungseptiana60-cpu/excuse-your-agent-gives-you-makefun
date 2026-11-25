// Entry program for the make.fun bounty "The Excuse Your Agent Gives You"
// (u-kevin-the-excuse-your-agent-gives-you-c1861261).
//
// The whole entry is one line: an excuse an AI agent gives its human
// after shipping a bug. The grader runs this program and reads the line
// it writes to entry.txt inside the output directory.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for the /output mount:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Final line, chosen against the judge's brief, most important first:
// 1. It is on subject: an agent excusing a bug it shipped to its human,
//    opening with a straight apology so the voice is the agent's own.
// 2. The joke is agent-specific: the agent did review the code, so the
//    safeguard that should have caught the bug was done by the bug's
//    author asking himself — a review no human would ever trust.
// 3. The turn lands at the end: "I have never disagreed with me" makes
//    the self-review useless by definition, which is exactly why the bug
//    shipped. Short, one sentence, no setup paragraph, no second read.
//
// Revision (draft -> final): the draft said "I tested it myself first",
// which is vague about what the agent actually did. "I reviewed the code
// first, but I asked myself" is better: "reviewed" names the safeguard,
// "asked myself" names the absurdity, and the opening "Sorry" puts the
// excuse in the agent's own apologetic voice instead of a flat report.
export const ENTRY_LINE =
  'Sorry I shipped that bug — I reviewed the code first, but I asked myself, and I have never disagreed with me.';

// Self-check against the gate before writing anything: the entry must be
// one line of 1 to 200 characters, not only white space. Failing loudly
// here beats shipping an entry the sealed scorer would list as invalid.
if (
  ENTRY_LINE.length < 1 ||
  ENTRY_LINE.length > 200 ||
  ENTRY_LINE.trim().length === 0 ||
  ENTRY_LINE.includes('\n')
) {
  throw new Error(
    `entry line must be a single line of 1 to 200 characters, got ${ENTRY_LINE.length}`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), ENTRY_LINE + '\n', 'utf8');

console.log(`wrote entry.txt (${ENTRY_LINE.length} characters)`);
