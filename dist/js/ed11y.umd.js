
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 3.0.0
  * @author undefined
  * @license GPLv2
  * @copyright © 2020 - 2025 Toronto Metropolitan University.
  * @contact undefined
  * GitHub: git+https://itmaybejj@github.com/itmaybejj/editoria11y.git | Website: https://sa11y.netlify.app
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

  /* eslint-disable no-continue */
  /* eslint-disable no-use-before-define */

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

    // Textarea with a title.
    if (element.tagName === 'TEXTAREA' && element.hasAttribute('title')) {
      return element.getAttribute('title');
    }

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

  const Constants = (function myConstants() {
    /* **************** */
    /* Initialize Roots */
    /* **************** */
    const Root = {};
    function initializeRoot(desiredRoot, desiredReadabilityRoot) {
      Root.areaToCheck = document.querySelector(desiredRoot);
      if (!Root.areaToCheck) {
        Root.areaToCheck = document.querySelector('body');
      }

      // Readability target area to check.
      Root.Readability = document.querySelector(desiredReadabilityRoot);
      if (!Root.Readability) {
        if (!Root.areaToCheck) {
          Root.Readability = document.querySelector('body');
        } else {
          // If desired root area is not found, use the root target area.
          Root.Readability = Root.areaToCheck;

          // Create a warning if the desired readability root is not found.
          const { readabilityDetails, readabilityToggle } = Constants.Panel;
          const readabilityOn = readabilityToggle?.getAttribute('aria-pressed') === 'true';
          if (readabilityDetails && readabilityOn) {
            const note = document.createElement('div');
            note.id = 'readability-alert';
            note.innerHTML = `<hr aria-hidden="true"><p>${Lang.sprintf('MISSING_READABILITY_ROOT',
            Root.areaToCheck.tagName.toLowerCase(), desiredReadabilityRoot)}</p>`;
            readabilityDetails.insertAdjacentElement('afterend', note);
          }
        }
      }
    }

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
      Exclusions.Images = ['[role="presentation"]'];
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

  /**
   * Finds elements in the DOM that match the given selector, within the specified root element, and excluding any specified elements.
   * @param {string} selector - The CSS selector to match elements against.
   * @param {string} desiredRoot - The root element to start the search from. Can be one of 'document', 'readability', 'root', or a custom selector for the desired root element.
   * @param {string} exclude - Elements to exclude from the search, specified as a CSS selector (optional).
   * @returns {Array} - An array of elements that match the given selector.
   */
  function find(selector, desiredRoot, exclude) {
    let root;
    if (desiredRoot === 'document') {
      root = document;
    } else if (desiredRoot === 'readability') {
      root = Constants.Readability.Root;
      if (!root) root = Constants.Root.areaToCheck;
    } else if (desiredRoot === 'root') {
      root = Constants.Root.areaToCheck;
      if (!root) root = document.body;
    } else if (desiredRoot === 'panel') {
      root = Constants.Panel.panel;
      if (!root) root = document.body;
    } else {
      root = document.querySelector(desiredRoot);
      if (!root) root = document.body;
    }

    const shadowComponents = document.querySelectorAll('[data-sa11y-has-shadow-root]');
    const shadow = shadowComponents ? ', [data-sa11y-has-shadow-root]' : '';

    // Exclusions are returned as an array & need to become a string for selector.
    const exclusions = Constants.Exclusions.Container.join(', ');
    const additionalExclusions = exclude?.join(', ') || '';

    // Ensure no trailing commas.
    const additional = additionalExclusions ? `, ${additionalExclusions}` : '';

    /* Logic yoinked from Editoria11y */
    // 1. Elements array includes web components in the selector to be used as a placeholder.
    const elements = Array.from(root.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`));
    if (shadowComponents.length) {
      // 2. Dive into the each shadow root and collect an array of its results.
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
    // 4. Return the cleaned up array, filtering out <slot> placeholders.
    return elements.filter((node) => node.parentNode.tagName !== 'SLOT');
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
    totalCount: Number,
    warningCount: Number,
    errorCount: Number,
    dismissedCount: Number,
    dismissedAlerts: {},
    activeRange: false,
    incremental: false,
    interaction: false,
    forceFullCheck: false,
    browserSpeed: Number,
    browserLag: Number,
  	customTestsRemaining: Number,
    loopStop: false,
    currentPage: window.location.pathname,
    roots: [],
    oldResults: [],
    headingOutline: [],
    elements: { // to be replaced by Sa11y find.
      altMark: [],
      delayedReset: []
    },

    /* Panel initial state */
    once: false,
    disabled: false,
    onLoad: true,
    open: false,
    showPanel: false,
    nextText: '',
    panelAttachTo: document.body,
  	visualizing: false,

    /* Annotations initial states */
    jumpList: [],
    lastOpenTip: Number -1,
    viaJump: false,
    toggledFrom: false,
    scrollPending: Number,
    scrollTicking: false,
    openTip: {
      button: false,
      tip: false,
    },
    positionedFrames: [],
    editableHighlight: [],
    recentlyAddedNodes: [],
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
    showDismissed: {},
  };

  const Results = [];

  const Options = {

  	checkRoots: false, // @todo merge implement whatever syntax Sa11y releases.
  	fixedRoots: false, // Array of specific nodes, overrides previous.
  	ignoreElements: '',

  	ignoreAriaOnElements: false, // e.g. 'h1,h2,h3,h4,h5,h6'
  	ignoreTextInElements: false, // e.g. '.inner-node-hidden-in-CSS'

  	// Include and modify this entire object in your call
  	// @todo merge test and/or reimplement.
  	headingsOnlyFromCheckRoots: false, // Whether the Headings panel shows all headings on page or only from checked content.

  	// Set alertModes:
  	// 'headless': do not draw interface
  	// 'userPreference: respect user preference.
  	// 'polite': open for new issues.
  	// 'assertive': open for any issues.
  	// 'active': always open.
  	// CMS integrations can switch between polite & headless at runtime.
  	alertMode: 'userPreference',
  	inlineAlerts: true,
  	watchForChanges: true, // true, false, 'checkRoots';

  	// This covers CKEditor, TinyMCE and Gutenberg. Being less specific may help performance.
  	editableContent: '[contenteditable="true"]:not(.gutenberg__editor [contenteditable]), .gutenberg__editor .interface-interface-skeleton__content',

  	// Dismissed alerts
  	currentPage: false, // uses window.location.pathname unless a string is provided.
  	allowHide: true, // enables end-user ignore button
  	allowOK: true,  // enables end-user mark OK button
  	syncedDismissals: false, // provide empty or populated object {} to enable sync functions
  	reportsURL: false, // Provides a link to site-wide reports
  	showDismissed: false, // start panel with dismissed items visible; used when coming directly from a dashboard

  	// Hide all alerts if these elements are absent, e.g., ".edit-button"
  	// Used to not heckle editors on pages they cannot fix; they can still click a "show hidden" button to check manually.
  	ignoreAllIfAbsent: false,
  	ignoreAllIfPresent: false, // @todo merge dismissal system appears to be broken.

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
  	embeddedContent: false, // @todo merge remove.
  	embeddedContentTitle: '', // @todo merge remove.
  	embeddedContentMessage: '', // @todo merge remove.

  	linksUrls: false, // get from language pack
  	linksMeaningless: false, // get from language pack
  	altPlaceholder: false, // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'

  	editLinks: false, // Add links to edit content in tooltips.

  	// @todo merge discuss: how to handle this functionality.
  	editorHeadingLevel: [
  		// Sets previous heading level for contentEditable fields.
  		// With 'ignore' set, first heading level is ignored in editable zones.
  		// This is ideal for systems with separate backend editing pages.
  		// Set to 'inherit' for fields edited in a frontend context.
  		/*{
  			selector: '.example-inherit',
  			previousHeading: 'inherit',
  		},
  		{
  			selector: '.example-l3',
  			previousHeading: 3,
  		},*/
  		{
  			selector: '*',
  			previousHeading: 0, // Ignores first heading for level skip detection.
  		},
  	],

  	userPrefersShut: localStorage.getItem('editoria11yShow') === '0',

  	customTests: 0,

  	// Target area to check
  	checkRoot: 'body',

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

  	// Control panel settings
  	aboutContent: '',
  	panelPosition: 'right',
  	showMovePanelToggle: true,
  	checkAllHideToggles: false,
  	developerChecksOnByDefault: false,

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
  	readabilityRoot: 'body',
  	readabilityIgnore: '',

  	// Contrast
  	contrastPlugin: false,
  	contrastAAA: false,
  	contrastAPCA: false,

  	// Other plugins
  	customChecks: false, // @todo merge migrate in embed check?
  	linksAdvancedPlugin: true,
  	formLabelsPlugin: true, // @todo CMS merge turn off when editing.
  	embeddedContentPlugin: true,
  	developerPlugin: false,
  	externalDeveloperChecks: false,
  	colourFilterPlugin: false,
  	exportResultsPlugin: false,

  	// Shared properties for some checks
  	susAltStopWords: '',
  	linkStopWords: '',
  	extraPlaceholderStopWords: '',
  	imageWithinLightbox: '',

  	checks: {
  		// Sa11y: Heading checks
  		HEADING_SKIPPED_LEVEL: true,
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
  		IMAGE_DECORATIVE_CAROUSEL: {
  			sources: '.carousel',
  		},
  		LINK_IMAGE_NO_ALT_TEXT: true,
  		LINK_IMAGE_TEXT: true,
  		IMAGE_FIGURE_DECORATIVE: true,
  		IMAGE_DECORATIVE: true,
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
  		LINK_IMAGE_ALT: {
  			dismissAll: true,
  		},
  		LINK_IMAGE_ALT_AND_TEXT: true,
  		IMAGE_FIGURE_DUPLICATE_ALT: true,
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
  		DUPLICATE_TITLE: false,
  		LINK_EMPTY_LABELLEDBY: true,
  		LINK_EMPTY_NO_LABEL: true,
  		LINK_STOPWORD: true,
  		LINK_STOPWORD_ARIA: true,
  		LINK_SYMBOLS: true,
  		LINK_CLICK_HERE: false,
  		LINK_DOI: false,
  		LINK_URL: {
  			maxLength: 40,
  		},
  		LINK_LABEL: {
  			dismissAll: true,
  		},
  		LINK_EMPTY: true,
  		LINK_IDENTICAL_NAME: false,
  		LINK_NEW_TAB: {
  			dismissAll: true,
  		},
  		LINK_FILE_EXT: true,

  		// Sa11y: Form labels checks
  		LABELS_MISSING_IMAGE_INPUT: true,
  		LABELS_INPUT_RESET: true,
  		LABELS_MISSING_LABEL: true,
  		LABELS_ARIA_LABEL_INPUT: true,
  		LABELS_NO_FOR_ATTRIBUTE: true,
  		LABELS_PLACEHOLDER: true,

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
  		EMBED_MISSING_TITLE: true,
  		EMBED_GENERAL: true,

  		// Quality assurance checks
  		QA_BAD_LINK: {
  			sources: '',
  		},
  		QA_STRONG_ITALICS: false,
  		QA_IN_PAGE_LINK: false,
  		QA_DOCUMENT: {
  			sources: 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']',
  			dismissAll: true,
  		},
  		QA_PDF: {
  			dismissAll: true,
  		},
  		QA_BLOCKQUOTE: true,
  		TABLES_MISSING_HEADINGS: true,
  		TABLES_SEMANTIC_HEADING: true,
  		TABLES_EMPTY_HEADING: true,
  		QA_FAKE_HEADING: true,
  		QA_FAKE_LIST: true,
  		QA_UPPERCASE: true,
  		QA_UNDERLINE: false,
  		QA_SUBSCRIPT: false,
  		QA_NESTED_COMPONENTS: {
  			sources: '',
  		},
  		QA_JUSTIFY: false,
  		QA_SMALL_TEXT: false,

  		// Sa11y: Meta checks
  		META_LANG: false,
  		META_SCALABLE: false,
  		META_MAX: false,
  		META_REFRESH: false,

  		// Sa11y: Developer checks
  		DUPLICATE_ID: false,
  		META_TITLE: false,
  		UNCONTAINED_LI: false,
  		TABINDEX_ATTR: true,
  		HIDDEN_FOCUSABLE: true,
  		LABEL_IN_NAME: true,
  		BTN_EMPTY: true,
  		BTN_EMPTY_LABELLEDBY: true,
  		BTN_ROLE_IN_NAME: true,

  		// Sa11y: Contrast checks
  		CONTRAST_WARNING: {
  			dismissAll: true,
  		},
  		CONTRAST_INPUT: true,
  		CONTRAST_ERROR: true,
  		CONTRAST_PLACEHOLDER: true,
  		CONTRAST_PLACEHOLDER_UNSUPPORTED: true,
  		CONTRAST_ERROR_GRAPHIC: true,
  		CONTRAST_WARNING_GRAPHIC: {
  			dismissAll: true,
  		},
  		CONTRAST_UNSUPPORTED: {
  			dismissAll: true,
  		},
  	},
  };

  var styles = "[data-sa11y-overflow]{overflow:auto!important}[data-sa11y-error]{outline:5px solid var(--sa11y-error)!important;outline-offset:2px}[data-sa11y-warning]:not([data-sa11y-error]){outline:5px solid var(--sa11y-warning)!important;outline-offset:2px}[data-sa11y-pulse-border]{animation:pulse 1s 2;box-shadow:0;outline:5px solid var(--sa11y-focus-color)!important}[data-sa11y-pulse-border]:focus,[data-sa11y-pulse-border]:hover{animation:none}@keyframes pulse{0%{box-shadow:0 0 0 5px var(--sa11y-focus-color)}50%{box-shadow:0 0 0 12px var(--sa11y-pulse-color)}to{box-shadow:0 0 0 5px var(--sa11y-pulse-color)}}h1[data-sa11y-pulse-border],h2[data-sa11y-pulse-border],h3[data-sa11y-pulse-border],h4[data-sa11y-pulse-border],h5[data-sa11y-pulse-border],h6[data-sa11y-pulse-border],img[data-sa11y-pulse-border]{animation:pulse-scale 1s 2}@keyframes pulse-scale{0%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(1.02)}to{opacity:1;transform:scale(1)}}@media (prefers-reduced-motion:reduce){[data-sa11y-pulse-border]{animation:none!important}}@media (forced-colors:active){[data-sa11y-error-inline],[data-sa11y-error],[data-sa11y-good],[data-sa11y-pulse-border],[data-sa11y-warning-inline],[data-sa11y-warning]{forced-color-adjust:none}}";

  /* ************************************************************ */
  /*  Auto-detect shadow DOM or process provided web components.  */
  /* ************************************************************ */
  const addStyleUtilities = (component) => {
    const CSSUtils = component.shadowRoot.querySelectorAll('.sa11y-css-utilities');
    if (CSSUtils.length === 0) {
      const style = document.createElement('style');
      style.setAttribute('class', 'sa11y-css-utilities');
      style.textContent = styles;
      component.shadowRoot.appendChild(style);
    }
  };

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
          addStyleUtilities(component);
        }
      });
    } else if (option.shadowComponents) {
      const providedShadow = document.querySelectorAll(option.shadowComponents);
      providedShadow.forEach((component) => {
        component.setAttribute('data-sa11y-has-shadow-root', '');
        addStyleUtilities(component);
      });
    }
  }

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
        'document',
        Constants.Exclusions.Headings,
      );
      Found.HeadingOne = find(
        'h1, [role="heading"][aria-level="1"]',
        'document',
        Constants.Exclusions.Headings,
      );

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
      const readabilityExclusions = ($el) => Constants.Root.Readability.contains($el)
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
      const stringMatchExclusions = option.linkIgnoreStrings
        ? linkSpanExclusions.replace(option.linkIgnoreStrings, '') : linkSpanExclusions;
      const linkTextLength = link
        ? removeWhitespace(stringMatchExclusions).length : 0;

      // Has aria-hidden.
      if ($el.getAttribute('aria-hidden') === 'true') {
        return;
      }

      // Ignore tracking pixels without explicit aria-hidden or nullified alt.
      if ($el.height < 2 && $el.width < 2 && (isElementHidden($el) || alt === '')) {
        return;
      }

      if (link && link.getAttribute('aria-hidden') === 'true') {
        // If linked image has aria-hidden, but is still focusable.
        const unfocusable = link.getAttribute('tabindex') === '-1';
        if (option.checks.HIDDEN_FOCUSABLE && !unfocusable) {
          results.push({
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

        // Decorative images.
        if (decorative) {
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
            const condition = (link) ? 'LINK_ALT_UNPRONOUNCEABLE' : 'ALT_UNPRONOUNCEABLE';
            results.push({
              element: $el,
              type: unpronounceable.type || 'error',
              content: Lang.sprintf(unpronounceable.content || condition, altText),
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
      const rootContainsHeading = Constants.Root.areaToCheck.contains($el);
      const rootContainsShadowHeading = Constants.Root.areaToCheck.contains($el.getRootNode().host);
      const isWithinRoot = rootContainsHeading || rootContainsShadowHeading;

      // Determine heading level.
      const level = parseInt($el.getAttribute('aria-level') || $el.tagName.slice(1), 10);
      const headingLength = removeWhitespace$1.length;
      const maxHeadingLength = option.checks.HEADING_LONG.maxLength || 160;

      // Default.
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
              type = option.checks.HEADING_EMPTY_WITH_IMAGE.type || 'error';
              content = Lang.sprintf(option.checks.HEADING_EMPTY_WITH_IMAGE.content || 'HEADING_EMPTY_WITH_IMAGE', level);
              developer = option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
              dismissAll = option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll ? 'HEADING_EMPTY_WITH_IMAGE' : false;
              margin = '-15px 30px';
            }
          }
        } else if (option.checks.HEADING_EMPTY) {
          type = option.checks.HEADING_EMPTY.type || 'error';
          content = Lang.sprintf(option.checks.HEADING_EMPTY.content || 'HEADING_EMPTY', level);
          developer = option.checks.HEADING_EMPTY.developer || false;
          dismissAll = option.checks.HEADING_EMPTY.dismissAll ? 'HEADING_EMPTY' : false;
          margin = '0';
        }
      } else if (level - prevLevel > 1 && i !== 0) {
        if (option.checks.HEADING_SKIPPED_LEVEL) {
          type = option.checks.HEADING_SKIPPED_LEVEL.type || 'error';
          content = Lang.sprintf(option.checks.HEADING_SKIPPED_LEVEL.content || 'HEADING_SKIPPED_LEVEL', prevLevel, level, truncateString(headingText, 60), truncateString(prevHeadingText, 60), prevLevel + 1);
          developer = option.checks.HEADING_SKIPPED_LEVEL.developer || false;
          dismissAll = option.checks.HEADING_SKIPPED_LEVEL.dismissAll ? 'HEADING_SKIPPED_LEVEL' : false;
        }
      } else if (i === 0 && level !== 1 && level !== 2) {
        if (option.checks.HEADING_FIRST) {
          type = option.checks.HEADING_FIRST.type || 'error';
          content = Lang.sprintf(option.checks.HEADING_FIRST.content || 'HEADING_FIRST');
          developer = option.checks.HEADING_FIRST.developer || false;
          dismissAll = option.checks.HEADING_FIRST.dismissAll ? 'HEADING_FIRST' : false;
        }
      } else if (headingLength > maxHeadingLength) {
        if (option.checks.HEADING_LONG) {
          type = option.checks.HEADING_LONG.type || 'warning';
          content = Lang.sprintf(option.checks.HEADING_LONG.content || 'HEADING_LONG', maxHeadingLength, headingLength);
          developer = option.checks.HEADING_LONG.developer || false;
          dismissAll = option.checks.HEADING_LONG.dismissAll ? 'HEADING_LONG' : false;
        }
      }

      // Create results object.
      if (content && type) {
        results.push({
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
      headingOutline.push({
        element: $el,
        headingLevel: level,
        text: headingText,
        index: i,
        type,
        dismiss: prepareDismissal(`H${level + headingText}`),
        isWithinRoot,
      });
    });

    // Missing Heading 1
    if (option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
      results.push({
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
      const accName = computeAccessibleName($el, Constants.Exclusions.LinkSpan);
      const stringMatchExclusions = option.linkIgnoreStrings
        ? accName.replace(option.linkIgnoreStrings, '') : accName;
      const linkText = removeWhitespace(stringMatchExclusions);

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
      // Evaluate $el.textContent in addition to accessible name to bypass `linkIgnoreSpan` prop.
      const containsNewWindowPhrases = Lang._('NEW_WINDOW_PHRASES').some((pass) => linkText.toLowerCase().includes(pass) || getText($el).toLowerCase().includes(pass));

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

      // Don't overlap with Alt Text module.
      if (!$el.querySelectorAll('img').length) {
        // Has aria-hidden.
        if (ariaHidden) {
          if (!negativeTabindex) {
            // If negative tabindex.
            if (option.checks.HIDDEN_FOCUSABLE) {
              results.push({
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
        } else if ((href || href === '') && linkText.length === 0) {
          // Empty hyperlinks.
          if (hasAriaLabelledby) {
            // Has ariaLabelledby attribute but empty accessible name.
            if (option.checks.LINK_EMPTY_LABELLEDBY) {
              results.push({
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
            // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
            if (option.checks.LINK_EMPTY_NO_LABEL) {
              results.push({
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
          } else if (option.checks.LINK_EMPTY) {
            // Completely empty <a></a>
            results.push({
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
          // Contains stop words.
          if (option.checks.LINK_STOPWORD) {
            results.push({
              element: $el,
              type: option.checks.LINK_STOPWORD.type || 'error',
              content: option.checks.LINK_STOPWORD.content
                ? Lang.sprintf(option.checks.LINK_STOPWORD.content, error[0])
                : Lang.sprintf('LINK_STOPWORD', error[0]) + Lang.sprintf('LINK_TIP'),
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKSTOPWORD${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_STOPWORD.dismissAll ? 'LINK_STOPWORD' : false,
              developer: option.checks.LINK_STOPWORD.developer || false,
            });
          }
        } else if (error[2] !== null) {
          // Contains DOI URL in link text.
          if (linkText.length > 8) {
            if (option.checks.LINK_DOI) {
              results.push({
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
        const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');

        // Pass: Ignore if it's a submit or hidden button.
        if (type === 'submit' || type === 'button' || type === 'hidden') {
          return;
        }

        // Error: Input with type="image" without accessible name or alt.
        if (type === 'image') {
          if (option.checks.LABELS_MISSING_IMAGE_INPUT && (!alt || alt.trim() === '') && !hasAria && !hasTitle) {
            results.push({
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
        if (hasAria || hasTitle) {
          if (inputName.length === 0) {
            if (option.checks.LABELS_MISSING_LABEL) {
              results.push({
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
            element: $el,
            type: option.checks.LABELS_MISSING_LABEL.type || 'error',
            content: Lang.sprintf(option.checks.LABELS_MISSING_LABEL.content || 'LABELS_MISSING_LABEL'),
            dismiss: prepareDismissal(`INPUTNOID${type + inputName}`),
            dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
            developer: option.checks.LABELS_MISSING_LABEL.developer || true,
          });
        }

        // Avoid using placeholder attributes.
        if (option.checks.LABELS_PLACEHOLDER && $el.placeholder && $el.placeholder !== 0) {
          results.push({
            element: $el,
            type: option.checks.LABELS_PLACEHOLDER.type || 'warning',
            content: Lang.sprintf(option.checks.LABELS_PLACEHOLDER.content || 'LABELS_PLACEHOLDER'),
            dismiss: prepareDismissal(`INPUTPLACEHOLDER${type + inputName}`),
            dismissAll: option.checks.LABELS_PLACEHOLDER.dismissAll ? 'LABELS_PLACEHOLDER' : false,
            developer: option.checks.LABELS_PLACEHOLDER.developer || true,
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
            const targetElement = document.getElementById(targetId)
              || document.getElementById(decodeURIComponent(targetId))
              || document.getElementById(encodeURIComponent(targetId))
              || document.getElementById(ariaControls)
              || document.querySelector(`a[name="${targetId}"]`);

            // If reference ID doesn't exist.
            if (!targetElement) {
              results.push({
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

  /*=============== Utilities ================*/

  function getElements(selector, desiredRoot, exclude) {
  	exclude = exclude === false ? [] : exclude;
  	return find(selector, desiredRoot, exclude);
  }
  // QuerySelectAll non-ignored elements within checkRoots, with recursion into shadow components
  function findElements (key, selector, rootRestrict = true) { // @todo after merge replace.
  	const desiredRoot = rootRestrict ? 'root' : 'document';
  	const exclude = rootRestrict ? [] : Constants.Exclusions.Sa11yElements;
  	State.elements[key] = find( selector, desiredRoot, exclude );
  }

  // First step in checkAll is getting a fresh set of elements to check.
  function buildElementList () {

  	// Check for ignoreAll elements.
  	State.ignoreAll = Options.ignoreAllIfAbsent && document.querySelector(`:is(${Options.ignoreAllIfAbsent})`) === null;
  	if (!State.ignoreAll && !!Options.ignoreAllIfPresent) {
  		State.ignoreAll = document.querySelector(`:is(${Options.ignoreAllIfPresent})`) !== null;
  	}

  	if ( State.incremental ) {
  		State.oldResults = Results;
  	}
  	// Reset counts
  	Results.length = 0;
  	State.elements = [];
  	State.mediaCount = 0;
  	State.headingOutline = [];

  	for (let i = 0; i < State.roots.length; i++) {
  		if (Options.fixedRoots) {
  			State.roots[i].dataset.ed11yRoot = `${i}`;
  		}
  		if (State.roots[i].shadowRoot) {
  			State.roots.setAttribute('data-ed11y-has-shadow-root', 'true');
  			detectShadow(State.roots[i]);
  			State.roots[i] = State.roots[i].shadowRoot;
  		}
  		else {
  			detectShadow(State.roots[i]);
  		}

  		Constants.initializeRoot(Options.checkRoots, Options.checkRoots); // @todo release merge readability, add multiroot.

  		// Find all web components on the page.
  		findShadowComponents(Options);

  		// Find and cache elements.
  		console.log(Constants);
  		Elements.initializeElements(Options);
  		console.log(Elements);
  		// Note: as of 3/28/25 this is as performant as Sa11y's filter() approach.
  		if (typeof Options.editableContent === 'string') {
  			findElements('editable', Options.editableContent, false);
  		}
  		else {
  			State.elements.editable = Options.editableContent;
  		}
  		if (Options.inlineAlerts && State.elements.editable.length > 0) {
  			Options.inlineAlerts = false;
  			console.warn('Editable content detected; Editoria11y inline alerts disabled');
  		}
  		if (Options.embeddedContent) ;
  		if (Options.panelNoCover) {
  			// Moves panel off conflicting widgets.
  			findElements('panelNoCover', Options.panelNoCover, false);
  		}
  	}
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
    classes?.forEach((el) => {
      let thisClass = el;
      findElements('reset', `.${thisClass}`);
      State.elements.reset?.forEach(el => {
        el.classList.remove(thisClass);
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
  function detectShadow (container) {
    if (Options.autoDetectShadowComponents) {
      const select = !State.ignore ? '*:not(.ed11y-element)' : `*:not(${Options.ignore}, .ed11y-element)`;
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
  		State.elements.reset = getElements('ed11y-element-highlight', 'document', []);
  	} else {
  		State.elements.reset = getElements('ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', 'document', []);
  	}
  	State.elements.reset?.forEach((el) => el.remove());

  	// Flicker prevention -- leave old tip in place for 100ms.
  	//findElements('delayedReset', 'ed11y-element-result, ed11y-element-tip', false);
  	State.elements.delayedReset = getElements('ed11y-element-result, ed11y-element-tip', 'document', []);

  	window.setTimeout(()=> {
  		State.elements.delayedReset?.forEach((el) => el.remove());
  	}, 100, State.elements.delayedReset);

  	if (typeof UI.panelJumpNext === 'function') {
  		UI.panelJumpNext.querySelector('.ed11y-sr-only').textContent = State.english ? Lang._('buttonFirstContent')
  			: Lang._('SKIP_TO_ISSUE') + ' 1';
  	}
  	// Reset insertions into body content.
  }

  function newIncrementalResults() {
  	if (State.forceFullCheck || Results.length !== State.oldResults.length) {
  		return true;
  	}
  	let newResultString = `${State.errorCount} ${State.warningCount}`;
  	Results.forEach(result => {
  		newResultString += result.test + result.element.outerHTML;
  	});
  	let changed = newResultString !== State.oldResultString;
  	State.oldResultString = newResultString;
  	return changed;
  }
  function countAlerts () {

  	State.errorCount = 0;
  	State.warningCount = 0;
  	State.dismissedCount = 0;

  	// Review results array to remove dismissed or ignored items

  	State.dismissedCount = 0;
  	for (let i = Results.length - 1; i >= 0; i--) {

  		let test = Results[i].test;

  		if (Options.ignoreTests &&
  			Options.ignoreTests.includes(test)) {
  			// Would be faster to skip test, but this is easy and reliable.
  			Results.splice(i, 1);
  			continue;
  		}

  		// todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
  		/*if (State.incremental && Ed11y.oldResults.length > 0) {
  			// Don't flag new issues in the active range while people are typing.
  		}*/

  		let dismissKey = prepareDismissal(Results[i].dismissalKey);
  		// We run the user provided dismissal key through the text sanitization to support legacy data with special characters.
  		if (dismissKey !== false && Options.currentPage in State.dismissedAlerts && test in State.dismissedAlerts[Options.currentPage] && dismissKey in State.dismissedAlerts[Options.currentPage][test]) {
  			// Remove result if it has been marked OK or ignored, increment dismissed match counter.
  			State.dismissedCount++;
  			Results[i].dismissalStatus = State.dismissedAlerts[Options.currentPage][test][dismissKey];
  		} else if (Results[i].dismissalKey) {
  			State.warningCount++;
  			Results[i].dismissalStatus = false;
  		} else {
  			State.errorCount++;
  			Results[i].dismissalStatus = false;
  		}
  	}

  	State.totalCount = State.errorCount + State.warningCount;

  	// Dispatch event for synchronizers.
  	if (!State.incremental) {
  		window.setTimeout(function () {
  			let syncResults = new CustomEvent('ed11yResults');
  			document.dispatchEvent(syncResults);
  		}, 0);
  	}

  	if (State.ignoreAll) {
  		State.dismissedCount = State.totalCount + State.dismissedCount;
  		State.errorCount = 0;
  		State.warningCount = 0;
  		State.totalCount = 0;
  	}

  	if (State.incremental && !State.forceFullCheck && !newIncrementalResults()) {
  		State.forceFullCheck = true;
  	}
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
  	if (State.elements.panelNoCover) {
  		State.elements.panelNoCover.forEach(el => {
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
  	if (!State.jumpList || State.jumpList.length === 0 || (State.openTip.button && State.scrollPending === 0)) { // todo always false?
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
  	if (!Options.inlineAlerts) {
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
  				// @todo merge issue #2 blows up in all tests.
  				const theFirstVisibleParent = firstVisibleParent(mark.result.element);
  				console.log(theFirstVisibleParent);
  				targetOffset = theFirstVisibleParent ? theFirstVisibleParent.getBoundingClientRect() : targetOffset;
  				top = targetOffset.top + scrollTop;
  			}
  			let left = targetOffset.left;

  			// TD TD different?
  			if (mark.result.element.tagName === 'IMG') {
  				top = top + 10;
  				left = left + 10;
  			} else {
  				left = Options.inlineAlerts ? left - 34 : left;
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
  				left = Options.inlineAlerts ? left - 34 : left;
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
  		if (!Options.inlineAlerts) {
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
  	if (!Options.inlineAlerts) {
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

  function showResults () {
    buildJumpList();
    // Announce that buttons have been placed.
    document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
    alignButtons();
    if (!Options.inlineAlerts) {
      checkEditableIntersects();
      intersectionObservers();
    }
  }

  const panelJumpTo = function(event) {
  	// Handle jump
  	event.preventDefault();
  	State.toggledFrom = event.target.closest('button');
  	if (!State.open) {
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
      if (State.forceFullCheck) {
        State.forceFullCheck = false;
        resetResults(true);
      } else {
        // Reconnect map
  			Results.length = 0;
        Results.assign(State.oldResults);
        window.setTimeout(function() {
          if ( !State.alignPending ) {
            alignButtons();
            alignPanel();
            State.alignPending = false;
          }
          State.running = false;
        },0);
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
      // Not headless; draw the interface.

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
        UI.showDismissed = UI.panel.querySelector('#ed11y-show-hidden');
        UI.message = UI.panel.querySelector('#ed11y-message');
        window.setTimeout(()=> {
          UI.panelElement.classList.remove('ed11y-preload');
        },0, UI.panel);
        UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Lang._('PANEL_HEADING');
        UI.panel.querySelector('#ed11y-headings-tab .summary-title').textContent = Lang._('OUTLINE');
        UI.panel.querySelector('#ed11y-alts-tab .summary-title').textContent = Lang._('IMAGES');
  			if (!State.english) {
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
          UI.showDismissed.insertAdjacentElement('beforebegin', reportLink);
        }

        // Escape key closes panels.
        const escapeWatch = function (event) {
          if (event.keyCode === 27) {
            if (event.target.closest('ed11y-element-panel') && UI.panelToggle.getAttribute('aria-expanded') === 'true') {
              UI.panelToggle.focus();
              UI.panelToggle.click();
            } else if (event.target.hasAttribute('data-ed11y-open')) {
              if (State.openTip.button) {
                State.toggledFrom.focus();
                State.openTip.button.shadowRoot.querySelector('button').click();
              }
            }
          }
        };
        document.addEventListener('keyup', function (event) {escapeWatch(event); });

        // Decide whether to open the panel on load.
        if (State.ignoreAll ||
          (!Options.inlineAlerts && State.totalCount > 75)
        ) {
          State.showPanel = false;
        } else if (Options.alertMode === 'active' ||
          !Options.userPrefersShut ||
          Options.showDismissed
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
      } else if (!Options.inlineAlerts) { // todo is that the best param?
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

        State.open = true;
        UI.panel.classList.remove('ed11y-shut');
        UI.panel.classList.add('ed11y-active');
        UI.panelToggle.setAttribute('aria-expanded', 'true');
  			const preferredHide = State.totalCount > 0 ? Lang._('buttonHideAlerts') : Lang._('buttonHideChecker');
        UI.panelToggleTitle.textContent = State.english ? preferredHide : Lang._('ALERT_CLOSE');
        // Prepare show hidden alerts button.
  			const preferredDismissHide = State.dismissedCount > 1 ?
  				Lang.sprintf('buttonHideHiddenAlerts', State.dismissedCount)
  				: Lang._('buttonHideHiddenAlert');
        if (State.dismissedCount === 0) {
          // Reset show hidden default option when irrelevant.
          UI.showDismissed.setAttribute('hidden', '');
          UI.showDismissed.setAttribute('data-ed11y-pressed', 'false');
          Options.showDismissed = false;
        } else if (State.dismissedCount === 1) {
  				const show = State.english ?
  					Lang._('buttonShowHiddenAlert')
  					: Lang.sprintf('PANEL_DISMISS_BUTTON', '1');
          UI.showDismissed.querySelector('.ed11y-sr-only').textContent = Options.showDismissed ?
  					preferredDismissHide : show;
          UI.showDismissed.dataset.ed11yPressed = `${Options.showDismissed}`;
  				if (!State.english) {
  					UI.showDismissed.ariaPressed = Options.showDismissed;
  				}
          UI.showDismissed.removeAttribute('hidden');
        } else {
          UI.showDismissed.querySelector('.ed11y-sr-only').textContent = Options.showDismissed ?
  					preferredDismissHide
  					: Lang.sprintf('PANEL_DISMISS_BUTTON', State.dismissedCount);
          UI.showDismissed.dataset.ed11yPressed = `${Options.showDismissed}`;
  				if (!State.english) {
  					UI.showDismissed.ariaPressed = Options.showDismissed;
  				}
          UI.showDismissed.removeAttribute('hidden');
        }

        window.setTimeout(function () {
          if (!State.ignoreAll) {
            requestAnimationFrame(() => showResults());
          }
        }, 0);
      }
      // Update buttons.
      if (State.totalCount > 0 || (Options.showDismissed && State.dismissedCount > 0)) {
        UI.panelToggleTitle.textContent = State.open ? Lang._('buttonHideAlerts') : Lang._('buttonShowAlerts');
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
          if (State.open) {
            UI.panelToggleTitle.textContent = Lang._('buttonHideChecker');
          } else {
            UI.panelToggleTitle.textContent = State.dismissedCount > 1 ?
  						Lang.sprintf('PANEL_DISMISS_BUTTON', State.dismissedCount) :
              Lang._('buttonShowHiddenAlert');
          }
        } else {
          // todo merge: move these inline and just change the class.
          UI.panelToggleTitle.textContent = State.open ? Lang._('buttonHideChecker') : Lang._('buttonShowNoAlert');
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
    Results.forEach((result, i) => {

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
        Results[i].fixedRoot = root.dataset.ed11yRoot;
      }
      Results[i].scrollableParent = closestScrollable(result.element);
      if (Results[i].scrollableParent) {
        // Group these together.
        top = top * 0.000001;
      }
      Results[i].sortPos = top;
    });
    // Sort from bottom to top so focus order after insert is top to bottom.
    Results.sort((a, b) => b.sortPos - a.sortPos);

    Results?.forEach(function (result, i) {
      if (!Results[i].dismissalStatus || Options.showDismissed) {
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

  // Place markers on elements with issues
  function drawResult(result, index) {
    /* old array to new object map:
      // [0] element
      // [1] test
      // [2] content
      // [3] position
      // [4] dismissalKey
      // [5] dismissalStatus
      */
    let mark = document.createElement('ed11y-element-result');
    mark.classList.add('ed11y-element');
    let location;
    let position = 'beforebegin';
    mark.setAttribute('id', 'ed11y-result-' + index);
    mark.setAttribute('data-ed11y-result', index);
    mark.setAttribute('data-ed11y-open', 'false');
    if (!Options.inlineAlerts) {
      location = State.panelAttachTo;
      position = 'beforeend';
      mark.classList.add('ed11y-editable-result');
    } else {
      location = result.element.closest('a, button, [role="button"], [role="link"]');
      if (!location && result.element.shadowRoot) {
        // Must insert outside shadow DOM root.
        location = result.element;
        position = 'beforebegin';
        while (location.parentElement && location.parentElement.shadowRoot) {
          location = location.parentElement;
        }
      }
      if (!location) {
        location = result.element;
        position = result.position;
      }
    }
    location.insertAdjacentElement(position, mark);

    const shadow = mark.attachShadow({ mode: 'open' });

    // Create mark.wrapper with type class
    mark.resultID = mark.dataset.ed11yResult;
    mark.result = Results[mark.resultID];

    mark.wrapper = document.createElement('div');

    mark.dismissable = mark.result.dismissalKey !== false;
    mark.dismissed = !!mark.result.dismissalStatus;
    mark.wrapper.classList.add('ed11y-wrapper', 'ed11y-result-wrapper');
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
    if (!Options.inlineAlerts) {
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
      UI.showDismissed.removeAttribute('hidden');
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
    const zIndex = result.dismissalKey ? 'calc(var(--ed11y-buttonZIndex, 9999) - 2)' : 'calc(var(--ed11y-buttonZIndex, 9999) - 1)';
    el.style.setProperty('z-index', zIndex);
    const outline = result.dismissalKey ?
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
    if (!State.openTip.tip) {
      return;
    }
    const id = State.openTip.tip.dataset.ed11yResult;
    const target = Results[id].element;
    const editable = target.closest('[contenteditable]');
    if (!editable && !target.closest('textarea, input')) {
      if (target.closest('a')) {
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
        alertMessage = Lang._('jumpedToAriaHiddenTip');
      }
      if (firstVisible) {
        // Throw warning that the element cannot be highlighted.
        const tipAlert = State.openTip.tip?.shadowRoot.querySelector('.ed11y-tip-alert');
        tipAlert.textContent = alertMessage;
      }
      if (State.viaJump) {
        let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
        let scrollTarget = Options.inlineAlerts ? button : target;
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
      if (!Options.inlineAlerts) {
        // todo this selector should match the selector that decided where to place the mark
        editableHighlighter(button.dataset.ed11yResult, true, firstVisible); // @todo merge test
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
    if (!State.open) {
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
    let scrollTarget = Options.inlineAlerts ? goto : target;
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
  	let leftAdd = Options.inlineAlerts ? window.scrollX : 0;

  	let buttonOffset = button.getBoundingClientRect();
  	let buttonSize = buttonOffset.width;
  	let buttonLeft = buttonOffset.left + leftAdd;
  	let buttonTop = buttonOffset.top + scrollTop;

  	let containTop = scrollTop;
  	let containLeft = 0;
  	let containWidth = window.innerWidth;
  	let containBottom = window.innerHeight + scrollTop;
  	let absoluteBottom = containBottom;

  	if (!Options.inlineAlerts && result.scrollableParent) {
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
  			buttonOffset = firstVisibleParent.getBoundingClientRect();
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
  	if (!State.scrollTicking && State.scrollPending > 0 && !State.running && State.jumpList && State.open) {
  		State.scrollTicking = true;
  		alignButtons();
  		if (State.openTip.tip) {
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

  function windowResize() {
  	if (UI.panel?.classList.contains('ed11y-active') === true) {
  		alignAlts();
  		alignButtons();
  	}
  	if (State.openTip.button) {
  		alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
  	}
  	alignPanel();
  }

  function intersectionObservers() {

  	State.elements.editable?.forEach(editable => {
  		editable.addEventListener('scroll', function() {
  			// Align tips when scrolling editable container.
  			if (State.openTip.button) {
  				State.scrollPending = State.scrollPending < 2 ? State.scrollPending + 1 : State.scrollPending;
  				requestAnimationFrame(() => updateTipLocations());
  			}
  		});
  	});

  	document.addEventListener('scroll', function() {
  		// Trigger on scrolling other containers, unless it will flicker a tip.
  		if (!Options.inlineAlerts && !State.openTip.button) {
  			State.scrollPending = State.scrollPending < 2 ? State.scrollPending + 1 : State.scrollPending;
  			requestAnimationFrame(() => updateTipLocations());
  		} else if (State.openTip.button) {
  			alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
  		}
  	}, true);

  	document.addEventListener('selectionchange', function() {
  		if (!State.running) ;
  	});
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
  		if (Options.inlineAlerts) {
  			return 1;
  		}
  		if (!node.matches('[contenteditable] *')) {
  			return 0;
  		}
  		if (Options.inlineAlerts) {
  			return true;
  		}
  		const searchList = 'table, h1, h2, h3, h4, h5, h6, blockquote';
  		if (!Options.inlineAlerts &&
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
  				mutation.target.parentElement.matches('[contenteditable] *')) {
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
  			State.alignPending = false;
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

  const enqueueTests = function(queue) {
  	const test = queue.pop();
  	switch (test) {
  		case 'checkHeaders':
  			checkHeaders(Results, Options, State.headingOutline);
  			break
  		case 'checkLinkText':
  			checkLinkText(Results, Options);
  			break
  		case 'checkImages':
  			checkImages(Results, Options);
  			break
  		case 'checkLabels':
  			checkLabels(Results, Options);
  			break
  		case 'checkQA':
  			checkQA(Results, Options);
  			break
  	}
  	if (queue.length > 0) {
  		window.setTimeout(function (queue) {
  			enqueueTests(queue);
  		}, 0, queue);
  	} else {
  		continueCheck();
  	}
  };

  function removeCustomTest() {
  	console.error('Editoria11y has disabled a custom test that is not returning results within 1000ms.');
  	Options.customTestsRemaining = 1;
  	Options.customTests--;
  	if (Options.customTests === 0) {
  		document.removeEventListener('ed11yResume', function () {
  			continueCheck(true);
  		});
  	}
  }

  State.testsRunning = true;
  State.testsRemainng = 0;
  // Toggles the outline of all headers, link texts, and images.
  function checkAll() {
  	if (State.openTip.button) {
  		return false;
  	}
  	State.disabled = false;

  	if (checkRunPrevent()) {
  		disable();
  	}


  	State.customTestsRunning = false;

  	State.roots = [];
  	// @todo merge rewrite when Sa11y releases fixed root support.
  	if (Options.fixedRoots) {
  		Options.fixedRoots.forEach(root => {State.roots.push(root.fixedRoot);});
  	} else {
  		State.roots = document.querySelectorAll(`:is(${Options.checkRoots})`);
  	}
  	// Initialize root areas to check.
  	if (!State.roots && Options.headless === false) {
  		// @todo merge invalid number of arguments.
  		createAlert(`${Lang.sprintf('MISSING_ROOT', Options.checkRoots)}`);
  	}

  	if (State.roots.length === 0) {
  		if (State.onLoad) {
  			console.warn(Lang._('MISSING_ROOT'));
  		}
  		disable();
  		return;
  	}

  	buildElementList();

  	// Call rulesets.
  	let queue = [
  		'checkHeaders',
  		'checkLinkText',
  		'checkImages',
  		'checkLabels',
  		'checkQA',
  	];
  	// Todo after merge: developer and readability tests added via options here.
  	State.testsRemaining = queue.length;
  	enqueueTests(queue);

  	if (State.customTestsRemaining > 0) {
  		removeCustomTest();
  	}

  	if (Options.customTests > 0) {
  		// Pause
  		State.customTestsRunning += Options.customTests;
  		window.setTimeout(function() {
  			if (State.customTestsRemaining > 0) {
  				removeCustomTest();
  			}
  		}, 1500);
  		window.setTimeout(function() {
  			let customTests = new CustomEvent('ed11yRunCustomTests');
  			document.dispatchEvent(customTests);
  		},0);
  	}
  	/*{
  		"element": {},
  		"type": "error",
  		"content": "Empty heading found! To fix, delete this line or change its format from <strong class=\"colour\">Heading 4</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>.",
  		"dismiss": "H4",
  		"dismissAll": false,
  		"isWithinRoot": true,
  		"developer": false,
  		"margin": "0",
  		"dismissalStatus": false,
  		"scrollableParent": false,
  		"sortPos": 5495.38330078125
  		}
  		content
  		dismissalKey
  		dismissalStatus
  		element
  		position
  		scrollableParent
  		sortPos
  		test
  		toggle
  	* */
  	// @todo merge temporary values.
  	// @todo merge handle readability and developer checks.
  }

  function continueCheck(customCheck = false) {
  	if (customCheck) {
  		State.customTestsRunning--;
  	}
  	// change to only countering fro custom tests
  	if (State.customTestsRemaining > 0) {
  		// Tests still in progress.
  		return;
  	}
  	for (let i = Results.length - 1; i >= 0;) {
  		if (Results[i].type === 'good') {
  			Results.splice(i, 1);
  		} else {
  			Results[i].position = 'beforebegin'; // @todo merge compute.
  			if (Results[i].dismiss) {
  				Results[i].dismissalKey = Results[i].dismiss;
  			}
  			Results[i].test = 'altNull'; // @todo wait merge remove when Sa11y is ready
  		}
  		i = i - 1;
  	}
  	if (typeof UI.panelToggle.querySelector === 'function') {
  		UI.panelToggle.querySelector('.ed11y-sr-only').textContent = Lang._('MAIN_TOGGLE_LABEL');
  	}
  	countAlerts();
  	updatePanel();
  	window.setTimeout(() => {
  		if (Options.watchForChanges) {
  			State.elements.editable?.forEach(editable => {
  				if (!editable.matches('.drag-observe')) {
  					editable.classList.add('drag-observe');
  					editable.addEventListener('drop', () => {
  						// This event does not bubble.
  						State.forceFullCheck = true;
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
  }

  function visualize () {
  	if (!UI.panel) {
  		return;
  	}
  	if (Options.inlineAlerts) {
  		findElements('reset', 'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', false);
  		State.elements.reset?.forEach((el) => el.remove());
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
  }

  function showHeadingsPanel () {
  	// Visualize the document outline

  	let panelOutline = UI.panel.querySelector('#ed11y-outline');
  	if (State.headingOutline.length) {
  		panelOutline.innerHTML = '';
  		State.headingOutline.forEach((result, i) => {
  			// Todo: draw these in editable mode.
  			if (Options.inlineAlerts) {
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
  			userText.textContent = result.text;
  			let link = document.createElement('a');
  			if (Options.inlineAlerts) {
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
  				if (Options.inlineAlerts) {
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

  	// @todo merge is this going to fail again? Should it use a different if?
  	if (typeof (UI.panel) === 'object') {
  		UI.panel?.classList.add('ed11y-shut');
  		UI.panel?.classList.remove('ed11y-active');
  		UI.panelToggle?.setAttribute('aria-expanded', 'false');
  		if (!Options.showDismissed && typeof UI.showDismissed === 'function') {
  			UI.showDismissed.setAttribute('data-ed11y-pressed', 'false');
  			UI.showDismissed.querySelector('.ed11y-sr-only').textContent = State.dismissedCount === 1 ?
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

  const showAltPanel = function () {
  	// visualize image alts
  	let altList = UI.panel.querySelector('#ed11y-alt-list');
  	UI.imageAlts = Elements.Found.Images.map((image) => {
  			const match = Results.find((i) => i.element === image);
  			return match && {
  				element: image,
  				type: match.type,
  				dismiss: match.dismiss,
  				developer: match.developer,
  			};
  		}).filter(Boolean);

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
  			// @todo merge remove; this is the Sa11y logic:
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

  			if (Options.inlineAlerts) {
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
  			li.classList.add(image.type);
  			let img = document.createElement('img');
  			img.setAttribute('src', getBestImageSource(image.element));
  			img.setAttribute('alt', '');

  			if (Options.inlineAlerts) {
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
  		if (Options.inlineAlerts) {
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


  function dismissThis (dismissalType, all = false) {
  	// Find the active tip and draw its identifying information from the result list
  	let removal = State.openTip;
  	let id = removal.tip.dataset.ed11yResult;
  	let test = Results[id].test;

  	if (all) {
  		Results.forEach((result) => {
  			if (result.test === test && result.dismissalStatus !==dismissalType) {
  				dismissOne(dismissalType, test, result.dismissalKey);
  			}
  		});
  	} else {
  		let dismissalKey = prepareDismissal(Results[id].dismissalKey);
  		dismissOne(dismissalType, test, dismissalKey);
  	}

  	// Remove tip and reset borders around element
  	resetClass(['ed11y-hidden-highlight', 'ed11y-ring-red', 'ed11y-ring-yellow']);
  	removal.tip?.parentNode?.removeChild(removal.tip);
  	// @todo merge found this commented out -- is it needed or can it be removed?
  	//removal.button?.parentNode?.removeChild(removal.button);

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
  	Options.showDismissed = !(Options.showDismissed);
  	reset();
  	State.showPanel = true;
  	checkAll();

  	UI.showDismissed.setAttribute('data-ed11y-pressed', (!!Options.showDismissed).toString());
  	window.setTimeout(function() {
  		UI.showDismissed.focus();
  	}, 0);
  }

  function togglePanel () {
  	State.ignoreAll = false;

  	if (!State.doubleClickPrevent) {
  		// Prevent clicks piling up while scan is running.
  		if (State.running !== true) {
  			State.running = true;
  			// Re-scan each time the panel reopens.
  			if (UI.panel.classList.contains('ed11y-shut') === true) {
  				State.onLoad = false;
  				State.incremental = false;
  				State.showPanel = true;
  				if (State.dismissedCount > 0 && State.warningCount === 0 && State.errorCount === 0) {
  					Options.showDismissed = false;
  					toggleShowDismissals();
  				} else {
  					checkAll();
  				}
  				Options.userPrefersShut = false;
  				localStorage.setItem('editoria11yShow', '1');
  			}
  			else {
  				UI.panelToggleTitle.textContent = State.totalCount > 0 ? Lang._('buttonShowAlerts') : Lang._('buttonShowNoAlert');
  				Options.showDismissed = false;
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
  	if (State.open && !State.closedByDisable) {
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
  	// @todo should we also flush things like State.elements.altMark?
  	pauseObservers();
  	resetResults();
  	resetPanel();
  	State.incremental = false;
  	State.running = false;
  	State.showPanel = false;
  	State.open = false;
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
      buttonShowAlerts: 'Show accessibility alerts',
      buttonShowNoAlert: 'Show accessibility checker',
      buttonHideChecker: 'Hide accessibility checker',
      buttonHideAlerts: 'Hide accessibility alerts',

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
      jumpedToAriaHiddenTip: 'The item with this issue may be invisible or off screen.', // @todo merge fall back to NOT_VISIBLE?
  		ACC_NAME_TIP: '', // @todo merge pass label instead, swap if not EN
  		LINK_TIP: '',
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

      // Tooltips for heading tests =========================

  //    headingExample : `<ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>`,

    },
  	tests: {
  		// todo: update Drupal localization file.
  		headingLevelSkipped : {
  			title: 'Manual check: was a heading level skipped?',
  		},
  		HEADING_SKIPPED_LEVEL: `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            <p>This heading skipped from level %(prevLevel) to level %(level). From a screen reader, this sounds like content is missing.</p>
            <p><strong>To fix:</strong> adjust levels to form an accurate outline, without gaps.</p>
            `,

  		headingEmpty : {
  			title: 'Heading tag without any text',
  		},
  		HEADING_EMPTY: `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            <p>Empty headings create confusing gaps in this outline: they could mean the following content is still part of the previous section, or that the text was unpronounceable for some reason.</p>
            <p><strong>To fix:</strong> add text to this heading, or delete this empty line.</p>
            `,

  		headingIsLong : {
  			title: 'Manual check: long heading',
  		},
  		HEADING_LONG: `<p>Headings should be brief and clear. Assistive devices use them as a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for the page. The numbers indicate indents in a nesting relationship:</p>  
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            <p><strong>To fix:</strong> shorten this heading if possible, or remove the heading style if it was only applied to this text to provide visual emphasis.</p>
            `,

  		blockquoteIsShort : {
  			title: 'Manual check: is this a blockquote?',
  		},
  		QA_BLOCKQUOTE: '<p>Blockquote formatting tells screen readers that the text should be announced as a quotation. This was flagged because short blockquotes are <em>sometimes</em> actually <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">headings</a>. If this is a heading and not a quotation, use heading formatting instead, so this appears in the page outline.</p>',

  		// Tooltips for image tests =========================

  		altMissing : {
  			title: 'Image has no alternative text attribute',
  		},
  		MISSING_ALT: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.</p>
            <p><strong>To fix:</strong> either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>
            <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

  		altNull : {
  			title: 'Manual check: image has no alt text',
  		},
  		IMAGE_DECORATIVE: `<p>Unless this image is purely decorative (a spacer icon or background texture), an alt should probably be provided. Photos in page content <strong>almost always need alt text.</strong> Since many screen reader users can see there is an image present, it can be very confusing to move the cursor across the place on the page where an image is visible, but hear nothing.</p>
        <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

  		altURL : {
  			title: 'Image\'s text alternative is a URL',
  		},
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

  		altMeaningless : {
  			title: 'Alt text is meaningless',
  		},
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

  		altMeaninglessLinked : {
  			title: 'Linked alt text is meaningless',
  		},
  		LINK_PLACEHOLDER_ALT: `<p>When a link includes an image, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="opens in new tab">the image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination, even out of context.</p>
           <p>This image's alt text is "%(alt)," which probably does not describe this link.</p>`
  		,

  		altURLLinked : {
  			title: 'Linked image\'s text alternative is a URL',
  		},
  		LINK_ALT_FILE_EXT: `<p>This image's alt text is "%(alt)," which is probably a filename.</p>
        <p>When a link is wrapped around an image and there is no other text, the <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination; a URL (usually pronounced by the screen reader one letter at a time) does not.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "H T T P S colon forward slash forward slash example dot com forward slash aye bee oh you tee you ess</li>
            </ul>`, // @todo merge with Adam's wording.

  		altImageOf : {
  			title: 'Manual check: possibly redundant text in alt',
  		},
  		SUS_ALT: `<p>This image's alt text is "%(alt)," which mentions that this image is an image.</p>
        <p>Screen readers announce they are describing an image when reading alt text, so 
            phrases like "image of" and "photo of" are usually redundant in alt text; the screen reader user hears "image: image of something."</p>
            <p>Note that this is OK if the format is referring to the <strong>content</strong> of the image:</p>
            <ul><li>Format is redundant: "<em>photo of</em> a VHS tape"</li>
            <li>Format is relevant: "<em>photo of</em> a VHS tape in a photo album being discussed in a history class"</li></ul>`,

  		altImageOfLinked : {
  			title: 'Manual check: possibly redundant text in linked image',
  		},
  		LINK_SUS_ALT: `<p>This image's alt text is "%(alt)," which mentions that this image is an image.</p>
        <hr><p>Links should clearly and concisely describe their destination. Since words like "image," "graphic" or "photo" are already redundant in text alternatives (screen readers already identify the image as an image), their presence in a linked image usually means the image's text alternative is <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">describing the image instead of the link</a>.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "Image of five people jumping"</li>
            </ul>`,

  		altDeadspace : {
  			title: 'Image\'s text alternative is unpronounceable',
  		},
  		ALT_UNPRONOUNCEABLE: `<p>This image's alt text is "%(alt)," which only contains unpronounceable symbols and/or spaces. Screen readers will announce that an image is present, and then pause awkwardly: "image: ____."</p>
        <p><strong>To fix:</strong> add a descriptive alt, or provide a <em>completely</em> empty alt (alt="") if this is just an icon or spacer, and screen readers should ignore it.</p>
            <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

  		altEmptyLinked : {
  			title: 'Linked Image has no alt text',
  		},
  		LINK_IMAGE_NO_ALT_TEXT: `<p>When a link is wrapped around an image, the image's alt text <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">provides the link's title for screen readers</a>.</p>
        <p><strong>To fix:</strong> set this image's alternative text to something that describes the link's destination, or add text next to the image, within the link.</p>`,
  		// @todo MISSING_ALT_LINKED too?

  		altLong : {
  			title: 'Manual check: very long alternative text',
  		},
  		IMAGE_ALT_TOO_LONG: `<p>Image text alternatives are announced by screen readers as a single run-on sentence; listeners must listen to the entire alt a second time if they miss something. If this cannot be reworded to something succinct, it is better to use the alt to reference a <em>visible</em> <a href="https://www.w3.org/WAI/tutorials/images/complex/">text alternative for complex images</a>. For example:</p>
            <ul><li>"Event poster; details follow in caption"</li>
            <li>"Chart showing our issues going to zero; details follow in table"</li></ul>
            This image's alt text is: <em>%(alt)</em>
            `,

  		altLongLinked : {
  			title: 'Manual check: very long alternative text in linked image',
  		},
  		LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">The alt text on a linked image is used to describe the link destination</a>. Links should be brief, clear and concise, as screen reader users often listen to the list of links on the page to find content of interest. Long alternative text inside a link often indicates that the image's text alternative is describing the image instead rather than the link.</p>
        This image's alt text is: <em>%(alt)</em>`,

  		altPartOfLinkWithText : {
  			title: 'Manual check: link contains both text and an image', // 2.3.10.
  		},
  		LINK_IMAGE_ALT_AND_TEXT: `<p>Screen readers will <a href="https://www.w3.org/WAI/tutorials/images/functional/">include the image's alt text when describing this link</a>.</p>
            <p>Check that the combined text is concise and meaningful:<br>"<em><strong>%(alt)</strong></em>"</p>
            <p></p>
            <ul>
                <li>Keep alts that add relevant meaning:<br>"Buy (A Tigers v. Falcons ticket)."</li>
                <li>Edit unhelpful or irrelevant alts:<br>"Buy (A piece of paper with team logos on it)."</li>
                <li>Remove unnecessary alts:<br>"Buy Tigers v. Falcons tickets (A Tigers v. Falcons ticket)."</li>
            </ul>
        `,

  		// @todo merge test: separate tests for no text and all text ignored:
  		linkNoTextExample: '<p>Screen readers will either say nothing when they reach this link: <br><em>"Link, [...awkward pause where the link title should be...],"</em><br>or read the URL: <br><em>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</em></p>',

  		linkTextIgnored: (ignoredText) => `
    <p>Screen readers will only read the text of the link type indicator on this link:<br>
    <em>"<strong>%(ignoredText)</strong>"</em></p>
    `,

  		linkNoText : {
  			title: 'Link with no accessible text',
  		},
  		LINK_EMPTY:
  			`<p>This link is either a typo (a linked space character), or a linked image with no text alternative.</p>
        <p>Screen readers will either say nothing when they reach this link: <br><em>"Link, [...awkward pause where the link title should be...],"</em><br>or read the URL: <br><em>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</em></p>
        <p><strong>To fix:</strong></p>
        <ul><li>If this a typo, delete it. Note that typo links can be hard to see if they are next to a "real" link: one will be on the text, one on a space.</li><li>If it is a real link, add text to describe where it goes.</li>`,

  		linkTextIsURL : {
  			title: 'Manual check: is this link text a URL?',
  		},
  		LINK_URL: `<p>This link's text is:<br> <strong>%(text)</strong></p>
        <p><a href="https://webaim.org/techniques/hypertext/link_text">Links should be meaningful and concise</a>. Readers often skim by link titles. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
         <p>A linked URL breaks this pattern; the reader has to read the preceding paragraph to figure out the link's purpose from context.</p>
            <ul>
                <li>Meaningful and concise link: "Tips for writing meaningful links"</li>
                <li>Linked URL, as pronounced by a screen reader: "H T T P S colon forward-slash forward-slash example dot com forward-slash tips forward-slash meaningful-links"</li>
            </ul>`,

  		linkTextIsGeneric : {
  			title: 'Manual check: is this link meaningful and concise?',
  		},
  		LINK_STOPWORD: `<p>This link's text is: <strong>%(text)</strong></p>
        <p>Readers skim for links. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
                <p>Generic links like "click here," "read more" or "download" expect the reader be reading slowly and carefully enough to figure out each link's purpose from context. Few readers do this, so click-through rates on meaningless links are extremely poor.</p>
                <ul>
                <li>Ideal: "Learn about <a href="https://webaim.org/techniques/hypertext/link_text">meaningful links"</a></strong></li>
                <li>Not meaningful: "Click <a href="https://webaim.org/techniques/hypertext/link_text">here</a> to learn about meaningful links."</li>
                <li>Not concise: "<a href="https://webaim.org/techniques/hypertext/link_text">Click here to learn more about meaningful links</a>"</li>
                </ul>
                `,

  		linkDocument : {
  			title : 'Manual check: is the linked document accessible?',
  		},
  		QA_PDF: `<p>Many mobile and assistive device users struggle to read content in PDFs. PDFs generally do not allow for changing font sizes, and often contain features that are incompatible with screen readers.</p>
        <p>Ideally make the content of this linked PDF available on a Web page or in an editable document, and only link to this PDF as a "printable" alternative. If this PDF is the only way you are providing to access this content, you will need to <a href='https://webaim.org/techniques/acrobat/' target='_blank'>manually check that the PDF is well-structured</a>, with headings, lists and table headers, and provides alt text for its images.</p>`,

  		linkNewWindow : {
  			title: 'Manual check: is opening a new window expected?',
  		},
  		LINK_NEW_TAB: `<p>Readers can always choose to open a link a new window. When a link forces open a new window, it can be confusing and annoying, especially for assistive device users who may wonder why their browser's "back" button is suddenly disabled.</p>
                <p>There are two general exceptions:</p>
                <ul>
                    <li>When the user is filling out a form, and opening a link in the same window would cause them to lose their work.</li>
                    <li>When the user is clearly warned a link will open a new window.</li>
                </ul>
                <p><strong>To fix:</strong> set this link back its default target, or add a screen-reader accessible warning (text or an icon with alt text).</p>
                `,

  		// Tooltips for Text QA ===============================

  		tableNoHeaderCells : {
  			title: 'Table has no header cells',
  		},
  		TABLES_MISSING_HEADINGS: `
                <p>To fix:</p>
                <ul><li>If this table contains data that is meaningfully organized by row and column, edit the table's properties and specify whether headers have been placed in the first row, column or both. This lets screen reader users hear the headers repeated while navigating the content.</li>
                <li>If this table does not contain rows and columns of data, but is instead being used for visual layout, remove it. Tables overflow the page rather than reflowing on mobile devices, and should only be used when the horizontal relationships are necessary to understand the content.</li></ul>
            `,

  		tableContainsContentHeading : {
  			title: 'Content heading inside a table',
  		},
  		TABLES_SEMANTIC_HEADING: `<p>To fix: remove heading formatting. Use row and column headers instead.</p>
        <p>Content headings ("Heading 1", "Heading 2") form a navigable table of contents for screen reader users,  
        labelling all content <strong>until the next heading</strong>. Table headers label specific columns or rows within a table.</p> 
            <p></p>
            <table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">To illustrate: a <strong>table</strong> header in cell 2 would only label its column: cell B. <br><br>
            A <strong>content</strong> heading in cell 2 would label all subsequent text, reading from left to right: cells 3, A, B and C, as well as this text!</td></tr>
            <tr><td>A</td><td>B</td><td>C</td></table>
            `,

  		tableEmptyHeaderCell : {
  			title: 'Empty table header cell',
  		},
  		TABLES_EMPTY_HEADING: `
                <p>When exploring tables, screen readers repeat table header cells as needed to orient users. 
                Without headers, it is very easy to get lost; screen reader users have to count columns and rows and try to remember which columns went with which rows.</p>
                <p><strong>To fix:</strong> make sure each header cell in this table contains text.</p>
            `,

  		textPossibleList : {
  			title: 'Manual check: should this have list formatting?',
  		},
  		QA_FAKE_LIST: `<p>List formatting is structural:</p> 
            <ol><li>List formatting indents and reflows on overflow. Text aligns vertically with the line above it.</li>
            <li>Lists are machine-readable. Screen readers can orient their users, announcing this as "list item, 2 of 3."</li></ol>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;3. But this third item is just a sentence with a number in front of it. It wraps incorrectly, and screen readers do not know it is related to the other items in the list.</p>
            <p><strong>To fix:</strong> if this "%(text)" is part of a list, replace it with list formatting.</p>
            `,

  		textPossibleHeading : {
  			title: 'Manual check: should this be a heading?',
  		},
  		QA_FAKE_HEADING: `<p>If this all-bold line of text is functioning as a heading for the following text rather than a visual emphasis, replace the bold formatting with the appropriately numbered heading. Otherwise, dismiss this alert.</p>
        <p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for assistive devices. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            `,

  		textUppercase : {
  			title: 'Manual check: is this uppercase text needed?',
  		},
  		QA_UPPERCASE: `<p>UPPERCASE TEXT CAN BE MORE DIFFICULT TO READ FOR MANY PEOPLE, AND IS OFTEN INTERPRETED AS SHOUTING.</p>
         <p>Consider using sentence case instead, and using bold text or font changes for visual emphasis, or structural formatting like headings for emphasis that will also be announced by screen readers.</p>`,

  		embedVideo : {
  			title: 'Manual check: is this video accurately captioned?',
  		},
  		EMBED_VIDEO: `<p>If a recorded video contains speech or meaningful sounds, it must <a href="https://www.w3.org/WAI/media/av/captions/" title="Opens in new window">provide captions</a>.</p>
            <p>Note that automatic, machine-generated captions must be proofread, and speaker identifications must be added, before being considered an equal alternative.</p>`,

  		embedAudio : {
  			title: 'Manual check: is an accurate transcript provided?',
  		},
  		EMBED_AUDIO: `<p>If this audio contains speech, a <a href="https://www.w3.org/WAI/media/av/transcribing/" title="Opens in new window">text alternative</a> must be provided on this page or linked.</p>
            <p>Note that automatic, machine-generated transcripts must be proofread, and speaker identifications must be added, before being considered an equal alternative</p>`,

  		embedVisualization : {
  			title: 'Manual check: is this visualization accessible?',
  		},
  		EMBED_DATA_VIZ: `<p>Visualization widgets are often difficult or impossible for assistive devices to operate, and can be difficult to understand for readers with low vision or colorblindness.</p>
            <p>Unless this particular widget has high visual contrast, can be operated by a keyboard and described by a screen reader, assume that an alternate format (text description, data table or downloadable spreadsheet) should also be provided.</p>`,

  		embedCustom : {
  			title: 'Manual check: is this embedded content accessible?',
  		},
  		EMBED_GENERAL: '<p>Please make sure images inside this embed have alt text, videos have captions, and interactive components can be <a href=\'https://webaim.org/techniques/keyboard/\'>operated by a keyboard</a>.</p>',
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
      if (State.openTip.button) {
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
      if (Options.inlineAlerts) {
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
        if (Options.inlineAlerts) {
          this.result.element.classList.add(highlightOutline);
        }
        requestAnimationFrame(()=>alignTip(this.toggle, this.tip, 4, true));
        if (!State.jumpList) {
          buildJumpList();
        }
        State.lastOpenTip = Number(this.getAttribute('data-ed11y-jump-position'));
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
        if (!State.open) {
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
        let issues = !!result.type;
        wrapper.classList.add('issue' + issues);
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

      this.dismissable = this.result.dismissalKey !== false;
      this.dismissed = !!this.result.dismissalStatus;
      this.wrapper.classList.add('ed11y-tip-wrapper', 'ed11y-wrapper');
      this.wrapper.setAttribute('aria-label',
        `${Lang._('ALERT_TEXT')}
        ${this.issueIndex + 1}`);

      this.addEventListener('mouseover', this.handleHover);

      UI.attachCSS(this.wrapper);

      this.tip = document.createElement('div');
      this.tip.classList.add('tip');

      let content = document.createElement('div');
      content.classList.add('content');
  		if (this.result.content.includes('class="title"')) {
  			// Sent by Ed11y
  			//this.heading = document.createElement('div');
  			//this.heading.classList.add('title');
  			//this.heading.setAttribute('tabindex', '-1');
  			//this.heading.innerHTML = M[this.result.test].title;
  			//content.append(this.heading);
  			//const alertBox = document.createElement('div');
  			//alertBox.classList.add('ed11y-tip-alert');
  			//this.heading.insertAdjacentElement('afterbegin', alertBox);
  			content.innerHTML = this.result.content;
  		} else {
  			// Sent by Sa11y
  			let innerContent = document.createElement('div');
  			const sentences = this.result.content.split('.');
  			const firstSentence = document.createElement('div');
  			firstSentence.innerHTML = sentences.shift() + '.';
  			firstSentence.classList.add('title');
  			firstSentence.setAttribute('tabindex', '-1');
  			innerContent.append(firstSentence);
  			const theRest = document.createElement('div');
  			theRest.innerHTML = sentences.join('.');
  			innerContent.appendChild(theRest);
  			content.append(innerContent);
  		}
      /**/


      if (!Options.inlineAlerts || Options.editLinks) {
        const editBar = document.createElement('div');

        if (!Options.inlineAlerts) {
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
        if (Options.showDismissed && this.dismissed) {

          // Check if user has permission to reset this alert.
          let okd = State.dismissedAlerts[Options.currentPage][this.result.test][this.result.dismissalKey] === 'ok';
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
        this.prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 -10 30 120"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="m40 100,-50 -50 50-50 50"></path></svg>';
        this.prev.addEventListener('click', (event) => {
          event.preventDefault();
          jumpTo(false);
        });
        this.navBar.append(this.prev);

        this.next = document.createElement('button');
        this.next.classList.add('ed11y-tip-next');
        this.next.setAttribute('title', `${Lang._('SKIP_TO_ISSUE')} ${this.issueNext}`);
        this.next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 120 120" width="10"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="m30 00 50 50-50 50"></path></svg>';
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
          let toggle = getElements('ed11y-element-result[data-ed11y-open="true"]', 'document');
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

  function preProcessOptions(userOptions) {
  	Object.assign(Options, userOptions);

  	if (!userOptions.checkRoots) {
  		Options.checkRoots = document.querySelector('main') !== null ? 'main' : 'body'; // needed or redundant?
  	}

  	/*
  	* Options translation
  	* */
  	Options.headless = userOptions.alertMode === 'headless';
  	Options.customChecks = userOptions.customTests > 0 && !userOptions.customChecks ? 'listen' : false; // @todo merge test.

  	// Check for document types.
  	if (userOptions.panelAttachTo) {
  		State.panelAttachTo = userOptions.panelAttachTo;
  	}

  	// @todo merge: Custom embed test might need to be converted to a custom test in the build.

  	/* *********** */
  	/* Theme setup */
  	/* *********** */
  	Theme.push = Options[Options.theme];
  	Theme.baseFontSize = Options.baseFontSize;
  	Theme.buttonZIndex = Options.buttonZIndex;
  	Theme.baseFontFamily = Options.baseFontFamily;

  	let cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`];
  	if (!userOptions.cssUrls) {
  		const cssLink = document.querySelector('link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]');
  		if (cssLink) {
  			cssUrls = [cssLink.getAttribute('href')];
  		} else {
  			console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
  		}
  	}
  	const cssBundle = document.createElement('div');
  	cssBundle.classList.add('ed11y-style');
  	cssBundle.setAttribute('hidden','');
  	cssUrls?.forEach( sheet => {
  		const cssLink = document.createElement('link');
  		cssLink.setAttribute('rel', 'stylesheet');
  		// @todo merge possibly lost some preload functionality.
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
  }

  function postProcessOptions(userOptions) {

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
  	if (Options.ignoreElements) {
  		const elementSelectors = Options.containerIgnore.split(',').map((item) => item.trim());
  		Constants.Exclusions.Container = Constants.Exclusions.Container.concat(elementSelectors);
  	}

  	State.english = Lang.langStrings.LANG_CODE.startsWith('en');


  	// Undo Sa11y overrides in constants.js.
  	//Constants.Global.documentSources = option.checks.QA_DOCUMENT.sources;
  	//Constants.Global.videoSources = option.checks.EMBED_VIDEO.sources;
  	//Constants.Global.AudioSources = option.checks.EMBED_AUDIO.sources;
  	//Constants.Global.dataVizSources = option.checks.EMBED_DATA_VIZ.sources;
  	//Constants.Global.AllEmbeddedContent = `${Constants.Global.VideoSources}, ${Constants.Global.AudioSources}, ${Constants.Global.VisualizationSources}`;

  	State.currentPage = userOptions.currentPage ? userOptions.currentPage : window.location.currentPage;

  	Object.assign(Theme, Options[Options.theme]);
  	Theme.baseFontSize = Options.baseFontSize;
  	Theme.buttonZIndex = Options.buttonZIndex;
  	Theme.baseFontFamily = Options.baseFontFamily;

  	if (Options.currentPage === false) {
  		Options.currentPage = window.location.pathname;
  	}


  	if (!Options.linkStringsNewWindows) {
  		Options.linkStringsNewWindows = Lang._('linkStringsNewWindows');
  	}
  	// @todo CMS merge remove wpadminbar from defaults and update wp module.
  	/*Exclusions.Container = ['#wpadminbar', '#wpadminbar *', ...exclusions];
  	if (option.containerIgnore) {
  		const containerSelectors = option.containerIgnore.split(',').map((item) => item.trim());
  		Exclusions.Container = Exclusions.Container.concat(
  			containerSelectors.flatMap((item) => [`${item} *`, item]),
  		);
  	}*/

  	// @todo merge re-implement: these get destroyed in constants.js
  	//console.log( Options.documentLinks);
  	//console.log(Constants.Global.checks.QA_DOCUMENT.sources);
  	// Todo need to look at checks.QA_DOCUMENT.sources.
  	if ( userOptions['documentLinks']) { // @todo merge needed?
  		Constants.Global.documentSources = userOptions['documentLinks'] ?
  			userOptions['documentLinks']
  			: Options.checks.QA_DOCUMENT.sources;
  	}
  	//Constants.Global.documentSources = userOptions.

  	//ed11yDefaults.checks.QA_DOCUMENT.sources = 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']'
  	//ed11yDefaults.checks.EMBED_VIDEO.sources = 'video, [src*="youtube.com"], [src*="brightcove.com"], [src*="dailymotion.com"], [src*="panopto.com"], [src*="Video"], [src*="video"], [src*="vimeo.com"], [src*="watch"], [src*="wistia.com"], [src*="vidyard.com"], [src*=yuja.com]';

  	/*
  	* video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"], [src*="video"], [src*="[src*="youtube.com"]"], [src*="[src*="brightcove.com"]"], [src*="[src*="dailymotion.com"]"], [src*="[src*="panopto.com"]"], [src*="[src*="Video"]"], [src*="[src*="video"]"], [src*="[src*="vimeo.com"]"], [src*="[src*="watch"]"], [src*="[src*="wistia.com"]"], [src*="[src*="vidyard.com"]"], [src*="[src*=yuja.com]"]
  	* */

  	Object.assign(Lang.langStrings, ed11yLang.strings); // todo after merge convert to new syntax.
  	if (Lang.langStrings.LANG_CODE.startsWith('en')) {
  		// temporary conversion until Sa11y has test keys.
  		let oldTitle = '';
  		const overrides = Object.entries(ed11yLang.tests);
  		for(let i = 0; i < overrides.length; i++) {
  			if (typeof overrides[i][1] === 'object') {
  				oldTitle = overrides[i][1]['title'];
  			} else {
  				Lang.langStrings[overrides[i][0]] = `<div class="title" tabindex="-1"><div class="ed11y-tip-alert"></div>${oldTitle}</div>${overrides[i][1]}`;
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

  	// Convert the container ignore user option to a CSS :not selector.
  	// @todo merge get this from the global.
  	State.ignore = Options.containerIgnore ? `:not(${Options.containerIgnore})` : '';

  }

  function firstCheck (userOptions) {
  	if (State.once) {
  		console.error('double init');
  		return;
  	}
  	State.once = true;

  	// Initialize global constants and exclusions.
  	preProcessOptions(userOptions);
  	Constants.initializeRoot(Options.checkRoots, Options.checkRoots);
  	Constants.initializeGlobal(Options);
  	// Constants.initializeReadability(Options);
  	Constants.initializeExclusions(Options);
  	postProcessOptions(userOptions);
  	customElements.define('ed11y-element-alt', Ed11yElementAlt);
  	customElements.define('ed11y-element-result', Ed11yElementResult);
  	customElements.define('ed11y-element-heading-label',
  		Ed11yElementHeadingLabel);
  	customElements.define('ed11y-element-panel', Ed11yElementPanel);
  	customElements.define('ed11y-element-tip', Ed11yElementTip);
  	console.log(Constants);

  	// Once document has fully loaded.
  	documentLoadingCheck(() => {
  		if (checkRunPrevent()) {
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
  		});
  		window.addEventListener('click', () => {
  			State.interaction = true;
  		});
  		window.addEventListener('resize', function () { windowResize(); });
  		// Move toggles when something expands or collapses.
  		const mightExpand = document.querySelectorAll('[aria-expanded], [aria-controls]');
  		mightExpand?.forEach(expandable => {
  			expandable.addEventListener('click', () => {
  				window.setTimeout(() => {
  					windowResize();
  				}, 333);
  			});
  		});

  	});
  }

  class Ed11y {

    constructor(userOptions) {

  		State.version = '3.0.0';

      if (CSS.supports('selector(:has(body))')) {
        firstCheck(userOptions);
      }

      /* Export exposed interfaces */
      //this.checkAll = checkAll();
  		this.version = State.version;

    }
  }

  exports.Ed11y = Ed11y;
  exports.Lang = Lang;
  exports.Options = Options;
  exports.Results = Results;
  exports.State = State;
  exports.Theme = Theme;
  exports.UI = UI;
  exports.checkAll = checkAll;
  exports.computeAccessibleName = computeAccessibleName;
  exports.getElements = getElements;
  exports.incrementalCheck = incrementalCheck;
  exports.prepareDismissal = prepareDismissal;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
