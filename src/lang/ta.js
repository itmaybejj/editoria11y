import { default as Sa11yStrings } from '../sa11y-lang/ta.js';

// UNTRANSLATED STUB — Tamil (ta).
//
// SPECIAL HANDLING: Unlike the other new languages, Tamil in Sa11y is HUMAN
// TRANSLATED, not machine translated. When this file is translated:
//   1. The translating agent MUST be given a copy of `src/sa11y-lang/ta.js` and
//      told to defer to its style, tone, terminology and word choice.
//   2. Match the human translator's voice rather than the machine-translated
//      tone used in the other editoria11y language files.
//   3. The check-translations skill has a Tamil-specific branch — see
//      .agents/skills/check-translations/SKILL.md.
//
// This file is wired but NOT yet translated.
// Until translated, do NOT add 'ta' to scripts/build.js `langs` (it lives in `pendingLangs`).

const testNames = {

};

const why = {

};

export const tips = {

};

export const interfaceStrings = {

};

export const lang = {
	strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips),
	testNames: testNames,
};
