import Lang from '../sa11y-js/utils/lang';
import { computeAccessibleName } from '../sa11y-js/utils/computeAccessibleName.js';
import Elements from '../sa11y-js/utils/elements.js';
import { reset, refresh } from './core/run.js';
import { initialize } from './core/initialize.js';
import { sanitizeHTML } from '../sa11y-js/utils/utils.js';
import { createDismissalKey, getElements, findElements } from './utils/utils.js';
import { State } from '../sa11y-js/core/state.js';
import { UI } from './core/ui.js';
import version from './version.js';
import ConsoleErrors from './elements/ed11y-console-error.js';

class Ed11y {
  constructor(userOptions) {
    if (CSS.supports('selector(:has(body))')) {
      initialize(userOptions).catch((error) => {
        customElements.define('ed11y-console-error', ConsoleErrors);
        const consoleErrors = new ConsoleErrors(error);
        document.body.appendChild(consoleErrors);
        UI.attachCSS(consoleErrors.shadowRoot.querySelector('*'));
        throw Error(error);
      });
    }
  }
}

export const elements = Elements.Found;

export {
  Lang,
  State,
  UI,
  computeAccessibleName,
  createDismissalKey,
  findElements, // Adds elements to the Elements.Found object.
  getElements, // Directly returns elements.
  refresh,
  reset,
  sanitizeHTML,
  version,
  Ed11y,
};
