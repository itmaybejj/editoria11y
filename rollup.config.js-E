/* eslint-disable no-shadow */
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import css from 'rollup-plugin-import-css';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

/* Speed up compile time when developing by excluding language builds. */
export const developmentMode = false;

/* Copyright notice */
/* @todo Merge update */
const banner = `
/*!
	* Editoria11y accessibility checker.
  * @version 3.0.0-dev092225
  * @author John Jameson
  * @license GPL-2.0
  * @copyright ${new Date().getFullYear()} The Trustees of Princeton University.
  * @contact jjameson@princeton.edu
  * GitHub: https://github.com/itmaybejj/editoria11y
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
	*
	* Acknowledgements:
	*	Icons from Font Awesome by Dave Gandy, http://fontawesome.io, Font Awesome license: CC BY 3.0, URL: http://creativecommons.org/licenses/by/3.0/
	*
	*	Rulesets co-developed with Sa11y under shared license:
	* Sa11y, the accessibility quality assurance assistant.
  * @version 4.4.0-dev
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright 2020 - ${new Date().getFullYear()} Toronto Metropolitan University.
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/`;

/* ********************* */
/*    Language files     */
/* ********************* */
const languages = (developmentMode) ? ['en'] : [
  'bg',
  'cs',
  'da',
  'de',
  'el',
  'en',
  'enUS',
  'es',
  'et',
  'fi',
  'fr',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'lt',
  'lv',
  'nb',
  'nl',
  'pl',
  'ptBR',
  'ptPT',
  'ro',
  'sk',
  'sl',
  'sv',
  'tr',
  'ua',
  'zh',
];
const languageConfigs = languages.flatMap((lang) => [
  {
    input: `sa11y/lang/${lang}.js`,
    plugins: [nodeResolve()],
    output: [
      {
        banner,
        file: `dist/js/lang/${lang}.js`,
        format: 'esm',
      },
    ],
  },
  {
    input: `sa11y/lang/${lang}.js`,
    plugins: [nodeResolve()],
    output: [
      {
        banner,
        file: `dist/js/lang/${lang}.umd.js`,
        format: 'umd',
        name: `Sa11yLang${lang.charAt(0).toUpperCase() + lang.slice(1)}`,
      },
    ],
  },
]);


export default [
  ...languageConfigs,

  /* ********************* */
  /*      Javascript       */
  /* ********************* */
  // ES6 standalone files
	// UMD standalone files
	{
		input: 'js/ed11y.js',
		plugins: [
			nodeResolve(),
			// css(),
			replace({
				preventAssignment: true,
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
		],
		output: [
			{ banner, file: 'dist/js/ed11y.umd.js', format: 'umd', name: 'Ed11y' },
			{ banner, file: 'dist/js/ed11y.umd.min.js', format: 'umd', name: 'Ed11y', plugins: [terser()] },
		],
	},
	{
    input: 'js/ed11y.js',
    plugins: [
      nodeResolve(),
      // css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
    output: [
      { banner, file: 'dist/js/ed11y.esm.js', format: 'esm' },
      { banner, file: 'dist/js/ed11y.esm.min.js', format: 'esm', plugins: [terser()] },
    ],
  },
  // Bookmarklet - Automatic language detection.
  /*{
    input: 'src/bookmarklet/v2.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        Sa11yVersion: JSON.stringify(pkg.version),
      }),
    ],
    output: [
      {
        file: 'bookmarklet/v2.js',
        format: 'umd',
        name: 'Sa11yLangBookmarklet',
        plugins: [terser()],
      },
    ],
  },*/
  // Bookmarklet - English.
  /*{
    input: 'src/bookmarklet/v2-en.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        Sa11yVersion: JSON.stringify(pkg.version),
      }),
    ],
    output: [
      {
        file: 'bookmarklet/v2-en.js',
        format: 'umd',
        name: 'Sa11yLangBookmarkletEn',
        plugins: [terser()],
      },
    ],
  },
  // Development bookmarklet.
  {
    input: 'src/bookmarklet/dev.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        Sa11yVersion: JSON.stringify(pkg.version),
      }),
    ],
    output: [
      {
        file: 'bookmarklet/dev.js',
        format: 'umd',
        name: 'Sa11yDevBookmarklet',
        plugins: [terser()],
      },
    ],
  },
  // APCA bookmarklet - Automatic language detection.
  {
    input: 'src/bookmarklet/apca.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        Sa11yVersion: JSON.stringify(pkg.version),
      }),
    ],
    output: [
      {
        file: 'bookmarklet/apca.js',
        format: 'umd',
        name: 'Sa11yLangBookmarkletAPCA',
        plugins: [terser()],
      },
    ],
  },
  // Unminified bookmarklet.
  {
    input: 'src/bookmarklet/unminified.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        Sa11yVersion: JSON.stringify(pkg.version),
      }),
    ],
    output: [
      {
        file: 'bookmarklet/unminified.js',
        format: 'umd',
        name: 'Sa11yLangBookmarkletUnminified',
        plugins: [terser()],
      },
    ],
  },*/
];
