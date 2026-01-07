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
      * @version 4.4.0
      * @author Adam Chaboryk
      * @license GPL-2.0-or-later
      * @copyright © 2020 - 2026 Toronto Metropolitan University.
      * @contact adam.chaboryk@torontomu.ca
      * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
      * The above copyright notice shall be included in all copies or substantial portions of the Software.
    **/
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Ed11y = {}));
})(this, (function(exports2) {
  "use strict";
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
      if (args?.length) {
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
      return $el.replaceAll(/<hr>/g, '<hr aria-hidden="true">').replaceAll(/<a[\s]href=/g, '<a target="_blank" rel="noopener noreferrer" href=').replaceAll(/<\/a>/g, `<span class="visually-hidden"> (${Lang._("NEW_TAB")})</span></a>`).replaceAll(/{C}/g, 'class="colour"').replaceAll(/{B}/g, 'class="badge"').replaceAll(/{ALT}/g, `<strong class="badge">${Lang._("ALT")}</strong>`).replaceAll(
        /{L}/g,
        `<strong class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._("LINKED")}</span></strong>`
      );
    }
  };
  function removeAlert() {
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
    function initializeGlobal(option) {
      Global.html = document.querySelector("html");
      Global.headless = option.headless;
      Global.panelPosition = option.panelPosition;
      Global.dismissAnnotations = option.dismissAnnotations;
      Global.aboutContent = option.aboutContent;
      Global.shadowDetection = option.shadowComponents.length > 0 || option.autoDetectShadowComponents === true;
      Global.fixedRoots = option.fixedRoots;
      Global.ignoreAriaOnElements = option.ignoreAriaOnElements;
      Global.ignoreTextInElements = option.ignoreTextInElements;
      Global.contrastSuggestions = option.contrastSuggestions;
      Global.contrastAlgorithm = option.contrastAlgorithm.toUpperCase();
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
      let reducedMotion = false;
      if (typeof window.matchMedia === "function") {
        reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      }
      Global.scrollBehaviour = !reducedMotion || reducedMotion.matches ? "auto" : "smooth";
      Global.langDirection = Global.html.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
      const documentSources = option.checks.QA_DOCUMENT.sources;
      const defaultDocumentSources = 'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://drive.google.com/file"], a[href^="https://docs.google."], a[href^="https://sway."]';
      if (documentSources) {
        Global.documentSources = `${defaultDocumentSources}, ${documentSources}`;
      } else {
        Global.documentSources = defaultDocumentSources;
      }
      const videoSources = option.checks.EMBED_VIDEO.sources;
      const defaultVideoSources = 'video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"]';
      if (videoSources) {
        const videos = videoSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
        Global.VideoSources = `${defaultVideoSources}, ${videos.join(", ")}`;
      } else {
        Global.VideoSources = defaultVideoSources;
      }
      const audioSources = option.checks.EMBED_AUDIO.sources;
      const defaultAudioSources = 'audio, [src*="soundcloud.com"], [src*="simplecast.com"], [src*="podbean.com"], [src*="buzzsprout.com"], [src*="blubrry.com"], [src*="transistor.fm"], [src*="fusebox.fm"], [src*="libsyn.com"], [src*="spotify.com"], [src*="podcasts.apple.com"], [src*="castbox.fm"], [src*="megaphone.fm"], [src*="spreaker.com"], [src*="anchor.fm"], [src*="rss.com"], [src*="redcircle.com"]';
      if (audioSources) {
        const audio = audioSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
        Global.AudioSources = `${defaultAudioSources}, ${audio.join(", ")}`;
      } else {
        Global.AudioSources = defaultAudioSources;
      }
      const dataVizSources = option.checks.EMBED_DATA_VIZ.sources;
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
    function initializeReadability(option) {
      if (option.readabilityPlugin) {
        Readability.Lang = Lang._("LANG_CODE").substring(0, 2);
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
        const pageLang = Constants.Global.html.getAttribute("lang");
        if (!pageLang) {
          Readability.Plugin = false;
        } else {
          const pageLangLowerCase = pageLang.toLowerCase().substring(0, 2);
          if (!supported.includes(pageLangLowerCase) || !supported.includes(Readability.Lang)) {
            Readability.Plugin = false;
          } else {
            Readability.Plugin = true;
          }
        }
      }
    }
    const Exclusions = {};
    function initializeExclusions(option) {
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
      if (option.containerIgnore) {
        const containerSelectors = option.containerIgnore.split(",").map((item) => item.trim());
        Exclusions.Container = Exclusions.Container.concat(
          containerSelectors.flatMap((item) => [`${item} *`, item])
        );
      }
      Exclusions.Contrast = [
        "link",
        "hr",
        "option",
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
        "svg title",
        "svg desc",
        ...exclusions
      ];
      if (option.contrastIgnore) {
        Exclusions.Contrast = option.contrastIgnore.split(",").map(($el) => $el.trim()).flatMap(($el) => [$el, `${$el} *`]).concat(Exclusions.Contrast);
      }
      Exclusions.Readability = ["nav li", '[role="navigation"] li', ...exclusions];
      if (option.readabilityIgnore) {
        Exclusions.Readability = option.readabilityIgnore.split(",").map(($el) => $el.trim()).flatMap(($el) => [$el, `${$el} *`]).concat(Exclusions.Readability);
      }
      Exclusions.Headings = option.headerIgnore ? option.headerIgnore.split(",").map(($el) => $el.trim()) : [];
      Exclusions.HeaderSpan = option.headerIgnoreSpan ? option.headerIgnoreSpan.split(",").map(($el) => $el.trim()) : [];
      Exclusions.Outline = option.outlineIgnore ? option.outlineIgnore.split(",").map(($el) => $el.trim()) : [];
      Exclusions.Images = [
        'img[role="presentation"]:not(a img[role="presentation"]), img[aria-hidden="true"]:not(a img[aria-hidden="true"])'
      ];
      if (option.imageIgnore) {
        Exclusions.Images = option.imageIgnore.split(",").map(($el) => $el.trim()).concat(Exclusions.Images);
      }
      Exclusions.Links = [".anchorjs-link"];
      if (option.linkIgnore) {
        Exclusions.Links = option.linkIgnore.split(",").map(($el) => $el.trim()).concat(Exclusions.Links);
      }
      Exclusions.LinkSpan = option.linkIgnoreSpan ? option.linkIgnoreSpan.split(",").map(($el) => $el.trim()) : [];
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
    if (Constants.Global.ignoreAriaOnElements && element.matches(Constants.Global.ignoreAriaOnElements)) {
      return "noAria";
    }
    if (Constants.Global.ignoreTextInElements && element.matches(Constants.Global.ignoreTextInElements)) {
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
        default:
          computedText += wrapPseudoContent(node, "");
          break;
      }
    }
    if (addTitleIfNoName && !aText) {
      computedText += ` ${addTitleIfNoName}`;
    }
    computedText = computedText.replace(/[\uE000-\uF8FF]/gu, "");
    if (!computedText.trim() && element.hasAttribute("title")) {
      return element.getAttribute("title");
    }
    return computedText;
  };
  function find(selector, desiredRoot, exclude) {
    const root = [];
    if (desiredRoot === "document") {
      root.push(document.body);
      if (Constants.Global.fixedRoots) {
        root.push(Constants.Global.fixedRoots);
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
  function escapeHTML(string) {
    const div = document.createElement("div");
    div.textContent = string;
    return div.innerHTML.replaceAll('"', "&quot;").replaceAll("'", "&#039;").replaceAll("`", "&#x60;");
  }
  function stripAllSpecialCharacters(string) {
    return string.replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();
  }
  function sanitizeHTML(string) {
    return string.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
  }
  function sanitizeHTMLBlock(html, allowStyles = false) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    ["script", "style", "noscript", "iframe", "form"].forEach((tag) => {
      const elements2 = tempDiv.getElementsByTagName(tag);
      while (elements2.length > 0) {
        elements2[0].parentNode.removeChild(elements2[0]);
      }
    });
    const allElements = Array.from(tempDiv.getElementsByTagName("*"));
    allElements.forEach((element) => {
      Array.from(element.attributes).forEach((attr) => {
        if (attr.name.startsWith("on")) {
          element.removeAttribute(attr.name);
        }
      });
      if (!allowStyles) {
        element.removeAttribute("style");
      }
    });
    return tempDiv.innerHTML;
  }
  function fnIgnore(element, selectors) {
    let ignoreQuery = "noscript,script,style,audio,video,form,iframe";
    if (selectors && selectors.length > 0) {
      ignoreQuery = `${ignoreQuery},${selectors.join(",")}`;
    }
    const clone = element.cloneNode(true);
    const toRemove = clone.querySelectorAll(ignoreQuery);
    let i = toRemove.length;
    while (i--) {
      toRemove[i].remove();
    }
    return clone;
  }
  const gotText = /* @__PURE__ */ new WeakMap();
  function getText(element) {
    if (gotText.has(element)) {
      return gotText.get(element);
    }
    const ignore = fnIgnore(element);
    const text = ignore.textContent.replace(/[\r\n]+/g, "").replace(/\s+/g, " ").trim();
    gotText.set(element, text);
    return text;
  }
  function removeWhitespace(string) {
    return string.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
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
  function remove(elements2, root) {
    const allElements = find(`${elements2}`, `${root}`);
    allElements.forEach(($el) => {
      $el?.parentNode?.removeChild($el);
    });
  }
  function getBestImageSource(element) {
    const getLastSrc = (src) => src?.split(/,\s+/).pop()?.trim()?.split(/\s+/)[0];
    const resolveUrl = (src) => src ? new URL(src, window.location.href).href : null;
    const dataSrc = getLastSrc(element.getAttribute("data-src") || element.getAttribute("srcset"));
    if (dataSrc) {
      return resolveUrl(dataSrc);
    }
    const picture = element.closest("picture")?.querySelector("source[srcset]")?.getAttribute("srcset");
    const pictureSrc = getLastSrc(picture);
    if (pictureSrc) {
      return resolveUrl(pictureSrc);
    }
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
  const State = {
    version: "3.0.0",
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
    dismissKeys: {},
    roots: [],
    headingOutline: [],
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
    open: false,
    showPanel: false,
    showDismissed: false,
    nextText: "",
    panelAttachTo: document.body,
    visualizing: false,
    /* Annotations initial states */
    jumpList: [],
    lastOpenTip: Number - 1,
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
  const Theme = {};
  const UI = {
    editableHighlight: [],
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
    panelShowDismissed: {}
  };
  const Results = [];
  const Options = {
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
    imageIgnore: 'img[aria-hidden], [aria-hidden] img, img[role="presentation"], a[href][aria-label] img, button[aria-label] img, a[href][aria-labelledby] img, button[aria-labelledby] img',
    linkIgnore: '[aria-hidden][tabindex="-1"]',
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
    // Test customizations
    embeddedContent: false,
    embeddedContentTitle: "",
    embeddedContentMessage: "",
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
      HEADING_SKIPPED_LEVEL: {
        type: "warning"
      },
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
        maxLength: 250
      },
      IMAGE_ALT_TOO_LONG: {
        maxLength: 250
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
      CONTRAST_ERROR_GRAPHIC: false,
      CONTRAST_WARNING_GRAPHIC: false,
      // Don't enable.
      CONTRAST_UNSUPPORTED: false,
      // What's this?
      // dev
      EMBED_CUSTOM: {
        sources: "#embed"
      }
    }
  };
  const Elements = /* @__PURE__ */ (function myElements() {
    const Found = {};
    function initializeElements(option) {
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
        option.ignoreContentOutsideRoots || option.fixedRoots ? "root" : "document",
        Constants.Exclusions.Headings
      );
      Found.HeadingOne = find(
        'h1, [role="heading"][aria-level="1"]',
        option.ignoreContentOutsideRoots || option.fixedRoots ? "root" : "document",
        Constants.Exclusions.Headings
      );
      Found.HeadingOverrideStart = /* @__PURE__ */ new WeakMap();
      Found.HeadingOverrideEnd = /* @__PURE__ */ new WeakMap();
      if (option.initialHeadingLevel) {
        option.initialHeadingLevel.forEach((section) => {
          const headingsInSection = find(
            `${section.selector} :is(h1,h2,h3,h4,h5,h6,[aria-role=heading][aria-level])`,
            option.ignoreContentOutsideRoots || option.fixedRoots ? "root" : "document",
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
        ($el) => $el.tagName === "P" && !$el.closest("table")
      );
      Found.Lists = Found.Everything.filter(($el) => $el.tagName === "LI");
      Found.Blockquotes = Found.Everything.filter(($el) => $el.tagName === "BLOCKQUOTE");
      Found.Tables = Found.Everything.filter(
        ($el) => $el.tagName === "TABLE" && !$el.matches('[role="presentation"]') && !$el.matches('[role="none"]')
      );
      Found.StrongItalics = Found.Everything.filter(($el) => ["STRONG", "EM"].includes($el.tagName));
      Found.Subscripts = Found.Everything.filter(($el) => ["SUP", "SUB"].includes($el.tagName));
      const badLinkSources = option.checks.QA_BAD_LINK.sources;
      Found.CustomErrorLinks = badLinkSources.length ? Found.Links.filter(
        ($el) => badLinkSources.split(",").some((selector) => $el.matches(selector.trim()))
      ) : [];
      const readabilityExclusions = ($el) => Constants.Root.Readability.some((rootEl) => rootEl.contains($el)) && !Constants.Exclusions.Readability.some((selector) => $el.matches(selector));
      Found.Readability = [
        ...Found.Paragraphs.filter(readabilityExclusions),
        ...Found.Lists.filter(readabilityExclusions)
      ];
      const nestedSources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
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
      Found.Language = html.getAttribute("lang");
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
  class ConsoleErrors extends HTMLElement {
    constructor(error) {
      super();
      this.error = error;
    }
    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
      const content = document.createElement("dialog");
      content.ariaLabel = Lang._("ERROR");
      const url2 = window.location;
      const google = "https://forms.gle/sjzK9XykETaoqZv99";
      const template = `## Error Description
\`\`\`javascript
${this.error.stack}
\`\`\`

## Details
- **URL:** ${url2}
- **Version:** ${State.version}

## Comments
`;
      const encodedTemplate = encodeURIComponent(template);
      const github = `https://github.com/ryersondmp/sa11y/issues/new?title=Bug%20report&body=${encodedTemplate}`;
      content.innerHTML = `
      <button class="close-btn" aria-describedby="ed11y-console-error"><span aria-hidden="true">&times</span> ${Lang._("ALERT_CLOSE")}</button>
      <h2 id="ed11y-console-error">${Lang._("ERROR")}</h2>
      <p>${Lang.sprintf("CONSOLE_ERROR", google, github)}</p>
      <p><strong>${Lang._("DEVELOPER_CHECKS")}:</strong></p>
      <pre>
Version: ${State.version}
URL: ${url2}</pre>
  		<p><strong>${Lang._("ERRORS")}:</strong></p>
<pre>${escapeHTML(this.error.stack)}</pre>
    `;
      shadow.appendChild(content);
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
        preS.forEach((pre) => {
          pre.style.setProperty("margin-left", "18px");
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
  async function dismissDigest(message) {
    const msgUint8 = new TextEncoder().encode(Options.pepper + message);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
    if (Uint8Array.prototype.toHex) {
      return new Uint8Array(hashBuffer).toHex();
    }
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
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
      createAlert(Lang.sprintf("MISSING_ROOT", desiredRoot));
      Constants.Root.areaToCheck.push(document.body);
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
            note.innerHTML = `<hr><p>${Lang.sprintf("MISSING_READABILITY_ROOT", roots, desiredReadabilityRoot)}</p>`;
            readabilityDetails.insertAdjacentElement("afterend", note);
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
    if (!hasText && State.recentlyAddedNodes.get(el) > Date.now() - 5e3 || State.activeRange && el.contains(State.activeRange.startContainer)) {
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
        State.recentlyAddedNodes.delete(el);
        return true;
      }
    } else {
      State.recentlyAddedNodes.delete(el);
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
    State.ignoreAll = Options.ignoreAllIfAbsent && document.querySelector(`:is(${Options.ignoreAllIfAbsent})`) === null;
    if (!State.ignoreAll && !!Options.ignoreAllIfPresent) {
      State.ignoreAll = document.querySelector(`:is(${Options.ignoreAllIfPresent})`) !== null;
    }
    initializeRoot(Options.checkRoot, Options.checkRoot, Options.fixedRoots);
    for (let i = 0; i < State.roots.length; i++) {
      if (Options.fixedRoots) {
        State.roots[i].dataset.ed11yRoot = `${i}`;
      }
      if (State.roots[i].shadowRoot) {
        State.roots.setAttribute("data-ed11y-has-shadow-root", "true");
        detectShadow(State.roots[i]);
        State.roots[i] = State.roots[i].shadowRoot;
      } else {
        detectShadow(State.roots[i]);
      }
    }
    findShadowComponents(Options);
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
      Elements.initializeElements(Options);
      dropSomeElements(Elements.Found.Headings, Elements.Found.OutlineIgnore, true, true);
      dropSomeElements(Elements.Found.Blockquotes);
      dropSomeElements(Elements.Found.Tables);
      if (typeof Options.editableContent === "string") {
        Elements.Found.editable = getElements(Options.editableContent, "document");
      } else {
        Elements.Found.editable = Options.editableContent;
      }
      if (State.inlineAlerts && Elements.Found.editable.length > 0) {
        State.inlineAlerts = false;
        console.warn("Editable content detected; Editoria11y inline alerts disabled");
      }
      if (Options.panelNoCover) {
        Elements.Found.panelNoCover = getElements(Options.panelNoCover, "document");
      }
    }
  }
  function lagBounce(callback, wait) {
    let timeoutId;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait + State.browserLag);
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
  function hiddenElementCheck(el) {
    const style = window.getComputedStyle(el);
    return !(style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden" || el.hasAttribute("aria-hidden") || el.hasAttribute("hidden"));
  }
  function elementNotHidden(el) {
    if (!hiddenElementCheck(el)) {
      return false;
    } else {
      const theParents = parents(el);
      const notHiddenParent = (parent) => hiddenElementCheck(parent);
      return theParents.every(notHiddenParent);
    }
  }
  function detectShadow(container) {
    if (Options.autoDetectShadowComponents) {
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
    } else if (Options.shadowComponents) {
      const providedShadow = container.querySelectorAll(Options.shadowComponents);
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
  function panelLabel(show = State.showPanel) {
    if (show) {
      if (State.english) {
        UI.panelToggleTitle.textContent = State.totalCount > 0 ? Lang._("main_toggle_hide_alerts") : Lang._("main_toggle_hide");
      } else {
        UI.panelToggleTitle.textContent = Lang._("MAIN_TOGGLE_LABEL");
        UI.panelToggle.ariaExpanded = "true";
      }
    } else {
      if (State.english) {
        UI.panelToggleTitle.textContent = State.totalCount > 0 ? Lang._("main_toggle_show_alerts") : Lang._("main_toggle_show");
      } else {
        UI.panelToggleTitle.textContent = Lang._("MAIN_TOGGLE_LABEL");
        UI.panelToggle.ariaExpanded = "false";
      }
    }
  }
  function pauseObservers() {
    State.watching?.forEach((observer) => {
      observer.observer.disconnect();
    });
  }
  function resumeObservers() {
    State.watching?.forEach((observer) => {
      observer.observer.observe(observer.root, observer.config);
    });
  }
  function checkRunPrevent() {
    let preventCheck = Options.preventCheckingIfPresent ? document.querySelector(Options.preventCheckingIfPresent) : false;
    if (preventCheck) {
      console.warn(
        `Editoria11y is disabled because an element matched the "preventCheckingIfPresent" parameter:  "${Options.preventCheckingIfPresent}"`
      );
    } else if (!preventCheck && !!Options.preventCheckingIfAbsent) {
      preventCheck = document.querySelector(`:is(${Options.preventCheckingIfAbsent})`) === null;
      if (preventCheck) {
        console.warn(
          `Editoria11y is disabled because no elements matched the "preventCheckingIfAbsent" parameter: "${Options.preventCheckingIfAbsent}"`
        );
      }
    }
    return preventCheck;
  }
  function resetResults(incremental) {
    State.jumpList = [];
    State.tipOpen = false;
    State.openTip = {
      button: false,
      tip: false
    };
    State.lastOpenTip = -1;
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
      UI.panelJumpNext.querySelector(".ed11y-sr-only").textContent = State.english ? Lang._("buttonFirstContent") : `${Lang._("SKIP_TO_ISSUE")} 1`;
    }
  }
  function newIncrementalResults() {
    if (State.forceFullCheck || Results.length !== State.oldResults.length) {
      return true;
    }
    let newResultString = `${State.errorCount} ${State.warningCount}`;
    Results.forEach((result) => {
      newResultString += result.test + result.element?.outerHTML;
    });
    const changed = newResultString !== State.oldResultString;
    State.oldResultString = newResultString;
    return changed;
  }
  function showError(error) {
    customElements.define("sa11y-console-error", ConsoleErrors);
    const consoleErrors = new ConsoleErrors(error);
    document.body.appendChild(consoleErrors);
    throw Error(error);
  }
  function checkHeaders(results, option, headingOutline) {
    let prevLevel;
    let prevHeadingText = "";
    const stringExclusionPattern = generateRegexString(option.headerIgnoreStrings);
    Elements.Found.Headings.forEach(($el, i) => {
      const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
      const stringMatchExclusions = accName.replace(stringExclusionPattern, "");
      const removeWhitespace$1 = removeWhitespace(stringMatchExclusions);
      const headingText = sanitizeHTML(removeWhitespace$1);
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
      const maxHeadingLength = option.checks.HEADING_LONG.maxLength || 160;
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
            if (option.checks.HEADING_EMPTY_WITH_IMAGE) {
              test = "HEADING_EMPTY_WITH_IMAGE";
              type = option.checks.HEADING_EMPTY_WITH_IMAGE.type || "error";
              content = Lang.sprintf(
                option.checks.HEADING_EMPTY_WITH_IMAGE.content || "HEADING_EMPTY_WITH_IMAGE",
                level
              );
              developer = option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
              dismissAll = option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll ? "HEADING_EMPTY_WITH_IMAGE" : false;
              margin = "-15px 30px";
            }
          }
        } else if (option.checks.HEADING_EMPTY) {
          test = "HEADING_EMPTY";
          type = option.checks.HEADING_EMPTY.type || "error";
          content = Lang.sprintf(option.checks.HEADING_EMPTY.content || "HEADING_EMPTY", level);
          developer = option.checks.HEADING_EMPTY.developer || false;
          dismissAll = option.checks.HEADING_EMPTY.dismissAll ? "HEADING_EMPTY" : false;
          margin = "0";
        }
      } else if (level - prevLevel > 1 && i !== 0) {
        if (option.checks.HEADING_SKIPPED_LEVEL) {
          test = "HEADING_SKIPPED_LEVEL";
          type = option.checks.HEADING_SKIPPED_LEVEL.type || "error";
          content = Lang.sprintf(
            option.checks.HEADING_SKIPPED_LEVEL.content || "HEADING_SKIPPED_LEVEL",
            prevLevel,
            level,
            truncateString(headingText, 60),
            truncateString(prevHeadingText, 60),
            prevLevel + 1
          );
          developer = option.checks.HEADING_SKIPPED_LEVEL.developer || false;
          dismissAll = option.checks.HEADING_SKIPPED_LEVEL.dismissAll ? "HEADING_SKIPPED_LEVEL" : false;
        }
      } else if (i === 0 && level !== 1 && level !== 2) {
        if (option.checks.HEADING_FIRST) {
          test = "HEADING_FIRST";
          type = option.checks.HEADING_FIRST.type || "error";
          content = Lang.sprintf(option.checks.HEADING_FIRST.content || "HEADING_FIRST");
          developer = option.checks.HEADING_FIRST.developer || false;
          dismissAll = option.checks.HEADING_FIRST.dismissAll ? "HEADING_FIRST" : false;
        }
      } else if (headingLength > maxHeadingLength) {
        if (option.checks.HEADING_LONG) {
          test = "HEADING_LONG";
          type = option.checks.HEADING_LONG.type || "warning";
          content = Lang.sprintf(
            option.checks.HEADING_LONG.content || "HEADING_LONG",
            maxHeadingLength,
            headingLength
          );
          developer = option.checks.HEADING_LONG.developer || false;
          dismissAll = option.checks.HEADING_LONG.dismissAll ? "HEADING_LONG" : false;
        }
      }
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
          margin
        });
      }
      prevLevel = level;
      prevHeadingText = headingText;
      if (!Elements.Found.OutlineIgnore.includes($el)) {
        headingOutline.push({
          element: $el,
          headingLevel: level,
          text: headingText,
          type,
          dismiss: prepareDismissal(`H${level + headingText}`),
          isWithinRoot
        });
      }
    });
    if (option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
      results.push({
        test: "HEADING_MISSING_ONE",
        type: option.checks.HEADING_MISSING_ONE.type || "warning",
        content: Lang.sprintf(option.checks.HEADING_MISSING_ONE.content || "HEADING_MISSING_ONE"),
        dismiss: "MISSINGH1",
        developer: option.checks.HEADING_MISSING_ONE.developer || false
      });
    }
    return { results, headingOutline };
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
  function checkLinkText(results, option) {
    const customStopWords = option.linkStopWords ? option.linkStopWords.split(",").map((word) => word.toLowerCase().trim()) : [];
    const linkStopWords = /* @__PURE__ */ new Set([...Lang._("LINK_STOPWORDS"), ...customStopWords]);
    const linkIgnoreStrings = new Set(option.linkIgnoreStrings.map((word) => word.toLowerCase()));
    const clickRegex = generateRegexString(Lang._("CLICK"));
    const newWindowRegex = generateRegexString(Lang._("NEW_WINDOW_PHRASES"));
    const fileTypeRegex = generateRegexString(defaultFileTypes);
    const ignorePattern = generateRegexString(option.linkIgnoreStrings);
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
            if (option.checks.HIDDEN_FOCUSABLE) {
              results.push({
                test: "HIDDEN_FOCUSABLE",
                element: $el,
                type: option.checks.HIDDEN_FOCUSABLE.type || "error",
                content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || "HIDDEN_FOCUSABLE"),
                inline: true,
                position: "afterend",
                dismiss: prepareDismissal(`LINKHIDDENFOCUS${href + strippedLinkText}`),
                dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? "LINK_HIDDEN_FOCUSABLE" : false,
                developer: option.checks.HIDDEN_FOCUSABLE.developer || true
              });
            }
          }
          return;
        }
        if (hasAria && linkText.length !== 0) {
          const sanitizedText = sanitizeHTML(linkText);
          const excludeSpan = fnIgnore($el, Constants.Exclusions.LinkSpan);
          const visibleLinkText = getText(excludeSpan).replace(ignorePattern, "");
          const cleanedString = stripAllSpecialCharacters(visibleLinkText);
          const stopword = checkStopWords(cleanedString, linkStopWords);
          const visibleTextInName = isVisibleTextInAccName(
            $el,
            accName,
            Constants.Exclusions.LinkSpan,
            option.linkIgnoreStrings
          );
          if (option.checks.LINK_STOPWORD_ARIA && stopword !== null) {
            results.push({
              test: "LINK_STOPWORD_ARIA",
              element: $el,
              type: option.checks.LINK_STOPWORD_ARIA.type || "warning",
              content: option.checks.LINK_STOPWORD_ARIA.content ? Lang.sprintf(option.checks.LINK_STOPWORD_ARIA.content, stopword, sanitizedText) : Lang.sprintf("LINK_STOPWORD_ARIA", stopword, sanitizedText) + Lang.sprintf("LINK_TIP"),
              inline: true,
              dismiss: prepareDismissal(`LINKSTOPWORDARIA${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_STOPWORD_ARIA.dismissAll ? " LINK_STOPWORD_ARIA" : false,
              developer: option.checks.LINK_STOPWORD_ARIA.developer || true
            });
          } else if (option.checks.LABEL_IN_NAME && visibleTextInName && textContent.length !== 0) {
            results.push({
              test: "LABEL_IN_NAME",
              element: $el,
              type: option.checks.LABEL_IN_NAME.type || "warning",
              content: Lang.sprintf(
                option.checks.LABEL_IN_NAME.content || "LABEL_IN_NAME",
                sanitizedText
              ),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINKLABELNAME${href + strippedLinkText}`),
              dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? "BTN_LABEL_IN_NAME" : false,
              developer: option.checks.LABEL_IN_NAME.developer || true
            });
          } else if (option.checks.LINK_LABEL) {
            results.push({
              test: "LINK_LABEL",
              element: $el,
              type: option.checks.LINK_LABEL.type || "good",
              content: option.checks.LINK_LABEL.content ? Lang.sprintf(option.checks.LINK_LABEL.content, sanitizedText) : `${Lang.sprintf("ACC_NAME", sanitizedText)} ${Lang.sprintf("ACC_NAME_TIP")}`,
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINKGOOD${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_LABEL.dismissAll ? "LINK_LABEL" : false,
              developer: option.checks.LINK_LABEL.developer || true
            });
          }
        }
        let oneStop;
        const addStopWordResult = (element, stopword) => {
          if (option.checks.LINK_STOPWORD && !oneStop) {
            oneStop = true;
            results.push({
              test: "LINK_STOPWORD",
              element,
              type: option.checks.LINK_STOPWORD.type || "error",
              content: option.checks.LINK_STOPWORD.content ? Lang.sprintf(option.checks.LINK_STOPWORD.content, stopword) : Lang.sprintf("LINK_STOPWORD", stopword) + Lang.sprintf("LINK_TIP"),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINKSTOPWORD${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_STOPWORD.dismissAll ? "LINK_STOPWORD" : false,
              developer: option.checks.LINK_STOPWORD.developer || false
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
            if (option.checks.LINK_EMPTY_LABELLEDBY) {
              results.push({
                test: "LINK_EMPTY_LABELLEDBY",
                element: $el,
                type: option.checks.LINK_EMPTY_LABELLEDBY.type || "error",
                content: Lang.sprintf(
                  option.checks.LINK_EMPTY_LABELLEDBY.content || "LINK_EMPTY_LABELLEDBY"
                ),
                inline: true,
                position: "afterend",
                dismiss: prepareDismissal(`LINKEMPTYLABELLEDBY${href}`),
                dismissAll: option.checks.LINK_EMPTY_LABELLEDBY.dismissAll ? "LINK_EMPTY_LABELLEDBY" : false,
                developer: option.checks.LINK_EMPTY_LABELLEDBY.developer || true
              });
            }
          } else if ($el.children.length) {
            let hasStopWordWarning = false;
            if (option.linkIgnoreSpan) {
              const spanEl = $el.querySelector(option.linkIgnoreSpan);
              if (spanEl) {
                const spanText = stripAllSpecialCharacters(spanEl.textContent).trim().toLowerCase();
                if (spanText === textContent) {
                  addStopWordResult($el, spanText);
                  hasStopWordWarning = true;
                }
              }
            }
            if (!hasStopWordWarning && option.checks.LINK_EMPTY_NO_LABEL) {
              results.push({
                test: "LINK_EMPTY_NO_LABEL",
                element: $el,
                type: option.checks.LINK_EMPTY_NO_LABEL.type || "error",
                content: Lang.sprintf(
                  option.checks.LINK_EMPTY_NO_LABEL.content || "LINK_EMPTY_NO_LABEL"
                ),
                inline: true,
                position: "afterend",
                dismiss: prepareDismissal(`LINKEMPTYNOLABEL${href}`),
                dismissAll: option.checks.LINK_EMPTY_NO_LABEL.dismissAll ? "LINK_EMPTY_NO_LABEL" : false,
                developer: option.checks.LINK_EMPTY_NO_LABEL.developer || false
              });
            }
          } else if (!isLinkIgnoreStrings && option.checks.LINK_EMPTY) {
            results.push({
              test: "LINK_EMPTY",
              element: $el,
              type: option.checks.LINK_EMPTY.type || "error",
              content: Lang.sprintf(option.checks.LINK_EMPTY.content || "LINK_EMPTY"),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINKEMPTY${href}`),
              dismissAll: option.checks.LINK_EMPTY.dismissAll ? "LINK_EMPTY" : false,
              developer: option.checks.LINK_EMPTY.developer || false
            });
          }
          return;
        }
        const isStopWord = checkStopWords(strippedLinkText, linkStopWords, newWindowRegex);
        const hasClickWord = strippedLinkText.match(clickRegex)?.[0] || textContent.match(clickRegex)?.[0];
        const isCitation = lowercaseLinkText.match(citationPattern)?.[0];
        const urlCheck = lowercaseLinkText.startsWith("www.") || lowercaseLinkText.startsWith("http");
        const isUrlFragment = urlCheck ? "URL Prefix" : lowercaseLinkText.match(urlEndings)?.[0];
        const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);
        const matchedSymbol = lowercaseLinkText.match(htmlSymbols)?.[0];
        if (isStopWord) {
          addStopWordResult($el, isStopWord);
        } else if (isCitation) {
          if (linkText.length > 8) {
            if (option.checks.LINK_DOI) {
              results.push({
                test: "LINK_DOI",
                element: $el,
                type: option.checks.LINK_DOI.type || "warning",
                content: Lang.sprintf(option.checks.LINK_DOI.content || "LINK_DOI"),
                inline: true,
                dismiss: prepareDismissal(`LINKDOI${href + strippedLinkText}`),
                dismissAll: option.checks.LINK_DOI.dismissAll ? "LINK_DOI" : false,
                developer: option.checks.LINK_DOI.developer || false
              });
            }
          }
        } else if (isUrlFragment) {
          if (!hasAria && linkText.length > (option.checks.LINK_URL.maxLength || 40)) {
            if (option.checks.LINK_URL) {
              results.push({
                test: "LINK_URL",
                element: $el,
                type: option.checks.LINK_URL.type || "warning",
                content: option.checks.LINK_URL.content ? Lang.sprintf(option.checks.LINK_URL.content) : Lang.sprintf("LINK_URL") + Lang.sprintf("LINK_TIP"),
                inline: true,
                dismiss: prepareDismissal(`LINKURLNAME${href + strippedLinkText}`),
                dismissAll: option.checks.LINK_URL.dismissAll ? "LINK_URL" : false,
                developer: option.checks.LINK_URL.developer || false
              });
            }
          }
        } else if (matchedSymbol) {
          if (option.checks.LINK_SYMBOLS) {
            results.push({
              test: "LINK_SYMBOLS",
              element: $el,
              type: option.checks.LINK_SYMBOLS.type || "warning",
              content: Lang.sprintf(
                option.checks.LINK_SYMBOLS.content || "LINK_SYMBOLS",
                matchedSymbol
              ),
              inline: true,
              dismiss: prepareDismissal(`LINKSYMBOL${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_SYMBOLS.dismissAll ? "LINK_SYMBOLS" : false,
              developer: option.checks.LINK_SYMBOLS.developer || false
            });
          }
        } else if (isSingleSpecialChar && !titleAttr) {
          if (option.checks.LINK_EMPTY) {
            results.push({
              test: "LINK_EMPTY",
              element: $el,
              type: option.checks.LINK_EMPTY.type || "error",
              content: Lang.sprintf(option.checks.LINK_EMPTY.content || "LINK_EMPTY"),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINKCHAR${href}`),
              dismissAll: option.checks.LINK_EMPTY.dismissAll ? "LINK_EMPTY" : false,
              developer: option.checks.LINK_EMPTY.developer || false
            });
          }
          return;
        }
        if (hasClickWord) {
          if (option.checks.LINK_CLICK_HERE) {
            results.push({
              test: "LINK_CLICK_HERE",
              element: $el,
              type: option.checks.LINK_CLICK_HERE.type || "warning",
              content: option.checks.LINK_CLICK_HERE.content ? Lang.sprintf(option.checks.LINK_CLICK_HERE.content) : Lang.sprintf("LINK_CLICK_HERE") + Lang.sprintf("LINK_TIP"),
              inline: true,
              dismiss: prepareDismissal(`LINKCLICKHERE${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_CLICK_HERE.dismissAll ? "LINK_CLICK_HERE" : false,
              developer: option.checks.LINK_CLICK_HERE.developer || false
            });
          }
        }
        if (textContent.length !== 0 && titleAttr?.toLowerCase() === linkText.toLowerCase()) {
          if (option.checks.DUPLICATE_TITLE) {
            results.push({
              test: "DUPLICATE_TITLE",
              element: $el,
              type: option.checks.DUPLICATE_TITLE.type || "warning",
              content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || "DUPLICATE_TITLE"),
              inline: true,
              dismiss: prepareDismissal(`LINKDUPLICATETITLE${href + strippedLinkText}`),
              dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? "DUPLICATE_TITLE" : false,
              developer: option.checks.DUPLICATE_TITLE.developer || false
            });
          }
        }
      }
      if (strippedLinkText.length !== 0) {
        if (seen[strippedLinkText] && !seen[href]) {
          const ignored = $el.ariaHidden === "true" && $el.getAttribute("tabindex") === "-1";
          const hasAttributes = $el.hasAttribute("role") || $el.hasAttribute("disabled");
          if (option.checks.LINK_IDENTICAL_NAME && !hasAttributes && !ignored) {
            const sanitizedText = sanitizeHTML(linkText);
            results.push({
              test: "LINK_IDENTICAL_NAME",
              element: $el,
              type: option.checks.LINK_IDENTICAL_NAME.type || "warning",
              content: option.checks.LINK_IDENTICAL_NAME.content ? Lang.sprintf(option.checks.LINK_IDENTICAL_NAME.content, sanitizedText) : `${Lang.sprintf("LINK_IDENTICAL_NAME", sanitizedText)} ${Lang.sprintf("ACC_NAME_TIP")}`,
              inline: true,
              dismiss: prepareDismissal(`LINKSEEN${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_IDENTICAL_NAME.dismissAll ? "LINK_IDENTICAL_NAME" : false,
              developer: option.checks.LINK_IDENTICAL_NAME.developer || false
            });
          }
        } else {
          seen[strippedLinkText] = true;
          seen[href] = true;
        }
        if (targetBlank && !fileTypeMatch && !containsNewWindowPhrases) {
          if (option.checks.LINK_NEW_TAB) {
            results.push({
              test: "LINK_NEW_TAB",
              element: $el,
              type: option.checks.LINK_NEW_TAB.type || "warning",
              content: Lang.sprintf(option.checks.LINK_NEW_TAB.content || "LINK_NEW_TAB"),
              inline: true,
              dismiss: prepareDismissal(`LINKNEWTAB${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_NEW_TAB.dismissAll ? "LINK_NEW_TAB" : false,
              developer: option.checks.LINK_NEW_TAB.developer || false
            });
          }
        }
        if (fileTypeMatch && !containsFileTypePhrases) {
          if (option.checks.LINK_FILE_EXT) {
            results.push({
              test: "LINK_FILE_EXT",
              element: $el,
              type: option.checks.LINK_FILE_EXT.type || "warning",
              content: Lang.sprintf(option.checks.LINK_FILE_EXT.content || "LINK_FILE_EXT"),
              inline: true,
              dismiss: prepareDismissal(`LINKEXT${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_FILE_EXT.dismissAll ? "LINK_FILE_EXT" : false,
              developer: option.checks.LINK_FILE_EXT.developer || false
            });
          }
        }
      }
    });
    return results;
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
  function checkImages(results, option) {
    const susAltWords = option.susAltStopWords ? option.susAltStopWords.split(",").map((word) => word.trim().toLowerCase()).filter(Boolean) : Lang._("SUS_ALT_STOPWORDS");
    const placeholderAltSet = new Set(Lang._("PLACEHOLDER_ALT_STOPWORDS"));
    const altPlaceholderPattern = generateRegexString(option.altPlaceholder, true);
    const linkIgnoreStringPattern = generateRegexString(option.linkIgnoreStrings);
    const extraPlaceholderStopWords = option.extraPlaceholderStopWords.split(",").map((word) => word.trim().toLowerCase()).filter(Boolean);
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
      const alt = computeAriaLabel($el) === "noAria" ? $el.getAttribute("alt") : computeAriaLabel($el);
      const ariaHidden = $el?.getAttribute("aria-hidden") === "true";
      const presentationRole = $el?.getAttribute("role") === "presentation";
      if ($el.height < 2 && $el.width < 2 && (isElementHidden($el) || alt === "")) {
        return;
      }
      const link = $el.closest(
        option.imageWithinLightbox ? `a[href]:not(${option.imageWithinLightbox})` : "a[href]"
      );
      const src = $el.getAttribute("src") ? $el.getAttribute("src") : $el.getAttribute("srcset");
      const linkText = link ? fnIgnore(link, Constants.Exclusions.LinkSpan).textContent.replace(
        linkIgnoreStringPattern,
        ""
      ) : "";
      const linkTextLength = removeWhitespace(linkText).length;
      if (link && link.getAttribute("aria-hidden") === "true") {
        const unfocusable = link.getAttribute("tabindex") === "-1";
        if (option.checks.HIDDEN_FOCUSABLE && !unfocusable) {
          results.push({
            test: "HIDDEN_FOCUSABLE",
            element: $el,
            type: option.checks.HIDDEN_FOCUSABLE.type || "error",
            content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || "HIDDEN_FOCUSABLE"),
            dismiss: prepareDismissal(`IMGHIDDENFOCUSABLE${src}`),
            dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? "LINK_HIDDEN_FOCUSABLE" : false,
            developer: option.checks.HIDDEN_FOCUSABLE.developer || true
          });
        }
        return;
      }
      if (alt === null) {
        if (link) {
          const hasAriaHiddenOrPresentationRole = linkTextLength > 0 && (ariaHidden || presentationRole);
          if (!hasAriaHiddenOrPresentationRole) {
            const rule = linkTextLength === 0 ? option.checks.MISSING_ALT_LINK : option.checks.MISSING_ALT_LINK_HAS_TEXT;
            const conditional = linkTextLength === 0 ? "MISSING_ALT_LINK" : "MISSING_ALT_LINK_HAS_TEXT";
            if (rule) {
              results.push({
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
        } else if (option.checks.MISSING_ALT) {
          results.push({
            test: "MISSING_ALT",
            element: $el,
            type: option.checks.MISSING_ALT.type || "error",
            content: Lang.sprintf(option.checks.MISSING_ALT.content || "MISSING_ALT"),
            dismiss: prepareDismissal(`IMGNOALT${src}`),
            dismissAll: option.checks.MISSING_ALT.dismissAll ? "MISSING_ALT" : false,
            developer: option.checks.MISSING_ALT.developer || false
          });
        }
        return;
      }
      const sanitizedAlt = sanitizeHTML(alt);
      const altText = removeWhitespace(sanitizedAlt);
      const hasAria = $el.getAttribute("aria-label") || $el.getAttribute("aria-labelledby");
      if (option.checks.MISSING_ALT) {
        if (hasAria && altText === "") {
          results.push({
            test: "MISSING_ALT",
            element: $el,
            type: option.checks.MISSING_ALT.type || "error",
            content: Lang.sprintf(option.checks.MISSING_ALT.content || "MISSING_ALT"),
            dismiss: prepareDismissal(`IMGNOALTARIA${src}`),
            dismissAll: option.checks.MISSING_ALT.dismissAll ? "MISSING_ALT" : false,
            developer: option.checks.MISSING_ALT.developer || false
          });
          return;
        }
      }
      const decorative = alt === "";
      const figure = $el.closest("figure");
      const figcaption = figure?.querySelector("figcaption");
      const figcaptionText = figcaption ? getText(figcaption) : "";
      const maxAltCharactersLinks = option.checks.LINK_IMAGE_LONG_ALT.maxLength || 250;
      const maxAltCharacters = option.checks.IMAGE_ALT_TOO_LONG.maxLength || 250;
      const startsWithSpecificAlt = alt.match(altPlaceholderPattern)?.[0];
      if (decorative || startsWithSpecificAlt) {
        const carouselSources = option.checks.IMAGE_DECORATIVE_CAROUSEL.sources;
        const carousel = carouselSources ? $el.closest(carouselSources) : "";
        if (carousel) {
          const numberOfSlides = carousel.querySelectorAll("img");
          const rule = numberOfSlides.length === 1 ? option.checks.IMAGE_DECORATIVE : option.checks.IMAGE_DECORATIVE_CAROUSEL;
          const conditional = numberOfSlides.length === 1 ? "IMAGE_DECORATIVE" : "IMAGE_DECORATIVE_CAROUSEL";
          if (rule) {
            results.push({
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
          const rule = linkTextLength === 0 ? option.checks.LINK_IMAGE_NO_ALT_TEXT : option.checks.LINK_IMAGE_TEXT;
          const conditional = linkTextLength === 0 ? "LINK_IMAGE_NO_ALT_TEXT" : "LINK_IMAGE_TEXT";
          if (rule) {
            results.push({
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
          const rule = figcaption && figcaptionText.length ? option.checks.IMAGE_FIGURE_DECORATIVE : option.checks.IMAGE_DECORATIVE;
          const conditional = figcaption && figcaptionText.length ? "IMAGE_FIGURE_DECORATIVE" : "IMAGE_DECORATIVE";
          if (rule) {
            results.push({
              test: conditional,
              element: $el,
              type: rule.type || "warning",
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(`${conditional + src + figcaptionText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false
            });
          }
        } else if (option.checks.IMAGE_DECORATIVE) {
          results.push({
            test: "IMAGE_DECORATIVE",
            element: $el,
            type: option.checks.IMAGE_DECORATIVE.type || "warning",
            content: Lang.sprintf(option.checks.IMAGE_DECORATIVE.content || "IMAGE_DECORATIVE"),
            dismiss: prepareDismissal(`DECIMAGE${src}`),
            dismissAll: option.checks.IMAGE_DECORATIVE.dismissAll ? "IMAGE_DECORATIVE" : false,
            developer: option.checks.IMAGE_DECORATIVE.developer || false
          });
        }
        return;
      }
      const unpronounceable = link ? option.checks.LINK_ALT_UNPRONOUNCEABLE : option.checks.ALT_UNPRONOUNCEABLE;
      if (unpronounceable) {
        if (alt.replace(/"|'|\?|\.|-|\s+/g, "") === "" && linkTextLength === 0) {
          const conditional = link ? "LINK_ALT_UNPRONOUNCEABLE" : "ALT_UNPRONOUNCEABLE";
          results.push({
            test: conditional,
            element: $el,
            type: unpronounceable.type || "error",
            content: Lang.sprintf(unpronounceable.content || conditional, altText),
            dismiss: prepareDismissal(`UNPRONOUNCEABLE${src}`),
            dismissAll: unpronounceable.dismissAll ? "ALT_UNPRONOUNCEABLE" : false,
            developer: unpronounceable.developer || false
          });
          return;
        }
      }
      const error = containsAltTextStopWords(altText);
      const maybeBadAlt = link ? option.checks.LINK_ALT_MAYBE_BAD : option.checks.ALT_MAYBE_BAD;
      const isTooLongSingleWord = new RegExp(`^\\S{${maybeBadAlt.minLength || 15},}$`);
      const containsNonAlphaChar = /[^\p{L}\-,.!?]/u.test(alt);
      if (error[0] !== null) {
        const rule = link ? option.checks.LINK_ALT_FILE_EXT : option.checks.ALT_FILE_EXT;
        const conditional = link ? "LINK_ALT_FILE_EXT" : "ALT_FILE_EXT";
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || "error",
            content: Lang.sprintf(rule.content || conditional, error[0], altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (error[2] !== null) {
        const rule = link ? option.checks.LINK_PLACEHOLDER_ALT : option.checks.ALT_PLACEHOLDER;
        const conditional = link ? "LINK_PLACEHOLDER_ALT" : "ALT_PLACEHOLDER";
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || "error",
            content: Lang.sprintf(rule.content || conditional, altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (error[1] !== null) {
        const rule = link ? option.checks.LINK_SUS_ALT : option.checks.SUS_ALT;
        const conditional = link ? "LINK_SUS_ALT" : "SUS_ALT";
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || "warning",
            content: Lang.sprintf(rule.content || conditional, error[1], altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (maybeBadAlt && isTooLongSingleWord.test(alt) && containsNonAlphaChar) {
        const conditional = link ? "LINK_ALT_MAYBE_BAD" : "ALT_MAYBE_BAD";
        results.push({
          test: conditional,
          element: $el,
          type: maybeBadAlt.type || "error",
          content: Lang.sprintf(maybeBadAlt.content || conditional, altText),
          dismiss: prepareDismissal(`${conditional + src + altText}`),
          dismissAll: maybeBadAlt.dismissAll ? conditional : false,
          developer: maybeBadAlt.developer || false
        });
      } else if (link ? alt.length > maxAltCharactersLinks : alt.length > maxAltCharacters) {
        const rule = link ? option.checks.LINK_IMAGE_LONG_ALT : option.checks.IMAGE_ALT_TOO_LONG;
        const conditional = link ? "LINK_IMAGE_LONG_ALT" : "IMAGE_ALT_TOO_LONG";
        const truncated = truncateString(altText, 600);
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || "warning",
            content: Lang.sprintf(rule.content || conditional, alt.length, truncated),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (link) {
        const rule = linkTextLength === 0 ? option.checks.LINK_IMAGE_ALT : option.checks.LINK_IMAGE_ALT_AND_TEXT;
        const conditional = linkTextLength === 0 ? "LINK_IMAGE_ALT" : "LINK_IMAGE_ALT_AND_TEXT";
        if (rule) {
          const linkAccName = computeAccessibleName(link);
          const removeWhitespace$1 = removeWhitespace(linkAccName);
          const sanitizedText = sanitizeHTML(removeWhitespace$1);
          const tooltip = linkTextLength === 0 ? Lang.sprintf("LINK_IMAGE_ALT", altText) : `${Lang.sprintf("LINK_IMAGE_ALT_AND_TEXT", altText, sanitizedText)} ${Lang.sprintf("ACC_NAME_TIP")}`;
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || "warning",
            content: rule.content ? Lang.sprintf(rule.content, altText, sanitizedText) : tooltip,
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (figure) {
        const duplicate = !!figcaption && figcaptionText.toLowerCase() === altText.toLowerCase();
        if (duplicate) {
          if (option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
            results.push({
              test: "IMAGE_FIGURE_DUPLICATE_ALT",
              element: $el,
              type: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.type || "warning",
              content: Lang.sprintf(
                option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content || "IMAGE_FIGURE_DUPLICATE_ALT",
                altText
              ),
              dismiss: prepareDismissal(`FIGDUPLICATE${src}`),
              dismissAll: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll ? "IMAGE_FIGURE_DUPLICATE_ALT" : false,
              developer: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false
            });
          }
        } else if (option.checks.IMAGE_PASS) {
          results.push({
            test: "IMAGE_PASS",
            element: $el,
            type: option.checks.IMAGE_PASS.type || "good",
            content: Lang.sprintf(option.checks.IMAGE_PASS.content || "IMAGE_PASS", altText),
            dismiss: prepareDismissal(`FIGIMGPASS${src + altText}`),
            dismissAll: option.checks.IMAGE_PASS.dismissAll ? "IMAGE_PASS" : false,
            developer: option.checks.IMAGE_PASS.developer || false
          });
        }
      } else if (option.checks.IMAGE_PASS) {
        if (!$el.closest('button, [role="button"]')) {
          results.push({
            test: "IMAGE_PASS",
            element: $el,
            type: option.checks.IMAGE_PASS.type || "good",
            content: Lang.sprintf(option.checks.IMAGE_PASS.content || "IMAGE_PASS", altText),
            dismiss: prepareDismissal(`IMAGEPASS${src + altText}`),
            dismissAll: option.checks.IMAGE_PASS.dismissAll ? "IMAGE_PASS" : false,
            developer: option.checks.IMAGE_PASS.developer || false
          });
        }
      }
      const titleAttr = $el.getAttribute("title");
      if (titleAttr?.toLowerCase() === alt.toLowerCase()) {
        if (option.checks.DUPLICATE_TITLE) {
          results.push({
            test: "DUPLICATE_TITLE",
            element: $el,
            type: option.checks.DUPLICATE_TITLE.type || "warning",
            content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || "DUPLICATE_TITLE"),
            inline: true,
            dismiss: prepareDismissal(`ALTDUPLICATETITLE${altText}`),
            dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? "DUPLICATE_TITLE" : false,
            developer: option.checks.DUPLICATE_TITLE.developer || false
          });
        }
      }
    });
    return results;
  }
  function checkLabels(results, option) {
    if (option.formLabelsPlugin) {
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
          if (option.checks.LABELS_MISSING_IMAGE_INPUT && (!alt || alt.trim() === "") && !hasAria && !hasTitle) {
            results.push({
              test: "LABELS_MISSING_IMAGE_INPUT",
              element: $el,
              type: option.checks.LABELS_MISSING_IMAGE_INPUT.type || "error",
              content: Lang.sprintf(
                option.checks.LABELS_MISSING_IMAGE_INPUT.content || "LABELS_MISSING_IMAGE_INPUT"
              ),
              dismiss: prepareDismissal(`INPUTIMAGE${type + inputName}`),
              dismissAll: option.checks.LABELS_MISSING_IMAGE_INPUT.dismissAll ? "LABELS_MISSING_IMAGE_INPUT" : false,
              developer: option.checks.LABELS_MISSING_IMAGE_INPUT.developer || true
            });
          }
          return;
        }
        if (type === "reset") {
          if (option.checks.LABELS_INPUT_RESET) {
            results.push({
              test: "LABELS_INPUT_RESET",
              element: $el,
              type: option.checks.LABELS_INPUT_RESET.type || "warning",
              content: Lang.sprintf(option.checks.LABELS_INPUT_RESET.content || "LABELS_INPUT_RESET"),
              dismiss: prepareDismissal(`INPUTRESET${type + inputName}`),
              dismissAll: option.checks.LABELS_INPUT_RESET.dismissAll ? "LABELS_INPUT_RESET" : false,
              developer: option.checks.LABELS_INPUT_RESET.developer || false
            });
          }
          return;
        }
        if (hasAria || hasTitle || hasPlaceholder) {
          if (hasPlaceholder && option.checks.LABELS_PLACEHOLDER) {
            results.push({
              test: "LABELS_PLACEHOLDER",
              element: $el,
              type: option.checks.LABELS_PLACEHOLDER.type || "warning",
              content: Lang.sprintf(option.checks.LABELS_PLACEHOLDER.content || "LABELS_PLACEHOLDER"),
              dismiss: prepareDismissal(`INPUTPLACEHOLDER${type + inputName}`),
              dismissAll: option.checks.LABELS_PLACEHOLDER.dismissAll ? "LABELS_PLACEHOLDER" : false,
              developer: option.checks.LABELS_PLACEHOLDER.developer || true
            });
          } else if (inputName.length === 0) {
            if (option.checks.LABELS_MISSING_LABEL) {
              results.push({
                test: "LABELS_MISSING_LABEL",
                element: $el,
                type: option.checks.LABELS_MISSING_LABEL.type || "error",
                content: Lang.sprintf(
                  option.checks.LABELS_MISSING_LABEL.content || "LABELS_MISSING_LABEL"
                ),
                dismiss: prepareDismissal(`INPUTMISSING${type + inputName}`),
                dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? "LABELS_MISSING_LABEL" : false,
                developer: option.checks.LABELS_MISSING_LABEL.developer || true
              });
            }
          } else if (option.checks.LABELS_ARIA_LABEL_INPUT) {
            const sanitizedText = sanitizeHTML(inputName);
            results.push({
              test: "LABELS_ARIA_LABEL_INPUT",
              element: $el,
              type: option.checks.LABELS_ARIA_LABEL_INPUT.type || "warning",
              content: option.checks.LABELS_ARIA_LABEL_INPUT.content ? Lang.sprintf(option.checks.LABELS_ARIA_LABEL_INPUT.content, sanitizedText) : `${Lang.sprintf("LABELS_ARIA_LABEL_INPUT", sanitizedText)} ${Lang.sprintf("ACC_NAME_TIP")}`,
              dismiss: prepareDismissal(`INPUTARIA${type + inputName}`),
              dismissAll: option.checks.LABELS_ARIA_LABEL_INPUT.dismissAll ? "LABELS_ARIA_LABEL_INPUT" : false,
              developer: option.checks.LABELS_ARIA_LABEL_INPUT.developer || true
            });
          }
          return;
        }
        const closestLabel = $el.closest("label");
        const labelName = closestLabel ? removeWhitespace(computeAccessibleName(closestLabel)) : "";
        if (closestLabel && labelName.length) {
          return;
        }
        const id = $el.getAttribute("id");
        if (id) {
          if (!Elements.Found.Labels.some((label) => label.getAttribute("for") === id)) {
            if (option.checks.LABELS_NO_FOR_ATTRIBUTE) {
              results.push({
                test: "LABELS_NO_FOR_ATTRIBUTE",
                element: $el,
                type: option.checks.LABELS_NO_FOR_ATTRIBUTE.type || "error",
                content: Lang.sprintf(
                  option.checks.LABELS_NO_FOR_ATTRIBUTE.content || "LABELS_NO_FOR_ATTRIBUTE",
                  id
                ),
                dismiss: prepareDismissal(`INPUTNOFOR${type + inputName}`),
                dismissAll: option.checks.LABELS_NO_FOR_ATTRIBUTE.dismissAll ? "LABELS_NO_FOR_ATTRIBUTE" : false,
                developer: option.checks.LABELS_NO_FOR_ATTRIBUTE.developer || true
              });
            }
          }
        } else if (option.checks.LABELS_MISSING_LABEL) {
          results.push({
            test: "LABELS_MISSING_LABEL",
            element: $el,
            type: option.checks.LABELS_MISSING_LABEL.type || "error",
            content: Lang.sprintf(
              option.checks.LABELS_MISSING_LABEL.content || "LABELS_MISSING_LABEL"
            ),
            dismiss: prepareDismissal(`INPUTNOID${type + inputName}`),
            dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? "LABELS_MISSING_LABEL" : false,
            developer: option.checks.LABELS_MISSING_LABEL.developer || true
          });
        }
      });
    }
    return results;
  }
  function checkQA(results, option) {
    if (option.checks.QA_BAD_LINK) {
      Elements.Found.CustomErrorLinks.forEach(($el) => {
        results.push({
          test: "QA_BAD_LINK",
          element: $el,
          type: option.checks.QA_BAD_LINK.type || "error",
          content: Lang.sprintf(option.checks.QA_BAD_LINK.content || "QA_BAD_LINK", $el),
          inline: true,
          dismiss: prepareDismissal($el.tagName + $el.textContent),
          dismissAll: option.checks.QA_BAD_LINK.dismissAll ? "QA_BAD_LINK" : false,
          developer: option.checks.QA_BAD_LINK.developer || false
        });
      });
    }
    if (option.checks.QA_STRONG_ITALICS) {
      Elements.Found.StrongItalics.forEach(($el) => {
        const text = getText($el);
        if (text.length !== 0 && text.length > 400) {
          results.push({
            test: "QA_STRONG_ITALICS",
            element: $el.parentNode,
            type: option.checks.QA_STRONG_ITALICS.type || "warning",
            content: Lang.sprintf(option.checks.QA_STRONG_ITALICS.content || "QA_STRONG_ITALICS"),
            dismiss: prepareDismissal($el.tagName + $el.textContent),
            dismissAll: option.checks.QA_STRONG_ITALICS.dismissAll ? "QA_STRONG_ITALICS" : false,
            developer: option.checks.QA_STRONG_ITALICS.developer || false
          });
        }
      });
    }
    Elements.Found.Links.forEach(($el) => {
      if ($el.hasAttribute("href")) {
        const href = $el.getAttribute("href");
        const hasExtension = $el.matches(Constants.Global.documentSources);
        const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');
        if (option.checks.QA_IN_PAGE_LINK) {
          const hasText = getText($el).length !== 0;
          const ignored = $el.ariaHidden === "true" && $el.getAttribute("tabindex") === "-1";
          const hasAttributes = $el.hasAttribute("role") || $el.hasAttribute("aria-haspopup") || $el.hasAttribute("aria-expanded") || $el.hasAttribute("onclick") || $el.hasAttribute("disabled") || $el.closest('nav, [role="navigation"]');
          if ((href.startsWith("#") || href === "") && hasText && !ignored && !hasAttributes) {
            const targetId = href.substring(1);
            const ariaControls = $el.getAttribute("aria-controls");
            const targetElement = targetId && (document.getElementById(targetId) || document.getElementById(decodeURIComponent(targetId)) || document.getElementById(encodeURIComponent(targetId)) || document.getElementById(ariaControls) || document.querySelector(`a[name="${targetId}"]`));
            if (!targetElement) {
              results.push({
                test: "QA_IN_PAGE_LINK",
                element: $el,
                type: option.checks.QA_IN_PAGE_LINK.type || "error",
                content: Lang.sprintf(option.checks.QA_IN_PAGE_LINK.content || "QA_IN_PAGE_LINK"),
                inline: true,
                dismiss: prepareDismissal(`QAINPAGE${href}`),
                dismissAll: option.checks.QA_IN_PAGE_LINK.dismissAll ? "QA_IN_PAGE_LINK" : false,
                developer: option.checks.QA_IN_PAGE_LINK.developer || false
              });
            }
          }
        }
        if (option.checks.QA_DOCUMENT && hasExtension) {
          results.push({
            test: "QA_DOCUMENT",
            element: $el,
            type: option.checks.QA_DOCUMENT.type || "warning",
            content: Lang.sprintf(option.checks.QA_DOCUMENT.content || "QA_DOCUMENT"),
            inline: true,
            dismiss: prepareDismissal(`DOC${href}`),
            dismissAll: option.checks.QA_DOCUMENT.dismissAll ? "QA_DOCUMENT" : false,
            developer: option.checks.QA_DOCUMENT.developer || false
          });
        } else if (option.checks.QA_PDF && hasPDF) {
          results.push({
            test: "QA_PDF",
            element: $el,
            type: option.checks.QA_PDF.type || "warning",
            content: Lang.sprintf(option.checks.QA_PDF.content || "QA_PDF"),
            inline: true,
            dismiss: prepareDismissal(`PDF${href}`),
            dismissAll: option.checks.QA_PDF.dismissAll ? "QA_PDF" : false,
            developer: option.checks.QA_PDF.developer || false
          });
        }
      }
    });
    if (option.checks.QA_BLOCKQUOTE) {
      Elements.Found.Blockquotes.forEach(($el) => {
        const text = getText($el);
        if (text.length !== 0 && text.length < 25) {
          const sanitizedText = sanitizeHTML(text);
          results.push({
            test: "QA_BLOCKQUOTE",
            element: $el,
            type: option.checks.QA_BLOCKQUOTE.type || "warning",
            content: Lang.sprintf(
              option.checks.QA_BLOCKQUOTE.content || "QA_BLOCKQUOTE",
              sanitizedText
            ),
            dismiss: prepareDismissal(`BLOCKQUOTE${sanitizedText}`),
            dismissAll: option.checks.QA_BLOCKQUOTE.dismissAll ? "QA_BLOCKQUOTE" : false,
            developer: option.checks.QA_BLOCKQUOTE.developer || false
          });
        }
      });
    }
    Elements.Found.Tables.forEach(($el) => {
      if (isElementHidden($el) === false) {
        const tableHeaders = $el.querySelectorAll("th");
        const semanticHeadings = $el.querySelectorAll("h1, h2, h3, h4, h5, h6");
        const key = prepareDismissal(`TABLE${$el.textContent}`);
        if (option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
          results.push({
            test: "TABLES_MISSING_HEADINGS",
            element: $el,
            type: option.checks.TABLES_MISSING_HEADINGS.type || "error",
            content: Lang.sprintf(
              option.checks.TABLES_MISSING_HEADINGS.content || "TABLES_MISSING_HEADINGS"
            ),
            dismiss: key,
            dismissAll: option.checks.TABLES_MISSING_HEADINGS.dismissAll ? "TABLES_MISSING_HEADINGS" : false,
            developer: option.checks.TABLES_MISSING_HEADINGS.developer || false
          });
        }
        if (option.checks.TABLES_SEMANTIC_HEADING && semanticHeadings.length > 0) {
          semanticHeadings.forEach((heading) => {
            results.push({
              test: "TABLES_SEMANTIC_HEADING",
              element: heading,
              type: option.checks.TABLES_SEMANTIC_HEADING.type || "error",
              content: Lang.sprintf(
                option.checks.TABLES_SEMANTIC_HEADING.content || "TABLES_SEMANTIC_HEADING"
              ),
              dismiss: key,
              dismissAll: option.checks.TABLES_SEMANTIC_HEADING.dismissAll ? "TABLES_SEMANTIC_HEADING" : false,
              developer: option.checks.TABLES_SEMANTIC_HEADING.developer || false
            });
          });
        }
        tableHeaders.forEach((th) => {
          if (option.checks.TABLES_EMPTY_HEADING && th.textContent.trim().length === 0) {
            results.push({
              test: "TABLES_EMPTY_HEADING",
              element: th,
              type: option.checks.TABLES_EMPTY_HEADING.type || "error",
              content: Lang.sprintf(
                option.checks.TABLES_EMPTY_HEADING.content || "TABLES_EMPTY_HEADING"
              ),
              position: "afterbegin",
              dismiss: key,
              dismissAll: option.checks.TABLES_EMPTY_HEADING.dismissAll ? "TABLES_EMPTY_HEADING" : false,
              developer: option.checks.TABLES_EMPTY_HEADING.developer || false
            });
          }
        });
      }
    });
    if (option.checks.QA_FAKE_HEADING) {
      const addResult = (element, sanitizedText) => {
        results.push({
          test: "QA_FAKE_HEADING",
          element,
          type: option.checks.QA_FAKE_HEADING.type || "warning",
          content: Lang.sprintf(
            option.checks.QA_FAKE_HEADING.content || "QA_FAKE_HEADING",
            sanitizedText
          ),
          dismiss: prepareDismissal(`BOLD${sanitizedText}`),
          inline: true,
          dismissAll: option.checks.QA_FAKE_HEADING.dismissAll ? "QA_FAKE_HEADING" : false,
          developer: option.checks.QA_FAKE_HEADING.developer || false
        });
      };
      const isPreviousElementAHeading = (p) => {
        const previousElement = p.previousElementSibling;
        if (!previousElement) {
          return false;
        }
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
          const sanitizedText = sanitizeHTML(getText$1);
          addResult(p, sanitizedText);
        }
      };
      const computeBoldTextParagraphs = (p) => {
        const startsWithBold = /^<\s*(strong|b)(\s+[^>]*)?>/i.test(p.innerHTML.trim());
        if (startsWithBold && !p.closest(ignoreParents)) {
          const possibleHeading = p.querySelector("strong, b");
          const possibleHeadingText = getText(possibleHeading);
          const notASentence = possibleHeadingText.match(/[.:;?!"']/) === null;
          const typicalHeadingLength = possibleHeadingText.length >= 3 && possibleHeadingText.length <= 120;
          if (typicalHeadingLength && notASentence) {
            const nonHeadingTextLength = fnIgnore(p, ["strong", "b"]).textContent.trim().length;
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
    if (option.checks.QA_FAKE_LIST) {
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
            results.push({
              test: "QA_FAKE_LIST",
              element: p,
              type: option.checks.QA_FAKE_LIST.type || "warning",
              content: Lang.sprintf(
                option.checks.QA_FAKE_LIST.content || "QA_FAKE_LIST",
                firstPrefix
              ),
              dismiss: prepareDismissal(`LIST${p.textContent}`),
              dismissAll: option.checks.QA_FAKE_LIST.dismissAll ? "QA_FAKE_LIST" : false,
              developer: option.checks.QA_FAKE_LIST.developer || false
            });
            activeMatch = firstPrefix;
          } else {
            activeMatch = "";
          }
        }
        firstText = secondText ? "" : secondText;
      });
    }
    if (option.checks.QA_UPPERCASE) {
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
          results.push({
            test: "QA_UPPERCASE",
            element: $el,
            type: option.checks.QA_UPPERCASE.type || "warning",
            content: Lang.sprintf(option.checks.QA_UPPERCASE.content || "QA_UPPERCASE"),
            dismiss: prepareDismissal(`UPPERCASE${thisText}`),
            dismissAll: option.checks.QA_UPPERCASE.dismissAll ? "QA_UPPERCASE" : false,
            developer: option.checks.QA_UPPERCASE.developer || false
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
      results.push({
        test: "QA_UNDERLINE",
        element: $el,
        type: option.checks.QA_UNDERLINE.type || "warning",
        content: Lang.sprintf(option.checks.QA_UNDERLINE.content || "QA_UNDERLINE"),
        inline: true,
        dismiss: prepareDismissal(`UNDERLINE${$el.textContent}`),
        dismissAll: option.checks.QA_UNDERLINE.dismissAll ? "QA_UNDERLINE" : false,
        developer: option.checks.QA_UNDERLINE.developer || false
      });
    };
    const addJustifyResult = ($el) => {
      results.push({
        test: "QA_JUSTIFY",
        element: $el,
        type: option.checks.QA_JUSTIFY.type || "warning",
        content: Lang.sprintf(option.checks.QA_JUSTIFY.content || "QA_JUSTIFY"),
        dismiss: prepareDismissal(`JUSTIFIED${$el.textContent}`),
        dismissAll: option.checks.QA_JUSTIFY.dismissAll ? "QA_JUSTIFY" : false,
        developer: option.checks.QA_JUSTIFY.developer || false
      });
    };
    const addSmallTextResult = ($el) => {
      results.push({
        test: "QA_SMALL_TEXT",
        element: $el,
        type: option.checks.QA_SMALL_TEXT.type || "warning",
        content: Lang.sprintf(option.checks.QA_SMALL_TEXT.content || "QA_SMALL_TEXT"),
        dismiss: prepareDismissal(`SMALL${$el.textContent}`),
        dismissAll: option.checks.QA_SMALL_TEXT.dismissAll ? "QA_SMALL_TEXT" : false,
        developer: option.checks.QA_SMALL_TEXT.developer || false
      });
    };
    const computeStyle = ($el) => {
      const style = getComputedStyle($el);
      const { textDecorationLine, textAlign, fontSize } = style;
      const interactive = 'a[href], button, abbr, [role="link"], [role="button"], [tabindex="0"], [onclick]';
      if (option.checks.QA_UNDERLINE && ($el.closest("u") || textDecorationLine === "underline") && !$el.closest(interactive) && !$el.matches(interactive)) {
        addUnderlineResult($el);
      }
      const defaultSize = option.checks.QA_SMALL_TEXT.fontSize || 10;
      const computedFontSize = parseFloat(fontSize);
      const parentFontSize = $el.parentElement ? parseFloat(getComputedStyle($el.parentElement).fontSize) : null;
      const isInherited = parentFontSize === computedFontSize;
      const withinRange = !isInherited && computedFontSize > 1 && computedFontSize <= defaultSize;
      if (option.checks.QA_SMALL_TEXT && withinRange) {
        addSmallTextResult($el);
      }
      const parentJustify = $el.parentElement ? getComputedStyle($el.parentElement).textAlign : null;
      const justifyInherited = parentJustify === textAlign;
      if (option.checks.QA_JUSTIFY && textAlign === "justify" && !justifyInherited) {
        addJustifyResult($el);
      }
    };
    if (option.checks.QA_UNDERLINE || option.checks.QA_JUSTIFY || option.checks.QA_SMALL_TEXT) {
      for (let i = 0; i < Elements.Found.Everything.length; i++) {
        const $el = Elements.Found.Everything[i];
        const textString = Array.from($el.childNodes).filter((node) => node.nodeType === 3).map((node) => node.textContent).join("");
        const text = textString.trim();
        if (text.length !== 0) {
          computeStyle($el);
        }
      }
    }
    if (option.checks.QA_SUBSCRIPT) {
      Elements.Found.Subscripts.forEach(($el) => {
        const text = getText($el);
        if (text.length >= 80) {
          results.push({
            test: "QA_SUBSCRIPT",
            element: $el,
            type: option.checks.QA_SUBSCRIPT.type || "warning",
            content: Lang.sprintf(option.checks.QA_SUBSCRIPT.content || "QA_SUBSCRIPT"),
            inline: true,
            dismiss: prepareDismissal($el.tagName + text),
            dismissAll: option.checks.QA_SUBSCRIPT.dismissAll ? "QA_SUBSCRIPT" : false,
            developer: option.checks.QA_SUBSCRIPT.developer || false
          });
        }
      });
    }
    if (option.checks.QA_NESTED_COMPONENTS) {
      Elements.Found.NestedComponents.forEach(($el) => {
        const sources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
        const component = $el.querySelector(sources);
        if (component) {
          results.push({
            test: "QA_NESTED_COMPONENTS",
            element: $el,
            type: option.checks.QA_NESTED_COMPONENTS.type || "warning",
            content: Lang.sprintf(
              option.checks.QA_NESTED_COMPONENTS.content || "QA_NESTED_COMPONENTS"
            ),
            dismiss: prepareDismissal(`NESTED${$el.textContent}`),
            dismissAll: option.checks.QA_NESTED_COMPONENTS.dismissAll ? "QA_NESTED_COMPONENTS" : false,
            developer: option.checks.QA_NESTED_COMPONENTS.developer || false
          });
        }
      });
    }
    return results;
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
  function convertToRGBA(color, opacity) {
    const colorString = color;
    let r;
    let g;
    let b;
    let a = 1;
    if (!colorString.startsWith("rgb")) {
      if (colorString.startsWith("color(rec2020") || colorString.startsWith("color(display-p3") || colorString.startsWith("url(")) {
        return "unsupported";
      }
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.fillStyle = colorString;
      context.fillRect(0, 0, 1, 1);
      const imageData = context.getImageData(0, 0, 1, 1);
      [r, g, b, a] = imageData.data;
      a = (a / 255).toFixed(2);
    } else {
      const rgbaArray = colorString.match(/[\d.]+/g).map(Number);
      [r, g, b, a] = rgbaArray.length === 4 ? rgbaArray : [...rgbaArray, 1];
    }
    if (opacity && opacity < 1) {
      a = (a * opacity).toFixed(2);
    }
    return [r, g, b, Number(a)];
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
      const hasLowContrastNormalText = ratio > 1 && ratio < 4.5;
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
  function checkContrast(results, option) {
    const contrastResults = [];
    for (let i = 0; i < Elements.Found.Contrast.length; i++) {
      const $el = Elements.Found.Contrast[i];
      const style = getComputedStyle($el);
      const opacity = parseFloat(style.opacity);
      const color = convertToRGBA(style.color, opacity);
      const fontSize = parseFloat(style.fontSize);
      const getFontWeight = style.fontWeight;
      const fontWeight = normalizeFontWeight(getFontWeight);
      const background = getBackground($el, Constants.Global.shadowDetection);
      const isVisuallyHidden = isScreenReaderOnly($el);
      const isExplicitlyHidden = isElementHidden($el);
      const isHidden = isExplicitlyHidden || isVisuallyHidden || opacity === 0 || fontSize === 0;
      const textString = Array.from($el.childNodes).filter((node) => node.nodeType === 3).map((node) => node.textContent).join("");
      const text = textString.trim();
      const checkInputs = ["SELECT", "INPUT", "TEXTAREA"].includes($el.tagName);
      if (text.length !== 0 || checkInputs) {
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
        } else if (background.type === "image") {
          if (!isHidden) {
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
        } else if (!isHidden && getHex(color) !== getHex(background)) {
          const result = checkElementContrast(
            $el,
            color,
            background,
            fontSize,
            fontWeight,
            opacity,
            option.contrastAlgorithm
          );
          if (result) {
            result.type = checkInputs ? "input" : "text";
            contrastResults.push(result);
          }
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
              option.contrastAlgorithm
            );
            fillPasses = option.contrastAlgorithm === "APCA" ? contrastValue.ratio >= 45 : contrastValue.ratio >= 3;
          }
          if (hasStroke) {
            contrastValue = calculateContrast(
              resolvedStroke,
              background,
              option.contrastAlgorithm
            );
            strokePasses = option.contrastAlgorithm === "APCA" ? contrastValue.ratio >= 45 : contrastValue.ratio >= 3;
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
              ratio: ratioToDisplay(contrastValue.ratio, option.contrastAlgorithm),
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
            option.contrastAlgorithm
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
      if (option.contrastAlgorithm === "APCA") {
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
      const element = $el.tagName === "OPTION" ? $el.closest("datalist, select, optgroup") : $el;
      const nodeText = fnIgnore(element, ["option:not(option:first-child)"]);
      const text = getText(nodeText);
      const truncatedText = truncateString(text, 80);
      const sanitizedText = sanitizeHTML(truncatedText);
      let previewText;
      if (item.type === "placeholder" || item.type === "placeholder-unsupported") {
        previewText = sanitizeHTML($el.placeholder);
      } else if (item.type === "svg-error" || item.type === "svg-warning") {
        previewText = "";
      } else {
        previewText = sanitizedText;
      }
      updatedItem.sanitizedText = previewText;
      let ratioTip = "";
      if (option.contrastAlgorithm === "AA" || option.contrastAlgorithm === "AAA") {
        const normal = option.contrastAlgorithm === "AAA" ? "7:1" : "4.5:1";
        const large = option.contrastAlgorithm === "AAA" ? "4.5:1" : "3:1";
        const ratioToDisplay2 = item.isLargeText ? large : normal;
        const ratioRequirement = item.isLargeText ? "CONTRAST_LARGE" : "CONTRAST_NORMAL";
        ratioTip = ` ${Lang.sprintf(ratioRequirement, ratioToDisplay2)}`;
      }
      const graphicsTip = option.contrastAlgorithm === "APCA" ? "" : ` ${Lang.sprintf("CONTRAST_TIP_GRAPHIC")}`;
      switch (item.type) {
        case "text":
          if (option.checks.CONTRAST_ERROR) {
            results.push({
              test: "CONTRAST_ERROR",
              element: $el,
              type: option.checks.CONTRAST_ERROR.type || "error",
              content: option.checks.CONTRAST_ERROR.content ? Lang.sprintf(option.checks.CONTRAST_ERROR.content) : Lang.sprintf("CONTRAST_ERROR") + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
              dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? "CONTRAST_ERROR" : false,
              developer: option.checks.CONTRAST_ERROR.developer || false,
              contrastDetails: updatedItem
            });
          }
          break;
        case "input":
          if (option.checks.CONTRAST_INPUT) {
            const sanitizedInput = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: "CONTRAST_INPUT",
              element,
              type: option.checks.CONTRAST_INPUT.type || "error",
              content: option.checks.CONTRAST_INPUT.content ? Lang.sprintf(option.checks.CONTRAST_INPUT.content) : Lang.sprintf("CONTRAST_INPUT", ratio) + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedInput}`),
              dismissAll: option.checks.CONTRAST_INPUT.dismissAll ? "CONTRAST_INPUT" : false,
              developer: option.checks.CONTRAST_INPUT.developer || true,
              contrastDetails: updatedItem
            });
          }
          break;
        case "placeholder":
          if (option.checks.CONTRAST_PLACEHOLDER) {
            const sanitizedPlaceholder = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: "CONTRAST_PLACEHOLDER",
              element: $el,
              type: option.checks.CONTRAST_PLACEHOLDER.type || "error",
              content: option.checks.CONTRAST_PLACEHOLDER.content ? Lang.sprintf(option.checks.CONTRAST_PLACEHOLDER.content) : Lang.sprintf("CONTRAST_PLACEHOLDER") + ratioTip,
              position: "afterend",
              dismiss: prepareDismissal(`CPLACEHOLDER${sanitizedPlaceholder}`),
              dismissAll: option.checks.CONTRAST_PLACEHOLDER.dismissAll ? "CONTRAST_PLACEHOLDER" : false,
              developer: option.checks.CONTRAST_PLACEHOLDER.developer || true,
              contrastDetails: updatedItem
            });
          }
          break;
        case "placeholder-unsupported":
          if (option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED) {
            const sanitizedPlaceholder = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: "CONTRAST_PLACEHOLDER_UNSUPPORTED",
              element: $el,
              type: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.type || "warning",
              content: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.content ? Lang.sprintf(option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.content) : Lang.sprintf("CONTRAST_PLACEHOLDER_UNSUPPORTED") + ratioTip,
              position: "afterend",
              dismiss: prepareDismissal(`CPLACEHOLDERUN${sanitizedPlaceholder}`),
              dismissAll: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.dismissAll ? "CONTRAST_PLACEHOLDER_UNSUPPORTED" : false,
              developer: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.developer || true,
              contrastDetails: updatedItem
            });
          }
          break;
        case "svg-error":
          if (option.checks.CONTRAST_ERROR_GRAPHIC) {
            const sanitizedSVG = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: "CONTRAST_ERROR_GRAPHIC",
              element: $el,
              type: option.checks.CONTRAST_ERROR_GRAPHIC.type || "error",
              content: option.checks.CONTRAST_ERROR_GRAPHIC.content ? Lang.sprintf(option.checks.CONTRAST_ERROR_GRAPHIC.content) : Lang.sprintf("CONTRAST_ERROR_GRAPHIC") + graphicsTip,
              dismiss: prepareDismissal(`CONTRASTERROR${sanitizedSVG}`),
              dismissAll: option.checks.CONTRAST_ERROR_GRAPHIC.dismissAll ? "CONTRAST_ERROR_GRAPHIC" : false,
              developer: option.checks.CONTRAST_ERROR_GRAPHIC.developer || true,
              contrastDetails: updatedItem,
              margin: "-25px"
            });
          }
          break;
        case "svg-warning":
          if (option.checks.CONTRAST_WARNING_GRAPHIC) {
            const sanitizedSVG = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: "CONTRAST_WARNING_GRAPHIC",
              element: $el,
              type: option.checks.CONTRAST_WARNING_GRAPHIC.type || "warning",
              content: option.checks.CONTRAST_WARNING_GRAPHIC.content ? Lang.sprintf(option.checks.CONTRAST_WARNING_GRAPHIC.content) : Lang.sprintf("CONTRAST_WARNING_GRAPHIC") + graphicsTip,
              dismiss: prepareDismissal(`CONTRASTWARNING${sanitizedSVG}`),
              dismissAll: option.checks.CONTRAST_WARNING_GRAPHIC.dismissAll ? "CONTRAST_WARNING_GRAPHIC" : false,
              developer: option.checks.CONTRAST_WARNING_GRAPHIC.developer || true,
              contrastDetails: updatedItem,
              margin: "-25px"
            });
          }
          break;
        case "background-image":
          if (option.checks.CONTRAST_WARNING) {
            results.push({
              test: "CONTRAST_WARNING",
              element,
              type: option.checks.CONTRAST_WARNING.type || "warning",
              content: option.checks.CONTRAST_WARNING.content ? Lang.sprintf(option.checks.CONTRAST_WARNING.content) : Lang.sprintf("CONTRAST_WARNING") + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
              dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? "CONTRAST_WARNING" : false,
              developer: option.checks.CONTRAST_WARNING.developer || false,
              contrastDetails: updatedItem
            });
          }
          break;
        case "unsupported":
          if (option.checks.CONTRAST_UNSUPPORTED) {
            results.push({
              test: "CONTRAST_UNSUPPORTED",
              element,
              type: option.checks.CONTRAST_UNSUPPORTED.type || "warning",
              content: option.checks.CONTRAST_UNSUPPORTED.content ? Lang.sprintf(option.checks.CONTRAST_UNSUPPORTED.content) : Lang.sprintf("CONTRAST_WARNING") + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
              dismissAll: option.checks.CONTRAST_UNSUPPORTED.dismissAll ? "CONTRAST_UNSUPPORTED" : false,
              developer: option.checks.CONTRAST_UNSUPPORTED.developer || false,
              contrastDetails: updatedItem
            });
          }
          break;
      }
    });
    return results;
  }
  function checkDeveloper(results, option) {
    if (option.checks.META_LANG) {
      if (!Elements.Found.Language || Elements.Found.Language.length < 2) {
        results.push({
          test: "META_LANG",
          type: option.checks.META_LANG.type || "error",
          content: Lang.sprintf(option.checks.META_LANG.content || "META_LANG"),
          dismiss: prepareDismissal("LANG"),
          developer: option.checks.META_LANG.developer || true
        });
      }
    }
    if (option.checks.META_TITLE) {
      const metaTitle = document.querySelector("title:not(svg title)");
      if (!metaTitle || metaTitle.textContent.trim().length === 0) {
        results.push({
          test: "META_TITLE",
          type: option.checks.META_TITLE.type || "error",
          content: Lang.sprintf(option.checks.META_TITLE.content || "META_TITLE"),
          dismiss: prepareDismissal("TITLE"),
          developer: option.checks.META_TITLE.developer || true
        });
      }
    }
    if (option.checks.META_SCALABLE || option.checks.META_MAX) {
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        const content = metaViewport.getAttribute("content");
        if (content) {
          const params = content.split(",").reduce((acc, param) => {
            const [key, value] = param.split("=").map((s) => s.trim());
            acc[key] = value;
            return acc;
          }, {});
          if (option.checks.META_SCALABLE && (params["user-scalable"] === "no" || params["user-scalable"] === "0")) {
            results.push({
              test: "META_SCALABLE",
              type: option.checks.META_SCALABLE.type || "error",
              content: Lang.sprintf(option.checks.META_SCALABLE.content || "META_SCALABLE"),
              dismiss: prepareDismissal("SCALABLE"),
              developer: option.checks.META_SCALABLE.developer || true
            });
          }
          const maxScale = parseFloat(params["maximum-scale"]);
          if (option.checks.META_MAX && !Number.isNaN(maxScale) && maxScale < 2) {
            results.push({
              test: "META_MAX",
              type: option.checks.META_MAX.type || "error",
              content: Lang.sprintf(option.checks.META_MAX.content || "META_MAX"),
              dismiss: prepareDismissal("MAXSCALE"),
              developer: option.checks.META_MAX.developer || true
            });
          }
        }
      }
    }
    if (option.checks.META_REFRESH) {
      const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
      if (metaRefresh) {
        results.push({
          test: "META_REFRESH",
          type: option.checks.META_REFRESH.type || "error",
          content: Lang.sprintf(option.checks.META_REFRESH.content || "META_REFRESH"),
          dismiss: prepareDismissal("REFRESH"),
          developer: option.checks.META_REFRESH.developer || true
        });
      }
    }
    if (option.checks.DUPLICATE_ID) {
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
                results.push({
                  test: "DUPLICATE_ID",
                  element: $el,
                  type: option.checks.DUPLICATE_ID.type || "error",
                  content: Lang.sprintf(option.checks.DUPLICATE_ID.content || "DUPLICATE_ID", id),
                  dismiss: prepareDismissal(`DUPLICATEID${id}${$el.textContent}`),
                  dismissAll: option.checks.DUPLICATE_ID.dismissAll ? "DUPLICATE_ID" : false,
                  developer: option.checks.DUPLICATE_ID.developer || true
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
    if (option.checks.BTN_EMPTY || option.checks.BTN_EMPTY_LABELLEDBY || option.checks.BTN_LABEL || option.checks.HIDDEN_FOCUSABLE || option.checks.LABEL_IN_NAME) {
      Elements.Found.Buttons.forEach(($el) => {
        const accName = computeAccessibleName($el);
        const buttonText = accName.replace(/'|"|-|\.|\s+/g, "").toLowerCase();
        const key = prepareDismissal(`BTN${$el.tagName + $el.id + $el.className + accName}`);
        const hasAria = $el.querySelector(":scope [aria-labelledby], :scope [aria-label]") || $el.getAttribute("aria-labelledby") || $el.getAttribute("aria-label");
        const hasAriaLabelledby = $el.querySelector(":scope [aria-labelledby]") || $el.getAttribute("aria-labelledby");
        const ariaHidden = $el.getAttribute("aria-hidden") === "true";
        const negativeTabindex = $el.getAttribute("tabindex") === "-1";
        if (ariaHidden) {
          if (!negativeTabindex) {
            if (option.checks.HIDDEN_FOCUSABLE) {
              results.push({
                test: "HIDDEN_FOCUSABLE",
                element: $el,
                type: option.checks.HIDDEN_FOCUSABLE.type || "error",
                content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || "HIDDEN_FOCUSABLE"),
                dismiss: key,
                dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? "BTN_HIDDEN_FOCUSABLE" : false,
                developer: option.checks.HIDDEN_FOCUSABLE.developer || true
              });
            }
          }
          return;
        }
        if (buttonText.length === 0) {
          if (option.checks.BTN_EMPTY_LABELLEDBY && hasAriaLabelledby) {
            results.push({
              test: "BTN_EMPTY_LABELLEDBY",
              element: $el,
              type: option.checks.BTN_EMPTY_LABELLEDBY.type || "error",
              content: option.checks.BTN_EMPTY_LABELLEDBY.content ? Lang.sprintf(option.checks.BTN_EMPTY_LABELLEDBY.content) : `${Lang.sprintf("BTN_EMPTY_LABELLEDBY")} ${Lang.sprintf("BTN_TIP")}`,
              dismiss: prepareDismissal(key),
              dismissAll: option.checks.BTN_EMPTY_LABELLEDBY.dismissAll ? "BTN_EMPTY_LABELLEDBY" : false,
              developer: option.checks.BTN_EMPTY_LABELLEDBY.developer || true
            });
          } else if (option.checks.BTN_EMPTY) {
            results.push({
              test: "BTN_EMPTY",
              element: $el,
              type: option.checks.BTN_EMPTY.type || "error",
              content: option.checks.BTN_EMPTY.content ? Lang.sprintf(option.checks.BTN_EMPTY.content) : `${Lang.sprintf("BTN_EMPTY")} ${Lang.sprintf("BTN_TIP")}`,
              dismiss: key,
              dismissAll: option.checks.BTN_EMPTY.dismissAll ? "BTN_EMPTY" : false,
              developer: option.checks.BTN_EMPTY.developer || true
            });
          }
          return;
        }
        const isVisibleTextInAccName$1 = isVisibleTextInAccName($el, accName);
        if (option.checks.LABEL_IN_NAME && hasAria && isVisibleTextInAccName$1) {
          const sanitizedText = sanitizeHTML(accName);
          results.push({
            test: "LABEL_IN_NAME",
            element: $el,
            type: option.checks.LABEL_IN_NAME.type || "warning",
            content: option.checks.LABEL_IN_NAME.content ? Lang.sprintf(option.checks.LABEL_IN_NAME.content, sanitizedText) : `${Lang.sprintf("LABEL_IN_NAME", sanitizedText)} ${Lang.sprintf("ACC_NAME_TIP")}`,
            dismiss: key,
            dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? "BTN_LABEL_IN_NAME" : false,
            developer: option.checks.LABEL_IN_NAME.developer || true
          });
          return;
        }
        if (option.checks.BTN_ROLE_IN_NAME && accName.includes(Lang._("BTN"))) {
          results.push({
            test: "BTN_ROLE_IN_NAME",
            element: $el,
            type: option.checks.BTN_ROLE_IN_NAME.type || "warning",
            content: option.checks.BTN_ROLE_IN_NAME.content ? Lang.sprintf(option.checks.BTN_ROLE_IN_NAME.content) : `${Lang.sprintf("BTN_ROLE_IN_NAME")} ${Lang.sprintf("BTN_TIP")}`,
            dismiss: key,
            dismissAll: option.checks.BTN_ROLE_IN_NAME.dismissAll ? "BTN_ROLE_IN_NAME" : false,
            developer: option.checks.BTN_ROLE_IN_NAME.developer || true
          });
        }
      });
    }
    if (option.checks.UNCONTAINED_LI) {
      Elements.Found.Lists.forEach(($el) => {
        if (!$el.closest("ul, ol, menu")) {
          results.push({
            test: "UNCONTAINED_LI",
            element: $el,
            type: option.checks.UNCONTAINED_LI.type || "error",
            content: Lang.sprintf(option.checks.UNCONTAINED_LI.content || "UNCONTAINED_LI"),
            dismiss: prepareDismissal(`UNCONTAINEDLI${$el.textContent}`),
            dismissAll: option.checks.UNCONTAINED_LI.dismissAll ? "UNCONTAINED_LI" : false,
            developer: option.checks.UNCONTAINED_LI.developer || true
          });
        }
      });
    }
    if (option.checks.TABINDEX_ATTR) {
      Elements.Found.TabIndex.forEach(($el) => {
        results.push({
          test: "TABINDEX_ATTR",
          element: $el,
          type: option.checks.TABINDEX_ATTR.type || "error",
          content: Lang.sprintf(option.checks.TABINDEX_ATTR.content || "TABINDEX_ATTR"),
          dismiss: prepareDismissal(`TABINDEX${$el.tagName + $el.id + $el.className}`),
          dismissAll: option.checks.TABINDEX_ATTR.dismissAll ? "TABINDEX_ATTR" : false,
          developer: option.checks.TABINDEX_ATTR.developer || true
        });
      });
    }
    return results;
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
    if (Options.constrainButtons && el.closest(Options.constrainButtons)) {
      return el.closest(Options.constrainButtons);
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
    if (Options.panelPosition === "left") {
      UI.panel.classList.add("ed11y-pin-left");
    }
    let xMost = 0;
    let yMost = 0;
    if (Elements.Found.panelNoCover) {
      Elements.Found.panelNoCover.forEach((el) => {
        const bounds = el.getBoundingClientRect();
        if (Options.panelPosition === "right") {
          xMost = window.innerWidth - bounds.left > xMost && bounds.left > window.innerWidth / 3 ? window.innerWidth - bounds.left : xMost;
        } else {
          xMost = bounds.right > xMost && xMost + bounds.right < window.innerWidth / 3 ? xMost + bounds.right : xMost;
        }
        yMost = bounds.height > yMost && bounds.height + yMost < window.innerHeight / 2 ? yMost + bounds.height : yMost;
      });
    }
    if (xMost > 0 && xMost < window.innerWidth - 240) {
      UI.panelElement.style.setProperty(Options.panelPosition, `${xMost + 10}px`);
      UI.panelElement.style.setProperty("bottom", Options.panelOffsetY);
    } else if (xMost > 0 && xMost > window.innerWidth - 240 && yMost > 0) {
      UI.panelElement.style.setProperty(Options.panelPosition, Options.panelOffsetX);
      UI.panelElement.style.setProperty("bottom", `calc(${Options.panelOffsetY} + ${yMost}px)`);
    } else {
      UI.panelElement.style.setProperty(Options.panelPosition, Options.panelOffsetX);
      UI.panelElement.style.setProperty("bottom", Options.panelOffsetY);
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
    if (!focusKnown && !document.querySelector("[contenteditable]:focus, [contenteditable] :focus")) {
      State.jumpList?.forEach((el) => {
        el.classList.remove("intersecting");
      });
      return;
    }
    if (!State.activeRange) {
      State.jumpList?.forEach((el) => {
        el.classList.remove("intersecting");
      });
      return;
    }
    const activeRects = State.activeRange.getBoundingClientRect();
    State.jumpList?.forEach((el) => {
      const toggle = el.shadowRoot.querySelector(".toggle");
      const framePositioner = el.result.fixedRoot && State.positionedFrames[el.result.fixedRoot] ? State.positionedFrames[el.result.fixedRoot] : { top: 0, left: 0 };
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
    if (State.jumpList.length === 0) {
      return;
    }
    State.alignPending = true;
    if (Options.fixedRoots) {
      State.positionedFrames.length = 0;
      Options.fixedRoots.forEach((root) => {
        if (root.framePositioner) {
          State.positionedFrames.push(root.framePositioner.getBoundingClientRect());
        }
      });
    }
    let previousNudgeTop = 0;
    let previousNudgeLeft = 0;
    const scrollTop = window.scrollY;
    if (!State.inlineAlerts) {
      for (let i = 0; i < State.jumpList.length; i++) {
        const mark = State.jumpList[i];
        if (!mark.result.element) {
          console.warn("Editoria11y debug: element disappeared");
          continue;
        }
        if (!mark.result.element.isConnected) {
          State.forceFullCheck = true;
          State.interaction = true;
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
          left = State.inlineAlerts ? left - 34 : left;
        }
        if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
          top = top + State.positionedFrames[mark.result.fixedRoot].top;
          left = left + State.positionedFrames[mark.result.fixedRoot].left;
        }
        if (mark.result.scrollableParent) {
          State.jumpList[i].bounds = mark.result.scrollableParent.getBoundingClientRect();
          if (left < State.jumpList[i].bounds.left) {
            left = State.jumpList[i].bounds.left;
          } else if (left + 40 > State.jumpList[i].bounds.right) {
            left = State.jumpList[i].bounds.right - 40;
          }
        } else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
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
      }
    } else {
      State.jumpList.forEach((mark) => {
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
      State.jumpList.forEach((mark) => {
        mark.markOffset = mark.getBoundingClientRect();
        mark.markLeft = mark.markOffset.left;
        mark.markTop = mark.markOffset.top;
      });
    }
    State.jumpList.forEach((mark, i) => {
      let nudgeTop = 10;
      let nudgeLeft = mark.result.element.tagName === "IMG" ? 10 : -34;
      if (mark.markTop + scrollTop < 0) {
        nudgeTop = -1 * (mark.markTop + scrollTop) - 6;
      }
      if (i > 0 && overlap(
        mark.markLeft,
        mark.markTop,
        State.jumpList[i - 1].markLeft,
        State.jumpList[i - 1].markTop
      ) || i > 1 && overlap(
        mark.markLeft,
        mark.markTop,
        State.jumpList[i - 2].markLeft,
        State.jumpList[i - 2].markTop
      ) || i > 2 && overlap(
        mark.markLeft,
        mark.markTop,
        State.jumpList[i - 3].markLeft,
        State.jumpList[i - 3].markTop
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
      } else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
        constrainLeft = State.positionedFrames[mark.result.fixedRoot].left;
        constrainRight = State.positionedFrames[mark.result.fixedRoot].right;
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
    if (!State.inlineAlerts) {
      State.jumpList.forEach((mark) => {
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
        } else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
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
      State.jumpList?.forEach((mark) => {
        mark.classList.remove("ed11y-preload");
      });
    }, 0);
  }
  function checkEmbeddedContent(results, option) {
    const src = ($el) => $el.getAttribute("src") || $el.querySelector("source[src]")?.getAttribute("src") || $el.querySelector("[src]")?.getAttribute("src") || null;
    if (option.checks.EMBED_AUDIO) {
      Elements.Found.Audio.forEach(($el) => {
        results.push({
          test: "EMBED_AUDIO",
          element: $el,
          type: option.checks.EMBED_AUDIO.type || "warning",
          content: Lang.sprintf(option.checks.EMBED_AUDIO.content || "EMBED_AUDIO"),
          dismiss: prepareDismissal(`AUDIO${src($el)}`),
          dismissAll: option.checks.EMBED_AUDIO.dismissAll ? "EMBED_AUDIO" : false,
          developer: option.checks.EMBED_AUDIO.developer || false
        });
      });
    }
    if (option.checks.EMBED_VIDEO) {
      Elements.Found.Videos.forEach(($el) => {
        const track = $el.querySelector("track");
        const trackSrc = track?.getAttribute("src");
        if (track === null || trackSrc === null || trackSrc.trim().length === 0) {
          results.push({
            test: "EMBED_VIDEO",
            element: $el,
            type: option.checks.EMBED_VIDEO.type || "warning",
            content: Lang.sprintf(option.checks.EMBED_VIDEO.content || "EMBED_VIDEO"),
            dismiss: prepareDismissal(`VIDEO${src($el)}`),
            dismissAll: option.checks.EMBED_VIDEO.dismissAll ? "EMBED_VIDEO" : false,
            developer: option.checks.EMBED_VIDEO.developer || false
          });
        }
      });
    }
    if (option.checks.EMBED_DATA_VIZ) {
      Elements.Found.Visualizations.forEach(($el) => {
        results.push({
          test: "EMBED_DATA_VIZ",
          element: $el,
          type: option.checks.EMBED_DATA_VIZ.type || "warning",
          content: Lang.sprintf(option.checks.EMBED_DATA_VIZ.content || "EMBED_DATA_VIZ"),
          dismiss: prepareDismissal(`DATAVIZ${src($el)}`),
          dismissAll: option.checks.EMBED_DATA_VIZ.dismissAll ? "EMBED_DATA_VIZ" : false,
          developer: option.checks.EMBED_DATA_VIZ.developer || false
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
        if (option.checks.EMBED_UNFOCUSABLE) {
          results.push({
            test: "EMBED_UNFOCUSABLE",
            element: $el,
            type: option.checks.EMBED_UNFOCUSABLE.type || "error",
            content: Lang.sprintf(option.checks.EMBED_UNFOCUSABLE.content || "EMBED_UNFOCUSABLE"),
            dismiss: prepareDismissal(`EMBEDUNFOCUSABLE${src($el)}`),
            dismissAll: option.checks.EMBED_UNFOCUSABLE.dismissAll ? "EMBED_UNFOCUSABLE" : false,
            developer: option.checks.EMBED_UNFOCUSABLE.developer || true
          });
        }
        return;
      }
      if (option.checks.EMBED_MISSING_TITLE) {
        const aria = computeAriaLabel($el);
        const checkTitle = aria === "noAria" ? $el.getAttribute("title") || "" : aria;
        const accessibleName = removeWhitespace(checkTitle);
        if (accessibleName.length === 0) {
          results.push({
            test: "EMBED_MISSING_TITLE",
            element: $el,
            type: option.checks.EMBED_MISSING_TITLE.type || "error",
            content: Lang.sprintf(option.checks.EMBED_MISSING_TITLE.content || "EMBED_MISSING_TITLE"),
            dismiss: prepareDismissal(`EMBEDMISSTITLE${src($el)}`),
            dismissAll: option.checks.EMBED_MISSING_TITLE.dismissAll ? "EMBED_MISSING_TITLE" : false,
            developer: option.checks.EMBED_MISSING_TITLE.developer || true
          });
        }
      }
    });
    if (option.checks.EMBED_GENERAL) {
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
        results.push({
          test: "EMBED_GENERAL",
          element: $el,
          type: option.checks.EMBED_GENERAL.type || "warning",
          content: Lang.sprintf(option.checks.EMBED_GENERAL.content || "EMBED_GENERAL"),
          dismiss: prepareDismissal(`IFRAMEGENERAL${src($el)}`),
          dismissAll: option.checks.EMBED_GENERAL.dismissAll ? "EMBED_GENERAL" : false,
          developer: option.checks.EMBED_GENERAL.developer || false
        });
      });
    }
    return results;
  }
  function customRuleset(results) {
    if (Options.checks.EMBED_CUSTOM) {
      const matchedEmbeds = getElements(Options.checks.EMBED_CUSTOM.sources, "root");
      Lang.langStrings.embeddedContent = `<div class="title" tabindex="-1">${Options.embeddedContentTitle}</div>${Options.embeddedContentMessage}`;
      matchedEmbeds.forEach(($el) => {
        results.push({
          test: "EMBED_CUSTOM",
          element: $el,
          type: "warning",
          content: Lang.sprintf("EMBED_CUSTOM"),
          inline: false,
          dismiss: prepareDismissal($el.tagName + $el.getAttribute("src")),
          dismissAll: "embeddedContent",
          developer: false
        });
      });
    }
    return results;
  }
  function syncResults(results) {
    if (!State.incremental) {
      window.setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent("ed11yResults", {
            // @todo cms/document new detail
            detail: {
              results,
              incremental: State.incremental
            }
          })
        );
      }, 0);
    }
  }
  const pushResult = async (i, inContent) => {
    if (!inContent) {
      State.splitConfiguration.devResults[i].outsideContentRoots = true;
      State.splitConfiguration.devResults[i].dismiss = `≈dev§${State.splitConfiguration.devResults[i].dismiss}`;
      await checkDismissed(i, true);
      if (State.splitConfiguration.showDev) {
        Results.push(State.splitConfiguration.devResults[i]);
      }
    } else if (State.splitConfiguration.devChecks.has(State.splitConfiguration.devResults[i].test)) {
      await checkDismissed(i, true);
      if (State.splitConfiguration.showDev) {
        Results.push(State.splitConfiguration.devResults[i]);
      }
    } else {
      await checkDismissed(i, true);
      Results.push(State.splitConfiguration.devResults[i]);
    }
  };
  async function handleSyncOnlyResults() {
    await filterAlerts(true).then((results) => {
      State.splitConfiguration.devResults = results;
    });
    Object.assign(Options, State.splitConfiguration.contentOptions);
    buildElementList(true);
    let everything = false;
    let headings = false;
    let images = false;
    let contrast = false;
    let links = false;
    for (let i = 0; i < State.splitConfiguration.devResults.length; i++) {
      const result = State.splitConfiguration.devResults[i];
      if (!result.element) {
        State.splitConfiguration.devResults.splice(i, 1);
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
    syncResults(State.splitConfiguration.devResults);
    Object.assign(Options, State.splitConfiguration.devOptions);
  }
  function countAlerts() {
    State.dismissedCount = 0;
    State.errorCount = 0;
    State.warningCount = 0;
    State.dismissedCount = 0;
    for (let i = Results.length - 1; i >= 0; i--) {
      if (Results[i].dismissalStatus) {
        State.dismissedCount++;
      } else if (Results[i].type === "warning") {
        State.warningCount++;
      } else {
        State.errorCount++;
      }
      let location = Results[i].element;
      const interactive = (location2) => location2.closest('a, button, img, svg, input, iframe, [role="button"], [role="link"]');
      const canPositionInside = (location2) => !interactive(location2) && location2.closest("p, table, li, blockquote, h1, h2, h3, h4, h5, h6");
      if (Results[i].element.shadowRoot) {
        while (location.parentElement?.shadowRoot) {
          location = location.parentElement;
        }
      }
      if (!canPositionInside(location)) {
        Results[i].location = interactive(location) ?? location;
        Results[i].position = "beforebegin";
      } else {
        Results[i].location = location;
        Results[i].position = "afterbegin";
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
  const inDismissals = (result, i, splitConfiguration, digest) => {
    if (Options.currentPage in State.dismissedAlerts && result.test in State.dismissedAlerts[Options.currentPage] && digest in State.dismissedAlerts[Options.currentPage][result.test]) {
      if (splitConfiguration) {
        State.splitConfiguration.devResults[i].dismissalStatus = State.dismissedAlerts[Options.currentPage][result.test][digest];
      } else {
        Results[i].dismissalStatus = State.dismissedAlerts[Options.currentPage][result.test][digest];
      }
    }
  };
  async function checkDismissed(i, splitConfiguration) {
    const result = splitConfiguration ? State.splitConfiguration.devResults[i] : Results[i];
    const digested = State.dismissKeys[result.dismiss];
    if (digested) {
      if (splitConfiguration) {
        State.splitConfiguration.devResults[i].dismiss = digested;
      } else {
        Results[i].dismiss = digested;
      }
      inDismissals(result, i, splitConfiguration, digested);
    } else {
      await dismissDigest(result.dismiss).then((digest) => {
        State.dismissKeys[result.dismiss] = digest;
        if (splitConfiguration) {
          State.splitConfiguration.devResults[i].dismiss = digest;
        } else {
          Results[i].dismiss = digest;
        }
        inDismissals(result, i, splitConfiguration, digest);
      });
    }
  }
  async function filterAlerts(splitConfiguration) {
    const results = splitConfiguration ? State.splitConfiguration.devResults : Results;
    for (let i = results.length - 1; i >= 0; i--) {
      let splice = false;
      if (results[i].test === "READABILITY") {
        State.readability = results[i];
        if (State.visualizing) {
          const badge = Constants.Panel.readabilityInfo?.querySelector(".readability-score");
          if (badge) {
            const badgeClass = results[i].difficultyToken === "GOOD" ? "readability-score" : "readability-score ed11y-warning";
            badge.setAttribute("class", badgeClass);
          }
        }
        splice = true;
      } else if (results[i].test === "META_TITLE") {
        if (Elements.Found.Headings.length > 0) {
          if (splitConfiguration) {
            State.splitConfiguration.devResults[i].element = Elements.Found.Everything[0];
            State.splitConfiguration.devResults[i].outsideContentRoots = true;
          } else {
            Results[i].element = Elements.Found.Everything[0];
          }
        }
      } else if (!results[i].element || results[i].type === "good") {
        splice = true;
      } else if (!splitConfiguration) {
        await checkDismissed(i, false);
      }
      if (splice) {
        if (splitConfiguration) {
          State.splitConfiguration.devResults.splice(i, 1);
        } else {
          Results.splice(i, 1);
        }
      }
    }
    return results;
  }
  function computeReadability(textArray, lang) {
    const readabilityArray = [];
    const punctuation = [".", "?", "!"];
    textArray.forEach((text) => {
      const lastCharacter = text[text.length - 1];
      const sentence = punctuation.includes(lastCharacter) ? text : `${text}.`;
      readabilityArray.push(sentence);
    });
    const pageText = readabilityArray.join(" ");
    if (pageText.length === 0) {
      return null;
    }
    if (["en", "es", "fr", "de", "nl", "it", "pt"].includes(lang)) {
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
      if (lang === "en") {
        flesch = 206.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words);
      } else if (lang === "fr") {
        flesch = 207 - 1.015 * (words / sentences) - 73.6 * (totalSyllables / words);
      } else if (lang === "es") {
        flesch = 206.84 - 1.02 * (words / sentences) - 0.6 * (100 * (totalSyllables / words));
      } else if (lang === "de") {
        flesch = 180 - words / sentences - 58.5 * (totalSyllables / words);
      } else if (lang === "nl") {
        flesch = 206.84 - 0.77 * (100 * (totalSyllables / words)) - 0.93 * (words / sentences);
      } else if (lang === "it") {
        flesch = 217 - 1.3 * (words / sentences) - 0.6 * (100 * (totalSyllables / words));
      } else if (lang === "pt") {
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
      if (fleschScore >= 0 && fleschScore < 30) {
        difficultyToken = "VERY_DIFFICULT";
      } else if (fleschScore > 31 && fleschScore < 49) {
        difficultyToken = "DIFFICULT";
      } else if (fleschScore > 50 && fleschScore < 60) {
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
    if (["sv", "fi", "da", "no", "nb", "nn"].includes(lang)) {
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
      if (score >= 0 && score < 39) {
        difficultyToken = "GOOD";
      } else if (score > 40 && score < 50) {
        difficultyToken = "FAIRLY_DIFFICULT";
      } else if (score > 51 && score < 61) {
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
  function checkReadability(results) {
    const pageText = Elements.Found.Readability.map(
      ($el) => getText(fnIgnore($el))
    ).filter(Boolean);
    const computed = computeReadability(pageText, Constants.Readability.Lang);
    let result;
    if (computed) {
      result = {
        test: "READABILITY",
        difficultyLevel: Lang._(computed.difficultyToken),
        ...computed
      };
      results.push(result);
    }
    if (Constants.Global.headless === false) {
      if (computed && result.wordCount > 30) {
        Constants.Panel.readabilityInfo.innerHTML = `${Math.ceil(result.score)} <span class="readability-score">${result.difficultyLevel}</span>`;
        Constants.Panel.readabilityDetails.innerHTML = `<li><strong>${Lang._("AVG_SENTENCE")}</strong> ${Math.ceil(result.averageWordsPerSentence)}</li><li><strong>${Lang._("COMPLEX_WORDS")}</strong> ${result.complexWords}%</li><li><strong>${Lang._("TOTAL_WORDS")}</strong> ${result.wordCount}</li>`;
      } else {
        Constants.Panel.readabilityInfo.innerHTML = `<br>${Lang._("READABILITY_NOT_ENOUGH")}`;
      }
    }
    return results;
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
    const altList = UI.panel.querySelector("#ed11y-alt-list");
    UI.imageAlts = [];
    Elements.Found.Images.forEach((img) => {
      const match = Results.find((i) => i.element === img);
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
        if (State.inlineAlerts) {
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
        if (State.inlineAlerts) {
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
      if (State.inlineAlerts) {
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
    if (State.inlineAlerts) {
      const reset2 = getElements(
        "ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight",
        "document",
        []
      );
      reset2?.forEach((el) => {
        el.remove();
      });
    }
    if (State.visualizing) {
      State.visualizing = false;
      UI.panel.querySelector("#ed11y-visualize .ed11y-sr-only").textContent = Lang._("PANEL_HEADING");
      UI.panel.querySelector("#ed11y-visualize").setAttribute("data-ed11y-pressed", "false");
      UI.panel.querySelector("#ed11y-visualizers").setAttribute("hidden", "true");
      return;
    }
    State.visualizing = true;
    UI.panel.querySelector("#ed11y-visualize .ed11y-sr-only").textContent = Lang._("buttonToolsActive");
    UI.panel.querySelector("#ed11y-visualize").setAttribute("data-ed11y-pressed", "true");
    UI.panel.querySelector("#ed11y-visualizers").removeAttribute("hidden");
    showAltPanel();
    showHeadingsPanel();
    if (Options.readabilityPlugin) {
      showReadability();
    }
  }
  const showReadability = () => {
    checkReadability(Results);
    for (let i = Results.length - 1; i >= 0; i--) {
      if (!Results[i].element) {
        Results.splice(i, 1);
      }
    }
  };
  function showHeadingsPanel() {
    const panelOutline = UI.panel.querySelector("#ed11y-outline");
    if (State.headingOutline.length) {
      panelOutline.innerHTML = "";
      State.headingOutline.forEach((result, i) => {
        if (State.inlineAlerts) {
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
        if (State.inlineAlerts) {
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
    if (State.bodyStyle !== true) {
      mark.classList.add("ed11y-preload");
    }
    mark.classList.add("ed11y-element");
    mark.setAttribute("id", `ed11y-result-${index}`);
    mark.setAttribute("data-ed11y-result", index);
    mark.setAttribute("data-ed11y-open", "false");
    if (!State.inlineAlerts) {
      mark.classList.add("ed11y-editable-result");
      State.panelAttachTo.insertAdjacentElement("beforeend", mark);
    } else {
      result.element.insertAdjacentElement(result.position, mark);
    }
    const shadow = mark.attachShadow({ mode: "open" });
    mark.resultID = mark.dataset.ed11yResult;
    mark.result = Results[mark.resultID];
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
    if (!State.inlineAlerts) {
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
    State.jumpList.unshift(mark);
    Results[index].toggle = mark;
  }
  function showResults() {
    buildJumpList();
    document.dispatchEvent(new CustomEvent("ed11yPanelOpened"));
    alignButtons();
    if (!State.inlineAlerts) {
      checkEditableIntersects();
      intersectionObservers();
    }
  }
  const panelJumpTo = (event) => {
    event.preventDefault();
    State.toggledFrom = event.target.closest("button");
    if (!State.showPanel) {
      togglePanel();
      window.setTimeout(() => {
        jumpTo();
      }, 500);
    } else {
      jumpTo();
    }
  };
  function updatePanel() {
    pauseObservers();
    if (State.incremental) {
      if (State.forceFullCheck || newIncrementalResults()) {
        State.forceFullCheck = false;
        resetResults(true);
      } else {
        Results.push(State.oldResults);
        if (!State.alignPending) {
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
        State.seen[encodeURI(Options.currentPage)] = State.totalCount;
        localStorage.setItem("editoria11yResultCount", JSON.stringify(State.seen));
      } else {
        delete State.seen[encodeURI(Options.currentPage)];
      }
    }
    if (!Options.headless) {
      if (!State.bodyStyle) {
        paintReady();
      }
      if (State.onLoad === true) {
        State.onLoad = false;
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
        if (Options.readabilityPlugin) {
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
        if (State.english) {
          UI.panel.querySelector("#ed11y-headings-tab .details-title").innerHTML = Lang._("panelCheckOutline");
          UI.panel.querySelector("#ed11y-alts-tab .details-title").innerHTML = Lang._("panelCheckAltText");
        }
        UI.panel.querySelector(".jump-next.ed11y-sr-only").textContent = State.english ? Lang._("buttonFirstContent") : `${Lang._("SKIP_TO_ISSUE")} 1`;
        UI.panel.setAttribute("aria-label", Lang._("CONTAINER_LABEL"));
        if (Options.reportsURL) {
          const reportLink = document.createElement("a");
          reportLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 61 29 32 64 32l384 0c35 0 64 29 64 64l0 320c0 35-29 64-64 64L64 480c-35 0-64-29-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
          reportLink.setAttribute("id", "ed11y-reports-link");
          reportLink.setAttribute("href", Options.reportsURL);
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
              if (State.tipOpen) {
                State.toggledFrom?.focus();
                State.openTip.button.shadowRoot.querySelector("button").click();
              }
            }
          }
        };
        document.addEventListener("keyup", (event) => {
          escapeWatch(event);
        });
        if (State.ignoreAll || !State.inlineAlerts && State.totalCount > 75) {
          State.showPanel = false;
        } else if (Options.alertMode === "active" || !Options.userPrefersShut || State.showDismissed) {
          State.showPanel = true;
        } else if (State.totalCount > 0 && !State.ignoreAll && (Options.alertMode === "assertive" || Options.alertMode === "polite" && State.seen[encodeURI(Options.currentPage)] !== State.totalCount)) {
          State.showPanel = true;
        }
      } else if (!State.inlineAlerts) {
        State.oldResultString = `${State.errorCount} ${State.warningCount}`;
        Results.forEach((result) => {
          State.oldResultString += result.test + result.element?.outerHTML;
        });
      }
      if (!State.showPanel) {
        reset();
      } else {
        State.showPanel = true;
        UI.panel.classList.remove("ed11y-shut");
        UI.panel.classList.add("ed11y-active");
        const preferredDismissHide = State.dismissedCount > 1 ? Lang.sprintf("buttonHideHiddenAlerts", State.dismissedCount) : Lang._("buttonHideHiddenAlert");
        if (State.dismissedCount === 0) {
          UI.panelShowDismissed.setAttribute("hidden", "");
          UI.panelShowDismissed.setAttribute("data-ed11y-pressed", "false");
          State.showDismissed = false;
        } else if (State.dismissedCount === 1) {
          const show = State.english ? Lang._("buttonShowHiddenAlert") : Lang.sprintf("PANEL_DISMISS_BUTTON", "1");
          UI.panelShowDismissed.querySelector(".ed11y-sr-only").textContent = State.showDismissed ? preferredDismissHide : show;
          UI.panelShowDismissed.dataset.ed11yPressed = `${State.showDismissed}`;
          if (!State.english) {
            UI.panelShowDismissed.ariaPressed = State.showDismissed;
          }
          UI.panelShowDismissed.removeAttribute("hidden");
        } else {
          UI.panelShowDismissed.querySelector(".ed11y-sr-only").textContent = State.showDismissed ? preferredDismissHide : Lang.sprintf("PANEL_DISMISS_BUTTON", State.dismissedCount);
          UI.panelShowDismissed.dataset.ed11yPressed = `${State.showDismissed}`;
          if (!State.english) {
            UI.panelShowDismissed.ariaPressed = State.showDismissed;
          }
          UI.panelShowDismissed.removeAttribute("hidden");
        }
        window.setTimeout(() => {
          if (!State.ignoreAll) {
            requestAnimationFrame(() => showResults());
          }
        }, 0);
      }
      panelLabel();
      if (State.totalCount > 0 || State.showDismissed && State.dismissedCount > 0) {
        UI.panelJumpNext.removeAttribute("hidden");
        if (State.errorCount > 0) {
          UI.panel.classList.remove("ed11y-warnings", "ed11y-pass");
          UI.panel.classList.add("ed11y-errors");
          document.documentElement.style.setProperty("--ed11y-activeBackground", Theme.alert);
          document.documentElement.style.setProperty("--ed11y-activeColor", "#fff");
          document.documentElement.style.setProperty("--ed11y-activeBorder", "#fff7");
          document.documentElement.style.setProperty("--ed11y-activePanelBorder", "#def");
        } else if (State.warningCount > 0) {
          UI.panel.classList.remove("ed11y-errors", "ed11y-pass");
          UI.panel.classList.add("ed11y-warnings");
          document.documentElement.style.setProperty("--ed11y-activeBackground", Theme.warning);
          document.documentElement.style.setProperty("--ed11y-activeColor", "#111");
          document.documentElement.style.setProperty("--ed11y-activeBorder", "#947605");
          document.documentElement.style.setProperty("--ed11y-activePanelBorder", "#947605");
        } else {
          UI.panel.classList.remove("ed11y-errors", "ed11y-warnings");
          UI.panel.classList.add("ed11y-pass");
          document.documentElement.style.setProperty("--ed11y-activeBackground", Theme.panelBar);
          document.documentElement.style.setProperty("--ed11y-activeColor", Theme.panelBarText);
          document.documentElement.style.setProperty(
            "--ed11y-activeBorder",
            `${Theme.panelBarText}44`
          );
          document.documentElement.style.setProperty(
            "--ed11y-activePanelBorder",
            `${Theme.panelBarText}88`
          );
        }
        if (State.dismissedCount > 0 && State.totalCount === 0) {
          UI.panelCount.textContent = State.dismissedCount;
        } else {
          UI.panelCount.textContent = State.totalCount > 99 ? "99+" : State.totalCount;
        }
      } else {
        UI.panelJumpNext.setAttribute("hidden", "");
        document.documentElement.style.setProperty("--ed11y-activeBackground", Theme.panelBar);
        document.documentElement.style.setProperty("--ed11y-activeColor", Theme.panelBarText);
        document.documentElement.style.setProperty("--ed11y-activeBorder", `${Theme.panelBarText}44`);
        document.documentElement.style.setProperty(
          "--ed11y-activePanelBorder",
          `${Theme.panelBarText}88`
        );
        UI.panelCount.style.display = "display: none;";
        UI.panel.classList.remove("ed11y-warnings", "ed11y-errors");
        UI.panel.classList.add("ed11y-pass");
        if (State.dismissedCount > 0) {
          UI.panelCount.textContent = "i";
          if (!State.showPanel) {
            UI.panelToggleTitle.textContent = State.dismissedCount > 1 ? Lang.sprintf("PANEL_DISMISS_BUTTON", State.dismissedCount) : Lang._("buttonShowHiddenAlert");
          }
        }
      }
      UI.panelToggle.classList.remove("disabled");
      UI.panelToggle.removeAttribute("aria-disabled");
      alignPanel();
      UI.panel.classList.remove("ed11y-preload");
    }
    resumeObservers();
    State.running = false;
  }
  function buildJumpList() {
    State.jumpList = [];
    pauseObservers();
    for (let i = 0; i < Results.length; i++) {
      let top = Results[i].element.getBoundingClientRect().top;
      if (!top) {
        const visibleParent = firstVisibleParent(Results[i].element);
        if (visibleParent) {
          top = visibleParent.getBoundingClientRect().top;
        }
      }
      top = top + window.scrollY;
      if (Options.fixedRoots) {
        const root = Results[i].element.closest("[data-ed11y-root]");
        Results[i].fixedRoot = root ? root.dataset.ed11yRoot : false;
      }
      Results[i].scrollableParent = closestScrollable(Results[i].element);
      if (Results[i].scrollableParent) {
        top = top * 1e-6;
      }
      Results[i].sortPos = top;
    }
    Results.sort((a, b) => b.sortPos - a.sortPos);
    Results?.forEach((result, i) => {
      if (result.element && (!result.dismissalStatus || State.showDismissed)) {
        drawResult(result, i);
      }
    });
    State.jumpList.forEach((el, i) => {
      el.dataset.ed11yJumpPosition = `${i}`;
      const newLabel = `${Lang._("ALERT_TEXT")} ${i + 1} / ${State.jumpList.length - 1}, ${el.shadowRoot.querySelector(".toggle").getAttribute("aria-label")}`;
      el.shadowRoot.querySelector(".toggle").setAttribute("aria-label", newLabel);
    });
    const tipsPainted = new CustomEvent("ed11yResultsPainted");
    document.dispatchEvent(tipsPainted);
    resumeObservers();
  }
  function dismissOne(dismissalType, test, dismissalKey) {
    if (State.dismissKeys[dismissalKey]) {
      dismissalKey = State.dismissKeys[dismissalKey];
    }
    if (dismissalType === "reset") {
      delete State.dismissedAlerts[Options.currentPage][test][dismissalKey];
      if (Object.keys(State.dismissedAlerts[Options.currentPage][test]).length === 0) {
        delete State.dismissedAlerts[Options.currentPage][test];
      }
      if (Object.keys(State.dismissedAlerts[Options.currentPage]).length === 0) {
        delete State.dismissedAlerts[Options.currentPage];
      }
    } else {
      const dismissal = {};
      dismissal[dismissalKey] = dismissalType;
      if (typeof State.dismissedAlerts[Options.currentPage] === "undefined") {
        const store2 = {};
        store2[test] = dismissal;
        State.dismissedAlerts[Options.currentPage] = store2;
      } else if (typeof State.dismissedAlerts[Options.currentPage][test] === "undefined") {
        State.dismissedAlerts[Options.currentPage][test] = dismissal;
      } else {
        State.dismissedAlerts[Options.currentPage][test][dismissalKey] = dismissalType;
      }
      UI.panelShowDismissed.removeAttribute("hidden");
    }
    if (Options.syncedDismissals === false) {
      localStorage.setItem("ed11ydismissed", JSON.stringify(State.dismissedAlerts));
    }
    const dismissalDetail = {
      dismissPage: Options.currentPage,
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
    const result = Results[resultID];
    let el = UI.editableHighlight[resultID]?.highlight;
    if (!el) {
      el = document.createElement("ed11y-element-highlight");
      el.classList.add("ed11y-element");
      UI.editableHighlight[resultID] = { highlight: el, resultID };
      el.style.setProperty("position", "absolute");
      el.style.setProperty("pointer-events", "none");
      State.panelAttachTo.appendChild(el);
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
    if (!State.tipOpen) {
      return;
    }
    const id = State.openTip.tip.dataset.ed11yResult;
    const target = Results[id].element;
    const editable = target.closest("[contenteditable]");
    if (!editable && !target.closest("textarea, input")) {
      if (target.closest("a, button")) {
        State.toggledFrom = target.closest("a, button");
      } else if (target.getAttribute("tabindex") !== null) {
        State.toggledFrom = target;
      } else {
        target.setAttribute("tabindex", "0");
        State.toggledFrom = target;
      }
      State.openTip.tip.shadowRoot.querySelector(".close").click();
    } else {
      State.toggledFrom = false;
      if (target.getAttribute("contenteditable") === "true") {
        State.toggledFrom = target;
      } else if (target.closest('p[contenteditable="true"]')) {
        State.toggledFrom = target.closest('p[contenteditable="true"]');
      } else {
        State.toggledFrom = false;
      }
      State.openTip.tip.shadowRoot.querySelector(".close").click();
      if (!State.toggledFrom && editable) {
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
    if (!Options.cssUrls) {
      const cssLink = document.querySelector(
        'link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]'
      );
      if (cssLink) {
        Options.cssUrls = [cssLink.getAttribute("href")];
      } else {
        console.warn("Editoria11y CSS file parameter is missing; attempting to load from CDN.");
        Options.cssUrls = [
          `https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`
        ];
      }
    }
    for (const [key, value] of Object.entries(Theme)) {
      document.documentElement.style.setProperty(`--ed11y-${key}`, `${value}`);
    }
    if (document.querySelector("body")) {
      UI.attachCSS(document.querySelector("body"));
    }
    State.roots.forEach((root) => {
      if (Options.shadowComponents) {
        root.querySelectorAll(Options.shadowComponents)?.forEach((shadowHost) => {
          if (shadowHost.shadowRoot) {
            UI.attachCSS(shadowHost.shadowRoot);
          }
        });
      }
    });
    State.bodyStyle = "drawing";
    window.setTimeout(() => {
      State.bodyStyle = true;
    }, 1e3);
  }
  function alertOnInvisibleTip(button, target) {
    let delay = 100;
    if (Options.hiddenHandlers.length > 0 && !!target.closest(Options.hiddenHandlers)) {
      delay = 333;
      document.dispatchEvent(
        new CustomEvent("ed11yShowHidden", {
          detail: { result: button.getAttribute("data-ed11y-result") }
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
        if (Options.checkVisible && !visible(target2)) {
          button2.dataset.ed11yHiddenResult = "true";
          firstVisible = firstVisibleParent(target2);
          alertMessage = Lang._("NOT_VISIBLE");
        } else if (target2.closest('[aria-hidden="true"]')) {
          firstVisible = target2.closest('[aria-hidden="true"]');
          firstVisible = firstVisible.closest(':not([aria-hidden="true"])');
          alertMessage = Lang._("NOT_VISIBLE");
        }
        if (firstVisible) {
          const tipAlert = State.openTip.tip?.shadowRoot.querySelector(".invisible-alert");
          tipAlert.textContent = alertMessage;
        }
        if (State.viaJump) {
          const scrollPin = window.innerHeight > 900 || window.innerWidth > 800 && window.innerHeight > 600 ? "center" : "start";
          let scrollTarget = State.inlineAlerts ? button2 : target2;
          if (button2.dataset.ed11yHiddenResult || !visible(scrollTarget)) {
            scrollTarget = firstVisibleParent(target2);
          }
          if (scrollTarget && typeof scrollTarget.scrollIntoView === "function") {
            scrollTarget.scrollIntoView({ block: scrollPin, behavior: "instant" });
          } else {
            raceCrash();
            return false;
          }
        }
        if (!State.inlineAlerts) {
          editableHighlighter(button2.dataset.ed11yResult, true, firstVisible);
        } else {
          if (firstVisible) {
            firstVisible.classList.add("ed11y-hidden-highlight");
          }
        }
        const activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
        if (!activeTip) {
          button2.setAttribute("data-ed11y-action", "open");
          if (State.viaJump) {
            window.setTimeout(() => {
              const activeTip2 = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
              if (State.viaJump) {
                activeTip2?.shadowRoot.querySelector(".title").focus();
              }
            }, 100);
          }
        } else {
          if (State.viaJump) {
            window.setTimeout(
              () => {
                activeTip?.shadowRoot.querySelector(".title").focus();
              },
              100,
              activeTip
            );
          }
        }
        State.viaJump = false;
      },
      delay,
      button,
      target
    );
  }
  function jumpTo(next = true) {
    if (!State.showPanel) {
      return false;
    }
    State.viaJump = true;
    const goMax = State.jumpList.length - 1;
    let goNum = next ? +State.lastOpenTip + 1 : +State.lastOpenTip - 1;
    if (goNum < 0) {
      State.nextText = Lang._("SKIP_TO_ISSUE");
      goNum = goMax;
    } else if (goNum > goMax) {
      goNum = 0;
      State.nextText = Lang._("SKIP_TO_ISSUE");
    } else {
      const showNum = Number.isNaN(goNum) ? 2 : goNum + 2;
      State.nextText = `${Lang._("SKIP_TO_ISSUE")} ${showNum}`;
    }
    State.lastOpenTip = goNum;
    window.setTimeout(() => {
      UI.panelJumpNext.querySelector(".ed11y-sr-only").textContent = State.nextText;
    }, 250);
    resetClass(["ed11y-hidden-highlight"]);
    if (State.jumpList.length === 0) {
      buildJumpList();
    }
    let goto = State.jumpList[goNum];
    if (!goto) {
      goto = State.jumpList[0];
      State.lastOpenTip = 0;
    }
    const result = goto.getAttribute("data-ed11y-result");
    const gotoResult = Results[result];
    const target = gotoResult.element;
    const scrollPin = window.innerHeight > 900 || window.innerWidth > 800 && window.innerHeight > 600 ? "center" : "start";
    let scrollTarget = State.inlineAlerts ? goto : target;
    if (goto.dataset.ed11yHiddenResult || !visible(scrollTarget)) {
      scrollTarget = firstVisibleParent(target);
    }
    if (scrollTarget && typeof scrollTarget.scrollIntoView === "function") {
      scrollTarget.scrollIntoView({ block: scrollPin, behavior: "instant" });
    } else {
      raceCrash();
      return false;
    }
    goto.setAttribute("data-ed11y-action", "open");
    State.scrollPending = 2;
    updateTipLocations();
  }
  const incrementalAlign = lagBounce(() => {
    if (!State.running && !State.alignPending) {
      State.scrollPending++;
      updateTipLocations();
      State.alignPending = false;
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
    const result = Results[resultNum];
    const scrollTop = window.scrollY;
    const leftAdd = State.inlineAlerts ? window.scrollX : 0;
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
    if (!State.scrollTicking && State.scrollPending > 0 && !State.running && State.jumpList && State.showPanel) {
      State.scrollTicking = true;
      alignButtons();
      if (State.tipOpen) {
        alignTip(State.openTip.button.shadowRoot.querySelector("button"), State.openTip.tip);
      }
      State.scrollPending--;
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
        if (root.framePositioner) {
          State.positionedFrames.push(root.framePositioner.getBoundingClientRect());
        }
      });
    }
    UI.editableHighlight.every((el) => {
      if (!Results[el.resultID]) {
        State.interaction = true;
        State.forceFullCheck = true;
        UI.editableHighlight = [];
        incrementalCheckDebounce(true);
        return false;
      }
      const framePositioner = Results[el.resultID].fixedRoot && State.positionedFrames[Results[el.resultID].fixedRoot] ? State.positionedFrames[Results[el.resultID].fixedRoot] : { top: 0, left: 0 };
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
    State.interaction = true;
    incrementalCheckDebounce();
  }, 500);
  function windowResize() {
    if (UI.panel?.classList.contains("ed11y-active") === true) {
      alignAlts();
      alignButtons();
    }
    if (State.tipOpen) {
      alignTip(State.openTip.button.shadowRoot.querySelector("button"), State.openTip.tip);
    }
    alignPanel();
  }
  const scrollWatch = (container) => {
    container.addEventListener(
      "scroll",
      () => {
        if (!State.inlineAlerts) {
          State.scrollPending = State.scrollPending < 2 ? State.scrollPending + 1 : State.scrollPending;
          requestAnimationFrame(() => updateTipLocations());
        } else if (State.tipOpen) {
          alignTip(State.openTip.button.shadowRoot.querySelector("button"), State.openTip.tip);
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
        if (!State.running) {
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
    if (!anchor || expandable && (State.roots.includes(anchor.parentNode) || anchor.parentNode.matches('div[contenteditable="true"]'))) {
      State.activeRange = false;
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
      if (State.activeRange) {
        State.activeRange = false;
        return true;
      } else {
        return false;
      }
    } else {
      const sameRange = State.activeRange && range.startContainer === State.activeRange.startContainer && range.startOffset === State.activeRange.startOffset;
      State.activeRange = range;
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
      if (State.inlineAlerts) {
        return 1;
      }
      if (!node.matches("[contenteditable] *")) {
        return 0;
      }
      if (State.inlineAlerts) {
        return true;
      }
      const searchList = "table, h1, h2, h3, h4, h5, h6, blockquote";
      if (!State.inlineAlerts && !node.matches(node.matches(searchList)) && node.matches("[contenteditable] *")) {
        if (node.matches("table *")) {
          node = node.closest("table");
        } else if (!node.matches(searchList)) {
          node = node.querySelector(searchList);
        }
      }
      if (node?.matches(searchList)) {
        State.recentlyAddedNodes.set(node, Date.now());
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
        State.alignPending = false;
      }, 0);
      window.setTimeout(() => {
        incrementalCheckDebounce();
      }, 0);
    };
    const observer = new MutationObserver(callback);
    observer.observe(root, config);
    State.watching.push({
      observer,
      root,
      config
    });
    document.addEventListener(
      "readystatechange",
      () => {
        window.setTimeout(() => {
          State.scrollPending++;
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
        State.scrollPending++;
        updateTipLocations();
        window.setTimeout(() => {
          State.forceFullCheck = true;
          incrementalCheckDebounce();
        }, 100);
      },
      {
        passive: true
      }
    );
    window.setTimeout(() => {
      State.scrollPending++;
      updateTipLocations();
    }, 1e3);
  }
  const enqueueTests = (queue, results) => {
    const test = queue.pop();
    State.testsRemaining--;
    try {
      switch (test) {
        case "group1":
          checkHeaders(results, Options, State.headingOutline);
          checkImages(results, Options);
          checkEmbeddedContent(results, Options);
          customRuleset(results);
          checkQA(results, Options);
          break;
        case "group2":
          checkLinkText(results, Options);
          break;
        case "checkLabels":
          checkLabels(results, Options);
          break;
        case "checkContrast":
          checkContrast(results, Options);
          break;
        case "checkDeveloper":
          checkDeveloper(results, Options);
          break;
      }
    } catch (error) {
      showError(error);
    }
    if (queue.length > 0) {
      if (State.browserSpeed < 100 || Options.headless) {
        enqueueTests(queue, results);
      } else {
        window.setTimeout(
          (queue2) => {
            enqueueTests(queue2, results);
          },
          0,
          queue,
          results
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
    Options.customTests--;
    State.customTestsRemaining = 0;
    continueCheck(true).then();
    if (Options.customTests === 0) {
      document.removeEventListener("ed11yResume", () => {
        continueCheck(true).then();
      });
    }
  }
  State.testsRemaining = 0;
  function checkAll() {
    if (State.tipOpen) {
      return false;
    }
    State.disabled = false;
    if (checkRunPrevent()) {
      disable();
    }
    State.customTestsRunning = false;
    if (State.splitConfiguration.active) {
      Object.assign(Options, State.splitConfiguration.devOptions);
    }
    State.roots = [];
    if (Options.fixedRoots) {
      Options.fixedRoots.forEach((root) => {
        State.roots.push(root);
      });
    } else {
      State.roots = document.querySelectorAll(`:is(${Options.checkRoot})`);
    }
    if (!State.roots && Options.headless === false) {
      console.warn(Lang.sprintf("MISSING_ROOT", Options.checkRoot));
    }
    if (State.roots.length === 0) {
      if (State.onLoad) {
        console.warn(Lang._("MISSING_ROOT"));
      }
      disable();
      return;
    }
    if (State.incremental) {
      State.oldResults = Results;
    }
    Results.length = 0;
    State.splitConfiguration.devResults.length = 0;
    buildElementList();
    if (Options.customTests > 0) {
      State.customTestsRemaining += Options.customTests;
      window.clearTimeout(State.customTestTimeout);
      State.customTestTimeout = window.setTimeout(() => {
        if (State.customTestsRemaining > 0) {
          removeCustomTest();
        }
      }, 1e3);
      const customTests = new CustomEvent("ed11yRunCustomTests");
      document.dispatchEvent(customTests);
    }
    const queue = ["group1", "group2"];
    if (Options.formLabelsPlugin) {
      queue.push("checkLabels");
    }
    if (Options.developerPlugin) {
      queue.push("checkDeveloper");
    }
    if (Options.contrastPlugin) {
      queue.push("checkContrast");
    }
    State.testsRemaining = queue.length;
    enqueueTests(
      queue,
      State.splitConfiguration.active ? State.splitConfiguration.devResults : Results
    );
  }
  async function continueCheck(customCheck = false) {
    if (customCheck) {
      State.customTestsRemaining--;
    }
    if (State.customTestsRemaining + State.testsRemaining > 0) {
      return;
    }
    if (State.splitConfiguration.active && State.splitConfiguration.devResults.length > 0) {
      await handleSyncOnlyResults();
    } else {
      await filterAlerts(false);
      syncResults(Results);
    }
    countAlerts();
    if (typeof UI.panelToggle.querySelector === "function") {
      panelLabel();
    }
    if (State.visualizing) {
      if (Options.readabilityPlugin && (!State.incremental || State.visualizing)) {
        checkReadability(
          State.splitConfiguration.active ? State.splitConfiguration.devResults : Results
        );
      }
      showHeadingsPanel();
      showAltPanel();
    }
    updatePanel();
    window.setTimeout(() => {
      if (Options.watchForChanges) {
        Elements.Found.editable?.forEach((editable) => {
          if (!editable.matches(".drag-observe")) {
            editable.classList.add("drag-observe");
            editable.addEventListener("drop", () => {
              State.forceFullCheck = true;
              incrementalCheckDebounce();
            });
          }
        });
        if (Options.watchForChanges === "checkRoots") {
          State.roots?.forEach((root) => {
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
    if (!State.running) {
      if (State.tipOpen || !State.interaction && !State.forceFullCheck) {
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
      window.setTimeout(() => {
        if (State.visualizing) {
          document.dispatchEvent(new CustomEvent("ed11yEndVisualization"));
        }
      }, 500);
      runTime = performance.now() - runTime;
      State.browserSpeed = runTime > 100 ? 100 : (State.browserSpeed + runTime) / 2;
      State.browserLag = State.browserSpeed < 1 ? 0 : State.browserSpeed * 100 + State.totalCount;
    } else {
      window.setTimeout(() => {
        incrementalCheckDebounce();
      }, 250);
    }
  }
  const incrementalCheckDebounce = lagBounce(() => {
    incrementalCheck();
  }, 250);
  function resetPanel() {
    State.visualizing = true;
    visualize();
    if (State.totalCount === 0 && State.dismissedCount > 0) {
      UI.panelCount.textContent = "i";
      UI.panelToggleTitle.textContent = State.dismissedCount === 1 ? Lang._("buttonShowHiddenAlert") : Lang.sprintf("PANEL_DISMISS_BUTTON", State.dismissedCount);
    }
    if (typeof UI.panel === "object") {
      UI.panel?.classList.add("ed11y-shut");
      UI.panel?.classList.remove("ed11y-active");
      UI.panelToggle.ariaExpanded = false;
      if (!State.showDismissed && typeof UI.panelShowDismissed === "function") {
        UI.panelShowDismissed.setAttribute("data-ed11y-pressed", "false");
        UI.panelShowDismissed.querySelector(".ed11y-sr-only").textContent = State.dismissedCount === 1 ? Lang._("buttonShowHiddenAlert") : Lang.sprintf("PANEL_DISMISS_BUTTON", State.dismissedCount);
      }
    }
  }
  window.addEventListener("ed11yEndVisualization", () => {
    State.visualizing = false;
    pauseObservers();
    visualize();
    resumeObservers();
  });
  function dismissThis(dismissalType, all = false) {
    const removal = State.openTip;
    const id = removal.tip.dataset.ed11yResult;
    const test = Results[id].test;
    if (all) {
      Results.forEach((result) => {
        if (result.test === test && result.dismissalStatus !== dismissalType) {
          dismissOne(dismissalType, test, result.dismiss);
        }
      });
    } else {
      const dismissalKey = Results[id].dismiss;
      dismissOne(dismissalType, test, dismissalKey);
    }
    resetClass(["ed11y-hidden-highlight", "ed11y-ring-red", "ed11y-ring-yellow"]);
    removal.tip?.parentNode?.removeChild(removal.tip);
    removal.button?.parentNode?.removeChild(removal.button);
    remove("ed11y-element-highlight", "document");
    UI.editableHighlight = [];
    reset();
    State.showPanel = true;
    checkAll();
    const rememberGoto = State.lastOpenTip;
    window.setTimeout(
      () => {
        if (State.jumpList.length > 0) {
          State.lastOpenTip = rememberGoto - 1;
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
    State.ignoreAll = false;
    State.showDismissed = !State.showDismissed;
    State.forceFullCheck = true;
    State.showPanel = true;
    resetResults();
    incrementalCheck();
    UI.panelShowDismissed.setAttribute("data-ed11y-pressed", `${State.showDismissed}`);
    window.setTimeout(() => {
      UI.panelShowDismissed.focus();
    }, 0);
  }
  function togglePanel() {
    State.ignoreAll = false;
    if (!State.doubleClickPrevent) {
      if (State.running !== true) {
        State.running = true;
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
          localStorage.setItem("editoria11yShow", "1");
        } else {
          State.showDismissed = false;
          State.showPanel = false;
          reset();
          Options.userPrefersShut = true;
          localStorage.setItem("editoria11yShow", "0");
        }
        panelLabel();
      }
    }
    State.doubleClickPrevent = true;
    window.setTimeout(() => {
      State.doubleClickPrevent = false;
    }, 200);
    return false;
  }
  function raceCrash() {
    if (State.loopStop) {
      return;
    }
    State.loopStop = true;
    reset();
    State.showPanel = true;
    checkAll();
    window.setTimeout(
      () => {
        if (Results.length > 0 && State.loopStop) {
          jumpTo();
          State.loopStop = false;
        }
      },
      100,
      State.loopStop
    );
  }
  function disable() {
    if (State.showPanel && !State.closedByDisable) {
      State.closedByDisable = true;
    }
    State.disabled = true;
    reset();
    document.documentElement.style.setProperty("--ed11y-activeBackground", Theme.panelBar);
    document.documentElement.style.setProperty("--ed11y-activeColor", Theme.panelBarText);
    document.documentElement.style.setProperty("--ed11y-activeBorder", `${Theme.panelBarText}44`);
    document.documentElement.style.setProperty("--ed11y-activePanelBorder", "transparent");
    if (typeof UI.panelToggle.querySelector === "function") {
      UI.panel?.classList.remove("ed11y-errors", "ed11y-warnings");
      UI.panelCount.textContent = "i";
      UI.panelJumpNext.setAttribute("hidden", "");
      UI.panelToggle.classList.add("disabled");
      UI.panelToggle.querySelector(".ed11y-sr-only").textContent = State.english ? Lang._("toggleDisabled") : Lang._("CONTAINER_LABEL");
    }
  }
  function reset() {
    pauseObservers();
    resetResults();
    resetPanel();
    State.incremental = false;
    State.running = false;
    State.showPanel = false;
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
        State.toggledFrom = this;
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
        State.toggledFrom = this;
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
      if (State.tipOpen) {
        State.openTip.button.setAttribute("data-ed11y-action", "close");
      }
    }
    buildTip() {
      this.tipNeedsBuild = false;
      const tip = document.createElement("ed11y-element-tip");
      tip.result = this.result;
      tip.setAttribute("data-ed11y-result", this.resultID);
      tip.classList.add("ed11y-element");
      tip.style.setProperty("opacity", "0");
      State.panelAttachTo.insertAdjacentElement("beforeend", tip);
      this.tip = tip;
    }
    toggleTip(changeTo) {
      if (this.tipNeedsBuild) {
        this.buildTip();
      }
      this.toggle.setAttribute("aria-expanded", changeTo);
      const highlightOutline = this.dismissable ? "ed11y-ring-yellow" : "ed11y-ring-red";
      if (State.inlineAlerts) {
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
        if (State.inlineAlerts) {
          this.result.element.classList.add(highlightOutline);
        }
        requestAnimationFrame(() => alignTip(this.toggle, this.tip, 4, true));
        if (State.jumpList.length === 0) {
          console.warn("Editoria11y race condition: toggle without jump list");
          buildJumpList();
        }
        State.lastOpenTip = Number(this.getAttribute("data-ed11y-jump-position"));
        State.tipOpen = true;
        State.openTip = {
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
        State.tipOpen = false;
        State.openTip = {
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
          if (!State.showPanel) {
            togglePanel();
          }
          visualize();
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
      this.issueNext = this.issueIndex < State.jumpList.length ? this.issueIndex + 2 : 0;
      this.issuePrev = this.issueIndex > 0 ? this.issueIndex : State.jumpList.length;
      this.dismissable = this.result.type !== "error";
      this.dismissed = !!this.result.dismissalStatus;
      this.wrapper = document.createElement("div");
      this.wrapper.setAttribute("role", "dialog");
      this.wrapper.dataset.ed11yTest = this.result.test;
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
			<div class="content">
				<div class="message"></div>
				<div class="content-footer">
					<div class="edit-links"></div>
					<div class="count"><span class="count-text"></span> <span class="count-number"></span></div>
				</div>
			</div>
			<div class="footer">
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
      if (this.result.content.includes('class="title"')) {
        content.innerHTML = this.result.content.split("<hr")[0];
      } else {
        const innerContent = document.createElement("div");
        const sentences = this.result.content.split(/[.!]/);
        const firstSentence = document.createElement("div");
        firstSentence.innerHTML = `${sentences.shift()}.`;
        firstSentence.classList.add("title");
        firstSentence.setAttribute("tabindex", "-1");
        innerContent.append(firstSentence);
        const theRest = document.createElement("div");
        theRest.classList.add("sa11y-tip");
        theRest.innerHTML = sentences.join(".");
        innerContent.appendChild(theRest);
        content.append(innerContent);
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
      if (!State.inlineAlerts || Options.editLinks) {
        const editBar = document.createElement("div");
        if (!State.inlineAlerts) {
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
          editBar.append(Options.editLinks.cloneNode(true));
        }
        this.contentFooter = this.wrapper.querySelector(".content-footer");
        this.contentFooter.prepend(editBar);
      }
      const buttonBar = this.wrapper.querySelector(".ed11y-tip-dismissals");
      if (this.dismissable) {
        const dismissIcon = document.createElement("span");
        dismissIcon.classList.add("ed11y-dismiss-icon");
        dismissIcon.innerHTML = spriteDismiss;
        if (State.showDismissed && this.dismissed) {
          const okd = State.dismissedAlerts[Options.currentPage][this.result.test][this.result.dismiss] === "ok";
          if (okd && Options.allowOK || !okd) {
            const unDismissButton = document.createElement("button");
            const unDismissIcon = document.createElement("span");
            unDismissIcon.classList.add("ed11y-dismiss-icon");
            unDismissIcon.innerHTML = spriteUnDismiss;
            unDismissButton.classList.add("dismiss");
            unDismissButton.textContent = okd ? Lang._("unDismissOKButton") : Lang._("unDismissHideButton");
            unDismissButton.prepend(unDismissIcon);
            buttonBar.prepend(unDismissButton);
            unDismissButton.addEventListener("click", () => {
              dismissThis("reset");
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
          pageActionsSummary.textContent = Lang.sprintf("dismissActions");
          const othersLikeThis = Results.filter((el) => el.test === this.result.test).length;
          const pageActionsContent = pageActions.querySelector(".ed11y-bulk-actions-content");
          const showPageActions = othersLikeThis > 3 && (Options.allowHide || Options.allowOK);
          if (showPageActions) {
            pageActions.classList.remove("ed11y-hidden");
          }
          if (Options.allowOK) {
            const check = document.createElement("span");
            check.setAttribute("aria-hidden", "true");
            check.textContent = "✓";
            const OkButton = document.createElement("button");
            OkButton.classList.add("dismiss", "ok");
            if (Options.syncedDismissals) {
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
              pageActionsContent.insertAdjacentElement("afterbegin", OkAllButton);
              OkAllButton.addEventListener("click", () => {
                dismissThis("ok", true);
              });
            }
            OkButton.prepend(check);
            OkButton.addEventListener("click", () => {
              dismissThis("ok");
            });
          }
          if (Options.allowHide) {
            const ignoreButton = document.createElement("button");
            ignoreButton.classList.add("dismiss", "ignore");
            if (Options.syncedDismissals) {
              ignoreButton.setAttribute("title", `${Lang._("dismissHideTitle")}`);
            }
            const ignoreText = document.createElement("span");
            ignoreText.classList.add("text");
            ignoreText.textContent = Lang._("DISMISS");
            ignoreButton.append(ignoreText);
            ignoreButton.prepend(dismissIcon.cloneNode(true));
            buttonBar.prepend(ignoreButton);
            ignoreButton.addEventListener("click", () => {
              dismissThis("hide");
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
              pageActionsContent.appendChild(ignoreAllButton);
              ignoreAllButton.addEventListener("click", () => {
                dismissThis("hide", true);
              });
            }
          }
        }
      }
      const countNumber = this.wrapper.querySelector(".count-number");
      countNumber.textContent = `${this.issueIndex + 1} / ${State.jumpList.length}`;
      const countText = this.wrapper.querySelector(".count-text");
      countText.textContent = Lang._("ALERT_TEXT");
      if (State.english && State.splitConfiguration) {
        const countPrefix = document.createElement("span");
        countText.insertAdjacentElement("beforebegin", countPrefix);
        if (this.result.outsideContentRoots) {
          countPrefix.textContent = Lang._("issueTemplate");
        } else if (State.splitConfiguration.devChecks[this.result.test]) {
          countPrefix.textContent = Lang._("issueDeveloper");
        }
        const br = document.createElement("br");
        countPrefix.insertAdjacentElement("afterend", br);
      }
      if (State.jumpList.length > 1) {
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
          if (State.toggledFrom) {
            State.toggledFrom.focus();
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
  const testNames = {
    ALT_FILE_EXT: "This alt text is a URL, not a description",
    ALT_MAYBE_BAD: "Is this alt text meaningless?",
    ALT_PLACEHOLDER: "This alt text is meaningless placeholder text",
    ALT_UNPRONOUNCEABLE: "This alt text is unpronounceable",
    EMBED_AUDIO: "Does this audio have a transcript?",
    EMBED_CUSTOM: "Is this embedded content accessible?",
    EMBED_DATA_VIZ: "Is this visualization accessible?",
    EMBED_VIDEO: "Is this video accurately captioned?",
    HEADING_EMPTY: "Add text to this heading, or remove it",
    HEADING_LONG: "Can this heading be shorter?",
    HEADING_SKIPPED_LEVEL: "This heading is at the wrong level",
    IMAGE_ALT_TOO_LONG: "Can this alt text be shorter?",
    IMAGE_DECORATIVE: "Is this image meaningless?",
    LINK_ALT_FILE_EXT: "Alt text used as a link should not be a URL",
    LINK_ALT_MAYBE_BAD: "Does this alt text describe the link destination?",
    LINK_EMPTY_NO_LABEL: "This link needs a label",
    LINK_EMPTY: "This link needs text",
    LINK_IMAGE_ALT_AND_TEXT: "Does this alt text make sense as part of this link?",
    LINK_IMAGE_LONG_ALT: "Can this linked alt text be shorter?",
    LINK_IMAGE_NO_ALT_TEXT: "This linked image needs alt text",
    LINK_NEW_TAB: "Does this link open a new window without warning?",
    LINK_PLACEHOLDER_ALT: "This linked image needs meaningful alt text",
    LINK_STOPWORD: "Does this link describe its destination?",
    LINK_SUS_ALT: "Is there redundant text in this linked image?",
    LINK_URL: "Link text should not be a URL",
    MISSING_ALT_LINK_HAS_TEXT: "Invalid HTML: image in link missing alt attribute",
    MISSING_ALT_LINK: "Invalid HTML: linked image missing alt attribute",
    MISSING_ALT: "Invalid HTML: missing alt text attribute",
    QA_BLOCKQUOTE: "Is this a quote or a heading?",
    QA_FAKE_HEADING: "Should this be a heading?",
    QA_FAKE_LIST: "Should this have list formatting?",
    QA_PDF: "Is the linked document accessible?",
    QA_UPPERCASE: "Is this uppercase text needed?",
    SUS_ALT: "Are there redundant words in this alt text?",
    TABLES_EMPTY_HEADING: "This header cell needs text",
    TABLES_MISSING_HEADINGS: "This table needs a header row and/or column",
    TABLES_SEMANTIC_HEADING: "Content headings should not be used inside tables",
    HEADING_EMPTY_WITH_IMAGE: "An image used as a heading must have alt text",
    HEADING_FIRST: "The first heading on a page should usually be a Heading 1 or Heading 2",
    HEADING_MISSING_ONE: "This page is missing a Heading 1",
    IMAGE_DECORATIVE_CAROUSEL: "Image in a carousel or gallery marked as decorative",
    LINK_IMAGE_TEXT: "Manual check: Image inside a link marked as decorative.",
    IMAGE_FIGURE_DECORATIVE: "Manual check: image in a figure marked as decorative",
    LINK_IMAGE_ALT: "Manual check: linked image with alt text",
    IMAGE_FIGURE_DUPLICATE_ALT: "Alt text should not be the same as caption text",
    LINK_ALT_UNPRONOUNCEABLE: "Linked images need pronounceable alt text",
    DUPLICATE_TITLE: 'Duplicate "title" attributes are redundant',
    // Contains html
    LINK_EMPTY_LABELLEDBY: 'Link with invalid "aria-labelledby" attribute',
    // Contains html
    LINK_STOPWORD_ARIA: "Manual check: link text overridden by ARIA that may not be meaningful",
    // Contains html
    LINK_SYMBOLS: "Manual check: are the symbols or emoji in this link meaningful?",
    LINK_CLICK_HERE: 'Manual check: link contains "click here"',
    LINK_DOI: "APA Style guide recommends using descriptive DOI links",
    LINK_IDENTICAL_NAME: "Manual check: link has identical text as another link but points to a different page",
    LINK_FILE_EXT: "Link points to a file without warning",
    EMBED_UNFOCUSABLE: 'Frame with tabindex="-1" will not be keyboard accessible.',
    // Contains html
    EMBED_MISSING_TITLE: 'Frame missing "title" attribute',
    // Contains value
    EMBED_GENERAL: 'Manual check: "iframe" content',
    QA_BAD_LINK: "Manual check: link target may be invalid",
    QA_STRONG_ITALICS: "Manual check: entire paragraph is emphasized",
    QA_IN_PAGE_LINK: "Broken same-page link",
    QA_DOCUMENT: "Manual check: linked document",
    QA_UNDERLINE: "Only links should be underlined",
    QA_SUBSCRIPT: "Manual check: use of subscript or superscript as visual formatting",
    QA_NESTED_COMPONENTS: "Nested interactive layout components",
    QA_JUSTIFY: "Justified text",
    QA_SMALL_TEXT: "Small text",
    META_LANG: "Meta tag for page language missing",
    META_SCALABLE: "Meta tag prevents user scaling",
    META_MAX: "Meta tag sets max user scaling",
    META_REFRESH: "Meta tag automatically refreshes page",
    DUPLICATE_ID: "Manual check: duplicate ID tag",
    // Contains value
    META_TITLE: "Meta tag for page title missing",
    UNCONTAINED_LI: "Invalid HTML list",
    // Contains value
    TABINDEX_ATTR: "Provided tabindex value removes element from reading order",
    HIDDEN_FOCUSABLE: "Screen readers told not to speak the name of an interactive element",
    LABEL_IN_NAME: "Visible name different than machine-readable name",
    LABELS_ARIA_LABEL_INPUT: "Manual check: is there a visible label for this field?",
    LABELS_PLACEHOLDER: "Manual check: placeholder text in label",
    BTN_EMPTY: "Button purpose is not machine-readable",
    BTN_EMPTY_LABELLEDBY: "Button has an invalid ARIA label",
    // Contains value
    BTN_ROLE_IN_NAME: 'Button name repeats the word "button"',
    CONTRAST_WARNING: "Does this text have enough contrast?",
    CONTRAST_INPUT: "Input does not provide enough contrast to be easily legible",
    CONTRAST_ERROR: "Text does not have enough contrast to be easily legible",
    CONTRAST_PLACEHOLDER: "Placeholder text does not have enough contrast to be easily legible",
    CONTRAST_PLACEHOLDER_UNSUPPORTED: "Does this placeholder text have enough contrast?",
    CONTRAST_ERROR_GRAPHIC: "Graphic or icon does not have enough contrast with the background",
    CONTRAST_WARNING_GRAPHIC: "Does this graphic or icon have enough contrast?"
  };
  const preProcessOptions = (userOptions) => {
    smush(Options, userOptions, ["checks"]);
    Object.assign(Options.checks, userOptions.checks);
    if (Options.fixedRoots) {
      Options.checkRoot = Options.fixedRoots;
    } else if (!Options.checkRoot) {
      Options.checkRoot = document.querySelector("main") !== null ? "main" : "body";
    }
    if (userOptions.splitConfiguration) {
      State.splitConfiguration.active = true;
      State.splitConfiguration.showDev = userOptions.splitConfiguration.showDev;
      State.splitConfiguration.devOptions = userOptions.splitConfiguration.devOptions;
      State.splitConfiguration.contentOptions = {};
      Object.keys(State.splitConfiguration.devOptions).forEach((key) => {
        State.splitConfiguration.contentOptions[key] = userOptions[key];
      });
      State.splitConfiguration.devChecks = new Set(userOptions.splitConfiguration.devChecks);
      Object.assign(Options, State.splitConfiguration.devOptions);
    }
    Options.headless = userOptions.alertMode === "headless";
    if (userOptions.panelAttachTo) {
      State.panelAttachTo = userOptions.panelAttachTo;
    }
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
      const cssLink = document.querySelector(
        'link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]'
      );
      if (cssLink) {
        cssUrls = [cssLink.getAttribute("href")];
      } else {
        cssUrls = [
          `https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`
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
        sheet = `${sheet}?ver=${State.version}`;
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
    if (Options.containerIgnore) {
      const containerSelectors = Options.containerIgnore.split(",").map((item) => item.trim());
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
    State.english = Lang.langStrings.LANG_CODE.startsWith("en");
    Object.assign(Theme, Options[Options.theme]);
    Theme.baseFontSize = Options.baseFontSize;
    Theme.buttonZIndex = Options.buttonZIndex;
    Theme.baseFontFamily = Options.baseFontFamily;
    if (!Options.linkStringsNewWindows) {
      Options.linkStringsNewWindows = Lang._("linkStringsNewWindows");
    }
    if (userOptions.documentLinks) {
      Constants.Global.documentSources = userOptions.documentLinks;
    }
    if (State.english) {
      const overrides = Object.entries(testNames);
      for (let i = 0; i < overrides.length; i++) {
        Lang.langStrings[overrides[i][0]] = `<div class="title" tabindex="-1">${testNames[`${overrides[i][0]}`]}</div>${Lang.langStrings[overrides[i][0]]}`;
      }
    }
    const localResultCount = store.getItem("editoria11yResultCount");
    State.seen = localResultCount && localResultCount !== "undefined" ? JSON.parse(localResultCount) : {};
    if (Options.syncedDismissals === false) {
      State.dismissedAlerts = localStorage.getItem("ed11ydismissed");
      State.dismissedAlerts = State.dismissedAlerts ? JSON.parse(State.dismissedAlerts) : {};
    } else {
      State.dismissedAlerts = {};
      State.dismissedAlerts[Options.currentPage] = Options.syncedDismissals;
    }
  };
  function initialize(userOptions) {
    if (State.once) {
      console.error("double init");
      return;
    }
    State.once = true;
    preProcessOptions(userOptions);
    Constants.initializeGlobal(Options);
    Constants.initializeReadability(Options);
    Constants.initializeExclusions(Options);
    postProcessOptions(userOptions);
    customElements.define("ed11y-element-alt", Ed11yElementAlt);
    customElements.define("ed11y-element-result", Ed11yElementResult);
    customElements.define("ed11y-element-heading-label", Ed11yElementHeadingLabel);
    customElements.define("ed11y-element-panel", Ed11yElementPanel);
    customElements.define("ed11y-element-tip", Ed11yElementTip);
    documentLoadingCheck(() => {
      if (checkRunPrevent()) {
        State.disabled = true;
        return false;
      }
      State.running = true;
      checkAll();
      document.addEventListener("ed11yResume", () => {
        continueCheck(true).then();
      });
      window.addEventListener(
        "keydown",
        () => {
          State.interaction = true;
        },
        {
          passive: true
        }
      );
      window.addEventListener(
        "click",
        () => {
          State.interaction = true;
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
  const version = "3.0.0-dev122125";
  class Ed11y {
    constructor(userOptions) {
      if (CSS.supports("selector(:has(body))")) {
        try {
          initialize(userOptions);
        } catch (error) {
          showError(error);
        }
      }
    }
  }
  const elements = Elements.Found;
  exports2.Ed11y = Ed11y;
  exports2.Lang = Lang;
  exports2.Options = Options;
  exports2.Results = Results;
  exports2.State = State;
  exports2.Theme = Theme;
  exports2.UI = UI;
  exports2.checkAll = checkAll;
  exports2.computeAccessibleName = computeAccessibleName;
  exports2.elements = elements;
  exports2.findElements = findElements;
  exports2.getElements = getElements;
  exports2.incrementalCheck = incrementalCheck;
  exports2.prepareDismissal = prepareDismissal;
  exports2.reset = reset;
  exports2.version = version;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
