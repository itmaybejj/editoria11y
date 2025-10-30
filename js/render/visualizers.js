import {M, State, UI} from "../utils/state.js";
import {showHeadingsPanel} from "./interface.js";

export function alignAlts () {
  // Positions alt label to match absolute, inline or floated images.
  findElements('altMark', 'ed11y-element-alt');
  State.elements.altMark?.forEach((el) => { // @todo merge
    let id = el.dataset.ed11yImg;
    el.style.setProperty('transform', null);
    el.style.setProperty('height', null);
    el.style.setProperty('width', null);

    let img = UI.imageAlts[id][0];
    if (img.tagName !== 'IMG') {
      // Mark is placed outside the link in linked images.
      img = img.querySelector('img');
    }
    let markOffset = el.getBoundingClientRect();
    let imgOffset = img.getBoundingClientRect();
    let newOffset = imgOffset.left - markOffset.left;
    let height = getComputedStyle(img).height;
    height = height === 'auto' ? img.offsetHeight : Math.max(img.offsetHeight, parseInt(height));
    el.style.setProperty('transform', `translate(${newOffset}px, 0px)`);
    el.style.setProperty('height', `${height}px`);
    el.style.setProperty('width', `${img.offsetWidth}px`);
  });
};

const showAltPanel = function () {
  // visualize image alts
  let altList = UI.panel.querySelector('#ed11y-alt-list');

  if (UI.imageAlts.length) {
    altList.innerHTML = '';
    UI.imageAlts.forEach((el, i) => {
      // el[el, src, altLabel, altStyle]

      if (State.options.inlineAlerts) {
        // Label images
        const mark = document.createElement('ed11y-element-alt');
        mark.classList.add('ed11y-element');
        mark.dataset.ed11yImg = i.toString();
        mark.setAttribute('id', 'ed11y-alt-' + i);
        mark.setAttribute('tabindex', '-1');
        el[0].insertAdjacentElement('beforebegin', mark);
      }

      // Build alt list in panel
      let userText = document.createElement('span');
      userText.textContent = el[2];
      let li = document.createElement('li');
      li.classList.add(el[3]);
      let img = document.createElement('img');
      img.setAttribute('src', el[1]);
      img.setAttribute('alt', '');

      if (State.options.inlineAlerts) {
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
    });
    alignAlts();
  } else {
    const noImages = document.createElement('p');
    const noItalic = document.createElement('em');
    noItalic.textContent = M.noImagesFound;
    noImages.appendChild(noItalic);
    altList.innerHTML = '';
    altList.appendChild(noImages);
  }
};
export function visualize () {
  if (!UI.panel) {
    return;
  }
  if (State.options.inlineAlerts) {
    findElements('reset', 'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', false);
    State.elements.reset?.forEach((el) => el.remove());
  }
  if (State.visualizing) {
    State.visualizing = false;
    UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = M.buttonToolsContent;
    UI.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'false');
    UI.panel.querySelector('#ed11y-visualizers').setAttribute('hidden', 'true');
    return;
  }
  State.visualizing = true;
  UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = M.buttonToolsActive;
  UI.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'true');
  UI.panel.querySelector('#ed11y-visualizers').removeAttribute('hidden');
  showAltPanel();
  showHeadingsPanel();
};
