class Ed11y {

  // ESLint config
  /* global ed11yLang, Ed11yTestHeadings, Ed11yTestImages, Ed11yTestLinks, Ed11yTestText, Ed11yTestEmbeds */
  /* exported Ed11y */
  
  constructor(options) {
    
    let defaultOptions = {

      // Only check within these containers, e.g. "#main, footer." Default is to look for <main> and fall back to <body>.
      checkRoots: false,

      // Shadow components inside the checkroot to check within, e.g., 'accordion, spa-content'
      shadowComponents: false, 

      // Containers to globally ignore, e.g., "header *, .card *"
      ignoreElements: false,

      // Disable tests on specific elements
      // Include and modify this entire object in your call
      ignoreByKey: {
        // 'p': false,
        // 'h': false,
        'img': '[aria-hidden], [aria-label], [aria-labelledby], [aria-hidden] img, [aria-label] img, [aria-labelledby] img', // disable alt text tests on overriden images
        'a': '[aria-hidden][tabindex]', // disable link text check on properly disabled links
        // 'li': false,
        // 'blockquote': false,
        // 'iframe': false,
        // 'audio': false,
        // 'video': false,
        // 'table': false,
      },

      // "Assertive" opens the panel automatically if new items are found.
      alertMode: 'polite',

      // Dismissed alerts
      currentPage: false, // uses window.location.pathname unless a string is provided.
      allowHide: true, // enables end-user ignore button
      allowOK: true,  // enables end-user mark OK button
      syncedDismissals: false, // provide empty or populated object {} to enable synch functions

      // Hide all alerts if these elements are absent, e.g., ".edit-button"
      // Used to not heckle editors on pages they cannot fix; they can still click a "show hidden" button to check manually.
      ignoreAllIfAbsent: false,
      ignoreAllIfPresent: false,

      // Disable checker altogother if these elements are present or absent, e.g., ".live-editing-toolbar, .frontpage" or ".editable-content"
      preventCheckingIfPresent: false,
      preventCheckingIfAbsent: false,

      // Regex of strings to remove from links before checking to see if link titles are meaningful. E.g.:
      // "\(link is external\)|\(link sends email\)"
      linkIgnoreStrings: false,

      // Selector list for elements where the tip opening JS should wait for your theme to modify the DOM or CSS before opening the tip
      hiddenHandlers : '',

      // Interface
      lang: 'en', 
      theme: 'lightTheme',
      darkTheme: {
        bg: '#0a2051',
        bgHighlight: '#7b1919',
        text: '#f4f7ff',
        primary: '#3052a0',
        primaryText: '#f4f7ff',
        secondary: '#20160c',
        warning: '#fad859',
        alert: '#b80519',
        button: '#dde8ff',
        focusRing: 'cyan',
        activeTab: '#0a2051',
        tipHeader: '#3052a0',
      },
      lightTheme: {
        bg: '#fffffe',
        bgHighlight: '#7b1919',
        text: '#20160c',
        primary: '#0a307a',
        primaryText: '#fffdf7',
        secondary: '#20160c',
        warning: '#fad859',
        alert: '#b80519',
        button: '#0a307a',
        focusRing: '#007aff',
        activeTab: '#b9c0cf',
        tipHeader: '#0a307a',
      },
      // Base z-index for buttons.
      buttonZIndex : 9999,

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

      // * Not implemented Yet:
      // custom Checks
      // custom results
      // ruleset toggling
      // form label tests
      // detectSPArouting: false,

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
    Ed11y.color = Ed11y.options[Ed11y.options.theme];
    if (Ed11y.options.currentPage === false) {
      Ed11y.options.currentPage = window.location.pathname;
    }
    Ed11y.elements = [];

    Ed11y.initialize = () => {

      Ed11y.checkRunPrevent = () => {
        let preventCheck = Ed11y.options.preventCheckingIfPresent ? document.querySelector(Ed11y.options.preventCheckingIfPresent) : false;
        if (!preventCheck && !!Ed11y.options.preventCheckingIfAbsent) {
          preventCheck = document.querySelector(`:is(${Ed11y.options.preventCheckingIfAbsent})`) === null ? true : false;
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
        if (!Ed11y.checkRunPrevent()) {
          Ed11y.running = true;
          Ed11y.localData = localStorage.getItem('Ed11y.localData');
          Ed11y.localDataParsed = Ed11y.localData ? JSON.parse(Ed11y.localData) : {};
          
          // Build list of dismissed alerts
          if (Ed11y.options.syncedDismissals === false) {
            Ed11y.dismissedAlerts = localStorage.getItem('ed11ydismissed');
            Ed11y.dismissedAlerts = Ed11y.dismissedAlerts ? JSON.parse(Ed11y.dismissedAlerts) : {};
          } else {
            Ed11y.dismissedAlerts = {};
            Ed11y.dismissedAlerts[Ed11y.options.currentPage] = Ed11y.options.syncedDismissals;
          }
          
          // Create test class objects
          // todo postpone: dispatch event to load an array of custom test results
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
          Ed11y.ignoreAll = Ed11y.options.ignoreAllIfAbsent && document.querySelector(`:is(${Ed11y.options.ignoreAllIfAbsent})`) === null ? true : false;
          if (!Ed11y.ignoreAll && !!Ed11y.options.ignoreAllIfPresent) {
            Ed11y.ignoreAll = document.querySelector(`:is(${Ed11y.options.ignoreAllIfPresent})`) === null ? false : true;
          }
          
          // Run tests
          Ed11y.checkAll(true, 'hide');
          window.addEventListener('resize', function() {Ed11y.windowResize();});
        }
      });
    };

    // Toggles the outline of all headers, link texts, and images.
    Ed11y.checkAll = (onLoad, showPanel) => {
      
      if (!Ed11y.checkRunPrevent()) {
        // Reset counts
        Ed11y.results = [];
        Ed11y.elements = [];
        Ed11y.errorCount = 0;
        Ed11y.warningCount = 0;
        Ed11y.dismissedCount = 0;
        Ed11y.mediaCount = 0;

        // Find and cache all root elements based on user-provided selectors.
        let roots = document.querySelectorAll(`:is(${Ed11y.options.checkRoots})`);
        if (roots.length === 0) {
          // todo MVP: set panel message?
          Ed11y.roots = [document.querySelector('html, body')];
          // Todo parameterize.
          if (roots.length === 0) {
            console.warn('Check Editoria11y configuration; specified root element not found');
          } else {
            console.warn('No user editable content on this page');
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
            window.setTimeout(function(){
              Ed11y[test].check();
            },0,test);
          });
          // todo: handle custom rules and inbound synced results (e.g, broken links)
          // todo: test form labels
        }
        window.setTimeout(function() {
          Ed11y.updatePanel(onLoad, showPanel); 
          // todo parameterize
          Ed11y.panelToggle.setAttribute('title', Ed11y.M.toggleAccessibilityTools);
        },0);
      }
      else {
        Ed11y.reset();
        Ed11y.panelToggle.classList.add('disabled');
        Ed11y.panelToggle.setAttribute('aria-expanded', 'true');
        Ed11y.panelToggle.setAttribute('title', Ed11y.M.toggleDisabled);
      }
    };

    Ed11y.countAlerts = function (onLoad) {
      // Review results array to remove dismissed items

      if (Ed11y.ignoreAll) {
        Ed11y.dismissedCount = Ed11y.results.length > 0 ? 1 : 0;
      } else {
        Ed11y.dismissedCount = 0;
        for (let i = Ed11y.results.length - 1; i >= 0; i--) {
          let test = Ed11y.results[i][1];
          let dismissKey = Ed11y.results[i][4];
          if (dismissKey !== false && Ed11y.options.currentPage in Ed11y.dismissedAlerts && test in Ed11y.dismissedAlerts[Ed11y.options.currentPage] && dismissKey in Ed11y.dismissedAlerts[Ed11y.options.currentPage][test]) {
            // Remove result if it has been marked OK or ignored, increment dismissed match counter.
            Ed11y.dismissedCount++;
            Ed11y.results[i][5] = Ed11y.dismissedAlerts[Ed11y.options.currentPage][test][dismissKey];
          } else if (Ed11y.results[i][4]) {
            Ed11y.warningCount++;
            Ed11y.results[i][5] = false;
          } else {
            Ed11y.errorCount++;
            Ed11y.results[i][5] = false;
          }
        }
      }
      
      Ed11y.totalCount = Ed11y.errorCount + Ed11y.warningCount;

      if (Ed11y.totalCount > 0) {
        Ed11y.panelJumpNext.removeAttribute('hidden');
        if (Ed11y.totalCount < 2) {
          Ed11y.panelJumpPrev.setAttribute('hidden','');
        } else {
          Ed11y.panelJumpPrev.removeAttribute('hidden');
        }
        if (Ed11y.errorCount > 0) {
          Ed11y.panel.classList.remove('warnings', 'pass');
          Ed11y.panel.classList.add('errors');
        }
        else if (Ed11y.warningCount > 0) {
          Ed11y.panel.classList.remove('errors', 'pass');
          Ed11y.panel.classList.add('warnings');
        }
        Ed11y.panelCount.textCount = Ed11y.totalCount;    
        Ed11y.panelCount.style.display = 'inline-block';
        Ed11y.panelMessage.innerHTML = Ed11y.totalCount === 1 ? Ed11y.M.panelCount1 : Ed11y.totalCount + Ed11y.M.panelCountMultiple;
        Ed11y.panel.querySelector('.toggle-count').textContent = Ed11y.totalCount;
      }
      else {
        Ed11y.panelJumpNext.setAttribute('hidden', '');
        Ed11y.panelJumpPrev.setAttribute('hidden', '');
        
        Ed11y.panelCount.style.display = 'display: none;';
        Ed11y.panel.classList.remove('warnings', 'errors');
        Ed11y.panel.classList.add('pass');
        if (Ed11y.dismissedCount > 0) {
          // todo: title attribute to explain the difference?
          Ed11y.panel.querySelector('.toggle-count').textContent = 'i';
          Ed11y.panelMessage.innerText = Ed11y.M.panelCountAllDismissed;
        } else {
          Ed11y.panel.querySelector('.toggle-count').textContent = '✓';
          Ed11y.panelMessage.innerText = Ed11y.M.panelCount0;
        }
      }
      if (Ed11y.dismissedCount > 0 || Ed11y.ignoreAll) {
        Ed11y.restoreDismissed.removeAttribute('hidden');
      }
      Ed11y.panel.classList.remove('ed11y-preload');

      if (onLoad === true) {
        // First export a copy of the results for synchronizers
        window.setTimeout(function() {
          let syncResults = new CustomEvent('ed11yResults');
          document.dispatchEvent(syncResults);
        },0);
      }
    };

    Ed11y.updatePanel = function (onLoad, showPanel) {
      
      if (onLoad === true) {
        // Create the panel if it doesn't exist yet
        let panel = document.createElement('ed11y-element-panel');
        document.querySelector('body').appendChild(panel);
      }

      Ed11y.countAlerts(onLoad);
      
      if (onLoad === true && Ed11y.totalCount > 0 && !Ed11y.ignoreAll) {
        // Determine if panel should open automatically.
        if (Ed11y.localDataParsed[Ed11y.options.currentPage] === Ed11y.totalCount) {
          // User has already seen these errors, panel will not open.
          showPanel = 'seen';
        }
        else if (Ed11y.options.alertMode === 'assertive') {
          // User has not seen these errors; force open panel.
          // CMS integrations can set this dynamically.
          showPanel = 'show';
        }
        Ed11y.localDataParsed[Ed11y.options.currentPage] = Ed11y.totalCount;
        window.setTimeout(function() {
          Ed11y.announce.innerHTML = Ed11y.getText(Ed11y.panelMessage);
        }, 1500);
      }
      else if (onLoad === true && Ed11y.totalCount === 0) {
        showPanel = 'pass';
      }

      // Now we can open or close the panel.
      if (showPanel !== 'show') {
        Ed11y.reset();
        if (!Ed11y.bodyStyle) {
          Ed11y.paintReady();
        }
      }
      else {
        Ed11y.panel.classList.remove('shut');
        Ed11y.panel.classList.add('active');
        Ed11y.panelToggle.setAttribute('aria-expanded', 'true');
        window.setTimeout(function () {
          document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
          if (!Ed11y.ignoreAll) {
            Ed11y.showResults();
          }
        }, 0);
        if (onLoad === false) {
          window.setTimeout(function() {
            Ed11y.panelMessage.focus();
          }, 500);
        }
      }
      Ed11y.panelToggle.classList.remove('disabled');
      Ed11y.panelToggle.removeAttribute('aria-disabled');
      // todo parameterize
      Ed11y.running = false;
    };

    // Place markers on elements with issues
    Ed11y.result = function(el, index) {
      // [0] el element
      // [1] test ID
      // [2] tip contents
      // [3] position prefered (afterbegin, beforebegin)
      // [4] dismisskey
      // [5] dismissed (bool)
      // e.g.: Ed11y.results.push([el],'myCustomLinkTip','<p>my custom tip contents</p>','beforeBegin','example-unique-href.example/example'

      let mark = document.createElement('ed11y-element-result');
      let location = el[0].closest('a');
      let position = 'beforebegin';
      if (!location) {
        location = el[0];
        position = el[3];
      }
      mark.setAttribute('id','ed11y-result-' + index);
      mark.setAttribute('data-ed11y-result', index);
      mark.setAttribute('data-ed11y-open', 'false');
      location.insertAdjacentElement(position, mark);
    };

    Ed11y.reset = function () {
      // Reset insertions into body content.
      Ed11y.resetClass(['ed11y-ring-red', 'ed11y-ring-yellow', 'ed11y-hidden-highlight']);
      Ed11y.findElements('reset', 'ed11y-element-result, ed11y-element-tip, .ed11y-element-heading-label, .ed11y-element-alt, ed11y-element-heading-label, ed11y-element-alt', false);
      // todo beta on re-open: recreate heading or alts if panel is showing
      Ed11y.elements.reset.forEach((el) => el.remove());

      // Reset main panel.
      Ed11y.panelJumpNext?.setAttribute('data-ed11y-goto', '0');
      Ed11y.panelJumpPrev?.setAttribute('data-ed11y-goto', '0');
      Ed11y.panel?.classList.add('shut');
      Ed11y.panel?.classList.remove('active');
      Ed11y.panelToggle?.setAttribute('aria-expanded', 'false');
      Ed11y.running = false;
    };

    Ed11y.linkText = (linkText) => {
      // todo: This is only used in Images??? Review all text value diving.
      linkText = linkText.replace(Ed11y.options.linkIgnoreStrings,'');
      linkText = linkText.replace(/'|"|-|\.|\s+/g, '');
      return linkText;
    };

    // Handle aria-label or labelled-by. Latter "wins" and can self-label.
    Ed11y.computeAriaLabel = function (el, recursing = false) {
      let label = el.hasAttribute('aria-label');
      let labelledBy = el.hasAttribute('aria-labelledby');

      if (!recursing) {
        // On first pass only, we compute labelledby and recurse if applicable.
        if (labelledBy) {
          let idList = el.getAttribute('aria-labelledby');
          let returnText = '';
          if (idList.length > 0) {
            idList = '#' + idList;
            idList = idList.replace(/ /g, ', #');
            let targets = document.querySelectorAll(idList);
            targets?.forEach((target) => {
              returnText += Ed11y.computeAriaLabel(target, true) + ' ';
            });
          }
          return returnText;
        } else if (!label) {
          // No aria found.
          return 'noAria';
        }
      }

      // When no labelledby and not recursing, return label if exists.
      if (label) {
        return el.getAttribute('aria-label');
      } else if (recursing) {
        // Todo: rest of naming algorithm? Title etc?
        // In loop, labelledBy should populate with element text.
        return Ed11y.getText(el);
      }
    };

    // recursively look for titles
    Ed11y.computeTitle = function (el) {
      // todo beta replace with Sa11y name calculation
      if (el.hasAttribute('title')) {
        return el.getAttribute('title');
      }
      else if (el.querySelector('[title]')) {
        return el.querySelector('[title]').getAttribute('title');
      }
      else {
        return '';
      }
    };

    // QuerySelectAll non-ignored elements within checkroots, with recursion into shadow components
    Ed11y.findElements = function(key, selector, rootRestrict = true) {
      
      // Todo beta: function and parameter to auto-detect shadow components.
      let shadowSelector = Ed11y.options.shadowComponents ? `, ${Ed11y.options.shadowComponents}` : '';

      // Concatenate global and specific ignores
      let ignore = '';
      if (Ed11y.options.ignoreElements) {
        ignore = Ed11y.options.ignoreByKey[key] ? `:not(${Ed11y.options.ignoreElements}, ${Ed11y.options.ignoreByKey[key]})`: `:not(${Ed11y.options.ignoreElements})`; 
      } else {
        ignore = Ed11y.options.ignoreByKey[key] ? `:not(${Ed11y.options.ignoreByKey[key]})`: '';
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
        let shadowFind = [];
        Ed11y.elements[key].forEach((el, i) => {
          if (el.matches(Ed11y.options.shadowComponents)) {
            // Dive into the shadow root and collect an array of its results.
            shadowFind[i] = el.shadowRoot.querySelectorAll(`:is(${selector})${ignore}`);
          }
        });
        if (shadowFind.length > 0) {
          for (let index = shadowFind.length - 1; index >= 0; index--) {
            if (shadowFind[index]) {
              // Replace the placeholder with any sub-hits in the element-to-test array, or nothing.
              Ed11y.elements[key].splice(index, 1, ...shadowFind[index]);
            }
          }
        }  
      }
    };

    Ed11y.buildElementList = function () {
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
      return String(text).substring(0,512);
    };

    Ed11y.dismissThis = function (dismissalType) {
      // Find the active tip and draw its identifying information from the result list
      let removal = Ed11y.getOpenTip();
      let id = removal.dataset.ed11yResult;
      let test = Ed11y.results[id][1];
      let dismissalKey = Ed11y.dismissalKey(Ed11y.results[id][4]);

      // Remove tip and reset borders around element
      Ed11y.resetClass(['ed11y-hidden-highlight','ed11y-ring-red','ed11y-ring-yellow']);
      removal.parentNode.removeChild(removal);
      let removeButton = Ed11y.elements.openButton[0];
      removeButton.parentNode.removeChild(removeButton);

      // Build dismissal record.
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

      Ed11y.checkAll(false, 'show');

      let rememberGoto = Ed11y.goto;
      
      window.setTimeout( function() {
        Ed11y.buildJumpList();
        if (Ed11y.elements.jumpList.length > 0) {
          Ed11y.goto = (rememberGoto - 1);
          Ed11y.setCurrentJump();
          Ed11y.panelJumpNext.focus();
        } else {
          window.setTimeout(function() {
            let focus = Ed11y.panel.querySelector('#issues-tab');
            focus.focus();
          }, 100);
        }
      }, 500, rememberGoto);
    };

    Ed11y.clearDismissals = function() {
      // todo: if user has allowHide but not allowOK or vice versa, this temporarily clears both.
      Ed11y.ignoreAll = false;
      Ed11y.dismissedAlerts[Ed11y.options.currentPage] = {};
      if (Ed11y.options.syncedDismissals === false) {
        localStorage.setItem('ed11ydismissed', JSON.stringify(Ed11y.dismissedAlerts));
      } else {
        let dismissalDetail = {
          dismissPage: Ed11y.options.currentPage,
          dismissAction: 'reset',
        };
        let ed11yDismissalUpdate = new CustomEvent('ed11yDismissalUpdate', { detail: dismissalDetail });
        document.dispatchEvent(ed11yDismissalUpdate);
      }
      
      Ed11y.restoreDismissed.setAttribute('hidden', '');
      Ed11y.reset();
      Ed11y.checkAll(false, 'show');
    };

    Ed11y.dismissHelp = function(el) {
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

      Ed11y.results?.forEach(function (el, i) {
        if (!Ed11y.results[i][5]) {
          Ed11y.result(el, i);
        }
      });

      Ed11y.buildJumpList();

      // Announce that buttons have been placed.
      document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
      
      Ed11y.alignButtons();
    };

    Ed11y.alignButtons = function() {
      window.setTimeout(function () {
        // Nudge offscreen tips back on screen.
        let windowWidth = window.innerWidth;
        // Todo later: collision detection.
        let marksToNudge = [];
        // Reading and writing in a loop creates paint thrashing. Read first.
        let previousLeft = 0;
        let previousTop = 0;
        let previousNudge = 0;
        Ed11y.elements.jumpList.forEach(mark => {
          if (mark.hasAttribute('style')) {
            mark.removeAttribute('style');
          }
          let offset = mark.getBoundingClientRect();
          let nudgeTop = 0;
          let overlap = 30;
          // Detect tip that overlaps with previous result.
          if (offset.top > previousTop - overlap && offset.top < previousTop + overlap && offset.left > previousLeft - overlap && offset.left < previousTop + overlap) {
            nudgeTop = 30 + previousNudge;
          }
          if (offset.left < 8) {
            // Offscreen to left. push to the right.
            marksToNudge.push([mark, 8 - offset.left, nudgeTop]);
          }
          else if (offset.left + 80 > windowWidth) {
            // Offscreen to right. push to the left
            marksToNudge.push([mark, windowWidth - offset.left - 80, nudgeTop]);
          } else if (nudgeTop > 0) {
            marksToNudge.push([mark, 0, nudgeTop]);
          }
          previousLeft = offset.left;
          previousTop = offset.top + nudgeTop;
          previousNudge = nudgeTop;
        });
        marksToNudge.forEach(el => {
          el[0].style.transform = `translate(${el[1]}px, ${el[2]}px)`;
        });
        if (!Ed11y.bodyStyle) {
          Ed11y.paintReady();
        }
      }, 0);
    };

    Ed11y.paintReady = function() {
      let readyStyle = 
            `ed11y-element-result, ed11y-element-panel {
              opacity: 1; 
              outline: 0 !important;
            }
            .ed11y-hidden-highlight {
              box-shadow: inset 0 0 0 1px ${Ed11y.color.warning}, inset 0 0 0 2px ${Ed11y.color.primary}, 0 0 0 1px ${Ed11y.color.warning}, 0 0 0 3px ${Ed11y.color.primary}, 0 0 1px 3px !important;
            }
            .ed11y-ring-red {
              box-shadow: 0 0 0 1px #fff, inset 0 0 0 2px ${Ed11y.color.alert}, 0 0 0 3px ${Ed11y.color.alert}, 0 0 1px 3px;
              outline: 2px solid ${Ed11y.color.alert};
              outline-offset: 1px;
            }
            .ed11y-ring-yellow {
              box-shadow: 0 0 0 1px #fff, inset 0 0 0 2px ${Ed11y.color.warning}, 0 0 0 3px ${Ed11y.color.warning}, 0 0 1px 3px;
              outline: 2px solid ${Ed11y.color.warning};
              outline-offset: 1px;
            }
            `;

      Ed11y.roots.forEach((root) => {
        // Shadow elements don't inherit styles, so they need their own copy.
        let paintDelay = document.createElement('style');
        paintDelay.textContent = readyStyle;
        root.appendChild(paintDelay);
        if (Ed11y.options.shadowComponents) {
          root.querySelectorAll(Ed11y.options.shadowComponents).forEach((shadowHost) => {
            let paintDelay = document.createElement('style');
            paintDelay.textContent = readyStyle;
            shadowHost.shadowRoot.appendChild(paintDelay);
          });
        }
      });
      Ed11y.roots.forEach(root => {
        // Shadow elements don't inherit styles, so they need their own copy.
        let paintDelay = document.createElement('style');
        root.appendChild(paintDelay);
      });
      Ed11y.bodyStyle = true;
    };

    Ed11y.scrollTo = function (goto) {
      let gotoOffset = goto.getBoundingClientRect().top;
      if (gotoOffset < window.innerHeight * .25) {
        // scroll down
        window.scrollBy(0, gotoOffset - window.innerHeight * .25);
      } else if (gotoOffset > window.innerHeight * .75) {
        // scroll up
        window.scrollBy(0, gotoOffset - window.innerHeight + 160);
      }
    };

    Ed11y.alignTip = function (button, toolTip, recheck = 0) { 
      let arrow = toolTip.shadowRoot.querySelector('.arrow');
      let tip = arrow.nextElementSibling;
      let loopCount = recheck + 1;

      // hiddenHandlers may cause element to animate.
      if (recheck < 3 && Ed11y.options.hiddenHandlers && Ed11y.options.hiddenHandlers.length > 0 && !!button.getRootNode().host.closest(Ed11y.options.hiddenHandlers)) {
        window.setTimeout(function() {
          Ed11y.alignTip(button, toolTip, loopCount);
        },150, loopCount);
      }
      // Reset any previous alignments
      tip.setAttribute('style','');
      arrow.setAttribute('style','');

      // Find button on page
      let scrollTop = window.scrollY;
      let buttonOffset = button.getBoundingClientRect();
      if (buttonOffset.top === 0 && buttonOffset.left === 0) {
        // ruh roh invisible button
        let firstVisibleParent = Ed11y.firstVisibleParent(button.getRootNode().host);
        if (firstVisibleParent) {
          buttonOffset = firstVisibleParent.getBoundingClientRect();
        }
      }
      let buttonLeft = buttonOffset.left + document.body.scrollLeft;
      toolTip.style.setProperty('top', buttonOffset.top + scrollTop + 'px');
      // todo: need left scroll too for horizontally scrolled pages
      toolTip.style.setProperty('left', buttonOffset.left + 'px');
      let tipWidth = tip.offsetWidth;
      let tipHeight = tip.offsetHeight;
      let windowWidth = window.innerWidth;
      let windowBottom = scrollTop + window.innerHeight;

      let direction = 'under';
      // Default to displaying under
      if (buttonOffset.top + tipHeight + scrollTop + 50 > windowBottom) {
        // If there's no room under in the viewport...
        if (windowWidth > tipWidth * 1.5 && windowWidth - (buttonLeft + tipWidth + 90) > 0 && buttonOffset.top + 130 < window.innerHeight) {
          direction = 'right';
        } else if (buttonOffset.top > tipHeight + 15) {
          direction = 'above';
        } else if (windowWidth > tipWidth * 1.5 && buttonLeft - tipWidth - 50 > 0) {
          direction = 'left';
        } else if (buttonOffset.bottom + tipHeight > document.documentElement.clientHeight - 50) {
          // No room anywhere in viewport we're at the end of the page.
          direction = 'above';
        }
        // Back to default.
      }

      let nudgeX = 0;
      let nudgeY = 0;
      
      if (direction === 'under') {
        // Pin to the left edge, unless the tip is not wide enough to reach:
        if (tipWidth * 4 / 5 + buttonOffset.left + 20 > windowWidth || buttonOffset.left - 20 - tipWidth / 5 < 0) {
          // Can't center
          if (tipWidth - 15 > buttonOffset.left) {
            nudgeX = 15 - buttonOffset.left;
            arrow.style.setProperty('left', Math.max(buttonOffset.left,15) - 9 + 'px');
          } else {
            arrow.style.setProperty('left', tipWidth - 26 + 'px');
            nudgeX = 31 - tipWidth;
          }
        } else {
          nudgeX = 40 - tipWidth / 5;
          arrow.style.setProperty('left', tipWidth / 5 - 34 + 'px');
        }
        
        arrow.dataset.direction = 'under';
        nudgeY = 50;
      }
      else if (direction === 'above') {
        // Slide left or right to center tip on page.
        nudgeY = -1 * (tipHeight + 18);
        arrow.style.setProperty('top', tipHeight);
        if (tipWidth * 4 / 5 + buttonOffset.left + 20 > windowWidth || buttonOffset.left - 20 - tipWidth / 5 < 0) {
          // Can't center
          if (tipWidth - 15 > buttonOffset.left) {
            nudgeX = 15 - buttonOffset.left;
            arrow.style.setProperty('left', buttonOffset.left - 9 + 'px');
          } else {
            arrow.style.setProperty('left', tipWidth - 26 + 'px');
            nudgeX = 31 - tipWidth;
          }
        } else {
          nudgeX = 40 - tipWidth / 5;
          arrow.style.setProperty('left', tipWidth / 5 - 34 + 'px');
        }
        arrow.dataset.direction = 'above';
        arrow.style.setProperty('top', `${tipHeight + 18}px`);
      } else {
        // Left or right
        let tipBottom = buttonOffset.top + scrollTop + tipHeight;
        if (tipBottom > windowBottom) {
          // Offset up
          nudgeY = windowBottom - (tipBottom + 90);
          let arrowY = nudgeY * -1 + 7;
          arrowY = Math.min(arrowY,tipHeight - 25);
          arrow.style.setProperty('top', `${arrowY}px`);
        }
        if (direction === 'left') {
          nudgeX = 0 - (tipWidth + 17);
          arrow.style.setProperty('left', `${tipWidth - 9}px`);
          arrow.dataset.direction = 'left';
        } else {
          // direction is right
          nudgeX = 50;
          arrow.dataset.direction = 'right';
        }
      }
      toolTip.style.setProperty('transform', `translate(${nudgeX}px, ${nudgeY}px)`);
      
    };

    Ed11y.baseCSS = `
      :host{all: initial;} 
      .hidden{display:none;}
      .wrapper{font-size:14px;line-height: 1.5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;}
      `;
    Ed11y.clickTab = function(event) {
      Ed11y.activateTab(event.target, false);
    };

    Ed11y.togglePanel = function () {
      if (!Ed11y.doubleClickPrevent) {
        // todo beta: revisit aria states and announcements.
        if (Ed11y.panel.classList.contains('active') && Ed11y.panel.classList.contains('shut')) {
          Ed11y.minimize();
        }
        // Prevent clicks piling up while scan is running.
        else if (Ed11y.running !== true) {
          Ed11y.running = true;
          // Re-scan each time the panel reopens.
          if (Ed11y.panel.classList.contains('active') === false) {
            Ed11y.checkAll(false, 'show');
          }
          else {
            Ed11y.reset();
          }
        }
      }
      Ed11y.doubleClickPrevent = true;
      window.setTimeout(function() {
        Ed11y.doubleClickPrevent = false;
      },200);
      return false;
    };

    Ed11y.showHeadingsPanel = function() {
      // Visualize the document outline
 
      let panelOutline = Ed11y.panel.querySelector('#outline');
      
      if (Ed11y.headingOutline.length) {
        panelOutline.innerHTML = '';
        Ed11y.headingOutline.forEach((el, i) => {
          // Todo implement outline ignore function.
          let mark = document.createElement('ed11y-element-heading-label');
          mark.dataset.ed11yHeadingOutline = i;
          // Array: el, level, outlinePrefix
          el[0].insertAdjacentElement('afterbegin', mark);
          let level = el[1];
          let leftPad = 10 * level - 10;
          let li = document.createElement('li');
          li.classList.add('level' + level);
          let message = el[2] && !el[5] ? el[2] : ''; // Has an error message and is not ignored.
          if (message) {
            // todo: communicate alert level? Add alert title?
            li.classList.add('has-issues');
          }
          li.style.setProperty('margin-left', leftPad + 'px');        
          li.innerHTML = `<strong>H${level}:</strong> ${message}`;
          let userText = document.createElement('span');
          userText.textContent = el[0].textContent;
          li.append(userText);
          panelOutline.append(li);
        });
      } else {
        panelOutline.innerHTML = '<p><em>No heading structure found.</em></p>';
      }
    };
    Ed11y.switchPanel = function(id) {
      // Switch main panel tab
      Ed11y.panel.querySelector('.content > div:not(.hidden)')?.classList.add('hidden');
      Ed11y.panel.querySelector('[aria-selected=true]')?.setAttribute('aria-selected', 'false');
      Ed11y.panel.querySelector('#' + id).setAttribute('aria-selected', 'true');
      Ed11y.panel.querySelector('#' + id + '-tab')?.classList.remove('hidden');
      // todo beta what to show when no outline or images
      // todo postpone: error when no headings found at all?
      Ed11y.findElements('reset','ed11y-element-heading-label, ed11y-element-alt');
      Ed11y.elements.reset?.forEach(el => {el.remove();});
      
      // Show extras
      switch (id) {
      case 'alts':
        Ed11y.showAltPanel();
        break;
      case 'headings':
        Ed11y.showHeadingsPanel();
        break;
      case 'help':
        Ed11y.showHelpPanel();
        break;
      default:
        // hide extras
        break;
      }
    };

    
    Ed11y.alignAlts = function() {
      // Positions alt label to match absolute, inline or floated images.
      Ed11y.findElements('altMark', 'ed11y-element-alt');
      Ed11y.elements.altMark?.forEach((el) => {
        let id = el.dataset.ed11yImg;
        el.setAttribute('style','');
        let img = Ed11y.imageAlts[id][0];
        if (img.tagName !== 'IMG') {
          // Mark is placed outside the link in linked images.
          img = img.querySelector('img');
        }
        let markOffset = el.getClientRects();
        let imgOffset = img.getClientRects();
        let newOffset = imgOffset.left - markOffset.left;
        let height = getComputedStyle(img).height;
        height = height === 'auto' ? img.offsetHeight : Math.max(img.offsetHeight, parseInt(height));
        el.setAttribute('style', `transform: translate(${newOffset}px, 0px); height: ${height}px; width: ${img.offsetWidth}px;`);
      });
    };

    Ed11y.showAltPanel = function() {
      // visualize image alts
      let altList = Ed11y.panel.querySelector('#alt-list');
      
      if (Ed11y.imageAlts.length) {
        altList.innerHTML = '';
        Ed11y.imageAlts.forEach((el, i) => {
          // el[el, src, altLabel, altStyle]
          
          // Label images
          let mark = document.createElement('ed11y-element-alt');
          mark.dataset.ed11yImg = i;
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

    Ed11y.showHelpPanel = function() {
      let helpTab = Ed11y.panel.querySelector('#help-tab');
      helpTab.innerHTML = Ed11y.M.panelHelp;
    };

    Ed11y.buildJumpList = function() {
      Ed11y.findElements('jumpList','ed11y-element-result', false);
      Ed11y.elements.jumpList.forEach((result, i) => {
        result.dataset.ed11yJumpPosition = i; 
      });
    };

    Ed11y.setCurrentJump = function() {
      // Set next/previous buttons
      let goMax = Ed11y.elements.jumpList.length - 1;
      let goNext = 0;
      if (Ed11y.totalCount > 1) {
        Ed11y.panelJumpPrev.removeAttribute('hidden');
      }
      if (Ed11y.goto == goMax || Ed11y.goto > goMax) {
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
      Ed11y.panelJumpNext.dataset.ed11yGoto = goNext;
      Ed11y.panelJumpPrev.dataset.ed11yGoto = goPrev;
      window.setTimeout(function () {
        Ed11y.panelJumpNext.querySelector('.jump-next').textContent = Ed11y.nextText;
      }, 250);
    };

    Ed11y.minimize = function () {
      let minimized = Ed11y.panel.classList.contains('shut') === 'true' ? true : false;
      Ed11y.panel.classList.toggle('shut');
      if (minimized === false) {
        window.setTimeout(function() {
          Ed11y.panelToggle.focus();
        }, 500);
      }
    };

    Ed11y.windowResize = function() {
      if (Ed11y.panel?.classList.contains('active') === true) {
        Ed11y.alignAlts();
        Ed11y.alignButtons();
      }
      let openTip = Ed11y.getOpenTip();
      if (openTip) {
        Ed11y.alignTip(Ed11y.elements.openButton[0].shadowRoot.querySelector('button'), openTip);
      }
    };

    // Escape key closes panels.
    // todo mvp rewrite
    Ed11y.escapeWatch = function(event) {
      if (event.keyCode === 27) {
        if (event.target.closest('ed11y-element-panel') && Ed11y.panelToggle.getAttribute('aria-expanded') === 'true') {
          Ed11y.panelToggle.focus();
          Ed11y.panelToggle.click();
        } else if (event.target.hasAttribute('data-ed11y-open')) {
          // todo mvp findElements
          let openTip = Ed11y.getOpenTip();
          if (openTip) {
            Ed11y.toggledFrom.focus();
            Ed11y.elements.openButton[0].shadowRoot.querySelector('button').click();
          }
        } 
      }
    };
    document.addEventListener('keyup', function(event) {Ed11y.escapeWatch(event);});

    /*============== Panel interactions ========*/
    Ed11y.activateTab = function(tab, setFocus) {
      setFocus = setFocus || true;
      Ed11y.deactivateTabs();
      tab.setAttribute('tabindex','0');
      tab.setAttribute('aria-selected', 'true');
      let controls = tab.getAttribute('aria-controls');
      Ed11y.panel.querySelector('#' + controls).classList.remove('hidden');
      if (setFocus) {
        tab.focus();
      }
    };
    Ed11y.deactivateTabs = function() {
      Ed11y.panelTabs.forEach(tab => {
        tab.setAttribute('tabindex', '-1');
        tab.setAttribute('aria-selected', 'false');
      });
      Ed11y.panel.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        panel.classList.add('hidden');
      });
    };


    /*=============== Utilities ================*/

    Ed11y.parents = function(el) {
      let nodes = [];
      nodes.push(el);
      while(el && !!el.parentElement && el.parentElement.tagName !== 'HTML') {
        nodes.push(el.parentElement);
        el = el.parentElement;
      }
      return nodes;
    };

    Ed11y.siblings = function(el) {
      if (el.parentNode === null) return [];
      return Array.prototype.filter.call(el.parentNode.children, function (child) {
        return child !== el;
      });
    };

    Ed11y.nextUntil = function(el, selector) {
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

    Ed11y.getText = function(el) {
      return el.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
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
    Ed11y.keyboardClick = function(event) {
      event.preventDefault();
      let key = event.keyCode;
      switch (key) {
      case 13: // enter
      case 32: // space
        event.target.click();
        break;
      }
    };

    Ed11y.visibleElement = function(el) {
      // Checks if this element is visible. Used in parent iterators.
      // false is definitely invisible, true requires continued iteration to tell.
      // Todo postpone: Check for offscreen?
      if (el) {
        let style = window.getComputedStyle(el);
        if (el.classList.contains('ed11y-ring-red') || el.classList.contains('ed11y-ring-yellow')) {
          if (
            style.getPropertyValue('display') === 'none' || 
              style.getPropertyValue('visibility') === 'hidden' ||
              style.getPropertyValue('opacity') === '0' ||
              el.hasAttribute('hidden')
          ) {
            return false;
          } else {
            return true;
          }
        } else if (
          // todo: if the element is display:none, can we push the tooltip to the nearest visible container and then open it?
          style.getPropertyValue('display') === 'none' || 
          style.getPropertyValue('visibility') === 'hidden' ||
          style.getPropertyValue('opacity') === '0' ||
          el.offsetWidth === 0 ||
          el.offsetHeight === 0 ||
          el.hasAttribute('hidden')) {
          return false;
        } else {
          return true;
        }
      }
    };
    
    Ed11y.visible = function(el) {
      // Recurse element and ancestors to make sure it is visible
      if (!Ed11y.visibleElement(el)) {
        // Element is hidden
        return false;
      } else {
        // Element is not known to be hidden.
        let parents = Ed11y.parents(el);
        let visibleParent = (parent) => Ed11y.visibleElement(parent);
        let visible = parents.every(visibleParent);
        return visible;
      }
    };

    Ed11y.firstVisibleParent = function(el) {
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

    Ed11y.parentLink = function(el) {
      return el.closest('a[href]');
    };

    Ed11y.getOpenTip = function() {
      Ed11y.findElements('openButton','ed11y-element-result[data-ed11y-open="true"]');
      let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
      return activeTip;
    };

    Ed11y.focusActiveResult = function() {
      Ed11y.getOpenTip();
      window.setTimeout(function() {
        Ed11y.elements.openButton[0]?.shadowRoot.querySelector('button').focus();
      },0);
    };

    Ed11y.srcMatchesOptions = function(source, option) {
      if (option.length > 0 && source?.length > 0) {
        let selectorArray = option.split(/\s*[\s,]\s*/).map((el) => {
          return '[src*=\'' + el + '\']';
        });
        let selectors = selectorArray.join(', ');
        let finder = Array.from(source);
        return finder.filter((el) => el.matches(selectors));
      } else {
        return '';
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

    Ed11y.builder = function (type, id, classes, attributes, textContent) {
      let el = document.createElement(type);
      if (id) {
        el.setAttribute('id', id);
      }
      if (classes) {
        if (typeof(classes) === 'string') {
          el.classList.add(classes);
        } else {
          classes.forEach(str => {
            el.classList.add(str);
          });
        }
      }
      if (typeof(attributes) === 'object') {
        Object.entries(attributes).forEach(([key, value]) => {
          //let attribute = value.toString();
          el.setAttribute(key, value);
        });
      }
      if (textContent) {
        el.textContent = textContent;
      }
      return (el);
    };

    //Helper: Used to ignore child elements within an anchor.
    Ed11y.fnIgnore = (element, selector) => {
      const clone = element.cloneNode(true);
      const excluded = Array.from(selector ? clone.querySelectorAll(selector) : clone.children);
      excluded.forEach((c) => {
        c.parentElement.removeChild(c);
      });
      return clone;
    };

    if (CSS.supports('selector(:is(body))')) {
      Ed11y.initialize();
    } else {
      console.warn(Ed11y.M.consoleNotSupported);
    }
  }
}
