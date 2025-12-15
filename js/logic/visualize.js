import {Results, State, UI} from '../utils/state';
import Lang from '../../sa11y/utils/lang';
import Elements from '../../sa11y/utils/elements';
import {computeAriaLabel} from '../../sa11y/utils/computeAccessibleName';
import * as Utils from '../../sa11y/utils/utils';
import {alignAlts} from '../utils/align';
import {getElements} from '../utils/utils';
import {Options} from '../utils/options';
import checkReadability from '../../sa11y/rulesets/readability';

export const showAltPanel = function () {
	// visualize image alts
	let altList = UI.panel.querySelector('#ed11y-alt-list');
	UI.imageAlts = [];
	Elements.Found.Images.forEach((img) => {
		const match = Results.find((i) => i.element === img);
		if (match) {
			UI.imageAlts.push({
				element: img,
				type: match.type,
				dismiss: match.dismiss,
				developer: match.developer,
			})
		} else {
			UI.imageAlts.push({
				element: img,
				type: 'pass',
			})
		}
	});

	if (UI.imageAlts.length > 0) {
		altList.innerHTML = '';
		for (let i = 0; i < UI.imageAlts.length; i++) {
			const image = UI.imageAlts[i];
			let altText = computeAriaLabel(image.element) === 'noAria'
				? Utils.escapeHTML(image.element.getAttribute('alt'))
				: computeAriaLabel(image.element);
			UI.imageAlts[i].altText = altText;
			//let alert = {};
			/*
			// Match dismissed images.
			// @todo CMS merge remove once new syntax is ready; this is the Sa11y logic for dev reference:
			// const isDismissed = dismissed.some((key) => key.dismiss === image.dismiss);
			// if (isDismissed) Object.assign(image, { dismissedImage: true });
			// Make developer checks don't show images as error if Developer checks are off!
			// const dev = Utils.store.getItem('sa11y-developer');
			// const devChecksOff = dev === 'Off' || dev === null;
			// const showDeveloperChecks = devChecksOff && (type === 'error' || type === 'warning') && developer === true;

			// Generate edit link if locally hosted image and prop is enabled.
			const edit = Constants.Global.editImageURLofCMS ? generateEditLink(image) : '';

			// Image is decorative (has null alt)
			const decorative = (element.hasAttribute('alt') && altText === '')
				? `<div class="badge">${Lang._('DECORATIVE')}</div>` : '';

			// If image is linked.
			const anchor = option.imageWithinLightbox ? `a[href]:not(${option.imageWithinLightbox})` : 'a[href]';
			const linked = (element.closest(anchor))
				? `<div class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></div>` : '';
			const visibleIcon = (hidden === true)
				? `<div class="badge"><span class="hidden-icon"></span><span class="visually-hidden">${Lang._('HIDDEN')}</span></div>` : '';
			let append;
      if (type === 'error' && !showDeveloperChecks) {
      // etc
			*/


			// Account for lazy loading libraries.

			if (State.inlineAlerts) {
				// Label images
				const mark = document.createElement('ed11y-element-alt');
				mark.classList.add('ed11y-element');
				mark.dataset.ed11yImg = i.toString();
				mark.setAttribute('id', 'ed11y-alt-' + i);
				mark.setAttribute('tabindex', '-1');
				UI.imageAlts[i].mark = mark;
				image.element.insertAdjacentElement('beforebegin', mark);
			}

			// Build alt list in panel
			let userText = document.createElement('span');
			if (altText !== '') {
				userText.textContent = altText;
			} else {
				const decorative = document.createElement('span');
				decorative.classList.add('ed11y-decorative');
				decorative.textContent = Lang._('DECORATIVE');
				userText.append(decorative);
			}
			let li = document.createElement('li');
			li.classList.add('ed11y-' + image.type);
			let img = document.createElement('img');
			img.setAttribute('src', Utils.getBestImageSource(image.element));
			img.setAttribute('alt', '');

			if (State.inlineAlerts) {
				let a = document.createElement('a');
				a.href = '#ed11y-alt-' + i;
				a.classList.add('alt-parent');
				li.append(a);
				a.append(img);
				a.append(userText);
			} else {
				li.classList.add('alt-parent');
				li.append(img);
				li.append(userText);
			}
			altList.append(li);
		}
		if (State.inlineAlerts) {
			alignAlts();
		} else {
			UI.imageAlts.length = 0;
		}
		//findElements('altMark', 'ed11y-element-alt', false );
	} else {
		const noImages = document.createElement('p');
		const noItalic = document.createElement('em');
		noItalic.textContent = Lang._('NO_IMAGES');
		noImages.appendChild(noItalic);
		altList.innerHTML = '';
		altList.appendChild(noImages);
	}
};

export function visualize () {
	if (!UI.panel) {
		return;
	}
	if (State.inlineAlerts) {
		const reset = getElements('ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', 'document', []);
		reset?.forEach((el) => el.remove());
	}
	if (State.visualizing) {
		State.visualizing = false;
		UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Lang._('PANEL_HEADING');
		UI.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'false');
		UI.panel.querySelector('#ed11y-visualizers').setAttribute('hidden', 'true');
		return;
	}
	State.visualizing = true;
	UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Lang._('buttonToolsActive');
	UI.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'true');
	UI.panel.querySelector('#ed11y-visualizers').removeAttribute('hidden');
	showAltPanel();
	showHeadingsPanel();
	if (Options.readabilityPlugin) {
		showReadability();
	}
}

