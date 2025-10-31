import Options from "./utils/options.js";
import Lang from '../node_modules/sa11y/src/js/utils/lang';
import Constants from "sa11y/src/js/utils/constants.js";
import ed11yLang from "./lang/localization.js";
import {State, M} from "./utils/state.js";
import {checkAll, makeItSo} from "./utils/check.js";
import {
  Ed11yElementHeadingLabel,
  Ed11yElementPanel
} from "./elements/ed11y-element-panel.js";
import {Ed11yElementTip} from "./elements/ed11y-element-tip.js";
import {Ed11yElementAlt} from "./elements/ed11y-element-alt.js";
import {Ed11yElementResult} from "./elements/ed11y-element-result.js";

class Ed11y {

  constructor(options) {

    State.version = '3.0.0';
    State.options = Options.preProcessOptions(options);
    // Initialize global constants and exclusions.
		Constants.initializeRoot(State.options.checkRoots, State.options.checkRoots)
    Constants.initializeGlobal(State.options);
    Constants.initializeReadability(State.options);
    Constants.initializeExclusions(State.options);
    Options.postProcessOptions(State.options);

    Object.assign(M, ed11yLang['en'], ed11yLang[State.options.lang]);

    customElements.define('ed11y-element-alt', Ed11yElementAlt);
    customElements.define('ed11y-element-result', Ed11yElementResult);
    customElements.define('ed11y-element-heading-label',
      Ed11yElementHeadingLabel);
    customElements.define('ed11y-element-panel', Ed11yElementPanel);
    customElements.define('ed11y-element-tip', Ed11yElementTip);

    window.addEventListener('keydown', () => {
      State.interaction = true;
    });
    window.addEventListener('click', () => {
      State.interaction = true;
    });

    if (CSS.supports('selector(:has(body))')) {
      makeItSo();
    } else {
      console.warn(M.consoleNotSupported);
    }

    /* Export exposed interfaces */
    this.checkAll = checkAll();
  }
}

export {
  Lang,
  Ed11y,
  checkAll
}
