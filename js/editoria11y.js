class Ed11y {
  'use strict';
  constructor(options) {
    let defaultOptions = {
      checkRoot : "body",
      ed11yAlertMode : "",
      ed11yNoRun : "",
      ed11yContainerIgnore : ".project-tagline",
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
    };
    options = {
      ...defaultOptions,
      ...options
    };

    Ed11y.checkRunPrevent = function() {
      return options.ed11yNoRun.trim().length > 0 ? document.querySelector(options.ed11yNoRun) : false;
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
          Ed11y.checkAll(true, 'hide');
        }
      });
    };
    this.initialize();



    // Toggles the outline of all headers, link texts, and images.
    Ed11y.checkAll = (onLoad, showPanel) => {
      if (!Ed11y.checkRunPrevent()) {
        Ed11y.results = [];
        Ed11y.errorCount = 0;
        Ed11y.warningCount = 0;
        Ed11y.dismissedCount = 0;
        Ed11y.mediaCount = 0;
        Ed11y.root = document.querySelector(options.checkRoot);
        // If target root can't be found, fall back to default.
        if (!Ed11y.root) {
          Ed11y.root = document.querySelector("body");
          console.error('Check Editoria11y configuration; specified root element not found');
        }
        Ed11y.findElements();

        // Get list of elements already hidden
        let ed11yDismissed = localStorage.getItem("ed11ydismissed");
        Ed11y.dismissedAlerts = ed11yDismissed ? JSON.parse(ed11yDismissed) : {};

        // Waiting to enqueue next test allows execution interrupts.
        window.setTimeout(function () {
          Ed11y.checkLinkText();
          window.setTimeout(function () {
            Ed11y.checkAltText();
            window.setTimeout(function () {
              Ed11y.checkHeaders();
              window.setTimeout(function () {
                Ed11y.checkQA();
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
      Ed11y.dismissedCount = 0;
      // Remove dismissed alerts from the flag array and update count.
      for (let i = Ed11y.results.length - 1; i >= 0; i--) {
        let dismissKey = Ed11y.results[i][7];
        dismissKey = typeof dismissKey !== "undefined" ? Ed11y.dismissalKey(dismissKey) : false;
        let testType = Ed11y.results[i][6];
        // Hide alert if its ID key is in the array.
        if (dismissKey !== false && typeof Ed11y.dismissedAlerts[Ed11y.currentPage] !== "undefined" && typeof Ed11y.dismissedAlerts[Ed11y.currentPage][testType] !== "undefined" && Ed11y.dismissedAlerts[Ed11y.currentPage][testType][dismissKey] !== "undefined") {
          Ed11y.dismissedCount++;
          Ed11y.results.splice(i, 1);
        } else if (Ed11y.results[i][3].indexOf("warning") > 0) {
          Ed11y.warningCount++;
        } else {
          Ed11y.errorCount++;
        }
      }
    }

    Ed11y.updatePanel = function (onLoad, showPanel, showHidden) {
      if (showHidden !== true) {
        Ed11y.countAlerts();
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
          document.getElementById('ed11y-aria-live').innerHTML = Ed11y.getText(Ed11y.panelMessage);
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
          Ed11y.readyTips();
        }, 0);
        if (onLoad === false) {
          window.setTimeout(function() {
            Ed11y.panelMessage.focus();
          }, 500);
        }
      }
      Ed11y.running = false;
    };

    Ed11y.markResult = function (el, index) {
      // todo: results are based on jQuery objects. Will need to change all at once.
      // We parse this long array:
      // [0] el element
      // [1] insertion position
      // [2] is element block or inline
      // [3] wrapper class
      // [4] button class
      // [5] message
      // [6] test shortname
      // [7] ID key for dismissing
      // e.g.: Ed11y.results.push([$el,'before','ed11y-instance','ed11y-error-border','ed11y-warning-btn',generalAltText]);
      // Warning, error or hidden?
      // console.log(index + " " + el[6]);
      let icon = document.createElement("span");
      icon.classList.add('ed11y-sr-only');
      if (el[4].indexOf('warning') !== -1) {
        icon.textContent = 'Show editorially warning';
      } else {
        icon.textContent = 'Show editorially error';
      }
      let injection = document.createElement('div');
      injection.classList.add(el[2], 'ed11y-reset');
      injection.innerHTML = '<button type="button" class="' +
          el[4] +
          ' ed11y-pop" style="display:none;" aria-expanded="false" data-ed11y-inserted="' + el[1] + '" data-ed11y-tip="' +
          index +
          '">' + icon + '</button>';
      let alreadyFlagged = el[0].getAttribute('data-ed11y-marked');
      if (alreadyFlagged === 'before') {
        let pop = el[0].previousElementSibling;
        let tip = pop.querySelector('.ed11y-pop');
        tip.setAttribute('data-ed11y-tip', index);
      }
      else if (alreadyFlagged === 'after') {
        let pop = el[0].nextElementSibling;
        let tip = pop.querySelector('.ed11y-pop');
        tip.setAttribute('data-ed11y-tip', index);

      }
      else if (alreadyFlagged === 'prepend') {
        let tip = el[0].querySelector('.ed11y-pop');
        tip.setAttribute('data-ed11y-tip', index);
      }
      else {
        if (el[3].length > 0) {
          el[0].classList.add(el[3]);
        }
        if (el[1] === 'after') {
          el[0].setAttribute('data-ed11y-marked','after');
          el[0].insertAdjacentElement('afterend', injection);
        }
        else if (el[1] === 'before') {
          el[0].setAttribute('data-ed11y-marked','before');
          el[0].insertAdjacentElement('beforebegin', injection);
        }
        else {
          el[0].setAttribute('data-ed11y-marked','prepend');
          el[0].insertBefore(injection, el[0].firstChild);
        }
      }
    };

    // Show a warning/error count on the toggle button.
    Ed11y.updateCount = function () {
      let totalCount = Ed11y.errorCount + Ed11y.warningCount;
      if (totalCount > 0) {
        Ed11y.panelCount.innerText = totalCount;
        Ed11y.panelCount.style.display = 'inline-block !important';
        Ed11y.panelJumpNext.innerText = totalCount > 1 ? 'first' : '';
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

      Ed11y.resetTips();

      // Remove and reset panels and active items.
      Ed11y.panel.querySelectorAll('.ed11y-show li, .ed11y-about-text').forEach((el) => el.remove());
      Ed11y.panel.classList.add('ed11y-panel-shut');
      Ed11y.panel.classList.remove('ed11y-panel-minimized', 'ed11y-panel-active');
      Ed11y.panelToggle.setAttribute('aria-expanded', 'false');
      Ed11y.panelToggle.classList.remove('ed11y-toggle-active', 'ed11y-errors', 'ed11y-warnings');
      Ed11y.panel.querySelectorAll('.ed11y-upper-active').forEach((el) => el.classList.remove('ed11y-upper-active'));
      Ed11y.panel.querySelectorAll('#ed11y-panel-buttonbar [aria-pressed="true"]').forEach((el) => el.setAttribute('aria-pressed', 'false'));
      Ed11y.running = false;
    };

    Ed11y.resetTips = function () {
      // Remove error outlines.
      Ed11y.resetClass(['ed11y-text-warning', 'ed11y-link-text-warning','ed11y-error-border','ed11y-warning-border','ed11y-headings-fail','ed11y-link-text-fail', 'ed11y-hidden-highlight','ed11y-uppercase-warning'])
      document.querySelector('body').classList.remove('ed11y-pops-ready');

      // Remove buttons.
      Ed11y.root.querySelectorAll('.ed11y-instance, .ed11y-instance-inline, .ed11y-headings-label, .ed11y-reveal-alts').forEach((el) => el.remove());
      Ed11y.root.querySelectorAll('[data-ed11y-marked]').forEach((el) => el.removeAttribute('data-ed11y-marked'));
    };


    /*================== HEADING STRUCTURE MODULE ===================*/

    Ed11y.checkHeaders = function () {
      // Reset panel; we rebuild on each run.
      Ed11y.panel?.querySelectorAll("#ed11y-outline-list li, .ed11y-headings-label").forEach((el) => el.remove());

      // Only fetch headers within the content area.

      let prevLevel = 0;
      Ed11y.headingOutline = "";

      // Test each header level for accessibility issues.
      Ed11y.allH.forEach((el, i) => {
        let level;

        // Match aria-headers to <h#> level.
        if (el.hasAttribute('aria-level')) {
          // Plus forces numerical type
          level = +el.getAttribute('aria-level');
        }
        else {
          level = +el.tagName.slice(1);
        }
        let headingError = "";
        let outlinePrefix = "";
        let ed11yTip = "";
        let headingText = Ed11y.getText(el);
        let headingLength = headingText.length;
        let dismissKey = false;
        if (level - prevLevel > 1 && i !== 0) {
          headingError = 'ed11y-warning-btn';
          outlinePrefix = '(flagged for skipped level) ';
          dismissKey = Ed11y.dismissalKey(level + headingText);
          ed11yTip = ed11yMessageHeadingLevelSkipped(prevLevel, level);
        }
        if (headingLength < 1) {
          // todo: proper text recursion
          // todo: test with no alt attribute at all
          let headingSubText = el.querySelector('img')?.getAttribute('alt');
          if (!headingSubText || headingSubText.length === 0) {
            headingError = 'ed11y-warning-btn';
            outlinePrefix = '(empty heading)';
            ed11yTip = ed11yMessageHeadingEmpty;
          }
        }
        else if (headingLength > 160) {
          headingError = 'ed11y-warning-btn';
          outlinePrefix = '(flagged for length) ';
          dismissKey = Ed11y.dismissalKey(level + headingText);
          ed11yTip = ed11yMessageHeadingTooLong(headingLength);
        }
        prevLevel = level;
        let liClass = "ed11y-outline-" + level;
        let liPrefix = "";
        // If the heading error is within a hyperlink, make sure to
        // append button after anchor tag.
        // Todo add this case to the test page
        // Todo test new header ignore
        if (headingError !== "") {
          // todo: just use container ignore?
          if (!(options.headerIgnore !== "" && el?.closest(options.headerIgnore))) {
            if (!el?.closest("a")) {
              Ed11y.results.push([el, 'before', 'ed11y-instance', "ed11y-link-text-warning", headingError, ed11yTip, "heading", dismissKey]);
            }
            else {
              Ed11y.results.push([el.closest('a'), 'before', 'ed11y-instance', "ed11y-link-text-warning", headingError, ed11yTip, "heading", dismissKey]);
            }
            // Outline element if there is an error.
            liClass += " ed11y-text-warning";
            liPrefix = "<span class='ed11y-sr-only'> Warning: </span> ";
          }
        }
        if (outlinePrefix) {
          outlinePrefix = "<span class='ed11y-small'><em>" + outlinePrefix +
              "</em></span>";
        }
        // todo: is this the golden ignore check? also build and test outline ignore
        if (!(options.outlineIgnore !== "" && el?.closest(options.outlineIgnore))) {
          Ed11y.headingOutline += "<li class='" + liClass + "'>" +
              "<span class='ed11y-small'>" + level + "</span> " +
              liPrefix + outlinePrefix + el.textContent +
              "</li>";
        }
      });

      // Check for blockquotes used as headings. If it's less than 25
      // characters - it's probably not a blockquote.
      let blockquotes = Ed11y.root.querySelectorAll('blockquote');
      blockquotes.forEach((el) => {
        let text = Ed11y.getText(el);
        if (text.length < 25) {
          let dismissalKey = Ed11y.dismissalKey(text);
          Ed11y.results.push([el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageshowBlockquote, "blockquoteLength", dismissalKey]);
        }
      });

    };

    /*======================== INPUTS MODULE =======================*/
    // todo: implement this module.

    /*================== ALTERNATIVE TEXT MODULE ====================*/
    // todo: https://ryersondmp.github.io/sa11y/examples/headings-images.html

    // todo: flagging alts referencing position or color?
    // todo: empty alt with figcaption present blows up figure. code in Sa11y. see https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element and https://www.scottohara.me/blog/2019/01/21/how-do-you-figure.html
    Ed11y.checkAltText = () => {

      // Test each image for alternative text.
      Ed11y.AllImages.forEach((el) => {
        let alt = el.getAttribute("alt");
        let src = el.getAttribute("src");
        let parentLink = el.closest('a[href]');
        // todo this is now true/false rather than a length measure

        if (typeof alt !== "string") {
          Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yGeneralAltText]);
        }
        else if (alt.length === 0 && !parentLink) {
          // Empty alt inside a link tested in link checks.
          let dismissalKey = Ed11y.dismissalKey(src);
          Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltDecorative, "decorativeImage", dismissalKey]);
        }

        // If alt attribute is present, further tests are done.
        else {
          let error = Ed11y.containsAltTextStopWords(alt);
          let altText = Ed11y.sanitizeForHTML(alt);

          // Image fails if a url was found.
          // Todo: add images-in-links to test page coverage.
          if (!!parentLink) {
            if (error[0] !== null) {
              Ed11y.results.push([parentLink, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageAltUrl(altText)]);
            }
            else if (error[1] !== null) {
              // "image of"
              let dismissalKey = Ed11y.dismissalKey(src + altText);
              Ed11y.results.push([parentLink, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltImageOfLinked(error, altText), "AltImageOfLinked", dismissalKey]);
            }
            else if (alt.length > 160) {
              // Image warning if it is a link and contains long alt text.
              let dismissalKey = Ed11y.dismissalKey(src + altText);
              Ed11y.results.push([parentLink, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltLongLinked(alt, altText), "AltLongLinked", dismissalKey]);
            }
            // Image warning if it is a link, contains alt text AND
            // surrounding link text.
                // todo: need to remove ignored link text
            else if (alt !== "" && Ed11y.linkText(parentLink.textContent).length > 1) {
              let dismissalKey = Ed11y.dismissalKey(src + altText);
              Ed11y.results.push([parentLink, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltLinkComplex(altText), "AltLinkComplex", dismissalKey]);
            }
          }
          // Now if there is no link...
          else if (error[0] !== null) {

            Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageAltFilename(altText)]);
          }
          else if (error[1] !== null) {
            let dismissalKey = Ed11y.dismissalKey(src + altText);
            Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltImageOf(error, altText),"AltImageOf", dismissalKey]);
          }
          // Alert with deadspace alt.
          else if (alt !== "" && alt.replace(/"|'|\s+/g, "") === "") {

            Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageAltDeadspace]);
          }
          // Image error if alt text is too long.
          else if (alt.length > 160) {
            let dismissalKey = Ed11y.dismissalKey(src + altText);
            Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltTooLong(alt, altText),"AltTooLong", dismissalKey]);
          }
        }
      });
    };

    Ed11y.linkText = (linkText) => {
      linkText = linkText.replace(ed11yIgnoreLinkStrings,"");
      linkText = linkText.replace(/'|"|-|\.|\s+/g, '');
      return linkText;
    }

    // Checks if text is not descriptive and returns the word(s) that are
    // making the text inaccessible.
    Ed11y.containsAltTextStopWords = function (alt) {
      let altUrl = [".png", ".jpg", ".jpeg", ".gif"];
      let suspiciousWords = ["image of", "graphic of", "picture of", "placeholder", "photo of"];
      let hit = [null, null];
      altUrl.forEach((string) => {
        if (alt.toLowerCase().indexOf(string) >= 0) {
          hit[0] = string;
        }
      })
      suspiciousWords.forEach((string) => {
        if (alt.toLowerCase().indexOf(string) >= 0) {
          hit[1] = string;
        }
      })
      return hit;
    };

    /*====================== LINK TEXT MODULE =======================*/

    // Toggles the outline of all inaccessible link texts.
    Ed11y.checkLinkText = function () {
      // Todo: See if there is an alternative to :visible that shows only visually hidden content.
      // Todo: Add test for consecutive links to same href?
      // Todo: remove linkIgnore
      // todo: parameterize stopwords as in Sa11y

      Ed11y.allLinks.forEach((el) => {
        // todo: investigate sa11y computation
        let linkText = Ed11y.computeAriaLabel(el);
        let img = el.querySelectorAll('img');
        let hasImg = img.length > 0;
        // todo: test downloadmatch
        let downloadMatch = false;
        // todo parameter
        ed11yDownloadLinks.forEach((string) => {
          let withQuery = string + "?";
          if (linkText.lastIndexOf(string) === 0 || linkText.indexOf(withQuery) > -1) {
            return true;
          }
        });
        // todo: ends with, or contains including a ?
        if (linkText === 'noAria') {
          linkText = Ed11y.getText(el);
          if (hasImg) {
            img.forEach((el) => {
              let imgText = Ed11y.computeAriaLabel(el);
              if (imgText !== 'noAria') {
                linkText += imgText;
              }
              else {
                if (el.hasAttribute('alt')) {
                  linkText += el.getAttribute('alt');
                }
                else if (el.hasAttribute('src')) {
                  linkText += el.getAttribute('src');
                }
              }
            });
            // This only checks the alt, not aria-label
            hasImg = true;
          }
        }
        if (el?.getAttribute('target') === '_blank' && downloadMatch === false && linkText.indexOf('tab') === -1 && linkText.indexOf('window') === -1 && linkText.indexOf('external') === -1) {
          // Warn about unwarned new windows before ignoreString strip.
          let dismissalKey = Ed11y.dismissalKey(linkText);
          Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-link-text-warning", 'ed11y-warning-btn', ed11yMessageQANewTab, "QANewTab", dismissalKey]);
        }
        linkText = linkText.replace(ed11yIgnoreLinkStrings,"");
        let linkStrippedText = linkText.replace(/'|"|-|\.|\s+/g, '');

        // Tests to see if this link is empty
        // Todo add to test coverage
        if (linkStrippedText.length === 0) {
          linkStrippedText += !!Ed11y.computeTitle(el) ? Ed11y.computeTitle(el) : "";
          if (linkStrippedText.length === 0) {

            if (hasImg) {
              Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageLinkHasNoText]);
            }
            else {
              Ed11y.results.push([el, 'before', 'ed11y-inline-block', "ed11y-link-text-fail", 'ed11y-error-btn', ed11yMessageLinkHasNoText]);
            }
          }
        }
        else {
          // Check for links with generic or URL titles
          let error = Ed11y.containsLinkTextStopWords(linkText.trim());
          if (error !== "none") {
            let dismissalKey = Ed11y.dismissalKey(linkText);
            let stopWordMessage = "";
            if (error === "url") {
              // Url
              stopWordMessage = ed11yMessagelinkTextIsURL;
            }
            else if (error === "generic") {
              stopWordMessage = ed11yMessagelinkTextIsGeneric;
            }
            Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-link-text-warning", 'ed11y-warning-btn', stopWordMessage, "LinkTextIsGeneric", dismissalKey]);
          }
        }
        //Warning: Find all PDFs. Although only append warning icon to
        // first PDF on page.
        if (!hasImg && downloadMatch > 0) {
          let dismissalKey = Ed11y.dismissalKey(el?.getAttribute("src"));
          el.classList.add('ed11y-text-warning');
          Ed11y.results.push([el, 'after', 'ed11y-instance-inline', "", 'ed11y-warning-btn', ed11yMessageLinkDownload, "LinkDownload", dismissalKey]);
        }
      });
    };

    // Checks if text is not descriptive and returns the word(s) that are
    // making the text inaccessible. stopWords will flag hyperlinks in
    // link titles. partialStopWords looks for links entirely made of
    // generic words. Note that this was extensively rewritten.
    Ed11y.containsLinkTextStopWords = function (textContent) {
      // todo: use regex to find any three-letter TLD followed by a slash.
      // todo: parameterize TLD list
      let stopWords = ["http:/", "https:/", ".asp", ".htm", ".php", ".edu/", ".com/"];
      let partialStopRegex = /learn|to|more|now|this|page|link|site|website|check|out|view|our|read|\.|,|:|download|form|here|click|>|<|\s/g;
      let hit = 'none';

      if (textContent.replace(partialStopRegex, '').length === 0) {
        // If no partial words were found, then check for total words.
        hit = 'generic';
      }
      else {
        for (let i = 0; i < stopWords.length; i++) {
          if (textContent.indexOf(stopWords[i]) > -1) {
            hit = 'url';
            break;
          }
        }
      }

      return hit;
    };

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

    /*================== QUALITY ASSURANCE MODULE ===================*/

    Ed11y.checkQA = function () {

      // Detect paragraphs that should be lists: a. A. a) A) * - -- •.
      let activeMatch = "";
      let firstText = "";
      let prefixDecrement = {
        b: "a",
        B: "A",
        2: "1"
      };
      let prefixMatch = /a\.|a\)|A\.|A\)|1\.|1\)|\*\s|-\s|--|•\s|→\s|✓\s|✔\s|✗\s|✖\s|✘\s|❯\s|›\s|»\s/;
      let decrement = function (el) {
        return el.replace(/^b|^B|^2/, function (match) {
          return prefixDecrement[match];
        });
      };
      Ed11y.allP.forEach((p,i) => {

        // Detect possible lists.
        let firstPrefix = "";
        let secondText = false;
        let hit = false;
        if (!firstText) {
          let firstText = Ed11y.getText(p);
          firstPrefix = firstText.substring(0, 2);
        }
        // Grab first two characters.
        if (firstPrefix.length > 0 && firstPrefix !== activeMatch && firstPrefix.match(prefixMatch)) {
          // We have a prefix and a possible hit; check next detected paragraph.
          // Note these paragraphs may not be siblings in the DOM...
          let secondP = Ed11y.allP[i + 1];
          if (!!secondP) {
            secondText = Ed11y.getText(secondP);
            let secondPrefix = decrement(secondText.substring(0, 2));
            if (firstPrefix === secondPrefix) {
              // Note: this will flag <p>1. + <p>1.
              hit = true;
            }
          }
          if (!hit) {
            // Split p by carriage return if present and compare.
            let hasBreak = p?.querySelector("br")?.nextSibling?.nodeValue;
            if (hasBreak) {
              hasBreak = hasBreak.replace(/<\/?[^>]+(>|$)/g, "").trim();
              if (firstPrefix === decrement(hasBreak.substring(0, 2))) {
                hit = true;
              }
            }
          }
          if (hit) {
            let dismissalKey = Ed11y.dismissalKey(firstText);
            let ed11yShouldBeList = ed11yMessageQAShouldBeList(firstPrefix);
            Ed11y.results.push([p, 'prepend', 'ed11y-instance-inline', '', 'ed11y-warning-btn', ed11yShouldBeList, "ShouldBeList", dismissalKey]);
            activeMatch = firstPrefix;
          }
          else {
            activeMatch = "";
          }
        }
        else {

          // Now check for possible header.
          let possibleHeader = p.querySelector('strong, b');
          if (!!possibleHeader) {
            possibleHeader = Ed11y.getText(possibleHeader);
            let maybeSentence = possibleHeader.match(/[.:;"']$/) !== null;
            if (121 > possibleHeader.length > 0 && maybeSentence === false && possibleHeader.length === firstText.length) {
              let dismissalKey = Ed11y.dismissalKey(firstText);
              Ed11y.results.push([p, 'prepend', 'ed11y-instance-inline', "", 'ed11y-warning-btn', ed11yMessageQAMayBeHeader, "QAMayBeHeader", dismissalKey]);
            }
          }
        }

        // Reset for next loop, carry over text query if available.
        firstText = secondText ? "" : secondText;
      });

      // Warning: Detect uppercase. For each element, if it contains more
      // than 4 uppercase words in a row, indicate warning.
      // Uppercase word is anything that is more than 3 characters.
      // Todo check performance of new regex.
      Ed11y.allH.forEach((el) => {
        Ed11y.checkCaps(el);
      });
      Ed11y.allP.forEach((el) => {
        Ed11y.checkCaps(el);
      });
      Ed11y.allBlockquote.forEach((el) => {
        Ed11y.checkCaps(el);
      });
      Ed11y.allLists.forEach((el) => {
        Ed11y.checkCaps(el);
      });
      
            // Check if a table has a table header.
      Ed11y.allTables.forEach((el) => {
        let findTHeaders = el?.querySelectorAll("th");
        let findHeadingTags = el?.querySelectorAll("h1, h2, h3, h4, h5, h6");
        if (!findTHeaders) {
          Ed11y.results.push([el, 'before', 'ed11y-instance', 'ed11y-error-border', 'ed11y-error-btn', ed11yMessageMissingQATableHeadings]);
        }
        else {
          // Make sure all table headers are not empty.
          findTHeaders.forEach((th) => {
            if (Ed11y.getText(th).length < 1 && !Ed11y.computeTitle(th)) {
              Ed11y.results.push([th, 'prepend', 'ed11y-instance', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageEmptyTableHeader]);
            }
          });
        }
        if (!!findHeadingTags) {
          // todo: have results escalate errors over warnings when both present
          findHeadingTags.forEach((h) => {
            Ed11y.results.push([h, 'before', 'ed11y-instance', 'ed11y-error-border', 'ed11y-error-btn', ed11yMessageQAHeaderInTable]);
          });
        }
      });

      // Check frames, audio and video
      let video = Ed11y.srcMatchesOptions(Ed11y.allFrames, options.videoContent);
      video = video.concat(Ed11y.allVideo);
      if (video.length > 0) {
        video.forEach(el => {
          Ed11y.mediaCount++;
          // Dismiss-able alert. False positive accepted on undefined sources.
          let dismissKey = Ed11y.dismissalKey(el.hasAttribute('src') ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
          Ed11y.results.push([el, 'before', 'ed11y-instance', "", 'ed11y-warning-btn', ed11yMessageshowCaptions, "captions", dismissKey]);
        })
      }

      let audio = Ed11y.srcMatchesOptions(Ed11y.allFrames, options.audioContent);
      audio = audio.concat(Ed11y.allAudio);
      if (audio.length > 0) {
        audio.forEach(el => {
          Ed11y.mediaCount++;
          // Dismiss-able alert. False positive accepted on undefined sources.
          let dismissKey = Ed11y.dismissalKey(el.hasAttribute('src') ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
          Ed11y.results.push([el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessagePodcast, "transcripts", dismissKey]);
        })
      }

      let visualizations = Ed11y.srcMatchesOptions(Ed11y.allFrames, options.dataVizContent);
      if (visualizations.length > 0) {
        visualizations.forEach(el => {
          // Dismiss-able alert. False positive accepted on undefined sources.
          let dismissKey = Ed11y.dismissalKey(el.getAttribute('src'));
          Ed11y.results.push([el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageVisualization, "visualization", dismissKey]);
        })
      }

      // Warning: Twitter keyboard trap
      let twits = Ed11y.srcMatchesOptions(Ed11y.allFrames, options.twitterContent);
      if (twits.length > 0) {
        twits.forEach(twit => {
          let numberOfTweets = twit.querySelectorAll(".timeline-TweetList-tweet");
          if (!!numberOfTweets && numberOfTweets > 3) {
            Ed11y.results.push([twit,'before','ed11y-instance',"ed11y-text-warning",'ed11y-warning-btn',ed11yMessageTwitter]);
          }
        })
      }


      if (options.embeddedContent.length > 1) {
        let embed = Ed11y.srcMatchesOptions(Ed11y.allFrames, options.embeddedContent);
        embed.forEach((el) => {
          Ed11y.results.push([el, 'before', 'ed11y-instance', 'ed11y-warning-border', 'ed11y-warning-btn', ed11yMessageEmbeddedContent]);
        });
      }

    };

    Ed11y.checkCaps = function(el) {
      let thisText = "";
      if (el.tagName ==='LI') {
        // Prevent recursion through nested lists.
        el.childNodes.forEach ((node) => {
          if (node.nodeType === 3) {
            thisText += node.textContent;
          }
        });
      }
      else {
        thisText = Ed11y.getText(el);
      }
      let uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      let detectUpperCase = thisText.match(uppercasePattern);

      if (detectUpperCase && detectUpperCase[0].length > 10) {
        let dismissalKey = Ed11y.dismissalKey(thisText);
        Ed11y.results.push([el, 'prepend', 'ed11y-instance-inline', 'ed11y-uppercase-warning', 'ed11y-warning-btn', ed11yMessageQAUppercase, "QAUppercase", dismissalKey]);
      }
    }

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
      Ed11y.readyTips(true);
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
      if (ed11yContainerIgnore.length > 0) {
        let containerSelectors = ed11yContainerIgnore.split(',');
        for (let i = 0; i < containerSelectors.length; i++) {
          containerSelectors[i] = containerSelectors[i] + " *, " + containerSelectors[i];
        }
        ed11yContainerIgnore = containerSelectors.join() + separator + '[aria-hidden]';
      }
      else {
        ed11yContainerIgnore = '[aria-hidden]';
      }
      Ed11y.containerIgnore = ed11yContainerIgnore;

      // Images ignore defaults plus presentation role.
      if (ed11yImageIgnore.length > 1) {
        ed11yImageIgnore += separator;
      }
      Ed11y.imageIgnore = ed11yImageIgnore + Ed11y.containerIgnore + separator + "[role='presentation']";

      Ed11y.headerIgnore = ed11yHeaderIgnore;

      // LinkIgnore is superset of containerIgnore, which is never empty.
      Ed11y.linkIgnore = ed11yContainerIgnore;
      if (ed11yLinkIgnore.length > 0) {
        Ed11y.linkIgnore += separator + ed11yLinkIgnore;
      }

      if (ed11yHeaderIgnore.length > 0) {
        Ed11y.headerIgnore += separator + ed11yContainerIgnore;
      }
      else {
        Ed11y.headerIgnore = ed11yContainerIgnore;
      }

      Ed11y.localData = localStorage.getItem("Ed11y.localData");
      Ed11y.localDataParsed = Ed11y.localData ? JSON.parse(Ed11y.localData) : {};
      Ed11y.currentPage = btoa(encodeURIComponent(window.location.pathname));

    };
    Ed11y.readyPop = function (el, text) {
      let thisText = "";
      let merge = 0;
      if (text) {
        thisText += text;
        merge++;
      }
      if (el.hasAttribute('data-ed11y-tip')) {
        let thisFlag = el.getAttribute('data-ed11y-tip').split(',');
        thisFlag.forEach(function (i) {
          thisText += Ed11y.results[i][5];
          if (!!Ed11y.results[i][7]) {
            thisText += "<button class='ed11y-dismiss-this' data-ed11y-action='ok' data-ed11y-test='" + Ed11y.results[i][6] + "' data-ed11y-id='" + i + "'>Mark as OK</button>" +
                "<button class='ed11y-dismiss-this' data-ed11y-action='ignore' data-ed11y-test='" + Ed11y.results[i][6] + "' data-ed11y-id='" + i + "'>Can't be fixed</button>";
          }
        });
        merge++;
      }
      let thisContent = document.createElement('div');
      thisContent.classList.add('ed11y-tip', 'ed11y-reset');
      thisContent.innerHTML = '<span class="ed11y-arrow"></span><button class="ed11y-button ed11y-close-tip" type="button" aria-expanded="false" aria-label="close">&times;</button><div class="ed11y-tip-content">' +
          thisText + '</div>';
      if (merge > 1) {
        // todo move thisText into a textContent sanitized injection.
        // todo add to test coverage
        el.nextElementSibling.querySelector('.ed11y-tip-content').HTML = thisContent;
      }
      else {
        el.classList.add('ed11y-tip-ready');
        el.insertAdjacentElement('afterend', thisContent);
        let closeButton = el.nextElementSibling.querySelector('.ed11y-close-tip');
        closeButton.addEventListener('click', () => {Ed11y.closeTip(closeButton)});
      }
      let dismissButton = el.nextElementSibling.querySelector('.ed11y-dismiss-this');
      dismissButton?.addEventListener('click', () => {
        let id = dismissButton.dataset.ed11yId;
        let action = dismissButton.dataset.ed11yAction;
        let test = dismissButton.dataset.ed11yTest;
        Ed11y.dismissThis(action, test, id);
      });
    };
    Ed11y.closeTip = function (closeButton) {
      let tip = closeButton.parentElement;
      tip.classList.add('ed11y-hidden');
      tip.classList.remove('ed11y-tip-open');
      tip.style.transform = 'initial';
      let toggle = tip.previousElementSibling;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.add('ed11y-clicked');
      Ed11y.resetClass(['ed11y-force-overflow']);
    }
    Ed11y.dismissalKey = function (text) {
      return String(btoa(unescape(encodeURIComponent(text)))).substring(0,128);
    }
    Ed11y.dismissThis = function (action, test, id) {
      let dismissalKey = Ed11y.results[id][7];
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
      // todo this removes the tip and button but leaves classes
      let removal = document.querySelector('.ed11y-tip-open').parentNode;
      removal.parentNode.removeChild(removal)
      // todo put focus somewhere that makes sense
      // todo clear wrapper styles e.g. heading
      // todo Ed11y.warning or errorCount--;
      // todo Ed11y.dismissedCount++;
      localStorage.setItem('ed11ydismissed', JSON.stringify(Ed11y.dismissedAlerts));
      Ed11y.results.splice(id, 1);
      Ed11y.updateCount('quick');
      window.setTimeout( function() {
        document.getElementById("ed11y-results").focus();
      }, 100);
    };

    Ed11y.readyTips = function (show) {
      // This function is VERY expensive.
      // Todo: optimize?
      // For now: throw chunks to the end of the render queue to prevent
      // thread locking.
      
      Ed11y.results?.forEach(function (el, index) {
        // todo: need to change all at once.
        Ed11y.markResult(el, index);
      });
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
            let width = imgStyles.width;
            let height = imgStyles.height;
            let injectAlt = document.createElement('div');
            injectAlt.classList.add('ed11y-container', 'ed11y-reveal-alts', 'ed11y-reset');
            injectAlt.setAttribute('style', 'width:' + width + ' !important; height:' + height + ' !important;');
            injectAlt.innerHTML = '<span>' + Ed11y.panelToggleIcon + 'Alt: ' + alt + '</span></div>';
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
      window.setTimeout(function () {
        // todo: this selector is ew
        Ed11y.pops = Array.from(Ed11y.root.querySelectorAll('button.ed11y-pop')).filter(el => !el.querySelector('[id^="ed11y"]'));
        let windowWidth = window.innerWidth;
        // Reading and writing styles creates thrashing. We must read
        // first.
        Ed11y.popNudges = [];
        Ed11y.pops.forEach(el => {
          let offset = el.parentNode.getBoundingClientRect();
          let offsetData = 0;
          if (offset.left < 8) {
            // Nudge right
            // do we need document.body.scrollLeft ?
            offsetData = 8 - offset.left;
          }
          else if (offset.left + 40 > windowWidth) {
            // Nudge left
            offsetData = offset.left - windowWidth - 40;
          }
          Ed11y.popNudges.push([el, offsetData]);
        });
        Ed11y.popNudges.forEach(function (el, i) {
          if (el[1] === 0) {
            // todo convert from camel to dash in getter
            // todo: is this still used anywhere? CSS?
            el[0].dataset.ed11yTipNudge = el[1];
            el[0].setAttribute('id', 'ed11y-pop-' + i);
          }
          else {
            el[0].setAttribute('style', 'transform:translate(' + el[1] + 'px, 0) !important;');
            el[0].dataset.ed11yTipNudge = el[1];
            el[0].setAttribute('id', 'ed11y-pop-' + i);
          }
        });
        let toggles = Array.from(document.getElementsByClassName('ed11y-pop'));
        toggles.forEach(toggle => {
          toggle.addEventListener('click', (event) => {
            event.preventDefault();
            Ed11y.popThis(toggle, 'click');
          });
        })
        //$el.on('touchend click', (function (event) {
        // todo: handle keyboard, and can you have dual event listeners???
        // todo: need need touchend back to fix mouse functions
        //.onclick = Ed11y.popThis(el, 'click');
        // todo: Probably need to remove listener at some point.
        // todo: commented out hovers
        /*if (el.getAttribute('aria-expanded' === 'false')) {
          el.addEventListener('mouseenter', function () {
            Ed11y.popThis(el, 'hover');
          });
        };*/
        // If the button will be offscreen, nudge it left or right to
        // fit.
        document.querySelector('body').classList.add('ed11y-pops-ready');
      }, 0);
    };

    Ed11y.popThis = function (el, trigger) {
      if (!Ed11y.doubleClickPrevent) {
        let isNew = false;
        if (!el?.classList.contains('ed11y-tip-ready')) {
          isNew = true;
          Ed11y.readyPop(el, '');
        }
        let tip = el.nextElementSibling;
        if (isNew === true) {
          Ed11y.watchPop(el, tip);
        }
        if (el.getAttribute('aria-expanded') === 'true' && trigger === 'click') {
          // Close on click.
          el.setAttribute('aria-expanded', 'false');
          el.classList.add('ed11y-clicked');
          el.classList.remove('ed11y-hover');
          tip.classList.add('ed11y-hidden');
          tip.classList.remove('ed11y-tip-open');
          tip.setAttribute('style', '');
          // todo: check this...
          el.closest('.ed11y-force-overflow')?.classList.remove('ed11y-force-overflow');
        }
        else if (!!el.getAttribute('aria-expanded')) {
          let needToAlign;
          if (trigger === 'click') {
            // Open on click.
            let openTips = document.getElementsByClassName('ed11y-tip-open');
            if (!!openTips) {
              Array.from(openTips).forEach(tip => {
                tip.classList.remove('ed11y-tip-open');
                tip.previousElementSibling.setAttribute('aria-expanded','false');
              })
            }
            el.setAttribute('aria-expanded', 'true');
            el.classList.remove('ed11y-hover');
            tip.classList.remove('ed11y-hidden');
            tip.classList.add('ed11y-tip-open');
            needToAlign = true;
          }
          else if (!el.classList.contains('ed11y-hover')) {
            // Open on hover
            let otherPops = document.querySelectorAll('.ed11y-pop:not(.ed11y-hover)');
            otherPops.forEach(el => {
              if (el.getAttribute('aria-expanded') === 'false') {
                el.classList.remove('ed11y-hover', 'ed11y-clicked', 'ed11y-tip-open');
                el.setAttribute('aria-expanded', 'false');
                el.nextElementSibling.classList.remove('ed11y-tip-open');
              }
            })
            el.classList.add('ed11y-hover');
            tip.classList.remove('ed11y-hidden');
            tip.classList.add('ed11y-tip-open');
            needToAlign = true;
          }
          if (needToAlign === true) {
            // Dispatch an event that a tooltip has appeared.
            document.dispatchEvent(new CustomEvent("ed11yPop", {
              detail: {id: el.getAttribute('id')}
            }));

            if (ed11yAllowOverflow.length > 0) {
              // todo parameter
              el.closest(ed11yAllowOverflow).classList.add('ed11y-force-overflow');
            }
            else {
              let parents = Ed11y.parents(el);
              parents.forEach(parent => {
                let parentStyles = window.getComputedStyle(parent);
                if (parentStyles.getPropertyValue('overflow') === 'hidden') {
                  parent.classList.add('ed11y-force-overflow');
                }
              });
            }
            Ed11y.alignTip(el, tip);
            // todo looping throws an error after elements are removed
            /*Ed11y.goto = parseInt(el.getAttribute('id').substring(10));
            // Update the panel
            Ed11y.gotoText = 'next';
            if (Ed11y.gotoCount === 1) {
              Ed11y.gotoText = '';
            }
            else if (Ed11y.gotoCount - 1 === Ed11y.goto) {
              Ed11y.goto = 0;
              Ed11y.gotoText = 'first';
            }
            else {
              Ed11y.goto++;
            }
            window.setTimeout(function () {
              document.querySelector('.ed11y-jump').textcontent = Ed11y.gotoText;
            }, 250);*/
          }
        }
      }
      Ed11y.doubleClickPrevent = true;
      window.setTimeout(function () {
        Ed11y.doubleClickPrevent = false;
      }, 200);
      return false;
    };

    Ed11y.alignTip = function (el, tip) {
      tip.setAttribute('style','');
      tip.classList.remove('ed11y-tip-left', 'ed11y-tip-under');
      let arrow = tip.querySelector('.ed11y-arrow');
      arrow.style.left = 'initial';
      let buttonOffset = el.getBoundingClientRect();
      let buttonLeft = buttonOffset.left + document.body.scrollLeft;
      let buttonWidth = el.offsetWidth;
      let tipOffset = tip.getBoundingClientRect();
      let tipLeft = tipOffset.left + document.body.scrollLeft;
      let tipWidth = tip.offsetWidth;
      let windowWidth = window.innerWidth;
      let roomToLeft = buttonLeft - tipWidth - 50;
      let roomToRight = windowWidth - (buttonLeft + tipWidth + 90);
      if (roomToRight < 0) {
        // Can't go right.
        if (roomToLeft > 0) {
          // Go left if there is room.
          tip.classList.add('ed11y-tip-left');
          let targetOffset = buttonLeft - tipWidth - buttonWidth - 2;
          let nudge = targetOffset - tipLeft;
          tip.style.transform = 'translate(' + nudge + 'px) !important;';
          arrow.removeAttribute('style');
        }
        else {
          // Go under if there is not.
          tip.classList.add('ed11y-tip-under');
          let nudgeY = 58;
          // we don't want to hit the right edge maybe that's all we should worry about?
          let targetOffsetX = 5;
          let nudgeX = targetOffsetX - tipLeft;
          let arrowTranslateY = -26;
          let arrowTranslateX = buttonLeft + 11;
          tip.setAttribute('style', 'transform: translate(' + nudgeX + 'px, ' + nudgeY + 'px) !important;');
          arrow.setAttribute('style', 'transform: translate(' + arrowTranslateX + 'px, ' + arrowTranslateY + 'px) rotate(135deg) !important;');
        }
      }
      else {
        // Go right.
        let tipTranslateX = buttonWidth + 26;
        tip.setAttribute('style', 'transform: translate(' + tipTranslateX + 'px, 4px) !important;');
        arrow.removeAttribute('style');
      }
    };

    Ed11y.tipHoverAffordance = function (el, tip) {
      if (tip.matches('div:hover') === false && el.matches('div:hover') === false && el.matches('button.ed11y-hover') === true) {
        window.setTimeout(function () {
          if (tip.matches('div:hover') === false && el.matches('button:hover') === false) {
            // Close on de-hover
            el.classList.remove('ed11y-hover', 'ed11y-clicked');
            el.setAttribute('aria-expanded', 'false');
            tip.classList.remove('ed11y-tip-open');
            // todo does this need to use the reset?
            el.closest('.ed11y-force-overflow')?.classList.remove('ed11y-force-overflow');
          }
        }.bind(el, tip), 500);
      }
    };

    Ed11y.watchPop = function (el, tip) {
      el.addEventListener('mouseleave', function () {
        Ed11y.tipHoverAffordance(el, tip);
      });
      tip.addEventListener('mouseleave', function () {
        Ed11y.tipHoverAffordance(el, tip);
      });
    };
    // Todo move this to CSS
    Ed11y.panelToggleIcon = "<svg role='img' focusable='false' width='28px' height='28px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

    Ed11y.buildPanels = function (onLoad) {
      if (onLoad === true) {
        // Create a floating button and hidden divs that contain
        // success/warning message.

        document.querySelector('body').appendChild(ed11yPanel);
        Ed11y.panel = document.getElementById('ed11y-panel');
        Ed11y.panelToggle = Ed11y.panel.querySelector('#ed11y-main-toggle');
        Ed11y.panelMessage = Ed11y.panel.querySelector('#ed11y-results');
        Ed11y.panelCount = Ed11y.panel.querySelector('.ed11y-count');
        Ed11y.panelJumpNext = Ed11y.panel.querySelector('.ed11y-jump-next');

        // Handle main toggle button.
        // todo jQuery handled keyboard press, abstract this and emulate
        Ed11y.panelToggle.onclick = function (event) {
          event.preventDefault();
          if (!Ed11y.doubleClickPrevent) {
            // Prevent clicking during scan.
            if (Ed11y.running !== true) {
              Ed11y.running = true;

              // Rescan on open, or shut.
              if (Ed11y.panel.classList.contains('ed11y-panel-shut') === true) {
                Ed11y.checkAll(false, "show");
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

        // Handle jumps
        let jumpLink = Ed11y.panel.querySelector('.ed11y-jump');
        const handleJump = event => {
          event.preventDefault();
          // Find our button.
          // todo do we need to jump over dismissed alerts?
          let goNum = parseInt(jumpLink.dataset.ed11yGoto);
          let goMax = Ed11y.results.length - 1;
          goNum = goNum > goMax ? 0 : goNum;
          Ed11y.goto = Ed11y.root.querySelector('#ed11y-pop-' + goNum);
          let offsetCalc = Ed11y.goto.getBoundingClientRect();
          let bodyStyles = window.getComputedStyle(document.querySelector('body'));
          Ed11y.gotoOffset = offsetCalc.top - parseInt(bodyStyles.getPropertyValue('padding-top')) - 50;
          // Throw an alert if the button or target is hidden.
          let firstVisible = false;
          let target = Ed11y.goto.parentNode;
          let insert = Ed11y.goto.getAttribute('data-ed11y-inserted');
          if (insert === "before") {
            target = target.nextElementSibling;
          }
          else if (insert === "prepend") {
            target = target.parentNode;
          }
          else {
            target = parent.previousElementSibling;
          }
          let alertMessage;
          // todo mvp do these match tests work?
          if (ed11yHiddenHandlers.length > 0 && !!target.closest(ed11yHiddenHandlers)) {
            document.dispatchEvent(new CustomEvent("ed11yShowHidden", {
              detail: {id: Ed11y.goto.getAttribute('id')}
            }));
            window.setTimeout(function () {
              // Recalculate before jump.
              offsetCalc = Ed11y.goto.getBoundingClientRect();
              Ed11y.gotoOffset = offsetCalc.top - parseInt(bodyStyles.getPropertyValue('padding-top')) - 50;
              document.querySelector('html, body').animate({
                scrollTop: (Ed11y.gotoOffset)
              }, 1);
              Ed11y.popThis(Ed11y.goto, 'click');
              Ed11y.goto.focus();
            }, 500);
          }
          else {
            if (!Ed11y.visible(target)) {
              firstVisible = Ed11y.firstVisibleParent(Ed11y.goto);
              alertMessage = ed11yInvisibleTip;
            }
            else if (!!Ed11y.goto.closest('[aria-hidden="true"]') || !!target.closest('[aria-hidden="true"]')) {
              firstVisible = Ed11y.firstVisibleParent(Ed11y.goto.closest('[aria-hidden="true"]'));
              alertMessage = ed11yHiddenTip;
            }
            if (!!firstVisible) {
              alert(alertMessage);
              firstVisible.classList.add('ed11y-hidden-highlight');
              let highlightContainer = document.createElement('div');
              highlightContainer.setAttribute('tabindex', '-1');
              highlightContainer.classList.add('ed11y-sr-only', 'ed11y-hidden-highlight-' + Ed11y.goto);
              highlightContainer.textContent = "Highlighted container";
              offsetCalc = Ed11y.goto.getBoundingClientRect();
              Ed11y.gotoOffset = offsetCalc.top - parseInt(bodyStyles.getPropertyValue('padding-top')) - 50;
              Ed11y.popThis(Ed11y.goto, 'click');
              let thisGoTo = '.ed11y-hidden-highlight-' + Ed11y.goto;
              document.querySelector(thisGoTo).focus();
            }
            else {
              // Go to the button.
              document.querySelector('html, body').animate({
                scrollTop: (Ed11y.gotoOffset)
              }, 1);
              Ed11y.goto.focus();
              Ed11y.popThis(Ed11y.goto, 'click');
            }
          }
          goNum = goNum === goMax ? 0 : goNum + 1;
          jumpLink.dataset.ed11yGoto = goNum;
          if (goNum === 0) {
            // Todo translate
            Ed11y.panelJumpNext.innerText = "first";
          } else {
            Ed11y.panelJumpNext.innerText = "next";
          }
        };
        jumpLink.addEventListener('click', handleJump);

        let minimizeButton = Ed11y.panel.querySelector('.ed11y-minimize');
        Ed11y.minimize = function (event) {
          event.preventDefault();
          let pressed = minimizeButton.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'
          minimizeButton.setAttribute('aria-pressed', pressed);
          Ed11y.panel.classList.toggle('ed11y-panel-minimized');
        };
        minimizeButton.addEventListener('click', Ed11y.minimize);

        let aboutButton = Ed11y.panel.querySelector('.ed11y-about');
        let aboutPanel = function(event) {
          event.preventDefault();
          if (aboutButton.getAttribute('aria-pressed') === 'false') {
            aboutButton.setAttribute('aria-pressed', 'true');
            let aboutText = document.createElement('div');
            aboutText.classList.add('ed11y-about-text');
            aboutText.setAttribute('tabindex', '-1');
            aboutText.innerHTML = ed11yAbout;
            let panelUpper = Ed11y.panel.querySelector('#ed11y-panel-upper');
            panelUpper.insertBefore(aboutText, panelUpper.firstChild);
            window.setTimeout(function() {
              Ed11y.panel.querySelector('.ed11y-about-text').focus();
            }, 1500);
          }
          else {
            aboutButton.setAttribute('aria-pressed', 'false');
            Ed11y.panel.querySelector('.ed11y-about-text').remove();
          }
        };
        aboutButton.addEventListener('click', aboutPanel);

        let shutButton = Ed11y.panel.querySelector('#ed11y-shut-panel');
        let shutPanel = function (event) {
          event.preventDefault();
          Ed11y.panelToggle.focus();
          Ed11y.panelToggle.click();
        };
        shutButton.addEventListener('click', shutPanel);

        let upperPanelNextButton = Ed11y.panel.querySelectorAll('.ed11y-upper-next-button');
        let nextUpperPanel = function (event) {
          event.preventDefault();
          let upperPanels = Ed11y.panel.querySelectorAll('.ed11y-outline-header')
          upperPanels.forEach(el => {el.classList.toggle('ed11y-upper-active')});
        };
        upperPanelNextButton.forEach(button => {
          button.addEventListener('click', nextUpperPanel)
        });

        // Handle show requests.
        let showTagButton = Ed11y.panel.querySelector('#ed11y-summary-toggle');
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
        showTagButton.addEventListener('click', showTags);

        let pinAltToImage = function() {
          console.log('tried');
          if (document.getElementById('ed11y-summary-toggle').getAttribute('aria-pressed') === 'true') {
            Ed11y.root.querySelectorAll('img, [role="img"]').forEach((el) => {
              let revealedAlt = el.previousElementSibling?.previousElementSibling;
              if (!!revealedAlt && revealedAlt.matches('.ed11y-reveal-alts')) {
                let elComputedStyle = getComputedStyle(el, null);
                let width = 'width:' + elComputedStyle.width + ' !important; ';
                let height = 'height:' + elComputedStyle.height + ' !important; ';
                // todo mvp
                revealedAlt.setAttribute('style', height + width);
              }
            });
          }
          let tip = Ed11y.root.querySelector('.ed11y-tip-open');
          if (!!tip) {
            let el = tip.previousElementSibling;
            Ed11y.alignTip(el, tip);
          }
        };
        window.addEventListener('resize', pinAltToImage);

        // Escape key on main closes panels.
        let escapeWatch = function(event) {
          if (event.keyCode === 27) {
            if (document.activeElement.closest('#ed11y-panel-upper, #ed11y-summary-toggle, .ed11y-about')) {
              // close upper panel
              let openUpper = Ed11y.panel.querySelectorAll('#ed11y-summary-toggle[aria-pressed], .ed11y-about[aria-pressed]');
              openUpper.forEach(el => {
                el.focus();
                el.click();
              })
            } else if (document.activeElement.closest('.ed11y-instance, .ed11y-instance-inline')) {
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

    Ed11y.getText = function(el) {
      return el.innerText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    }

    Ed11y.resetClass = (el) => {
      el.forEach(el => {
        document.querySelectorAll('.' + el).forEach((x) => x.classList.remove(el));
      })
    };

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

