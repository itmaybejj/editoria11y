class Ed11y {
  'use strict';
  constructor(options) {
    let defaultOptions = {
      lang : "en",
      theme : "lightSky",
      checkRoot : "body",
      ed11yAlertMode : "",
      ed11yNoRun : "",
      containerIgnore : ".project-tagline",
      ed11yEmbeddedContentWarning : "",
      outlineIgnore : "",
      ed11yImageIgnore : "",
      headerIgnore : "",
      ed11yLinkIgnore : "",
      ed11yIgnoreLinkStrings : "",
      ed11yAllowOverflow : "",
      ed11yHiddenHandlers : "",
      ed11yDownloadLinks : ['.pdf', '.doc', '.docx', '.ppt', '.pptx', 'https://docs.google'],
      //Embedded content
      videoContent: "youtube.com, vimeo.com, yuja.com, panopto.com",
      audioContent: "soundcloud.com, simplecast.com, podbean.com, buzzsprout.com, blubrry.com, transistor.fm, fusebox.fm, libsyn.com",
      dataVizContent: "datastudio.google.com, tableau",
      twitterContent: "twitter-timeline",
      embeddedContent: '',
      syncedDismissals: false,
    };
    Ed11y.options = {
      ...defaultOptions,
      ...options
    };
    Ed11y.M = ed11yLang[Ed11y.options.lang];

    Ed11y.checkRunPrevent = function() {
      return Ed11y.options.ed11yNoRun.trim().length > 0 ? document.querySelector(Ed11y.options.ed11yNoRun) : false;
    }

    // todo: const M = ed11yLang;
    // todo: move html to another file
    this.initialize = () => {
      //Need to evaluate if "load" event took place for bookmarklet version. Otherwise, only call Sa11y once page has loaded.
      const documentLoadingCheck = (callback) => {
        if (document.readyState === 'complete') {
          callback();
        } else {
          window.addEventListener("load", callback);
        }
      };

      //Once document has fully loaded.
      documentLoadingCheck(() => {
        if (!Ed11y.checkRunPrevent()) {
          Ed11y.running = true;
          Ed11y.loadGlobals();
          // todo does this respect assertive pref?
          Ed11y.testQA = new Ed11yTestQA;
          Ed11y.testHeadings = new Ed11yTestHeadings;
          Ed11y.testImages = new Ed11yTestImages;
          Ed11y.testLinks = new Ed11yTestLinks;
          // Get list of elements already hidden.
          let ed11yDismissed;
          // todo MVP test with sync
          if (!Ed11y.options.dismissedAlerts) {
            ed11yDismissed = localStorage.getItem("ed11ydismissed");
          } else {
            ed11yDismissed = Ed11y.options.dismissedAlerts;
          }
          Ed11y.dismissedAlerts = ed11yDismissed ? JSON.parse(ed11yDismissed) : {};
          Ed11y.checkAll(true, 'hide');
        }
      });
    };
    this.initialize();

    Ed11y.theme = {
      darkAmber: {
        primary: "#eed0b1",
        text: "#dcc5aa",
        secondary: "#b3d8ff",
        bg: "#20160c",
        highlight: "",
      },
      lightAmber: {
        primary: "#290303",
        text: "#201602",
        secondary: "#843e00",
        bg: "#f6e4d4",
        highlight: "",
      },
      darkIvory: {
        primary: "#ebe6e2",
        text: "#ebe6e2",
        secondary: "#a8eaea",
        bg: "#20160c",
        highlight: "",
      },
      darkSky: {
        primary: "#b3d8ff",
        text: "#dae0e7",
        secondary: "#b3d8ff",
        bg: "#20160c",
        highlight: "",
      },
      lightSky: {
        primary: "#12569d",
        text: "#20160c",
        secondary: "#273442",
        bg: "#f8fbff",
        highlight: "",
      },
      darkSea: {
        primary: "#a8eaea",
        text: "#dae9e9",
        secondary: "#ffe5b3",
        bg: "#20160c",
        highlight: "",
      }
    }

    Ed11y.color = Ed11y.theme[Ed11y.options.theme];

    // Toggles the outline of all headers, link texts, and images.
    Ed11y.checkAll = (onLoad, showPanel) => {
      if (!Ed11y.checkRunPrevent()) {
        Ed11y.results = [];
        Ed11y.errorCount = 0;
        Ed11y.warningCount = 0;
        Ed11y.dismissedCount = 0;
        Ed11y.mediaCount = 0;
        Ed11y.jumpList = false;
        Ed11y.root = document.querySelector(Ed11y.options.checkRoot);
        // If target root can't be found, fall back to default.
        if (!Ed11y.root) {
          // TODO MVP convert to array of multiple roots so we can dive shadow DOM?
          Ed11y.root = document.querySelector("body");
          console.error('Check Editoria11y configuration; specified root element not found');
        }
        Ed11y.findElements();
        // Waiting to enqueue next test allows execution interrupts.
        window.setTimeout(function () {
          //Ed11y.testLinks.check();
          window.setTimeout(function () {
            //Ed11y.testImages.check();
            window.setTimeout(function () {
              Ed11y.testHeadings.check();
              window.setTimeout(function () {
                //Ed11y.testQA.check();
                window.setTimeout(function () {
                  Ed11y.buildPanels(onLoad);
                  window.setTimeout(function () {
                    Ed11y.updatePanel(onLoad, showPanel);
                    Ed11y.panelToggle.classList.remove('disabled');
                    Ed11y.panelToggle.removeAttribute("aria-disabled");
                    Ed11y.panelToggle.removeAttribute("title");
                  },0);
                },0);
              },0);
            },0);
          },0);
        },0);
        // forms is disabled:
        // Ed11y.checkLabels();
      }
      else {
        Ed11y.reset();
        Ed11y.panelToggle.classList.add('disabled');
        Ed11y.panelToggle.setAttribute("aria-expanded", "true");
        Ed11y.panelToggle.setAttribute("title", "Editorially is disabled during live editing.");
      }
    };

    Ed11y.countAlerts = function () {
      // Todo mvp need to communicate items found before mangling this array.
      Ed11y.dismissedCount = 0;
      // Remove dismissed alerts from the flag array and update count.
      for (let i = Ed11y.results.length - 1; i >= 0; i--) {
        let test = Ed11y.results[i][1];
        let dismissKey = Ed11y.results[i][3];
        // Hide alert if its ID key is in the array.
        if (dismissKey !== false && typeof Ed11y.dismissedAlerts[Ed11y.currentPage] !== "undefined" && typeof Ed11y.dismissedAlerts[Ed11y.currentPage][test] !== "undefined" && Ed11y.dismissedAlerts[Ed11y.currentPage][test][dismissKey] !== "undefined") {
          Ed11y.dismissedCount++;
          Ed11y.results.splice(i, 1);
        } else if (Ed11y.results[i][1].indexOf("Alert") === -1) {
          Ed11y.warningCount++;
        } else {
          Ed11y.errorCount++;
        }
      }
    }

    Ed11y.updatePanel = function (onLoad, showPanel) {
      // Todo move these things to data attributes to move into panel JS
      Ed11y.countAlerts();
      if (Ed11y.dismissedCount > 0) {
        Ed11y.restoreDismissed.removeAttribute('hidden');
      }
      let totalFound = Ed11y.errorCount + Ed11y.warningCount;
      Ed11y.updateCount('quick');
      if (onLoad === true && totalFound > 0) {
        // Determine if panel should open automatically.
        if (Ed11y.localDataParsed[Ed11y.currentPage] === totalFound) {
          // User has already seen these errors, panel will not open.
          showPanel = "seen";
        }
        else if (ed11yAlertMode === "assertive") {
          // User has not seen these errors; force open panel.
          // CMS integrations can set this dynamically.
          showPanel = "show";
        }
        Ed11y.localDataParsed[Ed11y.currentPage] = totalFound;
        window.setTimeout(function() {
          Ed11y.announce.innerHTML = Ed11y.getText(Ed11y.panelMessage);
        }, 1500);
      }
      else if (onLoad === true && totalFound === 0) {
        showPanel = "pass";
      }
      // Now we can open or close the panel.
      if (showPanel !== "show") {
        Ed11y.reset();
      }
      else {
        Ed11y.panel.classList.remove('ed11y-panel-shut', 'ed11y-panel-shut');
        Ed11y.panel.classList.add("ed11y-panel-active");
        Ed11y.panelToggle.setAttribute('aria-expanded', 'true');
        window.setTimeout(function () {
          document.dispatchEvent(new CustomEvent("ed11yPanelOpened"));
          Ed11y.showResults();
        }, 0);
        if (onLoad === false) {
          window.setTimeout(function() {
            Ed11y.panelMessage.focus();
          }, 500);
        }
      }
      Ed11y.running = false;
    };

    // Place markers on elements with issues
    Ed11y.result = function(el, index) {
      // [0] el element
      // [1] test ID
      // [2] tip contents
      // [3] dismisskey
      // e.g.: Ed11y.results.push([el],'warningImageNullAlt','click here'

      let mark = document.createElement('ed11y-element-result');
      let position = !!el[0]?.closest("a") ? "afterbegin" : "beforebegin";
      mark.setAttribute('id','ed11y-result-' + index);
      mark.setAttribute('data-ed11y-result', index);
      mark.setAttribute('data-ed11y-inserted', position);
      mark.setAttribute('data-ed11y-open', 'false');
      el[0].setAttribute('data-ed11y-marked', position);
      el[0].insertAdjacentElement('beforebegin', mark);
    }

    // Show a warning/error count on the toggle button.
    Ed11y.updateCount = function () {
      let totalCount = Ed11y.errorCount + Ed11y.warningCount;
      if (totalCount > 0) {
        Ed11y.panelCount.innerText = totalCount;
        Ed11y.panelCount.style.display = 'inline-block !important';
        if (Ed11y.errorCount > 0) {
          Ed11y.panel.classList.remove('ed11y-pass', 'ed11y-warnings');
          Ed11y.panel.classList.add('ed11y-errors');
          Ed11y.panelMessage.innerHTML = totalCount === 1 ? 'One accessibility issue detected.' : totalCount + ' accessibility issues detected.';
        }
        else if (Ed11y.warningCount > 0) {
          Ed11y.panel.classList.remove('ed11y-pass', 'ed11y-errors');
          Ed11y.panel.classList.add('ed11y-warnings');
          Ed11y.panelMessage.innerHTML = totalCount === 1 ? 'One manual check needed.' : totalCount + ' manual checks needed.';
        }
      }
      else {
        Ed11y.panelMessage.innerText = 'No Accessibility errors detected.';
        Ed11y.panelCount.style.display = 'display: none !important;';
        Ed11y.panel.classList.remove('ed11y-warnings', 'ed11y-errors');
        Ed11y.panel.classList.add('ed11y-pass');
      }
      if (Ed11y.dismissedCount.length > 0) {
        // Todo dejQuery dismissed workflow
        document.getElementById('ed11y-show-dismissed')?.setAttribute('style', 'display: inline-block !important;');
      } else {
        document.getElementById('ed11y-show-dismissed')?.setAttribute('style', 'display: none !important;');
      }
      Ed11y.panel.classList.remove('ed11y-preload');
    };

    // Resets all changes made by the tool. Removing outlines and
    // additional spans.
    Ed11y.reset = function () {

      // Remove error outlines.
      Ed11y.resetClass(Ed11y.root, ['ed11y-text-warning', 'ed11y-link-text-warning','ed11y-error-border','ed11y-warning-border','ed11y-headings-fail','ed11y-link-text-fail', 'ed11y-hidden-highlight','ed11y-uppercase-warning'])

      // Remove buttons.
      Ed11y.root.querySelectorAll('ed11y-element-result, .ed11y-headings-label, .ed11y-reveal-alts').forEach((el) => el.remove());

      // Remove and reset panels and active items.
      // todo mvp remove and prune
      Ed11y.panel.querySelectorAll('.ed11y-show li, .ed11y-about-text').forEach((el) => el.remove());
      Ed11y.panel.classList.add('ed11y-panel-shut');
      Ed11y.panel.classList.remove('ed11y-panel-minimized', 'ed11y-panel-active');
      Ed11y.panelToggle.setAttribute('aria-expanded', 'false');
      Ed11y.panelToggle.classList.remove('ed11y-toggle-active', 'ed11y-errors', 'ed11y-warnings');
      Ed11y.panel.querySelectorAll('.ed11y-upper-active').forEach((el) => el.classList.remove('ed11y-upper-active'));
      Ed11y.panel.querySelectorAll('#ed11y-panel-buttonbar [aria-pressed="true"]').forEach((el) => el.setAttribute('aria-pressed', 'false'));
      Ed11y.running = false;
    };

    

    /*======================== INPUTS MODULE =======================*/
    // todo: implement this module.

    Ed11y.linkText = (linkText) => {
      // todo: This is only used in Images???
      linkText = linkText.replace(ed11yIgnoreLinkStrings,"");
      linkText = linkText.replace(/'|"|-|\.|\s+/g, '');
      return linkText;
    }


    // Handle aria-label or labelled by
    Ed11y.computeAriaLabel = function (el) {
      // Todo: what if there is a span inside element with a label?
      if (el.hasAttribute('[aria-label]')) {
        return el.getAttribute('aria-label');
      }
      else if (el.hasAttribute('[aria-labelledby]')) {
        let target = el.getAttribute('aria-labelledby');
        if (target.length > 0) {
          target = '#' + target;
          target = target.replace(/ /g, ', #');
          let returnText = '';
          target.forEach((id) => {
            returnText += Ed11y.getText(document.getElementById(id)) + ' ';
          });
          return returnText;
        }
        else {
          return '';
        }
      }
      else {
        return 'noAria';
      }
    };

    // recursively look for titles
    Ed11y.computeTitle = function (el) {
      // todo last working here:
      if (el.hasAttribute('title')) {
        return el.getAttribute('title');
      }
      else if (el.querySelector('[title]')) {
        return el.querySelector('[title]').getAttribute('title');
      }
      else {
        return "";
      }
    };



    /*================== FULL CHECK MODULE ===================*/

    Ed11y.checkFull = function () {

      if (Ed11y.mediaCount > 0) {
        // todo: localize
        let prepend = document.createElement('span');
        // todo translation string.
        prepend.innerHTML = "<li>There are <span class='ed11y-red-text'>" + Ed11y.mediaCount + "</span> multimedia elements on this page. " +
            "Please make sure each provides closed captions (for video) or a transcript (for audio).</li>";
        document.getElementById('ed11y-image-list').insertAdjacentElement('beforebegin', prepend);
      }

      Ed11y.updateCount('full');
      Ed11y.showResults(true);
    };
    // End of show()

    Ed11y.findElements = function () {
      // Find and cache so we don't have tests looking willynilly.
      Ed11y.allP = Ed11y.root.querySelectorAll('p');
      Ed11y.allH = Ed11y.root.querySelectorAll("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]");
      Ed11y.AllImages = Ed11y.root.querySelectorAll("img");
      Ed11y.allLinks = Ed11y.root.querySelectorAll("a[href]");
      Ed11y.allLists = Ed11y.root.querySelectorAll("li");
      Ed11y.allBlockquote = Ed11y.root.querySelectorAll("blockquote");
      // todo .not(Ed11y.imageIgnore)
      Ed11y.allFrames = Ed11y.root.querySelectorAll("iframe");
      Ed11y.allAudio = Array.from(Ed11y.root.querySelectorAll("audio"));
      Ed11y.allVideo = Array.from(Ed11y.root.querySelectorAll("video"));
      Ed11y.allTables = Ed11y.root.querySelectorAll("table");
    };
    // End of findElements()

    Ed11y.loadGlobals = function () {

      // Combine default and custom ignores.
      let separator = ", ";

      // Container ignores apply to self and children.
      if (Ed11y.options.containerIgnore.length > 0) {
        let containerSelectors = Ed11y.options.containerIgnore.split(',');
        for (let i = 0; i < containerSelectors.length; i++) {
          containerSelectors[i] = containerSelectors[i] + " *, " + containerSelectors[i];
        }
        Ed11y.options.containerIgnore = containerSelectors.join() + separator + '[aria-hidden]';
      }
      else {
        Ed11y.options.containerIgnore = '[aria-hidden]';
      }
      Ed11y.containerIgnore = Ed11y.options.containerIgnore;

      // Images ignore defaults plus presentation role.
      if (ed11yImageIgnore.length > 1) {
        ed11yImageIgnore += separator;
      }
      Ed11y.imageIgnore = ed11yImageIgnore + Ed11y.containerIgnore + separator + "[role='presentation']";

      Ed11y.headerIgnore = ed11yHeaderIgnore;

      // LinkIgnore is superset of containerIgnore, which is never empty.
      Ed11y.linkIgnore = Ed11y.options.containerIgnore;
      if (ed11yLinkIgnore.length > 0) {
        Ed11y.linkIgnore += separator + ed11yLinkIgnore;
      }

      if (ed11yHeaderIgnore.length > 0) {
        Ed11y.headerIgnore += separator + Ed11y.options.containerIgnore;
      }
      else {
        Ed11y.headerIgnore = Ed11y.options.containerIgnore;
      }

      Ed11y.localData = localStorage.getItem("Ed11y.localData");
      Ed11y.localDataParsed = Ed11y.localData ? JSON.parse(Ed11y.localData) : {};
      Ed11y.currentPage = btoa(encodeURIComponent(window.location.pathname));

    };
    
    Ed11y.dismissalKey = function (text) {
      return String(btoa(encodeURIComponent(text))).substring(0,256);
    }
    Ed11y.dismissThis = function (id, action) {
      let el = Ed11y.results[id][0];
      let test = Ed11y.results[id][1];
      let dismissalKey = Ed11y.dismissalKey(Ed11y.results[id][3]);
      // We may get false positives, but let's not store huge keys.
      let dismissal = {};
      dismissal[dismissalKey] = action;
      if (typeof Ed11y.dismissedAlerts[Ed11y.currentPage] == "undefined") {
        let store = {};
        store[test] = dismissal;
        Ed11y.dismissedAlerts[Ed11y.currentPage] = store;
      } else if (typeof Ed11y.dismissedAlerts[Ed11y.currentPage][test] === "undefined" ) {
        Ed11y.dismissedAlerts[Ed11y.currentPage][test] = dismissal;
      } else {
        Ed11y.dismissedAlerts[Ed11y.currentPage][test][dismissalKey] = action;
      }
      // todo mvp test class reset
      let removal = document.getElementById('ed11y-result-' + id);
      Ed11y.resetClass(el, ['ed11y-text-warning', 'ed11y-link-text-warning','ed11y-error-border','ed11y-warning-border','ed11y-headings-fail','ed11y-link-text-fail', 'ed11y-hidden-highlight','ed11y-uppercase-warning'])
      removal.parentNode.removeChild(removal);
      // todo this removes the tip and button but leaves classes
      // todo update count, deal with 0
      // todo MVP change for direct set of localStorage to handing off to preferred handler?
      localStorage.setItem('ed11ydismissed', JSON.stringify(Ed11y.dismissedAlerts));
      document.dispatchEvent(new CustomEvent("ed11yDismissalUpdate"));
      Ed11y.reset();
      Ed11y.checkAll(false, "show");
      window.setTimeout( function() {
        if (Ed11y.results.length > 0) {
          let focus = document.querySelector('ed11y-element-panel').shadowRoot.querySelector('.jump.next');
          focus.focus();
        } else {
          // todo mvp test
          let focus = document.querySelector('ed11y-element-panel').shadowRoot.querySelector('.toggle');
          focus.focus();
        }
      }, 1000);
    };

    Ed11y.clearDismissals = function() {
      Ed11y.dismissedAlerts[Ed11y.currentPage] = {};
      localStorage.setItem('ed11ydismissed', JSON.stringify(Ed11y.dismissedAlerts));
      document.dispatchEvent(new CustomEvent("ed11yDismissalUpdate"));
      Ed11y.restoreDismissed.setAttribute('hidden', '');
      Ed11y.reset();
      Ed11y.checkAll(false, "show");
    }

    Ed11y.showResults = function (show) {
      // This function is VERY expensive.
      // Todo: optimize?
      // For now: throw chunks to the end of the render queue to prevent
      // thread locking.
      
      Ed11y.results?.forEach(function (el, i) {
        Ed11y.result(el, i);
      })

      // As soon as the buttons are in place, dispatch an event so themes
      // can react
      document.dispatchEvent(new CustomEvent("ed11yPanelOpened"));
      if (show === true) {
        window.setTimeout(function () {
          Ed11y.AllImages.forEach((img) => {
            // todo what if there is no alt? jQuery fails gracefully this will send null...
            let alt = Ed11y.sanitizeForHTML(img.getAttribute('alt'));
            let src = img.getAttribute('src');
            let imgStyles = getComputedStyle(img, null);
            let injectAlt = document.createElement('ed11y-element-alt');
            injectAlt.style.width = imgStyles.width;
            injectAlt.style.height = imgStyles.height;
            injectAlt.dataset.alt = alt;
            /* Shadow attempt
            let width = imgStyles.width;
            let height = imgStyles.height;
            let injectAlt = document.createElement('div');
            injectAlt.classList.add('ed11y-container', 'ed11y-alts', 'ed11y-reset');
            injectAlt.setAttribute('style', 'width:' + width + ' !important; height:' + height + ' !important;');
            injectAlt.innerHTML = '<span>' + Ed11y.panelToggleIcon + 'Alt: ' + alt + '</span>';*/
            if (img.previousElementSibling?.classList.contains('ed11y-instance-inline') === true) {
              img.previousElementSibling.insertAdjacentElement('beforebegin', injectAlt);
            }
            else {
              img.insertAdjacentElement('beforebegin', injectAlt);
            }
            let panelIMG = document.createElement('li');
            if (img.classList.contains('ed11y-error-border')) {
              panelIMG.classList.add('ed11y-error-border');
            }
            else if (img.classList.contains('ed11y-warning-border')) {
              panelIMG.classList.add('ed11y-warning-border');
            }
            panelIMG.innerHTML = '<img src="' + src + '" alt="" class="ed11y-thumbnail"/>Alt: ' + alt + '</li>';
            Ed11y.panel.querySelector('#ed11y-image-list').appendChild(panelIMG);
          });
          window.setTimeout( function () {
            // todo mvp: styles are messed up in panel
            document.querySelectorAll('.ed11y-reveal-alts').forEach(revealed => {
              let img = revealed.nextElementSibling;
              if (img && !img.matches('img')) {
                img = img.nextElementSibling;
              }
              let revealedOffset = revealed.getBoundingClientRect();
              let imgOffset = img.getBoundingClientRect();
              let newOffset = imgOffset.left - revealedOffset.left;
              let newStyle = revealed.getAttribute('style') + ' margin-left: ' + newOffset + 'px !important;'
              revealed.setAttribute('style', newStyle);
            })
          }, 0);
        }, 0);
      }
      Ed11y.alignTips();
    };

    Ed11y.alignTips = function() {
      window.setTimeout(function () {
        // Nudge offscreen tips back on screen.
        let windowWidth = window.innerWidth;
        let marks = Array.from(Ed11y.root.querySelectorAll('ed11y-element-result'));
        let marksToNudge = [];
        // Reading and writing in a loop creates paint thrashing. Read first.
        marks.forEach(mark => {
          let offset = mark.getBoundingClientRect();
          let offsetData = 0;
          if (offset.left < 8) {
            // Offscreen to left
            offsetData = 8 - offset.left;
          }
          else if (offset.left + 80 > windowWidth) {
            // Offscreen to right
            offsetData = windowWidth - offset.left - 80;
          }
          marksToNudge.push([mark, offsetData]);
        });
        marksToNudge.forEach(el => {
          el[0].style.transform = 'translate(' + el[1] + 'px, 0)';
        });
        if (!Ed11y.bodyStyle) {
          let paintDelay = document.createElement('style');
          paintDelay.textContent = `ed11y-element-result, ed11y-element-panel {opacity: 1;}`;
          document.querySelector('body').appendChild(paintDelay);
          Ed11y.bodyStyle = true;
        }
      }, 0);
    }

    Ed11y.alignTip = function (el) {
      let arrow = el.nextElementSibling;
      let tip = arrow.nextElementSibling;
      tip.setAttribute('style','');
      arrow.setAttribute('style','');
      tip.classList.remove('ed11y-tip-left', 'ed11y-tip-under');

      // todo mvp rewrite the left check. should be able to hardcode button width and ditch most of this.
      let buttonOffset = el.getBoundingClientRect();
      let buttonLeft = buttonOffset.left + document.body.scrollLeft;
      let tipOffset = tip.getBoundingClientRect();
      let tipLeft = tipOffset.left + document.body.scrollLeft;
      let tipWidth = tip.offsetWidth;
      let windowWidth = window.innerWidth;
      let roomToLeft = buttonLeft - tipWidth - 50;
      let roomToRight = windowWidth - (buttonLeft + tipWidth + 90);
      if (roomToRight < 0) {
        // Can't go right.
        if (roomToLeft > 0) {
          // Go left if there is room to the left.
          let targetOffset = tipWidth + 7;
          tip.setAttribute('style', 'margin-left: -' + targetOffset + 'px;');
          arrow.setAttribute('style', 'left: -18px;');
        }
        else {
          // Go under if there is not.
          let nudgeX = 15 - tipLeft;
          arrow.setAttribute('style','margin: 35px 0 0 -32px;');
          tip.setAttribute('style', 'transform: translate(' + nudgeX + 'px, 61px); width: calc(95vw - 45px);');
        }
      }
    };

    // Todo move this to CSS
    Ed11y.panelToggleIcon = "<svg role='img' focusable='false' width='28px' height='28px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";
    Ed11y.baseCSS = '.hidden{display:none;}.wrapper{font-size:14px;line-height: 1.5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;}';
    Ed11y.clickTab = function(event) {
      Ed11y.activateTab(event.target, false);
    }
    Ed11y.buildPanels = function (onLoad) {
      if (onLoad === true) {
        // Create a floating button and hidden divs that contain
        // success/warning message.
        let panel = document.createElement('ed11y-element-panel');
        // todo mvp move to body tag
        document.querySelector('header').appendChild(panel);
        //todo new logic

        Ed11y.togglePanel = function () {
          if (!Ed11y.doubleClickPrevent) {
            // Prevent clicking during scan.
            if (Ed11y.running !== true) {
              Ed11y.running = true;

              // Rescan on open, or shut.
              if (Ed11y.panel.classList.contains('ed11y-panel-shut') === true) {
                Ed11y.checkAll(false, "show");
                Ed11y.switchPanel('ed11y-main-toggle');
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

        Ed11y.switchPanel = function(id) {
          Ed11y.panel.querySelector('.content > div:not(.hidden)')?.classList.add('hidden');
          Ed11y.panel.querySelector('#' + id)?.setAttribute('aria-expanded', "true");
          Ed11y.panel.querySelector('#' + id + '-tab')?.classList.remove('hidden');
        }

        Ed11y.buildJumpList = function() {
          // Ed11y.results is in detected order, this will be in DOM order.
          Ed11y.jumpList = document.querySelectorAll('ed11y-element-result');
        }

        Ed11y.setCurrentJump = function() {
          // Set next/previous buttons
          let goMax = Ed11y.results.length - 1;
          let goNext = 0;
          Ed11y.panelJumpPrev.removeAttribute('hidden');
          if (Ed11y.goto == goMax) {
            // Reached end of loop
            goNext = 0;
            Ed11y.nextText = "First";
          } else {
            goNext = parseInt(Ed11y.goto) + 1;
            Ed11y.nextText = "Next";
          }
          let goPrev = goNext - 2;
          if (goPrev < 0) {
            // loop around
            goPrev = goMax + 1 + goPrev;
          }
          Ed11y.panelJumpNext.dataset.ed11yGoto = goNext;
          Ed11y.panelJumpPrev.dataset.ed11yGoto = goPrev;
          window.setTimeout(function () {
            // parameterize
            Ed11y.panelJumpNext.querySelector('.jump-next').textContent = Ed11y.nextText;
          }, 250);
        }


        

        Ed11y.minimize = function () {
          let minimizeToggle = Ed11y.panel.querySelector('#ed11y-minimize');
          let pressed = minimizeToggle.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'
          minimizeToggle.setAttribute('aria-pressed', pressed);
          Ed11y.panel.classList.toggle('panel-minimized');
        };



        // Handle show requests.
        // todo mvp restore functionality
        /*let showTagButton = Ed11y.panel.querySelector('#ed11y-summary-toggle');
        let showTags = function () {
          let pressed = showTagButton.getAttribute('aria-pressed') === 'true' ? 'false' : 'true';
          showTagButton.setAttribute('aria-pressed', pressed);
          if (pressed === 'false') {
            // Close and remove
            document.querySelectorAll('.ed11y-reveal-alts, .ed11y-headings-label, #ed11y-image-list li')?.forEach(el => {el.remove()});
            Ed11y.panel.querySelector('.ed11y-upper-active').classList.remove('ed11y-upper-active');
          }
          else {
            Ed11y.resetTips();
            window.setTimeout(function () {
              Ed11y.checkFull();
              Ed11y.allH.forEach((el) => {
                // Todo implement outline ignore function.
                if (!el?.querySelector('.ed11y-headings-label')) {
                  let level;
                  // Match up aria-headers to equivalent <h#> tag.
                  if (el.hasAttribute('aria-level')) {
                    level = el.getAttribute('aria-level');
                  }
                  else {
                    level = +el.tagName.slice(1);
                  }
                  let headingLabel = document.createElement('span');
                  headingLabel.classList.add('ed11y-headings-label');
                  headingLabel.textContent = 'H' + level;
                  el.insertBefore(headingLabel, el.firstChild);
                }
              });
              Ed11y.panel.querySelector('#ed11y-show-headers').classList.add('ed11y-upper-active');
              Ed11y.panel.querySelector("#ed11y-outline-list").innerHTML = Ed11y.headingOutline
              Ed11y.panel.querySelector('#ed11y-outline-list').focus();
              document.querySelectorAll('.ed11y-headings-label').forEach(h => {h.setAttribute('style','')});
              Ed11y.panel.querySelector('#ed11y-show-outline-header').focus();
            }, 0);
          }


        };
        showTagButton.addEventListener('click', showTags);*/

        Ed11y.windowResize = function() {
          // todo MVP rewrite for alts; tips works now
          if (Ed11y.panel.querySelector('#ed11y-alts').getAttribute('aria-expanded') === 'true') {
            Ed11y.root.querySelectorAll('img, [role="img"]').forEach((el) => {
              let revealedAlt = el.previousElementSibling;
              if (!!revealedAlt && revealedAlt.matches('ed11y-alt-text')) {
                let elComputedStyle = getComputedStyle(el, null);
                let width = 'width:' + elComputedStyle.width + '; ';
                let height = 'height:' + elComputedStyle.height + '; ';
                // todo mvp
                revealedAlt.setAttribute('style', height + width);
              }
            });
          }
          let openTip = Ed11y.root.querySelector('ed11y-element-result[data-ed11y-open="true"]');
          if (!!openTip) {
            let toggle = openTip.shadowRoot.querySelector('.toggle');
            Ed11y.alignTip(toggle, openTip);
          }
        };
        window.addEventListener('resize', function() {Ed11y.windowResize()});

        // Escape key on main closes panels.
        // todo mvp rewrite
        let escapeWatch = function(event) {
          if (event.keyCode === 27) {
            if (document.activeElement.closest('#ed11y-panel-upper, #ed11y-summary-toggle, .ed11y-about')) {
              // close upper panel
              let openUpper = Ed11y.panel.querySelectorAll('#ed11y-summary-toggle[aria-pressed], .ed11y-about[aria-pressed]');
              openUpper.forEach(el => {
                el.focus();
                el.click();
              })
            } else if (document.activeElement.closest('.ed11y-tip-open')) {
              let closeTip = Ed11y.root.querySelector('.ed11y-tip-open button.ed11y-close-tip');
              closeTip.click();
            } else if (Ed11y.panelToggle.getAttribute('aria-expanded') === 'true') {
              Ed11y.panelToggle.focus();
              Ed11y.panelToggle.click();
            }
          }
        }
        document.addEventListener('keyup', escapeWatch);
      }
    };

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
    }
    Ed11y.deactivateTabs = function() {
      Ed11y.panelTabs.forEach(tab => {
        tab.setAttribute('tabindex', '-1');
        tab.setAttribute('aria-selected', 'false');
      })
      Ed11y.panel.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        panel.classList.add('hidden');
      })
    }


    /*=============== Utilities ================*/

    Ed11y.parents = function(el) {
      let nodes = [];
      nodes.push(el);
      while(el.parentElement) {
        nodes.unshift(el.parentElement);
        el = el.parentElement;
      }
      return nodes;
    }

    Ed11y.siblings = function(el) {
      if (el.parentNode === null) return [];
      return Array.prototype.filter.call(el.parentNode.children, function (child) {
        return child !== el;
      });
    };

    Ed11y.nextUntil = function(el, selector) {
      // Iterate next sibling until finding a match or running out of siblings.
      let next = el.nextElementSibling;
      if (!!next) {
        let nextMatch = next.matches(selector);
        if (!!next) {
          return nextMatch;
        } else {
          Ed11y.nextUntil(next, selector);
        }
      } else {
        return false;
      }
    }

    Ed11y.getText = function(el) {
      return el.innerText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    }

    Ed11y.resetClass = (root, el) => {
      el.forEach(el => {
        root.querySelectorAll('.' + el).forEach((x) => x.classList.remove(el));
      })
    };

    // Is this still needed when we use real buttons? getting doubleclick on FF
    Ed11y.keyboardClick = function(event) {
      event.preventDefault();
      let key = event.keyCode;
      switch (key) {
        case 13: // enter
        case 32: // space
          event.target.click();
          break
      }
    }

    Ed11y.visible = function() {
      // courtesy https://stackoverflow.com/questions/178325/how-do-i-check-if-an-element-is-hidden-in-jquery/22969337#22969337
      let x = window.pageXOffset ? window.pageXOffset + window.innerWidth - 1 : 0,
          y = window.pageYOffset ? window.pageYOffset + window.innerHeight - 1 : 0,
          relative = !!((!x && !y) || !document.elementFromPoint(x, y));
      function inside(child, parent) {
        while(child){
          if (child === parent) return true;
          child = child.parentNode;
        }
        return false;
      }
      return function (elem) {
        // todo check is opacity a string or number
        if (
            document.hidden ||
            elem.offsetWidth === 0 ||
            elem.offsetHeight === 0 ||
            elem.style.visibility === 'hidden' ||
            elem.style.display === 'none' ||
            elem.style.opacity === '0'
        ) return false;
        let rect = elem.getBoundingClientRect();
        if (relative) {
          if (!inside(document.elementFromPoint(rect.left + elem.offsetWidth/2, rect.top + elem.offsetHeight/2),elem)) return false;
        } else if (
            !inside(document.elementFromPoint(rect.left + elem.offsetWidth/2 + window.pageXOffset, rect.top + elem.offsetHeight/2 + window.pageYOffset), elem) ||
            (
                rect.top + elem.offsetHeight/2 < 0 ||
                rect.left + elem.offsetWidth/2 < 0 ||
                rect.bottom - elem.offsetHeight/2 > (window.innerHeight || document.documentElement.clientHeight) ||
                rect.right - elem.offsetWidth/2 > (window.innerWidth || document.documentElement.clientWidth)
            )
        ) return false;
        if (window.getComputedStyle) {
          let el = elem,
              comp = null;
          while (el) {
            if (el === document) {break;} else if(!el.parentNode) return false;
            comp = window.getComputedStyle(el, null);
            if (comp && (comp.visibility === 'hidden' || comp.display === 'none' || (typeof comp.opacity !=='undefined' && comp.opacity !== '1'))) return false;
            el = el.parentNode;
          }
        }
        return true;
      }
    }

    Ed11y.firstVisibleParent = function(el) {
      let parents = Ed11y.parents(el);
      parents.forEach(parent => {
        if (Ed11y.visible(parent)) {
          return (parent);
        }
      })
      return false;
    }

    Ed11y.srcMatchesOptions = function(source, option) {
      if (option.length > 0 && source.length > 0) {
        let selectorArray = option.split(/\s*[\s,]\s*/).map((el) => {
          return "[src*='" + el + "']";
        });
        let selectors = selectorArray.join(", ");
        let finder = Array.from(source);
        return finder.filter((el) => el.matches(selectors));
      } else {
        return '[]';
      }
    }

    Ed11y.sanitizeForHTML = function (string) {
      let entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };
      return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
      });
    }

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
          })
        }
      }
      if (typeof(attributes) === "object") {
        Object.entries(attributes).forEach(([key, value]) => {
          //let attribute = value.toString();
          el.setAttribute(key, value);
        })
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
  }
}
