import Lang from '../../sa11y-js/utils/lang';
import { Options } from '../utils/options';
import { getElements } from '../utils/utils';
import * as Utils from '../../sa11y-js/utils/utils';

export default function customRuleset(results) {
  /*
   * Disabled as of 3.0.0.
   * */
  if (Options.checks.EMBED_CUSTOM) {
    const matchedEmbeds = getElements(Options.checks.EMBED_CUSTOM.sources, 'root');
    matchedEmbeds.forEach(($el) => {
      results.push({
        test: 'EMBED_GENERAL',
        element: $el,
        type: 'warning',
        inline: false,
        dismiss: Utils.prepareDismissal($el.tagName + $el.getAttribute('src')),
        content: Lang.sprintf(Options.checks.EMBED_GENERAL.content || 'EMBED_GENERAL'),
        dismissAll: Options.checks.EMBED_GENERAL.dismissAll ? 'EMBED_GENERAL' : false,
        developer: Options.checks.EMBED_GENERAL.developer || false,
      });
    });
  }

  return results;
}
