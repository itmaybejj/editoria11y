import {M, State, UI} from "../utils/state.js";
import {
  computeText,
  findElements
} from "../utils/utils.js";
import ed11yLang from "../lang/localization.js";
import {pauseObservers, resumeObservers} from "../utils/observers.js";

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
}

export function showHeadingsPanel () {
  // Visualize the document outline

  let panelOutline = UI.panel.querySelector('#ed11y-outline');
  console.log(State.headingOutline);
  if (State.headingOutline.length) {
    panelOutline.innerHTML = '';
    State.headingOutline.forEach((result, i) => {
      console.log(result);
      console.log(result.headingLevel);
      // Todo: draw these in editable mode.
      if (State.options.inlineAlerts) {
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
      userText.textContent = computeText(result.element);
      let link = document.createElement('a');
      if (State.options.inlineAlerts) {
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
        if (State.options.inlineAlerts) {
          link.append(message);
        } else {
          li.append(message);
        }*/
      }
      panelOutline.append(li);
    });
  } else {
    panelOutline.innerHTML = '<p><em>No heading structure found.</em></p>';
  }
}

window.addEventListener('ed11yEndVisualization', ()=>{
	State.visualizing = false;
	pauseObservers();
	visualize();
	resumeObservers();
})

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
