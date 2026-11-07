import { transform, browserslistToTargets, Features } from 'lightningcss';
import browserslist from 'browserslist';

/**
 * Shared lightningcss options for every CSS build.
 *
 * :dir() is excluded because lightningcss would otherwise rewrite it as a
 * list of :lang() selectors for RTL languages, which never matches a page
 * that sets dir="rtl" with any other lang (e.g. tests/rtl.htm).
 */
export const lightningOptions = {
	targets: browserslistToTargets(browserslist('defaults, not IE 11')),
	exclude: Features.DirSelector,
};

/**
 * CSS injection plugin.
 */
export const injectCSSintoJS = () => ({
	name: 'inject-css',
	async transform(code, id) {
		if (/\.css(\?.*)?$/.test(id) && id.includes('/src/css/')) {
			try {
				const { code: minified } = transform({
					filename: id,
					code: Buffer.from(code),
					minify: true,
					sourceMap: false,
					...lightningOptions,
				});
				return { code: minified.toString() };
			} catch (e) {
				console.log(e)
				console.warn('⚠️ CSS Minification failed', e.message);
				return code;
			}
		}
	}
});