const showReadability = function() {
	checkReadability(Results);
	for (let i = Results.length - 1; i >= 0; i--) {
		if (!Results[i].element) {
			// It's possible to get here while visualizing.
			Results.splice(i, 1);
		}
	}
}

export function showHeadingsPanel () {
	// Visualize the document outline

	let panelOutline = UI.panel.querySelector('#ed11y-outline');
	if (State.headingOutline.length) {
		panelOutline.innerHTML = '';
		State.headingOutline.forEach((result, i) => {
			// Todo: draw these in editable mode.
			if (State.inlineAlerts) {
				const mark = document.createElement('ed11y-element-heading-label');
				mark.classList.add('ed11y-element', 'ed11y-element-heading');
				mark.dataset.ed11yHeadingOutline = i.toString();
				mark.setAttribute('id', 'ed11y-heading-' + i);
				mark.setAttribute('tabindex', '-1');
				// Array: el, level, outlinePrefix
				result.element.insertAdjacentElement('afterbegin', mark);
				UI.attachCSS(mark.shadowRoot);
			}
			let leftPad = 10 * result.headingLevel - 10;
			let li = document.createElement('li');
			li.classList.add('level' + result.headingLevel);
			li.style.setProperty('margin-left', leftPad + 'px');
			let levelPrefix = document.createElement('strong');
			levelPrefix.textContent = `H${result.headingLevel}: `;
			let userText = document.createElement('span');
			userText.innerHTML = result.text;
			let link = document.createElement('a');
			if (State.inlineAlerts) {
				link.setAttribute('href', '#ed11y-heading-' + i);
				li.append(link);
				link.append(levelPrefix);
				link.append(userText);
			} else {
				li.append(levelPrefix);
				li.append(userText);
			}
			if (result.type) { // Has an error message
				li.classList.add(`ed11y-${result.type}`);
				/*let message = document.createElement('em');
				message.classList.add('ed11y-small');
				message.textContent = ' ' + el[2];
				if (State.inlineAlerts) {
					link.append(message);
				} else {
					li.append(message);
				}*/
			}
			panelOutline.append(li);
		});
	} else {
		panelOutline.innerHTML = `<p><em>${Lang._('PANEL_NO_HEADINGS')}</em></p>`;
	}
}


// Place markers on elements with issues
export function drawResult(result, index) {
	let mark = document.createElement('ed11y-element-result');
	mark.classList.add('ed11y-element');
	mark.setAttribute('id', 'ed11y-result-' + index);
	mark.setAttribute('data-ed11y-result', index);
	mark.setAttribute('data-ed11y-open', 'false');
	if (!State.inlineAlerts) {
		mark.classList.add('ed11y-editable-result');
		State.panelAttachTo.insertAdjacentElement('beforeend', mark);
	} else {
		result.element.insertAdjacentElement(result.position, mark);
	}

	const shadow = mark.attachShadow({ mode: 'open' });

	// Create mark.wrapper with type class
	mark.resultID = mark.dataset.ed11yResult;
	mark.result = Results[mark.resultID];

	mark.wrapper = document.createElement('div');

	mark.dismissable = mark.result.type !== 'error';
	mark.dismissed = !!mark.result.dismissalStatus;
	mark.wrapper.classList.add('ed11y-wrapper', 'ed11y-result-wrapper');
	mark.wrapper.style.setProperty('opacity', '0');
	mark.wrapper.classList.add('ed11y-result');

	// Create tooltip toggle
	mark.toggle = document.createElement('button');
	mark.toggle.setAttribute('class', 'toggle');
	let label = mark.dismissable ? Lang._('WARNING') : Lang._('ERROR');
	mark.toggle.setAttribute('aria-label', label);
	mark.toggle.setAttribute('aria-expanded', 'false');
	mark.toggle.setAttribute('aria-haspopup', 'dialog');
	mark.toggle.setAttribute('data-ed11y-result', mark.dataset.ed11yResult);
	mark.toggle.setAttribute('data-ed11y-ready', 'false');
	mark.toggle.setAttribute('data-ed11y-race', 'false');
	if (!State.inlineAlerts) {
		mark.toggle.style.setProperty('font-size', '16px');
	}
	if (mark.dismissed) {
		mark.toggle.innerHTML = '<svg aria-hidden="true" width="10" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>';
		mark.toggle.classList.add('dismissed');
		if (mark.result.dismissalStatus !== 'ok') {
			// @todo 3.x okAll?
			mark.toggle.classList.add('notok');
		} else {
			mark.toggle.classList.add('ok');
		}
	} else if (mark.dismissable) {
		mark.toggle.classList.add('dismissable');
	}
	mark.wrapper.appendChild(mark.toggle);
	mark.toggle.addEventListener('click', mark.toggleClick);
	mark.toggle.addEventListener('focus', mark.handleFocus);
	mark.toggle.addEventListener('mouseover', mark.handleHover);
	mark.tipNeedsBuild = true;

	UI.attachCSS(mark.wrapper);

	shadow.appendChild(mark.wrapper);

	State.jumpList.unshift(mark);
	Results[index].toggle = mark;
}
