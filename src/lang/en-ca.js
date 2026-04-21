// noinspection JSUnusedGlobalSymbols

import {default as Sa11yStrings} from '../sa11y-lang/en.js';
import {interfaceStrings, testNames, tips} from './baseAll.js';
import { englishOverrides } from './baseEnglishOnly.js';

// Canadian English dialect overrides for the US English strings in baseAll.js.
// Canadian English favours British "-our" spellings (colour, honour, favourite)
// but keeps American "-ize" endings (organize, visualize, emphasize), so this
// override set is much smaller than en-gb.
// Keep this list in sync with baseAll.js: any new string containing "color"
// or "colorblind" should be overridden here.

const why = {
	fix: `<strong class="badge">To fix</strong> `,
};

const canadianTips = {
	CONTRAST_WARNING: 'A background image or gradient means this checker is not sure what colour is behind this text. Use the colour picker below to check manually.',
	EMBED_DATA_VIZ: `<p>Embedded visualization widgets are often difficult or impossible for assistive devices to operate, can be difficult to understand for readers with low vision or colourblindness, and may require extensive horizontal scrolling on phones.</p>	<p>${why.fix}Unless this particular embed has high visual contrast, can be operated by a keyboard <strong><em>and</em></strong> described by a screen reader, add an equivalent, alternate format such as a text description, data table or downloadable spreadsheet.</p>`,
};

export const lang = {
	strings: Object.assign(
		Sa11yStrings.strings,
		interfaceStrings,
		tips,
		englishOverrides,
		canadianTips,
	),
	testNames: testNames,
};
