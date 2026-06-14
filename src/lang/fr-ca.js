// noinspection JSUnusedGlobalSymbols

import { lang as frLang } from './fr.js';

// Quebec / Canadian French (fr-CA) — a thin overlay over France French (fr.js).
//
// In this technical, accessibility-focused register, written Quebec French and
// France French are lexically and grammatically identical: a vocabulary scan of
// fr.js found none of the usual France-vs-Quebec divergent terms (courriel,
// infolettre, clavardage, pourriel, balado, …). Re-translating all ~260 strings
// would therefore duplicate an already machine-translated base for no accuracy
// gain, and would drift out of sync. Instead we override only the one systematic
// difference, applied programmatically so this stays in sync with fr.js forever.
//
// The difference is typographic: France French inserts a (narrow) space before
// the "high" punctuation marks « ? », « ! » and « ; », whereas standard Quebec
// usage (OQLF) omits it. The space before « : » and the spaces inside the
// guillemets « » are kept in both variants, so those are left untouched.
//
// ~39 of 264 strings differ. See the check-translations skill.

// Strip any space (regular, NBSP, narrow NBSP, thin) immediately before ? ! or ;
// In this corpus such spaces only ever precede sentence punctuation — URLs,
// CSS declarations and HTML entities place no space before these marks — so the
// transform never touches markup or placeholders.
const dropPreHighSpace = (value) =>
	typeof value === 'string'
		? value.replace(/[     ]+([?!;])/g, '$1')
		: value;

const quebecify = (obj) =>
	Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, dropPreHighSpace(value)]));

export const lang = {
	strings: quebecify(frLang.strings),
	testNames: quebecify(frLang.testNames),
};
