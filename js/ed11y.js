class Ed11y {

  // ESLint config
  /* global ed11yLang, Ed11yTestHeadings, Ed11yTestImages, Ed11yTestLinks, Ed11yTestText, Ed11yTestEmbeds */
  /* exported Ed11y */

  constructor(options) {

    Ed11y.version = '2.4.5';

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
      // 'minimized': always shut.
      // 'userPreference: respect user preference.
      // 'polite': open for changed issue count.
      // 'assertive': open for any issues.
      // 'active': always open.
      // CMS integrations usually choose at runtime.
      alertMode: 'polite',
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
      panelAttachTo: document.body, // provide DOM node or selector.

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
      embeddedContent: false, // todo remove in favor of custom checks
      embeddedContentTitle: '', // todo test
      embeddedContentMessage: '', // todo test
      videoContent: 'youtube.com, vimeo.com, yuja.com, panopto.com',
      audioContent: 'soundcloud.com, simplecast.com, podbean.com, buzzsprout.com, blubrry.com, transistor.fm, fusebox.fm, libsyn.com',
      dataVizContent: 'datastudio.google.com, tableau',
      twitterContent: 'twitter-timeline',
      // Selector list to identify links to documents you would like flagged for manual review.
      documentLinks: 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']',
      // was 'a[href$=\'.pdf\'], a[href*=\'.pdf?\'], a[href$=\'.doc\'], a[href$=\'.docx\'], a[href*=\'.doc?\'], a[href*=\'.docx?\'], a[href$=\'.ppt\'], a[href$=\'.pptx\'], a[href*=\'.ppt?\'], a[href*=\'.pptx?\'], a[href^=\'https://docs.google\']'
      linksUrls: false, // get from language pack
      linksMeaningless: false, // get from language pack
      altPlaceholder: false, // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'
      // * Not implemented Yet:
      // ruleset toggling
      // form label tests
      // detectSPArouting: false,

      editLinks: false, // Add links to edit content in tooltips.

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

      userPrefersShut: localStorage.getItem('editoria11yShow') === null ?
        'undefined'
        : localStorage.getItem('editoria11yShow') === '0',

      customTests: 0,

    };
    Ed11y.options = {
      ...defaultOptions,
      ...options
    };
    Ed11y.M = {
      // Fall back to En strings if language or string is unavailable
      ...ed11yLang['en'],
      ...ed11yLang[Ed11y.options.lang]
    };

    Ed11y.theme = Ed11y.options[Ed11y.options.theme];
    Ed11y.theme.baseFontSize = Ed11y.options.baseFontSize;
    Ed11y.theme.buttonZIndex = Ed11y.options.buttonZIndex;
    Ed11y.theme.baseFontFamily = Ed11y.options.baseFontFamily;



    if (Ed11y.options.currentPage === false) {
      Ed11y.options.currentPage = window.location.pathname;
    }

    if (!Ed11y.options.linkStringsNewWindows) {
      Ed11y.options.linkStringsNewWindows = Ed11y.M.linkStringsNewWindows;
    }

    if (!Ed11y.options.cssUrls) {
      const cssLink = document.querySelector('link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]');
      if (cssLink) {
        Ed11y.options.cssUrls = [cssLink.getAttribute('href')];
      } else {
        console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
        Ed11y.options.cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${Ed11y.version}/dist/editoria11y.min.css`];
      }
    }

    const cssBundle = document.createElement('div');
    cssBundle.classList.add('ed11y-style');
    cssBundle.setAttribute('hidden','');
    Ed11y.options.cssUrls?.forEach( sheet => {
      const cssLink = document.createElement('link');
      cssLink.setAttribute('rel', 'stylesheet');
      cssLink.setAttribute('media', 'all');
      if (sheet.indexOf('?') < 0) {
        sheet = sheet + '?ver=' + Ed11y.version;
      }
      cssLink.setAttribute('href', sheet);
      cssBundle.append(cssLink);
    });

    Ed11y.attachCSS = function(appendTo) {
      appendTo.appendChild(cssBundle.cloneNode(true));
    };

    Ed11y.elements = [];
    Ed11y.onLoad = true;
    Ed11y.showPanel = false;
    let windowWidth = window.innerWidth;
    Ed11y.watching = [];

    Ed11y.disable = () => {
      if (Ed11y.open && !Ed11y.closedByDisable) {
        Ed11y.closedByDisable = true;
      }
      Ed11y.disabled = true;
      Ed11y.reset();
      document.documentElement.style.setProperty('--ed11y-activeBackground', Ed11y.theme.panelBar);
      document.documentElement.style.setProperty('--ed11y-activeColor', Ed11y.theme.panelBarText);
      document.documentElement.style.setProperty('--ed11y-activeBorder', Ed11y.theme.panelBarText + '44');
      document.documentElement.style.setProperty('--ed11y-activePanelBorder', 'transparent');
      if (Ed11y.panelToggle) {
        Ed11y.panel?.classList.remove('ed11y-errors', 'ed11y-warnings');
        Ed11y.panelCount.textContent = 'i';
        Ed11y.panelJumpNext.setAttribute('hidden', '');
        Ed11y.panelToggle.classList.add('disabled');
        Ed11y.panelToggle.querySelector('.ed11y-sr-only').textContent = Ed11y.M.toggleDisabled;
      }
    };

    Ed11y.initialize = () => {
      if (Ed11y.once) {
        console.error('double init');
        return;
      }
      Ed11y.once = true;
      Ed11y.checkRunPrevent = () => {
        let preventCheck = Ed11y.options.preventCheckingIfPresent ?
          document.querySelector(Ed11y.options.preventCheckingIfPresent) :
          false;
        if (preventCheck) {
          console.warn(`Editoria11y is disabled because an element matched the "preventCheckingIfPresent" parameter:  "${Ed11y.options.preventCheckingIfPresent}"` );
        } else if (!preventCheck && !!Ed11y.options.preventCheckingIfAbsent) {
          preventCheck = document.querySelector(`:is(${Ed11y.options.preventCheckingIfAbsent})`) === null;
          if (preventCheck) {
            console.warn(`Editoria11y is disabled because no elements matched the "preventCheckingIfAbsent" parameter: "${Ed11y.options.preventCheckingIfAbsent}"`);
          }
        }
        return preventCheck;
      };

      //Need to evaluate if "load" event took place for bookmarklet version. Otherwise, only call Sa11y once page has loaded.
      const documentLoadingCheck = (callback) => {
        if (document.readyState === 'complete') {
          callback();
        } else {
          window.addEventListener('load', callback);
        }
      };

      // Once document has fully loaded.
      documentLoadingCheck(() => {
        if (Ed11y.checkRunPrevent()) {
          return false;
        }
        Ed11y.running = true;
        let localResultCount = localStorage.getItem('editoria11yResultCount');
        Ed11y.seen = localResultCount ? JSON.parse(localResultCount) : {};

        // Build list of dismissed alerts
        if (Ed11y.options.syncedDismissals === false) {
          Ed11y.dismissedAlerts = localStorage.getItem('ed11ydismissed');
          Ed11y.dismissedAlerts = Ed11y.dismissedAlerts ? JSON.parse(Ed11y.dismissedAlerts) : {};
        } else {
          Ed11y.dismissedAlerts = {};
          Ed11y.dismissedAlerts[Ed11y.options.currentPage] = Ed11y.options.syncedDismissals;
        }

        // Create test class objects
        Ed11y.testEmbeds = new Ed11yTestEmbeds;
        Ed11y.testHeadings = new Ed11yTestHeadings;
        Ed11y.testImages = new Ed11yTestImages;
        Ed11y.testLinks = new Ed11yTestLinks;
        Ed11y.testText = new Ed11yTestText;

        // Convert the container ignore user option to a CSS :not selector.
        Ed11y.ignore = Ed11y.options.ignoreElements ? `:not(${Ed11y.options.ignoreElements})` : '';

        if (!Ed11y.options.checkRoots) {
          Ed11y.options.checkRoots = document.querySelector('main') !== null ? 'main' : 'body';
        }

        if (!Ed11y.options.panelAttachTo) {
          Ed11y.options.panelAttachTo = document.querySelector('body');
        }

        // Run tests
        Ed11y.checkAll();
        window.addEventListener('resize', function () { Ed11y.windowResize(); });

      });
    };

    Ed11y.results = [];
    // Toggles the outline of all headers, link texts, and images.
    Ed11y.checkAll = () => {
      if (Ed11y.openTip.button) {
        return false;
      }
      Ed11y.disabled = false;

      if ( !Ed11y.checkRunPrevent() ) {
        // Check for ignoreAll elements.
        Ed11y.ignoreAll = Ed11y.options.ignoreAllIfAbsent && document.querySelector(`:is(${Ed11y.options.ignoreAllIfAbsent})`) === null;
        if (!Ed11y.ignoreAll && !!Ed11y.options.ignoreAllIfPresent) {
          Ed11y.ignoreAll = document.querySelector(`:is(${Ed11y.options.ignoreAllIfPresent})`) !== null;
        }

        if ( Ed11y.incremental ) {
          Ed11y.oldResults = Ed11y.results;
        }
        // Reset counts
        Ed11y.results = [];
        Ed11y.elements = [];
        Ed11y.mediaCount = 0;

        Ed11y.customTestsRunning = false;

        let roots = [];
        if (Ed11y.options.fixedRoots) {
          Ed11y.options.fixedRoots.forEach(root => {roots.push(root.fixedRoot);});
        } else {
          roots = document.querySelectorAll(`:is(${Ed11y.options.checkRoots})`);
        }

        if (roots.length === 0) {
          // Todo parameterize for translation.
          if (Ed11y.onLoad) {
            console.warn('Check Editoria11y configuration; specified root element not found');
          }
          Ed11y.disable();
          return;
        } else {
          Ed11y.roots = [];
          roots.forEach((el, i) => {
            if (el.shadowRoot) {
              Ed11y.roots[i] = el.shadowRoot;
              el.setAttribute('data-ed11y-has-shadow-root', 'true');
              Ed11y.detectShadow(el.shadowRoot);
            } else {
              Ed11y.roots[i] = el;
              Ed11y.detectShadow(el);
            }
            if (Ed11y.options.fixedRoots) {
              el.dataset.ed11yRoot = `${i}`;
            }
          });


          Ed11y.buildElementList();

          let queue = [
            'testLinks',
            'testImages',
            'testHeadings',
            'testText',
            'testEmbeds',
          ];
          queue.forEach((test) => {
            window.setTimeout(function (test) {
              Ed11y[test].check();
            }, 0, test);
          });

          if (Ed11y.options.customTests > 0) {
            // Pause
            Ed11y.customTestsRunning = true;
            Ed11y.customTestsFinished = 0;
            document.addEventListener('ed11yResume', function () {
              Ed11y.customTestsFinished++;
              if (Ed11y.customTestsFinished === Ed11y.options.customTests) {
                Ed11y.customTestsRunning = false;
                window.requestAnimationFrame(() => Ed11y.updatePanel());
              }
            });
            window.setTimeout(function() {
              if (Ed11y.customTestsRunning === true) {
                Ed11y.customTestsRunning = false;
                if (Ed11y.panelToggle) {
                  Ed11y.panelToggle.querySelector('.ed11y-sr-only').textContent = Ed11y.M.toggleAccessibilityTools;
                }
                window.requestAnimationFrame(() => Ed11y.updatePanel());
                console.error('Editoria11y was told to wait for custom tests, but no tests were returned.');
              }
            }, 1000);
            window.setTimeout(function() {
              let customTests = new CustomEvent('ed11yRunCustomTests');
              document.dispatchEvent(customTests);
            },0);
          }
        }

        if (!Ed11y.customTestsRunning) {
          window.setTimeout(function () {
            if (Ed11y.panelToggle) {
              Ed11y.panelToggle.querySelector('.ed11y-sr-only').textContent = Ed11y.M.toggleAccessibilityTools;
            }
            Ed11y.updatePanel();
          }, 0);
        }

      }
      else {
        Ed11y.disable();
      }
    };

    Ed11y.totalCount = 0;
    Ed11y.countAlerts = function () {

      Ed11y.errorCount = 0;
      Ed11y.warningCount = 0;
      Ed11y.dismissedCount = 0;

      // Review results array to remove dismissed or ignored items

      Ed11y.dismissedCount = 0;
      for (let i = Ed11y.results.length - 1; i >= 0; i--) {

        let test = Ed11y.results[i].test;

        if (Ed11y.options.ignoreTests &&
          Ed11y.options.ignoreTests.includes(test)) {
          // Would be faster to skip test, but this is easy and reliable.
          Ed11y.results.splice(i, 1);
          continue;
        }

        // todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
        /*if (Ed11y.incremental && Ed11y.oldResults.length > 0) {
          // Don't flag new issues in the active range while people are typing.
        }*/

        let dismissKey = Ed11y.dismissalKey(Ed11y.results[i].dismissalKey);
        // We run the user provided dismissal key through the text sanitization to support legacy data with special characters.
        if (dismissKey !== false && Ed11y.options.currentPage in Ed11y.dismissedAlerts && test in Ed11y.dismissedAlerts[Ed11y.options.currentPage] && dismissKey in Ed11y.dismissedAlerts[Ed11y.options.currentPage][test]) {
          // Remove result if it has been marked OK or ignored, increment dismissed match counter.
          Ed11y.dismissedCount++;
          Ed11y.results[i].dismissalStatus = Ed11y.dismissedAlerts[Ed11y.options.currentPage][test][dismissKey];
        } else if (Ed11y.results[i].dismissalKey) {
          Ed11y.warningCount++;
          Ed11y.results[i].dismissalStatus = false;
        } else {
          Ed11y.errorCount++;
          Ed11y.results[i].dismissalStatus = false;
        }
      }

      Ed11y.totalCount = Ed11y.errorCount + Ed11y.warningCount;

      // Dispatch event for synchronizers.
      if (!Ed11y.incremental) {
        window.setTimeout(function () {
          let syncResults = new CustomEvent('ed11yResults');
          document.dispatchEvent(syncResults);
        }, 0);
      }

      if (Ed11y.ignoreAll) {
        Ed11y.dismissedCount = Ed11y.totalCount + Ed11y.dismissedCount;
        Ed11y.errorCount = 0;
        Ed11y.warningCount = 0;
        Ed11y.totalCount = 0;
      }

    };

    let oldResultString = '';
    const newIncrementalResults = function() {
      if (Ed11y.forceFullCheck || Ed11y.results.length !== Ed11y.oldResults.length) {
        return true;
      }
      let newResultString = `${Ed11y.errorCount} ${Ed11y.warningCount}`;
      Ed11y.results.forEach(result => {
        newResultString += result.test + result.element.outerHTML;
      });
      let changed = newResultString !== oldResultString;
      oldResultString = newResultString;
      return changed;
    };

    Ed11y.updatePanel = function () {

      Ed11y.pauseObservers();
      // Stash old values for incremental updates.
      Ed11y.countAlerts();
      if (Ed11y.incremental) {
        // Check for a change in the result counts.
        if (Ed11y.forceFullCheck || newIncrementalResults()) {
          Ed11y.forceFullCheck = false;
          /*if (Ed11y.options.alertMode === 'assertive' && Ed11y.totalCount > 0 && (Ed11y.warningCount > oldWarnings || Ed11y.errorCount > oldErrors)) {
            console.warn('forced open');
            Ed11y.showPanel = true;
          }*/
          Ed11y.resetResults(true);
        } else {
          // Todo: commented out in 2.3.11:
          // Reconnect map
          Ed11y.results = Ed11y.oldResults;
          window.setTimeout(function() {
            if ( !Ed11y.alignPending ) {
              Ed11y.alignButtons();
              Ed11y.alignPanel();
              Ed11y.alignPending = false;
            }
            Ed11y.running = false;
          },0);
          Ed11y.resumeObservers();
          return;
        }
      } else {
        if (Ed11y.totalCount > 0) {
          // Record what has been seen at this route.
          // We do not do this on incremental updates.
          // Todo question: should we not do this at all for contentEditable?
          Ed11y.seen[encodeURI(Ed11y.options.currentPage)] = Ed11y.totalCount;
          localStorage.setItem('editoria11yResultCount', JSON.stringify(Ed11y.seen));
        } else {
          delete Ed11y.seen[encodeURI(Ed11y.options.currentPage)];
        }
      }

      if (Ed11y.options.alertMode !== 'headless') {
        // Not headless; draw the interface.

        if (!Ed11y.bodyStyle) {
          Ed11y.paintReady();
        }

        if (Ed11y.onLoad === true) {
          Ed11y.onLoad = false;

          if (!Ed11y.options.inlineAlerts) {
            // todo move to incremental check or timeout; no need to do on load.
            oldResultString = `${Ed11y.errorCount} ${Ed11y.warningCount}`;
            Ed11y.results.forEach(result => {
              oldResultString += result.test + result.element.outerHTML;
            });
          }

          // Create the panel DOM on load.

          let panel = document.createElement('ed11y-element-panel');
          panel.classList.add('ed11y-preload');
          document.body.appendChild(panel);
          Ed11y.attachCSS(Ed11y.panel);
          window.setTimeout(()=> {
            panel.classList.remove('ed11y-preload');
          },0, panel);
          Ed11y.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Ed11y.M.buttonToolsContent;
          Ed11y.panel.querySelector('#ed11y-headings-tab .summary-title').textContent = Ed11y.M.buttonOutlineContent;
          Ed11y.panel.querySelector('#ed11y-headings-tab .details-title').innerHTML = Ed11y.M.panelCheckOutline;
          Ed11y.panel.querySelector('#ed11y-alts-tab .summary-title').textContent = Ed11y.M.buttonAltsContent;
          Ed11y.panel.querySelector('#ed11y-alts-tab .details-title').innerHTML = Ed11y.M.panelCheckAltText;
          Ed11y.panel.querySelector('.jump-next.ed11y-sr-only').textContent = Ed11y.M.buttonFirstContent;

          Ed11y.panel.setAttribute('aria-label', Ed11y.M.panelControls);
          if (Ed11y.options.reportsURL) {
            let reportLink = document.createElement('a');
            reportLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 61 29 32 64 32l384 0c35 0 64 29 64 64l0 320c0 35-29 64-64 64L64 480c-35 0-64-29-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
            reportLink.setAttribute('id' , 'ed11y-reports-link');
            reportLink.setAttribute('href', Ed11y.options.reportsURL);
            reportLink.setAttribute('target', '_blank');
            reportLink.setAttribute('aria-label', Ed11y.M.reportsLink);
            reportLink.querySelector('.ed11y-sr-only').textContent = Ed11y.M.reportsLink;
            Ed11y.showDismissed.insertAdjacentElement('beforebegin', reportLink);
          }

          // Decide whether to open the panel on load.
          if (Ed11y.ignoreAll
            || (!Ed11y.options.inlineAlerts
              && Ed11y.totalCount > 75)
          ) {
            // Always minimize on command or for too many results.
            Ed11y.showPanel = false;
          } else if (Ed11y.options.alertMode === 'active'
            || Ed11y.options.showDismissed
          ) {
            // Always show in active mode or when dismissals displayed.
            Ed11y.showPanel = true;
          } else if (
            Ed11y.totalCount > 0
            && !Ed11y.ignoreAll
            && Ed11y.options.alertMode !== 'minimized'
          ) {
            // Show sometimes if there are new items.
            if (Ed11y.options.userPrefersShut === false
              || Ed11y.options.alertMode === 'assertive'
              || ( Ed11y.options.alertMode === 'polite' &&
                Ed11y.seen[encodeURI(Ed11y.options.currentPage)] !== Ed11y.totalCount )
            )
              Ed11y.showPanel = true;
          }
        }

        // Now we can open or close the panel.
        if (!Ed11y.showPanel) {
          // Close panel.
          Ed11y.reset();
        } else {
          // Ignore issue count if this resulted from a user action.

          Ed11y.open = true;
          Ed11y.panel.classList.remove('ed11y-shut');
          Ed11y.panel.classList.add('ed11y-active');
          Ed11y.panelToggle.setAttribute('aria-expanded', 'true');
          Ed11y.panelToggleTitle.textContent = Ed11y.totalCount > 0 ? Ed11y.M.buttonHideAlerts : Ed11y.M.buttonHideChecker;
          // Prepare show hidden alerts button.
          if (Ed11y.dismissedCount === 0) {
            // Reset show hidden default option when irrelevant.
            Ed11y.showDismissed.setAttribute('hidden', '');
            Ed11y.showDismissed.setAttribute('data-ed11y-pressed', 'false');
            Ed11y.options.showDismissed = false;
          } else if (Ed11y.dismissedCount === 1) {
            Ed11y.showDismissed.querySelector('.ed11y-sr-only').textContent = Ed11y.options.showDismissed ? Ed11y.M.buttonHideHiddenAlert : Ed11y.M.buttonShowHiddenAlert;
            Ed11y.showDismissed.dataset.ed11yPressed = `${Ed11y.options.showDismissed}`;
            Ed11y.showDismissed.removeAttribute('hidden');
          } else {
            Ed11y.showDismissed.querySelector('.ed11y-sr-only').textContent = Ed11y.options.showDismissed ? Ed11y.M.buttonHideHiddenAlerts(Ed11y.dismissedCount) : Ed11y.M.buttonShowHiddenAlerts(Ed11y.dismissedCount);
            Ed11y.showDismissed.dataset.ed11yPressed = `${Ed11y.options.showDismissed}`;
            Ed11y.showDismissed.removeAttribute('hidden');
          }

          window.setTimeout(function () {
            if (!Ed11y.ignoreAll) {
              requestAnimationFrame(() => Ed11y.showResults());
            }
          }, 0);
        }
        // Update buttons.
        if (Ed11y.totalCount > 0 || (Ed11y.options.showDismissed && Ed11y.dismissedCount > 0)) {
          Ed11y.panelToggleTitle.textContent = Ed11y.open ? Ed11y.M.buttonHideAlerts : Ed11y.M.buttonShowAlerts;
          Ed11y.panelJumpNext.removeAttribute('hidden');
          if (Ed11y.errorCount > 0) {
            // Errors
            Ed11y.panel.classList.remove('ed11y-warnings', 'ed11y-pass');
            Ed11y.panel.classList.add('ed11y-errors');
            document.documentElement.style.setProperty('--ed11y-activeBackground', Ed11y.theme.alert);
            document.documentElement.style.setProperty('--ed11y-activeColor', '#fff');
            document.documentElement.style.setProperty('--ed11y-activeBorder', '#fff7');
            document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#def');
          }
          else if (Ed11y.warningCount > 0) {
            // Warnings
            Ed11y.panel.classList.remove('ed11y-errors', 'ed11y-pass');
            Ed11y.panel.classList.add('ed11y-warnings');
            document.documentElement.style.setProperty('--ed11y-activeBackground', Ed11y.theme.warning);
            document.documentElement.style.setProperty('--ed11y-activeColor', '#111');
            document.documentElement.style.setProperty('--ed11y-activeBorder', '#947605');
            document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#947605');
          } else {
            // Issues present but dismissed.
            Ed11y.panel.classList.remove('ed11y-errors', 'ed11y-warnings');
            Ed11y.panel.classList.add('ed11y-pass');
            document.documentElement.style.setProperty('--ed11y-activeBackground', Ed11y.theme.panelBar);
            document.documentElement.style.setProperty('--ed11y-activeColor', Ed11y.theme.panelBarText);
            document.documentElement.style.setProperty('--ed11y-activeBorder', Ed11y.theme.panelBarText + '44');
            document.documentElement.style.setProperty('--ed11y-activePanelBorder', Ed11y.theme.panelBarText + '88');
          }
          // todo postpone: aria alert on load?
          /*window.setTimeout(function () {
            //Ed11y.announce.textContent = text;
          }, 1500);*/
          if (Ed11y.dismissedCount > 0 && Ed11y.totalCount === 0) {
            Ed11y.panelCount.textContent = Ed11y.dismissedCount;
          } else {
            Ed11y.panelCount.textContent = Ed11y.totalCount > 99 ? '99+' : Ed11y.totalCount;
          }
        } else {
          Ed11y.panelJumpNext.setAttribute('hidden', '');
          document.documentElement.style.setProperty('--ed11y-activeBackground', Ed11y.theme.panelBar);
          document.documentElement.style.setProperty('--ed11y-activeColor', Ed11y.theme.panelBarText);
          document.documentElement.style.setProperty('--ed11y-activeBorder', Ed11y.theme.panelBarText + '44');
          document.documentElement.style.setProperty('--ed11y-activePanelBorder', Ed11y.theme.panelBarText + '88');

          Ed11y.panelCount.style.display = 'display: none;';
          Ed11y.panel.classList.remove('ed11y-warnings', 'ed11y-errors');
          Ed11y.panel.classList.add('ed11y-pass');

          if (Ed11y.dismissedCount > 0) {
            Ed11y.panelCount.textContent = 'i';
            if (Ed11y.open) {
              Ed11y.panelToggleTitle.textContent = Ed11y.M.buttonHideChecker;
            } else {
              Ed11y.panelToggleTitle.textContent = Ed11y.dismissedCount > 1 ?
                Ed11y.M.buttonShowHiddenAlerts(Ed11y.dismissedCount) :
                Ed11y.M.buttonShowHiddenAlert;
            }
          } else {
            // todo 3.x: move these inline and just change the class.
            Ed11y.panelToggleTitle.textContent = Ed11y.open ? Ed11y.M.buttonHideChecker : Ed11y.M.buttonShowNoAlert;
          }
        }
        Ed11y.panelToggle.classList.remove('disabled');
        Ed11y.panelToggle.removeAttribute('aria-disabled');
        Ed11y.alignPanel();
        Ed11y.panel.classList.remove('ed11y-preload');
      }

      window.setTimeout(() => {
        if (Ed11y.options.watchForChanges) {
          Ed11y.elements.editable?.forEach(editable => {
            if (!editable.matches('.drag-observe')) {
              editable.classList.add('drag-observe');
              editable.addEventListener('drop', () => {
                // This event does not bubble.
                Ed11y.forceFullCheck = true;
                Ed11y.incrementalCheck();
              });
            }
          });
          if (Ed11y.options.watchForChanges === 'checkRoots') {
            Ed11y.roots?.forEach((root) => {
              startObserver( root );
            });
          } else {
            startObserver( document.body );
          }
          Ed11y.resumeObservers(); // on recheck.
        }
      }, 0);

      Ed11y.resumeObservers();
      Ed11y.running = false;
    };

    // Place markers on elements with issues
    Ed11y.result = function (result, index) {
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
      if (!Ed11y.options.inlineAlerts) {
        location = Ed11y.options.panelAttachTo;
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
      Ed11y.jumpList.unshift(mark);
      Ed11y.results[index].toggle = mark;
    };

    Ed11y.resetResults = function(incremental) {
      Ed11y.jumpList = [];
      Ed11y.openTip = {
        button: false,
        tip: false,
      };
      Ed11y.lastOpenTip = -1;
      Ed11y.resetClass([
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
        Ed11y.findElements('reset', 'ed11y-element-highlight', false);
      } else {
        Ed11y.findElements('reset', 'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', false);
      }
      Ed11y.elements.reset?.forEach((el) => el.remove());

      // Flicker prevention -- leave old tip in place for 100ms.
      Ed11y.findElements('delayedReset', 'ed11y-element-result, ed11y-element-tip', false);
      const delayedReset = Ed11y.elements.delayedReset;

      window.setTimeout(()=> {
        delayedReset?.forEach((el) => el.remove());
      }, 100, delayedReset);

      if (Ed11y.panelJumpNext) {
        Ed11y.panelJumpNext.querySelector('.ed11y-sr-only').textContent = Ed11y.M.buttonFirstContent;
      }
      // Reset insertions into body content.
    };

    Ed11y.resetPanel = function() {
      // Reset main panel.
      Ed11y.visualizing = true; // so visualize function removes visualizers.
      Ed11y.visualize();
      if (Ed11y.totalCount === 0 && Ed11y.dismissedCount > 0) {
        Ed11y.panelCount.textContent = 'i';
        Ed11y.panelToggleTitle.textContent = Ed11y.dismissedCount === 1 ?
          Ed11y.M.buttonShowHiddenAlert :
          Ed11y.M.buttonShowHiddenAlerts(Ed11y.dismissedCount);
      }
      if (!Ed11y.options.showDismissed && Ed11y.showDismissed) {
        Ed11y.showDismissed.setAttribute('data-ed11y-pressed', 'false');
        Ed11y.showDismissed.querySelector('.ed11y-sr-only').textContent = Ed11y.dismissedCount === 1 ?
          Ed11y.M.buttonShowHiddenAlert : Ed11y.M.buttonShowHiddenAlerts(Ed11y.dismissedCount);
      }
      Ed11y.panel?.classList.add('ed11y-shut');
      Ed11y.panel?.classList.remove('ed11y-active');
      Ed11y.panelToggle?.setAttribute('aria-expanded', 'false');
    };

    Ed11y.reset = function () {
      Ed11y.pauseObservers();
      Ed11y.resetResults();
      Ed11y.resetPanel();
      Ed11y.incremental = false;
      Ed11y.running = false;
      Ed11y.showPanel = false;
      Ed11y.open = false;
    };

    Ed11y.linkText = (linkText) => {
      // todo postpone: This is only used in Images??? Review all text value diving.
      linkText = linkText.replace(Ed11y.options.linkIgnoreStrings, '');
      linkText = linkText.replace(/'|"|-|\.|\s+/g, '');
      return linkText;
    };

    Ed11y.detectShadow = function (container) {
      if (Ed11y.options.autoDetectShadowComponents) {
        const select = !Ed11y.ignore ? '*:not(.ed11y-element)' : `*:not(${Ed11y.options.ignore}, .ed11y-element)`;
        let search = [];
        if (container.shadowRoot && container.shadowRoot.mode === 'open') {
          if (!container.matches('[data-ed11y-has-shadow-root]')) {
            container.setAttribute('data-ed11y-has-shadow-root', 'true');
            Ed11y.attachCSS(container.shadowRoot);
            Ed11y.attachCSS(container);
          }
          search = container.shadowRoot.querySelectorAll(select);
        } else {
          search = container.querySelectorAll(select);
        }
        search?.forEach((component) => {
          if (component.shadowRoot && component.shadowRoot.mode === 'open') {
            Ed11y.detectShadow(component);
          }
        });
      } else if (Ed11y.options.shadowComponents) {
        const providedShadow = container.querySelectorAll(Ed11y.options.shadowComponents);
        providedShadow.forEach((component) => {
          if (component.shadowRoot && component.shadowRoot.mode === 'open') {
            if (!container.matches('[data-ed11y-has-shadow-root]')){
              component.setAttribute('data-ed11y-has-shadow-root', 'true');
              Ed11y.attachCSS(component.shadowRoot);
              Ed11y.attachCSS(component);
            }
            Ed11y.detectShadow(component);
          } else {
            console.warn(`Editoria11y: A specified shadow host has no shadowRoot: ${component.tagName}`);
          }
        });
      }
    };

    const diveShadow = function (container, select, selector) {
      if (container.matches(selector)) {
        return([container]);
      } else {
        let inners = container.shadowRoot.querySelectorAll(select);
        if (typeof(inners) === 'object' && inners.length > 0) {
          // Replace shadow host with inner elements.
          inners.forEach(inner => {
            for (let innerIndex = inners - 1; innerIndex >= 0; innerIndex--) {
              let innerInner = diveShadow(inner, select, selector);
              if (innerInner.length > 0) {
                inners.splice(innerIndex, 1, ...innerInner);
              } else {
                inners.splice(innerIndex, 1);
              }
            }
          });
          return (Array.from(inners).filter((el) => el.matches(selector)));
        }
      }
      return [];
    };

    // QuerySelectAll non-ignored elements within checkroots, with recursion into shadow components
    Ed11y.findElements = function (key, selector, rootRestrict = true) {

      // Todo beta: function and parameter to auto-detect shadow components.
      let shadowSelector = Ed11y.options.autoDetectShadowComponents ?
        '[data-ed11y-has-shadow-root]' :
        Ed11y.options.shadowComponents ?
          Ed11y.options.shadowComponents : false;

      // Concatenate global and specific ignores
      let ignore = '';
      if (Ed11y.options.ignoreElements) {
        ignore = Ed11y.options.ignoreByKey[key] ? `:not(${Ed11y.options.ignoreElements}, ${Ed11y.options.ignoreByKey[key]})` : `:not(${Ed11y.options.ignoreElements})`;
      } else {
        ignore = Ed11y.options.ignoreByKey[key] ? `:not(${Ed11y.options.ignoreByKey[key]})` : '';
      }

      // Initialize or reset elements array.
      Ed11y.elements[key] = [];

      const select = `:is(${selector}${shadowSelector ? ', ' + shadowSelector : ''})${ignore}`;

      if (rootRestrict && Ed11y.roots) {
        // Add array of elements matching selector, excluding the provided ignore list.
        // Todo this can dupe
        Ed11y.roots.forEach(root => {
          Ed11y.elements[key] = Ed11y.elements[key].concat(Array.from(root.querySelectorAll(select)));
        });
      } else {
        Ed11y.elements[key] = Ed11y.elements[key].concat(Array.from(document.querySelectorAll(select)));
      }

      // The initial search may be a mix of elements ('p') and placeholders for shadow hosts ('custom-p-element').
      // Repeat the search inside each placeholder, and replace the placeholder with its search results.
      if (shadowSelector) {
        for (let index = Ed11y.elements[key].length - 1; index >= 0; index--) {
          if (Ed11y.elements[key][index].matches(shadowSelector)) {
            // Dive into the shadow root and collect an array of its results.
            let inners = diveShadow(Ed11y.elements[key][index], select, selector);
            if (inners.length > 0) {
              Ed11y.elements[key].splice(index, 1, ...inners);
            } else {
              Ed11y.elements[key].splice(index, 1);
            }
          }
        }
      }
    };

    Ed11y.buildElementList = function () {

      // Note: as of 3/28/25 this is as performant as Sa11y's filter() approach.
      if (typeof Ed11y.options.editableContent === 'string') {
        Ed11y.findElements('editable', Ed11y.options.editableContent, false);
      } else {
        Ed11y.elements.editable = Ed11y.options.editableContent;
      }
      if (Ed11y.options.inlineAlerts && Ed11y.elements.editable.length > 0) {
        Ed11y.options.inlineAlerts = false;
        console.warn('Editable content detected; Editoria11y inline alerts disabled');
      }
      Ed11y.findElements('p', 'p');
      Ed11y.findElements('h', 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]');
      Ed11y.findElements('allH', 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]', Ed11y.options.fixedRoots ? Ed11y.options.headingsOnlyFromCheckRoots : false);
      Ed11y.findElements('img', 'img');
      Ed11y.findElements('a', 'a[href]');
      Ed11y.findElements('li', 'li');
      Ed11y.findElements('blockquote', 'blockquote');
      Ed11y.findElements('iframe', 'iframe');
      Ed11y.findElements('audio', 'audio');
      Ed11y.findElements('video', 'video');
      Ed11y.findElements('table', 'table');

      if (Ed11y.options.embeddedContent) {
        Ed11y.findElements('embed', Ed11y.options.embeddedContent);
      }
      if (Ed11y.options.panelNoCover) {
        // Moves panel off conflicting widgets.
        Ed11y.findElements('panelPin', Ed11y.options.panelNoCover, false);
      }
    };

    Ed11y.dismissalKey = function (text) {
      return String(text).replace(/([^0-9a-zA-Z])/g, '').substring(0, 512);
    };

    const dismissOne = function(dismissalType, test, dismissalKey) {

      // Update dismissal record.
      if (dismissalType === 'reset') {
        delete Ed11y.dismissedAlerts[Ed11y.options.currentPage][test][dismissalKey];
        if (Object.keys(Ed11y.dismissedAlerts[Ed11y.options.currentPage][test]).length === 0) {
          delete Ed11y.dismissedAlerts[Ed11y.options.currentPage][test];
        }
        if (Object.keys(Ed11y.dismissedAlerts[Ed11y.options.currentPage]).length === 0) {
          delete Ed11y.dismissedAlerts[Ed11y.options.currentPage];
        }
        //window.requestAnimationFrame(() => Ed11y.updatePanel());
      } else {
        let dismissal = {};
        dismissal[dismissalKey] = dismissalType;
        if (typeof Ed11y.dismissedAlerts[Ed11y.options.currentPage] == 'undefined') {
          let store = {};
          store[test] = dismissal;
          Ed11y.dismissedAlerts[Ed11y.options.currentPage] = store;
        } else if (typeof Ed11y.dismissedAlerts[Ed11y.options.currentPage][test] === 'undefined') {
          Ed11y.dismissedAlerts[Ed11y.options.currentPage][test] = dismissal;
        } else {
          Ed11y.dismissedAlerts[Ed11y.options.currentPage][test][dismissalKey] = dismissalType;
        }
        Ed11y.showDismissed.removeAttribute('hidden');
      }

      // Send record to storage or dispatch an event to an API.
      if (Ed11y.options.syncedDismissals === false) {
        localStorage.setItem('ed11ydismissed', JSON.stringify(Ed11y.dismissedAlerts));
      }
      let dismissalDetail = {
        dismissPage: Ed11y.options.currentPage,
        dismissTest: test,
        dismissKey: dismissalKey,
        dismissAction: dismissalType,
      };
      let ed11yDismissalUpdate = new CustomEvent('ed11yDismissalUpdate', { detail: dismissalDetail });
      window.setTimeout(() => {
        document.dispatchEvent(ed11yDismissalUpdate);
      },100);
    };

    Ed11y.dismissThis = function (dismissalType, all = false) {
      // Find the active tip and draw its identifying information from the result list
      let removal = Ed11y.openTip;
      let id = removal.tip.dataset.ed11yResult;
      let test = Ed11y.results[id].test;

      if (all) {
        Ed11y.results.forEach((result) => {
          if (result.test === test && result.dismissalStatus !==dismissalType) {
            dismissOne(dismissalType, test, result.dismissalKey);
          }
        });
      } else {
        let dismissalKey = Ed11y.dismissalKey(Ed11y.results[id].dismissalKey);
        dismissOne(dismissalType, test, dismissalKey);
      }

      // Remove tip and reset borders around element
      Ed11y.resetClass(['ed11y-hidden-highlight', 'ed11y-ring-red', 'ed11y-ring-yellow']);
      removal.tip?.parentNode?.removeChild(removal.tip);
      // TODO EDITING: COMMENT OUT BELOW...SEEMS REDUNDANT?
      //removal.button?.parentNode?.removeChild(removal.button);

      Ed11y.reset();
      Ed11y.showPanel = true;
      Ed11y.checkAll();

      let rememberGoto = Ed11y.lastOpenTip;

      window.setTimeout(function () {
        if (Ed11y.jumpList.length > 0) {
          Ed11y.lastOpenTip = (rememberGoto - 1);
          Ed11y.panelJumpNext?.focus();
        } else {
          window.setTimeout(function () {
            Ed11y.panelToggle?.focus();
          }, 100);
        }
      }, 500, rememberGoto);

    };

    Ed11y.transferFocus = function () {
      if (!Ed11y.openTip.tip) {
        return;
      }
      const id = Ed11y.openTip.tip.dataset.ed11yResult;
      const target = Ed11y.results[id].element;
      const editable = target.closest('[contenteditable]');
      if (!editable && !target.closest('textarea, input')) {
        if (target.closest('a')) {
          Ed11y.toggledFrom = target.closest('a');
        } else if (target.getAttribute('tabindex') !== null) {
          Ed11y.toggledFrom = target;
        } else {
          target.setAttribute('tabindex', '0');
          Ed11y.toggledFrom = target;
        }
        Ed11y.openTip.tip.shadowRoot.querySelector('.close').click();
      } else {
        Ed11y.toggledFrom = false;
        if (target.getAttribute('contenteditable') === 'true') {
          Ed11y.toggledFrom = target;
        } else if (target.closest('p[contenteditable="true"]')) {
          Ed11y.toggledFrom = target.closest('p[contenteditable="true"]');
        } else {
          // Just got complicated -- need to move a caret
          Ed11y.toggledFrom = false;
        }
        Ed11y.openTip.tip.shadowRoot.querySelector('.close').click();
        if (!Ed11y.toggledFrom && editable) {
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
    };

    Ed11y.toggleShowDismissals = function () {
      // todo postpone: if user has allowHide but not allowOK or vice versa, this temporarily clears both.
      Ed11y.ignoreAll = false;
      Ed11y.options.showDismissed = !(Ed11y.options.showDismissed);
      Ed11y.reset();
      Ed11y.showPanel = true;
      Ed11y.checkAll();

      Ed11y.showDismissed.setAttribute('data-ed11y-pressed', (!!Ed11y.options.showDismissed).toString());
      window.setTimeout(function() {
        Ed11y.showDismissed.focus();
      }, 0);
    };

    Ed11y.showResults = function () {
      Ed11y.buildJumpList();
      // Announce that buttons have been placed.
      document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
      Ed11y.alignButtons();
      if (!Ed11y.options.inlineAlerts) {
        Ed11y.checkEditableIntersects();
        Ed11y.intersectionObservers();
      }
    };

    Ed11y.editableHighlight = [];

    Ed11y.alignHighlights = function() {

      if (Ed11y.options.fixedRoots && Ed11y.editableHighlight.length > 0) {
        Ed11y.positionedFrames = [];

        Ed11y.options.fixedRoots.forEach((root) => {
          if (root['framePositioner']) {
            Ed11y.positionedFrames.push(root['framePositioner'].getBoundingClientRect());
          }
        });
      }

      Ed11y.editableHighlight.forEach((el) => {

        if (!Ed11y.results[el.resultID]) {
          Ed11y.interaction = true;
          Ed11y.forceFullCheck = true;
          Ed11y.editableHighlight = [];
          Ed11y.incrementalCheck(true);
          return false;
        }

        const framePositioner = Ed11y.results[el.resultID].fixedRoot && Ed11y.positionedFrames[Ed11y.results[el.resultID].fixedRoot] ?
          Ed11y.positionedFrames[Ed11y.results[el.resultID].fixedRoot] : { top: 0, left: 0 };

        let targetOffset = el.target.getBoundingClientRect();
        if (!Ed11y.visible(el.target)) {
          // Invisible target.
          const firstVisibleParent = Ed11y.firstVisibleParent(el.target);
          targetOffset = firstVisibleParent ? firstVisibleParent.getBoundingClientRect() : targetOffset;
        }

        el.highlight.style.setProperty('width', targetOffset.width + 6 + 'px');
        el.highlight.style.setProperty('top', targetOffset.top + framePositioner.top + window.scrollY - 3 + 'px');
        el.highlight.style.setProperty('left', targetOffset.left + framePositioner.left - 3 + 'px');
        el.highlight.style.setProperty('height', targetOffset.height + 6 + 'px');
      });
    };

    Ed11y.editableHighlighter = function (resultID, show, firstVisible) {

      if (!show) {
        Ed11y.editableHighlight[resultID]?.highlight.style.setProperty('opacity', '0');
        return;
      }
      const result = Ed11y.results[resultID];
      let el = Ed11y.editableHighlight[resultID]?.highlight;
      if (!el) {
        el = document.createElement('ed11y-element-highlight');
        el.classList.add('ed11y-element');
        Ed11y.editableHighlight[resultID] = {highlight: el, resultID: resultID};
        el.style.setProperty('position', 'absolute');
        el.style.setProperty('pointer-events', 'none');
        Ed11y.options.panelAttachTo.appendChild(el);
      }
      Ed11y.editableHighlight[resultID].target = firstVisible ? firstVisible : result.element;
      const zIndex = result.dismissalKey ? 'calc(var(--ed11y-buttonZIndex, 9999) - 2)' : 'calc(var(--ed11y-buttonZIndex, 9999) - 1)';
      el.style.setProperty('z-index', zIndex);
      const outline = result.dismissalKey ?
        '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-warning, #fad859), 0 0 0 3px var(--ed11y-warning, #fad859), 0 0 0 4px var(--ed11y-primary)'
        : '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-alert, #b80519), 0 0 0 3px var(--ed11y-alert, #b80519), 0 0 1px 3px';
      el.style.setProperty('box-shadow', outline);
      el.style.setProperty('border-radius', '3px');
      el.style.setProperty('top', '0');
      el.style.setProperty('left', '0');
      Ed11y.alignHighlights();
      el.style.setProperty('opacity', '1');
    };

    const nudgeMark = function (el, x, y) {
      // TODO: THESE CAN NUDGE OUT OF THE OVERFLOW AREA OF THE CONTENTEDITABLE CONTAINER
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

    const closestScrollable = function(el) {
      if (Ed11y.options.constrainButtons && el.closest(Ed11y.options.constrainButtons)) {
        return el.closest(Ed11y.options.constrainButtons);
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
    };

    const overlap = function(rect1Left, rect1Top, rect2Left, rect2Top, size = 17) {
      // Yes this looks like intersect const, but it's math not browser offsets.
      return !(rect1Left + size < rect2Left ||
        rect1Left > rect2Left + size ||
        rect1Top + size < rect2Top ||
        rect1Top > rect2Top + size);
    };

    // Applies parameters and avoids other widgets.
    Ed11y.alignPanel = function() {
      if (!Ed11y.panelElement) {
        return false;
      }
      if (Ed11y.options.panelPinTo === 'left') {
        Ed11y.panel.classList.add('ed11y-pin-left');
      }
      let xMost = 0;
      let yMost = 0;
      if (Ed11y.elements.panelPin) {
        Ed11y.elements.panelPin.forEach(el => {
          let bounds = el.getBoundingClientRect();
          if (Ed11y.options.panelPinTo === 'right') {
            xMost = windowWidth - bounds.left > xMost && bounds.left > windowWidth / 3 ? windowWidth - bounds.left : xMost;
          } else {
            xMost = bounds.right > xMost && xMost + bounds.right < windowWidth / 3 ? xMost + bounds.right : xMost;
          }
          yMost = bounds.height > yMost && bounds.height + yMost < window.innerHeight / 2 ? yMost + bounds.height : yMost;
        });
      }
      if (xMost > 0 && xMost < windowWidth - 240) {
        // push off horizontal
        Ed11y.panelElement.style.setProperty(Ed11y.options.panelPinTo, xMost + 10 + 'px');
        Ed11y.panelElement.style.setProperty('bottom', Ed11y.options.panelOffsetY);
      } else if (xMost > 0 && xMost > windowWidth - 240 && yMost > 0) {
        // push off vertical
        Ed11y.panelElement.style.setProperty(Ed11y.options.panelPinTo, Ed11y.options.panelOffsetX);
        Ed11y.panelElement.style.setProperty('bottom', `calc(${Ed11y.options.panelOffsetY} + ${yMost}px)`);
      } else {
        // no push
        Ed11y.panelElement.style.setProperty(Ed11y.options.panelPinTo, Ed11y.options.panelOffsetX);
        Ed11y.panelElement.style.setProperty('bottom', Ed11y.options.panelOffsetY);
      }
    };

    Ed11y.positionedFrames = [];

    Ed11y.alignButtons = function () {
      if (!Ed11y.jumpList || Ed11y.jumpList.length === 0 || (Ed11y.openTip.button && Ed11y.scrollPending === 0)) {
        return;
      }
      Ed11y.alignPending = true;

      // Reading and writing in a loop creates paint thrashing.
      // We iterate the array for reads, then iterate for writes.

      if (Ed11y.options.fixedRoots) {
        Ed11y.positionedFrames = [];

        Ed11y.options.fixedRoots.forEach((root) => {
          if (root['framePositioner']) {
            Ed11y.positionedFrames.push(root['framePositioner'].getBoundingClientRect());
          }
        });
      }

      // Used for crude intersection detection.
      let previousNudgeTop = 0;
      let previousNudgeLeft = 0;
      const scrollTop = window.scrollY;
      if (!Ed11y.options.inlineAlerts) {
        // Compute based on target position.

        Ed11y.jumpList.forEach((mark, i) => {
          if (!mark.result.element.isConnected) {
            // Something broke; rebuild jumplist on next loop.
            Ed11y.forceFullCheck = true;
            Ed11y.interaction = true;
            mark.style.display = 'none';
          } else {
            //mark.visibility = 'visible';
          }
          let targetOffset = mark.result.element.getBoundingClientRect();

          let top = targetOffset.top + scrollTop;
          //let rightBound = windowWidth;
          if (!Ed11y.visible(mark.result.element)) {
            // Invisible target.
            const firstVisibleParent = Ed11y.firstVisibleParent(mark.result.element);
            targetOffset = firstVisibleParent ? firstVisibleParent.getBoundingClientRect() : targetOffset;
            top = targetOffset.top + scrollTop;
          }
          let left = targetOffset.left;

          // TD TD different?
          if (mark.result.element.tagName === 'IMG') {
            top = top + 10;
            left = left + 10;
          } else {
            left = Ed11y.options.inlineAlerts ? left - 34 : left;
          }

          // Add iframe positon to calculated position
          if (mark.result.fixedRoot && Ed11y.positionedFrames[mark.result.fixedRoot]) {
            top = top + Ed11y.positionedFrames[mark.result.fixedRoot].top;
            left = left + Ed11y.positionedFrames[mark.result.fixedRoot].left;
          }

          // TD TD different?
          if (mark.result.element.tagName === 'IMG') {
            top = top + 10;
            left = left + 10;
          } else {
            left = Ed11y.options.inlineAlerts ? left - 34 : left;
          }
          if (mark.result.scrollableParent) {
            // Bump alerts that would be X-position out of a scroll zone.
            Ed11y.jumpList[i].bounds = mark.result.scrollableParent.getBoundingClientRect();
            if (left < Ed11y.jumpList[i].bounds.left) {
              left = Ed11y.jumpList[i].bounds.left;
            } else if (left + 40 > Ed11y.jumpList[i].bounds.right) {
              left = Ed11y.jumpList[i].bounds.right - 40;
            }
          } else if (mark.result.fixedRoot && Ed11y.positionedFrames[mark.result.fixedRoot]) {
            // Bump alerts that would x-position out of an iframe.
            Ed11y.jumpList[i].bounds = Ed11y.positionedFrames[mark.result.fixedRoot];
            if (left < Ed11y.jumpList[i].bounds.left) {
              left = Ed11y.jumpList[i].bounds.left;
            } else if (left + 40 > Ed11y.jumpList[i].bounds.right) {
              left = Ed11y.jumpList[i].bounds.right - 40;
            }
          }
          Ed11y.jumpList[i].targetOffset = targetOffset;
          Ed11y.jumpList[i].markTop = top;
          Ed11y.jumpList[i].markLeft = left;
        });
      } else {
        // Compute based on self position.

        // Clear old transforms first. Batch write first...
        Ed11y.jumpList.forEach((mark) => {
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
        Ed11y.jumpList.forEach((mark) => {
          mark.markOffset = mark.getBoundingClientRect();
          mark.markLeft = mark.markOffset.left;
          mark.markTop = mark.markOffset.top;
        });
      }


      // Check for overlaps, then write out transforms.
      Ed11y.jumpList.forEach((mark, i) => {

        // Now check for any needed nudges
        let nudgeTop = 10;
        let nudgeLeft = mark.result.element.tagName === 'IMG' ? 10 : -34;
        // Detect tip that overlaps with previous result.
        if (mark.markTop + scrollTop < 0) {
          // Offscreen to top.
          nudgeTop = (-1 * (mark.markTop + scrollTop)) - 6;
        }
        if (
          (i > 0 && overlap(mark.markLeft, mark.markTop, Ed11y.jumpList[i - 1].markLeft, Ed11y.jumpList[i - 1].markTop)) ||
          (i > 1 && overlap(mark.markLeft, mark.markTop, Ed11y.jumpList[i - 2].markLeft, Ed11y.jumpList[i - 2].markTop)) ||
          (i > 2 && overlap(mark.markLeft, mark.markTop, Ed11y.jumpList[i - 3].markLeft, Ed11y.jumpList[i - 3].markTop))
        ) {
          // todo postpone: compute actual overlap? We're bouncing by the full amount no matter what which adds too much gapping.
          nudgeTop = nudgeTop + 14 + previousNudgeTop;
          nudgeLeft = 14 + previousNudgeLeft;
        }

        let constrainLeft = 0;
        let constrainRight = windowWidth;

        if (mark.result.scrollableParent) {
          const constrained = mark.result.scrollableParent.getBoundingClientRect();
          constrainLeft = constrained.left;
          constrainRight = constrainLeft + constrained.width;
        } else if (mark.result.fixedRoot && Ed11y.positionedFrames[mark.result.fixedRoot]) {
          constrainLeft = Ed11y.positionedFrames[mark.result.fixedRoot].left;
          constrainRight = Ed11y.positionedFrames[mark.result.fixedRoot].right;
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
        if (!Ed11y.options.inlineAlerts) {
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
      if (!Ed11y.options.inlineAlerts) {
        // Alerts have to be positioned relative to viewport.
        Ed11y.jumpList.forEach(mark => {

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
          } else if (mark.result.fixedRoot && Ed11y.positionedFrames[mark.result.fixedRoot]) {
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
      Ed11y.jumpList?.forEach(mark => {
        // Now make visible.
        // todo: Edge still flickers on redraw.
        mark.classList.remove('ed11y-preload');
      });

    };


    Ed11y.paintReady = function () {

      for (const [key, value] of Object.entries(Ed11y.theme)) {
        document.documentElement.style.setProperty('--ed11y-' + key, value);
      }

      // May be redundant, but preloads unbundled files.
      if (document.querySelector('body')) {
        // May be redundant, but preloads unbundled files.
        Ed11y.attachCSS(document.querySelector('body'));
      }


      Ed11y.roots.forEach((root) => {
        // Shadow elements don't inherit styles, so they need their own copy.
        if (Ed11y.options.shadowComponents) {
          root.querySelectorAll(Ed11y.options.shadowComponents)?.forEach((shadowHost) => {
            if (shadowHost.shadowRoot) {
              Ed11y.attachCSS(shadowHost.shadowRoot);
            }
          });
        }
      });
      Ed11y.bodyStyle = true;
    };

    Ed11y.alignTip = function (button, toolTip, recheck = 0, reveal = false) {
      if (!toolTip) {
        return;
      }

      let arrow = toolTip.shadowRoot.querySelector('.arrow');
      let tip = arrow.nextElementSibling;
      let loopCount = recheck - 1;

      // Various hiddenHandlers may cause element to animate open.
      if (recheck > 0) {
        window.setTimeout(function () {
          requestAnimationFrame(()=>Ed11y.alignTip(button, toolTip, loopCount, reveal));
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
      const result = Ed11y.results[resultNum];

      // Find button on page
      const scrollTop = window.scrollY;
      let leftAdd = Ed11y.options.inlineAlerts ? window.scrollX : 0;

      let buttonOffset = button.getBoundingClientRect();
      let buttonSize = buttonOffset.width;
      let buttonLeft = buttonOffset.left + leftAdd;
      let buttonTop = buttonOffset.top + scrollTop;

      let containTop = scrollTop;
      let containLeft = 0;
      let containWidth = windowWidth;
      let containBottom = window.innerHeight + scrollTop;
      let absoluteBottom = containBottom;

      if (!Ed11y.options.inlineAlerts && result.scrollableParent) {
        let bounds = result.scrollableParent.getBoundingClientRect();
        if (bounds.width > 0) {
          //buttonTop = buttonTop + result.scrollableParent.scrollTop;
          containLeft = Math.max(0, bounds.left);
          containWidth = Math.min(containWidth, bounds.width - 30);
          containBottom = bounds.bottom + scrollTop;
          containTop = bounds.top + scrollTop;
          absoluteBottom = bounds.top + result.scrollableParent.scrollHeight;
        }
      } else if (mark.dataset.ed11yHiddenResult === 'true' || !(Ed11y.visible(mark) || buttonOffset.top === 0 && buttonOffset.left === 0)) {
        // ruh roh invisible button
        // todo: use the not-inline drawing pattern for invisible targets?
        const firstVisibleParent = Ed11y.firstVisibleParent(mark.result.element);
        if (firstVisibleParent) {
          buttonOffset = firstVisibleParent.getBoundingClientRect();
          buttonLeft = buttonOffset.left;
          buttonTop = buttonOffset.top;
        } else {
          tip.style.setProperty('max-width', 'none');
        }
        // Estimate from font when it can't be measured.
        buttonSize = windowWidth > 800 ? 38 : 33;
      }
      // Set wrapper for CSS.
      //tip.closest('.ed11y-wrapper').style.setProperty('width', buttonSize + 'px');
      //tip.closest('.ed11y-wrapper').style.setProperty('height', buttonSize + 'px');
      document.documentElement.style.setProperty('--ed11y-buttonWidth', buttonSize + 'px');
      tip.style.setProperty('max-width', `min(${containWidth > 280 ? containWidth : 280}px, 90vw)`);
      const containRight = Math.min(windowWidth, containLeft + containWidth);
      toolTip.style.setProperty('top', buttonOffset.top + scrollTop + 'px');
      toolTip.style.setProperty('left', buttonOffset.left + leftAdd + 'px');
      const tipWidth = tip.offsetWidth;
      const tipHeight = tip.offsetHeight;

      let direction = 'under';

      // Default to displaying under
      if (buttonTop === 0 && buttonLeft === 0) {
        direction = 'whompwhomp';
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
      case 'whompwhomp':
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
      Ed11y.alignHighlights();
    };

    Ed11y.togglePanel = function () {
      Ed11y.ignoreAll = false;

      if (!Ed11y.doubleClickPrevent) {
        // Prevent clicks piling up while scan is running.
        if (Ed11y.running !== true) {
          Ed11y.running = true;
          // Re-scan each time the panel reopens.
          if (Ed11y.panel.classList.contains('ed11y-shut') === true) {
            Ed11y.onLoad = false;
            Ed11y.incremental = false;
            Ed11y.showPanel = true;
            if (Ed11y.dismissedCount > 0 && Ed11y.warningCount === 0 && Ed11y.errorCount === 0) {
              Ed11y.options.showDismissed = false;
              Ed11y.toggleShowDismissals();
            } else {
              Ed11y.checkAll();
            }
            Ed11y.options.userPrefersShut = false;
            localStorage.setItem('editoria11yShow', '1');
          }
          else {
            Ed11y.panelToggleTitle.textContent = Ed11y.totalCount > 0 ? Ed11y.M.buttonShowAlerts : Ed11y.M.buttonShowNoAlert;
            Ed11y.options.showDismissed = false;
            Ed11y.reset();
            Ed11y.options.userPrefersShut = true;
            localStorage.setItem('editoria11yShow', '0');
          }
        }
      }
      Ed11y.doubleClickPrevent = true;
      window.setTimeout(function () {
        Ed11y.doubleClickPrevent = false;
      }, 200);
      return false;
    };

    const showHeadingsPanel = function () {
      // Visualize the document outline

      let panelOutline = Ed11y.panel.querySelector('#ed11y-outline');

      if (Ed11y.headingOutline.length) {
        panelOutline.innerHTML = '';
        Ed11y.headingOutline.forEach((el, i) => {
          // Todo: draw these in editable mode.
          if (Ed11y.options.inlineAlerts) {
            const mark = document.createElement('ed11y-element-heading-label');
            mark.classList.add('ed11y-element', 'ed11y-element-heading');
            mark.dataset.ed11yHeadingOutline = i.toString();
            mark.setAttribute('id', 'ed11y-heading-' + i);
            mark.setAttribute('tabindex', '-1');
            // Array: el, level, outlinePrefix
            el[0].insertAdjacentElement('afterbegin', mark);
            Ed11y.attachCSS(mark.shadowRoot);
          }
          let level = el[1];
          let leftPad = 10 * level - 10;
          let li = document.createElement('li');
          li.classList.add('level' + level);
          li.style.setProperty('margin-left', leftPad + 'px');
          let levelPrefix = document.createElement('strong');
          levelPrefix.textContent = `H${level}: `;
          let userText = document.createElement('span');
          userText.textContent = Ed11y.computeText(el[0]);
          let link = document.createElement('a');
          if (Ed11y.options.inlineAlerts) {
            link.setAttribute('href', '#ed11y-heading-' + i);
            li.append(link);
            link.append(levelPrefix);
            link.append(userText);
          } else {
            li.append(levelPrefix);
            li.append(userText);
          }
          if (el[2]) { // Has an error message
            let type = !el[3] ? 'ed11y-error' : 'ed11y-warning';
            li.classList.add(type);
            let message = document.createElement('em');
            message.classList.add('ed11y-small');
            message.textContent = ' ' + el[2];
            if (Ed11y.options.inlineAlerts) {
              link.append(message);
            } else {
              li.append(message);
            }
          }
          panelOutline.append(li);
        });
      } else {
        panelOutline.innerHTML = '<p><em>No heading structure found.</em></p>';
      }
    };

    Ed11y.alignAlts = function () {
      // Positions alt label to match absolute, inline or floated images.
      Ed11y.findElements('altMark', 'ed11y-element-alt');
      Ed11y.elements.altMark?.forEach((el) => {
        let id = el.dataset.ed11yImg;
        el.style.setProperty('transform', null);
        el.style.setProperty('height', null);
        el.style.setProperty('width', null);

        let img = Ed11y.imageAlts[id][0];
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
      let altList = Ed11y.panel.querySelector('#ed11y-alt-list');

      if (Ed11y.imageAlts.length) {
        altList.innerHTML = '';
        Ed11y.imageAlts.forEach((el, i) => {
          // el[el, src, altLabel, altStyle]

          if (Ed11y.options.inlineAlerts) {
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

          if (Ed11y.options.inlineAlerts) {
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
        Ed11y.alignAlts();
      } else {
        const noImages = document.createElement('p');
        const noItalic = document.createElement('em');
        noItalic.textContent = Ed11y.M.noImagesFound;
        noImages.appendChild(noItalic);
        altList.innerHTML = '';
        altList.appendChild(noImages);
      }
    };
    Ed11y.visualizing = false;
    Ed11y.visualize = function () {
      if (!Ed11y.panel) {
        return;
      }
      if (Ed11y.options.inlineAlerts) {
        Ed11y.findElements('reset', 'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', false);
        Ed11y.elements.reset?.forEach((el) => el.remove());
      }
      if (Ed11y.visualizing) {
        Ed11y.visualizing = false;
        Ed11y.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Ed11y.M.buttonToolsContent;
        Ed11y.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'false');
        Ed11y.panel.querySelector('#ed11y-visualizers').setAttribute('hidden', 'true');
        return;
      }
      Ed11y.visualizing = true;
      Ed11y.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Ed11y.M.buttonToolsActive;
      Ed11y.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'true');
      Ed11y.panel.querySelector('#ed11y-visualizers').removeAttribute('hidden');
      showAltPanel();
      showHeadingsPanel();
    };

    Ed11y.buildJumpList = function () {

      Ed11y.jumpList = [];
      Ed11y.pauseObservers();

      // Initial alignment to get approximate Y position order for jump list.
      Ed11y.results.forEach((result, i) => {

        let top = result.element.getBoundingClientRect().top;
        if (!top) {
          const visibleParent = Ed11y.firstVisibleParent(result.element);
          if (visibleParent) {
            top = visibleParent.getBoundingClientRect().top;
          }
        }
        top = top + window.scrollY;
        if (Ed11y.options.fixedRoots) {
          const root = result.element.closest('[data-ed11y-root]');
          // Todo: it might be faster to associate this with the element finder.
          Ed11y.results[i].fixedRoot = root.dataset.ed11yRoot;
        }
        Ed11y.results[i].scrollableParent = closestScrollable(result.element);
        if (Ed11y.results[i].scrollableParent) {
          // Group these together.
          top = top * 0.000001;
        }
        Ed11y.results[i].sortPos = top;
      });
      // Sort from bottom to top so focus order after insert is top to bottom.
      Ed11y.results.sort((a, b) => b.sortPos - a.sortPos);

      Ed11y.results?.forEach(function (result, i) {
        if (!Ed11y.results[i].dismissalStatus || Ed11y.options.showDismissed) {
          Ed11y.result(result, i);
        }
      });
      Ed11y.jumpList.forEach((el, i) => {
        el.dataset.ed11yJumpPosition = `${i}`;
        const newLabel = `${el.shadowRoot.querySelector('.toggle').getAttribute('aria-label')}, ${i + 1} / ${Ed11y.jumpList.length - 1}`;
        el.shadowRoot.querySelector('.toggle').setAttribute('aria-label', newLabel);
      });
      let tipsPainted = new CustomEvent('ed11yResultsPainted');
      document.dispatchEvent(tipsPainted);
      Ed11y.resumeObservers();
    };

    // hat tip https://www.joshwcomeau.com/snippets/javascript/debounce/
    let browserSpeed = 1;
    Ed11y.browserLag = 0; // Scale debounce based on browser performance.
    const debounce = (callback, wait) => {
      let timeoutId = null;
      return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          callback.apply(null, args);
        }, wait + Ed11y.browserLag);
      };
    };

    const intersect = function(a, b, x = 10) {
      // Compute intersect using browser offsets.
      return (a.left - x <= b.right &&
        b.left - x <= a.right &&
        a.top - x <= b.bottom &&
        b.top - x <= a.bottom);
    };

    Ed11y.activeRange = false;
    Ed11y.rangeChange = function(anchorNode) {
      let anchor = anchorNode ? anchorNode : window.getSelection()?.anchorNode;
      const expandable = anchor &&
        anchor.parentNode &&
        typeof anchor.parentNode === 'object' &&
        typeof anchor.parentNode.matches === 'function';
      if (!anchor || expandable &&
        ( anchor.parentNode.matches(Ed11y.options.checkRoots) ||
          ( !anchor.parentNode.matches(Ed11y.options.checkRoots) && anchor.parentNode.matches('div[contenteditable="true"]')
          )
        )
      ) {
        Ed11y.activeRange = false;
        return false;
      }
      // todo: this if is probably redundant?
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
        if (Ed11y.activeRange) {
          Ed11y.activeRange = false;
          return true;
        } else {
          return false;
        }
      } else {
        let sameRange = Ed11y.activeRange &&
          range.startContainer === Ed11y.activeRange.startContainer &&
          range.startOffset === Ed11y.activeRange.startOffset;
        Ed11y.activeRange = range;
        return !sameRange;
      }
    };

    /**
     * Hide tips that are in front of text currently being edited.
     * */
    Ed11y.checkEditableIntersects = function (focusKnown = false) {
      if (!focusKnown && !document.querySelector('[contenteditable]:focus, [contenteditable] :focus')) {
        //Reset classes to measure.
        Ed11y.jumpList?.forEach((el) => {
          el.classList.remove('intersecting');
        });
        return;
      }
      if (!Ed11y.activeRange) {
        // Range isn't on a node we can measure.
        Ed11y.jumpList?.forEach((el) => {
          el.classList.remove('intersecting');
        });
        return;
      }
      Ed11y.jumpList?.forEach((el) => {
        const framePositioner = el.result.fixedRoot && Ed11y.positionedFrames[el.result.fixedRoot] ?
          Ed11y.positionedFrames[el.result.fixedRoot] : { top: 0, left: 0 };
        const activeRects = Ed11y.activeRange.getBoundingClientRect();
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
    };

    let scrollTicking = false;
    Ed11y.scrollPending = 0;
    Ed11y.updateTipLocations = () => {
      if (!scrollTicking && Ed11y.scrollPending > 0 && !Ed11y.running && Ed11y.jumpList && Ed11y.open) {
        scrollTicking = true;
        Ed11y.alignButtons();
        if (Ed11y.openTip.tip) {
          Ed11y.alignTip(Ed11y.openTip.button.shadowRoot.querySelector('button'), Ed11y.openTip.tip);
        }
        Ed11y.scrollPending --;
      }
      scrollTicking = false;
      if (Ed11y.scrollPending > 0) {
        requestAnimationFrame(() => Ed11y.updateTipLocations());
      }
    };

    Ed11y.intersectionObservers = function () {

      Ed11y.elements.editable?.forEach(editable => {
        editable.addEventListener('scroll', function() {
          // Align tips when scrolling editable container.
          if (Ed11y.openTip.button) {
            Ed11y.scrollPending = Ed11y.scrollPending < 2 ? Ed11y.scrollPending + 1 : Ed11y.scrollPending;
            requestAnimationFrame(() => Ed11y.updateTipLocations());
          }
        });
      });

      document.addEventListener('scroll', function() {
        // Trigger on scrolling other containers, unless it will flicker a tip.
        if (!Ed11y.options.inlineAlerts && !Ed11y.openTip.button) {
          Ed11y.scrollPending = Ed11y.scrollPending < 2 ? Ed11y.scrollPending + 1 : Ed11y.scrollPending;
          requestAnimationFrame(() => Ed11y.updateTipLocations());
        } else if (Ed11y.openTip.button) {
          Ed11y.alignTip(Ed11y.openTip.button.shadowRoot.querySelector('button'), Ed11y.openTip.tip);
        }
      }, true);

      Ed11y.selectionChanged = debounce(() => {
        if (Ed11y.rangeChange()) {
          Ed11y.updateTipLocations();
          Ed11y.checkEditableIntersects();
        }
      }, 100);

      document.addEventListener('selectionchange', function() {
        if (!Ed11y.running) {
          Ed11y.selectionChanged();
        }
      });
    };

    Ed11y.recentlyAddedNodes = new WeakMap();
    Ed11y.addedNodeReadyToCheck = function(el) {
      if (!Ed11y.recentlyAddedNodes.has(el)) {
        return true;
      }
      const hasText = el.textContent.trim().length;
      if ((!hasText && Ed11y.recentlyAddedNodes.get(el) > Date.now() - 5000) ||
        Ed11y.activeRange && el.contains(Ed11y.activeRange.startContainer)) {
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
          Ed11y.recentlyAddedNodes.delete(el);
          return true;
        }
      } else {
        // New node is ready for checking.
        Ed11y.recentlyAddedNodes.delete(el);
        return true;
      }
    };

    Ed11y.incrementalAlign = debounce(() => {
      if (!Ed11y.running && !Ed11y.alignPending) {
        Ed11y.scrollPending++;
        Ed11y.updateTipLocations();
        Ed11y.alignPending = false;
      } else {
        Ed11y.incrementalAlign();
      }
    }, 10);
    Ed11y.interaction = false;
    window.addEventListener('keydown', () => {
      Ed11y.interaction = true;
    });
    window.addEventListener('click', () => {
      Ed11y.interaction = true;
    });
    Ed11y.incrementalCheck = debounce(() => {
      if (!Ed11y.running) {
        if (Ed11y.openTip.button || (!Ed11y.interaction && !Ed11y.forceFullCheck)) {
          return;
        }
        Ed11y.interaction = false;
        Ed11y.running = true;
        let runTime = performance.now();
        Ed11y.incremental = true;
        if (Ed11y.disabled && Ed11y.closedByDisable) {
          Ed11y.showPanel = true;
          Ed11y.closedByDisable = false;
          Ed11y.disabled = false;
        }
        //Ed11y.forceFullCheck = true; // todo no
        Ed11y.checkAll();
        window.setTimeout(function() {
          if (Ed11y.visualizing) {
            Ed11y.visualizing = false;
            Ed11y.pauseObservers();
            Ed11y.visualize();
            Ed11y.resumeObservers();
          }
        }, 500);
        // todo: if there are no issues and the heading panel is open...it closes!
        // Increase debounce if runs are slow.
        runTime = performance.now() - runTime;
        browserSpeed = runTime > 10 ? 10 : (browserSpeed + runTime) / 2;
        // Todo: optimize tip placement so we do not need as much debounce.
        Ed11y.browserLag = browserSpeed < 1 ? 0 : browserSpeed * 100 + Ed11y.totalCount;
      } else {
        // Ed11y was running, try again later.
        window.setTimeout(() => {Ed11y.incrementalCheck();}, 250);
      }
    }, 250);
    Ed11y.slowIncremental = debounce(() => {
      //Ed11y.incrementalAlign(); // Immediately realign tips.
      //Ed11y.alignPending = false;
      Ed11y.interaction = true;
      Ed11y.incrementalCheck();
    }, 1000);

    Ed11y.pauseObservers = function() {
      Ed11y.watching?.forEach(observer => {
        observer.observer.disconnect();
      });
    };
    Ed11y.resumeObservers = function() {
      Ed11y.watching?.forEach(observer => {
        observer.observer.observe(observer.root, observer.config);
      });
    };

    /*
    Set up mutation observer for added nodes.
    */
    const startObserver = function (root) {

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
        if (Ed11y.options.inlineAlerts) {
          return 1;
        }
        if (!node.matches('[contenteditable] *')) {
          return 0;
        }
        if (Ed11y.options.inlineAlerts) {
          return true;
        }
        const searchList = 'table, h1, h2, h3, h4, h5, h6, blockquote';
        if (!Ed11y.options.inlineAlerts &&
          !node.matches(node.matches(searchList)) &&
          node.matches('[contenteditable] *')) {
          if (node.matches('table *')) {
            node = node.closest('table');
          } else if (!node.matches(searchList)) {
            node = node.querySelector(searchList);
          }
        }
        if (node && node.matches(searchList)) {
          Ed11y.recentlyAddedNodes.set(node, Date.now());
          Ed11y.incrementalAlign(); // Immediately realign tips.
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
            Ed11y.incrementalAlign();
            Ed11y.slowIncremental();
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
          Ed11y.incrementalAlign(); // Immediately realign tips.
          Ed11y.alignPending = false;
          Ed11y.incrementalCheck(); // Recheck after delay.
        },0);
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);
      // Start observing the target node for configured mutations
      observer.observe(root, config);
      Ed11y.watching.push({
        observer: observer,
        root: root,
        config: config,
      });
      document.addEventListener('readystatechange', () => {
        window.setTimeout(function () {
          Ed11y.scrollPending++;
          Ed11y.updateTipLocations();
        }, 100);
      });
      window.setTimeout(function () {
        Ed11y.scrollPending++;
        Ed11y.updateTipLocations();
      }, 1000);
    };

    Ed11y.openTip = {
      button: false,
      tip: false,
    };
    Ed11y.lastOpenTip = -1;

    Ed11y.viaJump = false;
    Ed11y.alertOnInvisibleTip = function(button, target) {
      let delay = 100;
      if (Ed11y.options.hiddenHandlers.length > 0 && !!target.closest(Ed11y.options.hiddenHandlers)) {
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
        Ed11y.message.textContent = '';
        let firstVisible = false;
        let alertMessage;
        if (Ed11y.options.checkVisible && !Ed11y.visible(target)) {
          button.dataset.ed11yHiddenResult = 'true';
          firstVisible = Ed11y.firstVisibleParent(target);
          alertMessage = Ed11y.M.jumpedToInvisibleTip;
        }
        else if (target.closest('[aria-hidden="true"]')) {
          firstVisible = target.closest('[aria-hidden="true"]');
          firstVisible = firstVisible.closest(':not([aria-hidden="true"])');
          alertMessage = Ed11y.M.jumpedToAriaHiddenTip;
        }
        if (firstVisible) {
          // Throw warning that the element cannot be highlighted.
          const tipAlert = Ed11y.openTip.tip?.shadowRoot.querySelector('.ed11y-tip-alert');
          tipAlert.textContent = alertMessage;
          // Todo: confirm we no longer need the panelMessage container.
          /*
          Ed11y.message.textContent = alertMessage;
          Ed11y.hidePanelAlert = Date.now() + 10000; // Set or extend.
          window.setTimeout(function (tip) {
            if (Ed11y.hidePanelAlert < Date.now()) {
              Ed11y.message.textContent = '';
            }
          }, 15000, Ed11y.lastOpenTip);*/
        }
        if (Ed11y.viaJump) {
          let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
          let scrollTarget = Ed11y.options.inlineAlerts ? button : target;
          if (button.dataset.ed11yHiddenResult || !(Ed11y.visible(scrollTarget))) {
            scrollTarget = Ed11y.firstVisibleParent(target);
          }
          if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
            scrollTarget.scrollIntoView({ block: scrollPin, behavior: 'instant' });
          } else {
            Ed11y.raceCrash();
            return false;
          }
        }
        // Todo: following statements work but could be simplified.
        if (!Ed11y.options.inlineAlerts) {
          // todo this selector must match the selector that decides where to place the mark
          Ed11y.editableHighlighter(button.dataset.ed11yResult, true, firstVisible);
        } else {
          if (firstVisible) {
            firstVisible.classList.add('ed11y-hidden-highlight');
          }
        }
        let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
        if (!activeTip) {
          button.setAttribute('data-ed11y-action','open');
          if (Ed11y.viaJump) {
            window.setTimeout(() => {
              // Race conditions are fun.
              let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
              if (Ed11y.viaJump) {
                activeTip?.shadowRoot.querySelector('.title').focus();
              }
            }, 100);
          }
        } else {
          if (Ed11y.viaJump) {
            window.setTimeout(() => {
              // Race conditions are fun.
              activeTip?.shadowRoot.querySelector('.title').focus();
            }, 100, activeTip);
          }
        }
        Ed11y.viaJump = false;
      }, delay, button, target);
    };

    let loopStop = false;
    Ed11y.raceCrash = function() {
      // A marked element disappeared while we were jumping to it.
      if (loopStop) {
        return;
      }
      loopStop = true;
      Ed11y.reset();
      Ed11y.showPanel = true;
      Ed11y.checkAll();
      window.setTimeout(function() {
        if (Ed11y.results.length > 0 && loopStop) {
          Ed11y.jumpTo(1);
          loopStop = false;
        }
      },100, loopStop);
    };

    Ed11y.jumpTo = function(dir = 1) {
      if (!Ed11y.open) {
        return false;
      }
      Ed11y.viaJump = true;
      // Determine target result.
      let goMax = Ed11y.jumpList.length - 1;
      let goNum = Ed11y.lastOpenTip + dir;
      if (goNum < 0) {
        // Reached end of loop or dismissal pushed us out of loop
        Ed11y.nextText = Ed11y.M.buttonFirstContent;
        goNum = goMax;
      } else if (goNum > goMax) {
        goNum = 0;
        Ed11y.nextText = Ed11y.M.buttonNextContent;
      } else {
        Ed11y.nextText = Ed11y.M.buttonNextContent;
      }
      Ed11y.lastOpenTip = goNum;
      window.setTimeout(function () {
        Ed11y.panelJumpNext.querySelector('.ed11y-sr-only').textContent = Ed11y.nextText;
      }, 250);

      Ed11y.resetClass(['ed11y-hidden-highlight']);
      if (!Ed11y.jumpList) {
        Ed11y.buildJumpList();
      }
      // Find next or first result in the dom ordered list of results.
      let goto = Ed11y.jumpList[goNum];
      let result = goto.getAttribute('data-ed11y-result');
      let gotoResult = Ed11y.results[result];
      const target = gotoResult.element;

      // First of two scrollTo calls, to trigger any scroll based events.
      let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
      let scrollTarget = Ed11y.options.inlineAlerts ? goto : target;
      if (goto.dataset.ed11yHiddenResult || !(Ed11y.visible(scrollTarget))) {
        scrollTarget = Ed11y.firstVisibleParent(target);
      }
      if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
        scrollTarget.scrollIntoView({ block: scrollPin, behavior: 'instant' });
      } else {
        Ed11y.raceCrash();
        return false;
      }

      // Open the button
      goto.setAttribute('data-ed11y-action','open');
      Ed11y.scrollPending = 2;
      Ed11y.updateTipLocations();
    };

    Ed11y.windowResize = function () {
      windowWidth = window.innerWidth;
      if (Ed11y.panel?.classList.contains('ed11y-active') === true) {
        Ed11y.alignAlts();
        Ed11y.alignButtons();
      }
      if (Ed11y.openTip.button) {
        Ed11y.alignTip(Ed11y.openTip.button.shadowRoot.querySelector('button'), Ed11y.openTip.tip);
      }
      Ed11y.alignPanel();
    };

    // Move toggles when something expands or collapses.
    const mightExpand = document.querySelectorAll('[aria-expanded], [aria-controls]');
    mightExpand?.forEach(expandable => {
      expandable.addEventListener('click', () => {
        window.setTimeout(() => {
          Ed11y.windowResize();
        }, 333);
      });
    });

    // Escape key closes panels.
    Ed11y.escapeWatch = function (event) {
      if (event.keyCode === 27) {
        if (event.target.closest('ed11y-element-panel') && Ed11y.panelToggle.getAttribute('aria-expanded') === 'true') {
          Ed11y.panelToggle.focus();
          Ed11y.panelToggle.click();
        } else if (event.target.hasAttribute('data-ed11y-open')) {
          if (Ed11y.openTip.button) {
            Ed11y.toggledFrom.focus();
            Ed11y.openTip.button.shadowRoot.querySelector('button').click();
          }
        }
      }
    };
    document.addEventListener('keyup', function (event) { Ed11y.escapeWatch(event); });


    /*=============== Utilities ================*/

    Ed11y.flattenText = function (text) {
      return text.replace(/[\n\r]+|\s{2,}/g, ' ').trim();
    };

    // Gets trimmed and normalized inner text nodes.
    // Use computeText() instead for the full accessible name calculation.
    Ed11y.getText = function (el) {
      return Ed11y.flattenText(el.textContent);
    };

    Ed11y.parents = function (el) {
      let nodes = [];
      nodes.push(el);
      while (el && !!el.parentElement && el.parentElement.tagName !== 'HTML') {
        nodes.push(el.parentElement);
        el = el.parentElement;
      }
      return nodes;
    };

    // Handle aria-label or labelled-by. Latter "wins" and can self-label.
    Ed11y.computeAriaLabel = function (element, recursing = 0) {
      if (Ed11y.options.ignoreAriaOnElements && element.matches(Ed11y.options.ignoreAriaOnElements)) {
        return 'noAria';
      }
      if (Ed11y.options.ignoreTextInElements && element.matches(Ed11y.options.ignoreTextInElements)) {
        return '';
      }

      const labelledBy = element.getAttribute('aria-labelledby');
      if (!recursing && labelledBy) {
        const target = labelledBy.split(/\s+/);
        if (target.length > 0) {
          let returnText = '';
          target.forEach((x) => {
            const targetSelector = document.querySelector(`#${CSS.escape(x)}`);
            returnText += (!targetSelector) ? '' : Ed11y.computeText(targetSelector, 1);
          });
          return returnText;
        }
      }
      if (element.hasAttribute('aria-label') && element.getAttribute('aria-label').trim().length > 0) {
        return element.getAttribute('aria-label');
      }
      return 'noAria';
    };

    Ed11y.wrapPseudoContent = function(el, string) {
      // Get quoted content, avoid inserting URL references.
      // Hat tip Adam Chaboryk

      const getAltText = (content) => {
        if (content === 'none') return '';
        const match = content.includes('url(') || content.includes('image-set(')
          ? content.match(/\/\s*"([^"]+)"/) // Content after slash, e.g. url('image.jpg') / "alt text";
          : content.match(/"([^"]+)"/); // Content between quotes, e.g. "alt text";
        return match ? match[1] : '';
      };
      const before = getAltText(window.getComputedStyle(el, ':before').getPropertyValue('content'));
      const after = getAltText(window.getComputedStyle(el, ':after').getPropertyValue('content'));
      return `${before}${string}${after}`;

    };

    // Sets treeWalker loop to last node before next branch.
    Ed11y.nextTreeBranch = function(tree) {
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

    // Subset of the W3C accessible name algorithm.
    Ed11y.computeText = function (el, recursing = 0, excludeLinkClasses = false) {

      // Return immediately if there is an aria label.
      let hasAria = Ed11y.computeAriaLabel(el, recursing);
      if (hasAria !== 'noAria') {
        return hasAria;
      }

      // Return immediately if there is only a text node.
      let computedText = '';
      if (el.shadowRoot) {
        const shadowChildren = el.shadowRoot.querySelectorAll('*');
        shadowChildren.forEach(child => {
          computedText += Ed11y.computeText(child);
        });
      }
      if (!el.children.length) {
        // Skip treeWalker, only contents are text.
        computedText += Ed11y.wrapPseudoContent(el, el.textContent);
        if (!computedText.trim() && el.hasAttribute('title')) {
          computedText = el.getAttribute('title');
        }
        return recursing ? computedText : computedText.replace(/[\n\r]+|\s{2,}/g, ' ').trim();
      }

      // Otherwise, recurse into children.
      let treeWalker = document.createTreeWalker(
        el,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
      );

      let addTitleIfNoName = false;
      let aText = false;
      let count = 0;

      walker: while (treeWalker.nextNode()) {
        count++;

        // todo: Sa11y excludes
        if (treeWalker.currentNode.nodeType === Node.TEXT_NODE) {
          if (treeWalker.currentNode.parentNode.tagName !== 'SLOT') {
            computedText += ` ${treeWalker.currentNode.nodeValue}`;
          }
          continue;
        }

        // Jump over ignored link text containers.
        // e.g., "(link opens in new window)"
        if (treeWalker.currentNode.matches('.ed11y-element') || (excludeLinkClasses && treeWalker.currentNode.matches(Ed11y.options.linkIgnoreSelector))) {
          if (!Ed11y.nextTreeBranch(treeWalker)) {
            break walker;
          }
          continue;
        }

        // Inner nodes with shadowRoots.
        if (treeWalker.currentNode.shadowRoot) {
          const shadowChildren = treeWalker.currentNode.shadowRoot.querySelectorAll('*');
          shadowChildren.forEach(child => {
            computedText += Ed11y.computeText(child);
          });
          continue;
        }

        // Use link title as text if there was no text in the link.
        // Todo: in theory this could attach the title to the wrong node.
        if (addTitleIfNoName && !treeWalker.currentNode.closest('a')) {
          if (aText === computedText) {
            computedText += addTitleIfNoName;
          }
          addTitleIfNoName = false;
          aText = false;
        }

        if (treeWalker.currentNode.hasAttribute('aria-hidden') && !(recursing && count < 3)) {
          // Ignore elements and children, except when directly aria-referenced.
          // W3C name calc 2 is more complicated than this, but this is good enough.
          if (!Ed11y.nextTreeBranch(treeWalker)) {
            break walker;
          }
          continue;
        }

        let aria = Ed11y.computeAriaLabel(treeWalker.currentNode, recursing);
        if (aria !== 'noAria') {
          computedText += ' ' + aria;
          if (!Ed11y.nextTreeBranch(treeWalker)) {
            break walker;
          }
          continue;
        }

        switch (treeWalker.currentNode.tagName) {
        case 'STYLE':
        case 'NOSCRIPT':
          // Skip style elements
          if (!Ed11y.nextTreeBranch(treeWalker)) {
            break walker;
          }
          continue;
        case 'IMG':
          if (treeWalker.currentNode.hasAttribute('alt') &&
              !treeWalker.currentNode.matches('[role="presentation"]')) {
            computedText += treeWalker.currentNode.getAttribute('alt');
          }
          continue;
        case 'SVG':
        case 'svg':
          if (treeWalker.currentNode.getAttribute('role') === 'img' && treeWalker.currentNode.hasAttribute('alt')) {
            computedText += Ed11y.wrapPseudoContent(treeWalker.currentNode, treeWalker.currentNode.getAttribute('alt'));
            if (!Ed11y.nextTreeBranch(treeWalker)) {
              break walker;
            }
          }
          continue;
        case 'A':
          if (treeWalker.currentNode.hasAttribute('title')) {
            addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
            aText = computedText;
          } else {
            // Reset
            addTitleIfNoName = false;
            aText = false;
          }
          computedText += Ed11y.wrapPseudoContent(treeWalker.currentNode, '');
          break;
        case 'INPUT':
          computedText += Ed11y.wrapPseudoContent(treeWalker.currentNode, '');
          if (treeWalker.currentNode.hasAttribute('title')) {
            addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
          }
          break;
        case 'SLOT':
          if (treeWalker.currentNode.assignedNodes()) {
            // Slots have specific shadow DOM methods.
            const children = treeWalker.currentNode.assignedNodes();
            children?.forEach(child => {
              if (child.nodeType === Node.ELEMENT_NODE) {
                computedText += Ed11y.computeText(child);
              } else if (child.nodeType === Node.TEXT_NODE) {
                computedText += Ed11y.flattenText(child.nodeValue);
              }
            });
          }
          computedText += Ed11y.wrapPseudoContent(treeWalker.currentNode, '');
          break;
        default:
          // Other tags continue as-is.
          computedText += Ed11y.wrapPseudoContent(treeWalker.currentNode, '');
          break;
        }
      }
      // At end of loop, add last title element if need be.
      if (addTitleIfNoName && !aText) {
        computedText += ' ' + addTitleIfNoName;
      }

      computedText = Ed11y.wrapPseudoContent(el, computedText);

      if (!computedText.trim() && el.hasAttribute('title')) {
        return el.getAttribute('title');
      }

      return recursing ? computedText : computedText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

    };

    Ed11y.resetClass = function (classes) {
      classes?.forEach((el) => {
        let thisClass = el;
        Ed11y.findElements('reset', `.${thisClass}`);
        Ed11y.elements.reset?.forEach(el => {
          el.classList.remove(thisClass);
        });
      });
    };

    // Is this still needed when we use real buttons? getting doubleclick on FF
    Ed11y.keyboardClick = function (event) {
      event.preventDefault();
      let key = event.keyCode;
      switch (key) {
      case 13: // enter
      case 32: // space
        event.target.click();
        break;
      }
    };

    Ed11y.siblings = function (el) {
      if (el.parentNode === null) return [];
      return Array.prototype.filter.call(el.parentNode.children, function (child) {
        return child !== el;
      });
    };

    Ed11y.nextUntil = function (el, selector) {
      // Recursively iterate until match or null is returned.
      let next = el.nextElementSibling;
      if (next) {
        let nextMatch = next.matches(selector);
        if (nextMatch) {
          return next;
        } else {
          next = Ed11y.nextUntil(next, selector);
        }
      }
      return next;
    };

    Ed11y.visibleElement = function (el) {
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
    };

    Ed11y.visible = function (el) {
      // Recurse element and ancestors to make sure it is visible
      if (!Ed11y.visibleElement(el)) {
        // Element is hidden
        return false;
      } else {
        // Element is not known to be hidden.
        let parents = Ed11y.parents(el);
        let visibleParent = (parent) => Ed11y.visibleElement(parent);
        return parents.every(visibleParent);
      }
    };

    Ed11y.firstVisibleParent = function (el) {
      let parent = el.parentElement;
      if (parent) {
        // Parent exists
        if (!Ed11y.visibleElement(parent)) {
          // Recurse
          parent = Ed11y.firstVisibleParent(parent);
          return parent;
        } else {
          // Element is visible
          return parent;
        }
      } else {
        // No visible parents.
        return false;
      }
    };

    Ed11y.hiddenElementCheck = function (el) {
      // Checks if this element has been removed from the accessibility tree
      let style = window.getComputedStyle(el);
      return !(style.getPropertyValue('display') === 'none' ||
        style.getPropertyValue('visibility') === 'hidden' ||
        el.hasAttribute('aria-hidden') ||
        el.hasAttribute('hidden'));
    };

    Ed11y.elementNotHidden = function (el) {
      // Recurse element and ancestors to make sure it is visible
      if (!Ed11y.hiddenElementCheck(el)) {
        // Element is hidden
        return false;
      } else {
        // Element is not known to be hidden.
        let parents = Ed11y.parents(el);
        let notHiddenParent = (parent) => Ed11y.hiddenElementCheck(parent);
        return parents.every(notHiddenParent);
      }
    };

    Ed11y.parentLink = function (el) {
      return el.closest('a[href]');
    };

    Ed11y.srcMatchesOptions = function (source, option) {
      if (option.length > 0 && source?.length > 0) {
        let selectorArray = option.split(/\s*[\s,]\s*/).map((el) => {
          return '[src*=\'' + el + '\']';
        });
        let selectors = selectorArray.join(', ');
        let finder = Array.from(source);
        return finder.filter((el) => el.matches(selectors));
      } else {
        return [];
      }
    };

    Ed11y.sanitizeForHTML = function (string) {
      let entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };
      return String(string).replace(/[&<>"'`=/]/g, function (s) {
        return entityMap[s];
      });
    };

    if (CSS.supports('selector(:has(body))')) {
      Ed11y.initialize();
    } else {
      console.warn(Ed11y.M.consoleNotSupported);
    }
  }
}
