/**
 * Accessibility gate around pa11y-ci.
 *
 * pa11y's axe runner folds axe's `incomplete` results in with its `violations`
 * and reports both as errors, flagged only by `runnerExtras.needsFurtherReview`.
 * Incompletes are cases axe explicitly could not decide — "background could not
 * be determined due to a background gradient / image / overlap". This site is
 * built on gradient text, glassmorphism and layered decorative orbs, so those
 * fire on nearly every element and would keep the build permanently red while
 * telling us nothing.
 *
 * So: fail on real violations, print the undecidable ones as a warning tally.
 * Nothing pa11y can actually prove is suppressed.
 *
 * Usage: node scripts/a11y.mjs [--verbose]
 */
import { spawnSync } from 'node:child_process';
import { closeSync, openSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const verbose = process.argv.includes('--verbose');

// Written to a file rather than read off a pipe: the report runs to well over
// 100 KB and pa11y-ci exits without flushing that much piped stdout, so the
// JSON arrives truncated.
const reportPath = join(tmpdir(), `pa11y-report-${process.pid}.json`);
const fd = openSync(reportPath, 'w');

const run = spawnSync('npx', ['--yes', 'pa11y-ci', '--config', '.pa11yci.json', '--json'], {
	stdio: ['ignore', fd, 'inherit']
});
closeSync(fd);

if (run.error) {
	rmSync(reportPath, { force: true });
	console.error('Could not run pa11y-ci:', run.error.message);
	process.exit(1);
}

let report;
try {
	report = JSON.parse(readFileSync(reportPath, 'utf8'));
} catch {
	console.error('pa11y-ci produced no parseable JSON report.');
	console.error(readFileSync(reportPath, 'utf8').slice(0, 2000));
	rmSync(reportPath, { force: true });
	process.exit(1);
}
rmSync(reportPath, { force: true });

let errors = 0;
let review = 0;
const reviewByCode = new Map();

for (const [url, issues] of Object.entries(report.results)) {
	const hard = issues.filter((i) => !i.runnerExtras?.needsFurtherReview);
	const soft = issues.filter((i) => i.runnerExtras?.needsFurtherReview);

	errors += hard.length;
	review += soft.length;
	for (const i of soft) reviewByCode.set(i.code, (reviewByCode.get(i.code) ?? 0) + 1);

	const state = hard.length ? `${hard.length} errors` : 'pass';
	console.log(`${hard.length ? '✘' : '✔'} ${url} — ${state}${soft.length ? ` (${soft.length} to review)` : ''}`);

	for (const i of hard) {
		console.log(`\n  • [${i.runner}/${i.code}] ${i.message}`);
		console.log(`    ${i.selector}`);
		console.log(`    ${i.context?.replace(/\s+/g, ' ').slice(0, 160)}`);
	}
	if (verbose) {
		for (const i of soft) {
			console.log(`\n  ? [${i.runner}/${i.code}] ${i.message}`);
			console.log(`    ${i.selector}`);
		}
	}
}

if (review) {
	const breakdown = [...reviewByCode].map(([code, n]) => `${code} ×${n}`).join(', ');
	console.log(`\n${review} result(s) axe could not decide, not counted: ${breakdown}`);
	if (!verbose) console.log('Re-run with --verbose to list them.');
}

console.log(`\n${errors ? `✘ ${errors} accessibility error(s)` : '✔ No accessibility errors'}`);
process.exit(errors ? 1 : 0);
