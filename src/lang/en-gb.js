// noinspection JSUnusedGlobalSymbols

import {default as Sa11yStrings} from '../sa11y-lang/en.js';
import {interfaceStrings, testNames, tips} from './baseAll.js';
import { englishOverrides } from './baseEnglishOnly.js';

// British English dialect overrides for the US English strings in baseAll.js.
// Keep this list in sync with baseAll.js: any new string containing
// "color", "organize", "visualize", "emphasize", "capitalize", etc.
// should be overridden here with the British spelling.

const why = {
	fix: `<strong class="badge">To fix</strong> `,
	headings: `<div class="why"><p>Tip: headings and subheadings organise content into a nested outline. Screen reader users rely on this outline to understand and explore pages:</p><ul><li>Heading level 1: page titles<ul><li>Heading level 2: major topics<ul><li>Heading level 3: subtopics</li></ul></li></ul></li></ul></div>`,
};

const britishTestNames = {
	EMBED_DATA_VIZ: 'Is this visualisation accessible?',
	QA_STRONG_ITALICS: 'Large blocks of emphasised text are harder to read',
};

const britishTips = {
	CONTRAST_WARNING: 'A background image or gradient means this checker is not sure what colour is behind this text. Use the colour picker below to check manually.',
	EMBED_DATA_VIZ: `<p>Embedded visualisation widgets are often difficult or impossible for assistive devices to operate, can be difficult to understand for readers with low vision or colourblindness, and may require extensive horizontal scrolling on phones.</p>	<p>${why.fix}Unless this particular embed has high visual contrast, can be operated by a keyboard <strong><em>and</em></strong> described by a screen reader, add an equivalent, alternate format such as a text description, data table or downloadable spreadsheet.</p>`,
	QA_UPPERCASE: `<p><strong>Text:</strong> <i>%(TEXT)</i></p><p>${why.fix}Only capitalise a few words for emphasis. LARGE BLOCKS OF UPPERCASE TEXT ARE MORE DIFFICULT TO READ, AND MANY READERS INTERPRET THEM AS SHOUTING.</p><div class="why"><p>Note: screen readers do not announce visual-only formatting like uppercase text. Use a heading style instead if this emphasised text introduces a topic change or critically important content.</p></div>`,
	// Tips that embed why.headings need the full string rewritten so the
	// British "organise" replaces the American "organize" inside it.
	HEADING_EMPTY: `<p>Empty headings create confusing gaps in the page outline.</p><p>${why.fix}Add text to this heading, or delete this empty line.</p>${why.headings}`,
	HEADING_EMPTY_WITH_IMAGE: `<p>Empty headings create confusing gaps in the page outline.</p><p>${why.fix}If this is not a heading, change its format from <code>Heading %(level)</code> to <code>Paragraph</code>. Otherwise, put the meaning of the image in its alt.</p>${why.headings}`,
	HEADING_FIRST: `${why.fix}Make sure the page title is marked as a Heading 1 or Heading 2. ${why.headings}`,
	HEADING_LONG: `<p>${why.fix}Unless this heading is a fixed reference like the title of a published article, shorten it to help people skim:<span hidden>%(drop)%(drop)</span></p><p><i>%(TEXT)</i></p>${why.headings}`,
	HEADING_MISSING_ONE: `<p>${why.fix}Tag the page title as a level 1 heading, to mark the beginning of the document outline.</p>${why.headings}`,
	HEADING_SKIPPED_LEVEL: `<p>This heading skipped from <code>level %(prevLevel)</code> to <code>level %(level)</code>. From a screen reader, this sounds like content is missing.</p><p>${why.fix}Adjust levels to form an accurate outline, without gaps.</p>${why.headings}`,
	HEADING_UNPRONOUNCEABLE: `<p>Empty headings create confusing gaps in the page outline.</p><p>${why.fix}Add human-readable text to this heading, or convert it to a paragraph.</p>${why.headings}`,
	QA_BLOCKQUOTE: `<p><strong>Suspiciously short quotation:</strong> <i>%(TEXT)</i></p><p>${why.fix}If this is a heading and not a quotation, tag it as a heading so it appears in the page outline.</p>${why.headings}`,
};

const britishInterfaceStrings = {
	PANEL_HEADING: 'Show visualisers',
	buttonToolsActive: 'Hide visualisers',
	panelCheckOutline: 'This shows the heading outline. Check that it matches how the content is organised visually.',
};

export const lang = {
	strings: Object.assign(
		Sa11yStrings.strings,
		interfaceStrings,
		tips,
		englishOverrides,
		britishTips,
		britishInterfaceStrings,
	),
	testNames: Object.assign({}, testNames, britishTestNames),
	ruleset: Object.assign({}, Sa11yStrings.ruleset, englishOverrides),
};
