import Lang from '../../sa11y/utils/lang';
import {Options} from '../utils/options';
import {getElements} from '../utils/utils';
import * as Utils from '../../sa11y/utils/utils';

export default function customRuleset(results) {
	/* *********************************************************** */
	/*  Error: Find all links pointing to development environment. */
	/* *********************************************************** */

	if (Options.checks.EMBED_CUSTOM) {
		const matchedEmbeds = getElements(Options.checks.EMBED_CUSTOM.sources, 'root');
		Lang.langStrings.embeddedContent = `<div class="title" tabindex="-1">${Options.embeddedContentTitle}</div>${Options.embeddedContentMessage}`;
		matchedEmbeds.forEach(($el) => {
			results.push({
				test: 'EMBED_CUSTOM',
				element: $el,
				type: 'warning',
				content: Lang.sprintf('EMBED_CUSTOM'),
				inline: false,
				dismiss: Utils.prepareDismissal($el.tagName + $el.getAttribute('src')),
				dismissAll: 'embeddedContent',
				developer: false,
			});
		});
	}

	return results;
}
