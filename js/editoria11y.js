class Ed11y {
  'use strict';
  constructor(options) {
    let defaultOptions = {
      checkRoot : "body",
      ed11yAlertMode : "polite",
      ed11yNoRun : "",
      ed11yContainerIgnore : ".project-tagline",
      ed11yEmbeddedContentWarning : "",
      ed11yOutlineIgnore : "",
      ed11yImageIgnore : "",
      ed11yHeaderIgnore : ".project-tagline",
      ed11yLinkIgnore : "",
      ed11yIgnoreLinkStrings : "",
      ed11yAllowOverflow : "",
      ed11yHiddenHandlers : "",
      ed11yDownloadLinks : "a[href$='.pdf'], a[href*='.pdf?'], a[href$='.doc'], a[href$='.docx'], a[href*='.doc?'], a[href*='.docx?'], a[href$='.ppt'], a[href$='.pptx'], a[href*='.ppt?'], a[href*='.pptx?'], a[href^='https://docs.google']",
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
          Ed11y.checkAll(true, 'hide');
        }
      });
    };
    this.initialize();



    // Toggles the outline of all headers, link texts, and images.
    Ed11y.checkAll = async function (onLoad, showPanel) {
      if (!Ed11y.checkRunPrevent()) {
        Ed11y.paints = [];
        Ed11y.paintsJS = [];
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
        // Todo: remove. Placeholder for unconverted jQuery references.
        Ed11y.checkRoot = $(Ed11y.root);
        Ed11y.findElements();

        // Get list of elements already hidden
        let ed11yDismissed = localStorage.getItem("ed11ydismissed");
        Ed11y.dismissedAlerts = ed11yDismissed ? JSON.parse(ed11yDismissed) : {};

        // This is madness, but it prevents jank by allowing other scripts
        // to run between each test group.
        window.setTimeout(function () {
          Ed11y.checklinkText();
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
      // Remove dismissed alerts from the paint array and update count.
      for (let i = Ed11y.paints.length - 1; i >= 0; i--) {
        let dismissKey = Ed11y.paints[i][7];
        dismissKey = typeof dismissKey !== "undefined" ? Ed11y.dismissalKey(dismissKey) : false;
        let testType = Ed11y.paints[i][6];
        // Hide alert if its ID key is in the array.
        if (dismissKey !== false && typeof Ed11y.dismissedAlerts[Ed11y.currentPage] !== "undefined" && typeof Ed11y.dismissedAlerts[Ed11y.currentPage][testType] !== "undefined" && Ed11y.dismissedAlerts[Ed11y.currentPage][testType][dismissKey] !== "undefined") {
          Ed11y.dismissedCount++;
          Ed11y.paints.splice(i, 1);
        } else if (Ed11y.paints[i][3].indexOf("warning") > 0) {
          Ed11y.warningCount++;
        } else {
          Ed11y.errorCount++;
        }
      }
    }

    Ed11y.updatePanel = async function (onLoad, showPanel, showHidden) {
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

    Ed11y.paintButton = function (el, index) {
      // todo: paints are based on jQuery objects. Will need to change all at once.
      // We parse this long array:
      // [0] $el element
      // [1] insertion position
      // [2] is element block or inline
      // [3] wrapper class
      // [4] button class
      // [5] message
      // [6] test shortname
      // [7] ID key for dismissing
      // e.g.: Ed11y.paints.push([$el,'before','ed11y-instance','ed11y-error-border','ed11y-warning-btn',generalAltText]);
      // Warning, error or hidden?
      let icon = '<span class="ed11y-sr-only">Show editorially error</span>';
      if (el[4].indexOf('warning') !== -1) {
        icon = '<span class="ed11y-sr-only">Show editorially warning</span>';
      }
      let injection = '<div class="' + el[2] + ' ed11y-reset"><button type="button" class="' +
          el[4] +
          ' ed11y-pop" style="display:none;" aria-expanded="false" data-ed11y-inserted="' + el[1] + '" data-ed11y-tip="' +
          index +
          '">' + icon + '</button></div>';
      let pretagged = el[0].attr('data-ed11y-marked');
      if (pretagged === 'before') {
        el[0].prev().find('.ed11y-pop').attr('data-ed11y-tip', el[0].prev().find('.ed11y-pop').attr('data-ed11y-tip') + ',' + index);
      }
      else if (pretagged === 'after') {
        el[0].next().find('.ed11y-pop').attr('data-ed11y-tip', el[0].next().find('.ed11y-pop').attr('data-ed11y-tip') + ',' + index);
      }
      else if (pretagged === 'prepend') {
        el[0].find('.ed11y-pop').attr('data-ed11y-tip', el[0].find('.ed11y-pop').attr('data-ed11y-tip') + ',' + index);
      }
      else {
        if (el[1] === 'after') {
          el[0].attr('data-ed11y-marked', 'after').addClass(el[3]).after(injection);
        }
        else if (el[1] === 'before') {
          el[0].attr('data-ed11y-marked', 'before').addClass(el[3]).before(injection);

        }
        else {
          el[0].attr('data-ed11y-marked', 'prepend').addClass(el[3]).prepend(injection);
        }
      }
    };
    Ed11y.paintButtonJS = function (el, index) {
      // todo: paints are based on jQuery objects. Will need to change all at once.
      // We parse this long array:
      // [0] $el element
      // [1] insertion position
      // [2] is element block or inline
      // [3] wrapper class
      // [4] button class
      // [5] message
      // [6] test shortname
      // [7] ID key for dismissing
      // e.g.: Ed11y.paints.push([$el,'before','ed11y-instance','ed11y-error-border','ed11y-warning-btn',generalAltText]);
      // Warning, error or hidden?
      let icon = '<span class="ed11y-sr-only">Show editorially error</span>';
      if (el[4].indexOf('warning') !== -1) {
        icon = '<span class="ed11y-sr-only">Show editorially warning</span>';
      }
      let injection = '<div class="' + el[2] + ' ed11y-reset"><button type="button" class="' +
          el[4] +
          ' ed11y-pop" style="display:none;" aria-expanded="false" data-ed11y-inserted="' + el[1] + '" data-ed11y-tip="' +
          index +
          '">' + icon + '</button></div>';
      let pretagged = el[0].getAttribute('data-ed11y-marked');
      if (pretagged === 'before') {
        let pop = el[0].previousElementSibling;
        let tip = pop.querySelector('.ed11y-pop');
        tip.setAttribute('data-ed11y-tip', index);
      }
      else if (pretagged === 'after') {
        let pop = el[0].nextElementSibling;
        let tip = pop.querySelector('.ed11y-pop');
        tip.setAttribute('data-ed11y-tip', index);
      }
      else if (pretagged === 'prepend') {
        let tip = el[0].querySelector('.ed11y-pop');
        tip.setAttribute('data-ed11y-tip', index);
      }
      else {
        el[0].classList.add(el[3]);
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
        Ed11y.panelNextButton.innerText = totalCount > 1 ? 'first' : '';
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
        Ed11y.panel.classList.remove('ed11y-warnings ed11y-errors');
        Ed11y.panel.classList.add('ed11y-pass');
      }
      if (Ed11y.dismissedCount.length > 0) {
        // Todo dejQuery
        $('#ed11y-show-dismissed').attr('style', 'display: inline-block !important;');
      } else {
        $('#ed11y-show-dismissed').attr('style', 'display: none !important;');
      }
      Ed11y.panel.classList.remove('ed11y-preload');
    };

    // Resets all changes made by the tool. Removing outlines and
    // additional spans.
    Ed11y.reset = function () {

      Ed11y.resetTips();

      // Remove and reset panels and active items.
      Ed11y.panel.querySelectorAll('.ed11y-fullcheck li, .ed11y-about-text').forEach((el) => el.remove());
      Ed11y.panel.classList.add('ed11y-panel-shut');
      Ed11y.panel.classList.remove('ed11y-panel-minimized', 'ed11y-panel-active');
      Ed11y.panelToggle.setAttribute('aria-expanded', false);
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
      $('[data-ed11y-marked]').removeAttr('data-ed11y-marked');
      Ed11y.checkRoot.querySelectorAll('.ed11y-instance, .ed11y-instance-inline, .ed11y-headings-label, .ed11y-reveal-alts').forEach((el) => el.remove());
      Ed11y.checkRoot.querySelectorAll('[data-ed11y-marked]').forEach((el) => el.removeAttribute('data-ed11y-marked'));
    };

    Ed11y.resetClass = function (selectors) {
      selectors.forEach((selector) => {
        document.querySelectorAll('.' + selector).forEach((el) => el.classList.remove(selector));
      })
    }

    // todo continue from heeeere.
    /*================== HEADING STRUCTURE MODULE ===================*/

    Ed11y.checkHeaders = async function () {
      // Reset panel; we rebuild on each run.
      $("#ed11y-outline-list li, .ed11y-headings-label").remove();

      // Only fetch headers within the content area.

      let prevLevel = 0;
      Ed11y.headingOutline = "";

      // Test each header level for accessibility issues.
      Ed11y.$h.each((i, el) => {
        let $el = $(el);
        let level;

        // Match up aria-headers to equivalent <h#> tag.
        if ($el.attr('aria-level')) {
          level = +$el.attr('aria-level');
        }
        else {
          level = +$el[0].tagName.slice(1);
        }
        let headingError = "";
        let outlinePrefix = "";
        let ed11yTip = "";
        let headingText = $el.text();
        let headingLength = headingText.trim().length;
        let dismissKey = false;
        if (level - prevLevel > 1 && i !== 0) {
          headingError = 'ed11y-warning-btn';
          outlinePrefix = '(flagged for skipped level) ';
          dismissKey = Ed11y.dismissalKey(level + headingText);
          ed11yTip = ed11yMessageHeadingLevelSkipped(prevLevel, level);
        }
        if (headingLength < 1) {
          let headingSubText = $el.find('img').attr('alt');
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
        if (headingError !== "" && $el.not(Ed11y.headerIgnore).length !== 0) {
          if ($el.closest("a").length > 0) {
            Ed11y.paints.push([$el.closest('a'), 'before', 'ed11y-instance', "ed11y-link-text-warning", headingError, ed11yTip, "heading", dismissKey]);
          }
          else {
            Ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-link-text-warning", headingError, ed11yTip, "heading", dismissKey]);
          }
          // Outline element if there is an error.
          liClass += " ed11y-text-warning";
          liPrefix = "<span class='ed11y-sr-only'> Warning: </span> ";
        }
        if (outlinePrefix) {
          outlinePrefix = "<span class='ed11y-small'><em>" + outlinePrefix +
              "</em></span>";
        }
        if ($el.not(ed11yOutlineIgnore).length !== 0) {
          Ed11y.headingOutline += "<li class='" + liClass + "'>" +
              "<span class='ed11y-small'>" + level + "</span> " +
              liPrefix + outlinePrefix + $el.text() +
              "</li>";
        }
      });

      // Check for blockquotes used as headings. If it's less than 25
      // characters - it's probably not a blockquote.
      let $blockquotes = Ed11y.checkRoot.find("blockquote").not(Ed11y.containerIgnore);
      $blockquotes.each((i, el) => {
        let $el = $(el);
        let text = $el.text().trim();
        if (text.length < 25) {
          let dismissalKey = Ed11y.dismissalKey(text);
          Ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageFullCheckBlockquote, "blockquoteLength", dismissalKey]);
        }
      });

    };

    /*======================== INPUTS MODULE =======================*/
    // todo: implement this module.

    /*================== ALTERNATIVE TEXT MODULE ====================*/

    // todo: consider flagging alts referencing to position and color.
    Ed11y.checkAltText = async function () {

      // Test each image for alternative text.
      Ed11y.$img.each((i, el) => {
        let $el = $(el);
        let alt = $el.attr("alt");
        let src = $el.attr("src");
        let linkChild = $el.parents('a[href]').length;

        if (typeof alt !== "string") {
          Ed11y.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yGeneralAltText]);
        }
        else if (alt.length === 0 && linkChild === 0) {
          // An empty alt may be ok, and we handle empty links in the
          // link tests.
          let dismissalKey = Ed11y.dismissalKey(src);
          Ed11y.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltDecorative, "decorativeImage", dismissalKey]);
        }

        // If alt attribute is present, further tests are done.
        else {
          let error = Ed11y.containsAltTextStopWords(alt);
          let altText = Ed11y.sanitizeForHTML(alt);

          // Image fails if a url was found.
          // Todo: add images in links to test coverage.
          if ($el.parents().is("a[href]")) {
            if (error[0] !== null) {
              Ed11y.paints.push([$el.closest('a'), 'before', 'ed11y-instance-inline', "ed11y-error-border ed11y-imageTip", 'ed11y-error-btn', ed11yMessageAltUrl(altText)]);
            }
            else if (error[1] !== null) {
              // "image of"
              let dismissalKey = Ed11y.dismissalKey(src + altText);
              Ed11y.paints.push([$el.closest('a'), 'before', 'ed11y-instance-inline', "ed11y-warning-border ed11y-imageTip", 'ed11y-warning-btn', ed11yMessageAltImageOfLinked(error, altText), "AltImageOfLinked", dismissalKey]);
            }
            else if (alt.length > 160) {
              // Image warning if it is a link and contains long alt text.
              let dismissalKey = Ed11y.dismissalKey(src + altText);
              Ed11y.paints.push([$el.closest('a'), 'before', 'ed11y-instance-inline', "ed11y-warning-border ed11y-imageTip", 'ed11y-warning-btn', ed11yMessageAltLongLinked(alt, altText), "AltLongLinked", dismissalKey]);
            }
                // Image warning if it is a link, contains alt text AND
            // surrounding link text.
            else if (alt !== "" && $el.parents("a").text().replace(ed11yIgnoreLinkStrings,"").trim().length > 1) {
              let dismissalKey = Ed11y.dismissalKey(src + altText);
              Ed11y.paints.push([$el.closest('a'), 'before', 'ed11y-instance-inline', "ed11y-warning-border ed11y-imageTip", 'ed11y-warning-btn', ed11yMessageAltLinkComplex(altText), "AltLinkComplex", dismissalKey]);
            }
          }
          // Now if there is no link...
          else if (error[0] !== null) {

            Ed11y.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-error-border ed11y-imageTip", 'ed11y-error-btn', ed11yMessageAltFilename(altText)]);
          }
          else if (error[1] !== null) {
            let dismissalKey = Ed11y.dismissalKey(src + altText);
            Ed11y.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-warning-border ed11y-imageTip", 'ed11y-warning-btn', ed11yMessageAltImageOf(error, altText),"AltImageOf", dismissalKey]);
          }
          // Alert with deadspace alt.
          else if (alt !== "" && alt.replace(/"|'|\s+/g, "") === "") {

            Ed11y.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageAltDeadspace]);
          }
          // Image error if alt text is too long.
          else if (alt.length > 160) {
            let dismissalKey = Ed11y.dismissalKey(src + altText);
            Ed11y.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltTooLong(alt, altText),"AltTooLong", dismissalKey]);
          }
        }
      });
    };

    // Checks if text is not descriptive and returns the word(s) that are
    // making the text inaccessible.
    Ed11y.containsAltTextStopWords = function (alt) {
      let altUrl = [".png", ".jpg", ".jpeg", ".gif"];
      let suspiciousWords = ["image of", "graphic of", "picture of", "placeholder", "photo of"];
      let hit = [null, null];
      $.each(altUrl, function (index, word) {
        if (alt.toLowerCase().indexOf(word) >= 0) {
          hit[0] = word;
        }
      });
      $.each(suspiciousWords, function (index, word) {
        if (alt.toLowerCase().indexOf(word) >= 0) {
          hit[1] = word;
        }
      });
      return hit;
    };

    /*====================== LINK TEXT MODULE =======================*/

    // Toggles the outline of all inaccessible link texts.
    Ed11y.checklinkText = async function () {
      // Todo: See if there is an alternative to :visible that shows only
      // visually hidden content.
      // Todo: Add test for consecutive links to same href?
      let $links = Ed11y.checkRoot.find("a[href]").not(Ed11y.linkIgnore);

      /* Mini function if you need to exclude any text contained with a span. We created this function to ignore automatically appended sr-only text for external links and document filetypes.*/
      $.fn.ignore = function (sel) {
        return Ed11y.clone().find(sel||">*").remove().end();
      };

      /* Example: If you need to ignore any text within <span class="sr-only">test</span>.
          $el.ignoreString("span.sr-only").text().trim();
       */

      $links.each((i, el) => {
        let $el = $(el);
        let linkText = Ed11y.computeAriaLabel($el);
        let $img = $el.find('img');
        let hasImg = $img.length > 0;
        let downloadMatch = $el.filter(ed11yDownloadLinks).length;
        if (linkText === 'noAria') {
          linkText = $el.text().trim();
          if (hasImg) {
            let imgText = Ed11y.computeAriaLabel($img);
            if (imgText !== 'noAria') {
              linkText += imgText;
            }
            else {
              if ($img.is('[alt]')) {
                linkText += $img.attr('alt');
              }
              else {
                linkText += $img.attr('src');
              }
            }
            // This only checks the alt, not aria-label
            hasImg = true;
          }
        }
        if ($el.attr('target') === '_blank' && downloadMatch === 0 && linkText.indexOf('tab') === -1 && linkText.indexOf('window') === -1 && linkText.indexOf('external') === -1) {
          // Warn about unwarned new windows before ignoreString strip.
          let dismissalKey = Ed11y.dismissalKey(linkText);
          Ed11y.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-link-text-warning", 'ed11y-warning-btn', ed11yMessageQANewTab, "QANewTab", dismissalKey]);
        }
        linkText = linkText.replace(ed11yIgnoreLinkStrings,"");
        let linkStrippedText = linkText.replace(/'|"|-|\.|\s+/g, '');

        // Tests to see if this link is empty
        // Todo add to test coverage
        if (linkStrippedText.length === 0) {
          linkStrippedText += !!Ed11y.computeTitle($el) ? Ed11y.computeTitle($el) : "";
          if (linkStrippedText.length === 0) {

            if (hasImg) {
              Ed11y.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageLinkHasNoText]);
            }
            else {
              Ed11y.paints.push([$el, 'before', 'ed11y-instance-inline ed11y-inline-block', "ed11y-link-text-fail", 'ed11y-error-btn', ed11yMessageLinkHasNoText]);
            }
          }
        }
        else {
          // Check for links with generic or URL titles
          let error = Ed11y.containslinkTextStopWords(linkText.trim());
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
            Ed11y.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-link-text-warning", 'ed11y-warning-btn', stopWordMessage, "LinkTextIsGeneric", dismissalKey]);
          }
        }
        //Warning: Find all PDFs. Although only append warning icon to
        // first PDF on page.
        if (!hasImg && downloadMatch > 0) {
          let dismissalKey = Ed11y.dismissalKey($el.attr("src"));
          $el.addClass("ed11y-text-warning");
          Ed11y.paints.push([$el, 'after', 'ed11y-instance-inline', "", 'ed11y-warning-btn', ed11yMessageLinkDownload, "LinkDownload", dismissalKey]);
        }
      });
    };

    // Checks if text is not descriptive and returns the word(s) that are
    // making the text inaccessible. stopWords will flag hyperlinks in
    // link titles. partialStopWords looks for links entirely made of
    // generic words. Note that this was extensively rewritten.
    Ed11y.containslinkTextStopWords = function (textContent) {
      // todo: use regex to find any three-letter TLD followed by a slash.
      let stopWords = ["http://", "https://", ".asp", ".htm", ".php", ".edu/", ".com/"];
      let partialStopRegex = /learn|to|more|now|this|page|link|site|website|check|out|view|our|read|\.|,|:|download|form|here|click|>|<|\s/g;
      let hit = "none";

      if (textContent.replace(partialStopRegex, '').length === 0) {
        // If no partial words were found, then check for total words.
        hit = "generic";
      }
      else {
        for (let i = 0; i < stopWords.length; i++) {
          if (textContent.indexOf(stopWords[i]) > -1) {
            hit = "url";
            break;
          }
        }
      }

      return hit;
    };

    // Handle aria-label or labelled by
    Ed11y.computeAriaLabel = function ($el) {
      // Todo: what if there is a span inside element with a label?
      if ($el.is('[aria-label]')) {
        return $el.attr('aria-label');
      }
      else if ($el.is('[aria-labelledby]')) {
        let target = $el.attr('aria-labelledby');
        if (target.length > 0) {
          target = '#' + target;
          target = target.replace(/ /g, ', #');
          let returnText = '';
          $(target).each(function () {
            returnText += $(this).text() + ' ';
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
    Ed11y.computeTitle = function ($el) {
      if ($el.is('[title]')) {
        return $el.attr('title');
      }
      else if ($el.find('[title]')) {
        return $el.find('[title]').first().attr('title');
      }
      else {
        return "";
      }
    };

    /*================== QUALITY ASSURANCE MODULE ===================*/

    Ed11y.checkQA = async function () {

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
      Ed11y.$p.each(function (i, el) {

        // Detect possible lists.
        let $first = $(el);
        if (firstText.length === 0) {
          firstText = $(el).text().trim();
        }
        let hit = false;
        // Grab first two characters.
        let firstPrefix = firstText.substring(0, 2);
        if (firstPrefix.length > 0 && firstPrefix !== activeMatch && firstPrefix.match(prefixMatch)) {
          // We have a prefix and a possible hit; check next paragraph.
          let $second = Ed11y.$p.eq(i + 1);
          if ($second) {
            let secondText = $second.text().trim();
            let secondPrefix = decrement(secondText.substring(0, 2));
            if (firstPrefix === secondPrefix) {
              hit = true;
            }
          }
          if (!hit) {
            // Split p by carriage return if present and compare.
            let hasBreak = $first.html().indexOf("<br>");
            if (hasBreak !== -1) {
              // Note: this cannot strip rich text formatting.
              let subParagraph = $first.html().substring(hasBreak + 4).replace(/<\/?[^>]+(>|$)/g, "").trim();
              let subPrefix = subParagraph.substring(0, 2);
              if (firstPrefix === decrement(subPrefix)) {
                hit = true;
              }
            }
          }
          if (hit) {
            let dismissalKey = Ed11y.dismissalKey(firstText);
            let ed11yShouldBeList = ed11yMessageQAShouldBeList(firstPrefix);
            Ed11y.paints.push([$first, 'prepend', 'ed11y-instance-inline', "", "ed11y-warning-btn", ed11yShouldBeList, "ShouldBeList", dismissalKey]);
            activeMatch = firstPrefix;
          }
          else {
            activeMatch = "";
          }
        }
        else {

          // Now check for possible header.
          let possibleHeader = $first.find('strong, b').first().text().trim();
          let maybeSentence = possibleHeader.match(/[.:;"']$/) !== null;
          if (possibleHeader.length > 0 && maybeSentence === false && possibleHeader.length === firstText.length) {
            let dismissalKey = Ed11y.dismissalKey(firstText);
            Ed11y.paints.push([$first, 'prepend', 'ed11y-instance-inline', "", 'ed11y-warning-btn', ed11yMessageQAMayBeHeader, "QAMayBeHeader", dismissalKey]);
          }
        }

        // Reset for next loop, carry over text query if available.
        activeMatch = "";
        firstText = typeof secondText === 'undefined' ? "" : secondText;

      });

      // Warning: Detect uppercase. For each element, if it contains more
      // than 4 uppercase words in a row, indicate warning.
      // Uppercase word is anything that is more than 3 characters.
      // Todo check performance of new regex.
      Ed11y.checkRoot.find('h1, h2, h3, h4, h5, h6, p, li, blockquote').not(Ed11y.containerIgnore).each(function () {
        let $this = $(this);
        let thisText;
        if ($this.is('li')) {
          // Prevent recursion through nested lists.
          thisText = $Ed11y.contents().filter(function () {return Ed11y.nodeType === 3}).text();
        }
        else {
          thisText = $this.text();
        }
        let uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
        // was
        // /(?!<a[^>]*?>)(\b[A-Z]['!:A-Z\s]{20,}|\b[A-Z]{20,}\b)(?![^<]*?<\/a>)/g
        let detectUpperCase = thisText.match(uppercasePattern);

        if (detectUpperCase && detectUpperCase[0].length > 10) {
          let dismissalKey = Ed11y.dismissalKey(thisText);
          Ed11y.paints.push([$this, 'prepend', 'ed11y-instance-inline', "ed11y-uppercase-warning", 'ed11y-warning-btn', ed11yMessageQAUppercase, "QAUppercase", dismissalKey]);
        }

      });

      // Check if a table has a table header.
      Ed11y.$table.each(function () {
        let $el = $(this);
        let $findTHeaders = $el.find("th");
        let $findHeadingTags = $el.find("h1, h2, h3, h4, h5, h6");
        if ($findTHeaders.length === 0) {
          Ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageMissingQATableHeadings]);
        }
        else {
          // Make sure all table headers are not empty.
          $findTHeaders.each(function () {
            let $th = $(this);
            if ($th.text().trim().length < 1 && !Ed11y.computeTitle($th)) {
              Ed11y.paints.push([$th, 'prepend', 'ed11y-instance', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageEmptyTableHeader]);
            }
          });
        }
        if ($findHeadingTags.length > 0) {
          // todo: have paints function prefer stronger alert classes
          // when there are multiple
          $findHeadingTags.each(function () {
            Ed11y.paints.push([$(this), 'before', 'ed11y-instance', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageQAHeaderInTable]);
          });
        }
      });

      let $visualizationWarning = Ed11y.$embed.filter('[src*="datastudio.google.com"], [src*="tableau"]');
      if ($visualizationWarning.length > 0) {
        // Without an each() this only throws a single warning.
        $visualizationWarning.each((i, el) => {
          let $el =$(el)
          // Todo provide documentation link regarding equivalent
          // formats, and add a matching warning to the link tests.
          let dismissKey = Ed11y.dismissalKey($el.attr('src'));
          Ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageVisualization, "visualization", dismissKey]);
        })
      }

      //Warn users to provide captions for videos.
      let $findVideos = Ed11y.$embed.filter("video, [src*='youtube.com'], [src*='vimeo.com'], [src*='kaltura.com']");
      $findVideos.each((i, el) => {
        let $el = $(el);
        Ed11y.mediaCount++;
        // Dismissable alert.
        let dismissKey = Ed11y.dismissalKey($el.children('source').length > 0 ? $el.children('source').first().attr('src') : $el.attr('src'));
        Ed11y.paints.push([$el, 'before', 'ed11y-instance', "", 'ed11y-warning-btn', ed11yMessageFullCheckCaptions, "captions", dismissKey]);
      });

      //Warning: Make sure all podcasts have captions.
      // Todo: include more providers and embed types?
      // Todo: don't throw if "transcript" is found on the page?
      let $podcastWarning = Ed11y.$embed.filter('audio, iframe[src*="soundcloud.com"], iframe[src*="buzzsprout.com"], iframe[src*="podbean.com"]');
      if ($podcastWarning.length > 0) {
        $podcastWarning.each((i, el) => {
          let $el = $(el);
          Ed11y.mediaCount++;
          // Dismissable alert.
          let dismissKey = Ed11y.dismissalKey($el.children('source').length > 0 ? $el.children('source').first().attr('src') : $el.attr('src'));
          Ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessagePodcast, "transcripts", dismissKey]);
        })
      }

      //Warning: Discourage use of Twitter timelines.
      // Todo 1.1 recreate test, and rewrite to include other platforms
      /*let $twitterWarning = $('[id^="twitter-widget"]').not(Ed11y.containerIgnore);
      $twitterWarning.each((i, el) => {
        let $el = $(el);
        var numberofTweets = $el.contents().find(".timeline-TweetList-tweet").length;
        if (numberofTweets > 3) {
          $el.addClass("ed11y-text-warning");
          Ed11y.paints.push([$el,'before','ed11y-instance',"ed11y-text-warning",'ed11y-warning-btn',ed11yMessageTwitter]);
        }
      });*/

      if (ed11yEmbeddedContentWarning.length > 1) {
        let $embeddedWarning = Ed11y.checkRoot.find(ed11yEmbeddedContentWarning);
        $embeddedWarning.each((i, el) => {
          let $el = $(el);
          Ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageEmbeddedContent]);
        });
      }

    };

    /*================== FULL CHECK MODULE ===================*/

    Ed11y.checkFull = function () {

      if (Ed11y.mediaCount > 0) {
        // todo: localize
        $('#ed11y-image-list').prepend("" +
            "<li>There are <span class='ed11y-red-text'>" + Ed11y.mediaCount + "</span> multimedia elements on this page. " +
            "Please make sure each provides closed captions (for video) or a transcript (for audio).</li>");
      }

      Ed11y.updateCount('full');
      Ed11y.readyTips(true);
    };
    // End of fullCheck()

    Ed11y.findElements = function () {
      // Find and cache so we don't have tests looking willynilly.
      Ed11y.$p = Ed11y.checkRoot.find('p').not(Ed11y.containerIgnore);
      Ed11y.$h = Ed11y.checkRoot.find("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]").not(Ed11y.containerIgnore);
      Ed11y.$img = Ed11y.checkRoot.find("img").not(Ed11y.imageIgnore);
      Ed11y.$embed = Ed11y.checkRoot.find("iframe, audio, video").not(Ed11y.containerIgnore);
      Ed11y.$table = Ed11y.checkRoot.find("table").not(Ed11y.containerIgnore);
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
    Ed11y.readyPop = function ($el, text) {
      let thisText = "";
      let merge = 0;
      if (text) {
        thisText += text;
        merge++;
      }
      if ($el.attr('data-ed11y-tip')) {
        let thisPaint = $el.attr('data-ed11y-tip').split(',');
        thisPaint.forEach(function (i) {
          thisText += Ed11y.paints[i][5];
          if (!!Ed11y.paints[i][7]) {
            thisText += "<button class='ed11y-dismissthis' data-ed11y-action='ok' data-ed11y-test='" + Ed11y.paints[i][6] + "' data-ed11y-id='" + i + "'>Mark as OK</button>" +
                "<button class='ed11y-dismissthis' data-ed11y-action='ignore' data-ed11y-test='" + Ed11y.paints[i][6] + "'data-ed11y-id='" + i + "'>Can't be fixed</button>";
          }
        });
        merge++;
      }
      let thisContent = '<div class="ed11y-tip ed11y-reset"><span ' +
          'class="ed11y-arrow"></span>' +
          '<button class="ed11y-button ed11y-close-tip" ' +
          'type="button" aria-expanded="false" aria-label="close" ' +
          'onclick=\'jQuery(this).parent().addClass("ed11y-hidden")' +
          '.removeClass("ed11y-tip-open").attr("style", "").prev()' +
          '.attr("aria-expanded", "false").addClass("ed11y-clicked")' +
          '.removeClass("ed11y-hover").focus()' +
          '.parents("ed11y-force-overflow")' +
          '.removeClass("ed11y-force-overflow"); return false;\'>' +
          '&times;</button><div class="ed11y-tip-content">' +
          thisText +
          '</div></div>';
      if (merge > 1) {
        $el.next().children('ed11y-tip-content').html(thisText);
        $el.next().find('.ed11y-dismissthis').click(function(el) {
          let id = Ed11y.dataset.ed11yDismissId;
          let type = Ed11y.dataset.ed11yDismissType;
          Ed11y.dismissThis(id, type);
        })
      }
      else {
        $el.addClass('ed11y-tip-ready').after(thisContent);
        $el.next().find('.ed11y-dismissthis').click(function () {
          let id = Ed11y.dataset.ed11yId;
          let action = Ed11y.dataset.ed11yAction;
          let test = Ed11y.dataset.ed11yTest;
          Ed11y.dismissThis(action, test, id);
        });
      }
    };
    Ed11y.dismissalKey = function (text) {
      return String(btoa(unescape(encodeURIComponent(text)))).substring(0,128);
    }
    Ed11y.dismissThis = function (action, test, id) {
      let dismissalKey = Ed11y.paints[id][7];
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
      $('.ed11y-tip-open').parent().remove();
      // todo put focus somewhere that makes sense
      // todo clear wrapper styles e.g. heading
      // todo Ed11y.warning or errorCount--;
      // todo Ed11y.dismissedCount++;
      localStorage.setItem('ed11ydismissed', JSON.stringify(Ed11y.dismissedAlerts));
      Ed11y.paints.splice(id, 1);
      Ed11y.updateCount('quick');
      window.setTimeout( function() {
        $("#ed11y-resultmessage").focus();
      }, 100);
    };

    Ed11y.readyTips = async function (fullcheck) {
      // This function is VERY expensive.
      // Todo: optimize?
      // For now: throw chunks to the end of the render queue to prevent
      // thread locking.

      Ed11y.paints?.forEach(function (el, index) {
        // todo: need to change all at once.
        Ed11y.paintButton(el, index);
      });
      Ed11y.paintsJS.forEach(function (el, index) {
        // todo: need to change all at once.
        Ed11y.paintButtonJS(el, index);
      });
      // As soon as the buttons are in place, dispatch an event so themes
      // can react
      document.dispatchEvent(new CustomEvent("ed11yPanelOpened"));
      if (fullcheck === true) {
        window.setTimeout(function () {
          Ed11y.$img.each(function () {
            let $img = $(this);
            let alt = Ed11y.sanitizeForHTML($img.attr('alt'));
            let src = $img.attr('src');
            let width = $img.innerWidth() + 'px';
            let height = $img.innerHeight() + 'px';
            let inject = "<div class='ed11y-container ed11y-reveal-alts ed11y-reset' " +
                "style='width:" + width + " !important;height:" + height + " !important;'>" +
                "<span>" + Ed11y.panelToggleIcon + "Alt: " + alt + "</span></div>";
            if ($img.prev().hasClass('ed11y-instance-inline') === true) {
              $img.prev().before(inject);
            }
            else {
              $img.before(inject);
            }
            let imgClass = "";
            if ($img.hasClass('ed11y-error-border')) {
              imgClass = "ed11y-error-border";
            }
            else if ($img.hasClass('ed11y-warning-border')) {
              imgClass = "ed11y-warning-border";
            }
            $('#ed11y-image-list').append("" +
                "<li class='" + imgClass + "'>" +
                "<img src='" + src + "' alt='' class='ed11y-thumbnail'/>Alt: " + alt + "</li>");
          });
          window.setTimeout( function () {
            $('.ed11y-reveal-alts').each(function() {
              let $revealed = $(this);
              let $img = $(this).nextAll('img').first();
              let revealedOffset = $revealed.offset();
              let imgOffset = $img.offset();
              let newOffset = imgOffset.left - revealedOffset.left;
              let newStyle = $revealed.attr('style') + ' margin-left: ' + newOffset + 'px !important;'
              $revealed.attr('style', newStyle);
            })
          }, 0);
        }, 0);
      }
      window.setTimeout(function () {
        Ed11y.$pops = $('button.ed11y-pop').not('[id^="ed11y"]');
        let windowWidth = $(window).width();
        // Reading and writing styles creates thrashing. We must read
        // first.
        Ed11y.popNudges = [];
        Ed11y.$pops.each(function () {
          let $el = $(this);
          $el.on('touchend click', (function (event) {
                if (!Ed11y.doubleClickPrevent) {
                  Ed11y.popThis($el, 'click');
                }
                Ed11y.doubleClickPrevent = true;
                window.setTimeout(function() {
                  Ed11y.doubleClickPrevent = false;
                },200);
                return false;
              })
          );

          $el.filter('[aria-expanded="false"]').mouseenter(function () {
            Ed11y.popThis($el, 'hover');
          });
          // If the button will be offscreen, nudge it left or right to
          // fit.
          let offset = $el.parent().offset();
          let offsetData = 0;
          if (offset.left < 8) {
            // Nudge right
            offsetData = 8 - offset.left;
          }
          else if (offset.left + 40 > windowWidth) {
            // Nudge left
            offsetData = offset.left - windowWidth - 40;
          }
          Ed11y.popNudges.push([$el, offsetData]);
        });
        Ed11y.popNudges.forEach(function (el, i) {
          if (el[1] === 0) {
            el[0].data('ed11yTipNudge', el[1]).attr('id', 'ed11y-pop-' + i);
          }
          else {
            el[0].attr('style', 'transform:translate(' + el[1] + 'px, 0) !important;').data('ed11yTipNudge', el[1]).attr('id', 'ed11y-pop-' + i);
          }
        });
        $('body').addClass('ed11y-pops-ready');
      }, 0);
    };

    Ed11y.popThis = function ($el, trigger) {
      let isNew = false;
      if ($el.hasClass('ed11y-tip-ready') === false) {
        isNew = true;
        Ed11y.readyPop($el, '');
      }
      let $tip = $el.next();
      if (isNew === true) {
        Ed11y.watchPop($el, $tip);
      }
      if ($el.attr('aria-expanded') === 'true' && trigger === 'click') {
        // Close on click.
        $el.attr('aria-expanded', 'false').addClass('ed11y-clicked').removeClass('ed11y-hover');
        $tip.addClass('ed11y-hidden').removeClass('ed11y-tip-open').attr('style', '');
        $el.parents('.ed11y-force-overflow').removeClass('ed11y-force-overflow');
      }
      else if ($el.attr('aria-expanded') === 'false') {

        let needToAlign;
        if (trigger === 'click') {
          // Open on click.
          $('.ed11y-tip-open').removeClass('ed11y-tip-open').prev().attr('aria-expanded', 'false');
          $el.attr('aria-expanded', 'true').removeClass('ed11y-hover');
          $tip.removeClass('ed11y-hidden').addClass('ed11y-tip-open');
          needToAlign = true;
        }
        else if ($el.not('.ed11y-hover')) {
          // Open on hover
          $('.ed11y-pop').filter('.ed11y-hover, [aria-expanded="true"]')
              .removeClass('.ed11y-hover ed11y-clicked ed11y-tip-open')
              .attr('aria-expanded', 'false')
              .next()
              .removeClass('ed11y-tip-open');
          $el.addClass('ed11y-hover');
          $tip.removeClass('ed11y-hidden').addClass('ed11y-tip-open');
          needToAlign = true;
        }
        if (needToAlign === true) {
          // Dispatch an event that a tooltip has appeared.
          document.dispatchEvent(new CustomEvent("ed11yPop", {
            detail: {id: $el.attr('id')}
          }));

          if (ed11yAllowOverflow.length > 0) {
            $el.parents(ed11yAllowOverflow).addClass('ed11y-force-overflow');
          }
          else {
            $el.parents().not('body').each(function () {
              if ($(this).css('overflow') === 'hidden') {
                $(this).addClass('ed11y-force-overflow');
              }
            });
          }
          Ed11y.alignTip($el, $tip);
          // todo looping throws an error after elements are removed
          Ed11y.goto = parseInt($el.attr('id').substring(10));
          // Update the panel
          let ed11yGotoText = 'next';
          if (Ed11y.gotoCount === 1) {
            ed11yGotoText = '';
          }
          else if (Ed11y.gotoCount - 1 === Ed11y.goto) {
            Ed11y.goto = 0;
            ed11yGotoText = 'first';
          }
          else {
            Ed11y.goto++;
          }
          window.setTimeout(function () {
            $('.ed11y-jumpnext').text(ed11yGotoText);
          }, 250);
        }
      }
    };

    Ed11y.alignTip = function ($el, $tip) {
      $tip.attr('style', '').removeClass('ed11y-tip-left ed11y-tip-under').find('.ed11y-arrow').css('left', 'initial');
      let buttonOffset = $el.offset();
      let buttonWidth = $el.outerWidth(true);
      let tipOffset = $tip.offset();
      let tipWidth = $tip.width();
      let windowWidth = $(window).width();
      let roomToLeft = buttonOffset.left - tipWidth - 50;
      let roomToRight = windowWidth - (buttonOffset.left + tipWidth + 90);
      if (roomToRight < 0) {
        // Can't go right.
        if (roomToLeft > 0) {
          // Go left if there is room.
          $tip.addClass('ed11y-tip-left');
          let targetOffset = buttonOffset.left - tipWidth - buttonWidth - 2;
          let nudge = targetOffset - tipOffset.left;
          $tip.attr('style', 'transform: translate(' + nudge + 'px) !important;').find('.ed11y-arrow').removeAttr('style');
        }
        else {
          // Go under if there is not.
          $tip.addClass('ed11y-tip-under');
          let nudgeY = 58;
          // we don't want to hit the right edge maybe that's all we should worry about?
          let targetOffsetX = 5;
          let nudgeX = targetOffsetX - tipOffset.left;
          let arrowTranslateY = -26;
          let arrowTranslateX = buttonOffset.left + 11;
          $tip.attr('style', 'transform: translate(' + nudgeX + 'px, ' + nudgeY + 'px) !important;').find('.ed11y-arrow').attr('style', 'transform: translate(' + arrowTranslateX + 'px, ' + arrowTranslateY + 'px) rotate(135deg) !important;');
        }
      }
      else {
        // Go right.
        let tipTranslateX = buttonWidth + 13;
        $tip.attr('style', 'transform: translate(' + tipTranslateX + 'px, 4px) !important;').find('.ed11y-arrow').removeAttr('style');
      }
    };

    Ed11y.tipHoverAffordance = function ($el, $tip) {
      if ($tip.is(':hover') === false && $el.is(':hover') === false && $el.is('.ed11y-hover') === true) {
        window.setTimeout(function () {
          if ($tip.is(':hover') === false && $el.is(':hover') === false) {
            // Close on de-hover
            $el.removeClass('ed11y-hover ed11y-clicked').attr('aria-expanded', 'false');
            $tip.removeClass('ed11y-tip-open');
            $el.parents('.ed11y-force-overflow').removeClass('ed11y-force-overflow');
          }
        }.bind($el, $tip), 500);
      }
    };

    Ed11y.watchPop = function ($el, $tip) {
      $el.mouseleave(function () {
        Ed11y.tipHoverAffordance($el, $tip);
      });
      $tip.mouseleave(function () {
        Ed11y.tipHoverAffordance($el, $tip);
      });
    };
    // Todo move this to CSS
    Ed11y.panelToggleIcon = "<svg role='img' focusable='false' width='28px' height='28px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

    Ed11y.buildPanels = function (onLoad) {
      if (onLoad === true) {
        // Create a floating button and hidden divs that contain
        // success/warning message.

        $('body').append(ed11yPanel);
        Ed11y.panel = document.getElementById('ed11y-panel');
        Ed11y.panelToggle = Ed11y.panel.querySelector('#ed11y-main-toggle');
        Ed11y.panelMessage = Ed11y.panel.querySelector('#ed11y-resultmessage');
        Ed11y.panelCount = Ed11y.panel.querySelector('.ed11y-count');
        Ed11y.panelNextButton = Ed11y.panel.querySelector('.ed11y-jumpnext');

        // Handle main toggle button.
        // todo jQuery handled keyboard press, abstract this and emulate
        Ed11y.panelToggle.onclick = function (event) {
          if (!Ed11y.doubleClickPrevent) {
            // Prevent clicking during scan.
            if (Ed11y.running !== true) {
              Ed11y.running = true;

              // Rescan on open, or shut.
              if (Ed11y.panel.classList.contains('ed11y-panel-shut') === true) {
                Ed11y.checkAll(false, "show").catch(console.error);
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

        // Handle jumplinks
        Ed11y.goto = 0;
        $('.ed11y-jumplink').click(function (event) {
          event.preventDefault();

          // Find our button.
          // todo rewrite this to figure out next based on paint array
          let $goto = $('button[class^="ed11y"][data-ed11y-tip]').not('#ed11y-panel button');
          Ed11y.gotoCount = $goto.length;
          Ed11y.$goto = $goto.eq(Ed11y.goto);
          Ed11y.gotoOffset = Ed11y.$goto.offset().top - parseInt($('body').css('padding-top')) - 50;
          // Throw an alert if the button or target is hidden.
          let $firstVisible = false;
          let $target;
          let insert = Ed11y.$goto.attr('data-ed11y-inserted');
          if (insert === "before") {
            $target = Ed11y.$goto.parent().next();
          }
          else if (insert === "prepend") {
            $target = Ed11y.$goto.parent().parent();
          }
          else {
            $target = Ed11y.$goto.parent().prev();
          }
          let alertMessage;

          if (ed11yHiddenHandlers.length > 0 && ($target.filter(ed11yHiddenHandlers).length > 0 || $target.parents(ed11yHiddenHandlers).length > 0)) {
            document.dispatchEvent(new CustomEvent("ed11yShowHidden", {
              detail: {id: Ed11y.$goto.attr('id')}
            }));
            window.setTimeout(function () {
              // Go to the button.
              Ed11y.gotoOffset = Ed11y.$goto.offset().top - parseInt($('body').css('padding-top')) - 50;
              $('html, body').animate({
                scrollTop: (Ed11y.gotoOffset)
              }, 1);
              Ed11y.popThis(Ed11y.$goto, 'click');
              Ed11y.$goto.focus();
            }, 500);
          }
          else {
            if ($target.filter(':visible').length === 0) {
              $firstVisible = Ed11y.$goto.parent().closest(':visible');
              alertMessage = ed11yInvisibleTip;
            }
            else if (Ed11y.$goto.closest('[aria-hidden="true"]').length > 0 || $target.filter('[aria-hidden="true"]').length > 0) {
              $firstVisible = Ed11y.$goto.closest('[aria-hidden="true"]').parents(':visible').first();
              alertMessage = ed11yHiddenTip;
            }
            if ($firstVisible.length > 0) {
              alert(alertMessage);
              $firstVisible.addClass('ed11y-hidden-highlight').prepend('<div tabindex="-1" class="ed11y-sr-only ed11y-hidden-highlight-' + Ed11y.goto + '">Highlighted container</div>');
              Ed11y.gotoOffset = $firstVisible.offset().top - parseInt($('body').css('padding-top')) - 50;
              Ed11y.popThis(Ed11y.$goto, 'click');
              let thisGoTo = '.ed11y-hidden-highlight-' + Ed11y.goto;
              $(thisGoTo).focus();
            }
            else {
              // Go to the button.
              $('html, body').animate({
                scrollTop: (Ed11y.gotoOffset)
              }, 1);
              Ed11y.popThis(Ed11y.$goto, 'click');
              Ed11y.$goto.focus();
            }
          }

        });

        $('.ed11y-minimize').click(function (event) {
          event.preventDefault();
          $(this).attr('aria-pressed', function (i, attr) {
            return attr === 'true' ? 'false' : 'true';
          });
          $('#ed11y-panel').toggleClass('ed11y-panel-minimized');
        });

        $('.ed11y-about').click(function (event) {
          event.preventDefault();
          if ($(this).attr('aria-pressed') === 'false') {
            $(this).attr('aria-pressed', 'true');
            $('#ed11y-panel-upper').prepend('<div class="ed11y-about-text" tabindex="-1">' +
                ed11yAbout + '</div>');
            window.setTimeout(function() {
              $('.ed11y-about-text').focus();
            }, 1500);
          }
          else {
            $(this).attr('aria-pressed', 'false');
            $('.ed11y-about-text').remove();
          }
        });

        $('#ed11y-shutpanel').click(function (event) {
          event.preventDefault();
          $('#ed11y-main-toggle').focus().click();
        });

        $('.ed11y-upper-next-button').click(function (event) {
          event.preventDefault();
          // Todo optional: maybe write next/previous logic when there
          // are more than two
          $(this).parent().siblings('.ed11y-fullcheck').addClass('ed11y-upper-active');
          $(this).parent().removeClass('ed11y-upper-active');
        });

        // Handle fullcheck requests.
        $("#ed11y-summary-toggle").click(function () {
          $(this).attr('aria-pressed', function (i, attr) {
            return attr === 'true' ? 'false' : 'true';
          });
          if ($(this).attr('aria-pressed') === 'false') {
            // Close and remove
            $(".ed11y-upper-active").removeClass("ed11y-upper-active");
            $('.ed11y-reveal-alts').remove();
            $('.ed11y-headings-label').attr('style', 'display: none !important');
            $("#ed11y-image-list li").remove();
            $(".ed11y-full-active").removeClass('ed11y-full-active').addClass('ed11y-full-only');
          }
          else {
            Ed11y.resetTips();
            window.setTimeout(function () {
              Ed11y.checkFull();
              Ed11y.$h.each(function () {
                // Todo implement outline ignore function.
                let $el = $(this);
                if (!$el.find('.ed11y-headings-label').length) {
                  let level;
                  // Match up aria-headers to equivalent <h#> tag.
                  if ($el.attr('aria-level')) {
                    level = +$el.attr('aria-level');
                  }
                  else {
                    level = +$el[0].tagName.slice(1);
                  }
                  $(this).prepend(" <span class='ed11y-headings-label'>H" + level + "</span> ");
                }
              });
              $('#ed11y-fullcheck-headers').addClass('ed11y-upper-active');
              $("#ed11y-outline-list").html('').append(Ed11y.headingOutline).focus();
              $('.ed11y-full-only').removeClass('ed11y-full-only').addClass('ed11y-full-active');
              $('.ed11y-headings-label').removeAttr('style');
              $('#ed11y-fullcheck-outline-header').focus();
            }, 0);
          }
        });

        window.addEventListener('resize', function () {
          if ($('#ed11y-summary-toggle').attr('aria-expanded') === 'true') {
            Ed11y.checkRoot.find('img').each(function () {
              let width = $(this).innerWidth() + 'px';
              let height = $(this).innerHeight() + 'px';
              $(this).prevAll('.ed11y-reveal-alts').css({
                'width': width + ' !important',
                'height': height + ' !important'
              });
            });
          }
          let $tip = $('.ed11y-tip-open');
          if ($tip.length > 0) {
            let $el = $tip.prev();
            Ed11y.alignTip($el, $tip);
          }
        });

        // Escape key on main closes panels.
        $(document).keyup(function (escape) {
          if (escape.keyCode === 27) {
            let $openTipButton = $('.ed11y-instance:focus-within, .ed11y-instance-inline:focus-within').children('.ed11y-pop[aria-expanded="true"]');
            if ($openTipButton.length > 0) {
              $openTipButton.focus().click();
            }
            else if ($('.ed11y-fullcheck.ed11y-panel-active').length > 0 && $('.ed11y-fullcheck:focus-within, #ed11y-summary-toggle:focus').length > 0) {
              $('#ed11y-summary-toggle').focus().click();
            }
            else if ($('.ed11y-about[aria-expanded="true"]:focus, .ed11y-about-text:focus-within').length > 0) {
              $('.ed11y-about').focus().click();
            }
            else if ($('#ed11y-panel:focus-within').length > 0) {
              $('#ed11y-main-toggle').focus().click();
            }
          }
        });
      }
    };

    Ed11y.getText = function(elem) {
      return elem.innerText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
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


  }

}

