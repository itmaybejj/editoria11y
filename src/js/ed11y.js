import Lang from '../sa11y-js/utils/lang';
import { computeAccessibleName } from '../sa11y-js/utils/computeAccessibleName.js';
import { State, Theme, UI, Results } from './utils/state.js';
import { Options } from './utils/options.js';
import Elements from '../sa11y-js/utils/elements.js';
import { checkAll, reset, incrementalCheck } from './logic/run.js';
import { initialize } from './logic/initialize.js';
import { sanitizeHTML } from '../sa11y-js/utils/utils.js';
import {
  createDismissalKey,
  getElements,
  findElements,
  resetResults,
  showError,
} from './utils/utils.js';
import version from './version.js';

class Ed11y {
  constructor(userOptions) {
    if (CSS.supports('selector(:has(body))')) {
      try {
        initialize(userOptions);
      } catch (error) {
        showError(error);
      }
      // @todo 3.x need website: license, error message, reporting.
    }
  }
}

export const elements = Elements.Found;

export {
  Lang,
  Options,
  Results,
  State,
  Theme,
  UI,
  checkAll,
  computeAccessibleName,
  createDismissalKey,
  findElements,
  getElements,
  incrementalCheck,
  reset,
  resetResults,
  sanitizeHTML,
  version,
  Ed11y,
};
