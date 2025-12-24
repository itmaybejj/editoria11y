// noinspection JSUnusedGlobalSymbols

import strings from '../../sa11y/lang/enUS.js';
import { interfaceStrings, testNames } from './baseAll.js';
import { englishOverrides } from './baseEnglishOnly.js';

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, englishOverrides),
  testNames: testNames,
};

export default newStrings;
