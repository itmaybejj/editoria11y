import Constants from "../../sa11y-js/utils/constants.js";
import { State } from '../../sa11y-js/core/state';

/*
* Replaces Sa11y finder with one that does not insert CSS.
* */

export default function findShadowComponents(option) {
	if (!option) {
		option = State.option;
	}
	if (option.autoDetectShadowComponents) {
		// Elements to ignore.
		const ignore = Constants.Exclusions.Sa11yElements;

		// Search all elements.
		const root = document.querySelector(option.checkRoot);
		const search = (root)
			? Array.from(root.querySelectorAll(`*:not(${ignore})`))
			: Array.from(document.body.querySelectorAll(`*:not(${ignore})`));

		// Query for open shadow roots & inject CSS utilities into every shadow DOM.
		search.forEach((component) => {
			if (component.shadowRoot && component.shadowRoot.mode === 'open') {
				component.setAttribute('data-sa11y-has-shadow-root', '');
				// addStyleUtilities(component);
				// @todo should we add CSS here?
			}
		});
	} else if (option.shadowComponents) {
		const providedShadow = document.querySelectorAll(option.shadowComponents);
		providedShadow.forEach((component) => {
			component.setAttribute('data-sa11y-has-shadow-root', '');
			// addStyleUtilities(component);
			// @todo should we add CSS here?
		});
	}
}
