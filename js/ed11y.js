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
import ed11yLang from "./lang/localization.js";

class Ed11y {

  constructor(userOptions) {

		State.version = '3.0.0';

		Object.assign(Lang.langStrings, ed11yLang.strings); // todo after merge convert to new syntax.
		if (Lang.langStrings.LANG_CODE.startsWith('en')) {
			// temporary conversion until Sa11y has test keys.
			let oldTitle = '';
			const overrides = Object.entries(ed11yLang.tests);
			for(let i = 0; i < overrides.length; i++) {
				if (typeof overrides[i][1] === 'object') {
					oldTitle = overrides[i][1]['title'];
				} else {
					Lang.langStrings[overrides[i][0]] = `<div class="title" tabindex="-1"><div class="ed11y-tip-alert"></div>${oldTitle}</div>${overrides[i][1]}`
				}
			}
		}

    if (CSS.supports('selector(:has(body))')) {
      firstCheck(userOptions);
    }

    /* Export exposed interfaces */
    this.checkAll = checkAll();
		this.version = State.version;
		this.incrementalCheck = () => incrementalCheck();
		this.Options = Options;
		this.getElements = getElements();
		this.computeAccessibleName = computeAccessibleName();
		this.prepareDismissal = prepareDismissal();
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
