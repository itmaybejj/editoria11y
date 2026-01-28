import strings from '../sa11y-lang/es.js';

// todo check each file for link integrity, and escaping of tags in code blocks.
export const testNames = {

};

const why = {

};

const tips = {

}

const interfaceStrings = {

}

const newStrings = {
  strings: Object.assign(strings.strings, interfaceStrings, tips),
  testNames: testNames,
};

export default newStrings;
