/*
 * ESM resolver hook for running Sa11y source under Node directly.
 *
 * Sa11y is vendored upstream (src/sa11y-js) and uses extensionless relative
 * imports (e.g. `import find from './find'`). Vite resolves those during
 * the normal build, but plain `node` (used by scripts/check-test-keys.js)
 * does not — Node ESM requires explicit extensions. Rather than patch
 * upstream, this hook retries failed relative imports with `.js` appended.
 *
 * Registered via `--import ./scripts/register-sa11y-hook.js`.
 */

export async function resolve(specifier, context, nextResolve) {
	const isRelative = specifier.startsWith('./') || specifier.startsWith('../');
	const hasExt = /\.[a-zA-Z0-9]+$/.test(specifier);
	if (!isRelative || hasExt) return nextResolve(specifier, context);

	try {
		return await nextResolve(specifier, context);
	} catch (err) {
		if (err?.code !== 'ERR_MODULE_NOT_FOUND') throw err;
		try {
			return await nextResolve(`${specifier}.js`, context);
		} catch {
			return await nextResolve(`${specifier}/index.js`, context);
		}
	}
}
