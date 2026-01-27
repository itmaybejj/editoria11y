// noinspection JSUnusedGlobalSymbols

import strings from '../sa11y-lang/enUS.js';
import {interfaceStrings, testNames, tips} from './baseAll.js';
import { englishOverrides } from './baseEnglishOnly.js';

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips, englishOverrides),
  testNames: testNames,
};

export default newStrings;
