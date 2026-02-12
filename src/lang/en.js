// noinspection JSUnusedGlobalSymbols

import {default as Sa11yStrings} from '../sa11y-lang/en.js';
import {interfaceStrings, testNames, tips} from './baseAll.js';
import { englishOverrides } from './baseEnglishOnly.js';

export const lang = {
  strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips, englishOverrides),
  testNames: testNames,
};
