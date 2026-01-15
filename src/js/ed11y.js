import Lang from '../sa11y-js/utils/lang';
import { computeAccessibleName } from '../sa11y-js/utils/computeAccessibleName.js';
import { prepareDismissal } from '../sa11y-js/utils/utils.js';
import { State, Theme, UI, Results } from './utils/state.js';
import { Options } from './utils/options.js';
import Elements from '../sa11y-js/utils/elements.js';
import { checkAll, reset, incrementalCheck } from './logic/run.js';
import { initialize } from './logic/initialize.js';
import { getElements, findElements, showError } from './utils/utils.js';
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
  findElements,
  getElements,
  incrementalCheck,
  prepareDismissal,
  reset,
  version,
  Ed11y,
};
