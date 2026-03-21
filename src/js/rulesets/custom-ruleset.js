import Lang from '../../sa11y-js/utils/lang';
import Elements from '../../sa11y-js/utils/elements.js';
import * as Utils from '../../sa11y-js/utils/utils';
import { State } from '../../sa11y-js/core/state.js';

export function prepareCustomRuleset() {
  State.option.customRules?.forEach((cr) => {
    Lang.testNames[cr.testKey] = cr.testName;
    Lang.langStrings[cr.testKey] =
      `<div class="title" tabindex="-1">${Utils.sanitizeHTML(cr.testName)}</div>${Utils.sanitizeHTML(cr.tipContent)}`;
  });
}

const pushCustomRule = (cr, el, text) => {
  let dismissKey = `${cr.test}`;
  switch (cr.dismissKey) {
    case 'text':
      dismissKey = text || Utils.getText(el);
      break;
    case 'attributes': {
      const attributes = el.attributes;
      if (attributes.length > 0) {
        for (const attr of attributes) {
          dismissKey += `${attr.name}${attr.value}`;
        }
      }
      break;
    }
    default:
      dismissKey = el.innerHTML;
  }

  // Pushes a custom rule result to the State.results array.
  State.results.push({
    test: cr.testKey,
    element: el,
    type: cr.type || 'error',
    content: Lang.sprintf(cr.testKey),
    // inline: true, // Ed11y computes this.
    // position: 'beforebegin', // Ed11y computes this.
    dismiss: Utils.prepareDismissal(dismissKey),
    // dismissAll: cr.dismissAll || false, // Ed11y computes this.
    // developer: cr.developer || true, // Ed11y computes this.
  });
};

export function checkCustomRuleset() {
  /**
   * testKey
   * testName
   * tipContent
   * elementSet
   * filterSelector
   * caseSensitive
   * includeText
   * excludeText
   * type
   * dismissKey
   *
   * not implemented in Ed11y:
   * inline
   * position
   * dismissAll
   * developer
   */
  State.option.customRules?.forEach((cr) => {
    let elements = Elements.Found[cr.elementSet];
    if (!elements.length) return;
    if (cr.filterSelector) {
      elements = elements.filter((el) => el.matches(cr.filterSelector));
    }

    if (elements.length && (cr.includeText || cr.excludeText)) {
      elements.forEach((el) => {
        let text = Utils.getText(el);
        if (!cr.caseSensitive) {
          text = text.toLowerCase();
        }
        let match = false;
        let noMatch = false;
        if (cr.includeText) {
          match = cr.includeText.some((inc) => text.includes(inc));
        }
        if (cr.excludeText && (match || !cr.includeText)) {
          noMatch = cr.excludeText.some((exc) => text.includes(exc));
        }
        if (match && !noMatch) {
          pushCustomRule(cr, el, text);
        }
      });
    } else if (elements.length) {
      elements.forEach((el) => {
        pushCustomRule(cr, el);
      });
    }
  });
}
