import Lang from '../node_modules/sa11y/src/js/utils/lang';
import {computeAccessibleName} from "sa11y/src/js/utils/computeAccessibleName.js";
import {prepareDismissal} from "sa11y/src/js/utils/utils.js";
import {State} from "./utils/state.js";
import {Options} from './utils/options.js';
import {checkAll, incrementalCheck} from "./logic/interface.js";
import {
	firstCheck,
} from "./logic/initialize.js";
import {getElements} from "./utils/utils.js";

class Ed11y {

  constructor(userOptions) {

		State.version = '3.0.0';

    if (CSS.supports('selector(:has(body))')) {
      firstCheck(userOptions);
    }

    /* Export exposed interfaces */
    //this.checkAll = checkAll();
		this.version = State.version;

  }
}

export {
  Lang,
	State,
	Options,
	checkAll,
	computeAccessibleName,
	getElements,
	incrementalCheck,
	prepareDismissal,
	Ed11y,
}
