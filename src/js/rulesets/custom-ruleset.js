import Lang from '../../sa11y-js/utils/lang';
import { getElements } from '../utils/utils';
import * as Utils from '../../sa11y-js/utils/utils';
import { State } from '../../sa11y-js/core/state.js';

export default function customRuleset() {
  /*
   * Disabled as of 3.0.0.
   * */
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
