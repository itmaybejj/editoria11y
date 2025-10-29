
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
const defaultOptions = {
  // Target area to check
  checkRoot: 'body',
  fixedRoots: false,

  // Exclusions
  containerIgnore: '.sa11y-ignore',
  contrastIgnore: '.sr-only',
  outlineIgnore: '',
  headerIgnore: '',
  headerIgnoreSpan: '',
  headerIgnoreStrings: '',
  imageIgnore: '',
  linkIgnore: '',
  linkIgnoreSpan: '',
  linkIgnoreStrings: '',

  // Control panel settings
  aboutContent: '',
  panelPosition: 'right',
  showMovePanelToggle: true,
  checkAllHideToggles: false,
  developerChecksOnByDefault: false,

  // Page outline
  showHinPageOutline: false,
  showTitleInPageOutline: true,

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
  readabilityPlugin: true,
  readabilityRoot: 'body',
  readabilityIgnore: '',

  // Contrast
  contrastPlugin: true,
  contrastAAA: false,
  contrastAPCA: false,

  // Other plugins
  customChecks: false,
  linksAdvancedPlugin: true,
  formLabelsPlugin: true,
  embeddedContentPlugin: true,
  developerPlugin: true,
  externalDeveloperChecks: false,
  colourFilterPlugin: true,
  exportResultsPlugin: false,

  // Shared properties for some checks
  susAltStopWords: '',
  linkStopWords: '',
  extraPlaceholderStopWords: '',
  imageWithinLightbox: '',
  ignoreContentOutsideRoots: false,

  // All checks
  checks: {
    // Heading checks
    HEADING_SKIPPED_LEVEL: true,
    HEADING_EMPTY_WITH_IMAGE: true,
    HEADING_EMPTY: true,
    HEADING_FIRST: true,
    HEADING_LONG: {
      maxLength: 170,
    },
    HEADING_MISSING_ONE: true,

    // Image checks
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

    // Link checks
    DUPLICATE_TITLE: {
      dismissAll: true,
    },
    LINK_EMPTY_LABELLEDBY: true,
    LINK_EMPTY_NO_LABEL: true,
    LINK_STOPWORD: true,
    LINK_STOPWORD_ARIA: true,
    LINK_SYMBOLS: true,
    LINK_CLICK_HERE: true,
    LINK_DOI: {
      dismissAll: true,
    },
    LINK_URL: {
      maxLength: 40,
    },
    LINK_LABEL: {
      dismissAll: true,
    },
    LINK_EMPTY: true,
    LINK_IDENTICAL_NAME: {
      dismissAll: true,
    },
    LINK_NEW_TAB: {
      dismissAll: true,
    },
    LINK_FILE_EXT: true,

    // Form labels checks
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
    QA_STRONG_ITALICS: true,
    QA_IN_PAGE_LINK: true,
    QA_DOCUMENT: {
      sources: '',
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
    QA_UNDERLINE: true,
    QA_SUBSCRIPT: true,
    QA_NESTED_COMPONENTS: {
      sources: '',
    },
    QA_JUSTIFY: true,
    QA_SMALL_TEXT: true,

    // Meta checks
    META_LANG: true,
    META_SCALABLE: true,
    META_MAX: true,
    META_REFRESH: true,

    // Developer checks
    DUPLICATE_ID: true,
    META_TITLE: true,
    UNCONTAINED_LI: true,
    TABINDEX_ATTR: true,
    HIDDEN_FOCUSABLE: true,
    LABEL_IN_NAME: true,
    BTN_EMPTY: true,
    BTN_EMPTY_LABELLEDBY: true,
    BTN_ROLE_IN_NAME: true,

    // Contrast checks
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
    Global.ignoreContentOutsideRoots = option.ignoreContentOutsideRoots;
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
  const Root = [];
  const Readability = {};

  function initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots) {
    Root.length = 0;
    Readability.Root = false;
    // Initialize root areas to check.
    if (fixedRoots) {
      fixedRoots.forEach((root) => {
        Root.push(root);
      });
      // @todo Merge convert Readability to multiRoot too.
      Readability.Root = Array.from(fixedRoots).find((x) => x !== undefined);
    } else {
      Root.push(...document.querySelectorAll(desiredRoot));
      if (Root.length === 0 && Global.headless === false) {
        createAlert(`${Lang.sprintf('MISSING_ROOT', desiredRoot)}`);
        Root.push(document.querySelectorAll('body'));
      }
      // Readability target area to check.
      Readability.Root = document.querySelector(desiredReadabilityRoot);
    }

    if (!Readability.Root) {
      // If desired root area is not found, use the first root target area.
      Readability.Root = Root.find((x) => x !== undefined);

      // Create a warning if the desired readability root is not found.
      const { readabilityDetails, readabilityToggle } = Constants.Panel;
      const readabilityOn = readabilityToggle?.getAttribute('aria-pressed') === 'true';
      if (readabilityDetails && readabilityOn) {
        const note = document.createElement('div');
        note.id = 'readability-alert';
        note.innerHTML = `<hr aria-hidden="true"><p>${Lang.sprintf('MISSING_READABILITY_ROOT',
          desiredReadabilityRoot.tagName.toLowerCase(), desiredReadabilityRoot)}</p>`;
        // @todo Merge work needed: does this reset between runs or stack?.
        readabilityDetails.insertAdjacentElement('afterend', note);
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
  let root = [];
  if (desiredRoot === 'document') {
    root.push(document.querySelector('body'));
  } else if (desiredRoot === 'readability') {
    root.push(Constants.Readability.Root);
    if (!root) root = Constants.Root.find((x) => x !== undefined);
  } else if (desiredRoot === 'root') {
    root = Constants.Root;
  } else if (desiredRoot === 'panel') {
    root = Constants.Panel.panel;
  } else {
    root.push(document.querySelectorAll(desiredRoot));
  }
  if (root.length === 0) {
    root = [document.body];
  }

  // Exclusions are returned as an array & need to become a string for selector.
  const exclusions = Constants.Exclusions.Container.join(', ');
  // @todo Merge discuss: does the next line work? Isn't Exclude a string?
  const additionalExclusions = exclude?.join(', ') || '';

  // Ensure no trailing commas.
  const additional = additionalExclusions ? `, ${additionalExclusions}` : '';
  let list = [];
  root?.forEach((r) => {
    const shadowComponents = r?.querySelectorAll('[data-sa11y-has-shadow-root]');
    const shadow = shadowComponents ? ', [data-sa11y-has-shadow-root]' : '';
    /* Logic yoinked from Editoria11y */
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
 * Generates a selector path for the given DOM element.
 * @param {Element} element The DOM element for which to generate the selector path.
 * @returns {string} The selector path as a string.
 * @link https://www.geeksforgeeks.org/how-to-create-a-function-generateselector-to-generate-css-selector-path-of-a-dom-element/
 * @link https://dev.to/aniket_chauhan/generate-a-css-selector-path-of-a-dom-element-4aim
*/
function generateSelectorPath(element) {
  const path = [];
  let currentElement = element;
  while (currentElement) {
    let selector = currentElement.localName;
    if (currentElement.id) {
      selector += `#${currentElement.id}`;
      path.unshift(selector);
      break;
    } else if (currentElement.className) {
      selector += `.${currentElement.className.replace(/\s+/g, '.')}`;
    }
    const parentElement = currentElement.parentNode;
    if (parentElement) {
      const siblings = parentElement.children;
      if (siblings.length > 1) {
        const index = Array.prototype.indexOf.call(siblings, currentElement) + 1;
        selector += `:nth-child(${index})`;
      }
      path.unshift(selector);
    } else {
      break;
    }
    currentElement = currentElement.parentNode.host || currentElement.parentNode;
  }
  return path.join(' > ');
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
function createAlert(alertMessage, errorPreview = '', extendedPreview = '') {
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

  // @todo Merge test that adding default value to clear eslint error doesn't mess up this '?'.
  // If the issue's element is being previewed.
  const elementPreview = (extendedPreview)
    ? `<div class="element-preview">${extendedPreview}</div>` : '';

  // @todo Merge test that adding default value to clear eslint error doesn't mess up this.
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
    // @todo Merge discuss: multi-root handling with heading outlines.
    Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      Constants.Global.ignoreContentOutsideRoots ? 'root' : 'document',
      Constants.Exclusions.Headings,
    );
    Found.HeadingOne = find(
      'h1, [role="heading"][aria-level="1"]',
      Constants.Global.ignoreContentOutsideRoots ? 'root' : 'document',
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
    const readabilityExclusions = ($el) => Constants.Readability.Root.contains($el)
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

var styles$1 = "[data-sa11y-overflow]{overflow:auto!important}[data-sa11y-error]{outline:5px solid var(--sa11y-error)!important;outline-offset:2px}[data-sa11y-warning]:not([data-sa11y-error]){outline:5px solid var(--sa11y-warning)!important;outline-offset:2px}[data-sa11y-pulse-border]{animation:pulse 1s 2;box-shadow:0;outline:5px solid var(--sa11y-focus-color)!important}[data-sa11y-pulse-border]:focus,[data-sa11y-pulse-border]:hover{animation:none}@keyframes pulse{0%{box-shadow:0 0 0 5px var(--sa11y-focus-color)}50%{box-shadow:0 0 0 12px var(--sa11y-pulse-color)}to{box-shadow:0 0 0 5px var(--sa11y-pulse-color)}}h1[data-sa11y-pulse-border],h2[data-sa11y-pulse-border],h3[data-sa11y-pulse-border],h4[data-sa11y-pulse-border],h5[data-sa11y-pulse-border],h6[data-sa11y-pulse-border],img[data-sa11y-pulse-border]{animation:pulse-scale 1s 2}@keyframes pulse-scale{0%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(1.02)}to{opacity:1;transform:scale(1)}}@media (prefers-reduced-motion:reduce){[data-sa11y-pulse-border]{animation:none!important}}@media (forced-colors:active){[data-sa11y-error-inline],[data-sa11y-error],[data-sa11y-good],[data-sa11y-pulse-border],[data-sa11y-warning-inline],[data-sa11y-warning]{forced-color-adjust:none}}";

/* ************************************************************ */
/*  Auto-detect shadow DOM or process provided web components.  */
/* ************************************************************ */
const addStyleUtilities = (component) => {
  const CSSUtils = component.shadowRoot.querySelectorAll('.sa11y-css-utilities');
  if (CSSUtils.length === 0) {
    const style = document.createElement('style');
    style.setAttribute('class', 'sa11y-css-utilities');
    style.textContent = styles$1;
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

const version = '3.0.0';

var styles = ":host{background:var(--sa11y-panel-bg);border-top:5px solid var(--sa11y-panel-bg-splitter);bottom:0;display:block;height:-moz-fit-content;height:fit-content;left:0;position:fixed;right:0;width:100%;z-index:999999}*{-webkit-font-smoothing:auto!important;color:var(--sa11y-panel-primary);font-family:var(--sa11y-font-face)!important;font-size:var(--sa11y-normal-text);line-height:22px!important}#dialog{margin:20px auto;max-width:900px;padding:20px}h2{font-size:var(--sa11y-large-text);margin-top:0}a{color:var(--sa11y-hyperlink);cursor:pointer;text-decoration:underline}a:focus,a:hover{text-decoration:none}p{margin-top:0}.error{background:var(--sa11y-error);border:2px dashed #f08080;color:var(--sa11y-error-text);margin-bottom:0;padding:5px}";

var sharedStyles = ".visually-hidden{clip:rect(1px,1px,1px,1px);border:0;clip-path:inset(50%);display:block;height:1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}[hidden]{display:none!important}.header-text,.header-text-inline,h2{color:var(--sa11y-panel-primary);display:block;font-size:var(--sa11y-large-text);font-weight:600;margin-bottom:3px}.header-text-inline{display:inline-block!important}code{font-family:monospace!important;font-size:calc(var(--sa11y-normal-text) - 1px);font-weight:600}pre:has(code){display:block;overflow:auto;white-space:pre-wrap}.kbd,code,kbd,pre{background-color:var(--sa11y-panel-badge);border-radius:3.2px;color:var(--sa11y-panel-primary);padding:1.6px 4.8px}.bold{font-weight:600}.error .colour,.red-text{color:var(--sa11y-red-text);font-family:var(--sa11y-font-face)}.warning .colour,.yellow-text{color:var(--sa11y-yellow-text);font-family:var(--sa11y-font-face)}.badge,.normal-badge{background-color:var(--sa11y-panel-badge);border-radius:10px;color:var(--sa11y-panel-primary);display:inline;font-size:14px;font-weight:700!important;line-height:1;min-width:10px;outline:1px solid transparent;padding:1px 5px 1.75px;text-align:center;vertical-align:baseline;white-space:nowrap}.error .badge{background:var(--sa11y-error);color:var(--sa11y-error-text)}.error-badge{background:var(--sa11y-error)!important;color:var(--sa11y-error-text)!important}.warning .badge{background:var(--sa11y-yellow-text);color:var(--sa11y-panel-bg)}.warning-badge{background:var(--sa11y-yellow-text)!important;color:var(--sa11y-panel-bg)!important}.good-contrast{background:var(--sa11y-good)!important;color:var(--sa11y-good-text)!important}#contrast-preview{background-color:#e8e8e8;background-image:linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc);background-position:0 0,5px 5px;background-size:10px 10px;border:2px dashed var(--sa11y-panel-bg-splitter);border-radius:3.2px;line-height:1;margin-top:10px;max-height:100px;overflow:clip;overflow-wrap:break-word;padding:5px}#contrast-preview:empty{display:none}#color-pickers{display:flex;justify-content:space-between;margin-bottom:10px;margin-top:10px}#color-pickers label{align-items:center;display:flex}#color-pickers input{cursor:pointer;margin-inline-start:7px}input[type=color i]{background:var(--sa11y-panel-bg-secondary);block-size:44px;border-color:var(--sa11y-button-outline);border-radius:50%;border-style:solid;border-width:1px;inline-size:44px;padding:2px}input[type=color i]::-webkit-color-swatch-wrapper{padding:1px}input[type=color i]::-webkit-color-swatch{border-color:var(--sa11y-button-outline);border-radius:50%}input[type=color i]::-moz-color-swatch{border-color:var(--sa11y-button-outline);border-radius:50%}input[type=color i].unknown{box-shadow:0 0 0 2px var(--sa11y-yellow-text)}input[type=color i].unknown:after{align-items:center;color:#fff;content:\"?\";display:flex;font-size:22px;height:44px;justify-content:center;margin:-40px -3px;pointer-events:none;position:absolute;width:44px;z-index:2}.close-btn{background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:50%;color:var(--sa11y-panel-primary);cursor:pointer;float:var(--sa11y-float-rtl);font-size:var(--sa11y-normal-text);font-weight:400;height:32px;margin:0;position:relative;transition:all .2s ease-in-out;width:32px}.close-btn:focus,.close-btn:hover{background-color:var(--sa11y-shortcut-hover)}.close-btn:after{background:var(--sa11y-setting-switch-bg-off);content:\"\";inset:-7px;-webkit-mask:var(--sa11y-close-btn-svg) center no-repeat;mask:var(--sa11y-close-btn-svg) center no-repeat;position:absolute}@media screen and (forced-colors:active){.close-btn:after{filter:invert(1)}}#container [tabindex=\"-1\"]:focus,#container [tabindex=\"0\"]:focus,#container a:focus,#container button:focus,#container input:focus,#container select:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container #panel-controls button:focus,#container .switch:focus{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}#container #panel-controls button:focus:not(:focus-visible),#container [tabindex=\"-1\"]:focus:not(:focus-visible),#container [tabindex=\"0\"]:focus:not(:focus-visible),#container button:focus:not(:focus-visible),#container input:focus:not(:focus-visible),#container select:focus:not(:focus-visible){box-shadow:none;outline:0}#container [tabindex=\"-1\"]:focus-visible,#container [tabindex=\"0\"]:focus-visible,#container a:focus-visible,#container button:not(#panel-controls button):not(.switch):focus-visible,#container input:focus-visible,#container select:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container #panel-controls button:focus-visible,#container .switch:focus-visible{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){#panel-controls button:focus{border:3px solid transparent}#container [tabindex=\"-1\"]:focus,#container [tabindex=\"0\"]:focus,#container a:focus,#container button:focus,#container select:focus,.close-btn:focus{outline:3px solid transparent!important}}";

class ConsoleErrors extends HTMLElement {
  constructor(error) {
    super();
    this.error = error;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = styles + sharedStyles;
    shadow.appendChild(style);

    // Container
    const content = document.createElement('div');
    content.setAttribute('id', 'dialog');
    content.setAttribute('tabindex', '-1');

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
- **Version:** ${version}

## Comments
`;
    const encodedTemplate = encodeURIComponent(template);
    const github = `https://github.com/ryersondmp/sa11y/issues/new?title=Bug%20report&body=${encodedTemplate}`;

    // Message
    content.innerHTML = `
      <button class="close-btn" aria-label="${Lang._('ALERT_CLOSE')}"></button>
      <h2>${Lang._('ERROR')}</h2>
      <p>${Lang.sprintf('CONSOLE_ERROR', google, github)}</p>
      <p class="error">${escapeHTML(this.error.stack)}<br><br>Version: ${version} <br> URL: ${url}</p>
    `;
    shadow.appendChild(content);

    // Set focus and hide Sa11y's toggle.
    setTimeout(() => {
      Constants.Panel.toggle.style.display = 'none';
      const container = document.querySelector('sa11y-console-error');
      const dialog = container.shadowRoot.getElementById('dialog');
      dialog.focus();

      const close = container.shadowRoot.querySelector('.close-btn');
      close.addEventListener('click', () => {
        container.remove();
      });
    }, 0);
  }
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
    const rootContainsHeading = Constants.Root.some((root) => root.contains($el));
    const rootContainsShadowHeading = Constants.Root.some((root) => root.contains($el.getRootNode().host));
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

///////////////////////////////////////////////////////////////////////////////
// */ //// END LOCAL TESTING SWITCH


/////  Module Scope Object Containing Constants  /////
/////   APCA   0.0.98G - 4g - W3 Compatible Constants

/////  𝒦 SA98G  ///////////////////////////////////
    const SA98G = {

        mainTRC: 2.4, // 2.4 exponent for emulating actual monitor perception

            // For reverseAPCA
        get mainTRCencode() { return 1 / this.mainTRC },

              // sRGB coefficients
        sRco: 0.2126729, 
        sGco: 0.7151522, 
        sBco: 0.0721750, 

              // G-4g constants for use with 2.4 exponent
        normBG: 0.56, 
        normTXT: 0.57,
        revTXT: 0.62,
        revBG: 0.65,

              // G-4g Clamps and Scalers
        blkThrs: 0.022,
        blkClmp: 1.414, 
        scaleBoW: 1.14,
        scaleWoB: 1.14,
        loBoWoffset: 0.027,
        loWoBoffset: 0.027,
        deltaYmin: 0.0005,
        loClip: 0.1,

          ///// MAGIC NUMBERS for UNCLAMP, for use with 0.022 & 1.414 /////
         // Magic Numbers for reverseAPCA
        mFactor: 1.94685544331710,
        get mFactInv() { return 1 / this.mFactor},
        mOffsetIn: 0.03873938165714010,
        mExpAdj: 0.2833433964208690,
        get mExp() { return this.mExpAdj / this.blkClmp},
        mOffsetOut: 0.3128657958707580,
      };




//////////////////////////////////////////////////////////////////////////////
//////////  APCA CALCULATION FUNCTIONS \/////////////////////////////////////

//////////  ƒ  APCAcontrast()  ////////////////////////////////////////////
function APCAcontrast (txtY,bgY,places = -1) {
                 // send linear Y (luminance) for text and background.
                // txtY and bgY must be between 0.0-1.0
               // IMPORTANT: Do not swap, polarity is important.

  const icp = [0.0,1.1];     // input range clamp / input error check

  if(isNaN(txtY)||isNaN(bgY)||Math.min(txtY,bgY)<icp[0]||
                              Math.max(txtY,bgY)>icp[1]){
    return 0.0;  // return zero on error
    // return 'error'; // optional string return for error
  }
//////////   SAPC LOCAL VARS   /////////////////////////////////////////

  let SAPC = 0.0;            // For raw SAPC values
  let outputContrast = 0.0; // For weighted final values
  let polCat = 'BoW';      // Alternate Polarity Indicator. N normal R reverse

  // TUTORIAL

  // Use Y for text and BG, and soft clamp black,
  // return 0 for very close luminances, determine
  // polarity, and calculate SAPC raw contrast
  // Then scale for easy to remember levels.

  // Note that reverse contrast (white text on black)
  // intentionally returns a negative number
  // Proper polarity is important!

//////////   BLACK SOFT CLAMP   ////////////////////////////////////////

          // Soft clamps Y for either color if it is near black.
  txtY = (txtY > SA98G.blkThrs) ? txtY :
                         txtY + Math.pow(SA98G.blkThrs - txtY, SA98G.blkClmp);
  bgY = (bgY > SA98G.blkThrs) ? bgY :
                          bgY + Math.pow(SA98G.blkThrs - bgY, SA98G.blkClmp);

       ///// Return 0 Early for extremely low ∆Y
  if ( Math.abs(bgY - txtY) < SA98G.deltaYmin ) { return 0.0; }


//////////   APCA/SAPC CONTRAST - LOW CLIP (W3 LICENSE)  ///////////////

  if ( bgY > txtY ) {  // For normal polarity, black text on white (BoW)

              // Calculate the SAPC contrast value and scale
    SAPC = ( Math.pow(bgY, SA98G.normBG) - 
             Math.pow(txtY, SA98G.normTXT) ) * SA98G.scaleBoW;

            // Low Contrast smooth rollout to prevent polarity reversal
           // and also a low-clip for very low contrasts
    outputContrast = (SAPC < SA98G.loClip) ? 0.0 : SAPC - SA98G.loBoWoffset;

  } else {  // For reverse polarity, light text on dark (WoB)
           // WoB should always return negative value.
    polCat = 'WoB';

    SAPC = ( Math.pow(bgY, SA98G.revBG) - 
             Math.pow(txtY, SA98G.revTXT) ) * SA98G.scaleWoB;

    outputContrast = (SAPC > -SA98G.loClip) ? 0.0 : SAPC + SA98G.loWoBoffset;
  }

         // return Lc (lightness contrast) as a signed numeric value 
        // Round to the nearest whole number as string is optional.
       // Rounded can be a signed INT as output will be within ± 127 
      // places = -1 returns signed float, 1 or more set that many places
     // 0 returns rounded string, uses BoW or WoB instead of minus sign

  if(places < 0 ){  // Default (-1) number out, all others are strings
    return  outputContrast * 100.0;
  } else if(places == 0 ){
    return  Math.round(Math.abs(outputContrast)*100.0)+'<sub>'+polCat+'</sub>';
  } else if(Number.isInteger(places)){
    return  (outputContrast * 100.0).toFixed(places);
  } else { return 0.0 }

} // End APCAcontrast()




//////////////////////////////////////////////////////////////////////////////
//////////  ƒ  fontLookupAPCA()  0.1.7 (G)  \////////////////////////////////
/////////                                    \//////////////////////////////

function fontLookupAPCA (contrast,places=2) {

////////////////////////////////////////////////////////////////////////////
/////  CONTRAST * FONT WEIGHT & SIZE  /////////////////////////////////////

// Font size interpolations. Here the chart was re-ordered to put
// the main contrast levels each on one line, instead of font size per line.
// First column is LC value, then each following column is font size by weight

// G G G G G G  Public Beta 0.1.7 (G) • MAY 28 2022

// Lc values under 70 should have Lc 15 ADDED if used for body text
// All font sizes are in px and reference font is Barlow

// 999: prohibited - too low contrast
// 777: NON TEXT at this minimum weight stroke
// 666 - this is for spot text, not fluent-Things like copyright or placeholder.
// 5xx - minimum font at this weight for content, 5xx % 500 for font-size
// 4xx - minimum font at this weight for any purpose], 4xx % 400 for font-size

// MAIN FONT SIZE LOOKUP

//// ASCENDING SORTED  Public Beta 0.1.7 (G) • MAY 28 2022  ////

//// Lc 45 * 0.2 = 9 which is the index for the row for Lc 45

// MAIN FONT LOOKUP May 28 2022 EXPANDED
// Sorted by Lc Value
// First row is standard weights 100-900
// First column is font size in px
// All other values are the Lc contrast 
// 999 = too low. 777 = non-text and spot text only


const fontMatrixAscend = [
    ['Lc',100,200,300,400,500,600,700,800,900],
    [0,999,999,999,999,999,999,999,999,999],
    [10,999,999,999,999,999,999,999,999,999],
    [15,777,777,777,777,777,777,777,777,777],
    [20,777,777,777,777,777,777,777,777,777],
    [25,777,777,777,120,120,108,96,96,96],
    [30,777,777,120,108,108,96,72,72,72],
    [35,777,120,108,96,72,60,48,48,48],
    [40,120,108,96,60,48,42,32,32,32],
    [45,108,96,72,42,32,28,24,24,24],
    [50,96,72,60,32,28,24,21,21,21],
    [55,80,60,48,28,24,21,18,18,18],
    [60,72,48,42,24,21,18,16,16,18],
    [65,68,46,32,21.75,19,17,15,16,18],
    [70,64,44,28,19.5,18,16,14.5,16,18],
    [75,60,42,24,18,16,15,14,16,18],
    [80,56,38.25,23,17.25,15.81,14.81,14,16,18],
    [85,52,34.5,22,16.5,15.625,14.625,14,16,18],
    [90,48,32,21,16,15.5,14.5,14,16,18],
    [95,45,28,19.5,15.5,15,14,13.5,16,18],
    [100,42,26.5,18.5,15,14.5,13.5,13,16,18],
    [105,39,25,18,14.5,14,13,12,16,18],
    [110,36,24,18,14,13,12,11,16,18],
    [115,34.5,22.5,17.25,12.5,11.875,11.25,10.625,14.5,16.5],
    [120,33,21,16.5,11,10.75,10.5,10.25,13,15],
    [125,32,20,16,10,10,10,10,12,14],
    ];


// ASCENDING SORTED  Public Beta 0.1.7 (G) • MAY 28 2022 ////

// DELTA - MAIN FONT LOOKUP May 28 2022 EXPANDED
// EXPANDED  Sorted by Lc Value ••  DELTA
// The pre-calculated deltas of the above array

const fontDeltaAscend = [
    ['∆Lc',100,200,300,400,500,600,700,800,900],
    [0,0,0,0,0,0,0,0,0,0],
    [10,0,0,0,0,0,0,0,0,0],
    [15,0,0,0,0,0,0,0,0,0],
    [20,0,0,0,0,0,0,0,0,0],
    [25,0,0,0,12,12,12,24,24,24],
    [30,0,0,12,12,36,36,24,24,24],
    [35,0,12,12,36,24,18,16,16,16],
    [40,12,12,24,18,16,14,8,8,8],
    [45,12,24,12,10,4,4,3,3,3],
    [50,16,12,12,4,4,3,3,3,3],
    [55,8,12,6,4,3,3,2,2,0],
    [60,4,2,10,2.25,2,1,1,0,0],
    [65,4,2,4,2.25,1,1,0.5,0,0],
    [70,4,2,4,1.5,2,1,0.5,0,0],
    [75,4,3.75,1,0.75,0.188,0.188,0,0,0],
    [80,4,3.75,1,0.75,0.188,0.188,0,0,0],
    [85,4,2.5,1,0.5,0.125,0.125,0,0,0],
    [90,3,4,1.5,0.5,0.5,0.5,0.5,0,0],
    [95,3,1.5,1,0.5,0.5,0.5,0.5,0,0],
    [100,3,1.5,0.5,0.5,0.5,0.5,1,0,0],
    [105,3,1,0,0.5,1,1,1,0,0],
    [110,1.5,1.5,0.75,1.5,1.125,0.75,0.375,1.5,1.5],
    [115,1.5,1.5,0.75,1.5,1.125,0.75,0.375,1.5,1.5],
    [120,1,1,0.5,1,0.75,0.5,0.25,1,1],
    [125,0,0,0,0,0,0,0,0,0],
    ];

  // APCA CONTRAST FONT LOOKUP TABLES
  // Copyright © 2022 by Myndex Research and Andrew Somers. All Rights Reserved
  // Public Beta 0.1.7 (G) • MAY 28 2022
  // For the following arrays, the Y axis is contrastArrayLen
  // The two x axis are weightArrayLen and scoreArrayLen

  // MAY 28 2022

  const weightArray = [0,100,200,300,400,500,600,700,800,900];
  const weightArrayLen = weightArray.length; // X axis

  let returnArray = [contrast.toFixed(places),0,0,0,0,0,0,0,0,0,];
  returnArray.length; // X axis

//// Lc 45 * 0.2 = 9, and 9 is the index for the row for Lc 45

  let tempFont = 777;
  contrast = Math.abs(contrast); // Polarity unneeded for LUT
  const factor = 0.2; // 1/5 as LUT is in increments of 5
  const index = (contrast == 0) ?
                 1 : (contrast * factor) | 0 ; // LUT row... n|0 is bw floor
  let w = 0; 
    // scoreAdj interpolates the needed font side per the Lc
  let scoreAdj = (contrast - fontMatrixAscend[index][w]) * factor;

  w++; // determines column in font matrix LUT


/////////  Font and Score Interpolation  \/////////////////////////////////

// populate returnArray with interpolated values

  for (; w < weightArrayLen; w++) {

    tempFont = fontMatrixAscend[index][w]; 

    if (tempFont > 400) { // declares a specific minimum for the weight.
        returnArray[w] = tempFont;
    } else if (contrast < 14.5 ) {
        returnArray[w] = 999; //  999 = do not use for anything
    } else if (contrast < 29.5 ) {
        returnArray[w] = 777; // 777 =  non-text only
    } else {
                // INTERPOLATION OF FONT SIZE
               // sets level for 0.5px size increments of smaller fonts
              // Note bitwise (n|0) instead of floor
      (tempFont > 24) ?
        returnArray[w] =
            Math.round(tempFont - (fontDeltaAscend[index][w] * scoreAdj)) :
        returnArray[w] =
            tempFont - ((2.0 * fontDeltaAscend[index][w] * scoreAdj) | 0) * 0.5;
                                                      // (n|0) is bitwise floor
    }
  }
/////////  End Interpolation  ////////////////////////////////////////////

  return returnArray
} // end fontLookupAPCA

/////////\                                      ///////////////////////////\
//////////\  END  fontLookupAPCA()  0.1.7 (G)  /////////////////////////////\
/////////////////////////////////////////////////////////////////////////////\




//////////////////////////////////////////////////////////////////////////////
//////////  LUMINANCE CONVERTERS  |//////////////////////////////////////////


//////////  ƒ  sRGBtoY()  //////////////////////////////////////////////////
function sRGBtoY (rgb = [0,0,0]) { // send sRGB 8bpc (0xFFFFFF) or string

// NOTE: Currently expects 0-255

/////   APCA   0.0.98G - 4g - W3 Compatible Constants   ////////////////////
/*
const mainTRC = 2.4; // 2.4 exponent emulates actual monitor perception
    
const sRco = 0.2126729, 
      sGco = 0.7151522, 
      sBco = 0.0721750; // sRGB coefficients
      */
// Future:
// 0.2126478133913640	0.7151791475336150	0.0721730390750208
// Derived from:
// xW	yW	K	xR	yR	xG	yG	xB	yB
// 0.312720	0.329030	6504	0.640	0.330	0.300	0.600	0.150	0.060

         // linearize r, g, or b then apply coefficients
        // and sum then return the resulting luminance

  function simpleExp (chan) { return Math.pow(chan/255.0, SA98G.mainTRC); }
  return SA98G.sRco * simpleExp(rgb[0]) +
         SA98G.sGco * simpleExp(rgb[1]) +
         SA98G.sBco * simpleExp(rgb[2]);
         
} // End sRGBtoY()




////////////////////////////////////////////////////////////////////////////
//////////  UTILITIES  \///////////////////////////////////////////////////


//////////  ƒ  alphaBlend()  /////////////////////////////////////////////

                      // send rgba array for text/icon, rgb for background.
                     // Only foreground allows alpha of 0.0 to 1.0 
                    // This blends using gamma encoded space (standard)
                   // rounded 0-255 or set round=false for number 0.0-255.0
function alphaBlend (rgbaFG=[0,0,0,1.0], rgbBG=[0,0,0], round = true ) {
	
	rgbaFG[3] = Math.max(Math.min(rgbaFG[3], 1.0), 0.0); // clamp alpha 0-1
	let compBlend = 1.0 - rgbaFG[3];
	let rgbOut = [0,0,0,1,true]; // or just use rgbBG to retain other elements?
	
	for (let i=0;i<3;i++) {
		rgbOut[i] = rgbBG[i] * compBlend + rgbaFG[i] * rgbaFG[3];
		if (round) rgbOut[i] = Math.min(Math.round(rgbOut[i]),255);
	}  return rgbOut;
} // End alphaBlend()




//\                                     ////////////////////////////////////////
///\                                   ////////////////////////////////////////
////\                                 ////////////////////////////////////////
/////\  END APCA 0.1.9  G-4g  BLOCK  ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

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
  if (Constants.Global.contrastAPCA) {
    const foreground = sRGBtoY(blendedColor);
    const background = sRGBtoY(bg);
    ratio = APCAcontrast(foreground, background);
  } else {
    // Uses WCAG 2.0 contrast algorithm based on luminance.
    const foreground = getLuminance(blendedColor);
    const background = getLuminance(bg);
    ratio = getWCAG2Ratio(foreground, background);
  }
  return { ratio, blendedColor };
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
 * Calculate an elements contrast based on APCA algorithm.
 * @param {HTMLElement} $el The element in the DOM.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {Array} background Background colour in [R,G,B,A] format.
 * @param {number} fontSize Element's font size.
 * @param {number} fontWeight Element's font weight.
 * @param {number} opacity Element's opacity value.
 * @returns {Object} Object containing the element, ratio, and extra details.
*/
function apcaAlgorithm($el, color, background, fontSize, fontWeight, opacity) {
  const { ratio, blendedColor } = calculateContrast(color, background);

  // Returns 9 font sizes in px corresponding to weights 100 thru 900.
  // Returns ['LcValue',100,200,300,400,500,600,700,800,900]
  const fontLookup = fontLookupAPCA(ratio).slice(1);

  // Get minimum font size based on weight.
  const fontWeightIndex = Math.floor(fontWeight / 100) - 1;
  const minFontSize = fontLookup[fontWeightIndex];

  if (fontSize < minFontSize) {
    return {
      $el,
      ratio: ratioToDisplay(ratio),
      color: blendedColor,
      background,
      fontWeight,
      fontSize,
      opacity,
      textUnderline: getComputedStyle($el).textDecorationLine,
    };
  }
  return null;
}

/**
 * Check an element's contrast based on APCA or WCAG 2.0 algorithm.
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
  const algorithm = Constants.Global.contrastAPCA ? apcaAlgorithm : wcagAlgorithm;
  return algorithm($el, color, background, fontSize, fontWeight, opacity, contrastAAA);
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

function checkReadability() {
  let results;
  const rememberReadability = store.getItem('sa11y-readability') === 'On';
  if (rememberReadability) {
    const readabilityArray = [];
    // Improve the accuracy of a readability analysis by ensuring that long list items are treated as complete sentences.
    const punctuation = ['.', '?', '!'];
    Elements.Found.Readability.forEach(($el) => {
      const ignore = fnIgnore($el);
      const text = getText(ignore);
      if (!text) return;
      const lastCharacter = text[text.length - 1];
      const sentence = punctuation.includes(lastCharacter) ? text : `${text}.`;
      readabilityArray.push(sentence);
    });
    const pageText = readabilityArray.join(' ');

    /* Flesch Reading Ease for English, French, German, Dutch, and Italian. */
    if (['en', 'es', 'fr', 'de', 'nl', 'it', 'pt'].includes(Constants.Readability.Lang)) {
      // Compute syllables
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

        const syllString = !!syllableString;
        if (syllString) {
          syllables = syllableString.length;
        }
        return syllables;
      };

      // Words
      const wordsRaw = pageText.replace(/[.!?-]+/g, ' ').split(' ');
      let words = 0;
      for (let i = 0; i < wordsRaw.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (wordsRaw[i] != 0) {
          words += 1;
        }
      }

      // Sentences
      const sentenceRaw = pageText.split(/[.!?]+/);
      let sentences = 0;
      for (let i = 0; i < sentenceRaw.length; i++) {
        if (sentenceRaw[i] !== '') {
          sentences += 1;
        }
      }

      // Syllables
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
      if (Constants.Readability.Lang === 'en') {
        flesch = 206.835 - (1.015 * (words / sentences)) - (84.6 * (totalSyllables / words));
      } else if (Constants.Readability.Lang === 'fr') {
        flesch = 207 - (1.015 * (words / sentences)) - (73.6 * (totalSyllables / words));
      } else if (Constants.Readability.Lang === 'es') {
        flesch = 206.84 - (1.02 * (words / sentences)) - (0.60 * (100 * (totalSyllables / words)));
      } else if (Constants.Readability.Lang === 'de') {
        flesch = 180 - (words / sentences) - (58.5 * (totalSyllables / words));
      } else if (Constants.Readability.Lang === 'nl') {
        flesch = 206.84 - (0.77 * (100 * (totalSyllables / words))) - (0.93 * (words / sentences));
      } else if (Constants.Readability.Lang === 'it') {
        flesch = 217 - (1.3 * (words / sentences)) - (0.6 * (100 * (totalSyllables / words)));
      } else if (Constants.Readability.Lang === 'pt') {
        flesch = 248.835 - (1.015 * (words / sentences)) - (84.6 * (totalSyllables / words));
      }

      // Score must be between 0 and 100%.
      if (flesch > 100) {
        flesch = 100;
      } else if (flesch < 0) {
        flesch = 0;
      }

      // Compute scores.
      const fleschScore = flesch.toFixed(1);
      const avgWordsPerSentence = (words / sentences).toFixed(1);
      const complexWords = Math.round(100 * ((words - (syllables1 + syllables2)) / words));

      let difficulty;
      if (fleschScore >= 0 && fleschScore < 30) {
        difficulty = Lang._('VERY_DIFFICULT');
      } else if (fleschScore > 31 && fleschScore < 49) {
        difficulty = Lang._('DIFFICULT');
      } else if (fleschScore > 50 && fleschScore < 60) {
        difficulty = Lang._('FAIRLY_DIFFICULT');
      } else {
        difficulty = Lang._('GOOD');
      }

      // Create object for headless mode.
      results = {
        score: fleschScore,
        averageWordsPerSentence: avgWordsPerSentence,
        complexWords,
        difficultyLevel: difficulty,
        wordCount: words,
      };
    } else if (['sv', 'fi', 'da', 'no', 'nb', 'nn'].includes(Constants.Readability.Lang)) {
      /* Lix: Danish, Finnish, Norwegian (Bokmål & Nynorsk), Swedish. */
      const calculateLix = (text) => {
        const lixWords = () => text.replace(/[-'.]/ig, '').split(/[^a-zA-ZöäåÖÄÅÆæØø0-9]/g).filter(Boolean);
        const splitSentences = () => {
          const splitter = /\?|!|\.|\n/g;
          const arrayOfSentences = text.split(splitter).filter(Boolean);
          return arrayOfSentences;
        };
        const wordCount = lixWords().length;
        const longWordsCount = lixWords().filter((wordsArray) => wordsArray.length > 6).length;
        const sentenceCount = splitSentences().length;
        const score = Math.round((wordCount / sentenceCount) + ((longWordsCount * 100) / wordCount));
        const avgWordsPerSentence = (wordCount / sentenceCount).toFixed(1);
        const complexWords = Math.round(100 * (longWordsCount / wordCount));

        let difficulty;
        if (score >= 0 && score < 39) {
          difficulty = Lang._('GOOD');
        } else if (score > 40 && score < 50) {
          difficulty = Lang._('FAIRLY_DIFFICULT');
        } else if (score > 51 && score < 61) {
          difficulty = Lang._('DIFFICULT');
        } else {
          difficulty = Lang._('VERY_DIFFICULT');
        }
        return {
          score, difficulty, avgWordsPerSentence, complexWords, wordCount,
        };
      };

      // Compute LIX
      const lix = calculateLix(pageText);

      // Create object for headless mode.
      results = {
        score: lix.score,
        averageWordsPerSentence: lix.avgWordsPerSentence,
        complexWords: lix.complexWords,
        difficultyLevel: lix.difficulty,
        wordCount: lix.wordCount,
      };
    }

    // Update main panel if not in headless mode.
    if (Constants.Global.headless === false) {
      if (pageText.length === 0) {
        Constants.Panel.readabilityInfo.innerHTML = Lang._('READABILITY_NO_CONTENT');
      } else if (results.wordCount > 30) {
        Constants.Panel.readabilityInfo.innerHTML = `${Math.ceil(results.score)} <span class="readability-score">${results.difficultyLevel}</span>`;
        Constants.Panel.readabilityDetails.innerHTML = `<li><strong>${Lang._('AVG_SENTENCE')}</strong> ${Math.ceil(results.averageWordsPerSentence)}</li><li><strong>${Lang._('COMPLEX_WORDS')}</strong> ${results.complexWords}%</li><li><strong>${Lang._('TOTAL_WORDS')}</strong> ${results.wordCount}</li>`;
      } else {
        Constants.Panel.readabilityInfo.textContent = Lang._('READABILITY_NOT_ENOUGH');
      }
    }
  }
  return results;
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

        if ((href.startsWith('#') || href === '') && hasText && !ignored && !hasAttributes && href.length > 1) {
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

function checkDeveloper(results, option) {
  /* *************************************************************** */
  /*  Error: Missing language tag. Lang should be at least 2 chars.  */
  /* *************************************************************** */
  if (option.checks.META_LANG) {
    if (!Elements.Found.Language || Elements.Found.Language.length < 2) {
      results.push({
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

//import Lang from './lang.js';

const Options = (function options() {
  function preProcessOptions(options) {
    let defaultOptions = {

      // Relative or absolute
      //cssUrls: false, // ['/folder/editoria11y.css','/folder/custom.css']
      cssUrls: false,

      // Only check within these containers, e.g. "#main, footer." Default is to look for <main> and fall back to <body>.
      checkRoots: false,
      fixedRoots: false, // Array of specific nodes, overrides previous.
      /* e.g:
      fixedRoots: [
        {
           root: direct domReference
           framePositioner: direct domReference or false
        }
      ]
      */

      // Shadow components inside the checkroot to check within, e.g., 'accordion, spa-content'
      shadowComponents: false,
      autoDetectShadowComponents: true,

      // Containers to globally ignore, e.g., "header *, .card *"
      ignoreElements: false,

      // Provide list of test keys; get from localization file or Ed11y.results.
      ignoreTests: false, //e.g. ['linkNewWindow', 'textUppercase']

      // Ignore Aria on these elements (Gutenberg labels headings while editing.)
      ignoreAriaOnElements: false, // e.g. 'h1,h2,h3,h4,h5,h6'
      ignoreTextInElements: false, // e.g. '.inner-node-hidden-in-CSS'

      // Disable tests on specific elements
      // Include and modify this entire object in your call
      ignoreByKey: {
        'p': 'table p',
        // 'h': false,
        'img': '[aria-hidden], [aria-hidden] img, ' +
          '[role="presentation"], ' +
          'a[href][aria-label] img, button[aria-label] img, ' +
          'a[href][aria-labelledby] img, button[aria-labelledby] img',
        'a': '[aria-hidden][tabindex]', // disable link text check on properly disabled links
        // 'li': false,
        // 'blockquote': false,
        // 'iframe': false,
        // 'audio': false,
        // 'video': false,
        'table': '[role="presentation"]',
      },

      headingsOnlyFromCheckRoots: false, // Whether the Headings panel shows all headings on page or only from checked content.

      // Set alertModes
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
      ignoreAllIfPresent: false,

      // Disable checker altogether if these elements are present or absent, e.g., ".live-editing-toolbar, .frontpage" or ".editable-content"
      preventCheckingIfPresent: false,
      preventCheckingIfAbsent: false,

      // Regex of strings to remove from links before checking to see if link titles are meaningful. E.g.:
      // "\(link is external\)|\(link sends email\)"
      linkIgnoreStrings: false,
      linkIgnoreSelector: false,

      // Disable the "is this element visible" check on themes that have 0-height elements.
      checkVisible: true,

      // Selector list for elements where the tip opening JS should wait for your theme to modify the DOM or CSS before opening the tip.
      hiddenHandlers: '',

      panelPinTo: 'right',
      panelOffsetX: '25px',
      panelOffsetY: '25px',
      panelNoCover: '', // select other buttons to avoid.
      panelAttachTo: document.body,

      // Selector list for elements that hide overflow, truncating buttons.
      constrainButtons: false,

      // Interface
      lang: 'en',
      langSanitizes: false, // Some translation modules will double-escape
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
      embeddedContent: false, // @todo remove in favor of custom checks?
      embeddedContentTitle: '', // @todo test or remove?
      embeddedContentMessage: '', // @todo test or remove?

      linksUrls: false, // get from language pack
      linksMeaningless: false, // get from language pack
      altPlaceholder: false, // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'
      // * Not implemented Yet:
      // ruleset toggling
      // form label tests
      // detectSPArouting: false,

      editLinks: false, // Add links to edit content in tooltips.

      // @todo merge: port this functionality.
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

      // @todo merge do we need the image and button descenders and the tabindex selector? If so should it be in the MR?
      imageIgnore: '[aria-hidden], [aria-hidden] img, [role="presentation"], a[href][aria-label] img, button[aria-label] img, a[href][aria-labelledby] img, button[aria-labelledby] img',
      linkIgnore: '[aria-hidden][tabindex="-1"]',


      checks: {
        QA_DOCUMENT: {
          sources: 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']',
        },
        EMBED_VIDEO: {
          sources: 'video, [src*="youtube.com"], [src*="brightcove.com"], [src*="dailymotion.com"], [src*="panopto.com"], [src*="Video"], [src*="video"], [src*="vimeo.com"], [src*="watch"], [src*="wistia.com"], [src*="vidyard.com"], [src*=yuja.com]'
        },
      },

    };
    options = {
      ...defaultOptions,
      ...options
    };
    /*M = {
      // Fall back to En strings if language or string is unavailable
      ...ed11yLang['en'],
      ...ed11yLang[Ed11y.options.lang]
    };*/

    /*
    * Options translation
    * */
    options.headless = options.alertMode === 'headless';

    // Toggleable plugins
    options.developerPlugin = false;
    options.colourFilterPlugin = false;
    options.exportResultsPlugin = false;
    options.showImageOutline = false;
    // @todo merge what are these?
    // Global.ignoreContentOutsideRoots = option.ignoreContentOutsideRoots;

  //  options.panelPosition = panelPinTo; // Syntax?

    // Check for document types.

    if (options.documentLinks) {
      options.checks.QA_DOCUMENT.sources = options.documentLinks;
    }
    // @todo merge this changed name from linkIgnoreSelector.

    if (options.linkIgnoreSelector) {
      options.linkIgnoreSpan = options.linkIgnoreSelector;
    }



    // @todo Merge ignoreByKey deprecation documentation and conversion. These tests still need overrides:
    // 'p': 'table p',
    //  'table': '[role="presentation"]'

    /* ********************** */
    /* Embedded Content Setup */
    /* ********************** */
    //Global.AllEmbeddedContent = `${Global.VideoSources}, ${Global.AudioSources}, ${Global.VisualizationSources}`;
    // @todo merge: this means custom embeds needs to be a custom test.

    return options;
  }

  function postProcessOptions(options) {
    // Exclusions.Sa11yElements: convert to Ed11y elements.
    // @todo merge: test: need descendant selector?
    Constants.Sa11yElements = '.ed11y-element';
    // Main container exclusions.

    // @todo merge remove wpadminbar from defaults and update wp module.
    /*Exclusions.Container = ['#wpadminbar', '#wpadminbar *', ...exclusions];
    if (option.containerIgnore) {
      const containerSelectors = option.containerIgnore.split(',').map((item) => item.trim());
      Exclusions.Container = Exclusions.Container.concat(
        containerSelectors.flatMap((item) => [`${item} *`, item]),
      );
    }*/

  }




  return {
    preProcessOptions,
    postProcessOptions,
  };
}());

// Options, language object, constants, and utilities.
// import checkCustom from './sa11y/src/js/sa11y-custom-checks';

class Ed11y {
  constructor(options) {

    console.log(options);
    options = Options.preProcessOptions(options);
    console.log(options);
    const option = {
      ...defaultOptions,
      ...options,
      checks: {
        ...defaultOptions.checks,
        ...options.checks,
      },
    };
    console.log(option);

    /* *********************************************************** */
    /*  Initialize: Start your engines.                            */
    /* *********************************************************** */
    this.initialize = () => {
      // Do not run Sa11y if any supplied elements detected on page.
      const checkRunPrevent = () => {
        const { doNotRun } = option;
        return doNotRun.trim().length > 0 ? document.querySelector(doNotRun) : false;
      };

      if (!checkRunPrevent()) {
        // Register web components
        // customElements.define('sa11y-heading-label', HeadingLabel);
        // customElements.define('sa11y-heading-anchor', HeadingAnchor);
        // customElements.define('sa11y-annotation', Annotations);
        // customElements.define('sa11y-tooltips', AnnotationTooltips);
        // customElements.define('sa11y-panel-tooltips', PanelTooltips);
        // customElements.define('sa11y-control-panel', ControlPanel);
        // customElements.define('sa11y-console-error', ConsoleErrors);

        // Initialize global constants and exclusions.
        Constants.initializeGlobal(option);
        Constants.initializeReadability(option);
        Constants.initializeExclusions(option);

        // Make "Developer checks" on by default or if toggle switch is visually hidden.
        if (option.developerChecksOnByDefault) {
          if (store.getItem('sa11y-developer') === null || option.checkAllHideToggles) {
            store.setItem('sa11y-developer', 'On');
          }
        }

      }
    };

    /* *********************************************************** */
    /*  Check All: Where all the magic happens.                    */
    /* *********************************************************** */
    this.checkAll = async (
      desiredRoot = option.checkRoot,
      desiredReadabilityRoot = option.readabilityRoot,
      fixedRoots = option.fixedRoots,
    ) => {
      try {
        // @todo merge does Editoria11y need to separate out these clears?
        this.results = [];
        this.headingOutline = [];
        this.errorCount = 0;
        this.warningCount = 0;
        this.customChecksRunning = false;

        // Initialize root areas to check.
        Constants.initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots);

        // Find all web components on the page.
        // @todo Merge work needed.
        findShadowComponents(option);

        // Find and cache elements.
        // @todo Merge work needed.
        Elements.initializeElements(option);

        // Ruleset checks
        checkHeaders(this.results, option, this.headingOutline);
        checkLinkText(this.results, option);
        checkImages(this.results, option);
        checkLabels(this.results, option);
        checkQA(this.results, option);
        checkDeveloper(this.results, option);
        if (option.embeddedContentPlugin) checkEmbeddedContent(this.results, option);
        if (option.contrastPlugin) checkContrast(this.results, option);
        if (option.readabilityPlugin) checkReadability();

        // Build array of images to be used for image panel.
        this.imageResults = Elements.Found.Images.map((image) => {
          const match = this.results.find((i) => i.element === image);
          return match && {
            element: image,
            type: match.type,
            dismiss: match.dismiss,
            developer: match.developer,
          };
        }).filter(Boolean);

        /* Custom checks */
        if (option.customChecks === true) {
          // Option 1: Provide via sa11y-custom-checks.js
          checkCustom(this.results);
        } else if (typeof option.customChecks === 'object') {
          // Option 2: Provide as an object when instantiated.
          this.results.push(...option.customChecks);
        } else if (option.customChecks === 'listen') {
          // Option 3: Provide via event listener. Yoinked from Editoria11y!
          this.customChecksRunning = true;
          this.customChecksFinished = 0;
          document.addEventListener('sa11y-resume', () => {
            this.customChecksFinished += 1;
            if (this.customChecksFinished === 1) {
              this.customChecksRunning = false;
              this.updateResults();
            }
          });
          window.setTimeout(() => {
            if (this.customChecksRunning === true) {
              this.customChecksRunning = false;
              this.updateResults();
              throw Error('Sa11y: No custom checks were returned.');
            }
          }, option.delayCustomCheck);
          window.setTimeout(() => {
            const customChecks = new CustomEvent('sa11y-custom-checks');
            document.dispatchEvent(customChecks);
          }, 0);
        }

        // No custom checks running.
        if (!this.customChecksRunning) this.updateResults();
      } catch (error) {
        const consoleErrors = new ConsoleErrors(error);
        document.body.appendChild(consoleErrors);
        throw Error(error);
      }
    };

    this.updateResults = () => {
      // Filter out heading issues that are outside of the target root.
      this.results = this.results.filter((heading) => heading.isWithinRoot !== false);

      // Filter out "Developer checks" if toggled off or if using externally supplied developer checks.
      const devChecks = store.getItem('sa11y-developer') === 'Off' || store.getItem('sa11y-developer') === null;
      if (devChecks || option.externalDeveloperChecks === true) {
        this.results = this.results.filter((issue) => issue.developer !== true);
      }

      // Filter out external vendor results based on "Developer checks" state.
      if (devChecks) {
        this.results = this.results.filter((issue) => issue.external !== true);
      }

      // Generate HTML path, and optionally CSS selector path of element.
      this.results.forEach(($el, id) => {
        const cssPath = option.selectorPath ? generateSelectorPath($el.element) : '';
        const htmlPath = $el.element?.outerHTML.replace(/\s{2,}/g, ' ').trim() || '';
        Object.assign($el, {htmlPath, cssPath, id});
      });
    };

    /* *********************************************************** */
    /*  Reset all: Clears everything and resets the panel.         */
    /* *********************************************************** */
    this.resetAll = (restartPanel = true) => {
      Constants.Global.html.removeAttribute('data-sa11y-active');

      // Remove data attribute from shadow root elements.
      document.querySelectorAll('[data-sa11y-has-shadow-root]').forEach((el) => {
        el.shadowRoot.querySelectorAll('style.sa11y-css-utilities').forEach((style) => style.remove());
        el.removeAttribute('data-sa11y-has-shadow-root');
      });

    };

    /* *********************************************************** */
    /*  Methods: Useful utilities for integrations.                */
    /* *********************************************************** */

    // Method: find utility.
    this.find = (selector, desiredRoot, exclude) => find(selector, desiredRoot, exclude);

    // Method: prepare dismissal keys.
    this.prepareDismissal = (string) => prepareDismissal(string);

    // Method: sanitize HTML.
    this.sanitizeHTML = (string) => sanitizeHTML(string);

    // Method: truncate string.
    this.truncateString = (string, maxLength) => truncateString(string, maxLength);

    /* *********************************************************** */
    /*  Initialize Sa11y.                                          */
    /* *********************************************************** */
    this.initialize();
  }
}

export { Ed11y, Lang };
