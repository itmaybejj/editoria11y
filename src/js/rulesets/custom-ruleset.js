import Lang from '../../sa11y-js/utils/lang';
import Elements from '../../sa11y-js/utils/elements.js';
import * as Utils from '../../sa11y-js/utils/utils';
import { State } from '../../sa11y-js/core/state.js';
import { getElements } from '../utils/utils.js';

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
      break;
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
    cr.elementSet?.forEach((found) => {
      let elements = Elements.Found[found];
      if (!elements.length) return;
      if (cr.filterSelector) {
        elements = elements.filter((el) => el.matches(cr.filterSelector));
      }

      if (elements.length && (cr.includeText.length || cr.excludeText.length)) {
        elements.forEach((el) => {
          let text = Utils.getText(el);
          if (!cr.caseSensitive) {
            cr.includeText = cr.includeText.map((inc) => inc.toLowerCase());
            cr.excludeText = cr.excludeText.map((exc) => exc.toLowerCase());
            text = text.toLowerCase();
          }
          let match = false;
          let noMatch = false;
          if (cr.includeText.length) {
            match = cr.includeText.some((inc) => text.includes(inc));
          }
          if (cr.excludeText.length && (match || !cr.includeText.length)) {
            noMatch = cr.excludeText.some((exc) => text.includes(exc));
          }
          if (match && !noMatch) {
            pushCustomRule(cr, el, text);
          }
        });
      } else if (elements.length > 0) {
        elements.forEach((el) => {
          pushCustomRule(cr, el);
        });
      }
    });
  });

  // Legacy support for Drupal/WordPress plugins.
  if (State.option.checks.EMBED_CUSTOM) {
    const matchedEmbeds = getElements(State.option.checks.EMBED_CUSTOM.sources, 'root');
    matchedEmbeds.forEach(($el) => {
      State.results.push({
        test: 'EMBED_GENERAL',
        element: $el,
        type: 'warning',
        inline: false,
        dismiss: Utils.prepareDismissal($el.tagName + $el.getAttribute('src')),
        content: Lang.sprintf(State.option.checks.EMBED_GENERAL.content || 'EMBED_GENERAL'),
        dismissAll: State.option.checks.EMBED_GENERAL.dismissAll ? 'EMBED_GENERAL' : false,
        developer: State.option.checks.EMBED_GENERAL.developer || false,
      });
    });
  }
}
