// Runs the Playwright browser tests (e2e/) inside the official Playwright
// Docker image. The image tag is read from the installed @playwright/test, so
// the browsers in the image always match the test runner in node_modules.
//
// Usage: npm test [-- <playwright test args>]
//   e.g. npm test -- --grep "custom sheets"
//
// The container has no network (--network none): tests serve the repository
// from a server inside the container and must not depend on the internet.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

let version;
try {
  ({ version } = JSON.parse(
    readFileSync(join(repoRoot, 'node_modules/@playwright/test/package.json'), 'utf8'),
  ));
} catch {
  console.error('@playwright/test is not installed. Run `npm install` first.');
  process.exit(1);
}
const image = `mcr.microsoft.com/playwright:v${version}-noble`;

const docker = spawnSync('docker', ['version', '--format', '{{.Server.Version}}'], {
  encoding: 'utf8',
});
if (docker.error || docker.status !== 0) {
  console.error('Docker is not available. Start Docker Desktop (or the daemon) and retry.');
  process.exit(1);
}

const args = [
  'run',
  '--rm',
  '--init',
  // Chromium uses shared memory heavily; the default 64MB can crash it.
  '--ipc=host',
  '--network',
  'none',
  // Write results as the host user, not root.
  ...(process.getuid ? ['--user', `${process.getuid()}:${process.getgid()}`] : []),
  '-e',
  'HOME=/tmp',
  '-v',
  `${repoRoot}:/work`,
  '-w',
  '/work',
  image,
  'node',
  'node_modules/@playwright/test/cli.js',
  'test',
  '--config=e2e/playwright.config.js',
  ...process.argv.slice(2),
];

console.log(`Running e2e tests in ${image}`);
const run = spawnSync('docker', args, { stdio: 'inherit' });
if (run.error) {
  console.error(run.error.message);
}
process.exit(run.status ?? 1);
