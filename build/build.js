import { build } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { injectCSSintoJS } from './utils.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const pkg = JSON.parse(fs.readFileSync(path.resolve(dirname, '../package.json'), 'utf-8'));

/* Adds copyright banner AFTER minification. */
const addBanner = () => {
	const banner = `
	/*!
			* Editoria11y accessibility checker
			* @version ${pkg.version}
			* @author ${pkg.author}
			* @license ${pkg.license}
			* @copyright © ${new Date().getFullYear()} Princeton University.
			* GitHub: ${pkg.repository.url}
		**/
    /*!
      * Sa11y, the accessibility quality assurance assistant.
      * @version ${pkg.sa11yVersion}
      * @author Adam Chaboryk
      * @license GPL-2.0-or-later
      * @copyright © 2020 - ${new Date().getFullYear()} Toronto Metropolitan University.
      * @contact adam.chaboryk@torontomu.ca
      * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
      * The above copyright notice shall be included in all copies or substantial portions of the Software.
    **/`;

	return {
		name: 'add-banner',
		generateBundle(options, bundle) {
			for (const fileName in bundle) {
				const file = bundle[fileName];
				// Only add banner to JS chunks (excludes CSS or assets)
				if (file.type === 'chunk') {
					file.code = banner.trim() + '\n' + file.code;
				}
			}
		},
	};
};

// Shared define.
const getDefine = () => ({
	'process.env.NODE_ENV': JSON.stringify('production'),
	Ed11yVersion: JSON.stringify(pkg.version),
});

/* Helper to run a Vite build instance. */
const runBuild = async (config) => {
	await build({
		configFile: false,
		...config,
	});
};

/* ******************************************************** */
/* BUILD EXECUTION                                          */
/* ******************************************************** */
(async () => {
	console.log(`\n🚀 Starting build process for version ${pkg.version}\n`);

	// Core library.
	const mainEntry = path.resolve(dirname, '../src/js/ed11y.js');

	// UMD - Unminified
	await runBuild({
		define: getDefine(),
		plugins: [
			injectCSSintoJS(),
			addBanner(),
		],
		build: {
			emptyOutDir: false,
			minify: false,
			outDir: 'dist/js',
			lib: { entry: mainEntry, formats: ['umd'], name: 'Ed11y', fileName: () => 'ed11y.umd.js' },
		},
	});

	const languageOverrides = ['enUS', 'en', 'es'];

	console.log(`Processing ${languageOverrides.length} language files...`);

	for (const lang of languageOverrides) {
		const langEntry = path.resolve(dirname, `../src/js/lang/${lang}.js`);

		// Build ESM
		await runBuild({
			build: {
				emptyOutDir: false,
				minify: false,
				outDir: 'dist/js/lang',
				lib: {
					entry: langEntry,
					fileName: () => `${lang}.js`,
					formats: ['es'],
				},
			},
		});

		// Build UMD
		await runBuild({
			logLevel: 'warning',
			build: {
				emptyOutDir: false,
				minify: false,
				outDir: 'dist/js/lang',
				lib: {
					entry: langEntry,
					name: `Ed11yLang${lang.charAt(0).toUpperCase() + lang.slice(1)}`,
					fileName: () => `${lang}.umd.js`,
					formats: ['umd'],
				},
			},
		});
	}

	const languages = ['bg', 'cs', 'da', 'de', 'el', 'et', 'fi', 'fr', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'pl', 'ptBR', 'ptPT', 'ro', 'sk', 'sl', 'sv', 'tr', 'ua', 'zh'];

	console.log(`Processing ${languages.length} language files...`);

	for (const lang of languages) {
		const langEntry = path.resolve(dirname, `../src/sa11y/lang/${lang}.js`);

		// Build ESM
		await runBuild({
			logLevel: 'warning',
			build: {
				emptyOutDir: false,
				minify: false,
				outDir: 'dist/js/lang',
				lib: {
					entry: langEntry,
					fileName: () => `${lang}.js`,
					formats: ['es'],
				},
			},
		});

		// Build UMD
		await runBuild({
			logLevel: 'warning',
			build: {
				emptyOutDir: false,
				minify: false,
				outDir: 'dist/js/lang',
				lib: {
					entry: langEntry,
					name: `Sa11yLang${lang.charAt(0).toUpperCase() + lang.slice(1)}`,
					fileName: () => `${lang}.umd.js`,
					formats: ['umd'],
				},
			},
		});
	}

	// UMD - Minified (using esbuild)
	await runBuild({
		logLevel: 'warning',
		define: getDefine(),
		plugins: [
			injectCSSintoJS(),
			addBanner(),
		],
		build: {
			emptyOutDir: false,
			minify: true,
			outDir: 'dist/js',
			lib: { entry: mainEntry, formats: ['umd'], name: 'Ed11y', fileName: () => 'ed11y.umd.min.js' },
		},
	});

	// ESM - Unminified
	await runBuild({
		logLevel: 'warning',
		define: getDefine(),
		plugins: [
			injectCSSintoJS(),
			addBanner(),
		],
		build: {
			emptyOutDir: false,
			minify: false,
			outDir: 'dist/js',
			lib: { entry: mainEntry, formats: ['es'], fileName: () => 'ed11y.esm.js' },
		},
	});

	// ESM - Minified (using esbuild)
	await runBuild({
		logLevel: 'warning',
		define: getDefine(),
		plugins: [
			injectCSSintoJS(),
			addBanner(),
		],
		build: {
			emptyOutDir: false,
			minify: true,
			outDir: 'dist/js',
			lib: { entry: mainEntry, formats: ['es'], fileName: () => 'ed11y.esm.min.js' },
		},
	});

	/*console.log('Processing bookmarklets...');
	const bookmarklets = [
		{ input: 'v2.js', name: 'Sa11yLangBookmarklet', file: 'v2.js' },
		{ input: 'v2-en.js', name: 'Sa11yLangBookmarkletEn', file: 'v2-en.js' },
		{ input: 'dev.js', name: 'Sa11yDevBookmarklet', file: 'dev.js' },
		{ input: 'apca.js', name: 'Sa11yLangBookmarkletAPCA', file: 'apca.js' },
		{ input: 'unminified.js', name: 'Sa11yLangBookmarkletUnminified', file: 'unminified.js' },
	];

	for (const b of bookmarklets) {
		await runBuild({
			define: getDefine(),
			plugins: [
				injectCSSintoJS(),
			],
			build: {
				emptyOutDir: false,
				minify: true,
				outDir: 'bookmarklet',
				lib: {
					entry: path.resolve(dirname, `../src/bookmarklet/${b.input}`),
					name: b.name,
					formats: ['umd'],
					fileName: () => b.file,
				},
			},
		});
	}*/

	console.log('\n✨ Build complete!\n');
})();
