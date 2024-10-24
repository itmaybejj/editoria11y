class Ed11y {

  // ESLint config
  /* global ed11yLang, Ed11yTestHeadings, Ed11yTestImages, Ed11yTestLinks, Ed11yTestText, Ed11yTestEmbeds */
  /* exported Ed11y */

  constructor(options) {

    Ed11y.version = '2.3.0-dev';

    // todo MVP remove
    let performanceCount = 0;
    let start = 0;
    let end = 1;
    Ed11y.performanceTest = function() {

      performanceCount = performanceCount + 1;
      if (performanceCount === 1) {
        start = performance.now();
        console.log(start);
        document.addEventListener('performanceTest', function() {
          Ed11y.performanceTest();
        });
      }
      if (performanceCount < 7) {
        Ed11y.incrementalCheck();
        console.log(performanceCount);
        end = performance.now();
        console.log(end - start);
        console.log((end - start) / performanceCount);
      } else {
        console.log(performanceCount);
        end = performance.now();
        console.log(end - start);
        console.log((end - start) / performanceCount);
      }

    };

    let defaultOptions = {

      // Relative or absolute
      //cssUrls: false, // ['/folder/editoria11y.css','/folder/custom.css']
      cssUrls: false,

      // Only check within these containers, e.g. "#main, footer." Default is to look for <main> and fall back to <body>.
      checkRoots: false,

      // Shadow components inside the checkroot to check within, e.g., 'accordion, spa-content'
      shadowComponents: false,

      // Containers to globally ignore, e.g., "header *, .card *"
      ignoreElements: false,

      // Disable tests on specific elements
      // Include and modify this entire object in your call
      ignoreByKey: {
        'p': 'table p',
        // 'h': false,
        'img': '[aria-hidden], [aria-hidden] img', // May get false negatives in accordions, but needed for icons
        'a': '[aria-hidden][tabindex]', // disable link text check on properly disabled links
        // 'li': false,
        // 'blockquote': false,
        // 'iframe': false,
        // 'audio': false,
        // 'video': false,
        'table': '[role="presentation"]',
      },

      // Set alertModes
      // 'headless': do not draw interface
      // 'userPreference: respect user preference.
      // 'polite': open for new issues.
      // 'assertive': open for any issues.
      // 'active': always open.
      // 'showDismissed': active with dismissed revealed.
      // CMS integrations can switch between polite & headless at runtime.
      // alertMode "headless" never draws the panel.
      alertMode: 'userPreference',
      inlineAlerts: true,
      editableContent: '[contenteditable="true"]',

      // Dismissed alerts
      currentPage: false, // uses window.location.pathname unless a string is provided.
      allowHide: true, // enables end-user ignore button
      allowOK: true,  // enables end-user mark OK button
      syncedDismissals: false, // provide empty or populated object {} to enable sync functions
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

      // Interface
      lang: 'en',
      theme: 'sleekTheme',
      sleekTheme: {
        bg: '#fffffe',
        bgHighlight: '#7b1919',
        text: '#20160c',
        primary: '#276499', // 276499
        primaryText: '#fffdf7',
        button: 'transparent', // deprecate?
        panelBar: '#1e517c',
        panelBarText: '#fffdf7',
        panelBarShadow: 'inset 0 -1px #0002, -1px 0 #0002',
        panelBorder: '0px', // '2px'
        activeTab: '#276499',
        activeTabText: '#fffffe',
        focusRing: '#007aff',
        outlineWidth: 0,
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
        panelBarShadow: 'inset 0 -1px #0002, -1px 0 #0002',
        panelBorder: '2px',
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
        panelBarShadow: 'inset 0 -1px #fff2, -1px 0 #fff2',
        panelBorder: '2px',
        button: 'transparent',
        activeTab: '#b9c0cf',
        activeTabText: '#20160c',
        focusRing: '#007aff',
        outlineWidth: '2px',
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

      baseFontSize: '14px', // px
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
      documentLinks: 'a[href$=\'.pdf\'], a[href*=\'.pdf?\'], a[href$=\'.doc\'], a[href$=\'.docx\'], a[href*=\'.doc?\'], a[href*=\'.docx?\'], a[href$=\'.ppt\'], a[href$=\'.pptx\'], a[href*=\'.ppt?\'], a[href*=\'.pptx?\'], a[href^=\'https://docs.google\']',
      linksUrls: false, // get from language pack
      linksMeaningless: false, // get from language pack
      altPlaceholder: false, // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'
      // * Not implemented Yet:
      // ruleset toggling
      // form label tests
      // detectSPArouting: false,

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

      contentEditableHeadingLevels: [
        // Sets previous heading level for contentEditable fields.
        // With nothing set, first heading level is ignored in editable zones.
        // This is ideal for systems with separate backend editing pages.
        // Set '*' to 'inherit' if fields are edited in a frontend context.
        // Example:
        /*
        {
          selector: '[class*=body]',
          level: 1,
        },
        {
          selector: '.l3block',
          level: 3,
        }
        {
          selector: '*',
          level: 'inherit',
        }
        */
      ],

      userPrefersShut: localStorage.getItem('editoria11yShow') === '0',

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
        Ed11y.options.cssUrls = ['https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@2/dist/editoria11y.min.css'];
      }
    }

    const cssBundle = document.createElement('div');
    cssBundle.setAttribute('hidden','');
    Ed11y.options.cssUrls?.forEach( sheet => {
      const cssLink = document.createElement('link');
      cssLink.setAttribute('rel', 'stylesheet');
      cssLink.setAttribute('media', 'all');
      cssLink.setAttribute('href', sheet + '?ver=' + Ed11y.version);
      cssBundle.append(cssLink);
    });

    Ed11y.attachCSS = function(appendTo) {
      appendTo.appendChild(cssBundle.cloneNode(true));
    };

    Ed11y.elements = [];
    Ed11y.onLoad = true;
    Ed11y.showPanel = false;
    let windowWidth = window.innerWidth;

    Ed11y.initialize = () => {

      Ed11y.checkRunPrevent = () => {
        let preventCheck = Ed11y.options.preventCheckingIfPresent ? document.querySelector(Ed11y.options.preventCheckingIfPresent) : false;
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

        // Ed11y v2.0 stored special characters in dismissal keys. This strips them.
        // This loop can be deleted in 2024.
        if (Ed11y.options.currentPage in Ed11y.dismissedAlerts) {
          for (const [key] of Object.entries(Ed11y.dismissedAlerts[Ed11y.options.currentPage])) {
            if (key in Ed11y.dismissedAlerts[Ed11y.options.currentPage]) {
              for (const [subkey, subvalue] of Object.entries(Ed11y.dismissedAlerts[Ed11y.options.currentPage][key])) {
                let newKey = Ed11y.dismissalKey(subkey);
                if (newKey !== subkey) {
                  Ed11y.dismissedAlerts[Ed11y.options.currentPage][key][newKey] = subvalue;
                  delete Ed11y.dismissedAlerts[Ed11y.options.currentPage][key][subkey];
                }
              }
            }
          }
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

        // Check for ignoreAll element only once.
        Ed11y.ignoreAll = Ed11y.options.ignoreAllIfAbsent && document.querySelector(`:is(${Ed11y.options.ignoreAllIfAbsent})`) === null;
        if (!Ed11y.ignoreAll && !!Ed11y.options.ignoreAllIfPresent) {
          Ed11y.ignoreAll = document.querySelector(`:is(${Ed11y.options.ignoreAllIfPresent})`) !== null;
        }

        // Run tests
        Ed11y.checkAll();
        window.addEventListener('resize', function () { Ed11y.windowResize(); });

      });
    };

    Ed11y.results = [];
    // Toggles the outline of all headers, link texts, and images.
    Ed11y.checkAll = () => {
      if (!Ed11y.checkRunPrevent()) {
        if (Ed11y.incremental) {
          Ed11y.oldResults = Ed11y.results;
        }
        // Reset counts
        Ed11y.results = [];
        Ed11y.elements = [];
        Ed11y.mediaCount = 0;

        Ed11y.customTestsRunning = false;

        // Find and cache all root elements based on user-provided selectors.
        let roots = document.querySelectorAll(`:is(${Ed11y.options.checkRoots})`);
        if (roots.length === 0) {
          // todo MVP: set panel message?
          Ed11y.roots = [document.querySelector('html, body')];
          // Todo parameterize.
          if (roots.length === 0) {
            console.warn('Check Editoria11y configuration; specified root element not found');
          } else {
            console.warn('Editoria11y found no user editable content on this page');
          }
          Ed11y.reset();
        } else {
          Ed11y.roots = [];
          roots.forEach((el, i) => {
            if (el.shadowRoot) {
              Ed11y.roots[i] = el.shadowRoot;
            } else {
              Ed11y.roots[i] = el;
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
            window.setTimeout(function () {
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
                Ed11y.updatePanel();
              }
            });
            window.setTimeout(function() {
              if (Ed11y.customTestsRunning === true) {
                Ed11y.customTestsRunning = false;
                if (Ed11y.panelToggle) {
                  Ed11y.panelToggle.querySelector('.ed11y-sr-only').textContent = Ed11y.M.toggleAccessibilityTools;
                }
                Ed11y.updatePanel();
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
        Ed11y.reset();
        Ed11y.panelToggle?.classList.add('disabled');
        Ed11y.panelToggle?.removeAttribute('aria-expanded');
        if (Ed11y.panelToggle) {
          Ed11y.panelToggle.querySelector('.ed11y-sr-only').textContent = Ed11y.M.toggleDisabled;
        }
      }
    };

    Ed11y.totalCount = 0;
    Ed11y.countAlerts = function () {

      Ed11y.errorCount = 0;
      Ed11y.warningCount = 0;
      Ed11y.dismissedCount = 0;

      // Review results array to remove dismissed items
      if (Ed11y.ignoreAll) {
        Ed11y.dismissedCount = Ed11y.results.length > 0 ? 1 : 0;
      } else {
        Ed11y.dismissedCount = 0;
        for (let i = Ed11y.results.length - 1; i >= 0; i--) {
          let test = Ed11y.results[i].test;
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
      }

      Ed11y.totalCount = Ed11y.errorCount + Ed11y.warningCount;
      // Dispatch event for synchronizers
      if (!Ed11y.incremental) {
        window.setTimeout(function () {
          let syncResults = new CustomEvent('ed11yResults');
          document.dispatchEvent(syncResults);
        }, 0);
      }

    };

    let oldResultString = '';
    let newNodes = false;
    const newIncrementalResults = function() {
      if (newNodes) {
        newNodes = false;
        return true;
      }
      let newResultString = JSON.stringify(Ed11y.results);
      let changed = newResultString !== oldResultString;
      oldResultString = newResultString;
      return changed;

      // Sigh. Every other method I've tried misses some changes.
      // This should work but somehow the arrays are in different orders?
      /*let isSame = Ed11y.results.length === Ed11y.oldResults.length &&
        Ed11y.results.every(function(element, index) {
          return element === Ed11y.oldResults[index];
        });*/
      /*let newElements = [];
      Ed11y.results.forEach(result => {
        newElements.push(result.element);
        newElements[result.element].push(result.test);
      });
      if (oldElements.length !== newElements.length) {
        oldElements = newElements;
        return true;
      } else {
        let same = newElements.every((element) => {
          if (!oldElements.includes(element)) {
            return false;
          }
          return element.every((test) => {
            oldElements[element].includes(test);
          });
        });
        oldElements = newElements;
        return !same;
      }*/
    };

    Ed11y.updatePanel = function () {

      // Stash old values for incremental updates.
      //let oldWarnings = Ed11y.warningCount;
      //let oldErrors = Ed11y.errorCount;
      Ed11y.countAlerts();
      if (Ed11y.incremental) {
        // Check for a change in the result counts.
        if (newIncrementalResults()) {
          /*if (Ed11y.options.alertMode === 'assertive' && Ed11y.totalCount > 0 && (Ed11y.warningCount > oldWarnings || Ed11y.errorCount > oldErrors)) {
            console.log('forced open');
            Ed11y.showPanel = true;
          }*/
          Ed11y.resetResults();
        } else {
          Ed11y.results = Ed11y.oldResults;
          window.setTimeout(function() {
            if ( !Ed11y.alignPending ) {
              Ed11y.alignButtons();
            }
            Ed11y.running = false;
            window.setTimeout(function () {
              // todo MVP remove
              let test = new CustomEvent('performanceTest');
              document.dispatchEvent(test);
            }, 0);
          },0);
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

        if (Ed11y.onLoad === true) {
          Ed11y.onLoad = false;

          if (!Ed11y.options.inlineAlerts) {
            // todo change to if there are editable elements
            oldResultString = JSON.stringify(Ed11y.results);
            /*if (Ed11y.options.alertMode === 'assertive') {
              Ed11y.showPanel = true;
            }*/
          }

          // Create the panel DOM on load.
          let panel = document.createElement('ed11y-element-panel');
          document.querySelector('body').appendChild(panel);

          // Decide whether to open the panel on load.
          if (Ed11y.options.alertMode === 'active' ||
            !Ed11y.options.userPrefersShut ||
            Ed11y.options.showDismissed
          ) {
            // Show always on load for active mode or by user preference.
            Ed11y.showPanel = true;
          } else if (
            Ed11y.totalCount > 0 &&
            !Ed11y.ignoreAll &&
            ( Ed11y.options.alertMode === 'assertive' ||
              Ed11y.options.alertMode === 'polite' &&
              Ed11y.seen[encodeURI(Ed11y.options.currentPage)] !== Ed11y.totalCount
            )
          ) {
            // Show sometimes for assertive/polite if there are new items.
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
          if (Ed11y.dismissedCount > 0) {
            if (Ed11y.dismissedCount === 1) {
              Ed11y.showDismissed.querySelector('.ed11y-sr-only').textContent = Ed11y.options.showDismissed ? Ed11y.M.buttonHideHiddenAlert : Ed11y.M.buttonShowHiddenAlert;
            } else {
              Ed11y.showDismissed.querySelector('.ed11y-sr-only').textContent = Ed11y.options.showDismissed ? Ed11y.M.buttonHideHiddenAlerts(Ed11y.dismissedCount) : Ed11y.M.buttonShowHiddenAlerts(Ed11y.dismissedCount);
            }

            Ed11y.showDismissed.removeAttribute('hidden');
          } else if (Ed11y.options.showDismissed === true) {
            // Reset show hidden default option when irrelevant.
            Ed11y.showDismissed.setAttribute('hidden', '');
            Ed11y.showDismissed.setAttribute('aria-pressed', 'false');
            Ed11y.options.showDismissed = false;
          }
          window.setTimeout(function () {
            document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
            if (!Ed11y.ignoreAll) {
              Ed11y.showResults();
            }
          }, 0);
        }
        if (Ed11y.totalCount > 0 || (Ed11y.options.showDismissed && Ed11y.dismissedCount > 0)) {
          Ed11y.panelMessage.textContent = Ed11y.open ? Ed11y.M.buttonHideAlerts : Ed11y.M.buttonShowAlerts;
          Ed11y.panelJumpNext.removeAttribute('hidden');
          if (Ed11y.totalCount < 2) {
            Ed11y.panelJumpPrev.setAttribute('hidden', '');
          } else {
            Ed11y.panelJumpPrev.removeAttribute('hidden');
          }
          if (Ed11y.errorCount > 0) {
            Ed11y.panel.classList.remove('ed11y-warnings', 'ed11y-pass');
            Ed11y.panel.classList.add('ed11y-errors');
          }
          else if (Ed11y.warningCount > 0) {
            Ed11y.panel.classList.remove('ed11y-errors', 'ed11y-pass');
            Ed11y.panel.classList.add('ed11y-warnings');
          } else {
            // Issues present but dismissed.
            Ed11y.panel.classList.remove('ed11y-errors', 'ed11y-warnings');
            Ed11y.panel.classList.add('ed11y-pass');
          }
          Ed11y.panelCount.textCount = Ed11y.totalCount;
          //Ed11y.panelCount.style.display = 'inline-block';
          //let text = Ed11y.totalCount === 1 ? Ed11y.M.panelCount1 : Ed11y.totalCount + Ed11y.M.panelCountMultiple;
          //Ed11y.panelMessage.textContent = text;
          window.setTimeout(function () {
            //Ed11y.announce.textContent = text;
          }, 1500);
          Ed11y.panel.querySelector('.toggle-count').textContent = Ed11y.totalCount;
        } else {
          Ed11y.panelMessage.textContent = Ed11y.open ? Ed11y.M.buttonHideNoAlert : Ed11y.M.buttonShowNoAlert;
          Ed11y.panelJumpNext.setAttribute('hidden', '');
          Ed11y.panelJumpPrev.setAttribute('hidden', '');

          Ed11y.panelCount.style.display = 'display: none;';
          Ed11y.panel.classList.remove('ed11y-warnings', 'ed11y-errors');
          Ed11y.panel.classList.add('ed11y-pass');
          if (Ed11y.dismissedCount > 0) {
            // todo: title attribute to explain the difference?
            Ed11y.panel.querySelector('.toggle-count').textContent = 'i';
            //Ed11y.panelMessage.innerText = Ed11y.M.panelCountAllDismissed;
          } else {
            Ed11y.panel.querySelector('.toggle-count').textContent = '✓';
            //Ed11y.panelMessage.innerText = Ed11y.M.panelCount0;
          }
        }

        Ed11y.panel.classList.remove('ed11y-preload');
        Ed11y.panelToggle.classList.remove('disabled');
        Ed11y.panelToggle.removeAttribute('aria-disabled');
        if (!Ed11y.bodyStyle) {
          Ed11y.paintReady();
        }
      }
      // todo parameterize
      Ed11y.running = false;
      if (Ed11y.elements['editable']) {
        Ed11y.elements['editable'].forEach(editable => {
          startObserver(editable);
        });
      }
    };

    // Place markers on elements with issues
    Ed11y.result = function (result, index, jumpIndex, editableParent) {
      /* old array to new object map:
        // [0] element
        // [1] test
        // [2] content
        // [3] position
        // [4] dismissalKey
        // [5] dismissalStatus
        */
      let mark = document.createElement('ed11y-element-result');
      mark.classList.add('ed11y-preload');
      let location;
      let position = 'beforebegin';
      // todo: expose this as a string?
      if (!Ed11y.options.inlineAlerts || editableParent) {
        // todo: if editable parent is detected, set global inlineAlerts mode.
        location = document.querySelector('body');
        position = 'beforeend';
        mark.classList.add('ed11y-editable-result');
      } else {
        location = result.element.closest('a');
        if (!location) {
          location = result.element;
          position = result.position;
        }
      }
      // heeeee compute this in test not here



      mark.setAttribute('id', 'ed11y-result-' + index);
      mark.setAttribute('data-ed11y-result', index);
      mark.setAttribute('data-ed11y-open', 'false');
      //Ed11y.results[index].toggle = mark;
      location.insertAdjacentElement(position, mark);
      if (Ed11y.options.inlineAlerts) {
        if (result.element.style.outline.indexOf('alert') === -1 ) {
          // Set property unless alert is already set.
          const display = window.getComputedStyle(result.element).getPropertyValue('display');
          let outlineClass;
          if (display.indexOf('inline') === -1 || result.element.tagName === 'IMG') {
            outlineClass = result.dismissalKey ?
              'ed11y-warning-block'
              : 'ed11y-error-block';
          } else {
            outlineClass = result.dismissalKey ?
              'ed11y-warning-inline'
              : 'ed11y-error-inline';
          }
          /* todo editable: this is setting a style attribute; must change to a positioned rule */
          //result.element.style.setProperty('box-shadow', color); // todo only within editable?
          result.element.classList.add(outlineClass);
        }
      } else {
        // Shrink toggle inside editable containers.
        mark.shadowRoot.querySelector('.toggle').style.setProperty('font-size', '16px');
      }
      Ed11y.jumpList.unshift(mark);
      mark.dataset.ed11yJumpPosition = `${jumpIndex}`;
      Ed11y.results[index].toggle = mark;
    };

    Ed11y.resetResults = function() {
      Ed11y.jumpList = [];
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
      Ed11y.findElements('reset', 'ed11y-element-result, ed11y-element-tip, ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', false);
      Ed11y.elements.reset.forEach((el) => el.remove());
    };

    Ed11y.resetPanel = function() {
      // todo beta on re-open: recreate heading or alts if panel is showing
      // Reset main panel.
      visualizing = true; // so visualize function removes visualizers.
      visualize();
      Ed11y.panelJumpNext?.setAttribute('data-ed11y-goto', '0');
      Ed11y.panelJumpPrev?.setAttribute('data-ed11y-goto', '0');
      Ed11y.panel?.classList.add('ed11y-shut');
      Ed11y.panel?.classList.remove('ed11y-active');
      Ed11y.panelToggle?.setAttribute('aria-expanded', 'false');
    };

    Ed11y.reset = function () {
      Ed11y.resetResults();
      Ed11y.resetPanel();
      Ed11y.incremental = false;
      Ed11y.running = false;
      Ed11y.showPanel = false;
      Ed11y.open = false;
    };

    Ed11y.linkText = (linkText) => {
      // todo: This is only used in Images??? Review all text value diving.
      linkText = linkText.replace(Ed11y.options.linkIgnoreStrings, '');
      linkText = linkText.replace(/'|"|-|\.|\s+/g, '');
      return linkText;
    };

    // QuerySelectAll non-ignored elements within checkroots, with recursion into shadow components
    Ed11y.findElements = function (key, selector, rootRestrict = true) {
      Ed11y.findElements.key = [];

      // Todo beta: function and parameter to auto-detect shadow components.
      let shadowSelector = Ed11y.options.shadowComponents ? `, ${Ed11y.options.shadowComponents}` : '';

      // Concatenate global and specific ignores
      let ignore = '';
      if (Ed11y.options.ignoreElements) {
        ignore = Ed11y.options.ignoreByKey[key] ? `:not(${Ed11y.options.ignoreElements}, ${Ed11y.options.ignoreByKey[key]})` : `:not(${Ed11y.options.ignoreElements})`;
      } else {
        ignore = Ed11y.options.ignoreByKey[key] ? `:not(${Ed11y.options.ignoreByKey[key]})` : '';
      }

      // Initialize or reset elements array.
      Ed11y.elements[key] = [];

      if (rootRestrict) {
        // Add array of elements matching selector, excluding the provided ignore list.
        Ed11y.roots.forEach(root => {
          Ed11y.elements[key] = Ed11y.elements[key].concat(Array.from(root.querySelectorAll(`:is(${selector}${shadowSelector})${ignore}`)));
        });
      } else {
        Ed11y.elements[key] = Ed11y.elements[key].concat(Array.from(document.querySelectorAll(`:is(${selector}${shadowSelector})${ignore}`)));
      }

      // The initial search may be a mix of elements ('p') and placeholders for shadow hosts ('custom-p-element').
      // Repeat the search inside each placeholder, and replace the placeholder with its search results.
      if (Ed11y.options.shadowComponents) {
        for (let index = Ed11y.elements[key].length - 1; index >= 0; index--) {
          if (Ed11y.elements[key][index].matches(Ed11y.options.shadowComponents)) {
            // Dive into the shadow root and collect an array of its results.
            let inners = Ed11y.elements[key][index].shadowRoot?.querySelectorAll(`:is(${selector})${ignore}`);
            if (typeof(inners) === 'object' && inners.length > 0) {
              // Replace shadow host with inner elements.
              Ed11y.elements[key].splice(index, 1, ...inners);
            } else {
              // Remove shadow host with no inner elements.
              console.warn('Editoria11y: A specified shadow host has no shadowRoot.');
              Ed11y.elements[key].splice(index, 1);
            }
          }
        }
      }
    };

    Ed11y.buildElementList = function () {
      Ed11y.findElements('editable', Ed11y.options.editableContent, false);
      if (Ed11y.options.inlineAlerts && Ed11y.elements.editable.length > 0) {
        Ed11y.options.inlineAlerts = false;
        console.log('Editable content detected; Editoria11y inline alerts disabled');
      }
      Ed11y.findElements('p', 'p');
      Ed11y.findElements('h', 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]', false);
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
    };

    Ed11y.dismissalKey = function (text) {
      //?.replace(/([^0-9a-zA-Z])/g,'')
      return String(text).replace(/([^0-9a-zA-Z])/g, '').substring(0, 512);
    };

    Ed11y.dismissThis = function (dismissalType) {
      // Find the active tip and draw its identifying information from the result list
      let removal = Ed11y.getOpenTip();
      let id = removal.tip.dataset.ed11yResult;
      let test = Ed11y.results[id].test;
      let dismissalKey = Ed11y.dismissalKey(Ed11y.results[id].dismissalKey);

      // Remove tip and reset borders around element
      Ed11y.resetClass(['ed11y-hidden-highlight', 'ed11y-ring-red', 'ed11y-ring-yellow']);
      removal.tip?.parentNode.removeChild(removal.tip);
      // TODO EDITING: COMMENT OUT BELOW...SEEMS REDUNDANT?
      removal.button?.parentNode.removeChild(removal.button);

      // Update dismissal record.
      if (dismissalType === 'reset') {
        delete Ed11y.dismissedAlerts[Ed11y.options.currentPage][test][dismissalKey];
        if (Object.keys(Ed11y.dismissedAlerts[Ed11y.options.currentPage][test]).length === 0) {
          delete Ed11y.dismissedAlerts[Ed11y.options.currentPage][test];
        }
        if (Object.keys(Ed11y.dismissedAlerts[Ed11y.options.currentPage]).length === 0) {
          delete Ed11y.dismissedAlerts[Ed11y.options.currentPage];
        }
        Ed11y.updatePanel();
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
      } else {
        let dismissalDetail = {
          dismissPage: Ed11y.options.currentPage,
          dismissTest: test,
          dismissKey: dismissalKey,
          dismissAction: dismissalType,
        };
        let ed11yDismissalUpdate = new CustomEvent('ed11yDismissalUpdate', { detail: dismissalDetail });
        document.dispatchEvent(ed11yDismissalUpdate);
      }

      Ed11y.reset();
      Ed11y.showPanel = true;
      Ed11y.checkAll();

      let rememberGoto = Ed11y.goto;

      window.setTimeout(function () {
        if (Ed11y.jumpList.length > 0) {
          Ed11y.goto = (rememberGoto - 1);
          Ed11y.setCurrentJump();
          Ed11y.panelJumpNext.focus();
        } else {
          window.setTimeout(function () {
            let focus = Ed11y.panel.querySelector('#ed11y-issues-tab');
            focus.focus();
          }, 100);
        }
      }, 500, rememberGoto);
    };

    Ed11y.transferFocus = function () {
      const openTip = Ed11y.getOpenTip();
      const tip = openTip.tip;
      const id = tip.dataset.ed11yResult;
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
        tip.shadowRoot.querySelector('.close').click();
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
        tip.shadowRoot.querySelector('.close').click();
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
      // todo: if user has allowHide but not allowOK or vice versa, this temporarily clears both.
      Ed11y.ignoreAll = false;
      Ed11y.options.showDismissed = !(Ed11y.options.showDismissed);
      Ed11y.reset();
      Ed11y.showPanel = true;
      Ed11y.checkAll();

      Ed11y.showDismissed.setAttribute('aria-pressed', (!!Ed11y.options.showDismissed).toString());
    };

    Ed11y.dismissHelp = function (el) {
      let help = document.createElement('ul');
      help.setAttribute('tabindex', '-1');
      help.classList.add('help');
      // todo MVP: parameterize and write more gooder
      if (Ed11y.options.allowHide) {
        let li = document.createElement('li');
        li.textContent = Ed11y.M.elementDismissalHelpHide;
        help.append(li);
      }
      if (Ed11y.options.allowOK) {
        let li = document.createElement('li');
        li.textContent = Ed11y.M.elementDismissalHelpOK;
        help.append(li);
      }
      let li = document.createElement('li');
      li.textContent = Ed11y.M.elementDismissalHelpAll;
      help.append(li);
      el.parentElement.append(help);
      help.focus();
      el.remove();
    };

    Ed11y.showResults = function () {
      Ed11y.buildJumpList();
      // Announce that buttons have been placed.
      document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
      Ed11y.alignButtons();
      Ed11y.checkEditableIntersects();
      Ed11y.intersectionObservers(); // todo only when there is editable content ? */
    };

    Ed11y.editableHighlight = [];

    Ed11y.editableHighlighter = function (resultID, show, wrap) {

      if (!show) {
        Ed11y.editableHighlight[resultID]?.style.setProperty('opacity', '0');
        return;
      }
      const result = Ed11y.results[resultID];
      let target = result.element;
      if (wrap) {
        let wrapper = result.element.closest('img,blockquote,p,table,h1,h2,h3,h4,h5,h6,li');
        target = wrapper ? wrapper : result.element.parentNode();
      }
      let el = Ed11y.editableHighlight[resultID];
      if (!el) {
        el = document.createElement('ed11y-element-highlight');
        Ed11y.editableHighlight[resultID] = el;
        el.style.setProperty('position', 'absolute');
        el.style.setProperty('pointer-events', 'none');
        // todo: sometimes while typing this fails to red?
        document.body.appendChild(el);
      }
      const zIndex = result.dismissalKey ? 'calc(var(--ed11y-buttonZIndex, 9999) - 2)' : 'calc(var(--ed11y-buttonZIndex, 9999) - 1)';
      el.style.setProperty('z-index', zIndex);
      const outline = result.dismissalKey ?
        '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-warning, #fad859), 0 0 0 3px var(--ed11y-warning, #fad859), 0 0 0 4px var(--ed11y-primary)'
        : '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-alert, #b80519), 0 0 0 3px var(--ed11y-alert, #b80519), 0 0 1px 3px';
      el.style.setProperty('box-shadow', outline);
      el.style.setProperty('border-radius', '3px');
      el.style.setProperty('top', '0');
      el.style.setProperty('left', '0');
      let targetOffset = target.getBoundingClientRect();
      if ((targetOffset.top === 0 && targetOffset.left === 0) || !Ed11y.visible(target)) {
        // Invisible target. todo: wait why is 0 considered invisible?
        const firstVisibleParent = Ed11y.firstVisibleParent(target);
        targetOffset = firstVisibleParent ? firstVisibleParent.getBoundingClientRect() : targetOffset;
      }
      el.style.setProperty('width', targetOffset.width + 6 + 'px');
      el.style.setProperty('top', targetOffset.top + window.scrollY - 3 + 'px');
      el.style.setProperty('left', targetOffset.left - 3 + 'px');
      el.style.setProperty('height', targetOffset.height + 6 + 'px');
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

    const overlap = function(rect1Left, rect1Top, rect2Left, rect2Top) {
      const width = 40;
      return !(rect1Left + width < rect2Left ||
        rect1Left > rect2Left + width ||
        rect1Top + width < rect2Top ||
        rect1Top > rect2Top + width);
    };

    Ed11y.alignButtons = function () {

      if (Ed11y.jumpList.length === 0) {
        return;
      }
      Ed11y.alignPending = true;

      // Reading and writing in a loop creates paint thrashing.
      // We iterate the array for reads, then iterate for writes.

      // Used for crude intersection detection.
      let previousNudgeTop = 0;
      let previousNudgeLeft = 0;

      // Batch write first to reduce paint thrash.
      Ed11y.jumpList.forEach((mark) => {
        // Reset positions.
        //mark.style.setProperty('transform', null);
        if (mark.style.transform) {
          const computedStyle = window.getComputedStyle(mark);
          let matrix = computedStyle.getPropertyValue('transform');
          matrix = matrix.split(',');
          mark.xOffset = parseFloat(matrix[4]);
          mark.yOffset = parseFloat(matrix[5]);
        } else {
          mark.xOffset = 0;
          mark.yOffset = 0;
        }
        mark.style.setProperty('top', 'initial');
        mark.style.setProperty('left', 'initial');
      });

      // Batch read to reduce paint thrash.
      Ed11y.jumpList.forEach((mark, i) => {
        let markOffset = mark.getBoundingClientRect();
        if (!Ed11y.options.inlineAlerts) {
          // Append toggles to body tag.
          let targetOffset = mark.result.element.getBoundingClientRect();
          if ((targetOffset.top === 0 && targetOffset.left === 0) || !Ed11y.visible(mark.result.element)) {
            // Invisible target. todo: wait why is 0 considered invisible?
            const firstVisibleParent = Ed11y.firstVisibleParent(mark.result.element);
            targetOffset = firstVisibleParent ? firstVisibleParent.getBoundingClientRect() : targetOffset;
          }
          let top = targetOffset.top - markOffset.top + mark.yOffset;
          let left = targetOffset.left - markOffset.left + mark.xOffset;
          switch (mark.result.element.tagName) {
          /*case 'TD':
          case 'TH':
            left = left - 20;
            break;*/
          case 'IMG':
            top = top + 10;
            left = left + 10;
            break;
          default:
            left = left - 34;
            break;
          }
          if (mark.result.scrollableParent) {
            // Bump alerts that would be X-position out of a scroll zone.
            Ed11y.jumpList[i].bounds = mark.result.scrollableParent.getBoundingClientRect();
            if (left < Ed11y.jumpList[i].bounds.left) {
              left = Ed11y.jumpList[i].bounds.left;
            } else if (left - 40 > Ed11y.jumpList[i].bounds.right) {
              left = Ed11y.jumpList[i].bounds.right - 40;
            }
          }
          Ed11y.jumpList[i].targetOffset = targetOffset;
          Ed11y.jumpList[i].markTop = top;
          Ed11y.jumpList[i].markLeft = left;
        }
        Ed11y.jumpList[i].markOffset = markOffset;
      });

      // Write changes.
      if (!Ed11y.options.inlineAlerts) {
        // Another batch write.
        Ed11y.jumpList.forEach((mark) => {
          if ((mark.markTop !== 0 || mark.markLeft !== 0) && mark.targetOffset.top + window.scrollY > 0 && mark.targetOffset.left > 0 ) {
            mark.style.transform = `translate(${mark.markLeft}px, ${mark.markTop}px)`;
            mark.markLeft = mark.markOffset.left + mark.markLeft;
            mark.markTop = mark.markOffset.top + mark.markTop;
            // Note: from now on the markOffset values are wrong!
          }
        });
      } else {
        // Another batch read;
        Ed11y.jumpList.forEach((mark) => {
          mark.markOffset = mark.getBoundingClientRect();
          mark.markLeft = mark.markOffset.left;
          mark.markTop = mark.markOffset.top;
        });
      }

      // Compute and move. We're just going to thrash now.
      Ed11y.jumpList.forEach((mark, i) => {

        // Now check for any needed nudges
        let nudgeTop = 0;
        let nudgeLeft = 0;
        // Detect tip that overlaps with previous result.
        if (mark.markTop + window.scrollY < 0) {
        // Offscreen to top.
          nudgeTop = (-1 * (mark.markTop + window.scrollY)) - 6;
        }
        if (
          (i > 0 && intersect(mark.markOffset, Ed11y.jumpList[i - 1].markOffset, 15)) ||
          (i > 1 && intersect(mark.markOffset, Ed11y.jumpList[i - 2].markOffset, 15)) ||
          (i > 2 && intersect(mark.markOffset, Ed11y.jumpList[i - 3].markOffset, 15))
        ) {
          //todo -- not actually computing -- need to update markOffset on nudge
        // Overlapping previous
          // todo compute actual overlap. We're bouncing by the full amount no matter what which gets gappy.
          // todo if we recorded positions and sorted the grid by y positions, we'd only need to CHECK x for y overlaps.
          nudgeTop = nudgeTop + 21 + previousNudgeTop;
          nudgeLeft = 21 + previousNudgeLeft;
        }
        if (mark.markOffset.left + nudgeLeft < 44) {
        // Offscreen to left. push to the right.
          nudgeMark(mark, 44 - mark.markOffset.left + nudgeLeft, nudgeTop);
        }
        else if (mark.markOffset.left + nudgeLeft + 80 > windowWidth) {
        // Offscreen to right. push to the left
          nudgeMark(mark, windowWidth - nudgeLeft - mark.markOffset.left - 80, nudgeTop);
        }
        else if (nudgeTop !== 0) {
          nudgeMark(mark, nudgeLeft, nudgeTop);
        }
        // todo: this is crude and only really works right once.
        previousNudgeTop = nudgeTop;
        previousNudgeLeft = nudgeLeft;
      });

      // Last pass: check for elements offscreen within scrollable areas.
      // Todo: this should check for hidden and details as well? Check...
      if (!Ed11y.options.inlineAlerts) {
        // Alerts have to be positioned relative to viewport.
        Ed11y.jumpList.forEach(mark => {

          if (mark.result.scrollableParent) {
            // Hide alerts outside a scroll zone.
            // todo only offscreen if the result is offscreen, not the mark?
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
          }
          else {
            mark.classList.remove('ed11y-offscreen');
            mark.style.pointerEvents = 'auto';
          }

        });
      }
      Ed11y.jumpList?.forEach(mark => {
        // Now make visible.
        mark.classList.remove('ed11y-preload');
      });
      if (!Ed11y.bodyStyle) {
        Ed11y.paintReady();
      }
    };


    Ed11y.paintReady = function () {

      for (const [key, value] of Object.entries(Ed11y.theme)) {
        document.documentElement.style.setProperty('--ed11y-' + key, value);
      }

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

    Ed11y.alignTip = function (button, toolTip, recheck = 0) {
      if (!toolTip) {
        return;
      }
      let arrow = toolTip.shadowRoot.querySelector('.arrow');
      let tip = arrow.nextElementSibling;
      let loopCount = recheck + 1;
      //toolTip.style.setProperty('opacity', recheck === 4 ? 1 : 0);

      // Various hiddenHandlers may cause element to animate open.
      if (recheck < 8) {
        window.setTimeout(function () {
          requestAnimationFrame(()=>Ed11y.alignTip(button, toolTip, loopCount));
        }, 50, loopCount);
      }
      // Reset any previous alignments
      // todo do this without resets to remove shudder
      tip.style.setProperty('transform',null);
      arrow.style.setProperty('left', null);
      arrow.style.setProperty('top', null);

      // Find button on page
      const scrollTop = window.scrollY;
      let buttonOffset = button.getBoundingClientRect();
      let buttonSize = buttonOffset.width;
      if (!(Ed11y.visible(button.getRootNode().host)) || buttonOffset.top === 0 && buttonOffset.left === 0) {
        // ruh roh invisible button
        const firstVisibleParent = Ed11y.firstVisibleParent(button.getRootNode().host);
        if (firstVisibleParent) {
          buttonOffset = firstVisibleParent.getBoundingClientRect();
        }
        // Estimate from font when it can't be measured.
        buttonSize = parseInt(Ed11y.options.baseFontSize) * 3;
      }
      const buttonLeft = buttonOffset.left + document.body.scrollLeft;
      toolTip.style.setProperty('top', buttonOffset.top + scrollTop + 'px');
      // todo: need left scroll too for horizontally scrolled pages
      toolTip.style.setProperty('left', buttonOffset.left + 'px');
      const tipWidth = tip.offsetWidth;
      const tipHeight = tip.offsetHeight;
      const windowBottom = scrollTop + window.innerHeight;

      let direction = 'under';

      // Default to displaying under
      if (buttonOffset.top + tipHeight + scrollTop + buttonSize + 22 > windowBottom) {
        // If there's no room under in the viewport...
        if (windowWidth > tipWidth * 1.5 && windowWidth - (buttonLeft + tipWidth + buttonSize + 56) > 0 && buttonOffset.top + 130 < window.innerHeight) {
          direction = 'right';
        } else if (buttonOffset.top > tipHeight + 15) {
          direction = 'above';
        } else if (windowWidth > tipWidth * 1.5 && buttonLeft - tipWidth - 50 > 0) {
          direction = 'left';
        } else if (buttonOffset.bottom + tipHeight > document.documentElement.clientHeight - 50 && window.innerHeight > buttonSize + tipHeight) {
          // No room anywhere in viewport we're at the end of the page.
          direction = 'above';
        }
        // Back to default.
      }

      let nudgeX;
      let nudgeY = 0;

      if (direction === 'under') {
        // Pin to the left edge, unless the tip is not wide enough to reach:
        if (tipWidth + buttonOffset.left + 20 > windowWidth || buttonOffset.left - 20 - tipWidth / 5 < 0) {
          // Can't center
          if (tipWidth - ((buttonSize / 2) - 1) > buttonOffset.left) {
            // Under, overhang to left
            nudgeX = (buttonSize / 2) - 1 - buttonOffset.left;
            arrow.style.setProperty('left', Math.max(buttonOffset.left, 15) - 9 + 'px');
          } else {
            arrow.style.setProperty('left', tipWidth - 26 + 'px');
            nudgeX = buttonSize / 2 + 15 - tipWidth;
          }
        } else {
          // Under, overhang to right
          nudgeX =  buttonSize + 8 - tipWidth / 5;
          arrow.style.setProperty('left', tipWidth / 5 - (buttonSize / 2) - 18 + 'px');
        }

        arrow.dataset.direction = 'under';
        nudgeY = buttonSize + 16;
      }
      else if (direction === 'above') {
        // Slide left or right to center tip on page.
        nudgeY = -1 * (tipHeight + 13 + parseInt(Ed11y.theme.outlineWidth));
        arrow.style.setProperty('top', tipHeight);
        if (tipWidth + buttonOffset.left + 20 > windowWidth || buttonOffset.left - 20 - tipWidth / 5 < 0) {
          // Can't center
          if (tipWidth - ((buttonSize / 2) - 1) > buttonOffset.left) {
            // Overhang to left
            nudgeX = ((buttonSize / 2) - 1) - buttonOffset.left;
            arrow.style.setProperty('left', buttonOffset.left - 9 + 'px');
          } else {
            // Overhang to the right.
            arrow.style.setProperty('left', tipWidth - 26 + 'px');
            nudgeX = buttonSize / 2 + 15 - tipWidth;
          }
        } else {
          nudgeX = buttonSize + 8 - tipWidth / 5;
          arrow.style.setProperty('left', tipWidth / 5 - (buttonSize / 2) - 18 + 'px');
        }
        arrow.dataset.direction = 'above';
        arrow.style.setProperty('top', `${tipHeight + 15 - parseInt(Ed11y.theme.outlineWidth)}px`);
      } else {
        // Left or right
        let tipBottom = buttonOffset.top + scrollTop + tipHeight;
        if (tipBottom > windowBottom) {
          // Offset up
          nudgeY = windowBottom - (tipBottom + 90);
          let arrowY = nudgeY * -1 + 7;
          arrowY = Math.min(arrowY, tipHeight - 25);
          arrow.style.setProperty('top', `${arrowY}px`);
        }
        if (direction === 'left') {
          nudgeX = 0 - (tipWidth + 17);
          arrow.style.setProperty('left', `${tipWidth - 10}px`);
          arrow.dataset.direction = 'left';
        } else {
          // direction is right
          nudgeX = buttonSize + 14;
          arrow.dataset.direction = 'right';
        }
      }
      toolTip.style.setProperty('transform', `translate(${nudgeX}px, ${nudgeY}px)`);

    };

    Ed11y.togglePanel = function () {
      if (!Ed11y.doubleClickPrevent) {
        // todo beta: revisit aria states and announcements.
        // Prevent clicks piling up while scan is running.
        if (Ed11y.running !== true) {
          Ed11y.running = true;
          // Re-scan each time the panel reopens.
          if (Ed11y.panel.classList.contains('ed11y-active') === false) {
            Ed11y.onLoad = false;
            Ed11y.showPanel = true;
            Ed11y.checkAll();
            Ed11y.options.userPrefersShut = false;
            localStorage.setItem('editoria11yShow', '1');
            //Ed11y.panelMessage.textContent = Ed11y.totalCount > 0 ? Ed11y.M.buttonHideAlerts : Ed11y.M.buttonHideNoAlert;
          }
          else {
            Ed11y.panelMessage.textContent = Ed11y.totalCount > 0 ? Ed11y.M.buttonShowAlerts : Ed11y.M.buttonShowNoAlert;
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
          // Todo implement outline ignore function.
          let mark = document.createElement('ed11y-element-heading-label');
          mark.classList.add('ed11y-element', 'ed11y-element-heading');
          mark.dataset.ed11yHeadingOutline = i.toString();
          mark.setAttribute('id', 'ed11y-heading-' + i);
          mark.setAttribute('tabindex', '-1');
          // Array: el, level, outlinePrefix
          el[0].insertAdjacentElement('afterbegin', mark);
          let level = el[1];
          let leftPad = 10 * level - 10;
          let li = document.createElement('li');
          li.classList.add('level' + level);
          li.style.setProperty('margin-left', leftPad + 'px');
          let link = document.createElement('a');
          link.setAttribute('href', '#ed11y-heading-' + i);
          li.append(link);
          let levelPrefix = document.createElement('strong');
          levelPrefix.textContent = `H${level}: `;
          link.append(levelPrefix);
          let userText = document.createElement('span');
          userText.textContent = Ed11y.computeText(el[0]);
          link.append(userText);
          if (el[2]) { // Has an error message
            let type = !el[3] ? 'error' : 'warning';
            li.classList.add(type);
            let message = document.createElement('em');
            message.classList.add('ed11y-small');
            message.textContent = ' ' + el[2];
            link.append(message);
          }
          panelOutline.append(li);
        });
      } else {
        panelOutline.innerHTML = '<p><em>No heading structure found.</em></p>';
      }
    };
    Ed11y.switchPanel = function (id) {
      // Switch main panel tab
      //Ed11y.panel.classList.remove('ed11y-shut');
      Ed11y.panel.querySelector('.content > div:not(.ed11y-hidden)')?.classList.add('ed11y-hidden');
      Ed11y.panel.querySelector('[aria-selected=true]')?.setAttribute('aria-selected', 'false');
      // TODO remove this functionality if we are ditching tabs
      Ed11y.panel.querySelector('#' + id)?.setAttribute('aria-selected', 'true');
      Ed11y.panel.querySelector('#' + id + '-tab')?.classList.remove('ed11y-hidden');
      // todo beta what to show when no outline or images
      // todo postpone: error when no headings found at all?

      // Show extras
      switch (id) {
      case 'ed11y-help':
        showHelpPanel();
        break;
      case 'ed11y-visualize':
        visualize();
        break;
      default:
        // hide extras
        break;
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

          // Label images
          let mark = document.createElement('ed11y-element-alt');
          mark.classList.add('ed11y-element');
          mark.dataset.ed11yImg = i.toString();
          el[0].insertAdjacentElement('beforebegin', mark);

          // Build alt list in panel
          let userText = document.createElement('span');
          userText.textContent = el[2];
          let li = document.createElement('li');
          li.classList.add(el[3]);
          let img = document.createElement('img');
          img.setAttribute('src', el[1]);
          img.setAttribute('alt', '');
          li.append(img);
          li.append(userText);
          altList.append(li);
        });
        Ed11y.alignAlts();
      } else {
        altList.innerHTML = '<p><em>No images found.</em></p>';
      }
    };
    let visualizing = false;
    const visualize = function () {
      if (visualizing) {
        visualizing = false;
        Ed11y.panel.querySelector('#ed11y-visualize').setAttribute('aria-pressed', 'false');
        Ed11y.panel.querySelector('#ed11y-visualizers').setAttribute('hidden', 'true');
        Ed11y.findElements('reset', 'ed11y-element-heading-label, ed11y-element-alt');
        Ed11y.elements.reset?.forEach(el => { el.remove(); });
        return;
      }
      visualizing = true;
      // todo transfer focus?
      Ed11y.panel.querySelector('#ed11y-visualize').setAttribute('aria-pressed', 'true');
      Ed11y.panel.querySelector('#ed11y-visualizers').removeAttribute('hidden');
      showAltPanel();
      showHeadingsPanel();
    };

    const showHelpPanel = function () {
      // todo: this is commented out at the moment
      // todo: report link if available?
      console.log('showing help');
      let helpTab = Ed11y.panel.querySelector('#ed11y-help-tab');
      if (helpTab.matches('[hidden]')) {
        Ed11y.panel.querySelector('#ed11y-help').setAttribute('aria-pressed', 'true');
        helpTab.removeAttribute('hidden');
        helpTab.innerHTML = Ed11y.M.panelHelp;
      } else {
        helpTab.setAttribute('hidden', 'true');
        Ed11y.panel.querySelector('#ed11y-help').setAttribute('aria-pressed', 'false');
      }
    };

    Ed11y.buildJumpList = function () {

      Ed11y.jumpList = [];

      // Initial alignment to get approximate Y position order for jump list.
      Ed11y.results.forEach((result, i) => {
        // todo: do we need a firstvisibleparent here?
        let top = result.element.getBoundingClientRect().top;
        if (!top) {
          const visibleParent = Ed11y.firstVisibleParent(result.element);
          if (visibleParent) {
            top = visibleParent.getBoundingClientRect().top;
          }
        }
        top = top + window.scrollY;
        // todo: contentEditable parent selector? any scrollable Parent?
        let editableParent = result.element.closest('[contenteditable]');
        if (editableParent) {
          // Group these together.
          top = top * 0.000001;
        }
        Ed11y.results[i].scrollableParent = closestScrollable(result.element);
        Ed11y.results[i].editableParent = editableParent;
        Ed11y.results[i].sortPos = top;
      });
      // Sort from bottom to top so focus order after insert is top to bottom.
      Ed11y.results.sort((a, b) => b.sortPos - a.sortPos);

      let jumpIndex = Ed11y.results.length;
      Ed11y.results?.forEach(function (result, i) {
        jumpIndex--;
        if (!Ed11y.results[i].dismissalStatus || Ed11y.options.showDismissed) {
          Ed11y.result(result, i, jumpIndex, result.editableParent);
        }
      });
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
      return (a.left - x <= b.right &&
        b.left - x <= a.right &&
        a.top - x <= b.bottom &&
        b.top - x <= a.bottom);
    };

    Ed11y.activeRange = false;
    const rangeChange = function() {
      const range = document.createRange();
      let anchor = getSelection()?.anchorNode;
      if (!anchor || !anchor.parentNode || typeof anchor.parentNode.closest !== 'function') {
        Ed11y.activeRange = false;
        return false;
      }
      let expand = anchor?.parentNode && anchor.parentNode.closest('p, td, th, li, h2, h3, h4, h5, h6');
      anchor = expand ? expand : anchor;
      // todo editable: maybe not the whole selection but just a few lines?
      range.setStartBefore(anchor);
      range.setEndAfter(anchor);
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
    Ed11y.checkEditableIntersects = function () {
      if (!document.querySelector('[contenteditable]:focus, [contenteditable] :focus')) {
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
        const toggle = el.shadowRoot.querySelector('.toggle');
        if ( intersect(Ed11y.activeRange.getBoundingClientRect(), toggle.getBoundingClientRect(), 0) ) {
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
        let openTip = Ed11y.getOpenTip(); // todo: replace with saved param
        if (openTip.tip) {
          Ed11y.alignTip(openTip.button.shadowRoot.querySelector('button'), openTip.tip);
          if (openTip.button.result.editableParent) {
            // Align highlighter appended to body tag.
            Ed11y.editableHighlighter(openTip.button.dataset.ed11yResult, true);
          }
        }
        Ed11y.scrollPending --;
      }
      scrollTicking = false;
      if (Ed11y.scrollPending > 0) {
        requestAnimationFrame(() => Ed11y.updateTipLocations());
      }
    };

    Ed11y.intersectionObservers = function () {
      Ed11y.elements.editable.forEach(editable => {
        editable.addEventListener('scroll', function() {
          // note: we could just adjust the transform rather than recalculating.
          Ed11y.scrollPending = Ed11y.scrollPending < 2 ? Ed11y.scrollPending + 1 : Ed11y.scrollPending;
          requestAnimationFrame(() => Ed11y.updateTipLocations());
        });
      });

      Ed11y.selectionChanged = debounce(() => {
        if (rangeChange()) {
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

    Ed11y.recentlyAddedNodes = [];
    Ed11y.addedNodeReadyToCheck = function(el) {
      if (Ed11y.recentlyAddedNodes.length === 0) {
        return true;
      }
      const thisWasAdded = Ed11y.recentlyAddedNodes.indexOf(el);
      if (thisWasAdded > -1) {
        if (el.textContent.trim().length === 0 || Ed11y.activeRange && el.contains(Ed11y.activeRange.startContainer)) {
          // New node does not yet have text, or is selected.
          return false;
        } else {
          // New node is ready for checking.
          Ed11y.recentlyAddedNodes.splice(thisWasAdded, 1);
          return true;
        }
      } else {
        return true;
      }
    };

    const startObserver = function (root) {
      // todo editor: need to check on text change too.
      // We don't want to nest or duplicate observers.
      if (typeof root.closest !== 'function') {
        if (root.host.matches('.editoria11y-observer')) {
          return;
        } else {
          root.host.classList.add('editoria11y-observer');
        }
      } else {
        if (root.closest('.editoria11y-observer')) {
          return;
        } else {
          root.classList.add('editoria11y-observer');
        }
      }

      /*
      Set up mutation observer for added nodes.
      */
      // Scale timeouts by browser speed.
      const incrementalAlign = debounce(() => {
        if (!Ed11y.running) {
          Ed11y.scrollPending++;
          Ed11y.updateTipLocations();
        }
      }, 10);
      Ed11y.incrementalCheck = debounce(() => {
        if (!Ed11y.running) {
          Ed11y.running = true;
          let runTime = performance.now();
          Ed11y.incremental = true;
          Ed11y.checkAll();
          // Increase debounce if runs are slow.
          runTime = performance.now() - runTime;
          browserSpeed = runTime > 10 ? 10 : (browserSpeed + runTime) / 2;
          // Todo: optimize tip placement so we do not need as much debounce.
          Ed11y.browserLag = browserSpeed < 1 ? 0 : browserSpeed * 100 + Ed11y.totalCount;
        } else {
          window.setTimeout(Ed11y.incrementalCheck, 250);
        }
      }, 250);

      // Options for the observer (which mutations to observe)
      const config = { childList: true, subtree: true, characterData: true };

      const logNode = function (node) {
        /*
        * Newly inserted tables and headings should not be flagged as empty
        * before the user has a chance to edit them. This is crude, but it
        * delays flagging.
        * */
        //:is(table, h1, h2, h3, h4, h5, h6):
        if (node.nodeType !== 1) {
          return;
        }
        if (!node.matches('table, h1, h2, h3, h4, h5, h6')) {
          node = node.querySelector('table, h1, h2, h3, h4, h5, h6');
        }
        if (node) {
          Ed11y.recentlyAddedNodes.push(node);
          window.setTimeout(function (node) {
            let stillWaiting = Ed11y.recentlyAddedNodes.indexOf(node);
            if (stillWaiting > -1) {
              Ed11y.recentlyAddedNodes.splice(stillWaiting, 1);
              Ed11y.incrementalCheck();
            }
          }, 5000, node);
        }
      };

      // Create an observer instance linked to the callback function
      const callback = (mutationList) => {
        // todo mvp: race conditions sometimes create duplicate results.
        for (const mutation of mutationList) {
          if (mutation.type === 'childList') {
            newNodes = true; // Force redrawing buttons.
            if (mutation.addedNodes.length > 0) {
              mutation.addedNodes.forEach(node => {
                logNode(node);
              });
            }
          }
        }
        incrementalAlign(); // Immediately realign tips.
        Ed11y.alignPending = false;
        Ed11y.incrementalCheck(); // Recheck after delay.
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);
      // Start observing the target node for configured mutations
      observer.observe(root, config);
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

    Ed11y.setCurrentJump = function () {
      // Set next/previous buttons
      let goMax = Ed11y.jumpList.length - 1;
      let goNext;
      if (Ed11y.totalCount > 1) {
        // todo remove if prev will be pinned
        // Ed11y.panelJumpPrev.removeAttribute('hidden');
      }
      if (Ed11y.goto === goMax || Ed11y.goto > goMax) {
        // Reached end of loop or dismissal pushed us out of loop
        goNext = 0;
        // todo parameterize
        Ed11y.nextText = Ed11y.M.buttonFirstContent;
      } else {
        goNext = parseInt(Ed11y.goto) + 1;
        Ed11y.nextText = Ed11y.M.buttonNextContent;
      }
      let goPrev = goNext - 2;
      if (goPrev < 0) {
        // loop around
        goPrev = goMax + 1 + goPrev;
      }
      Ed11y.panelJumpNext.dataset.ed11yGoto = goNext.toString();
      Ed11y.panelJumpPrev.dataset.ed11yGoto = goPrev.toString();
      window.setTimeout(function () {
        Ed11y.panelJumpNext.querySelector('.ed11y-sr-only').textContent = Ed11y.nextText;
      }, 250);
    };

    Ed11y.windowResize = function () {
      windowWidth = window.innerWidth;
      if (Ed11y.panel?.classList.contains('ed11y-active') === true) {
        Ed11y.alignAlts();
        Ed11y.alignButtons();
      }
      let openTip = Ed11y.getOpenTip();
      if (openTip.button) {
        Ed11y.alignTip(openTip.button.shadowRoot.querySelector('button'), openTip.tip);
      }
    };

    // Escape key closes panels.
    // todo mvp rewrite
    Ed11y.escapeWatch = function (event) {
      if (event.keyCode === 27) {
        if (event.target.closest('ed11y-element-panel') && Ed11y.panelToggle.getAttribute('aria-expanded') === 'true') {
          Ed11y.panelToggle.focus();
          Ed11y.panelToggle.click();
        } else if (event.target.hasAttribute('data-ed11y-open')) {
          // todo mvp findElements
          let openTip = Ed11y.getOpenTip();
          if (openTip.button) {
            Ed11y.toggledFrom.focus();
            openTip.button.shadowRoot.querySelector('button').click();
          }
        }
      }
    };
    document.addEventListener('keyup', function (event) { Ed11y.escapeWatch(event); });


    /*=============== Utilities ================*/

    // Gets trimmed and normalized inner text nodes.
    // Use computeText() instead for the full accessible name calculation.
    Ed11y.getText = function (el) {
      return el.textContent.replace(/[\n\r]+|\s{2,}/g, ' ').trim();
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
      if (element.getAttribute('aria-label') && element.getAttribute('aria-label').trim().length > 0) {
        // To-do: add empty and whitespace string tests.
        return element.getAttribute('aria-label');
      }
      return 'noAria';
    };

    Ed11y.wrapPseudoContent = function(el, string) {
      let pseudo = [];
      pseudo[0] = window.getComputedStyle(
        el, ':before'
      ).getPropertyValue('content');
      pseudo[1] = window.getComputedStyle(
        el, ':after'
      ).getPropertyValue('content');
      pseudo[0] = pseudo[0] === 'none' ? '' : pseudo[0].replace(/^"(.*)"$/, '$1');
      pseudo[1] = pseudo[1] === 'none' ? '' : pseudo[1].replace(/^"(.*)"$/, '$1');
      return ' ' + pseudo[0] + string + pseudo[1];
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
      if (!el.children.length) {
        // Just text! Output immediately.
        computedText = Ed11y.wrapPseudoContent(el, el.textContent);
        if (!computedText.trim() && el.hasAttribute('title')) {
          return el.getAttribute('title');
        }
        return recursing ? computedText : computedText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
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

        if (treeWalker.currentNode.nodeType === Node.TEXT_NODE) {
          computedText += ' ' + treeWalker.currentNode.nodeValue;
          continue;
        }

        // Jump over ignored link text containers.
        // e.g., "(link opens in new window)"
        if (excludeLinkClasses && treeWalker.currentNode.matches(Ed11y.options.linkIgnoreSelector)) {
          if (!Ed11y.nextTreeBranch(treeWalker)) {
            break walker;
          }
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
          if (treeWalker.currentNode.hasAttribute('alt')) {
            computedText += treeWalker.currentNode.getAttribute('alt');
          }
          continue;
        case 'SVG':
        case 'svg':
          if (treeWalker.currentNode.getAttribute('role') === 'image' && treeWalker.currentNode.hasAttribute('alt')) {
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
        let style = window.getComputedStyle(el);
        if (el.classList.contains('ed11y-ring-red') || el.classList.contains('ed11y-ring-yellow')) {
          return !(style.getPropertyValue('display') === 'none' ||
            style.getPropertyValue('visibility') === 'hidden' ||
            style.getPropertyValue('opacity') === '0' ||
            el.hasAttribute('hidden'));
        } else return !(style.getPropertyValue('display') === 'none' ||
          style.getPropertyValue('visibility') === 'hidden' ||
          style.getPropertyValue('opacity') === '0' ||
          el.hasAttribute('hidden') ||
          (style.getPropertyValue('overflow') === 'hidden' &&
            ( el.offsetWidth === 0 ||
            el.offsetHeight === 0)
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

    Ed11y.getOpenTip = function () {
      // Quick check first, then the expensive one if needed.
      let openTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
      let openButton = document.querySelector('ed11y-element-result[data-ed11y-open="true"]');
      if (!openTip) {
        Ed11y.findElements('openTip', 'ed11y-element-tip[data-ed11y-open="true"]');
        Ed11y.findElements('openButton', 'ed11y-element-result[data-ed11y-open="true"]');
        if (Ed11y.elements.openButton.length > 0) {
          openButton = Ed11y.elements.openButton[0];
          openTip = Ed11y.elements.openTip[0];
        }
      }
      return {
        tip: openTip,
        button: openButton,
      };
    };

    Ed11y.focusActiveResult = function () {
      const openTip = Ed11y.getOpenTip();
      window.setTimeout(function () {
        openTip.button?.shadowRoot.querySelector('button').focus();
      }, 0);
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

    if (CSS.supports('selector(:is(body))')) {
      Ed11y.initialize();
    } else {
      console.warn(Ed11y.M.consoleNotSupported);
    }
  }
}
