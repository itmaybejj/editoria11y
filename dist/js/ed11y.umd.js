
/*!
	* Editoria11y accessibility checker.
  * @version 3.0.0-dev092225
  * @author John Jameson
  * @license GPL-2.0
  * @copyright 2025 The Trustees of Princeton University.
  * @contact jjameson@princeton.edu
  * GitHub: https://github.com/itmaybejj/editoria11y
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
	*
	* Acknowledgements:
	*	Icons from Font Awesome by Dave Gandy, http://fontawesome.io, Font Awesome license: CC BY 3.0, URL: http://creativecommons.org/licenses/by/3.0/
	*
	*	Rulesets co-developed with Sa11y under shared license:
	* Sa11y, the accessibility quality assurance assistant.
  * @version 4.4.0-dev
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright 2020 - 2025 Toronto Metropolitan University.
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Ed11y = {}));
})(this, (function (exports) { 'use strict';

  /* Translation object */
  const Lang = {
    langStrings: {},
    addI18n(strings) {
      this.langStrings = strings;
    },
    _(string) {
      return this.translate(string);
    },
    sprintf(string, ...args) {
      let transString = this._(string);
      transString = this.prepHTML(transString);

      if (args && args.length) {
        args.forEach((arg) => {
          transString = transString.replace(/%\([a-zA-z]+\)/, arg);
        });
      }
      return transString;
    },
    translate(string) {
      return this.langStrings[string] || string;
    },
    prepHTML($el) {
      return $el.replaceAll(/<hr>/g, '<hr aria-hidden="true">')
        .replaceAll(/<a[\s]href=/g, '<a target="_blank" rel="noopener noreferrer" href=')
        .replaceAll(/<\/a>/g, `<span class="visually-hidden"> (${Lang._('NEW_TAB')})</span></a>`)
        .replaceAll(/{C}/g, 'class="colour"')
        .replaceAll(/{B}/g, 'class="badge"')
        .replaceAll(/{ALT}/g, `<strong class="badge">${Lang._('ALT')}</strong>`)
        .replaceAll(/{L}/g, `<strong class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></strong>`);
    },
  };

  /**
   * Removes the alert from the Sa11y control panel by clearing its content and removing CSS classes.
   * This function clears the content of the alert element and removes CSS classes 'active' from the main alert element, and 'panel-alert-preview' from the alert preview element.
   * @returns {void}
   */
  function removeAlert() {
    const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;
    const alert = Sa11yPanel.getElementById('panel-alert');
    const alertText = Sa11yPanel.getElementById('panel-alert-text');
    const alertPreview = Sa11yPanel.getElementById('panel-alert-preview');

    alert.classList.remove('active');
    alertPreview.classList.remove('panel-alert-preview');
    while (alertText.firstChild) alertText.removeChild(alertText.firstChild);
    while (alertPreview.firstChild) alertPreview.removeChild(alertPreview.firstChild);
  }

  /**
   * Creates an alert in the Sa11y control panel with the given alert message and error preview.
   * @param {string} alertMessage The alert message.
   * @param {string} errorPreview The issue's tooltip message (optional).
   * @param {string} extendedPreview The issue's HTML or escaped HTML to be previewed (optional).
   * @returns {void}
   */
  function createAlert(alertMessage, errorPreview, extendedPreview) {
    // Clear alert first before creating new one.
    removeAlert();

    // Constants
    const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;
    const alert = Sa11yPanel.getElementById('panel-alert');
    const alertText = Sa11yPanel.getElementById('panel-alert-text');
    const alertPreview = Sa11yPanel.getElementById('panel-alert-preview');
    const alertClose = Sa11yPanel.getElementById('close-alert');
    const skipButton = Sa11yPanel.getElementById('skip-button');

    alert.classList.add('active');
    alertText.innerHTML = alertMessage;

    // If the issue's element is being previewed.
    const elementPreview = (extendedPreview)
      ? `<div class="element-preview">${extendedPreview}</div>` : '';

    // Alert message or tooltip's message.
    if (errorPreview) {
      alertPreview.classList.add('panel-alert-preview');
      alertPreview.innerHTML = `${elementPreview}<div class="preview-message">${errorPreview}</div>`;
    }

    // A little time before setting focus on the close button.
    setTimeout(() => alertClose.focus(), 300);

    // Closing alert sets focus back to Skip to Issue toggle.
    function closeAlert() {
      removeAlert();
      const focusTarget = skipButton.hasAttribute('disabled')
        ? Sa11yPanel.getElementById('toggle')
        : skipButton;
      focusTarget.focus();
    }
    alertClose.addEventListener('click', closeAlert);

    // Escape key to close alert.
    alert.onkeydown = (e) => {
      const evt = e || window.event;
      if (evt.key === 'Escape' && alert.classList.contains('active')) {
        closeAlert();
      }
    };
  }

  /* eslint-disable no-console */

  const Constants = (function myConstants() {
    /* **************** */
    /* Global constants */
    /* **************** */
    const Global = {};
    function initializeGlobal(option) {
      Global.html = document.querySelector('html');
      Global.headless = option.headless;
      Global.panelPosition = option.panelPosition;
      Global.dismissAnnotations = option.dismissAnnotations;
      Global.aboutContent = option.aboutContent;
      Global.contrastAPCA = option.contrastAPCA;
      Global.contrastSuggestions = option.contrastSuggestions;
      Global.contrastAAA = option.contrastAAA;
      Global.shadowDetection = option.shadowComponents.length > 0 || option.autoDetectShadowComponents === true;
      Global.fixedRoots = option.fixedRoots;
      Global.ignoreAriaOnElements = option.ignoreAriaOnElements;
      Global.ignoreTextInElements = option.ignoreTextInElements;

      // Toggleable plugins
      Global.developerPlugin = option.developerPlugin;
      Global.colourFilterPlugin = option.colourFilterPlugin;
      Global.checkAllHideToggles = option.checkAllHideToggles;
      Global.exportResultsPlugin = option.exportResultsPlugin;
      Global.readabilityPlugin = option.readabilityPlugin;
      Global.showImageOutline = option.showImageOutline;
      Global.editImageURLofCMS = option.editImageURLofCMS;
      Global.relativePathImageSRC = option.relativePathImageSRC;
      Global.relativePathImageID = option.relativePathImageID;
      Global.ignoreEditImageURL = option.ignoreEditImageURL;
      Global.ignoreEditImageClass = option.ignoreEditImageClass;
      Global.showMovePanelToggle = option.showMovePanelToggle;

      // A11y: Determine scroll behaviour
      let reducedMotion = false;
      if (typeof window.matchMedia === 'function') {
        reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      }
      Global.scrollBehaviour = (!reducedMotion || reducedMotion.matches) ? 'auto' : 'smooth';

      // i18n
      Global.langDirection = (Global.html.getAttribute('dir') === 'rtl') ? 'rtl' : 'ltr';

      // Check for document types.
      const documentSources = option.checks.QA_DOCUMENT.sources;
      const defaultDocumentSources = 'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://drive.google.com/file"], a[href^="https://docs.google."], a[href^="https://sway."]';
      if (documentSources) {
        Global.documentSources = `${defaultDocumentSources}, ${documentSources}`;
      } else {
        Global.documentSources = defaultDocumentSources;
      }

      /* ********************** */
      /* Embedded Content Setup */
      /* ********************** */

      // Video sources.
      const videoSources = option.checks.EMBED_VIDEO.sources;
      const defaultVideoSources = 'video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"]';
      if (videoSources) {
        const videos = videoSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
        Global.VideoSources = `${defaultVideoSources}, ${videos.join(', ')}`;
      } else {
        Global.VideoSources = defaultVideoSources;
      }

      // Audio sources.
      const audioSources = option.checks.EMBED_AUDIO.sources;
      const defaultAudioSources = 'audio, [src*="soundcloud.com"], [src*="simplecast.com"], [src*="podbean.com"], [src*="buzzsprout.com"], [src*="blubrry.com"], [src*="transistor.fm"], [src*="fusebox.fm"], [src*="libsyn.com"], [src*="spotify.com"], [src*="podcasts.apple.com"], [src*="castbox.fm"], [src*="megaphone.fm"], [src*="spreaker.com"], [src*="anchor.fm"], [src*="rss.com"], [src*="redcircle.com"]';
      if (audioSources) {
        const audio = audioSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
        Global.AudioSources = `${defaultAudioSources}, ${audio.join(', ')}`;
      } else {
        Global.AudioSources = defaultAudioSources;
      }

      // Data viz sources.
      const dataVizSources = option.checks.EMBED_DATA_VIZ.sources;
      const defaultDataVizSources = '[src*="datastudio"], [src*="tableau"], [src*="lookerstudio"], [src*="powerbi"], [src*="qlik"]';
      if (dataVizSources) {
        const data = dataVizSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
        Global.VisualizationSources = `${defaultDataVizSources}, ${data.join(', ')}`;
      } else {
        Global.VisualizationSources = defaultDataVizSources;
      }

      // Embedded content all
      Global.AllEmbeddedContent = `${Global.VideoSources}, ${Global.AudioSources}, ${Global.VisualizationSources}`;
    }

    /* **************** */
    /* Initialize Roots */
    /* **************** */
    const Root = {};
    function initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots) {
      Root.areaToCheck = [];
      Root.Readability = [];

      // If fixed roots provided.
      if (fixedRoots) {
        Root.areaToCheck = fixedRoots;
        Root.Readability = fixedRoots;
        return;
      }

      /* Main target area */
      try {
        // Iterate through each selector passed, and push valid ones to final root array.
        const roots = document.querySelectorAll(desiredRoot);
        if (roots.length > 0) {
          roots.forEach((root) => {
            Constants.Root.areaToCheck.push(root);
          });
        } else {
          console.error(`Sa11y: The target root (${desiredRoot}) does not exist.`);
        }
      } catch {
        Root.areaToCheck.length = 0;
      }

      // Push a visible UI alert if not headless and no roots at all are found.
      if (Root.areaToCheck.length === 0 && Global.headless === false) {
        createAlert(Lang.sprintf('MISSING_ROOT', desiredRoot));
        Root.areaToCheck.push(document.body);
      }

      /* Readability target area */
      try {
        const roots = document.querySelectorAll(desiredReadabilityRoot);
        if (roots.length > 0) {
          roots.forEach((root) => {
            Constants.Root.Readability.push(root);
          });
        } else {
          console.error(`Sa11y: The target readability root (${desiredReadabilityRoot}) does not exist.`);
        }
      } catch {
        Root.Readability.length = 0;
      }

      if (Root.Readability.length === 0 && Global.headless === false) {
        if (Root.areaToCheck.length === 0) {
          Root.Readability.push(document.body);
        } else {
          // If desired root area is not found, use the root target area.
          Root.Readability = Root.areaToCheck;

          // Create a warning if the desired readability root is not found.
          setTimeout(() => {
            const { readabilityDetails, readabilityToggle } = Constants.Panel;
            const readabilityOn = readabilityToggle?.getAttribute('aria-pressed') === 'true';
            const alert = Constants.Panel.readability.querySelector('#readability-alert');
            if (readabilityDetails && readabilityOn && !alert) {
              // Roots that readability will be based on.
              const roots = Root.areaToCheck.map((el) => {
                if (el.id) return `#${el.id}`;
                if (el.className) return `.${el.className.split(/\s+/).filter(Boolean).join('.')}`;
                return el.tagName.toLowerCase();
              }).join(', ');

              // Append note to Readability panel.
              const note = document.createElement('div');
              note.id = 'readability-alert';
              note.innerHTML = `<hr><p>${Lang.sprintf('MISSING_READABILITY_ROOT', roots, desiredReadabilityRoot)}</p>`;
              readabilityDetails.insertAdjacentElement('afterend', note);
            }
          }, 100);
        }
      }
    }

    /* *************** */
    /* Panel constants */
    /* *************** */
    const Panel = {};
    function initializePanelSelectors() {
      const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;

      Panel.panel = Sa11yPanel.getElementById('panel');
      Panel.content = Sa11yPanel.getElementById('panel-content');
      Panel.controls = Sa11yPanel.getElementById('panel-controls');

      Panel.outline = Sa11yPanel.getElementById('outline-panel');
      Panel.outlineContent = Sa11yPanel.getElementById('outline-content');
      Panel.outlineList = Sa11yPanel.getElementById('outline-list');
      Panel.outlineHeader = Sa11yPanel.getElementById('outline-header');

      Panel.images = Sa11yPanel.getElementById('images-panel');
      Panel.imagesContent = Sa11yPanel.getElementById('images-content');
      Panel.imagesList = Sa11yPanel.getElementById('images-list');
      Panel.imagesHeader = Sa11yPanel.getElementById('images-header');

      Panel.notifBadge = Sa11yPanel.getElementById('notification-badge');
      Panel.notifCount = Sa11yPanel.getElementById('notification-count');
      Panel.notifText = Sa11yPanel.getElementById('notification-text');
      Panel.status = Sa11yPanel.getElementById('status');

      // Page Issues
      Panel.pageIssues = Sa11yPanel.getElementById('page-issues');
      Panel.pageIssuesList = Sa11yPanel.getElementById('page-issues-list');
      Panel.pageIssuesHeader = Sa11yPanel.getElementById('page-issues-header');
      Panel.pageIssuesContent = Sa11yPanel.getElementById('page-issues-content');

      // Settings panel
      Panel.settings = Sa11yPanel.getElementById('settings-panel');
      Panel.settingsHeader = Sa11yPanel.getElementById('settings-header');
      Panel.settingsContent = Sa11yPanel.getElementById('settings-content');

      // Settings toggles
      Panel.developerToggle = Sa11yPanel.getElementById('developer-toggle');
      Panel.readabilityToggle = Sa11yPanel.getElementById('readability-toggle');
      Panel.themeToggle = Sa11yPanel.getElementById('theme-toggle');
      Panel.developerItem = Sa11yPanel.getElementById('developer-item');
      Panel.readabilityItem = Sa11yPanel.getElementById('readability-item');
      Panel.darkModeItem = Sa11yPanel.getElementById('dark-mode-item');
      Panel.colourPanel = Sa11yPanel.getElementById('panel-colour-filters');
      Panel.colourFilterItem = Sa11yPanel.getElementById('colour-filter-item');
      Panel.colourFilterSelect = Sa11yPanel.getElementById('colour-filter-select');
      Panel.colourFilterIcon = Sa11yPanel.getElementById('filter-icon');

      // Buttons
      Panel.toggle = Sa11yPanel.getElementById('toggle');
      Panel.outlineToggle = Sa11yPanel.getElementById('outline-toggle');
      Panel.imagesToggle = Sa11yPanel.getElementById('images-toggle');
      Panel.settingsToggle = Sa11yPanel.getElementById('settings-toggle');
      Panel.movePanelToggle = Sa11yPanel.getElementById('move-panel');
      Panel.skipButton = Sa11yPanel.getElementById('skip-button');
      Panel.dismissButton = Sa11yPanel.getElementById('dismiss-button');
      Panel.dismissTooltip = Sa11yPanel.getElementById('dismiss-tooltip');
      Panel.skipToPageIssues = Sa11yPanel.getElementById('skip-to-page-issues');
      Panel.exportHTML = Sa11yPanel.getElementById('export-html');
      Panel.exportCSV = Sa11yPanel.getElementById('export-csv');

      // Alerts
      Panel.alert = Sa11yPanel.getElementById('panel-alert');
      Panel.alertText = Sa11yPanel.getElementById('panel-alert-text');
      Panel.alertPreview = Sa11yPanel.getElementById('panel-alert-preview');
      Panel.alertClose = Sa11yPanel.getElementById('close-alert');

      // Readability
      Panel.readability = Sa11yPanel.getElementById('readability-panel');
      Panel.readabilityInfo = Sa11yPanel.getElementById('readability-info');
      Panel.readabilityDetails = Sa11yPanel.getElementById('readability-details');
    }

    /* ***************** */
    /* Readability Setup */
    /* ***************** */
    const Readability = {};
    function initializeReadability(option) {
      if (option.readabilityPlugin) {
        // Set `readabilityLang` property based on language file.
        Readability.Lang = Lang._('LANG_CODE').substring(0, 2);

        // Supported readability languages.
        const supported = [
          'en',
          'fr',
          'es',
          'de',
          'nl',
          'it',
          'sv',
          'fi',
          'da',
          'no',
          'nb',
          'nn',
          'pt',
        ];

        // Turn off readability if page language is not defined.
        const pageLang = Constants.Global.html.getAttribute('lang');
        if (!pageLang) {
          Readability.Plugin = false;
        } else {
          // Turn off readability if page language is not supported.
          const pageLangLowerCase = pageLang.toLowerCase().substring(0, 2);
          if (!supported.includes(pageLangLowerCase) || !supported.includes(Readability.Lang)) {
            Readability.Plugin = false;
          } else {
            Readability.Plugin = true;
          }
        }
      }
    }

    /* **************** */
    /* Exclusions Setup */
    /* **************** */
    const Exclusions = {};
    function initializeExclusions(option) {
      // List of Sa11y's interface components.
      Exclusions.Sa11yElements = ['sa11y-heading-label', 'sa11y-heading-anchor', 'sa11y-annotation', 'sa11y-tooltips', 'sa11y-panel-tooltips', 'sa11y-control-panel', '#sa11y-colour-filters', '#sa11y-colour-filters *'];

      // Global elements to exclude.
      const exclusions = ['style', 'script', 'noscript'];

      // Main container exclusions.
      Exclusions.Container = ['#wpadminbar', '#wpadminbar *', ...exclusions];
      if (option.containerIgnore) {
        const containerSelectors = option.containerIgnore.split(',').map((item) => item.trim());
        Exclusions.Container = Exclusions.Container.concat(
          containerSelectors.flatMap((item) => [`${item} *`, item]),
        );
      }

      // Contrast exclusions
      Exclusions.Contrast = ['link', 'hr', 'option', 'audio', 'audio *', 'video', 'video *', 'input[type="color"]', 'input[type="range"]', 'progress', 'progress *', 'meter', 'meter *', 'iframe', 'svg title', 'svg desc', ...exclusions];
      if (option.contrastIgnore) {
        Exclusions.Contrast = option.contrastIgnore
          .split(',')
          .map(($el) => $el.trim())
          .flatMap(($el) => [$el, `${$el} *`])
          .concat(Exclusions.Contrast);
      }

      // Ignore specific regions for readability module.
      Exclusions.Readability = ['nav li', '[role="navigation"] li', ...exclusions];
      if (option.readabilityIgnore) {
        Exclusions.Readability = option.readabilityIgnore
          .split(',')
          .map(($el) => $el.trim())
          .flatMap(($el) => [$el, `${$el} *`])
          .concat(Exclusions.Readability);
      }

      // Ignore specific headings.
      Exclusions.Headings = option.headerIgnore
        ? option.headerIgnore.split(',').map(($el) => $el.trim())
        : [];

      // Ignore specific classes within headings.
      Exclusions.HeaderSpan = option.headerIgnoreSpan
        ? option.headerIgnoreSpan.split(',').map(($el) => $el.trim())
        : [];

      // Don't add heading label or include in panel.
      Exclusions.Outline = option.outlineIgnore
        ? option.outlineIgnore.split(',').map(($el) => $el.trim())
        : [];

      // Ignore specific images.
      Exclusions.Images = ['img[role="presentation"]:not(a img[role="presentation"]), img[aria-hidden="true"]:not(a img[aria-hidden="true"])'];
      if (option.imageIgnore) {
        Exclusions.Images = option.imageIgnore.split(',').map(($el) => $el.trim()).concat(Exclusions.Images);
      }

      // Ignore specific links
      Exclusions.Links = ['.anchorjs-link'];
      if (option.linkIgnore) {
        Exclusions.Links = option.linkIgnore.split(',').map(($el) => $el.trim()).concat(Exclusions.Links);
      }

      // Ignore specific classes within links.
      Exclusions.LinkSpan = option.linkIgnoreSpan
        ? option.linkIgnoreSpan.split(',').map(($el) => $el.trim())
        : [];
    }

    return {
      initializeRoot,
      Root,
      initializeGlobal,
      Global,
      initializePanelSelectors,
      Panel,
      initializeReadability,
      Readability,
      initializeExclusions,
      Exclusions,
    };
  }());

  /* eslint-disable no-continue */

  /* Get text content of pseudo elements. */
  const wrapPseudoContent = (element, string) => {
    const getAltText = (content) => {
      if (content === 'none') return '';
      const match = content.includes('url(') || content.includes('image-set(')
        ? content.match(/\/\s*"([^"]+)"/) // Content after slash, e.g. url('image.jpg') / "alt text";
        : content.match(/"([^"]+)"/); // Content between quotes, e.g. "alt text";
      return match ? match[1] : '';
    };
    const before = getAltText(window.getComputedStyle(element, ':before').getPropertyValue('content'));
    const after = getAltText(window.getComputedStyle(element, ':after').getPropertyValue('content'));
    return `${before}${string}${after}`;
  };

  /* Sets treeWalker loop to last node before next branch. */
  const nextTreeBranch = (tree) => {
    for (let i = 0; i < 1000; i++) {
      if (tree.nextSibling()) {
        // Prepare for continue to advance.
        return tree.previousNode();
      }
      // Next node will be in next branch.
      if (!tree.parentNode()) {
        return false;
      }
    }
    return false;
  };

  /* Compute ARIA attributes. */
  const computeAriaLabel = (element, recursing = false) => {
    // Ignore ARIA on these elements.
    if (Constants.Global.ignoreAriaOnElements && element.matches(Constants.Global.ignoreAriaOnElements)) {
      return 'noAria';
    }

    if (Constants.Global.ignoreTextInElements && element.matches(Constants.Global.ignoreTextInElements)) {
      return '';
    }

    const labelledBy = element.getAttribute('aria-labelledby');
    if (!recursing && labelledBy) {
      return labelledBy
        .split(/\s+/)
        .filter((id) => id.trim()) // Exclude empty IDs.
        .map((id) => {
          const targetElement = document.querySelector(`#${CSS.escape(id)}`);
          return targetElement ? computeAccessibleName(targetElement, '', 1) : '';
        }).join(' ');
    }

    const { ariaLabel } = element;
    if (ariaLabel && ariaLabel.trim().length > 0) {
      return ariaLabel;
    }
    return 'noAria';
  };

  /**
   * Compute the accessible name of an element.
   * Implements a subset of the W3C Accessible Name algorithm.
   * Based on John Jameson’s Editoria11y library.
   *
   * @param {Element} element Target element.
   * @param {string[]} exclusions CSS selectors to ignore.
   * @param {number} recursing Recursion depth.
   * @returns {string} Accessible name.
   */
  const computeAccessibleName = (element, exclusions = [], recursing = 0) => {
    // Return immediately if there is an aria label.
    const ariaLabel = computeAriaLabel(element, recursing);
    if (ariaLabel !== 'noAria') return ariaLabel;

    // Return immediately if there is only a text node.
    let computedText = '';
    if (!element.children.length) {
      computedText = wrapPseudoContent(element, element.textContent);
      if (!computedText.trim() && element.hasAttribute('title')) {
        return element.getAttribute('title');
      }
      return computedText;
    }

    // Create tree walker object.
    function createTreeWalker(root, showElement, showText) {
      const acceptNode = (node) => {
        if (showElement && node.nodeType === Node.ELEMENT_NODE) return NodeFilter.FILTER_ACCEPT;
        if (showText && node.nodeType === Node.TEXT_NODE) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_REJECT;
      };
      return document.createTreeWalker(root, NodeFilter.SHOW_ALL, { acceptNode });
    }
    const treeWalker = createTreeWalker(element, true, true);

    // Exclusions
    const alwaysExclude = ['noscript', 'style', 'script', 'video', 'audio'];
    const excludeSelector = [...exclusions, ...alwaysExclude].join(', ');
    const exclude = excludeSelector ? element.querySelectorAll(excludeSelector) : [];

    // Recurse into children.
    let addTitleIfNoName = false;
    let aText = false;
    let count = 0;
    let continueWalker = true;

    while (treeWalker.nextNode() && continueWalker) {
      count += 1;
      const node = treeWalker.currentNode;
      const excluded = Array.from(exclude).some((ex) => ex.contains(node));

      // Matches exclusion.
      if (excluded) {
        continue;
      }

      // Inner nodes with shadowRoots.
      if (node.shadowRoot) {
        const shadowChildren = node.shadowRoot.querySelectorAll('*');
        for (let i = 0; i < shadowChildren.length; i++) {
          const child = shadowChildren[i];
          if (!excludeSelector || !child.closest(excludeSelector)) {
            computedText += computeAccessibleName(child, exclusions, recursing + 1);
          }
        }
      }

      // Return text from text nodes.
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.parentNode.tagName !== 'SLOT') {
          computedText += ` ${node.nodeValue}`;
        }
        continue;
      }

      if (addTitleIfNoName && !node.closest('a')) {
        if (aText === computedText) computedText += addTitleIfNoName;
        addTitleIfNoName = false;
        aText = false;
      }

      if (node.ariaHidden === 'true' && !(recursing && count < 3)) {
        if (!nextTreeBranch(treeWalker)) continueWalker = false;
        continue;
      }

      const aria = computeAriaLabel(node, recursing);
      if (aria !== 'noAria') {
        computedText += ` ${aria}`;
        if (!nextTreeBranch(treeWalker)) continueWalker = false;
        continue;
      }

      switch (node.tagName) {
        case 'IMG':
          if (node.hasAttribute('alt') && node.role !== 'presentation') {
            computedText += node.getAttribute('alt');
          }
          break;
        case 'SVG':
          if (node.role === 'img' || node.role === 'graphics-document') {
            computedText += computeAriaLabel(node);
          } else {
            const title = node.querySelector('title');
            if (title) computedText += title.textContent;
          }
          break;
        case 'A':
          if (node.hasAttribute('title')) {
            addTitleIfNoName = node.getAttribute('title');
            aText = computedText;
          } else {
            addTitleIfNoName = false;
            aText = false;
          }
          computedText += wrapPseudoContent(node, '');
          break;
        case 'INPUT':
          computedText += wrapPseudoContent(treeWalker.currentNode, '');
          if (treeWalker.currentNode.hasAttribute('title')) {
            addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
          }
          break;
        case 'SLOT': {
          const children = node.assignedNodes?.() || [];
          let slotText = '';
          children.forEach((child) => {
            if (child.nodeType === Node.ELEMENT_NODE) {
              slotText += computeAccessibleName(child);
            } else if (child.nodeType === Node.TEXT_NODE) {
              slotText += child.nodeValue;
            }
          });
          computedText += slotText;
          computedText += wrapPseudoContent(node, '');
          break;
        }
        default:
          computedText += wrapPseudoContent(node, '');
          break;
      }
    }

    if (addTitleIfNoName && !aText) {
      computedText += ` ${addTitleIfNoName}`;
    }

    // Replace Private Use Area (PUA) unicode characters.
    // https://www.unicode.org/faq/private_use.html
    computedText = computedText.replace(/[\uE000-\uF8FF]/gu, '');

    // If computedText returns blank, fallback on title attribute.
    if (!computedText.trim() && element.hasAttribute('title')) {
      return element.getAttribute('title');
    }

    return computedText;
  };

  /**
   * Finds elements in the DOM that match the given selector, within the specified root element, and excluding any specified elements.
   * @param {string} selector - The CSS selector to match elements against.
   * @param {string} desiredRoot - The root element to start the search from. Can be one of 'document', 'root', or a custom selector for the desired root element.
   * @param {string} exclude - Elements to exclude from the search, specified as a CSS selector (optional).
   * @returns {Array} - An array of elements that match the given selector.
   * @credits Logic yoinked from Editoria11y.
   */
  function find(selector, desiredRoot, exclude) {
    const root = [];
    if (desiredRoot === 'document') {
      root.push(document.body);
      if (Constants.Global.fixedRoots) root.push(Constants.Global.fixedRoots);
    } else if (desiredRoot === 'root') {
      root.push(Constants.Root.areaToCheck);
    } else {
      root.push(document.querySelectorAll(desiredRoot));
    }

    // Exclusions are returned as an array & need to become a string for selector.
    const exclusions = Constants.Exclusions.Container.join(', ');
    const additionalExclusions = exclude?.join(', ') || '';

    // Ensure no trailing commas.
    const additional = additionalExclusions ? `, ${additionalExclusions}` : '';

    let list = [];
    root.flat().filter(Boolean)?.forEach((r) => {
      const shadowComponents = r?.querySelectorAll('[data-sa11y-has-shadow-root]');
      const shadow = shadowComponents ? ', [data-sa11y-has-shadow-root]' : '';

      // 1. Elements array includes web components in the selector to be used as a placeholder.
      const elements = Array.from(r.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`));
      if (shadowComponents.length) {
        // 2. Dive into each shadow root and collect an array of its results.
        const shadowFind = [];
        elements.forEach((el, i) => {
          if (el && el.matches && el.matches('[data-sa11y-has-shadow-root]') && el.shadowRoot) {
            shadowFind[i] = el.shadowRoot.querySelectorAll(`:is(${selector}):not(${exclusions}${additional})`);
          }
        });
        // 3. Replace the placeholder with any hits found in the shadow root.
        if (shadowFind.length > 0) {
          for (let index = shadowFind.length - 1; index >= 0; index--) {
            if (shadowFind[index]) {
              elements.splice(index, 1, ...shadowFind[index]);
            }
          }
        }
      }
      list = list.concat(elements.filter((node) => node.parentNode.tagName !== 'SLOT'));
    });

    // 4. Return the cleaned up array, filtering out <slot> placeholders.
    return list;
  }

  /**
   * Checks if the document has finished loading, and if so, immediately calls the provided callback function. Otherwise, waits for the 'load' event to fire and then calls the callback function.
   * @param {function} callback The callback function to be called when the document finishes loading.
   */
  function documentLoadingCheck(callback) {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  }

  /**
   * Determine whether an element is visually hidden (e.g. .sr-only) based on computed properties.
   * @param {HTMLElement} element The element to check for.
   * @returns {boolean} Returns true if visually hidden based on properties.
   */
  function isScreenReaderOnly(element) {
    const style = getComputedStyle(element);

    // Modern technique: clip-path inset(50%).
    if (style.getPropertyValue('clip-path').startsWith('inset(50%)')) return true;

    // Legacy clipping.
    if (style.clip === 'rect(1px, 1px, 1px, 1px)'
      || style.clip === 'rect(0px, 0px, 0px, 0px)') return true;

    // Large text-indent offscreen.
    const indent = parseInt(style.textIndent, 10);
    if (!Number.isNaN(indent) && Math.abs(indent) > 5000) return true;

    // Tiny box offscreen.
    if (style.overflow === 'hidden'
      && parseFloat(style.width) < 2 && parseFloat(style.height) < 2) return true;

    // Absolute positioned far offscreen.
    if (style.position === 'absolute'
      && ['left', 'right', 'top', 'bottom'].some((p) => Math.abs(parseInt(style[p], 10)) > 5000)) return true;

    // Font size 1px or 0px.
    return parseFloat(style.fontSize) < 2;
  }

  /**
   * Checks if an element is hidden (display: none) based on its attributes and styles.
   * @param {HTMLElement} element The element to check for visibility.
   * @returns {boolean} 'true' if the element is hidden (display: none).
   */
  function isElementHidden(element) {
    return element.hidden || getComputedStyle(element).getPropertyValue('display') === 'none';
  }

  /**
   * Checks if an element is invisible in layout.
   * @param {HTMLElement} element The element to check for visibility.
   * @returns {boolean} `true` if the element is visually hidden or hidden, `false` otherwise.
   */
  function isElementVisuallyHiddenOrHidden(element) {
    if ((element.offsetWidth === 0 && element.offsetHeight === 0)
      || (element.clientHeight === 1 && element.clientWidth === 1)) return true;
    return isElementHidden(element);
  }

  /**
   * Escapes HTML special characters in a string.
   * @param {string} string The string to escape.
   * @returns {string} The escaped string with HTML special characters replaced by their corresponding entities.
   */
  function escapeHTML(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML.replaceAll('"', '&quot;').replaceAll("'", '&#039;').replaceAll('`', '&#x60;');
  }

  /**
   * Sanitizes an HTML string by replacing special characters with their corresponding HTML entities.
   * @param {string} string The HTML string to sanitize.
   * @returns {string} The sanitized HTML string with special characters replaced by their corresponding entities.
   * @link https://portswigger.net/web-security/cross-site-scripting/preventing
   */
  function sanitizeHTML(string) {
    return string.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
  }

  /**
   * Sanitizes HTML by removing script tags, inline event handlers and any dangerous attributes. It returns a clean version of the HTML string.
   * @param {string} html The HTML string to sanitize.
   * @param {Boolean} allowStyles Preserve inline style attributes.
   * @returns {string} The sanitized HTML string.
   */
  function sanitizeHTMLBlock(html, allowStyles = false) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Remove blocks.
    ['script', 'style', 'noscript', 'iframe', 'form'].forEach((tag) => {
      const elements = tempDiv.getElementsByTagName(tag);
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    });

    // Remove inline event handlers and dangerous attributes.
    const allElements = Array.from(tempDiv.getElementsByTagName('*'));
    allElements.forEach((element) => {
      Array.from(element.attributes).forEach((attr) => {
        if (attr.name.startsWith('on')) element.removeAttribute(attr.name);
      });
      if (!allowStyles) {
        element.removeAttribute('style');
      }
    });
    return tempDiv.innerHTML;
  }

  /**
   * Creates a clone of an element while ignoring specified elements or elements matching a selector.
   * Ignored by default: ['noscript', 'script', 'style', 'audio', 'video', 'form', 'iframe']
   * @param {Element} element The element to clone.
   * @param {Array[]} selectors The selector to match elements to be excluded from the clone. Optional.
   * @returns {Element} The cloned element with excluded elements removed.
   */
  function fnIgnore(element, selectors = []) {
    const defaultIgnored = ['noscript', 'script', 'style', 'audio', 'video', 'form', 'iframe'];
    const ignore = [...defaultIgnored, ...selectors].join(', ');
    const clone = element.cloneNode(true);
    const exclude = Array.from(clone.querySelectorAll(ignore));
    exclude.forEach(($el) => {
      $el.parentElement.removeChild($el);
    });
    return clone;
  }

  /**
   * Retrieves the text content of an HTML element and removes extra whitespaces and line breaks.
   * @param {HTMLElement} element The HTML element to retrieve the text content from.
   * @returns {string} The text content of the HTML element with extra whitespaces and line breaks removed.
   */
  function getText(element) {
    const ignore = fnIgnore(element);
    return ignore.textContent.replace(/[\r\n]+/g, '').replace(/\s+/g, ' ').trim();
  }

  /**
   * Removes extra whitespaces and line breaks from a string.
   * @param {string} string The string.
   * @returns {string} String with line breaks and extra white space removed.
   */
  function removeWhitespace(string) {
    return string.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  /**
   * Truncate string.
   * @param {*} string The string to truncate.
   * @param {*} maxLength Desired max length of string.
   * @returns Truncated string.
   */
  function truncateString(string, maxLength) {
    const truncatedString = string.substring(0, maxLength).trimEnd();
    return string.length > maxLength ? `${truncatedString}...` : string;
  }

  /**
   * A utility object for handling storage operations using localStorage and sessionStorage.
   * @param  {String} key
   * @param  {string} value
   * @return {String} Return key.
  */
  const store = {
    getItem(key) {
      try {
        if (localStorage.getItem(key) === null) {
          return sessionStorage.getItem(key);
        }
        return localStorage.getItem(key);
      } catch (error) {
        // Cookies totally disabled.
        return false;
      }
    },
    setItem(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        sessionStorage.setItem(key, value);
      }
      return true;
    },
    removeItem(key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        sessionStorage.removeItem(key);
      }
      return true;
    },
  };

  /**
   * Generates a unique key for dismissing items.
   * @param {string} string The string to be prepared for dismissal (without special chars).
   * @returns {string} The truncated string with a maximum of 256 characters.
   */
  function prepareDismissal(string) {
    return String(string).replace(/([^0-9a-zA-Z])/g, '').substring(0, 256);
  }

  /**
   * Removes the specified elements from the document.
   * @param {string} root The root element to search for elements (optional, defaults to 'document').
   * @returns {void}
   */
  function remove(elements, root) {
    const allElements = find(
      `${elements}`,
      `${root}`,
    );
    allElements.forEach(($el) => {
      $el?.parentNode?.removeChild($el);
    });
  }

  /**
   * Get the best image source from an element, considering data-src, srcset, and src attributes.
   * @param {HTMLElement} element - The image element to extract the source from.
   * @returns {string} - The best available source URL.
   */
  function getBestImageSource(element) {
    const getLastSrc = (src) => src?.split(/,\s+/).pop()?.trim()?.split(/\s+/)[0];

    // Return absolute URLs. Necessary for HTML export.
    const resolveUrl = (src) => (src ? new URL(src, window.location.href).href : null);

    const dataSrc = getLastSrc(element.getAttribute('data-src') || element.getAttribute('srcset'));
    if (dataSrc) return resolveUrl(dataSrc);

    const picture = element.closest('picture')?.querySelector('source[srcset]')?.getAttribute('srcset');
    const pictureSrc = getLastSrc(picture);

    if (pictureSrc) return resolveUrl(pictureSrc);
    return resolveUrl(element.getAttribute('src'));
  }

  /**
   * Check if an element's visible text is included in the accessible name.
   * To minimize false positives: iterate through all child nodes of the element, checking for visibility.
   * @param {element} $el The element to test.
   * @returns {boolean}
   */
  function isVisibleTextInAccessibleName($el) {
    let text = '';
    const accName = computeAccessibleName($el).toLowerCase();
    const nodes = $el.childNodes;
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Only return text content if it's not hidden.
        if (!isElementVisuallyHiddenOrHidden(node)) {
          text += node.textContent;
        }
      }
    });

    // Ignore emojis.
    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
    let visibleText = text.replace(emojiRegex, '');

    // Final visible text.
    visibleText = removeWhitespace(visibleText).toLowerCase();

    // If visible text is just an x character, ignore.
    if (visibleText === 'x') {
      return false;
    }

    // Check if visible text is included in accessible name.
    return visibleText.length !== 0 && !accName.includes(visibleText);
  }

  /**
   * Standardize the href attribute of a link by removing any trailing slashes and stripping the protocol (http, https) and 'www.' prefix. Used to minimize false positives for link check module.
   * @param {HTMLElement} $el - The element from which to retrieve the href attribute.
   * @returns {string} - The standardized href.
   */
  function standardizeHref($el) {
    let href = $el.getAttribute('href');
    href = removeWhitespace(href).toLowerCase();

    // Remove trailing slash if it exists.
    if (href.endsWith('/')) href = href.slice(0, -1);

    // Remove protocol and www., without affecting subdomains.
    href = href.replace(/^https?:\/\/(www\.)?/, '');

    // Remove common file extensions at the end.
    href = href.replace(/\.(html|php|htm|asp|aspx)$/i, '');

    return href;
  }

  /* Track values and DOM references */

  const State = {
    version: '3.0.0',
  	english: true,
    running: false,
    watching: [],
    seen: [],
    ignore: '',
    ignoreAll: false,
    totalCount: 1,
    warningCount: 1,
    errorCount: 1,
    dismissedCount: 1,
    dismissedAlerts: {},
    activeRange: false,
  	inlineAlerts: false,
    incremental: false,
    interaction: false,
    forceFullCheck: false,
    browserSpeed: 1,
    browserLag: 1,
  	customTestsRemaining: 0,
  	customTestTimeout: 0,
    loopStop: false,
    oldResults: [],
  	roots: [],
  	headingOutline: [],
  	headingOutlineOverrides: [],
    elements: { // to be replaced by Sa11y find.
      altMark: [],
      delayedReset: []
    },
  	splitConfiguration: {
  		active: false,
  		checks: [],
  		results: [],
  		showOptions: {},
  		syncOptions: {},
  	},

    /* Panel initial state */
    once: false,
    disabled: false,
    onLoad: true,
    open: false,
    showPanel: false,
  	showDismissed: false,
    nextText: '',
    panelAttachTo: document.body,
  	visualizing: false,

    /* Annotations initial states */
    jumpList: [],
    lastOpenTip: Number -1,
    viaJump: false,
    toggledFrom: false,
    scrollPending: 0,
    scrollTicking: false,
  	tipOpen: false,
    openTip: {
      button: {},
      tip: {},
    },
    positionedFrames: [],
    recentlyAddedNodes: new WeakMap,
  };

  const Theme = {};

  const UI = {
    editableHighlight: [],
    imageAlts: [],
    attachCSS: ()=>{},
    panel: false,
    message: {},
    panelElement: {},
    panelNoCover: [],
    panelToggle: {},
    panelToggleTitle: {},
    panelCount: {},
    panelJumpNext: {},
    panelShowDismissed: {},
  };

  const Results = [];

  const Options = {
  	// Default options.

  	// Sa11y properties =======================

  	// Target area to check
  	checkRoot: false, // Editoria11y uses "checkRoots" below.
  	fixedRoots: false, // Array of specific nodes, overrides previous.

  	// Exclusions
  	containerIgnore: '',
  	contrastIgnore: '.sr-only',
  	outlineIgnore: '',
  	headerIgnore: '',
  	headerIgnoreSpan: 'ed11y-element-heading-label',
  	headerIgnoreStrings: '',
  	imageIgnore: 'img[aria-hidden], [aria-hidden] img, ' +
  		'img[role="presentation"], ' +
  		'a[href][aria-label] img, button[aria-label] img, ' +
  		'a[href][aria-labelledby] img, button[aria-labelledby] img',
  	linkIgnore: '[aria-hidden][tabindex="-1"]',
  	linkIgnoreSpan: '.ed11y-element',
  	linkIgnoreStrings: '',
  	ignoreContentOutsideRoots: false, // @todo cms was headingsOnlyFromCheckRoots

  	// Control panel settings
  	// aboutContent: '', // @todo use?
  	panelPosition: 'right', // @todo use?
  	// showMovePanelToggle: true,
  	// checkAllHideToggles: false,
  	developerChecksOnByDefault: false, // @todo cms use?

  	// Page outline
  	showHinPageOutline: false,
  	showTitleInPageOutline: false,

  	// Image outline
  	showImageOutline: true,
  	editImageURLofCMS: '',
  	relativePathImageSRC: '',
  	relativePathImageID: '',
  	ignoreEditImageURL: [],
  	ignoreEditImageClass: [],

  	// Other features
  	delayCheck: 0,
  	delayCustomCheck: 500,
  	detectSPArouting: false,
  	doNotRun: '',
  	headless: false,
  	selectorPath: false,
  	shadowComponents: '',
  	autoDetectShadowComponents: false,

  	// Annotations
  	showGoodImageButton: true,
  	showGoodLinkButton: true,
  	dismissAnnotations: true,
  	dismissAll: true,
  	ignoreHiddenOverflow: '',
  	insertAnnotationBefore: '',

  	// Readability
  	readabilityPlugin: false,
  	readabilityRoot: 'main',
  	readabilityIgnore: '',

  	// Contrast
  	contrastPlugin: false,
  	contrastAAA: false,
  	contrastAPCA: false,

  	// Other plugins
  	customChecks: false,
  	linksAdvancedPlugin: true,
  	formLabelsPlugin: true, // @todo pro
  	embeddedContentPlugin: true,
  	developerPlugin: false, // @todo pro
  	externalDeveloperChecks: false, // @todo pro
  	colourFilterPlugin: false, // @todo pro
  	exportResultsPlugin: false,

  	// Options for accName computation: Ignore ARIA on these elements.
  	ignoreAriaOnElements: false, // e.g. 'h1,h2,h3,h4,h5,h6'
  	ignoreTextInElements: false, // e.g. '.inner-node-hidden-in-CSS'

  	// Shared properties for some checks
  	// Shared properties for some checks
  	susAltStopWords: '',
  	linkStopWords: '',
  	extraPlaceholderStopWords: '',
  	imageWithinLightbox: '',
  	initialHeadingLevel: [],
  	// @todo merge discuss: how to handle this functionality.
  	// Sets previous heading level for contentEditable fields.
  	// With 'ignore' set, first heading level is ignored in editable zones.
  	// This is ideal for systems with separate backend editing pages.
  	// Set to 'inherit' for fields edited in a frontend context.
  	/*
  	[
  		{
  			selector: '.example-inherit',
  			previousHeading: 'inherit',
  		},
  		{
  			selector: '.example-l3',
  			previousHeading: 3,
  		},
  	],*/


  	// Editoria11y Only ==============================
  	// checkRoots: false, // todo document change
  	// ignoreElements: '', // todo document change

  	syncOnlyConfiguration: false,
  	/*
  	// List checks and config for reporting results not shown to editors.
  	// If split configuration is set, the check and option keys must be present.
  	syncOnlyConfiguration {
  		checks: [], // Test keys defined below to not be display on page.

  		options: {
  			checkRoot: false,
  			containerIgnore: '',
  			contrastIgnore: '.sr-only',
  			outlineIgnore: '',
  			headerIgnore: '',
  			imageIgnore: '',
  			linkIgnore: '[aria-hidden][tabindex="-1"]',
  		},
  	}
  	*/

  	// Set alertModes:
  	alertMode: 'userPreference',
  	// 'headless': do not draw run
  	// 'userPreference: respect user preference.
  	// 'polite': open for new issues.
  	// 'assertive': open for any issues.
  	// 'active': always open.
  	// CMS integrations can switch between polite & headless at runtime.
  	inlineAlerts: true,
  	watchForChanges: 'checkRoots', // 'document', false, 'checkRoots';

  	// This covers CKEditor, TinyMCE and Gutenberg. Being less specific may help performance.
  	editableContent: '[contenteditable="true"]:not(.gutenberg__editor [contenteditable]), .gutenberg__editor .run-run-skeleton__content',

  	// Dismissed alerts
  	currentPage: window.location.pathname, // uses window.location.pathname unless a string is provided.
  	allowHide: true, // enables end-user ignore button
  	allowOK: true,  // enables end-user mark OK button
  	syncedDismissals: false, // provide empty or populated object {} to enable sync functions
  	reportsURL: false, // Provides a link to site-wide reports
  	showDismissed: false, // start panel with dismissed items visible; used when coming directly from a dashboard

  	// Hide all alerts if these elements are absent, e.g., ".edit-button"
  	// Used to not heckle editors on pages they cannot fix; they can still click a "show hidden" button to check manually.
  	ignoreAllIfAbsent: false,
  	ignoreAllIfPresent: false, // @todo CMS merge dismissal system.

  	// Disable checker altogether if these elements are present or absent, e.g., ".live-editing-toolbar, .frontpage" or ".editable-content"
  	preventCheckingIfPresent: false,
  	preventCheckingIfAbsent: false,

  	// Disable the "is this element visible" check on themes that have 0-height elements.
  	checkVisible: true,

  	// Selector list for elements where the tip opening JS should wait for your theme to modify the DOM or CSS before opening the tip.
  	hiddenHandlers: '',

  	panelOffsetX: '25px',
  	panelOffsetY: '25px',
  	panelNoCover: '', // select other buttons to avoid.
  	panelAttachTo: document.body,

  	// Selector list for elements that hide overflow, truncating buttons.
  	constrainButtons: false,

  	// Interface
  	theme: 'sleekTheme',
  	sleekTheme: {
  		bg: '#eff2ff', // e8f4ff
  		bgHighlight: '#7b1919',
  		text: '#20160c',
  		primary: '#276499', // 276499
  		primaryText: '#eff2ff',
  		button: 'transparent', // deprecate?
  		panelBar: '#1e517c',
  		panelBarText: '#fffdf7',
  		panelBarShadow: '0 0 0 1px #276499',
  		activeTab: '#276499',
  		activeTabText: '#fffffe',
  		focusRing: '#007aff',
  		outlineWidth: '0',
  		borderRadius: '3px',
  		ok: '#1f5381',
  		warning: 'rgb(250, 216, 89)',
  		warningText: '#20160c',
  		alert: 'rgb(184, 5, 25)',
  		alertText: '#f4f7ff',
  	},
  	darkTheme: {
  		bg: '#0a2051',
  		bgHighlight: '#7b1919',
  		text: '#f4f7ff',
  		primary: '#3052a0',
  		primaryText: '#f4f7ff',
  		button: 'transparent',
  		panelBar: '#3052a0',
  		panelBarText: '#f4f7ff',
  		panelBarShadow: 'inset 0 0 1px, 0 0 0 1px #0a2051',
  		activeTab: '#0a2051',
  		activeTabText: '#fffffe',
  		focusRing: 'cyan',
  		outlineWidth: '2px',
  		borderRadius: '3px',
  		ok: '#0a307a',
  		warning: 'rgb(250, 216, 89)',
  		warningText: '#20160c',
  		alert: 'rgb(184, 5, 25)',
  		alertText: '#f4f7ff',
  	},
  	lightTheme: {
  		bg: '#fffffe',
  		bgHighlight: '#7b1919',
  		text: '#20160c',
  		primary: '#0a307a',
  		primaryText: '#fffdf7',
  		panelBar: '#0a307a',
  		panelBarText: '#f4f7ff',
  		panelBarShadow: '0 0 0 1px #0a307a',
  		button: 'transparent',
  		activeTab: '#b9c0cf',
  		activeTabText: '#20160c',
  		focusRing: '#007aff',
  		outlineWidth: '0',
  		borderRadius: '3px',
  		ok: '#0a307a',
  		warning: 'rgb(250, 216, 89)',
  		warningText: '#20160c',
  		alert: 'rgb(184, 5, 25)',
  		alertText: '#f4f7ff',
  	},
  	// Base z-index for buttons.
  	// 1299 maximizes TinyMCE compatibility.
  	buttonZIndex: 1299,
  	// CSS overrides and additions.

  	baseFontSize: 'clamp(14px, 1.5vw, 16px)',
  	baseFontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',

  	// Test customizations
  	embeddedContent: false, // @todo merge replace with custom test.
  	embeddedContentTitle: '',
  	embeddedContentMessage: '',

  	linksUrls: false, // get from language pack
  	linksMeaningless: false, // get from language pack
  	altPlaceholder: '', // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'

  	editLinks: false, // Add links to edit content in tooltips.

  	userPrefersShut: localStorage.getItem('editoria11yShow') === '0',

  	customTests: 0,

  	// Sa11y checks ==================
  	checks: {
  		// Sa11y: Heading checks
  		HEADING_SKIPPED_LEVEL: {
  			type: 'warning',
  		},
  		HEADING_EMPTY_WITH_IMAGE: true,
  		HEADING_EMPTY: true,
  		HEADING_FIRST: true, // @todo CMS migrate to this from the complicated setters.
  		HEADING_LONG: {
  			maxLength: 170,
  		},
  		HEADING_MISSING_ONE: false,

  		// Sa11y: Image checks
  		MISSING_ALT_LINK: true,
  		MISSING_ALT_LINK_HAS_TEXT: true,
  		MISSING_ALT: true,
  		IMAGE_DECORATIVE_CAROUSEL: false, // Todo consider.
  		LINK_IMAGE_NO_ALT_TEXT: {
  			type: 'error',
  		},
  		LINK_IMAGE_TEXT: false, // Not interested.
  		IMAGE_FIGURE_DECORATIVE: {
  			type: 'warning',
  		}, // New
  		IMAGE_DECORATIVE: {
  			type: 'warning',
  		},
  		LINK_ALT_FILE_EXT: true,
  		ALT_FILE_EXT: true,
  		LINK_PLACEHOLDER_ALT: true,
  		ALT_PLACEHOLDER: true,
  		LINK_SUS_ALT: true,
  		SUS_ALT: true,
  		LINK_IMAGE_LONG_ALT: {
  			maxLength: 250,
  		},
  		IMAGE_ALT_TOO_LONG: {
  			maxLength: 250,
  		},
  		LINK_IMAGE_ALT: false, // Not interested.
  		LINK_IMAGE_ALT_AND_TEXT: true,
  		IMAGE_FIGURE_DUPLICATE_ALT: false, // Todo pro.
  		IMAGE_PASS: {
  			dismissAll: true,
  		},
  		ALT_UNPRONOUNCEABLE: true,
  		LINK_ALT_UNPRONOUNCEABLE: true,
  		ALT_MAYBE_BAD: {
  			minLength: 15,
  		},
  		LINK_ALT_MAYBE_BAD: {
  			minLength: 15,
  		},

  		// Sa11y: Link checks
  		DUPLICATE_TITLE: false, // Todo pro.
  		LINK_EMPTY_LABELLEDBY: false, // Todo pro.
  		LINK_EMPTY_NO_LABEL: true,
  		LINK_STOPWORD: {
  			type: 'warning',
  		},
  		LINK_STOPWORD_ARIA: false, // Todo pro.
  		LINK_SYMBOLS: false, // Todo pro.
  		LINK_CLICK_HERE: false,
  		LINK_DOI: false, // Todo consider.
  		LINK_URL: {
  			maxLength: 40,
  		},
  		LINK_LABEL: {
  			dismissAll: true,
  		},
  		LINK_EMPTY: true,
  		LINK_IDENTICAL_NAME: false, // Todo pro.
  		LINK_NEW_TAB: {
  			dismissAll: true,
  		},
  		LINK_FILE_EXT: false, // Todo test vs LinkPurpose.

  		// Form label checks module not yet enabled.
  		// Todo pro.
  		/*
  		LABELS_MISSING_IMAGE_INPUT: true,
  		LABELS_INPUT_RESET: true,
  		LABELS_MISSING_LABEL: true,
  		LABELS_ARIA_LABEL_INPUT: true,
  		LABELS_NO_FOR_ATTRIBUTE: true,
  		LABELS_PLACEHOLDER: true,
  		*/

  		// Embedded content checks
  		EMBED_AUDIO: {
  			sources: '',
  		},
  		EMBED_VIDEO: {
  			sources: '',
  		},
  		EMBED_DATA_VIZ: {
  			sources: '',
  		},
  		EMBED_UNFOCUSABLE: true,
  		EMBED_MISSING_TITLE: {
  			type: 'warning',
  		},
  		EMBED_GENERAL: true,

  		// Quality assurance checks
  		QA_BAD_LINK: {
  			sources: '',
  		},
  		QA_STRONG_ITALICS: false, // Todo pro.
  		QA_IN_PAGE_LINK: false, // Todo pro.
  		QA_DOCUMENT: false, // Todo CMS consider.
  		QA_PDF: {
  			sources: 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']',
  			dismissAll: true,
  		},
  		QA_BLOCKQUOTE: true,
  		TABLES_MISSING_HEADINGS: true,
  		TABLES_SEMANTIC_HEADING: true,
  		TABLES_EMPTY_HEADING: true,
  		QA_FAKE_HEADING: true,
  		QA_FAKE_LIST: true,
  		QA_UPPERCASE: true,
  		QA_UNDERLINE: false, // Todo pro.
  		QA_SUBSCRIPT: false, // Todo pro.
  		QA_NESTED_COMPONENTS: false, // Todo pro.
  		QA_JUSTIFY: false, // Todo pro.
  		QA_SMALL_TEXT: false, // Todo pro.

  		// Sa11y: Meta checks
  		META_LANG: false, // Todo pro.
  		META_SCALABLE: false, // Not interested.
  		META_MAX: false, // Not interested.
  		META_REFRESH: false, // Todo pro.

  		// Sa11y: Developer checks
  		// Todo pro.
  		DUPLICATE_ID: false,
  		META_TITLE: false,
  		UNCONTAINED_LI: false,
  		TABINDEX_ATTR: false,
  		HIDDEN_FOCUSABLE: false,
  		LABEL_IN_NAME: false,
  		BTN_EMPTY: false,
  		BTN_EMPTY_LABELLEDBY: false,
  		BTN_ROLE_IN_NAME: false,


  		// Sa11y: Contrast checks
  		// Todo pro.
  		CONTRAST_WARNING: {
  			dismissAll: true,
  		},
  		CONTRAST_INPUT: true,
  		CONTRAST_ERROR: true,
  		CONTRAST_PLACEHOLDER: true,
  		CONTRAST_PLACEHOLDER_UNSUPPORTED: true,
  		CONTRAST_ERROR_GRAPHIC: true,
  		CONTRAST_WARNING_GRAPHIC: false,
  		CONTRAST_UNSUPPORTED: {
  			dismissAll: true,
  		},

  		// dev
  		HEADING_EXCEEDS_LEVEL: true, // todo merge would need text.
  		EMBED_CUSTOM: {
  			sources: '#embed'
  		},
  	},
  };

  const Elements = (function myElements() {
    const Found = {};
    function initializeElements(option) {
      // Since 4.0.0: For performance, we filter elements instead of dozens of querySelectors on the DOM.
      Found.Everything = find('*', 'root', Constants.Exclusions.Sa11yElements);

      Found.Contrast = Found.Everything.filter(($el) => {
        const matchesSelector = Constants.Exclusions.Contrast.some((exclusion) => $el.matches(exclusion));
        return !matchesSelector && !Constants.Exclusions.Contrast.includes($el);
      });

      Found.Images = Found.Everything.filter(($el) => $el.tagName === 'IMG'
        && !Constants.Exclusions.Images.some((selector) => $el.matches(selector)));

      Found.Links = Found.Everything.filter(($el) => ($el.tagName === 'A' || $el.tagName === 'a')
        && $el.hasAttribute('href')
        && !$el.matches('[role="button"]') // Exclude links with [role="button"]
        && !Constants.Exclusions.Links.some((selector) => $el.matches(selector)));

      // We want headings from the entire document for the Page Outline.
      Found.Headings = find(
        'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
        option.ignoreContentOutsideRoots || option.fixedRoots
          ? 'root' : 'document',
        Constants.Exclusions.Headings,
      );
      Found.HeadingOne = find(
        'h1, [role="heading"][aria-level="1"]',
        option.ignoreContentOutsideRoots || option.fixedRoots
          ? 'root' : 'document',
        Constants.Exclusions.Headings,
      );

      Found.HeadingOverrideStart = new WeakMap();
      Found.HeadingOverrideEnd = new WeakMap();
      if (option.initialHeadingLevel) {
        option.initialHeadingLevel.forEach((section) => {
          const headingsInSection = find(`${section.selector} :is(h1,h2,h3,h4,h5,h6,[aria-role=heading][aria-level])`, option.ignoreContentOutsideRoots || option.fixedRoots
            ? 'root' : 'document', Constants.Exclusions.Headings);
          if (headingsInSection.length > 0) {
            Found.HeadingOverrideStart.set(headingsInSection[0], section.previousHeading);
            Found.HeadingOverrideEnd.set(headingsInSection.pop(), section.previousHeading);
          }
        });
      }

      // Excluded via headerIgnore.
      Found.ExcludedHeadings = Found.Headings.filter((heading) => Constants.Exclusions.Headings.some((exclusion) => heading.matches(exclusion)));

      // Excluded via outlineIgnore.
      Found.ExcludedOutlineHeadings = Found.Headings.filter((heading) => Constants.Exclusions.Outline.some((exclusion) => heading.matches(exclusion)));

      // Merge both headerIgnore and outlineIgnore.
      Found.OutlineIgnore = Elements.Found.ExcludedOutlineHeadings.concat(Elements.Found.ExcludedHeadings);

      // Quality assurance module.
      Found.Paragraphs = Found.Everything.filter(($el) => $el.tagName === 'P'
        && !$el.closest('table'));

      Found.Lists = Found.Everything.filter(($el) => $el.tagName === 'LI');

      Found.Blockquotes = Found.Everything.filter(($el) => $el.tagName === 'BLOCKQUOTE');

      Found.Tables = Found.Everything.filter(($el) => $el.tagName === 'TABLE' && !$el.matches('[role="presentation"]') && !$el.matches('[role="none"]'));

      Found.StrongItalics = Found.Everything.filter(($el) => ['STRONG', 'EM'].includes($el.tagName));

      Found.Subscripts = Found.Everything.filter(($el) => ['SUP', 'SUB'].includes($el.tagName));

      const badLinkSources = option.checks.QA_BAD_LINK.sources;
      Found.CustomErrorLinks = badLinkSources.length
        ? Found.Links.filter(($el) => badLinkSources.split(',').some((selector) => $el.matches(selector.trim()))) : [];

      // Readability.
      const readabilityExclusions = ($el) => Constants.Root.Readability.some((rootEl) => rootEl.contains($el))
        && !Constants.Exclusions.Readability.some((selector) => $el.matches(selector));

      Found.Readability = [
        ...Found.Paragraphs.filter(readabilityExclusions),
        ...Found.Lists.filter(readabilityExclusions),
      ];

      // Developer checks.
      const nestedSources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
      Found.NestedComponents = nestedSources
        ? Found.Everything.filter(($el) => $el.matches(nestedSources)) : [];

      Found.TabIndex = Found.Everything.filter(($el) => $el.hasAttribute('tabindex')
        && $el.getAttribute('tabindex') !== '0'
        && !$el.getAttribute('tabindex').startsWith('-'));

      Found.Svg = Found.Everything.filter(($el) => $el.tagName === 'svg');

      Found.Buttons = Found.Everything.filter(($el) => $el.tagName === 'BUTTON' || $el.matches('[role="button"]'));

      Found.Inputs = Found.Everything.filter(($el) => ['INPUT', 'SELECT', 'TEXTAREA', 'METER', 'PROGRESS'].includes($el.tagName));

      Found.Labels = Found.Everything.filter(($el) => $el.tagName === 'LABEL');

      // iFrames.
      Found.iframes = Found.Everything.filter(($el) => ['IFRAME', 'AUDIO', 'VIDEO'].includes($el.tagName));
      Found.Videos = Found.iframes.filter(($el) => $el.matches(Constants.Global.VideoSources));
      Found.Audio = Found.iframes.filter(($el) => $el.matches(Constants.Global.AudioSources));
      Found.Visualizations = Found.iframes.filter(($el) => $el.matches(Constants.Global.VisualizationSources));
      Found.EmbeddedContent = Found.iframes.filter(($el) => !$el.matches(Constants.Global.AllEmbeddedContent));

      // Query select <HTML> given that the lang may change on an SPA.
      const html = document.querySelector('html');
      Found.Language = html.getAttribute('lang');
    }

    /* ************* */
    /*  Annotations  */
    /* ************* */
    const Annotations = {};
    function initializeAnnotations() {
      Annotations.Array = find('sa11y-annotation', 'document');
      Annotations.Array.forEach((annotation, i) => {
        annotation.setAttribute('data-sa11y-position', i);
      });
    }

    return {
      initializeElements,
      Found,
      initializeAnnotations,
      Annotations,
    };
  }());

  /*
  * Replaces Sa11y finder with one that does not insert CSS.
  * */

  function findShadowComponents(option) {
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

  // Replaces Sa11y error with one that does not attach CSS.

  class ConsoleErrors extends HTMLElement {
  	constructor(error) {
  		super();
  		this.error = error;
  	}

  	connectedCallback() {
  		const shadow = this.attachShadow({ mode: 'open' });

  		// Styles
  //		const style = document.createElement('style');
  //		style.innerHTML = styles + sharedStyles;
  //		shadow.appendChild(style);

  		// Container
  		const content = document.createElement('dialog');
  		content.ariaLabel = Lang._('ERROR');

  		// Google Form & GitHub error link.
  		const url = window.location;
  		const google = 'https://forms.gle/sjzK9XykETaoqZv99';

  		// GitHub template
  		const template = `## Error Description
\`\`\`javascript
${this.error.stack}
\`\`\`

## Details
- **URL:** ${url}
- **Version:** ${State.version}

## Comments
`;
  		const encodedTemplate = encodeURIComponent(template);
  		const github = `https://github.com/ryersondmp/sa11y/issues/new?title=Bug%20report&body=${encodedTemplate}`;

  		// Message
  		content.innerHTML = `
      <button class="close-btn" aria-describedby="ed11y-console-error"><span aria-hidden="true">&times</span> ${Lang._('ALERT_CLOSE')}</button>
      <h2 id="ed11y-console-error">${Lang._('ERROR')}</h2>
      <p>${Lang.sprintf('CONSOLE_ERROR', google, github)}</p>
      <p><strong>${Lang._('DEVELOPER_CHECKS')}:</strong></p>
      <pre>
Version: ${State.version}
URL: ${url}</pre>
  		<p><strong>${Lang._('ERRORS')}:</strong></p>
<pre>${escapeHTML(this.error.stack)}</pre>
    `;
  		shadow.appendChild(content);

  		// Set focus and hide Sa11y's toggle.
  		setTimeout(() => {
  			content.show();
  			// Constants.Panel.toggle.style.display = 'none';
  			const button = content.querySelector('button');
  			button.style.setProperty('padding', '1em;');
  			button.style.setProperty('filter', 'invert(1)');
  			const hiddenItems = content.querySelectorAll('.visually-hidden');
  			hiddenItems?.forEach((hidden) => {
  				hidden.style.setProperty('position', 'absolute');
  				hidden.style.setProperty('width', '1px');
  				hidden.style.setProperty('height', '1px');
  				hidden.style.setProperty('overflow', 'hidden');
  			});
  			const preS = content.querySelectorAll('pre');
  			preS.forEach((pre) => {
  				pre.style.setProperty('margin-left','18px');
  			});
  			//const dialog = container.shadowRoot.getElementById('dialog');
  			//dialog.focus();

  			const close = content.querySelector('.close-btn');
  			close.addEventListener('click', () => {
  				content.close();
  			});
  		}, 0);
  	}
  }

  /*=============== Utilities ================*/

  function getElements(selector, desiredRoot, exclude = Constants.Exclusions.Sa11yElements) {
  	return find(selector, desiredRoot, exclude);
  }

  function findElements (key, selector, rootRestrict = true) {
  	// Legacy support for deprecated code.
  	const desiredRoot = rootRestrict ? 'root' : 'document';
  	Elements.Found[key] = find( selector, desiredRoot, Constants.Exclusions.Sa11yElements );
  }

  function initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots) {
  	Constants.Root.areaToCheck = [];
  	Constants.Root.Readability = [];

  	// If fixed roots provided.
  	if (fixedRoots) {
  		Constants.Root.areaToCheck = fixedRoots;
  		Constants.Root.Readability = fixedRoots;
  		return;
  	}

  	/* Main target area */
  	try {
  		// Iterate through each selector passed, and push valid ones to final root array.
  		const roots = document.querySelectorAll(desiredRoot);
  		if (roots.length > 0) {
  			roots.forEach((root) => {
  				Constants.Root.areaToCheck.push(root);
  			});
  		}
  		else {
  			console.error(`Sa11y: The target readability root (${desiredRoot}) does not exist.`);
  		}
  	} catch {
  		Constants.Root.areaToCheck.length = 0;
  	}

  	// Push a visible UI alert if not headless and no roots at all are found.
  	if (Constants.Root.areaToCheck.length === 0 && Constants.Global.headless === false) {
  		createAlert(Lang.sprintf('MISSING_ROOT', desiredRoot));
  		Constants.Root.areaToCheck.push(document.body);
  	}

  	/* Readability target area */
  	try {
  		const roots = document.querySelectorAll(desiredReadabilityRoot);
  		if (roots.length > 0) {
  			roots.forEach((root) => {
  				Constants.Root.Readability.push(root);
  			});
  		}
  		else {
  			console.error(`Sa11y: The target readability root (${selector}) does not exist.`);
  		}

  	} catch {
  		Constants.Root.Readability.length = 0;
  	}

  	if (Constants.Root.Readability.length === 0 && Constants.Global.headless === false) {
  		if (Constants.Root.areaToCheck.length === 0) {
  			Constants.Root.Readability.push(document.body);
  		} else {
  			// If desired root area is not found, use the root target area.
  			Constants.Root.Readability = Constants.Root.areaToCheck;

  			// Create a warning if the desired readability root is not found.
  			setTimeout(() => {
  				const { readabilityDetails, readabilityToggle } = Constants.Panel;
  				const readabilityOn = readabilityToggle?.getAttribute('aria-pressed') === 'true';
  				const alert = Constants.Panel.readability.querySelector('#readability-alert');
  				if (readabilityDetails && readabilityOn && !alert) {
  					// Roots that readability will be based on.
  					const roots = Constants.Root.areaToCheck.map((el) => {
  						if (el.id) return `#${el.id}`;
  						if (el.className) return `.${el.className.split(/\s+/).filter(Boolean).join('.')}`;
  						return el.tagName.toLowerCase();
  					}).join(', ');

  					// Append note to Readability panel.
  					const note = document.createElement('div');
  					note.id = 'readability-alert';
  					note.innerHTML = `<hr><p>${Lang.sprintf('MISSING_READABILITY_ROOT', roots, desiredReadabilityRoot)}</p>`;
  					readabilityDetails.insertAdjacentElement('afterend', note);
  				}
  			}, 100);
  		}
  	}
  }


  function addedNodeReadyToCheck(el) {
  	if (!State.recentlyAddedNodes.has(el)) {
  		return true;
  	}
  	const hasText = el.textContent.trim().length;
  	if ((!hasText && State.recentlyAddedNodes.get(el) > Date.now() - 5000) ||
  		State.activeRange && el.contains(State.activeRange.startContainer)) {
  		// Do not check recent nodes if they are empty or selected.
  		return false;
  	} else if (el.matches('table') && el.querySelectorAll('td:not(:empty)')) {
  		// Only check tables once there is content in a non-heading cell.
  		let cumulativeText = '';
  		if (hasText) {
  			const cells = el.querySelectorAll('td:not(:empty)');
  			cells.forEach((cell) => {
  				cumulativeText += cell.textContent;
  			});
  		}
  		if (!cumulativeText) {
  			return false;
  		} else {
  			// Text in body cells.
  			State.recentlyAddedNodes.delete(el);
  			return true;
  		}
  	} else {
  		// New node is ready for checking.
  		State.recentlyAddedNodes.delete(el);
  		return true;
  	}
  }

  const dropSomeElements = function(arrayRef, sendTo = false, readyCheck = true, hiddenCheck = false) {
  	for (let i = arrayRef.length - 1; i >= 0; i--) {
  		if (hiddenCheck && !elementNotHidden(arrayRef[i]) ||
  			readyCheck && !addedNodeReadyToCheck(arrayRef[i])) {
  			if (sendTo) {
  				sendTo.push(arrayRef[i]);
  			}
  			arrayRef.splice(i, 1);
  		}
  	}
  };

  // First step in checkAll is getting a fresh set of elements to check.
  function buildElementList (onlyForFilter = false) {

  	// Check for ignoreAll elements.
  	State.ignoreAll = Options.ignoreAllIfAbsent && document.querySelector(`:is(${Options.ignoreAllIfAbsent})`) === null;
  	if (!State.ignoreAll && !!Options.ignoreAllIfPresent) {
  		State.ignoreAll = document.querySelector(`:is(${Options.ignoreAllIfPresent})`) !== null;
  	}

  	State.elements = [];
  	State.mediaCount = 0;
  	State.headingOutline = [];

  	initializeRoot(Options.checkRoot, Options.checkRoot);

  	for (let i = 0; i < State.roots.length; i++) {
  		if (Options.fixedRoots) {
  			State.roots[i].dataset.ed11yRoot = `${i}`;
  			// todo check why not detectShadow here?
  		}
  		if (State.roots[i].shadowRoot) {
  			State.roots.setAttribute('data-ed11y-has-shadow-root', 'true');
  			detectShadow(State.roots[i]);
  			State.roots[i] = State.roots[i].shadowRoot;
  		}
  		else {
  			detectShadow(State.roots[i]);
  		}
  	}

  		// Find all web components on the page.
  		findShadowComponents(Options);

  		// Find and cache elements.
  	if (onlyForFilter) {

  		// Since 4.0.0: For performance, we filter elements instead of dozens of querySelectors on the DOM.
  		Elements.Found.Everything = find('*', 'root', Constants.Exclusions.Sa11yElements);

  		Elements.Found.Contrast = Elements.Found.Everything.filter(($el) => {
  			const matchesSelector = Constants.Exclusions.Contrast.some((exclusion) => $el.matches(exclusion));
  			return !matchesSelector && !Constants.Exclusions.Contrast.includes($el);
  		});

  		Elements.Found.Images = Elements.Found.Everything.filter(($el) => $el.tagName === 'IMG'
  			&& !Constants.Exclusions.Images.some((selector) => $el.matches(selector)));

  		Elements.Found.Links = Elements.Found.Everything.filter(($el) => ($el.tagName === 'A' || $el.tagName === 'a')
  			&& $el.hasAttribute('href')
  			&& !$el.matches('[role="button"]') // Exclude links with [role="button"]
  			&& !Constants.Exclusions.Links.some((selector) => $el.matches(selector)));

  		// We want headings from the entire document for the Page Outline.
  		Elements.Found.Headings = find(
  			'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
  			Options.ignoreContentOutsideRoots || Options.fixedRoots
  				? 'root' : 'document',
  			Constants.Exclusions.Headings,
  		);

  		// Excluded via headerIgnore.
  		Elements.Found.ExcludedHeadings = Elements.Found.Headings.filter((heading) => Constants.Exclusions.Headings.some((exclusion) => heading.matches(exclusion)));

  		// Excluded via outlineIgnore.
  		Elements.Found.ExcludedOutlineHeadings = Elements.Found.Headings.filter((heading) => Constants.Exclusions.Outline.some((exclusion) => heading.matches(exclusion)));

  		// Merge both headerIgnore and outlineIgnore.
  		Elements.Found.OutlineIgnore = Elements.Found.ExcludedOutlineHeadings.concat(Elements.Found.ExcludedHeadings);

  	} else {
  		Elements.initializeElements(Options);
  	}

  		if (!onlyForFilter) {
  			dropSomeElements(Elements.Found.Headings, Elements.Found.OutlineIgnore, true, true);
  			dropSomeElements(Elements.Found.Blockquotes);
  			dropSomeElements(Elements.Found.Tables);
  		}

  		if (typeof Options.editableContent === 'string') {
  			Elements.Found.editable = getElements(Options.editableContent, 'document');
  		}
  		else {
  			Elements.Found.editable = Options.editableContent;
  		}
  		if (State.inlineAlerts && Elements.Found.editable.length > 0) {
  			State.inlineAlerts = false;
  			console.warn('Editable content detected; Editoria11y inline alerts disabled');
  		}

  		if (Options.panelNoCover) {
  			// Moves panel off conflicting widgets.
  			Elements.Found.panelNoCover = getElements(Options.panelNoCover, 'document');
  		}

  }

  function lagBounce (callback, wait) {
    let timeoutId;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait + State.browserLag);
    };
  }
  function parents(el) {
    let nodes = [];
    nodes.push(el);
    while (el && !!el.parentElement && el.parentElement.tagName !== 'HTML') {
      nodes.push(el.parentElement);
      el = el.parentElement;
    }
    return nodes;
  }

  function resetClass(classes) {
    classes?.forEach((cls) => {
  		const reset = getElements(`.${cls}`, 'document', []);
      reset?.forEach(el => {
        el.classList.remove(cls);
      });
    });
  }

  function visibleElement(el) {
    // Checks if this element is visible. Used in parent iterators.
    // false is definitely invisible, true requires continued iteration to tell.
    // Todo postpone: Check for offscreen?
    if (el) {
      if (!el.checkVisibility({
        opacityProperty: true,
        visibilityProperty: true,
      })) {
        return false;
      }
      let style = window.getComputedStyle(el);
      return !(el.closest('.sr-only, .visually-hidden') ||
        style.getPropertyValue('z-index') < 0 ||
        (style.getPropertyValue('overflow') === 'hidden' &&
          ( el.offsetWidth < 10 ||
            el.offsetHeight < 10 )
        )
      );
    }
  }
  function visible(el) {
    // Recurse element and ancestors to make sure it is visible
    if (!visibleElement(el)) {
      // Element is hidden
      return false;
    } else {
      // Element is not known to be hidden.
      let theParents = parents(el);
      let visibleParent = (parent) => visibleElement(parent);
      return theParents.every(visibleParent);
    }
  }
  function firstVisibleParent(el) {
    let parent = el.parentElement;
    if (parent) {
      // Parent exists
      if (!visibleElement(parent)) {
        // Recurse
        parent = firstVisibleParent(parent);
        return parent;
      } else {
        // Element is visible
        return parent;
      }
    } else {
      // No visible parents.
      return false;
    }
  }
  // @todo discuss differences
  function hiddenElementCheck(el) {
    // Checks if this element has been removed from the accessibility tree
    let style = window.getComputedStyle(el);
    return !(style.getPropertyValue('display') === 'none' ||
      style.getPropertyValue('visibility') === 'hidden' ||
      el.hasAttribute('aria-hidden') ||
      el.hasAttribute('hidden'));
  }
  function elementNotHidden(el) {
    // Recurse element and ancestors to make sure it is visible
    if (!hiddenElementCheck(el)) {
      // Element is hidden
      return false;
    } else {
      // Element is not known to be hidden.
      let theParents = parents(el);
      let notHiddenParent = (parent) => hiddenElementCheck(parent);
      return theParents.every(notHiddenParent);
    }
  }

  function detectShadow (container) {
    if (Options.autoDetectShadowComponents) {

  		const select = `*:not(${Constants.Exclusions.Container.join(', ')}, .ed11y-element)`;

      let search;
      if (container.shadowRoot && container.shadowRoot.mode === 'open') {
        if (!container.matches('[data-ed11y-has-shadow-root]')) {
          container.setAttribute('data-ed11y-has-shadow-root', 'true');
          UI.attachCSS(container.shadowRoot);
          UI.attachCSS(container);
        }
        search = container.shadowRoot.querySelectorAll(select);
      } else {
        search = container.querySelectorAll(select);
      }
      search?.forEach((component) => {
        if (component.shadowRoot && component.shadowRoot.mode === 'open') {
          detectShadow(component);
        }
      });
    } else if (Options.shadowComponents) {
      const providedShadow = container.querySelectorAll(Options.shadowComponents);
      providedShadow.forEach((component) => {
        if (component.shadowRoot && component.shadowRoot.mode === 'open') {
          if (!container.matches('[data-ed11y-has-shadow-root]')){
            component.setAttribute('data-ed11y-has-shadow-root', 'true');
            UI.attachCSS(component.shadowRoot);
            UI.attachCSS(component);
          }
          detectShadow(component);
        } else {
          console.warn(`Editoria11y: A specified shadow host has no shadowRoot: ${component.tagName}`);
        }
      });
    }
  }

  function pauseObservers() {
  	State.watching?.forEach(observer => {
  		observer.observer.disconnect();
  	});
  }

  function resumeObservers() {
  	State.watching?.forEach(observer => {
  		observer.observer.observe(observer.root, observer.config);
  	});
  }

  function checkRunPrevent() {
  	let preventCheck = Options.preventCheckingIfPresent ?
  		document.querySelector(Options.preventCheckingIfPresent) :
  		false;
  	if (preventCheck) {
  		console.warn(`Editoria11y is disabled because an element matched the "preventCheckingIfPresent" parameter:  "${Options.preventCheckingIfPresent}"` );
  	} else if (!preventCheck && !!Options.preventCheckingIfAbsent) {
  		preventCheck = document.querySelector(`:is(${Options.preventCheckingIfAbsent})`) === null;
  		if (preventCheck) {
  			console.warn(`Editoria11y is disabled because no elements matched the "preventCheckingIfAbsent" parameter: "${Options.preventCheckingIfAbsent}"`);
  		}
  	}
  	return preventCheck;
  }

  function resetResults(incremental) {
  	State.jumpList = [];
  	State.tipOpen = false;
  	State.openTip = {
  		button: false,
  		tip: false,
  	};
  	State.lastOpenTip = -1;
  	resetClass([
  		'ed11y-ring-red',
  		'ed11y-ring-yellow',
  		'ed11y-hidden-highlight',
  		'ed11y-warning-inline',
  		'ed11y-warning-block',
  		'ed11y-error-block',
  		'ed11y-error-inline',
  	]);
  	// Reset insertions into body content.
  	if (incremental) {
  		Elements.Found.reset = getElements('ed11y-element-highlight', 'document', []);
  	} else {
  		Elements.Found.reset = getElements('ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', 'document', []);
  	}
  	Elements.Found.reset?.forEach((el) => el.remove());

  	// Flicker prevention -- leave old tip in place for 100ms.
  	Elements.Found.delayedReset = getElements('ed11y-element-result, ed11y-element-tip', 'document', []);

  	window.setTimeout(()=> {
  		Elements.Found.delayedReset?.forEach((el) => el.remove());
  	}, 100, Elements.Found.delayedReset);

  	if (typeof UI.panelJumpNext === 'function') {
  		UI.panelJumpNext.querySelector('.ed11y-sr-only').textContent = State.english ? Lang._('buttonFirstContent')
  			: Lang._('SKIP_TO_ISSUE') + ' 1';
  	}
  	// Reset insertions into body content.
  }

  function newIncrementalResults() {
  	// Obviously new if there are more results:
  	if (State.forceFullCheck || Results.length !== State.oldResults.length) {
  		return true;
  	}
  	// Subtly new if a result has changed:
  	let newResultString = `${State.errorCount} ${State.warningCount}`;
  	Results.forEach(result => {
  		newResultString += result.test + result.element.outerHTML;
  	});
  	let changed = newResultString !== State.oldResultString;
  	State.oldResultString = newResultString;
  	return changed;
  }

  function showError(error) {
  	customElements.define('sa11y-console-error', ConsoleErrors);
  	const consoleErrors = new ConsoleErrors(error);
  	document.body.appendChild(consoleErrors);
  	throw Error(error);
  }

  function checkHeaders(results, option, headingOutline) {
    let prevLevel;
    let prevHeadingText = '';
    Elements.Found.Headings.forEach(($el, i) => {
      // Get accessible name of heading.
      const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
      const stringMatchExclusions = option.headerIgnoreStrings
        ? accName.replace(option.headerIgnoreStrings, '') : accName;
      const removeWhitespace$1 = removeWhitespace(stringMatchExclusions);
      const headingText = sanitizeHTML(removeWhitespace$1);

      // Check if heading is within root target area.
      const rootContainsHeading = Constants.Root.areaToCheck.some((root) => root.contains($el));
      const rootContainsShadowHeading = Constants.Root.areaToCheck.some((root) => root.contains($el.getRootNode().host));
      const isWithinRoot = rootContainsHeading || rootContainsShadowHeading;

      // Check if heading starts an override zone.
      const headingStartsOverride = Elements.Found.HeadingOverrideStart.get($el);
      if (headingStartsOverride) {
        prevLevel = headingStartsOverride;
      }

      // Determine heading level.
      const level = parseInt($el.getAttribute('aria-level') || $el.tagName.slice(1), 10);
      const headingLength = removeWhitespace$1.length;
      const maxHeadingLength = option.checks.HEADING_LONG.maxLength || 160;

      // Default.
      let test = null;
      let type = null;
      let content = null;
      let developer = null;
      let dismissAll = null;
      let margin = null;

      // Rulesets.
      if (headingLength === 0) {
        if ($el.querySelectorAll('img').length) {
          const alt = $el.querySelector('img')?.getAttribute('alt');
          if ($el.querySelector('img') && (!alt || alt.trim() === '')) {
            if (option.checks.HEADING_EMPTY_WITH_IMAGE) {
              test = 'HEADING_EMPTY_WITH_IMAGE';
              type = option.checks.HEADING_EMPTY_WITH_IMAGE.type || 'error';
              content = Lang.sprintf(option.checks.HEADING_EMPTY_WITH_IMAGE.content || 'HEADING_EMPTY_WITH_IMAGE', level);
              developer = option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
              dismissAll = option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll ? 'HEADING_EMPTY_WITH_IMAGE' : false;
              margin = '-15px 30px';
            }
          }
        } else if (option.checks.HEADING_EMPTY) {
          test = 'HEADING_EMPTY';
          type = option.checks.HEADING_EMPTY.type || 'error';
          content = Lang.sprintf(option.checks.HEADING_EMPTY.content || 'HEADING_EMPTY', level);
          developer = option.checks.HEADING_EMPTY.developer || false;
          dismissAll = option.checks.HEADING_EMPTY.dismissAll ? 'HEADING_EMPTY' : false;
          margin = '0';
        }
      } else if (level - prevLevel > 1 && i !== 0) {
        if (option.checks.HEADING_SKIPPED_LEVEL) {
          test = 'HEADING_SKIPPED_LEVEL';
          type = option.checks.HEADING_SKIPPED_LEVEL.type || 'error';
          content = Lang.sprintf(option.checks.HEADING_SKIPPED_LEVEL.content || 'HEADING_SKIPPED_LEVEL', prevLevel, level, truncateString(headingText, 60), truncateString(prevHeadingText, 60), prevLevel + 1);
          developer = option.checks.HEADING_SKIPPED_LEVEL.developer || false;
          dismissAll = option.checks.HEADING_SKIPPED_LEVEL.dismissAll ? 'HEADING_SKIPPED_LEVEL' : false;
        }
      } else if (i === 0 && level !== 1 && level !== 2) {
        if (option.checks.HEADING_FIRST) {
          test = 'HEADING_FIRST';
          type = option.checks.HEADING_FIRST.type || 'error';
          content = Lang.sprintf(option.checks.HEADING_FIRST.content || 'HEADING_FIRST');
          developer = option.checks.HEADING_FIRST.developer || false;
          dismissAll = option.checks.HEADING_FIRST.dismissAll ? 'HEADING_FIRST' : false;
        }
      } else if (headingLength > maxHeadingLength) {
        if (option.checks.HEADING_LONG) {
          test = 'HEADING_LONG';
          type = option.checks.HEADING_LONG.type || 'warning';
          content = Lang.sprintf(option.checks.HEADING_LONG.content || 'HEADING_LONG', maxHeadingLength, headingLength);
          developer = option.checks.HEADING_LONG.developer || false;
          dismissAll = option.checks.HEADING_LONG.dismissAll ? 'HEADING_LONG' : false;
        }
      }

      // Create results object.
      if (content && type) {
        results.push({
          test,
          element: $el,
          type,
          content,
          dismiss: prepareDismissal(`H${level + headingText}`),
          dismissAll,
          isWithinRoot,
          developer,
          margin,
        });
      }

      // Reset level and text.
      prevLevel = level;
      prevHeadingText = headingText;

      // Create an object for heading outline panel.
      // Filter out specified headings in outlineIgnore and headerIgnore props.
      if (!Elements.Found.OutlineIgnore.includes($el)) {
        headingOutline.push({
          element: $el,
          headingLevel: level,
          text: headingText,
          type,
          dismiss: prepareDismissal(`H${level + headingText}`),
          isWithinRoot,
        });
      }
    });

    // Missing Heading 1
    if (option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
      results.push({
        test: 'HEADING_MISSING_ONE',
        type: option.checks.HEADING_MISSING_ONE.type || 'warning',
        content: Lang.sprintf(option.checks.HEADING_MISSING_ONE.content || 'HEADING_MISSING_ONE'),
        dismiss: 'MISSINGH1',
        developer: option.checks.HEADING_MISSING_ONE.developer || false,
      });
    }
    return { results, headingOutline };
  }

  function checkLinkText(results, option) {
    // List of partial alt stop words.
    const linkStopWords = option.linkStopWords
      ? [...Lang._('PARTIAL_ALT_STOPWORDS'), ...option.linkStopWords.split(',').map((word) => word.trim())]
      : Lang._('PARTIAL_ALT_STOPWORDS');

    // Utility function to strip all space and special chars except forward slash.
    const stripSpecialCharacters = (string) => string.replace(/[^\w\s./]/g, '').replace(/\s+/g, ' ').trim();

    // Utility function to check if text contains stop words.
    const checkStopWords = (textContent, stopWords) => {
      const testTextContent = textContent.replace(/\./g, '').toLowerCase();
      let matchedWord = null;
      stopWords.forEach((word) => {
        if (testTextContent.length === word.length && testTextContent.indexOf(word.toLowerCase()) >= 0) {
          matchedWord = word;
        }
      });
      return matchedWord;
    };

    // Check for stop words.
    const containsLinkTextStopWords = (textContent) => {
      const hit = [null, null, null, null];

      hit[0] = checkStopWords(textContent, linkStopWords);

      // When link text contains "click".
      Lang._('CLICK').forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'i'); // Word boundary.
        if (regex.test(textContent)) {
          hit[1] = word;
        }
        return false;
      });

      // Flag citations/references. Check if link text matches a publication source.
      const doi = [
        'doi.org/',
        'dl.acm.org/',
        'link.springer.com/',
        'pubmed.ncbi.nlm.nih.gov/',
        'scholar.google.com/',
        'ieeexplore.ieee.org/',
        'researchgate.net/publication/',
        'sciencedirect.com/science/article/',
      ];
      doi.forEach((word) => {
        if (textContent.toLowerCase().indexOf(word) >= 0) {
          hit[2] = word;
        }
        return false;
      });

      // URL starts with.
      ['www.', 'http'].forEach((word) => {
        if (textContent.toLowerCase().startsWith(word)) {
          hit[3] = word;
        }
        return false;
      });

      // Flag link containing these typical URL endings.
      const urlEndings = ['.edu/', '.com/', '.net/', '.org/', '.us/', '.ca/', '.de/', '.icu/', '.uk/', '.ru/', '.info/', '.top/', '.xyz/', '.tk/', '.cn/', '.ga/', '.cf/', '.nl/', '.io/', '.fr/', '.pe/', '.nz/', '.pt/', '.es/', '.pl/', '.ua/'];
      urlEndings.forEach((word) => {
        if (textContent.toLowerCase().indexOf(word) >= 0) {
          hit[3] = word;
        }
        return false;
      });

      return hit;
    };

    const seen = {};
    Elements.Found.Links.forEach(($el) => {
      const href = standardizeHref($el);

      // Link text based on COMPUTED ACCESSIBLE NAME.
      const accName = removeWhitespace(computeAccessibleName($el, Constants.Exclusions.LinkSpan));
      const linkText = Array.isArray(option.linkIgnoreStrings)
        ? option.linkIgnoreStrings.reduce((result, str) => result.replace(str, ''), accName)
        : accName;

      // Ignore special characters (except forward slash).
      const stripSpecialChars = stripSpecialCharacters(linkText);
      const error = containsLinkTextStopWords(stripSpecialChars);

      // Match special characters exactly 1 character in length.
      const specialCharPattern = /[^a-zA-Z0-9]/g;
      const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);

      // HTML symbols used as call to actions.
      const htmlSymbols = /([<>↣↳←→↓«»↴]+)/;
      const matches = linkText.match(htmlSymbols);
      const matchedSymbol = matches ? matches[1] : null;

      // Attributes.
      const titleAttr = $el.getAttribute('title');
      const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
      const negativeTabindex = $el.getAttribute('tabindex') === '-1';

      // Has ARIA.
      const hasAria = $el.querySelector(':scope [aria-labelledby], :scope [aria-label]') || $el.getAttribute('aria-labelledby') || $el.getAttribute('aria-label');
      const hasAriaLabelledby = $el.querySelector(':scope [aria-labelledby]') || $el.getAttribute('aria-labelledby');

      // New tab or new window.
      const containsNewWindowPhrases = Lang._('NEW_WINDOW_PHRASES').some((pass) => accName.toLowerCase().includes(pass));

      // If visible label contains word "click" (regardless of accessible name).
      const containsClickPhrase = Lang._('CLICK').some((pass) => {
        const regex = new RegExp(`\\b${pass}\\b`, 'i'); // Word boundary.
        return regex.test($el.textContent);
      });

      // Link that points to a file type and indicates as such.
      const defaultFileTypes = ['pdf', 'doc', 'docx', 'word', 'mp3', 'ppt', 'text', 'pptx', 'txt', 'exe', 'dmg', 'rtf', 'windows', 'macos', 'csv', 'xls', 'xlsx', 'mp4', 'mov', 'avi', 'zip'];
      const fileTypes = defaultFileTypes.concat(Lang._('FILE_TYPE_PHRASES'));
      // Evaluate $el.textContent in addition to accessible name to bypass `linkIgnoreSpan` prop.
      const containsFileTypePhrases = fileTypes.some((pass) => linkText.toLowerCase().includes(pass) || getText($el).toLowerCase().includes(pass));
      const fileTypeMatch = $el.matches(`
          a[href$='.pdf'],
          a[href$='.doc'],
          a[href$='.docx'],
          a[href$='.zip'],
          a[href$='.mp3'],
          a[href$='.txt'],
          a[href$='.exe'],
          a[href$='.dmg'],
          a[href$='.rtf'],
          a[href$='.pptx'],
          a[href$='.ppt'],
          a[href$='.xls'],
          a[href$='.xlsx'],
          a[href$='.csv'],
          a[href$='.mp4'],
          a[href$='.mov'],
          a[href$='.avi']
        `);

      // Remove whitespace and special characters to improve accuracy and minimize false positives.
      const linkTextTrimmed = linkText.replace(/'|"|-|\.|\s+/g, '').toLowerCase();

      // Original preserved text to lowercase.
      const originalLinkText = $el.textContent.trim().toLowerCase();

      let oneStop;
      const addStopWordResult = (element, stopword) => {
        if (option.checks.LINK_STOPWORD && !oneStop) {
          oneStop = true;
          results.push({
            test: 'LINK_STOPWORD',
            element,
            type: option.checks.LINK_STOPWORD.type || 'error',
            content: option.checks.LINK_STOPWORD.content
              ? Lang.sprintf(option.checks.LINK_STOPWORD.content, stopword)
              : Lang.sprintf('LINK_STOPWORD', stopword) + Lang.sprintf('LINK_TIP'),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKSTOPWORD${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_STOPWORD.dismissAll ? 'LINK_STOPWORD' : false,
            developer: option.checks.LINK_STOPWORD.developer || false,
          });
        }
      };

      // Don't overlap with Alt Text module.
      if (!$el.querySelectorAll('img').length) {
        // Has aria-hidden.
        if (ariaHidden) {
          if (!negativeTabindex) {
            // If negative tabindex.
            if (option.checks.HIDDEN_FOCUSABLE) {
              results.push({
                test: 'HIDDEN_FOCUSABLE',
                element: $el,
                type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
                content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
                inline: true,
                position: 'afterend',
                dismiss: prepareDismissal(`LINKHIDDENFOCUS${href + linkTextTrimmed}`),
                dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? 'LINK_HIDDEN_FOCUSABLE' : false,
                developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
              });
            }
          }
          return;
        }

        // If link text is ONLY "new window" or similar phrases.
        if (containsNewWindowPhrases) {
          const matchedPhrase = Lang._('NEW_WINDOW_PHRASES').find((phrase) => phrase.toLowerCase() === originalLinkText);
          if (originalLinkText === matchedPhrase) {
            addStopWordResult($el, matchedPhrase);
          }
        }

        // If link text is ONLY strings that were passed in via prop.
        let isLinkIgnoreStrings = false;
        if (option.linkIgnoreStrings) {
          option.linkIgnoreStrings.forEach((string) => {
            if (originalLinkText === string.toLowerCase()) {
              addStopWordResult($el, string);
              isLinkIgnoreStrings = true;
            }
          });
        }

        // Empty hyperlinks.
        if ((href || href === '') && linkText.length === 0) {
          if (hasAriaLabelledby) {
            // Has ariaLabelledby attribute but empty accessible name.
            if (option.checks.LINK_EMPTY_LABELLEDBY) {
              results.push({
                test: 'LINK_EMPTY_LABELLEDBY',
                element: $el,
                type: option.checks.LINK_EMPTY_LABELLEDBY.type || 'error',
                content: Lang.sprintf(option.checks.LINK_EMPTY_LABELLEDBY.content || 'LINK_EMPTY_LABELLEDBY'),
                inline: true,
                position: 'afterend',
                dismiss: prepareDismissal(`LINKEMPTYLABELLEDBY${href}`),
                dismissAll: option.checks.LINK_EMPTY_LABELLEDBY.dismissAll ? 'LINK_EMPTY_LABELLEDBY' : false,
                developer: option.checks.LINK_EMPTY_LABELLEDBY.developer || true,
              });
            }
          } else if ($el.children.length) {
            // Add correct warning when link text is only linkIgnoreSpan text.
            let hasStopWordWarning = false;
            if (option.linkIgnoreSpan) {
              const spanEl = $el.querySelector(option.linkIgnoreSpan);
              if (spanEl) {
                const spanText = stripSpecialCharacters(spanEl.textContent).trim().toLowerCase();
                if (spanText === originalLinkText) {
                  addStopWordResult($el, spanText);
                  hasStopWordWarning = true;
                }
              }
            }

            // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
            if (!hasStopWordWarning && option.checks.LINK_EMPTY_NO_LABEL) {
              results.push({
                test: 'LINK_EMPTY_NO_LABEL',
                element: $el,
                type: option.checks.LINK_EMPTY_NO_LABEL.type || 'error',
                content: Lang.sprintf(option.checks.LINK_EMPTY_NO_LABEL.content || 'LINK_EMPTY_NO_LABEL'),
                inline: true,
                position: 'afterend',
                dismiss: prepareDismissal(`LINKEMPTYNOLABEL${href}`),
                dismissAll: option.checks.LINK_EMPTY_NO_LABEL.dismissAll ? 'LINK_EMPTY_NO_LABEL' : false,
                developer: option.checks.LINK_EMPTY_NO_LABEL.developer || false,
              });
            }
          } else if (!isLinkIgnoreStrings && option.checks.LINK_EMPTY) {
            // Completely empty <a></a>
            results.push({
              test: 'LINK_EMPTY',
              element: $el,
              type: option.checks.LINK_EMPTY.type || 'error',
              content: Lang.sprintf(option.checks.LINK_EMPTY.content || 'LINK_EMPTY'),
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKEMPTY${href}`),
              dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
              developer: option.checks.LINK_EMPTY.developer || false,
            });
          }
        } else if (error[0] !== null) {
          addStopWordResult($el, error[0]);
        } else if (error[2] !== null) {
          // Contains DOI URL in link text.
          if (linkText.length > 8) {
            if (option.checks.LINK_DOI) {
              results.push({
                test: 'LINK_DOI',
                element: $el,
                type: option.checks.LINK_DOI.type || 'warning',
                content: Lang.sprintf(option.checks.LINK_DOI.content || 'LINK_DOI'),
                inline: true,
                dismiss: prepareDismissal(`LINKDOI${href + linkTextTrimmed}`),
                dismissAll: option.checks.LINK_DOI.dismissAll ? 'LINK_DOI' : false,
                developer: option.checks.LINK_DOI.developer || false,
              });
            }
          }
        } else if (error[3] !== null) {
          // Contains URL in link text.
          if (linkText.length > (option.checks.LINK_URL.maxLength || 40)) {
            if (option.checks.LINK_URL) {
              results.push({
                test: 'LINK_URL',
                element: $el,
                type: option.checks.LINK_URL.type || 'warning',
                content: option.checks.LINK_URL.content
                  ? Lang.sprintf(option.checks.LINK_URL.content)
                  : Lang.sprintf('LINK_URL') + Lang.sprintf('LINK_TIP'),
                inline: true,
                dismiss: prepareDismissal(`LINKURLNAME${href + linkTextTrimmed}`),
                dismissAll: option.checks.LINK_URL.dismissAll ? 'LINK_URL' : false,
                developer: option.checks.LINK_URL.developer || false,
              });
            }
          }
        } else if (hasAria) {
          // Computed accessible name,
          const sanitizedText = sanitizeHTML(linkText);

          // General warning for visible non-descript link text, regardless of ARIA label.
          const excludeSpan = fnIgnore($el, Constants.Exclusions.LinkSpan);
          const visibleLinkText = option.linkIgnoreStrings
            ? getText(excludeSpan).replace(option.linkIgnoreStrings, '') : getText(excludeSpan);
          const cleanedString = stripSpecialCharacters(visibleLinkText);
          const stopword = checkStopWords(cleanedString, linkStopWords);
          if (option.checks.LINK_STOPWORD_ARIA && stopword !== null) {
            results.push({
              test: 'LINK_STOPWORD_ARIA',
              element: $el,
              type: option.checks.LINK_STOPWORD_ARIA.type || 'warning',
              content: option.checks.LINK_STOPWORD_ARIA.content
                ? Lang.sprintf(option.checks.LINK_STOPWORD_ARIA.content, stopword, sanitizedText)
                : Lang.sprintf('LINK_STOPWORD_ARIA', stopword, sanitizedText) + Lang.sprintf('LINK_TIP'),
              inline: true,
              dismiss: prepareDismissal(`LINKSTOPWORDARIA${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_STOPWORD_ARIA.dismissAll ? ' LINK_STOPWORD_ARIA' : false,
              developer: option.checks.LINK_STOPWORD_ARIA.developer || true,
            });
          } else if (option.checks.LINK_LABEL) {
            // If the link has any ARIA, append a "Good" link button.
            results.push({
              test: 'LINK_LABEL',
              element: $el,
              type: option.checks.LINK_LABEL.type || 'good',
              content: option.checks.LINK_LABEL.content
                ? Lang.sprintf(option.checks.LINK_LABEL.content, sanitizedText)
                : `${Lang.sprintf('ACC_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKGOOD${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_LABEL.dismissAll ? 'LINK_LABEL' : false,
              developer: option.checks.LINK_LABEL.developer || true,
            });
          }

          // Button must have visible label as part of their accessible name.
          const isVisibleTextInAccessibleName$1 = isVisibleTextInAccessibleName($el);
          if (option.checks.LABEL_IN_NAME && isVisibleTextInAccessibleName$1 && $el.textContent.length !== 0) {
            results.push({
              test: 'LABEL_IN_NAME',
              element: $el,
              type: option.checks.LABEL_IN_NAME.type || 'warning',
              content: Lang.sprintf(option.checks.LABEL_IN_NAME.content || 'LABEL_IN_NAME', sanitizedText),
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKLABELNAME${href + linkTextTrimmed}`),
              dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? 'BTN_LABEL_IN_NAME' : false,
              developer: option.checks.LABEL_IN_NAME.developer || true,
            });
          }
        } else if (matchedSymbol) {
          // If link contains a special character used as a CTA.
          if (option.checks.LINK_SYMBOLS) {
            results.push({
              test: 'LINK_SYMBOLS',
              element: $el,
              type: option.checks.LINK_SYMBOLS.type || 'warning',
              content: Lang.sprintf(option.checks.LINK_SYMBOLS.content || 'LINK_SYMBOLS', matchedSymbol),
              inline: true,
              dismiss: prepareDismissal(`LINKSYMBOL${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_SYMBOLS.dismissAll ? 'LINK_SYMBOLS' : false,
              developer: option.checks.LINK_SYMBOLS.developer || false,
            });
          }
        } else if (isSingleSpecialChar) {
          // Link is ONLY a period, comma, or special character.
          if (option.checks.LINK_EMPTY) {
            results.push({
              test: 'LINK_EMPTY',
              element: $el,
              type: option.checks.LINK_EMPTY.type || 'error',
              content: Lang.sprintf(option.checks.LINK_EMPTY.content || 'LINK_EMPTY'),
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKCHAR${href}`),
              dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
              developer: option.checks.LINK_EMPTY.developer || false,
            });
          }
        }

        // Uses "click here" in the link text or accessible name.
        if (error[1] !== null || containsClickPhrase) {
          if (option.checks.LINK_CLICK_HERE) {
            results.push({
              test: 'LINK_CLICK_HERE',
              element: $el,
              type: option.checks.LINK_CLICK_HERE.type || 'warning',
              content: option.checks.LINK_CLICK_HERE.content
                ? Lang.sprintf(option.checks.LINK_CLICK_HERE.content)
                : Lang.sprintf('LINK_CLICK_HERE') + Lang.sprintf('LINK_TIP'),
              inline: true,
              dismiss: prepareDismissal(`LINKCLICKHERE${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_CLICK_HERE.dismissAll ? 'LINK_CLICK_HERE' : false,
              developer: option.checks.LINK_CLICK_HERE.developer || false,
            });
          }
        }

        // Link's title attribute is the same as the link text.
        if (getText($el).length !== 0 && titleAttr?.toLowerCase() === linkText.toLowerCase()) {
          if (option.checks.DUPLICATE_TITLE) {
            results.push({
              test: 'DUPLICATE_TITLE',
              element: $el,
              type: option.checks.DUPLICATE_TITLE.type || 'warning',
              content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || 'DUPLICATE_TITLE'),
              inline: true,
              dismiss: prepareDismissal(`LINKDUPLICATETITLE${href + linkTextTrimmed}`),
              dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? 'DUPLICATE_TITLE' : false,
              developer: option.checks.DUPLICATE_TITLE.developer || false,
            });
          }
        }
      }

      if (option.linksAdvancedPlugin) {
        if (linkTextTrimmed.length !== 0) {
          // Links with identical accessible names have equivalent purpose.
          if (seen[linkTextTrimmed] && !seen[href]) {
            const ignored = $el.ariaHidden === 'true' && $el.getAttribute('tabindex') === '-1';
            const hasAttributes = $el.hasAttribute('role') || $el.hasAttribute('disabled');
            if (option.checks.LINK_IDENTICAL_NAME && !hasAttributes && !ignored) {
              const sanitizedText = sanitizeHTML(linkText);
              results.push({
                test: 'LINK_IDENTICAL_NAME',
                element: $el,
                type: option.checks.LINK_IDENTICAL_NAME.type || 'warning',
                content: option.checks.LINK_IDENTICAL_NAME.content
                  ? Lang.sprintf(option.checks.LINK_IDENTICAL_NAME.content, sanitizedText)
                  : `${Lang.sprintf('LINK_IDENTICAL_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
                inline: true,
                dismiss: prepareDismissal(`LINKSEEN${href + linkTextTrimmed}`),
                dismissAll: option.checks.LINK_IDENTICAL_NAME.dismissAll ? 'LINK_IDENTICAL_NAME' : false,
                developer: option.checks.LINK_IDENTICAL_NAME.developer || false,
              });
            }
          } else {
            seen[linkTextTrimmed] = true;
            seen[href] = true;
          }

          // Link opens in new tab without warning.
          if ($el.getAttribute('target')?.toLowerCase() === '_blank' && !fileTypeMatch && !containsNewWindowPhrases) {
            if (option.checks.LINK_NEW_TAB) {
              results.push({
                test: 'LINK_NEW_TAB',
                element: $el,
                type: option.checks.LINK_NEW_TAB.type || 'warning',
                content: Lang.sprintf(option.checks.LINK_NEW_TAB.content || 'LINK_NEW_TAB'),
                inline: true,
                dismiss: prepareDismissal(`LINKNEWTAB${href + linkTextTrimmed}`),
                dismissAll: option.checks.LINK_NEW_TAB.dismissAll ? 'LINK_NEW_TAB' : false,
                developer: option.checks.LINK_NEW_TAB.developer || false,
              });
            }
          }

          // Link points to file (non HTML resource) without warning.
          if (fileTypeMatch && !containsFileTypePhrases) {
            if (option.checks.LINK_FILE_EXT) {
              results.push({
                test: 'LINK_FILE_EXT',
                element: $el,
                type: option.checks.LINK_FILE_EXT.type || 'warning',
                content: Lang.sprintf(option.checks.LINK_FILE_EXT.content || 'LINK_FILE_EXT'),
                inline: true,
                dismiss: prepareDismissal(`LINKEXT${href + linkTextTrimmed}`),
                dismissAll: option.checks.LINK_FILE_EXT.dismissAll ? 'LINK_FILE_EXT' : false,
                developer: option.checks.LINK_FILE_EXT.developer || false,
              });
            }
          }
        }
      }
    });
    return results;
  }

  function checkImages(results, option) {
    const containsAltTextStopWords = (alt) => {
      const altUrl = [
        '.avif',
        '.png',
        '.jpg',
        '.jpeg',
        '.webp',
        '.gif',
        '.tiff',
        '.svg',
        '.heif',
        '.heic',
        'http',
      ];

      const hit = [null, null, null];
      altUrl.forEach((word) => {
        if (alt.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
          hit[0] = word;
        } else {
          // Checking for image dimensions in alt text.
          const imageDimensions = /\b\d{2,6}\s*x\s*\d{2,6}\b/;
          const match = alt.toLowerCase().match(imageDimensions);
          if (match) {
            [hit[0]] = match;
          }
        }
      });

      const susAltWordsOverride = (option.susAltStopWords) ? option.susAltStopWords.split(',').map((word) => word.trim()) : Lang._('SUS_ALT_STOPWORDS');
      susAltWordsOverride.forEach((word) => {
        const susWord = alt.toLowerCase().indexOf(word);
        if (susWord > -1 && susWord < 6) {
          hit[1] = word;
        }
      });

      Lang._('PLACEHOLDER_ALT_STOPWORDS').forEach((word) => {
        if (alt.length === word.length && alt.toLowerCase().indexOf(word) >= 0) {
          hit[2] = word;
        }
      });

      // Additional placeholder stopwords to flag as an error.
      const { extraPlaceholderStopWords } = option;
      if (extraPlaceholderStopWords.length) {
        const array = extraPlaceholderStopWords.split(',').map((word) => word.trim());
        array.forEach((word) => {
          const susWord = alt.toLowerCase().indexOf(word);
          if (susWord > -1 && susWord < 6) {
            hit[2] = word;
          }
        });
      }

      return hit;
    };

    Elements.Found.Images.forEach(($el) => {
      const alt = (computeAriaLabel($el) === 'noAria') ? $el.getAttribute('alt') : computeAriaLabel($el);

      // If selectors passed via prop, it will treat that image as an unlinked image.
      const link = $el.closest(option.imageWithinLightbox
        ? `a[href]:not(${option.imageWithinLightbox})`
        : 'a[href]');

      // Image's source for key.
      const src = ($el.getAttribute('src')) ? $el.getAttribute('src') : $el.getAttribute('srcset');

      // Process link text exclusions.
      const linkSpanExclusions = link
        ? fnIgnore(link, Constants.Exclusions.LinkSpan).textContent : '';

      const stringMatchExclusions = Array.isArray(option.linkIgnoreStrings)
        ? option.linkIgnoreStrings.reduce((result, str) => result.replace(str, ''), linkSpanExclusions)
        : linkSpanExclusions;

      const linkTextLength = link
        ? removeWhitespace(stringMatchExclusions).length : 0;

      // Ignore tracking pixels without explicit aria-hidden or nullified alt.
      if ($el.height < 2 && $el.width < 2 && (isElementHidden($el) || alt === '')) {
        return;
      }

      if (link && link.getAttribute('aria-hidden') === 'true') {
        // If linked image has aria-hidden, but is still focusable.
        const unfocusable = link.getAttribute('tabindex') === '-1';
        if (option.checks.HIDDEN_FOCUSABLE && !unfocusable) {
          results.push({
            test: 'HIDDEN_FOCUSABLE',
            element: $el,
            type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
            content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
            dismiss: prepareDismissal(`IMGHIDDENFOCUSABLE${src}`),
            dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll
              ? 'LINK_HIDDEN_FOCUSABLE' : false,
            developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
          });
        }
        return;
      }

      // If alt is missing.
      if (alt === null) {
        if (link) {
          const rule = (linkTextLength === 0)
            ? option.checks.MISSING_ALT_LINK
            : option.checks.MISSING_ALT_LINK_HAS_TEXT;
          const conditional = linkTextLength === 0
            ? 'MISSING_ALT_LINK' : 'MISSING_ALT_LINK_HAS_TEXT';
          if (rule) {
            results.push({
              test: conditional,
              element: $el,
              type: rule.type || 'error',
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(`${conditional + src + linkTextLength}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (option.checks.MISSING_ALT) {
          // General failure message if image is missing alt.
          results.push({
            test: 'MISSING_ALT',
            element: $el,
            type: option.checks.MISSING_ALT.type || 'error',
            content: Lang.sprintf(option.checks.MISSING_ALT.content || 'MISSING_ALT'),
            dismiss: prepareDismissal(`IMGNOALT${src}`),
            dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
            developer: option.checks.MISSING_ALT.developer || false,
          });
        }
      } else {
        // If image has alt.
        const sanitizedAlt = sanitizeHTML(alt);
        const altText = removeWhitespace(sanitizedAlt);
        const error = containsAltTextStopWords(altText);
        const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');
        const titleAttr = $el.getAttribute('title');
        const decorative = (alt === '');

        // Figure elements.
        const figure = $el.closest('figure');
        const figcaption = figure?.querySelector('figcaption');
        const figcaptionText = (figcaption) ? figcaption.textContent.trim() : '';

        // Maximum alt text length
        const maxAltCharactersLinks = option.checks.LINK_IMAGE_LONG_ALT.maxLength || 250;
        const maxAltCharacters = option.checks.IMAGE_ALT_TOO_LONG.maxLength || 250;

        // If aria-label or aria-labelledby returns empty or invalid.
        if (option.checks.MISSING_ALT) {
          if (hasAria && altText === '') {
            results.push({
              test: 'MISSING_ALT',
              element: $el,
              type: option.checks.MISSING_ALT.type || 'error',
              content: Lang.sprintf(option.checks.MISSING_ALT.content || 'MISSING_ALT'),
              dismiss: prepareDismissal(`IMGNOALTARIA${src}`),
              dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
              developer: option.checks.MISSING_ALT.developer || false,
            });
            return;
          }
        }

        // If alt text starts with a very specific string provided via props.
        const startsWithSpecificAlt = option.altPlaceholder && option.altPlaceholder.some((text) => alt.toLowerCase().startsWith(text.toLowerCase()));

        // Decorative images.
        if (decorative || startsWithSpecificAlt) {
          const carouselSources = option.checks.IMAGE_DECORATIVE_CAROUSEL.sources;
          const carousel = carouselSources ? $el.closest(carouselSources) : '';
          if (carousel) {
            const numberOfSlides = carousel.querySelectorAll('img');
            const rule = (numberOfSlides.length === 1)
              ? option.checks.IMAGE_DECORATIVE
              : option.checks.IMAGE_DECORATIVE_CAROUSEL;
            const conditional = (numberOfSlides.length === 1)
              ? 'IMAGE_DECORATIVE'
              : 'IMAGE_DECORATIVE_CAROUSEL';
            if (rule) {
              results.push({
                test: conditional,
                element: $el,
                type: rule.type || 'warning',
                content: Lang.sprintf(rule.content || conditional),
                dismiss: prepareDismissal(conditional + src),
                dismissAll: rule.dismissAll ? conditional : false,
                developer: rule.developer || false,
              });
            }
          } else if (link) {
            const rule = (linkTextLength === 0)
              ? option.checks.LINK_IMAGE_NO_ALT_TEXT
              : option.checks.LINK_IMAGE_TEXT;
            const conditional = linkTextLength === 0
              ? 'LINK_IMAGE_NO_ALT_TEXT' : 'LINK_IMAGE_TEXT';
            if (rule) {
              results.push({
                test: conditional,
                element: $el,
                type: rule.type || (linkTextLength === 0 ? 'error' : 'good'),
                content: Lang.sprintf(rule.content || conditional),
                dismiss: prepareDismissal(`${conditional + src + linkTextLength}`),
                dismissAll: rule.dismissAll ? conditional : false,
                developer: rule.developer || false,
              });
            }
          } else if (figure) {
            const rule = (figcaption && figcaptionText.length)
              ? option.checks.IMAGE_FIGURE_DECORATIVE
              : option.checks.IMAGE_DECORATIVE;
            const conditional = figcaption && figcaptionText.length
              ? 'IMAGE_FIGURE_DECORATIVE' : 'IMAGE_DECORATIVE';
            if (rule) {
              results.push({
                test: conditional,
                element: $el,
                type: rule.type || 'warning',
                content: Lang.sprintf(rule.content || conditional),
                dismiss: prepareDismissal(`${conditional + src + figcaptionText}`),
                dismissAll: rule.dismissAll ? conditional : false,
                developer: rule.developer || false,
              });
            }
          } else if (option.checks.IMAGE_DECORATIVE) {
            results.push({
              test: 'IMAGE_DECORATIVE',
              element: $el,
              type: option.checks.IMAGE_DECORATIVE.type || 'warning',
              content: Lang.sprintf(option.checks.IMAGE_DECORATIVE.content || 'IMAGE_DECORATIVE'),
              dismiss: prepareDismissal(`DECIMAGE${src}`),
              dismissAll: option.checks.IMAGE_DECORATIVE.dismissAll ? 'IMAGE_DECORATIVE' : false,
              developer: option.checks.IMAGE_DECORATIVE.developer || false,
            });
          }
          return;
        }

        // Alt is unpronounceable.
        const unpronounceable = (link)
          ? option.checks.LINK_ALT_UNPRONOUNCEABLE : option.checks.ALT_UNPRONOUNCEABLE;
        if (unpronounceable) {
          if (alt.replace(/"|'|\?|\.|-|\s+/g, '') === '' && linkTextLength === 0) {
            const conditional = (link) ? 'LINK_ALT_UNPRONOUNCEABLE' : 'ALT_UNPRONOUNCEABLE';
            results.push({
              test: conditional,
              element: $el,
              type: unpronounceable.type || 'error',
              content: Lang.sprintf(unpronounceable.content || conditional, altText),
              dismiss: prepareDismissal(`UNPRONOUNCEABLE${src}`),
              dismissAll: unpronounceable.dismissAll ? 'ALT_UNPRONOUNCEABLE' : false,
              developer: unpronounceable.developer || false,
            });
            return;
          }
        }

        // Potentially contains auto-generated placeholder text.
        const maybeBadAlt = (link)
          ? option.checks.LINK_ALT_MAYBE_BAD : option.checks.ALT_MAYBE_BAD;
        const isTooLongSingleWord = new RegExp(`^\\S{${maybeBadAlt.minLength || 15},}$`);
        const containsNonAlphaChar = /[^\p{L}\-,.!?]/u.test(alt);

        // Alt text quality.
        if (error[0] !== null) {
          // Has stop words.
          const rule = (link)
            ? option.checks.LINK_ALT_FILE_EXT
            : option.checks.ALT_FILE_EXT;
          const conditional = (link) ? 'LINK_ALT_FILE_EXT' : 'ALT_FILE_EXT';
          if (rule) {
            results.push({
              test: conditional,
              element: $el,
              type: rule.type || 'error',
              content: Lang.sprintf(rule.content || conditional, error[0], altText),
              dismiss: prepareDismissal(`${conditional + src + altText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (error[2] !== null) {
          // Placeholder words.
          const rule = (link)
            ? option.checks.LINK_PLACEHOLDER_ALT
            : option.checks.ALT_PLACEHOLDER;
          const conditional = (link) ? 'LINK_PLACEHOLDER_ALT' : 'ALT_PLACEHOLDER';
          if (rule) {
            results.push({
              test: conditional,
              element: $el,
              type: rule.type || 'error',
              content: Lang.sprintf(rule.content || conditional, altText),
              dismiss: prepareDismissal(`${conditional + src + altText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (error[1] !== null) {
          // Suspicious words.
          const rule = (link)
            ? option.checks.LINK_SUS_ALT
            : option.checks.SUS_ALT;
          const conditional = (link) ? 'LINK_SUS_ALT' : 'SUS_ALT';
          if (rule) {
            results.push({
              test: conditional,
              element: $el,
              type: rule.type || 'warning',
              content: Lang.sprintf(rule.content || conditional, error[1], altText),
              dismiss: prepareDismissal(`${conditional + src + altText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (maybeBadAlt && (isTooLongSingleWord.test(alt) && containsNonAlphaChar)) {
          // Alt text is a single word greater than 15 characters that is potentially auto-generated.
          const conditional = (link) ? 'LINK_ALT_MAYBE_BAD' : 'ALT_MAYBE_BAD';
          results.push({
            test: conditional,
            element: $el,
            type: maybeBadAlt.type || 'warning',
            content: Lang.sprintf(maybeBadAlt.content || conditional, altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: maybeBadAlt.dismissAll ? conditional : false,
            developer: maybeBadAlt.developer || false,
          });
        } else if (link
          ? alt.length > maxAltCharactersLinks
          : alt.length > maxAltCharacters) {
          // Alt is too long.
          const rule = (link)
            ? option.checks.LINK_IMAGE_LONG_ALT
            : option.checks.IMAGE_ALT_TOO_LONG;
          const conditional = (link) ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG';
          const truncated = truncateString(altText, 600);
          if (rule) {
            results.push({
              test: conditional,
              element: $el,
              type: rule.type || 'warning',
              content: Lang.sprintf(rule.content || conditional, alt.length, truncated),
              dismiss: prepareDismissal(`${conditional + src + altText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (link) {
          const rule = (linkTextLength === 0)
            ? option.checks.LINK_IMAGE_ALT
            : option.checks.LINK_IMAGE_ALT_AND_TEXT;
          const conditional = (linkTextLength === 0) ? 'LINK_IMAGE_ALT' : 'LINK_IMAGE_ALT_AND_TEXT';

          if (rule) {
            // Has both link text and alt text.
            const linkAccName = computeAccessibleName(link);
            const removeWhitespace$1 = removeWhitespace(linkAccName);
            const sanitizedText = sanitizeHTML(removeWhitespace$1);

            const tooltip = (linkTextLength === 0)
              ? Lang.sprintf('LINK_IMAGE_ALT', altText)
              : `${Lang.sprintf('LINK_IMAGE_ALT_AND_TEXT', altText, sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`;

            results.push({
              test: conditional,
              element: $el,
              type: rule.type || 'warning',
              content: rule.content
                ? Lang.sprintf(rule.content, altText, sanitizedText)
                : tooltip,
              dismiss: prepareDismissal(`${conditional + src + altText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (figure) {
          // Figure element has same alt and caption text.
          const duplicate = !!figcaption && (figcaptionText.toLowerCase() === altText.trim().toLowerCase());
          if (duplicate) {
            if (option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
              results.push({
                test: 'IMAGE_FIGURE_DUPLICATE_ALT',
                element: $el,
                type: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.type || 'warning',
                content: Lang.sprintf(option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content || 'IMAGE_FIGURE_DUPLICATE_ALT', altText),
                dismiss: prepareDismissal(`FIGDUPLICATE${src}`),
                dismissAll: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll ? 'IMAGE_FIGURE_DUPLICATE_ALT' : false,
                developer: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false,
              });
            }
          } else if (option.checks.IMAGE_PASS) {
            // Figure has alt text!
            results.push({
              test: 'IMAGE_PASS',
              element: $el,
              type: option.checks.IMAGE_PASS.type || 'good',
              content: Lang.sprintf(option.checks.IMAGE_PASS.content || 'IMAGE_PASS', altText),
              dismiss: prepareDismissal(`FIGIMGPASS${src + altText}`),
              dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
              developer: option.checks.IMAGE_PASS.developer || false,
            });
          }
        } else if (option.checks.IMAGE_PASS) {
          if (!$el.closest('button, [role="button"]')) {
            // Image has alt text!
            results.push({
              test: 'IMAGE_PASS',
              element: $el,
              type: option.checks.IMAGE_PASS.type || 'good',
              content: Lang.sprintf(option.checks.IMAGE_PASS.content || 'IMAGE_PASS', altText),
              dismiss: prepareDismissal(`IMAGEPASS${src + altText}`),
              dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
              developer: option.checks.IMAGE_PASS.developer || false,
            });
          }
        }

        // Image's title attribute is the same as the alt.
        // Since this is extra, it's okay if it overlaps "good" annotation.
        if (titleAttr?.toLowerCase() === alt.toLowerCase()) {
          if (option.checks.DUPLICATE_TITLE) {
            results.push({
              test: 'DUPLICATE_TITLE',
              element: $el,
              type: option.checks.DUPLICATE_TITLE.type || 'warning',
              content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || 'DUPLICATE_TITLE'),
              inline: true,
              dismiss: prepareDismissal(`ALTDUPLICATETITLE${altText}`),
              dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? 'DUPLICATE_TITLE' : false,
              developer: option.checks.DUPLICATE_TITLE.developer || false,
            });
          }
        }
      }
    });
    return results;
  }

  function checkLabels(results, option) {
    if (option.formLabelsPlugin) {
      Elements.Found.Inputs.forEach(($el) => {
        // Ignore completely hidden elements.
        const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
        const negativeTabindex = $el.getAttribute('tabindex') === '-1';
        const hidden = isElementHidden($el);
        if (hidden || (ariaHidden && negativeTabindex)) {
          return;
        }

        // Compute accessible name on input.
        const computeName = computeAccessibleName($el);
        const inputName = removeWhitespace(computeName);

        // Get attributes.
        const alt = $el.getAttribute('alt');
        const type = $el.getAttribute('type');
        const hasTitle = $el.getAttribute('title');
        const hasPlaceholder = $el.placeholder && $el.placeholder !== 0;
        const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');

        // Pass: Ignore if it's a submit or hidden button.
        if (type === 'submit' || type === 'button' || type === 'hidden') {
          return;
        }

        // Error: Input with type="image" without accessible name or alt.
        if (type === 'image') {
          if (option.checks.LABELS_MISSING_IMAGE_INPUT && (!alt || alt.trim() === '') && !hasAria && !hasTitle) {
            results.push({
              test: 'LABELS_MISSING_IMAGE_INPUT',
              element: $el,
              type: option.checks.LABELS_MISSING_IMAGE_INPUT.type || 'error',
              content: Lang.sprintf(option.checks.LABELS_MISSING_IMAGE_INPUT.content || 'LABELS_MISSING_IMAGE_INPUT'),
              dismiss: prepareDismissal(`INPUTIMAGE${type + inputName}`),
              dismissAll: option.checks.LABELS_MISSING_IMAGE_INPUT.dismissAll ? 'LABELS_MISSING_IMAGE_INPUT' : false,
              developer: option.checks.LABELS_MISSING_IMAGE_INPUT.developer || true,
            });
          }
          return;
        }

        // Warning: to remove reset buttons.
        if (type === 'reset') {
          if (option.checks.LABELS_INPUT_RESET) {
            results.push({
              test: 'LABELS_INPUT_RESET',
              element: $el,
              type: option.checks.LABELS_INPUT_RESET.type || 'warning',
              content: Lang.sprintf(option.checks.LABELS_INPUT_RESET.content || 'LABELS_INPUT_RESET'),
              dismiss: prepareDismissal(`INPUTRESET${type + inputName}`),
              dismissAll: option.checks.LABELS_INPUT_RESET.dismissAll ? 'LABELS_INPUT_RESET' : false,
              developer: option.checks.LABELS_INPUT_RESET.developer || false,
            });
          }
          return;
        }

        // Uses ARIA or title attribute. Warn them to ensure there's a visible label.
        if (hasAria || hasTitle || hasPlaceholder) {
          // Avoid using placeholder attributes.
          if (hasPlaceholder && option.checks.LABELS_PLACEHOLDER) {
            results.push({
              test: 'LABELS_PLACEHOLDER',
              element: $el,
              type: option.checks.LABELS_PLACEHOLDER.type || 'warning',
              content: Lang.sprintf(option.checks.LABELS_PLACEHOLDER.content || 'LABELS_PLACEHOLDER'),
              dismiss: prepareDismissal(`INPUTPLACEHOLDER${type + inputName}`),
              dismissAll: option.checks.LABELS_PLACEHOLDER.dismissAll ? 'LABELS_PLACEHOLDER' : false,
              developer: option.checks.LABELS_PLACEHOLDER.developer || true,
            });
          } else if (inputName.length === 0) {
            if (option.checks.LABELS_MISSING_LABEL) {
              results.push({
                test: 'LABELS_MISSING_LABEL',
                element: $el,
                type: option.checks.LABELS_MISSING_LABEL.type || 'error',
                content: Lang.sprintf(option.checks.LABELS_MISSING_LABEL.content || 'LABELS_MISSING_LABEL'),
                dismiss: prepareDismissal(`INPUTMISSING${type + inputName}`),
                dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
                developer: option.checks.LABELS_MISSING_LABEL.developer || true,
              });
            }
          } else if (option.checks.LABELS_ARIA_LABEL_INPUT) {
            const sanitizedText = sanitizeHTML(inputName);
            results.push({
              test: 'LABELS_ARIA_LABEL_INPUT',
              element: $el,
              type: option.checks.LABELS_ARIA_LABEL_INPUT.type || 'warning',
              content: option.checks.LABELS_ARIA_LABEL_INPUT.content
                ? Lang.sprintf(option.checks.LABELS_ARIA_LABEL_INPUT.content, sanitizedText)
                : `${Lang.sprintf('LABELS_ARIA_LABEL_INPUT', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
              dismiss: prepareDismissal(`INPUTARIA${type + inputName}`),
              dismissAll: option.checks.LABELS_ARIA_LABEL_INPUT.dismissAll ? 'LABELS_ARIA_LABEL_INPUT' : false,
              developer: option.checks.LABELS_ARIA_LABEL_INPUT.developer || true,
            });
          }
          return;
        }

        // Implicit label: <label>First name: <input type="text"/><label>
        const closestLabel = $el.closest('label');
        const labelName = (closestLabel) ? removeWhitespace(computeAccessibleName(closestLabel)) : '';
        if (closestLabel && labelName.length) {
          return;
        }

        // Check to see if each label has a matching for and it attribute.
        const id = $el.getAttribute('id');
        if (id) {
          // Find labels without a match.
          if (!Elements.Found.Labels.some((label) => label.getAttribute('for') === id)) {
            if (option.checks.LABELS_NO_FOR_ATTRIBUTE) {
              results.push({
                test: 'LABELS_NO_FOR_ATTRIBUTE',
                element: $el,
                type: option.checks.LABELS_NO_FOR_ATTRIBUTE.type || 'error',
                content: Lang.sprintf(option.checks.LABELS_NO_FOR_ATTRIBUTE.content || 'LABELS_NO_FOR_ATTRIBUTE', id),
                dismiss: prepareDismissal(`INPUTNOFOR${type + inputName}`),
                dismissAll: option.checks.LABELS_NO_FOR_ATTRIBUTE.dismissAll ? 'LABELS_NO_FOR_ATTRIBUTE' : false,
                developer: option.checks.LABELS_NO_FOR_ATTRIBUTE.developer || true,
              });
            }
          }
        } else if (option.checks.LABELS_MISSING_LABEL) {
          // No id!
          results.push({
            test: 'LABELS_MISSING_LABEL',
            element: $el,
            type: option.checks.LABELS_MISSING_LABEL.type || 'error',
            content: Lang.sprintf(option.checks.LABELS_MISSING_LABEL.content || 'LABELS_MISSING_LABEL'),
            dismiss: prepareDismissal(`INPUTNOID${type + inputName}`),
            dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
            developer: option.checks.LABELS_MISSING_LABEL.developer || true,
          });
        }
      });
    }
    return results;
  }

  function checkQA(results, option) {
    /* *********************************************************** */
    /*  Error: Find all links pointing to development environment. */
    /* *********************************************************** */
    if (option.checks.QA_BAD_LINK) {
      Elements.Found.CustomErrorLinks.forEach(($el) => {
        results.push({
          test: 'QA_BAD_LINK',
          element: $el,
          type: option.checks.QA_BAD_LINK.type || 'error',
          content: Lang.sprintf(option.checks.QA_BAD_LINK.content || 'QA_BAD_LINK', $el),
          inline: true,
          dismiss: prepareDismissal($el.tagName + $el.textContent),
          dismissAll: option.checks.QA_BAD_LINK.dismissAll ? 'QA_BAD_LINK' : false,
          developer: option.checks.QA_BAD_LINK.developer || false,
        });
      });
    }

    /* *********************************************************** */
    /*  Warning: Excessive bolding or italics.                     */
    /* *********************************************************** */
    if (option.checks.QA_STRONG_ITALICS) {
      Elements.Found.StrongItalics.forEach(($el) => {
        const text = getText($el);
        if (text.length !== 0 && text.length > 400) {
          results.push({
            test: 'QA_STRONG_ITALICS',
            element: $el.parentNode,
            type: option.checks.QA_STRONG_ITALICS.type || 'warning',
            content: Lang.sprintf(option.checks.QA_STRONG_ITALICS.content || 'QA_STRONG_ITALICS'),
            dismiss: prepareDismissal($el.tagName + $el.textContent),
            dismissAll: option.checks.QA_STRONG_ITALICS.dismissAll ? 'QA_STRONG_ITALICS' : false,
            developer: option.checks.QA_STRONG_ITALICS.developer || false,
          });
        }
      });
    }

    /* ************************************************************** */
    /*  Warning: Additional link checks.                              */
    /* ************************************************************** */
    Elements.Found.Links.forEach(($el) => {
      if ($el.hasAttribute('href')) {
        const href = $el.getAttribute('href');

        // Has file extension.
        const hasExtension = $el.matches(Constants.Global.documentSources);
        const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');

        // Check for broken same-page links.
        if (option.checks.QA_IN_PAGE_LINK) {
          const hasText = getText($el).length !== 0;
          const ignored = $el.ariaHidden === 'true' && $el.getAttribute('tabindex') === '-1';
          const hasAttributes = $el.hasAttribute('role')
            || $el.hasAttribute('aria-haspopup')
            || $el.hasAttribute('aria-expanded')
            || $el.hasAttribute('onclick')
            || $el.hasAttribute('disabled')
            || $el.closest('nav, [role="navigation"]');

          if ((href.startsWith('#') || href === '') && hasText && !ignored && !hasAttributes) {
            const targetId = href.substring(1);
            const ariaControls = $el.getAttribute('aria-controls');
            const targetElement = targetId && (document.getElementById(targetId)
              || document.getElementById(decodeURIComponent(targetId))
              || document.getElementById(encodeURIComponent(targetId))
              || document.getElementById(ariaControls)
              || document.querySelector(`a[name="${targetId}"]`));

            // If reference ID doesn't exist.
            if (!targetElement) {
              results.push({
                test: 'QA_IN_PAGE_LINK',
                element: $el,
                type: option.checks.QA_IN_PAGE_LINK.type || 'error',
                content: Lang.sprintf(option.checks.QA_IN_PAGE_LINK.content || 'QA_IN_PAGE_LINK'),
                inline: true,
                dismiss: prepareDismissal(`QAINPAGE${href}`),
                dismissAll: option.checks.QA_IN_PAGE_LINK.dismissAll ? 'QA_IN_PAGE_LINK' : false,
                developer: option.checks.QA_IN_PAGE_LINK.developer || false,
              });
            }
          }
        }

        // Manually inspect documents & PDF for accessibility.
        if (option.checks.QA_DOCUMENT && hasExtension) {
          results.push({
            test: 'QA_DOCUMENT',
            element: $el,
            type: option.checks.QA_DOCUMENT.type || 'warning',
            content: Lang.sprintf(option.checks.QA_DOCUMENT.content || 'QA_DOCUMENT'),
            inline: true,
            dismiss: prepareDismissal(`DOC${href}`),
            dismissAll: option.checks.QA_DOCUMENT.dismissAll ? 'QA_DOCUMENT' : false,
            developer: option.checks.QA_DOCUMENT.developer || false,
          });
        } else if (option.checks.QA_PDF && hasPDF) {
          results.push({
            test: 'QA_PDF',
            element: $el,
            type: option.checks.QA_PDF.type || 'warning',
            content: Lang.sprintf(option.checks.QA_PDF.content || 'QA_PDF'),
            inline: true,
            dismiss: prepareDismissal(`PDF${href}`),
            dismissAll: option.checks.QA_PDF.dismissAll ? 'QA_PDF' : false,
            developer: option.checks.QA_PDF.developer || false,
          });
        }
      }
    });

    /* *************************************************************** */
    /*  Warning: Find blockquotes used as headers.                     */
    /* *************************************************************** */
    if (option.checks.QA_BLOCKQUOTE) {
      Elements.Found.Blockquotes.forEach(($el) => {
        const text = getText($el);
        if (text.length !== 0 && text.length < 25) {
          const sanitizedText = sanitizeHTML(text);
          results.push({
            test: 'QA_BLOCKQUOTE',
            element: $el,
            type: option.checks.QA_BLOCKQUOTE.type || 'warning',
            content: Lang.sprintf(option.checks.QA_BLOCKQUOTE.content || 'QA_BLOCKQUOTE', sanitizedText),
            dismiss: prepareDismissal(`BLOCKQUOTE${sanitizedText}`),
            dismissAll: option.checks.QA_BLOCKQUOTE.dismissAll ? 'QA_BLOCKQUOTE' : false,
            developer: option.checks.QA_BLOCKQUOTE.developer || false,
          });
        }
      });
    }

    /* *************************************************************** */
    /*  Errors: Check HTML tables for issues.                          */
    /* *************************************************************** */
    Elements.Found.Tables.forEach(($el) => {
      if (isElementHidden($el) === false) {
        const tableHeaders = $el.querySelectorAll('th');
        const semanticHeadings = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const key = prepareDismissal(`TABLE${$el.textContent}`);
        if (option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
          results.push({
            test: 'TABLES_MISSING_HEADINGS',
            element: $el,
            type: option.checks.TABLES_MISSING_HEADINGS.type || 'error',
            content: Lang.sprintf(option.checks.TABLES_MISSING_HEADINGS.content || 'TABLES_MISSING_HEADINGS'),
            dismiss: key,
            dismissAll: option.checks.TABLES_MISSING_HEADINGS.dismissAll ? 'TABLES_MISSING_HEADINGS' : false,
            developer: option.checks.TABLES_MISSING_HEADINGS.developer || false,
          });
        }
        if (option.checks.TABLES_SEMANTIC_HEADING && semanticHeadings.length > 0) {
          semanticHeadings.forEach((heading) => {
            results.push({
              test: 'TABLES_SEMANTIC_HEADING',
              element: heading,
              type: option.checks.TABLES_SEMANTIC_HEADING.type || 'error',
              content: Lang.sprintf(option.checks.TABLES_SEMANTIC_HEADING.content || 'TABLES_SEMANTIC_HEADING'),
              dismiss: key,
              dismissAll: option.checks.TABLES_SEMANTIC_HEADING.dismissAll ? 'TABLES_SEMANTIC_HEADING' : false,
              developer: option.checks.TABLES_SEMANTIC_HEADING.developer || false,
            });
          });
        }
        tableHeaders.forEach((th) => {
          if (option.checks.TABLES_EMPTY_HEADING && th.textContent.trim().length === 0) {
            results.push({
              test: 'TABLES_EMPTY_HEADING',
              element: th,
              type: option.checks.TABLES_EMPTY_HEADING.type || 'error',
              content: Lang.sprintf(option.checks.TABLES_EMPTY_HEADING.content || 'TABLES_EMPTY_HEADING'),
              position: 'afterbegin',
              dismiss: key,
              dismissAll: option.checks.TABLES_EMPTY_HEADING.dismissAll ? 'TABLES_EMPTY_HEADING' : false,
              developer: option.checks.TABLES_EMPTY_HEADING.developer || false,
            });
          }
        });
      }
    });

    /* ****************************************************************** */
    /*  Warning: Detect fake headings                                     */
    /* ****************************************************************** */
    if (option.checks.QA_FAKE_HEADING) {
      const addResult = (element, sanitizedText) => {
        results.push({
          test: 'QA_FAKE_HEADING',
          element,
          type: option.checks.QA_FAKE_HEADING.type || 'warning',
          content: Lang.sprintf(option.checks.QA_FAKE_HEADING.content || 'QA_FAKE_HEADING', sanitizedText),
          dismiss: prepareDismissal(`BOLD${sanitizedText}`),
          inline: true,
          dismissAll: option.checks.QA_FAKE_HEADING.dismissAll ? 'QA_FAKE_HEADING' : false,
          developer: option.checks.QA_FAKE_HEADING.developer || false,
        });
      };

      // To minimize false positives/number of warnings...
      const isPreviousElementAHeading = (p) => {
        const previousElement = p.previousElementSibling;
        if (!previousElement) return false;
        const headingTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
        return headingTags.includes(previousElement.tagName);
      };

      // Find large text as heading.
      const ignoreParents = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote, table';
      const computeLargeParagraphs = (p) => {
        const size = getComputedStyle(p).fontSize.replace('px', '');
        const getText$1 = getText(p);
        const maybeSentence = getText$1.match(/[.;?!"]/) === null;
        const typicalHeadingLength = getText$1.length >= 4 && getText$1.length <= 120;

        if (size >= 24 && !p.closest(ignoreParents) && typicalHeadingLength && maybeSentence && !isPreviousElementAHeading(p)) {
          const sanitizedText = sanitizeHTML(getText$1);
          addResult(p, sanitizedText);
        }
      };

      // Find bolded text as headings.
      const computeBoldTextParagraphs = (p) => {
        const startsWithBold = /^<\s*(strong|b)(\s+[^>]*)?>/i.test(p.innerHTML.trim());

        if (startsWithBold && !p.closest(ignoreParents)) {
          const possibleHeading = p.querySelector('strong, b');
          const possibleHeadingText = getText(possibleHeading);

          // Conditions
          const notASentence = possibleHeadingText.match(/[.:;?!"']/) === null;
          const typicalHeadingLength = possibleHeadingText.length >= 3 && possibleHeadingText.length <= 120;

          if (typicalHeadingLength && notASentence) {
            // Be a little forgiving if it's a small paragraph.
            const nonHeadingTextLength = fnIgnore(p, ['strong', 'b']).textContent.trim().length;
            if (nonHeadingTextLength !== 0 && nonHeadingTextLength <= 250) {
              return;
            }

            const sanitizedText = sanitizeHTML(possibleHeadingText);
            addResult(possibleHeading, sanitizedText);
          }
        }
      };

      Elements.Found.Paragraphs.forEach((p) => {
        computeLargeParagraphs(p);
        computeBoldTextParagraphs(p);
      });
    }

    /* *************************************************************** */
    /*  Warning: Detect paragraphs that should be lists.               */
    /*  Thanks to John Jameson from PrincetonU for this ruleset!       */
    /* *************************************************************** */
    if (option.checks.QA_FAKE_LIST) {
      const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, ''); // All numbers but 1.
      const alphabeticMatch = new RegExp(/(^[aA1αаΑ]|[^\p{Alphabetic}\s])[-\s.)]/, 'u');
      const emojiMatch = new RegExp(/\p{Extended_Pictographic}/, 'u');
      const secondTextNoMatch = ['a', 'A', 'α', 'Α', 'а', 'А', '1'];
      const specialCharsMatch = /[([{#]/;
      const prefixDecrement = {
        2: '1',
        b: 'a',
        B: 'A',
        β: 'α',
        Β: 'Α',
        б: 'а',
        Б: 'А',
      };
      const decrement = (element) => element.replace(/^b|^B|^б|^Б|^β|^В|^2/, (match) => prefixDecrement[match]);

      // Variables to carry in loop.
      let activeMatch = ''; // Carried in loop for second paragraph.
      let firstText = ''; // Text of previous paragraph.
      let lastHitWasEmoji = false;

      Elements.Found.Paragraphs.forEach((p, i) => {
        let secondText = false;
        let hit = false;
        firstText = firstText || getText(p).replace('(', '');
        const firstPrefix = firstText.substring(0, 2);

        // Grab first two characters.
        const isAlphabetic = firstPrefix.match(alphabeticMatch);
        const isNumber = firstPrefix.match(numberMatch);
        const isEmoji = firstPrefix.match(emojiMatch);
        const isSpecialChar = specialCharsMatch.test(firstPrefix.charAt(0));

        if (
          firstPrefix.length > 0
          && firstPrefix !== activeMatch
          && !isNumber
          && (isAlphabetic || isEmoji || isSpecialChar)
        ) {
          // We have a prefix and a possible hit; check next detected paragraph.
          const secondP = Elements.Found.Paragraphs[i + 1];
          if (secondP) {
            secondText = getText(secondP).replace('(', '').substring(0, 2);
            if (secondTextNoMatch.includes(secondText?.toLowerCase().trim())) {
              // A sentence. Another sentence. (A sentence). 1 apple, 1 banana.
              return;
            }
            const secondPrefix = decrement(secondText);
            if (isAlphabetic) {
              // Check for repeats (*,*) or increments(a,b)
              if (firstPrefix !== 'A ' && firstPrefix === secondPrefix) {
                hit = true;
              }
            } else if (isEmoji && !lastHitWasEmoji) {
              // Check for two paragraphs in a row that start with emoji.
              if (secondPrefix.match(emojiMatch)) {
                hit = true;
                lastHitWasEmoji = true;
                // This is carried; better miss than have lots of positives.
              }
            }
          }
          if (!hit) {
            // Split p by carriage return if there was a firstPrefix and compare.
            let textAfterBreak = p?.querySelector('br')?.nextSibling?.nodeValue;
            if (textAfterBreak) {
              textAfterBreak = textAfterBreak.replace(/<\/?[^>]+(>|$)/g, '').trim().substring(0, 2);
              const checkForOtherPrefixChars = specialCharsMatch.test(textAfterBreak.charAt(0));
              if (checkForOtherPrefixChars
                || firstPrefix === decrement(textAfterBreak)
                || (!lastHitWasEmoji && textAfterBreak.match(emojiMatch))) {
                hit = true;
              }
            }
          } if (hit) {
            results.push({
              test: 'QA_FAKE_LIST',
              element: p,
              type: option.checks.QA_FAKE_LIST.type || 'warning',
              content: Lang.sprintf(option.checks.QA_FAKE_LIST.content || 'QA_FAKE_LIST', firstPrefix),
              dismiss: prepareDismissal(`LIST${p.textContent}`),
              dismissAll: option.checks.QA_FAKE_LIST.dismissAll ? 'QA_FAKE_LIST' : false,
              developer: option.checks.QA_FAKE_LIST.developer || false,
            });
            activeMatch = firstPrefix;
          } else {
            activeMatch = '';
          }
        }
        // Reset for next loop, carry over text query if available.
        firstText = secondText ? '' : secondText;
      });
    }

    /* **************************************** */
    /*  Warning: Detect uppercase text.         */
    /* **************************************** */
    if (option.checks.QA_UPPERCASE) {
      const checkCaps = ($el) => {
        let thisText = '';
        if ($el.tagName === 'LI') {
          // Prevent recursion through nested lists.
          $el.childNodes.forEach((node) => {
            if (node.nodeType === 3) {
              thisText += node.textContent;
            }
          });
        } else {
          thisText = getText($el);
        }

        // Patterns
        const uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
        const detectUpperCase = thisText.match(uppercasePattern);

        if (detectUpperCase && detectUpperCase[0].length > 10) {
          results.push({
            test: 'QA_UPPERCASE',
            element: $el,
            type: option.checks.QA_UPPERCASE.type || 'warning',
            content: Lang.sprintf(option.checks.QA_UPPERCASE.content || 'QA_UPPERCASE'),
            dismiss: prepareDismissal(`UPPERCASE${thisText}`),
            dismissAll: option.checks.QA_UPPERCASE.dismissAll ? 'QA_UPPERCASE' : false,
            developer: option.checks.QA_UPPERCASE.developer || false,
          });
        }
      };
      Elements.Found.Paragraphs.forEach(($el) => checkCaps($el));
      Elements.Found.Headings.forEach(($el) => checkCaps($el));
      Elements.Found.Lists.forEach(($el) => checkCaps($el));
      Elements.Found.Blockquotes.forEach(($el) => checkCaps($el));
    }

    /* ************************************************************** */
    /*  Various checks: underlines, justify-aligned, and small text.  */
    /* ************************************************************** */
    // Check underlined text. Created by Brian Teeman!
    const addUnderlineResult = ($el) => {
      results.push({
        test: 'QA_UNDERLINE',
        element: $el,
        type: option.checks.QA_UNDERLINE.type || 'warning',
        content: Lang.sprintf(option.checks.QA_UNDERLINE.content || 'QA_UNDERLINE'),
        inline: true,
        dismiss: prepareDismissal(`UNDERLINE${$el.textContent}`),
        dismissAll: option.checks.QA_UNDERLINE.dismissAll ? 'QA_UNDERLINE' : false,
        developer: option.checks.QA_UNDERLINE.developer || false,
      });
    };

    const addJustifyResult = ($el) => {
      results.push({
        test: 'QA_JUSTIFY',
        element: $el,
        type: option.checks.QA_JUSTIFY.type || 'warning',
        content: Lang.sprintf(option.checks.QA_JUSTIFY.content || 'QA_JUSTIFY'),
        dismiss: prepareDismissal(`JUSTIFIED${$el.textContent}`),
        dismissAll: option.checks.QA_JUSTIFY.dismissAll ? 'QA_JUSTIFY' : false,
        developer: option.checks.QA_JUSTIFY.developer || false,
      });
    };

    const addSmallTextResult = ($el) => {
      results.push({
        test: 'QA_SMALL_TEXT',
        element: $el,
        type: option.checks.QA_SMALL_TEXT.type || 'warning',
        content: Lang.sprintf(option.checks.QA_SMALL_TEXT.content || 'QA_SMALL_TEXT'),
        dismiss: prepareDismissal(`SMALL${$el.textContent}`),
        dismissAll: option.checks.QA_SMALL_TEXT.dismissAll ? 'QA_SMALL_TEXT' : false,
        developer: option.checks.QA_SMALL_TEXT.developer || false,
      });
    };

    const computeStyle = ($el) => {
      const style = getComputedStyle($el);
      const { textDecorationLine, textAlign, fontSize } = style;

      /* Check: Underlined text. */
      const interactive = 'a[href], button, abbr, [role="link"], [role="button"], [tabindex="0"], [onclick]';
      if (
        option.checks.QA_UNDERLINE
        && ($el.closest('u') || textDecorationLine === 'underline')
        && !$el.closest(interactive)
        && !$el.matches(interactive)
      ) {
        addUnderlineResult($el);
      }

      /* Check: Font size is greater than 0 and less than 10. */
      const defaultSize = option.checks.QA_SMALL_TEXT.fontSize || 10;
      const computedFontSize = parseFloat(fontSize);

      // Compare with parent element's font size.
      const parentFontSize = $el.parentElement
        ? parseFloat(getComputedStyle($el.parentElement).fontSize)
        : null;
      const isInherited = parentFontSize === computedFontSize;

      // Ensure the font size is specific to the element, not inherited.
      const withinRange = !isInherited && computedFontSize > 1 && computedFontSize <= defaultSize;
      if (option.checks.QA_SMALL_TEXT && withinRange) {
        addSmallTextResult($el);
      }

      /* Check: Check if text is justify-aligned. */
      const parentJustify = $el.parentElement
        ? getComputedStyle($el.parentElement).textAlign
        : null;
      const justifyInherited = parentJustify === textAlign;
      if (option.checks.QA_JUSTIFY && textAlign === 'justify' && !justifyInherited) {
        addJustifyResult($el);
      }
    };

    // Loop through all elements within the root area.
    if (option.checks.QA_UNDERLINE || option.checks.QA_JUSTIFY || option.checks.QA_SMALL_TEXT) {
      for (let i = 0; i < Elements.Found.Everything.length; i++) {
        const $el = Elements.Found.Everything[i];

        // Filter only text nodes.
        const textString = Array.from($el.childNodes)
          .filter((node) => node.nodeType === 3)
          .map((node) => node.textContent)
          .join('');
        const text = textString.trim();

        // Only if there's text!
        if (text.length !== 0) {
          computeStyle($el);
        }
      }
    }

    /* **************************************************** */
    /*  Find inappropriate use of <sup> and <sub> tags.     */
    /* **************************************************** */
    if (option.checks.QA_SUBSCRIPT) {
      Elements.Found.Subscripts.forEach(($el) => {
        const text = getText($el);
        if (text.length >= 80) {
          results.push({
            test: 'QA_SUBSCRIPT',
            element: $el,
            type: option.checks.QA_SUBSCRIPT.type || 'warning',
            content: Lang.sprintf(option.checks.QA_SUBSCRIPT.content || 'QA_SUBSCRIPT'),
            inline: true,
            dismiss: prepareDismissal($el.tagName + text),
            dismissAll: option.checks.QA_SUBSCRIPT.dismissAll ? 'QA_SUBSCRIPT' : false,
            developer: option.checks.QA_SUBSCRIPT.developer || false,
          });
        }
      });
    }

    /* ****************************************** */
    /*  Find double nested layout components.     */
    /* ****************************************** */
    if (option.checks.QA_NESTED_COMPONENTS) {
      Elements.Found.NestedComponents.forEach(($el) => {
        const sources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
        const component = $el.querySelector(sources);
        if (component) {
          results.push({
            test: 'QA_NESTED_COMPONENTS',
            element: $el,
            type: option.checks.QA_NESTED_COMPONENTS.type || 'warning',
            content: Lang.sprintf(option.checks.QA_NESTED_COMPONENTS.content || 'QA_NESTED_COMPONENTS'),
            dismiss: prepareDismissal(`NESTED${$el.textContent}`),
            dismissAll: option.checks.QA_NESTED_COMPONENTS.dismissAll ? 'QA_NESTED_COMPONENTS' : false,
            developer: option.checks.QA_NESTED_COMPONENTS.developer || false,
          });
        }
      });
    }

    return results;
  }

  // Editoria11y override: replaces APCA dependency with Porter-Duff
  const alphaBlend = function(fg = [0,0,0,1], bg = [0,0,0]) {
  	const bgAlpha = 1 - fg[3];
  	return [
  		((fg[0] * fg[3]) + (bgAlpha * bg[0])),
  		((fg[1] * fg[3]) + (bgAlpha * bg[1])),
  		((fg[2] * fg[3]) + (bgAlpha * bg[2]))
  	];
  };

  /**
   * Normalizes a given font weight to a numeric value. Maps keywords to their numeric equivalents.
   * @param {string|number} weight - The font weight, either as a number or a keyword.
   * @returns {number} - The numeric font weight.
   */
  function normalizeFontWeight(weight) {
  	const numericWeight = parseInt(weight, 10);
  	if (!Number.isNaN(numericWeight)) return numericWeight;
  	const weightMap = {
  		lighter: 100,
  		normal: 400,
  		bold: 700,
  		bolder: 900,
  	};
  	return weightMap[weight] || 400;
  }

  /**
   * Convert colour string to RGBA format.
   * @param {string} color The colour string to convert.
   * @param {number} opacity The computed opacity of the element (0 to 1).
   * @returns Returns colour in rgba format with alpha value.
   */
  function convertToRGBA(color, opacity) {
  	const colorString = color;
  	let r;
  	let g;
  	let b;
  	let a = 1; // Initialize alpha to 1 by default.

  	if (!colorString.startsWith('rgb')) {
  		// Unsupported color spaces.
  		if (
  			colorString.startsWith('color(rec2020')
  			|| colorString.startsWith('color(display-p3')
  			|| colorString.startsWith('url(')
  		) {
  			return 'unsupported';
  		}

  		// Let the browser do conversion in rgb for non-supported colour spaces.
  		const canvas = document.createElement('canvas');
  		const context = canvas.getContext('2d');
  		context.fillStyle = colorString;
  		context.fillRect(0, 0, 1, 1);
  		const imageData = context.getImageData(0, 0, 1, 1);
  		[r, g, b, a] = imageData.data;
  		a = (a / 255).toFixed(2); // Convert alpha to range [0, 1]
  	} else {
  		// Parse RGB or RGBA values from the color string
  		const rgbaArray = colorString.match(/[\d.]+/g).map(Number);
  		[r, g, b, a] = rgbaArray.length === 4 ? rgbaArray : [...rgbaArray, 1];
  	}

  	// If element has opacity attribute, amend the foreground text color string.
  	if (opacity && opacity < 1) {
  		a = (a * opacity).toFixed(2); // Adjust alpha based on the opacity
  	}
  	return [r, g, b, Number(a)];
  }

  /**
   * Retrieves the background colour of an element by traversing up the DOM tree.
   * @param {HTMLElement} $el - The DOM element from which to start searching for the background.
   * @returns {string} - The background color in RGBA format, or "image" if background image.
   */
  function getBackground($el) {
  	let targetEl = $el;
  	while (targetEl && targetEl.nodeType === 1) {
  		// Element is within a shadow component.
  		if (Constants.Global.shadowDetection) {
  			const root = targetEl.getRootNode();
  			if (root instanceof ShadowRoot) {
  				// Traverse upward until the shadow root's host.
  				let node = targetEl;
  				while (node && node !== root.host) {
  					const styles = getComputedStyle(node);

  					// Background image check.
  					if (styles.backgroundImage && styles.backgroundImage !== 'none') {
  						return { type: 'image', value: styles.backgroundImage };
  					}

  					// Background colour check.
  					const bgColor = convertToRGBA(styles.backgroundColor);
  					if (bgColor[3] !== 0 && bgColor !== 'transparent') {
  						return bgColor;
  					}
  					node = node.parentElement;
  				}

  				// If nothing found within the shadow tree, continue with the host.
  				return getBackground(root.host);
  			}
  		}

  		// Element has background image.
  		const styles = getComputedStyle(targetEl);
  		const bgImage = styles.backgroundImage;
  		if (bgImage !== 'none') {
  			return { type: 'image', value: bgImage };
  		}

  		// Element has background colour.
  		const bgColor = convertToRGBA(styles.backgroundColor);
  		if (bgColor[3] !== 0 && bgColor !== 'transparent') {
  			// If the background colour has an alpha channel.
  			if (bgColor[3] < 1) {
  				// We need to find the first non-transparent parent background and blend them together.
  				let parentEl = targetEl.parentElement;
  				let parentBgColor = 'rgba(255, 255, 255, 1)';
  				while (parentEl && parentEl.nodeType === 1) {
  					const parentStyles = getComputedStyle(parentEl);
  					parentBgColor = parentStyles.backgroundColor;

  					// Stop, valid colour found.
  					if (parentBgColor !== 'rgba(0, 0, 0, 0)') break;

  					// If we reach the HTML tag, default to white.
  					if (parentBgColor === 'rgba(0, 0, 0, 0)' && parentEl.tagName === 'HTML') {
  						parentBgColor = 'rgba(255, 255, 255, 1)';
  					}

  					// Move up the DOM tree.
  					parentEl = parentEl.parentElement;
  				}
  				const parentColor = convertToRGBA(parentBgColor || 'rgba(255, 255, 255, 1)');

  				const blendedBG = alphaBlend(bgColor, parentColor);

  				return blendedBG;
  			}
  			// Return solid color immediately if no alpha channel.
  			return bgColor;
  		}
  		if (targetEl.tagName === 'HTML') {
  			return [255, 255, 255]; // Default to white if we reach the HTML tag.
  		}
  		targetEl = targetEl.parentNode;
  	}
  	return [255, 255, 255]; // Default to white if no background color is found.
  }

  /** Get the relative luminance of a colour based on WCAG 2.0
   * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   * @param {number[]} color Colour code in [R,G,B] format.
   * @returns Luminance value.
   */
  function getLuminance(color) {
  	const rgb = color.slice(0, 3).map((x) => {
  		const normalized = x / 255;
  		return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  	});
  	return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }

  /**
   * Get WCAG 2.0 contrast ratio from luminance value.
   * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
   * @param {number} l1 Luminance value of foreground colour.
   * @param {number} l2 Luminance value of background colour.
   * @returns WCAG 2.0 contrast ratio.
   */
  function getWCAG2Ratio(l1, l2) {
  	const lighter = Math.max(l1, l2);
  	const darker = Math.min(l1, l2);
  	return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Brighten a foreground text colour.
   * @param {number[]} color Text colour in [R,G,B,A] format.
   * @param {number} amount Number or increment to brighten by.
   * @returns Lighter foreground text colour.
   */
  function brighten(color, amount) {
  	return color.map((value, index) => {
  		if (index < 3) { // Only brighten [R,G,B]
  			const newValue = Math.ceil(value + (255 - value) * amount);
  			return newValue >= 255 ? 255 : newValue;
  		}
  		return value;
  	});
  }

  /**
   * Darken a foreground text colour.
   * @param {number[]} color Text colour in [R,G,B,A] format.
   * @param {number} amount Number or increment to darken by.
   * @returns Darker foreground text colour.
   */
  function darken(color, amount) {
  	return color.map((value, index) => {
  		if (index < 3) { // Only darken [R,G,B]
  			const newValue = Math.floor(value * (1 - amount));
  			return newValue <= 0 ? 0 : newValue;
  		}
  		return value;
  	});
  }

  /**
   * Get the hex code equivalent of an RGB colour.
   * @param {number[]} color Colour in [R,G,B,A] format.
   * @returns Hexcode equivalent.
   */
  function getHex(color) {
  	const [r, g, b] = color.map((value) => Math.min(255, Math.max(0, value)));
  	const hexR = r.toString(16).padStart(2, '0');
  	const hexG = g.toString(16).padStart(2, '0');
  	const hexB = b.toString(16).padStart(2, '0');
  	return `#${hexR}${hexG}${hexB}`;
  }

  /**
   * Get the display-friendly contrast value for output.
   * @param {Object} value - The value object containing the contrast ratio.
   * @returns {string|number} The formatted contrast ratio.
   */
  function ratioToDisplay(value) {
  	if (Constants.Global.contrastAPCA) {
  		return Math.abs(Number(value.toFixed(1)));
  	}
  	// Round to decimal places, and display without decimals if integer.
  	const truncatedRatio = Math.trunc(value * 10) / 10;
  	const formattedRatio = Number.isInteger(truncatedRatio)
  		? truncatedRatio.toFixed(0)
  		: truncatedRatio;
  	return `${formattedRatio}:1`;
  }

  /**
   * Calculate the contrast ratio or value between two colours.
   * @param {number[]} color Text colour in [R,G,B,A] format.
   * @param {Array} bg Background colour in [R,G,B,A] format.
   * @returns Either WCAG 2.0 contrast ratio or APCA contrast value.
   */
  function calculateContrast(color, bg) {
  	let ratio;
  	const blendedColor = alphaBlend(color, bg).slice(0, 4);
  	// Uses WCAG 2.0 contrast algorithm based on luminance.
  	const foreground = getLuminance(blendedColor);
  	const background = getLuminance(bg);
  	ratio = getWCAG2Ratio(foreground, background);
  	return { ratio, blendedColor };
  }

  /**
   * Suggest a foreground colour with sufficient contrast.
   * @param {number[]} color Text colour in [R,G,B,A] format.
   * @param {number[]} background Background colour in [R,G,B,A] format.
   * @param {boolean} isLargeText Whether text is normal or large size.
   * @param {boolean} contrastAAA Use WCAG AAA thresholds.
   * @returns Compliant colour hexcode.
   */
  function suggestColorWCAG(color, background, isLargeText, contrastAAA = false) {
  	let minContrastRatio;
  	if (contrastAAA) {
  		minContrastRatio = isLargeText ? 4.5 : 7;
  	} else {
  		minContrastRatio = isLargeText ? 3 : 4.5;
  	}

  	// Get luminance
  	const fgLuminance = getLuminance(color);
  	const bgLuminance = getLuminance(background);

  	// Determine if text color should be lightened or darkened (considers extreme values).
  	const adjustMode = fgLuminance > bgLuminance
  		? getWCAG2Ratio(1, bgLuminance) > minContrastRatio
  		: getWCAG2Ratio(0, bgLuminance) < minContrastRatio;

  	const adjustColor = (foregroundColor, amount, mode) => (
  		mode ? brighten(foregroundColor, amount) : darken(foregroundColor, amount)
  	);

  	let adjustedColor = color;
  	let lastValidColor = adjustedColor;
  	let contrastRatio = getWCAG2Ratio(fgLuminance, bgLuminance);
  	let bestContrast = contrastRatio;
  	let previousColor = color;

  	// Loop parameters.
  	let step = 0.16;
  	const percentChange = 0.5;
  	const precision = 0.01;
  	let iterations = 0;
  	const maxIterations = 100;

  	while (step >= precision) {
  		iterations += 1;

  		// Return null if no colour found.
  		if (iterations > maxIterations) {
  			return { color: null };
  		}

  		adjustedColor = adjustColor(adjustedColor, step, adjustMode);
  		const newLuminance = getLuminance(adjustedColor);
  		contrastRatio = getWCAG2Ratio(newLuminance, bgLuminance);

  		// console.log(`%c ${getHex(adjustedColor)} | ${contrastRatio}`, `color:${getHex(adjustedColor)};background:${getHex(background)}`);

  		// Save valid colour, go back to previous, and continue with a smaller step.
  		if (contrastRatio >= minContrastRatio) {
  			// Ensure new colour is closer to the contrast minimum than old colour.
  			lastValidColor = (contrastRatio <= bestContrast) ? adjustedColor : lastValidColor;
  			bestContrast = contrastRatio;
  			adjustedColor = previousColor;
  			step *= percentChange;
  		}

  		previousColor = adjustedColor;
  	}
  	return { color: getHex(lastValidColor) };
  }

  /**
   * Generates and inserts color suggestions for tooltip upon tooltip opening.
   * This function is referenced within './interface/tooltips.js'.
   * For performance reasons, it is only called upon tooltip opening.
   * @param {HTMLElement} container The container where the color suggestion will be inserted.
   */
  function generateColorSuggestion(contrastDetails) {
  	let adviceContainer;
  	const { color, background, fontWeight, fontSize, isLargeText, type } = contrastDetails;
  	if (
  		color && background && background.type !== 'image'
  		&& (type === 'text' || type === 'svg-error' || type === 'input')
  	) {
  		const suggested = suggestColorWCAG(color, background, isLargeText, Constants.Global.contrastAAA);

  		let advice;
  		const hr = '<hr aria-hidden="true">';
  		const style = `color:${suggested.color};background-color:${getHex(contrastDetails.background)};`;
  		const colorBadge = `<button id="suggest" class="badge" style="${style}">${suggested.color}</button>`;
  		`<strong class="normal-badge">${suggested.size}px</strong>`;

  		if (suggested.color === null) {
  			advice = `${hr} ${Lang._('NO_SUGGESTION')}`;
  		} else {
  			advice = `${hr} ${Lang._('CONTRAST_COLOR')} ${colorBadge}`;
  		}

  		// Append it to contrast details container.
  		adviceContainer = document.createElement('div');
  		adviceContainer.id = 'advice';

  		// If low opacity, suggest increase opacity first.
  		const suggestion = (contrastDetails.opacity < 1)
  			? `<hr aria-hidden="true"> ${Lang.sprintf('CONTRAST_OPACITY')}` : advice;

  		// Append advice to contrast details container.
  		adviceContainer.innerHTML = suggestion;
  	}
  	return adviceContainer;
  }

  /**
   * Inject contrast colour pickers into tooltip.
   * @param {HTMLElement} container The tooltip container to inject the contrast colour pickers.
   */
  function generateContrastTools(contrastDetails) {
  	const { sanitizedText, color, background, fontWeight, fontSize, ratio, textUnderline } = contrastDetails;

  	// Initialize variables.
  	const hasBackgroundColor = background && background.type !== 'image';
  	const backgroundHex = hasBackgroundColor ? getHex(background) : '#000000';
  	const foregroundHex = color ? getHex(color) : '#000000';

  	// Other properties.
  	const hasFontWeight = fontWeight ? `font-weight:${fontWeight};` : '';
  	const hasFontSize = fontSize ? `font-size:${fontSize}px;` : '';
  	const textDecoration = textUnderline ? `text-decoration:${textUnderline};` : '';

  	// If colour or background colour is unknown; visually indicate so.
  	const unknownFG = color
  		? '' : 'class="unknown"';
  	const unknownBG = background && background.type !== 'image'
  		? '' : 'class="unknown"';
  	const unknownFGText = color
  		? '' : `<span class="visually-hidden">(${Lang._('UNKNOWN')})</span>`;
  	const unknownBGText = background
  		? '' : `<span class="visually-hidden">(${Lang._('UNKNOWN')})</span>`;

  	// Ratio to be displayed.
  	let displayedRatio;

  	// WCAG 2.0 ratio.
  	displayedRatio = ratio || Lang._('UNKNOWN');

  	// Generate HTML layout.
  	const contrastTools = document.createElement('div');
  	contrastTools.id = 'contrast-tools';
  	contrastTools.innerHTML = `
      <hr aria-hidden="true">
      <div id="contrast" class="badge">${Lang._('CONTRAST')}</div>
      <div id="value" class="badge">${displayedRatio}</div>
      <div id="good" class="badge good-contrast" hidden>${Lang._('GOOD')} <span class="good-icon"></span></div>
      <div id="contrast-preview" style="color:${foregroundHex};${hasBackgroundColor ? `background:${backgroundHex};` : ''}${hasFontWeight + hasFontSize + textDecoration}">${sanitizedText}</div>
      <div id="color-pickers">
        <label for="fg-text">${Lang._('FG')} ${unknownFGText}
          <input type="color" id="fg-input" value="${foregroundHex}" ${unknownFG}/>
        </label>
        <label for="bg">${Lang._('BG')} ${unknownBGText}
          <input type="color" id="bg-input" value="${backgroundHex}" ${unknownBG}/>
        </label>
      </div>`;
  	return contrastTools;
  }

  /**
   * Initializes colour eyedroppers for respective tooltip.
   * This function is referenced within './interface/tooltips.js'.
   * @param {HTMLElement} container The container where the color suggestion will be inserted.
   * @param {Object} contrastDetails Contrast details object containing colour, background, etc.
   */
  function initializeContrastTools(container, contrastDetails) {
  	const contrastTools = container?.querySelector('#contrast-tools');
  	if (contrastTools) {
  		const { fontSize, fontWeight, type, isLargeText } = contrastDetails;

  		// Cache selectors
  		const contrast = container.querySelector('#contrast');
  		const contrastPreview = container.querySelector('#contrast-preview');
  		const fgInput = container.querySelector('#fg-input');
  		const bgInput = container.querySelector('#bg-input');
  		const ratio = container.querySelector('#value');
  		const good = container.querySelector('#good');

  		// Helper to update badge classes.
  		const toggleBadges = (elements, condition) => {
  			elements.forEach(($el) => {
  				$el.classList.toggle('good-contrast', condition);
  				$el.classList.toggle('error-badge', !condition);
  			});
  		};

  		// Update preview colors and contrast on input change.
  		const updatePreview = () => {
  			const fgColor = fgInput.value;
  			const bgColor = bgInput.value;

  			// Remove question mark from inputs.
  			[fgInput, bgInput].forEach((input) => input.classList.remove('unknown'));

  			// Adjust colours in preview area.
  			contrastPreview.style.color = fgColor;
  			contrastPreview.style.backgroundColor = bgColor;
  			contrastPreview.style.backgroundImage = 'none';

  			// Get contrast ratio.
  			const contrastValue = calculateContrast(convertToRGBA(fgColor), convertToRGBA(bgColor));
  			const elementsToToggle = [ratio, contrast];

  			// WCAG 2.0
  			const value = contrastValue.ratio;
  			ratio.textContent = ratioToDisplay(value);

  			const useAAA = Constants.Global.contrastAAA; // Use AAA thresholds if true, otherwise AA
  			const nonTextThreshold = 3;
  			const normalTextThreshold = useAAA ? 7 : 4.5;
  			const largeTextThreshold = useAAA ? 4.5 : 3;

  			const passesNonText = value >= nonTextThreshold;
  			const passesNormalText = value >= normalTextThreshold;
  			const passesLargeText = value >= largeTextThreshold;

  			switch (type) {
  			case 'svg-error':
  			case 'svg-text':
  			case 'svg-warning': {
  				good.hidden = !passesNonText;
  				toggleBadges(elementsToToggle, passesNonText);
  				break;
  			}
  			default: {
  				if (isLargeText) {
  					toggleBadges([ratio, contrast], passesLargeText);
  					good.hidden = !passesLargeText;
  				} else {
  					toggleBadges([ratio, contrast], passesNormalText);
  					good.hidden = !passesNormalText;
  				}
  				break;
  			}
  			}
  		};

  		// Event listeners for both colour inputs.
  		fgInput.addEventListener('input', updatePreview);
  		bgInput.addEventListener('input', updatePreview);

  		// Clicking on suggested colour updates preview and saves value to clipboard.
  		setTimeout(() => {
  			const suggest = container.querySelector('#suggest');
  			if (suggest) {
  				const updatePreviewWithSuggested = () => {
  					const hex = suggest.textContent;
  					fgInput.value = hex;
  					updatePreview();
  					navigator.clipboard.writeText(hex).catch(() => { });
  				};
  				suggest.addEventListener('click', updatePreviewWithSuggested);
  			}
  		}, 0);
  	}
  }

  /**
   * Calculate an elements contrast based on WCAG 2.0 contrast algorithm.
   * @param {HTMLElement} $el The element in the DOM.
   * @param {number[]} color Text colour in [R,G,B,A] format.
   * @param {Array} background Background colour in [R,G,B,A] format.
   * @param {number} fontSize Element's font size.
   * @param {number} fontWeight Element's font weight.
   * @param {number} opacity Element's opacity value.
   * @param {boolean} contrastAAA Check if AAA threshold is required.
   * @returns {Object} Object containing the element, ratio, and extra details.
   */
  function wcagAlgorithm($el, color, background, fontSize, fontWeight, opacity, contrastAAA = false) {
  	const { ratio, blendedColor } = calculateContrast(color, background);
  	const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);

  	let hasLowContrast;
  	if (contrastAAA) {
  		hasLowContrast = isLargeText ? ratio < 4.5 : ratio < 7;
  	} else {
  		const hasLowContrastNormalText = ratio > 1 && ratio < 4.5;
  		hasLowContrast = isLargeText ? ratio < 3 : hasLowContrastNormalText;
  	}

  	if (hasLowContrast) {
  		return {
  			$el,
  			ratio: ratioToDisplay(ratio),
  			color: blendedColor,
  			background,
  			fontSize,
  			fontWeight,
  			isLargeText,
  			opacity,
  			textUnderline: getComputedStyle($el).textDecorationLine,
  		};
  	}
  	return null;
  }

  /**
   * Check an element's contrast based on WCAG 2.0 algorithm.
   * @param {HTMLElement} $el The element in the DOM.
   * @param {number[]} color Text colour in [R,G,B,A] format.
   * @param {Array} background Background colour in [R,G,B,A] format.
   * @param {number} fontSize Element's font size.
   * @param {number} fontWeight Element's font weight.
   * @param {number} opacity Element's opacity value.
   * @param {boolean} contrastAAA Use WCAG 2.0 AAA thresholds.
   * @returns {Object} Object containing the element, ratio, and extra details.
   */
  function checkElementContrast(
  	$el, color, background, fontSize, fontWeight, opacity, contrastAAA = false,
  ) {
  	return wcagAlgorithm($el, color, background, fontSize, fontWeight, opacity, contrastAAA);
  }

  /**
   * Rulesets: Contrast
   * @param {Array} results Sa11y's results array.
   * @param {Object} option Sa11y's options object.
   * @returns Contrast results.
   * APCA contrast checking is experimental. References:
   * @link https://github.com/jasonday/color-contrast
   * @link https://github.com/gka/chroma.js
   * @link https://github.com/Myndex/SAPC-APCA
   */
  function checkContrast(results, option) {
    // Initialize contrast results array.
    const contrastResults = [];

    // Iterate through all elements on the page and get computed styles.
    for (let i = 0; i < Elements.Found.Contrast.length; i++) {
      const $el = Elements.Found.Contrast[i];
      const style = getComputedStyle($el);

      // Get computed styles.
      const opacity = parseFloat(style.opacity);
      const color = convertToRGBA(style.color, opacity);
      const fontSize = parseFloat(style.fontSize);
      const getFontWeight = style.fontWeight;
      const fontWeight = normalizeFontWeight(getFontWeight);
      const background = getBackground($el);

      // Check if element is visually hidden to screen readers or explicitly hidden.
      const isVisuallyHidden = isScreenReaderOnly($el);
      const isExplicitlyHidden = isElementHidden($el);
      const isHidden = isExplicitlyHidden || isVisuallyHidden || opacity === 0 || fontSize === 0;

      // Filter only text nodes.
      const textString = Array.from($el.childNodes)
        .filter((node) => node.nodeType === 3)
        .map((node) => node.textContent)
        .join('');
      const text = textString.trim();

      // Inputs to check
      const checkInputs = ['SELECT', 'INPUT', 'TEXTAREA'].includes($el.tagName);

      // Only check elements with text and inputs.
      if (text.length !== 0 || checkInputs) {
        const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);
        if (color === 'unsupported' || background === 'unsupported') {
          contrastResults.push({
            $el,
            type: 'unsupported',
            fontSize,
            fontWeight,
            isLargeText,
            opacity,
            ...(background !== 'unsupported' && { background }),
            ...(color !== 'unsupported' && { color }),
          });
        } else if (background.type === 'image') {
          if (!isHidden) {
            contrastResults.push({
              $el,
              type: 'background-image',
              color,
              isLargeText,
              background,
              fontSize,
              fontWeight,
              opacity,
            });
          }
        } else if (!isHidden && getHex(color) !== getHex(background)) {
          const result = checkElementContrast(
            $el, color, background, fontSize, fontWeight, opacity, option.contrastAAA,
          );
          if (result) {
            result.type = checkInputs ? 'input' : 'text';
            contrastResults.push(result);
          }
        }
      }
    }

    // Iterate through all SVGs on the page, separately.
    Elements.Found.Svg.forEach(($el) => {
      const generalWarning = { $el, type: 'svg-warning' };

      // Get background.
      const background = getBackground($el);
      const hasBackground = background !== 'unsupported' && background.type !== 'image';

      // Process simple SVGs with a single shape.
      const shapes = $el.querySelectorAll('path, rect, circle, ellipse, polygon, text, use');

      // Push a general warning for any complex SVGs.
      const complex = $el.querySelectorAll('*:not(path):not(rect):not(circle):not(ellipse):not(polygon):not(text):not(use):not(title)');

      // Check if all nodes within the SVG have the same fill/stroke/opacity.
      let allSameColour = false;
      if (shapes.length) {
        const ref = getComputedStyle(shapes[0]);
        allSameColour = Array.from(shapes).every((node) => {
          const style = getComputedStyle(node);
          return (
            style.fill === ref.fill
            && style.fillOpacity === ref.fillOpacity
            && style.stroke === ref.stroke
            && style.strokeOpacity === ref.strokeOpacity
            && style.opacity === ref.opacity
          );
        });
      }

      // If simple SVG (single path) or complex SVG with same colour.
      if ((shapes.length === 1 || allSameColour) && complex.length === 0) {
        const style = getComputedStyle(shapes[0]);
        const { fill, stroke, strokeWidth, opacity } = style;

        // Get computed stroke width/convert % to number.
        let strokePx = 0;
        const { width, height } = $el.getBBox();
        if (stroke && stroke !== 'none') {
          if (strokeWidth.endsWith('%')) {
            strokePx = (parseFloat(strokeWidth) / 100) * Math.min(width, height);
          } else {
            strokePx = ['inherit', 'initial', 'unset'].includes(strokeWidth)
              ? 1 : parseFloat(strokeWidth);
          }
        }

        // Threshold is arbitrary/not WCAG. Smaller threshold for smaller SVGs.
        const threshold = Math.min(width, height) < 50 ? 1 : 3;
        const hasStroke = stroke && strokePx >= threshold && stroke !== 'none';

        // Get resolved fill colour.
        const hasFill = fill && fill !== 'none' && !fill.startsWith('url(');
        const resolvedFill = fill === 'currentColor'
          ? convertToRGBA(getComputedStyle(shapes[0]).color, opacity)
          : convertToRGBA(fill, opacity);

        // Get resolved stroke colour.
        const resolvedStroke = stroke === 'currentColor'
          ? convertToRGBA(getComputedStyle(shapes[0]).color, opacity)
          : convertToRGBA(stroke, opacity);

        // If supported colours and has background, we can calculate contrast.
        const supported = ![resolvedFill, resolvedStroke].includes('unsupported');
        if (supported && hasBackground) {
          let contrastValue;
          let fillPasses = false;
          let strokePasses = false;

          if (hasFill) {
            contrastValue = calculateContrast(resolvedFill, background);
            fillPasses = option.contrastAPCA
              ? contrastValue.ratio >= 45
              : contrastValue.ratio >= 3;
          }

          if (hasStroke) {
            contrastValue = calculateContrast(resolvedStroke, background);
            strokePasses = option.contrastAPCA
              ? contrastValue.ratio >= 45
              : contrastValue.ratio >= 3;
          }

          // Calculate contrast of both stroke and fill.
          const failsBoth = hasFill && hasStroke && !fillPasses && !strokePasses;
          const failsFill = hasFill && !hasStroke && !fillPasses;
          const failsStroke = !hasFill && hasStroke && !strokePasses;

          // Fails
          if (failsBoth || failsFill || failsStroke) {
            // Get hex values.
            const bgHex = getHex(background);
            const fillHex = getHex(resolvedFill);
            const strokeHex = getHex(resolvedStroke);

            // Ignore if foreground equals background.
            if ((fillHex === bgHex && !hasStroke) || (strokeHex === bgHex && !hasFill)) {
              return;
            }

            // Push an error for simple SVGs.
            contrastResults.push({
              $el,
              ratio: ratioToDisplay(contrastValue.ratio),
              color: contrastValue.blendedColor,
              type: 'svg-error',
              isLargeText: true, // To push a suggested colour (3:1).
              background,
            });
          }
        } else {
          // General warning for complex SVGs with multiple shapes.
          // Push whatever colour is valid.
          if (hasFill && resolvedFill !== 'unsupported') {
            generalWarning.color = resolvedFill;
          } else if (hasStroke && resolvedStroke !== 'unsupported') {
            generalWarning.color = resolvedStroke;
          }
          if (hasBackground) generalWarning.background = background;
          contrastResults.push(generalWarning);
        }
      } else {
        // General warning for complex SVGs.
        if (hasBackground) generalWarning.background = background;
        contrastResults.push(generalWarning);
      }
    });

    // Check contrast of all placeholder elements.
    Elements.Found.Inputs.forEach(($el) => {
      if ($el.placeholder && $el.placeholder.length !== 0) {
        const placeholder = getComputedStyle($el, '::placeholder');
        const pColor = convertToRGBA(placeholder.getPropertyValue('color'));
        const pSize = parseFloat(placeholder.fontSize);
        const pWeight = normalizeFontWeight(placeholder.fontWeight);
        const pBackground = getBackground($el);
        const pOpacity = parseFloat(placeholder.opacity);

        // Placeholder has background image.
        if (pColor === 'unsupported') {
          // Unsupported colour
          contrastResults.push({ $el, type: 'placeholder-unsupported' });
        } else if (pBackground.type === 'image') ; else {
          const result = checkElementContrast($el, pColor, pBackground, pSize, pWeight, pOpacity, option.contrastAAA);
          if (result) {
            result.type = 'placeholder';
            contrastResults.push(result);
          }
        }
      }
    });

    // Do some extra processing on warnings.
    const processWarnings = (warnings) => {
      // Separate warnings based on type.
      const backgroundImages = warnings.filter((warning) => warning.type === 'background-image');
      const otherWarnings = warnings.filter((warning) => warning.type !== 'background-image');

      let processedBackgroundWarnings;

      // Process background-image warnings based on option.contrastAPCA.
      if (option.contrastAPCA) {
        // Do not group warnings, return each warning as-is.
        processedBackgroundWarnings = backgroundImages.map((warning) => ({ ...warning }));
      } else {
        // Group background-image warnings if they share same BG and FG colours.
        const groupedWarnings = backgroundImages.reduce((groups, warning) => {
          const grouped = groups;
          const groupKey = JSON.stringify({
            background: warning.background.value,
            color: warning.color,
            isLargeText: warning.isLargeText,
          });
          if (!grouped[groupKey]) grouped[groupKey] = [];
          grouped[groupKey].push(warning);
          return grouped;
        }, {});

        // Process each group.
        processedBackgroundWarnings = Object.values(groupedWarnings).map((group) => ({ ...group[0] }));
      }

      // Combine processed background-image warnings with other warnings.
      return [...processedBackgroundWarnings, ...otherWarnings];
    };

    const processedResults = processWarnings(contrastResults);

    // Iterate through all contrast results.
    processedResults.forEach((item) => {
      const { $el, ratio } = item;
      const updatedItem = item;

      // Annotation placement.
      const element = $el.tagName === 'OPTION' ? $el.closest('datalist, select, optgroup') : $el;

      // Process text within element.
      const nodeText = fnIgnore(element, ['option:not(option:first-child)']);
      const text = getText(nodeText);

      // Content for tooltip.
      const truncatedText = truncateString(text, 80);
      const sanitizedText = sanitizeHTML(truncatedText);

      // Preview text
      let previewText;
      if (item.type === 'placeholder' || item.type === 'placeholder-unsupported') {
        previewText = sanitizeHTML($el.placeholder);
      } else if (item.type === 'svg-error' || item.type === 'svg-warning') {
        previewText = '';
      } else {
        previewText = sanitizedText;
      }
      updatedItem.sanitizedText = previewText;

      // Reference necessary ratios for compliance.
      let ratioTip = '';
      if (!option.contrastAPCA) {
        const normal = option.contrastAAA ? '7:1' : '4.5:1';
        const large = option.contrastAAA ? '4.5:1' : '3:1';
        const ratioToDisplay = item.isLargeText ? large : normal;
        const ratioRequirement = item.isLargeText ? 'CONTRAST_LARGE' : 'CONTRAST_NORMAL';
        ratioTip = ` ${Lang.sprintf(ratioRequirement, ratioToDisplay)}`;
      }
      const graphicsTip = option.contrastAPCA ? '' : ` ${Lang.sprintf('CONTRAST_TIP_GRAPHIC')}`;

      // Iterate through contrast results based on type.
      switch (item.type) {
        case 'text':
          if (option.checks.CONTRAST_ERROR) {
            results.push({
              test: 'CONTRAST_ERROR',
              element: $el,
              type: option.checks.CONTRAST_ERROR.type || 'error',
              content: option.checks.CONTRAST_ERROR.content
                ? Lang.sprintf(option.checks.CONTRAST_ERROR.content)
                : Lang.sprintf('CONTRAST_ERROR') + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
              dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? 'CONTRAST_ERROR' : false,
              developer: option.checks.CONTRAST_ERROR.developer || false,
              contrastDetails: updatedItem,
            });
          }
          break;
        case 'input':
          if (option.checks.CONTRAST_INPUT) {
            const sanitizedInput = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: 'CONTRAST_INPUT',
              element,
              type: option.checks.CONTRAST_INPUT.type || 'error',
              content: option.checks.CONTRAST_INPUT.content
                ? Lang.sprintf(option.checks.CONTRAST_INPUT.content)
                : Lang.sprintf('CONTRAST_INPUT', ratio) + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedInput}`),
              dismissAll: option.checks.CONTRAST_INPUT.dismissAll ? 'CONTRAST_INPUT' : false,
              developer: option.checks.CONTRAST_INPUT.developer || true,
              contrastDetails: updatedItem,
            });
          }
          break;
        case 'placeholder':
          if (option.checks.CONTRAST_PLACEHOLDER) {
            const sanitizedPlaceholder = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: 'CONTRAST_PLACEHOLDER',
              element: $el,
              type: option.checks.CONTRAST_PLACEHOLDER.type || 'error',
              content: option.checks.CONTRAST_PLACEHOLDER.content
                ? Lang.sprintf(option.checks.CONTRAST_PLACEHOLDER.content)
                : Lang.sprintf('CONTRAST_PLACEHOLDER') + ratioTip,
              position: 'afterend',
              dismiss: prepareDismissal(`CPLACEHOLDER${sanitizedPlaceholder}`),
              dismissAll: option.checks.CONTRAST_PLACEHOLDER.dismissAll ? 'CONTRAST_PLACEHOLDER' : false,
              developer: option.checks.CONTRAST_PLACEHOLDER.developer || true,
              contrastDetails: updatedItem,
            });
          }
          break;
        case 'placeholder-unsupported':
          if (option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED) {
            const sanitizedPlaceholder = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: 'CONTRAST_PLACEHOLDER_UNSUPPORTED',
              element: $el,
              type: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.type || 'warning',
              content: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.content
                ? Lang.sprintf(option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.content)
                : Lang.sprintf('CONTRAST_PLACEHOLDER_UNSUPPORTED') + ratioTip,
              position: 'afterend',
              dismiss: prepareDismissal(`CPLACEHOLDERUN${sanitizedPlaceholder}`),
              dismissAll: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.dismissAll
                ? 'CONTRAST_PLACEHOLDER_UNSUPPORTED' : false,
              developer: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.developer || true,
              contrastDetails: updatedItem,
            });
          }
          break;
        case 'svg-error':
          if (option.checks.CONTRAST_ERROR_GRAPHIC) {
            const sanitizedSVG = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: 'CONTRAST_ERROR_GRAPHIC',
              element: $el,
              type: option.checks.CONTRAST_ERROR_GRAPHIC.type || 'error',
              content: option.checks.CONTRAST_ERROR_GRAPHIC.content
                ? Lang.sprintf(option.checks.CONTRAST_ERROR_GRAPHIC.content)
                : Lang.sprintf('CONTRAST_ERROR_GRAPHIC') + graphicsTip,
              dismiss: prepareDismissal(`CONTRASTERROR${sanitizedSVG}`),
              dismissAll: option.checks.CONTRAST_ERROR_GRAPHIC.dismissAll ? 'CONTRAST_ERROR_GRAPHIC' : false,
              developer: option.checks.CONTRAST_ERROR_GRAPHIC.developer || true,
              contrastDetails: updatedItem,
              margin: '-25px',
            });
          }
          break;
        case 'svg-warning':
          if (option.checks.CONTRAST_WARNING_GRAPHIC) {
            const sanitizedSVG = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: 'CONTRAST_WARNING_GRAPHIC',
              element: $el,
              type: option.checks.CONTRAST_WARNING_GRAPHIC.type || 'warning',
              content: option.checks.CONTRAST_WARNING_GRAPHIC.content
                ? Lang.sprintf(option.checks.CONTRAST_WARNING_GRAPHIC.content)
                : Lang.sprintf('CONTRAST_WARNING_GRAPHIC') + graphicsTip,
              dismiss: prepareDismissal(`CONTRASTWARNING${sanitizedSVG}`),
              dismissAll: option.checks.CONTRAST_WARNING_GRAPHIC.dismissAll ? 'CONTRAST_WARNING_GRAPHIC' : false,
              developer: option.checks.CONTRAST_WARNING_GRAPHIC.developer || true,
              contrastDetails: updatedItem,
              margin: '-25px',
            });
          }
          break;
        case 'background-image':
          if (option.checks.CONTRAST_WARNING) {
            results.push({
              test: 'CONTRAST_WARNING',
              element,
              type: option.checks.CONTRAST_WARNING.type || 'warning',
              content: option.checks.CONTRAST_WARNING.content
                ? Lang.sprintf(option.checks.CONTRAST_WARNING.content)
                : Lang.sprintf('CONTRAST_WARNING') + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
              dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? 'CONTRAST_WARNING' : false,
              developer: option.checks.CONTRAST_WARNING.developer || false,
              contrastDetails: updatedItem,
            });
          }
          break;
        case 'unsupported':
          if (option.checks.CONTRAST_UNSUPPORTED) {
            results.push({
              test: 'CONTRAST_UNSUPPORTED',
              element,
              type: option.checks.CONTRAST_UNSUPPORTED.type || 'warning',
              content: option.checks.CONTRAST_UNSUPPORTED.content
                ? Lang.sprintf(option.checks.CONTRAST_UNSUPPORTED.content)
                : Lang.sprintf('CONTRAST_WARNING') + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
              dismissAll: option.checks.CONTRAST_UNSUPPORTED.dismissAll ? 'CONTRAST_UNSUPPORTED' : false,
              developer: option.checks.CONTRAST_UNSUPPORTED.developer || false,
              contrastDetails: updatedItem,
            });
          }
          break;
      }
    });
    return results;
  }

  function checkDeveloper(results, option) {
    /* *************************************************************** */
    /*  Error: Missing language tag. Lang should be at least 2 chars.  */
    /* *************************************************************** */
    if (option.checks.META_LANG) {
      if (!Elements.Found.Language || Elements.Found.Language.length < 2) {
        results.push({
          test: 'META_LANG',
          type: option.checks.META_LANG.type || 'error',
          content: Lang.sprintf(option.checks.META_LANG.content || 'META_LANG'),
          dismiss: prepareDismissal('LANG'),
          developer: option.checks.META_LANG.developer || true,
        });
      }
    }

    /* *************************************************************** */
    /*  Check for missing meta page title <title>                      */
    /* *************************************************************** */
    if (option.checks.META_TITLE) {
      const metaTitle = document.querySelector('title:not(svg title)');
      if (!metaTitle || metaTitle.textContent.trim().length === 0) {
        results.push({
          test: 'META_TITLE',
          type: option.checks.META_TITLE.type || 'error',
          content: Lang.sprintf(option.checks.META_TITLE.content || 'META_TITLE'),
          dismiss: prepareDismissal('TITLE'),
          developer: option.checks.META_TITLE.developer || true,
        });
      }
    }

    /* ********************************************* */
    /*  Zooming and scaling must not be disabled.    */
    /* ********************************************* */
    if (option.checks.META_SCALABLE || option.checks.META_MAX) {
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        const content = metaViewport.getAttribute('content');
        if (content) {
          // Parse the content attribute to extract parameters.
          const params = content.split(',').reduce((acc, param) => {
            const [key, value] = param.split('=').map((s) => s.trim());
            acc[key] = value;
            return acc;
          }, {});

          // Check for user-scalable parameter.
          if (option.checks.META_SCALABLE && (params['user-scalable'] === 'no' || params['user-scalable'] === '0')) {
            results.push({
              test: 'META_SCALABLE',
              type: option.checks.META_SCALABLE.type || 'error',
              content: Lang.sprintf(option.checks.META_SCALABLE.content || 'META_SCALABLE'),
              dismiss: prepareDismissal('SCALABLE'),
              developer: option.checks.META_SCALABLE.developer || true,
            });
          }

          // Check maximum-scale parameter.
          const maxScale = parseFloat(params['maximum-scale']);
          if (option.checks.META_MAX && !Number.isNaN(maxScale) && maxScale < 2) {
            results.push({
              test: 'META_MAX',
              type: option.checks.META_MAX.type || 'error',
              content: Lang.sprintf(option.checks.META_MAX.content || 'META_MAX'),
              dismiss: prepareDismissal('MAXSCALE'),
              developer: option.checks.META_MAX.developer || true,
            });
          }
        }
      }
    }

    /* ****************************************** */
    /*  Page shouldn't automatically refresh.     */
    /* ****************************************** */
    if (option.checks.META_REFRESH) {
      const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
      if (metaRefresh) {
        results.push({
          test: 'META_REFRESH',
          type: option.checks.META_REFRESH.type || 'error',
          content: Lang.sprintf(option.checks.META_REFRESH.content || 'META_REFRESH'),
          dismiss: prepareDismissal('REFRESH'),
          developer: option.checks.META_REFRESH.developer || true,
        });
      }
    }

    /* *************************************************************** */
    /*  Check for duplicate IDs that are referenced by other elements. */
    /* *************************************************************** */
    if (option.checks.DUPLICATE_ID) {
      // Look for duplicate IDs within each DOM.
      const doms = document.querySelectorAll('body, [data-sa11y-has-shadow-root]');
      doms.forEach((dom) => {
        const allIds = new Set();
        const findDuplicateIds = (ids, withinDOM) => {
          ids.forEach(($el) => {
            const { id } = $el;

            // Ignore empty IDs.
            if (typeof id !== 'string' || id.trim().length === 0) {
              return;
            }

            // Only flag duplicate IDs being referenced by same-page links, aria or a label.
            // Reference: https://accessibilityinsights.io/info-examples/web/duplicate-id-aria/
            if (id && !allIds.has(id)) {
              allIds.add(id);
            } else {
              const ariaReference = Array.from(
                withinDOM.querySelectorAll(`
                a[href*="${id}"],
                label[for*="${id}"],
                [aria-labelledby*="${id}"],
                [aria-controls*="${id}"],
                [aria-owns*="${id}"]`),
              );
              if (ariaReference.length > 0) {
                results.push({
                  test: 'DUPLICATE_ID',
                  element: $el,
                  type: option.checks.DUPLICATE_ID.type || 'error',
                  content: Lang.sprintf(option.checks.DUPLICATE_ID.content || 'DUPLICATE_ID', id),
                  dismiss: prepareDismissal(`DUPLICATEID${id}${$el.textContent}`),
                  dismissAll: option.checks.DUPLICATE_ID.dismissAll ? 'DUPLICATE_ID' : false,
                  developer: option.checks.DUPLICATE_ID.developer || true,
                });
              }
            }
          });
        };

        // Look for duplicate IDs within shadow DOMs.
        if (dom.shadowRoot) {
          const shadowRootIds = Array.from(
            dom.shadowRoot.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`),
          );
          findDuplicateIds(shadowRootIds, dom.shadowRoot);
        }

        // Look for duplicates IDs in document body.
        const regularIds = Array.from(
          dom.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`),
        );
        findDuplicateIds(regularIds, dom);
      });
    }

    /* ********************************************* */
    /*  Buttons must have an accessible name.        */
    /* ********************************************* */
    if (option.checks.BTN_EMPTY || option.checks.BTN_EMPTY_LABELLEDBY || option.checks.BTN_LABEL || option.checks.HIDDEN_FOCUSABLE || option.checks.LABEL_IN_NAME) {
      Elements.Found.Buttons.forEach(($el) => {
        const accName = computeAccessibleName($el);
        const buttonText = accName.replace(/'|"|-|\.|\s+/g, '').toLowerCase();

        // Dismissal key.
        const key = prepareDismissal(`BTN${$el.tagName + $el.id + $el.className + accName}`);

        // Has ARIA
        const hasAria = $el.querySelector(':scope [aria-labelledby], :scope [aria-label]') || $el.getAttribute('aria-labelledby') || $el.getAttribute('aria-label');
        const hasAriaLabelledby = $el.querySelector(':scope [aria-labelledby]') || $el.getAttribute('aria-labelledby');
        const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
        const negativeTabindex = $el.getAttribute('tabindex') === '-1';

        // Button has aria-hidden but is still focusable.
        if (ariaHidden) {
          if (!negativeTabindex) {
            if (option.checks.HIDDEN_FOCUSABLE) {
              results.push({
                test: 'HIDDEN_FOCUSABLE',
                element: $el,
                type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
                content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
                dismiss: key,
                dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? 'BTN_HIDDEN_FOCUSABLE' : false,
                developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
              });
            }
          }
          return;
        }

        // Button doesn't have an accessible name.
        if (buttonText.length === 0) {
          if (option.checks.BTN_EMPTY_LABELLEDBY && hasAriaLabelledby) {
            results.push({
              test: 'BTN_EMPTY_LABELLEDBY',
              element: $el,
              type: option.checks.BTN_EMPTY_LABELLEDBY.type || 'error',
              content: option.checks.BTN_EMPTY_LABELLEDBY.content
                ? Lang.sprintf(option.checks.BTN_EMPTY_LABELLEDBY.content)
                : `${Lang.sprintf('BTN_EMPTY_LABELLEDBY')} ${Lang.sprintf('BTN_TIP')}`,
              dismiss: prepareDismissal(key),
              dismissAll: option.checks.BTN_EMPTY_LABELLEDBY.dismissAll ? 'BTN_EMPTY_LABELLEDBY' : false,
              developer: option.checks.BTN_EMPTY_LABELLEDBY.developer || true,
            });
          } else if (option.checks.BTN_EMPTY) {
            results.push({
              test: 'BTN_EMPTY',
              element: $el,
              type: option.checks.BTN_EMPTY.type || 'error',
              content: option.checks.BTN_EMPTY.content
                ? Lang.sprintf(option.checks.BTN_EMPTY.content)
                : `${Lang.sprintf('BTN_EMPTY')} ${Lang.sprintf('BTN_TIP')}`,
              dismiss: key,
              dismissAll: option.checks.BTN_EMPTY.dismissAll ? 'BTN_EMPTY' : false,
              developer: option.checks.BTN_EMPTY.developer || true,
            });
          }
          return;
        }

        // Button must have visible label as part of their accessible name.
        const isVisibleTextInAccessibleName$1 = isVisibleTextInAccessibleName($el);
        if (option.checks.LABEL_IN_NAME && hasAria && isVisibleTextInAccessibleName$1) {
          const sanitizedText = sanitizeHTML(accName);
          results.push({
            test: 'LABEL_IN_NAME',
            element: $el,
            type: option.checks.LABEL_IN_NAME.type || 'warning',
            content: option.checks.LABEL_IN_NAME.content
              ? Lang.sprintf(option.checks.LABEL_IN_NAME.content, sanitizedText)
              : `${Lang.sprintf('LABEL_IN_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
            dismiss: key,
            dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? 'BTN_LABEL_IN_NAME' : false,
            developer: option.checks.LABEL_IN_NAME.developer || true,
          });
          return;
        }

        // Has "button" in the accessible name.
        if (option.checks.BTN_ROLE_IN_NAME && accName.includes(Lang._('BTN'))) {
          results.push({
            test: 'BTN_ROLE_IN_NAME',
            element: $el,
            type: option.checks.BTN_ROLE_IN_NAME.type || 'warning',
            content: option.checks.BTN_ROLE_IN_NAME.content
              ? Lang.sprintf(option.checks.BTN_ROLE_IN_NAME.content)
              : `${Lang.sprintf('BTN_ROLE_IN_NAME')} ${Lang.sprintf('BTN_TIP')}`,
            dismiss: key,
            dismissAll: option.checks.BTN_ROLE_IN_NAME.dismissAll ? 'BTN_ROLE_IN_NAME' : false,
            developer: option.checks.BTN_ROLE_IN_NAME.developer || true,
          });
        }
      });
    }

    /* ********************************************************** */
    /* <li> elements must be contained in a <ul>/<ol>/<menu>.     */
    /* ********************************************************** */
    if (option.checks.UNCONTAINED_LI) {
      Elements.Found.Lists.forEach(($el) => {
        if (!$el.closest('ul, ol, menu')) {
          results.push({
            test: 'UNCONTAINED_LI',
            element: $el,
            type: option.checks.UNCONTAINED_LI.type || 'error',
            content: Lang.sprintf(option.checks.UNCONTAINED_LI.content || 'UNCONTAINED_LI'),
            dismiss: prepareDismissal(`UNCONTAINEDLI${$el.textContent}`),
            dismissAll: option.checks.UNCONTAINED_LI.dismissAll ? 'UNCONTAINED_LI' : false,
            developer: option.checks.UNCONTAINED_LI.developer || true,
          });
        }
      });
    }

    /* ****************************************** */
    /*  No tabindex values greater than 0.        */
    /* ****************************************** */
    if (option.checks.TABINDEX_ATTR) {
      Elements.Found.TabIndex.forEach(($el) => {
        results.push({
          test: 'TABINDEX_ATTR',
          element: $el,
          type: option.checks.TABINDEX_ATTR.type || 'error',
          content: Lang.sprintf(option.checks.TABINDEX_ATTR.content || 'TABINDEX_ATTR'),
          dismiss: prepareDismissal(`TABINDEX${$el.tagName + $el.id + $el.className}`),
          dismissAll: option.checks.TABINDEX_ATTR.dismissAll ? 'TABINDEX_ATTR' : false,
          developer: option.checks.TABINDEX_ATTR.developer || true,
        });
      });
    }

    return results;
  }

  const intersect = function(a, b, x = 10) {
  	// Compute intersect using browser offsets.
  	return (a.left - x <= b.right &&
  		b.left - x <= a.right &&
  		a.top - x <= b.bottom &&
  		b.top - x <= a.bottom);
  };

  const overlap = function(rect1Left, rect1Top, rect2Left, rect2Top, size = 17) {
  	// Yes this looks like intersect const, but it's math not browser offsets.
  	return !(rect1Left + size < rect2Left ||
  		rect1Left > rect2Left + size ||
  		rect1Top + size < rect2Top ||
  		rect1Top > rect2Top + size);
  };

  const nudgeMark = function (el, x, y) {
  	// todo: these can get nudged out of an editable area.
  	if (el.style.transform) {
  		const computedStyle = window.getComputedStyle(el);
  		let matrix = computedStyle.getPropertyValue('transform');
  		matrix = matrix.split(',');
  		el.style.transform = `translate(${parseFloat(matrix[4]) + x}px, ${parseFloat(matrix[5]) + y}px)`;
  	} else {
  		el.style.transform = `translate(${x}px, ${y}px)`;
  	}
  };

  const scrollableElem = function(el) {
  	let overflowing = el.clientHeight && el.clientHeight < el.scrollHeight;
  	if (overflowing) {
  		const styles = window.getComputedStyle(el);
  		overflowing = styles.overflowY !== 'visible';
  	}
  	return overflowing;
  };

  function closestScrollable(el) {
  	if (Options.constrainButtons && el.closest(Options.constrainButtons)) {
  		return el.closest(Options.constrainButtons);
  	}

  	let parent = el.parentElement;
  	if (parent && parent.tagName !== 'BODY') {
  		// Parent exists
  		if (scrollableElem(parent)) {
  			// Return if scrollable found.
  			return parent;
  		} else {
  			// Element is not scrollable, recurse
  			parent = closestScrollable(parent);
  			// Return if scrollable found.
  			return parent;
  		}
  	} else {
  		// No scrollable parents.
  		return false;
  	}
  }


  // Applies parameters and avoids other widgets.
  function alignPanel() {
  	if (!UI.panelElement) {
  		return false;
  	}
  	if (Options.panelPosition === 'left') {
  		UI.panel.classList.add('ed11y-pin-left');
  	}
  	let xMost = 0;
  	let yMost = 0;
  	if (Elements.Found.panelNoCover) {
  		Elements.Found.panelNoCover.forEach(el => {
  			let bounds = el.getBoundingClientRect();
  			if (Options.panelPosition === 'right') {
  				xMost = window.innerWidth - bounds.left > xMost && bounds.left > window.innerWidth / 3 ? window.innerWidth - bounds.left : xMost;
  			} else {
  				xMost = bounds.right > xMost && xMost + bounds.right < window.innerWidth / 3 ? xMost + bounds.right : xMost;
  			}
  			yMost = bounds.height > yMost && bounds.height + yMost < window.innerHeight / 2 ? yMost + bounds.height : yMost;
  		});
  	}
  	if (xMost > 0 && xMost < window.innerWidth - 240) {
  		// push off horizontal
  		UI.panelElement.style.setProperty(Options.panelPosition, xMost + 10 + 'px');
  		UI.panelElement.style.setProperty('bottom', Options.panelOffsetY);
  	} else if (xMost > 0 && xMost > window.innerWidth - 240 && yMost > 0) {
  		// push off vertical
  		UI.panelElement.style.setProperty(Options.panelPosition, Options.panelOffsetX);
  		UI.panelElement.style.setProperty('bottom', `calc(${Options.panelOffsetY} + ${yMost}px)`);
  	} else {
  		// no push
  		UI.panelElement.style.setProperty(Options.panelPosition, Options.panelOffsetX);
  		UI.panelElement.style.setProperty('bottom', Options.panelOffsetY);
  	}
  }

  function alignAlts () {
  	// Positions alt label to match absolute, inline or floated images.
  	UI.imageAlts?.forEach((mark) => {
  		if (!mark.mark) {
  			return;
  		}
  		const el = mark.mark;
  		el.style.setProperty('transform', null);
  		el.style.setProperty('height', null);
  		el.style.setProperty('width', null);

  		let img = mark.element;
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
  }


  /**
   * Hide tips that are in front of text currently being edited.
   * */
  function checkEditableIntersects (focusKnown = false) {
  	if (!focusKnown && !document.querySelector('[contenteditable]:focus, [contenteditable] :focus')) {
  		//Reset classes to measure.
  		State.jumpList?.forEach((el) => {
  			el.classList.remove('intersecting');
  		});
  		return;
  	}
  	if (!State.activeRange) {
  		// Range isn't on a node we can measure.
  		State.jumpList?.forEach((el) => {
  			el.classList.remove('intersecting');
  		});
  		return;
  	}
  	State.jumpList?.forEach((el) => {
  		const framePositioner = el.result.fixedRoot && State.positionedFrames[el.result.fixedRoot] ?
  			State.positionedFrames[el.result.fixedRoot] : { top: 0, left: 0 };
  		const activeRects = State.activeRange.getBoundingClientRect();
  		const rects = {};
  		rects.top = activeRects.top + framePositioner.top;
  		rects.left = activeRects.left + framePositioner.left;
  		rects.bottom = activeRects.bottom + framePositioner.top;
  		rects.right = activeRects.right + framePositioner.left;

  		const toggle = el.shadowRoot.querySelector('.toggle');
  		if ( intersect(rects, toggle.getBoundingClientRect(), 0) ) {
  			if (!toggle.classList.contains('was-intersecting')) {
  				el.classList.add('intersecting');
  				toggle.classList.add('intersecting');
  			}
  		} else {
  			el.classList.remove('intersecting', 'was-intersecting');
  			toggle.classList.remove('intersecting', 'was-intersecting');
  		}
  	});
  }


  function alignButtons() {
  	if (State.jumpList.length === 0) { // todo always false?
  		return;
  	}
  	State.alignPending = true;

  	// Reading and writing in a loop creates paint thrashing.
  	// We iterate the array for reads, then iterate for writes.

  	if (Options.fixedRoots) {
  		State.positionedFrames.length = 0;

  		Options.fixedRoots.forEach((root) => {
  			if (root['framePositioner']) {
  				State.positionedFrames.push(root['framePositioner'].getBoundingClientRect());
  			}
  		});
  	}

  	// Used for crude intersection detection.
  	let previousNudgeTop = 0;
  	let previousNudgeLeft = 0;
  	const scrollTop = window.scrollY;
  	if (!State.inlineAlerts) {
  		// Compute based on target position.

  		State.jumpList.forEach((mark, i) => {
  			if (!mark.result.element.isConnected) {
  				// Something broke; rebuild jumpList on next loop.
  				State.forceFullCheck = true;
  				State.interaction = true;
  				mark.style.display = 'none';
  			}
  			let targetOffset = mark.result.element.getBoundingClientRect();

  			let top = targetOffset.top + scrollTop;
  			//let rightBound = window.innerWidth;
  			if (!visible(mark.result.element)) {
  				// Invisible target.
  				const theFirstVisibleParent = firstVisibleParent(mark.result.element);
  				targetOffset = theFirstVisibleParent ? theFirstVisibleParent.getBoundingClientRect() : targetOffset;
  				top = targetOffset.top + scrollTop;
  			}
  			let left = targetOffset.left;

  			// TD TD different?
  			if (mark.result.element.tagName === 'IMG') {
  				top = top + 10;
  				left = left + 10;
  			} else {
  				left = State.inlineAlerts ? left - 34 : left;
  			}

  			// Add iframe positon to calculated position
  			if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
  				top = top + State.positionedFrames[mark.result.fixedRoot].top;
  				left = left + State.positionedFrames[mark.result.fixedRoot].left;
  			}

  			// TD TD different?
  			if (mark.result.element.tagName === 'IMG') {
  				top = top + 10;
  				left = left + 10;
  			} else {
  				left = State.inlineAlerts ? left - 34 : left;
  			}
  			if (mark.result.scrollableParent) {
  				// Bump alerts that would be X-position out of a scroll zone.
  				State.jumpList[i].bounds = mark.result.scrollableParent.getBoundingClientRect();
  				if (left < State.jumpList[i].bounds.left) {
  					left = State.jumpList[i].bounds.left;
  				} else if (left + 40 > State.jumpList[i].bounds.right) {
  					left = State.jumpList[i].bounds.right - 40;
  				}
  			} else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
  				// Bump alerts that would x-position out of an iframe.
  				State.jumpList[i].bounds = State.positionedFrames[mark.result.fixedRoot];
  				if (left < State.jumpList[i].bounds.left) {
  					left = State.jumpList[i].bounds.left;
  				} else if (left + 40 > State.jumpList[i].bounds.right) {
  					left = State.jumpList[i].bounds.right - 40;
  				}
  			}
  			State.jumpList[i].targetOffset = targetOffset;
  			State.jumpList[i].markTop = top;
  			State.jumpList[i].markLeft = left;
  		});
  	} else {
  		// Compute based on self position.

  		// Clear old transforms first. Batch write first...
  		State.jumpList.forEach((mark) => {
  			// Reset positions.
  			mark.style.setProperty('transform', null);
  			mark.style.setProperty('top', 'initial');
  			mark.style.setProperty('left', 'initial');
  			if (mark.style.transform) {
  				const computedStyle = window.getComputedStyle(mark);
  				let matrix = computedStyle.getPropertyValue('transform');
  				matrix = matrix.split(',');
  				mark.xOffset = parseFloat(matrix[4]);
  				mark.yOffset = parseFloat(matrix[5]);
  			}
  			else {
  				mark.xOffset = 0;
  				mark.yOffset = 0;
  			}
  		});
  		// ...then batch read new positions.
  		State.jumpList.forEach((mark) => {
  			mark.markOffset = mark.getBoundingClientRect();
  			mark.markLeft = mark.markOffset.left;
  			mark.markTop = mark.markOffset.top;
  		});
  	}


  	// Check for overlaps, then write out transforms.
  	State.jumpList.forEach((mark, i) => {

  		// Now check for any needed nudges
  		let nudgeTop = 10;
  		let nudgeLeft = mark.result.element.tagName === 'IMG' ? 10 : -34;
  		// Detect tip that overlaps with previous result.
  		if (mark.markTop + scrollTop < 0) {
  			// Offscreen to top.
  			nudgeTop = (-1 * (mark.markTop + scrollTop)) - 6;
  		}
  		if (
  			(i > 0 && overlap(mark.markLeft, mark.markTop, State.jumpList[i - 1].markLeft, State.jumpList[i - 1].markTop)) ||
  			(i > 1 && overlap(mark.markLeft, mark.markTop, State.jumpList[i - 2].markLeft, State.jumpList[i - 2].markTop)) ||
  			(i > 2 && overlap(mark.markLeft, mark.markTop, State.jumpList[i - 3].markLeft, State.jumpList[i - 3].markTop))
  		) {
  			// todo postpone: compute actual overlap? We're bouncing by the full amount no matter what which adds too much gapping.
  			nudgeTop = nudgeTop + 14 + previousNudgeTop;
  			nudgeLeft = 14 + previousNudgeLeft;
  		}

  		let constrainLeft = 0;
  		let constrainRight = window.innerWidth;

  		if (mark.result.scrollableParent) {
  			const constrained = mark.result.scrollableParent.getBoundingClientRect();
  			constrainLeft = constrained.left;
  			constrainRight = constrainLeft + constrained.width;
  		} else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
  			constrainLeft = State.positionedFrames[mark.result.fixedRoot].left;
  			constrainRight = State.positionedFrames[mark.result.fixedRoot].right;
  		}

  		let needNudge = false;
  		if (mark.markLeft + nudgeLeft - constrainLeft < 44) {
  			// Offscreen to left. push to the right.
  			nudgeLeft = 44 - mark.markLeft + nudgeLeft + constrainLeft;
  			needNudge = true;
  		}
  		else if (mark.markLeft + nudgeLeft + 80 > constrainRight ) {
  			needNudge = true;
  			// Offscreen to right. push to the left
  			nudgeLeft = constrainRight - nudgeLeft - mark.markLeft - 100;
  		}
  		else if (nudgeTop !== 0) {
  			needNudge = true;
  		}
  		if (!State.inlineAlerts) {
  			if (needNudge) {
  				mark.style.transform = `translate(${mark.markLeft + nudgeLeft}px, ${mark.markTop + nudgeTop}px)`;
  			} else {
  				mark.style.transform = `translate(${mark.markLeft}px, ${mark.markTop}px)`;
  			}

  		} else {
  			nudgeMark(mark, nudgeLeft, nudgeTop);
  		}
  		mark.nudgeLeft = nudgeLeft;
  		mark.nudgeTop = nudgeTop;
  		previousNudgeTop = nudgeTop;
  		previousNudgeLeft = nudgeLeft;
  	});

  	// Last pass: check for elements offscreen within scrollable areas.
  	if (!State.inlineAlerts) {
  		// Alerts have to be positioned relative to viewport.
  		State.jumpList.forEach(mark => {

  			if (mark.result.scrollableParent) {
  				// Hide alerts outside a scroll zone.
  				if (!!mark.bounds && (mark.targetOffset.top - mark.bounds.top < 0 || mark.targetOffset.top - mark.bounds.bottom > 0 ) && !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')) {
  					// Tip has exited scrollable parent. Visually hide.
  					mark.classList.add('ed11y-offscreen');
  					mark.style.transform = 'translate(0px, -50px)';
  					mark.style.pointerEvents = 'none';
  					if (mark.getAttribute('data-ed11y-open') === 'true') {
  						mark.setAttribute('data-ed11y-action', 'shut');
  					}
  				}
  				else {
  					mark.classList.remove('ed11y-offscreen');
  					mark.style.pointerEvents = 'auto';
  				}
  			} else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
  				if (!!mark.bounds && (mark.targetOffset.top < -40 || mark.targetOffset.top + mark.bounds.top - mark.bounds.bottom > -10 ) && !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')) {
  					// Tip has exited scrollable parent. Visually hide.
  					mark.classList.add('ed11y-offscreen');
  					mark.style.transform = 'translate(0px, -50px)';
  					mark.style.pointerEvents = 'none';
  					if (mark.getAttribute('data-ed11y-open') === 'true') {
  						mark.setAttribute('data-ed11y-action', 'shut');
  					}
  				}
  				else {
  					mark.classList.remove('ed11y-offscreen');
  					mark.style.pointerEvents = 'auto';
  				}
  			}
  			else {
  				mark.classList.remove('ed11y-offscreen');
  				mark.style.pointerEvents = 'auto';
  			}

  		});
  	}
  	State.jumpList?.forEach(mark => {
  		// Now make visible.
  		// todo: Edge still flickers on redraw.
  		mark.classList.remove('ed11y-preload');
  	});

  }

  function checkEmbeddedContent(results, option) {
    // iFrame's SRC attribute.
    const src = ($el) => $el.getAttribute('src')
      || $el.querySelector('source[src]')?.getAttribute('src')
      || $el.querySelector('[src]')?.getAttribute('src')
      || null;

    // Warning: Audio content.
    if (option.checks.EMBED_AUDIO) {
      Elements.Found.Audio.forEach(($el) => {
        // General warning for audio content.
        results.push({
          test: 'EMBED_AUDIO',
          element: $el,
          type: option.checks.EMBED_AUDIO.type || 'warning',
          content: Lang.sprintf(option.checks.EMBED_AUDIO.content || 'EMBED_AUDIO'),
          dismiss: prepareDismissal(`AUDIO${src($el)}`),
          dismissAll: option.checks.EMBED_AUDIO.dismissAll ? 'EMBED_AUDIO' : false,
          developer: option.checks.EMBED_AUDIO.developer || false,
        });
      });
    }

    // Warning: Video content.
    if (option.checks.EMBED_VIDEO) {
      Elements.Found.Videos.forEach(($el) => {
        // Warning if <track> doesn't exist, or the <track>'s src is empty.
        const track = $el.querySelector('track');
        const trackSrc = track?.getAttribute('src');
        if (track === null || trackSrc === null || trackSrc.trim().length === 0) {
          results.push({
            test: 'EMBED_VIDEO',
            element: $el,
            type: option.checks.EMBED_VIDEO.type || 'warning',
            content: Lang.sprintf(option.checks.EMBED_VIDEO.content || 'EMBED_VIDEO'),
            dismiss: prepareDismissal(`VIDEO${src($el)}`),
            dismissAll: option.checks.EMBED_VIDEO.dismissAll ? 'EMBED_VIDEO' : false,
            developer: option.checks.EMBED_VIDEO.developer || false,
          });
        }
      });
    }

    // Warning: Data visualizations.
    if (option.checks.EMBED_DATA_VIZ) {
      Elements.Found.Visualizations.forEach(($el) => {
        // General warning for data visualization widgets.
        results.push({
          test: 'EMBED_DATA_VIZ',
          element: $el,
          type: option.checks.EMBED_DATA_VIZ.type || 'warning',
          content: Lang.sprintf(option.checks.EMBED_DATA_VIZ.content || 'EMBED_DATA_VIZ'),
          dismiss: prepareDismissal(`DATAVIZ${src($el)}`),
          dismissAll: option.checks.EMBED_DATA_VIZ.dismissAll ? 'EMBED_DATA_VIZ' : false,
          developer: option.checks.EMBED_DATA_VIZ.developer || false,
        });
      });
    }

    /* Error: Check all iFrames for a missing accessible name. */
    Elements.Found.iframes.forEach(($el) => {
      // Ignore hidden elements and video/audio.
      const presentation = ['presentation', 'none'].includes($el.getAttribute('role'));
      const hidden = isElementHidden($el);
      const videoAudio = $el.tagName === 'VIDEO' || $el.tagName === 'AUDIO';
      const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
      const negativeTabindex = $el.getAttribute('tabindex') === '-1';
      if (hidden || videoAudio || (ariaHidden && negativeTabindex) || presentation) {
        return;
      }

      // Warning if element only has negative tabindex (without aria-hidden). Axe rulecheck.
      if (negativeTabindex) {
        if (option.checks.EMBED_UNFOCUSABLE) {
          results.push({
            test: 'EMBED_UNFOCUSABLE',
            element: $el,
            type: option.checks.EMBED_UNFOCUSABLE.type || 'error',
            content: Lang.sprintf(option.checks.EMBED_UNFOCUSABLE.content || 'EMBED_UNFOCUSABLE'),
            dismiss: prepareDismissal(`EMBEDUNFOCUSABLE${src($el)}`),
            dismissAll: option.checks.EMBED_UNFOCUSABLE.dismissAll ? 'EMBED_UNFOCUSABLE' : false,
            developer: option.checks.EMBED_UNFOCUSABLE.developer || true,
          });
        }
        return;
      }

      if (option.checks.EMBED_MISSING_TITLE) {
        // Accessible name is missing for iFrame.
        const aria = computeAriaLabel($el);
        const checkTitle = (aria === 'noAria') ? ($el.getAttribute('title') || '') : aria;
        const accessibleName = removeWhitespace(checkTitle);
        if (accessibleName.length === 0) {
          results.push({
            test: 'EMBED_MISSING_TITLE',
            element: $el,
            type: option.checks.EMBED_MISSING_TITLE.type || 'error',
            content: Lang.sprintf(option.checks.EMBED_MISSING_TITLE.content || 'EMBED_MISSING_TITLE'),
            dismiss: prepareDismissal(`EMBEDMISSTITLE${src($el)}`),
            dismissAll: option.checks.EMBED_MISSING_TITLE.dismissAll ? 'EMBED_MISSING_TITLE' : false,
            developer: option.checks.EMBED_MISSING_TITLE.developer || true,
          });
        }
      }
    });

    /* Warning: for all iFrames (except video, audio, or data visualizations). */
    if (option.checks.EMBED_GENERAL) {
      Elements.Found.EmbeddedContent.forEach(($el) => {
        // Ignore hidden elements.
        const presentation = ['presentation', 'none'].includes($el.getAttribute('role'));
        const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
        const negativeTabindex = $el.getAttribute('tabindex') === '-1';
        const hidden = isElementHidden($el);
        if (hidden || (ariaHidden && negativeTabindex) || presentation) {
          return;
        }

        // Ignore video & audio elements.
        if ($el.tagName === 'VIDEO' || $el.tagName === 'AUDIO') {
          return;
        }

        results.push({
          test: 'EMBED_GENERAL',
          element: $el,
          type: option.checks.EMBED_GENERAL.type || 'warning',
          content: Lang.sprintf(option.checks.EMBED_GENERAL.content || 'EMBED_GENERAL'),
          dismiss: prepareDismissal(`IFRAMEGENERAL${src($el)}`),
          dismissAll: option.checks.EMBED_GENERAL.dismissAll ? 'EMBED_GENERAL' : false,
          developer: option.checks.EMBED_GENERAL.developer || false,
        });
      });
    }
    return results;
  }

  function customRuleset(results) {
  	/* *********************************************************** */
  	/*  Error: Find all links pointing to development environment. */
  	/* *********************************************************** */

  	if (Options.checks.EMBED_CUSTOM) {
  		const matchedEmbeds = getElements(Options.checks.EMBED_CUSTOM.sources, 'root');
  		Lang.langStrings.embeddedContent = `<div class="title" tabindex="-1"><div class="ed11y-tip-alert"></div>${Options.embeddedContentTitle}</div>${Options.embeddedContentMessage}`;
  		matchedEmbeds.forEach(($el) => {
  			results.push({
  				test: 'EMBED_CUSTOM',
  				element: $el,
  				type: 'warning',
  				content: Lang.sprintf('EMBED_CUSTOM'),
  				inline: false,
  				dismiss: prepareDismissal($el.tagName + $el.getAttribute('src')),
  				dismissAll: 'embeddedContent',
  				developer: false,
  			});
  		});
  	}

  	return results;
  }

  function syncResults(results) {
  	// Dispatch event for synchronizers.
  	if (!State.incremental) {
  		window.setTimeout(function () {
  			document.dispatchEvent(new CustomEvent('ed11yResults',  {
  				// @todo cms document detail
  				detail: {
  					results: results,
  				}
  			}));
  		}, 0);
  	}
  }

  function handleSyncOnlyResults() {

  	State.splitConfiguration.results = filterAlerts(true);

  	Object.assign(Options, State.splitConfiguration.showOptions);

  	syncResults(State.splitConfiguration.results);

  	buildElementList(true);

  	let everything = false;
  	let headings = false;
  	let images = false;
  	let excludedHeadings = false;
  	let contrast = false;
  	let links = false;

  	for (let i = 0; i < State.splitConfiguration.results.length; i++) {
  		let result = State.splitConfiguration.results[i];
  		if (!result.element) {
  			continue;
  		}
  		if (State.splitConfiguration.checks.has(result.test)) {
  			continue;
  		}
  		if (result.test.indexOf('HEADING') === 0) {
  			if (!headings) {
  				headings = new WeakSet(Elements.Found.Headings);
  				excludedHeadings = new WeakSet(Elements.Found.ExcludedHeadings);
  			}
  			if (headings.has(result.element) && !excludedHeadings.has(result.element)) {
  				Results.push(result);
  			}
  			continue;
  		}
  		if (result.test.indexOf('CONTRAST') > -1) {
  			if (!contrast) {
  				contrast = new WeakSet(Elements.Found.Contrast);
  			}
  			if (contrast.has(result.element)) {
  				Results.push(result);
  			}
  			continue;
  		}
  		if (result.element.matches('img')) {
  			if (!images) {
  				images = new WeakSet(Elements.Found.Images);
  			}
  			if (images.has(result.element)) {
  				Results.push(result);
  			}
  			continue;
  		}
  		if (result.element.matches('a')) {
  			links = new WeakSet(Elements.Found.Links);
  			if (links.has(result.element)) {
  				Results.push(result);
  			}
  			continue;
  		}
  		if (!everything) {
  			everything = new WeakSet(Elements.Found.Everything);
  		}
  		if (everything.has(result.element)) {
  			Results.push(result);
  		}
  	}

  }

  function countAlerts () {
  	State.dismissedCount = 0;
  	State.errorCount = 0;
  	State.warningCount = 0;
  	State.dismissedCount = 0;

  	for (let i = Results.length - 1; i >= 0; i--) {
  		if (Results[i].dismissalStatus) {
  			State.dismissedCount++;
  		} else if (Results[i].type === 'warning') {
  			State.warningCount++;
  		} else {
  			State.errorCount++;
  		}

  		let location = Results[i].element;
  		let interactive = location.closest('a, button, img, svg, input, iframe, [role="button"], [role="link"]');
  		let canPositionInside = !interactive && location.closest('p, table, li, blockquote, h1, h2, h3, h4, h5, h6');

  		// Todo limit afterBegin to P and TD such.
  		if (Results[i].element.shadowRoot) {
  			while (location.parentElement && location.parentElement.shadowRoot) {
  				location = location.parentElement;
  			}
  		} else if (!canPositionInside) {
  			Results[i].location = interactive ?? location;
  			Results[i].position = 'beforebegin';
  		} else {
  			Results[i].location = location;
  			Results[i].position = 'afterbegin';
  		}
  	}
  	State.totalCount = State.errorCount + State.warningCount;
  	if (State.ignoreAll) {
  		State.dismissedCount = State.totalCount + State.dismissedCount;
  		State.errorCount = 0;
  		State.warningCount = 0;
  		State.totalCount = 0;
  	}
  }

  function filterAlerts (splitConfiguration) {
  	// @todo next we can't return and assign results any more; pass string to here instead.

  	// Review results array to remove dismissed or ignored items
  	const results = splitConfiguration ? State.splitConfiguration.results : Results;

  	for (let i = results.length - 1; i >= 0; i--) {
  		let splice = false;

  		/*
  		if (Options.ignoreTests &&
  			Options.ignoreTests.includes(test)) {
  			// Would be faster to skip test, but this is easy and reliable.
  			results.splice(i, 1);
  			continue;
  		}*/
  		// todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
  		/*if (State.incremental && Ed11y.oldResults.length > 0) {
  			// Don't flag new issues in the active range while people are typing.
  		}*/
  		if (results[i].test === 'READABILITY') {
  			State.readability = results[i];
  			if (State.visualizing) {
  				const badge = Constants.Panel.readabilityInfo?.querySelector('.readability-score');
  				if (badge) {
  					const badgeClass = results[i].difficultyToken === 'GOOD' ? 'readability-score' : 'readability-score ed11y-warning';
  					badge.setAttribute('class', badgeClass);
  				}
  			}
  			splice = true;
  		} else if (results[i].test === 'META_TITLE') {
  			if (Elements.Found.Headings.length > 0) {
  				if (splitConfiguration) {
  					State.splitConfiguration.results.element = Elements.Found.Everything[0];
  				} else {
  					Results[i].element = Elements.Found.Everything[0];
  				}
  			}
  		} else if (!results[i].element || results[i].type === 'good') {
  			splice = true;
  		} else {
  			// We run the user provided dismissal key through the text sanitization to support legacy data with special characters.
  			if (Options.currentPage in State.dismissedAlerts
  				&& results[i].test in State.dismissedAlerts[Options.currentPage]
  				&& results[i].dismiss in State.dismissedAlerts[Options.currentPage][results[i].test]) {
  				// Remove results[i] if it has been marked OK or ignored, increment dismissed match counter.
  				if (splitConfiguration) {
  					State.splitConfiguration.results.dismissalStatus = true;
  				} else {
  					Results.dismissalStatus = true;
  				}
  			}
  		}
  		if (splice) {
  			if (splitConfiguration) {
  				State.splitConfiguration.results.splice(i, 1);
  			} else {
  				Results.splice(i, 1);
  			}
  		}
  	}

  	return results;
  }

  /**
   * Rulesets: Readability
   * Adapted from Greg Kraus. References for other non-english languages included below.
   * @link https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/tools/readability-bookmarklet/
   * @link https://core.ac.uk/download/pdf/6552422.pdf
   * @link https://github.com/Yoast/YoastSEO.js/issues/267
   * @link http://stackoverflow.com/questions/5686483/how-to-compute-number-of-syllables-in-a-word-in-javascript
   * @link https://www.simoahava.com/analytics/calculate-readability-scores-for-content/#commento-58ac602191e5c6dc391015c5a6933cf3e4fc99d1dc92644024c331f1ee9b6093
   * @link https://oaji.net/articles/2017/601-1498133639.pdf (Portuguese adaptation).
  */

  /**
   * Compute the readability score based on an array of text strings.
   * @param {Array} textArray Array of text strings.
   * @param {string} lang The page or text language.
   * @returns Readability object.
   */
  function computeReadability(textArray, lang) {
    // If array item does not end with punctuation, add period to improve accuracy.
    const readabilityArray = [];
    const punctuation = ['.', '?', '!'];
    textArray.forEach((text) => {
      const lastCharacter = text[text.length - 1];
      const sentence = punctuation.includes(lastCharacter) ? text : `${text}.`;
      readabilityArray.push(sentence);
    });
    const pageText = readabilityArray.join(' ');
    if (pageText.length === 0) return null;

    // Flesch Reading Ease: English, French, German, Dutch, Italian, Spanish, Portuguese
    if (['en', 'es', 'fr', 'de', 'nl', 'it', 'pt'].includes(lang)) {
      const numberOfSyllables = (el) => {
        let wordCheck = el;
        wordCheck = wordCheck.toLowerCase().replace('.', '').replace('\n', '');
        if (wordCheck.length <= 3) {
          return 1;
        }
        wordCheck = wordCheck.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        wordCheck = wordCheck.replace(/^y/, '');
        const syllableString = wordCheck.match(/[aeiouy]{1,2}/g);
        let syllables = 0;
        if (syllableString) {
          syllables = syllableString.length;
        }
        return syllables;
      };

      const wordsRaw = pageText.replace(/[.!?-]+/g, ' ').split(' ');
      let words = 0;
      for (let i = 0; i < wordsRaw.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (wordsRaw[i] != 0) {
          words += 1;
        }
      }

      const sentenceRaw = pageText.split(/[.!?]+/);
      let sentences = 0;
      for (let i = 0; i < sentenceRaw.length; i++) {
        if (sentenceRaw[i] !== '') {
          sentences += 1;
        }
      }

      let totalSyllables = 0;
      let syllables1 = 0;
      let syllables2 = 0;
      for (let i = 0; i < wordsRaw.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (wordsRaw[i] != 0) {
          const syllableCount = numberOfSyllables(wordsRaw[i]);
          if (syllableCount === 1) {
            syllables1 += 1;
          }
          if (syllableCount === 2) {
            syllables2 += 1;
          }
          totalSyllables += syllableCount;
        }
      }

      let flesch = false;
      if (lang === 'en') {
        flesch = 206.835 - (1.015 * (words / sentences)) - (84.6 * (totalSyllables / words));
      } else if (lang === 'fr') {
        flesch = 207 - (1.015 * (words / sentences)) - (73.6 * (totalSyllables / words));
      } else if (lang === 'es') {
        flesch = 206.84 - (1.02 * (words / sentences)) - (0.60 * (100 * (totalSyllables / words)));
      } else if (lang === 'de') {
        flesch = 180 - (words / sentences) - (58.5 * (totalSyllables / words));
      } else if (lang === 'nl') {
        flesch = 206.84 - (0.77 * (100 * (totalSyllables / words))) - (0.93 * (words / sentences));
      } else if (lang === 'it') {
        flesch = 217 - (1.3 * (words / sentences)) - (0.6 * (100 * (totalSyllables / words)));
      } else if (lang === 'pt') {
        flesch = 248.835 - (1.015 * (words / sentences)) - (84.6 * (totalSyllables / words));
      }

      // Score must be between 0 and 100%.
      if (flesch > 100) {
        flesch = 100;
      } else if (flesch < 0) {
        flesch = 0;
      }

      // Compute scores.
      const fleschScore = Number(flesch.toFixed(1));
      const avgWordsPerSentence = Number((words / sentences).toFixed(1));
      const complexWords = Math.round(100 * ((words - (syllables1 + syllables2)) / words));

      let difficultyToken;
      if (fleschScore >= 0 && fleschScore < 30) {
        difficultyToken = 'VERY_DIFFICULT';
      } else if (fleschScore > 31 && fleschScore < 49) {
        difficultyToken = 'DIFFICULT';
      } else if (fleschScore > 50 && fleschScore < 60) {
        difficultyToken = 'FAIRLY_DIFFICULT';
      } else {
        difficultyToken = 'GOOD';
      }

      return {
        score: fleschScore,
        averageWordsPerSentence: avgWordsPerSentence,
        complexWords,
        difficultyToken,
        wordCount: words,
        charCount: pageText.length,
      };
    }

    // LIX: Danish, Finnish, Norwegian (Bokmål & Nynorsk), Swedish
    if (['sv', 'fi', 'da', 'no', 'nb', 'nn'].includes(lang)) {
      const lixWords = () => pageText
        .replace(/[-'.]/ig, '')
        .split(/[^a-zA-ZöäåÖÄÅÆæØø0-9]/g)
        .filter(Boolean);

      const splitSentences = () => {
        const splitter = /\?|!|\.|\n/g;
        return pageText.split(splitter).filter(Boolean);
      };

      const wordsArr = lixWords();
      const wordCount = wordsArr.length;
      const longWordsCount = wordsArr.filter((w) => w.length > 6).length;
      const sentenceCount = splitSentences().length || 1;
      const score = Math.round(
        (wordCount / sentenceCount) + ((longWordsCount * 100) / wordCount),
      );
      const avgWordsPerSentence = Number((wordCount / sentenceCount).toFixed(1));
      const complexWords = Math.round(100 * (longWordsCount / wordCount));

      let difficultyToken;
      if (score >= 0 && score < 39) {
        difficultyToken = 'GOOD';
      } else if (score > 40 && score < 50) {
        difficultyToken = 'FAIRLY_DIFFICULT';
      } else if (score > 51 && score < 61) {
        difficultyToken = 'DIFFICULT';
      } else {
        difficultyToken = 'VERY_DIFFICULT';
      }

      return {
        score,
        averageWordsPerSentence: avgWordsPerSentence,
        complexWords,
        difficultyToken,
        wordCount,
        charCount: pageText.length,
      };
    }

    return null;
  }

  function checkReadability(results) {
    // Get text.
    const pageText = Elements.Found.Readability
      .map(($el) => getText(fnIgnore($el)))
      .filter(Boolean);

    // Compute.
    const computed = computeReadability(pageText, Constants.Readability.Lang);

    // Generate result object.
    let result;
    if (computed) {
      result = {
        test: 'READABILITY',
        difficultyLevel: Lang._(computed.difficultyToken),
        ...computed,
      };
      results.push(result);
    }

    // Paint UI.
    if (Constants.Global.headless === false) {
      if (computed && result.wordCount > 30) {
        Constants.Panel.readabilityInfo.innerHTML = `${Math.ceil(result.score)} <span class="readability-score">${result.difficultyLevel}</span>`;
        Constants.Panel.readabilityDetails.innerHTML = `<li><strong>${Lang._('AVG_SENTENCE')}</strong> ${Math.ceil(result.averageWordsPerSentence)}</li><li><strong>${Lang._('COMPLEX_WORDS')}</strong> ${result.complexWords}%</li><li><strong>${Lang._('TOTAL_WORDS')}</strong> ${result.wordCount}</li>`;
      } else {
        Constants.Panel.readabilityInfo.innerHTML = `<br>${Lang._('READABILITY_NOT_ENOUGH')}`;
      }
    }

    // Return readability result object back to this.results array.
    return results;
  }

  const showAltPanel = function () {
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
  			});
  		} else {
  			UI.imageAlts.push({
  				element: img,
  				type: 'pass',
  			});
  		}
  	});

  	if (UI.imageAlts.length > 0) {
  		altList.innerHTML = '';
  		for (let i = 0; i < UI.imageAlts.length; i++) {
  			const image = UI.imageAlts[i];
  			let altText = computeAriaLabel(image.element) === 'noAria'
  				? escapeHTML(image.element.getAttribute('alt'))
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
  			img.setAttribute('src', getBestImageSource(image.element));
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

  function visualize () {
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
  };

  function showHeadingsPanel () {
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
  function drawResult(result, index) {
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

  function showResults () {
    buildJumpList();
    // Announce that buttons have been placed.
    document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
    alignButtons();
    if (!State.inlineAlerts) {
      checkEditableIntersects();
      intersectionObservers();
    }
  }

  const panelJumpTo = function(event) {
  	// Handle jump
  	event.preventDefault();
  	State.toggledFrom = event.target.closest('button');
  	if (!State.showPanel) {
  		togglePanel();
  		window.setTimeout(function() {
  			jumpTo();
  		},500);
  	} else {
  		jumpTo();
  	}
  };

  function updatePanel () {

    pauseObservers();
    // Stash old values for incremental updates.


    if (State.incremental) {
      // Check for a change in the result counts.
      if (State.forceFullCheck || newIncrementalResults()) {
        State.forceFullCheck = false;
        resetResults(true);
      } else {
        // Reconnect map
  			Results.push(State.oldResults);
  			if ( !State.alignPending ) {
  				alignButtons();
  				alignPanel();
  				State.alignPending = false;
  			}
  			State.running = false;
        resumeObservers();
        return;
      }
    } else {
      if (State.totalCount > 0) {
        // Record what has been seen at this route.
        // We do not do this on incremental updates.
        // Todo question: should we not do this at all for contentEditable?
        State.seen[encodeURI(Options.currentPage)] = State.totalCount;
        localStorage.setItem('editoria11yResultCount', JSON.stringify(State.seen));
      } else {
        delete State.seen[encodeURI(Options.currentPage)];
      }
    }

    if (!Options.headless) {
      // Not headless; draw the run.

      if (!State.bodyStyle) {
        paintReady();
      }

      if (State.onLoad === true) {
        State.onLoad = false;

        // Create the panel DOM on load.

        UI.panelElement = document.createElement('ed11y-element-panel');
        UI.panelElement.classList.add('ed11y-preload');
        document.body.appendChild(UI.panelElement);
        UI.panel = UI.panelElement.shadowRoot.getElementById('ed11y-panel');
        UI.attachCSS(UI.panel);
        UI.panelToggle = UI.panel.querySelector('#ed11y-toggle');
        UI.panelToggleTitle = UI.panel.querySelector('#ed11y-toggle .ed11y-sr-only');
        UI.panelCount = UI.panel.querySelector('.toggle-count');
        UI.panelJumpNext = UI.panel.querySelector('.ed11y-jump.next');
        UI.panelJumpNext.addEventListener('click', panelJumpTo);
        UI.panelShowDismissed = UI.panel.querySelector('#ed11y-show-hidden');
        UI.message = UI.panel.querySelector('#ed11y-message');
  			if (Options.readabilityPlugin) {
  				const detailsTab = document.createElement('details');
  				detailsTab.id = 'ed11y-readability-tab';
  				detailsTab.innerHTML = `
            <summary>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" aria-hidden="true"><path fill="currentColor" d="M528.3 46.5l-139.8 0c-48.1 0-89.9 33.3-100.4 80.3-10.6-47-52.3-80.3-100.4-80.3L48 46.5C21.5 46.5 0 68 0 94.5L0 340.3c0 26.5 21.5 48 48 48l89.7 0c102.2 0 132.7 24.4 147.3 75 .7 2.8 5.2 2.8 6 0 14.7-50.6 45.2-75 147.3-75l89.7 0c26.5 0 48-21.5 48-48l0-245.7c0-26.4-21.3-47.9-47.7-48.1zM242 311.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zM501.3 311.8c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.8c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.8-.1 0z"/></svg> <span class="summary-title"></span>
            </summary>
            <div class="details">
							<div id="readability-content">
								<p id="readability-info"></p>
								<ul id="readability-details"></ul>
							</div>
						</div>`;
  				UI.panel.querySelector('#ed11y-visualizers').appendChild(detailsTab);
  				UI.panel.querySelector('#readability-info').appendChild(Constants.Panel.readabilityInfo);
  				UI.panel.querySelector('#readability-details').appendChild(Constants.Panel.readabilityDetails);
  				UI.panel.querySelector('#ed11y-readability-tab .summary-title').textContent = Lang._('READABILITY');
  			}

        window.setTimeout(()=> {
          UI.panelElement.classList.remove('ed11y-preload');
        },0, UI.panel);
        UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Lang._('PANEL_HEADING');
        UI.panel.querySelector('#ed11y-headings-tab .summary-title').textContent = Lang._('OUTLINE');
        UI.panel.querySelector('#ed11y-alts-tab .summary-title').textContent = Lang._('IMAGES');
  			if (State.english) {
  				UI.panel.querySelector('#ed11y-headings-tab .details-title').innerHTML = Lang._('panelCheckOutline');
  				UI.panel.querySelector('#ed11y-alts-tab .details-title').innerHTML = Lang._('panelCheckAltText');
  			}
        UI.panel.querySelector('.jump-next.ed11y-sr-only').textContent = State.english ? Lang._('buttonFirstContent')
  				: Lang._('SKIP_TO_ISSUE') + ' 1';
        UI.panel.setAttribute('aria-label', Lang._('CONTAINER_LABEL'));

        if (Options.reportsURL) {
          let reportLink = document.createElement('a');
          reportLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 61 29 32 64 32l384 0c35 0 64 29 64 64l0 320c0 35-29 64-64 64L64 480c-35 0-64-29-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
          reportLink.setAttribute('id' , 'ed11y-reports-link');
          reportLink.setAttribute('href', Options.reportsURL);
          reportLink.setAttribute('target', '_blank');
          reportLink.setAttribute('aria-label', Lang._('reportsLink'));
          reportLink.querySelector('.ed11y-sr-only').textContent = Lang._('reportsLink');
          UI.panelShowDismissed.insertAdjacentElement('beforebegin', reportLink);
        }

        // Escape key closes panels.
        const escapeWatch = function (event) {
          if (event.keyCode === 27) {
            if (event.target.closest('ed11y-element-panel') && UI.panelToggle.getAttribute('aria-expanded') === 'true') {
              UI.panelToggle.focus();
              UI.panelToggle.click();
            } else if (event.target.hasAttribute('data-ed11y-open')) {
              if (State.tipOpen) {
                State.toggledFrom?.focus(); // todo is this still needed or handled by the next?
                State.openTip.button.shadowRoot.querySelector('button').click();
              }
            }
          }
        };
        document.addEventListener('keyup', function (event) {escapeWatch(event); });

        // Decide whether to open the panel on load.
        if (State.ignoreAll ||
          (!State.inlineAlerts && State.totalCount > 75)
        ) {
          State.showPanel = false;
        } else if (Options.alertMode === 'active' ||
          !Options.userPrefersShut ||
          State.showDismissed
        ) {
          // Show always on load for active mode or by user preference.
          State.showPanel = true;
        } else if (
          State.totalCount > 0 &&
          !State.ignoreAll &&
          ( Options.alertMode === 'assertive' ||
            Options.alertMode === 'polite' &&
            State.seen[encodeURI(Options.currentPage)] !== State.totalCount
          )
        ) {
          // Show sometimes for assertive/polite if there are new items.
          State.showPanel = true;
        }
      } else if (!State.inlineAlerts) {
  				State.oldResultString = `${State.errorCount} ${State.warningCount}`;
  				Results.forEach(result => {
  					State.oldResultString += result.test + result.element.outerHTML;
  				});
  		}
      // Now we can open or close the panel.
      if (!State.showPanel) {
        // Close panel.
        reset();
      } else {
        // Ignore issue count if this resulted from a user action.
        State.showPanel = true;
        UI.panel.classList.remove('ed11y-shut');
        UI.panel.classList.add('ed11y-active');
        // Prepare show hidden alerts button.
  			const preferredDismissHide = State.dismissedCount > 1 ?
  				Lang.sprintf('buttonHideHiddenAlerts', State.dismissedCount)
  				: Lang._('buttonHideHiddenAlert');
        if (State.dismissedCount === 0) {
          // Reset show hidden default option when irrelevant.
          UI.panelShowDismissed.setAttribute('hidden', '');
  				UI.panelShowDismissed.setAttribute('data-ed11y-pressed', 'false');
          State.showDismissed = false;
        } else if (State.dismissedCount === 1) {
  				const show = State.english ?
  					Lang._('buttonShowHiddenAlert')
  					: Lang.sprintf('PANEL_DISMISS_BUTTON', '1');
  				UI.panelShowDismissed.querySelector('.ed11y-sr-only').textContent = State.showDismissed ?
  					preferredDismissHide : show;
  				UI.panelShowDismissed.dataset.ed11yPressed = `${State.showDismissed}`;
  				if (!State.english) {
  					UI.panelShowDismissed.ariaPressed = State.showDismissed;
  				}
  				UI.panelShowDismissed.removeAttribute('hidden');
        } else {
  				UI.panelShowDismissed.querySelector('.ed11y-sr-only').textContent = State.showDismissed ?
  					preferredDismissHide
  					: Lang.sprintf('PANEL_DISMISS_BUTTON', State.dismissedCount);
  				UI.panelShowDismissed.dataset.ed11yPressed = `${State.showDismissed}`;
  				if (!State.english) {
  					UI.panelShowDismissed.ariaPressed = State.showDismissed;
  				}
  				UI.panelShowDismissed.removeAttribute('hidden');
        }

        window.setTimeout(function () {
          if (!State.ignoreAll) {
            requestAnimationFrame(() => showResults());
          }
        }, 0);
      }
      // Update buttons.
      if (State.totalCount > 0 || (State.showDismissed && State.dismissedCount > 0)) {
  			UI.panelToggleTitle.textContent = Lang._('MAIN_TOGGLE_LABEL');

  			UI.panelToggle.ariaExpanded = `${State.showPanel}`;
        UI.panelJumpNext.removeAttribute('hidden');
        if (State.errorCount > 0) {
          // Errors
          UI.panel.classList.remove('ed11y-warnings', 'ed11y-pass');
          UI.panel.classList.add('ed11y-errors');
          document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.alert);
          document.documentElement.style.setProperty('--ed11y-activeColor', '#fff');
          document.documentElement.style.setProperty('--ed11y-activeBorder', '#fff7');
          document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#def');
        }
        else if (State.warningCount > 0) {
          // Warnings
          UI.panel.classList.remove('ed11y-errors', 'ed11y-pass');
          UI.panel.classList.add('ed11y-warnings');
          document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.warning);
          document.documentElement.style.setProperty('--ed11y-activeColor', '#111');
          document.documentElement.style.setProperty('--ed11y-activeBorder', '#947605');
          document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#947605');
        } else {
          // Issues present but dismissed.
          UI.panel.classList.remove('ed11y-errors', 'ed11y-warnings');
          UI.panel.classList.add('ed11y-pass');
          document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.panelBar);
          document.documentElement.style.setProperty('--ed11y-activeColor', Theme.panelBarText);
          document.documentElement.style.setProperty('--ed11y-activeBorder', Theme.panelBarText + '44');
          document.documentElement.style.setProperty('--ed11y-activePanelBorder', Theme.panelBarText + '88');
        }
        if (State.dismissedCount > 0 && State.totalCount === 0) {
          UI.panelCount.textContent = State.dismissedCount;
        } else {
          UI.panelCount.textContent = State.totalCount > 99 ? '99+' : State.totalCount;
        }
      } else {
        UI.panelJumpNext.setAttribute('hidden', '');
        document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.panelBar);
        document.documentElement.style.setProperty('--ed11y-activeColor', Theme.panelBarText);
        document.documentElement.style.setProperty('--ed11y-activeBorder', Theme.panelBarText + '44');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', Theme.panelBarText + '88');

        UI.panelCount.style.display = 'display: none;';
        UI.panel.classList.remove('ed11y-warnings', 'ed11y-errors');
        UI.panel.classList.add('ed11y-pass');

        if (State.dismissedCount > 0) {
          UI.panelCount.textContent = 'i';
          if (State.showPanel) {
            UI.panelToggleTitle.textContent = Lang._('MAIN_TOGGLE_LABEL');
          } else {
            UI.panelToggleTitle.textContent = State.dismissedCount > 1 ?
  						Lang.sprintf('PANEL_DISMISS_BUTTON', State.dismissedCount) :
              Lang._('buttonShowHiddenAlert');
          }
        } else {
          UI.panelToggleTitle.textContent = Lang._('MAIN_TOGGLE_LABEL');
        }
      }
      UI.panelToggle.classList.remove('disabled');
      UI.panelToggle.removeAttribute('aria-disabled');
      alignPanel();
      UI.panel.classList.remove('ed11y-preload');
    }

    resumeObservers();
    State.running = false;
  }

  function buildJumpList () {

    State.jumpList = [];
    pauseObservers();

    // Initial alignment to get approximate Y position order for jump list.
  	Results.forEach(function (result) {
  		let top = result.element.getBoundingClientRect().top;
  		if (!top) {
  			const visibleParent = firstVisibleParent(result.element);
  			if (visibleParent) {
  				top = visibleParent.getBoundingClientRect().top;
  			}
  		}
  		top = top + window.scrollY;
  		if (Options.fixedRoots) {
  			const root = result.element.closest('[data-ed11y-root]');
  			result.fixedRoot = root.dataset.ed11yRoot;
  		}
  		result.scrollableParent = closestScrollable(result.element);
  		if (result.scrollableParent) {
  			// Group these together.
  			top = top * 0.000001;
  		}
  		result.sortPos = top;
  	});
  	/* There was once a race condition...
  	for (let i = Results.length - 1; i >= 0; i--) {
  		const result = Results[i];
  		if (!result.element) {
  			// todo we should never running while checks are running.
  			Results.splice(i, 1);
  		} else {
  			let top = result.element.getBoundingClientRect().top;
  			if (!top) {
  				const visibleParent = firstVisibleParent(result.element);
  				if (visibleParent) {
  					top = visibleParent.getBoundingClientRect().top;
  				}
  			}
  			top = top + window.scrollY;
  			if (Options.fixedRoots) {
  				const root = result.element.closest('[data-ed11y-root]');
  				result.fixedRoot = root.dataset.ed11yRoot;
  			}
  			result.scrollableParent = closestScrollable(result.element);
  			if (result.scrollableParent) {
  				// Group these together.
  				top = top * 0.000001;
  			}
  			result.sortPos = top;
  		}
  	}*/

    // Sort from bottom to top so focus order after insert is top to bottom.
    Results.sort((a, b) => b.sortPos - a.sortPos);

    Results?.forEach(function (result, i) {
      if (!Results[i].dismissalStatus || State.showDismissed) {
        drawResult(result, i);
      }
    });
    State.jumpList.forEach((el, i) => {
      el.dataset.ed11yJumpPosition = `${i}`;
      const newLabel = `${Lang._('ALERT_TEXT')} ${i + 1} / ${State.jumpList.length - 1}, ${el.shadowRoot.querySelector('.toggle').getAttribute('aria-label')}`;
      el.shadowRoot.querySelector('.toggle').setAttribute('aria-label', newLabel);
    });
    let tipsPainted = new CustomEvent('ed11yResultsPainted');
    document.dispatchEvent(tipsPainted);
    resumeObservers();
  }

  function dismissOne(dismissalType, test, dismissalKey) {

    // Update dismissal record.
    if (dismissalType === 'reset') {
      delete State.dismissedAlerts[Options.currentPage][test][dismissalKey];
      if (Object.keys(State.dismissedAlerts[Options.currentPage][test]).length === 0) {
        delete State.dismissedAlerts[Options.currentPage][test];
      }
      if (Object.keys(State.dismissedAlerts[Options.currentPage]).length === 0) {
        delete State.dismissedAlerts[Options.currentPage];
      }
      //window.requestAnimationFrame(() => updatePanel());
    } else {
      let dismissal = {};
      dismissal[dismissalKey] = dismissalType;
      if (typeof State.dismissedAlerts[Options.currentPage] == 'undefined') {
        let store = {};
        store[test] = dismissal;
        State.dismissedAlerts[Options.currentPage] = store;
      } else if (typeof State.dismissedAlerts[Options.currentPage][test] === 'undefined') {
        State.dismissedAlerts[Options.currentPage][test] = dismissal;
      } else {
        State.dismissedAlerts[Options.currentPage][test][dismissalKey] = dismissalType;
      }
  		UI.panelShowDismissed.removeAttribute('hidden');
    }

    // Send record to storage or dispatch an event to an API.
    if (Options.syncedDismissals === false) {
      localStorage.setItem('ed11ydismissed', JSON.stringify(State.dismissedAlerts));
    }
    let dismissalDetail = {
      dismissPage: Options.currentPage,
      dismissTest: test,
      dismissKey: dismissalKey,
      dismissAction: dismissalType,
    };
    let ed11yDismissalUpdate = new CustomEvent('ed11yDismissalUpdate', { detail: dismissalDetail });
    window.setTimeout(() => {
      document.dispatchEvent(ed11yDismissalUpdate);
    },100);
  }

  function editableHighlighter (resultID, show, firstVisible) {

    if (!show) {
      UI.editableHighlight[resultID]?.highlight.style.setProperty('opacity', '0');
      return;
    }
    const result = Results[resultID];
    let el = UI.editableHighlight[resultID]?.highlight;
    if (!el) {
      el = document.createElement('ed11y-element-highlight');
      el.classList.add('ed11y-element');
      UI.editableHighlight[resultID] = {highlight: el, resultID: resultID};
      el.style.setProperty('position', 'absolute');
      el.style.setProperty('pointer-events', 'none');
      State.panelAttachTo.appendChild(el);
    }
    UI.editableHighlight[resultID].target = firstVisible ? firstVisible : result.element;
    const zIndex = result.dismissalStatus ? 'calc(var(--ed11y-buttonZIndex, 9999) - 2)' : 'calc(var(--ed11y-buttonZIndex, 9999) - 1)';
    el.style.setProperty('z-index', zIndex);
    const outline = result.type === 'warning' ?
      '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-warning, #fad859), 0 0 0 3px var(--ed11y-warning, #fad859), 0 0 0 4px var(--ed11y-primary)'
      : '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-alert, #b80519), 0 0 0 3px var(--ed11y-alert, #b80519), 0 0 1px 3px';
    el.style.setProperty('box-shadow', outline);
    el.style.setProperty('border-radius', '3px');
    el.style.setProperty('top', '0');
    el.style.setProperty('left', '0');
    alignHighlights();
    el.style.setProperty('opacity', '1');
  }

  function transferFocus () {
    if (!State.tipOpen) {
      return;
    }
    const id = State.openTip.tip.dataset.ed11yResult;
    const target = Results[id].element;
    const editable = target.closest('[contenteditable]');
    if (!editable && !target.closest('textarea, input')) {
      if (target.closest('a')) { // @todo after merge add button?
        State.toggledFrom = target.closest('a');
      } else if (target.getAttribute('tabindex') !== null) {
        State.toggledFrom = target;
      } else {
        target.setAttribute('tabindex', '0');
        State.toggledFrom = target;
      }
      State.openTip.tip.shadowRoot.querySelector('.close').click();
    } else {
      State.toggledFrom = false;
      if (target.getAttribute('contenteditable') === 'true') {
        State.toggledFrom = target;
      } else if (target.closest('p[contenteditable="true"]')) {
        State.toggledFrom = target.closest('p[contenteditable="true"]');
      } else {
        // Just got complicated -- need to move a caret
        State.toggledFrom = false;
      }
      State.openTip.tip.shadowRoot.querySelector('.close').click();
      if (!State.toggledFrom && editable) {
        // Need to move focus manually
        // h/t https://stackoverflow.com/questions/6249095/how-to-set-the-caret-cursor-position-in-a-contenteditable-element-div
        editable.focus();
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(target, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  function paintReady () {

    if (!Options.cssUrls) {
      const cssLink = document.querySelector('link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]');
      if (cssLink) {
        Options.cssUrls = [cssLink.getAttribute('href')];
      } else {
        console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
        Options.cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`];
      }
    }

    for (const [key, value] of Object.entries(Theme)) {
      document.documentElement.style.setProperty('--ed11y-' + key, `${value}`);
    }

    // May be redundant, but preloads unbundled files.
    if (document.querySelector('body')) {
      // May be redundant, but preloads unbundled files.
      UI.attachCSS(document.querySelector('body'));
    }


    State.roots.forEach((root) => {
      // Shadow elements don't inherit styles, so they need their own copy.
      if (Options.shadowComponents) {
        root.querySelectorAll(Options.shadowComponents)?.forEach((shadowHost) => {
          if (shadowHost.shadowRoot) {
            UI.attachCSS(shadowHost.shadowRoot);
          }
        });
      }
    });
    State.bodyStyle = true;
  }

  function alertOnInvisibleTip (button, target) {
    let delay = 100;
    if (Options.hiddenHandlers.length > 0 && !!target.closest(Options.hiddenHandlers)) {
      // Increase hesitation before scrolling, in case theme animates open an element.
      delay = 333;
      document.dispatchEvent(new CustomEvent('ed11yShowHidden', {
        detail: {result: button.getAttribute('data-ed11y-result')}
      }));
    }
    const details = target.closest('details');
    if (details && !details.open) {
      details.open = true;
      delay = 333;
    }

    // Scroll into view and throw an alert if the button or target is hidden.
    window.setTimeout((button, target) => {
      UI.message.textContent = '';
      let firstVisible = false;
      let alertMessage;
      if (Options.checkVisible && !visible(target)) {
        button.dataset.ed11yHiddenResult = 'true';
        firstVisible = firstVisibleParent(target);
        alertMessage = Lang._('NOT_VISIBLE');
      }
      else if (target.closest('[aria-hidden="true"]')) {
        firstVisible = target.closest('[aria-hidden="true"]');
        firstVisible = firstVisible.closest(':not([aria-hidden="true"])');
        alertMessage = Lang._('NOT_VISIBLE');
      }
      if (firstVisible) {
        // Throw warning that the element cannot be highlighted.
        const tipAlert = State.openTip.tip?.shadowRoot.querySelector('.ed11y-tip-alert');
        tipAlert.textContent = alertMessage;
      }
      if (State.viaJump) {
        let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
        let scrollTarget = State.inlineAlerts ? button : target;
        if (button.dataset.ed11yHiddenResult || !(visible(scrollTarget))) {
          scrollTarget = firstVisibleParent(target);
        }
        if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
          scrollTarget.scrollIntoView({ block: scrollPin, behavior: 'instant' });
        } else {
          raceCrash();
          return false;
        }
      }
      if (!State.inlineAlerts) {
        editableHighlighter(button.dataset.ed11yResult, true, firstVisible);
      } else {
        if (firstVisible) {
          firstVisible.classList.add('ed11y-hidden-highlight');
        }
      }
      let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
      if (!activeTip) {
        button.setAttribute('data-ed11y-action','open');
        if (State.viaJump) {
          window.setTimeout(() => {
            // Race conditions are fun.
            let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
            if (State.viaJump) {
              activeTip?.shadowRoot.querySelector('.title').focus();
            }
          }, 100);
        }
      } else {
        if (State.viaJump) {
          window.setTimeout(() => {
            // Race conditions are fun.
            activeTip?.shadowRoot.querySelector('.title').focus();
          }, 100, activeTip);
        }
      }
      State.viaJump = false;
    }, delay, button, target);
  }

  function jumpTo(next = true) {
    if (!State.showPanel) {
      return false;
    }
    State.viaJump = true;
    // Determine target result.
    let goMax = State.jumpList.length - 1;
    let goNum = next ? +State.lastOpenTip + 1 : +State.lastOpenTip - 1;
    if (goNum < 0) {
      // Reached end of loop or dismissal pushed us out of loop
      State.nextText = Lang._('SKIP_TO_ISSUE');
      goNum = goMax;
    } else if (goNum > goMax) {
      goNum = 0;
      State.nextText = Lang._('SKIP_TO_ISSUE');
    } else {
  		const showNum = isNaN(goNum) ? 2 : goNum + 2;
      State.nextText = Lang._('SKIP_TO_ISSUE') + ' ' + showNum;
    }
    State.lastOpenTip = goNum;
    window.setTimeout(function () {
      UI.panelJumpNext.querySelector('.ed11y-sr-only').textContent = State.nextText;
    }, 250);

    resetClass(['ed11y-hidden-highlight']);
    if (State.jumpList.length === 0) {
      buildJumpList();
    }
    // Find next or first result in the dom ordered list of results.
    let goto = State.jumpList[goNum];
  	if (!goto) {
  		goto = State.jumpList[0];
  		State.lastOpenTip = 0;
  	}
    let result = goto.getAttribute('data-ed11y-result');
    let gotoResult = Results[result];
    const target = gotoResult.element;

    // First of two scrollTo calls, to trigger any scroll based events.
    let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
    let scrollTarget = State.inlineAlerts ? goto : target;
    if (goto.dataset.ed11yHiddenResult || !(visible(scrollTarget))) {
      scrollTarget = firstVisibleParent(target);
    }
    if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
      scrollTarget.scrollIntoView({ block: scrollPin, behavior: 'instant' });
    } else {
      raceCrash();
      return false;
    }

    // Open the button
    goto.setAttribute('data-ed11y-action','open');
    State.scrollPending = 2;
    updateTipLocations();
  }

  const incrementalAlign = lagBounce( () => {
  		if (!State.running && !State.alignPending) {
  			State.scrollPending++;
  			updateTipLocations();
  			State.alignPending = false;
  		} else {
  			incrementalAlign();
  		}
  	}, 10);

  function alignTip (button, toolTip, recheck = 0, reveal = false) {
  	if (!toolTip) {
  		return;
  	}

  	let arrow = toolTip.shadowRoot.querySelector('.arrow');
  	let tip = arrow.nextElementSibling;
  	let loopCount = recheck - 1;

  	// Various hiddenHandlers may cause element to animate open.
  	if (recheck > 0) {
  		window.setTimeout(function () {
  			requestAnimationFrame(()=>alignTip(button, toolTip, loopCount, reveal));
  		}, 200 / loopCount, button, toolTip, loopCount, reveal);
  	}
  	if (reveal) {
  		window.setTimeout(() => {
  			toolTip.style.setProperty('opacity', '1');
  			// 140 seems to be the minimum to not flash.
  		}, 140, toolTip, tip);
  	}

  	const mark = button.getRootNode().host;
  	const resultNum = button.dataset.ed11yResult;
  	const result = Results[resultNum];

  	// Find button on page
  	const scrollTop = window.scrollY;
  	let leftAdd = State.inlineAlerts ? window.scrollX : 0;

  	let buttonOffset = button.getBoundingClientRect();
  	let buttonSize = buttonOffset.width;
  	let buttonLeft = buttonOffset.left + leftAdd;
  	let buttonTop = buttonOffset.top + scrollTop;

  	let containTop = scrollTop;
  	let containLeft = 0;
  	let containWidth = window.innerWidth;
  	let containBottom = window.innerHeight + scrollTop;
  	let absoluteBottom = containBottom;

  	if (!State.inlineAlerts && result.scrollableParent) {
  		let bounds = result.scrollableParent.getBoundingClientRect();
  		if (bounds.width > 0) {
  			//buttonTop = buttonTop + result.scrollableParent.scrollTop;
  			containLeft = Math.max(0, bounds.left);
  			containWidth = Math.min(containWidth, bounds.width - 30);
  			containBottom = bounds.bottom + scrollTop;
  			containTop = bounds.top + scrollTop;
  			absoluteBottom = bounds.top + result.scrollableParent.scrollHeight;
  		}
  	} else if (mark.dataset.ed11yHiddenResult === 'true' || !(visible(mark) || buttonOffset.top === 0 && buttonOffset.left === 0)) {
  		// Invisible button
  		// todo postpone: could we use the not-inline drawing pattern for invisible targets?
  		const theFirstVisibleParent = firstVisibleParent(mark.result.element);
  		if (theFirstVisibleParent) {
  			buttonOffset = theFirstVisibleParent.getBoundingClientRect();
  			buttonLeft = buttonOffset.left;
  			buttonTop = buttonOffset.top;
  		} else {
  			tip.style.setProperty('max-width', 'none');
  		}
  		// Estimate from font when it can't be measured.
  		buttonSize = window.innerWidth > 800 ? 38 : 33;
  	}
  	// Set wrapper for CSS.
  	//tip.closest('.ed11y-wrapper').style.setProperty('width', buttonSize + 'px');
  	//tip.closest('.ed11y-wrapper').style.setProperty('height', buttonSize + 'px');
  	document.documentElement.style.setProperty('--ed11y-buttonWidth', buttonSize + 'px');
  	tip.style.setProperty('max-width', `min(${containWidth > 280 ? containWidth : 280}px, 90vw)`);
  	const containRight = Math.min(window.innerWidth, containLeft + containWidth);
  	toolTip.style.setProperty('top', buttonOffset.top + scrollTop + 'px');
  	toolTip.style.setProperty('left', buttonOffset.left + leftAdd + 'px');
  	const tipWidth = tip.offsetWidth;
  	const tipHeight = tip.offsetHeight;

  	let direction = 'under';

  	// Default to displaying under
  	if (buttonTop === 0 && buttonLeft === 0) {
  		direction = 'whompWhomp';
  	} else if (buttonTop + tipHeight + scrollTop + buttonSize + 22 > containBottom) {
  		// It won't fit under. Look elsewhere.
  		if ( containRight > buttonSize + tipWidth + buttonLeft + 30 &&
  			containTop + tipHeight + 30 < containBottom ) {
  			direction = 'right';
  		} else if (buttonTop - tipHeight - 15 > containTop) {
  			direction = 'above';
  		} else if ( containLeft < buttonLeft - (buttonSize + tipWidth + 30) &&
  			containTop + tipHeight + 30 < containBottom) {
  			direction = 'left';
  		} else if (buttonTop + tipHeight + buttonSize > absoluteBottom) {
  			// It REALLY doesn't fit below.
  			direction = 'above';
  		}
  		// Back to default.
  	} // else: under.
  	arrow.dataset.direction = direction;

  	let nudgeX = 0;
  	let nudgeY = 0;

  	const align = function(container, alignTo, size, direction) {
  		let over = container - (alignTo + size + buttonSize);
  		if (over < 0) {
  			if (direction === 'horizontal' && alignTo + over < 0) {
  				// Prevent left edge overshoot.
  				return Math.max(0 - alignTo, 4 - size);
  			}
  			return Math.max(over, buttonSize + 10 - size);
  		}
  		return 0;

  	};

  	switch (direction) {
  		case 'under':
  			nudgeX = align(containRight, buttonLeft, tipWidth, 'horizontal');
  			arrow.style.setProperty('top', buttonSize + 'px');
  			arrow.style.setProperty('right', 'auto');
  			arrow.style.setProperty('bottom', 'auto');
  			arrow.style.setProperty('left', buttonSize / 2 - 10 + 'px');
  			tip.style.setProperty('top', buttonSize + 10 + 'px');
  			tip.style.setProperty('right', 'auto');
  			tip.style.setProperty('bottom', 'auto');
  			tip.style.setProperty('left', '-4px');
  			break;
  		case 'above':
  			nudgeX = align(containRight, buttonLeft, tipWidth, 'horizontal');
  			arrow.style.setProperty('top', 'auto');
  			arrow.style.setProperty('right', 'auto');
  			arrow.style.setProperty('bottom', '2px');
  			arrow.style.setProperty('left', buttonSize / 2 - 10 + 'px');
  			tip.style.setProperty('top', 'auto');
  			tip.style.setProperty('right', 'auto');
  			tip.style.setProperty('bottom', '12px');
  			tip.style.setProperty('left', '-4px');
  			break;
  		case 'right':
  			nudgeY = align(containBottom, buttonTop, tipHeight, 'vertical');
  			arrow.style.setProperty('top', buttonSize / 2 - 10 + 'px');
  			arrow.style.setProperty('right', 'auto');
  			arrow.style.setProperty('bottom', 'auto');
  			arrow.style.setProperty('left', buttonSize + 'px');
  			tip.style.setProperty('top', '-4px');
  			tip.style.setProperty('right', 'auto');
  			tip.style.setProperty('bottom', 'auto');
  			tip.style.setProperty('left', buttonSize + 10 + 'px');
  			break;
  		case 'left':
  			nudgeY = align(containBottom, buttonTop, tipHeight, 'vertical');
  			arrow.style.setProperty('top', buttonSize / 2 - 10 + 'px');
  			arrow.style.setProperty('right', '0');
  			arrow.style.setProperty('bottom', 'auto');
  			arrow.style.setProperty('left', 'auto');
  			tip.style.setProperty('top', '-4px');
  			tip.style.setProperty('right', '10px');
  			tip.style.setProperty('bottom', 'auto');
  			tip.style.setProperty('left', 'auto');
  			break;
  		case 'whompWhomp':
  			nudgeY = align(containBottom, buttonTop, tipHeight, 'horizontal');
  			arrow.style.setProperty('top', '0');
  			arrow.style.setProperty('right', '0');
  			arrow.style.setProperty('bottom', '0');
  			arrow.style.setProperty('left', '0');
  			tip.style.setProperty('top', `calc(50vh - ${tipWidth / 2}px)`);
  			tip.style.setProperty('right', 'auto');
  			tip.style.setProperty('bottom', 'auto');
  			tip.style.setProperty('left', `calc(50vh - ${tipHeight / 2}px)`);
  			break;
  	}
  	if (nudgeX || nudgeY) {
  		tip.style.setProperty('transform', `translate(${nudgeX}px, ${nudgeY}px)`);
  	} else {
  		tip.style.setProperty('transform', 'none');
  	}
  	alignHighlights();
  }

  function updateTipLocations () {
  	if (!State.scrollTicking && State.scrollPending > 0 && !State.running && State.jumpList && State.showPanel) {
  		State.scrollTicking = true;
  		alignButtons();
  		if (State.tipOpen) {
  			alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
  		}
  		State.scrollPending --;
  	}
  	State.scrollTicking = false;
  	if (State.scrollPending > 0) {
  		requestAnimationFrame(() => updateTipLocations());
  	}
  }

  function alignHighlights() {

  	if (Options.fixedRoots && UI.editableHighlight.length > 0) {
  		State.positionedFrames = [];

  		Options.fixedRoots.forEach((root) => {
  			if (root['framePositioner']) {
  				State.positionedFrames.push(root['framePositioner'].getBoundingClientRect());
  			}
  		});
  	}

  	UI.editableHighlight.forEach((el) => {
  		if (!Results[el.resultID]) {
  			State.interaction = true;
  			State.forceFullCheck = true;
  			UI.editableHighlight = [];
  			incrementalCheckDebounce(true);
  			return false;
  		}

  		const framePositioner = Results[el.resultID].fixedRoot && State.positionedFrames[Results[el.resultID].fixedRoot] ?
  			State.positionedFrames[Results[el.resultID].fixedRoot] : { top: 0, left: 0 };

  		let targetOffset = el.target.getBoundingClientRect();
  		if (!visible(el.target)) {
  			// Invisible target.
  			const theVisibleParent = firstVisibleParent(el.target);
  			targetOffset = theVisibleParent ? theVisibleParent.getBoundingClientRect() : targetOffset;
  		}

  		el.highlight.style.setProperty('width', targetOffset.width + 6 + 'px');
  		el.highlight.style.setProperty('top', targetOffset.top + framePositioner.top + window.scrollY - 3 + 'px');
  		el.highlight.style.setProperty('left', targetOffset.left + framePositioner.left - 3 + 'px');
  		el.highlight.style.setProperty('height', targetOffset.height + 6 + 'px');
  	});
  }

  const slowIncremental = lagBounce( () => {
  		//incrementalAlign(); // Immediately realign tips.
  		//State.alignPending = false;
  		State.interaction = true;
  		incrementalCheckDebounce();
  }, 500);

  function windowResize() {
  	if (UI.panel?.classList.contains('ed11y-active') === true) {
  		alignAlts();
  		alignButtons();
  	}
  	if (State.tipOpen) {
  		alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
  	}
  	alignPanel();
  }

  const scrollWatch = function(container) {
  	container.addEventListener('scroll', function() {
  		// Trigger on scrolling other containers, unless it will flicker a tip.
  		if (!State.inlineAlerts) {
  			// @todo removed check for !State.tipOpen in 3.x. Should close tip if mark is scrolled off the screen.
  			State.scrollPending = State.scrollPending < 2 ? State.scrollPending + 1 : State.scrollPending;
  			requestAnimationFrame(() => updateTipLocations());
  		} else if (State.tipOpen) {
  			alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
  		}
  	}, {
  		passive: true,
  	});
  };

  function intersectionObservers() {

  	Elements.Found.editable?.forEach((editable) => {
  		scrollWatch(editable);
  	});

  	scrollWatch(document);

  	document.addEventListener('selectionchange', function() {
  		if (!State.running) {
  			selectionChanged();
  		}
  	}, {
  		passive: true,
  	});
  }

  const selectionChanged = lagBounce( () => {
  		if (rangeChange()) {
  			updateTipLocations();
  			checkEditableIntersects();
  		}
  	}, 100);

  function rangeChange(anchorNode) {
  	let anchor = anchorNode ? anchorNode : window.getSelection()?.anchorNode;
  	const expandable = anchor &&
  		anchor.parentNode &&
  		typeof anchor.parentNode === 'object' &&
  		typeof anchor.parentNode.matches === 'function';
  	if (!anchor || expandable &&
  		( anchor.parentNode.matches(Options.checkRoot) ||
  			( !anchor.parentNode.matches(Options.checkRoot) && anchor.parentNode.matches('div[contenteditable="true"]')
  			)
  		)
  	) {
  		State.activeRange = false;
  		return false;
  	}
  	// todo: is this redundant?
  	if (expandable) {
  		const closest = anchor.parentNode.closest('p, td, th, li, h2, h3, h4, h5, h6');
  		if (closest) {
  			anchor = closest;
  		}
  	}
  	const range = document.createRange();
  	if (typeof anchor === 'object') {
  		range.setStartBefore(anchor);
  		range.setEndAfter(anchor);
  	}
  	if (typeof range !== 'object' || typeof range.getBoundingClientRect !== 'function') {
  		if (State.activeRange) {
  			State.activeRange = false;
  			return true;
  		} else {
  			return false;
  		}
  	} else {
  		let sameRange = State.activeRange &&
  			range.startContainer === State.activeRange.startContainer &&
  			range.startOffset === State.activeRange.startOffset;
  		State.activeRange = range;
  		return !sameRange;
  	}
  }

  /*
  Set up mutation observer for added nodes.
  */
  function startObserver (root) {

  	// We don't want to nest or duplicate observers.
  	if (typeof root.closest === 'function') {
  		// It's a normal tag.
  		if (root.closest('[data-editoria11y-observer]')) {
  			// We're already being watched.
  			return;
  		} else {
  			root.dataset.editoria11yObserver = 'true';
  		}
  	} else {
  		// Match has DOM traversal issues.
  		if (typeof root.host !== 'function' ||
  			root.host.dataset.editoria11yObserver !== undefined) {
  			// Already watching or something is weird.
  			return;
  		} else {
  			// Observe host instead.
  			root.host.dataset.editoria11yObserver = 'true';
  		}
  	}

  	// Options for the observer (which mutations to observe)
  	const config = { childList: true, subtree: true, characterData: true };

  	const logNode = function (node) {
  		/*
  		* Newly inserted tables and headings should not be flagged as empty
  		* before the user has a chance to edit them. This is crude, but it
  		* delays flagging.
  		* */
  		if (!node || node.nodeType !== 1 || !node.isConnected || node.closest('script, link, head, .ed11y-wrapper, .ed11y-style, .ed11y-element')) {
  			return 0;
  		}
  		if (State.inlineAlerts) {
  			return 1;
  		}
  		if (!node.matches('[contenteditable] *')) {
  			return 0;
  		}
  		if (State.inlineAlerts) {
  			return true;
  		}
  		const searchList = 'table, h1, h2, h3, h4, h5, h6, blockquote';
  		if (!State.inlineAlerts &&
  			!node.matches(node.matches(searchList)) &&
  			node.matches('[contenteditable] *')) {
  			if (node.matches('table *')) {
  				node = node.closest('table');
  			} else if (!node.matches(searchList)) {
  				node = node.querySelector(searchList);
  			}
  		}
  		if (node && node.matches(searchList)) {
  			State.recentlyAddedNodes.set(node, Date.now());
  			incrementalAlign(); // Immediately realign tips.
  			return 0;
  		}
  		return 1;
  	};

  	// Create an observer instance linked to the callback function
  	const callback = (mutationList) => {
  		let align = 0;
  		for (const mutation of mutationList) {
  			if (mutation.type === 'characterData' &&
  				mutation.target.parentElement &&
  				mutation.target.parentElement.matches('[contenteditable] *, [contenteditable]')) {
  				incrementalAlign();
  				slowIncremental();
  				return;
  			} else if (mutation.type === 'childList') {
  				// Recheck if there are relevant node changes.
  				if (mutation.removedNodes.length > 0) {
  					align += 1;
  				} else if (mutation.addedNodes.length > 0) {
  					mutation.addedNodes.forEach(node => {
  						align += logNode(node);
  					});
  				}
  			}
  		}
  		// These are debounced
  		if (!align) {
  			return;
  		}
  		window.setTimeout(function () {
  			incrementalAlign(); // Immediately realign tips.
  			State.alignPending = false;
  		},0);
  		window.setTimeout(function () {
  			incrementalCheckDebounce(); // Recheck after delay.
  		},0);
  	};

  	// Create an observer instance linked to the callback function
  	const observer = new MutationObserver(callback);
  	// Start observing the target node for configured mutations
  	observer.observe(root, config);
  	State.watching.push({
  		observer: observer,
  		root: root,
  		config: config,
  	});
  	document.addEventListener('readystatechange', () => {
  		window.setTimeout(function () {
  			State.scrollPending++;
  			updateTipLocations();
  		}, 100);
  	}, {
  		passive: true,
  	});
  	document.addEventListener("paste", () => {
  		State.scrollPending++;
  		updateTipLocations();
  		window.setTimeout(function () {
  			State.forceFullCheck = true;
  			incrementalCheckDebounce();
  		}, 100);
  	}, {
  		passive: true,
  	});
  	window.setTimeout(function () {
  		State.scrollPending++;
  		updateTipLocations();
  	}, 1000);
  }


  /*const getRuleset = {
  	checkHeaders: checkHeaders(Results, Options, State.headingOutline),
  	checkLinkText:
  	checkImages: ,
  	checkLabels: ,
  	checkQA: ,
  }*/

  const enqueueTests = function(queue, results) {
  	const test = queue.pop();
  	State.testsRemaining--;
  	try {
  		switch (test) {
  			case 'group1':
  				checkHeaders(results, Options, State.headingOutline);
  				checkImages(results, Options);
  				checkEmbeddedContent(results, Options);
  				customRuleset(results);
  				checkQA(results, Options);
  				break
  			case 'group2':
  				checkLinkText(results, Options);
  				break
  			case 'checkLabels':
  				checkLabels(results, Options);
  				break
  			case 'checkContrast':
  				checkContrast(results, Options);
  				break
  			case 'checkDeveloper':
  				checkDeveloper(results, Options);
  				break
  		}
  	} catch (error) {
  		showError(error);
  	}
  	if (queue.length > 0) {
  		if (State.browserSpeed < 100 || Options.headless) {
  			enqueueTests(queue, results);
  		} else {
  			window.setTimeout(function (queue) {
  				enqueueTests(queue, results);
  			}, 0, queue, results);
  		}
  	} else {
  		continueCheck();
  	}
  };

  function removeCustomTest() {
  	console.error('Editoria11y has disabled a custom test that is not returning results within 1000ms.');
  	Options.customTests--;
  	State.customTestsRemaining = 0;
  	continueCheck(true);
  	if (Options.customTests === 0) {
  		document.removeEventListener('ed11yResume', function () {
  			continueCheck(true);
  		});
  	}
  }

  State.testsRemaining = 0;
  // Toggles the outline of all headers, link texts, and images.
  function checkAll() {
  	if (State.tipOpen) {
  		return false;
  	}
  	State.disabled = false;

  	if (checkRunPrevent()) {
  		disable();
  	}

  	State.customTestsRunning = false;

  	State.roots = [];
  	// @todo CMS merge rewrite when Sa11y releases fixed root support.
  	if (Options.fixedRoots) {
  		Options.fixedRoots.forEach(root => {State.roots.push(root.fixedRoot);});
  	} else {
  		State.roots = document.querySelectorAll(`:is(${Options.checkRoot})`);
  	}
  	// Initialize root areas to check.
  	if (!State.roots && Options.headless === false) {
  		console.warn(Lang.sprintf('MISSING_ROOT', Options.checkRoot));
  	}

  	if (State.roots.length === 0) {
  		if (State.onLoad) {
  			console.warn(Lang._('MISSING_ROOT'));
  		}
  		disable();
  		return;
  	}

  	if ( State.incremental) {
  		State.oldResults = Results;
  	}
  	// Reset counts
  	Results.length = 0;
  	State.splitConfiguration.results.length = 0;

  	if ( State.splitConfiguration.active ) {
  		Object.assign(Options, State.splitConfiguration.sync);
  	}

  	buildElementList();

  	if (Options.customTests > 0) {
  		// Pause
  		State.customTestsRemaining += Options.customTests;
  		window.clearTimeout(State.customTestTimeout);
  		State.customTestTimeout = window.setTimeout(function() {
  			if (State.customTestsRemaining > 0) {
  				removeCustomTest();
  			}
  		}, 1000);
  		let customTests = new CustomEvent('ed11yRunCustomTests');
  		document.dispatchEvent(customTests); // todo there is a race condition here for slow custom tests. May need to pass State.customTestTimeout and only accept back results that match the ID.
  	}

  	// Call rulesets.
  	let queue = [
  		'group1',
  		'group2',
  	];

  	if (Options.readabilityPlugin && (!State.incremental || State.visualizing)) {
  		queue.push('checkReadability'); // todo merge param
  	}
  	if (Options.formLabelsPlugin) {
  		queue.push('checkLabels'); // todo cms merge param
  	}
  	if (Options.developerPlugin) {
  		queue.push('checkDeveloper'); // todo cms merge param
  	}
  	if (Options.contrastPlugin) {
  		queue.push('checkContrast');
  	}
  	// Todo after merge: developer and readability tests added via options here.
  	State.testsRemaining = queue.length;
  	enqueueTests(queue, State.splitConfiguration.active ? State.splitConfiguration.results : Results);
  	// @todo CMS merge when Sa11y support is ready.
  	// @todo after merge handle readability and developer checks.
  }

  function continueCheck(customCheck = false) {
  	if (customCheck) {
  		State.customTestsRemaining--;
  	}
  	// change to only countering fro custom tests
  	if (State.customTestsRemaining + State.testsRemaining > 0) {
  		// Tests still in progress.
  		return;
  	}

  	// Filter split configuration results.
  	if (State.splitConfiguration.active && State.splitConfiguration.results.length > 0) {
  		handleSyncOnlyResults();
  	} else {
  		filterAlerts(false);
  		syncResults(Results);
  	}
  	countAlerts();


  	if (typeof UI.panelToggle.querySelector === 'function') {
  		UI.panelToggle.querySelector('.ed11y-sr-only').textContent = Lang._('MAIN_TOGGLE_LABEL');
  	}
  	if (State.visualizing) {
  		//checkReadability([]); // todo???
  		showHeadingsPanel();
  		showAltPanel();
  	}

  	updatePanel();
  	window.setTimeout(() => {
  		if (Options.watchForChanges) {
  			Elements.Found.editable?.forEach(editable => {
  				if (!editable.matches('.drag-observe')) {
  					editable.classList.add('drag-observe');
  					editable.addEventListener('drop', () => {
  						// This event does not bubble.
  						State.forceFullCheck = true;
  						incrementalCheckDebounce();
  					});
  				}
  			});
  			if (Options.watchForChanges === 'checkRoots') {
  				State.roots?.forEach((root) => {
  					startObserver( root );
  				});
  			} else {
  				startObserver( document.body );
  			}
  			resumeObservers(); // on recheck.
  		}
  	}, 0);
  }

  function incrementalCheck() {
  	if (!State.running) {
  		if (State.tipOpen || (!State.interaction && !State.forceFullCheck)) {
  			return;
  		}
  		State.interaction = false;
  		State.running = true;
  		let runTime = performance.now();
  		State.incremental = true;
  		if (State.disabled && State.closedByDisable) {
  			State.showPanel = true;
  			State.closedByDisable = false;
  			State.disabled = false;
  		}
  		checkAll();
  		window.setTimeout(function() {
  			if (State.visualizing) {
  				document.dispatchEvent(new CustomEvent('ed11yEndVisualization'));
  			}
  		}, 500);
  		// @todo after merge test: if there are no issues and the heading panel is open...it closes!
  		// Increase debounce if runs are slow.
  		runTime = performance.now() - runTime;
  		State.browserSpeed = runTime > 100 ? 100 : (State.browserSpeed + runTime) / 2;
  		// Todo: optimize tip placement so we do not need as much debounce.
  		State.browserLag = State.browserSpeed < 1 ? 0 : State.browserSpeed * 100 + State.totalCount;
  	} else {
  		// Ed11y was running, try again later.
  		window.setTimeout(() => {incrementalCheckDebounce();}, 250);
  	}
  }

  const incrementalCheckDebounce = lagBounce( () => {
  	incrementalCheck();
  }, 250);


  function resetPanel() {
  	// Reset main panel.
  	State.visualizing = true; // so visualize function removes visualizers.
  	visualize();
  	if (State.totalCount === 0 && State.dismissedCount > 0) {
  		UI.panelCount.textContent = 'i';
  		UI.panelToggleTitle.textContent = State.dismissedCount === 1 ?
  			Lang._('buttonShowHiddenAlert') :
  			Lang.sprintf('PANEL_DISMISS_BUTTON', State.dismissedCount);
  	}

  	if (typeof (UI.panel) === 'object') {
  		UI.panel?.classList.add('ed11y-shut');
  		UI.panel?.classList.remove('ed11y-active');
  		UI.panelToggle.ariaExpanded = false;
  		if (!State.showDismissed && typeof UI.panelShowDismissed === 'function') {
  			UI.panelShowDismissed.setAttribute('data-ed11y-pressed', 'false');
  			UI.panelShowDismissed.querySelector('.ed11y-sr-only').textContent = State.dismissedCount === 1 ?
  				Lang._('buttonShowHiddenAlert') : Lang.sprintf('PANEL_DISMISS_BUTTON', State.dismissedCount);
  		}
  	}
  }

  // @todo is this abstraction still needed?
  window.addEventListener('ed11yEndVisualization', ()=>{
  	State.visualizing = false;
  	pauseObservers();
  	visualize();
  	resumeObservers();
  });

  function dismissThis (dismissalType, all = false) {
  	// Find the active tip and draw its identifying information from the result list
  	let removal = State.openTip;
  	let id = removal.tip.dataset.ed11yResult;
  	let test = Results[id].test;

  	if (all) {
  		Results.forEach((result) => {
  			if (result.test === test && result.dismissalStatus !==dismissalType) {
  				dismissOne(dismissalType, test, result.dismiss);
  			}
  		});
  	} else {
  		let dismissalKey = Results[id].dismiss;
  		dismissOne(dismissalType, test, dismissalKey);
  	}

  	// Remove tip and reset borders around element
  	resetClass(['ed11y-hidden-highlight', 'ed11y-ring-red', 'ed11y-ring-yellow']);
  	removal.tip?.parentNode?.removeChild(removal.tip);
  	removal.button?.parentNode?.removeChild(removal.button);
  	remove('ed11y-element-highlight', 'document');
  	UI.editableHighlight = [];

  	reset();
  	State.showPanel = true;
  	checkAll();

  	let rememberGoto = State.lastOpenTip;

  	window.setTimeout(function () {
  		if (State.jumpList.length > 0) {
  			State.lastOpenTip = (rememberGoto - 1);
  			UI.panelJumpNext?.focus();
  		} else {
  			window.setTimeout(function () {
  				UI.panelToggle?.focus();
  			}, 100);
  		}
  	}, 500, rememberGoto);

  }

  function toggleShowDismissals () {
  	// todo postpone: if user has allowHide but not allowOK or vice versa, this temporarily clears both.
  	State.ignoreAll = false;
  	State.showDismissed = !(State.showDismissed);
  	//reset();
  	State.forceFullCheck = true;
  	State.showPanel = true;
  	resetResults();
  	incrementalCheck();

  	UI.panelShowDismissed.setAttribute('data-ed11y-pressed', `${State.showDismissed}`);
  	window.setTimeout(function() {
  		UI.panelShowDismissed.focus();
  	}, 0);
  }

  function togglePanel () {
  	State.ignoreAll = false; // todo: should reset to option on close.

  	if (!State.doubleClickPrevent) {
  		// Prevent clicks piling up while scan is running.
  		if (State.running !== true) {
  			State.running = true;
  			// Re-scan each time the panel reopens.
  			if (!State.showPanel) {
  				State.onLoad = false;
  				State.incremental = false;
  				State.showPanel = true;
  				if (State.dismissedCount > 0 && State.warningCount === 0 && State.errorCount === 0) {
  					State.showDismissed = false;
  					toggleShowDismissals();
  				} else {
  					checkAll();
  				}
  				Options.userPrefersShut = false;
  				localStorage.setItem('editoria11yShow', '1');
  			}
  			else {
  				UI.panelToggleTitle.textContent = Lang._('MAIN_TOGGLE_LABEL');
  				State.showDismissed = false;
  				State.showPanel = false;
  				reset();
  				Options.userPrefersShut = true;
  				localStorage.setItem('editoria11yShow', '0');
  			}
  		}
  	}
  	State.doubleClickPrevent = true;
  	window.setTimeout(function () {
  		State.doubleClickPrevent = false;
  	}, 200);
  	return false;
  }

  function raceCrash() {
  	// A marked element disappeared while we were jumping to it.
  	if (State.loopStop) {
  		return;
  	}
  	State.loopStop = true;
  	reset();
  	State.showPanel = true;
  	checkAll();
  	window.setTimeout(function() {
  		if (Results.length > 0 && State.loopStop) {
  			jumpTo();
  			State.loopStop = false;
  		}
  	},100, State.loopStop);
  }

  function disable() {
  	if (State.showPanel && !State.closedByDisable) {
  		State.closedByDisable = true;
  	}
  	State.disabled = true;
  	reset();
  	document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.panelBar);
  	document.documentElement.style.setProperty('--ed11y-activeColor', Theme.panelBarText);
  	document.documentElement.style.setProperty('--ed11y-activeBorder', Theme.panelBarText + '44');
  	document.documentElement.style.setProperty('--ed11y-activePanelBorder', 'transparent');
  	if (typeof UI.panelToggle.querySelector === 'function') {
  		UI.panel?.classList.remove('ed11y-errors', 'ed11y-warnings');
  		UI.panelCount.textContent = 'i';
  		UI.panelJumpNext.setAttribute('hidden', '');
  		UI.panelToggle.classList.add('disabled');
  		UI.panelToggle.querySelector('.ed11y-sr-only').textContent = State.english ?
  			Lang._('toggleDisabled') : Lang._('CONTAINER_LABEL');
  	}
  }

  function reset () {
  	// @todo should we also flush things like Elements.Found.altMark?
  	pauseObservers();
  	resetResults();
  	resetPanel();
  	State.incremental = false;
  	State.running = false;
  	State.showPanel = false;
  }

  const ed11yLang = {

    // ESLint config:
    /* global Ed11y */
    /* exported ed11yLang */

    strings : {

      // Main Panel =========================================
      OUTLINE: 'Headings',
  		IMAGES: 'Alt text',

  		// Extended English strings with translated fallback.
  		SKIP_TO_ISSUE: 'Go to issue',
  		buttonFirstContent: 'Go to first alert',
  		MAIN_TOGGLE_LABEL: 'Toggle accessibility tools',
  		toggleDisabled: 'No content available for Editoria11y to check.',
  		PANEL_HEADING: 'Check headings & alt text',
  		buttonToolsActive: 'Hide headings & alt text',
      PANEL_DISMISS_BUTTON: `Show %(dismissCount) hidden alerts`,
  		buttonShowHiddenAlert: 'Show hidden alert',
  		buttonHideHiddenAlert: 'Hide hidden alert',
      buttonHideHiddenAlerts: `Hide %(count) hidden alerts`,

  		// Visualization
      NO_IMAGES: 'No images found.',
  		ALT: 'Alt Text: ',
      MISSING: '(missing!)',
  		panelCheckOutline: '<p class="ed11y-small">This shows the <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">heading outline</a>. Check that it matches how the content is organized visually.</p>', // Shown for EN only.
  		panelCheckAltText: '<p class="ed11y-small">Check that each image <a href="https://www.w3.org/WAI/tutorials/images/informative/">describes what it means in context</a>, and that there are no images of text.</p>', // Shown for EN only.
      DECORATIVE: 'Marked decorative',
      /* Outline error explanations currently hidden.
  		errorOutlinePrefixSkippedLevel: '(flagged for skipped level) ',
      errorOutlinePrefixHeadingEmpty: '(empty heading) ',
      errorOutlinePrefixHeadingIsLong: '(flagged for length) ',
      */

      // Errors and alerts ==================================
      NOT_VISIBLE: 'Note: this content may not be visible. Look for it inside the outlined container.',
  		SUS_ALT_STOPWORDS: ['image', 'graphic', 'picture', 'photo', 'thumbnail', 'icon', 'placeholder','spacer','tbd','todo', 'copyright', 'courtesy of'], // todo Ed11y test use to catch these at the end as well as the beginning.

  		// Strings used in tests ==============================

  		// @todo after merge Add courtesy of, copyright, and photo by to Sa11y.
      // suspiciousWords: ['image of','graphic of','picture of','photo of','photograph of','placeholder','spacer','tbd','todo', 'copyright', 'courtesy of', 'photo by'],
      // badEndingForAlt: ['photo', 'image', 'photograph', 'picture'],
  		// @todo after merge Compare Sa11y test.
      //linksUrls: ['http:/', 'https:/', '.asp', '.htm', '.php', '.edu/', '.com/'],
  		// @todo after merge Compare Sa11y test performance
      //linksMeaningless: /(learn|to|more|now|this|page|link|site|website|check|out|view|our|read|download|form|here|click|"|'|\?|\.|-|,|:|>|<|\s)+/g,
      //linkStringsNewWindows: /window|\stab|download/g,

      // Tooltips ======================================

      WARNING: 'manual check needed',
      //ERROR: 'alert',
      ALERT_TEXT: 'Issue',
      //toggleAriaLabel: `Accessibility %(label)`,
      transferFocus: 'Edit this content', // @todo translate
      dismissOkButtonContent: 'Mark as OK', //@todo translate
  		DISMISS: 'Mark as ignored',
      dismissActions: `%(count) similar issues`, // 2.3.10 // @todo translate
  		DISMISS_ALL: 'Ignore all like this', // 2.3.10
      dismissOkAllButton: 'Mark all like this as OK', // @todo translate
      dismissOkTitle: 'Hides this alert for all editors',  // @todo translate
      dismissHideTitle: 'Hides this alert for you',  // @todo translate
      undismissOKButton: 'Restore this alert marked as OK',  // @todo translate
      undismissHideButton: 'Restore this hidden alert', // @todo translate
      undismissNotePermissions: 'This alert has been hidden by an administrator', // @todo translate
      reportsLink: 'Open site reports in new tab', // @todo translate
      ALERT_CLOSE: 'Close',
      panelHelpTitle: 'About this tool', // @todo translate
      panelHelp: `
    <p><a href="https://editoria11y.princeton.edu/">Editoria11y</a> checks for common accessibility needs, such as image alternative text, meaningful heading outlines and well-named links.</p>
    <p>Many alerts are "manual checks." Manual checks can be dismissed:</p>
    <ul>
        <li>"Mark as checked and OK" hides the alert for all editors.</li>
        <li>"Ignore this manual check" leaves the tip visible to other editors.</li>
    </ul>
    <p>Dismissed alerts can be found via the "Show hidden alerts" toggle.</p>
    <p>If an incorrect alert is appearing on many pages, site administrators can tell the checker to ignore particular elements and page regions.</p>
    <p>And remember that automated checkers cannot replace <a href='https://webaim.org/resources/evalquickref/'> proofreading and testing for accessibility</a>.</p>
    <p><br><a href='https://github.com/itmaybejj/editoria11y/issues' class='ed11y-small'>Report bugs & request changes <span aria-hidden="true">&raquo;</span></a></p>
    `,

  		NEW_WINDOW_PHRASES: ['external', 'download', 'new tab', 'new window', 'pop-up', 'pop up', 'opens new tab', 'opens new window'],


  		// Tooltips for heading tests =========================

  //    headingExample : `<ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>`,

    },
  	testNames: {
  		ALT_FILE_EXT_TEST_NAME: 'Image\'s text alternative is a URL',
  		ALT_MAYBE_BAD_TEST_NAME: 'Manual check: alt text may be meaningless',
  		ALT_PLACEHOLDER_TEST_NAME: 	'Alt text is meaningless',
  		ALT_UNPRONOUNCEABLE_TEST_NAME: 'Image\'s text alternative is unpronounceable',
  		EMBED_AUDIO_TEST_NAME:	'Manual check: is an accurate transcript provided?',
  		EMBED_CUSTOM_TEST_NAME: 'Manual check: is this embedded content accessible?',
  		EMBED_DATA_VIZ_TEST_NAME: 'Manual check: is this visualization accessible?',
  		EMBED_VIDEO_TEST_NAME: 'Manual check: is this video accurately captioned?',
  		HEADING_EMPTY_TEST_NAME: 'Heading tag without any text',
  		HEADING_LONG_TEST_NAME: 'Manual check: long heading',
  		HEADING_SKIPPED_LEVEL_TEST_NAME: 'Manual check: was a heading level skipped?',
  		IMAGE_ALT_TOO_LONG_TEST_NAME: 'Manual check: very long alternative text',
  		IMAGE_DECORATIVE_TEST_NAME: 'Manual check: image has no alt text',
  		LINK_ALT_FILE_EXT_TEST_NAME:	'Linked image\'s text alternative is a URL',
  		LINK_ALT_MAYBE_BAD_TEST_NAME: 'Manual check: linked alt text may be meaningless',
  		LINK_EMPTY_NO_LABEL_TEST_NAME: 'Link with no accessible label',
  		LINK_EMPTY_TEST_NAME: 'Link with no accessible text',
  		LINK_IMAGE_ALT_AND_TEXT_TEST_NAME: 'Manual check: link contains both text and an image', // 2.3.10.
  		LINK_IMAGE_LONG_ALT_TEST_NAME: 'Manual check: very long alternative text in linked image',
  		LINK_IMAGE_NO_ALT_TEXT_TEST_NAME: 'Linked Image has no alt text',
  		LINK_NEW_TAB_TEST_NAME: 'Manual check: is opening a new window expected?',
  		LINK_PLACEHOLDER_ALT_TEST_NAME: 'Linked alt text is meaningless',
  		LINK_STOPWORD_TEST_NAME: 'Manual check: is this link meaningful and concise?',
  		LINK_SUS_ALT_TEST_NAME: 'Manual check: possibly redundant text in linked image',
  		LINK_URL_TEST_NAME: 'Manual check: is this link text a URL?',
  		MISSING_ALT_LINK_HAS_TEXT_TEST_NAME: 'Image in link with text has no alternative text attribute',
  		MISSING_ALT_LINK_TEST_NAME: 'Linked image has no alternative text attribute',
  		MISSING_ALT_TEST_NAME: 'Image has no alternative text attribute',
  		QA_BLOCKQUOTE_TEST_NAME : 'Manual check: is this a blockquote?',
  		QA_FAKE_HEADING_TEST_NAME: 'Manual check: should this be a heading?',
  		QA_FAKE_LIST_TEST_NAME: 'Manual check: should this have list formatting?',
  		QA_PDF_TEST_NAME: 'Manual check: is the linked document accessible?',
  		QA_UPPERCASE_TEST_NAME: 'Manual check: is this uppercase text needed?',
  		SUS_ALT_TEST_NAME: 'Manual check: possibly redundant text in alt',
  		TABLES_EMPTY_HEADING_TEST_NAME: 'Empty table header cell',
  		TABLES_MISSING_HEADINGS_TEST_NAME: 'Table has no header cells',
  		TABLES_SEMANTIC_HEADING_TEST_NAME: 'Content heading inside a table',

  		// New
  		HEADING_EMPTY_WITH_IMAGE_TEST_NAME: 'Heading has no text, but contains an image',
  		HEADING_FIRST_TEST_NAME: 'The first heading on a page should usually be a Heading 1 or Heading 2',
  		HEADING_MISSING_ONE_TEST_NAME: 'Missing Heading 1',
  		IMAGE_DECORATIVE_CAROUSEL_TEST_NAME: 'Image in a carousel or gallery marked as decorative',
  		LINK_IMAGE_TEXT_TEST_NAME: 'Manual check: Image is marked as decorative, although the link is using the surrounding text as a descriptive label.',
  		IMAGE_FIGURE_DECORATIVE_TEST_NAME: 'Manual check: image in a figure marked as decorative',
  		LINK_IMAGE_ALT_TEST_NAME: 'Manual check: linked image link contains alt text',
  		IMAGE_FIGURE_DUPLICATE_ALT_TEST_NAME: 'Alt is the same as caption text',
  		LINK_ALT_UNPRONOUNCEABLE_TEST_NAME: 'Alt text in linked image is unpronounceable.',
  		DUPLICATE_TITLE_TEST_NAME: 'Duplicate title attribute',
  		LINK_EMPTY_LABELLEDBY_TEST_NAME: 'Link invalid aria-labelledby attribute',
  		LINK_STOPWORD_ARIA_TEST_NAME: 'Manual check: link text overridden by ARIA that may not be meaningful',
  		LINK_SYMBOLS_TEST_NAME: 'Manual check: are the symbols or emoji in this link meaningful?',
  		LINK_CLICK_HERE_TEST_NAME: 'Manual check: link contains "click here"',
  		LINK_DOI_TEST_NAME: 'APA Style guide recommends using descriptive DOI links',
  		LINK_IDENTICAL_NAME_TEST_NAME: 'Manual check: link has identical text as another link but points to a different page',
  		LINK_FILE_EXT_TEST_NAME: 'Link points to a file without warning',
  		EMBED_UNFOCUSABLE_TEST_NAME: 'Frame with tabindex="-1" will not be keyboard accessible.',
  		EMBED_MISSING_TITLE_TEST_NAME: 'Frame missing title attribute',
  		EMBED_GENERAL_TEST_NAME: 'Manual check: iframe content',
  		QA_BAD_LINK_TEST_NAME: 'Manual check: link target may be invalid',
  		QA_STRONG_ITALICS_TEST_NAME: 'Manual check: entire paragraph is emphasized',
  		QA_IN_PAGE_LINK_TEST_NAME: 'Broken same-page link',
  		QA_DOCUMENT_TEST_NAME: 'Manual check: linked document',
  		QA_UNDERLINE_TEST_NAME: 'Underlined text',
  		QA_SUBSCRIPT_TEST_NAME: 'Manual check: use of subscript or superscript as visual formatting',
  		QA_NESTED_COMPONENTS_TEST_NAME: 'Nested interactive layout components',
  		QA_JUSTIFY_TEST_NAME: 'Justified text',
  		QA_SMALL_TEXT_TEST_NAME: 'Small text',
  		META_LANG_TEST_NAME: 'Meta tag for page language missing',
  		META_SCALABLE_TEST_NAME: 'Meta tag prevents user scaling',
  		META_MAX_TEST_NAME: 'Meta tag sets max user scaling',
  		META_REFRESH_TEST_NAME: 'Meta tag automatically refreshes page',
  		DUPLICATE_ID_TEST_NAME: 'Manual check: duplicate ID',
  		META_TITLE_TEST_NAME: 'Meta tag for page title missing',
  		UNCONTAINED_LI_TEST_NAME: 'Invalid HTML list',
  		TABINDEX_ATTR_TEST_NAME: 'Provided tabindex value removes element from reading order',
  		HIDDEN_FOCUSABLE_TEST_NAME: 'Screen readers told not to speak the name of an interactive element',
  		LABEL_IN_NAME_TEST_NAME: 'Visible name different than machine-readable name',
  		BTN_EMPTY_TEST_NAME: 'Button purpose is not machine-readable',
  		BTN_EMPTY_LABELLEDBY_TEST_NAME: 'Button has an invalid ARIA label',
  		BTN_ROLE_IN_NAME_TEST_NAME: 'Button name repeats the word "button"',
  		CONTRAST_WARNING_TEST_NAME: 'Manual check: does this text have enough contrast?',
  		CONTRAST_INPUT_TEST_NAME: 'Input does not provide enough contrast to be easily legible',
  		CONTRAST_ERROR_TEST_NAME: 'Text does not have enough contrast to be easily legible',
  		CONTRAST_PLACEHOLDER_TEST_NAME: 'Placeholder text does not have enough contrast to be easily legible',
  		CONTRAST_PLACEHOLDER_UNSUPPORTED_TEST_NAME: 'Manual check: does this placeholder text have enough contrast?',
  		CONTRAST_ERROR_GRAPHIC_TEST_NAME: 'Graphic or icon does not have enough contrast with the background',
  		CONTRAST_WARNING_GRAPHIC_TEST_NAME: 'Manual check: does this graphic or icon have enough contrast?',
  	},
  	tests: {
  		// todo: update Drupal localization file.
  		HEADING_SKIPPED_LEVEL: `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            <p>This heading skipped from level %(prevLevel) to level %(level). From a screen reader, this sounds like content is missing.</p>
            <p><strong>To fix:</strong> adjust levels to form an accurate outline, without gaps.</p>
            `,

  		HEADING_EMPTY: `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            <p>Empty headings create confusing gaps in this outline: they could mean the following content is still part of the previous section, or that the text was unpronounceable for some reason.</p>
            <p><strong>To fix:</strong> add text to this heading, or delete this empty line.</p>
            `,

  		HEADING_LONG: `<p>Headings should be brief and clear. Assistive devices use them as a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for the page. The numbers indicate indents in a nesting relationship:</p>  
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            <p><strong>To fix:</strong> shorten this heading if possible, or remove the heading style if it was only applied to this text to provide visual emphasis.</p>
            `,

  		QA_BLOCKQUOTE: '<p>Blockquote formatting tells screen readers that the text should be announced as a quotation. This was flagged because short blockquotes are <em>sometimes</em> actually <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">headings</a>. If this is a heading and not a quotation, use heading formatting instead, so this appears in the page outline.</p>',

  		// Tooltips for image tests =========================

  		MISSING_ALT: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.</p>
            <p><strong>To fix:</strong> either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>
            <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

  		MISSING_ALT_LINK_HAS_TEXT: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.</p>
		<p>This image is part of a link with text. If the visible text is sufficient to describe the link, add an empty alt (alt="") to tell screen readers to ignore this image. Otherwise, provide the title of the linked page as the alt text.</p>`,

  		MISSING_ALT_LINK: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time. This is especially a problem for linked images.</p>
            <p><strong>To fix:</strong> either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>
            `,

  		IMAGE_DECORATIVE: `<p>Unless this image is purely decorative (a spacer icon or background texture), an alt should probably be provided. Photos in page content <strong>almost always need alt text.</strong> Since many screen reader users can see there is an image present, it can be very confusing to move the cursor across the place on the page where an image is visible, but hear nothing.</p>
        <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

  		ALT_FILE_EXT: `This image's alt text is "%(alt)," which probably describes the file name, not the contents of the image.
        <p><strong>To fix:</strong> set this image's alternative text to a concise description of what this image means in this context.</p>
        <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`
  		,

  		ALT_PLACEHOLDER: `<p>This image's alt text is "%(alt)," which was flagged for being common placeholder text.</p>
        <p><strong>To fix:</strong> set this image's alternative text to a concise description of what this image means in this context.</p>
        <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`
  		,

  		// Machine generated string.
  		ALT_MAYBE_BAD: `<p>This image's alt text is "%(alt)," which was flagged as containing a suspicious number of characters that may not form words.</p>
        <p><strong>To fix:</strong> if this is placeholder text, set this image's alternative text to a concise description of what this image means in this context.</p>
        <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`
  		,

  		LINK_ALT_MAYBE_BAD: `<p>When a link includes an image, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="opens in new tab">the image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination, even out of context.</p>
           <p>This image's alt text is "%(alt)," which may not describe this link.</p>`
  		,

  		LINK_PLACEHOLDER_ALT: `<p>When a link includes an image, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="opens in new tab">the image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination, even out of context.</p>
           <p>This image's alt text is "%(alt)," which probably does not describe this link.</p>`
  		,

  		LINK_ALT_FILE_EXT: `<p>This image's alt text is "%(alt)," which is probably a filename.</p>
        <p>When a link is wrapped around an image and there is no other text, the <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination; a URL (usually pronounced by the screen reader one letter at a time) does not.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "H T T P S colon forward slash forward slash example dot com forward slash aye bee oh you tee you ess"</li>
            </ul>`, // @todo after merge: compare with Sa11y's wording.

  		SUS_ALT: `<p>This image's alt text is "%(alt)," which mentions that this image is an image.</p>
        <p>Screen readers announce they are describing an image when reading alt text, so 
            phrases like "image of" and "photo of" are usually redundant in alt text; the screen reader user hears "image: image of something."</p>
            <p>Note that this is OK if the format is referring to the <strong>content</strong> of the image:</p>
            <ul><li>Format is redundant: "<em>photo of</em> a VHS tape"</li>
            <li>Format is relevant: "<em>photo of</em> a VHS tape in a photo album being discussed in a history class"</li></ul>`,

  		LINK_SUS_ALT: `<p>This image's alt text is "%(alt)," which mentions that this image is an image.</p>
        <hr><p>Links should clearly and concisely describe their destination. Since words like "image," "graphic" or "photo" are already redundant in text alternatives (screen readers already identify the image as an image), their presence in a linked image usually means the image's text alternative is <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">describing the image instead of the link</a>.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "Image of five people jumping"</li>
            </ul>`,

  		ALT_UNPRONOUNCEABLE: `<p>This image's alt text is "%(alt)," which only contains unpronounceable symbols and/or spaces. Screen readers will announce that an image is present, and then pause awkwardly: "image: ____."</p>
        <p><strong>To fix:</strong> add a descriptive alt, or provide a <em>completely</em> empty alt (alt="") if this is just an icon or spacer, and screen readers should ignore it.</p>
            <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

  		LINK_IMAGE_NO_ALT_TEXT: `<p>When a link is wrapped around an image, the image's alt text <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">provides the link's title for screen readers</a>.</p>
        <p><strong>To fix:</strong> set this image's alternative text to something that describes the link's destination, or add text next to the image, within the link.</p>`,

  		IMAGE_ALT_TOO_LONG: `<p>Image text alternatives are announced by screen readers as a single run-on sentence; listeners must listen to the entire alt a second time if they miss something. If this cannot be reworded to something succinct, it is better to use the alt to reference a <em>visible</em> <a href="https://www.w3.org/WAI/tutorials/images/complex/">text alternative for complex images</a>. For example:</p>
            <ul><li>"Event poster; details follow in caption"</li>
            <li>"Chart showing our issues going to zero; details follow in table"</li></ul>
            This image's alt text is: <em>%(alt)</em>
            `,

  		LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">The alt text on a linked image is used to describe the link destination</a>. Links should be brief, clear and concise, as screen reader users often listen to the list of links on the page to find content of interest. Long alternative text inside a link often indicates that the image's text alternative is describing the image instead rather than the link.</p>
        This image's alt text is: <em>%(alt)</em>`,

  		LINK_IMAGE_ALT_AND_TEXT: `<p>Screen readers will <a href="https://www.w3.org/WAI/tutorials/images/functional/">include the image's alt text when describing this link</a>.</p>
            <p>Check that the combined text is concise and meaningful:<br>"<em><strong>%(alt)</strong></em>"</p>
            <p></p>
            <ul>
                <li>Keep alts that add relevant meaning:<br>"Buy (A Tigers v. Falcons ticket)."</li>
                <li>Edit unhelpful or irrelevant alts:<br>"Buy (A piece of paper with team logos on it)."</li>
                <li>Remove unnecessary alts:<br>"Buy Tigers v. Falcons tickets (A Tigers v. Falcons ticket)."</li>
            </ul>
        `,

  		LINK_EMPTY:
  			`<p>This link is either a typo (a linked space character), or a linked image with no text alternative.</p>
        <p>Screen readers will either say nothing when they reach this link: <br><em>"Link, [...awkward pause where the link title should be...],"</em><br>or read the URL: <br><em>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</em></p>
        <p><strong>To fix:</strong></p>
        <ul><li>If this a typo, delete it. Note that typo links can be hard to see if they are next to a "real" link: one will be on the text, one on a space.</li><li>If it is a real link, add text to describe where it goes.</li>`,

  		LINK_EMPTY_NO_LABEL:
  			`<p>This link is either a typo (a linked space character), or a linked image with no text alternative.</p>
        <p>Screen readers will either say nothing when they reach this link: <br><em>"Link, [...awkward pause where the link title should be...],"</em><br>or read the URL: <br><em>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</em></p>
        <p><strong>To fix:</strong></p>
        <ul><li>If this a typo, delete it. Note that typo links can be hard to see if they are next to a "real" link: one will be on the text, one on a space.</li><li>If it is a real link, add text to describe where it goes.</li>`,

  		LINK_URL: `<p>This link's text is:<br> <strong>%(text)</strong></p>
        <p><a href="https://webaim.org/techniques/hypertext/link_text">Links should be meaningful and concise</a>. Readers often skim by link titles. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
         <p>A linked URL breaks this pattern; the reader has to read the preceding paragraph to figure out the link's purpose from context.</p>
            <ul>
                <li>Meaningful and concise link: "Tips for writing meaningful links"</li>
                <li>Linked URL, as pronounced by a screen reader: "H T T P S colon forward-slash forward-slash example dot com forward-slash tips forward-slash meaningful-links"</li>
            </ul>`,

  		LINK_STOPWORD: `<p>This link's text is: <strong>%(text)</strong></p>
        <p>Readers skim for links. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
                <p>Generic links like "click here," "read more" or "download" expect the reader be reading slowly and carefully enough to figure out each link's purpose from context. Few readers do this, so click-through rates on meaningless links are extremely poor.</p>
                <ul>
                <li>Ideal: "Learn about <a href="https://webaim.org/techniques/hypertext/link_text">meaningful links"</a></strong></li>
                <li>Not meaningful: "Click <a href="https://webaim.org/techniques/hypertext/link_text">here</a> to learn about meaningful links."</li>
                <li>Not concise: "<a href="https://webaim.org/techniques/hypertext/link_text">Click here to learn more about meaningful links</a>"</li>
                </ul>
                `,

  		QA_PDF: `<p>Many mobile and assistive device users struggle to read content in PDFs. PDFs generally do not allow for changing font sizes, and often contain features that are incompatible with screen readers.</p>
        <p>Ideally make the content of this linked PDF available on a Web page or in an editable document, and only link to this PDF as a "printable" alternative. If this PDF is the only way you are providing to access this content, you will need to <a href='https://webaim.org/techniques/acrobat/' target='_blank'>manually check that the PDF is well-structured</a>, with headings, lists and table headers, and provides alt text for its images.</p>`,

  		LINK_NEW_TAB: `<p>Readers can always choose to open a link a new window. When a link forces open a new window, it can be confusing and annoying, especially for assistive device users who may wonder why their browser's "back" button is suddenly disabled.</p>
                <p>There are two general exceptions:</p>
                <ul>
                    <li>When the user is filling out a form, and opening a link in the same window would cause them to lose their work.</li>
                    <li>When the user is clearly warned a link will open a new window.</li>
                </ul>
                <p><strong>To fix:</strong> set this link back its default target, or add a screen-reader accessible warning (text or an icon with alt text).</p>
                `,

  		// Tooltips for Text QA ===============================

  		TABLES_MISSING_HEADINGS: `
                <p>To fix:</p>
                <ul><li>If this table contains data that is meaningfully organized by row and column, edit the table's properties and specify whether headers have been placed in the first row, column or both. This lets screen reader users hear the headers repeated while navigating the content.</li>
                <li>If this table does not contain rows and columns of data, but is instead being used for visual layout, remove it. Tables overflow the page rather than reflowing on mobile devices, and should only be used when the horizontal relationships are necessary to understand the content.</li></ul>
            `,

  		TABLES_SEMANTIC_HEADING: `<p>To fix: remove heading formatting. Use row and column headers instead.</p>
        <p>Content headings ("Heading 1", "Heading 2") form a navigable table of contents for screen reader users,  
        labelling all content <strong>until the next heading</strong>. Table headers label specific columns or rows within a table.</p> 
            <p></p>
            <table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">To illustrate: a <strong>table</strong> header in cell 2 would only label its column: cell B. <br><br>
            A <strong>content</strong> heading in cell 2 would label all subsequent text, reading from left to right: cells 3, A, B and C, as well as this text!</td></tr>
            <tr><td>A</td><td>B</td><td>C</td></table>
            `,

  		TABLES_EMPTY_HEADING: `
                <p>When exploring tables, screen readers repeat table header cells as needed to orient users. 
                Without headers, it is very easy to get lost; screen reader users have to count columns and rows and try to remember which columns went with which rows.</p>
                <p><strong>To fix:</strong> make sure each header cell in this table contains text.</p>
            `,

  		QA_FAKE_LIST: `<p>List formatting is structural:</p> 
            <ol><li>List formatting indents and reflows on overflow. Text aligns vertically with the line above it.</li>
            <li>Lists are machine-readable. Screen readers can orient their users, announcing this as "list item, 2 of 3."</li></ol>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;3. But this third item is just a sentence with a number in front of it. It wraps incorrectly, and screen readers do not know it is related to the other items in the list.</p>
            <p><strong>To fix:</strong> if this "%(text)" is part of a list, replace it with list formatting.</p>
            `,

  		QA_FAKE_HEADING: `<p>If this all-bold line of text is functioning as a heading for the following text rather than a visual emphasis, replace the bold formatting with the appropriately numbered heading. Otherwise, dismiss this alert.</p>
        <p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for assistive devices. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            `,

  		QA_UPPERCASE: `<p>UPPERCASE TEXT CAN BE MORE DIFFICULT TO READ FOR MANY PEOPLE, AND IS OFTEN INTERPRETED AS SHOUTING.</p>
         <p>Consider using sentence case instead, and using bold text or font changes for visual emphasis, or structural formatting like headings for emphasis that will also be announced by screen readers.</p>`,

  		EMBED_VIDEO: `<p>If a recorded video contains speech or meaningful sounds, it must <a href="https://www.w3.org/WAI/media/av/captions/" title="Opens in new window">provide captions</a>.</p>
            <p>Note that automatic, machine-generated captions must be proofread, and speaker identifications must be added, before being considered an equal alternative.</p>`,

  		EMBED_AUDIO: `<p>If this audio contains speech, a <a href="https://www.w3.org/WAI/media/av/transcribing/" title="Opens in new window">text alternative</a> must be provided on this page or linked.</p>
            <p>Note that automatic, machine-generated transcripts must be proofread, and speaker identifications must be added, before being considered an equal alternative</p>`,

  		EMBED_DATA_VIZ: `<p>Visualization widgets are often difficult or impossible for assistive devices to operate, and can be difficult to understand for readers with low vision or colorblindness.</p>
							<p>Unless this particular widget has high visual contrast, can be operated by a keyboard and described by a screen reader, assume that an alternate format (text description, data table or downloadable spreadsheet) should also be provided.</p>`,

  			EMBED_CUSTOM: '<p>This checker cannot test inside embedded content. Check to sure images inside this embed have alt text, videos have captions, and interactive components can be <a href=\'https://webaim.org/techniques/keyboard/\'>operated by a keyboard</a>.</p>',
  		}
  };

  class Ed11yElementAlt extends HTMLElement {
    /* global Ed11y */

    constructor() {
      super();
    }

    connectedCallback() {
      if (!this.initialized) {
        const shadow = this.attachShadow({mode: 'open'});
        let altTextWrapper = document.createElement('div');
        altTextWrapper.classList.add('ed11y-wrapper','ed11y-alt-wrapper');
        let img = UI.imageAlts[this.dataset.ed11yImg];
        let altSpan = document.createElement('span');
  			if (img.altText !== '') {
  				altSpan.textContent = img.altText;
  			} else {
  				altSpan.classList.add('ed11y-decorative');
  				altSpan.textContent = Lang._('DECORATIVE');
  			}
        altSpan.classList.add(`ed11y-${img.type}`);
        altTextWrapper.appendChild(altSpan);
        UI.attachCSS(altTextWrapper);
        shadow.appendChild(altTextWrapper);
        this.initialized = true;
      }
    }

  }

  class Ed11yElementResult extends HTMLElement {
    /* global Ed11y */
    constructor() {
      super();
    }

    connectedCallback() {
      if (!this.initialized) {
        this.open = false;
        this.racing = false;
        this.style.setProperty('outline', '0px solid transparent');

        this.initialized = true;
      }
    }

    handleHover(event) {
      event.preventDefault();
      let host = this.getRootNode().host;
      if (!this.classList.contains('intersecting') && host.open !== true && host.racing === false) {
        this.open = true;
        host.racing = true;
        host.toggleTip(true);
        State.toggledFrom = this;
        window.setTimeout(function () {
          host.racing = false;
        }, 250, host);
      }
    }

    handleFocus() {
      let host = this.getRootNode().host;
      if (this.getRootNode().host.classList.contains('ed11y-offscreen')) {
        host.result.element.scrollIntoView();
        alignButtons();
      }
    }

    toggleClick(event) {
      event.preventDefault();
      let host = this.getRootNode().host;
      // Todo: fast rechecks and double clicks not being correctly intercepted.
      if (host.racing === false) {
        host.racing = true;
        State.toggledFrom = this;
        let stateChange = host.getAttribute('data-ed11y-open') === 'false' ? 'open' : 'close';
        host.setAttribute('data-ed11y-action', stateChange);
        if (stateChange === 'open') {
          window.setTimeout(function () {
            let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
            activeTip?.shadowRoot.querySelector('.title').focus();
          }, 500);
        }
        window.setTimeout(function () {
          host.racing = false;
        }, 250, host);
      }

    }

    closeOtherTips() {
      if (State.tipOpen) {
        State.openTip.button.setAttribute('data-ed11y-action', 'close');
      }
    }

    buildTip() {
      this.tipNeedsBuild = false;

      let tip = document.createElement('ed11y-element-tip');
      tip.result = this.result;
      tip.setAttribute('data-ed11y-result', this.resultID);
      tip.classList.add('ed11y-element');
      tip.style.setProperty('opacity', '0');
      State.panelAttachTo.insertAdjacentElement('beforeend', tip);
      this.tip = tip;
    }

    toggleTip(changeTo) {
      if (this.tipNeedsBuild) {
        this.buildTip();
      }
      this.toggle.setAttribute('aria-expanded', changeTo);
      let highlightOutline = this.dismissable ? 'ed11y-ring-yellow' : 'ed11y-ring-red';
      if (State.inlineAlerts) {
        resetClass([
          'ed11y-hidden-highlight',
          'ed11y-ring-red',
          'ed11y-ring-yellow',
          'ed11y-warning-block',
          'ed11y-error-block',
          'ed11y-warning-inline',
          'ed11y-error-inline',
        ]);
      } else {
        editableHighlighter(this.resultID, changeTo);
      }
      if (changeTo === true) {
        this.tip.style.setProperty('opacity', '0');
        // Allow for themes to reveal hidden tips
        document.dispatchEvent(new CustomEvent('ed11yPop', {
          detail: {
            id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result'),
            result: this.result,
            tip: this.tip
          }
        }));
        this.closeOtherTips();
        this.tip.setAttribute('data-ed11y-action', 'open');
        if (State.inlineAlerts) {
          this.result.element.classList.add(highlightOutline);
        }
        requestAnimationFrame(()=>alignTip(this.toggle, this.tip, 4, true));
        if (State.jumpList.length === 0) { // todo is it still possible to have a tip and no jumpList?
          buildJumpList();
        }
        State.lastOpenTip = Number(this.getAttribute('data-ed11y-jump-position'));
  			State.tipOpen = true;
        State.openTip = {
          button: this,
          tip: this.tip,
        };
        this.result.highlight?.style.setProperty('opacity', '1');
      } else {
        // Allow for themes to restore original DOM/CSS
        document.dispatchEvent(new CustomEvent('ed11yShut', {
          detail: { id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result') }
        }));
        this.tip.setAttribute('data-ed11y-action', 'shut');
        this.result.highlight?.style.setProperty('opacity', '0');
  			State.tipOpen = false;
        State.openTip = {
          button: false,
          tip: false,
        };
      }
      this.setAttribute('data-ed11y-open', changeTo);
      this.open = changeTo;
    }


    static get observedAttributes() { return ['data-ed11y-action']; }

    attributeChangedCallback(attr, oldValue, newValue) {
      if (this.initialized) {
        switch (attr) {
        case 'data-ed11y-action':
          if (newValue !== 'false') {
            let changeTo = newValue === 'open';
            this.setAttribute('data-ed11y-action', 'false');
            this.toggleTip(changeTo);
          }
          break;
        }
      }
    }
  }

  class Ed11yElementPanel extends HTMLElement {

    constructor() {
      super();
    }

    template() {
      return `
    <div class='ed11y-buttonbar'>
      <button id='ed11y-show-hidden' data-ed11y-pressed='false' hidden>
        <svg aria-hidden="true" class="shown" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="9 0 640 512"><path fill="Currentcolor" d="M288 32c-81 0-146 37-193 81C49 156 17 208 3 244c-3 8-3 17 0 25C17 304 49 356 95 399C142.5 443 207 480 288 480s146-37 193-81c47-44 78-95 93-131c3-8 3-17 0-25c-15-36-46-88-93-131C434 69 369 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35-29 64-64 64c-7 0-14-1-20-3c-6-2-12 2-12 7c.3 7 1 14 3 21c14 51 66 82 118 68s82-66 68-118c-11-42-48-69-89-71c-6-.2-9 6-7 12c2 6 3 13 3 20z"/></svg>
        <svg aria-hidden="true" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="39 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>
        <span class="ed11y-sr-only"></span>
      </button>
      <button id='ed11y-visualize' data-ed11y-pressed="false" class='ed11y-panel-fa'>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 10 512 512"><path fill="Currentcolor" d="M152 38c10 9 11 24 2 34l-72 80c-4 5-11 8-17 8s-13-2-18-7L7 113C-2 104-2 88 7 79s25-9 34 0l22 22 55-61c9-10 24-11 34-2zm0 160c10 9 11 24 2 34l-72 80c-4 5-11 8-17 8s-13-2-18-7L7 273c-9-9-9-25 0-34s25-9 35 0l22 22 55-61c9-10 24-11 34-2zM224 96c0-18 14-32 32-32l224 0c18 0 32 14 32 32s-14 32-32 32l-224 0c-18 0-32-14-32-32zm0 160c0-18 14-32 32-32l224 0c18 0 32 14 32 32s-14 32-32 32l-224 0c-18 0-32-14-32-32zM160 416c0-18 14-32 32-32l288 0c18 0 32 14 32 32s-14 32-32 32l-288 0c-18 0-32-14-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
        <span class="ed11y-sr-only"></span>
      </button>
      <div id='ed11y-visualizers' class="content" hidden>
          <details id="ed11y-headings-tab">
              <summary>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M0 96C0 78 14 64 32 64l384 0c18 0 32 14 32 32s-14 32-32 32L32 128C14 128 0 114 0 96zM64 256c0-18 14-32 32-32l384 0c18 0 32 14 32 32s-14 32-32 32L96 288c-18 0-32-14-32-32zM448 416c0 18-14 32-32 32L32 448c-18 0-32-14-32-32s14-32 32-32l384 0c18 0 32 14 32 32z"></path></svg> <span class="summary-title"></span>
              </summary>
              <div class="details">
                  <span class="details-title"></span>
                  <ul id='ed11y-outline'></ul>
              </div>
          </details>
          <details id="ed11y-alts-tab">
            <summary>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 576 512"><path fill="currentColor" d="M160 80l352 0c9 0 16 7 16 16l0 224c0 8.8-7.2 16-16 16l-21 0L388 179c-4-7-12-11-20-11s-16 4-20 11l-52 80-12-17c-5-6-12-10-19-10s-15 4-19 10L176 336 160 336c-9 0-16-7-16-16l0-224c0-9 7-16 16-16zM96 96l0 224c0 35 29 64 64 64l352 0c35 0 64-29 64-64l0-224c0-35-29-64-64-64L160 32c-35 0-64 29-64 64zM48 120c0-13-11-24-24-24S0 107 0 120L0 344c0 75 61 136 136 136l320 0c13 0 24-11 24-24s-11-24-24-24l-320 0c-49 0-88-39-88-88l0-224zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg> <span class="summary-title"></span>
            </summary>
            <div class="details">
                <span class="details-title"></span>
                <ul id='ed11y-alt-list'></ul>
            </div>
        </details>
        </div>
      <button type='button' id='ed11y-toggle'><span class="ed11y-sr-only"></span><span class="ed11y-toggle-circle"><span class='icon'><svg class="errors-icon" xmlns="http://www.w3.org/2000/svg" width="10" aria-hidden="true" viewBox="0 0 448 512"><path fill="currentColor" d="M64 32C64 14 50 0 32 0S0 14 0 32L0 64 0 368 0 480c0 18 14 32 32 32s32-14 32-32l0-128 64-16c41-10 85-5 123 13c44.2 22 96 25 142 7l35-13c13-5 21-17 21-30l0-248c0-23-24-38-45-28l-10 5c-46 23-101 23-147 0c-35-18-75-22-114-13L64 48l0-16z"></path></svg><svg class="pass-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="-.75 -3.5 10.1699 19.1777"><path fill="currentColor" d="M3.7031,10.5527c-.3633-.6562-.6426-1.1387-.8379-1.4473l-.3105-.4863-.2344-.3574c-.5117-.7969-1.0449-1.4551-1.5996-1.9746.3164-.2617.6113-.3926.8848-.3926.3359,0,.6348.123.8965.3691s.5918.7148.9902,1.4062c.4531-1.4727,1.0293-2.8691,1.7285-4.1895.3867-.7188.7314-1.2021,1.0342-1.4502s.7041-.3721,1.2041-.3721c.2656,0,.5938.041.9844.123-1.0039.8086-1.8066,1.7695-2.4082,2.8828s-1.3789,3.0762-2.332,5.8887Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="close-icon" viewBox="0 0 384 512"><path fill="currentColor" d="M343 151c13-13 13-33 0-46s-33-13-45 0L192 211 87 105c-13-13-33-13-45 0s-13 33 0 45L147 256 41 361c-13 13-13 33 0 45s33 13 45 0L192 301 297 407c13 13 33 13 45 0s13-33 0-45L237 256 343 151z"></path></svg></span></span></button>
      <button class='ed11y-jump next' data-ed11y-goto='0' aria-haspopup="dialog"><svg class="hover-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" viewBox="0 -15 90 120"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m30 00 50 50-50 50" stroke-width="18"></path></svg><span class='toggle-count'></span><span class='jump-next ed11y-sr-only'></span></button>
     </div>
    </div>
    <div id="ed11y-message" aria-live="polite"></div>
    `;
    }

    connectedCallback() {
      if (!this.initialized) {

        this.style.setProperty('outline', '0');
        this.classList.add('ed11y-element');
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('aside');
  			wrapper.style.setProperty('opacity', '0');
        wrapper.setAttribute('id', 'ed11y-panel');
        wrapper.classList.add('ed11y-wrapper', 'ed11y-panel-wrapper', 'ed11y-pass', 'ed11y-preload');
        wrapper.innerHTML = this.template();
        shadow.appendChild(wrapper);
        const panelTabs = wrapper.querySelectorAll('.ed11y-buttonbar button');
        panelTabs.forEach(tab => {
          // todo: may not be needed for details elements.
          tab.addEventListener('click', this.handleBarClick);
        });
        const altDetails = wrapper.querySelector('#ed11y-alts-tab');
        const headingDetails = wrapper.querySelector('#ed11y-headings-tab');
  			wrapper.querySelector('#ed11y-readability-tab'); // todo swappy?
        altDetails.addEventListener('toggle', () => {
          if (altDetails.open && headingDetails.open) {
            headingDetails.removeAttribute('open');
          }
        });
        headingDetails.addEventListener('toggle', () => {
          if (altDetails.open && headingDetails.open) {
            altDetails.removeAttribute('open');
          }
        });
        this.initialized = true;
      }
    }

    handleBarClick(event) {
      event.preventDefault();
      UI.message.textContent = '';
      let id = event.currentTarget.getAttribute('id');
      switch (id) {
      case 'ed11y-toggle':
        togglePanel();
        break;
      case 'ed11y-show-hidden':
        toggleShowDismissals();
        break;
      case 'ed11y-visualize':
        if (!State.showPanel) {
          togglePanel();
        }
        visualize();
        break;
      }
    }
  }

  class Ed11yElementHeadingLabel extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      if (!this.initialized) {
        const shadow = this.attachShadow({mode: 'open'});
        let wrapper = document.createElement('div');
        wrapper.classList.add('ed11y-wrapper', 'ed11y-heading-wrapper');
        let i = this.dataset.ed11yHeadingOutline;
        let result = State.headingOutline[i];
        wrapper.innerHTML = 'H' + result.headingLevel;
        let fontSize = Math.max(52 - 8 * result.headingLevel, 12);
        wrapper.style.setProperty('font-size', fontSize + 'px');
        shadow.appendChild(wrapper);
        this.initialized = true;
      }
    }
  }

  class Ed11yElementTip extends HTMLElement {
    /* global Ed11y */
    constructor() {
      super();
    }

    connectedCallback() {
      if (!this.initialized && this.result) {
        this.renderOnce();
      }
    }
    renderOnce() {
      this.initialized = true;
      this.open = true;
      this.style.setProperty('opacity', '0');
      this.style.setProperty('outline', '0px solid transparent');
      const shadow = this.attachShadow({mode: 'open'});
  		this.issueIndex = Number.parseInt(this.result.toggle.dataset.ed11yJumpPosition);
  		this.issueNext = this.issueIndex < State.jumpList.length ?
  			this.issueIndex + 2 : 0;
  		this.issuePrev = this.issueIndex > 0 ? this.issueIndex : State.jumpList.length;

      this.wrapper = document.createElement('div');
      this.wrapper.setAttribute('role', 'dialog');
  		this.wrapper.dataset.ed11yTest = this.result.test;

      this.dismissable = this.result.type !== 'error';
      this.dismissed = !!this.result.dismissalStatus;
      this.wrapper.classList.add('ed11y-tip-wrapper', 'ed11y-wrapper');
  		this.wrapper.style.setProperty('opacity', '0');
      this.wrapper.setAttribute('aria-label',
        `${Lang._('ALERT_TEXT')}
        ${this.issueIndex + 1}`);

      this.addEventListener('mouseover', this.handleHover, {
  			passive: true,
  		});

      UI.attachCSS(this.wrapper);

      this.tip = document.createElement('div');
      this.tip.classList.add('tip');

      let content = document.createElement('div');
      content.classList.add('content');
  		const tipAlert = document.createElement('div');
  		tipAlert.classList.add('ed11y-tip-alert');
  		if (this.result.content.includes('class="title"')) {
  			// Sent by Ed11y
  			// This removes Sa11y's injected "Tip!" additions:
  			content.innerHTML = this.result.content.split('<hr')[0];
  			content.querySelector('.title').prepend(tipAlert);
  		} else {
  			// Sent by Sa11y
  			let innerContent = document.createElement('div');
  			const sentences = this.result.content.split(/[.!]/);
  			const firstSentence = document.createElement('div');
  			firstSentence.innerHTML = sentences.shift() + '.';
  			firstSentence.classList.add('title');
  			firstSentence.prepend(tipAlert);
  			firstSentence.setAttribute('tabindex', '-1');
  			innerContent.append(firstSentence);
  			const theRest = document.createElement('div');
  			theRest.classList.add('sa11y-tip');
  			theRest.innerHTML = sentences.join('.');
  			innerContent.appendChild(theRest);
  			content.append(innerContent);
  		}
  		if (this.result.contrastDetails) {
  			const contrastDiv = document.createElement('div');
  			contrastDiv.classList.add('ed11y-contrast-tools');
  			content.append( contrastDiv);
  			// Append color pickers and suggested color.
  			const tools = generateContrastTools(this.result.contrastDetails);
  			contrastDiv.appendChild(tools);
  			initializeContrastTools(contrastDiv, this.result.contrastDetails);

  			// Append suggested color.
  			const suggestion = generateColorSuggestion(this.result.contrastDetails);
  			if (suggestion) contrastDiv.appendChild(suggestion);
  		}

      if (!State.inlineAlerts || Options.editLinks) {
        const editBar = document.createElement('div');

        if (!State.inlineAlerts) {
          editBar.classList.add('ed11y-tip-dismissals');
          const focusTransfer = document.createElement('button');
          const transferIcon = document.createElement('span');
          transferIcon.classList.add('ed11y-transfer-icon');
          transferIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 256 512"><path fill="currentColor" d="M0 29C-1 47 12 62 29 64l8 1C71 67 96 95 96 128L96 224l-32 0c-18 0-32 14-32 32s14 32 32 32l32 0 0 96c0 33-26 61-59 64l-8 1C12 450-1 465 0 483s17 31 35 29l8-1c34-3 64-19 85-43c21 24 51 40 85 43l8 1c18 2 33-12 35-29s-12-33-29-35l-8-1C186 445 160 417 160 384l0-96 32 0c18 0 32-14 32-32s-14-32-32-32l-32 0 0-96c0-33 26-61 59-64l8-1c18-2 31-17 29-35S239-1 221 0l-8 1C179 4 149 20 128 44c-21-24-51-40-85-43l-8-1C17-1 2 12 0 29z"/></svg>';
          focusTransfer.textContent = Lang._('transferFocus');
          focusTransfer.prepend(transferIcon);
          focusTransfer.classList.add('dismiss', 'ed11y-transfer-focus');
          editBar.append(focusTransfer);
          focusTransfer.addEventListener('click', function(){transferFocus();});
        } else {
          editBar.classList.add('ed11y-custom-edit-links');
          editBar.append(Options.editLinks.cloneNode(true));
        }
        content.append(editBar);
      }

      // Draw dismiss or restore buttons
      if (this.dismissable) {

        const buttonBar = document.createElement('div');
        buttonBar.classList.add('ed11y-tip-dismissals');

        const dismissIcon = document.createElement('span');
        dismissIcon.classList.add('ed11y-dismiss-icon');
        dismissIcon.innerHTML = '<svg aria-hidden="true" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>';

        // Dismissal Key is set in [5] if alert has been dismissed.
        if (State.showDismissed && this.dismissed) {

          // Check if user has permission to reset this alert.
          let okd = State.dismissedAlerts[Options.currentPage][this.result.test][this.result.dismiss] === 'ok';
          if ((okd && Options.allowOK) || (!okd)) {
            // User can restore this alert.
            const undismissButton = document.createElement('button');
            const unDismissIcon = document.createElement('span');
            unDismissIcon.classList.add('ed11y-dismiss-icon');
            unDismissIcon.innerHTML = '<svg aria-hidden="true" class="shown" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="-30 0 640 512"><path fill="Currentcolor" d="M288 32c-81 0-146 37-193 81C49 156 17 208 3 244c-3 8-3 17 0 25C17 304 49 356 95 399C142.5 443 207 480 288 480s146-37 193-81c47-44 78-95 93-131c3-8 3-17 0-25c-15-36-46-88-93-131C434 69 369 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35-29 64-64 64c-7 0-14-1-20-3c-6-2-12 2-12 7c.3 7 1 14 3 21c14 51 66 82 118 68s82-66 68-118c-11-42-48-69-89-71c-6-.2-9 6-7 12c2 6 3 13 3 20z"/></svg>';
            undismissButton.classList.add('dismiss');
            undismissButton.textContent = okd ? Lang._('undismissOKButton') : Lang._('undismissHideButton');
            undismissButton.prepend(unDismissIcon);
            buttonBar.append(undismissButton);
            undismissButton.addEventListener('click', function(){dismissThis('reset');});
          } else {
            const restoreNote = document.createElement('div');
            restoreNote.classList.add('dismissed-note');
            restoreNote.textContent = Lang._('undismissNotePermissions');
            buttonBar.append(restoreNote);
          }
        } else {

          const pageActions = document.createElement('details');
          const pageActionsSummary = document.createElement('summary');
          const othersLikeThis = Results.filter(el => el.test === this.result.test).length;
          const showPageActions = othersLikeThis > 3 && Options.allowHide && Options.allowOK;

          if (showPageActions) {
            pageActions.classList.add('ed11y-bulk-actions', 'dismiss');
            pageActionsSummary.textContent = Lang.sprintf('dismissActions', othersLikeThis);
            pageActions.appendChild(pageActionsSummary);
            buttonBar.appendChild(pageActions);
          }

          if (Options.allowOK) {
            const check = document.createElement('span');
            check.setAttribute('aria-hidden', 'true');
            check.textContent = '✓';

            const OkButton = document.createElement('button');
            OkButton.classList.add('dismiss');
            if (Options.syncedDismissals) {
              OkButton.setAttribute('title', Lang._('dismissOkTitle'));
            }
            OkButton.textContent = Lang._('dismissOkButtonContent');
            buttonBar.prepend(OkButton);

            if (showPageActions) {
              const OkAllButton = OkButton.cloneNode(true);
              OkAllButton.textContent = Lang._('dismissOkAllButton');
              OkAllButton.prepend(check.cloneNode(true));
              pageActions.append(OkAllButton);
              OkAllButton.addEventListener('click', function(){dismissThis('ok', true);});
            }

            OkButton.prepend(check);

            OkButton.addEventListener('click', function(){dismissThis('ok');});
          }

          if (Options.allowHide) {
            const ignoreButton = document.createElement('button');
            ignoreButton.classList.add('dismiss');
            if (Options.syncedDismissals) {
              ignoreButton.setAttribute('title', `${Lang._('dismissHideTitle')}`);
            }
            ignoreButton.textContent = Lang._('DISMISS');
            ignoreButton.prepend(dismissIcon.cloneNode(true));
            buttonBar.prepend(ignoreButton);
            ignoreButton.addEventListener('click', function(){dismissThis('hide');});

            if (showPageActions) {
              const ignoreAllButton = document.createElement('button');
              ignoreAllButton.classList.add('dismiss');
              ignoreAllButton.textContent = Lang._('DISMISS_ALL');
              ignoreAllButton.prepend(dismissIcon.cloneNode(true));
              pageActionsSummary.insertAdjacentElement('afterend', ignoreAllButton);
              ignoreAllButton.addEventListener('click', function(){dismissThis('hide', true);});
            }
          }
        }
        content.append(buttonBar);
      }
      this.tip.append(content);

      this.navBar = document.createElement('div');
      this.navBar.classList.add('ed11y-tip-header');
      this.count = document.createElement('div');
      this.count.classList.add('ed11y-tip-count');
      this.count.textContent = `${Lang._('ALERT_TEXT')} ${this.issueIndex + 1} / ${State.jumpList.length}`;
      this.navBar.append(this.count);
      if (State.jumpList.length > 1) {
        this.prev = document.createElement('button');
        this.prev.classList.add('ed11y-tip-prev');
        this.prev.setAttribute('title', `${Lang._('SKIP_TO_ISSUE')} ${this.issuePrev}`);
        this.prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M9 233c-12 12-12 33 0 45l160 160c12 12 33 12 45 0s12-33 0-45L77 256 215 119c12-12 12-33 0-45s-33-12-45 0l-160 160z"/></svg>';
        this.prev.addEventListener('click', (event) => {
          event.preventDefault();
          jumpTo(false);
        });
        this.navBar.append(this.prev);

        this.next = document.createElement('button');
        this.next.classList.add('ed11y-tip-next');
        this.next.setAttribute('title', `${Lang._('SKIP_TO_ISSUE')} ${this.issueNext}`);
        this.next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M9 233c-12 12-12 33 0 45l160 160c12 12 33 12 45 0s12-33 0-45L77 256 215 119c12-12 12-33 0-45s-33-12-45 0l-160 160z"/></svg>';
        this.next.addEventListener('click', (event) => {
          event.preventDefault();
          jumpTo();
        });
        this.navBar.append(this.next);
      }
      this.help = document.createElement('details');
      this.help.classList.add('button');
      this.helpContent = document.createElement('div');
      this.helpContent.classList.add('ed11y-tip-help-content');
      this.helpContent.innerHTML = Lang._('panelHelp');
      this.help.append(this.helpContent);
      this.helpToggle = document.createElement('summary');
      this.helpToggle.textContent = '?';
      this.helpToggle.setAttribute('aria-label', Lang._('panelHelpTitle'));
      this.helpToggle.setAttribute('title', Lang._('panelHelpTitle'));
      this.help.insertAdjacentElement('afterbegin', this.helpToggle);
      this.navBar.append(this.help);

      let closeButton = document.createElement('button');
      closeButton.setAttribute('title', Lang._('ALERT_CLOSE'));
      closeButton.classList.add('close');
      closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 384 512"><path fill="currentColor" d="M343 151c13-13 13-33 0-46s-33-13-45 0L192 211 87 105c-13-13-33-13-45 0s-13 33 0 45L147 256 41 361c-13 13-13 33 0 45s33 13 45 0L192 301 297 407c13 13 33 13 45 0s13-33 0-45L237 256 343 151z"/></svg>';
      this.navBar.append(closeButton);
      this.tip.append(this.navBar);

      let arrow = document.createElement('div');
      arrow.classList.add('arrow');
      closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        if(this.open) {
          let toggle = getElements('ed11y-element-result[data-ed11y-open="true"]', 'document');
          if (State.toggledFrom) {
            State.toggledFrom.focus();
          }
          // todo postpone: track if this tip was opened by the next button. If so, transfer focus back to it instead
          toggle[0]?.setAttribute('data-ed11y-action', 'shut');
          this.setAttribute('data-ed11y-action', 'shut');
        }
      });
      document.addEventListener('click', (event) => {
        // Close tip when mouse is clicked outside it.
        if(this.open && !event.target.closest('ed11y-element-tip, ed11y-element-result, ed11y-element-panel')) {
          let toggle = getElements('ed11y-element-result[data-ed11y-open="true"]', 'document', []);
          toggle[0]?.setAttribute('data-ed11y-action', 'shut');
          this.setAttribute('data-ed11y-action', 'shut');
        }
      });
      shadow.appendChild(this.wrapper);
      let focusLoopLeft = document.createElement('div');
      focusLoopLeft.setAttribute('tabIndex', '0');
      let focusLoopRight = document.createElement('div');
      focusLoopRight.setAttribute('tabindex', '0');
      this.wrapper.appendChild(focusLoopLeft);
      this.wrapper.appendChild(arrow);
      this.wrapper.appendChild(this.tip);
      this.wrapper.appendChild(focusLoopRight);
      let focusables = this.wrapper.querySelectorAll('a, button, [tabindex="0"]');
      let count = focusables.length;
      focusables[0].addEventListener('focus', () => {
        focusables[count - 2].focus();
      });
      focusables[count - 1].addEventListener('focus', () => {
        focusables[1].focus();
      });
      this.initialized = true;
      this.rendering = false;
    }

    toggleTip(changeTo) {
      if (changeTo) {
        this.wrapper.classList.add('open');
        alertOnInvisibleTip(this.result.toggle, this.result.element);
      } else {
        this.wrapper.classList.remove('open');
      }
      this.setAttribute('data-ed11y-open',changeTo);
    }

    static get observedAttributes() { return ['data-ed11y-action']; }

    attributeChangedCallback(attr, oldValue, newValue) {
      if (!this.initialized && this.result) {
        this.renderOnce();
      }
      if (this.initialized) {
        switch (attr) {
        case 'data-ed11y-action':
          if (newValue !== 'false') {
            let changeTo = newValue === 'open';
            this.open = changeTo;
            this.setAttribute('data-ed11y-action', 'false');
            this.toggleTip(changeTo);
          }
          break;
        }
      }
    }
  }

  const preProcessOptions = function(userOptions) {
  	Object.assign(Options, userOptions);
  //	Object.assign(Options.checks, userOptions.checks);

  	if (!Options.checkRoot) {
  		Options.checkRoot = document.querySelector('main') !== null ? 'main' : 'body'; // needed or redundant?
  	}

  	if (userOptions.syncOnlyConfiguration) {
  		State.splitConfiguration.active = true;
  		// Store both "sync" override and default "show" options in State.
  		State.splitConfiguration.syncOptions = userOptions.syncOnlyConfiguration.options;
  		State.splitConfiguration.showOptions = {};
  		// Store "show" value for each sync override.
  		Object.keys(State.splitConfiguration.syncOptions).forEach(key => {
  			// Cache the base configuration to restore after first check.
  			State.splitConfiguration.showOptions[key] = userOptions[key];
  		});
  		State.splitConfiguration.checks = new Set(userOptions.syncOnlyConfiguration.checks);
  	}


  	/*
  	* Options translation
  	* */
  	Options.headless = userOptions.alertMode === 'headless';

  	// Check for document types.
  	if (userOptions.panelAttachTo) {
  		State.panelAttachTo = userOptions.panelAttachTo;
  	}

  	/* *********** */
  	/* Theme setup */
  	/* *********** */
  	Theme.push = Options[Options.theme];
  	Theme.baseFontSize = Options.baseFontSize;
  	Theme.buttonZIndex = Options.buttonZIndex;
  	Theme.baseFontFamily = Options.baseFontFamily;
  	State.inlineAlerts = Options.inlineAlerts;
  	State.showDismissed = Options.showDismissed;

  	if (userOptions.linkIgnoreSelector && !userOptions.linkIgnoreSpan) {
  		Options.linkIgnoreSpan = userOptions.linkIgnoreSelector;
  	}

  	let cssUrls = userOptions.cssUrls;
  	if (!cssUrls) {
  		const cssLink = document.querySelector('link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]');
  		if (cssLink) {
  			cssUrls = [cssLink.getAttribute('href')];
  		} else {
  			cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`];
  			console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
  		}
  	}
  	const cssBundle = document.createElement('div');
  	cssBundle.classList.add('ed11y-style');
  	cssBundle.setAttribute('hidden','');
  	cssUrls?.forEach( sheet => {
  		const cssLink = document.createElement('link');
  		cssLink.setAttribute('rel', 'stylesheet');
  		// @todo after merge possibly lost some preload functionality.
  		cssLink.setAttribute('media', 'all');
  		if (sheet.indexOf('?') < 0) {
  			sheet = sheet + '?ver=' + State.version;
  		}
  		cssLink.setAttribute('href', sheet);
  		cssBundle.append(cssLink);
  	});
  	UI.attachCSS = function(appendTo) {
  		const link = cssBundle.cloneNode(true);
  		appendTo.appendChild(link);
  	};
  };

  const postProcessOptions = function(userOptions) {

  	// Override Sa11y's exclusion settings.

  	// This is separate because sometimes that's what we are looking for.
  	Constants.Exclusions.Sa11yElements = ['.ed11y-element', 'ed11y-element-heading-label'];

  	Constants.Exclusions.Container = ['style', 'script', 'noscript'];
  	if (Options.containerIgnore) {
  		const containerSelectors = Options.containerIgnore.split(',').map((item) => item.trim());
  		Constants.Exclusions.Container = Constants.Exclusions.Container.concat(
  			containerSelectors.flatMap((item) => [`${item} *`, item]),
  		);
  	}
  	if (userOptions.ignoreElements) {
  		const elementSelectors = userOptions.ignoreElements.split(',').map((item) => item.trim());
  		Constants.Exclusions.Container = Constants.Exclusions.Container.concat(elementSelectors);
  	}

  	Constants.Panel.readabilityInfo = document.createElement('div');
  	Constants.Panel.readabilityDetails = document.createElement('div');

  	State.english = Lang.langStrings.LANG_CODE.startsWith('en');

  	Object.assign(Theme, Options[Options.theme]);
  	Theme.baseFontSize = Options.baseFontSize;
  	Theme.buttonZIndex = Options.buttonZIndex;
  	Theme.baseFontFamily = Options.baseFontFamily;

  	if (!Options.linkStringsNewWindows) {
  		Options.linkStringsNewWindows = Lang._('linkStringsNewWindows');
  	}

  	if ( userOptions['documentLinks']) {
  		Constants.Global.documentSources = userOptions['documentLinks'];
  	}

  	Object.assign(Lang.langStrings, ed11yLang.strings, ed11yLang.testNames);
  	// todo CMS merge also include as fallbacks untranslated strings.
  	const overrides = Object.entries(ed11yLang.tests);
  	if (State.english) {
  		for(let i = 0; i < overrides.length; i++) {
  			if (State.english) {
  				Lang.langStrings[overrides[i][0]] = `<div class="title" tabindex="-1"><div class="ed11y-tip-alert"></div>${ed11yLang.testNames[overrides[i][0] + '_TEST_NAME']}</div>${overrides[i][1]}`;
  				// todo CMS merge custom test.
  				// todo after merge names for other tests.
  			}
  		}
  	}

  	let localResultCount = store.getItem('editoria11yResultCount');
  	State.seen = localResultCount && localResultCount !== 'undefined' ?
  		JSON.parse(localResultCount) : {};

  	// Build list of dismissed alerts
  	if (Options.syncedDismissals === false) {
  		State.dismissedAlerts = localStorage.getItem('ed11ydismissed');
  		State.dismissedAlerts = State.dismissedAlerts ? JSON.parse(State.dismissedAlerts) : {};
  	} else {
  		State.dismissedAlerts = {};
  		State.dismissedAlerts[Options.currentPage] = Options.syncedDismissals;
  	}

  };

  function initialize (userOptions) {
  	if (State.once) {
  		console.error('double init');
  		return;
  	}
  	State.once = true;

  	// Initialize global constants and exclusions.
  	preProcessOptions(userOptions);
  	// We override Sa11y's root initializer because we use strings not arrays.

  	Constants.initializeGlobal(Options);
  	// @todo readability param
  	Constants.initializeReadability(Options);
  	Constants.initializeExclusions(Options);
  	postProcessOptions(userOptions);
  	customElements.define('ed11y-element-alt', Ed11yElementAlt);
  	customElements.define('ed11y-element-result', Ed11yElementResult);
  	customElements.define('ed11y-element-heading-label',
  		Ed11yElementHeadingLabel);
  	customElements.define('ed11y-element-panel', Ed11yElementPanel);
  	customElements.define('ed11y-element-tip', Ed11yElementTip);

  	// Once document has fully loaded.
  	documentLoadingCheck(() => {
  		if (checkRunPrevent()) {
  			State.disabled = true;
  			return false;
  		}

  		State.running = true;

  		// Run tests
  		checkAll();

  		document.addEventListener('ed11yResume', function () {
  			continueCheck(true);
  		});
  		// Set up observers.
  		// Todo only needed if we are watching for changes.
  		window.addEventListener('keydown', () => {
  			State.interaction = true;
  		}, {
  			passive: true,
  		});
  		window.addEventListener('click', () => {
  			State.interaction = true;
  		}, {
  			passive: true,
  		});
  		window.addEventListener('resize', function () { windowResize(); }, {
  			passive: true,
  		});
  		// Move toggles when something expands or collapses.
  		const mightExpand = document.querySelectorAll('[aria-expanded], [aria-controls]');
  		mightExpand?.forEach(expandable => {
  			expandable.addEventListener('click', () => {
  				window.setTimeout(() => {
  					windowResize();
  				}, 333);
  			}, {
  				passive: true,
  			});
  		});

  	});
  }

  // These are copied into rollup config:
  const version = '3.0.0-dev092225';

  class Ed11y {

    constructor(userOptions) {

      if (CSS.supports('selector(:has(body))')) {
  			try {
  				initialize(userOptions);
  			} catch (error) {
  				showError(error);}
  			// @todo merge license and error message.
      }

    }
  }

  const elements = Elements.Found;

  exports.Ed11y = Ed11y;
  exports.Lang = Lang;
  exports.Options = Options;
  exports.Results = Results;
  exports.State = State;
  exports.Theme = Theme;
  exports.UI = UI;
  exports.checkAll = checkAll;
  exports.computeAccessibleName = computeAccessibleName;
  exports.elements = elements;
  exports.findElements = findElements;
  exports.getElements = getElements;
  exports.incrementalCheck = incrementalCheck;
  exports.prepareDismissal = prepareDismissal;
  exports.reset = reset;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
