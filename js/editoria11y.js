const _onLoadListener = function ($) {
  if (window.navigator.userAgent.match(/MSIE|Trident/) === null) {
    // IE 11 is going to suffer under this load.
    var ed11y = new Ed11y();
  }

  /***
   * Ed11y base library.
   * @constructor
   */

  function Ed11y() {
    document.querySelectorAll(function () {
      setTimeout(function () {
        // Don't trigger tests until page has had time to settle.
        if (document.querySelectorAll(ed11yNoRun).length === 0) {
          ed11y.running = true;
          ed11y.loadGlobals();
          ed11y.checkAll(true, 'hide');
        }
      }, 500);
    });

    // Toggles the outline of all headers, link texts, and images.
    this.checkAll = async function (onLoad, showPanel) {
      if (document.querySelectorAll(ed11yNoRun).length === 0) {
        this.paints = [];
        this.errorCount = 0;
        this.warningCount = 0;
        this.mediaCount = 0;
        this.checkRoot = document.querySelectorAll(ed11yCheckRoot);
        this.findElements();
        // This is madness, but it prevents jank by allowing other scripts
        // to run between each test group.
        window.setTimeout(function () {
          ed11y.checklinkText();
          window.setTimeout(function () {
            ed11y.checkAltText();
            window.setTimeout(function () {
              ed11y.checkHeaders();
              window.setTimeout(function () {
                ed11y.checkQA();
                window.setTimeout(function () {
                  ed11y.buildPanels(onLoad);
                  window.setTimeout(function () {
                    ed11y.updatePanel(onLoad, showPanel);

                    const _start = document.querySelectorAll('#ed11y-main-toggle');

                    _start.forEach(_element2 => _element2.classList.remove('disabled'));

                    const _chain = document.querySelectorAll(_start).removeAttr('aria-disabled').toArray();

                    const _chain2 = document.querySelectorAll(_chain).removeAttr('title').toArray();
                  }, 0);
                }, 0);
              }, 0);
            }, 0);
          }, 0);
        }, 0);
        // forms is disabled:
        // this.checkLabels();
      } else {
        ed11y.reset();

        const _start2 = document.querySelectorAll('#ed11y-main-toggle');

        _start2.forEach(_element4 => _element4.classList.add('disabled'));

        _start2.forEach(_element5 => _element5.setAttribute('aria-disabled', 'true'));

        _start2.forEach(_element6 => _element6.setAttribute('title', 'Editoria11y is disabled during live editing.'));
      }
    };

    this.updatePanel = async function (onLoad, showPanel) {
      let totalFound = this.errorCount + this.warningCount;
      this.updateCount('quick');
      if (onLoad === true && totalFound > 0) {
        // Determine if panel should open automatically.
        const ed11ySeen = localStorage.getItem("ed11ySeen");
        const ed11ySeenParsed = ed11ySeen ? JSON.parse(ed11ySeen) : {};
        const ed11yPage = btoa(encodeURIComponent(window.location.pathname));
        if (ed11ySeenParsed[ed11yPage] === totalFound) {
          // User has already seen these errors, panel will not open.
          showPanel = "seen";
        } else if (ed11yAlertMode === "assertive") {
          // User has not seen these errors; force open panel.
          // CMS integrations can set this dynamically.
          showPanel = "show";
        }
        ed11ySeenParsed[ed11yPage] = totalFound;
        localStorage.setItem('ed11ySeen', JSON.stringify(ed11ySeenParsed));
        window.setTimeout(function () {
          document.querySelectorAll('#ed11y-aria-live').forEach(_element7 => _element7.textContent = 'Editorially reports: ' + document.querySelectorAll('.ed11y-checkmessage')[0].textContent);
        }, 1500);
      } else if (onLoad === true && totalFound === 0) {
        showPanel = "pass";
      }

      // Now we can open or close the panel.
      if (showPanel !== "show") {
        ed11y.reset();
      } else {
        document.querySelectorAll('.ed11y-panel-minimized').forEach(_element8 => _element8.classList.remove('ed11y-panel-minimized'));
        document.querySelectorAll('#ed11y-panel').forEach(_element9 => _element9.classList.remove('ed11y-panel-shut'));
        document.getElementById("ed11y-panel").classList.add("ed11y-panel-active");
        document.querySelectorAll('#ed11y-main-toggle').forEach(_element10 => _element10.setAttribute('aria-expanded', 'true'));
        window.setTimeout(function () {
          document.dispatchEvent(new CustomEvent("ed11yPanelOpened"));
          ed11y.readyTips();
        }, 0);
        if (onLoad === false) {
          window.setTimeout(function () {
            document.querySelectorAll('.ed11y-checkmessage').focus();
          }, 500);
        }
      }
      ed11y.running = false;
    };

    this.paintButton = function (el, index) {
      //this.paints.push([$el,'before','ed11y-instance','ed11y-error-border','ed11y-warning-btn',generalAltText]);
      // 0 $el 1 insertion position 2 block or inline 3 wrapper class 4
      // button 5 message
      let icon = '<span class="ed11y-sr-only">Show editorially error</span>';
      if (el[4].indexOf('warning') !== -1) {
        icon = '<span class="ed11y-sr-only">Show editorially warning</span>';
      }
      let injection = '<div class="' + el[2] + ' ed11y-reset"><button type="button" class="' + el[4] + ' ed11y-pop" style="display:none;" aria-expanded="false" data-ed11y-inserted="' + el[1] + '" data-ed11y-tip="' + index + '">' + icon + '</button></div>';
      let pretagged = el[0].attr('data-ed11y-marked');
      if (pretagged === 'before') {
        el[0].prev().find('.ed11y-pop').attr('data-ed11y-tip', el[0].prev().find('.ed11y-pop').attr('data-ed11y-tip') + ',' + index);
      } else if (pretagged === 'after') {
        el[0].next().find('.ed11y-pop').attr('data-ed11y-tip', el[0].next().find('.ed11y-pop').attr('data-ed11y-tip') + ',' + index);
      } else if (pretagged === 'prepend') {
        el[0].find('.ed11y-pop').attr('data-ed11y-tip', el[0].find('.ed11y-pop').attr('data-ed11y-tip') + ',' + index);
      } else {
        if (el[1] === 'after') {
          el[0].attr('data-ed11y-marked', 'after').addClass(el[3]).after(injection);
        } else if (el[1] === 'before') {
          el[0].attr('data-ed11y-marked', 'before').addClass(el[3]).before(injection);
        } else {
          el[0].attr('data-ed11y-marked', 'prepend').addClass(el[3]).prepend(injection);
        }
      }
    };

    // Show a warning/error count on the toggle button.
    this.updateCount = function () {
      let totalCount = this.errorCount + this.warningCount;
      if (totalCount > 0) {
        const _start3 = document.querySelectorAll('.ed11y-count');

        _start3.forEach(_element21 => _element21.textContent = totalCount);

        _start3.forEach(_element22 => _element22.setAttribute('style', 'display: inline-block !important;'));

        document.querySelectorAll('.ed11y-jumpnext').forEach(_element12 => _element12.textContent = totalCount > 1 ? 'first' : '');
        if (this.errorCount > 0) {
          const _start4 = document.querySelectorAll('#ed11y-panel');

          _start4.forEach(_element15 => _element15.classList.remove('ed11y-pass', 'ed11y-warnings'));

          _start4.forEach(_element16 => _element16.classList.add('ed11y-errors'));

          document.querySelectorAll('.ed11y-checkmessage').forEach(_element14 => _element14.textContent = totalCount === 1 ? 'One accessibility issue detected.' : totalCount + ' accessibility issues detected.');
        } else if (this.warningCount > 0) {
          const _start5 = document.querySelectorAll('#ed11y-panel');

          _start5.forEach(_element19 => _element19.classList.remove('ed11y-pass', 'ed11y-errors'));

          _start5.forEach(_element20 => _element20.classList.add('ed11y-warnings'));

          document.querySelectorAll('.ed11y-checkmessage').forEach(_element18 => _element18.textContent = totalCount === 1 ? 'One manual check needed.' : totalCount + ' manual checks needed.');
        }
      } else {
        document.querySelectorAll('.ed11y-checkmessage').forEach(_element23 => _element23.textContent = 'No Accessibility errors detected.');
        document.querySelectorAll('.ed11y-count').forEach(_element24 => _element24.setAttribute('style', 'display: none !important;'));

        const _start6 = document.querySelectorAll('#ed11y-panel');

        _start6.forEach(_element26 => _element26.classList.remove('ed11y-warnings', 'ed11y-errors'));

        _start6.forEach(_element27 => _element27.classList.add('ed11y-pass'));
      }
      document.querySelectorAll('.ed11y-preload').forEach(_element28 => _element28.classList.remove('ed11y-preload'));
    };

    // Resets all changes made by the tool. Removing outlines and
    // additional spans.
    this.reset = function () {

      this.resetTips();

      // Remove and reset panels and active items.
      document.querySelectorAll(".ed11y-fullcheck li, .ed11y-about-text").forEach(_element29 => _element29.parentNode.removeChild(_element29));

      const _start7 = document.querySelectorAll("#ed11y-main-toggle");

      _start7.forEach(_element34 => _element34.setAttribute("aria-expanded", "false"));

      _start7.forEach(_element35 => _element35.classList.remove('ed11y-toggle-active', 'ed11y-errors', 'ed11y-warnings'));

      const _start8 = document.querySelectorAll("#ed11y-panel");

      _start8.forEach(_element36 => _element36.classList.remove('ed11y-panel-minimized', 'ed11y-panel-active'));

      _start8.forEach(_element37 => _element37.classList.add('ed11y-panel-shut'));

      document.querySelectorAll(".ed11y-upper-active").forEach(_element32 => _element32.classList.remove('ed11y-upper-active'));
      document.querySelectorAll("#ed11y-panel-buttonbar [aria-pressed='true']").forEach(_element33 => _element33.setAttribute('aria-pressed', 'false'));
      ed11y.running = false;
    };

    this.resetTips = function () {
      // Remove error outlines.
      this.checkRoot.find(".ed11y-text-warning").removeClass("ed11y-text-warning");
      this.checkRoot.find(".ed11y-link-text-warning").removeClass("ed11y-link-text-warning");
      this.checkRoot.find(".ed11y-error-border").removeClass("ed11y-error-border");
      this.checkRoot.find(".ed11y-warning-border").removeClass("ed11y-warning-border");
      this.checkRoot.find(".ed11y-headings-fail").removeClass("ed11y-headings-fail");
      this.checkRoot.find(".ed11y-link-text-fail").removeClass("ed11y-link-text-fail");
      this.checkRoot.find(".ed11y-hidden-highlight").removeClass("ed11y-hidden-highlight");
      this.checkRoot.find(".ed11y-uppercase-warning").removeClass("ed11y-uppercase-warning");
      document.querySelectorAll('body').forEach(_element38 => _element38.classList.remove('ed11y-pops-ready'));

      // Remove buttons.
      document.querySelectorAll('[data-ed11y-marked]').removeAttr('data-ed11y-marked');
      this.checkRoot.find(".ed11y-instance, .ed11y-instance-inline, .ed11y-headings-label, .ed11y-reveal-alts").remove();
    };

    /*================== HEADING STRUCTURE MODULE ===================*/

    this.checkHeaders = async function () {
      // Reset panel; we rebuild on each run.
      document.querySelectorAll("#ed11y-outline-list li, .ed11y-headings-label").forEach(_element39 => _element39.parentNode.removeChild(_element39));

      // Only fetch headers within the content area.

      let prevLevel = 0;
      this.headingOutline = "";

      // Test each header level for accessibility issues.
      this.$h.each((i, el) => {
        let $el = document.querySelectorAll(el);
        let level;

        // Match up aria-headers to equivalent <h#> tag.
        if ($el[0].getAttribute('aria-level')) {
          level = +$el[0].getAttribute('aria-level');
        } else {
          level = +$el[0].tagName.slice(1);
        }
        let headingError = "";
        let outlinePrefix = "";
        let ed11yTip = "";
        let headingLength = $el[0].textContent.trim().length;
        if (level - prevLevel > 1 && i !== 0) {
          headingError = 'ed11y-warning-btn';
          outlinePrefix = '(flagged for skipped level) ';
          ed11yTip = ed11yMessageHeadingLevelSkipped(prevLevel, level);
        }
        if ($el[0].textContent.trim().length < 1) {
          const _chain3 = [].concat(...$el.map(_element40 => _element40.querySelectorAll('img')));

          let headingSubText = _chain3[0].getAttribute('alt');
          if (!headingSubText || headingSubText.length === 0) {
            headingError = 'ed11y-warning-btn';
            outlinePrefix = '(empty heading)';
            ed11yTip = ed11yMessageHeadingEmpty;
          }
        } else if ($el[0].textContent.trim().length > 160) {
          headingError = 'ed11y-warning-btn';
          outlinePrefix = '(flagged for length) ';
          ed11yTip = ed11yMessageHeadingTooLong(headingLength);
        }
        prevLevel = level;
        let liClass = "ed11y-outline-" + level;
        let liPrefix = "";
        // If the heading error is within a hyperlink, make sure to
        // append button after anchor tag.
        // Todo add this case to the test page
        if (headingError !== "" && $el.not(this.headerIgnore).length !== 0) {
          if ($el.closest("a").length > 0) {
            this.paints.push([$el.closest('a'), 'before', 'ed11y-instance', "ed11y-link-text-warning", headingError, ed11yTip]);
          } else {
            this.paints.push([$el, 'before', 'ed11y-instance', "ed11y-link-text-warning", headingError, ed11yTip]);
          }
          // Outline element if there is an error.
          liClass += " ed11y-text-warning";
          liPrefix = "<span class='ed11y-sr-only'> Warning: </span> ";
          this.warningCount++;
        }
        if (outlinePrefix) {
          outlinePrefix = "<span class='ed11y-small'><em>" + outlinePrefix + "</em></span>";
        }
        if ($el.not(ed11yOutlineIgnore).length !== 0) {
          this.headingOutline += "<li class='" + liClass + "'>" + "<span class='ed11y-small'>" + level + "</span> " + liPrefix + outlinePrefix + $el[0].textContent + "</li>";
        }
      });

      // Check for blockquotes used as headings. If it's less than 25
      // characters - it's probably not a blockquote.
      let $blockquotes = this.checkRoot.find("blockquote").not(this.containerIgnore);
      $blockquotes.each((i, el) => {
        let $el = document.querySelectorAll(el);
        if ($el[0].textContent.trim().length < 25) {
          this.warningCount++;
          ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageFullCheckBlockquote]);
        }
      });
    };

    /*======================== INPUTS MODULE =======================*/
    // todo: implement this module.

    /*================== ALTERNATIVE TEXT MODULE ====================*/

    // todo: consider flagging alts referencing to position and color.
    this.checkAltText = async function () {

      // Test each image for alternative text.
      this.$img.each((i, el) => {
        let $el = document.querySelectorAll(el);
        let alt = $el[0].getAttribute("alt");
        let linkChild = $el.parents('a[href]').length;

        if (typeof alt !== "string") {
          this.errorCount++;
          this.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yGeneralAltText]);
        } else if (alt.length === 0 && linkChild === 0) {
          // An empty alt may be ok, and we handle empty links in the
          // link tests.
          this.warningCount++;
          this.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltDecorative]);
        }

        // If alt attribute is present, further tests are done.
        else {
            let error = this.containsAltTextStopWords(alt);
            let altText = ed11y.sanitizeForHTML(alt);

            // Image fails if a url was found.
            // Todo: add images in links to test coverage.
            if ($el.parents().is("a[href]")) {
              if (error[0] !== null) {
                this.errorCount++;
                this.paints.push([$el.closest('a'), 'before', 'ed11y-instance-inline', "ed11y-error-border ed11y-imageTip", 'ed11y-error-btn', ed11yMessageAltUrl(altText)]);
              } else if (error[1] !== null) {
                // "image of"
                this.warningCount++;
                this.paints.push([$el.closest('a'), 'before', 'ed11y-instance-inline', "ed11y-warning-border ed11y-imageTip", 'ed11y-warning-btn', ed11yMessageAltImageOfLinked(error, altText)]);
              } else if (alt.length > 160) {
                // Image warning if it is a link and contains long alt text.
                this.warningCount++;
                this.paints.push([$el.closest('a'), 'before', 'ed11y-instance-inline', "ed11y-warning-border ed11y-imageTip", 'ed11y-warning-btn', ed11yMessageAltLongLinked(alt, altText)]);
              }
              // Image warning if it is a link, contains alt text AND
              // surrounding link text.
              else if (alt !== "" && $el.parents("a").text().trim().length > 1) {
                  this.warningCount++;
                  this.paints.push([$el.closest('a'), 'before', 'ed11y-instance-inline', "ed11y-warning-border ed11y-imageTip", 'ed11y-warning-btn', ed11yMessageAltLinkComplex(altText)]);
                }
            }
            // Now if there is no link...
            else if (error[0] !== null) {
                this.errorCount++;
                this.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-error-border ed11y-imageTip", 'ed11y-error-btn', ed11yMessageAltFilename(altText)]);
              } else if (error[1] !== null) {
                this.warningCount++;
                this.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-warning-border ed11y-imageTip", 'ed11y-warning-btn', ed11yMessageAltImageOf(error, altText)]);
              }
              // Alert with deadspace alt.
              else if (alt !== "" && alt.replace(/"|'|\s+/g, "") === "") {
                  this.errorCount++;
                  this.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageAltDeadspace]);
                }
                // Image error if alt text is too long.
                else if (alt.length > 160) {
                    this.warningCount++;
                    this.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltTooLong(alt, altText)]);
                  }
          }
      });
    };

    // Checks if text is not descriptive and returns the word(s) that are
    // making the text inaccessible.
    this.containsAltTextStopWords = function (alt) {
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
    this.checklinkText = async function () {
      // Todo: See if there is an alternative to :visible that shows only
      // visually hidden content.
      // Todo: Add test for consecutive links to same href?
      let $links = this.checkRoot.find("a[href]").not(this.linkIgnore);

      /* Mini function if you need to exclude any text contained with a span. We created this function to ignore automatically appended sr-only text for external links and document filetypes.
         $.fn.ignore = function(sel){
        return this.clone().find(sel||">*").remove().end();
      };
         Example: If you need to ignore any text within <span class="sr-only">test</span>.
          $el.ignore("span.sr-only").text().trim();
         */

      $links.each((i, el) => {
        let $el = document.querySelectorAll(el);
        let linkText = this.computeAriaLabel($el);
        let $img = [].concat(...$el.map(_element41 => _element41.querySelectorAll('img')));
        let hasImg = $img.length > 0;
        let downloadMatch = $el.filter(ed11yDownloadLinks).length;
        if (linkText === 'noAria') {
          linkText = $el[0].textContent.toLowerCase();
          if (hasImg) {
            let imgText = this.computeAriaLabel($img);
            if (imgText !== 'noAria') {
              linkText += imgText;
            } else {
              if ($img.some(_element42 => _element42.matches('[alt]'))) {
                linkText += $img[0].getAttribute('alt');
              } else {
                linkText += $img[0].getAttribute('src');
              }
            }
            // This only checks the alt, not aria-label
            hasImg = true;
          }
        }
        let linkStrippedText = linkText.replace(/'|"|-|\.|\s+/g, '');
        // $el.ignore(ed11ylinkTextIgnore).text().trim();

        // Tests to see if this link is empty
        // Todo add to test coverage
        if (linkStrippedText.length === 0) {
          linkStrippedText += ed11y.computeTitle($el);
          if (linkStrippedText.length === 0) {
            this.errorCount++;
            if (hasImg) {
              this.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageLinkHasNoText]);
            } else {
              this.paints.push([$el, 'before', 'ed11y-instance-inline ed11y-inline-block', "ed11y-link-text-fail", 'ed11y-error-btn', ed11yMessageLinkHasNoText]);
            }
          }
        } else {
          // Check for links with generic or URL titles
          let error = this.containslinkTextStopWords(linkText.trim());
          if (error !== "none") {
            this.warningCount++;
            let stopWordMessage = "";
            if (error === "url") {
              // Url
              stopWordMessage = ed11yMessagelinkTextIsURL;
            } else if (error === "generic") {
              stopWordMessage = ed11yMessagelinkTextIsGeneric;
            }
            this.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-link-text-warning", 'ed11y-warning-btn', stopWordMessage]);
          }
        }
        //Warning: Find all PDFs. Although only append warning icon to
        // first PDF on page.
        if (!hasImg && downloadMatch > 0) {
          this.warningCount++;
          $el.forEach(_element43 => _element43.classList.add('ed11y-text-warning'));
          ed11y.paints.push([$el, 'after', 'ed11y-instance-inline', "", 'ed11y-warning-btn', ed11yMessageLinkDownload]);
        }
        if ($el[0].getAttribute('target') === '_blank' && downloadMatch === 0 && linkText.indexOf('tab') === -1 && linkText.indexOf('window') === -1 && linkText.indexOf('external') === -1) {
          // Warn about unwarned new windows.
          this.warningCount++;
          this.paints.push([$el, 'before', 'ed11y-instance-inline', "ed11y-link-text-warning", 'ed11y-warning-btn', ed11yMessageQANewTab]);
        }
      });
    };

    // Checks if text is not descriptive and returns the word(s) that are
    // making the text inaccessible. stopWords will flag hyperlinks in
    // link titles. partialStopWords looks for links entirely made of
    // generic words. Note that this was extensively rewritten.
    this.containslinkTextStopWords = function (textContent) {
      // todo: use regex to find any three-letter TLD followed by a slash.
      let stopWords = ["http://", "https://", ".asp", ".htm", ".php", ".edu/", ".com/"];
      let partialStopRegex = /learn|to|more|now|this|page|link|site|website|check|out|view|our|read|\.|,|:|download|form|here|click|>|<|\s/g;
      let hit = "none";

      if (textContent.replace(partialStopRegex, '').length === 0) {
        // If no partial words were found, then check for total words.
        hit = "generic";
      } else {
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
    this.computeAriaLabel = function ($el) {
      // Todo: what if there is a span inside element with a label?
      if ($el.some(_element44 => _element44.matches('[aria-label]'))) {
        return $el[0].getAttribute('aria-label');
      } else if ($el.some(_element45 => _element45.matches('[aria-labelledby]'))) {
        let target = $el[0].getAttribute('aria-labelledby');
        if (target.length > 0) {
          target = '#' + target;
          target = target.replace(/ /g, ', #');
          let returnText = '';
          document.querySelectorAll(target).each(function () {
            returnText += document.querySelectorAll(this)[0].textContent + ' ';
          });
          return returnText;
        } else {
          return '';
        }
      } else {
        return 'noAria';
      }
    };

    // recursively look for titles
    this.computeTitle = function ($el) {
      if ($el.some(_element46 => _element46.matches('[title]'))) {
        return $el[0].getAttribute('title');
      } else if ([].concat(...$el.map(_element47 => _element47.querySelectorAll('[title]')))) {
        return [].concat(...$el.map(_element48 => _element48.querySelectorAll('[title]'))).first().attr('title');
      } else {
        return "";
      }
    };

    /*================== QUALITY ASSURANCE MODULE ===================*/

    this.checkQA = async function () {

      // Detect paragraphs that should be lists: a. A. a) A) * - -- •.
      let activeMatch = "";
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
      this.$p.each(function (i, el) {

        // Detect possible lists.
        let $first = document.querySelectorAll(el);
        let hit = false;
        // Grab first two characters.
        const _chain5 = $first[0].textContent;
        let firstPrefix = document.querySelectorAll(_chain5).substring(0, 2).toArray();
        if (firstPrefix.trim().length > 0 && firstPrefix !== activeMatch && firstPrefix.match(prefixMatch)) {
          const _chain7 = $first[0].innerHTML;

          // We have a prefix and a possible hit
          // Split p by carriage return if present and compare.
          let hasBreak = document.querySelectorAll(_chain7).indexOf("<br>").toArray();
          if (hasBreak !== -1) {
            const _chain9 = $first[0].innerHTML;

            const _chain10 = document.querySelectorAll(_chain9).substring(hasBreak + 4).toArray();

            let subParagraph = document.querySelectorAll(_chain10).trim().toArray();
            let subPrefix = subParagraph.substring(0, 2);
            if (firstPrefix === decrement(subPrefix)) {
              hit = true;
            }
          }
          // Decrement the second p prefix and compare .
          if (!hit) {
            let $second = Array.from(document.querySelectorAll(el)).map(_element49 => _element49.nextElementSibling).filter(_element49 => _element49.matches('p'));
            if ($second) {
              let secondPrefix = decrement(Array.from($first).map(_element50 => _element50.nextElementSibling).text().substring(0, 2));
              if (firstPrefix === secondPrefix) {
                hit = true;
              }
            }
          }
          if (hit) {
            ed11y.warningCount++;
            let ed11yShouldBeList = ed11yMessageQAShouldBeList(firstPrefix);
            ed11y.paints.push([$first, 'prepend', 'ed11y-instance-inline', "", 'ed11y-warning-btn', ed11yShouldBeList]);
            activeMatch = firstPrefix;
          } else {
            activeMatch = "";
          }
        } else {
          activeMatch = "";

          // Now check for possible header.

          const _chain12 = document.querySelectorAll($first).children('strong:only-child, b:only-child').toArray();

          let possibleHeader = _chain12[0].textContent;
          let maybeSentence = possibleHeader.match(/[.:;"']$/) !== null;
          if (possibleHeader.length > 0 && maybeSentence === false && possibleHeader.length === $first[0].textContent.length) {
            ed11y.warningCount++;
            ed11y.paints.push([$first, 'prepend', 'ed11y-instance-inline', "", 'ed11y-warning-btn', ed11yMessageQAMayBeHeader]);
          }
        }
      });

      // Warning: Detect uppercase. For each element, if it contains more
      // than 4 uppercase words in a row, indicate warning.
      // Uppercase word is anything that is more than 3 characters.
      // Todo check performance of new regex.
      this.checkRoot.find('h1, h2, h3, h4, h5, h6, p, li, blockquote').not(this.containerIgnore).each(function () {
        let $this = document.querySelectorAll(this);
        let thisText;
        if ($this.some(_element51 => _element51.matches('li'))) {
          // Prevent recursion through nested lists.
          thisText = [].concat(...Array.from($this).map(_parent => _parent.childNodes)).filter(function () {
            return this.nodeType === 3;
          }).text();
        } else {
          thisText = $this[0].textContent;
        }
        let uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
        // was
        // /(?!<a[^>]*?>)(\b[A-Z]['!:A-Z\s]{20,}|\b[A-Z]{20,}\b)(?![^<]*?<\/a>)/g
        let detectUpperCase = thisText.match(uppercasePattern);

        if (detectUpperCase && detectUpperCase[0].length > 10) {
          ed11y.warningCount++;
          ed11y.paints.push([$this, 'prepend', 'ed11y-instance-inline', "ed11y-uppercase-warning", 'ed11y-warning-btn', ed11yMessageQAUppercase]);
        }
      });

      // Check if a table has a table header.
      this.$table.each(function () {
        let $el = document.querySelectorAll(this);
        let $findTHeaders = [].concat(...$el.map(_element52 => _element52.querySelectorAll("th")));
        let $findHeadingTags = [].concat(...$el.map(_element53 => _element53.querySelectorAll("h1, h2, h3, h4, h5, h6")));
        if ($findTHeaders.length === 0) {
          ed11y.errorCount++;
          ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageMissingQATableHeadings]);
        } else {
          // Make sure all table headers are not empty.
          $findTHeaders.each(function () {
            let $th = document.querySelectorAll(this);
            if ($th[0].textContent.trim().length < 1 && !ed11y.computeTitle($th)) {
              ed11y.errorCount++;
              ed11y.paints.push([$th, 'prepend', 'ed11y-instance', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageEmptyTableHeader]);
            }
          });
        }
        if ($findHeadingTags.length > 0) {
          // todo: have paints function prefer stronger alert classes
          // when there are multiple
          $findHeadingTags.each(function () {
            ed11y.errorCount++;
            ed11y.paints.push([document.querySelectorAll(this), 'before', 'ed11y-instance', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageQAHeaderInTable]);
          });
        }
      });

      let $visualizationWarning = this.$embed.filter('[src*="datastudio.google.com"], [src*="tableau"]');
      if ($visualizationWarning.length > 0) {
        // Without an each() this only throws a single warning.
        $visualizationWarning.each((i, el) => {
          let $el = document.querySelectorAll(el);
          ed11y.warningCount++;
          // Todo provide documentation link regarding equivalent
          // formats, and add a matching warning to the link tests.
          ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageVisualization]);
        });
      }

      //Warn users to provide captions for videos.
      let $findVideos = this.$embed.filter("video, [src*='youtube.com'], [src*='vimeo.com'], [src*='kaltura.com']");
      $findVideos.each((i, el) => {
        let $el = document.querySelectorAll(el);
        ed11y.warningCount++;
        ed11y.mediaCount++;
        ed11y.paints.push([$el, 'before', 'ed11y-instance', "", 'ed11y-warning-btn', ed11yMessageFullCheckCaptions]);
      });

      //Warning: Make sure all podcasts have captions.
      // Todo: include more providers and embed types?
      // Todo: don't throw if "transcript" is found on the page?
      let $podcastWarning = this.$embed.filter('audio, iframe[src*="soundcloud.com"], iframe[src*="buzzsprout.com"], iframe[src*="podbean.com"]');
      if ($podcastWarning.length > 0) {
        $podcastWarning.each((i, el) => {
          let $el = document.querySelectorAll(el);
          ed11y.warningCount++;
          ed11y.mediaCount++;
          ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessagePodcast]);
        });
      }

      //Warning: Discourage use of Twitter timelines.
      // Todo 1.1 recreate test, and rewrite to include other platforms
      /*let $twitterWarning = $('[id^="twitter-widget"]').not(this.containerIgnore);
      $twitterWarning.each((i, el) => {
        let $el = $(el);
        var numberofTweets = $el.contents().find(".timeline-TweetList-tweet").length;
        if (numberofTweets > 3) {
          this.warningCount++;
          $el.addClass("ed11y-text-warning");
          ed11y.paints.push([$el,'before','ed11y-instance',"ed11y-text-warning",'ed11y-warning-btn',ed11yMessageTwitter]);
        }
      });*/

      if (ed11yEmbeddedContentWarning.length > 1) {
        let $embeddedWarning = this.checkRoot.find(ed11yEmbeddedContentWarning);
        $embeddedWarning.each((i, el) => {
          let $el = document.querySelectorAll(el);
          ed11y.warningCount++;
          ed11y.paints.push([$el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageEmbeddedContent]);
        });
      }
    };

    /*================== FULL CHECK MODULE ===================*/

    this.checkFull = function () {

      if (ed11y.mediaCount > 0) {
        // todo: localize
        document.querySelectorAll('#ed11y-image-list').prepend("" + "<li>There are <span class='ed11y-red-text'>" + ed11y.mediaCount + "</span> multimedia elements on this page. " + "Please make sure each provides closed captions (for video) or a transcript (for audio).</li>");
      }

      this.updateCount('full');
      this.readyTips(true);
    };
    // End of fullCheck()

    this.findElements = function () {
      // Find and cache so we don't have tests looking willynilly.
      this.$p = this.checkRoot.find('p').not(this.containerIgnore);
      this.$h = this.checkRoot.find("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]").not(this.containerIgnore);
      this.$img = this.checkRoot.find("img").not(this.imageIgnore);
      this.$embed = this.checkRoot.find("iframe, audio, video").not(this.containerIgnore);
      this.$table = this.checkRoot.find("table").not(this.containerIgnore);
    };
    // End of findElements()

    this.loadGlobals = function () {

      // Look for a content container
      if (typeof ed11yCheckRoot !== 'string' || document.querySelectorAll(ed11yCheckRoot).length === 0) {
        ed11yCheckRoot = 'body';
      }

      // Combine default and custom ignores.
      let separator = ", ";

      // Container ignores apply to self and children.
      if (ed11yContainerIgnore.length > 0) {
        let containerSelectors = ed11yContainerIgnore.split(',');
        for (let i = 0; i < containerSelectors.length; i++) {
          containerSelectors[i] = containerSelectors[i] + " *, " + containerSelectors[i];
        }
        ed11yContainerIgnore = '[aria-hidden]' + separator + containerSelectors.join();
      } else {
        ed11yContainerIgnore = '[aria-hidden]';
      }
      this.containerIgnore = ed11yContainerIgnore;

      // Images ignore defaults plus presentation role.
      if (ed11yImageIgnore.length > 1) {
        ed11yImageIgnore += separator;
      }
      this.imageIgnore = ed11yImageIgnore + this.containerIgnore + separator + "[role='presentation']";

      this.headerIgnore = ed11yHeaderIgnore;

      // Links ignore defaults plus Ed11y links.
      if (ed11yLinkIgnore.length > 0) {
        ed11yLinkIgnore += separator;
      }
      this.linkIgnore = ed11yLinkIgnore + ed11yContainerIgnore + separator + '[aria-hidden]';

      if (ed11yHeaderIgnore.length > 0) {
        this.headerIgnore += separator + ed11yContainerIgnore;
      } else {
        this.headerIgnore = ed11yContainerIgnore;
      }
    };
    this.readyPop = function ($el, text) {
      let thisText = "";
      let merge = 0;
      if (text) {
        thisText += text;
        merge++;
      }
      if ($el[0].getAttribute('data-ed11y-tip')) {
        const _chain14 = $el[0].getAttribute('data-ed11y-tip');

        let thisPaint = document.querySelectorAll(_chain14).split(',').toArray();
        thisPaint.forEach(function (item) {
          thisText += ed11y.paints[item][5];
        });
        merge++;
      }
      let thisContent = '<div class="ed11y-tip ed11y-reset"><span ' + 'class="ed11y-arrow"></span>' + '<button class="ed11y-button ed11y-close-tip" ' + 'type="button" aria-expanded="false" aria-label="close" ' + 'onclick=\'jQuery(this).parent().addClass("ed11y-hidden")' + '.removeClass("ed11y-tip-open").attr("style", "").prev()' + '.attr("aria-expanded", "false").addClass("ed11y-clicked")' + '.removeClass("ed11y-hover").focus()' + '.parents("ed11y-force-overflow")' + '.removeClass("ed11y-force-overflow"); return false;\'>' + '&times;</button><div class="ed11y-tip-content">' + thisText + '</div></div>';
      // $el.attr('aria-expanded', 'false').addClass('ed11y-clicked').removeClass('ed11y-hover');
      //               $tip.addClass('ed11y-hidden').removeClass('ed11y-tip-open').attr('style', '');
      //               $el.parents('.ed11y-force-overflow').removeClass('ed11y-force-overflow');
      if (merge > 1) {
        const _chain16 = Array.from($el).map(_element55 => _element55.nextElementSibling);

        const _chain17 = document.querySelectorAll(_chain16).children('ed11y-tip-content').toArray();

        _chain17.forEach(_element56 => _element56.innerHTML = thisText);
      } else {
        $el.forEach(_element58 => _element58.classList.add('ed11y-tip-ready'));

        const _chain18 = document.querySelectorAll($el).after(thisContent).toArray();
      }
    };

    this.readyTips = async function (fullcheck) {
      // This function is VERY expensive.
      // Todo: optimize?
      // For now: throw chunks to the end of the render queue to prevent
      // thread locking.
      ed11y.paints.forEach(function (el, index) {
        ed11y.paintButton(el, index);
      });
      // As soon as the buttons are in place, dispatch an event so themes
      // can react
      document.dispatchEvent(new CustomEvent("ed11yPanelOpened"));
      if (fullcheck === true) {
        window.setTimeout(function () {
          ed11y.$img.each(function () {
            let $img = document.querySelectorAll(this);
            let alt = ed11y.sanitizeForHTML($img[0].getAttribute('alt'));
            let src = $img[0].getAttribute('src');
            let width = $img.innerWidth() + 'px';
            let height = $img.innerHeight() + 'px';
            let inject = "<div class='ed11y-container ed11y-reveal-alts ed11y-reset' " + "style='width:" + width + " !important;height:" + height + " !important;'>" + "<span>" + ed11y.mainToggleIcon + "Alt: " + alt + "</span></div>";
            if (Array.from($img).map(_element59 => _element59.previousElementSibling).hasClass('ed11y-instance-inline') === true) {
              const _chain19 = Array.from($img).map(_element61 => _element61.previousElementSibling);

              const _chain20 = document.querySelectorAll(_chain19).before(inject).toArray();
            } else {
              $img.before(inject);
            }
            let imgClass = "";
            if ($img.classList.contains('ed11y-error-border')) {
              imgClass = "ed11y-error-border";
            } else if ($img.classList.contains('ed11y-warning-border')) {
              imgClass = "ed11y-warning-border";
            }
            document.querySelectorAll('#ed11y-image-list').append("" + "<li class='" + imgClass + "'>" + "<img src='" + src + "' alt='' class='ed11y-thumbnail'/>Alt: " + alt + "</li>");
          });
          window.setTimeout(function () {
            document.querySelectorAll('.ed11y-reveal-alts').each(function () {
              let $revealed = document.querySelectorAll(this);

              const _start9 = document.querySelectorAll(this);

              const _chain21 = document.querySelectorAll(_start9).nextAll('img').toArray();

              let $img = document.querySelectorAll(_chain21).first().toArray();
              let revealedOffset = $revealed.offset();
              let imgOffset = $img.offset();
              let newOffset = imgOffset.left - revealedOffset.left;
              let newStyle = $revealed[0].getAttribute('style') + ' margin-left: ' + newOffset + 'px !important;';
              $revealed.forEach(_element62 => _element62.setAttribute('style', newStyle));
            });
          }, 0);
        }, 0);
      }
      window.setTimeout(function () {
        ed11y.$pops = document.querySelectorAll('button.ed11y-pop').not('[id^="ed11y"]');
        let windowWidth = document.querySelectorAll(window).width();
        // Reading and writing styles creates thrashing. We must read
        // first.
        ed11y.popNudges = [];
        ed11y.$pops.each(function () {
          let $el = document.querySelectorAll(this);
          $el.forEach(_element63 => _element63.addEventListener('touchend click', function (event) {
            if (!ed11y.doubleClickPrevent) {
              ed11y.popThis($el, 'click');
            }
            ed11y.doubleClickPrevent = true;
            window.setTimeout(function () {
              ed11y.doubleClickPrevent = false;
            }, 200);
            return false;
          }));

          const _chain23 = document.querySelectorAll($el).filter('[aria-expanded="false"]').toArray();

          const _chain24 = document.querySelectorAll(_chain23).mouseenter(function () {
            ed11y.popThis($el, 'hover');
          }).toArray();
          // If the button will be offscreen, nudge it left or right to
          // fit.


          const _chain25 = document.querySelectorAll($el).parent().toArray();

          let offset = document.querySelectorAll(_chain25).offset().toArray();
          let offsetData = 0;
          if (offset.left < 8) {
            // Nudge right
            offsetData = 8 - offset.left;
          } else if (offset.left + 40 > windowWidth) {
            // Nudge left
            offsetData = offset.left - windowWidth - 40;
          }
          ed11y.popNudges.push([$el, offsetData]);
        });
        ed11y.popNudges.forEach(function (el, i) {
          if (el[1] === 0) {
            el[0].data('ed11yTipNudge', el[1]).attr('id', 'ed11y-pop-' + i);
          } else {
            el[0].attr('style', 'transform:translate(' + el[1] + 'px, 0) !important;').data('ed11yTipNudge', el[1]).attr('id', 'ed11y-pop-' + i);
          }
        });
        document.querySelectorAll('body').forEach(_element64 => _element64.classList.add('ed11y-pops-ready'));
      }, 0);
    };

    this.popThis = function ($el, trigger) {
      let isNew = false;
      if ($el.classList.contains('ed11y-tip-ready') === false) {
        isNew = true;
        this.readyPop($el, '');
      }
      let $tip = Array.from($el).map(_element65 => _element65.nextElementSibling);
      if (isNew === true) {
        ed11y.watchPop($el, $tip);
      }
      if ($el[0].getAttribute('aria-expanded') === 'true' && trigger === 'click') {
        // Close on click.
        $el.forEach(_element68 => _element68.setAttribute('aria-expanded', 'false'));
        $el.forEach(_element69 => _element69.classList.add('ed11y-clicked'));
        $el.forEach(_element70 => _element70.classList.remove('ed11y-hover'));
        $tip.forEach(_element71 => _element71.classList.add('ed11y-hidden'));
        $tip.forEach(_element72 => _element72.classList.remove('ed11y-tip-open'));
        $tip.forEach(_element73 => _element73.setAttribute('style', ''));

        const _chain27 = document.querySelectorAll($el).parents('.ed11y-force-overflow').toArray();

        _chain27.forEach(_element74 => _element74.classList.remove('ed11y-force-overflow'));
      } else if ($el[0].getAttribute('aria-expanded') === 'false') {

        let needToAlign;
        if (trigger === 'click') {
          // Open on click.
          const _start10 = document.querySelectorAll('.ed11y-tip-open');

          _start10.forEach(_element78 => _element78.classList.remove('ed11y-tip-open'));

          const _chain28 = Array.from(_start10).map(_element79 => _element79.previousElementSibling);

          _chain28.forEach(_element80 => _element80.setAttribute('aria-expanded', 'false'));

          $el.forEach(_element81 => _element81.setAttribute('aria-expanded', 'true'));
          $el.forEach(_element82 => _element82.classList.remove('ed11y-hover'));
          $tip.forEach(_element83 => _element83.classList.remove('ed11y-hidden'));
          $tip.forEach(_element84 => _element84.classList.add('ed11y-tip-open'));

          needToAlign = true;
        } else if ($el.not('.ed11y-hover')) {
          // Open on hover
          const _start11 = document.querySelectorAll('.ed11y-pop');

          const _chain29 = document.querySelectorAll(_start11).filter('.ed11y-hover, [aria-expanded="true"]').toArray();

          _chain29.forEach(_element87 => _element87.classList.remove('.ed11y-hover', 'ed11y-clicked', 'ed11y-tip-open'));

          _chain29.forEach(_element88 => _element88.setAttribute('aria-expanded', 'false'));

          const _chain30 = Array.from(_chain29).map(_element89 => _element89.nextElementSibling);

          _chain30.forEach(_element90 => _element90.classList.remove('ed11y-tip-open'));

          $el.forEach(_element85 => _element85.classList.add('ed11y-hover'));
          $tip.forEach(_element91 => _element91.classList.remove('ed11y-hidden'));
          $tip.forEach(_element92 => _element92.classList.add('ed11y-tip-open'));

          needToAlign = true;
        }
        if (needToAlign === true) {
          // Dispatch an event that a tooltip has appeared.
          document.dispatchEvent(new CustomEvent("ed11yPop", {
            detail: { id: $el[0].getAttribute('id') }
          }));

          if (ed11yAllowOverflow.length > 0) {
            const _chain31 = document.querySelectorAll($el).parents(ed11yAllowOverflow).toArray();

            _chain31.forEach(_element93 => _element93.classList.add('ed11y-force-overflow'));
          } else {
            const _chain32 = document.querySelectorAll($el).parents().toArray();

            const _chain33 = document.querySelectorAll(_chain32).not('body').toArray();

            const _chain34 = document.querySelectorAll(_chain33).each(function () {
              if (getComputedStyle(document.querySelectorAll(this)[0])['overflow'] === 'hidden') {
                document.querySelectorAll(this).forEach(_element94 => _element94.classList.add('ed11y-force-overflow'));
              }
            }).toArray();
          }
          this.alignTip($el, $tip);
          ed11y.goto = parseInt($el[0].getAttribute('id').substring(10));
          // Update the panel
          let ed11yGotoText = 'next';
          if (ed11y.gotoCount === 1) {
            ed11yGotoText = '';
          } else if (ed11y.gotoCount - 1 === ed11y.goto) {
            ed11y.goto = 0;
            ed11yGotoText = 'first';
          } else {
            ed11y.goto++;
          }
          window.setTimeout(function () {
            document.querySelectorAll('.ed11y-jumpnext').forEach(_element95 => _element95.textContent = ed11yGotoText);
          }, 250);
        }
      }
    };

    this.alignTip = function ($el, $tip) {
      $tip.forEach(_element109 => _element109.setAttribute('style', ''));
      $tip.forEach(_element110 => _element110.classList.remove('ed11y-tip-left', 'ed11y-tip-under'));

      const _chain35 = [].concat(...$tip.map(_element111 => _element111.querySelectorAll('.ed11y-arrow')));

      _chain35.forEach(_element112 => _element112.setAttribute('left', 'initial'));

      let buttonOffset = $el.offset();
      let buttonWidth = $el.outerWidth(true);
      let tipOffset = $tip.offset();
      let tipWidth = $tip.width();
      let windowWidth = document.querySelectorAll(window).width();
      let roomToLeft = buttonOffset.left - tipWidth - 50;
      let roomToRight = windowWidth - (buttonOffset.left + tipWidth + 90);
      if (roomToRight < 0) {
        // Can't go right.
        if (roomToLeft > 0) {
          // Go left if there is room.
          $tip.forEach(_element97 => _element97.classList.add('ed11y-tip-left'));
          let targetOffset = buttonOffset.left - tipWidth - buttonWidth - 2;
          let nudge = targetOffset - tipOffset.left;
          $tip.forEach(_element99 => _element99.setAttribute('style', 'transform: translate(' + nudge + 'px) !important;'));

          const _chain36 = [].concat(...$tip.map(_element100 => _element100.querySelectorAll('.ed11y-arrow')));

          const _chain37 = document.querySelectorAll(_chain36).removeAttr('style').toArray();
        } else {
          // Go under if there is not.
          $tip.forEach(_element101 => _element101.classList.add('ed11y-tip-under'));
          let nudgeY = 58;
          // we don't want to hit the right edge maybe that's all we should worry about?
          let targetOffsetX = 5;
          let nudgeX = targetOffsetX - tipOffset.left;
          let arrowTranslateY = -26;
          let arrowTranslateX = buttonOffset.left + 11;
          $tip.forEach(_element103 => _element103.setAttribute('style', 'transform: translate(' + nudgeX + 'px, ' + nudgeY + 'px) !important;'));

          const _chain38 = [].concat(...$tip.map(_element104 => _element104.querySelectorAll('.ed11y-arrow')));

          _chain38.forEach(_element105 => _element105.setAttribute('style', 'transform: translate(' + arrowTranslateX + 'px, ' + arrowTranslateY + 'px) rotate(135deg) !important;'));
        }
      } else {
        // Go right.
        let tipTranslateX = buttonWidth + 13;
        $tip.forEach(_element107 => _element107.setAttribute('style', 'transform: translate(' + tipTranslateX + 'px, 4px) !important;'));

        const _chain39 = [].concat(...$tip.map(_element108 => _element108.querySelectorAll('.ed11y-arrow')));

        const _chain40 = document.querySelectorAll(_chain39).removeAttr('style').toArray();
      }
    };

    this.tipHoverAffordance = function ($el, $tip) {
      if ($tip.some(_element113 => _element113.matches(':hover')) === false && $el.some(_element114 => _element114.matches(':hover')) === false && $el.some(_element115 => _element115.matches('.ed11y-hover')) === true) {
        window.setTimeout(function () {
          if ($tip.some(_element116 => _element116.matches(':hover')) === false && $el.some(_element117 => _element117.matches(':hover')) === false) {
            // Close on de-hover
            $el.forEach(_element120 => _element120.classList.remove('ed11y-hover', 'ed11y-clicked'));
            $el.forEach(_element121 => _element121.setAttribute('aria-expanded', 'false'));

            $tip.forEach(_element119 => _element119.classList.remove('ed11y-tip-open'));

            const _chain41 = document.querySelectorAll($el).parents('.ed11y-force-overflow').toArray();

            _chain41.forEach(_element122 => _element122.classList.remove('ed11y-force-overflow'));
          }
        }.bind($el, $tip), 500);
      }
    };

    this.watchPop = function ($el, $tip) {
      $el.mouseleave(function () {
        ed11y.tipHoverAffordance($el, $tip);
      });
      $tip.mouseleave(function () {
        ed11y.tipHoverAffordance($el, $tip);
      });
    };
    // Todo move this to CSS
    this.mainToggleIcon = "<svg role='img' focusable='false' width='28px' height='28px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

    this.buildPanels = function (onLoad) {
      if (onLoad === true) {
        // Create a floating button and hidden divs that contain
        // success/warning message.

        document.querySelectorAll('body').append(ed11yPanel);

        // Handle main toggle button.
        document.querySelectorAll("#ed11y-main-toggle").forEach(_element123 => _element123.addEventListener('click', function (event) {
          if (!ed11y.doubleClickPrevent) {
            // Prevent clicking during scan.
            if (ed11y.running !== true) {
              ed11y.running = true;

              // Rescan on open, or shut.
              if (document.querySelectorAll('#ed11y-panel').classList.contains('ed11y-panel-shut') === true) {
                ed11y.checkAll(false, "show");
              } else {
                ed11y.reset();
              }
            }
          }
          ed11y.doubleClickPrevent = true;
          window.setTimeout(function () {
            ed11y.doubleClickPrevent = false;
          }, 200);
          return false;
        }));

        // Handle jumplinks
        this.goto = 0;
        document.querySelectorAll('.ed11y-jumplink').forEach(_element124 => _element124.addEventListener('click', function (event) {
          event.preventDefault();

          // Find our button.
          let $goto = document.querySelectorAll('button[class^="ed11y"][data-ed11y-tip]').not('#ed11y-panel button');
          ed11y.gotoCount = $goto.length;
          ed11y.$goto = $goto.eq(ed11y.goto);
          ed11y.gotoOffset = ed11y.$goto.offset().top - parseInt(getComputedStyle(document.querySelectorAll('body')[0])['padding-top']) - 50;
          // Throw an alert if the button or target is hidden.
          let $firstVisible = false;
          let $target;
          let insert = ed11y.$goto.attr('data-ed11y-inserted');
          if (insert === "before") {
            $target = ed11y.$goto.parent().next();
          } else if (insert === "prepend") {
            $target = ed11y.$goto.parent().parent();
          } else {
            $target = ed11y.$goto.parent().prev();
          }
          let alertMessage;

          if (ed11yHiddenHandlers.length > 0 && ($target.filter(ed11yHiddenHandlers).length > 0 || $target.parents(ed11yHiddenHandlers).length > 0)) {
            document.dispatchEvent(new CustomEvent("ed11yShowHidden", {
              detail: { id: ed11y.$goto.attr('id') }
            }));
            window.setTimeout(function () {
              // Go to the button.
              ed11y.gotoOffset = ed11y.$goto.offset().top - parseInt(getComputedStyle(document.querySelectorAll('body')[0])['padding-top']) - 50;
              document.querySelectorAll('html, body').animate({
                scrollTop: ed11y.gotoOffset
              }, 1);
              ed11y.popThis(ed11y.$goto, 'click');
              ed11y.$goto.focus();
            }, 500);
          } else {
            if ($target.filter(':visible').length === 0) {
              $firstVisible = ed11y.$goto.parent().closest(':visible');
              alertMessage = ed11yInvisibleTip;
            } else if (ed11y.$goto.closest('[aria-hidden="true"]').length > 0 || $target.filter('[aria-hidden="true"]').length > 0) {
              $firstVisible = ed11y.$goto.closest('[aria-hidden="true"]').parents(':visible').first();
              alertMessage = ed11yHiddenTip;
            }
            if ($firstVisible.length > 0) {
              alert(alertMessage);
              $firstVisible.forEach(_element126 => _element126.classList.add('ed11y-hidden-highlight'));

              const _chain42 = document.querySelectorAll($firstVisible).prepend('<div tabindex="-1" class="ed11y-sr-only ed11y-hidden-highlight-' + ed11y.goto + '">Highlighted container</div>').toArray();

              ed11y.gotoOffset = $firstVisible.offset().top - parseInt(getComputedStyle(document.querySelectorAll('body')[0])['padding-top']) - 50;
              ed11y.popThis(ed11y.$goto, 'click');
              let thisGoTo = '.ed11y-hidden-highlight-' + ed11y.goto;
              document.querySelectorAll(thisGoTo).focus();
            } else {
              // Go to the button.
              document.querySelectorAll('html, body').animate({
                scrollTop: ed11y.gotoOffset
              }, 1);
              ed11y.popThis(ed11y.$goto, 'click');
              ed11y.$goto.focus();
            }
          }
        }));

        document.querySelectorAll('.ed11y-minimize').forEach(_element127 => _element127.addEventListener('click', function (event) {
          event.preventDefault();
          document.querySelectorAll(this).forEach(_element128 => _element128.setAttribute('aria-pressed', function (i, attr) {
            return attr === 'true' ? 'false' : 'true';
          }));
          document.querySelectorAll('#ed11y-panel').forEach(_element129 => _element129.classList.toggle('ed11y-panel-minimized'));
        }));

        document.querySelectorAll('.ed11y-about').forEach(_element130 => _element130.addEventListener('click', function (event) {
          event.preventDefault();
          if (document.querySelectorAll(this)[0].getAttribute('aria-pressed') === 'false') {
            document.querySelectorAll(this).forEach(_element131 => _element131.setAttribute('aria-pressed', 'true'));
            document.querySelectorAll('#ed11y-panel-upper').prepend('<div class="ed11y-about-text" tabindex="-1">' + ed11yAbout + '</div>');
            window.setTimeout(function () {
              document.querySelectorAll('.ed11y-about-text').focus();
            }, 1500);
          } else {
            document.querySelectorAll(this).forEach(_element132 => _element132.setAttribute('aria-pressed', 'false'));
            document.querySelectorAll('.ed11y-about-text').forEach(_element133 => _element133.parentNode.removeChild(_element133));
          }
        }));

        document.querySelectorAll('#ed11y-shutpanel').forEach(_element134 => _element134.addEventListener('click', function (event) {
          event.preventDefault();

          const _start12 = document.querySelectorAll('#ed11y-main-toggle');

          const _chain43 = document.querySelectorAll(_start12).focus().toArray();

          const _chain44 = document.querySelectorAll(_chain43).click().toArray();
        }));

        document.querySelectorAll('.ed11y-upper-next-button').forEach(_element135 => _element135.addEventListener('click', function (event) {
          event.preventDefault();
          // Todo optional: maybe write next/previous logic when there
          // are more than two

          const _start13 = document.querySelectorAll(this);

          const _chain45 = document.querySelectorAll(_start13).parent().toArray();

          const _chain46 = [].concat(...Array.from(_chain45).map(_parent2 => [..._parent2.parentNode.children].filter(_element136 => _element136 !== _parent2 && _element136.matches('.ed11y-fullcheck'))));

          _chain46.forEach(_element137 => _element137.classList.add('ed11y-upper-active'));

          const _start14 = document.querySelectorAll(this);

          const _chain47 = document.querySelectorAll(_start14).parent().toArray();

          _chain47.forEach(_element138 => _element138.classList.remove('ed11y-upper-active'));
        }));

        // Handle fullcheck requests.
        document.querySelectorAll("#ed11y-summary-toggle").forEach(_element139 => _element139.addEventListener('click', function () {
          document.querySelectorAll(this).forEach(_element140 => _element140.setAttribute('aria-pressed', function (i, attr) {
            return attr === 'true' ? 'false' : 'true';
          }));
          if (document.querySelectorAll(this)[0].getAttribute('aria-pressed') === 'false') {
            // Close and remove
            document.querySelectorAll(".ed11y-upper-active").forEach(_element141 => _element141.classList.remove('ed11y-upper-active'));
            document.querySelectorAll('.ed11y-reveal-alts').forEach(_element142 => _element142.parentNode.removeChild(_element142));
            document.querySelectorAll('.ed11y-headings-label').forEach(_element143 => _element143.setAttribute('style', 'display: none !important'));
            document.querySelectorAll("#ed11y-image-list li").forEach(_element144 => _element144.parentNode.removeChild(_element144));

            const _start15 = document.querySelectorAll(".ed11y-full-active");

            _start15.forEach(_element146 => _element146.classList.remove('ed11y-full-active'));

            _start15.forEach(_element147 => _element147.classList.add('ed11y-full-only'));
          } else {
            ed11y.resetTips();
            window.setTimeout(function () {
              ed11y.checkFull();
              ed11y.$h.each(function () {
                // Todo implement outline ignore function.
                let $el = document.querySelectorAll(this);
                if (![].concat(...$el.map(_element148 => _element148.querySelectorAll('.ed11y-headings-label'))).length) {
                  let level;
                  // Match up aria-headers to equivalent <h#> tag.
                  if ($el[0].getAttribute('aria-level')) {
                    level = +$el[0].getAttribute('aria-level');
                  } else {
                    level = +$el[0].tagName.slice(1);
                  }
                  document.querySelectorAll(this).prepend(" <span class='ed11y-headings-label'>H" + level + "</span> ");
                }
              });
              document.querySelectorAll('#ed11y-fullcheck-headers').forEach(_element149 => _element149.classList.add('ed11y-upper-active'));

              const _start16 = document.querySelectorAll("#ed11y-outline-list");

              _start16.forEach(_element152 => _element152.innerHTML = '');

              const _chain48 = document.querySelectorAll(_start16).append(ed11y.headingOutline).toArray();

              const _chain49 = document.querySelectorAll(_chain48).focus().toArray();

              const _start17 = document.querySelectorAll('.ed11y-full-only');

              _start17.forEach(_element153 => _element153.classList.remove('ed11y-full-only'));

              _start17.forEach(_element154 => _element154.classList.add('ed11y-full-active'));

              document.querySelectorAll('.ed11y-headings-label').removeAttr('style');
              document.querySelectorAll('#ed11y-fullcheck-outline-header').focus();
            }, 0);
          }
        }));

        window.addEventListener('resize', function () {
          if (document.querySelectorAll('#ed11y-summary-toggle')[0].getAttribute('aria-expanded') === 'true') {
            ed11y.checkRoot.find('img').each(function () {
              let width = document.querySelectorAll(this).innerWidth() + 'px';
              let height = document.querySelectorAll(this).innerHeight() + 'px';

              const _start18 = document.querySelectorAll(this);

              const _chain50 = document.querySelectorAll(_start18).prevAll('.ed11y-reveal-alts').toArray();

              const _chain51 = getComputedStyle(_chain50[0])[{
                'width': width + ' !important',
                'height': height + ' !important'
              }];
            });
          }
          let $tip = document.querySelectorAll('.ed11y-tip-open');
          if ($tip.length > 0) {
            let $el = Array.from($tip).map(_element155 => _element155.previousElementSibling);
            ed11y.alignTip($el, $tip);
          }
        });

        // Escape key on main closes panels.
        document.querySelectorAll(document).keyup(function (escape) {
          if (escape.keyCode === 27) {
            let $openTipButton = document.querySelectorAll('.ed11y-instance:focus-within, .ed11y-instance-inline:focus-within').children('.ed11y-pop[aria-expanded="true"]');
            if ($openTipButton.length > 0) {
              const _chain52 = document.querySelectorAll($openTipButton).focus().toArray();

              const _chain53 = document.querySelectorAll(_chain52).click().toArray();
            } else if (document.querySelectorAll('.ed11y-fullcheck.ed11y-panel-active').length > 0 && document.querySelectorAll('.ed11y-fullcheck:focus-within, #ed11y-summary-toggle:focus').length > 0) {
              const _start19 = document.querySelectorAll('#ed11y-summary-toggle');

              const _chain54 = document.querySelectorAll(_start19).focus().toArray();

              const _chain55 = document.querySelectorAll(_chain54).click().toArray();
            } else if (document.querySelectorAll('.ed11y-about[aria-expanded="true"]:focus, .ed11y-about-text:focus-within').length > 0) {
              const _start20 = document.querySelectorAll('.ed11y-about');

              const _chain56 = document.querySelectorAll(_start20).focus().toArray();

              const _chain57 = document.querySelectorAll(_chain56).click().toArray();
            } else if (document.querySelectorAll('#ed11y-panel:focus-within').length > 0) {
              const _start21 = document.querySelectorAll('#ed11y-main-toggle');

              const _chain58 = document.querySelectorAll(_start21).focus().toArray();

              const _chain59 = document.querySelectorAll(_chain58).click().toArray();
            }
          }
        });
      }
    };

    this.sanitizeForHTML = function (string) {
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
    };
  }
  // End of Ed11y library.
}; // Generic init.


if (document.readyState !== 'loading') {
  _onLoadListener();
} else {
  document.addEventListener('DOMContentLoaded', _onLoadListener);
}
