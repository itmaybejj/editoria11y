import Lang from '../sa11y/utils/lang';
import {computeAccessibleName} from "../sa11y/utils/computeAccessibleName.js";
import {prepareDismissal} from "../sa11y/utils/utils.js";
import {State, Theme, UI} from "./utils/state.js";
import {Options} from './utils/options.js';
import Constants from '../sa11y/utils/constants';
import Elements from "../sa11y/utils/elements.js";
import {checkAll, reset, incrementalCheck} from "./logic/run.js";
import {
	initialize,
} from "./logic/initialize.js";
import {getElements, findElements, showError} from "./utils/utils.js";

class Ed11y {

  constructor(userOptions) {

		State.version = '3.0.0';

    if (CSS.supports('selector(:has(body))')) {
			try {
				initialize(userOptions);
			} catch (error) {
				showError(error);}
			// @todo merge license and error message.
    }

    /* Export exposed runs */
		this.version = State.version;

  }
}
export let elements = Elements.Found;

export {
  Lang,
	Theme,
	UI,
	State,
	Options,
	Constants,
	checkAll,
	computeAccessibleName,
	findElements,
	getElements,
	incrementalCheck,
	prepareDismissal,
	reset,
	Ed11y,
}
