/*!
			* Editoria11y accessibility checker
			* @version 3.0.0
			* @author John Jameson
			* @license GPLv2
			* @copyright © 2026 Princeton University.
			* GitHub: git+https://itmaybejj@github.com/itmaybejj/editoria11y.git
		**/
    /*!
      * Sa11y, the accessibility quality assurance assistant.
      * @version 4.4.2
      * @author Adam Chaboryk
      * @license GPL-2.0-or-later
      * @copyright © 2020 - 2026 Toronto Metropolitan University.
      * @contact adam.chaboryk@torontomu.ca
      * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
      * The above copyright notice shall be included in all copies or substantial portions of the Software.
    **/
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
    const el = document.createElement("div");
    el.innerHTML = transString;
    if (args?.length) {
      args.forEach((_arg, index) => {
        el.innerHTML = el.innerHTML.replace(/%\([a-zA-z]+\)/, `<span data-arg='${index}'></span>`);
      });
      args.forEach((arg, index) => {
        const replacement = el.querySelector(`[data-arg="${index}"]`);
        if (replacement && arg !== null) {
          replacement.textContent = arg;
        }
      });
    }
    return el;
  },
  translate(string) {
    return this.langStrings[string] || string;
  },
  prepHTML($el) {
    return $el.replaceAll(/<hr>/g, '<hr aria-hidden="true">').replaceAll(/<a[\s]href=/g, '<a target="_blank" rel="noopener noreferrer" href=').replaceAll(/<\/a>/g, `<span class="visually-hidden"> (${Lang._("NEW_TAB")})</span></a>`).replaceAll(/{C}/g, 'class="colour"').replaceAll(/{B}/g, 'class="badge"').replaceAll(/{ALT}/g, `<strong class="badge">${Lang._("ALT")}</strong>`).replaceAll(
      /{L}/g,
      `<strong class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._("LINKED")}</span></strong>`
    );
  }
};
const defaultOptions = {
  // Target area to check
  checkRoot: "body",
  fixedRoots: false,
  // Exclusions
  containerIgnore: ".sa11y-ignore",
  contrastIgnore: ".sr-only",
  outlineIgnore: "",
  headerIgnore: "",
  headerIgnoreSpan: "",
  headerIgnoreStrings: "",
  imageIgnore: "",
  linkIgnore: "",
  linkIgnoreSpan: "",
  linkIgnoreStrings: [],
  paragraphIgnore: "table p",
  ignoreContentOutsideRoots: false,
  ignoreByTest: {},
  // Control panel settings
  aboutContent: "",
  panelPosition: "right",
  showMovePanelToggle: true,
  checkAllHideToggles: false,
  developerChecksOnByDefault: false,
  // Page outline
  showHinPageOutline: false,
  showTitleInPageOutline: true,
  // Image outline
  showImageOutline: true,
  editImageURLofCMS: "",
  relativePathImageSRC: "",
  relativePathImageID: "",
  ignoreEditImageURL: [],
  ignoreEditImageClass: [],
  // Other features
  delayCheck: 0,
  delayCustomCheck: 500,
  detectSPArouting: false,
  doNotRun: "",
  headless: false,
  selectorPath: false,
  shadowComponents: "",
  autoDetectShadowComponents: false,
  pepper: window.location.hostname,
  // Provide a string to seed hashes.
  // Annotations
  showGoodImageButton: true,
  showGoodLinkButton: true,
  dismissAnnotations: true,
  dismissAll: true,
  ignoreHiddenOverflow: "",
  insertAnnotationBefore: "",
  // Readability
  readabilityPlugin: true,
  readabilityRoot: "body",
  readabilityIgnore: "",
  // Contrast
  contrastPlugin: true,
  contrastAlgorithm: "AA",
  // AA, AAA, APCA
  // Other plugins
  customChecks: false,
  formLabelsPlugin: true,
  embeddedContentPlugin: true,
  developerPlugin: true,
  externalDeveloperChecks: false,
  colourFilterPlugin: true,
  exportResultsPlugin: false,
  // Options for accName computation: Ignore ARIA on these elements.
  ignoreAriaOnElements: false,
  // e.g. 'h1,h2,h3,h4,h5,h6'
  ignoreTextInElements: false,
  // e.g. '.inner-node-hidden-in-CSS'
  // Shared properties for some checks
  altPlaceholder: [],
  susAltStopWords: "",
  linkStopWords: "",
  extraPlaceholderStopWords: "",
  imageWithinLightbox: "",
  initialHeadingLevel: [],
  // Shared properties for page language detection
  langOfPartsPlugin: false,
  langOfPartsCache: true,
  // All checks
  checks: {
    // Heading checks
    HEADING_SKIPPED_LEVEL: true,
    HEADING_EMPTY_WITH_IMAGE: true,
    HEADING_EMPTY: true,
    HEADING_FIRST: true,
    HEADING_LONG: {
      maxLength: 170
    },
    HEADING_MISSING_ONE: true,
    // Image checks
    MISSING_ALT_LINK: true,
    MISSING_ALT_LINK_HAS_TEXT: true,
    MISSING_ALT: true,
    IMAGE_DECORATIVE_CAROUSEL: {
      sources: ".carousel"
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
      maxLength: 250
    },
    IMAGE_ALT_TOO_LONG: {
      maxLength: 250
    },
    LINK_IMAGE_ALT: {
      dismissAll: true
    },
    LINK_IMAGE_ALT_AND_TEXT: true,
    IMAGE_FIGURE_DUPLICATE_ALT: true,
    IMAGE_PASS: {
      dismissAll: true
    },
    ALT_UNPRONOUNCEABLE: true,
    LINK_ALT_UNPRONOUNCEABLE: true,
    ALT_MAYBE_BAD: {
      minLength: 15
    },
    LINK_ALT_MAYBE_BAD: {
      minLength: 15
    },
    // Link checks
    DUPLICATE_TITLE: {
      dismissAll: true
    },
    LINK_EMPTY_LABELLEDBY: true,
    LINK_EMPTY_NO_LABEL: true,
    LINK_STOPWORD: true,
    LINK_STOPWORD_ARIA: true,
    LINK_SYMBOLS: true,
    LINK_CLICK_HERE: true,
    LINK_DOI: {
      dismissAll: true
    },
    LINK_URL: {
      maxLength: 40
    },
    LINK_LABEL: {
      dismissAll: true
    },
    LINK_EMPTY: true,
    LINK_IDENTICAL_NAME: {
      dismissAll: true
    },
    LINK_NEW_TAB: {
      dismissAll: true
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
      sources: ""
    },
    EMBED_VIDEO: {
      sources: ""
    },
    EMBED_DATA_VIZ: {
      sources: ""
    },
    EMBED_UNFOCUSABLE: true,
    EMBED_MISSING_TITLE: true,
    EMBED_GENERAL: true,
    // Quality assurance checks
    QA_BAD_LINK: {
      sources: ""
    },
    QA_STRONG_ITALICS: true,
    QA_IN_PAGE_LINK: true,
    QA_DOCUMENT: {
      sources: "",
      dismissAll: true
    },
    QA_PDF: {
      dismissAll: true
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
      sources: ""
    },
    QA_JUSTIFY: {
      dismissAll: true
    },
    QA_SMALL_TEXT: {
      dismissAll: true
    },
    // Meta checks
    META_LANG: true,
    META_LANG_VALID: true,
    META_LANG_SUGGEST: true,
    META_SCALABLE: true,
    META_MAX: true,
    META_REFRESH: true,
    PAGE_LANG_CONFIDENCE: {
      confidence: 0.95
    },
    LANG_OF_PARTS: true,
    LANG_MISMATCH: true,
    LANG_OF_PARTS_ALT: true,
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
      dismissAll: true
    },
    CONTRAST_INPUT: true,
    CONTRAST_ERROR: true,
    CONTRAST_PLACEHOLDER: true,
    CONTRAST_PLACEHOLDER_UNSUPPORTED: true,
    CONTRAST_ERROR_GRAPHIC: true,
    CONTRAST_WARNING_GRAPHIC: {
      dismissAll: true
    },
    CONTRAST_UNSUPPORTED: {
      dismissAll: true
    }
  }
};
const State = {
  option: { ...defaultOptions },
  results: [],
  headingOutline: [],
  imageResults: [],
  counts: {
    error: 0,
    warning: 0,
    dismissed: 0
  },
  customChecks: {
    running: false,
    finished: 0
  },
  dismissedResults: []
};
const wrapPseudoContent = (element, string) => {
  const getAltText = (content) => {
    if (content === "none") {
      return "";
    }
    const match = content.includes("url(") || content.includes("image-set(") ? content.match(/\/\s*"([^"]+)"/) : content.match(/"([^"]+)"/);
    return match ? match[1] : "";
  };
  const before = getAltText(
    window.getComputedStyle(element, ":before").getPropertyValue("content")
  );
  const after = getAltText(window.getComputedStyle(element, ":after").getPropertyValue("content"));
  return `${before}${string}${after}`;
};
const nextTreeBranch = (tree) => {
  for (let i = 0; i < 1e3; i++) {
    if (tree.nextSibling()) {
      return tree.previousNode();
    }
    if (!tree.parentNode()) {
      return false;
    }
  }
  return false;
};
const computeAriaLabel = (element, recursing = false) => {
  if (State.option.ignoreAriaOnElements && element.matches(State.option.ignoreAriaOnElements)) {
    return "noAria";
  }
  if (State.option.ignoreTextInElements && element.matches(State.option.ignoreTextInElements)) {
    return "";
  }
  const labelledBy = element.getAttribute("aria-labelledby");
  if (!recursing && labelledBy) {
    return labelledBy.split(/\s+/).filter((id) => id.trim()).map((id) => {
      const targetElement = document.querySelector(`#${CSS.escape(id)}`);
      return targetElement ? computeAccessibleName(targetElement, "", 1) : "";
    }).join(" ");
  }
  const { ariaLabel } = element;
  if (ariaLabel && ariaLabel.trim().length > 0) {
    return ariaLabel;
  }
  return "noAria";
};
const computeAccessibleName = (element, exclusions = [], recursing = 0) => {
  const ariaLabel = computeAriaLabel(element, recursing);
  if (ariaLabel !== "noAria") {
    return ariaLabel;
  }
  let computedText = "";
  if (!element.children.length) {
    computedText = wrapPseudoContent(element, element.textContent);
    if (!computedText.trim() && element.hasAttribute("title")) {
      return element.getAttribute("title");
    }
    return computedText;
  }
  function createTreeWalker(root, showElement, showText) {
    const acceptNode = (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return NodeFilter.FILTER_ACCEPT;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_REJECT;
    };
    return document.createTreeWalker(root, NodeFilter.SHOW_ALL, { acceptNode });
  }
  const treeWalker = createTreeWalker(element);
  const alwaysExclude = ["noscript", "style", "script", "video", "audio"];
  const excludeSelector = [...exclusions, ...alwaysExclude].join(", ");
  const exclude = excludeSelector ? element.querySelectorAll(excludeSelector) : [];
  let addTitleIfNoName = false;
  let aText = false;
  let count = 0;
  let continueWalker = true;
  while (treeWalker.nextNode() && continueWalker) {
    count += 1;
    const node = treeWalker.currentNode;
    const excluded = Array.from(exclude).some((ex) => ex.contains(node));
    if (excluded) {
      continue;
    }
    if (node.shadowRoot) {
      const shadowChildren = node.shadowRoot.querySelectorAll("*");
      for (let i = 0; i < shadowChildren.length; i++) {
        const child = shadowChildren[i];
        if (!excludeSelector || !child.closest(excludeSelector)) {
          computedText += computeAccessibleName(child, exclusions, recursing + 1);
        }
      }
    }
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentNode.tagName !== "SLOT") {
        computedText += ` ${node.nodeValue}`;
      }
      continue;
    }
    if (addTitleIfNoName && !node.closest("a")) {
      if (aText === computedText) {
        computedText += addTitleIfNoName;
      }
      addTitleIfNoName = false;
      aText = false;
    }
    if (node.ariaHidden === "true" && !(recursing && count < 3)) {
      if (!nextTreeBranch(treeWalker)) {
        continueWalker = false;
      }
      continue;
    }
    const aria = computeAriaLabel(node, recursing);
    if (aria !== "noAria") {
      computedText += ` ${aria}`;
      if (!nextTreeBranch(treeWalker)) {
        continueWalker = false;
      }
      continue;
    }
    switch (node.tagName) {
      case "IMG":
        if (node.hasAttribute("alt") && node.role !== "presentation") {
          computedText += node.getAttribute("alt");
        }
        break;
      case "SVG":
        if (node.role === "img" || node.role === "graphics-document") {
          computedText += computeAriaLabel(node);
        } else {
          const title = node.querySelector("title");
          if (title) {
            computedText += title.textContent;
          }
        }
        break;
      case "A":
        if (node.hasAttribute("title")) {
          addTitleIfNoName = node.getAttribute("title");
          aText = computedText;
        } else {
          addTitleIfNoName = false;
          aText = false;
        }
        computedText += wrapPseudoContent(node, "");
        break;
      case "INPUT":
        computedText += wrapPseudoContent(treeWalker.currentNode, "");
        if (treeWalker.currentNode.hasAttribute("title")) {
          addTitleIfNoName = treeWalker.currentNode.getAttribute("title");
        }
        break;
      case "SLOT": {
        const children = node.assignedNodes?.() || [];
        let slotText = "";
        children.forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            slotText += computeAccessibleName(child);
          } else if (child.nodeType === Node.TEXT_NODE) {
            slotText += child.nodeValue;
          }
        });
        computedText += slotText;
        computedText += wrapPseudoContent(node, "");
        break;
      }
      case "SPAN": {
        computedText += wrapPseudoContent(treeWalker.currentNode, "");
        if (treeWalker.currentNode.hasAttribute("title")) {
          addTitleIfNoName = treeWalker.currentNode.getAttribute("title");
        }
        break;
      }
      default:
        computedText += wrapPseudoContent(node, "");
        break;
    }
  }
  if (addTitleIfNoName && !aText) {
    computedText += ` ${addTitleIfNoName}`;
  }
  computedText = computedText.replace(/[\uE000-\uF8FF]/gu, "");
  if (!computedText.trim()) {
    computedText = wrapPseudoContent(element, "");
    if (!computedText.trim() && element.hasAttribute("title")) {
      return element.getAttribute("title");
    }
  }
  return computedText;
};
function removeAlert() {
  if (State.option.headless) return;
  const Sa11yPanel = document.querySelector("sa11y-control-panel").shadowRoot;
  const alert = Sa11yPanel.getElementById("panel-alert");
  const alertText = Sa11yPanel.getElementById("panel-alert-text");
  const alertPreview = Sa11yPanel.getElementById("panel-alert-preview");
  alert.classList.remove("active");
  alertPreview.classList.remove("panel-alert-preview");
  while (alertText.firstChild) {
    alertText.removeChild(alertText.firstChild);
  }
  while (alertPreview.firstChild) {
    alertPreview.removeChild(alertPreview.firstChild);
  }
}
function createAlert(alertMessage, errorPreview, extendedPreview) {
  if (State.option.headless) return;
  removeAlert();
  const Sa11yPanel = document.querySelector("sa11y-control-panel").shadowRoot;
  const alert = Sa11yPanel.getElementById("panel-alert");
  const alertText = Sa11yPanel.getElementById("panel-alert-text");
  Sa11yPanel.getElementById("panel-alert-preview");
  const alertClose = Sa11yPanel.getElementById("close-alert");
  const skipButton = Sa11yPanel.getElementById("skip-button");
  alert.classList.add("active");
  alertText.innerHTML = alertMessage;
  setTimeout(() => alertClose.focus(), 300);
  function closeAlert() {
    removeAlert();
    const focusTarget = skipButton.hasAttribute("disabled") ? Sa11yPanel.getElementById("toggle") : skipButton;
    focusTarget.focus();
  }
  alertClose.addEventListener("click", closeAlert);
  alert.onkeydown = (e) => {
    const evt = e || window.event;
    if (evt.key === "Escape" && alert.classList.contains("active")) {
      closeAlert();
    }
  };
}
const Constants = /* @__PURE__ */ (function myConstants() {
  const Global = {};
  function initializeGlobal() {
    Global.html = document.querySelector("html");
    Global.shadowDetection = State.option.shadowComponents.length > 0 || State.option.autoDetectShadowComponents === true;
    const panelPositions = /* @__PURE__ */ new Set(["top-left", "top-right", "left", "right"]);
    const positionValue = State.option.panelPosition?.trim().toLowerCase();
    Global.panelPosition = panelPositions.has(positionValue) ? positionValue : "right";
    Global.contrastAlgorithm = State.option.contrastAlgorithm.toUpperCase();
    let reducedMotion = false;
    if (typeof window.matchMedia === "function") {
      reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    }
    Global.scrollBehaviour = !reducedMotion || reducedMotion.matches ? "auto" : "smooth";
    Global.langDirection = Global.html.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
    const documentSources = State.option.checks.QA_DOCUMENT.sources;
    const defaultDocumentSources = 'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://drive.google.com/file"], a[href^="https://docs.google."], a[href^="https://sway."]';
    if (documentSources) {
      Global.documentSources = `${defaultDocumentSources}, ${documentSources}`;
    } else {
      Global.documentSources = defaultDocumentSources;
    }
    const videoSources = State.option.checks.EMBED_VIDEO.sources;
    const defaultVideoSources = 'video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"]';
    if (videoSources) {
      const videos = videoSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.VideoSources = `${defaultVideoSources}, ${videos.join(", ")}`;
    } else {
      Global.VideoSources = defaultVideoSources;
    }
    const audioSources = State.option.checks.EMBED_AUDIO.sources;
    const defaultAudioSources = 'audio, [src*="soundcloud.com"], [src*="simplecast.com"], [src*="podbean.com"], [src*="buzzsprout.com"], [src*="blubrry.com"], [src*="transistor.fm"], [src*="fusebox.fm"], [src*="libsyn.com"], [src*="spotify.com"], [src*="podcasts.apple.com"], [src*="castbox.fm"], [src*="megaphone.fm"], [src*="spreaker.com"], [src*="anchor.fm"], [src*="rss.com"], [src*="redcircle.com"]';
    if (audioSources) {
      const audio = audioSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.AudioSources = `${defaultAudioSources}, ${audio.join(", ")}`;
    } else {
      Global.AudioSources = defaultAudioSources;
    }
    const dataVizSources = State.option.checks.EMBED_DATA_VIZ.sources;
    const defaultDataVizSources = '[src*="datastudio"], [src*="tableau"], [src*="lookerstudio"], [src*="powerbi"], [src*="qlik"]';
    if (dataVizSources) {
      const data = dataVizSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.VisualizationSources = `${defaultDataVizSources}, ${data.join(", ")}`;
    } else {
      Global.VisualizationSources = defaultDataVizSources;
    }
    Global.AllEmbeddedContent = `${Global.VideoSources}, ${Global.AudioSources}, ${Global.VisualizationSources}`;
  }
  const Root = {};
  function initializeRoot2(desiredRoot, desiredReadabilityRoot, fixedRoots) {
    Root.areaToCheck = [];
    Root.Readability = [];
    if (fixedRoots) {
      Root.areaToCheck = fixedRoots;
      Root.Readability = fixedRoots;
      return;
    }
    try {
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
    if (Root.areaToCheck.length === 0 && Global.headless === false) {
      createAlert(Lang.sprintf("MISSING_ROOT", desiredRoot));
      Root.areaToCheck.push(document.body);
    }
    try {
      const roots = document.querySelectorAll(desiredReadabilityRoot);
      if (roots.length > 0) {
        roots.forEach((root) => {
          Constants.Root.Readability.push(root);
        });
      } else {
        console.error(
          `Sa11y: The target readability root (${desiredReadabilityRoot}) does not exist.`
        );
      }
    } catch {
      Root.Readability.length = 0;
    }
    if (Root.Readability.length === 0 && Global.headless === false) {
      if (Root.areaToCheck.length === 0) {
        Root.Readability.push(document.body);
      } else {
        Root.Readability = Root.areaToCheck;
        setTimeout(() => {
          const { readabilityDetails, readabilityToggle } = Constants.Panel;
          const readabilityOn = readabilityToggle?.getAttribute("aria-pressed") === "true";
          const alert = Constants.Panel.readability.querySelector("#readability-alert");
          if (readabilityDetails && readabilityOn && !alert) {
            const roots = Root.areaToCheck.map((el) => {
              if (el.id) return `#${el.id}`;
              if (el.className) return `.${el.className.split(/\s+/).filter(Boolean).join(".")}`;
              return el.tagName.toLowerCase();
            }).join(", ");
            const note = document.createElement("div");
            note.id = "readability-alert";
            note.innerHTML = `<hr><p>${Lang.sprintf("MISSING_READABILITY_ROOT", roots, desiredReadabilityRoot)}</p>`;
            readabilityDetails.insertAdjacentElement("afterend", note);
          }
        }, 100);
      }
    }
  }
  const Panel = {};
  function initializePanelSelectors() {
    const Sa11yPanel = document.querySelector("sa11y-control-panel").shadowRoot;
    Panel.panel = Sa11yPanel.getElementById("panel");
    Panel.content = Sa11yPanel.getElementById("panel-content");
    Panel.controls = Sa11yPanel.getElementById("panel-controls");
    Panel.outline = Sa11yPanel.getElementById("outline-panel");
    Panel.outlineContent = Sa11yPanel.getElementById("outline-content");
    Panel.outlineList = Sa11yPanel.getElementById("outline-list");
    Panel.outlineHeader = Sa11yPanel.getElementById("outline-header");
    Panel.images = Sa11yPanel.getElementById("images-panel");
    Panel.imagesContent = Sa11yPanel.getElementById("images-content");
    Panel.imagesList = Sa11yPanel.getElementById("images-list");
    Panel.imagesHeader = Sa11yPanel.getElementById("images-header");
    Panel.notifBadge = Sa11yPanel.getElementById("notification-badge");
    Panel.notifCount = Sa11yPanel.getElementById("notification-count");
    Panel.notifText = Sa11yPanel.getElementById("notification-text");
    Panel.status = Sa11yPanel.getElementById("status");
    Panel.pageIssues = Sa11yPanel.getElementById("page-issues");
    Panel.pageIssuesList = Sa11yPanel.getElementById("page-issues-list");
    Panel.pageIssuesHeader = Sa11yPanel.getElementById("page-issues-header");
    Panel.pageIssuesContent = Sa11yPanel.getElementById("page-issues-content");
    Panel.settings = Sa11yPanel.getElementById("settings-panel");
    Panel.settingsHeader = Sa11yPanel.getElementById("settings-header");
    Panel.settingsContent = Sa11yPanel.getElementById("settings-content");
    Panel.developerToggle = Sa11yPanel.getElementById("developer-toggle");
    Panel.readabilityToggle = Sa11yPanel.getElementById("readability-toggle");
    Panel.themeToggle = Sa11yPanel.getElementById("theme-toggle");
    Panel.developerItem = Sa11yPanel.getElementById("developer-item");
    Panel.readabilityItem = Sa11yPanel.getElementById("readability-item");
    Panel.darkModeItem = Sa11yPanel.getElementById("dark-mode-item");
    Panel.colourPanel = Sa11yPanel.getElementById("panel-colour-filters");
    Panel.colourFilterItem = Sa11yPanel.getElementById("colour-filter-item");
    Panel.colourFilterSelect = Sa11yPanel.getElementById("colour-filter-select");
    Panel.colourFilterIcon = Sa11yPanel.getElementById("filter-icon");
    Panel.toggle = Sa11yPanel.getElementById("toggle");
    Panel.outlineToggle = Sa11yPanel.getElementById("outline-toggle");
    Panel.imagesToggle = Sa11yPanel.getElementById("images-toggle");
    Panel.settingsToggle = Sa11yPanel.getElementById("settings-toggle");
    Panel.movePanelToggle = Sa11yPanel.getElementById("move-panel");
    Panel.skipButton = Sa11yPanel.getElementById("skip-button");
    Panel.dismissButton = Sa11yPanel.getElementById("dismiss-button");
    Panel.dismissTooltip = Sa11yPanel.getElementById("dismiss-tooltip");
    Panel.skipToPageIssues = Sa11yPanel.getElementById("skip-to-page-issues");
    Panel.exportHTML = Sa11yPanel.getElementById("export-html");
    Panel.exportCSV = Sa11yPanel.getElementById("export-csv");
    Panel.alert = Sa11yPanel.getElementById("panel-alert");
    Panel.alertText = Sa11yPanel.getElementById("panel-alert-text");
    Panel.alertPreview = Sa11yPanel.getElementById("panel-alert-preview");
    Panel.alertClose = Sa11yPanel.getElementById("close-alert");
    Panel.readability = Sa11yPanel.getElementById("readability-panel");
    Panel.readabilityInfo = Sa11yPanel.getElementById("readability-info");
    Panel.readabilityDetails = Sa11yPanel.getElementById("readability-details");
  }
  const Readability = {};
  function initializeReadability() {
    if (State.option.readabilityPlugin) {
      const supported = [
        "en",
        "fr",
        "es",
        "de",
        "nl",
        "it",
        "sv",
        "fi",
        "da",
        "no",
        "nb",
        "nn",
        "pt"
      ];
      const langCode = Lang._("LANG_CODE").substring(0, 2);
      const pageLang = Constants.Global.html.getAttribute("lang")?.toLowerCase().substring(0, 2);
      Readability.Lang = langCode;
      const isSupported = pageLang && supported.includes(pageLang) && supported.includes(langCode);
      Readability.Plugin = Boolean(isSupported);
    }
  }
  const Exclusions = {};
  function initializeExclusions() {
    Exclusions.Sa11yElements = [
      "sa11y-heading-label",
      "sa11y-heading-anchor",
      "sa11y-annotation",
      "sa11y-tooltips",
      "sa11y-panel-tooltips",
      "sa11y-control-panel",
      "#sa11y-colour-filters",
      "#sa11y-colour-filters *"
    ];
    const exclusions = ["style", "script", "noscript"];
    Exclusions.Container = ["#wpadminbar", "#wpadminbar *", ...exclusions];
    if (State.option.containerIgnore) {
      const containerSelectors = State.option.containerIgnore.split(",").map((item) => item.trim());
      Exclusions.Container = Exclusions.Container.concat(
        containerSelectors.flatMap((item) => [`${item} *`, item])
      );
    }
    Exclusions.Contrast = [
      "link",
      "hr",
      "State.option",
      "audio",
      "audio *",
      "video",
      "video *",
      'input[type="color"]',
      'input[type="range"]',
      "progress",
      "progress *",
      "meter",
      "meter *",
      "iframe",
      "svg",
      "svg *",
      "script",
      "style",
      "noscript",
      "template",
      "head",
      "head *",
      "title",
      "meta",
      "link",
      "base",
      "datalist",
      "datalist *",
      ...exclusions
    ];
    if (State.option.contrastIgnore) {
      Exclusions.Contrast = State.option.contrastIgnore.split(",").map(($el) => $el.trim()).flatMap(($el) => [$el, `${$el} *`]).concat(Exclusions.Contrast);
    }
    Exclusions.Readability = ["nav li", '[role="navigation"] li', ...exclusions];
    if (State.option.readabilityIgnore) {
      Exclusions.Readability = State.option.readabilityIgnore.split(",").map(($el) => $el.trim()).flatMap(($el) => [$el, `${$el} *`]).concat(Exclusions.Readability);
    }
    Exclusions.Headings = State.option.headerIgnore ? State.option.headerIgnore.split(",").map(($el) => $el.trim()) : [];
    Exclusions.HeaderSpan = State.option.headerIgnoreSpan ? State.option.headerIgnoreSpan.split(",").map(($el) => $el.trim()) : [];
    Exclusions.Outline = State.option.outlineIgnore ? State.option.outlineIgnore.split(",").map(($el) => $el.trim()) : [];
    Exclusions.Images = [
      'img[role="presentation"]:not(a img[role="presentation"]), img[aria-hidden="true"]:not(a img[aria-hidden="true"])'
    ];
    if (State.option.imageIgnore) {
      Exclusions.Images = State.option.imageIgnore.split(",").map(($el) => $el.trim()).concat(Exclusions.Images);
    }
    Exclusions.Links = [".anchorjs-link"];
    if (State.option.linkIgnore) {
      Exclusions.Links = State.option.linkIgnore.split(",").map(($el) => $el.trim()).concat(Exclusions.Links);
    }
    Exclusions.LinkSpan = State.option.linkIgnoreSpan ? State.option.linkIgnoreSpan.split(",").map(($el) => $el.trim()) : [];
    Exclusions.Paragraphs = State.option.paragraphIgnore ? State.option.paragraphIgnore.split(",").map(($el) => $el.trim()) : [];
  }
  return {
    initializeRoot: initializeRoot2,
    Root,
    initializeGlobal,
    Global,
    initializePanelSelectors,
    Panel,
    initializeReadability,
    Readability,
    initializeExclusions,
    Exclusions
  };
})();
function find(selector, desiredRoot, exclude) {
  const root = [];
  if (desiredRoot === "document") {
    root.push(document.body);
    if (State.option.fixedRoots) {
      root.push(State.option.fixedRoots);
    }
  } else if (desiredRoot === "root") {
    root.push(Constants.Root.areaToCheck);
  } else {
    root.push(document.querySelectorAll(desiredRoot));
  }
  const exclusions = Constants.Exclusions.Container.join(", ");
  const additionalExclusions = exclude?.join(", ") || "";
  const additional = additionalExclusions ? `, ${additionalExclusions}` : "";
  let list = [];
  root.flat().filter(Boolean)?.forEach((r) => {
    const shadowComponents = r?.querySelectorAll("[data-sa11y-has-shadow-root]");
    const shadow = shadowComponents ? ", [data-sa11y-has-shadow-root]" : "";
    const elements2 = Array.from(
      r.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`)
    );
    if (shadowComponents.length) {
      const shadowFind = [];
      elements2.forEach((el, i) => {
        if (el?.matches?.("[data-sa11y-has-shadow-root]") && el?.shadowRoot) {
          shadowFind[i] = el.shadowRoot.querySelectorAll(
            `:is(${selector}):not(${exclusions}${additional})`
          );
        }
      });
      if (shadowFind.length > 0) {
        for (let index = shadowFind.length - 1; index >= 0; index--) {
          if (shadowFind[index]) {
            elements2.splice(index, 1, ...shadowFind[index]);
          }
        }
      }
    }
    list = list.concat(elements2.filter((node) => node.parentNode.tagName !== "SLOT"));
  });
  return list;
}
function documentLoadingCheck(callback) {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback);
  }
}
function isScreenReaderOnly(element) {
  const style = getComputedStyle(element);
  if (style.getPropertyValue("clip-path").startsWith("inset(50%)")) {
    return true;
  }
  if (style.clip === "rect(1px, 1px, 1px, 1px)" || style.clip === "rect(0px, 0px, 0px, 0px)") {
    return true;
  }
  const indent = parseInt(style.textIndent, 10);
  if (!Number.isNaN(indent) && Math.abs(indent) > 5e3) {
    return true;
  }
  if (style.overflow === "hidden" && parseFloat(style.width) < 2 && parseFloat(style.height) < 2) {
    return true;
  }
  if (style.position === "absolute" && ["left", "right", "top", "bottom"].some((p) => Math.abs(parseInt(style[p], 10)) > 5e3)) {
    return true;
  }
  return parseFloat(style.fontSize) < 2;
}
function isElementHidden(element) {
  return element.hidden || getComputedStyle(element).getPropertyValue("display") === "none";
}
function isElementVisuallyHiddenOrHidden(element) {
  if (element.offsetWidth === 0 && element.offsetHeight === 0 || element.clientHeight === 1 && element.clientWidth === 1) {
    return true;
  }
  return isElementHidden(element);
}
function stripAllSpecialCharacters(string) {
  if (!string) return "";
  return string.replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();
}
function escapeHTML(string) {
  if (!string) return "";
  return string.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
}
const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
const htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
const htmlCtrlEntityRegex = /&(newline|tab);/gi;
const ctrlCharactersRegex = (
  // biome-ignore lint/suspicious/noControlCharactersInRegex: original lib.
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim
);
const urlSchemeRegex = /^.+(:|&colon;)/gim;
const whitespaceEscapeCharsRegex = /(\\|%5[cC])((%(6[eE]|72|74))|[nrt])/g;
const relativeFirstCharacters = [".", "/"];
const BLANK_URL = "about:blank";
function isRelativeUrlWithoutProtocol(url2) {
  return relativeFirstCharacters.indexOf(url2[0]) > -1;
}
function decodeHtmlCharacters(str) {
  const removedNullByte = str.replace(ctrlCharactersRegex, "");
  return removedNullByte.replace(htmlEntitiesRegex, (match, dec) => {
    return String.fromCharCode(dec);
  });
}
function isValidUrl(url2) {
  if (typeof URL.canParse === "function") {
    return URL.canParse(url2);
  }
  try {
    const parsedUrl = new URL(url2);
    return Boolean(parsedUrl);
  } catch {
    return false;
  }
}
const decodeURIs = (uri) => {
  try {
    return decodeURIComponent(uri);
  } catch {
    return uri;
  }
};
function sanitizeURL(url2) {
  if (!url2) return BLANK_URL;
  let charsToDecode;
  let decodedUrl = decodeURIs(url2.trim());
  do {
    decodedUrl = decodeHtmlCharacters(decodedUrl).replace(htmlCtrlEntityRegex, "").replace(ctrlCharactersRegex, "").replace(whitespaceEscapeCharsRegex, "").trim();
    decodedUrl = decodeURIs(decodedUrl);
    charsToDecode = decodedUrl.match(ctrlCharactersRegex) || decodedUrl.match(htmlEntitiesRegex) || decodedUrl.match(htmlCtrlEntityRegex) || decodedUrl.match(whitespaceEscapeCharsRegex);
  } while (charsToDecode && charsToDecode.length > 0);
  const sanitizedUrl = decodedUrl;
  if (!sanitizedUrl) return BLANK_URL;
  if (isRelativeUrlWithoutProtocol(sanitizedUrl)) return sanitizedUrl;
  const trimmedUrl = sanitizedUrl.trimStart();
  const urlSchemeParseResults = trimmedUrl.match(urlSchemeRegex);
  if (!urlSchemeParseResults) return sanitizedUrl;
  const urlScheme = urlSchemeParseResults[0].toLowerCase().trim();
  if (invalidProtocolRegex.test(urlScheme)) return BLANK_URL;
  const backSanitized = trimmedUrl.replace(/\\/g, "/");
  if (urlScheme === "mailto:" || urlScheme.includes("://")) return backSanitized;
  if (urlScheme === "http:" || urlScheme === "https:") {
    if (!isValidUrl(backSanitized)) return BLANK_URL;
    const url3 = new URL(backSanitized);
    url3.protocol = url3.protocol.toLowerCase();
    url3.hostname = url3.hostname.toLowerCase();
    return url3.toString();
  }
  return backSanitized;
}
function sanitizeHTML(string) {
  const doc = new DOMParser().parseFromString(string, "text/html");
  const dangerousTags = "script, iframe, object, embed, applet, style";
  doc.body.querySelectorAll(dangerousTags).forEach((node) => {
    node.remove();
  });
  doc.body.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach(({ name, value }) => {
      const val = value.replace(/\s+/g, "").toLowerCase();
      const isEvent = name.startsWith("on");
      const isUrl = ["src", "href", "xlink:href"].includes(name);
      const isPhishy = val.includes("javascript:") || val.includes("data:text/html") || val.includes("vbscript:");
      if (isEvent || isUrl && isPhishy) {
        node.removeAttribute(name);
      }
    });
  });
  return doc.body.innerHTML;
}
function fnIgnore(element, selectors = []) {
  const baseIgnores = "noscript,script,style,audio,video,form,iframe";
  const ignoreQuery = selectors.length ? `${baseIgnores},${selectors.join(",")}` : baseIgnores;
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return element ? element.cloneNode(true) : null;
  }
  function cloneTree(node, isRoot = false) {
    const type = node.nodeType;
    if (type === Node.ELEMENT_NODE) {
      if (node.matches(ignoreQuery) && !isRoot) {
        return null;
      }
      const clone = node.cloneNode(false);
      if (node.matches(ignoreQuery) && isRoot) {
        return clone;
      }
      let child = node.firstChild;
      while (child) {
        const clonedChild = cloneTree(child);
        if (clonedChild) clone.appendChild(clonedChild);
        child = child.nextSibling;
      }
      return clone;
    }
    if (type === Node.TEXT_NODE) return node.cloneNode(true);
    return null;
  }
  return cloneTree(element, true);
}
let gotText = /* @__PURE__ */ new WeakMap();
function getText(element) {
  if (gotText.has(element)) {
    return gotText.get(element);
  }
  const ignore = fnIgnore(element);
  const text = ignore.textContent.replace(/[\r\n]+/g, "").replace(/\s+/g, " ").trim();
  gotText.set(element, text);
  return text;
}
function resetGetText() {
  gotText = /* @__PURE__ */ new WeakMap();
}
function removeWhitespace(string) {
  return string.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}
function normalizeString(string) {
  return removeWhitespace(string.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""));
}
function truncateString(string, maxLength) {
  const truncatedString = string.substring(0, maxLength).trimEnd();
  return string.length > maxLength ? `${truncatedString}...` : string;
}
const store = {
  getItem(key) {
    try {
      if (localStorage.getItem(key) === null) {
        return sessionStorage.getItem(key);
      }
      return localStorage.getItem(key);
    } catch {
      return false;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      sessionStorage.setItem(key, value);
    }
    return true;
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      sessionStorage.removeItem(key);
    }
    return true;
  }
};
function prepareDismissal(string) {
  return String(string).replace(/([^0-9a-zA-Z])/g, "").substring(0, 256);
}
function getBestImageSource(element) {
  const getLastSrc = (src) => src?.split(/,\s+/).pop()?.trim()?.split(/\s+/)[0];
  const resolveUrl = (src) => src ? new URL(src, window.location.href).href : null;
  const dataSrc = getLastSrc(element.getAttribute("data-src") || element.getAttribute("srcset"));
  if (dataSrc) return resolveUrl(dataSrc);
  const pictureSrcset = element.closest("picture")?.querySelector("source[srcset]")?.getAttribute("srcset");
  const pictureSrc = getLastSrc(pictureSrcset);
  if (pictureSrc) return resolveUrl(pictureSrc);
  return resolveUrl(element.getAttribute("src"));
}
function isVisibleTextInAccName($el, accName, exclusions = [], linkIgnoreStrings) {
  let text = "";
  const excludeSelector = exclusions?.length ? exclusions.join(",") : "";
  const ignoreStrings = Array.isArray(linkIgnoreStrings) ? linkIgnoreStrings : null;
  const stripIgnored = (value = "") => ignoreStrings ? ignoreStrings.reduce((result, str) => result.replace(str, ""), value) : value;
  $el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += stripIgnored(node.textContent);
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    if (excludeSelector && node.matches(excludeSelector)) {
      return;
    }
    if (!isElementVisuallyHiddenOrHidden(node)) {
      text += stripIgnored(getText(node));
    }
  });
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  let visibleText = text.replace(emojiRegex, "");
  visibleText = removeWhitespace(visibleText).toLowerCase();
  if (visibleText === "x") {
    return false;
  }
  return visibleText.length !== 0 && !accName.toLowerCase().includes(visibleText);
}
function standardizeHref($el) {
  let href = $el.getAttribute("href");
  href = removeWhitespace(href).toLowerCase();
  if (href.endsWith("/")) {
    href = href.slice(0, -1);
  }
  href = href.replace(/^https?:\/\/(www\.)?/, "");
  href = href.replace(/\.(html|php|htm|asp|aspx)$/i, "");
  return href;
}
function generateRegexString(input, matchStart = false) {
  if (!input) return null;
  if (input instanceof RegExp) return input;
  let patterns = [];
  if (Array.isArray(input)) {
    patterns = input;
  } else if (typeof input === "string") {
    patterns = input.split(",").map((s) => s.trim());
  } else {
    return null;
  }
  patterns = patterns.filter((p) => p && p.length > 0);
  if (patterns.length === 0) return null;
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };
  const joinedPatterns = patterns.map(escapeRegExp).join("|");
  const finalPattern = matchStart ? `^(?:${joinedPatterns})` : joinedPatterns;
  return new RegExp(finalPattern, "gi");
}
async function dismissDigest(pepper, message) {
  const msgUint8 = new TextEncoder().encode(pepper + message);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
  if (Uint8Array.prototype.toHex) {
    return new Uint8Array(hashBuffer).toHex();
  }
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
let langCache;
function validateLang(code, displayLangCode) {
  if (typeof code !== "string") return { valid: false };
  const norm = code.trim().replace(/_/g, "-");
  if (!langCache && typeof Intl !== "undefined") {
    try {
      langCache = new Intl.DisplayNames([displayLangCode], { type: "language", fallback: "none" });
    } catch {
    }
  }
  if (langCache) {
    const check = (val) => {
      try {
        return langCache.of(val);
      } catch {
        return false;
      }
    };
    if (check(code)) return { valid: true };
    if (check(norm)) return { valid: false, suggest: norm };
    return { valid: false };
  }
  return { valid: /^[a-z]{2,3}(-[a-z]{4})?(-[a-z]{2,4})?$/i.test(norm) };
}
const Elements = /* @__PURE__ */ (function myElements() {
  const Found = {};
  function initializeElements() {
    Found.Everything = find("*", "root", Constants.Exclusions.Sa11yElements);
    Found.Contrast = Found.Everything.filter(($el) => {
      const matchesSelector = Constants.Exclusions.Contrast.some(
        (exclusion) => $el.matches(exclusion)
      );
      return !matchesSelector && !Constants.Exclusions.Contrast.includes($el);
    });
    Found.Images = Found.Everything.filter(
      ($el) => $el.tagName === "IMG" && !Constants.Exclusions.Images.some((selector) => $el.matches(selector))
    );
    Found.Links = Found.Everything.filter(
      ($el) => ($el.tagName === "A" || $el.tagName === "a") && $el.hasAttribute("href") && !$el.matches('[role="button"]') && // Exclude links with [role="button"]
      !Constants.Exclusions.Links.some((selector) => $el.matches(selector))
    );
    Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      State.option.ignoreContentOutsideRoots || State.option.fixedRoots ? "root" : "document",
      Constants.Exclusions.Headings
    );
    Found.HeadingOne = find(
      'h1, [role="heading"][aria-level="1"]',
      State.option.ignoreContentOutsideRoots || State.option.fixedRoots ? "root" : "document",
      Constants.Exclusions.Headings
    );
    Found.HeadingOverrideStart = /* @__PURE__ */ new WeakMap();
    Found.HeadingOverrideEnd = /* @__PURE__ */ new WeakMap();
    if (State.option.initialHeadingLevel) {
      State.option.initialHeadingLevel.forEach((section) => {
        const headingsInSection = find(
          `${section.selector} :is(h1,h2,h3,h4,h5,h6,[aria-role=heading][aria-level])`,
          State.option.ignoreContentOutsideRoots || State.option.fixedRoots ? "root" : "document",
          Constants.Exclusions.Headings
        );
        if (headingsInSection.length > 0) {
          Found.HeadingOverrideStart.set(headingsInSection[0], section.previousHeading);
          Found.HeadingOverrideEnd.set(headingsInSection.pop(), section.previousHeading);
        }
      });
    }
    Found.ExcludedHeadings = Found.Headings.filter(
      (heading) => Constants.Exclusions.Headings.some((exclusion) => heading.matches(exclusion))
    );
    Found.ExcludedOutlineHeadings = Found.Headings.filter(
      (heading) => Constants.Exclusions.Outline.some((exclusion) => heading.matches(exclusion))
    );
    Found.OutlineIgnore = Elements.Found.ExcludedOutlineHeadings.concat(
      Elements.Found.ExcludedHeadings
    );
    Found.Paragraphs = Found.Everything.filter(
      ($el) => $el.tagName === "P" && !Constants.Exclusions.Paragraphs.some((selector) => $el.matches(selector))
    );
    Found.Lists = Found.Everything.filter(($el) => $el.tagName === "LI");
    Found.Blockquotes = Found.Everything.filter(($el) => $el.tagName === "BLOCKQUOTE");
    Found.Tables = Found.Everything.filter(
      ($el) => $el.tagName === "TABLE" && !$el.matches('[role="presentation"]') && !$el.matches('[role="none"]')
    );
    Found.StrongItalics = Found.Everything.filter(($el) => ["STRONG", "EM"].includes($el.tagName));
    Found.Subscripts = Found.Everything.filter(($el) => ["SUP", "SUB"].includes($el.tagName));
    const badLinkSources = State.option.checks.QA_BAD_LINK.sources;
    Found.CustomErrorLinks = badLinkSources.length ? Found.Links.filter(
      ($el) => badLinkSources.split(",").some((selector) => $el.matches(selector.trim()))
    ) : [];
    const readabilityExclusions = ($el) => Constants.Root.Readability.some((rootEl) => rootEl.contains($el)) && !Constants.Exclusions.Readability.some((selector) => $el.matches(selector));
    Found.Readability = [
      ...Found.Paragraphs.filter(readabilityExclusions),
      ...Found.Lists.filter(readabilityExclusions)
    ].map(($el) => getText(fnIgnore($el))).filter(Boolean);
    const elementSet = new Set(Found.Everything);
    Found.pageText = Found.Everything.filter(($el) => {
      if ($el instanceof HTMLImageElement) return true;
      let parent = $el.parentElement;
      while (parent) {
        if (elementSet.has(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    }).map(($el) => {
      let text = "";
      if ($el instanceof HTMLImageElement) {
        text = $el.alt || "";
      } else if ($el.tagName === "LI") {
        text = Array.from($el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ");
      } else {
        text = getText(fnIgnore($el));
      }
      return normalizeString(text);
    }).filter(Boolean);
    const nestedSources = State.option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
    Found.NestedComponents = Found.Everything.filter(($el) => $el.matches(nestedSources));
    Found.TabIndex = Found.Everything.filter(
      ($el) => $el.hasAttribute("tabindex") && $el.getAttribute("tabindex") !== "0" && !$el.getAttribute("tabindex").startsWith("-")
    );
    Found.Svg = Found.Everything.filter(($el) => $el.tagName === "svg");
    Found.Buttons = Found.Everything.filter(
      ($el) => $el.tagName === "BUTTON" || $el.matches('[role="button"]')
    );
    Found.Inputs = Found.Everything.filter(
      ($el) => ["INPUT", "SELECT", "TEXTAREA", "METER", "PROGRESS"].includes($el.tagName)
    );
    Found.Labels = Found.Everything.filter(($el) => $el.tagName === "LABEL");
    Found.iframes = Found.Everything.filter(
      ($el) => ["IFRAME", "AUDIO", "VIDEO"].includes($el.tagName)
    );
    Found.Videos = Found.iframes.filter(($el) => $el.matches(Constants.Global.VideoSources));
    Found.Audio = Found.iframes.filter(($el) => $el.matches(Constants.Global.AudioSources));
    Found.Visualizations = Found.iframes.filter(
      ($el) => $el.matches(Constants.Global.VisualizationSources)
    );
    Found.EmbeddedContent = Found.iframes.filter(
      ($el) => !$el.matches(Constants.Global.AllEmbeddedContent)
    );
    const html = document.querySelector("html");
    Found.Language = html.getAttribute("lang")?.trim();
  }
  const Annotations = {};
  function initializeAnnotations() {
    Annotations.Array = find("sa11y-annotation", "document");
    Annotations.Array.forEach((annotation, i) => {
      annotation.setAttribute("data-sa11y-position", i);
    });
  }
  return {
    initializeElements,
    Found,
    initializeAnnotations,
    Annotations
  };
})();
function findShadowComponents(option) {
  if (!option) {
    option = State.option;
  }
  if (option.autoDetectShadowComponents) {
    const ignore = Constants.Exclusions.Sa11yElements;
    const root = document.querySelector(option.checkRoot);
    const search = root ? Array.from(root.querySelectorAll(`*:not(${ignore})`)) : Array.from(document.body.querySelectorAll(`*:not(${ignore})`));
    search.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === "open") {
        component.setAttribute("data-sa11y-has-shadow-root", "");
      }
    });
  } else if (option.shadowComponents) {
    const providedShadow = document.querySelectorAll(option.shadowComponents);
    providedShadow.forEach((component) => {
      component.setAttribute("data-sa11y-has-shadow-root", "");
    });
  }
}
const version = "3.0.0-dev0211";
const UI = {
  editableHighlight: {},
  imageAlts: [],
  attachCSS: () => {
  },
  panel: false,
  message: {},
  panelElement: {},
  panelNoCover: [],
  panelToggle: {},
  panelToggleTitle: {},
  panelCount: {},
  panelJumpNext: {},
  panelShowDismissed: {},
  theme: {},
  version,
  english: true,
  running: false,
  watching: [],
  seen: [],
  ignore: "",
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
  results: [],
  dismissKeys: {},
  roots: [],
  headingOutlineOverrides: [],
  elements: {
    // to be replaced by Sa11y find.
    altMark: [],
    delayedReset: []
  },
  splitConfiguration: {
    active: false,
    showDev: false,
    contentOptions: {},
    devChecks: [],
    devOptions: {},
    devResults: []
  },
  /* Panel initial state */
  once: false,
  bodyStyle: false,
  disabled: false,
  onLoad: true,
  showPanel: false,
  showDismissed: false,
  nextText: "",
  panelAttachTo: document.body,
  visualizing: false,
  /* Annotations initial states */
  jumpList: [],
  openJumpPosition: Number - 1,
  viaJump: false,
  toggledFrom: false,
  scrollPending: 0,
  scrollTicking: false,
  tipOpen: false,
  openTip: {
    button: {},
    tip: {}
  },
  positionedFrames: [],
  recentlyAddedNodes: /* @__PURE__ */ new WeakMap()
};
class ConsoleErrors extends HTMLElement {
  constructor(error) {
    super();
    this.error = error;
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const content = document.createElement("dialog");
    content.ariaLabel = Lang._("ERROR");
    const url2 = sanitizeURL(window.location);
    const google = "";
    const template = `## Error Description
\`\`\`javascript
${this.error.stack}
\`\`\`

## Details
- **URL:** ${url2}
- **Version:** ${UI.version}

## Comments
`;
    const preContents = `Version: ${UI.version}
URL: ${url2}`;
    const encodedTemplate = encodeURIComponent(template);
    const github = `https://github.com/itmaybejj/editoria11y/issues/new?title=Bug%20report&body=${encodedTemplate}`;
    content.innerHTML = `
      <button class="close-btn" aria-describedby="ed11y-console-error"><span aria-hidden="true">&times</span> ${Lang._("ALERT_CLOSE")}</button>
      <h2 id="ed11y-console-error">${Lang._("ERROR")}</h2>
      <p>${Lang.sprintf("CONSOLE_ERROR", google, github)}</p>
      <p><strong>${Lang._("DEVELOPER_CHECKS")}:</strong></p>
      <pre>
</pre>
  		<p><strong>${Lang._("ERRORS")}:</strong></p>
<pre>${escapeHTML(this.error.stack)}</pre>
    `;
    shadow.appendChild(content);
    const pre = content.querySelector("pre");
    pre.textContent = preContents;
    setTimeout(() => {
      content.show();
      const button = content.querySelector("button");
      button.style.setProperty("padding", "1em;");
      button.style.setProperty("filter", "invert(1)");
      const hiddenItems = content.querySelectorAll(".visually-hidden");
      hiddenItems?.forEach((hidden) => {
        hidden.style.setProperty("position", "absolute");
        hidden.style.setProperty("width", "1px");
        hidden.style.setProperty("height", "1px");
        hidden.style.setProperty("overflow", "hidden");
      });
      const preS = content.querySelectorAll("pre");
      preS.forEach((pre2) => {
        pre2.style.setProperty("margin-left", "18px");
      });
      const close = content.querySelector(".close-btn");
      close.addEventListener("click", () => {
        content.close();
      });
    }, 0);
  }
}
function getElements(selector, desiredRoot, exclude = Constants.Exclusions.Sa11yElements) {
  return find(selector, desiredRoot, exclude);
}
function findElements(key, selector, rootRestrict = true) {
  const desiredRoot = rootRestrict ? "root" : "document";
  Elements.Found[key] = find(selector, desiredRoot, Constants.Exclusions.Sa11yElements);
}
const smush = (obj1, obj2, skip = []) => {
  Object.entries(obj2).forEach(([key, value]) => {
    if (!skip.includes(key)) {
      obj1[key] = value;
    }
  });
};
function initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots) {
  Constants.Root.areaToCheck = [];
  Constants.Root.Readability = [];
  if (fixedRoots) {
    Constants.Root.areaToCheck = fixedRoots;
    Constants.Root.Readability = fixedRoots;
    return;
  }
  try {
    const roots = document.querySelectorAll(desiredRoot);
    if (roots.length > 0) {
      roots.forEach((root) => {
        Constants.Root.areaToCheck.push(root);
      });
    } else {
      console.error(`Sa11y: The target readability root (${desiredRoot}) does not exist.`);
    }
  } catch {
    Constants.Root.areaToCheck.length = 0;
  }
  if (Constants.Root.areaToCheck.length === 0 && Constants.Global.headless === false) {
    console.warn(Lang.sprintf("MISSING_ROOT", `"${State.option.checkRoot}"`).textContent);
    Constants.Root.areaToCheck.push(document.querySelector("body"));
  }
  try {
    const roots = document.querySelectorAll(desiredReadabilityRoot);
    if (roots.length > 0) {
      roots.forEach((root) => {
        Constants.Root.Readability.push(root);
      });
    } else {
      console.error(`Sa11y: The target readability root does not exist.`);
    }
  } catch {
    Constants.Root.Readability.length = 0;
  }
  if (Constants.Root.Readability.length === 0 && Constants.Global.headless === false) {
    if (Constants.Root.areaToCheck.length === 0) {
      Constants.Root.Readability.push(document.body);
    } else {
      Constants.Root.Readability = Constants.Root.areaToCheck;
      setTimeout(() => {
        const { readabilityDetails, readabilityToggle } = Constants.Panel;
        const readabilityOn = readabilityToggle?.getAttribute("aria-pressed") === "true";
        const alert = Constants.Panel.readability.querySelector("#readability-alert");
        if (readabilityDetails && readabilityOn && !alert) {
          const roots = Constants.Root.areaToCheck.map((el) => {
            if (el.id) return `#${el.id}`;
            if (el.className) return `.${el.className.split(/\s+/).filter(Boolean).join(".")}`;
            return el.tagName.toLowerCase();
          }).join(", ");
          const note = document.createElement("div");
          note.id = "readability-alert";
          note.innerHTML = `<hr><p></p>`;
          note.querySelector("p").append(Lang.sprintf("MISSING_READABILITY_ROOT", roots, desiredReadabilityRoot));
          readabilityDetails.insertAdjacentElement("afterend", note);
        }
      }, 100);
    }
  }
}
function addedNodeReadyToCheck(el) {
  if (!UI.recentlyAddedNodes.has(el)) {
    return true;
  }
  const hasText = el.textContent.trim().length;
  if (!hasText && UI.recentlyAddedNodes.get(el) > Date.now() - 5e3 || UI.activeRange && el.contains(UI.activeRange.startContainer)) {
    return false;
  } else if (el.matches("table") && el.querySelectorAll("td:not(:empty)")) {
    let cumulativeText = "";
    if (hasText) {
      const cells = el.querySelectorAll("td:not(:empty)");
      cells.forEach((cell) => {
        cumulativeText += cell.textContent;
      });
    }
    if (!cumulativeText) {
      return false;
    } else {
      UI.recentlyAddedNodes.delete(el);
      return true;
    }
  } else {
    UI.recentlyAddedNodes.delete(el);
    return true;
  }
}
const dropSomeElements = (arrayRef, sendTo = false, readyCheck = true, hiddenCheck = false) => {
  for (let i = arrayRef.length - 1; i >= 0; i--) {
    if (hiddenCheck && !elementNotHidden(arrayRef[i]) || readyCheck && !addedNodeReadyToCheck(arrayRef[i])) {
      if (sendTo) {
        sendTo.push(arrayRef[i]);
      }
      arrayRef.splice(i, 1);
    }
  }
};
function buildElementList(onlyForFilter = false) {
  UI.ignoreAll = State.option.ignoreAllIfAbsent && document.querySelector(`:is(${State.option.ignoreAllIfAbsent})`) === null;
  if (!UI.ignoreAll && !!State.option.ignoreAllIfPresent) {
    UI.ignoreAll = document.querySelector(`:is(${State.option.ignoreAllIfPresent})`) !== null;
  }
  initializeRoot(State.option.checkRoot, State.option.checkRoot, State.option.fixedRoots);
  for (let i = 0; i < UI.roots.length; i++) {
    if (State.option.fixedRoots) {
      UI.roots[i].dataset.ed11yRoot = `${i}`;
    }
    if (UI.roots[i].shadowRoot) {
      UI.roots.setAttribute("data-ed11y-has-shadow-root", "true");
      detectShadow(UI.roots[i]);
      UI.roots[i] = UI.roots[i].shadowRoot;
    } else {
      detectShadow(UI.roots[i]);
    }
  }
  findShadowComponents(State.option);
  if (onlyForFilter) {
    Elements.Found.Everything = find("*", "root", Constants.Exclusions.Sa11yElements);
    Elements.Found.Contrast = Elements.Found.Everything.filter(($el) => {
      const matchesSelector = Constants.Exclusions.Contrast.some(
        (exclusion) => $el.matches(exclusion)
      );
      return !matchesSelector && !Constants.Exclusions.Contrast.includes($el);
    });
    Elements.Found.Images = Elements.Found.Everything.filter(
      ($el) => $el.tagName === "IMG" && !Constants.Exclusions.Images.some((selector) => $el.matches(selector))
    );
    Elements.Found.Links = Elements.Found.Everything.filter(
      ($el) => ($el.tagName === "A" || $el.tagName === "a") && $el.hasAttribute("href") && !$el.matches('[role="button"]') && // Exclude links with [role="button"]
      !Constants.Exclusions.Links.some((selector) => $el.matches(selector))
    );
    Elements.Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      "root",
      Constants.Exclusions.Headings
    );
    Elements.Found.ExcludedHeadings = Elements.Found.Headings.filter(
      (heading) => Constants.Exclusions.Headings.some((exclusion) => heading.matches(exclusion))
    );
    Elements.Found.ExcludedOutlineHeadings = Elements.Found.Headings.filter(
      (heading) => Constants.Exclusions.Outline.some((exclusion) => heading.matches(exclusion))
    );
    Elements.Found.OutlineIgnore = Elements.Found.ExcludedOutlineHeadings.concat(
      Elements.Found.ExcludedHeadings
    );
  } else {
    State.headingOutline = [];
    Elements.initializeElements(State.option);
    dropSomeElements(Elements.Found.Headings, Elements.Found.OutlineIgnore, true, true);
    dropSomeElements(Elements.Found.Blockquotes);
    dropSomeElements(Elements.Found.Tables);
    if (typeof State.option.editableContent === "string") {
      Elements.Found.editable = getElements(State.option.editableContent, "document");
    } else {
      Elements.Found.editable = State.option.editableContent;
    }
    if (UI.inlineAlerts && Elements.Found.editable.length > 0) {
      UI.inlineAlerts = false;
      console.warn("Editable content detected; Editoria11y inline alerts disabled");
    }
    if (State.option.panelNoCover) {
      Elements.Found.panelNoCover = getElements(State.option.panelNoCover, "document");
    }
  }
}
function lagBounce(callback, wait) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait + UI.browserLag);
  };
}
function parents(el) {
  const nodes = [];
  nodes.push(el);
  while (el && !!el.parentElement && el.parentElement.tagName !== "HTML") {
    nodes.push(el.parentElement);
    el = el.parentElement;
  }
  return nodes;
}
function resetClass(classes) {
  classes?.forEach((cls) => {
    const reset2 = getElements(`.${cls}`, "document", []);
    reset2?.forEach((el) => {
      el.classList.remove(cls);
    });
  });
}
function visibleElement(el) {
  if (el) {
    if (!el.checkVisibility({
      opacityProperty: true,
      visibilityProperty: true
    })) {
      return false;
    }
    const style = window.getComputedStyle(el);
    return !(el.closest(".sr-only, .visually-hidden") || style.getPropertyValue("z-index") < 0 || style.getPropertyValue("overflow") === "hidden" && (el.offsetWidth < 10 || el.offsetHeight < 10));
  }
}
function visible(el) {
  if (!visibleElement(el)) {
    return false;
  } else {
    const theParents = parents(el);
    const visibleParent = (parent) => visibleElement(parent);
    return theParents.every(visibleParent);
  }
}
function firstVisibleParent(el) {
  let parent = el.parentElement;
  if (parent) {
    if (!visibleElement(parent)) {
      parent = firstVisibleParent(parent);
      return parent;
    } else {
      return parent;
    }
  } else {
    return false;
  }
}
function elementNotHidden(el) {
  return el.checkVisibility() && !el.closest('[aria-hidden="true"]');
}
function detectShadow(container) {
  if (State.option.autoDetectShadowComponents) {
    const select = `*:not(${Constants.Exclusions.Container.join(", ")}, .ed11y-element)`;
    let search;
    if (container.shadowRoot && container.shadowRoot.mode === "open") {
      if (!container.matches("[data-ed11y-has-shadow-root]")) {
        container.setAttribute("data-ed11y-has-shadow-root", "true");
        UI.attachCSS(container.shadowRoot);
        UI.attachCSS(container);
      }
      search = container.shadowRoot.querySelectorAll(select);
    } else {
      search = container.querySelectorAll(select);
    }
    search?.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === "open") {
        detectShadow(component);
      }
    });
  } else if (State.option.shadowComponents) {
    const providedShadow = container.querySelectorAll(State.option.shadowComponents);
    providedShadow.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === "open") {
        if (!container.matches("[data-ed11y-has-shadow-root]")) {
          component.setAttribute("data-ed11y-has-shadow-root", "true");
          UI.attachCSS(component.shadowRoot);
          UI.attachCSS(component);
        }
        detectShadow(component);
      } else {
        console.warn(
          `Editoria11y: A specified shadow host has no shadowRoot: ${component.tagName}`
        );
      }
    });
  }
}
function panelLabel(show = UI.showPanel) {
  if (show) {
    if (UI.english) {
      UI.panelToggleTitle.textContent = UI.totalCount > 0 ? Lang._("main_toggle_hide_alerts") : Lang._("main_toggle_hide");
    } else {
      UI.panelToggleTitle.textContent = Lang._("MAIN_TOGGLE_LABEL");
      UI.panelToggle.ariaExpanded = "true";
    }
  } else {
    if (UI.english) {
      UI.panelToggleTitle.textContent = UI.totalCount > 0 ? Lang._("main_toggle_show_alerts") : Lang._("main_toggle_show");
    } else {
      UI.panelToggleTitle.textContent = Lang._("MAIN_TOGGLE_LABEL");
      UI.panelToggle.ariaExpanded = "false";
    }
  }
}
function pauseObservers() {
  UI.watching?.forEach((observer) => {
    observer.observer.disconnect();
  });
}
function resumeObservers() {
  UI.watching?.forEach((observer) => {
    observer.observer.observe(observer.root, observer.config);
  });
}
function checkRunPrevent() {
  let preventCheck = State.option.preventCheckingIfPresent ? document.querySelector(State.option.preventCheckingIfPresent) : false;
  if (preventCheck) {
    console.warn(
      `Editoria11y is disabled because an element matched the "preventCheckingIfPresent" parameter:  "${State.option.preventCheckingIfPresent}"`
    );
  } else if (!preventCheck && !!State.option.preventCheckingIfAbsent) {
    preventCheck = document.querySelector(`:is(${State.option.preventCheckingIfAbsent})`) === null;
    if (preventCheck) {
      console.warn(
        `Editoria11y is disabled because no elements matched the "preventCheckingIfAbsent" parameter: "${State.option.preventCheckingIfAbsent}"`
      );
    }
  }
  return preventCheck;
}
function createDismissalKey(string) {
  return dismissDigest(State.option.pepper, prepareDismissal(string));
}
function resetResults(incremental) {
  UI.jumpList = [];
  UI.tipOpen = false;
  UI.openTip = {
    button: false,
    tip: false
  };
  UI.openJumpPosition = -1;
  resetClass([
    "ed11y-ring-red",
    "ed11y-ring-yellow",
    "ed11y-hidden-highlight",
    "ed11y-warning-inline",
    "ed11y-warning-block",
    "ed11y-error-block",
    "ed11y-error-inline"
  ]);
  if (incremental) {
    Elements.Found.reset = getElements("ed11y-element-highlight", "document", []);
  } else {
    Elements.Found.reset = getElements(
      "ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight",
      "document",
      []
    );
  }
  Elements.Found.reset?.forEach((el) => {
    el.remove();
  });
  Elements.Found.delayedReset = getElements(
    "ed11y-element-result, ed11y-element-tip",
    "document",
    []
  );
  window.setTimeout(
    () => {
      Elements.Found.delayedReset?.forEach((el) => {
        el.remove();
      });
    },
    100,
    Elements.Found.delayedReset
  );
  if (typeof UI.panelJumpNext === "function") {
    UI.panelJumpNext.querySelector(".ed11y-sr-only").textContent = UI.english ? Lang._("buttonFirstContent") : `${Lang._("SKIP_TO_ISSUE")} 1`;
  }
}
function newIncrementalResults() {
  if (UI.forceFullCheck || State.results.length !== UI.oldResults.length) {
    return true;
  }
  let newResultString = `${UI.errorCount} ${UI.warningCount}`;
  State.results.forEach((result) => {
    newResultString += result.test + result.element?.outerHTML;
  });
  const changed = newResultString !== UI.oldResultString;
  UI.oldResultString = newResultString;
  return changed;
}
function showError(error) {
  customElements.define("sa11y-console-error", ConsoleErrors);
  const consoleErrors = new ConsoleErrors(error);
  document.body.appendChild(consoleErrors);
  throw Error(error);
}
function checkHeaders() {
  let prevLevel;
  let prevHeadingText = "";
  const stringExclusionPattern = generateRegexString(State.option.headerIgnoreStrings);
  Elements.Found.Headings.forEach(($el, i) => {
    const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
    const stringMatchExclusions = accName.replace(stringExclusionPattern, "");
    const removeWhitespace$1 = removeWhitespace(stringMatchExclusions);
    const headingText = escapeHTML(removeWhitespace$1);
    const rootContainsHeading = Constants.Root.areaToCheck.some((root) => root.contains($el));
    const rootContainsShadowHeading = Constants.Root.areaToCheck.some(
      (root) => root.contains($el.getRootNode().host)
    );
    const isWithinRoot = rootContainsHeading || rootContainsShadowHeading;
    const headingStartsOverride = Elements.Found.HeadingOverrideStart.get($el);
    if (headingStartsOverride) {
      prevLevel = headingStartsOverride;
    }
    const level = parseInt($el.getAttribute("aria-level") || $el.tagName.slice(1), 10);
    const headingLength = removeWhitespace$1.length;
    const maxHeadingLength = State.option.checks.HEADING_LONG.maxLength || 160;
    let test = null;
    let type = null;
    let content = null;
    let developer = null;
    let dismissAll = null;
    let margin = null;
    if (headingLength === 0) {
      const image = $el.querySelector("img");
      if (image) {
        const alt = image?.getAttribute("alt");
        if (image && (!alt || alt.trim() === "")) {
          if (State.option.checks.HEADING_EMPTY_WITH_IMAGE) {
            test = "HEADING_EMPTY_WITH_IMAGE";
            type = State.option.checks.HEADING_EMPTY_WITH_IMAGE.type || "error";
            content = Lang.sprintf(
              State.option.checks.HEADING_EMPTY_WITH_IMAGE.content || "HEADING_EMPTY_WITH_IMAGE",
              level
            );
            developer = State.option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
            dismissAll = State.option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll ? "HEADING_EMPTY_WITH_IMAGE" : false;
            margin = "-15px 30px";
          }
        }
      } else if (State.option.checks.HEADING_EMPTY) {
        test = "HEADING_EMPTY";
        type = State.option.checks.HEADING_EMPTY.type || "error";
        content = Lang.sprintf(State.option.checks.HEADING_EMPTY.content || "HEADING_EMPTY", level);
        developer = State.option.checks.HEADING_EMPTY.developer || false;
        dismissAll = State.option.checks.HEADING_EMPTY.dismissAll ? "HEADING_EMPTY" : false;
        margin = "0";
      }
    } else if (level - prevLevel > 1 && (i !== 0 || headingStartsOverride)) {
      if (State.option.checks.HEADING_SKIPPED_LEVEL) {
        test = "HEADING_SKIPPED_LEVEL";
        type = State.option.checks.HEADING_SKIPPED_LEVEL.type || "error";
        content = Lang.sprintf(
          State.option.checks.HEADING_SKIPPED_LEVEL.content || "HEADING_SKIPPED_LEVEL",
          prevLevel,
          level,
          truncateString(headingText, 60),
          truncateString(prevHeadingText, 60),
          prevLevel + 1
        );
        developer = State.option.checks.HEADING_SKIPPED_LEVEL.developer || false;
        dismissAll = State.option.checks.HEADING_SKIPPED_LEVEL.dismissAll ? "HEADING_SKIPPED_LEVEL" : false;
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      if (State.option.checks.HEADING_FIRST) {
        test = "HEADING_FIRST";
        type = State.option.checks.HEADING_FIRST.type || "error";
        content = Lang.sprintf(State.option.checks.HEADING_FIRST.content || "HEADING_FIRST");
        developer = State.option.checks.HEADING_FIRST.developer || false;
        dismissAll = State.option.checks.HEADING_FIRST.dismissAll ? "HEADING_FIRST" : false;
      }
    } else if (headingLength > maxHeadingLength) {
      if (State.option.checks.HEADING_LONG) {
        test = "HEADING_LONG";
        type = State.option.checks.HEADING_LONG.type || "warning";
        content = Lang.sprintf(
          State.option.checks.HEADING_LONG.content || "HEADING_LONG",
          maxHeadingLength,
          headingLength
        );
        developer = State.option.checks.HEADING_LONG.developer || false;
        dismissAll = State.option.checks.HEADING_LONG.dismissAll ? "HEADING_LONG" : false;
      }
    }
    if (content && type) {
      State.results.push({
        test,
        element: $el,
        type,
        content,
        dismiss: prepareDismissal(`${test + level + headingText}`),
        dismissAll,
        isWithinRoot,
        developer,
        margin
      });
    }
    prevLevel = level;
    prevHeadingText = headingText;
    if (!Elements.Found.OutlineIgnore.includes($el)) {
      State.headingOutline.push({
        element: $el,
        headingLevel: level,
        text: headingText,
        type,
        dismiss: prepareDismissal(`${test + level + headingText}`),
        isWithinRoot
      });
    }
  });
  if (State.option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
    State.results.push({
      test: "HEADING_MISSING_ONE",
      type: State.option.checks.HEADING_MISSING_ONE.type || "warning",
      content: Lang.sprintf(
        State.option.checks.HEADING_MISSING_ONE.content || "HEADING_MISSING_ONE"
      ),
      dismiss: "HEADING_MISSING_ONE",
      developer: State.option.checks.HEADING_MISSING_ONE.developer || false
    });
  }
}
const defaultFileTypes = [
  "pdf",
  "doc",
  "docx",
  "word",
  "mp3",
  "ppt",
  "text",
  "pptx",
  "txt",
  "exe",
  "dmg",
  "rtf",
  "windows",
  "macos",
  "csv",
  "xls",
  "xlsx",
  "mp4",
  "mov",
  "avi",
  "zip"
];
const cssFileTypeSelectors = 'a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".zip"], a[href$=".mp3"], a[href$=".txt"], a[href$=".exe"], a[href$=".dmg"], a[href$=".rtf"], a[href$=".pptx"], a[href$=".ppt"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".csv"], a[href$=".mp4"], a[href$=".mov"], a[href$=".avi"]';
const citationPattern = /(doi\.org\/|dl\.acm\.org\/|link\.springer\.com\/|pubmed\.ncbi\.nlm\.nih\.gov\/|scholar\.google\.com\/|ieeexplore\.ieee\.org\/|researchgate\.net\/publication\/|sciencedirect\.com\/science\/article\/)[a-z0-9/.-]+/i;
const urlEndings = /\b(?:\.edu\/|\.gob\/|\.gov\/|\.app\/|\.com\/|\.net\/|\.org\/|\.us\/|\.ca\/|\.de\/|\.icu\/|\.uk\/|\.ru\/|\.info\/|\.top\/|\.xyz\/|\.tk\/|\.cn\/|\.ga\/|\.cf\/|\.nl\/|\.io\/|\.fr\/|\.pe\/|\.nz\/|\.pt\/|\.es\/|\.pl\/|\.ua\/)\b/i;
const specialCharPattern = /[^a-zA-Z0-9]/g;
const htmlSymbols = /([<>↣↳←→↓«»↴]+)/;
const checkStopWords = (textContent, stopWordsSet, stripStrings) => {
  const stripped = textContent.replace(stripStrings, "").trim();
  if (stopWordsSet.has(stripped)) return stripped;
  return null;
};
function checkLinkText() {
  const customStopWords = State.option.linkStopWords ? State.option.linkStopWords.split(",").map((word) => word.toLowerCase().trim()) : [];
  const linkStopWords = /* @__PURE__ */ new Set([...Lang._("LINK_STOPWORDS"), ...customStopWords]);
  const linkIgnoreStrings = new Set(
    State.option.linkIgnoreStrings.map((word) => word.toLowerCase())
  );
  const clickRegex = generateRegexString(Lang._("CLICK"));
  const newWindowRegex = generateRegexString(Lang._("NEW_WINDOW_PHRASES"));
  const fileTypeRegex = generateRegexString(defaultFileTypes);
  const ignorePattern = generateRegexString(State.option.linkIgnoreStrings);
  const seen = {};
  Elements.Found.Links.forEach(($el) => {
    const href = standardizeHref($el);
    const titleAttr = $el.getAttribute("title");
    const ariaHidden = $el.getAttribute("aria-hidden") === "true";
    const negativeTabindex = $el.getAttribute("tabindex") === "-1";
    const targetBlank = $el.getAttribute("target")?.toLowerCase() === "_blank";
    const ariaLabel = $el.getAttribute("aria-label");
    const ariaLabelledby = $el.getAttribute("aria-labelledby");
    const childLabelledby = !ariaLabelledby ? $el.querySelector("[aria-labelledby]") : null;
    const hasAriaLabelledby = ariaLabelledby || childLabelledby;
    const hasAria = hasAriaLabelledby || ariaLabel || $el.querySelector("[aria-label]");
    const accName = removeWhitespace(
      computeAccessibleName($el, Constants.Exclusions.LinkSpan)
    );
    const linkText = accName.replace(ignorePattern, "");
    const lowercaseLinkText = linkText.toLowerCase();
    const strippedLinkText = stripAllSpecialCharacters(lowercaseLinkText);
    const textContent = getText($el).toLowerCase();
    const containsNewWindowPhrases = lowercaseLinkText.match(newWindowRegex)?.[0] || textContent.match(newWindowRegex)?.[0];
    const containsFileTypePhrases = lowercaseLinkText.match(fileTypeRegex)?.[0] || textContent.match(fileTypeRegex)?.[0];
    const fileTypeMatch = $el.matches(cssFileTypeSelectors);
    if (!$el.querySelector("img")) {
      if (ariaHidden) {
        if (!negativeTabindex) {
          if (State.option.checks.HIDDEN_FOCUSABLE) {
            State.results.push({
              test: "HIDDEN_FOCUSABLE",
              element: $el,
              type: State.option.checks.HIDDEN_FOCUSABLE.type || "error",
              content: Lang.sprintf(
                State.option.checks.HIDDEN_FOCUSABLE.content || "HIDDEN_FOCUSABLE"
              ),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`HIDDEN_FOCUSABLE ${strippedLinkText}`),
              dismissAll: State.option.checks.HIDDEN_FOCUSABLE.dismissAll ? "LINK_HIDDEN_FOCUSABLE" : false,
              developer: State.option.checks.HIDDEN_FOCUSABLE.developer || true
            });
          }
        }
        return;
      }
      if (hasAria && linkText.length !== 0) {
        const excludeSpan = fnIgnore($el, Constants.Exclusions.LinkSpan);
        const visibleLinkText = getText(excludeSpan).replace(ignorePattern, "");
        const cleanedString = stripAllSpecialCharacters(visibleLinkText);
        const stopword = checkStopWords(cleanedString, linkStopWords);
        const visibleTextInName = isVisibleTextInAccName(
          $el,
          accName,
          Constants.Exclusions.LinkSpan,
          State.option.linkIgnoreStrings
        );
        if (State.option.checks.LINK_STOPWORD_ARIA && stopword !== null) {
          State.results.push({
            test: "LINK_STOPWORD_ARIA",
            element: $el,
            type: State.option.checks.LINK_STOPWORD_ARIA.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LINK_STOPWORD_ARIA.content || Lang._("LINK_STOPWORD_ARIA") + Lang._("LINK_TIP"),
              stopword,
              linkText
            ),
            inline: true,
            dismiss: prepareDismissal(`LINK_STOPWORD_ARIA ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_STOPWORD_ARIA.dismissAll ? " LINK_STOPWORD_ARIA" : false,
            developer: State.option.checks.LINK_STOPWORD_ARIA.developer || true
          });
        } else if (State.option.checks.LABEL_IN_NAME && visibleTextInName && textContent.length !== 0) {
          State.results.push({
            test: "LABEL_IN_NAME",
            element: $el,
            type: State.option.checks.LABEL_IN_NAME.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LABEL_IN_NAME.content || "LABEL_IN_NAME",
              linkText
            ),
            inline: true,
            position: "afterend",
            dismiss: prepareDismissal(`LABEL_IN_NAME ${strippedLinkText}`),
            dismissAll: State.option.checks.LABEL_IN_NAME.dismissAll ? "BTN_LABEL_IN_NAME" : false,
            developer: State.option.checks.LABEL_IN_NAME.developer || true
          });
        } else if (State.option.checks.LINK_LABEL) {
          State.results.push({
            test: "LINK_LABEL",
            element: $el,
            type: State.option.checks.LINK_LABEL.type || "good",
            content: Lang.sprintf(
              State.option.checks.LINK_LABEL.content || Lang._("ACC_NAME") + Lang._("ACC_NAME_TIP"),
              linkText
            ),
            inline: true,
            position: "afterend",
            dismiss: prepareDismissal(`LINK_LABEL ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_LABEL.dismissAll ? "LINK_LABEL" : false,
            developer: State.option.checks.LINK_LABEL.developer || true
          });
        }
      }
      let oneStop;
      const addStopWordResult = (element, stopword) => {
        if (State.option.checks.LINK_STOPWORD && !oneStop) {
          oneStop = true;
          State.results.push({
            test: "LINK_STOPWORD",
            element,
            type: State.option.checks.LINK_STOPWORD.type || "error",
            content: Lang.sprintf(
              State.option.checks.LINK_STOPWORD.content || Lang._("LINK_STOPWORD") + Lang._("LINK_TIP"),
              stopword
            ),
            inline: true,
            position: "afterend",
            dismiss: prepareDismissal(`LINK_STOPWORD ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_STOPWORD.dismissAll ? "LINK_STOPWORD" : false,
            developer: State.option.checks.LINK_STOPWORD.developer || false
          });
        }
      };
      const isLinkIgnoreStrings = checkStopWords(textContent, linkIgnoreStrings);
      if (isLinkIgnoreStrings === textContent || isLinkIgnoreStrings === strippedLinkText) {
        addStopWordResult($el, isLinkIgnoreStrings);
      } else if (containsNewWindowPhrases === textContent || containsNewWindowPhrases === strippedLinkText) {
        addStopWordResult($el, containsNewWindowPhrases);
        return;
      }
      if (linkText.length === 0) {
        if (hasAriaLabelledby) {
          if (State.option.checks.LINK_EMPTY_LABELLEDBY) {
            State.results.push({
              test: "LINK_EMPTY_LABELLEDBY",
              element: $el,
              type: State.option.checks.LINK_EMPTY_LABELLEDBY.type || "error",
              content: Lang.sprintf(
                State.option.checks.LINK_EMPTY_LABELLEDBY.content || "LINK_EMPTY_LABELLEDBY"
              ),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINK_EMPTY_LABELLEDBY ${href}`),
              dismissAll: State.option.checks.LINK_EMPTY_LABELLEDBY.dismissAll ? "LINK_EMPTY_LABELLEDBY" : false,
              developer: State.option.checks.LINK_EMPTY_LABELLEDBY.developer || true
            });
          }
        } else if ($el.children.length) {
          let hasStopWordWarning = false;
          if (State.option.linkIgnoreSpan) {
            const spanEl = $el.querySelector(State.option.linkIgnoreSpan);
            if (spanEl) {
              const spanText = stripAllSpecialCharacters(spanEl.textContent).trim().toLowerCase();
              if (spanText === textContent) {
                addStopWordResult($el, spanText);
                hasStopWordWarning = true;
              }
            }
          }
          if (!hasStopWordWarning && State.option.checks.LINK_EMPTY_NO_LABEL) {
            State.results.push({
              test: "LINK_EMPTY_NO_LABEL",
              element: $el,
              type: State.option.checks.LINK_EMPTY_NO_LABEL.type || "error",
              content: Lang.sprintf(
                State.option.checks.LINK_EMPTY_NO_LABEL.content || "LINK_EMPTY_NO_LABEL"
              ),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINK_EMPTY_NO_LABEL ${href}`),
              dismissAll: State.option.checks.LINK_EMPTY_NO_LABEL.dismissAll ? "LINK_EMPTY_NO_LABEL" : false,
              developer: State.option.checks.LINK_EMPTY_NO_LABEL.developer || false
            });
          }
        } else if (!isLinkIgnoreStrings && State.option.checks.LINK_EMPTY) {
          State.results.push({
            test: "LINK_EMPTY",
            element: $el,
            type: State.option.checks.LINK_EMPTY.type || "error",
            content: Lang.sprintf(State.option.checks.LINK_EMPTY.content || "LINK_EMPTY"),
            inline: true,
            position: "afterend",
            dismiss: prepareDismissal(`LINK_EMPTY ${href}`),
            dismissAll: State.option.checks.LINK_EMPTY.dismissAll ? "LINK_EMPTY" : false,
            developer: State.option.checks.LINK_EMPTY.developer || false
          });
        }
        return;
      }
      const isStopWord = checkStopWords(strippedLinkText, linkStopWords, newWindowRegex);
      const hasClickWord = strippedLinkText.match(clickRegex)?.[0] || textContent.match(clickRegex)?.[0];
      const isCitation = lowercaseLinkText.match(citationPattern)?.[0];
      const hasUrlPrefix = lowercaseLinkText.startsWith("www.") || lowercaseLinkText.startsWith("http");
      const hasUrlEnding = Boolean(lowercaseLinkText.match(urlEndings));
      const isUrlFragment = hasUrlPrefix || hasUrlEnding;
      const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);
      const matchedSymbol = lowercaseLinkText.match(htmlSymbols)?.[0];
      if (isStopWord) {
        addStopWordResult($el, isStopWord);
      } else if (isCitation) {
        if (linkText.length > 8) {
          if (State.option.checks.LINK_DOI) {
            State.results.push({
              test: "LINK_DOI",
              element: $el,
              type: State.option.checks.LINK_DOI.type || "warning",
              content: Lang.sprintf(State.option.checks.LINK_DOI.content || "LINK_DOI"),
              inline: true,
              dismiss: prepareDismissal(`LINK_DOI ${strippedLinkText}`),
              dismissAll: State.option.checks.LINK_DOI.dismissAll ? "LINK_DOI" : false,
              developer: State.option.checks.LINK_DOI.developer || false
            });
          }
        }
      } else if (isUrlFragment) {
        if (!hasAria && linkText.length > (State.option.checks.LINK_URL.maxLength || 40)) {
          if (State.option.checks.LINK_URL) {
            State.results.push({
              test: "LINK_URL",
              element: $el,
              type: State.option.checks.LINK_URL.type || "warning",
              content: Lang.sprintf(
                State.option.checks.LINK_URL.content || Lang._("LINK_URL") + Lang._("LINK_TIP")
              ),
              inline: true,
              dismiss: prepareDismissal(`LINK_URL ${strippedLinkText}`),
              dismissAll: State.option.checks.LINK_URL.dismissAll ? "LINK_URL" : false,
              developer: State.option.checks.LINK_URL.developer || false
            });
          }
        }
      } else if (matchedSymbol) {
        if (State.option.checks.LINK_SYMBOLS) {
          State.results.push({
            test: "LINK_SYMBOLS",
            element: $el,
            type: State.option.checks.LINK_SYMBOLS.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LINK_SYMBOLS.content || "LINK_SYMBOLS",
              matchedSymbol
            ),
            inline: true,
            dismiss: prepareDismissal(`LINK_SYMBOLS ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_SYMBOLS.dismissAll ? "LINK_SYMBOLS" : false,
            developer: State.option.checks.LINK_SYMBOLS.developer || false
          });
        }
      } else if (isSingleSpecialChar && !titleAttr) {
        if (State.option.checks.LINK_EMPTY) {
          State.results.push({
            test: "LINK_EMPTY",
            element: $el,
            type: State.option.checks.LINK_EMPTY.type || "error",
            content: Lang.sprintf(State.option.checks.LINK_EMPTY.content || "LINK_EMPTY"),
            inline: true,
            position: "afterend",
            dismiss: prepareDismissal(`LINK_EMPTY ${href}`),
            dismissAll: State.option.checks.LINK_EMPTY.dismissAll ? "LINK_EMPTY" : false,
            developer: State.option.checks.LINK_EMPTY.developer || false
          });
        }
        return;
      }
      if (hasClickWord) {
        if (State.option.checks.LINK_CLICK_HERE) {
          State.results.push({
            test: "LINK_CLICK_HERE",
            element: $el,
            type: State.option.checks.LINK_CLICK_HERE.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LINK_CLICK_HERE.content || Lang._("LINK_CLICK_HERE") + Lang._("LINK_TIP")
            ),
            inline: true,
            dismiss: prepareDismissal(`LINK_CLICK_HERE ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_CLICK_HERE.dismissAll ? "LINK_CLICK_HERE" : false,
            developer: State.option.checks.LINK_CLICK_HERE.developer || false
          });
        }
      }
      if (textContent.length !== 0 && titleAttr?.toLowerCase() === linkText.toLowerCase()) {
        if (State.option.checks.DUPLICATE_TITLE) {
          State.results.push({
            test: "DUPLICATE_TITLE",
            element: $el,
            type: State.option.checks.DUPLICATE_TITLE.type || "warning",
            content: Lang.sprintf(State.option.checks.DUPLICATE_TITLE.content || "DUPLICATE_TITLE"),
            inline: true,
            dismiss: prepareDismissal(`DUPLICATE_TITLE ${strippedLinkText}`),
            dismissAll: State.option.checks.DUPLICATE_TITLE.dismissAll ? "DUPLICATE_TITLE" : false,
            developer: State.option.checks.DUPLICATE_TITLE.developer || false
          });
        }
      }
    }
    if (strippedLinkText.length !== 0) {
      if (seen[strippedLinkText] && !seen[href]) {
        const ignored = $el.ariaHidden === "true" && $el.getAttribute("tabindex") === "-1";
        const hasAttributes = $el.hasAttribute("role") || $el.hasAttribute("disabled");
        if (State.option.checks.LINK_IDENTICAL_NAME && !hasAttributes && !ignored) {
          State.results.push({
            test: "LINK_IDENTICAL_NAME",
            element: $el,
            type: State.option.checks.LINK_IDENTICAL_NAME.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LINK_IDENTICAL_NAME.content || Lang._("LINK_IDENTICAL_NAME") + Lang._("ACC_NAME_TIP"),
              linkText
            ),
            inline: true,
            dismiss: prepareDismissal(`LINK_IDENTICAL_NAME ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_IDENTICAL_NAME.dismissAll ? "LINK_IDENTICAL_NAME" : false,
            developer: State.option.checks.LINK_IDENTICAL_NAME.developer || false
          });
        }
      } else {
        seen[strippedLinkText] = true;
        seen[href] = true;
      }
      if (targetBlank && !fileTypeMatch && !containsNewWindowPhrases) {
        if (State.option.checks.LINK_NEW_TAB) {
          State.results.push({
            test: "LINK_NEW_TAB",
            element: $el,
            type: State.option.checks.LINK_NEW_TAB.type || "warning",
            content: Lang.sprintf(State.option.checks.LINK_NEW_TAB.content || "LINK_NEW_TAB"),
            inline: true,
            dismiss: prepareDismissal(`LINK_NEW_TAB ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_NEW_TAB.dismissAll ? "LINK_NEW_TAB" : false,
            developer: State.option.checks.LINK_NEW_TAB.developer || false
          });
        }
      }
      if (fileTypeMatch && !containsFileTypePhrases) {
        if (State.option.checks.LINK_FILE_EXT) {
          State.results.push({
            test: "LINK_FILE_EXT",
            element: $el,
            type: State.option.checks.LINK_FILE_EXT.type || "warning",
            content: Lang.sprintf(State.option.checks.LINK_FILE_EXT.content || "LINK_FILE_EXT"),
            inline: true,
            dismiss: prepareDismissal(`LINK_FILE_EXT ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_FILE_EXT.dismissAll ? "LINK_FILE_EXT" : false,
            developer: State.option.checks.LINK_FILE_EXT.developer || false
          });
        }
      }
    }
  });
}
const url = [
  ".avif",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".tiff",
  ".svg",
  ".heif",
  ".heic",
  "http"
];
function checkImages() {
  const susAltWords = State.option.susAltStopWords ? State.option.susAltStopWords.split(",").map((word) => word.trim().toLowerCase()).filter(Boolean) : Lang._("SUS_ALT_STOPWORDS");
  const placeholderAltSet = new Set(Lang._("PLACEHOLDER_ALT_STOPWORDS"));
  const altPlaceholderPattern = generateRegexString(State.option.altPlaceholder, true);
  const linkIgnoreStringPattern = generateRegexString(State.option.linkIgnoreStrings);
  const extraPlaceholderStopWords = State.option.extraPlaceholderStopWords.split(",").map((word) => word.trim().toLowerCase()).filter(Boolean);
  const containsAltTextStopWords = (alt) => {
    const altLowerCase = alt.toLowerCase();
    const altNoNumbers = altLowerCase.replace(/\d+/g, "").trim();
    const hit = [null, null, null];
    for (const urlHit of url) {
      if (altLowerCase.includes(urlHit)) {
        hit[0] = urlHit;
        break;
      }
    }
    if (!hit[0]) {
      const match = altLowerCase.match(/\b\d{2,6}\s*x\s*\d{2,6}\b/);
      if (match) hit[0] = match[0];
    }
    for (const word of susAltWords) {
      const index = altLowerCase.indexOf(word);
      if (index > -1 && index < 6) {
        hit[1] = word;
        break;
      }
    }
    if (placeholderAltSet.has(altLowerCase) || placeholderAltSet.has(altNoNumbers)) {
      hit[2] = alt;
    }
    if (extraPlaceholderStopWords.length) {
      for (const word of extraPlaceholderStopWords) {
        const index = altLowerCase.indexOf(word);
        if (index > -1 && index < 6) {
          hit[2] = word;
          break;
        }
      }
    }
    return hit;
  };
  Elements.Found.Images.forEach(($el) => {
    const rawAlt = computeAriaLabel($el) === "noAria" ? $el.getAttribute("alt") : computeAriaLabel($el);
    const ariaHidden = $el?.getAttribute("aria-hidden") === "true";
    const presentationRole = $el?.getAttribute("role") === "presentation";
    if ($el.height < 2 && $el.width < 2 && (isElementHidden($el) || rawAlt === "")) {
      return;
    }
    const link = $el.closest(
      State.option.imageWithinLightbox ? `a[href]:not(${State.option.imageWithinLightbox})` : "a[href]"
    );
    const src = $el.getAttribute("src") ? $el.getAttribute("src").split("?")[0] : $el.getAttribute("srcset");
    const linkText = link ? fnIgnore(link, Constants.Exclusions.LinkSpan).textContent.replace(
      linkIgnoreStringPattern,
      ""
    ) : "";
    const linkTextLength = removeWhitespace(linkText).length;
    if (link && link.getAttribute("aria-hidden") === "true") {
      const unfocusable = link.getAttribute("tabindex") === "-1";
      if (State.option.checks.HIDDEN_FOCUSABLE && !unfocusable) {
        State.results.push({
          test: "HIDDEN_FOCUSABLE",
          element: $el,
          type: State.option.checks.HIDDEN_FOCUSABLE.type || "error",
          content: Lang.sprintf(State.option.checks.HIDDEN_FOCUSABLE.content || "HIDDEN_FOCUSABLE"),
          dismiss: prepareDismissal(`HIDDEN_FOCUSABLE ${src}`),
          dismissAll: State.option.checks.HIDDEN_FOCUSABLE.dismissAll ? "LINK_HIDDEN_FOCUSABLE" : false,
          developer: State.option.checks.HIDDEN_FOCUSABLE.developer || true
        });
      }
      return;
    }
    if (rawAlt === null) {
      if (link) {
        const hasAriaHiddenOrPresentationRole = linkTextLength > 0 && (ariaHidden || presentationRole);
        if (!hasAriaHiddenOrPresentationRole) {
          const rule = linkTextLength === 0 ? State.option.checks.MISSING_ALT_LINK : State.option.checks.MISSING_ALT_LINK_HAS_TEXT;
          const conditional = linkTextLength === 0 ? "MISSING_ALT_LINK" : "MISSING_ALT_LINK_HAS_TEXT";
          if (rule) {
            State.results.push({
              test: conditional,
              element: $el,
              type: rule.type || "error",
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(`${conditional + src + linkTextLength}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false
            });
          }
        }
      } else if (State.option.checks.MISSING_ALT) {
        State.results.push({
          test: "MISSING_ALT",
          element: $el,
          type: State.option.checks.MISSING_ALT.type || "error",
          content: Lang.sprintf(State.option.checks.MISSING_ALT.content || "MISSING_ALT"),
          dismiss: prepareDismissal(`MISSING_ALT ${src}`),
          dismissAll: State.option.checks.MISSING_ALT.dismissAll ? "MISSING_ALT" : false,
          developer: State.option.checks.MISSING_ALT.developer || false
        });
      }
      return;
    }
    const altText = removeWhitespace(rawAlt);
    const hasAria = $el.getAttribute("aria-label") || $el.getAttribute("aria-labelledby");
    if (State.option.checks.MISSING_ALT) {
      if (hasAria && rawAlt === "") {
        State.results.push({
          test: "MISSING_ALT",
          element: $el,
          type: State.option.checks.MISSING_ALT.type || "error",
          content: Lang.sprintf(State.option.checks.MISSING_ALT.content || "MISSING_ALT"),
          dismiss: prepareDismissal(`MISSING_ALT ${hasAria + src}`),
          dismissAll: State.option.checks.MISSING_ALT.dismissAll ? "MISSING_ALT" : false,
          developer: State.option.checks.MISSING_ALT.developer || false
        });
        return;
      }
    }
    let decorative = rawAlt === "";
    const figure = $el.closest("figure");
    const figcaption = figure?.querySelector("figcaption");
    const figcaptionText = figcaption ? getText(figcaption) : "";
    const maxAltCharactersLinks = State.option.checks.LINK_IMAGE_LONG_ALT.maxLength || 250;
    const maxAltCharacters = State.option.checks.IMAGE_ALT_TOO_LONG.maxLength || 250;
    if (!decorative && State.option.altPlaceholder.length) {
      decorative = rawAlt.match(altPlaceholderPattern)?.[0];
    }
    if (decorative) {
      const carouselSources = State.option.checks.IMAGE_DECORATIVE_CAROUSEL.sources;
      const carousel = carouselSources ? $el.closest(carouselSources) : "";
      if (carousel) {
        const numberOfSlides = carousel.querySelectorAll("img");
        const rule = numberOfSlides.length === 1 ? State.option.checks.IMAGE_DECORATIVE : State.option.checks.IMAGE_DECORATIVE_CAROUSEL;
        const conditional = numberOfSlides.length === 1 ? "IMAGE_DECORATIVE" : "IMAGE_DECORATIVE_CAROUSEL";
        if (rule) {
          State.results.push({
            test: conditional,
            element: $el,
            type: rule.type || "warning",
            content: Lang.sprintf(rule.content || conditional),
            dismiss: prepareDismissal(conditional + src),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (link) {
        const rule = linkTextLength === 0 ? State.option.checks.LINK_IMAGE_NO_ALT_TEXT : State.option.checks.LINK_IMAGE_TEXT;
        const conditional = linkTextLength === 0 ? "LINK_IMAGE_NO_ALT_TEXT" : "LINK_IMAGE_TEXT";
        if (rule) {
          State.results.push({
            test: conditional,
            element: $el,
            type: rule.type || (linkTextLength === 0 ? "error" : "good"),
            content: Lang.sprintf(rule.content || conditional),
            dismiss: prepareDismissal(`${conditional + src + linkTextLength}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (figure) {
        const rule = figcaption && figcaptionText.length ? State.option.checks.IMAGE_FIGURE_DECORATIVE : State.option.checks.IMAGE_DECORATIVE;
        const conditional = figcaption && figcaptionText.length ? "IMAGE_FIGURE_DECORATIVE" : "IMAGE_DECORATIVE";
        if (rule) {
          State.results.push({
            test: conditional,
            element: $el,
            type: rule.type || "warning",
            content: Lang.sprintf(rule.content || conditional),
            dismiss: prepareDismissal(`${conditional + src + figcaptionText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (State.option.checks.IMAGE_DECORATIVE) {
        State.results.push({
          test: "IMAGE_DECORATIVE",
          element: $el,
          type: State.option.checks.IMAGE_DECORATIVE.type || "warning",
          content: Lang.sprintf(State.option.checks.IMAGE_DECORATIVE.content || "IMAGE_DECORATIVE"),
          dismiss: prepareDismissal(`IMAGE_DECORATIVE ${src}`),
          dismissAll: State.option.checks.IMAGE_DECORATIVE.dismissAll ? "IMAGE_DECORATIVE" : false,
          developer: State.option.checks.IMAGE_DECORATIVE.developer || false
        });
      }
      return;
    }
    const unpronounceable = link ? State.option.checks.LINK_ALT_UNPRONOUNCEABLE : State.option.checks.ALT_UNPRONOUNCEABLE;
    if (unpronounceable) {
      if (rawAlt.replace(/"|'|\?|\.|-|\s+/g, "") === "" && linkTextLength === 0) {
        const conditional = link ? "LINK_ALT_UNPRONOUNCEABLE" : "ALT_UNPRONOUNCEABLE";
        State.results.push({
          test: conditional,
          element: $el,
          type: unpronounceable.type || "error",
          content: Lang.sprintf(unpronounceable.content || conditional, altText),
          dismiss: prepareDismissal(`${conditional + src}`),
          dismissAll: unpronounceable.dismissAll ? "ALT_UNPRONOUNCEABLE" : false,
          developer: unpronounceable.developer || false
        });
        return;
      }
    }
    const error = containsAltTextStopWords(rawAlt);
    const maybeBadAlt = link ? State.option.checks.LINK_ALT_MAYBE_BAD : State.option.checks.ALT_MAYBE_BAD;
    const isTooLongSingleWord = new RegExp(`^\\S{${maybeBadAlt.minLength || 15},}$`);
    const containsNonAlphaChar = /[^\p{L}\-,.!?]/u.test(rawAlt);
    if (error[0] !== null) {
      const rule = link ? State.option.checks.LINK_ALT_FILE_EXT : State.option.checks.ALT_FILE_EXT;
      const conditional = link ? "LINK_ALT_FILE_EXT" : "ALT_FILE_EXT";
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "error",
          content: Lang.sprintf(rule.content || conditional, error[0], altText),
          dismiss: prepareDismissal(`${conditional + src + rawAlt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (error[2] !== null) {
      const rule = link ? State.option.checks.LINK_PLACEHOLDER_ALT : State.option.checks.ALT_PLACEHOLDER;
      const conditional = link ? "LINK_PLACEHOLDER_ALT" : "ALT_PLACEHOLDER";
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "error",
          content: Lang.sprintf(rule.content || conditional, altText),
          dismiss: prepareDismissal(`${conditional + src + rawAlt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (error[1] !== null) {
      const rule = link ? State.option.checks.LINK_SUS_ALT : State.option.checks.SUS_ALT;
      const conditional = link ? "LINK_SUS_ALT" : "SUS_ALT";
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "warning",
          content: Lang.sprintf(rule.content || conditional, error[1], altText),
          dismiss: prepareDismissal(`${conditional + src + rawAlt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (maybeBadAlt && isTooLongSingleWord.test(rawAlt) && containsNonAlphaChar) {
      const conditional = link ? "LINK_ALT_MAYBE_BAD" : "ALT_MAYBE_BAD";
      State.results.push({
        test: conditional,
        element: $el,
        type: maybeBadAlt.type || "error",
        content: Lang.sprintf(maybeBadAlt.content || conditional, altText),
        dismiss: prepareDismissal(`${conditional + src + rawAlt}`),
        dismissAll: maybeBadAlt.dismissAll ? conditional : false,
        developer: maybeBadAlt.developer || false
      });
    } else if (link ? rawAlt.length > maxAltCharactersLinks : rawAlt.length > maxAltCharacters) {
      const rule = link ? State.option.checks.LINK_IMAGE_LONG_ALT : State.option.checks.IMAGE_ALT_TOO_LONG;
      const conditional = link ? "LINK_IMAGE_LONG_ALT" : "IMAGE_ALT_TOO_LONG";
      const truncated = truncateString(altText, 600);
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "warning",
          content: Lang.sprintf(rule.content || conditional, rawAlt.length, truncated),
          dismiss: prepareDismissal(`${conditional + src + rawAlt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (link) {
      const rule = linkTextLength === 0 ? State.option.checks.LINK_IMAGE_ALT : State.option.checks.LINK_IMAGE_ALT_AND_TEXT;
      const conditional = linkTextLength === 0 ? "LINK_IMAGE_ALT" : "LINK_IMAGE_ALT_AND_TEXT";
      if (rule) {
        const linkAccName = computeAccessibleName(link);
        const accName = removeWhitespace(linkAccName);
        const tooltip = Lang.sprintf(
          linkTextLength === 0 ? Lang._("LINK_IMAGE_ALT") : Lang._("LINK_IMAGE_ALT_AND_TEXT") + Lang._("ACC_NAME_TIP"),
          altText,
          accName
        );
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "warning",
          content: rule.content ? Lang.sprintf(rule.content, altText, accName) : tooltip,
          dismiss: prepareDismissal(`${conditional + src + rawAlt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (figure) {
      const duplicate = !!figcaption && figcaptionText.toLowerCase() === rawAlt.toLowerCase();
      if (duplicate) {
        if (State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
          State.results.push({
            test: "IMAGE_FIGURE_DUPLICATE_ALT",
            element: $el,
            type: State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.type || "warning",
            content: Lang.sprintf(
              State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content || "IMAGE_FIGURE_DUPLICATE_ALT",
              altText
            ),
            dismiss: prepareDismissal(`IMAGE_FIGURE_DUPLICATE_ALT ${src}`),
            dismissAll: State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll ? "IMAGE_FIGURE_DUPLICATE_ALT" : false,
            developer: State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false
          });
        }
      } else if (State.option.checks.IMAGE_PASS) {
        State.results.push({
          test: "IMAGE_PASS",
          element: $el,
          type: State.option.checks.IMAGE_PASS.type || "good",
          content: Lang.sprintf(State.option.checks.IMAGE_PASS.content || "IMAGE_PASS", altText),
          dismiss: prepareDismissal(`IMAGE_PASS FIGURE ${src + rawAlt}`),
          dismissAll: State.option.checks.IMAGE_PASS.dismissAll ? "IMAGE_PASS" : false,
          developer: State.option.checks.IMAGE_PASS.developer || false
        });
      }
    } else if (State.option.checks.IMAGE_PASS) {
      if (!$el.closest('button, [role="button"]')) {
        State.results.push({
          test: "IMAGE_PASS",
          element: $el,
          type: State.option.checks.IMAGE_PASS.type || "good",
          content: Lang.sprintf(State.option.checks.IMAGE_PASS.content || "IMAGE_PASS", altText),
          dismiss: prepareDismissal(`IMAGE_PASS ${src + rawAlt}`),
          dismissAll: State.option.checks.IMAGE_PASS.dismissAll ? "IMAGE_PASS" : false,
          developer: State.option.checks.IMAGE_PASS.developer || false
        });
      }
    }
    const titleAttr = $el.getAttribute("title");
    if (titleAttr?.toLowerCase() === rawAlt.toLowerCase()) {
      if (State.option.checks.DUPLICATE_TITLE) {
        State.results.push({
          test: "DUPLICATE_TITLE",
          element: $el,
          type: State.option.checks.DUPLICATE_TITLE.type || "warning",
          content: Lang.sprintf(State.option.checks.DUPLICATE_TITLE.content || "DUPLICATE_TITLE"),
          inline: true,
          dismiss: prepareDismissal(`DUPLICATE_TITLE ${rawAlt}`),
          dismissAll: State.option.checks.DUPLICATE_TITLE.dismissAll ? "DUPLICATE_TITLE" : false,
          developer: State.option.checks.DUPLICATE_TITLE.developer || false
        });
      }
    }
  });
}
function checkLabels() {
  if (State.option.formLabelsPlugin) {
    Elements.Found.Inputs.forEach(($el) => {
      const ariaHidden = $el.getAttribute("aria-hidden") === "true";
      const negativeTabindex = $el.getAttribute("tabindex") === "-1";
      const hidden = isElementHidden($el);
      if (hidden || ariaHidden && negativeTabindex) {
        return;
      }
      const computeName = computeAccessibleName($el);
      const inputName = removeWhitespace(computeName);
      const alt = $el.getAttribute("alt");
      const type = $el.getAttribute("type");
      const hasTitle = $el.getAttribute("title");
      const hasPlaceholder = $el.placeholder && $el.placeholder !== 0;
      const hasAria = $el.getAttribute("aria-label") || $el.getAttribute("aria-labelledby");
      if (type === "submit" || type === "button" || type === "hidden") {
        return;
      }
      if (type === "image") {
        if (State.option.checks.LABELS_MISSING_IMAGE_INPUT && (!alt || alt.trim() === "") && !hasAria && !hasTitle) {
          State.results.push({
            test: "LABELS_MISSING_IMAGE_INPUT",
            element: $el,
            type: State.option.checks.LABELS_MISSING_IMAGE_INPUT.type || "error",
            content: Lang.sprintf(
              State.option.checks.LABELS_MISSING_IMAGE_INPUT.content || "LABELS_MISSING_IMAGE_INPUT"
            ),
            dismiss: prepareDismissal(`LABELS_MISSING_IMAGE_INPUT ${type + inputName}`),
            dismissAll: State.option.checks.LABELS_MISSING_IMAGE_INPUT.dismissAll ? "LABELS_MISSING_IMAGE_INPUT" : false,
            developer: State.option.checks.LABELS_MISSING_IMAGE_INPUT.developer || true
          });
        }
        return;
      }
      if (type === "reset") {
        if (State.option.checks.LABELS_INPUT_RESET) {
          State.results.push({
            test: "LABELS_INPUT_RESET",
            element: $el,
            type: State.option.checks.LABELS_INPUT_RESET.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LABELS_INPUT_RESET.content || "LABELS_INPUT_RESET"
            ),
            dismiss: prepareDismissal(`LABELS_INPUT_RESET ${type + inputName}`),
            dismissAll: State.option.checks.LABELS_INPUT_RESET.dismissAll ? "LABELS_INPUT_RESET" : false,
            developer: State.option.checks.LABELS_INPUT_RESET.developer || false
          });
        }
        return;
      }
      if (hasAria || hasTitle || hasPlaceholder) {
        if (hasPlaceholder && State.option.checks.LABELS_PLACEHOLDER) {
          State.results.push({
            test: "LABELS_PLACEHOLDER",
            element: $el,
            type: State.option.checks.LABELS_PLACEHOLDER.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LABELS_PLACEHOLDER.content || "LABELS_PLACEHOLDER"
            ),
            dismiss: prepareDismissal(`LABELS_PLACEHOLDER ${type + inputName}`),
            dismissAll: State.option.checks.LABELS_PLACEHOLDER.dismissAll ? "LABELS_PLACEHOLDER" : false,
            developer: State.option.checks.LABELS_PLACEHOLDER.developer || true
          });
        } else if (inputName.length === 0) {
          if (State.option.checks.LABELS_MISSING_LABEL) {
            State.results.push({
              test: "LABELS_MISSING_LABEL",
              element: $el,
              type: State.option.checks.LABELS_MISSING_LABEL.type || "error",
              content: Lang.sprintf(
                State.option.checks.LABELS_MISSING_LABEL.content || "LABELS_MISSING_LABEL"
              ),
              dismiss: prepareDismissal(`LABELS_MISSING_LABEL ${type + inputName}`),
              dismissAll: State.option.checks.LABELS_MISSING_LABEL.dismissAll ? "LABELS_MISSING_LABEL" : false,
              developer: State.option.checks.LABELS_MISSING_LABEL.developer || true
            });
          }
        } else if (State.option.checks.LABELS_ARIA_LABEL_INPUT) {
          const ariaLabelledBy = $el.getAttribute("aria-labelledby");
          if (ariaLabelledBy) {
            const ids = ariaLabelledBy.trim().split(/\s+/);
            if (ids.length === 1) {
              const target = find(`#${ids[0]}`, "root")?.[0];
              if (target && !isElementHidden(target)) return;
            }
          }
          const escapedText = escapeHTML(inputName);
          State.results.push({
            test: "LABELS_ARIA_LABEL_INPUT",
            element: $el,
            type: State.option.checks.LABELS_ARIA_LABEL_INPUT.type || "warning",
            content: State.option.checks.LABELS_ARIA_LABEL_INPUT.content ? Lang.sprintf(State.option.checks.LABELS_ARIA_LABEL_INPUT.content, escapedText) : Lang.sprintf(Lang._("LABELS_ARIA_LABEL_INPUT") + Lang._("ACC_NAME_TIP"), escapedText),
            dismiss: prepareDismissal(`LABELS_ARIA_LABEL_INPUT ${type + inputName}`),
            dismissAll: State.option.checks.LABELS_ARIA_LABEL_INPUT.dismissAll ? "LABELS_ARIA_LABEL_INPUT" : false,
            developer: State.option.checks.LABELS_ARIA_LABEL_INPUT.developer || true
          });
        }
        return;
      }
      const closestLabel = $el.closest("label");
      const labelName = closestLabel ? removeWhitespace(computeAccessibleName(closestLabel)) : "";
      if (closestLabel && labelName.length) return;
      const id = $el.getAttribute("id");
      if (id) {
        if (!Elements.Found.Labels.some((label) => label.getAttribute("for") === id)) {
          if (State.option.checks.LABELS_NO_FOR_ATTRIBUTE) {
            State.results.push({
              test: "LABELS_NO_FOR_ATTRIBUTE",
              element: $el,
              type: State.option.checks.LABELS_NO_FOR_ATTRIBUTE.type || "error",
              content: Lang.sprintf(
                State.option.checks.LABELS_NO_FOR_ATTRIBUTE.content || "LABELS_NO_FOR_ATTRIBUTE",
                id
              ),
              dismiss: prepareDismissal(`LABELS_NO_FOR_ATTRIBUTE ${type + inputName}`),
              dismissAll: State.option.checks.LABELS_NO_FOR_ATTRIBUTE.dismissAll ? "LABELS_NO_FOR_ATTRIBUTE" : false,
              developer: State.option.checks.LABELS_NO_FOR_ATTRIBUTE.developer || true
            });
          }
        }
      } else if (State.option.checks.LABELS_MISSING_LABEL) {
        State.results.push({
          test: "LABELS_MISSING_LABEL",
          element: $el,
          type: State.option.checks.LABELS_MISSING_LABEL.type || "error",
          content: Lang.sprintf(
            State.option.checks.LABELS_MISSING_LABEL.content || "LABELS_MISSING_LABEL"
          ),
          dismiss: prepareDismissal(`LABELS_MISSING_LABEL ${type + inputName}`),
          dismissAll: State.option.checks.LABELS_MISSING_LABEL.dismissAll ? "LABELS_MISSING_LABEL" : false,
          developer: State.option.checks.LABELS_MISSING_LABEL.developer || true
        });
      }
    });
  }
  return State.results;
}
function checkQA() {
  if (State.option.checks.QA_BAD_LINK) {
    Elements.Found.CustomErrorLinks.forEach(($el) => {
      State.results.push({
        test: "QA_BAD_LINK",
        element: $el,
        type: State.option.checks.QA_BAD_LINK.type || "error",
        content: Lang.sprintf(State.option.checks.QA_BAD_LINK.content || "QA_BAD_LINK", $el),
        inline: true,
        dismiss: prepareDismissal(`QA_BAD_LINK ${$el.tagName + $el.textContent}`),
        dismissAll: State.option.checks.QA_BAD_LINK.dismissAll ? "QA_BAD_LINK" : false,
        developer: State.option.checks.QA_BAD_LINK.developer || false
      });
    });
  }
  if (State.option.checks.QA_STRONG_ITALICS) {
    Elements.Found.StrongItalics.forEach(($el) => {
      const text = getText($el);
      if (text.length !== 0 && text.length > 400) {
        State.results.push({
          test: "QA_STRONG_ITALICS",
          element: $el.parentNode,
          type: State.option.checks.QA_STRONG_ITALICS.type || "warning",
          content: Lang.sprintf(
            State.option.checks.QA_STRONG_ITALICS.content || "QA_STRONG_ITALICS"
          ),
          dismiss: prepareDismissal(`QA_STRONG_ITALICS ${$el.tagName + $el.textContent}`),
          dismissAll: State.option.checks.QA_STRONG_ITALICS.dismissAll ? "QA_STRONG_ITALICS" : false,
          developer: State.option.checks.QA_STRONG_ITALICS.developer || false
        });
      }
    });
  }
  Elements.Found.Links.forEach(($el) => {
    if ($el.hasAttribute("href")) {
      const href = $el.getAttribute("href");
      const hasExtension = $el.matches(Constants.Global.documentSources);
      const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');
      if (State.option.checks.QA_IN_PAGE_LINK) {
        const hasText = getText($el).length !== 0;
        const ignored = $el.ariaHidden === "true" && $el.getAttribute("tabindex") === "-1";
        const hasAttributes = $el.hasAttribute("role") || $el.hasAttribute("aria-haspopup") || $el.hasAttribute("aria-expanded") || $el.hasAttribute("onclick") || $el.hasAttribute("disabled") || $el.closest('nav, [role="navigation"]');
        if ((href.startsWith("#") || href === "") && hasText && !ignored && !hasAttributes) {
          const targetId = href.substring(1);
          const ariaControls = $el.getAttribute("aria-controls");
          const targetElement = targetId && (document.getElementById(targetId) || document.getElementById(decodeURIComponent(targetId)) || document.getElementById(encodeURIComponent(targetId)) || document.getElementById(ariaControls) || document.querySelector(`a[name="${targetId}"]`));
          if (!targetElement) {
            State.results.push({
              test: "QA_IN_PAGE_LINK",
              element: $el,
              type: State.option.checks.QA_IN_PAGE_LINK.type || "error",
              content: Lang.sprintf(
                State.option.checks.QA_IN_PAGE_LINK.content || "QA_IN_PAGE_LINK"
              ),
              inline: true,
              dismiss: prepareDismissal(`QA_IN_PAGE_LINK ${href}`),
              dismissAll: State.option.checks.QA_IN_PAGE_LINK.dismissAll ? "QA_IN_PAGE_LINK" : false,
              developer: State.option.checks.QA_IN_PAGE_LINK.developer || false
            });
          }
        }
      }
      if (State.option.checks.QA_DOCUMENT && hasExtension) {
        State.results.push({
          test: "QA_DOCUMENT",
          element: $el,
          type: State.option.checks.QA_DOCUMENT.type || "warning",
          content: Lang.sprintf(State.option.checks.QA_DOCUMENT.content || "QA_DOCUMENT"),
          inline: true,
          dismiss: prepareDismissal(`QA_DOCUMENT ${href}`),
          dismissAll: State.option.checks.QA_DOCUMENT.dismissAll ? "QA_DOCUMENT" : false,
          developer: State.option.checks.QA_DOCUMENT.developer || false
        });
      } else if (State.option.checks.QA_PDF && hasPDF) {
        State.results.push({
          test: "QA_PDF",
          element: $el,
          type: State.option.checks.QA_PDF.type || "warning",
          content: Lang.sprintf(State.option.checks.QA_PDF.content || "QA_PDF"),
          inline: true,
          dismiss: prepareDismissal(`QA_PDF ${href}`),
          dismissAll: State.option.checks.QA_PDF.dismissAll ? "QA_PDF" : false,
          developer: State.option.checks.QA_PDF.developer || false
        });
      }
    }
  });
  if (State.option.checks.QA_BLOCKQUOTE) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const text = getText($el);
      if (text.length !== 0 && text.length < 25) {
        const escapedText = escapeHTML(text);
        State.results.push({
          test: "QA_BLOCKQUOTE",
          element: $el,
          type: State.option.checks.QA_BLOCKQUOTE.type || "warning",
          content: Lang.sprintf(
            State.option.checks.QA_BLOCKQUOTE.content || "QA_BLOCKQUOTE",
            escapedText
          ),
          dismiss: prepareDismissal(`QA_BLOCKQUOTE ${escapedText}`),
          dismissAll: State.option.checks.QA_BLOCKQUOTE.dismissAll ? "QA_BLOCKQUOTE" : false,
          developer: State.option.checks.QA_BLOCKQUOTE.developer || false
        });
      }
    });
  }
  Elements.Found.Tables.forEach(($el) => {
    if (isElementHidden($el) === false) {
      const tableHeaders = $el.querySelectorAll("th");
      const semanticHeadings = $el.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const firstRow = $el.querySelector("tr") ? $el.querySelector("tr").innerHTML : $el.innerHTML;
      if (State.option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
        State.results.push({
          test: "TABLES_MISSING_HEADINGS",
          element: $el,
          type: State.option.checks.TABLES_MISSING_HEADINGS.type || "error",
          content: Lang.sprintf(
            State.option.checks.TABLES_MISSING_HEADINGS.content || "TABLES_MISSING_HEADINGS"
          ),
          dismiss: prepareDismissal(`TABLES_MISSING_HEADINGS ${firstRow}`),
          dismissAll: State.option.checks.TABLES_MISSING_HEADINGS.dismissAll ? "TABLES_MISSING_HEADINGS" : false,
          developer: State.option.checks.TABLES_MISSING_HEADINGS.developer || false
        });
      }
      if (State.option.checks.TABLES_SEMANTIC_HEADING && semanticHeadings.length > 0) {
        semanticHeadings.forEach((heading) => {
          State.results.push({
            test: "TABLES_SEMANTIC_HEADING",
            element: heading,
            type: State.option.checks.TABLES_SEMANTIC_HEADING.type || "error",
            content: Lang.sprintf(
              State.option.checks.TABLES_SEMANTIC_HEADING.content || "TABLES_SEMANTIC_HEADING"
            ),
            dismiss: prepareDismissal(`TABLES_SEMANTIC_HEADING ${firstRow}`),
            dismissAll: State.option.checks.TABLES_SEMANTIC_HEADING.dismissAll ? "TABLES_SEMANTIC_HEADING" : false,
            developer: State.option.checks.TABLES_SEMANTIC_HEADING.developer || false
          });
        });
      }
      tableHeaders.forEach((th) => {
        if (State.option.checks.TABLES_EMPTY_HEADING && th.textContent.trim().length === 0) {
          State.results.push({
            test: "TABLES_EMPTY_HEADING",
            element: th,
            type: State.option.checks.TABLES_EMPTY_HEADING.type || "error",
            content: Lang.sprintf(
              State.option.checks.TABLES_EMPTY_HEADING.content || "TABLES_EMPTY_HEADING"
            ),
            position: "afterbegin",
            dismiss: prepareDismissal(`TABLES_EMPTY_HEADING ${firstRow}`),
            dismissAll: State.option.checks.TABLES_EMPTY_HEADING.dismissAll ? "TABLES_EMPTY_HEADING" : false,
            developer: State.option.checks.TABLES_EMPTY_HEADING.developer || false
          });
        }
      });
    }
  });
  if (State.option.checks.QA_FAKE_HEADING) {
    const addResult = (element, escapedText) => {
      State.results.push({
        test: "QA_FAKE_HEADING",
        element,
        type: State.option.checks.QA_FAKE_HEADING.type || "warning",
        content: Lang.sprintf(
          State.option.checks.QA_FAKE_HEADING.content || "QA_FAKE_HEADING",
          escapedText
        ),
        dismiss: prepareDismissal(`QA_FAKE_HEADING ${escapedText}`),
        inline: true,
        dismissAll: State.option.checks.QA_FAKE_HEADING.dismissAll ? "QA_FAKE_HEADING" : false,
        developer: State.option.checks.QA_FAKE_HEADING.developer || false
      });
    };
    const isPreviousElementAHeading = (p) => {
      const previousElement = p.previousElementSibling;
      if (!previousElement) return false;
      const headingTags = ["H1", "H2", "H3", "H4", "H5", "H6"];
      return headingTags.includes(previousElement.tagName);
    };
    const ignoreParents = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote, table';
    const computeLargeParagraphs = (p) => {
      const size = getComputedStyle(p).fontSize.replace("px", "");
      const getText$1 = getText(p);
      const maybeSentence = getText$1.match(/[.;?!"]/) === null;
      const typicalHeadingLength = getText$1.length >= 4 && getText$1.length <= 120;
      if (size >= 24 && !p.closest(ignoreParents) && typicalHeadingLength && maybeSentence && !isPreviousElementAHeading(p)) {
        const escapedText = escapeHTML(getText$1);
        addResult(p, escapedText);
      }
    };
    const computeBoldTextParagraphs = (p) => {
      const html = p.innerHTML.trim();
      if (html[0] !== "<") return;
      const likelyFakeHeading = /^<\s*(?:strong|b)\b[^>]*>[\s\S]*?<\/\s*(?:strong|b)\s*>(?:<\s*\/?\s*br\s*>|$)/i.test(html);
      if (!likelyFakeHeading || p.closest(ignoreParents)) return;
      const possibleHeading = p.querySelector("strong, b");
      if (!possibleHeading) return;
      const text = getText(possibleHeading);
      if (text.length < 3 || text.length > 120 || /[.:;?!"']/.test(text)) return;
      const paragraph = fnIgnore(p, ["strong", "b"]).textContent.trim();
      if (paragraph && paragraph.length <= 250) return;
      addResult(possibleHeading, escapeHTML(text));
    };
    Elements.Found.Paragraphs.forEach((p) => {
      computeLargeParagraphs(p);
      computeBoldTextParagraphs(p);
    });
  }
  if (State.option.checks.QA_FAKE_LIST) {
    const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, "");
    const alphabeticMatch = new RegExp(/(^[aA1αаΑ]|[^p{Alphabetic}\s])[-\s.)]/, "u");
    const emojiMatch = new RegExp(/\p{Extended_Pictographic}/, "u");
    const secondTextNoMatch = ["a", "A", "α", "Α", "а", "А", "1"];
    const specialCharsMatch = /[([{#]/;
    const prefixDecrement = {
      2: "1",
      b: "a",
      B: "A",
      β: "α",
      Β: "Α",
      б: "а",
      Б: "А"
    };
    const decrement = (element) => element.replace(/^b|^B|^б|^Б|^β|^В|^2/, (match) => prefixDecrement[match]);
    let activeMatch = "";
    let firstText = "";
    let lastHitWasEmoji = false;
    Elements.Found.Paragraphs.forEach((p, i) => {
      let secondText = false;
      let hit = false;
      firstText = firstText || getText(p).replace("(", "");
      const firstPrefix = firstText.substring(0, 2);
      const isAlphabetic = firstPrefix.match(alphabeticMatch);
      const isNumber = firstPrefix.match(numberMatch);
      const isEmoji = firstPrefix.match(emojiMatch);
      const isSpecialChar = specialCharsMatch.test(firstPrefix.charAt(0));
      if (firstPrefix.length > 0 && firstPrefix !== activeMatch && !isNumber && (isAlphabetic || isEmoji || isSpecialChar)) {
        const secondP = Elements.Found.Paragraphs[i + 1];
        if (secondP) {
          secondText = getText(secondP).replace("(", "").substring(0, 2);
          if (secondTextNoMatch.includes(secondText?.toLowerCase().trim())) {
            return;
          }
          const secondPrefix = decrement(secondText);
          if (isAlphabetic) {
            if (firstPrefix !== "A " && firstPrefix === secondPrefix) {
              hit = true;
            }
          } else if (isEmoji && !lastHitWasEmoji) {
            if (secondPrefix.match(emojiMatch)) {
              hit = true;
              lastHitWasEmoji = true;
            }
          }
        }
        if (!hit) {
          let textAfterBreak = p?.querySelector("br")?.nextSibling?.nodeValue;
          if (textAfterBreak) {
            textAfterBreak = textAfterBreak.replace(/<\/?[^>]+(>|$)/g, "").trim().substring(0, 2);
            const checkForOtherPrefixChars = specialCharsMatch.test(textAfterBreak.charAt(0));
            if (checkForOtherPrefixChars || firstPrefix === decrement(textAfterBreak) || !lastHitWasEmoji && textAfterBreak.match(emojiMatch)) {
              hit = true;
            }
          }
        }
        if (hit) {
          State.results.push({
            test: "QA_FAKE_LIST",
            element: p,
            type: State.option.checks.QA_FAKE_LIST.type || "warning",
            content: Lang.sprintf(
              State.option.checks.QA_FAKE_LIST.content || "QA_FAKE_LIST",
              firstPrefix
            ),
            dismiss: prepareDismissal(`QA_FAKE_LIST ${p.textContent}`),
            dismissAll: State.option.checks.QA_FAKE_LIST.dismissAll ? "QA_FAKE_LIST" : false,
            developer: State.option.checks.QA_FAKE_LIST.developer || false
          });
          activeMatch = firstPrefix;
        } else {
          activeMatch = "";
        }
      }
      firstText = secondText ? "" : secondText;
    });
  }
  if (State.option.checks.QA_UPPERCASE) {
    const checkCaps = ($el) => {
      let thisText = "";
      if ($el.tagName === "LI") {
        $el.childNodes.forEach((node) => {
          if (node.nodeType === 3) {
            thisText += node.textContent;
          }
        });
      } else {
        thisText = getText($el);
      }
      const uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      const detectUpperCase = thisText.match(uppercasePattern);
      if (detectUpperCase && detectUpperCase[0].length > 10) {
        State.results.push({
          test: "QA_UPPERCASE",
          element: $el,
          type: State.option.checks.QA_UPPERCASE.type || "warning",
          content: Lang.sprintf(State.option.checks.QA_UPPERCASE.content || "QA_UPPERCASE"),
          dismiss: prepareDismissal(`QA_UPPERCASE ${thisText}`),
          dismissAll: State.option.checks.QA_UPPERCASE.dismissAll ? "QA_UPPERCASE" : false,
          developer: State.option.checks.QA_UPPERCASE.developer || false
        });
      }
    };
    Elements.Found.Paragraphs.forEach(($el) => {
      checkCaps($el);
    });
    Elements.Found.Headings.forEach(($el) => {
      checkCaps($el);
    });
    Elements.Found.Lists.forEach(($el) => {
      checkCaps($el);
    });
    Elements.Found.Blockquotes.forEach(($el) => {
      checkCaps($el);
    });
  }
  const addUnderlineResult = ($el) => {
    State.results.push({
      test: "QA_UNDERLINE",
      element: $el,
      type: State.option.checks.QA_UNDERLINE.type || "warning",
      content: Lang.sprintf(State.option.checks.QA_UNDERLINE.content || "QA_UNDERLINE"),
      inline: true,
      dismiss: prepareDismissal(`QA_UNDERLINE ${$el.textContent}`),
      dismissAll: State.option.checks.QA_UNDERLINE.dismissAll ? "QA_UNDERLINE" : false,
      developer: State.option.checks.QA_UNDERLINE.developer || false
    });
  };
  const addJustifyResult = ($el) => {
    State.results.push({
      test: "QA_JUSTIFY",
      element: $el,
      type: State.option.checks.QA_JUSTIFY.type || "warning",
      content: Lang.sprintf(State.option.checks.QA_JUSTIFY.content || "QA_JUSTIFY"),
      dismiss: prepareDismissal(`QA_JUSTIFY ${$el.textContent}`),
      dismissAll: State.option.checks.QA_JUSTIFY.dismissAll ? "QA_JUSTIFY" : true,
      developer: State.option.checks.QA_JUSTIFY.developer || false
    });
  };
  const addSmallTextResult = ($el) => {
    State.results.push({
      test: "QA_SMALL_TEXT",
      element: $el,
      type: State.option.checks.QA_SMALL_TEXT.type || "warning",
      content: Lang.sprintf(State.option.checks.QA_SMALL_TEXT.content || "QA_SMALL_TEXT"),
      dismiss: prepareDismissal(`QA_SMALL_TEXT ${$el.textContent}`),
      dismissAll: State.option.checks.QA_SMALL_TEXT.dismissAll ? "QA_SMALL_TEXT" : true,
      developer: State.option.checks.QA_SMALL_TEXT.developer || false
    });
  };
  const computeStyle = ($el) => {
    const style = getComputedStyle($el);
    const { textDecorationLine, textAlign, fontSize } = style;
    const interactive = 'a[href], button, abbr, [role="link"], [role="button"], [tabindex="0"], [onclick]';
    if (State.option.checks.QA_UNDERLINE && ($el.closest("u") || textDecorationLine === "underline") && !$el.closest(interactive) && !$el.matches(interactive)) {
      addUnderlineResult($el);
    }
    const defaultSize = State.option.checks.QA_SMALL_TEXT.fontSize || 10;
    const computedFontSize = parseFloat(fontSize);
    const parentFontSize = $el.parentElement ? parseFloat(getComputedStyle($el.parentElement).fontSize) : null;
    const isInherited = parentFontSize === computedFontSize;
    const withinRange = !isInherited && computedFontSize > 1 && computedFontSize <= defaultSize;
    if (State.option.checks.QA_SMALL_TEXT && withinRange) {
      addSmallTextResult($el);
    }
    const parentJustify = $el.parentElement ? getComputedStyle($el.parentElement).textAlign : null;
    const justifyInherited = parentJustify === textAlign;
    if (State.option.checks.QA_JUSTIFY && textAlign === "justify" && !justifyInherited) {
      addJustifyResult($el);
    }
  };
  if (State.option.checks.QA_UNDERLINE || State.option.checks.QA_JUSTIFY || State.option.checks.QA_SMALL_TEXT) {
    for (let i = 0; i < Elements.Found.Everything.length; i++) {
      const $el = Elements.Found.Everything[i];
      const textString = Array.from($el.childNodes).filter((node) => node.nodeType === 3).map((node) => node.textContent).join("");
      const text = textString.trim();
      if (text.length !== 0) {
        computeStyle($el);
      }
    }
  }
  if (State.option.checks.QA_SUBSCRIPT) {
    Elements.Found.Subscripts.forEach(($el) => {
      const text = getText($el);
      if (text.length >= 80) {
        State.results.push({
          test: "QA_SUBSCRIPT",
          element: $el,
          type: State.option.checks.QA_SUBSCRIPT.type || "warning",
          content: Lang.sprintf(State.option.checks.QA_SUBSCRIPT.content || "QA_SUBSCRIPT"),
          inline: true,
          dismiss: prepareDismissal(`QA_SUBSCRIPT ${$el.tagName + text}`),
          dismissAll: State.option.checks.QA_SUBSCRIPT.dismissAll ? "QA_SUBSCRIPT" : false,
          developer: State.option.checks.QA_SUBSCRIPT.developer || false
        });
      }
    });
  }
  if (State.option.checks.QA_NESTED_COMPONENTS) {
    Elements.Found.NestedComponents.forEach(($el) => {
      const sources = State.option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
      const component = $el.querySelector(sources);
      if (component) {
        State.results.push({
          test: "QA_NESTED_COMPONENTS",
          element: $el,
          type: State.option.checks.QA_NESTED_COMPONENTS.type || "warning",
          content: Lang.sprintf(
            State.option.checks.QA_NESTED_COMPONENTS.content || "QA_NESTED_COMPONENTS"
          ),
          dismiss: prepareDismissal(`QA_NESTED_COMPONENTS ${$el.textContent}`),
          dismissAll: State.option.checks.QA_NESTED_COMPONENTS.dismissAll ? "QA_NESTED_COMPONENTS" : false,
          developer: State.option.checks.QA_NESTED_COMPONENTS.developer || false
        });
      }
    });
  }
}
const SA98G = {
  mainTRC: 2.4,
  sRco: 0.2126729,
  sGco: 0.7151522,
  sBco: 0.072175,
  normBG: 0.56,
  normTXT: 0.57,
  revTXT: 0.62,
  revBG: 0.65,
  blkThrs: 0.022,
  blkClmp: 1.414,
  scaleBoW: 1.14,
  scaleWoB: 1.14,
  loBoWoffset: 0.027,
  loWoBoffset: 0.027,
  deltaYmin: 5e-4,
  loClip: 0.1
};
function APCAcontrast(txtY, bgY, places = -1) {
  const icp = [0, 1.1];
  if (isNaN(txtY) || isNaN(bgY) || Math.min(txtY, bgY) < icp[0] || Math.max(txtY, bgY) > icp[1]) {
    return 0;
  }
  let SAPC = 0;
  let outputContrast = 0;
  let polCat = "BoW";
  txtY = txtY > SA98G.blkThrs ? txtY : txtY + Math.pow(SA98G.blkThrs - txtY, SA98G.blkClmp);
  bgY = bgY > SA98G.blkThrs ? bgY : bgY + Math.pow(SA98G.blkThrs - bgY, SA98G.blkClmp);
  if (Math.abs(bgY - txtY) < SA98G.deltaYmin) {
    return 0;
  }
  if (bgY > txtY) {
    SAPC = (Math.pow(bgY, SA98G.normBG) - Math.pow(txtY, SA98G.normTXT)) * SA98G.scaleBoW;
    outputContrast = SAPC < SA98G.loClip ? 0 : SAPC - SA98G.loBoWoffset;
  } else {
    polCat = "WoB";
    SAPC = (Math.pow(bgY, SA98G.revBG) - Math.pow(txtY, SA98G.revTXT)) * SA98G.scaleWoB;
    outputContrast = SAPC > -0.1 ? 0 : SAPC + SA98G.loWoBoffset;
  }
  if (places < 0) {
    return outputContrast * 100;
  } else if (places == 0) {
    return Math.round(Math.abs(outputContrast) * 100) + "<sub>" + polCat + "</sub>";
  } else if (Number.isInteger(places)) {
    return (outputContrast * 100).toFixed(places);
  } else {
    return 0;
  }
}
function fontLookupAPCA(contrast, places = 2) {
  const fontMatrixAscend = [
    ["Lc", 100, 200, 300, 400, 500, 600, 700, 800, 900],
    [0, 999, 999, 999, 999, 999, 999, 999, 999, 999],
    [10, 999, 999, 999, 999, 999, 999, 999, 999, 999],
    [15, 777, 777, 777, 777, 777, 777, 777, 777, 777],
    [20, 777, 777, 777, 777, 777, 777, 777, 777, 777],
    [25, 777, 777, 777, 120, 120, 108, 96, 96, 96],
    [30, 777, 777, 120, 108, 108, 96, 72, 72, 72],
    [35, 777, 120, 108, 96, 72, 60, 48, 48, 48],
    [40, 120, 108, 96, 60, 48, 42, 32, 32, 32],
    [45, 108, 96, 72, 42, 32, 28, 24, 24, 24],
    [50, 96, 72, 60, 32, 28, 24, 21, 21, 21],
    [55, 80, 60, 48, 28, 24, 21, 18, 18, 18],
    [60, 72, 48, 42, 24, 21, 18, 16, 16, 18],
    [65, 68, 46, 32, 21.75, 19, 17, 15, 16, 18],
    [70, 64, 44, 28, 19.5, 18, 16, 14.5, 16, 18],
    [75, 60, 42, 24, 18, 16, 15, 14, 16, 18],
    [80, 56, 38.25, 23, 17.25, 15.81, 14.81, 14, 16, 18],
    [85, 52, 34.5, 22, 16.5, 15.625, 14.625, 14, 16, 18],
    [90, 48, 32, 21, 16, 15.5, 14.5, 14, 16, 18],
    [95, 45, 28, 19.5, 15.5, 15, 14, 13.5, 16, 18],
    [100, 42, 26.5, 18.5, 15, 14.5, 13.5, 13, 16, 18],
    [105, 39, 25, 18, 14.5, 14, 13, 12, 16, 18],
    [110, 36, 24, 18, 14, 13, 12, 11, 16, 18],
    [115, 34.5, 22.5, 17.25, 12.5, 11.875, 11.25, 10.625, 14.5, 16.5],
    [120, 33, 21, 16.5, 11, 10.75, 10.5, 10.25, 13, 15],
    [125, 32, 20, 16, 10, 10, 10, 10, 12, 14]
  ];
  const fontDeltaAscend = [
    ["∆Lc", 100, 200, 300, 400, 500, 600, 700, 800, 900],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [15, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [25, 0, 0, 0, 12, 12, 12, 24, 24, 24],
    [30, 0, 0, 12, 12, 36, 36, 24, 24, 24],
    [35, 0, 12, 12, 36, 24, 18, 16, 16, 16],
    [40, 12, 12, 24, 18, 16, 14, 8, 8, 8],
    [45, 12, 24, 12, 10, 4, 4, 3, 3, 3],
    [50, 16, 12, 12, 4, 4, 3, 3, 3, 3],
    [55, 8, 12, 6, 4, 3, 3, 2, 2, 0],
    [60, 4, 2, 10, 2.25, 2, 1, 1, 0, 0],
    [65, 4, 2, 4, 2.25, 1, 1, 0.5, 0, 0],
    [70, 4, 2, 4, 1.5, 2, 1, 0.5, 0, 0],
    [75, 4, 3.75, 1, 0.75, 0.188, 0.188, 0, 0, 0],
    [80, 4, 3.75, 1, 0.75, 0.188, 0.188, 0, 0, 0],
    [85, 4, 2.5, 1, 0.5, 0.125, 0.125, 0, 0, 0],
    [90, 3, 4, 1.5, 0.5, 0.5, 0.5, 0.5, 0, 0],
    [95, 3, 1.5, 1, 0.5, 0.5, 0.5, 0.5, 0, 0],
    [100, 3, 1.5, 0.5, 0.5, 0.5, 0.5, 1, 0, 0],
    [105, 3, 1, 0, 0.5, 1, 1, 1, 0, 0],
    [110, 1.5, 1.5, 0.75, 1.5, 1.125, 0.75, 0.375, 1.5, 1.5],
    [115, 1.5, 1.5, 0.75, 1.5, 1.125, 0.75, 0.375, 1.5, 1.5],
    [120, 1, 1, 0.5, 1, 0.75, 0.5, 0.25, 1, 1],
    [125, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  const weightArray = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const weightArrayLen = weightArray.length;
  let returnArray = [contrast.toFixed(places), 0, 0, 0, 0, 0, 0, 0, 0, 0];
  returnArray.length;
  let tempFont = 777;
  contrast = Math.abs(contrast);
  const factor = 0.2;
  const index = contrast == 0 ? 1 : contrast * factor | 0;
  let w = 0;
  let scoreAdj = (contrast - fontMatrixAscend[index][w]) * factor;
  w++;
  for (; w < weightArrayLen; w++) {
    tempFont = fontMatrixAscend[index][w];
    if (tempFont > 400) {
      returnArray[w] = tempFont;
    } else if (contrast < 14.5) {
      returnArray[w] = 999;
    } else if (contrast < 29.5) {
      returnArray[w] = 777;
    } else {
      tempFont > 24 ? returnArray[w] = Math.round(tempFont - fontDeltaAscend[index][w] * scoreAdj) : returnArray[w] = tempFont - (2 * fontDeltaAscend[index][w] * scoreAdj | 0) * 0.5;
    }
  }
  return returnArray;
}
function sRGBtoY(rgb = [0, 0, 0]) {
  function simpleExp(chan) {
    return Math.pow(chan / 255, SA98G.mainTRC);
  }
  return SA98G.sRco * simpleExp(rgb[0]) + SA98G.sGco * simpleExp(rgb[1]) + SA98G.sBco * simpleExp(rgb[2]);
}
function alphaBlend(rgbaFG = [0, 0, 0, 1], rgbBG = [0, 0, 0], round = true) {
  rgbaFG[3] = Math.max(Math.min(rgbaFG[3], 1), 0);
  let compBlend = 1 - rgbaFG[3];
  let rgbOut = [0, 0, 0, 1, true];
  for (let i = 0; i < 3; i++) {
    rgbOut[i] = rgbBG[i] * compBlend + rgbaFG[i] * rgbaFG[3];
    if (round) rgbOut[i] = Math.min(Math.round(rgbOut[i]), 255);
  }
  return rgbOut;
}
const maxCacheSize = 500;
const colorCache = /* @__PURE__ */ new Map();
let sharedContext = null;
function getSharedContext(colorSpace = "srgb") {
  if (!sharedContext) {
    if (typeof OffscreenCanvas !== "undefined") {
      const canvas = new OffscreenCanvas(1, 1);
      sharedContext = canvas.getContext("2d", { colorSpace, willReadFrequently: true });
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      sharedContext = canvas.getContext("2d", { willReadFrequently: true });
    }
  }
  return sharedContext;
}
function setCache(key, value) {
  if (colorCache.size >= maxCacheSize) {
    const firstKey = colorCache.keys().next().value;
    colorCache.delete(firstKey);
  }
  colorCache.set(key, value);
}
function convertToRGBA(color, opacity = 1) {
  const cacheKey = `${color}_${opacity}`;
  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey);
  }
  let r;
  let g;
  let b;
  let a = 1;
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const len = hex.length;
    if (len === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  } else if (color.startsWith("rgb")) {
    const values = color.match(/[\d.]+/g);
    if (values) {
      r = parseInt(values[0], 10);
      g = parseInt(values[1], 10);
      b = parseInt(values[2], 10);
      a = values[3] !== void 0 ? parseFloat(values[3]) : 1;
    }
  } else {
    const colorSpace = color.startsWith("color(display-p3") ? "display-p3" : "srgb";
    const ctx = getSharedContext(colorSpace);
    if (!ctx || color.startsWith("color(rec2020")) return "unsupported";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const imageData = ctx.getImageData(0, 0, 1, 1);
    [r, g, b, a] = imageData.data;
    a = a / 255;
  }
  const finalAlpha = opacity < 1 ? Number((a * opacity).toFixed(2)) : a;
  const result = [r, g, b, finalAlpha];
  setCache(cacheKey, result);
  return result;
}
function normalizeFontWeight(weight) {
  const numericWeight = parseInt(weight, 10);
  if (!Number.isNaN(numericWeight)) {
    return numericWeight;
  }
  const weightMap = {
    lighter: 100,
    normal: 400,
    bold: 700,
    bolder: 900
  };
  return weightMap[weight] || 400;
}
function getBackground($el, shadowDetection) {
  let targetEl = $el;
  while (targetEl && targetEl.nodeType === 1) {
    if (shadowDetection) {
      const root = targetEl.getRootNode();
      if (root instanceof ShadowRoot) {
        let node = targetEl;
        while (node && node !== root.host) {
          const styles2 = getComputedStyle(node);
          if (styles2.backgroundImage && styles2.backgroundImage !== "none") {
            return { type: "image", value: styles2.backgroundImage };
          }
          const bgColor2 = convertToRGBA(styles2.backgroundColor);
          if (bgColor2[3] !== 0 && bgColor2 !== "transparent") {
            return bgColor2;
          }
          node = node.parentElement;
        }
        return getBackground(root.host);
      }
    }
    const styles = getComputedStyle(targetEl);
    const bgImage = styles.backgroundImage;
    if (bgImage !== "none") {
      return { type: "image", value: bgImage };
    }
    const bgColor = convertToRGBA(styles.backgroundColor);
    if (bgColor[3] !== 0 && bgColor !== "transparent") {
      if (bgColor[3] < 1) {
        let parentEl = targetEl.parentElement;
        let parentBgColor = "rgba(255, 255, 255, 1)";
        while (parentEl && parentEl.nodeType === 1) {
          const parentStyles = getComputedStyle(parentEl);
          parentBgColor = parentStyles.backgroundColor;
          if (parentBgColor !== "rgba(0, 0, 0, 0)") {
            break;
          }
          if (parentBgColor === "rgba(0, 0, 0, 0)" && parentEl.tagName === "HTML") {
            parentBgColor = "rgba(255, 255, 255, 1)";
          }
          parentEl = parentEl.parentElement;
        }
        const parentColor = convertToRGBA(parentBgColor || "rgba(255, 255, 255, 1)");
        const blendedBG = alphaBlend(bgColor, parentColor);
        return blendedBG;
      }
      return bgColor;
    }
    if (targetEl.tagName === "HTML") {
      return [255, 255, 255];
    }
    targetEl = targetEl.parentNode;
  }
  return [255, 255, 255];
}
function getLuminance(color) {
  const rgb = color.slice(0, 3).map((x) => {
    const normalized = x / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
function getAPCAValue(color, bg) {
  const blendedColor = alphaBlend(color, bg).slice(0, 4);
  const foreground = sRGBtoY(blendedColor);
  const background = sRGBtoY(bg);
  const ratio = APCAcontrast(foreground, background);
  return { ratio, blendedColor };
}
function getWCAG2Ratio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
function brighten(color, amount) {
  return color.map((value, index) => {
    if (index < 3) {
      const newValue = Math.ceil(value + (255 - value) * amount);
      return newValue >= 255 ? 255 : newValue;
    }
    return value;
  });
}
function darken(color, amount) {
  return color.map((value, index) => {
    if (index < 3) {
      const newValue = Math.floor(value * (1 - amount));
      return newValue <= 0 ? 0 : newValue;
    }
    return value;
  });
}
function getHex(color) {
  const [r, g, b] = color.map((value) => Math.min(255, Math.max(0, value)));
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  return `#${hexR}${hexG}${hexB}`;
}
function displayAPCAValue(value) {
  return Math.abs(Number(value.toFixed(1)));
}
function displayWCAGRatio(value) {
  const truncatedRatio = Math.trunc(value * 10) / 10;
  const formattedRatio = Number.isInteger(truncatedRatio) ? truncatedRatio.toFixed(0) : truncatedRatio;
  return `${formattedRatio}:1`;
}
function ratioToDisplay(value, contrastAlgorithm) {
  return contrastAlgorithm === "APCA" ? displayAPCAValue(value) : displayWCAGRatio(value);
}
function calculateContrast(color, bg, contrastAlgorithm) {
  let ratio;
  const blendedColor = alphaBlend(color, bg).slice(0, 4);
  if (contrastAlgorithm === "APCA") {
    const foreground = sRGBtoY(blendedColor);
    const background = sRGBtoY(bg);
    ratio = APCAcontrast(foreground, background);
  } else {
    const foreground = getLuminance(blendedColor);
    const background = getLuminance(bg);
    ratio = getWCAG2Ratio(foreground, background);
  }
  return { ratio, blendedColor };
}
function suggestColorWCAG(color, background, isLargeText, contrastAlgorithm) {
  let minContrastRatio;
  if (contrastAlgorithm === "AAA") {
    minContrastRatio = isLargeText ? 4.5 : 7;
  } else {
    minContrastRatio = isLargeText ? 3 : 4.5;
  }
  const fgLuminance = getLuminance(color);
  const bgLuminance = getLuminance(background);
  const adjustMode = fgLuminance > bgLuminance ? getWCAG2Ratio(1, bgLuminance) > minContrastRatio : getWCAG2Ratio(0, bgLuminance) < minContrastRatio;
  const adjustColor = (foregroundColor, amount, mode) => mode ? brighten(foregroundColor, amount) : darken(foregroundColor, amount);
  let adjustedColor = color;
  let lastValidColor = adjustedColor;
  let contrastRatio = getWCAG2Ratio(fgLuminance, bgLuminance);
  let bestContrast = contrastRatio;
  let previousColor = color;
  let step = 0.16;
  const percentChange = 0.5;
  const precision = 0.01;
  let iterations = 0;
  const maxIterations = 100;
  while (step >= precision) {
    iterations += 1;
    if (iterations > maxIterations) {
      return { color: null };
    }
    adjustedColor = adjustColor(adjustedColor, step, adjustMode);
    const newLuminance = getLuminance(adjustedColor);
    contrastRatio = getWCAG2Ratio(newLuminance, bgLuminance);
    if (contrastRatio >= minContrastRatio) {
      lastValidColor = contrastRatio <= bestContrast ? adjustedColor : lastValidColor;
      bestContrast = contrastRatio;
      adjustedColor = previousColor;
      step *= percentChange;
    }
    previousColor = adjustedColor;
  }
  return { color: getHex(lastValidColor) };
}
const getOptimalAPCACombo = (background, fontWeight) => {
  const contrastWithDark = getAPCAValue(background, [0, 0, 0, 1]);
  const contrastWithLight = getAPCAValue(background, [255, 255, 255, 1]);
  const isDarkBetter = Math.abs(contrastWithDark.ratio) > Math.abs(contrastWithLight.ratio);
  const suggestedColor = isDarkBetter ? [0, 0, 0, 1] : [255, 255, 255, 1];
  const bestContrastRatio = isDarkBetter ? contrastWithDark.ratio : contrastWithLight.ratio;
  const newFontLookup = fontLookupAPCA(bestContrastRatio).slice(1);
  const size = Math.ceil(newFontLookup[Math.floor(fontWeight / 100) - 1]);
  return { suggestedColor, size };
};
function suggestColorAPCA(color, background, fontWeight, fontSize) {
  const graphicMinLc = 45;
  const isGraphic = fontWeight == null || fontSize == null;
  const bgLuminance = sRGBtoY(background);
  const adjustColor = (foregroundColor, amount) => bgLuminance <= 0.179 ? brighten(foregroundColor, amount) : darken(foregroundColor, amount);
  let adjustedColor = color;
  let contrast = getAPCAValue(adjustedColor, background);
  let { ratio } = contrast;
  let bestTextCombo = null;
  let bestContrast = ratio;
  let lastValidColor = null;
  let fontLookup;
  let fontWeightIndex;
  let minimumSizeRequired;
  const passesText = () => {
    fontLookup = fontLookupAPCA(ratio).slice(1);
    fontWeightIndex = Math.min(
      Math.max(Math.floor(fontWeight / 100) - 1, 0),
      fontLookup.length - 1
    );
    minimumSizeRequired = fontLookup[fontWeightIndex];
    return minimumSizeRequired <= fontSize && minimumSizeRequired !== 999 && minimumSizeRequired !== 777;
  };
  const passesGraphic = () => Math.abs(ratio) >= graphicMinLc;
  if (!isGraphic) {
    bestTextCombo = getOptimalAPCACombo(background, fontWeight);
    if (bestTextCombo.size > fontSize) {
      return {
        color: getHex(bestTextCombo.suggestedColor),
        size: bestTextCombo.size
      };
    }
    if (passesText()) {
      return { color: getHex(color), size: null };
    }
  } else if (passesGraphic()) {
    return { color: getHex(color), size: null };
  }
  let previousColor = color;
  let step = 0.16;
  const percentChange = 0.5;
  const precision = 0.01;
  let iterations = 0;
  const maxIterations = 50;
  while (step >= precision && iterations < maxIterations) {
    iterations += 1;
    adjustedColor = adjustColor(adjustedColor, step);
    contrast = getAPCAValue(adjustedColor, background);
    ratio = contrast.ratio;
    const passes = isGraphic ? passesGraphic() : passesText();
    if (passes) {
      if (Math.abs(ratio) <= Math.abs(bestContrast) || !lastValidColor) {
        lastValidColor = adjustedColor;
        bestContrast = ratio;
      }
      adjustedColor = previousColor;
      step *= percentChange;
    }
    previousColor = adjustedColor;
  }
  if (lastValidColor) {
    return { color: getHex(lastValidColor), size: null };
  }
  if (!isGraphic && bestTextCombo) {
    return {
      color: getHex(bestTextCombo.suggestedColor),
      size: bestTextCombo.size
    };
  }
  return { color: getHex(color), size: null };
}
function wcagAlgorithm($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm) {
  const { ratio, blendedColor } = calculateContrast(color, background);
  const isLargeText = fontSize >= 24 || fontSize >= 18.67 && fontWeight >= 700;
  let hasLowContrast;
  if (contrastAlgorithm === "AAA") {
    hasLowContrast = isLargeText ? ratio < 4.5 : ratio < 7;
  } else {
    const hasLowContrastNormalText = ratio > 0 && ratio < 4.5;
    hasLowContrast = isLargeText ? ratio < 3 : hasLowContrastNormalText;
  }
  if (hasLowContrast) {
    return {
      $el,
      ratio: displayWCAGRatio(ratio),
      color: blendedColor,
      background,
      fontSize,
      fontWeight,
      isLargeText,
      opacity,
      textUnderline: getComputedStyle($el).textDecorationLine
    };
  }
  return null;
}
function apcaAlgorithm($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm) {
  const { ratio, blendedColor } = calculateContrast(color, background, contrastAlgorithm);
  const fontLookup = fontLookupAPCA(ratio).slice(1);
  const fontWeightIndex = Math.floor(fontWeight / 100) - 1;
  const minFontSize = fontLookup[fontWeightIndex];
  if (fontSize < minFontSize) {
    return {
      $el,
      ratio: displayAPCAValue(ratio),
      color: blendedColor,
      background,
      fontWeight,
      fontSize,
      opacity,
      textUnderline: getComputedStyle($el).textDecorationLine
    };
  }
  return null;
}
function checkElementContrast($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm) {
  const algorithm = contrastAlgorithm === "APCA" ? apcaAlgorithm : wcagAlgorithm;
  return algorithm($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm);
}
const colorTokenPattern = /#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})\b|\b(?:rgb|hsl|lab|lch|oklab|oklch)a?\([^)]+\)|\b[a-z]+\b/gi;
function extractColorFromString(cssValue) {
  const tokens = cssValue.match(colorTokenPattern);
  if (!tokens) return [];
  const colors = [];
  for (const token of tokens) {
    if (/^[a-z]+$/i.test(token) && !CSS.supports("color", token)) continue;
    const color = convertToRGBA(token);
    if (color) colors.push(color);
  }
  return colors;
}
function checkContrast() {
  if (!State.option.contrastPlugin) return;
  const contrastResults = [];
  const elements2 = Elements.Found.Contrast;
  const contrastAlgorithm = State.option.contrastAlgorithm;
  const shadowDetection = Constants.Global.shadowDetection;
  const inputTags = /* @__PURE__ */ new Set(["SELECT", "INPUT", "TEXTAREA"]);
  for (let i = 0; i < elements2.length; i++) {
    const $el = elements2[i];
    const checkInputs = inputTags.has($el.tagName);
    let text = "";
    if (!checkInputs) {
      const nodes = $el.childNodes;
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].nodeType === 3) text += nodes[j].textContent;
      }
      text = text.trim();
      if (!text) continue;
    }
    const style = window.getComputedStyle($el);
    const opacity = parseFloat(style.opacity);
    const fontSize = parseFloat(style.fontSize);
    if (opacity === 0 || fontSize === 0 || isElementHidden($el)) continue;
    if (isScreenReaderOnly($el)) continue;
    const color = convertToRGBA(style.color, opacity);
    const getFontWeight = style.fontWeight;
    const fontWeight = normalizeFontWeight(getFontWeight);
    const background = getBackground($el, shadowDetection);
    const isLargeText = fontSize >= 24 || fontSize >= 18.67 && fontWeight >= 700;
    if (color === "unsupported" || background === "unsupported") {
      contrastResults.push({
        $el,
        type: "unsupported",
        fontSize,
        fontWeight,
        isLargeText,
        opacity,
        ...background !== "unsupported" && { background },
        ...color !== "unsupported" && { color }
      });
      continue;
    }
    if (color && color[3] === 0) continue;
    if (background.type === "image") {
      const extractColours = extractColorFromString(background.value);
      const hasFailure = !extractColours || extractColours.some(
        (gradientStop) => checkElementContrast(
          $el,
          color,
          gradientStop,
          fontSize,
          fontWeight,
          opacity,
          contrastAlgorithm
        )
      );
      if (hasFailure || background.value.includes("url(")) {
        contrastResults.push({
          $el,
          type: "background-image",
          color,
          isLargeText,
          background,
          fontSize,
          fontWeight,
          opacity
        });
      }
    } else if (getHex(color) !== getHex(background)) {
      const result = checkElementContrast(
        $el,
        color,
        background,
        fontSize,
        fontWeight,
        opacity,
        contrastAlgorithm
      );
      if (result) {
        result.type = checkInputs ? "input" : "text";
        contrastResults.push(result);
      }
    }
  }
  Elements.Found.Svg.forEach(($el) => {
    const generalWarning = { $el, type: "svg-warning" };
    const background = getBackground($el, Constants.Global.shadowDetection);
    const hasBackground = background !== "unsupported" && background.type !== "image";
    const shapes = $el.querySelectorAll("path, rect, circle, ellipse, polygon, text, use");
    const complex = $el.querySelectorAll(
      "*:not(path):not(rect):not(circle):not(ellipse):not(polygon):not(text):not(use):not(title)"
    );
    let allSameColour = false;
    if (shapes.length) {
      const ref = getComputedStyle(shapes[0]);
      allSameColour = Array.from(shapes).every((node) => {
        const style = getComputedStyle(node);
        return style.fill === ref.fill && style.fillOpacity === ref.fillOpacity && style.stroke === ref.stroke && style.strokeOpacity === ref.strokeOpacity && style.opacity === ref.opacity;
      });
    }
    if ((shapes.length === 1 || allSameColour) && complex.length === 0) {
      const style = getComputedStyle(shapes[0]);
      const { fill, stroke, strokeWidth, opacity } = style;
      let strokePx = 0;
      const { width, height } = $el.getBBox();
      if (stroke && stroke !== "none") {
        if (strokeWidth.endsWith("%")) {
          strokePx = parseFloat(strokeWidth) / 100 * Math.min(width, height);
        } else {
          strokePx = ["inherit", "initial", "unset"].includes(strokeWidth) ? 1 : parseFloat(strokeWidth);
        }
      }
      const threshold = Math.min(width, height) < 50 ? 1 : 3;
      const hasStroke = stroke && strokePx >= threshold && stroke !== "none";
      const hasFill = fill && fill !== "none" && !fill.startsWith("url(");
      const resolvedFill = fill === "currentColor" ? convertToRGBA(getComputedStyle(shapes[0]).color, opacity) : convertToRGBA(fill, opacity);
      const resolvedStroke = stroke === "currentColor" ? convertToRGBA(getComputedStyle(shapes[0]).color, opacity) : convertToRGBA(stroke, opacity);
      const supported = ![resolvedFill, resolvedStroke].includes("unsupported");
      if (supported && hasBackground) {
        let contrastValue;
        let fillPasses = false;
        let strokePasses = false;
        if (hasFill) {
          contrastValue = calculateContrast(
            resolvedFill,
            background,
            State.option.contrastAlgorithm
          );
          fillPasses = State.option.contrastAlgorithm === "APCA" ? contrastValue.ratio >= 45 : contrastValue.ratio >= 3;
        }
        if (hasStroke) {
          contrastValue = calculateContrast(
            resolvedStroke,
            background,
            State.option.contrastAlgorithm
          );
          strokePasses = State.option.contrastAlgorithm === "APCA" ? contrastValue.ratio >= 45 : contrastValue.ratio >= 3;
        }
        const failsBoth = hasFill && hasStroke && !fillPasses && !strokePasses;
        const failsFill = hasFill && !hasStroke && !fillPasses;
        const failsStroke = !hasFill && hasStroke && !strokePasses;
        if (failsBoth || failsFill || failsStroke) {
          const bgHex = getHex(background);
          const fillHex = getHex(resolvedFill);
          const strokeHex = getHex(resolvedStroke);
          if (fillHex === bgHex && !hasStroke || strokeHex === bgHex && !hasFill) {
            return;
          }
          contrastResults.push({
            $el,
            ratio: ratioToDisplay(contrastValue.ratio, State.option.contrastAlgorithm),
            color: contrastValue.blendedColor,
            type: "svg-error",
            isLargeText: true,
            // To push a suggested colour (3:1).
            background
          });
        }
      } else {
        if (hasFill && resolvedFill !== "unsupported") {
          generalWarning.color = resolvedFill;
        } else if (hasStroke && resolvedStroke !== "unsupported") {
          generalWarning.color = resolvedStroke;
        }
        if (hasBackground) {
          generalWarning.background = background;
        }
        contrastResults.push(generalWarning);
      }
    } else {
      if (hasBackground) {
        generalWarning.background = background;
      }
      contrastResults.push(generalWarning);
    }
  });
  Elements.Found.Inputs.forEach(($el) => {
    if ($el.placeholder && $el.placeholder.length !== 0) {
      const placeholder = getComputedStyle($el, "::placeholder");
      const pColor = convertToRGBA(placeholder.getPropertyValue("color"));
      const pSize = parseFloat(placeholder.fontSize);
      const pWeight = normalizeFontWeight(placeholder.fontWeight);
      const pBackground = getBackground($el, Constants.Global.shadowDetection);
      const pOpacity = parseFloat(placeholder.opacity);
      if (pColor === "unsupported") {
        contrastResults.push({ $el, type: "placeholder-unsupported" });
      } else if (pBackground.type === "image") ;
      else {
        const result = checkElementContrast(
          $el,
          pColor,
          pBackground,
          pSize,
          pWeight,
          pOpacity,
          State.option.contrastAlgorithm
        );
        if (result) {
          result.type = "placeholder";
          contrastResults.push(result);
        }
      }
    }
  });
  const processWarnings = (warnings) => {
    const backgroundImages = warnings.filter((warning) => warning.type === "background-image");
    const otherWarnings = warnings.filter((warning) => warning.type !== "background-image");
    let processedBackgroundWarnings;
    if (State.option.contrastAlgorithm === "APCA") {
      processedBackgroundWarnings = backgroundImages.map((warning) => ({ ...warning }));
    } else {
      const groupedWarnings = backgroundImages.reduce((groups, warning) => {
        const grouped = groups;
        const groupKey = JSON.stringify({
          background: warning.background.value,
          color: warning.color,
          isLargeText: warning.isLargeText
        });
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(warning);
        return grouped;
      }, {});
      processedBackgroundWarnings = Object.values(groupedWarnings).map((group) => ({
        ...group[0]
      }));
    }
    return [...processedBackgroundWarnings, ...otherWarnings];
  };
  const processedResults = processWarnings(contrastResults);
  processedResults.forEach((item) => {
    const { $el, ratio } = item;
    const updatedItem = item;
    const element = $el.tagName === "State.option" ? $el.closest("datalist, select, optgroup") : $el;
    const nodeText = fnIgnore(element, ["State.option:not(State.option:first-child)"]);
    const text = getText(nodeText);
    const truncatedText = truncateString(text, 80);
    const sanitizedText = escapeHTML(truncatedText);
    let previewText;
    if (item.type === "placeholder" || item.type === "placeholder-unsupported") {
      previewText = escapeHTML($el.placeholder);
    } else if (item.type === "svg-error" || item.type === "svg-warning") {
      previewText = "";
    } else {
      previewText = sanitizedText;
    }
    updatedItem.sanitizedText = previewText;
    const isWcag = State.option.contrastAlgorithm === "AA" || State.option.contrastAlgorithm === "AAA";
    const normal = State.option.contrastAlgorithm === "AAA" ? "7:1" : "4.5:1";
    const large = State.option.contrastAlgorithm === "AAA" ? "4.5:1" : "3:1";
    const ratioToDisplay2 = item.isLargeText ? large : normal;
    const ratioRequirementKey = item.isLargeText ? "CONTRAST_LARGE" : "CONTRAST_NORMAL";
    switch (item.type) {
      case "text":
        if (State.option.checks.CONTRAST_ERROR) {
          State.results.push({
            test: "CONTRAST_ERROR",
            element: $el,
            type: State.option.checks.CONTRAST_ERROR.type || "error",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_ERROR.content || (isWcag ? `${Lang._("CONTRAST_ERROR")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_ERROR")),
              ratioToDisplay2
            ),
            dismiss: prepareDismissal(`CONTRAST_ERROR ${sanitizedText}`),
            dismissAll: State.option.checks.CONTRAST_ERROR.dismissAll ? "CONTRAST_ERROR" : false,
            developer: State.option.checks.CONTRAST_ERROR.developer || false,
            contrastDetails: updatedItem
          });
        }
        break;
      case "input":
        if (State.option.checks.CONTRAST_INPUT) {
          const sanitizedInput = sanitizeHTML($el.outerHTML);
          State.results.push({
            test: "CONTRAST_INPUT",
            element,
            type: State.option.checks.CONTRAST_INPUT.type || "error",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_INPUT.content || (isWcag ? `${Lang._("CONTRAST_INPUT")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_INPUT")),
              ratio,
              ratioToDisplay2
            ),
            dismiss: prepareDismissal(`CONTRAST_INPUT ${sanitizedInput}`),
            dismissAll: State.option.checks.CONTRAST_INPUT.dismissAll ? "CONTRAST_INPUT" : false,
            developer: State.option.checks.CONTRAST_INPUT.developer || true,
            contrastDetails: updatedItem
          });
        }
        break;
      case "placeholder":
        if (State.option.checks.CONTRAST_PLACEHOLDER) {
          const sanitizedPlaceholder = sanitizeHTML($el.outerHTML);
          State.results.push({
            test: "CONTRAST_PLACEHOLDER",
            element: $el,
            type: State.option.checks.CONTRAST_PLACEHOLDER.type || "error",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_PLACEHOLDER.content || (isWcag ? `${Lang._("CONTRAST_PLACEHOLDER")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_PLACEHOLDER")),
              ratioToDisplay2
            ),
            position: "afterend",
            dismiss: prepareDismissal(`CONTRAST_PLACEHOLDER ${sanitizedPlaceholder}`),
            dismissAll: State.option.checks.CONTRAST_PLACEHOLDER.dismissAll ? "CONTRAST_PLACEHOLDER" : false,
            developer: State.option.checks.CONTRAST_PLACEHOLDER.developer || true,
            contrastDetails: updatedItem
          });
        }
        break;
      case "placeholder-unsupported":
        if (State.option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED) {
          const sanitizedPlaceholder = sanitizeHTML($el.outerHTML);
          State.results.push({
            test: "CONTRAST_PLACEHOLDER_UNSUPPORTED",
            element: $el,
            type: State.option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.type || "warning",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.content || (isWcag ? `${Lang._("CONTRAST_PLACEHOLDER_UNSUPPORTED")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_PLACEHOLDER_UNSUPPORTED")),
              ratioToDisplay2
            ),
            position: "afterend",
            dismiss: prepareDismissal(`CONTRAST_PLACEHOLDER_UNSUPPORTED ${sanitizedPlaceholder}`),
            dismissAll: State.option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.dismissAll ? "CONTRAST_PLACEHOLDER_UNSUPPORTED" : false,
            developer: State.option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.developer || true,
            contrastDetails: updatedItem
          });
        }
        break;
      case "svg-error":
        if (State.option.checks.CONTRAST_ERROR_GRAPHIC) {
          const sanitizedSVG = sanitizeHTML($el.outerHTML);
          State.results.push({
            test: "CONTRAST_ERROR_GRAPHIC",
            element: $el,
            type: State.option.checks.CONTRAST_ERROR_GRAPHIC.type || "error",
            // No trailing variable needed since the graphic tip is just static text
            content: Lang.sprintf(
              State.option.checks.CONTRAST_ERROR_GRAPHIC.content || (State.option.contrastAlgorithm !== "APCA" ? `${Lang._("CONTRAST_ERROR_GRAPHIC")} ${Lang._("CONTRAST_TIP_GRAPHIC")}` : Lang._("CONTRAST_ERROR_GRAPHIC"))
            ),
            dismiss: prepareDismissal(`CONTRAST_ERROR_GRAPHIC ${sanitizedSVG}`),
            dismissAll: State.option.checks.CONTRAST_ERROR_GRAPHIC.dismissAll ? "CONTRAST_ERROR_GRAPHIC" : false,
            developer: State.option.checks.CONTRAST_ERROR_GRAPHIC.developer || true,
            contrastDetails: updatedItem,
            margin: "-25px"
          });
        }
        break;
      case "svg-warning":
        if (State.option.checks.CONTRAST_WARNING_GRAPHIC) {
          const sanitizedSVG = sanitizeHTML($el.outerHTML);
          State.results.push({
            test: "CONTRAST_WARNING_GRAPHIC",
            element: $el,
            type: State.option.checks.CONTRAST_WARNING_GRAPHIC.type || "warning",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_WARNING_GRAPHIC.content || (State.option.contrastAlgorithm !== "APCA" ? `${Lang._("CONTRAST_WARNING_GRAPHIC")} ${Lang._("CONTRAST_TIP_GRAPHIC")}` : Lang._("CONTRAST_WARNING_GRAPHIC"))
            ),
            dismiss: prepareDismissal(`CONTRAST_WARNING_GRAPHIC ${sanitizedSVG}`),
            dismissAll: State.option.checks.CONTRAST_WARNING_GRAPHIC.dismissAll ? "CONTRAST_WARNING_GRAPHIC" : false,
            developer: State.option.checks.CONTRAST_WARNING_GRAPHIC.developer || true,
            contrastDetails: updatedItem,
            margin: "-25px"
          });
        }
        break;
      case "background-image":
        if (State.option.checks.CONTRAST_WARNING) {
          State.results.push({
            test: "CONTRAST_WARNING",
            element,
            type: State.option.checks.CONTRAST_WARNING.type || "warning",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_WARNING.content || (isWcag ? `${Lang._("CONTRAST_WARNING")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_WARNING")),
              ratioToDisplay2
            ),
            dismiss: prepareDismissal(`CONTRAST_WARNING ${sanitizedText}`),
            dismissAll: State.option.checks.CONTRAST_WARNING.dismissAll ? "CONTRAST_WARNING" : false,
            developer: State.option.checks.CONTRAST_WARNING.developer || false,
            contrastDetails: updatedItem
          });
        }
        break;
      case "unsupported":
        if (State.option.checks.CONTRAST_UNSUPPORTED) {
          State.results.push({
            test: "CONTRAST_UNSUPPORTED",
            element,
            type: State.option.checks.CONTRAST_UNSUPPORTED.type || "warning",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_UNSUPPORTED.content || (isWcag ? `${Lang._("CONTRAST_WARNING")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_WARNING")),
              ratioToDisplay2
            ),
            dismiss: prepareDismissal(`CONTRAST_UNSUPPORTED ${sanitizedText}`),
            dismissAll: State.option.checks.CONTRAST_UNSUPPORTED.dismissAll ? "CONTRAST_UNSUPPORTED" : false,
            developer: State.option.checks.CONTRAST_UNSUPPORTED.developer || false,
            contrastDetails: updatedItem
          });
        }
        break;
    }
  });
}
function checkDeveloper() {
  const report = (key, ...args) => {
    const rule = State.option.checks[key];
    if (!rule) return;
    State.results.push({
      test: key,
      type: rule.type || "error",
      content: Lang.sprintf(rule.content || key, ...args),
      dismiss: prepareDismissal(key),
      developer: rule.developer || true
    });
  };
  if (!Elements.Found.Language) {
    report("META_LANG");
  } else {
    const { valid, suggest } = validateLang(Elements.Found.Language, Lang._("LANG_CODE"));
    if (!valid) {
      if (suggest) {
        report("META_LANG_SUGGEST", Elements.Found.Language, suggest);
      } else {
        report("META_LANG_VALID", Elements.Found.Language);
      }
    }
  }
  if (State.option.checks.META_TITLE) {
    const metaTitle = document.querySelector("title:not(svg title)");
    if (!metaTitle || metaTitle.textContent.trim().length === 0) {
      State.results.push({
        test: "META_TITLE",
        type: State.option.checks.META_TITLE.type || "error",
        content: Lang.sprintf(State.option.checks.META_TITLE.content || "META_TITLE"),
        dismiss: prepareDismissal("META_TITLE"),
        developer: State.option.checks.META_TITLE.developer || true
      });
    }
  }
  if (State.option.checks.META_SCALABLE || State.option.checks.META_MAX) {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      const content = metaViewport.getAttribute("content");
      if (content) {
        const params = content.split(",").reduce((acc, param) => {
          const [key, value] = param.split("=").map((s) => s.trim());
          acc[key] = value;
          return acc;
        }, {});
        if (State.option.checks.META_SCALABLE && (params["user-scalable"] === "no" || params["user-scalable"] === "0")) {
          State.results.push({
            test: "META_SCALABLE",
            type: State.option.checks.META_SCALABLE.type || "error",
            content: Lang.sprintf(State.option.checks.META_SCALABLE.content || "META_SCALABLE"),
            dismiss: prepareDismissal("META_SCALABLE"),
            developer: State.option.checks.META_SCALABLE.developer || true
          });
        }
        const maxScale = parseFloat(params["maximum-scale"]);
        if (State.option.checks.META_MAX && !Number.isNaN(maxScale) && maxScale < 2) {
          State.results.push({
            test: "META_MAX",
            type: State.option.checks.META_MAX.type || "error",
            content: Lang.sprintf(State.option.checks.META_MAX.content || "META_MAX"),
            dismiss: prepareDismissal("META_MAX"),
            developer: State.option.checks.META_MAX.developer || true
          });
        }
      }
    }
  }
  if (State.option.checks.META_REFRESH) {
    const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
    if (metaRefresh) {
      State.results.push({
        test: "META_REFRESH",
        type: State.option.checks.META_REFRESH.type || "error",
        content: Lang.sprintf(State.option.checks.META_REFRESH.content || "META_REFRESH"),
        dismiss: prepareDismissal("META_REFRESH"),
        developer: State.option.checks.META_REFRESH.developer || true
      });
    }
  }
  if (State.option.checks.DUPLICATE_ID) {
    const doms = document.querySelectorAll("body, [data-sa11y-has-shadow-root]");
    doms.forEach((dom) => {
      const allIds = /* @__PURE__ */ new Set();
      const findDuplicateIds = (ids, withinDOM) => {
        ids.forEach(($el) => {
          const { id } = $el;
          if (typeof id !== "string" || id.trim().length === 0) {
            return;
          }
          if (id && !allIds.has(id)) {
            allIds.add(id);
          } else {
            const ariaReference = Array.from(
              withinDOM.querySelectorAll(`
                a[href*="${id}"],
                label[for*="${id}"],
                [aria-labelledby*="${id}"],
                [aria-controls*="${id}"],
                [aria-owns*="${id}"]`)
            );
            if (ariaReference.length > 0) {
              State.results.push({
                test: "DUPLICATE_ID",
                element: $el,
                type: State.option.checks.DUPLICATE_ID.type || "error",
                content: Lang.sprintf(
                  State.option.checks.DUPLICATE_ID.content || "DUPLICATE_ID",
                  id
                ),
                dismiss: prepareDismissal(`DUPLICATE_ID ${id}${$el.textContent}`),
                dismissAll: State.option.checks.DUPLICATE_ID.dismissAll ? "DUPLICATE_ID" : false,
                developer: State.option.checks.DUPLICATE_ID.developer || true
              });
            }
          }
        });
      };
      if (dom.shadowRoot) {
        const shadowRootIds = Array.from(
          dom.shadowRoot.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`)
        );
        findDuplicateIds(shadowRootIds, dom.shadowRoot);
      }
      const regularIds = Array.from(
        dom.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`)
      );
      findDuplicateIds(regularIds, dom);
    });
  }
  if (State.option.checks.BTN_EMPTY || State.option.checks.BTN_EMPTY_LABELLEDBY || State.option.checks.BTN_LABEL || State.option.checks.HIDDEN_FOCUSABLE || State.option.checks.LABEL_IN_NAME) {
    Elements.Found.Buttons.forEach(($el) => {
      const accName = computeAccessibleName($el);
      const buttonText = accName.replace(/'|"|-|\.|\s+/g, "").toLowerCase();
      const hasAria = $el.querySelector(":scope [aria-labelledby], :scope [aria-label]") || $el.getAttribute("aria-labelledby") || $el.getAttribute("aria-label");
      const hasAriaLabelledby = $el.querySelector(":scope [aria-labelledby]") || $el.getAttribute("aria-labelledby");
      const ariaHidden = $el.getAttribute("aria-hidden") === "true";
      const negativeTabindex = $el.getAttribute("tabindex") === "-1";
      if (ariaHidden) {
        if (!negativeTabindex) {
          if (State.option.checks.HIDDEN_FOCUSABLE) {
            State.results.push({
              test: "HIDDEN_FOCUSABLE",
              element: $el,
              type: State.option.checks.HIDDEN_FOCUSABLE.type || "error",
              content: Lang.sprintf(
                State.option.checks.HIDDEN_FOCUSABLE.content || "HIDDEN_FOCUSABLE"
              ),
              dismiss: prepareDismissal(
                `HIDDEN_FOCUSABLE ${$el.tagName + $el.id + $el.className + accName}`
              ),
              dismissAll: State.option.checks.HIDDEN_FOCUSABLE.dismissAll ? "BTN_HIDDEN_FOCUSABLE" : false,
              developer: State.option.checks.HIDDEN_FOCUSABLE.developer || true
            });
          }
        }
        return;
      }
      if (buttonText.length === 0) {
        if (State.option.checks.BTN_EMPTY_LABELLEDBY && hasAriaLabelledby) {
          State.results.push({
            test: "BTN_EMPTY_LABELLEDBY",
            element: $el,
            type: State.option.checks.BTN_EMPTY_LABELLEDBY.type || "error",
            content: Lang.sprintf(
              State.option.checks.BTN_EMPTY_LABELLEDBY.content || Lang._("BTN_EMPTY_LABELLEDBY") + Lang._("BTN_TIP")
            ),
            dismiss: prepareDismissal(
              `BTN_EMPTY_LABELLEDBY ${$el.tagName + $el.id + $el.className + accName}`
            ),
            dismissAll: State.option.checks.BTN_EMPTY_LABELLEDBY.dismissAll ? "BTN_EMPTY_LABELLEDBY" : false,
            developer: State.option.checks.BTN_EMPTY_LABELLEDBY.developer || true
          });
        } else if (State.option.checks.BTN_EMPTY) {
          State.results.push({
            test: "BTN_EMPTY",
            element: $el,
            type: State.option.checks.BTN_EMPTY.type || "error",
            content: Lang.sprintf(State.option.checks.BTN_EMPTY.content || Lang._("BTN_EMPTY") + Lang._("BTN_TIP")),
            dismiss: prepareDismissal(
              `BTN_EMPTY ${$el.tagName + $el.id + $el.className + accName}`
            ),
            dismissAll: State.option.checks.BTN_EMPTY.dismissAll ? "BTN_EMPTY" : false,
            developer: State.option.checks.BTN_EMPTY.developer || true
          });
        }
        return;
      }
      const isVisibleTextInAccName$1 = isVisibleTextInAccName($el, accName);
      if (State.option.checks.LABEL_IN_NAME && hasAria && isVisibleTextInAccName$1) {
        const escapedText = escapeHTML(accName);
        State.results.push({
          test: "LABEL_IN_NAME",
          element: $el,
          type: State.option.checks.LABEL_IN_NAME.type || "warning",
          content: State.option.checks.LABEL_IN_NAME.content ? Lang.sprintf(State.option.checks.LABEL_IN_NAME.content, escapedText) : Lang.sprintf(
            Lang._("LABEL_IN_NAME") + Lang._("ACC_NAME_TIP"),
            escapedText
          ),
          dismiss: prepareDismissal(
            `LABEL_IN_NAME ${$el.tagName + $el.id + $el.className + accName}`
          ),
          dismissAll: State.option.checks.LABEL_IN_NAME.dismissAll ? "BTN_LABEL_IN_NAME" : false,
          developer: State.option.checks.LABEL_IN_NAME.developer || true
        });
        return;
      }
      if (State.option.checks.BTN_ROLE_IN_NAME && accName.includes(Lang._("BTN"))) {
        State.results.push({
          test: "BTN_ROLE_IN_NAME",
          element: $el,
          type: State.option.checks.BTN_ROLE_IN_NAME.type || "warning",
          content: Lang.sprintf(
            State.option.checks.BTN_ROLE_IN_NAME.content || Lang._("BTN_ROLE_IN_NAME") + Lang._("BTN_TIP")
          ),
          dismiss: prepareDismissal(
            `BTN_ROLE_IN_NAME ${$el.tagName + $el.id + $el.className + accName}`
          ),
          dismissAll: State.option.checks.BTN_ROLE_IN_NAME.dismissAll ? "BTN_ROLE_IN_NAME" : false,
          developer: State.option.checks.BTN_ROLE_IN_NAME.developer || true
        });
      }
    });
  }
  if (State.option.checks.UNCONTAINED_LI) {
    Elements.Found.Lists.forEach(($el) => {
      if (!$el.closest("ul, ol, menu")) {
        State.results.push({
          test: "UNCONTAINED_LI",
          element: $el,
          type: State.option.checks.UNCONTAINED_LI.type || "error",
          content: Lang.sprintf(State.option.checks.UNCONTAINED_LI.content || "UNCONTAINED_LI"),
          dismiss: prepareDismissal(`UNCONTAINED_LI ${$el.textContent}`),
          dismissAll: State.option.checks.UNCONTAINED_LI.dismissAll ? "UNCONTAINED_LI" : false,
          developer: State.option.checks.UNCONTAINED_LI.developer || true
        });
      }
    });
  }
  if (State.option.checks.TABINDEX_ATTR) {
    Elements.Found.TabIndex.forEach(($el) => {
      State.results.push({
        test: "TABINDEX_ATTR",
        element: $el,
        type: State.option.checks.TABINDEX_ATTR.type || "error",
        content: Lang.sprintf(State.option.checks.TABINDEX_ATTR.content || "TABINDEX_ATTR"),
        dismiss: prepareDismissal(`TABINDEX_ATTR ${$el.tagName + $el.id + $el.className}`),
        dismissAll: State.option.checks.TABINDEX_ATTR.dismissAll ? "TABINDEX_ATTR" : false,
        developer: State.option.checks.TABINDEX_ATTR.developer || true
      });
    });
  }
  return State.results;
}
const intersect = (a, b, x = 10) => {
  return a.left - x <= b.right && b.left - x <= a.right && a.top - x <= b.bottom && b.top - x <= a.bottom;
};
const overlap = (rect1Left, rect1Top, rect2Left, rect2Top, size = 17) => {
  return !(rect1Left + size < rect2Left || rect1Left > rect2Left + size || rect1Top + size < rect2Top || rect1Top > rect2Top + size);
};
const nudgeMark = (el, x, y) => {
  if (el.style.transform) {
    const computedStyle = window.getComputedStyle(el);
    let matrix = computedStyle.getPropertyValue("transform");
    matrix = matrix.split(",");
    el.style.transform = `translate(${parseFloat(matrix[4]) + x}px, ${parseFloat(matrix[5]) + y}px)`;
  } else {
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
};
const scrollableElem = (el) => {
  let overflowing = el.clientHeight && el.clientHeight < el.scrollHeight;
  if (overflowing) {
    const styles = window.getComputedStyle(el);
    overflowing = styles.overflowY !== "visible";
  }
  return overflowing;
};
function closestScrollable(el) {
  if (State.option.constrainButtons && el.closest(State.option.constrainButtons)) {
    return el.closest(State.option.constrainButtons);
  }
  let parent = el.parentElement;
  if (parent && parent.tagName !== "BODY") {
    if (scrollableElem(parent)) {
      return parent;
    } else {
      parent = closestScrollable(parent);
      return parent;
    }
  } else {
    return false;
  }
}
function alignPanel() {
  if (!UI.panelElement) {
    return false;
  }
  if (State.option.panelPosition === "left") {
    UI.panel.classList.add("ed11y-pin-left");
  }
  let xMost = 0;
  let yMost = 0;
  if (Elements.Found.panelNoCover) {
    Elements.Found.panelNoCover.forEach((el) => {
      const bounds = el.getBoundingClientRect();
      if (State.option.panelPosition === "right") {
        xMost = window.innerWidth - bounds.left > xMost && bounds.left > window.innerWidth / 3 ? window.innerWidth - bounds.left : xMost;
      } else {
        xMost = bounds.right > xMost && xMost + bounds.right < window.innerWidth / 3 ? xMost + bounds.right : xMost;
      }
      yMost = bounds.height > yMost && bounds.height + yMost < window.innerHeight / 2 ? yMost + bounds.height : yMost;
    });
  }
  if (xMost > 0 && xMost < window.innerWidth - 240) {
    UI.panelElement.style.setProperty(State.option.panelPosition, `${xMost + 10}px`);
    UI.panelElement.style.setProperty("bottom", State.option.panelOffsetY);
  } else if (xMost > 0 && xMost > window.innerWidth - 240 && yMost > 0) {
    UI.panelElement.style.setProperty(State.option.panelPosition, State.option.panelOffsetX);
    UI.panelElement.style.setProperty("bottom", `calc(${State.option.panelOffsetY} + ${yMost}px)`);
  } else {
    UI.panelElement.style.setProperty(State.option.panelPosition, State.option.panelOffsetX);
    UI.panelElement.style.setProperty("bottom", State.option.panelOffsetY);
  }
}
function alignAlts() {
  UI.imageAlts?.forEach((mark) => {
    if (!mark.mark) {
      return;
    }
    const el = mark.mark;
    el.style.setProperty("transform", null);
    el.style.setProperty("height", null);
    el.style.setProperty("width", null);
    let img = mark.element;
    if (img.tagName !== "IMG") {
      img = img.querySelector("img");
    }
    const markOffset = el.getBoundingClientRect();
    const imgOffset = img.getBoundingClientRect();
    const newOffset = imgOffset.left - markOffset.left;
    let height = getComputedStyle(img).height;
    height = height === "auto" ? img.offsetHeight : Math.max(img.offsetHeight, parseInt(height, 10));
    el.style.setProperty("transform", `translate(${newOffset}px, 0px)`);
    el.style.setProperty("height", `${height}px`);
    el.style.setProperty("width", `${img.offsetWidth}px`);
  });
}
function checkEditableIntersects(focusKnown = false) {
  if (!UI.activeRange || !focusKnown && !document.querySelector("[contenteditable]:focus, [contenteditable] :focus")) {
    UI.jumpList?.forEach((el) => {
      if (el.matches(".intersecting")) {
        el.classList.remove("intersecting");
      }
    });
    return;
  }
  const activeRects = UI.activeRange.getBoundingClientRect();
  UI.jumpList?.forEach((el) => {
    const toggle = el.shadowRoot.querySelector(".toggle");
    const framePositioner = el.result.fixedRoot && UI.positionedFrames[el.result.fixedRoot] ? UI.positionedFrames[el.result.fixedRoot] : { top: 0, left: 0 };
    const rects = {};
    rects.top = activeRects.top + framePositioner.top;
    rects.left = activeRects.left + framePositioner.left;
    rects.bottom = activeRects.bottom + framePositioner.top;
    rects.right = activeRects.right + framePositioner.left;
    if (intersect(rects, el.result.element.getBoundingClientRect(), 0) || intersect(rects, toggle.getBoundingClientRect(), 0)) {
      el.classList.add("intersecting");
      toggle.classList.add("intersecting");
    } else {
      el.classList.remove("intersecting", "was-intersecting");
      toggle.classList.remove("intersecting", "was-intersecting");
    }
  });
}
function alignButtons() {
  if (UI.jumpList.length === 0) {
    return;
  }
  UI.alignPending = true;
  if (State.option.fixedRoots) {
    UI.positionedFrames.length = 0;
    State.option.fixedRoots.forEach((root) => {
      if (root.framePositioner) {
        UI.positionedFrames.push(root.framePositioner.getBoundingClientRect());
      }
    });
  }
  let previousNudgeTop = 0;
  let previousNudgeLeft = 0;
  const scrollTop = window.scrollY;
  if (!UI.inlineAlerts) {
    for (let i = 0; i < UI.jumpList.length; i++) {
      const mark = UI.jumpList[i];
      if (!mark.result.element) {
        console.warn("Editoria11y debug: element disappeared");
        continue;
      }
      if (!mark.result.element.isConnected) {
        UI.forceFullCheck = true;
        UI.interaction = true;
        mark.style.display = "none";
      }
      let targetOffset = mark.result.element.getBoundingClientRect();
      let top = targetOffset.top + scrollTop;
      if (!visible(mark.result.element)) {
        const theFirstVisibleParent = firstVisibleParent(mark.result.element);
        targetOffset = theFirstVisibleParent ? theFirstVisibleParent.getBoundingClientRect() : targetOffset;
        top = targetOffset.top + scrollTop;
      }
      let left = targetOffset.left;
      if (mark.result.element.tagName === "IMG") {
        top = top + 10;
        left = left + 10;
      } else {
        left = UI.inlineAlerts ? left - 34 : left;
      }
      if (mark.result.fixedRoot && UI.positionedFrames[mark.result.fixedRoot]) {
        top = top + UI.positionedFrames[mark.result.fixedRoot].top;
        left = left + UI.positionedFrames[mark.result.fixedRoot].left;
      }
      if (mark.result.scrollableParent) {
        UI.jumpList[i].bounds = mark.result.scrollableParent.getBoundingClientRect();
        if (left < UI.jumpList[i].bounds.left) {
          left = UI.jumpList[i].bounds.left;
        } else if (left + 40 > UI.jumpList[i].bounds.right) {
          left = UI.jumpList[i].bounds.right - 40;
        }
      } else if (mark.result.fixedRoot && UI.positionedFrames[mark.result.fixedRoot]) {
        UI.jumpList[i].bounds = UI.positionedFrames[mark.result.fixedRoot];
        if (left < UI.jumpList[i].bounds.left) {
          left = UI.jumpList[i].bounds.left;
        } else if (left + 40 > UI.jumpList[i].bounds.right) {
          left = UI.jumpList[i].bounds.right - 40;
        }
      }
      UI.jumpList[i].targetOffset = targetOffset;
      UI.jumpList[i].markTop = top;
      UI.jumpList[i].markLeft = left;
    }
  } else {
    UI.jumpList.forEach((mark) => {
      mark.style.setProperty("transform", null);
      mark.style.setProperty("top", "initial");
      mark.style.setProperty("left", "initial");
      if (mark.style.transform) {
        const computedStyle = window.getComputedStyle(mark);
        let matrix = computedStyle.getPropertyValue("transform");
        matrix = matrix.split(",");
        mark.xOffset = parseFloat(matrix[4]);
        mark.yOffset = parseFloat(matrix[5]);
      } else {
        mark.xOffset = 0;
        mark.yOffset = 0;
      }
    });
    UI.jumpList.forEach((mark) => {
      mark.markOffset = mark.getBoundingClientRect();
      mark.markLeft = mark.markOffset.left;
      mark.markTop = mark.markOffset.top;
    });
  }
  UI.jumpList.forEach((mark, i) => {
    let nudgeTop = 10;
    let nudgeLeft = mark.result.element.tagName === "IMG" ? 10 : -34;
    if (mark.markTop + scrollTop < 0) {
      nudgeTop = -1 * (mark.markTop + scrollTop) - 6;
    }
    if (i > 0 && overlap(
      mark.markLeft,
      mark.markTop,
      UI.jumpList[i - 1].markLeft,
      UI.jumpList[i - 1].markTop
    ) || i > 1 && overlap(
      mark.markLeft,
      mark.markTop,
      UI.jumpList[i - 2].markLeft,
      UI.jumpList[i - 2].markTop
    ) || i > 2 && overlap(
      mark.markLeft,
      mark.markTop,
      UI.jumpList[i - 3].markLeft,
      UI.jumpList[i - 3].markTop
    )) {
      nudgeTop = nudgeTop + 14 + previousNudgeTop;
      nudgeLeft = 14 + previousNudgeLeft;
    }
    let constrainLeft = 0;
    let constrainRight = window.innerWidth;
    if (mark.result.scrollableParent) {
      const constrained = mark.result.scrollableParent.getBoundingClientRect();
      constrainLeft = constrained.left;
      constrainRight = constrainLeft + constrained.width;
    } else if (mark.result.fixedRoot && UI.positionedFrames[mark.result.fixedRoot]) {
      constrainLeft = UI.positionedFrames[mark.result.fixedRoot].left;
      constrainRight = UI.positionedFrames[mark.result.fixedRoot].right;
    }
    let needNudge = false;
    if (mark.markLeft + nudgeLeft - constrainLeft < 44) {
      nudgeLeft = 44 - mark.markLeft + nudgeLeft + constrainLeft;
      needNudge = true;
    } else if (mark.markLeft + nudgeLeft + 80 > constrainRight) {
      needNudge = true;
      nudgeLeft = constrainRight - nudgeLeft - mark.markLeft - 100;
    } else if (nudgeTop !== 0) {
      needNudge = true;
    }
    if (!UI.inlineAlerts) {
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
  if (!UI.inlineAlerts) {
    UI.jumpList.forEach((mark) => {
      if (mark.result.scrollableParent) {
        if (!!mark.bounds && (mark.targetOffset.top - mark.bounds.top < 0 || mark.targetOffset.top - mark.bounds.bottom > 0) && !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')) {
          mark.classList.add("ed11y-offscreen");
          mark.style.transform = "translate(0px, -50px)";
          mark.style.pointerEvents = "none";
          if (mark.getAttribute("data-ed11y-open") === "true") {
            mark.setAttribute("data-ed11y-action", "shut");
          }
        } else {
          mark.classList.remove("ed11y-offscreen");
          mark.style.pointerEvents = "auto";
        }
      } else if (mark.result.fixedRoot && UI.positionedFrames[mark.result.fixedRoot]) {
        if (!!mark.bounds && (mark.targetOffset.top < -40 || mark.targetOffset.top + mark.bounds.top - mark.bounds.bottom > -10) && !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')) {
          mark.classList.add("ed11y-offscreen");
          mark.style.transform = "translate(0px, -50px)";
          mark.style.pointerEvents = "none";
          if (mark.getAttribute("data-ed11y-open") === "true") {
            mark.setAttribute("data-ed11y-action", "shut");
          }
        } else {
          mark.classList.remove("ed11y-offscreen");
          mark.style.pointerEvents = "auto";
        }
      } else {
        mark.classList.remove("ed11y-offscreen");
        mark.style.pointerEvents = "auto";
      }
    });
  }
  window.setTimeout(() => {
    UI.jumpList?.forEach((mark) => {
      mark.classList.remove("ed11y-preload");
    });
  }, 0);
}
function checkEmbeddedContent() {
  if (!State.option.embeddedContentPlugin) return;
  const src = ($el) => $el.getAttribute("src") || $el.querySelector("source[src]")?.getAttribute("src") || $el.querySelector("[src]")?.getAttribute("src") || null;
  if (State.option.checks.EMBED_AUDIO) {
    Elements.Found.Audio.forEach(($el) => {
      State.results.push({
        test: "EMBED_AUDIO",
        element: $el,
        type: State.option.checks.EMBED_AUDIO.type || "warning",
        content: Lang.sprintf(State.option.checks.EMBED_AUDIO.content || "EMBED_AUDIO"),
        dismiss: prepareDismissal(`EMBED_AUDIO ${src($el)}`),
        dismissAll: State.option.checks.EMBED_AUDIO.dismissAll ? "EMBED_AUDIO" : false,
        developer: State.option.checks.EMBED_AUDIO.developer || false
      });
    });
  }
  if (State.option.checks.EMBED_VIDEO) {
    Elements.Found.Videos.forEach(($el) => {
      const track = $el.querySelector("track");
      const trackSrc = track?.getAttribute("src");
      if (track === null || trackSrc === null || trackSrc.trim().length === 0) {
        State.results.push({
          test: "EMBED_VIDEO",
          element: $el,
          type: State.option.checks.EMBED_VIDEO.type || "warning",
          content: Lang.sprintf(State.option.checks.EMBED_VIDEO.content || "EMBED_VIDEO"),
          dismiss: prepareDismissal(`EMBED_VIDEO ${src($el)}`),
          dismissAll: State.option.checks.EMBED_VIDEO.dismissAll ? "EMBED_VIDEO" : false,
          developer: State.option.checks.EMBED_VIDEO.developer || false
        });
      }
    });
  }
  if (State.option.checks.EMBED_DATA_VIZ) {
    Elements.Found.Visualizations.forEach(($el) => {
      State.results.push({
        test: "EMBED_DATA_VIZ",
        element: $el,
        type: State.option.checks.EMBED_DATA_VIZ.type || "warning",
        content: Lang.sprintf(State.option.checks.EMBED_DATA_VIZ.content || "EMBED_DATA_VIZ"),
        dismiss: prepareDismissal(`EMBED_DATA_VIZ ${src($el)}`),
        dismissAll: State.option.checks.EMBED_DATA_VIZ.dismissAll ? "EMBED_DATA_VIZ" : false,
        developer: State.option.checks.EMBED_DATA_VIZ.developer || false
      });
    });
  }
  Elements.Found.iframes.forEach(($el) => {
    const presentation = ["presentation", "none"].includes($el.getAttribute("role"));
    const hidden = isElementHidden($el);
    const videoAudio = $el.tagName === "VIDEO" || $el.tagName === "AUDIO";
    const ariaHidden = $el.getAttribute("aria-hidden") === "true";
    const negativeTabindex = $el.getAttribute("tabindex") === "-1";
    if (hidden || videoAudio || ariaHidden && negativeTabindex || presentation) {
      return;
    }
    if (negativeTabindex) {
      if (State.option.checks.EMBED_UNFOCUSABLE) {
        State.results.push({
          test: "EMBED_UNFOCUSABLE",
          element: $el,
          type: State.option.checks.EMBED_UNFOCUSABLE.type || "error",
          content: Lang.sprintf(
            State.option.checks.EMBED_UNFOCUSABLE.content || "EMBED_UNFOCUSABLE"
          ),
          dismiss: prepareDismissal(`EMBED_UNFOCUSABLE ${src($el)}`),
          dismissAll: State.option.checks.EMBED_UNFOCUSABLE.dismissAll ? "EMBED_UNFOCUSABLE" : false,
          developer: State.option.checks.EMBED_UNFOCUSABLE.developer || true
        });
      }
      return;
    }
    if (State.option.checks.EMBED_MISSING_TITLE) {
      const aria = computeAriaLabel($el);
      const checkTitle = aria === "noAria" ? $el.getAttribute("title") || "" : aria;
      const accessibleName = removeWhitespace(checkTitle);
      if (accessibleName.length === 0) {
        State.results.push({
          test: "EMBED_MISSING_TITLE",
          element: $el,
          type: State.option.checks.EMBED_MISSING_TITLE.type || "error",
          content: Lang.sprintf(
            State.option.checks.EMBED_MISSING_TITLE.content || "EMBED_MISSING_TITLE"
          ),
          dismiss: prepareDismissal(`EMBED_MISSING_TITLE ${src($el)}`),
          dismissAll: State.option.checks.EMBED_MISSING_TITLE.dismissAll ? "EMBED_MISSING_TITLE" : false,
          developer: State.option.checks.EMBED_MISSING_TITLE.developer || true
        });
      }
    }
  });
  if (State.option.checks.EMBED_GENERAL) {
    Elements.Found.EmbeddedContent.forEach(($el) => {
      const presentation = ["presentation", "none"].includes($el.getAttribute("role"));
      const ariaHidden = $el.getAttribute("aria-hidden") === "true";
      const negativeTabindex = $el.getAttribute("tabindex") === "-1";
      const hidden = isElementHidden($el);
      if (hidden || ariaHidden && negativeTabindex || presentation) {
        return;
      }
      if ($el.tagName === "VIDEO" || $el.tagName === "AUDIO") {
        return;
      }
      State.results.push({
        test: "EMBED_GENERAL",
        element: $el,
        type: State.option.checks.EMBED_GENERAL.type || "warning",
        content: Lang.sprintf(State.option.checks.EMBED_GENERAL.content || "EMBED_GENERAL"),
        dismiss: prepareDismissal(`EMBED_GENERAL ${src($el)}`),
        dismissAll: State.option.checks.EMBED_GENERAL.dismissAll ? "EMBED_GENERAL" : false,
        developer: State.option.checks.EMBED_GENERAL.developer || false
      });
    });
  }
  return State.results;
}
function syncResults(results) {
  if (!UI.incremental) {
    window.setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent("ed11yResults", {
          // @todo cms/document new detail
          detail: {
            results,
            incremental: UI.incremental
          }
        })
      );
    }, 0);
  }
}
const pushResult = async (i, inContent) => {
  if (!inContent) {
    UI.splitConfiguration.devResults[i].outsideContentRoots = true;
    UI.splitConfiguration.devResults[i].dismiss = `≈dev§${UI.splitConfiguration.devResults[i].dismiss}`;
    await checkDismissed(i, true);
    if (UI.splitConfiguration.showDev) {
      State.results.push(UI.splitConfiguration.devResults[i]);
    }
  } else if (UI.splitConfiguration.devChecks.has(UI.splitConfiguration.devResults[i].test)) {
    await checkDismissed(i, true);
    if (UI.splitConfiguration.showDev) {
      State.results.push(UI.splitConfiguration.devResults[i]);
    }
  } else {
    await checkDismissed(i, true);
    State.results.push(UI.splitConfiguration.devResults[i]);
  }
};
async function handleSyncOnlyResults() {
  UI.splitConfiguration.devResults.length = 0;
  UI.splitConfiguration.devResults = Array.from(State.results);
  State.results.length = 0;
  await filterAlerts(true).then();
  Object.assign(State.option, UI.splitConfiguration.contentOptions);
  buildElementList(true);
  let everything = false;
  let headings = false;
  let images = false;
  let contrast = false;
  let links = false;
  for (let i = 0; i < UI.splitConfiguration.devResults.length; i++) {
    const result = UI.splitConfiguration.devResults[i];
    if (!result.element) {
      UI.splitConfiguration.devResults.splice(i, 1);
      continue;
    }
    if (!everything) {
      everything = new WeakSet(Elements.Found.Everything);
    }
    if (result.test.indexOf("HEADING") === 0) {
      if (!headings) {
        headings = new WeakSet(Elements.Found.Headings);
        new WeakSet(Elements.Found.ExcludedHeadings);
      }
      await pushResult(i, headings.has(result.element));
      continue;
    }
    if (result.test.indexOf("CONTRAST") > -1) {
      if (!contrast) {
        contrast = new WeakSet(Elements.Found.Contrast);
      }
      await pushResult(i, contrast.has(result.element));
      continue;
    }
    if (result.element.matches("img")) {
      if (!images) {
        images = new WeakSet(Elements.Found.Images);
      }
      await pushResult(i, images.has(result.element));
      continue;
    }
    if (result.element.matches("a")) {
      links = new WeakSet(Elements.Found.Links);
      await pushResult(i, links.has(result.element));
      continue;
    }
    await pushResult(i, everything.has(result.element));
  }
  syncResults(UI.splitConfiguration.devResults);
  Object.assign(State.option, UI.splitConfiguration.devOptions);
}
function countAlerts() {
  UI.dismissedCount = 0;
  UI.errorCount = 0;
  UI.warningCount = 0;
  UI.dismissedCount = 0;
  for (let i = State.results.length - 1; i >= 0; i--) {
    if (State.results[i].dismissalStatus) {
      UI.dismissedCount++;
    } else if (State.results[i].type === "warning") {
      UI.warningCount++;
    } else {
      UI.errorCount++;
    }
    State.results[i].position = "beforebegin";
    if (State.results[i].element.shadowRoot) {
      while (State.results[i].element.parentElement?.shadowRoot) {
        State.results[i].element = location.parentElement;
      }
    }
    if (State.results[i].element.closest(
      'a, button, img, svg, input, iframe, [role="button"], [role="link"]'
    )) {
      State.results[i].element = State.results[i].element.closest('a, button, input, [role="button"], [role="link"]') ?? State.results[i].element;
    } else if (State.results[i].element.matches(
      "p, strong, em, i, u, table, td, th, li, blockquote, h1, h2, h3, h4, h5, h6"
    )) {
      State.results[i].position = "afterbegin";
    }
  }
  UI.totalCount = UI.errorCount + UI.warningCount;
  if (UI.ignoreAll) {
    UI.dismissedCount = UI.totalCount + UI.dismissedCount;
    UI.errorCount = 0;
    UI.warningCount = 0;
    UI.totalCount = 0;
  }
}
const inDismissals = (result, i, splitConfiguration, digest) => {
  if (State.option.currentPage in UI.dismissedAlerts && result.test in UI.dismissedAlerts[State.option.currentPage] && digest in UI.dismissedAlerts[State.option.currentPage][result.test]) {
    if (splitConfiguration) {
      UI.splitConfiguration.devResults[i].dismissalStatus = UI.dismissedAlerts[State.option.currentPage][result.test][digest];
    } else {
      State.results[i].dismissalStatus = UI.dismissedAlerts[State.option.currentPage][result.test][digest];
    }
  }
};
async function checkDismissed(i, splitConfiguration) {
  const result = splitConfiguration ? UI.splitConfiguration.devResults[i] : State.results[i];
  const digested = UI.dismissKeys[result.dismiss];
  if (digested) {
    if (splitConfiguration) {
      UI.splitConfiguration.devResults[i].dismiss = digested;
    } else {
      State.results[i].dismiss = digested;
    }
    inDismissals(result, i, splitConfiguration, digested);
  } else {
    await dismissDigest(State.option.pepper, result.dismiss).then((digest) => {
      UI.dismissKeys[result.dismiss] = digest;
      if (splitConfiguration) {
        UI.splitConfiguration.devResults[i].dismiss = digest;
      } else {
        State.results[i].dismiss = digest;
      }
      inDismissals(result, i, splitConfiguration, digest);
    });
  }
}
async function filterAlerts(splitConfiguration) {
  const results = splitConfiguration ? UI.splitConfiguration.devResults : State.results;
  if (!results.length) {
    return;
  }
  for (let i = results.length - 1; i >= 0; i--) {
    let splice = false;
    const checkIgnored = State.option.ignoreByTest[results[i].test];
    if (checkIgnored && results[i].element.matches(checkIgnored)) {
      splice = true;
    } else if (results[i].test === "READABILITY") {
      UI.readability = results[i];
      if (UI.visualizing) {
        const badge = Constants.Panel.readabilityInfo?.querySelector(".readability-score");
        if (badge) {
          const badgeClass = results[i].difficultyToken === "GOOD" ? "readability-score" : "readability-score ed11y-warning";
          badge.setAttribute("class", badgeClass);
        }
      }
      splice = true;
    } else if (results[i].type === "good") {
      splice = true;
    } else if (!results[i].element) {
      if (Elements.Found.Headings.length > 0) {
        if (splitConfiguration) {
          UI.splitConfiguration.devResults[i].element = Elements.Found.Everything[0];
          UI.splitConfiguration.devResults[i].outsideContentRoots = true;
        } else {
          State.results[i].element = Elements.Found.Everything[0];
        }
      }
    } else if (results[i].test === "TABLES_EMPTY_HEADING" && results[i].element.matches(":first-child")) {
      results[i].type = "warning";
    } else if (!splitConfiguration) {
      await checkDismissed(i, false);
    }
    if (splice) {
      if (splitConfiguration) {
        UI.splitConfiguration.devResults.splice(i, 1);
      } else {
        State.results.splice(i, 1);
      }
    }
  }
}
function computeReadability(textArray, lang2) {
  const readabilityArray = [];
  const punctuation = [".", "?", "!"];
  textArray.forEach((text) => {
    const lastCharacter = text[text.length - 1];
    const sentence = punctuation.includes(lastCharacter) ? text : `${text}.`;
    readabilityArray.push(sentence);
  });
  const pageText = readabilityArray.join(" ").replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
  if (pageText.length === 0) return null;
  if (["en", "es", "fr", "de", "nl", "it", "pt"].includes(lang2)) {
    const numberOfSyllables = (el) => {
      let wordCheck = el;
      wordCheck = wordCheck.toLowerCase().replace(".", "").replace("\n", "");
      if (wordCheck.length <= 3) {
        return 1;
      }
      wordCheck = wordCheck.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
      wordCheck = wordCheck.replace(/^y/, "");
      const syllableString = wordCheck.match(/[aeiouy]{1,2}/g);
      let syllables = 0;
      if (syllableString) {
        syllables = syllableString.length;
      }
      return syllables;
    };
    const wordsRaw = pageText.replace(/[.!?-]+/g, " ").split(" ");
    let words = 0;
    for (let i = 0; i < wordsRaw.length; i++) {
      if (wordsRaw[i].trim() !== "") {
        words += 1;
      }
    }
    const sentenceRaw = pageText.split(/[.!?]+/);
    let sentences = 0;
    for (let i = 0; i < sentenceRaw.length; i++) {
      if (sentenceRaw[i] !== "") {
        sentences += 1;
      }
    }
    let totalSyllables = 0;
    let syllables1 = 0;
    let syllables2 = 0;
    for (let i = 0; i < wordsRaw.length; i++) {
      const word = wordsRaw[i];
      if (word.length > 0) {
        const syllableCount = numberOfSyllables(word);
        if (syllableCount === 1) {
          syllables1 += 1;
        } else if (syllableCount === 2) {
          syllables2 += 1;
        }
        totalSyllables += syllableCount;
      }
    }
    let flesch = false;
    if (lang2 === "en") {
      flesch = 206.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words);
    } else if (lang2 === "fr") {
      flesch = 207 - 1.015 * (words / sentences) - 73.6 * (totalSyllables / words);
    } else if (lang2 === "es") {
      flesch = 206.84 - 1.02 * (words / sentences) - 0.6 * (100 * (totalSyllables / words));
    } else if (lang2 === "de") {
      flesch = 180 - words / sentences - 58.5 * (totalSyllables / words);
    } else if (lang2 === "nl") {
      flesch = 206.84 - 0.77 * (100 * (totalSyllables / words)) - 0.93 * (words / sentences);
    } else if (lang2 === "it") {
      flesch = 217 - 1.3 * (words / sentences) - 0.6 * (100 * (totalSyllables / words));
    } else if (lang2 === "pt") {
      flesch = 248.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words);
    }
    if (flesch > 100) {
      flesch = 100;
    } else if (flesch < 0) {
      flesch = 0;
    }
    const fleschScore = Number(flesch.toFixed(1));
    const avgWordsPerSentence = Number((words / sentences).toFixed(1));
    const complexWords = Math.round(100 * ((words - (syllables1 + syllables2)) / words));
    let difficultyToken;
    if (fleschScore <= 30) {
      difficultyToken = "VERY_DIFFICULT";
    } else if (fleschScore <= 50) {
      difficultyToken = "DIFFICULT";
    } else if (fleschScore <= 60) {
      difficultyToken = "FAIRLY_DIFFICULT";
    } else {
      difficultyToken = "GOOD";
    }
    return {
      score: fleschScore,
      averageWordsPerSentence: avgWordsPerSentence,
      complexWords,
      difficultyToken,
      wordCount: words,
      charCount: pageText.length
    };
  }
  if (["sv", "fi", "da", "no", "nb", "nn"].includes(lang2)) {
    const lixWords = () => pageText.replace(/[-'.]/gi, "").split(/[^a-zA-ZöäåÖÄÅÆæØø0-9]/g).filter(Boolean);
    const splitSentences = () => {
      const splitter = /\?|!|\.|\n/g;
      return pageText.split(splitter).filter(Boolean);
    };
    const wordsArr = lixWords();
    const wordCount = wordsArr.length;
    const longWordsCount = wordsArr.filter((w) => w.length > 6).length;
    const sentenceCount = splitSentences().length || 1;
    const score = Math.round(wordCount / sentenceCount + longWordsCount * 100 / wordCount);
    const avgWordsPerSentence = Number((wordCount / sentenceCount).toFixed(1));
    const complexWords = Math.round(100 * (longWordsCount / wordCount));
    let difficultyToken;
    if (score <= 40) {
      difficultyToken = "GOOD";
    } else if (score <= 50) {
      difficultyToken = "FAIRLY_DIFFICULT";
    } else if (score <= 60) {
      difficultyToken = "DIFFICULT";
    } else {
      difficultyToken = "VERY_DIFFICULT";
    }
    return {
      score,
      averageWordsPerSentence: avgWordsPerSentence,
      complexWords,
      difficultyToken,
      wordCount,
      charCount: pageText.length
    };
  }
  return null;
}
function checkReadability() {
  const computed = computeReadability(Elements.Found.Readability, Constants.Readability.Lang);
  let result;
  if (computed) {
    result = {
      test: "READABILITY",
      difficultyLevel: Lang._(computed.difficultyToken),
      ...computed
    };
    State.results.push(result);
  }
  if (State.option.headless === false) {
    if (computed && result.wordCount > 30) {
      Constants.Panel.readabilityInfo.innerHTML = `${Math.ceil(result.score)} <span class="readability-score">${result.difficultyLevel}</span>`;
      Constants.Panel.readabilityDetails.innerHTML = `<li><strong>${Lang._("AVG_SENTENCE")}</strong> ${Math.ceil(result.averageWordsPerSentence)}</li><li><strong>${Lang._("COMPLEX_WORDS")}</strong> ${result.complexWords}%</li><li><strong>${Lang._("TOTAL_WORDS")}</strong> ${result.wordCount}</li>`;
    } else {
      Constants.Panel.readabilityInfo.innerHTML = `<br>${Lang._("READABILITY_NOT_ENOUGH")}`;
    }
  }
}
const spriteAlts = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 576 512"><path fill="currentColor" d="M160 80l352 0c9 0 16 7 16 16l0 224c0 8.8-7.2 16-16 16l-21 0L388 179c-4-7-12-11-20-11s-16 4-20 11l-52 80-12-17c-5-6-12-10-19-10s-15 4-19 10L176 336 160 336c-9 0-16-7-16-16l0-224c0-9 7-16 16-16zM96 96l0 224c0 35 29 64 64 64l352 0c35 0 64-29 64-64l0-224c0-35-29-64-64-64L160 32c-35 0-64 29-64 64zM48 120c0-13-11-24-24-24S0 107 0 120L0 344c0 75 61 136 136 136l320 0c13 0 24-11 24-24s-11-24-24-24l-320 0c-49 0-88-39-88-88l0-224zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>';
const spriteClose = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 384 512"><path fill="currentColor" d="M343 151c13-13 13-33 0-46s-33-13-45 0L192 211 87 105c-13-13-33-13-45 0s-13 33 0 45L147 256 41 361c-13 13-13 33 0 45s33 13 45 0L192 301 297 407c13 13 33 13 45 0s13-33 0-45L237 256 343 151z"></path></svg>';
const spriteCursor = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 256 512"><path fill="currentColor" d="M0 29C-1 47 12 62 29 64l8 1C71 67 96 95 96 128L96 224l-32 0c-18 0-32 14-32 32s14 32 32 32l32 0 0 96c0 33-26 61-59 64l-8 1C12 450-1 465 0 483s17 31 35 29l8-1c34-3 64-19 85-43c21 24 51 40 85 43l8 1c18 2 33-12 35-29s-12-33-29-35l-8-1C186 445 160 417 160 384l0-96 32 0c18 0 32-14 32-32s-14-32-32-32l-32 0 0-96c0-33 26-61 59-64l8-1c18-2 31-17 29-35S239-1 221 0l-8 1C179 4 149 20 128 44c-21-24-51-40-85-43l-8-1C17-1 2 12 0 29z"/></svg>';
const spriteDismiss = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>';
const spriteUnDismiss = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="-30 0 640 512"><path fill="Currentcolor" d="M288 32c-81 0-146 37-193 81C49 156 17 208 3 244c-3 8-3 17 0 25C17 304 49 356 95 399C142.5 443 207 480 288 480s146-37 193-81c47-44 78-95 93-131c3-8 3-17 0-25c-15-36-46-88-93-131C434 69 369 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35-29 64-64 64c-7 0-14-1-20-3c-6-2-12 2-12 7c.3 7 1 14 3 21c14 51 66 82 118 68s82-66 68-118c-11-42-48-69-89-71c-6-.2-9 6-7 12c2 6 3 13 3 20z"></path></svg>';
const spriteHeadings = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M0 96C0 78 14 64 32 64l384 0c18 0 32 14 32 32s-14 32-32 32L32 128C14 128 0 114 0 96zM64 256c0-18 14-32 32-32l384 0c18 0 32 14 32 32s-14 32-32 32L96 288c-18 0-32-14-32-32zM448 416c0 18-14 32-32 32L32 448c-18 0-32-14-32-32s14-32 32-32l384 0c18 0 32 14 32 32z"></path></svg>';
const spriteReadability = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" aria-hidden="true"><path fill="currentColor" d="M528.3 46.5l-139.8 0c-48.1 0-89.9 33.3-100.4 80.3-10.6-47-52.3-80.3-100.4-80.3L48 46.5C21.5 46.5 0 68 0 94.5L0 340.3c0 26.5 21.5 48 48 48l89.7 0c102.2 0 132.7 24.4 147.3 75 .7 2.8 5.2 2.8 6 0 14.7-50.6 45.2-75 147.3-75l89.7 0c26.5 0 48-21.5 48-48l0-245.7c0-26.4-21.3-47.9-47.7-48.1zM242 311.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zM501.3 311.8c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.8c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.8-.1 0z"/></svg>';
const spriteNext = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" viewBox="0 -15 90 120"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m30 00 50 50-50 50" stroke-width="18"></path></svg>';
const spriteToggleErrors = '<svg class="errors-icon" xmlns="http://www.w3.org/2000/svg" width="10" aria-hidden="true" viewBox="0 0 448 512"><path fill="currentColor" d="M64 32C64 14 50 0 32 0S0 14 0 32L0 64 0 368 0 480c0 18 14 32 32 32s32-14 32-32l0-128 64-16c41-10 85-5 123 13c44.2 22 96 25 142 7l35-13c13-5 21-17 21-30l0-248c0-23-24-38-45-28l-10 5c-46 23-101 23-147 0c-35-18-75-22-114-13L64 48l0-16z"></path></svg>';
const spriteTogglePass = '<svg class="pass-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="-.75 -3.5 10.1699 19.1777"><path fill="currentColor" d="M3.7031,10.5527c-.3633-.6562-.6426-1.1387-.8379-1.4473l-.3105-.4863-.2344-.3574c-.5117-.7969-1.0449-1.4551-1.5996-1.9746.3164-.2617.6113-.3926.8848-.3926.3359,0,.6348.123.8965.3691s.5918.7148.9902,1.4062c.4531-1.4727,1.0293-2.8691,1.7285-4.1895.3867-.7188.7314-1.2021,1.0342-1.4502s.7041-.3721,1.2041-.3721c.2656,0,.5938.041.9844.123-1.0039.8086-1.8066,1.7695-2.4082,2.8828s-1.3789,3.0762-2.332,5.8887Z"/></svg>';
const spriteToggleWarnings = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="close-icon" viewBox="0 0 384 512"><path fill="currentColor" d="M343 151c13-13 13-33 0-46s-33-13-45 0L192 211 87 105c-13-13-33-13-45 0s-13 33 0 45L147 256 41 361c-13 13-13 33 0 45s33 13 45 0L192 301 297 407c13 13 33 13 45 0s13-33 0-45L237 256 343 151z"></path></svg>';
const spriteVisualize = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 10 512 512"><path fill="Currentcolor" d="M152 38c10 9 11 24 2 34l-72 80c-4 5-11 8-17 8s-13-2-18-7L7 113C-2 104-2 88 7 79s25-9 34 0l22 22 55-61c9-10 24-11 34-2zm0 160c10 9 11 24 2 34l-72 80c-4 5-11 8-17 8s-13-2-18-7L7 273c-9-9-9-25 0-34s25-9 35 0l22 22 55-61c9-10 24-11 34-2zM224 96c0-18 14-32 32-32l224 0c18 0 32 14 32 32s-14 32-32 32l-224 0c-18 0-32-14-32-32zm0 160c0-18 14-32 32-32l224 0c18 0 32 14 32 32s-14 32-32 32l-224 0c-18 0-32-14-32-32zM160 416c0-18 14-32 32-32l288 0c18 0 32 14 32 32s-14 32-32 32l-288 0c-18 0-32-14-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>';
const showAltPanel = () => {
  const altList = UI.panel?.querySelector("#ed11y-alt-list");
  if (!altList) {
    return;
  }
  UI.imageAlts = [];
  Elements.Found.Images.forEach((img) => {
    const match = State.results.find((i) => i.element === img);
    if (match) {
      UI.imageAlts.push({
        element: img,
        type: match.type,
        dismiss: match.dismiss,
        developer: match.developer
      });
    } else {
      UI.imageAlts.push({
        element: img,
        type: "pass"
      });
    }
  });
  if (UI.imageAlts.length > 0) {
    altList.innerHTML = "";
    for (let i = 0; i < UI.imageAlts.length; i++) {
      const image = UI.imageAlts[i];
      const altText = computeAriaLabel(image.element) === "noAria" ? escapeHTML(image.element.getAttribute("alt")) : computeAriaLabel(image.element);
      UI.imageAlts[i].altText = altText;
      if (UI.inlineAlerts) {
        const mark = document.createElement("ed11y-element-alt");
        mark.classList.add("ed11y-element");
        mark.dataset.ed11yImg = i.toString();
        mark.setAttribute("id", `ed11y-alt-${i}`);
        mark.setAttribute("tabindex", "-1");
        UI.imageAlts[i].mark = mark;
        image.element.insertAdjacentElement("beforebegin", mark);
      }
      const userText = document.createElement("span");
      if (altText !== "") {
        userText.textContent = altText;
      } else {
        const decorative = document.createElement("span");
        decorative.classList.add("ed11y-decorative");
        decorative.textContent = Lang._("DECORATIVE");
        userText.append(decorative);
      }
      const li = document.createElement("li");
      li.classList.add(`ed11y-${image.type}`);
      const img = document.createElement("img");
      img.setAttribute("src", getBestImageSource(image.element));
      img.setAttribute("alt", "");
      if (UI.inlineAlerts) {
        const a = document.createElement("a");
        a.href = `#ed11y-alt-${i}`;
        a.classList.add("alt-parent");
        li.append(a);
        a.append(img);
        a.append(userText);
      } else {
        li.classList.add("alt-parent");
        li.append(img);
        li.append(userText);
      }
      altList.append(li);
    }
    if (UI.inlineAlerts) {
      alignAlts();
    } else {
      UI.imageAlts.length = 0;
    }
  } else {
    const noImages = document.createElement("p");
    const noItalic = document.createElement("em");
    noItalic.textContent = Lang._("NO_IMAGES");
    noImages.appendChild(noItalic);
    altList.innerHTML = "";
    altList.appendChild(noImages);
  }
};
function visualize() {
  if (!UI.panel) {
    return;
  }
  if (UI.inlineAlerts) {
    const reset2 = getElements(
      "ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight",
      "document",
      []
    );
    reset2?.forEach((el) => {
      el.remove();
    });
  }
  if (UI.visualizing) {
    UI.visualizing = false;
    UI.panel.querySelector("#ed11y-visualize .ed11y-sr-only").textContent = Lang._("PANEL_HEADING");
    UI.panel.querySelector("#ed11y-visualize").setAttribute("data-ed11y-pressed", "false");
    UI.panel.querySelector("#ed11y-visualizers").setAttribute("hidden", "true");
    return;
  }
  UI.visualizing = true;
  UI.panel.querySelector("#ed11y-visualize .ed11y-sr-only").textContent = Lang._("buttonToolsActive");
  UI.panel.querySelector("#ed11y-visualize").setAttribute("data-ed11y-pressed", "true");
  UI.panel.querySelector("#ed11y-visualizers").removeAttribute("hidden");
  showAltPanel();
  showHeadingsPanel();
  if (State.option.readabilityPlugin) {
    showReadability();
  }
}
const showReadability = () => {
  checkReadability();
  for (let i = State.results.length - 1; i >= 0; i--) {
    if (!State.results[i].element) {
      State.results.splice(i, 1);
    }
  }
};
function showHeadingsPanel() {
  const panelOutline = UI.panel?.querySelector("#ed11y-outline");
  if (!panelOutline) {
    return;
  }
  if (State.headingOutline.length) {
    panelOutline.innerHTML = "";
    State.headingOutline.forEach((result, i) => {
      if (UI.inlineAlerts) {
        const mark = document.createElement("ed11y-element-heading-label");
        mark.classList.add("ed11y-element", "ed11y-element-heading");
        mark.dataset.ed11yHeadingOutline = i.toString();
        mark.setAttribute("id", `ed11y-heading-${i}`);
        mark.setAttribute("tabindex", "-1");
        result.element.insertAdjacentElement("afterbegin", mark);
        UI.attachCSS(mark.shadowRoot);
      }
      const leftPad = 10 * result.headingLevel - 10;
      const li = document.createElement("li");
      li.classList.add(`level${result.headingLevel}`);
      li.style.setProperty("margin-left", `${leftPad}px`);
      const levelPrefix = document.createElement("strong");
      levelPrefix.textContent = `H${result.headingLevel}: `;
      const userText = document.createElement("span");
      userText.innerHTML = result.text;
      const link = document.createElement("a");
      if (UI.inlineAlerts) {
        link.setAttribute("href", `#ed11y-heading-${i}`);
        li.append(link);
        link.append(levelPrefix);
        link.append(userText);
      } else {
        li.append(levelPrefix);
        li.append(userText);
      }
      if (result.type) {
        li.classList.add(`ed11y-${result.type}`);
      }
      panelOutline.append(li);
    });
  } else {
    panelOutline.innerHTML = `<p><em>${Lang._("PANEL_NO_HEADINGS")}</em></p>`;
  }
}
function drawResult(result, index) {
  const mark = document.createElement("ed11y-element-result");
  if (UI.bodyStyle !== true) {
    mark.classList.add("ed11y-preload");
  }
  mark.classList.add("ed11y-element");
  mark.setAttribute("id", `ed11y-result-${index}`);
  mark.setAttribute("data-ed11y-result", index);
  mark.setAttribute("data-ed11y-open", "false");
  if (!UI.inlineAlerts) {
    mark.classList.add("ed11y-editable-result");
    UI.panelAttachTo.insertAdjacentElement("beforeend", mark);
  } else {
    result.element.insertAdjacentElement(result.position, mark);
  }
  const shadow = mark.attachShadow({ mode: "open" });
  mark.resultID = mark.dataset.ed11yResult;
  mark.result = State.results[mark.resultID];
  mark.wrapper = document.createElement("div");
  mark.dismissable = mark.result.type !== "error";
  mark.dismissed = !!mark.result.dismissalStatus;
  mark.wrapper.classList.add("ed11y-wrapper", "ed11y-result-wrapper");
  mark.wrapper.style.setProperty("opacity", "0");
  mark.wrapper.classList.add("ed11y-result");
  mark.toggle = document.createElement("button");
  mark.toggle.setAttribute("class", "toggle");
  const label = mark.dismissable ? Lang._("WARNING") : Lang._("ERROR");
  mark.toggle.setAttribute("aria-label", label);
  mark.toggle.setAttribute("aria-expanded", "false");
  mark.toggle.setAttribute("aria-haspopup", "dialog");
  mark.toggle.setAttribute("data-ed11y-result", mark.dataset.ed11yResult);
  mark.toggle.setAttribute("data-ed11y-ready", "false");
  mark.toggle.setAttribute("data-ed11y-race", "false");
  if (!UI.inlineAlerts) {
    mark.toggle.style.setProperty("font-size", "16px");
  }
  if (mark.dismissed) {
    mark.toggle.innerHTML = spriteDismiss;
    mark.toggle.classList.add("dismissed");
  } else if (mark.dismissable) {
    mark.toggle.classList.add("dismissable");
  }
  mark.wrapper.appendChild(mark.toggle);
  mark.toggle.addEventListener("click", mark.toggleClick);
  mark.toggle.addEventListener("focus", mark.handleFocus);
  mark.toggle.addEventListener("mouseover", mark.handleHover);
  mark.tipNeedsBuild = true;
  UI.attachCSS(mark.wrapper);
  shadow.appendChild(mark.wrapper);
  UI.jumpList.unshift(mark);
  State.results[index].toggle = mark;
}
function customRuleset() {
  if (State.option.checks.EMBED_CUSTOM) {
    const matchedEmbeds = getElements(State.option.checks.EMBED_CUSTOM.sources, "root");
    matchedEmbeds.forEach(($el) => {
      State.results.push({
        test: "EMBED_GENERAL",
        element: $el,
        type: "warning",
        inline: false,
        dismiss: prepareDismissal($el.tagName + $el.getAttribute("src")),
        content: Lang.sprintf(State.option.checks.EMBED_GENERAL.content || "EMBED_GENERAL"),
        dismissAll: State.option.checks.EMBED_GENERAL.dismissAll ? "EMBED_GENERAL" : false,
        developer: State.option.checks.EMBED_GENERAL.developer || false
      });
    });
  }
}
function showResults() {
  buildJumpList();
  document.dispatchEvent(new CustomEvent("ed11yPanelOpened"));
  alignButtons();
  if (!UI.inlineAlerts) {
    checkEditableIntersects();
    intersectionObservers();
  }
}
const panelJumpTo = (event) => {
  event.preventDefault();
  pauseObservers();
  UI.toggledFrom = event.target.closest("button");
  if (!UI.showPanel) {
    togglePanel();
    window.setTimeout(() => {
      pauseObservers();
      jumpTo();
      resumeObservers();
    }, 500);
  } else {
    jumpTo();
    resumeObservers();
  }
};
function updatePanel() {
  pauseObservers();
  if (UI.inlineAlerts && document.querySelector("[contenteditable]")) {
    UI.forceFullCheck = true;
    UI.inlineAlerts = false;
  }
  if (UI.incremental) {
    if (UI.forceFullCheck || newIncrementalResults()) {
      UI.forceFullCheck = false;
      resetResults(true);
    } else {
      State.results.push(UI.oldResults);
      if (!UI.alignPending) {
        alignButtons();
        alignPanel();
        UI.alignPending = false;
      }
      UI.running = false;
      resumeObservers();
      return;
    }
  } else {
    if (UI.totalCount > 0) {
      UI.seen[encodeURI(State.option.currentPage)] = UI.totalCount;
      localStorage.setItem("editoria11yResultCount", JSON.stringify(UI.seen));
    } else {
      delete UI.seen[encodeURI(State.option.currentPage)];
    }
  }
  if (!State.option.headless) {
    if (!UI.bodyStyle) {
      paintReady();
    }
    if (UI.onLoad === true) {
      UI.onLoad = false;
      UI.panelElement = document.createElement("ed11y-element-panel");
      UI.panelElement.classList.add("ed11y-preload");
      document.body.appendChild(UI.panelElement);
      UI.panel = UI.panelElement.shadowRoot.getElementById("ed11y-panel");
      UI.attachCSS(UI.panel);
      UI.panelToggle = UI.panel.querySelector("#ed11y-toggle");
      UI.panelToggleTitle = UI.panel.querySelector("#ed11y-toggle .ed11y-sr-only");
      UI.panelCount = UI.panel.querySelector(".toggle-count");
      UI.panelJumpNext = UI.panel.querySelector(".ed11y-jump.next");
      UI.panelJumpNext.addEventListener("click", panelJumpTo);
      UI.panelShowDismissed = UI.panel.querySelector("#ed11y-show-hidden");
      UI.message = UI.panel.querySelector("#ed11y-message");
      if (State.option.readabilityPlugin) {
        const detailsTab = document.createElement("details");
        detailsTab.id = "ed11y-readability-tab";
        detailsTab.innerHTML = `
            <summary>${spriteReadability}<span class="summary-title"></span><span class="close-details">${spriteClose}</span>
            </summary>
            <div class="details">
							<div id="readability-content">
								<p id="readability-info"></p>
								<ul id="readability-details"></ul>
							</div>
						</div>`;
        UI.panel.querySelector("#ed11y-visualizers").appendChild(detailsTab);
        UI.panel.querySelector("#readability-info").appendChild(Constants.Panel.readabilityInfo);
        UI.panel.querySelector("#readability-details").appendChild(Constants.Panel.readabilityDetails);
        UI.panel.querySelector("#ed11y-readability-tab .summary-title").textContent = Lang._("READABILITY");
      }
      window.setTimeout(
        () => {
          UI.panelElement.classList.remove("ed11y-preload");
        },
        0,
        UI.panel
      );
      UI.panel.querySelector("#ed11y-visualize .ed11y-sr-only").textContent = Lang._("PANEL_HEADING");
      UI.panel.querySelector("#ed11y-headings-tab .summary-title").textContent = Lang._("OUTLINE");
      UI.panel.querySelector("#ed11y-alts-tab .summary-title").textContent = Lang._("IMAGES");
      UI.panel.querySelector("#ed11y-headings-tab .details-title").innerHTML = Lang._("panelCheckOutline");
      UI.panel.querySelector("#ed11y-alts-tab .details-title").innerHTML = Lang._("panelCheckAltText");
      UI.panel.querySelector(".jump-next.ed11y-sr-only").textContent = Lang._("buttonFirstContent");
      UI.panel.setAttribute("aria-label", Lang._("CONTAINER_LABEL"));
      if (State.option.reportsURL) {
        const reportLink = document.createElement("a");
        reportLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 61 29 32 64 32l384 0c35 0 64 29 64 64l0 320c0 35-29 64-64 64L64 480c-35 0-64-29-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
        reportLink.setAttribute("id", "ed11y-reports-link");
        reportLink.setAttribute("href", State.option.reportsURL);
        reportLink.setAttribute("aria-label", Lang._("reportsLink"));
        reportLink.querySelector(".ed11y-sr-only").textContent = Lang._("reportsLink");
        UI.panelShowDismissed.insertAdjacentElement("beforebegin", reportLink);
      }
      const escapeWatch = (event) => {
        if (event.keyCode === 27) {
          if (event.target.closest("ed11y-element-panel") && UI.panelToggle.getAttribute("aria-expanded") === "true") {
            UI.panelToggle.focus();
            UI.panelToggle.click();
          } else if (event.target.hasAttribute("data-ed11y-open")) {
            if (UI.tipOpen) {
              UI.toggledFrom?.focus();
              UI.openTip.button.shadowRoot.querySelector("button").click();
            }
          }
        }
      };
      document.addEventListener("keyup", (event) => {
        escapeWatch(event);
      });
      if (UI.ignoreAll || !UI.inlineAlerts && UI.totalCount > 75) {
        UI.showPanel = false;
      } else if (State.option.alertMode === "active" || !State.option.userPrefersShut || UI.showDismissed) {
        UI.showPanel = true;
      } else if (UI.totalCount > 0 && !UI.ignoreAll && (State.option.alertMode === "assertive" || State.option.alertMode === "polite" && UI.seen[encodeURI(State.option.currentPage)] !== UI.totalCount)) {
        UI.showPanel = true;
      }
    } else if (!UI.inlineAlerts) {
      UI.oldResultString = `${UI.errorCount} ${UI.warningCount}`;
      State.results.forEach((result) => {
        UI.oldResultString += result.test + result.element?.outerHTML;
      });
    }
    if (!UI.showPanel) {
      reset();
    } else {
      UI.showPanel = true;
      UI.panel.classList.remove("ed11y-shut");
      UI.panel.classList.add("ed11y-active");
      const preferredDismissHide = UI.dismissedCount > 1 ? Lang.sprintf("buttonHideHiddenAlerts", UI.dismissedCount).textContent : Lang._("buttonHideHiddenAlert");
      if (UI.dismissedCount === 0) {
        UI.panelShowDismissed.setAttribute("hidden", "");
        UI.panelShowDismissed.setAttribute("data-ed11y-pressed", "false");
        UI.showDismissed = false;
      } else if (UI.dismissedCount === 1) {
        const show = UI.english ? Lang._("buttonShowHiddenAlert") : Lang.sprintf("PANEL_DISMISS_BUTTON", "1").textContent;
        UI.panelShowDismissed.querySelector(".ed11y-sr-only").textContent = UI.showDismissed ? preferredDismissHide : show;
        UI.panelShowDismissed.dataset.ed11yPressed = `${UI.showDismissed}`;
        if (!UI.english) {
          UI.panelShowDismissed.ariaPressed = UI.showDismissed;
        }
        UI.panelShowDismissed.removeAttribute("hidden");
      } else {
        UI.panelShowDismissed.querySelector(".ed11y-sr-only").textContent = UI.showDismissed ? preferredDismissHide : Lang.sprintf("PANEL_DISMISS_BUTTON", UI.dismissedCount).textContent;
        UI.panelShowDismissed.dataset.ed11yPressed = `${UI.showDismissed}`;
        if (!UI.english) {
          UI.panelShowDismissed.ariaPressed = UI.showDismissed;
        }
        UI.panelShowDismissed.removeAttribute("hidden");
      }
      window.setTimeout(() => {
        if (!UI.ignoreAll) {
          requestAnimationFrame(() => showResults());
        }
      }, 0);
    }
    panelLabel();
    if (UI.totalCount > 0 || UI.showDismissed && UI.dismissedCount > 0) {
      UI.panelJumpNext.removeAttribute("hidden");
      if (UI.errorCount > 0) {
        UI.panel.classList.remove("ed11y-warnings", "ed11y-pass");
        UI.panel.classList.add("ed11y-errors");
        document.documentElement.style.setProperty("--ed11y-activeBackground", UI.theme.alert);
        document.documentElement.style.setProperty("--ed11y-activeColor", "#fff");
        document.documentElement.style.setProperty("--ed11y-activeBorder", "#fff7");
        document.documentElement.style.setProperty("--ed11y-activePanelBorder", "#def");
      } else if (UI.warningCount > 0) {
        UI.panel.classList.remove("ed11y-errors", "ed11y-pass");
        UI.panel.classList.add("ed11y-warnings");
        document.documentElement.style.setProperty("--ed11y-activeBackground", UI.theme.warning);
        document.documentElement.style.setProperty("--ed11y-activeColor", "#111");
        document.documentElement.style.setProperty("--ed11y-activeBorder", "#947605");
        document.documentElement.style.setProperty("--ed11y-activePanelBorder", "#947605");
      } else {
        UI.panel.classList.remove("ed11y-errors", "ed11y-warnings");
        UI.panel.classList.add("ed11y-pass");
        document.documentElement.style.setProperty("--ed11y-activeBackground", UI.theme.panelBar);
        document.documentElement.style.setProperty("--ed11y-activeColor", UI.theme.panelBarText);
        document.documentElement.style.setProperty(
          "--ed11y-activeBorder",
          `${UI.theme.panelBarText}44`
        );
        document.documentElement.style.setProperty(
          "--ed11y-activePanelBorder",
          `${UI.theme.panelBarText}88`
        );
      }
      if (UI.dismissedCount > 0 && UI.totalCount === 0) {
        UI.panelCount.textContent = UI.dismissedCount;
      } else {
        UI.panelCount.textContent = UI.totalCount > 99 ? "99+" : UI.totalCount;
      }
    } else {
      UI.panelJumpNext.setAttribute("hidden", "");
      document.documentElement.style.setProperty("--ed11y-activeBackground", UI.theme.panelBar);
      document.documentElement.style.setProperty("--ed11y-activeColor", UI.theme.panelBarText);
      document.documentElement.style.setProperty(
        "--ed11y-activeBorder",
        `${UI.theme.panelBarText}44`
      );
      document.documentElement.style.setProperty(
        "--ed11y-activePanelBorder",
        `${UI.theme.panelBarText}88`
      );
      UI.panelCount.style.display = "display: none;";
      UI.panel.classList.remove("ed11y-warnings", "ed11y-errors");
      UI.panel.classList.add("ed11y-pass");
      if (UI.dismissedCount > 0) {
        UI.panelCount.textContent = "i";
        if (!UI.showPanel) {
          UI.panelToggleTitle.textContent = UI.dismissedCount > 1 ? Lang.sprintf("PANEL_DISMISS_BUTTON", UI.dismissedCount).textContent : Lang._("buttonShowHiddenAlert");
        }
      }
    }
    UI.panelToggle.classList.remove("disabled");
    UI.panelToggle.removeAttribute("aria-disabled");
    alignPanel();
    UI.panel.classList.remove("ed11y-preload");
  }
  resumeObservers();
  UI.running = false;
}
function buildJumpList() {
  UI.jumpList = [];
  pauseObservers();
  const toSplice = [];
  for (let i = 0; i < State.results.length; i++) {
    if (!State.results[i].element) {
      toSplice.push(i);
      continue;
    }
    let top = State.results[i].element.getBoundingClientRect().top;
    if (!top) {
      const visibleParent = firstVisibleParent(State.results[i].element);
      if (visibleParent) {
        top = visibleParent.getBoundingClientRect().top;
      }
    }
    top = top + window.scrollY;
    if (State.option.fixedRoots) {
      const root = State.results[i].element.closest("[data-ed11y-root]");
      State.results[i].fixedRoot = root ? root.dataset.ed11yRoot : false;
    }
    State.results[i].scrollableParent = closestScrollable(State.results[i].element);
    if (State.results[i].scrollableParent) {
      top = top * 1e-6;
    }
    State.results[i].sortPos = top;
  }
  toSplice.forEach((i) => {
    State.results.splice(i, 1);
  });
  State.results.sort((a, b) => b.sortPos - a.sortPos);
  State.results?.forEach((result, i) => {
    if (result.element && (!result.dismissalStatus || UI.showDismissed)) {
      drawResult(result, i);
    }
  });
  UI.jumpList.forEach((el, i) => {
    el.dataset.ed11yJumpPosition = `${i}`;
    const newLabel = `${Lang._("ALERT_TEXT")} ${i + 1} / ${UI.jumpList.length - 1}, ${el.shadowRoot.querySelector(".toggle").getAttribute("aria-label")}`;
    el.shadowRoot.querySelector(".toggle").setAttribute("aria-label", newLabel);
  });
  const tipsPainted = new CustomEvent("ed11yResultsPainted");
  document.dispatchEvent(tipsPainted);
  resumeObservers();
}
function dismissOne(dismissalType, test, dismissalKey) {
  if (UI.dismissKeys[dismissalKey]) {
    dismissalKey = UI.dismissKeys[dismissalKey];
  }
  if (dismissalType === "reset") {
    delete UI.dismissedAlerts[State.option.currentPage][test][dismissalKey];
    if (Object.keys(UI.dismissedAlerts[State.option.currentPage][test]).length === 0) {
      delete UI.dismissedAlerts[State.option.currentPage][test];
    }
    if (Object.keys(UI.dismissedAlerts[State.option.currentPage]).length === 0) {
      delete UI.dismissedAlerts[State.option.currentPage];
    }
  } else {
    const dismissal = {};
    dismissal[dismissalKey] = dismissalType;
    if (typeof UI.dismissedAlerts[State.option.currentPage] === "undefined") {
      const store2 = {};
      store2[test] = dismissal;
      UI.dismissedAlerts[State.option.currentPage] = store2;
    } else if (typeof UI.dismissedAlerts[State.option.currentPage][test] === "undefined") {
      UI.dismissedAlerts[State.option.currentPage][test] = dismissal;
    } else {
      UI.dismissedAlerts[State.option.currentPage][test][dismissalKey] = dismissalType;
    }
    UI.panelShowDismissed.removeAttribute("hidden");
  }
  if (State.option.syncedDismissals === false) {
    localStorage.setItem("ed11ydismissed", JSON.stringify(UI.dismissedAlerts));
  }
  const dismissalDetail = {
    dismissPage: State.option.currentPage,
    dismissTest: test,
    dismissKey: dismissalKey,
    dismissAction: dismissalType
  };
  const ed11yDismissalUpdate = new CustomEvent("ed11yDismissalUpdate", { detail: dismissalDetail });
  window.setTimeout(() => {
    document.dispatchEvent(ed11yDismissalUpdate);
  }, 100);
}
function editableHighlighter(resultID, show, firstVisible) {
  if (!show) {
    UI.editableHighlight[resultID]?.highlight.style.setProperty("opacity", "0");
    return;
  }
  const result = State.results[resultID];
  if (!result || !firstVisible && !result.element) {
    return;
  }
  let el = UI.editableHighlight[resultID]?.highlight;
  if (!el) {
    el = document.createElement("ed11y-element-highlight");
    el.classList.add("ed11y-element");
    UI.editableHighlight[resultID] = { highlight: el, resultID };
    el.style.setProperty("position", "absolute");
    el.style.setProperty("pointer-events", "none");
    UI.panelAttachTo.appendChild(el);
  } else if (!el.parentElement) {
    document.body.appendChild(el);
  }
  UI.editableHighlight[resultID].target = firstVisible ? firstVisible : result.element;
  const zIndex = result.dismissalStatus ? "calc(var(--ed11y-buttonZIndex, 9999) - 2)" : "calc(var(--ed11y-buttonZIndex, 9999) - 1)";
  el.style.setProperty("z-index", zIndex);
  const outline = result.type === "warning" ? "0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-warning, #fad859), 0 0 0 3px var(--ed11y-warning, #fad859), 0 0 0 4px var(--ed11y-primary)" : "0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-alert, #b80519), 0 0 0 3px var(--ed11y-alert, #b80519), 0 0 1px 3px";
  el.style.setProperty("box-shadow", outline);
  el.style.setProperty("border-radius", "3px");
  el.style.setProperty("top", "0");
  el.style.setProperty("left", "0");
  alignHighlights();
  el.style.setProperty("opacity", "1");
}
function transferFocus() {
  if (!UI.tipOpen) {
    return;
  }
  const id = UI.openTip.tip.dataset.ed11yResult;
  const target = State.results[id].element;
  const editable = target.closest("[contenteditable]");
  if (!editable && !target.closest("textarea, input")) {
    if (target.closest("a, button")) {
      UI.toggledFrom = target.closest("a, button");
    } else if (target.getAttribute("tabindex") !== null) {
      UI.toggledFrom = target;
    } else {
      target.setAttribute("tabindex", "0");
      UI.toggledFrom = target;
    }
    UI.openTip.tip.shadowRoot.querySelector(".close").click();
  } else {
    UI.toggledFrom = false;
    if (target.getAttribute("contenteditable") === "true") {
      UI.toggledFrom = target;
    } else if (target.closest('p[contenteditable="true"]')) {
      UI.toggledFrom = target.closest('p[contenteditable="true"]');
    } else {
      UI.toggledFrom = false;
    }
    UI.openTip.tip.shadowRoot.querySelector(".close").click();
    if (!UI.toggledFrom && editable) {
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
function paintReady() {
  if (!State.option.cssUrls) {
    const cssLink = document.querySelector(
      'link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]'
    );
    if (cssLink) {
      State.option.cssUrls = [cssLink.getAttribute("href")];
    } else {
      console.warn("Editoria11y CSS file parameter is missing; attempting to load from CDN.");
      State.option.cssUrls = [
        `https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${UI.version}/dist/editoria11y.min.css`
      ];
    }
  }
  for (const [key, value] of Object.entries(UI.theme)) {
    document.documentElement.style.setProperty(`--ed11y-${key}`, `${value}`);
  }
  if (document.querySelector("body")) {
    UI.attachCSS(document.querySelector("body"));
  }
  UI.roots.forEach((root) => {
    if (State.option.shadowComponents) {
      root.querySelectorAll(State.option.shadowComponents)?.forEach((shadowHost) => {
        if (shadowHost.shadowRoot) {
          UI.attachCSS(shadowHost.shadowRoot);
        }
      });
    }
  });
  UI.bodyStyle = "drawing";
  window.setTimeout(() => {
    UI.bodyStyle = true;
  }, 1e3);
}
function alertOnInvisibleTip(button, target) {
  let delay = 100;
  if (State.option.hiddenHandlers.length > 0 && !!target.closest(State.option.hiddenHandlers)) {
    delay = 333;
    document.dispatchEvent(
      new CustomEvent("ed11yShowHidden", {
        detail: {
          result: button.getAttribute("data-ed11y-result"),
          viaJump: UI.viaJump
        }
      })
    );
  }
  const details = target.closest("details");
  if (details && !details.open) {
    details.open = true;
    delay = 333;
  }
  window.setTimeout(
    (button2, target2) => {
      UI.message.textContent = "";
      let firstVisible = false;
      let alertMessage;
      if (State.option.checkVisible && !visible(target2)) {
        button2.dataset.ed11yHiddenResult = "true";
        firstVisible = firstVisibleParent(target2);
        alertMessage = Lang._("NOT_VISIBLE");
      } else if (target2.closest('[aria-hidden="true"]')) {
        firstVisible = target2.closest('[aria-hidden="true"]');
        firstVisible = firstVisible.closest(':not([aria-hidden="true"])');
        alertMessage = Lang._("NOT_VISIBLE");
      }
      if (firstVisible) {
        const tipAlert = UI.openTip.tip?.shadowRoot.querySelector(".invisible-alert");
        tipAlert.textContent = alertMessage;
      }
      if (UI.viaJump) {
        const scrollPin = window.innerHeight > 900 || window.innerWidth > 800 && window.innerHeight > 600 ? "center" : "start";
        let scrollTarget = UI.inlineAlerts ? button2 : target2;
        if (button2.dataset.ed11yHiddenResult || !visible(scrollTarget)) {
          scrollTarget = firstVisibleParent(target2);
        }
        if (scrollTarget && typeof scrollTarget.scrollIntoView === "function") {
          scrollTarget.scrollIntoView({ block: scrollPin, behavior: "instant" });
        } else {
          hardRefresh(true);
          return false;
        }
      }
      if (!UI.inlineAlerts) {
        editableHighlighter(button2.dataset.ed11yResult, true, firstVisible);
      } else {
        if (firstVisible) {
          firstVisible.classList.add("ed11y-hidden-highlight");
        }
      }
      const activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
      if (!activeTip) {
        button2.setAttribute("data-ed11y-action", "open");
        if (UI.viaJump) {
          window.setTimeout(() => {
            const activeTip2 = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
            if (UI.viaJump) {
              activeTip2?.shadowRoot.querySelector(".title").focus();
            }
          }, 100);
        }
      } else {
        if (UI.viaJump) {
          window.setTimeout(
            () => {
              activeTip?.shadowRoot.querySelector(".title").focus();
            },
            100,
            activeTip
          );
        }
      }
      UI.viaJump = false;
    },
    delay,
    button,
    target
  );
}
function jumpTo(next = true) {
  if (!UI.showPanel) {
    return false;
  }
  UI.viaJump = true;
  const goMax = UI.jumpList.length - 1;
  let goNum = next ? +UI.openJumpPosition + 1 : +UI.openJumpPosition - 1;
  if (goNum < 0) {
    goNum = goMax;
    UI.nextText = `${Lang._("SKIP_TO_ISSUE")} 1`;
  } else if (goNum > goMax) {
    goNum = 0;
    UI.nextText = `${Lang._("SKIP_TO_ISSUE")} ${goNum + 1}`;
  } else {
    let showNum = Number.isNaN(goNum) ? 2 : goNum + 2;
    if (showNum > goMax + 1) {
      showNum = 1;
    }
    UI.nextText = `${Lang._("SKIP_TO_ISSUE")} ${showNum}`;
  }
  UI.openJumpPosition = goNum;
  window.setTimeout(() => {
    UI.panelJumpNext.querySelector(".ed11y-sr-only").textContent = UI.nextText;
  }, 250);
  resetClass(["ed11y-hidden-highlight"]);
  if (UI.jumpList.length === 0) {
    buildJumpList();
  }
  let goto = UI.jumpList[goNum];
  if (!goto) {
    goto = UI.jumpList[0];
    UI.openJumpPosition = 0;
  }
  const result = goto.getAttribute("data-ed11y-result");
  const gotoResult = State.results[result];
  const target = gotoResult.element;
  const scrollPin = window.innerHeight > 900 || window.innerWidth > 800 && window.innerHeight > 600 ? "center" : "start";
  let scrollTarget = UI.inlineAlerts ? goto : target;
  if (goto.dataset.ed11yHiddenResult || !visible(scrollTarget)) {
    scrollTarget = firstVisibleParent(target);
  }
  if (scrollTarget && typeof scrollTarget.scrollIntoView === "function") {
    scrollTarget.scrollIntoView({ block: scrollPin, behavior: "instant" });
  } else {
    hardRefresh(true);
    return false;
  }
  goto.setAttribute("data-ed11y-action", "open");
  UI.scrollPending = 2;
  updateTipLocations();
}
const incrementalAlign = lagBounce(() => {
  if (!UI.running && !UI.alignPending) {
    UI.scrollPending++;
    updateTipLocations();
    UI.alignPending = false;
  } else {
    incrementalAlign();
  }
}, 10);
function alignTip(button, toolTip, recheck = 0, reveal = false) {
  if (!toolTip) {
    return;
  }
  const arrow = toolTip.shadowRoot.querySelector(".arrow");
  const tip = arrow.nextElementSibling;
  const loopCount = recheck - 1;
  if (recheck > 0) {
    window.setTimeout(
      () => {
        requestAnimationFrame(() => alignTip(button, toolTip, loopCount, reveal));
      },
      200 / loopCount,
      button,
      toolTip,
      loopCount,
      reveal
    );
  }
  if (reveal) {
    window.setTimeout(
      () => {
        toolTip.style.setProperty("opacity", "1");
      },
      140,
      toolTip,
      tip
    );
  }
  const mark = button.getRootNode().host;
  const resultNum = button.dataset.ed11yResult;
  const result = State.results[resultNum];
  const scrollTop = window.scrollY;
  const leftAdd = UI.inlineAlerts ? window.scrollX : 0;
  let buttonOffset = button.getBoundingClientRect();
  let buttonSize = buttonOffset.width;
  let buttonLeft = buttonOffset.left + leftAdd;
  let buttonTop = buttonOffset.top + scrollTop;
  let containTop = scrollTop;
  let containLeft = 0;
  let containWidth = window.innerWidth;
  let containBottom = window.innerHeight + scrollTop;
  let absoluteBottom = containBottom;
  if (!UI.inlineAlerts && result.scrollableParent) {
    const bounds = result.scrollableParent.getBoundingClientRect();
    if (bounds.width > 0) {
      containLeft = Math.max(0, bounds.left);
      containWidth = Math.min(containWidth, bounds.width - 30);
      containBottom = bounds.bottom + scrollTop;
      containTop = bounds.top + scrollTop;
      absoluteBottom = bounds.top + result.scrollableParent.scrollHeight;
    }
  } else if (mark.dataset.ed11yHiddenResult === "true" || !(visible(mark) || buttonOffset.top === 0 && buttonOffset.left === 0)) {
    const theFirstVisibleParent = firstVisibleParent(mark.result.element);
    if (theFirstVisibleParent) {
      buttonOffset = theFirstVisibleParent.getBoundingClientRect();
      buttonLeft = buttonOffset.left;
      buttonTop = buttonOffset.top;
    } else {
      tip.style.setProperty("max-width", "none");
    }
    buttonSize = window.innerWidth > 800 ? 38 : 33;
  }
  document.documentElement.style.setProperty("--ed11y-buttonWidth", `${buttonSize}px`);
  tip.style.setProperty("max-width", `min(${containWidth > 280 ? containWidth : 280}px, 90vw)`);
  const containRight = Math.min(window.innerWidth, containLeft + containWidth);
  toolTip.style.setProperty("top", `${buttonOffset.top + scrollTop}px`);
  toolTip.style.setProperty("left", `${buttonOffset.left + leftAdd}px`);
  const tipWidth = tip.offsetWidth;
  const tipHeight = tip.offsetHeight;
  let direction = "under";
  if (buttonTop === 0 && buttonLeft === 0) {
    direction = "whompWhomp";
  } else if (buttonTop + tipHeight + scrollTop + buttonSize + 22 > containBottom) {
    if (containRight > buttonSize + tipWidth + buttonLeft + 30 && containTop + tipHeight + 30 < containBottom) {
      direction = "right";
    } else if (buttonTop - tipHeight - 15 > containTop) {
      direction = "above";
    } else if (containLeft < buttonLeft - (buttonSize + tipWidth + 30) && containTop + tipHeight + 30 < containBottom) {
      direction = "left";
    } else if (buttonTop + tipHeight + buttonSize > absoluteBottom) {
      direction = "above";
    }
  }
  arrow.dataset.direction = direction;
  let nudgeX = 0;
  let nudgeY = 0;
  const align = (container, alignTo, size, direction2) => {
    const over = container - (alignTo + size + buttonSize);
    if (over < 0) {
      if (direction2 === "horizontal" && alignTo + over < 0) {
        return Math.max(0 - alignTo, 4 - size);
      }
      return Math.max(over, buttonSize + 10 - size);
    }
    return 0;
  };
  switch (direction) {
    case "under":
      nudgeX = align(containRight, buttonLeft, tipWidth, "horizontal");
      arrow.style.setProperty("top", `${buttonSize}px`);
      arrow.style.setProperty("right", "auto");
      arrow.style.setProperty("bottom", "auto");
      arrow.style.setProperty("left", `${buttonSize / 2 - 10}px`);
      tip.style.setProperty("top", `${buttonSize + 10}px`);
      tip.style.setProperty("right", "auto");
      tip.style.setProperty("bottom", "auto");
      tip.style.setProperty("left", "-4px");
      break;
    case "above":
      nudgeX = align(containRight, buttonLeft, tipWidth, "horizontal");
      arrow.style.setProperty("top", "auto");
      arrow.style.setProperty("right", "auto");
      arrow.style.setProperty("bottom", "2px");
      arrow.style.setProperty("left", `${buttonSize / 2 - 10}px`);
      tip.style.setProperty("top", "auto");
      tip.style.setProperty("right", "auto");
      tip.style.setProperty("bottom", "12px");
      tip.style.setProperty("left", "-4px");
      break;
    case "right":
      nudgeY = align(containBottom, buttonTop, tipHeight, "vertical");
      arrow.style.setProperty("top", `${buttonSize / 2 - 10}px`);
      arrow.style.setProperty("right", "auto");
      arrow.style.setProperty("bottom", "auto");
      arrow.style.setProperty("left", `${buttonSize}px`);
      tip.style.setProperty("top", "-4px");
      tip.style.setProperty("right", "auto");
      tip.style.setProperty("bottom", "auto");
      tip.style.setProperty("left", `${buttonSize + 10}px`);
      break;
    case "left":
      nudgeY = align(containBottom, buttonTop, tipHeight, "vertical");
      arrow.style.setProperty("top", `${buttonSize / 2 - 10}px`);
      arrow.style.setProperty("right", "0");
      arrow.style.setProperty("bottom", "auto");
      arrow.style.setProperty("left", "auto");
      tip.style.setProperty("top", "-4px");
      tip.style.setProperty("right", "10px");
      tip.style.setProperty("bottom", "auto");
      tip.style.setProperty("left", "auto");
      break;
    case "whompWhomp":
      nudgeY = align(containBottom, buttonTop, tipHeight, "horizontal");
      arrow.style.setProperty("top", "0");
      arrow.style.setProperty("right", "0");
      arrow.style.setProperty("bottom", "0");
      arrow.style.setProperty("left", "0");
      tip.style.setProperty("top", `calc(50vh - ${tipWidth / 2}px)`);
      tip.style.setProperty("right", "auto");
      tip.style.setProperty("bottom", "auto");
      tip.style.setProperty("left", `calc(50vh - ${tipHeight / 2}px)`);
      break;
  }
  if (nudgeX || nudgeY) {
    tip.style.setProperty("transform", `translate(${nudgeX}px, ${nudgeY}px)`);
  } else {
    tip.style.setProperty("transform", "none");
  }
  alignHighlights();
}
function updateTipLocations() {
  if (!UI.scrollTicking && UI.scrollPending > 0 && !UI.running && UI.jumpList && UI.showPanel) {
    UI.scrollTicking = true;
    alignButtons();
    if (UI.tipOpen) {
      alignTip(UI.openTip.button.shadowRoot.querySelector("button"), UI.openTip.tip);
    }
    UI.scrollPending--;
  }
  UI.scrollTicking = false;
  if (UI.scrollPending > 0) {
    window.setTimeout(() => {
      requestAnimationFrame(() => updateTipLocations());
    }, 0);
  }
}
function alignHighlights() {
  if (State.option.fixedRoots && Object.keys(UI.editableHighlight).length > 0) {
    UI.positionedFrames.length = 0;
    State.option.fixedRoots.forEach((root) => {
      if (root.framePositioner) {
        UI.positionedFrames.push(root.framePositioner.getBoundingClientRect());
      }
    });
  }
  Object.values(UI.editableHighlight).every((el) => {
    if (!State.results[el.resultID]) {
      UI.interaction = true;
      UI.forceFullCheck = true;
      UI.editableHighlight = [];
      incrementalCheckDebounce(true);
      return false;
    }
    if (!Object.keys(UI.openTip.button).length) {
      return false;
    }
    if (UI.openTip.button.dataset.ed11yResult !== el.resultID) {
      return true;
    }
    const framePositioner = State.results[el.resultID].fixedRoot && UI.positionedFrames[State.results[el.resultID].fixedRoot] ? UI.positionedFrames[State.results[el.resultID].fixedRoot] : { top: 0, left: 0 };
    let targetOffset = el.target.getBoundingClientRect();
    if (!visible(el.target)) {
      const theVisibleParent = firstVisibleParent(el.target);
      targetOffset = theVisibleParent ? theVisibleParent.getBoundingClientRect() : targetOffset;
    }
    el.highlight.style.setProperty("width", `${targetOffset.width + 6}px`);
    el.highlight.style.setProperty(
      "top",
      `${targetOffset.top + framePositioner.top + window.scrollY - 3}px`
    );
    el.highlight.style.setProperty("left", `${targetOffset.left + framePositioner.left - 3}px`);
    el.highlight.style.setProperty("height", `${targetOffset.height + 6}px`);
    return true;
  });
}
const slowIncremental = lagBounce(() => {
  UI.interaction = true;
  incrementalCheckDebounce();
}, 500);
function windowResize() {
  if (UI.panel?.classList.contains("ed11y-active") === true) {
    alignAlts();
    alignButtons();
  }
  if (UI.tipOpen) {
    alignTip(UI.openTip.button.shadowRoot.querySelector("button"), UI.openTip.tip);
  }
  alignPanel();
}
const scrollWatch = (container) => {
  container.addEventListener(
    "scroll",
    () => {
      if (!UI.inlineAlerts) {
        UI.scrollPending = UI.scrollPending < 2 ? UI.scrollPending + 1 : UI.scrollPending;
        requestAnimationFrame(() => updateTipLocations());
      } else if (UI.tipOpen) {
        alignTip(UI.openTip.button.shadowRoot.querySelector("button"), UI.openTip.tip);
      }
    },
    {
      passive: true
    }
  );
};
function intersectionObservers() {
  Elements.Found.editable?.forEach((editable) => {
    scrollWatch(editable);
  });
  scrollWatch(document);
  document.addEventListener(
    "selectionchange",
    () => {
      if (!UI.running) {
        selectionChanged();
      }
    },
    {
      passive: true
    }
  );
}
const selectionChanged = lagBounce(() => {
  if (rangeChange()) {
    updateTipLocations();
    checkEditableIntersects();
  }
}, 100);
function rangeChange(anchorNode) {
  let anchor = window.getSelection()?.anchorNode;
  const expandable = anchor?.parentNode && typeof anchor.parentNode === "object" && typeof anchor.parentNode.matches === "function";
  if (!anchor || expandable && (Array.prototype.includes.call(UI.roots, anchor.parentNode) || anchor.parentNode.matches('div[contenteditable="true"]'))) {
    UI.activeRange = false;
    return false;
  }
  if (expandable) {
    const textParent = anchor.parentNode.closest("p, td, th, li, h2, h3, h4, h5, h6");
    if (textParent) {
      anchor = textParent;
    }
  }
  const range = document.createRange();
  if (typeof anchor === "object") {
    range.setStartBefore(anchor);
    range.setEndAfter(anchor);
  }
  if (typeof range !== "object" || typeof range.getBoundingClientRect !== "function") {
    if (UI.activeRange) {
      UI.activeRange = false;
      return true;
    } else {
      return false;
    }
  } else {
    const sameRange = UI.activeRange && range.startContainer === UI.activeRange.startContainer && range.startOffset === UI.activeRange.startOffset;
    UI.activeRange = range;
    return !sameRange;
  }
}
function startObserver(root) {
  if (typeof root.closest === "function") {
    if (root.closest("[data-editoria11y-observer]")) {
      return;
    } else {
      root.dataset.editoria11yObserver = "true";
    }
  } else {
    if (typeof root.host !== "function" || root.host.dataset.editoria11yObserver !== void 0) {
      return;
    } else {
      root.host.dataset.editoria11yObserver = "true";
    }
  }
  const config = { childList: true, subtree: true, characterData: true };
  const logNode = (node) => {
    if (!node || node.nodeType !== 1 || !node.isConnected || node.closest("script, link, head, .ed11y-wrapper, .ed11y-style, .ed11y-element")) {
      return 0;
    }
    if (UI.inlineAlerts) {
      return 1;
    }
    if (!node.matches("[contenteditable] *")) {
      return 0;
    }
    if (UI.inlineAlerts) {
      return true;
    }
    const searchList = "table, h1, h2, h3, h4, h5, h6, blockquote";
    if (!UI.inlineAlerts && !node.matches(node.matches(searchList)) && node.matches("[contenteditable] *")) {
      if (node.matches("table *")) {
        node = node.closest("table");
      } else if (!node.matches(searchList)) {
        node = node.querySelector(searchList);
      }
    }
    if (node?.matches(searchList)) {
      UI.recentlyAddedNodes.set(node, Date.now());
      incrementalAlign();
      return 0;
    }
    return 1;
  };
  const callback = (mutationList) => {
    let align = 0;
    for (const mutation of mutationList) {
      if (mutation.type === "characterData" && mutation.target.parentElement && mutation.target.parentElement.matches("[contenteditable] *, [contenteditable]")) {
        incrementalAlign();
        slowIncremental();
        return;
      } else if (mutation.type === "childList") {
        if (mutation.removedNodes.length > 0) {
          align += 1;
        } else if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            align += logNode(node);
          });
        }
      }
    }
    if (!align) {
      return;
    }
    window.setTimeout(() => {
      incrementalAlign();
      UI.alignPending = false;
    }, 0);
    window.setTimeout(() => {
      incrementalCheckDebounce();
    }, 0);
  };
  const observer = new MutationObserver(callback);
  observer.observe(root, config);
  UI.watching.push({
    observer,
    root,
    config
  });
  document.addEventListener(
    "readystatechange",
    () => {
      window.setTimeout(() => {
        UI.scrollPending++;
        updateTipLocations();
      }, 100);
    },
    {
      passive: true
    }
  );
  document.addEventListener(
    "paste",
    () => {
      UI.scrollPending++;
      updateTipLocations();
      window.setTimeout(() => {
        UI.forceFullCheck = true;
        incrementalCheckDebounce();
      }, 100);
    },
    {
      passive: true
    }
  );
  window.setTimeout(() => {
    UI.scrollPending++;
    updateTipLocations();
  }, 1e3);
}
const enqueueTests = (queue) => {
  const test = queue.pop();
  UI.testsRemaining--;
  try {
    switch (test) {
      case "group1":
        checkHeaders();
        checkImages();
        checkEmbeddedContent();
        customRuleset();
        checkQA();
        break;
      case "group2":
        checkLinkText();
        break;
      case "checkLabels":
        checkLabels();
        break;
      case "checkContrast":
        checkContrast();
        break;
      case "checkDeveloper":
        checkDeveloper();
        break;
    }
  } catch (error) {
    showError(error);
  }
  if (queue.length > 0) {
    if (UI.browserSpeed < 100 || State.option.headless) {
      enqueueTests(queue);
    } else {
      window.setTimeout(
        (queue2) => {
          enqueueTests(queue2);
        },
        0,
        queue
      );
    }
  } else {
    continueCheck().then();
  }
};
function removeCustomTest() {
  console.error(
    "Editoria11y has disabled a custom test that is not returning results within 1000ms."
  );
  State.option.customTests--;
  UI.customTestsRemaining = 0;
  continueCheck(true).then();
  if (State.option.customTests === 0) {
    document.removeEventListener("ed11yResume", () => {
      continueCheck(true).then();
    });
  }
}
UI.testsRemaining = 0;
function checkAll() {
  if (UI.tipOpen) {
    return false;
  }
  UI.disabled = false;
  if (checkRunPrevent()) {
    disable();
  }
  UI.customTestsRunning = false;
  if (UI.splitConfiguration.active) {
    Object.assign(State.option, UI.splitConfiguration.devOptions);
  }
  UI.roots = [];
  if (State.option.fixedRoots) {
    State.option.fixedRoots.forEach((root) => {
      UI.roots.push(root);
    });
  } else {
    UI.roots = document.querySelectorAll(`:is(${State.option.checkRoot})`);
  }
  if (UI.roots.length === 0 && State.option.headless === false) {
    if (UI.onLoad) {
      console.warn(Lang.sprintf("MISSING_ROOT", `"${State.option.checkRoot}"`).textContent);
    }
    disable();
    return;
  }
  if (UI.incremental) {
    UI.oldResults = State.results;
  }
  State.results.length = 0;
  UI.splitConfiguration.devResults.length = 0;
  buildElementList();
  if (State.option.customTests > 0) {
    UI.customTestsRemaining += State.option.customTests;
    window.clearTimeout(UI.customTestTimeout);
    UI.customTestTimeout = window.setTimeout(() => {
      if (UI.customTestsRemaining > 0) {
        removeCustomTest();
      }
    }, 1e3);
    const customTests = new CustomEvent("ed11yRunCustomTests");
    document.dispatchEvent(customTests);
  }
  const queue = ["group1", "group2"];
  if (State.option.formLabelsPlugin) {
    queue.push("checkLabels");
  }
  if (State.option.developerPlugin) {
    queue.push("checkDeveloper");
  }
  if (State.option.contrastPlugin) {
    queue.push("checkContrast");
  }
  UI.testsRemaining = queue.length;
  enqueueTests(queue);
}
async function continueCheck(customCheck = false) {
  if (customCheck) {
    UI.customTestsRemaining--;
  }
  if (UI.customTestsRemaining + UI.testsRemaining > 0) {
    return;
  }
  if (UI.splitConfiguration.active && State.results.length > 0) {
    await handleSyncOnlyResults();
  } else {
    await filterAlerts(false);
    syncResults(State.results);
  }
  countAlerts();
  if (typeof UI.panelToggle.querySelector === "function") {
    panelLabel();
  }
  if (UI.visualizing) {
    if (State.option.readabilityPlugin && (!UI.incremental || UI.visualizing)) {
      checkReadability(
        UI.splitConfiguration.active ? UI.splitConfiguration.devResults : State.results,
        State.option
      );
    }
    showHeadingsPanel();
    showAltPanel();
  }
  updatePanel();
  window.setTimeout(() => {
    if (State.option.watchForChanges) {
      Elements.Found.editable?.forEach((editable) => {
        if (!editable.matches(".drag-observe")) {
          editable.classList.add("drag-observe");
          editable.addEventListener("drop", () => {
            UI.forceFullCheck = true;
            incrementalCheckDebounce();
          });
        }
      });
      if (State.option.watchForChanges === "checkRoots") {
        UI.roots?.forEach((root) => {
          startObserver(root);
        });
      } else {
        startObserver(document.body);
      }
      resumeObservers();
    }
  }, 0);
}
function incrementalCheck() {
  if (!UI.running) {
    if (UI.tipOpen || !UI.interaction && !UI.forceFullCheck) {
      return;
    }
    UI.interaction = false;
    UI.running = true;
    resetGetText();
    let runTime = performance.now();
    UI.incremental = true;
    if (UI.disabled && UI.closedByDisable) {
      UI.showPanel = true;
      UI.closedByDisable = false;
      UI.disabled = false;
    }
    checkAll();
    window.setTimeout(() => {
      if (UI.visualizing) {
        document.dispatchEvent(new CustomEvent("ed11yEndVisualization"));
      }
    }, 500);
    runTime = performance.now() - runTime;
    UI.browserSpeed = runTime > 100 ? 100 : (UI.browserSpeed + runTime) / 2;
    UI.browserLag = UI.browserSpeed < 1 ? 0 : UI.browserSpeed * 100 + UI.totalCount;
  } else {
    window.setTimeout(() => {
      incrementalCheckDebounce();
    }, 250);
  }
}
const incrementalCheckDebounce = lagBounce(() => {
  incrementalCheck();
}, 250);
function refresh() {
  incrementalCheckDebounce();
}
function resetPanel() {
  UI.visualizing = true;
  visualize();
  if (UI.totalCount === 0 && UI.dismissedCount > 0) {
    UI.panelCount.textContent = "i";
    UI.panelToggleTitle.textContent = UI.dismissedCount === 1 ? Lang._("buttonShowHiddenAlert") : Lang.sprintf("PANEL_DISMISS_BUTTON", UI.dismissedCount).textContent;
  }
  if (typeof UI.panel === "object") {
    UI.panel?.classList.add("ed11y-shut");
    UI.panel?.classList.remove("ed11y-active");
    UI.panelToggle.ariaExpanded = false;
    if (!UI.showDismissed && typeof UI.panelShowDismissed === "function") {
      UI.panelShowDismissed.setAttribute("data-ed11y-pressed", "false");
      UI.panelShowDismissed.querySelector(".ed11y-sr-only").textContent = UI.dismissedCount === 1 ? Lang._("buttonShowHiddenAlert") : Lang.sprintf("PANEL_DISMISS_BUTTON", UI.dismissedCount).textContent;
    }
  }
}
window.addEventListener("ed11yEndVisualization", () => {
  UI.visualizing = false;
  pauseObservers();
  visualize();
  resumeObservers();
});
function dismissThis(dismissalType, button) {
  const tip = button.closest(".ed11y-wrapper");
  const test = tip.querySelector("[data-test]").dataset.test;
  const dismissKey = tip.dataset.ed11yDismiss;
  if (button.dataset.ed11yAll === "true") {
    State.results.forEach((result) => {
      if (result.test === test && (!result.dismissalStatus || result.dismissalStatus !== dismissalType)) {
        dismissOne(dismissalType, test, result.dismiss);
      }
    });
  } else {
    dismissOne(dismissalType, test, dismissKey);
  }
  reset();
  UI.showPanel = true;
  checkAll();
  const rememberGoto = UI.openJumpPosition;
  window.setTimeout(
    () => {
      if (UI.jumpList.length > 0) {
        UI.openJumpPosition = rememberGoto - 1;
        UI.panelJumpNext?.focus();
      } else {
        window.setTimeout(() => {
          UI.panelToggle?.focus();
        }, 100);
      }
    },
    500,
    rememberGoto
  );
}
function toggleShowDismissals() {
  UI.ignoreAll = false;
  UI.showDismissed = !UI.showDismissed;
  UI.forceFullCheck = true;
  UI.showPanel = true;
  resetResults();
  incrementalCheck();
  UI.panelShowDismissed.setAttribute("data-ed11y-pressed", `${UI.showDismissed}`);
  window.setTimeout(() => {
    UI.panelShowDismissed.focus();
  }, 0);
}
function togglePanel() {
  UI.ignoreAll = false;
  if (!UI.doubleClickPrevent) {
    if (UI.running !== true) {
      UI.running = true;
      if (!UI.showPanel) {
        UI.onLoad = false;
        UI.incremental = false;
        UI.showPanel = true;
        if (UI.dismissedCount > 0 && UI.warningCount === 0 && UI.errorCount === 0) {
          UI.ignoreAll = false;
          UI.showDismissed = true;
          UI.panelShowDismissed.setAttribute("data-ed11y-pressed", `${UI.showDismissed}`);
        }
        checkAll();
        State.option.userPrefersShut = false;
        localStorage.setItem("editoria11yShow", "1");
      } else {
        UI.showDismissed = false;
        UI.showPanel = false;
        reset();
        State.option.userPrefersShut = true;
        localStorage.setItem("editoria11yShow", "0");
      }
      panelLabel();
    }
  }
  UI.doubleClickPrevent = true;
  window.setTimeout(() => {
    UI.doubleClickPrevent = false;
  }, 200);
  return false;
}
function hardRefresh(reJump) {
  if (UI.loopStop) {
    return;
  }
  const cacheState = UI.showPanel;
  UI.loopStop = true;
  reset();
  UI.showPanel = cacheState;
  checkAll();
  window.setTimeout(
    () => {
      if (State.results.length > 0 && UI.loopStop) {
        {
          jumpTo();
        }
        UI.loopStop = false;
      }
    },
    100,
    UI.loopStop,
    reJump
  );
}
function disable() {
  if (UI.showPanel && !UI.closedByDisable) {
    UI.closedByDisable = true;
  }
  UI.disabled = true;
  reset();
  document.documentElement.style.setProperty("--ed11y-activeBackground", UI.theme.panelBar);
  document.documentElement.style.setProperty("--ed11y-activeColor", UI.theme.panelBarText);
  document.documentElement.style.setProperty("--ed11y-activeBorder", `${UI.theme.panelBarText}44`);
  document.documentElement.style.setProperty("--ed11y-activePanelBorder", "transparent");
  if (typeof UI.panelToggle.querySelector === "function") {
    UI.panel?.classList.remove("ed11y-errors", "ed11y-warnings");
    UI.panelCount.textContent = "i";
    UI.panelJumpNext.setAttribute("hidden", "");
    UI.panelToggle.classList.add("disabled");
    UI.panelToggle.querySelector(".ed11y-sr-only").textContent = UI.english ? Lang._("toggleDisabled") : Lang._("CONTAINER_LABEL");
  }
}
function reset() {
  pauseObservers();
  resetResults();
  resetPanel();
  UI.incremental = false;
  UI.running = false;
  UI.showPanel = false;
}
class Ed11yElementAlt extends HTMLElement {
  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({ mode: "open" });
      const altTextWrapper = document.createElement("div");
      altTextWrapper.classList.add("ed11y-wrapper", "ed11y-alt-wrapper");
      const img = UI.imageAlts[this.dataset.ed11yImg];
      const altSpan = document.createElement("span");
      if (img.altText !== "") {
        altSpan.textContent = img.altText;
      } else {
        altSpan.classList.add("ed11y-decorative");
        altSpan.textContent = Lang._("DECORATIVE");
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
  connectedCallback() {
    if (!this.initialized) {
      this.open = false;
      this.racing = false;
      this.style.setProperty("outline", "0px solid transparent");
      this.initialized = true;
    }
  }
  handleHover(event) {
    event.preventDefault();
    const host = this.getRootNode().host;
    if (!this.classList.contains("intersecting") && host.open !== true && host.racing === false) {
      this.open = true;
      host.racing = true;
      host.toggleTip(true);
      UI.toggledFrom = this;
      window.setTimeout(
        () => {
          host.racing = false;
        },
        250,
        host
      );
    }
  }
  handleFocus() {
    const host = this.getRootNode().host;
    if (this.getRootNode().host.classList.contains("ed11y-offscreen")) {
      host.result.element.scrollIntoView();
      alignButtons();
    }
  }
  toggleClick(event) {
    event.preventDefault();
    const host = this.getRootNode().host;
    if (host.racing === false) {
      host.racing = true;
      UI.toggledFrom = this;
      const stateChange = host.getAttribute("data-ed11y-open") === "false" ? "open" : "close";
      host.setAttribute("data-ed11y-action", stateChange);
      if (stateChange === "open") {
        window.setTimeout(() => {
          const activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
          activeTip?.shadowRoot.querySelector(".title").focus();
        }, 500);
      }
      window.setTimeout(
        () => {
          host.racing = false;
        },
        250,
        host
      );
    }
  }
  closeOtherTips() {
    if (UI.tipOpen) {
      UI.openTip.button.setAttribute("data-ed11y-action", "close");
    }
  }
  buildTip() {
    this.tipNeedsBuild = false;
    const tip = document.createElement("ed11y-element-tip");
    tip.result = this.result;
    tip.setAttribute("data-ed11y-result", this.resultID);
    tip.classList.add("ed11y-element");
    tip.style.setProperty("opacity", "0");
    UI.panelAttachTo.insertAdjacentElement("beforeend", tip);
    this.tip = tip;
  }
  toggleTip(changeTo) {
    if (this.tipNeedsBuild) {
      this.buildTip();
    }
    this.toggle.setAttribute("aria-expanded", changeTo);
    const highlightOutline = this.dismissable ? "ed11y-ring-yellow" : "ed11y-ring-red";
    if (UI.inlineAlerts) {
      resetClass([
        "ed11y-hidden-highlight",
        "ed11y-ring-red",
        "ed11y-ring-yellow",
        "ed11y-warning-block",
        "ed11y-error-block",
        "ed11y-warning-inline",
        "ed11y-error-inline"
      ]);
    } else {
      editableHighlighter(this.resultID, changeTo);
    }
    if (changeTo === true) {
      this.tip.style.setProperty("opacity", "0");
      document.dispatchEvent(
        new CustomEvent("ed11yPop", {
          detail: {
            id: `ed11y-result-${this.toggle.getAttribute("data-ed11y-result")}`,
            result: this.result,
            tip: this.tip
          }
        })
      );
      this.closeOtherTips();
      this.tip.setAttribute("data-ed11y-action", "open");
      if (UI.inlineAlerts) {
        this.result.element.classList.add(highlightOutline);
      }
      requestAnimationFrame(() => alignTip(this.toggle, this.tip, 4, true));
      if (UI.jumpList.length === 0) {
        console.warn("Editoria11y race condition: toggle without jump list");
        buildJumpList();
      }
      UI.openJumpPosition = Number(this.getAttribute("data-ed11y-jump-position"));
      UI.tipOpen = true;
      UI.openTip = {
        button: this,
        tip: this.tip
      };
      this.result.highlight?.style.setProperty("opacity", "1");
    } else {
      document.dispatchEvent(
        new CustomEvent("ed11yShut", {
          detail: { id: `ed11y-result-${this.toggle.getAttribute("data-ed11y-result")}` }
        })
      );
      this.tip.setAttribute("data-ed11y-action", "shut");
      this.result.highlight?.style.setProperty("opacity", "0");
      UI.tipOpen = false;
      UI.openTip = {
        button: false,
        tip: false
      };
    }
    this.setAttribute("data-ed11y-open", changeTo);
    this.open = changeTo;
  }
  static get observedAttributes() {
    return ["data-ed11y-action"];
  }
  attributeChangedCallback(attr, _oldValue, newValue) {
    if (this.initialized) {
      switch (attr) {
        case "data-ed11y-action":
          if (newValue !== "false") {
            const changeTo = newValue === "open";
            this.setAttribute("data-ed11y-action", "false");
            this.toggleTip(changeTo);
          }
          break;
      }
    }
  }
}
class Ed11yElementPanel extends HTMLElement {
  template() {
    return `
    <div class='ed11y-buttonbar'>
      <button id='ed11y-show-hidden' data-ed11y-pressed='false' hidden>
        ${spriteUnDismiss}
        ${spriteDismiss}
        <span class="ed11y-sr-only"></span>
      </button>
      <button id='ed11y-visualize' data-ed11y-pressed="false" class='ed11y-panel-fa'>
        ${spriteVisualize}
        <span class="ed11y-sr-only"></span>
      </button>
      <div id='ed11y-visualizers' class="content" hidden>
          <details id="ed11y-headings-tab">
              <summary>${spriteHeadings}<span class="summary-title"></span><span class="close-details">${spriteClose}</span>
              </summary>
              <div class="details">
                  <span class="details-title"></span>
                  <ul id='ed11y-outline'></ul>
              </div>
          </details>
          <details id="ed11y-alts-tab">
            <summary>${spriteAlts}<span class="summary-title"></span><span class="close-details">${spriteClose}</span>
            </summary>
            <div class="details">
                <span class="details-title"></span>
                <ul id='ed11y-alt-list'></ul>
            </div>
        </details>
        </div>
      <button type='button' id='ed11y-toggle'><span class="ed11y-sr-only"></span><span class="ed11y-toggle-circle"><span class='icon'>${spriteToggleErrors}${spriteTogglePass}${spriteToggleWarnings}</span></span></button>
      <button class='ed11y-jump next' data-ed11y-goto='0' aria-haspopup="dialog">${spriteNext}<span class='toggle-count'></span><span class='jump-next ed11y-sr-only'></span></button>
     </div>
    </div>
    <div id="ed11y-message" aria-live="polite"></div>
    `;
  }
  connectedCallback() {
    if (!this.initialized) {
      this.style.setProperty("outline", "0");
      this.classList.add("ed11y-element");
      const shadow = this.attachShadow({ mode: "open" });
      const wrapper = document.createElement("aside");
      wrapper.style.setProperty("opacity", "0");
      wrapper.setAttribute("id", "ed11y-panel");
      wrapper.classList.add("ed11y-wrapper", "ed11y-panel-wrapper", "ed11y-pass", "ed11y-preload");
      wrapper.innerHTML = this.template();
      shadow.appendChild(wrapper);
      const panelTabs = wrapper.querySelectorAll(".ed11y-buttonbar button");
      panelTabs.forEach((tab) => {
        tab.addEventListener("click", this.handleBarClick);
      });
      const altDetails = wrapper.querySelector("#ed11y-alts-tab");
      const headingDetails = wrapper.querySelector("#ed11y-headings-tab");
      altDetails.addEventListener("toggle", () => {
        if (altDetails.open && headingDetails.open) {
          headingDetails.removeAttribute("open");
        }
      });
      headingDetails.addEventListener("toggle", () => {
        if (altDetails.open && headingDetails.open) {
          altDetails.removeAttribute("open");
        }
      });
      this.initialized = true;
    }
  }
  handleBarClick(event) {
    event.preventDefault();
    UI.message.textContent = "";
    const id = event.currentTarget.getAttribute("id");
    switch (id) {
      case "ed11y-toggle":
        togglePanel();
        break;
      case "ed11y-show-hidden":
        toggleShowDismissals();
        break;
      case "ed11y-visualize":
        if (!UI.showPanel) {
          togglePanel();
          window.setTimeout(() => {
            visualize();
          }, 500);
        } else {
          visualize();
        }
        break;
    }
  }
}
class Ed11yElementHeadingLabel extends HTMLElement {
  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({ mode: "open" });
      const wrapper = document.createElement("div");
      wrapper.classList.add("ed11y-wrapper", "ed11y-heading-wrapper");
      const i = this.dataset.ed11yHeadingOutline;
      const result = State.headingOutline[i];
      wrapper.innerHTML = `H${result.headingLevel}`;
      const fontSize = Math.max(52 - 8 * result.headingLevel, 12);
      wrapper.style.setProperty("font-size", `${fontSize}px`);
      shadow.appendChild(wrapper);
      this.initialized = true;
    }
  }
}
function generateContrastTools(contrastDetails) {
  const { sanitizedText, color, background, fontWeight, fontSize, ratio, textUnderline } = contrastDetails;
  const hasBackgroundColor = background && background.type !== "image";
  const backgroundHex = hasBackgroundColor ? getHex(background) : "#000000";
  const foregroundHex = color ? getHex(color) : "#000000";
  const hasFontWeight = fontWeight ? `font-weight:${fontWeight};` : "";
  const hasFontSize = fontSize ? `font-size:${fontSize}px;` : "";
  const textDecoration = textUnderline ? `text-decoration:${textUnderline};` : "";
  const unknownFG = color ? "" : 'class="unknown"';
  const unknownBG = background && background.type !== "image" ? "" : 'class="unknown"';
  const unknownFGText = color ? "" : `<span id="fg-input-unknown" class="visually-hidden">(${Lang._("UNKNOWN")})</span>`;
  const unknownBGText = background ? "" : `<span id="bg-input-unknown" class="visually-hidden">(${Lang._("UNKNOWN")})</span>`;
  let displayedRatio;
  if (Constants.Global.contrastAlgorithm === "APCA") {
    displayedRatio = Math.abs(ratio) === 0 ? 0 : Math.abs(ratio) || Lang._("UNKNOWN");
  } else {
    displayedRatio = ratio || Lang._("UNKNOWN");
  }
  const contrastTools = document.createElement("div");
  contrastTools.id = "contrast-tools";
  contrastTools.innerHTML = `
      <hr aria-hidden="true">
      <div id="contrast" class="badge">${Lang._("CONTRAST")}</div>
      <div id="value" class="badge">${displayedRatio}</div>
      <div id="good" class="badge good-contrast" hidden>${Lang._("GOOD")} <span class="good-icon"></span></div>
      <div id="contrast-preview" style="color:${foregroundHex};${hasBackgroundColor ? `background:${backgroundHex};` : ""}${hasFontWeight + hasFontSize + textDecoration}">${sanitizedText}</div>
      <div id="color-pickers">
        <label for="fg-text">${Lang._("FG")} ${unknownFGText}
          <div id="fg-color-wrapper" ${unknownFG}>
            <input type="color" id="fg-input" value="${foregroundHex}" ${unknownFG}/>
          </div>
        </label>
        <label for="bg">${Lang._("BG")} ${unknownBGText}
          <div id="bg-color-wrapper" ${unknownBG}>
            <input type="color" id="bg-input" value="${backgroundHex}" ${unknownBG}/>
          </div>
        </label>
      </div>`;
  return contrastTools;
}
function initializeContrastTools(container, contrastDetails) {
  const contrastTools = container?.querySelector("#contrast-tools");
  if (!contrastTools) return;
  const { fontSize: initialFontSize, fontWeight, type, isLargeText } = contrastDetails;
  const contrast = container.querySelector("#contrast");
  const contrastPreview = container.querySelector("#contrast-preview");
  const fgInput = container.querySelector("#fg-input");
  const bgInput = container.querySelector("#bg-input");
  const ratio = container.querySelector("#value");
  const good = container.querySelector("#good");
  const toggleBadges = (elements2, condition) => {
    elements2.forEach(($el) => {
      $el.classList.toggle("good-contrast", condition);
      $el.classList.toggle("error-badge", !condition);
    });
  };
  const getPreviewFontSize = () => {
    if (contrastPreview.style.fontSize) {
      const match = contrastPreview.style.fontSize.match(/([\d.]+)/);
      if (match) return parseFloat(match[1]);
    }
    const computed = getComputedStyle(contrastPreview).fontSize;
    if (computed) {
      const match = computed.match(/([\d.]+)/);
      if (match) return parseFloat(match[1]);
    }
    return initialFontSize;
  };
  const updatePreview = (e) => {
    const fgColor = fgInput.value;
    const bgColor = bgInput.value;
    const currentFontSize = getPreviewFontSize();
    setTimeout(() => {
      const unknownFG = fgInput.classList.contains("unknown");
      const unknownBG = bgInput.classList.contains("unknown");
      contrastPreview.style.color = unknownFG ? "" : fgColor;
      contrastPreview.style.backgroundColor = unknownBG ? "" : bgColor;
      contrastPreview.style.backgroundImage = unknownBG ? "" : "none";
    }, 0);
    if (e?.target) {
      e.target.classList.remove("unknown");
      e.target.parentElement.classList.remove("unknown");
      container.querySelector(`#${e.target.id}-unknown`)?.remove();
    }
    if (fgInput.classList.contains("unknown") || bgInput.classList.contains("unknown")) return;
    const algorithm = Constants.Global.contrastAlgorithm;
    const contrastValue = calculateContrast(
      convertToRGBA(fgColor),
      convertToRGBA(bgColor),
      Constants.Global.contrastAlgorithm
    );
    const elementsToToggle = [ratio, contrast];
    if (algorithm === "APCA") {
      const value = contrastValue.ratio;
      ratio.textContent = displayAPCAValue(value);
      const fontArray = fontLookupAPCA(value).slice(1);
      const nonTextPasses = value >= 45 && fontArray[0] >= 0 && fontArray[0] <= 777;
      let passes;
      switch (type) {
        case "svg-error":
        case "svg-warning": {
          good.hidden = !nonTextPasses;
          passes = nonTextPasses;
          toggleBadges(elementsToToggle, passes);
          break;
        }
        default: {
          const minFontSize = fontArray[Math.floor(fontWeight / 100) - 1];
          passes = currentFontSize >= minFontSize;
          toggleBadges(elementsToToggle, passes);
          good.hidden = !passes;
          break;
        }
      }
    } else {
      const value = contrastValue.ratio;
      ratio.textContent = displayWCAGRatio(value);
      const useAAA = algorithm === "AAA";
      const nonTextThreshold = 3;
      const normalTextThreshold = useAAA ? 7 : 4.5;
      const largeTextThreshold = useAAA ? 4.5 : 3;
      const passesNonText = value >= nonTextThreshold;
      const dynamicIsLargeText = currentFontSize >= 24 || currentFontSize >= 18.66 && fontWeight >= 700 || isLargeText;
      const passesNormalText = value >= normalTextThreshold;
      const passesLargeText = value >= largeTextThreshold;
      switch (type) {
        case "svg-error":
        case "svg-text":
        case "svg-warning": {
          good.hidden = !passesNonText;
          toggleBadges(elementsToToggle, passesNonText);
          break;
        }
        default: {
          if (dynamicIsLargeText) {
            toggleBadges([ratio, contrast], passesLargeText);
            good.hidden = !passesLargeText;
          } else {
            toggleBadges([ratio, contrast], passesNormalText);
            good.hidden = !passesNormalText;
          }
          break;
        }
      }
    }
  };
  fgInput.addEventListener("input", updatePreview);
  bgInput.addEventListener("input", updatePreview);
  setTimeout(() => {
    const bindSuggest = (id, action) => {
      const el = container.querySelector(id);
      if (!el) return;
      el.addEventListener("click", () => {
        action(el.textContent);
        updatePreview();
        navigator.clipboard.writeText(el.textContent).catch(() => {
        });
      });
    };
    bindSuggest("#suggest", (val) => {
      fgInput.value = val;
    });
    bindSuggest("#suggest-size", (val) => {
      contrastPreview.style.fontSize = val;
    });
  }, 0);
}
function generateColorSuggestion(contrastDetails) {
  let adviceContainer;
  const { color, background, fontWeight, fontSize, isLargeText, type } = contrastDetails;
  if (color && background && background.type !== "image" && (type === "text" || type === "svg-error" || type === "input")) {
    const suggested = Constants.Global.contrastAlgorithm === "APCA" ? suggestColorAPCA(color, background, fontWeight, fontSize) : suggestColorWCAG(
      color,
      background,
      isLargeText,
      Constants.Global.contrastAlgorithm
    );
    let advice;
    const hr = '<hr aria-hidden="true">';
    const bgHex = getHex(contrastDetails.background);
    const style = `color:${suggested.color};background-color:${bgHex};`;
    const colorBadge = `<button id="suggest" class="badge" style="${style}">${suggested.color}</button>`;
    const sizeBadge = `<button id="suggest-size" class="normal-badge">${suggested.size}px</button>`;
    if (Constants.Global.contrastAlgorithm === "AA" || Constants.Global.contrastAlgorithm === "AAA") {
      if (suggested.color === null) {
        advice = `${hr} ${Lang._("NO_SUGGESTION")}`;
      } else {
        advice = `${hr} ${Lang._("CONTRAST_COLOR")} ${colorBadge}`;
      }
    } else if (suggested.color && suggested.size) {
      advice = `${hr} ${Lang._("CONTRAST_APCA")} ${colorBadge} ${sizeBadge}`;
    } else if (suggested.color) {
      advice = `${hr} ${Lang._("CONTRAST_COLOR")} ${colorBadge}`;
    } else if (suggested.size) {
      advice = `${hr} ${Lang._("CONTRAST_SIZE")} ${sizeBadge}`;
    }
    adviceContainer = document.createElement("div");
    adviceContainer.id = "advice";
    const suggestion = contrastDetails.opacity < 1 ? `<hr aria-hidden="true"> ${Lang.sprintf("CONTRAST_OPACITY")}` : advice;
    adviceContainer.innerHTML = suggestion;
  }
  return adviceContainer;
}
class Ed11yElementTip extends HTMLElement {
  connectedCallback() {
    if (!this.initialized && this.result) {
      this.renderOnce();
    }
  }
  renderOnce() {
    this.initialized = true;
    this.open = true;
    this.style.setProperty("opacity", "0");
    this.style.setProperty("outline", "0px solid transparent");
    const shadow = this.attachShadow({ mode: "open" });
    this.issueIndex = Number.parseInt(this.result.toggle.dataset.ed11yJumpPosition, 10);
    this.issueNext = this.issueIndex < UI.jumpList.length - 1 ? this.issueIndex + 2 : 1;
    this.issuePrev = this.issueIndex > 0 ? this.issueIndex : UI.jumpList.length;
    this.dismissable = this.result.type !== "error";
    this.dismissed = !!this.result.dismissalStatus;
    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("role", "dialog");
    this.wrapper.dataset.ed11yDismiss = this.result.dismiss;
    this.wrapper.classList.add("ed11y-tip-wrapper", "ed11y-wrapper");
    this.wrapper.style.setProperty("opacity", "0");
    this.wrapper.setAttribute(
      "aria-label",
      `${Lang._("ALERT_TEXT")}
        ${this.issueIndex + 1}`
    );
    this.wrapper.innerHTML = `
		<div class="tip">
			<button class="close ed11y-tip-close">${spriteClose}</button>
			<div class="content" data-test="${this.result.test}">
				<div class="message"></div>
				<div class="content-footer">
					<div class="edit-links"></div>
					<div class="count"><span class="count-text"></span> <span class="count-number"></span></div>
				</div>
			</div>
			<div class="footer">
				<div class="error-badge">${this.dismissable ? Lang._("WARNING") : Lang._("ERROR")}</div>
				<div class="ed11y-tip-dismissals">
					<details class="ed11y-bulk-actions dismiss ed11y-hidden"><summary></summary><div class="ed11y-bulk-actions-content"></div></details>
				</div>
				<button class="prev">${spriteNext}</button>
				<button class="next">${spriteNext}</button>
		</div>
		`;
    this.addEventListener("mouseover", this.handleHover, {
      passive: true
    });
    UI.attachCSS(this.wrapper);
    this.tip = this.wrapper.querySelector(".tip");
    const content = this.wrapper.querySelector(".message");
    if (this.result.content.querySelector(".title")) {
      content.appendChild(this.result.content);
      const sallyTips = content.querySelectorAll("hr, hr ~ *");
      if (sallyTips) {
        const tipSet = Array.from(sallyTips);
        for (let i = tipSet.length; i >= 0; i--) {
          const el = tipSet[i];
          if (el) {
            el.nextSibling?.remove();
            el.remove();
          }
        }
      }
    } else {
      const innerContent = document.createElement("div");
      const firstSentence = document.createElement("div");
      firstSentence.classList.add("title");
      firstSentence.setAttribute("tabindex", "-1");
      firstSentence.style.setProperty("position", "absolute");
      innerContent.append(firstSentence);
      innerContent.appendChild(this.result.content);
      content.append(innerContent);
      console.warn(`Editoria11y tip title not found for ${this.result.test}.`);
    }
    const title = content.querySelector(".title");
    const invisibleAlert = document.createElement("div");
    invisibleAlert.classList.add("invisible-alert");
    title.prepend(invisibleAlert);
    if (this.result.contrastDetails) {
      const contrastDiv = document.createElement("div");
      contrastDiv.classList.add("ed11y-contrast-tools");
      content.append(contrastDiv);
      const tools = generateContrastTools(this.result.contrastDetails);
      contrastDiv.appendChild(tools);
      initializeContrastTools(contrastDiv, this.result.contrastDetails);
      const suggestion = generateColorSuggestion(this.result.contrastDetails);
      if (suggestion) contrastDiv.appendChild(suggestion);
    }
    if (!UI.inlineAlerts || State.option.editLinks) {
      const editBar = document.createElement("div");
      if (!UI.inlineAlerts) {
        editBar.classList.add("ed11y-tip-buttons");
        const focusTransfer = document.createElement("button");
        const transferIcon = document.createElement("span");
        transferIcon.classList.add("ed11y-transfer-icon");
        transferIcon.innerHTML = spriteCursor;
        focusTransfer.textContent = Lang._("transferFocus");
        focusTransfer.prepend(transferIcon);
        focusTransfer.classList.add("ed11y-tip-button", "ed11y-transfer-focus");
        editBar.append(focusTransfer);
        focusTransfer.addEventListener("click", () => {
          transferFocus();
        });
      } else {
        editBar.classList.add("ed11y-custom-edit-links");
        editBar.append(State.option.editLinks.cloneNode(true));
      }
      this.contentFooter = this.wrapper.querySelector(".content-footer");
      const why2 = this.wrapper.querySelector(".why");
      if (why2) {
        why2.insertAdjacentElement("beforebegin", this.contentFooter);
      }
      this.contentFooter.prepend(editBar);
    }
    const buttonBar = this.wrapper.querySelector(".ed11y-tip-dismissals");
    if (this.dismissable) {
      const dismissIcon = document.createElement("span");
      dismissIcon.classList.add("ed11y-dismiss-icon");
      dismissIcon.innerHTML = spriteDismiss;
      if (UI.showDismissed && this.dismissed) {
        const okd = UI.dismissedAlerts[State.option.currentPage][this.result.test][this.result.dismiss] === "ok";
        if (okd && State.option.allowOK || !okd) {
          const unDismissButton = document.createElement("button");
          const unDismissIcon = document.createElement("span");
          unDismissIcon.classList.add("ed11y-dismiss-icon");
          unDismissIcon.innerHTML = spriteUnDismiss;
          unDismissButton.classList.add("dismiss");
          unDismissButton.textContent = okd ? Lang._("unDismissOKButton") : Lang._("unDismissHideButton");
          unDismissButton.dataset.ed11yAll = "false";
          unDismissButton.prepend(unDismissIcon);
          buttonBar.prepend(unDismissButton);
          unDismissButton.addEventListener("click", (e) => {
            dismissThis("reset", e.target.closest("button"));
          });
        } else {
          const restoreNote = document.createElement("div");
          restoreNote.classList.add("dismissed-note");
          restoreNote.textContent = Lang._("unDismissNotePermissions");
          buttonBar.prepend(restoreNote);
        }
      } else {
        const pageActions = this.wrapper.querySelector(".ed11y-bulk-actions");
        const pageActionsSummary = pageActions.querySelector("summary");
        pageActionsSummary.textContent = Lang._("dismissActions");
        const othersLikeThis = State.results.filter((el) => el.test === this.result.test).length;
        const pageActionsContent = pageActions.querySelector(".ed11y-bulk-actions-content");
        const showPageActions = othersLikeThis > 3 && (State.option.allowHide || State.option.allowOK);
        if (showPageActions) {
          pageActions.classList.remove("ed11y-hidden");
        }
        if (State.option.allowOK) {
          const check = document.createElement("span");
          check.setAttribute("aria-hidden", "true");
          check.textContent = "✓";
          const OkButton = document.createElement("button");
          OkButton.classList.add("dismiss", "ok");
          if (State.option.syncedDismissals) {
            OkButton.setAttribute("title", Lang._("dismissOkTitle"));
          }
          const OkText = document.createElement("span");
          OkText.classList.add("text");
          OkText.textContent = Lang._("dismissOkButtonContent");
          OkButton.append(OkText);
          buttonBar.prepend(OkButton);
          if (showPageActions) {
            const OkAllButton = OkButton.cloneNode(true);
            const OkAllText = OkAllButton.querySelector(".text");
            OkAllText.textContent = Lang._("dismissOkAllButton");
            const icon = check.cloneNode(true);
            OkAllButton.prepend(icon);
            OkAllButton.dataset.ed11yAll = "true";
            pageActionsContent.insertAdjacentElement("afterbegin", OkAllButton);
            OkAllButton.addEventListener("click", (e) => {
              dismissThis("ok", e.target.closest("button"));
            });
          }
          OkButton.prepend(check);
          OkButton.dataset.ed11yAll = "false";
          OkButton.addEventListener("click", (e) => {
            dismissThis("ok", e.target.closest("button"));
          });
        }
        if (State.option.allowHide) {
          const ignoreButton = document.createElement("button");
          ignoreButton.classList.add("dismiss", "ignore");
          if (State.option.syncedDismissals) {
            ignoreButton.setAttribute("title", `${Lang._("dismissHideTitle")}`);
          }
          const ignoreText = document.createElement("span");
          ignoreText.classList.add("text");
          ignoreText.textContent = Lang._("DISMISS");
          ignoreButton.append(ignoreText);
          ignoreButton.prepend(dismissIcon.cloneNode(true));
          ignoreButton.dataset.ed11yAll = "false";
          buttonBar.prepend(ignoreButton);
          ignoreButton.addEventListener("click", (e) => {
            dismissThis("hide", e.target.closest("button"));
          });
          if (showPageActions) {
            const ignoreAllButton = document.createElement("button");
            ignoreAllButton.classList.add("dismiss");
            const ignoreAllText = document.createElement("span");
            ignoreAllText.classList.add("text");
            ignoreAllText.textContent = Lang._("DISMISS_ALL");
            ignoreAllButton.append(ignoreAllText);
            const icon = dismissIcon.cloneNode(true);
            ignoreAllButton.prepend(icon);
            ignoreAllButton.dataset.ed11yAll = "true";
            pageActionsContent.appendChild(ignoreAllButton);
            ignoreAllButton.addEventListener("click", (e) => {
              dismissThis("hide", e.target.closest("button"));
            });
          }
        }
      }
    }
    const countNumber = this.wrapper.querySelector(".count-number");
    countNumber.textContent = `${this.issueIndex + 1} / ${UI.jumpList.length}`;
    const countText = this.wrapper.querySelector(".count-text");
    countText.textContent = Lang._("ALERT_TEXT");
    if (UI.english && UI.splitConfiguration) {
      const countPrefix = document.createElement("span");
      countText.insertAdjacentElement("beforebegin", countPrefix);
      if (this.result.outsideContentRoots) {
        countPrefix.textContent = Lang._("issueTemplate");
      } else if (UI.splitConfiguration.devChecks[this.result.test]) {
        countPrefix.textContent = Lang._("issueDeveloper");
      }
      const br = document.createElement("br");
      countPrefix.insertAdjacentElement("afterend", br);
    }
    if (UI.jumpList.length > 1) {
      this.prev = this.wrapper.querySelector(".prev");
      this.prev.setAttribute("title", `${Lang._("SKIP_TO_ISSUE")} ${this.issuePrev}`);
      this.prev.addEventListener("click", (event) => {
        event.preventDefault();
        jumpTo(false);
      });
      this.next = this.wrapper.querySelector(".next");
      this.next.setAttribute("title", `${Lang._("SKIP_TO_ISSUE")} ${this.issueNext}`);
      this.next.addEventListener("click", (event) => {
        event.preventDefault();
        jumpTo();
      });
    }
    const closeButton = this.wrapper.querySelector(".close");
    closeButton.setAttribute("title", Lang._("ALERT_CLOSE"));
    const arrow = document.createElement("div");
    arrow.classList.add("arrow");
    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.open) {
        if (UI.toggledFrom) {
          UI.toggledFrom.focus();
        }
        this.setAttribute("data-ed11y-action", "shut");
        this.result?.toggle?.setAttribute("data-ed11y-action", "shut");
      }
    });
    document.addEventListener("click", (event) => {
      if (this.open && !event.target.closest(".ed11y-element")) {
        const toggle = getElements('ed11y-element-result[data-ed11y-open="true"]', "document", []);
        toggle[0]?.setAttribute("data-ed11y-action", "shut");
        this.setAttribute("data-ed11y-action", "shut");
      }
    });
    shadow.appendChild(this.wrapper);
    const focusLoopLeft = document.createElement("div");
    focusLoopLeft.setAttribute("tabIndex", "0");
    const focusLoopRight = document.createElement("div");
    focusLoopRight.setAttribute("tabindex", "0");
    this.wrapper.appendChild(focusLoopLeft);
    this.wrapper.appendChild(arrow);
    this.wrapper.appendChild(this.tip);
    this.wrapper.appendChild(focusLoopRight);
    const focusables = this.wrapper.querySelectorAll('a, button, [tabindex="0"]');
    const count = focusables.length;
    focusables[0].addEventListener("focus", () => {
      focusables[count - 2].focus();
    });
    focusables[count - 1].addEventListener("focus", () => {
      focusables[1].focus();
    });
    this.initialized = true;
    this.rendering = false;
  }
  toggleTip(changeTo) {
    if (changeTo) {
      this.wrapper.classList.add("open");
      alertOnInvisibleTip(this.result.toggle, this.result.element);
    } else {
      this.wrapper.classList.remove("open");
    }
    this.setAttribute("data-ed11y-open", changeTo);
  }
  static get observedAttributes() {
    return ["data-ed11y-action"];
  }
  attributeChangedCallback(attr, _oldValue, newValue) {
    if (!this.initialized && this.result) {
      this.renderOnce();
    }
    if (this.initialized) {
      switch (attr) {
        case "data-ed11y-action":
          if (newValue !== "false") {
            const changeTo = newValue === "open";
            this.open = changeTo;
            this.setAttribute("data-ed11y-action", "false");
            this.toggleTip(changeTo);
          }
          break;
      }
    }
  }
}
const Sa11yStrings = {
  // English
  strings: {
    LANG_CODE: "en-US",
    MAIN_TOGGLE_LABEL: "Check Accessibility",
    CONTAINER_LABEL: "Accessibility Checker",
    ERROR: "Error",
    ERRORS: "Errors",
    WARNING: "Warning",
    WARNINGS: "Warnings",
    GOOD: "Good",
    ON: "On",
    OFF: "Off",
    ALERT_TEXT: "Alert",
    ALERT_CLOSE: "Close",
    OUTLINE: "Outline",
    READABILITY_DESC: "Shows the readability score in the <strong>Outline</strong> tab to help gauge reading difficulty.",
    TITLE: "Title",
    ALT: "ALT",
    IMAGES: "Images",
    EDIT: "Edit",
    NO_IMAGES: "No images found.",
    DECORATIVE: "Decorative",
    MISSING: "Missing",
    PAGE_ISSUES: "Page Issues",
    SETTINGS: "Settings",
    DEVELOPER_CHECKS: "Developer checks",
    DEVELOPER_DESC: "Checks for issues that may need coding knowledge to fix, such as HTML attributes, forms, and more.",
    DARK_MODE: "Dark mode",
    SHORTCUT_SR: "Skip to issue. Keyboard shortcut: Alt S",
    SKIP_TO_ISSUE: "Skip to issue",
    NEW_TAB: "Opens new tab",
    LINKED: "Linked",
    PANEL_HEADING: "Accessibility check",
    NO_ERRORS_FOUND: "No errors found.",
    WARNINGS_FOUND: "warnings found.",
    TOTAL_FOUND: "total issues found.",
    NOT_VISIBLE: "Item is not visible; it may be hidden or inside of an accordion or tab component.",
    MISSING_ROOT: "The full page was checked for accessibility because the target area <code>%(root)</code> does not exist.",
    MISSING_READABILITY_ROOT: "The readability score is based on the <code>%(fallback)</code> content area, because the target area <code>%(root)</code> does not exist.",
    SKIP_TO_PAGE_ISSUES: "Skip to Page Issues",
    CONSOLE_ERROR: 'Sorry, but there is an issue with the accessibility checker on this page. Can you please <a href="%(link)">report it through this form</a> or on <a href="%(link)">GitHub</a>?',
    APPEARANCE: "Appearance",
    MOVE_PANEL: "Move panel",
    HIDDEN: "Hidden",
    // Export
    DATE: "Date",
    PAGE_TITLE: "Page title",
    RESULTS: "Results",
    EXPORT_RESULTS: "Export results",
    GENERATED: "Results generated with %(tool).",
    PREVIEW: "Preview",
    ELEMENT: "Element",
    PATH: "Path",
    // Dismiss
    PANEL_DISMISS_BUTTON: "Show %(dismissCount) dismissed",
    DISMISS: "Dismiss",
    DISMISS_ALL: "Dismiss all",
    DISMISSED: "Dismissed",
    DISMISS_REMINDER: "Please note that warnings are only <strong>temporarily</strong> dismissed. Clearing your browser history and cookies will restore all previously dismissed warnings across all pages.",
    // Colour filters
    COLOUR_FILTER: "Color filter",
    PROTANOPIA: "Protanopia",
    DEUTERANOPIA: "Deuteranopia",
    TRITANOPIA: "Tritanopia",
    MONOCHROMACY: "Monochromacy",
    COLOUR_FILTER_MESSAGE: "Check for elements that are difficult to perceive or distinguish against other colors.",
    RED_EYE: "Red blind.",
    GREEN_EYE: "Green blind.",
    BLUE_EYE: "Blue blind.",
    MONO_EYE: "Red, blue, and green blind.",
    COLOUR_FILTER_HIGH_CONTRAST: "Color filters do not work in high contrast mode.",
    // Alternative text stop words
    SUS_ALT_STOPWORDS: ["image", "graphic", "picture", "photo", "thumbnail", "icon"],
    PLACEHOLDER_ALT_STOPWORDS: [
      "alt",
      "chart",
      "decorative",
      "image",
      "graphic",
      "photo",
      "placeholder",
      "placeholder image",
      "spacer",
      "tbd",
      "todo",
      "to do",
      "thumbnail",
      "icon",
      "test",
      "hero image",
      "hero image",
      "hero slide",
      "homepage feature image",
      "featured image",
      "untitled"
    ],
    LINK_STOPWORDS: [
      "click",
      "click here",
      "click here for more",
      "click here to learn more",
      "clicking here",
      "check out",
      "detailed here",
      "discover",
      "download",
      "download here",
      "explore",
      "find out",
      "find out more",
      "form",
      "here",
      "info",
      "information",
      "link",
      "learn",
      "learn more",
      "learn to",
      "more",
      "page",
      "paper",
      "read more",
      "read",
      "read this",
      "this",
      "this page",
      "this link",
      "this website",
      "this form",
      "view",
      "view our",
      "website",
      "article"
    ],
    CLICK: ["click"],
    NEW_WINDOW_PHRASES: [
      "external",
      "new tab",
      "new window",
      "pop-up",
      "pop up",
      "opens new tab",
      "opens new window",
      "opens in a new window",
      "opens in a new tab"
    ],
    FILE_TYPE_PHRASES: [
      "document",
      "spreadsheet",
      "calculation sheet",
      "compressed file",
      "archived file",
      "worksheet",
      "powerpoint",
      "presentation",
      "install",
      "video",
      "audio",
      "pdf"
    ],
    // Readability
    READABILITY: "Readability",
    AVG_SENTENCE: "Average words per sentence:",
    COMPLEX_WORDS: "Complex words:",
    TOTAL_WORDS: "Words:",
    VERY_DIFFICULT: "Very difficult",
    DIFFICULT: "Difficult",
    FAIRLY_DIFFICULT: "Fairly difficult",
    READABILITY_NOT_ENOUGH: "Not enough content to calculate readability score.",
    // Headings
    HEADING_SKIPPED_LEVEL: "Headings should not skip levels or jump from <strong>Heading %(PREV_LEVEL)</strong> to <strong {C}>Heading %(LEVEL)</strong>, as this disrupts the content's order and hierarchy, making it harder to follow. <hr> If <strong {C}>%(HEADING)</strong> falls under the <strong>%(PREV_HEADING)</strong> section, then consider formatting it as a <strong>Heading %(level)</strong> instead.",
    HEADING_EMPTY: "Empty heading found! To fix, delete this line or change its format from <strong {C}>Heading %(level)</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>.",
    HEADING_LONG: "Heading is long! Headings should be used to organize content and convey structure. They should be brief, informative, and unique. Please keep headings less than %(MAX_LENGTH) characters (no more than a sentence). <hr> <strong {B}>%(HEADING_LENGTH) Characters</strong>",
    HEADING_FIRST: 'The first heading on a page should usually be a Heading 1 or Heading 2. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">heading structure.</a>',
    HEADING_MISSING_ONE: 'Missing Heading 1. Heading 1 should be the start of the main content area, and is the main heading that describes the overall purpose of the page. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">heading structure.</a>',
    HEADING_EMPTY_WITH_IMAGE: "Heading has no text, but contains an image. If this is not a heading, change its format from <strong {C}>Heading %(level)</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>. Otherwise, please add alt text to the image if it is not decorative.",
    PANEL_HEADING_MISSING_ONE: "Missing Heading 1!",
    PANEL_NO_HEADINGS: "No headings found.",
    // Links
    LINK_EMPTY: "Remove empty links without any text.",
    LINK_EMPTY_LABELLEDBY: "Link has an <code>aria-labelledby</code> value that is empty or does not match the <code>id</code> value of another element on the page.",
    LINK_EMPTY_NO_LABEL: 'Link does not have discernible text that is visible to screen readers and other assistive technology. To fix: <ul><li>Add concise text that describes where the link takes you.</li><li>If it is an <a href="https://a11y-101.com/development/icons-and-links">icon link or SVG,</a> it is likely missing a descriptive label.</li><li>If you think this link is an error due to a copy/paste bug, consider deleting it.</li></ul>',
    LINK_STOPWORD: "Link text may not be descriptive enough out of context: <strong {C}>%(ERROR)</strong>",
    LINK_STOPWORD_ARIA: "Although an accessible name was provided, consider revising the visible link text. Phrases like &quot;<strong {C}>%(ERROR)</strong>&quot; are not meaningful.",
    LINK_TIP: "<hr> <strong>Tip!</strong> Use clear and unique link text that describes the destination of the link, typically the page or document title.",
    LINK_CLICK_HERE: 'The phrase "click" or "click here" places focus on mouse mechanics, when many people do not use a mouse or may be viewing this website on a mobile device. Consider using a different verb that relates to the task.',
    DUPLICATE_TITLE: 'The <code>title</code> attribute on links and images is meant to provide extra information, and should be <strong>different</strong> than the text or alt text. The title text appears when hovering over an element, but is not accessible with a keyboard or touch input. Consider <a href="https://www.a11yproject.com/posts/title-attributes/">avoiding the title attribute completely.</a>',
    LINK_SYMBOLS: "Avoid using symbols as calls to action within link text unless they are hidden from assistive technologies. Screen readers may read the symbols out loud, which can be confusing. Consider removing: <strong {C}>%(ERROR)</strong>",
    LINK_URL: "Longer, less intelligible URLs used as link text might be difficult to comprehend with assistive technology. In most cases, it is better to use human-readable text instead of the URL. Short URLs (such as a site's homepage) are okay.",
    LINK_DOI: 'For web pages or online-only resources, the <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style guide</a> recommends using descriptive links by wrapping the URL or DOI of the work around its title. Longer, less intelligible URLs used as link text might be difficult to comprehend with assistive technology.',
    LINK_NEW_TAB: `Link opens in a new tab or window without warning. Doing so can be disorienting, especially for people who have difficulty perceiving visual content. Secondly, it is not always a good practice to control someone's experience or make decisions for them. Indicate that the link opens in a new window within the link text. <hr> <strong>Tip!</strong> Learn best practices: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">opening links in new browser windows and tabs.</a>`,
    LINK_FILE_EXT: 'Link points to a PDF or downloadable file (e.g. MP3, Zip, Word Doc) without warning. Indicate the file type within the link text. If it is a large file, consider including the file size. For example: "Executive Report (PDF, 3MB)"',
    LINK_IDENTICAL_NAME: "Link has identical text as another link, although it points to a different page. Multiple links with the same text may cause confusion for people who use screen readers. <strong>Consider making the following link more descriptive to help distinguish it from other links.</strong> <hr> <strong {B}>Accessible Name</strong> <strong {C}>%(TEXT)</strong>",
    // Images
    ALT_UNPRONOUNCEABLE: "The alt text only contains unpronounceable symbols and/or spaces. Screen readers will announce the image and then pause. If the image is decorative, ensure there are no spaces within the alt text. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    LINK_ALT_UNPRONOUNCEABLE: "The alt text within this linked image only contains unpronounceable symbols and/or spaces. Screen readers will announce the image and then pause. Ensure the alt text describes the destination of the link. <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    MISSING_ALT_LINK_HAS_TEXT: "Image is being used as a link with surrounding text, although the alt attribute should be marked as decorative.",
    MISSING_ALT_LINK: "Image is being used as a link but is missing alt text! Please ensure alt text describes where the link takes you.",
    MISSING_ALT: "Missing alt text! If the image conveys a story, mood, or important information, make sure to describe it clearly.",
    LINK_ALT_FILE_EXT: "Alt text should not include file extensions or image dimensions. Ensure the alt text describes the destination of the link, not a literal description of the image. Remove: <strong {C}>%(ERROR)</strong> <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    LINK_PLACEHOLDER_ALT: "Non-descript or placeholder alt text within a linked image found. Ensure the alt text describes the destination of the link, not a literal description of the image. Replace the following alt text. <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    LINK_SUS_ALT: "Assistive technologies already indicate that this is an image, so &quot;<strong {C}>%(ERROR)</strong>&quot; may be redundant. Ensure the alt text describes the destination of the link, not a literal description of the image. <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    ALT_FILE_EXT: "Alt text should not include file extensions or image dimensions. If the image conveys a story, mood, or important information, be sure to describe the image. Remove: <strong {C}>%(ERROR)</strong>. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    ALT_PLACEHOLDER: "Non-descript or placeholder alt text found. Replace the following alt text with something more meaningful. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    SUS_ALT: "Assistive technologies already indicate that this is an image, so &quot;<strong {C}>%(ERROR)</strong>&quot; may be redundant. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    LINK_IMAGE_NO_ALT_TEXT: "Image within link is marked as decorative and there is no link text. Please add alt text to the image that describes the destination of the link.",
    LINK_IMAGE_TEXT: "Image is marked as decorative, although the link is using the surrounding text as a descriptive label.",
    LINK_IMAGE_LONG_ALT: "Alt text description on a linked image is <strong>too long</strong>. The alt text on linked images should describe where the link takes you, not a literal description of the image. <strong>Consider using the title of the page it links to as the alt text.</strong> <hr> {L} {ALT} <strong {B}>%(altLength) Characters</strong> <strong {C}>%(ALT_TEXT)</strong>",
    LINK_IMAGE_ALT: "Image link contains alt text. Does the alt text describe where the link takes you? <strong>Consider using the title of the page it links to as the alt text.</strong> <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    LINK_IMAGE_ALT_AND_TEXT: "Image link contains <strong>both alt text and surrounding link text.</strong> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative. The surrounding link text should suffice. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Accessible Name</strong> {L} <strong {C}>%(TEXT)</strong>",
    IMAGE_FIGURE_DECORATIVE: 'Image is marked as <strong>decorative</strong> and will be ignored by assistive technology. <hr> Although a <strong>caption</strong> was provided, the image should also have alt text in most cases. <ul><li>The alt text should provide a concise description of what is in the image.</li><li>The caption should usually provide context to relate the image back to the surrounding content, or give attention to a particular piece of information.</li></ul> Learn more: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
    IMAGE_FIGURE_DUPLICATE_ALT: 'Do not use the exact same words for both the alt and caption text. Screen readers will announce the information twice.<ul><li>The alt text should provide a concise description of what is in the image.</li><li>The caption should usually provide context to relate the image back to the surrounding content, or give attention to a particular piece of information.</li></ul> Learn more: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
    IMAGE_DECORATIVE: "Image is marked as <strong>decorative</strong> and will be ignored by assistive technology. If the image conveys a story, mood, or important information, make sure to add alt text.",
    IMAGE_DECORATIVE_CAROUSEL: "Image is marked as <strong>decorative</strong>, but all images in a carousel or gallery should include descriptive alt text to ensure an equivalent experience for everyone.",
    IMAGE_ALT_TOO_LONG: "Alt text description is <strong>too long</strong>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). If this is a complex image or a graph, consider putting the long description of the image in the text below or an accordion component. <hr> {ALT} <strong {B}>%(altLength) Characters</strong> <strong {C}>%(ALT_TEXT)</strong>",
    IMAGE_PASS: "{ALT} %(ALT_TEXT)",
    LINK_ALT_MAYBE_BAD: "Image link has alt text that may not provide useful information or contains non-descript text. Ensure the alt text describes the destination of the link. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    ALT_MAYBE_BAD: "Alt text may not provide useful information or contains non-descript text. Improve the following alt text: <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",
    // Labels
    LABELS_MISSING_IMAGE_INPUT: "Image button is missing alt text. Please add alt text to provide an accessible name. For example: <em>Search</em> or <em>Submit</em>.",
    LABELS_INPUT_RESET: 'Reset buttons should not be used unless specifically needed because they are easy to activate by mistake. <hr> <strong>Tip!</strong> Learn why <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Reset and Cancel buttons pose usability issues.</a>',
    LABELS_ARIA_LABEL_INPUT: "Input has an accessible name, although please ensure there is a visible label too. <hr> <strong {B}>Accessible Name</strong> <strong {C}>%(TEXT)</strong>",
    LABELS_NO_FOR_ATTRIBUTE: "There is no label associated with this input. Add a <code>for</code> attribute to the label that matches the <code>id</code> of this input. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>",
    LABELS_MISSING_LABEL: "There is no label associated with this input. Please add an <code>id</code> to this input, and add a matching <code>for</code> attribute to the label.",
    LABELS_PLACEHOLDER: 'Disappearing placeholder text makes it hard for people to remember what information belongs in a field and to identify and correct validation issues. Instead, consider using a permanently visible hint before the form field. <hr> Learn more: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Placeholders in form fields are harmful.</a>',
    // Embedded content
    EMBED_VIDEO: "Please ensure <strong>all videos have closed captioning.</strong> Providing captions for all audio and video content is a mandatory Level A requirement. Captions support people who are D/deaf or hard-of-hearing.",
    EMBED_AUDIO: "Please ensure to provide a <strong>transcript for all podcasts.</strong> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel.",
    EMBED_DATA_VIZ: `Data visualization widgets like this are often problematic for people who use a keyboard or screen reader to navigate, and can present significant difficulties for people who have low vision or colorblindness. It's recommended to provide the same information in an alternative (text or table) format below the widget. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/images/complex">complex images.</a>`,
    EMBED_MISSING_TITLE: 'Embedded content requires an accessible name that describes its contents. Please provide a unique <code>title</code> or <code>aria-label</code> attribute on the <code>iframe</code> element. Learn more about <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
    EMBED_GENERAL: 'Unable to check embedded content. Please make sure that images have alt text, videos have captions, text has sufficient contrast, and interactive components are <a href="https://webaim.org/techniques/keyboard/">keyboard accessible.</a>',
    EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> with focusable elements should not have <code>tabindex="-1"</code>. The embedded content will not be keyboard accessible.',
    // Quality assurance
    QA_BAD_LINK: "Bad link found. Link appears to point to a development environment. <hr> {L} <strong {C}>%(LINK)</strong>",
    QA_STRONG_ITALICS: "Bold and italic tags have semantic meaning, and should <strong>not</strong> be used to highlight entire paragraphs. Bolded text should be used to provide strong <strong>emphasis</strong> on a word or phrase. Italics should be used to highlight proper names (i.e. book and article titles), foreign words, quotes. Long quotes should be formatted as a blockquote.",
    QA_PDF: 'Unable to check PDFs for accessibility. PDFs are considered web content and must be made accessible as well. PDFs often contain issues for people who use screen readers (missing structural tags or missing form field labels) and people who have low vision (text does not reflow when enlarged). <ul><li>If this is a form, consider using an accessible HTML form as an alternative.</li><li>If this is a document, consider converting it into a web page.</li></ul>Otherwise, please check <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF for accessibility in Acrobat DC.</a>',
    QA_DOCUMENT: 'Unable to check document for accessibility. Linked documents are considered web content and must be made accessible as well. Please manually review this document. <ul><li>Make your <a href="https://support.google.com/docs/answer/6199477?hl=en">Google Workspace document or presentation more accessible.</a></li><li>Make your <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office documents more accessible.</a></li></ul>',
    QA_BLOCKQUOTE: "Is this a heading? <strong {C}>%(TEXT)</strong> <hr> Blockquotes should be used for quotes only. If this is intended to be a heading, change this blockquote to a semantic heading (e.g. Heading 2 or Heading 3).",
    QA_FAKE_HEADING: "Is this a heading? <strong {C}>%(TEXT)</strong> <hr> A line of bold or large text might look like a heading, but someone using a screen reader cannot tell that it is important or jump to its content. Bold or large text should never replace semantic headings (Heading 2 to Heading 6).",
    QA_FAKE_LIST: 'Are you trying to create a list? Possible list item found: <strong {C}>%(firstPrefix)</strong> <hr> Make sure to use semantic lists by using the bullet or number formatting buttons instead. When using a semantic list, assistive technologies are able to convey information such as the total number of items and the relative position of each item in the list. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantic lists.</a>',
    QA_UPPERCASE: "Found all caps. Some screen readers may interpret all caps text as an acronym and will read each letter individually. Additionally, some people find all caps more difficult to read and it may give the appearance of SHOUTING.",
    QA_UNDERLINE: "Underlined text can be confused with links. Consider using a different style such as <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> or <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.",
    QA_SUBSCRIPT: "The subscript and superscript formatting options should only be used to change the position of text for typographical conventions or standards. It should <strong>not</strong> solely be used for presentation or appearance purposes. Formatting entire sentences poses readability issues. Appropriate use cases would include displaying exponents, ordinal numbers such as 4<sup>th</sup> instead of fourth, and chemical formulas (e.g. H<sub>2</sub>O).",
    QA_IN_PAGE_LINK: "Broken same-page link. The link target does not match any element on this page.",
    QA_NESTED_COMPONENTS: "Avoid nesting interactive layout components, such as placing accordions within other accordions, or placing tabs inside accordions and vice versa. This can complicate navigation, increase cognitive overload, and lead to people overlooking content.",
    QA_JUSTIFY: "Avoid using justified text, which aligns to both the left and right margins. This can be difficult for some people to read due to the uneven spaces between words. Use left-aligned text for better readability.",
    QA_SMALL_TEXT: "Small text is harder to read, particularly for those with low vision. To ensure better readability, avoid using font sizes smaller than the default.",
    // Shared
    ACC_NAME: "<strong {B}>Accessible Name</strong> %(TEXT)",
    ACC_NAME_TIP: `<hr><strong>Tip!</strong> The "accessible name" is the final label that gets communicated to people who use assistive technology. This helps them understand the link or button's purpose.`,
    HIDDEN_FOCUSABLE: 'Link or button has <code>aria-hidden=&quot;true&quot;</code> but is still keyboard focusable. If you are intending to hide a duplicate link or button, add <code>tabindex=&quot;-1&quot;</code> as well. Otherwise, <code>aria-hidden=&quot;true&quot;</code> should not be used on elements that can receive focus. <hr> Learn more about the <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden attribute.</a>',
    // Developer checks
    DUPLICATE_ID: "Found <strong>duplicate ID</strong>. Duplicate ID errors are known to cause problems for assistive technologies when they are trying to interact with content. Please remove or change the following ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>",
    UNCONTAINED_LI: "All <code>&lt;li&gt;</code> list items must be placed inside <code>&lt;ul&gt;</code> unordered or <code>&lt;ol&gt;</code> ordered elements. This structure helps screen readers announce the list and its items accurately.",
    TABINDEX_ATTR: "Element should not have a <code>tabindex</code> attribute greater than 0.",
    // Meta checks
    META_TITLE: 'Missing page title! Please provide a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">page title.</a>',
    META_SCALABLE: 'Remove the <code>user-scalable="no"</code> parameter in the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">viewport meta tag</a> in order to allow zooming.',
    META_MAX: 'Ensure the <code>maximum-scale</code> parameter in the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">viewport meta tag</a> is not less than 2.',
    META_LANG: 'Page language not declared! Please <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declare language on the HTML tag.</a>',
    META_REFRESH: "Page should not automatically refresh using a meta tag.",
    META_LANG_SUGGEST: "The following language code <code>%(CODE)</code> is not valid. Did you mean <code>%(CODE)</code>?",
    META_LANG_VALID: 'The page language code <code>%(CODE)</code> is not valid. Please <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declare a valid language on the HTML tag.</a>',
    // Buttons
    BTN_EMPTY: "Button is missing an accessible name that describes its purpose.",
    BTN_EMPTY_LABELLEDBY: "Button has an <code>aria-labelledby</code> value that is empty or does not match the <code>id</code> value of another element on the page.",
    BTN: "button",
    BTN_TIP: 'Learn how to make an <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">accessible button.</a>',
    BTN_ROLE_IN_NAME: 'Do not include the word "button" in the name of a button. Screen readers already convey the role of an element in addition to its name.',
    LABEL_IN_NAME: "The visible text for this element appears to be different than the accessible name, which may cause confusion for assistive technologies users. Please review: <hr> <strong {B}>Accessible Name</strong> <strong {C}>%(TEXT)</strong>",
    // Tables
    TABLES_MISSING_HEADINGS: 'Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/tables/">accessible tables.</a>',
    TABLES_SEMANTIC_HEADING: 'Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <strong>not</strong> in HTML tables. Indicate table headings using the <code>&lt;th&gt;</code> element instead. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/tables/">accessible tables.</a>',
    TABLES_EMPTY_HEADING: 'Empty table header found! Table headers should <strong>never</strong> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/tables/">accessible tables.</a>',
    // Contrast
    CONTRAST_NORMAL: "Normal-sized text should have at least a %(RATIO) ratio.",
    CONTRAST_LARGE: "Large-sized text should have at least a %(RATIO) ratio.",
    CONTRAST_ERROR: "Text does not have enough contrast with the background, making it harder to read.",
    CONTRAST_WARNING: "The contrast of this text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colors.",
    CONTRAST_ERROR_GRAPHIC: "Graphic does not have enough contrast with the background, making it harder to see.",
    CONTRAST_WARNING_GRAPHIC: "The contrast of this graphic is unknown and needs to be manually reviewed.",
    CONTRAST_TIP_GRAPHIC: "Graphics and user interface elements should have at least a 3:1 ratio.",
    CONTRAST_OPACITY: "Increase the opacity for better visibility.",
    CONTRAST_APCA: "This is not enough contrast for any size text. Consider using this color and text size combination?",
    CONTRAST_COLOR: "Consider using this color instead?",
    CONTRAST_SIZE: "Consider making the text size larger for this color combination?",
    CONTRAST_PLACEHOLDER: "Placeholder text within this input does not have enough contrast with the background, making it harder to read.",
    CONTRAST_PLACEHOLDER_UNSUPPORTED: "The contrast of this placeholder text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours.",
    CONTRAST_INPUT: "Text within this input does not have enough contrast with the background, making it harder to read.",
    CONTRAST: "Contrast",
    UNKNOWN: "Unknown",
    FG: "Foreground",
    BG: "Background",
    NO_SUGGESTION: "No accessible combination can be found by changing the text color. Try changing the background color.",
    // Language of parts
    PAGE_LANG_CONFIDENCE: 'More than half of the text on this page appears to be %(LIKELY_LANG), but the declared page language is %(PAGE_LANG). Consider updating the <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declared page language</a> to match the content.',
    LANG_OF_PARTS: "The page language was declared as %(PAGE_LANG), but this content appears to be %(LIKELY_LANG). Ensure the content is tagged appropriately.",
    LANG_MISMATCH: "This content appears to be %(DETECTED_LANG), however, it was tagged as %(WRONG_LANG).",
    LANG_OF_PARTS_ALT: "This alt text appears to be %(LIKELY_LANG), but the page language was declared as %(PAGE_LANG). Ensure the alt text is in the same language as the rest of the page. <hr> {ALT} <strong {C}>%(ALT)</strong>",
    LANG_TIP: '<hr><strong>Tip!</strong> Screen readers pronounce words using language tags. Pronouncing a language with a mismatched language pack produces unintelligible speech. Learn more about <a href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html">language of parts.</a>',
    LANG_UNSUPPORTED: "Language-related accessibility checks were skipped because automatic language detection isn’t supported in this browser."
  }
};
const testNames = {
  ALT_FILE_EXT: "This alt text is a filename, not a description",
  ALT_MAYBE_BAD: "This alt text cannot be pronounced by a screen reader",
  ALT_PLACEHOLDER: "This alt text does not describe its image",
  ALT_UNPRONOUNCEABLE: "This alt text is unpronounceable",
  BTN_EMPTY: "Button is missing an accessible label",
  BTN_EMPTY_LABELLEDBY: "Button has an invalid ARIA label",
  BTN_ROLE_IN_NAME: 'Button name repeats the word "button"',
  CONTRAST_ERROR: "Text does not have enough contrast to be easily legible",
  CONTRAST_ERROR_GRAPHIC: "Graphic or icon does not have enough contrast",
  CONTRAST_INPUT: "Input does not provide enough contrast to be easily legible",
  CONTRAST_PLACEHOLDER: "Placeholder text does not have enough contrast to be easily legible",
  CONTRAST_PLACEHOLDER_UNSUPPORTED: "Does this placeholder text have enough contrast?",
  CONTRAST_WARNING: "Does this text have enough contrast?",
  CONTRAST_WARNING_GRAPHIC: "Does this graphic or icon have enough contrast?",
  DUPLICATE_ID: "Duplicate ID attribute",
  DUPLICATE_TITLE: "This link has a tooltip with the same text as the link",
  EMBED_AUDIO: "Does this audio have a transcript?",
  EMBED_DATA_VIZ: "Is this visualization accessible?",
  EMBED_GENERAL: "Embedded iframes need manual checks",
  EMBED_MISSING_TITLE: 'Frame missing "title" attribute',
  EMBED_UNFOCUSABLE: 'Frame with tabindex="-1" will not be keyboard accessible.',
  EMBED_VIDEO: "Is this video accurately captioned?",
  HEADING_EMPTY: "This heading has no text",
  HEADING_EMPTY_WITH_IMAGE: "This image is used as a heading, so it needs alt text",
  HEADING_FIRST: "The first heading on this page is a subheading",
  HEADING_LONG: "Can this heading be shorter?",
  HEADING_MISSING_ONE: "This page is missing a Heading 1",
  HEADING_SKIPPED_LEVEL: "This heading is tagged at the wrong level",
  HIDDEN_FOCUSABLE: "This element cannot be described by screen readers",
  IMAGE_ALT_TOO_LONG: "Can this alt text be shorter?",
  IMAGE_DECORATIVE: "Is this image actually meaningless?",
  IMAGE_DECORATIVE_CAROUSEL: "Image in a carousel or gallery marked as decorative",
  IMAGE_FIGURE_DECORATIVE: "This captioned image has no alt text",
  IMAGE_FIGURE_DUPLICATE_ALT: "Alt text should not be the same as caption text",
  LABELS_ARIA_LABEL_INPUT: "Is there a visible label for this field?",
  LABELS_PLACEHOLDER: "Is this placeholder necessary?",
  LABELS_INPUT_RESET: "Is this reset button needed?",
  LABEL_IN_NAME: "Visible label does not match invisible label",
  LABELS_MISSING_LABEL: "This input is not connected to a label",
  LINK_ALT_FILE_EXT: "Alt text used as a link should not be a URL",
  LINK_ALT_MAYBE_BAD: "This linked alt cannot be pronounced by a screen reader",
  LINK_ALT_UNPRONOUNCEABLE: "Linked images need pronounceable alt text",
  LINK_CLICK_HERE: 'This link contains "click here"',
  LINK_DOI: "Link article titles, not DOI numbers",
  LINK_EMPTY: "This link contains no words",
  LINK_EMPTY_LABELLEDBY: 'Link with invalid "aria-labelledby" attribute',
  LINK_EMPTY_NO_LABEL: "This link needs a label",
  LINK_FILE_EXT: "Link points to a file without warning",
  LINK_IDENTICAL_NAME: "Links with the same text link to different pages",
  LINK_IMAGE_ALT: "Does this alt text describe the link or the image?",
  LINK_IMAGE_ALT_AND_TEXT: "Does this alt text make sense as part of this link?",
  LINK_IMAGE_LONG_ALT: "Can this linked alt text be shorter?",
  LINK_IMAGE_NO_ALT_TEXT: "This linked image needs alt text",
  LINK_IMAGE_TEXT: "Does this linked image need a description?",
  LINK_NEW_TAB: "Does this link open a new tab without warning?",
  LINK_PLACEHOLDER_ALT: "This linked image needs meaningful alt text",
  LINK_STOPWORD: "This link only contains generic words",
  LINK_STOPWORD_ARIA: "Meaningful link text only available to screen reader users",
  LINK_SUS_ALT: `Does this image's alt describe the image or the link?`,
  LINK_SYMBOLS: "Are the symbols or emoji in this link meaningful?",
  LINK_URL: "Link text should not be a URL",
  META_LANG: "Meta tag for page language missing",
  META_MAX: "Meta tag limits how much users can enlarge text",
  META_REFRESH: "Meta tag automatically refreshes page",
  META_SCALABLE: "Meta tag prevents users from enlarging text",
  META_TITLE: "Meta tag for page title missing",
  MISSING_ALT: "Invalid HTML: image has no alt attribute",
  MISSING_ALT_LINK: "Invalid HTML: linked image missing alt attribute",
  MISSING_ALT_LINK_HAS_TEXT: "Invalid HTML: image in link missing alt attribute",
  QA_BAD_LINK: "This link target may be invalid",
  QA_BLOCKQUOTE: "Should this quote be a heading?",
  QA_DOCUMENT: "Has this document been tagged for screen readers?",
  QA_FAKE_HEADING: "Should this bold text be a heading?",
  QA_FAKE_LIST: "Should this have list formatting?",
  QA_IN_PAGE_LINK: "Broken same-page link",
  QA_JUSTIFY: "Do not justify text",
  QA_NESTED_COMPONENTS: "Nested interactive layout components",
  QA_PDF: "Is there an alternative for this PDF?",
  QA_SMALL_TEXT: "Text is too small",
  QA_STRONG_ITALICS: "Large blocks of emphasized text are harder to read",
  QA_SUBSCRIPT: "Do not use sub/superscript as visual formatting",
  QA_UNDERLINE: "Only links should be underlined",
  QA_UPPERCASE: "Is this uppercase text needed?",
  SUS_ALT: "Are there redundant words in this alt text?",
  TABINDEX_ATTR: "Tabindex attribute on this element breaks the reading order",
  TABLES_EMPTY_HEADING: "This header cell needs text",
  TABLES_MISSING_HEADINGS: "This table needs a header row and/or column",
  TABLES_SEMANTIC_HEADING: "Content headings should not be used inside tables",
  UNCONTAINED_LI: "Invalid HTML list"
};
const why = {
  fix: `<strong class="badge">To fix</strong> `,
  buttons: `<div class="why"><p>Tip: the accessible name for a button should make it clear what it will do. Buttons that change on click should change their name as well:</p><ul><li>Changing labels:<br>"Play/Pause," "Show details/Hide details"</li><li>Changing <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#associated_aria_roles_states_and_properties">state attributes</a>:<br>"Play/Play, pressed," "Details, collapsed/Details, expanded."</li></ul><p>Just don't change both at once. Changing "Play" to "Pause, pressed" means the player is paused, not playing!</p></div>`,
  headings: `<div class="why"><p>Tip: headings and subheadings organize content into a nested outline. Screen reader users rely on this outline to understand and explore pages:</p><ul><li>Heading level 1: page titles<ul><li>Heading level 2: major topics<ul><li>Heading level 3: subtopics</li></ul></li></ul></li></ul></div>`,
  images: `<div class="why"><p>Tip: describe what an image means, not just what it contains, when writing an alt. Depending on context, a photo of a child kicking a ball might mean:</p><ul><li>They played in the pouring rain.</li><li>The new team uniforms have cool dragon logos.</li><li>She kicked the game-winning goal from the left sideline!</li></ul></div>`,
  links: `<div class="why"><p>Tip: readers skim by links and use in-page search to find links by name, so effective links are meaningful, unique and concise:</p><ul><li>Ideal: "Learn about <a href="https://webaim.org/techniques/hypertext/link_text">meaningful links</a>"</strong></li><li>Not unique: "Click <a href="https://webaim.org/techniques/hypertext/link_text">here</a> to learn about meaningful links."</li>
	<li>Not concise: "<a href="https://webaim.org/techniques/hypertext/link_text">Click here to learn more about meaningful links</a>"</li></ul></div>`,
  imageLinks: `<div class="why"><p>Tip: the purpose of alt text is to provide an alternative for what an image means, not what it contains. The meaning of a linked image is the link destination:<ul><li>"<em>A magnifying glass</em>" describes an image, not a link.</li><li>"<em>A magnifying glass search</em>" confusingly describes both.</li><li>"<em>Search</em>" describes the link destination accurately.</li></ul></p></div>`
};
const tips = {
  ALT_FILE_EXT: `<p><span style="display: none">%(alt)</span>Alt text: <strong>"%(ALT_TEXT)"</strong></p><p>Screen readers will dictate this url, often one letter at a time. This probably does not provide the same meaning as seeing the image.</p><p>${why.fix}Either add an empty alt (alt="") if this is a meaningless decoration that should be ignored by screen readers, or add descriptive alt text.</p>${why.images}`,
  ALT_MAYBE_BAD: `<p>Alt text: <strong>"%(alt)"</strong></p><p>${why.fix}Set this image's alternative text to a concise description of what this image means in this context.</p>${why.images}`,
  ALT_PLACEHOLDER: `<p>Alt text: <strong>"%(alt)"</strong></p><p>${why.fix}Set this image's alternative text to a concise description of what this image means in this context.</p>${why.images}`,
  //updated
  ALT_UNPRONOUNCEABLE: `<p>Alt text: "<strong>%(alt)</strong>"</p><p>This alt text only contains unpronounceable symbols and/or spaces. Screen readers will announce that an image is present and then pause awkwardly or say something unintelligible.</p><p>${why.fix}Add a descriptive alt, or provide a <em>completely</em> empty alt (alt="") if this is just an icon or spacer, and screen readers should ignore it.</p>${why.images}`,
  BTN_EMPTY: `<p>${why.fix}Use any valid method to tell screen readers what this button does, e.g. text, alt text on an icon, or a title attribute.</p>`,
  BTN_EMPTY_LABELLEDBY: `<p>This button has an <code>aria-labelledby</code> value that is empty or does not match the <code>ID</code> value of another element on the page.</p><p>${why.fix}Reconnect the ID to an element on the page, or remove this attribute and describe the button in another way.</p>`,
  BTN_TIP: `${why.buttons}`,
  CONTRAST_WARNING: "A background image or gradient means this checker is not sure what color is behind this text. Use the color picker below to check manually.",
  DUPLICATE_ID: `<p>IDs are being used on this page for labels or link targets, which means they must be unique.</p><p>${why.fix}Change this ID: <strong>#%(id)</strong></p><div class="why"><p>In most content management systems, this comes from a field called "name" or "id" in the element properties. In HTML, it is an attribute: <code>&lt;a id="MY-ID"&gt;</code></p></div>`,
  DUPLICATE_TITLE: `<p>${why.fix}Delete the link's text or <code>title</code> attribute.</p><div class="why"><p>Tip: <code>title</code> tooltips only appear when hovering with a mouse. They cannot be seen when navigating on a phone or with a keyboard, so many users will never see them. They should never contain unique or important information.</p></div>`,
  EMBED_AUDIO: `<p>If this audio contains speech, a <a href="https://www.w3.org/WAI/media/av/transcribing/">text alternative</a> must be provided on this page or linked.</p><p>Note that a human needs to proofread automatic, machine-generated captions and make sure speakers and meaningful sound effects are accurately identified.</p>`,
  EMBED_DATA_VIZ: `<p>Embedded visualization widgets are often difficult or impossible for assistive devices to operate, can be difficult to understand for readers with low vision or colorblindness, and may require extensive horizontal scrolling on phones.</p>	<p>${why.fix}Unless this particular embed has high visual contrast, can be operated by a keyboard <strong><em>and</em></strong> described by a screen reader, add an equivalent, alternate format such as a text description, data table or downloadable spreadsheet.</p>`,
  // Updated
  EMBED_GENERAL: 'Automated checkers cannot test content inside embeds. Make sure someone has checked that all images inside this embed have alt text, videos have captions, text has sufficient contrast, and links and buttons are <a href="https://webaim.org/techniques/keyboard/">keyboard accessible</a>.',
  // Updated
  EMBED_MISSING_TITLE: `<p>Embeds need an accessible name that describes their contents for screen readers.</p><p>${why.fix}Provide a unique <code>title</code> or <code>aria-label</code> attribute.</p>`,
  EMBED_UNFOCUSABLE: `This attribute tells keyboards and assistive devices to skip over the element. Unless the content of this iframe does not contain any links, buttons or form elements and cannot be scrolled, this attribute needs to be removed.`,
  EMBED_VIDEO: `<p>Videos must provide captions.</p><p>Note that a human needs to proofread automatic, machine-generated captions and make sure speakers and meaningful sound effects are accurately identified.</p><p>${why.fix}Add or proofread the captions.</p>`,
  // Updated
  HEADING_EMPTY: `<p>Empty headings create confusing gaps in the page outline.</p><p>${why.fix}Add text to this heading, or delete this empty line.</p>${why.headings}`,
  HEADING_EMPTY_WITH_IMAGE: `<p>Empty headings create confusing gaps in the page outline.</p><p>${why.fix}If this is not a heading, change its format from <strong {C}>Heading %(level)</strong> to <strong>Paragraph</strong>. Otherwise, put the meaning of the image in its alt.</p>${why.headings}`,
  HEADING_FIRST: `${why.fix}Make sure the page title is marked as a Heading 1 or Heading 2. ${why.headings}`,
  HEADING_LONG: `<p>${why.fix}Unless this is something of fixed length like the title of a published article, shorten it to help people skim.</p>${why.headings}`,
  HEADING_MISSING_ONE: `<p>${why.fix}Tag the page title as a level 1 heading, to mark the beginning of the document outline.</p>${why.headings}`,
  HEADING_SKIPPED_LEVEL: `<p>This heading skipped from <strong>level %(prevLevel) to level %(level)</strong>. From a screen reader, this sounds like content is missing.</p><p>${why.fix}Adjust levels to form an accurate outline, without gaps.</p>${why.headings}`,
  HIDDEN_FOCUSABLE: `<p>This interactive element has an <code>aria-hidden=&quot;true&quot;</code> attribute, but is still keyboard focusable.</p><p>${why.fix}If you are <strong>intending</strong> to hide this element from screen readers, you must also add <code>tabindex=&quot;-1&quot;</code>. Otherwise, remove the <code>aria-hidden=&quot;true&quot;</code> attribute.</p>`,
  IMAGE_ALT_TOO_LONG: `<p>%(altLength) character alt text: <strong class="ed11y-small">%(ALT_TEXT)</strong></p><p>${why.fix}Summarize, or move some of the description into a caption.</p><div class="why"><p>Tip: complicated images that convey more information than fit in a sentence usually need a <strong>visible</strong> caption or alternative that describes or interprets key details. It is OK to refer screen reader users to such text:</p><ul><li>"Poster for the dance on Friday; details follow in caption."</li> <li>"Chart showing issues are down 10% this year; details follow in table."</li></ul></div>`,
  IMAGE_DECORATIVE: `<p>This image has been hidden from screen readers using a blank alt. Only meaningless images like redundant icons and background textures should be hidden like this.</p><p>${why.fix}If this image adds value to the page, provide alt text.</p>${why.images}`,
  IMAGE_DECORATIVE_CAROUSEL: "Image is marked as <strong>decorative</strong>, but all images in a carousel or gallery should include descriptive alt text to ensure an equivalent experience for everyone.",
  IMAGE_FIGURE_DECORATIVE: `<p>This image will be ignored by assistive technology. Will its caption make sense without the image?</p><p>${why.fix}If the caption does not describe the image's visual meaning, provide alt text for whatever the caption does not describe.</p><div class="why"><p>Tip: images, alts and captions work together:</p><ul><li>Visible captions provide context and interpretation for an image.</li><li>Invisible alts describe an image for people who cannot see it, so they know what the caption is describing.</li></ul></div>`,
  IMAGE_FIGURE_DUPLICATE_ALT: `<p>${why.fix}Change the alt to describe the visual meaning of the image.</p><div class="why"><p>Tip: images, alts and captions work together:</p><ul><li>Visible captions provide context and interpretation for an image.</li><li>Invisible alts describe an image for people who cannot see it, so they know what the caption is discussing.</li></ul></div>`,
  LABELS_ARIA_LABEL_INPUT: '<p><strong {B}>Invisible field label:</strong> <strong {C}>%(TEXT)</strong></p><p>Check to make sure there is a visible field label, that it remains when there is text in this field, and it matches the invisible field name.</p><div class="why"><p>Labeling fields with only a title or placeholder means the label visually disappears as soon as someone starts writing. This makes it difficult for people to review input when there are several fields. It also makes it easy to forget to update the invisible field label.</p></div>',
  LABELS_INPUT_RESET: `<p>Reset buttons are easy to activate by mistake, causing data loss without an opportunity to cancel or undo.</p><p>${why.fix}Unless this is resetting a single field, consider removing it or providing a method to cancel before executing the action.</p>`,
  LABELS_MISSING_IMAGE_INPUT: "Image button is missing alt text. Please add alt text to provide an accessible name. For example: <em>Search</em> or <em>Submit</em>.",
  LABELS_MISSING_LABEL: `<p>${why.fix}Add an <code>id</code> to this input, and add a matching <code>for</code> attribute to the label.</p>`,
  LABELS_NO_FOR_ATTRIBUTE: "There is no label associated with this input. Add a <code>for</code> attribute to the label that matches the <code>id</code> of this input. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>",
  LABELS_PLACEHOLDER: `<p>Placeholder text disappears as soon as someone starts typing, and often either has too little contrast to be easily legible or enough contrast to be easily mistaken for content.</p><p>${why.fix}Make sure key information like the field label, help text and format instructions remain visible when there is content in this field, and consider dropping the placeholder altogether.</p>`,
  LABEL_IN_NAME: `<p>The visible text for this element appears to be different from the accessible name. This may cause confusion for screen reader users, and may break voice control.</p><p>${why.fix}Make sure the visible label starts with the text of the invisible label, and does not contain any additional meaningful information.</p><p><strong>Invisible Label:</strong> "%(TEXT)"</p>`,
  LINK_ALT_FILE_EXT: `<p><span style="display: none;">%(ALT)</span>Alt text: "<strong>%(alt)</strong>"</p><p>This alt text is probably a filename instead of a meaningful label for a link.</p><p>${why.fix}Set this image's alt text to the name of the link destination.</p><div class="why"> <p>The purpose of alt text is to provide an alternative for what an image means, not what it contains. The meaning of a linked image is the link destination:</p><ul><li>"Page with writing" describes the image, not a link.</li><li>"IMG_1234.jpg" is just a filename.</li><li>"<strong><em>Event registration form (.doc)</em></strong>" is a link destination.</li></ul></p></div>`,
  LINK_ALT_MAYBE_BAD: `<p>Alt text: "<strong>%(alt)</strong>."</p><p>${why.fix}Set this image's alt text to the name of the link destination.</p>${why.imageLinks}`,
  LINK_ALT_UNPRONOUNCEABLE: `<p>The alt text within this linked image only contains unpronounceable symbols and/or spaces: "%(ALT_TEXT)". Screen readers will announce there is a link, and then be unable to describe it.</p><p>${why.fix}Set this image's alt to the link's destination or purpose.</p>${why.imageLinks}`,
  LINK_CLICK_HERE: `The phrase "click" or "click here" is redundant, and takes focus away from the link's purpose.`,
  LINK_DOI: `<p>${why.fix}Link the article title and provide the DOI number as plain text, rather than linking the DOI number and leaving the article title as plain text.</p><div class="why"><p>The <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style guide</a> recommends using descriptive links on websites because users skim by links and use in-page search for links by name. Users are much more likely to notice articles of interest when the title is linked.</p><p>This also allows screen readers to describe each link meaningfully, rather than speaking a meaningless sequence of numbers.</p></div>`,
  LINK_EMPTY: `<p>${why.fix}Add text describing its destination, or delete it if is just a typo or linked space character.</p><div class="why"><p>Tip: screen readers cannot describe links that only contain spaces or symbols. They either fall silent ("Link, [...awkward pause where the link title should be...]"), or read the URL: Link, H-T-T-P-S forward-slash forward-slash example dot com."</p><p>Note that linked space characters can be hard to delete in some content editors; it is sometimes necessary to delete "across the gap" by removing and retyping the words on both sides of a linked space.</p></div>`,
  LINK_EMPTY_LABELLEDBY: `<p>This link has an <code>aria-labelledby</code> attribute that does not match the <code>ID</code> of any element on the page.</p><p>${why.fix}Provide a valid <code>ID</code>, or remove this attribute and describe the button in another way.</p>`,
  LINK_EMPTY_NO_LABEL: `<p>${why.fix}Add text describing its destination, or delete it if is just a typo like a linked space character.</p><div class="why"><p>Tip: screen readers cannot describe empty links. They either fall silent ("Link, [...awkward pause where the link title should be...]"), or read the URL: Link, H-T-T-P-S forward-slash forward-slash example dot com."</p><p>Note that linked space characters can be hard to delete in some content editors; it is sometimes necessary to delete "across the gap" by removing and retyping the words on both sides of a linked space.</p></div>`,
  LINK_FILE_EXT: `<p>This link points to a PDF or downloadable file (e.g. MP3, Zip, Word Doc) without warning.</p><p>${why.fix}Use text or an icon to <a href="https://itmaybejj.github.io/linkpurpose/">indicate the file type</a> within the link text.</p><p class="why">For large files, consider including the file size. For example: "Executive Report (PDF, 3MB)"</p>`,
  LINK_IDENTICAL_NAME: `<p>Link text: "<strong>%(TEXT)</strong>"</p><p>${why.fix}Reword links that go different places with the unique titles of their different destinations.</p>${why.links}`,
  LINK_IMAGE_ALT: `Make sure this alt describes the link destination:</p><p> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong></p>${why.imageLinks}`,
  LINK_IMAGE_ALT_AND_TEXT: `<p><span style="display: none;">%(ALT)</span>Link including alt text:<br>"<strong>%(LINK)</strong>"</p><p>${why.fix}Modify or remove the alt text if it is adding irrelevant or redundant information.</p>${why.imageLinks}`,
  LINK_IMAGE_LONG_ALT: `<p>%(altLength) character alt text: <strong class="ed11y-small">%(ALT_TEXT)</strong></p><p>${why.fix}Set this image's alt text to the title of the link destination.</p><div class="why"><p>Screen reader users often hear a list of links on the page out of context. Since the alt text of a linked image becomes the link's title in this list, it should <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">describe the link's destination</a>, not the image's contents.</p></div>`,
  LINK_IMAGE_NO_ALT_TEXT: `<p>When a link is wrapped around an image, the image's alt text <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">provides the link's title for screen readers</a>.</p><p>${why.fix}Set this image's alternative text the link's destination or purpose.</p>${why.imageLinks}`,
  LINK_IMAGE_TEXT: "Image is marked as decorative, although the link is using the surrounding text as a descriptive label.",
  LINK_NEW_TAB: `<p>${why.fix}Set this link to open in the same tab, or <a href="https://itmaybejj.github.io/linkpurpose/">warn users</a> first.</p><div class="why"><p>Readers can always <em>choose</em> to open a link in a new tab. When a link forces open a new tab, it is often confusing or annoying, especially for assistive device users who wonder why their browser's "back" button stopped working.</p><p>Note: forms are the exception. When the user is filling out a form, opening a link in the same window could cause them to lose their work, so links within forms usually open in new tabs.</p></div>`,
  LINK_PLACEHOLDER_ALT: `<p>This image's alt text is a placeholder: "<strong>%(alt)</strong>."</p><p>${why.fix}Set this image's alt text to the name of the link destination.</p>${why.imageLinks}`,
  LINK_STOPWORD: `<p>Link text: "<strong>%(text)</strong>"</p><p>${why.fix}Use link text that describes its destination.</p>${why.links}`,
  LINK_STOPWORD_ARIA: `<p>An accessible name was provided using ARIA, but the visible and searchable link text is generic: &quot;<strong {C}>%(ERROR)</strong>&quot;.</p><p>${why.fix}Write meaningful links for everyone, not just screen reader users, and make sure each element's visual <a href="https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html">label matches its accessible name</a>.</p>${why.links}`,
  LINK_SUS_ALT: `<p>This image's alt text includes the word "%(alt)," which usually means the alt is not describing the link destination.</p><p>Alt text: "<strong>%(ALT_TEXT)</strong>"</p><p>To fix: make sure this alt is the link's destination or purpose. <br></strong></p>${why.imageLinks}`,
  LINK_SYMBOLS: `<p>Symbol found: <strong {C}>%(ERROR)</strong></p>${why.fix}Avoid using symbols as calls to action within link text unless they are hidden from assistive technologies. Screen readers may read the symbols out loud, which can be confusing.</p>`,
  LINK_URL: `<p>${why.fix}Change this link to the title of its destination or purpose.</p><div class="why"><p>Readers skim for links by name. This is especially true of screen reader users, who navigate and search using a list of on-page links.</p><p>Linked URLs cannot be skimmed or found by in-page searches, so people are less likely to find them and less likely to click them.</p></div>`,
  META_LANG: `<p>${why.fix}Add a <a href="https://www.w3.org/International/questions/qa-html-language-declarations">language attribute on the page HTML tag</a>.</p><div class="why"><p>Tip: screen readers pronounce words using language tags. Pronouncing a language with the wrong language pack produces unintelligible speech. If your language is not tagged, the screen reader will either use the browser's default language or try to guess, with unpredictable results.</p></div>`,
  META_REFRESH: `<p>Pages should not automatically refresh using a meta tag. This interrupts the user without warning or the ability to prevent refresh, makes them lose their place while reading, and can reset form progress.</p><p>${why.fix}To refresh content on the same page, use AJAX to refresh sections in place without a reload, or use JavaScript to trigger the reload, so the user can be warned first and have the option to delay the event.</p>`,
  META_TITLE: `<p>${why.fix}Add a <code>&lt;title&gt</code> tag to the page's <code>&lt;head&gt;</code> element.</p><div class="why"><p>Many parts of the browsing experience depend on a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title">short and unique title tag</a>:</p><ul><li>Search engines use it to title results.</li><li>Browsers use it to title tabs.</li><li>Screen readers speak it when switching tabs.</li></ul><p>Without a page title, people see/hear a raw URL instead.</p></div>`,
  MISSING_ALT: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.</p>	<p>${why.fix}Either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>${why.images}`,
  MISSING_ALT_LINK: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time. This is especially a problem for linked images.</p><p>${why.fix}Add alt text that matches the link's destination.</p>${why.imageLinks} `,
  MISSING_ALT_LINK_HAS_TEXT: `<p>This image is part of a link with text. If the visible text is sufficient to describe the link, add an empty alt (alt="") to tell screen readers to ignore this image. Otherwise, add an alt that describes the link's destination or purpose.</p>${why.imageLinks}`,
  QA_BAD_LINK: `<p>Link appears to point to a development environment:<br>{L} <strong {C}>%(LINK)</strong></p><p>${why.fix}Change this to point a relative path (/folder) or the public URL.</p>`,
  QA_BLOCKQUOTE: `<p>Blockquote formatting tells screen readers that the text should be announced as a quotation. Short blockquotes are often actually headings.</p><p>${why.fix}If this is a heading and not a quotation, use heading formatting instead, so it appears in the page outline.</p>${why.headings}`,
  QA_DOCUMENT: `<p>Linked documents are considered web content and must be made accessible as well. Check that this document has tagged its headings, table headers and image alt text.</p><div class="why"><ul><li>Make your <a href="https://support.google.com/docs/answer/6199477?hl=en">Google Workspace document or presentation more accessible.</a></li><li>Make your <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office documents more accessible.</a></li></ul></div>`,
  // Updated
  QA_FAKE_HEADING: `<p>${why.fix}If this all-bold line of text introduces a topic, replace the visual-only bold formatting with a heading style.</p><div class="why"> <p>Tip: headings and subheadings create a navigable table of contents for assistive devices. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p><ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li></ul></li></ul> </div>`,
  QA_FAKE_LIST: `<p>${why.fix}If this "%(text)" is part of a list, replace it with list formatting.</p><div class="why"><p>List formatting is structural, both visually and navigationally:</p> <ol><li>Lists align their indents for easy reading.</li> <li>Lists are machine-readable. Screen readers orient their users by regularly announcing their position in the list ("item 3 of 7").</li></ol> <p>&nbsp;&nbsp;&nbsp;3. But a sentence with a number in front of it like this does not indent its second line on overflow, and is not included in the count of items for screen reader users.</p></div> `,
  QA_IN_PAGE_LINK: `<p>The link target does not match any elements on this page.</p><div class="why"><p>Note for developers: if this not a normal link, and the link target is a placeholder for a JavaScript event, make sure to test that it works when clicked with a keyboard before adding this to the checker ignore list.</p></div>`,
  QA_JUSTIFY: `<p>Justified text inserts extra spaces to align paragraphs to both the left and right margins. The irregular gaps from line to line make the text more difficult to read for many people.</p><p>${why.fix}Use left-aligned text.</p>`,
  QA_NESTED_COMPONENTS: "Avoid nesting interactive layout components, such as placing accordions within other accordions, or placing tabs inside accordions and vice versa. This can complicate navigation, increase cognitive overload, and lead to people overlooking content.",
  QA_PDF: `<p>${why.fix}Do one of the following:</p><ul><li>Link to a Web page instead,</li><li><em>Also</em> link to a Web page or editable document, so this PDF is only the "printable" option, or</li><li>At a minumum make sure this PDF readable with screen readers by <a href='https://webaim.org/techniques/acrobat/' target='_blank'>manually checking that it has been tagged</a> with headings, column reading order, table headers, and alt text.</li>	</ul>	<div class="why"><p>Mobile and assistive device users almost universally prefer Web pages to PDFs. PDFs do not reflow for mobile devices, and are often missing tags that must be present to navigate their text with screen readers.</p></div>`,
  // Updated
  QA_SMALL_TEXT: "Small text is harder to read, particularly for those with low vision. To ensure better readability, avoid using font sizes smaller than the default.",
  QA_STRONG_ITALICS: `<p>${why.fix}Reserve bold and italic for key words and phrases.</p><div class="why"><p>Note: if this is a quotation, the blockquote tag can be used to set it apart.</div>`,
  QA_SUBSCRIPT: `Subscript and superscript formatting makes text too small to be easily read for many people. It should only be used for individual words or phrases, such as ordinal numbers (4<sup>th</sup>), chemical formulas (H<sub>2</sub>O) and references to footnotes.`,
  QA_UNDERLINE: `<p>Underlined text on the Web indicates a link, not emphasized text. Users will think they can click this.</p><p>${why.fix} Use <strong>bold</strong> or <em>italic</em> for emphasis, and tag text as headings to mark topic changes.</p><div class="why"><p>Note: screen readers do not announce visual-only formatting like underlines. Only headings add text to the page outline.</p></div>`,
  QA_UPPERCASE: `<p>LARGE BLOCKS OF UPPERCASE TEXT ARE MORE DIFFICULT TO READ, AND ARE OFTEN INTERPRETED AS SHOUTING.</p><p>${why.fix}Only emphasize a few words at a time, preferably via bold formatting rather than caps lock.</p><div class="why"><p>Note: screen readers do not announce visual only formatting like bold text. Use a heading style instead if this emphasized text introduces a topic change or critically important content.</p></div>`,
  SUS_ALT: `<p>This image's alt text includes the word "%(alt)," which is probably redundant.</p><p>Alt text: "<strong>%(ALT_TEXT)</strong>"</p><p><strong class="badge">To fix</strong> Reword the alt to briefly convey what the image means.</p><div class="why"><p>Tip: screen readers announce they are describing an image when reading alt text, so phrases like "image of" and "photo of" are usually redundant; the screen reader user hears <em>"Image of something, Image."</em></p><p>Note that this is OK if the words refer to content inside the image:</p><ul><li>Not redundant: "<em>A photo in</em> a photo album being shown to the class."</li><li>Redundant: "<em>Photo of</em> a photo in a photo album being show to the class."</li></ul></div>`,
  TABINDEX_ATTR: `<p>${why.fix}Never use tabindex values greater than "0" (the default order). Change the order of elements in the HTML instead, so tab order and reading order stay the same.</p><div class="why"><p>Tip: by default, the visual order, the order keyboards tab through elements, and the order screen readers announce elements are all the same.</p><p>Assigning a positive tabindex to an element moves it to the beginning of the tab order, <strong>but not the visual or reading order</strong>. Assistive device users have to look for overridden buttons and form elements at opposite ends of the page from their labels and instructions.</p></div>`,
  TABLES_EMPTY_HEADING: `<p>${why.fix}Make sure each header cell contains text.</p><div class="why"><p>Tip: screen readers use headers to orient users as they explore a table. The relevant header repeats as the cursor enters each column or row.</p></div>`,
  TABLES_MISSING_HEADINGS: `<p>${why.fix}Edit the table's properties and specify whether headers have been placed in the first row, column or both.</p><div class="why"> <p>Tip: screen readers use headers to orient users as they explore a table. The relevant header repeats as the cursor enters each column or row.</p><p>If this table has no headers because it is only being used for visual layout, remove the table formatting and use visual-only column formatting instead.</p></div> `,
  TABLES_SEMANTIC_HEADING: `<p>${why.fix}Remove this heading (h2, h3) formatting. Provide header rows and columns instead. If you need multiple header rows, break this into more than one table.</p><div class="why"> <p>Tip: Table headers are directional: one row or column. Content headings label all subsequent text, even in unrelated columns:</p><table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">A <strong>table header</strong> in cell 2 labels cell B. <br><br> A <strong>content heading</strong> in cell 2 labels cells 3, A, B and C, as well as this text and this tooltip's footer.</td></tr> <tr><td>A</td><td>B</td><td>C</td></table> </div>`
};
const interfaceStrings = {
  ALERT_CLOSE: "Close",
  ALT: "Alt Text: ",
  CONSOLE_ERROR: 'There is an issue with the accessibility checker on this page. Please %(link)<a href="%(link)">report it on GitHub</a>.',
  DECORATIVE: "Marked decorative",
  DISMISS: "Ignore",
  DISMISS_ALL: "On this page: ignore",
  edit_page: "Edit page",
  edit_layout: "Edit layout",
  edit_term: "Edit term",
  edit_user: "Edit user",
  IMAGES: "Alt text",
  MAIN_TOGGLE_LABEL: "Toggle accessibility tools",
  MISSING: "(missing!)",
  NOT_VISIBLE: "Note: this content may not be visible. Look for it inside the outlined container.",
  NO_IMAGES: "No images found.",
  OUTLINE: "Headings",
  PANEL_DISMISS_BUTTON: `Show %(dismissCount) hidden alerts`,
  PANEL_HEADING: "Show visualizers",
  SKIP_TO_ISSUE: "Show alert",
  WARNING: "Manual check",
  WARNINGS: "manual checks needed",
  buttonFirstContent: "Show first alert",
  buttonHideHiddenAlert: "Hide hidden alert",
  buttonHideHiddenAlerts: `Hide %(count) hidden alerts`,
  buttonShowHiddenAlert: "Show hidden alert",
  buttonToolsActive: "Hide visualizers",
  dismissActions: `Similar alerts`,
  dismissHideTitle: "Only hides alert for you",
  dismissOkAllButton: "On this page: mark OK",
  dismissOkButtonContent: "Mark OK",
  dismissOkTitle: "Hides alert for all editors",
  dismissOnSite: "On all pages: mark OK",
  dismissalsHeader: "Not going to fix this?",
  errorOutlinePrefixHeadingEmpty: "(empty heading)",
  errorOutlinePrefixHeadingIsLong: "(flagged for length)",
  errorOutlinePrefixSkippedLevel: "(flagged for skipped level)",
  issueContent: "Content issue",
  issueDeveloper: "Developer issue",
  issueTemplate: "Template issue",
  main_toggle_hide: "Hide accessibility tools",
  main_toggle_hide_alerts: "Hide accessibility alerts",
  main_toggle_show: "Show accessibility tools",
  main_toggle_show_alerts: "Show accessibility alerts",
  MISSING_ROOT: `Editoria11y did not find any elements that matched the check area configuration: <code>%(root)</code>`,
  panelCheckAltText: '<p class="ed11y-small">Check that each image describes what it means in context, and that there are no images of text.</p>',
  panelCheckOutline: '<p class="ed11y-small">This shows the heading outline. Check that it matches how the content is organized visually.</p>',
  PANEL_HEADING_MISSING_ONE: "Missing Heading 1.",
  PANEL_NO_HEADINGS: "No headings found.",
  reportsLink: "Open site reports",
  toggleDisabled: "No content available for Editoria11y to check.",
  transferFocus: "Edit this content",
  unDismissHideButton: "Restore this ignored alert",
  unDismissNotePermissions: "This check has been hidden by an administrator",
  unDismissOKButton: "Restore this alert marked as OK"
};
const englishOverrides = {
  // @todo: Outline error explanations currently hidden.
  /*errorOutlinePrefixSkippedLevel: '(flagged for skipped level)',
  errorOutlinePrefixHeadingEmpty: '(empty heading)',
  errorOutlinePrefixHeadingIsLong: '(flagged for length)',*/
  SUS_ALT_STOPWORDS: [
    "image",
    "graphic",
    "picture",
    "photo",
    "thumbnail",
    "icon",
    "placeholder",
    "spacer",
    "tbd",
    "todo",
    "copyright",
    "courtesy of",
    "alt text"
  ],
  // todo Ed11y test use to catch these at the end as well as the beginning.
  extraPlaceholderStopWords: "placeholder, alt text, tbd, todo, to do",
  // updated
  // please add, please insert, add alt text
  // @todo: photo by, photograph by, courtesy of as separate test.
  // Strings used in tests ==============================
  // @todo after merge: discuss:
  // badEndingForAlt: ['photo', 'image', 'photograph', 'picture'],
  // @todo after merge Compare Sa11y test.
  //linksUrls: ['http:/', 'https:/', '.asp', '.htm', '.php', '.edu/', '.com/'],
  // @todo after merge Compare Sa11y test performance
  //linksMeaningless: /(learn|to|more|now|this|page|link|site|website|check|out|view|our|read|download|form|here|click|"|'|\?|\.|-|,|:|>|<|\s)+/g,
  //linkStringsNewWindows: /window|\stab|download/g,
  NEW_WINDOW_PHRASES: [
    "external",
    "download",
    "new tab",
    "new window",
    "pop-up",
    "pop up",
    "opens new tab",
    "opens new window"
  ]
};
const lang = {
  strings: Object.assign(Sa11yStrings.strings, interfaceStrings, tips, englishOverrides),
  testNames
};
const ed11yDefaultOptions = {
  // Default options.
  // Sa11y properties =======================
  // Target area to check
  checkRoot: false,
  // Editoria11y uses "checkRoots" below.
  fixedRoots: false,
  // Array of specific nodes, overrides previous.
  // Exclusions
  containerIgnore: "",
  contrastIgnore: ".sr-only",
  outlineIgnore: "",
  headerIgnore: "",
  headerIgnoreSpan: "ed11y-element-heading-label, .ed11y-wrapper",
  headerIgnoreStrings: "",
  imageIgnore: 'img[aria-hidden="true"], [aria-hidden="true"] img, img[role="presentation"], a[href][aria-label] img, button[aria-label] img, a[href][aria-labelledby] img, button[aria-labelledby] img',
  ignoreByTest: {},
  linkIgnore: '[aria-hidden="true"][tabindex="-1"]',
  linkIgnoreSpan: ".ed11y-element",
  linkIgnoreStrings: [],
  // @todo cms/documentation this changed to array
  ignoreContentOutsideRoots: false,
  // @todo cms/documentation was headingsOnlyFromCheckRoots
  // Control panel settings
  // aboutContent: '', // @todo implement?
  panelPosition: "right",
  // @todo use?
  // showMovePanelToggle: true, // @todo implement?
  // checkAllHideToggles: false, // @todo implement?
  developerChecksOnByDefault: false,
  // @todo cms use?
  // Page outline
  showHinPageOutline: false,
  showTitleInPageOutline: false,
  // Image outline
  showImageOutline: true,
  editImageURLofCMS: "",
  relativePathImageSRC: "",
  relativePathImageID: "",
  ignoreEditImageURL: [],
  ignoreEditImageClass: [],
  // Other features
  delayCheck: 0,
  delayCustomCheck: 500,
  detectSPArouting: false,
  doNotRun: "",
  headless: false,
  selectorPath: false,
  shadowComponents: "",
  autoDetectShadowComponents: false,
  // Annotations
  showGoodImageButton: true,
  showGoodLinkButton: true,
  dismissAnnotations: true,
  dismissAll: true,
  ignoreHiddenOverflow: "",
  insertAnnotationBefore: "",
  // Readability
  readabilityPlugin: false,
  readabilityRoot: "main",
  readabilityIgnore: "",
  // Contrast
  contrastPlugin: false,
  contrastAlgorithm: "AA",
  // Other plugins
  customChecks: false,
  linksAdvancedPlugin: true,
  formLabelsPlugin: true,
  embeddedContentPlugin: true,
  developerPlugin: false,
  // @todo CMS enable following
  externalDeveloperChecks: false,
  colourFilterPlugin: false,
  exportResultsPlugin: false,
  // Options for accName computation: Ignore ARIA on these elements.
  ignoreAriaOnElements: false,
  // e.g. 'h1,h2,h3,h4,h5,h6'
  ignoreTextInElements: false,
  // e.g. '.inner-node-hidden-in-CSS'
  // Shared properties for some checks
  susAltStopWords: "",
  linkStopWords: "",
  extraPlaceholderStopWords: "",
  imageWithinLightbox: "",
  initialHeadingLevel: [],
  // @todo document change?
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
  splitConfiguration: false,
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
  alertMode: "userPreference",
  // 'headless': do not draw run
  // 'userPreference: respect user preference.
  // 'polite': open for new issues.
  // 'assertive': open for any issues.
  // 'active': always open.
  // CMS integrations can switch between polite & headless at runtime.
  inlineAlerts: true,
  watchForChanges: "checkRoots",
  // 'document', false, 'checkRoots';
  // This covers CKEditor, TinyMCE and Gutenberg. Being less specific may help performance.
  editableContent: '[contenteditable="true"]:not(.gutenberg__editor [contenteditable]), .gutenberg__editor .run-run-skeleton__content',
  // Dismissed alerts
  currentPage: window.location.pathname,
  allowHide: true,
  // Enables end-user ignore button
  allowOK: true,
  // Enables end-user mark OK button
  syncedDismissals: false,
  // Provide empty or populated object {} to enable sync functions
  pepper: window.location.hostname,
  // Provide a string to seed hashes.
  reportsURL: false,
  // Provides a link to site-wide reports
  showDismissed: false,
  // start panel with dismissed items visible; used when coming directly from a dashboard
  // Hide all alerts if these elements are absent, e.g., ".edit-button"
  // Used to not heckle editors on pages they cannot fix; they can still click a "show hidden" button to check manually.
  ignoreAllIfAbsent: false,
  ignoreAllIfPresent: false,
  // @todo CMS test.
  // Disable checker altogether if these elements are present or absent, e.g., ".live-editing-toolbar, .frontpage" or ".editable-content"
  preventCheckingIfPresent: false,
  preventCheckingIfAbsent: false,
  // Disable the "is this element visible" check on themes that have 0-height elements.
  checkVisible: true,
  // Selector list for elements where the tip opening JS should wait for your theme to modify the DOM or CSS before opening the tip.
  hiddenHandlers: "",
  panelOffsetX: "25px",
  panelOffsetY: "25px",
  panelNoCover: "",
  // select other buttons to avoid.
  panelAttachTo: document.body,
  // Selector list for elements that hide overflow, truncating buttons.
  constrainButtons: false,
  // Interface
  theme: "sleekTheme",
  sleekTheme: {
    bg: "#eff2ff",
    bgHighlight: "#7b1919",
    bgOutlines: "#276499",
    text: "#20160c",
    primary: "#276499",
    primaryText: "#eff2ff",
    button: "transparent",
    // deprecate?
    panelBar: "#1e517c",
    panelBarText: "#fffdf7",
    panelBarShadow: "0 0 0 1px #276499",
    activeTab: "#276499",
    activeTabText: "#fffffe",
    focusRing: "#007aff",
    outlineWidth: "1px",
    borderRadius: "3px",
    ok: "#1f5381",
    warning: "rgb(250, 216, 89)",
    warningText: "#20160c",
    alert: "rgb(184, 5, 25)",
    alertText: "#f4f7ff"
  },
  darkTheme: {
    bg: "#0a2051",
    bgHighlight: "#7b1919",
    bgOutlines: "#f4f7ff",
    text: "#f4f7ff",
    primary: "#cbd8f3",
    // '#3052a0',
    primaryText: "#00081d",
    // '#f4f7ff',
    button: "transparent",
    panelBar: "#3052a0",
    panelBarText: "#f4f7ff",
    panelBarShadow: "inset 0 0 1px, 0 0 0 1px #0a2051",
    activeTab: "#0a2051",
    activeTabText: "#fffffe",
    focusRing: "cyan",
    outlineWidth: "2px",
    borderRadius: "3px",
    ok: "#0a307a",
    warning: "rgb(250, 216, 89)",
    warningText: "#20160c",
    alert: "rgb(184, 5, 25)",
    alertText: "#f4f7ff"
  },
  lightTheme: {
    bg: "#fffffe",
    bgHighlight: "#7b1919",
    bgOutlines: "#0a307a",
    text: "#20160c",
    primary: "#0a307a",
    primaryText: "#fffdf7",
    panelBar: "#0a307a",
    panelBarText: "#f4f7ff",
    panelBarShadow: "0 0 0 1px #0a307a",
    button: "transparent",
    activeTab: "#b9c0cf",
    activeTabText: "#20160c",
    focusRing: "#007aff",
    outlineWidth: "0px",
    borderRadius: "3px",
    ok: "#0a307a",
    warning: "rgb(250, 216, 89)",
    warningText: "#20160c",
    alert: "rgb(184, 5, 25)",
    alertText: "#f4f7ff"
  },
  // Base z-index for buttons.
  // 1299 maximizes TinyMCE compatibility.
  buttonZIndex: 1299,
  // CSS overrides and additions.
  baseFontSize: "clamp(14px, 1.6vw, 16px)",
  baseFontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  linksUrls: false,
  // get from language pack
  linksMeaningless: false,
  // get from language pack
  // @todo cms/document wp this was a string.
  altPlaceholder: [],
  // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'
  editLinks: false,
  // Add links to edit content in tooltips.
  userPrefersShut: localStorage.getItem("editoria11yShow") === "0",
  customTests: 0,
  // Sa11y checks ==================
  checks: {
    // Sa11y: Heading checks
    HEADING_SKIPPED_LEVEL: true,
    HEADING_EMPTY_WITH_IMAGE: true,
    HEADING_EMPTY: true,
    HEADING_FIRST: true,
    // @todo CMS
    HEADING_LONG: {
      maxLength: 170
    },
    HEADING_MISSING_ONE: false,
    // Sa11y: Image checks
    MISSING_ALT_LINK: true,
    MISSING_ALT_LINK_HAS_TEXT: true,
    MISSING_ALT: true,
    IMAGE_DECORATIVE_CAROUSEL: false,
    // Todo consider.
    LINK_IMAGE_NO_ALT_TEXT: {
      type: "error"
    },
    LINK_IMAGE_TEXT: false,
    // Not interested.
    IMAGE_FIGURE_DECORATIVE: {
      type: "warning"
    },
    // New
    IMAGE_DECORATIVE: {
      type: "warning"
    },
    LINK_ALT_FILE_EXT: true,
    ALT_FILE_EXT: true,
    LINK_PLACEHOLDER_ALT: true,
    ALT_PLACEHOLDER: true,
    LINK_SUS_ALT: true,
    SUS_ALT: true,
    LINK_IMAGE_LONG_ALT: {
      maxLength: 160
    },
    IMAGE_ALT_TOO_LONG: {
      maxLength: 160
    },
    LINK_IMAGE_ALT: false,
    // Not interested.
    LINK_IMAGE_ALT_AND_TEXT: true,
    IMAGE_FIGURE_DUPLICATE_ALT: true,
    IMAGE_PASS: false,
    // Could be used to visualize alt content.
    ALT_UNPRONOUNCEABLE: true,
    LINK_ALT_UNPRONOUNCEABLE: true,
    ALT_MAYBE_BAD: {
      minLength: 15
    },
    LINK_ALT_MAYBE_BAD: {
      minLength: 15
    },
    // Sa11y: Link checks
    DUPLICATE_TITLE: false,
    // Todo pro.
    LINK_EMPTY_LABELLEDBY: false,
    // Todo pro.
    LINK_EMPTY_NO_LABEL: true,
    LINK_STOPWORD: {
      type: "warning"
    },
    LINK_STOPWORD_ARIA: false,
    // Todo pro.
    LINK_SYMBOLS: true,
    LINK_CLICK_HERE: false,
    LINK_DOI: true,
    // Todo consider.
    LINK_URL: {
      maxLength: 40
    },
    LINK_LABEL: {
      dismissAll: true
    },
    LINK_EMPTY: true,
    LINK_IDENTICAL_NAME: false,
    // Todo pro.
    LINK_NEW_TAB: {
      dismissAll: true
    },
    LINK_FILE_EXT: false,
    // Todo test vs LinkPurpose.
    // Form label checks module not yet enabled.
    // Todo pro.
    LABELS_MISSING_IMAGE_INPUT: false,
    LABELS_INPUT_RESET: false,
    LABELS_MISSING_LABEL: false,
    LABELS_ARIA_LABEL_INPUT: false,
    LABELS_NO_FOR_ATTRIBUTE: false,
    LABELS_PLACEHOLDER: false,
    // Embedded content checks
    EMBED_AUDIO: {
      sources: ""
    },
    EMBED_VIDEO: {
      sources: ""
    },
    EMBED_DATA_VIZ: {
      sources: ""
    },
    EMBED_UNFOCUSABLE: true,
    EMBED_MISSING_TITLE: {
      type: "warning"
    },
    EMBED_GENERAL: true,
    // Quality assurance checks
    QA_BAD_LINK: {
      sources: ""
    },
    QA_STRONG_ITALICS: true,
    QA_IN_PAGE_LINK: true,
    QA_DOCUMENT: false,
    // Todo CMS consider.
    QA_PDF: {
      sources: "a[href$='.pdf'], a[href*='.pdf?']",
      dismissAll: true
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
    QA_NESTED_COMPONENTS: false,
    // Todo pro.
    QA_JUSTIFY: true,
    // Todo pro.
    QA_SMALL_TEXT: false,
    // Todo pro.
    // Sa11y: Meta checks
    META_LANG: false,
    // Todo pro.
    META_SCALABLE: false,
    // Not interested.
    META_MAX: false,
    // Not interested.
    META_REFRESH: false,
    // Todo pro.
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
    CONTRAST_WARNING: false,
    // dismissAll
    CONTRAST_INPUT: false,
    CONTRAST_ERROR: false,
    CONTRAST_PLACEHOLDER: false,
    CONTRAST_PLACEHOLDER_UNSUPPORTED: false,
    // Show error on unsupported color spaces.
    CONTRAST_ERROR_GRAPHIC: false,
    CONTRAST_WARNING_GRAPHIC: false,
    // Don't enable.
    CONTRAST_UNSUPPORTED: false
    // Show error on unsupported color spaces.
    // @todo remove from CMS and deprecate.
    // EMBED_CUSTOM: { sources: '#embed', },
  }
};
const preProcessOptions = async (userOptions) => {
  smush(State.option, ed11yDefaultOptions, ["checks"]);
  smush(State.option, userOptions, ["checks"]);
  Object.assign(State.option.checks, ed11yDefaultOptions.checks, userOptions.checks);
  if (!userOptions.lang) {
    State.option.lang = lang;
  }
  Lang.addI18n(State.option.lang.strings);
  Lang.testNames = State.option.lang.testNames;
  const titles = Object.entries(Lang.testNames);
  for (let i = 0; i < titles.length; i++) {
    Lang.langStrings[titles[i][0]] = `<div class="title" tabindex="-1">${Lang.testNames[`${titles[i][0]}`]}</div>${Lang.langStrings[titles[i][0]]}`;
  }
  UI.english = Lang.langStrings.LANG_CODE.startsWith("en");
  if (UI.english) {
    State.option.extraPlaceholderStopWords = userOptions.extraPlaceholderStopWords ? userOptions.extraPlaceholderStopWords.Lang.langStrings.extraPlaceholderStopWords : Lang.langStrings.extraPlaceholderStopWords;
  }
  if (State.option.fixedRoots) {
    State.option.checkRoot = State.option.fixedRoots;
  } else if (!State.option.checkRoot) {
    State.option.checkRoot = document.querySelector("main") !== null ? "main" : "body";
  }
  if (userOptions.splitConfiguration) {
    UI.splitConfiguration.active = true;
    UI.splitConfiguration.showDev = userOptions.splitConfiguration.showDev;
    UI.splitConfiguration.devOptions = userOptions.splitConfiguration.devOptions;
    UI.splitConfiguration.contentOptions = {};
    Object.keys(UI.splitConfiguration.devOptions).forEach((key) => {
      UI.splitConfiguration.contentOptions[key] = userOptions[key];
    });
    UI.splitConfiguration.devChecks = new Set(userOptions.splitConfiguration.devChecks);
    Object.assign(State.option, UI.splitConfiguration.devOptions);
  }
  State.option.headless = userOptions.alertMode === "headless";
  if (userOptions.panelAttachTo) {
    UI.panelAttachTo = userOptions.panelAttachTo;
  }
  UI.theme.push = State.option[State.option.theme];
  UI.theme.baseFontSize = State.option.baseFontSize;
  UI.theme.buttonZIndex = State.option.buttonZIndex;
  UI.theme.baseFontFamily = State.option.baseFontFamily;
  UI.inlineAlerts = !document.querySelector("[contenteditable]") && State.option.inlineAlerts;
  UI.showDismissed = State.option.showDismissed;
  let cssUrls = userOptions.cssUrls;
  if (!cssUrls) {
    const cssLink = document.querySelector(
      'link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]'
    );
    if (cssLink) {
      cssUrls = [cssLink.getAttribute("href")];
    } else {
      cssUrls = [
        `https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${UI.version}/dist/editoria11y.min.css`
      ];
      console.warn("Editoria11y CSS file parameter is missing; attempting to load from CDN.");
    }
  }
  const cssBundle = document.createElement("div");
  cssBundle.classList.add("ed11y-style");
  cssBundle.setAttribute("hidden", "");
  cssUrls?.forEach((sheet) => {
    const cssLink = document.createElement("link");
    cssLink.setAttribute("rel", "stylesheet");
    cssLink.setAttribute("media", "all");
    if (sheet.indexOf("?") < 0) {
      sheet = `${sheet}?ver=${UI.version}`;
    }
    cssLink.setAttribute("href", sheet);
    cssBundle.append(cssLink);
  });
  UI.attachCSS = (appendTo) => {
    const link = cssBundle.cloneNode(true);
    appendTo.appendChild(link);
  };
};
const postProcessOptions = (userOptions) => {
  Constants.Exclusions.Sa11yElements = [".ed11y-element", "ed11y-element-heading-label"];
  Constants.Exclusions.Container = ["style", "script", "noscript"];
  if (State.option.containerIgnore) {
    const containerSelectors = State.option.containerIgnore.split(",").map((item) => item.trim());
    Constants.Exclusions.Container = Constants.Exclusions.Container.concat(
      containerSelectors.flatMap((item) => [`${item} *`, item])
    );
  }
  if (userOptions.ignoreElements) {
    const elementSelectors = userOptions.ignoreElements.split(",").map((item) => item.trim());
    Constants.Exclusions.Container = Constants.Exclusions.Container.concat(elementSelectors);
  }
  Constants.Panel.readabilityInfo = document.createElement("div");
  Constants.Panel.readabilityDetails = document.createElement("div");
  Object.assign(UI.theme, State.option[State.option.theme]);
  UI.theme.baseFontSize = State.option.baseFontSize;
  UI.theme.buttonZIndex = State.option.buttonZIndex;
  UI.theme.baseFontFamily = State.option.baseFontFamily;
  if (!State.option.linkStringsNewWindows) {
    State.option.linkStringsNewWindows = Lang._("linkStringsNewWindows");
  }
  if (userOptions.documentLinks) {
    Constants.Global.documentSources = userOptions.documentLinks;
  }
  const localResultCount = store.getItem("editoria11yResultCount");
  UI.seen = localResultCount && localResultCount !== "undefined" ? JSON.parse(localResultCount) : {};
  if (State.option.syncedDismissals === false) {
    UI.dismissedAlerts = localStorage.getItem("ed11ydismissed");
    UI.dismissedAlerts = UI.dismissedAlerts ? JSON.parse(UI.dismissedAlerts) : {};
  } else {
    UI.dismissedAlerts = {};
    UI.dismissedAlerts[State.option.currentPage] = State.option.syncedDismissals;
  }
};
async function initialize(userOptions) {
  if (UI.once) {
    console.error("double init");
    return;
  }
  UI.once = true;
  await preProcessOptions(userOptions).then();
  Constants.initializeGlobal();
  Constants.initializeReadability();
  Constants.initializeExclusions();
  postProcessOptions(userOptions);
  customElements.define("ed11y-element-alt", Ed11yElementAlt);
  customElements.define("ed11y-element-result", Ed11yElementResult);
  customElements.define("ed11y-element-heading-label", Ed11yElementHeadingLabel);
  customElements.define("ed11y-element-panel", Ed11yElementPanel);
  customElements.define("ed11y-element-tip", Ed11yElementTip);
  documentLoadingCheck(() => {
    if (checkRunPrevent()) {
      UI.disabled = true;
      return false;
    }
    UI.running = true;
    checkAll();
    document.addEventListener("ed11yResume", () => {
      continueCheck(true).then();
    });
    window.addEventListener(
      "keydown",
      () => {
        UI.interaction = true;
      },
      {
        passive: true
      }
    );
    window.addEventListener(
      "click",
      () => {
        UI.interaction = true;
      },
      {
        passive: true
      }
    );
    window.addEventListener(
      "resize",
      () => {
        windowResize();
      },
      {
        passive: true
      }
    );
    const mightExpand = document.querySelectorAll("[aria-expanded], [aria-controls]");
    mightExpand?.forEach((expandable) => {
      expandable.addEventListener(
        "click",
        () => {
          window.setTimeout(() => {
            windowResize();
          }, 333);
        },
        {
          passive: true
        }
      );
    });
  });
}
class Ed11y {
  constructor(userOptions) {
    if (CSS.supports("selector(:has(body))")) {
      initialize(userOptions).catch((error) => console.error(error.message));
    }
  }
}
const elements = Elements.Found;
export {
  Ed11y,
  Lang,
  State,
  UI,
  computeAccessibleName,
  createDismissalKey,
  elements,
  findElements,
  getElements,
  refresh,
  reset,
  sanitizeHTML,
  version
};
