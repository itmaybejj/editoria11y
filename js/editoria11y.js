// Generic init.
$( document ).ready(function() {
  if (window.navigator.userAgent.match(/MSIE|Trident/) === null) {
    // IE 11 is going to suffer under this load.
    var ed11y = new Ed11y();
  }

  /***
   * Ed11y base library.
   * @constructor
   */

  function Ed11y() {
    $(function () {
      setTimeout(function () {
        // Don't trigger tests until page has had time to settle.
        if ($(ed11yNoRun).length === 0) {
          ed11y.loadGlobals();
          ed11y.checkAll(true, 'hide');
        }
      }, 500);
    });

    // Toggles the outline of all headers, link texts, and images.
    this.checkAll = async function (onLoad, showPanel) {
      this.paints = [];
      this.errorCount = 0;
      this.warningCount = 0;
      this.checkRoot = $(ed11yCheckRoot);
      if ($(ed11yNoRun).length === 0) {
        await Promise.all([
          this.checkLinkText(),
          this.checkAltText(),
          this.buildPanels(onLoad),
          this.checkHeaders(),
          this.checkQA()
        ]).then();
        // forms is disabled:
        // this.checkLabels();
        ed11y.updatePanel(onLoad, showPanel);
        $('#ed11y-main-toggle').removeClass('disabled').removeAttr('aria-disabled').removeAttr('title');
      }
      else {
        ed11y.reset();
        $('#ed11y-main-toggle').addClass('disabled').attr('aria-disabled','true').attr('title','Editoria11y is disabled during live editing.');
      }
    };

    this.updatePanel = function (onLoad, showPanel) {
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
        }
        else if (ed11yAlertMode === "assertive") {
          // User has not seen these errors; force open panel.
          // CMS integrations can set this dynamically.
          showPanel = "show";
        }
        ed11ySeenParsed[ed11yPage] = totalFound;
        localStorage.setItem('ed11ySeen', JSON.stringify(ed11ySeenParsed));
      }
      else if (onLoad === true && totalFound === 0) {
        showPanel = "pass";
      }

      // Now we can open or close the panel.
      if (showPanel !== "show") {
        ed11y.reset();
      }
      else {
        window.setTimeout(function () {
          $('.ed11y-minimized').removeClass('ed11y-minimized');
          document.getElementById("ed11y-panel").classList.add("ed11y-active");
          $('#ed11y-main-toggle').attr('aria-expanded', 'true');
          document.dispatchEvent(new CustomEvent("ed11yPanelOpened"));
          ed11y.readyTips();
        }, 0);
      }
      $('.ed11y-preload').removeClass('ed11y-preload');
    }

    this.paintButton = function (el, index) {
      //this.paints.push([$el,'before','ed11y-instance','ed11y-error-border','ed11y-link-warning-btn',generalAltText]);
      // 0 $el
      // 1 insertion position
      // 2 block or inline
      // 3 wrapper class
      // 4 button
      // 5 message
      let icon = ed11y.ErrorIcon;
      if (el[4].indexOf('warning') !== -1) {
        icon = ed11y.WarningIcon;
      }
      let injection = '<div class="' + el[2] + ' ed11y-reset"><button type="button" class="' +
          el[4] +
          ' ed11y-pop ed11y-hidden" aria-expanded="false" data-ed11y-inserted="' + el[1] + '" data-ed11y-tip="' +
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
    }

    // Show a warning/error count on the toggle button.
    this.updateCount = function (checkType) {
      let totalCount = this.errorCount + this.warningCount;
      if (totalCount > 0) {
        $('.ed11y-count').text(totalCount).attr('style','display: inline-block !important;');
        $('.ed11y-panelcount').text(totalCount === 1 ? 'one potential issue' : totalCount + ' issues');
        if (totalCount > 1) {
          $('.ed11y-jumpnext').text('first');
        }
        if (this.errorCount > 0) {
          //
          document.getElementById("ed11y-main-toggle").classList.add("ed11y-toggle-errors");
          $('#ed11y-warnings, #ed11y-no-errors').removeClass('ed11y-active');
          $('#ed11y-errors-found').addClass('ed11y-active');
        }
        else if (this.warningCount > 0) {
          document.getElementById("ed11y-main-toggle").classList.add("ed11y-toggle-warnings");
          $('#ed11y-errors-found, #ed11y-no-errors').removeClass('ed11y-active');
          $('#ed11y-warnings').addClass('ed11y-active');
        }
      }
      else {
        $('.ed11y-count').attr('style','display: none !important;');
        $('#ed11y-errors-found, #ed11y-warnings').removeClass('ed11y-active');
        $('#ed11y-no-errors').addClass('ed11y-active');
      }
      $('.ed11y-checktype').text(checkType === 'quick' ? 'Quick check' : 'Full check');
    }

    // Resets all changes made by the tool. Removing outlines and additional spans.
    this.reset = function () {

      this.resetTips();

      // Remove and reset panels and active items.
      $(".ed11y-error-message, .ed11y-pass-message, .ed11y-warning-message, .ed11y-fullcheck li").remove();
      $("#ed11y-main-toggle").attr("aria-expanded", "false").removeClass("ed11y-toggle-active");
      $(".ed11y-active").removeClass("ed11y-active");
      $("#ed11y-summary-toggle").attr('aria-expanded','false').removeClass("ed11y-btn-active");
    }

    this.resetTips = function() {
      // Remove error outlines.
      this.checkRoot.find(".ed11y-text-warning").removeClass("ed11y-text-warning");
      this.checkRoot.find(".ed11y-link-text-warning").removeClass("ed11y-link-text-warning");
      this.checkRoot.find(".ed11y-error-border").removeClass("ed11y-error-border");
      this.checkRoot.find(".ed11y-warning-border").removeClass("ed11y-warning-border");
      this.checkRoot.find(".ed11y-headings-fail").removeClass("ed11y-headings-fail");
      this.checkRoot.find(".ed11y-link-text-fail").removeClass("ed11y-link-text-fail");
      this.checkRoot.find(".ed11y-hidden-highlight").removeClass("ed11y-hidden-highlight");
      this.checkRoot.find(".ed11y-uppercase-warning").removeClass("ed11y-uppercase-warning");

      // Remove buttons.
      $('[data-ed11y-marked]').removeAttr('data-ed11y-marked');
      this.checkRoot.find(".ed11y-instance, .ed11y-instance-inline, .ed11y-headings-label, .ed11y-reveal-alts").remove();
    }

    /*================== HEADING STRUCTURE MODULE ===================*/

    this.checkHeaders = function () {
      // Reset panel; we rebuild on each run.
      $("#ed11y-outline-list li, .ed11y-headings-label").remove();

      // Only fetch headers within the content area.
      let $headings = this.checkRoot.find("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]");
      let prevLevel = 0;
      this.headingOutline = "";

      // Test each header level for accessibility issues.
      $headings.each((i, el) => {
        let $el = $(el);
        let level;

        // Match up aria-headers to equivalent <h#> tag.
        if ($el.attr('aria-level')) {
          level = + $el.attr('aria-level');
        }
        else {
          level = + $el.prop("tagName").slice(1);
        }
        let headingError = "";
        let outlinePrefix ="";
        let ed11yTip = "";
        let headingLength = $el.text().trim().length;
        if (level - prevLevel > 1 && i !== 0) {
          headingError = 'ed11y-link-warning-btn';
          outlinePrefix = '(flagged for skipped level) ';
          ed11yTip = ed11y.ed11yMessageHeadingLevelSkipped(prevLevel,level);
        }
        else if ($el.text().trim().length < 1) {
          headingError = 'ed11y-warning-btn';
          outlinePrefix = '(empty heading)';
          ed11yTip = this.ed11yMessageHeadingEmpty;
        }
        else if ($el.text().trim().length > 160) {
          headingError = 'ed11y-link-warning-btn';
          outlinePrefix = '(flagged for length) ';
          ed11yTip = this.ed11yMessageHeadingTooLong(headingLength);
        }
        prevLevel = level;
        let liClass = "ed11y-outline-" + level;
        let liPrefix = "";
        // If the heading error is within a hyperlink, make sure to
        // append button after anchor tag.
        if (headingError !== "" && $el.not(this.headerIgnore).length !== 0) {
          if ($el.closest("a").length > 0) {
            this.paints.push([$el.closest('a'),'before','ed11y-instance',"ed11y-link-text-warning",headingError,ed11yTip]);
          }
          else {
            this.paints.push([$el,'before','ed11y-instance',"ed11y-link-text-warning",headingError,ed11yTip]);
          }
          // Outline element if there is an error.
          liClass += " ed11y-text-warning";
          liPrefix = "<span class='ed11y-sr-only'> Warning: </span> ";
          this.warningCount++;
        }
        if (outlinePrefix) {
          outlinePrefix = "<span class='ed11y-small'><em>" + outlinePrefix +
              "</em></span>";
        }
        if ($el.not(ed11yOutlineIgnore).length !== 0) {
          this.headingOutline += "<li class='" + liClass + "'>" +
              "<span class='ed11y-small'>" + level + "</span> " +
              liPrefix + outlinePrefix + $el.text() +
              "</li>";
        }
      });
    };

    /*======================== INPUTS MODULE =======================*/
    // todo Beta: test and implement module.

    /*================== ALTERNATIVE TEXT MODULE ====================*/

    // Toggles the outline of images.
    this.checkAltText = function () {

      let $images = this.checkRoot.find("img").not(ed11y.imageIgnore);
      /* Example: Find all images within the main content area only, and exclude images containing a path.*/

      // Test each image for alternative text.
      $images.each((i, el) => {
        let $el = $(el);
        let text = $el.attr("alt");
        let ed11yMessage = "";
        let linkChild = $el.parents('a[href]').length;

        if (typeof text !== "string") {
          this.errorCount++;
          let generalAltText = "<div class='ed11y-tip-heading'>Error: Alt text attribute is missing</div>" +
              "<p>All visual elements must provide a text alternative for assistive devices.</p>" +
              "<p>If a blank alt was provided (alt=&quot;&quot;), screen readers would ignore the image. " +
              "But in this case the alt attribute is <span class='ed11y-bold'>missing</span>, so screen readers will dictate the url of the image file, one letter at a time.</p>" +
              "<p>To fix: edit this image and place <a href='https://accessibility.princeton.edu/how/content/alternative-text'>a concise description of its meaning in context</a> " +
              "in its alternative text field.</p>"
          this.paints.push([$el,'before','ed11y-instance-inline',"ed11y-error-border",'ed11y-error-btn',generalAltText]);
        }
        else if (text.length === 0 && linkChild === 0) {
          // An empty alt may be ok, and we handle empty links in the link tests.
          this.warningCount++;
          let generalAltText = "<div class='ed11y-tip-heading'>Manual check: image marked as decorative</div><p>All meaningful visual elements must <a href='https://accessibility.princeton.edu/how/content/alternative-text'>provide a text alternative</a>. Images with empty alt attributes are ignored by screen readers; if this image conveys a message to sighted users beyond use as a spacer or background, please add alt text.</p>"
          this.paints.push([$el,'before','ed11y-instance-inline',"ed11y-warning-border",'ed11y-warning-btn',generalAltText]);
        }

        // If alt attribute is present, further tests are done.
        else {
          let altText = text.replace(/'/g, "&#39;"); //replace apostrophe with HTML ascii to prevent breaking popover.
          let error = this.containsAltTextStopWords(altText);

          // Image fails if a url was found.
          if ($el.parents().is("a[href]")) {
            if (error[0] !== null) {
              this.errorCount++;
              ed11yMessage = "<div class='ed11y-tip-heading'>Error: alternative text may be a file name" +
                  "<p>In the context of a link, an image's alt text should create a " +
                  "<a href='https://accessibility.princeton.edu/how/content/links'>clear and meaningful link title</a>.</p>" +
                  "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>";
              this.paints.push([$el.closest('a'),'before','ed11y-instance-inline',"ed11y-error-border ed11y-imageTip",'ed11y-error-btn',ed11yMessage]);
            } else if (error[1] !== null) {
              // "image of"
              this.errorCount++;
              ed11yMessage = "<div class='ed11y-tip-heading'>Warning: <span class='ed11y-bold'>&quot" + error[1] + "&quot;</span> found in linked image</div> " +
                  "<p>As this image is acting as a link, its alt text should create a <a href='https://accessibility.princeton.edu/how/content/links'>clear and meaningful link title</a> " +
                  "rather than describing the image.</p>" +
                  "<p class='ed11y-small'>The alt text for this image is: <br><span class='ed11y-bold'>" + altText + "</span></p>";
              this.paints.push([$el.closest('a'),'before','ed11y-instance-inline',"ed11y-warning-border ed11y-imageTip",'ed11y-warning-btn',ed11yMessage]);
            }
            else if (text.length > 160) {
              // Image warning if it is a link and contains long alt text.
              this.warningCount++;
              ed11yMessage = "<div class='ed11y-tip-heading'>Linked image's alt text is <span class='ed11y-bold'>"+text.length+" characters</span>.</div> " +
                  "<p>The alt text on hyperlinked images should provide a <a href='https://accessibility.princeton.edu/how/content/links'>&quot;concise, clear and meaningful link title&quot;</a>, " +
                  "rather than a description of the image.</p>" +
                  "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span>.</p>";
              this.paints.push([$el.closest('a'),'before','ed11y-instance-inline',"ed11y-warning-border ed11y-imageTip",'ed11y-warning-btn',ed11yMessage]);
            }
            // Image warning if it is a link, contains alt text AND surrounding link text.
            else if (text !== "" && $el.parents("a").text().trim().length > 1) {
              this.warningCount++;
              ed11yMessage = "<div class='ed11y-tip-heading'>Please review (may be OK)</div> " +
                  "<p>This link contains <span class='ed11y-bold'>both</span> text and an image, which will be combined by screen readers to create a single link title. " +
                  "Please make sure the two together still create a " +
                  "<a href='https://accessibility.princeton.edu/how/content/links'>&quot;concise, clear and meaningful link title&quot;</a>.</p>" +
                  "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>"
              this.paints.push([$el.closest('a'),'before','ed11y-instance-inline',"ed11y-warning-border ed11y-imageTip",'ed11y-warning-btn',ed11yMessage]);
            }
          }
          // Now if there is no link...
          else if (error[0] !== null) {
            this.errorCount++;
            ed11yMessage = "<div class='ed11y-tip-heading'>Error: alt appears to contain a filename</div> " +
                "<p>All visual elements must <a href='https://accessibility.princeton.edu/how/content/alternative-text'>provide a text alternative</a> " +
                "that describes the meaning of the image in context.</p>" +
                "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>"
            this.paints.push([$el,'before','ed11y-instance-inline',"ed11y-error-border ed11y-imageTip",'ed11y-error-btn',ed11yMessage]);
          }
          else if (error[1] !== null) {
            this.warningCount++;
            ed11yMessage = "<div class='ed11y-tip-heading'>Alt text needs manual review</div><p>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>" +
                "<p>Assistive devices announce that they are describing an image when reading alt text, so  <span class='ed11y-bold'>&quot;" + error[1] + "&quot;</span> may be redundant.</p> " +
                "<p class='ed11y-small'>Reference: <a href='https://accessibility.princeton.edu/how/content/alternative-text'>Alt text should describe an image in context</a>.</p>";
            this.paints.push([$el,'before','ed11y-instance-inline',"ed11y-warning-border ed11y-imageTip",'ed11y-warning-btn',ed11yMessage]);
          }
          // Alert with deadspace alt.
          else if (text !== "" && text.replace(/"|'|\s+/g, "") === "") {
            this.errorCount++;
            ed11yMessage = "<div class='ed11y-tip-heading'>Error: invalid alt text</div> " +
                "<p>Please add alt text to this image to create a " +
                "<a href='https://accessibility.princeton.edu/how/content/alternative-text'>concise description of the meaning of the image in context</a>, set the alt to nothing at all to mark the image as decorative.</p>"
            this.paints.push([$el,'before','ed11y-instance-inline',"ed11y-error-border",'ed11y-error-btn',ed11yMessage]);
          }
          // Image error if alt text is too long.
          else if (text.length > 160) {
            this.warningCount++;
            ed11yMessage = "<div class='ed11y-tip-heading'>Image's alt text is <span class='ed11y-bold'>"+text.length+" characters</span>.</div> " +
                "<p>Alt text should provide a <a href='https://accessibility.princeton.edu/how/content/alternative-text'>concise description of the meaning of the image in context</a>." +
                "<p>If more than 160 characters are needed to describe an image (e.g., for a graph), the long description should be moved into the page's content or onto a separate page.</p>" +
                "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span>.</p>";
            this.paints.push([$el,'before','ed11y-instance-inline',"ed11y-warning-border",'ed11y-warning-btn',ed11yMessage]);
          }
        }
      });
    };

    // Checks if text is not descriptive and returns the word(s) that are making the text inaccessible.
    this.containsAltTextStopWords = function (textContent) {
      let altUrl = [".png", ".jpg", ".jpeg", ".gif"];
      let suspiciousWords = ["image of", "graphic of", "picture of", "placeholder", "photo of"];
      var hit = [null,null];
      $.each(altUrl, function (index, word) {
        if (textContent.toLowerCase().indexOf(word) >= 0) {
          hit[0] = word;
        }
      })
      $.each(suspiciousWords, function (index, word) {
        if (textContent.toLowerCase().indexOf(word) >= 0) {
          hit[1] = word;
        }
      })
      return hit;
    }


    /*====================== LINK TEXT MODULE =======================*/

    // Toggles the outline of all inaccessible link texts.
    this.checkLinkText = function () {

      // Todo See if there is an alternative to :visible that shows only visually hidden content
      let $links = this.checkRoot.find("a[href]").not(this.linkIgnore);

      /* Mini function if you need to exclude any text contained with a span. We created this function to ignore automatically appended sr-only text for external links and document filetypes.

      $.fn.ignore = function(sel){
        return this.clone().find(sel||">*").remove().end();
      };

      Example: If you need to ignore any text within <span class="sr-only">test</span>.
          $el.ignore("span.sr-only").text().trim();

      */

      $links.each((i, el) => {
        let $el = $(el);
        let linktext = $el.text().toLowerCase();
        let href = $el.attr('href');
        let hasImg = false;
        if ($el.find('img').length > 0) {
          linktext += $el.find('img').attr('alt');
          hasImg = true;
        }
        let linkStrippedText = linktext.replace(/'|"|-|\.|\s+/g, '');
        // $el.ignore(ed11yLinkTextIgnore).text().trim();
        let hasarialabelledby = $el.attr("aria-labelledby");
        let hasarialabel = $el.attr("aria-label");

        // error is any words that are making this link text inaccessible.
        let error = this.containsLinkTextStopWords(linktext.trim());

        // Tests to see if this link is empty
        if (linkStrippedText.length === 0) {
          this.errorCount++;
          if (hasImg) {
            this.paints.push([$el,'before','ed11y-instance-inline',"ed11y-error-border",'ed11y-error-btn',this.ed11yMessageLinkHasNoText]);
          }
          else {
            this.paints.push([$el,'before','ed11y-instance-inline ed11y-inline-block',"ed11y-link-text-fail",'ed11y-error-text-btn',this.ed11yMessageLinkHasNoText]);
          }
        }
        // if link contains any link text stop words, then it fails.
        else if (error !== "none" && !hasarialabelledby && !hasarialabel) {
          this.warningCount++;
          let stopWordMessage = "";
          if (error === "url") {
            // Url
            stopWordMessage = this.ed11yMessageLinkTextIsURL;
          }
          else if (error === "generic") {
            stopWordMessage = this.ed11yMessageLinkTextIsGeneric;
          }
          this.paints.push([$el,'before','ed11y-instance-inline',"ed11y-link-text-warning",'ed11y-link-warning-btn',stopWordMessage]);
        }
        if ($el.attr('target') === '_blank' && href.indexOf('.pdf') === -1 && href.indexOf('.doc') === -1 && linktext.indexOf('tab') === -1 && linktext.indexOf('window') === -1 && linktext.indexOf('external') === -1) {
          // Warn about unwarned new windows.
          this.warningCount++;
          this.paints.push([$el,'before','ed11y-instance-inline',"ed11y-link-text-warning",'ed11y-link-warning-btn',this.ed11yMessageQANewTab]);
        }
      });
    };

    // Checks if text is not descriptive and returns the word(s) that are making the text inaccessible.
    // stopWords will flag hyperlinks in link titles.
    // partialStopWords looks for links entirely made of generic words.
    // Note that this was extensively rewritten.
    this.containsLinkTextStopWords = function (textContent) {
      // todo: use regex to find any three-letter TLD followed by a slash.
      let stopWords = ["http://", "https://", ".asp", ".htm", ".php", ".edu/", ".com/"];
      let partialStopRegex = /learn|to|more|now|this|page|link|site|website|check|out|view|our|read|\.|,|:|download|form|here|click|>|<|\s/g;
      let hit = "none";

      if (textContent.replace(partialStopRegex,'').length === 0) {
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


    /*================== QUALITY ASSURANCE MODULE ===================*/

    this.checkQA = function () {

      // Detect paragraphs that should be lists: a. A. a) A) * - -- •.
      let $paragraphs = this.checkRoot.find("p").not(this.containerIgnore);
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
        })
      };
      $paragraphs.each(function (i, el) {
        let $first = $(el);
        let hit = false;
        // Grab first two characters.
        let firstPrefix = $first.text().substring(0, 2);
        if (firstPrefix.trim().length > 0 && firstPrefix !== activeMatch && firstPrefix.match(prefixMatch)) {
          // We have a prefix and a possible hit
          // Split p by carriage return if present and compare.
          let hasBreak = $first.html().indexOf("<br>");
          if (hasBreak !== -1) {
            let subParagraph = $first.html().substring(hasBreak + 4).trim();
            let subPrefix = subParagraph.substring(0,2);
            if (firstPrefix === decrement(subPrefix)) {
              hit = true;
            }
          }
          // Decrement the second p prefix and compare .
          if (!hit) {
            let $second = $(el).next('p');
            if ($second) {
              let secondPrefix = decrement($first.next().text().substring(0, 2));
              if (firstPrefix === secondPrefix) {
                hit = true;
              }
            }
          }
          if (hit) {
            ed11y.warningCount++;
            let ed11yShouldBeList = ed11y.ed11yMessageQAShouldBeList(firstPrefix);
            ed11y.paints.push([$first,'prepend','ed11y-instance-inline',"",'ed11y-link-warning-btn',ed11yShouldBeList]);
            activeMatch = firstPrefix;
          }
          else {
            activeMatch = "";
          }
        }
        else {
          activeMatch = "";
        }

      });

      // Warning: Detect uppercase. For each element, if it contains more
      // than 4 uppercase words in a row, indicate warning.
      // Uppercase word is anything that is more than 3 characters.
      // Todo check performance of new regex.
      this.checkRoot.find('h1, h2, h3, h4, h5, h6, p, li:not([class^="ed11y"]), blockquote').each(function () {
        let $this = $(this);
        let uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
        // was /(?!<a[^>]*?>)(\b[A-Z]['!:A-Z\s]{20,}|\b[A-Z]{20,}\b)(?![^<]*?<\/a>)/g
        let detectUpperCase = $this.text().match(uppercasePattern);

        if (detectUpperCase && detectUpperCase[0].length > 10) {
          ed11y.warningCount++;
          ed11y.paints.push([$this,'prepend','ed11y-instance-inline',"ed11y-uppercase-warning",'ed11y-link-warning-btn',ed11y.ed11yMessageQAUppercase]);
        }
      });

      // Check if a table has a table header.
      let $tablesCheck = this.checkRoot.find("table").not(this.containerIgnore);
      $tablesCheck.each((i, el) => {
        let $el = $(el);
        let findTHeaders = $el.find("th");
        let findHeadingTags = $el.find("h1, h2, h3, h4, h5, h6");
        if (findTHeaders.length === 0) {
          this.errorCount++;
          ed11y.paints.push([$el,'before','ed11y-instance',"ed11y-error-border",'ed11y-error-btn',ed11y.ed11yMessageMissingQATableHeadings]);
        }
        else {
          // Make sure all table headers are not empty.
          findTHeaders.each((i, th) => {
            let $th = $(th);
            if ($th.text().trim().length < 1) {
              $th.addClass("ed11y-error-border");
              ed11y.paints.push([$th,'prepend','ed11y-instance',"ed11y-error-border",'ed11y-error-text-btn',ed11y.ed11yMessageEmptyTableHeader]);
            }
          });
        }
        if (findHeadingTags.length > 0) {
          // todo: have paints function prefer stronger alert classes
          ed11y.paints.push([findHeadingTags,'before','ed11y-instance',"ed11y-error-border ed11y-headings-fail",'ed11y-error-text-btn',ed11y.ed11yMessageQAHeaderInTable]);
        }
      });

      let visualizationWarning = $('iframe').filter('[src*="datastudio.google.com"], [src*="tableau"]').not(this.containerIgnore);
      if (visualizationWarning.length > 0) {
        this.warningCount++;
        // Todo 1.1 provide documentation link regarding equivalent formats, and add a matching warning to the link tests.
        visualizationWarningMessage = "<div class='ed11y-tip-heading'>Warning: Data visualization</div><p>Widgets like this are often impossible for keyboard or screen readers to navigate, and can present significant difficulties for users with low vision or colorblindness. Unless this particular widget has been tested and shown to be resizable, keyboard navigable and screen reader compatible, you should assume that you also need to provide the information in an alternative (text or table) format.</p>"
        ed11y.paints.push([visualizationWarning,'before','ed11y-instance',"ed11y-warning-border",'ed11y-warning-btn',visualizationWarningMessage]);
      }

    }


    /*================== FULL CHECK MODULE ===================*/

    this.checkFull = function () {

      let mediaCount = 0;

      //Warning: Find all PDFs. Although only append warning icon to first PDF on page.
      var checkPDF = $("a[href$='.pdf']").not(this.linkIgnore).first();
      if (checkPDF.length > 0) {
        this.warningCount++;
        if (checkPDF.has('img') === false) {
          checkPDF.addClass("ed11y-text-warning");
        }
        ed11y.paints.push([checkPDF,'after','ed11y-instance-inline',"",'ed11y-link-warning-btn',ed11y.ed11yMessageFullCheckPDF]);
      }

      // Check for blockquotes used as headings. If it's less than 25 characters - it's probably not a blockquote.
      let $blockquotes = this.checkRoot.find("blockquote").not(this.containerIgnore);
      $blockquotes.each((i, el) => {
        let $el = $(el);
        if ($el.text().trim().length < 25 ) {
          this.warningCount++;
          ed11y.paints.push([$el,'before','ed11y-instance',"ed11y-warning-border",'ed11y-link-warning-btn',ed11y.ed11yMessageFullCheckBlockquote]);
        }
      });

      //Warn users to provide captions for videos.
      let $findVideos = $("video, iframe[src*='youtube.com'], iframe[src*='vimeo.com'], iframe[src*='kaltura.com']").not(this.containerIgnore);
      $findVideos.each((i, el) => {
        let $el = $(el);
        this.warningCount++;
        mediaCount++;
        ed11y.paints.push([$el,'before','ed11y-instance',"",'ed11y-warning-btn',ed11y.ed11yMessageFullCheckCaptions]);
      });

      //Warning: Make sure all podcasts have captions.
      // Todo 1.1 test and include more providers
      // Todo 1.1: make this a quick check test, but don't throw if the word transcript is found on the page?
      var soundcloudWarning = $('audio, iframe[src*="soundcloud.com"], iframe[src*="buzzsprout.com"], iframe[src*="podbean.com"]').not(this.containerIgnore).first();
      if (soundcloudWarning.length > 0) {
        this.warningCount++;
        mediaCount++;
        let soundCloudMessage = "<div class='ed11y-tip-heading'>Manual check needed: embedded audio</div><p>Check to make sure a transcript is included or linked for all audio content and/or podcasts. Providing a text alternative for audio is mandatory in the United States, Canada and the European Union.</p>"
        ed11y.paints.push([soundcloudWarning,'before','ed11y-instance',"ed11y-warning-border",'ed11y-warning-btn',soundCloudMessage]);
      }

      //Warning: Discourage use of Twitter timelines.
      // Todo 1.1 test, and rewrite to include other platforms
      let $twitterWarning = $('[id^=twitter-widget]').not(this.containerIgnore);
      $twitterWarning.each((i, el) => {
        let $el = $(el);
        var numberofTweets = $el.contents().find(".timeline-TweetList-tweet").length;
        if (numberofTweets > 3) {
          this.warningCount++;
          $el.addClass("ed11y-text-warning");
          ed11y.paints.push([$el,'before','ed11y-instance',"ed11y-text-warning",'ed11y-link-warning-btn',twittererror]);
        }
      });

      if (ed11yEmbeddedContentWarning.length > 1) {
        let $embeddedWarning = this.checkRoot.find(ed11yEmbeddedContentWarning);
        $embeddedWarning.each((i, el) => {
          let $el = $(el);
          ed11y.warningCount++;
          ed11yMessage = "<div class='ed11y-tip-heading'>Manual check needed</div><p>This tool cannot check this embedded " +
              "content. Please make sure embedded images have alt text, videos have captions, and interactive components can be <a href='https://webaim.org/techniques/keyboard/'>operated by a keyboard</a>.</p>";
          ed11y.paints.push([$el,'before','ed11y-instance',"ed11y-warning-border",'ed11y-warning-btn',ed11yMessage]);
        })
      }

      if (mediaCount > 0) {
        $('#ed11y-image-list').prepend("" +
            "<li>There are <span class='ed11y-red-text'>" + mediaCount + "</span> multimedia elements on this page. " +
            "Please make sure each provides closed captions (for video) or a transcript (for audio).</li>");
      }

      this.updateCount('full');
      this.readyTips(true);
    } // End of fullCheck()

    this.loadGlobals = function () {

      // Look for a content container
      if (typeof(ed11yCheckRoot) !== 'string' || $(ed11yCheckRoot).length === 0) {
        ed11yCheckRoot = 'body';
      }

      // Combine default and custom ignores.
      let separator =", ";

      // Container ignores apply to self and children.
      if (ed11yContainerIgnore.length > 0) {
        let containerSelectors = ed11yContainerIgnore.split(',');
        for (let i = 0; i < containerSelectors.length; i++) {
          containerSelectors[i] = containerSelectors[i] + " *, " + containerSelectors[i];
        }
        ed11yContainerIgnore = containerSelectors.join();
      }
      else {
        ed11yContainerIgnore = '[aria-hidden]';
      }
      this.containerIgnore = ed11yContainerIgnore;


      // Images ignore defaults plus presentation role.
      if (ed11yImageIgnore.length > 1) {
        ed11yImageIgnore += separator;
      }
      this.imageIgnore = ed11yImageIgnore + this.containerIgnore + separator + "[role='presentation']" + separator + '[aria-hidden]';

      this.headerIgnore = ed11yHeaderIgnore;

      // Links ignore defaults plus Ed11y links.
      if (ed11yLinkIgnore.length > 0) {
        ed11yLinkIgnore += separator;
      }
      this.linkIgnore = ed11yLinkIgnore + ed11yContainerIgnore + separator + '[aria-hidden]';

      if (ed11yHeaderIgnore.length > 0) {
        this.headerIgnore += separator + ed11yContainerIgnore;
      }
      else {
        this.headerIgnore = ed11yContainerIgnore;
      }

      // About this tool
      this.ed11yAbout = "" +
          "<p><a href='https://itmaybejj.github.io/editoria11y/'>Editoria11y</a>" +
          " is an automated accessibility checker currently being developed by " +
          "Princeton University. Please do take a moment to " +
          "<a href='https://github.com/itmaybejj/editoria11y/issues'>request changes " +
          "or report bugs</a>.</p>" +
          "<p>And do note: automated tools can catch some common mistakes, " +
          "but cannot replace old-fashioned proofreading and accessibility " +
          "testing. Please do not assume that a clear result means " +
          "your work is done!</p>";

      this.ed11yMessageHeadingEmpty = "<div class='ed11y-tip-heading'>Empty heading</div> " +
          "<p>Even though headings without text aren't visible, they still appear " +
          "in <a href='https://accessibility.princeton.edu/how/content/headings'>" +
          "document outlines</a>, and the vertical gaps they create between " +
          "paragraphs are often larger than the designer intended.</p>" +
          "<p>To fix: edit the page and delete this line, or change its format " +
          "from &quot;Heading&quot; to &quot;Normal&quot;.</p>";

      // Messages for links.
      this.ed11yMessageLinkHasNoText = "<div class='ed11y-tip-heading'>Link title not " +
          "found</div> " +
          "<p>Screen readers will either read the entire url of this link, one " +
          "character at a time, or say <span class='ed11y-bold'>&quot;Link: " +
          "[...awkward silence...].&quot;</span></p>" +
          "<p>To fix: delete this link if it is just stray tags wrapped around an " +
          "empty space due to a copy/paste bug, or add alt text if it is a real " +
          "link wrapped around an image or icon.</p>";

      this.ed11yMessageLinkTextIsURL = "<div class='ed11y-tip-heading'>Link may be a " +
          "URL</div>" +
          "<p>Assistive devices expect link titles to be " +
          "<a href='https://accessibility.princeton.edu/how/content/links'>" +
          "&quot;clear and meaningful&quot;</a>, even out of context.</p>" +
          "<p>Note that spelling out a very short URL is OK if the URL itself " +
          "<em>is</em> what you are communicating, e.g., when providing an email " +
          "address.</p>"

      this.ed11yMessageLinkTextIsGeneric = "<div class='ed11y-tip-heading'>Manual check " +
          "needed: link title may be generic</div>" +
          "<p>This link appears to be made of common words like " +
          "&quot;click here&quot; or &quot;download&quot;.</p>" +
          "<p>Many users skim for links, and most assistive devices provide lists of link titles, so please check to make sure this link is " +
          "<span class='ed11y-bold'>unique, clear and meaningful</span>, even out of context.</p><p>Compare which words stand out:<br>" +
          "<span class='ed11y-small'>&quot;To learn more about writing effective links, " +
          "<a href='https://accessibility.princeton.edu/how/content/links'>read more</a>.&quot;</span><br>" +
          "<span class='ed11y-small'>&quot;Learn more about <a href='https://accessibility.princeton.edu/how/content/links'>writing effective links</a>.&quot;</span></p>"

      this.ed11yMessageQANewTab = "<div class='ed11y-tip-heading'>Link opens in a " +
          "new window</div>" +
          "<p>Opening new tabs or windows without warning can be disorienting, " +
          "especially for users relying on assistive devices.</p> " +
          "<p>Unless certain " +
          "<a href='https://www.w3.org/TR/WCAG20-TECHS/G200.html#G200-description'>" +
          "exceptions related to context-sensitive workflows</a> apply, " +
          "it is better to let the user decide when to open new windows.</p>"

      this.ed11yMessageQAUppercase = "<div class='ed11y-tip-heading'>" +
          "Manual check needed: all-cap text</div>" +
          "<p>Some users find all-cap content somewhat difficult to " +
          "read, some screen readers interpret all-cap words as " +
          "acronyms (and read them one letter at a time!), and many " +
          "users INTERPRET CAPS LOCK AS SHOUTING.</p>" +
          "<p>Unless the all-cap text in this element is an acronym or should be capitalized " +
          "for some similar reason, sentence case is recommended.</p>"

      this.ed11yMessageMissingQATableHeadings = "<div class='ed11y-tip-heading'>Error: " +
          "table has no headers</div> " +
          "<p>Screen reader users rely on " +
          "<a href='https://accessibility.princeton.edu/how/content/tables'>table " +
          "headers</a> to label cells, so they can explore the table without " +
          "having to count rows and columns.</p> " +
          "<p>Note that tables should be used for tabular data only, as they cannot " +
          "reflow for small screens. If this " +
          "<a href='https://accessibility.princeton.edu/how/content/layout-tables'>" +
          "table is only for visual layout</a>, use an accessible " +
          "<a href='https://sitebuilder.princeton.edu/layout-themes/layouts-landing-pages'>" +
          "multi-column layout</a> to achieve the same affect.</p>"

      this.ed11yMessageQAHeaderInTable = "<div class='ed11y-tip-heading'>Error: heading " +
          "formatting inside table cells</div> " +
          "<p>Label table rows and columns using table headers. Formatting text as " +
          "semantic headings (Heading 2, Heading 3) creates a page outline for " +
          "assistive devices, and users of those devices are not expecting to land " +
          "inside a table when jumping to a heading. </p>"

      this.ed11yMessageEmptyTableHeader = "<div class='ed11y-tip-heading'>Error: Empty " +
          "table header</div>" +
          "<p>Screen reader users rely on " +
          "<a href='https://accessibility.princeton.edu/how/content/tables'>table " +
          "headers</a> to label cells, so they can explore the table without " +
          "having to count rows and columns.</p>";

      // Fullcheck tests.
      this.ed11yMessageFullCheckPDF = "<div class='ed11y-tip-heading'>Warning: PDF file link</div>" +
          "<p>PDFs present intrinsic problems for screen reader users " +
          "(who need them to be tagged with special " +
          "<a href='https://webaim.org/techniques/acrobat/'>structural tags and alternative text</a>) and users with low vision (since the text does not reflow when enlarged). " +
          "If this document has not been tagged and cannot be converted " +
          "to a Web page or provided in a text format (e.g., a Word or " +
          "Google doc), please have it tagged by a PDF remediation service.</span></p>"

      this.ed11yMessageFullCheckBlockquote = "<div class='ed11y-tip-heading'>Manual check needed: short &lt;blockquote&gt;</div> " +
          "<p>Blockquote formatting is announced as a quote by assistive " +
          "devices, and should only be used for quotes. " +
          "This was flagged because short blockquotes often turn out " +
          "to be headings. If that is the case here, please use " +
          "<a href='https://accessibility.princeton.edu/how/content/headings'>heading formatting</a> instead.</p>"

      this.ed11yMessageFullCheckCaptions = "<div class='ed11y-tip-heading'>Manual check: text alternatives</div><p>Please check to make sure " +
          "<span class='ed11y-bold'>all videos provide closed captioning.</span> " +
          "Providing captions for all audio and video content is a mandatory Level A " +
          "requirement. Captions are meant to support people who are D/deaf or " +
          "hard-of-hearing.</p>"

      /* Templated SVG icons from FontAwesome 5 for better cross-browser support and minimize conflicting libraries. */
      ed11y.ErrorIcon = "<svg xmlns='http://www.w3.org/2000/svg' role='img' focusable='false' aria-hidden='true' viewBox='0 0 576 576' width='20px' height='20px'><path fill='#ffffff' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'></path></svg><span class='ed11y-sr-only'>Error</span>";
      ed11y.WarningIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='20px' height='20px' role='img' focusable='false' aria-hidden='true' viewBox='0 0 512 512'><path fill='#505050' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z'/></svg><span class='ed11y-sr-only'>Warning</span>";
    }
    this.ed11yMessageHeadingTooLong = function(headingLength) {
      return "<div class='ed11y-tip-heading'>Long " +
          "<span class='ed11y-bold'>(" + headingLength +
          " character)</span> heading</div><p>Since " +
          "<a href='https://accessibility.princeton.edu/how/content/headings'>" +
          "headings are used as a page outline</a>, they should be brief, clear, " +
          "informative and unique.</p>";
    }
    // Messages for outline Headers.
    this.ed11yMessageHeadingLevelSkipped = function(prevLevel, level) {
      return "<div class='ed11y-tip-heading'>" +
          "Heading jumped from level " + prevLevel + " to " + level + "</div>" +
          "<p><a href='https://accessibility.princeton.edu/how/content/headings'>" +
          "Headings should form a page outline</a> for screen readers.</p> " +
          "<p>To fix: If this is related to the previous heading, make it " +
          "a <span class='ed11y-bold'>Heading " + parseInt(prevLevel + 1) +
          "</span>. If it starts a new section, make it <span class='ed11y-bold'>" +
          "Heading " + prevLevel + "</span>.</p>";
    }
    // QA Tests.
    this.ed11yMessageQAShouldBeList = function(prefix) {
      return "<div class='ed11y-tip-heading'>Possible list item prefix: &quot;" +
          "<span class='ed11y-bold'>" + prefix +
          "</span>&quot;</div>" +
          "<p>List formatting is more than symbols: it tells browsers how to " +
          "group content that breaks over multiple lines, and lets assistive " +
          "devices jump from item to item. If this paragraph starts a list, " +
          "please format it as a 'real' list rather than " +
          "spelling out letters, numbers or symbols.</p>";
    }


    this.readyPop = function ($el, text, num) {
      let thisText = "";
      let merge = 0;
      if (text) {
        thisText += text;
        merge ++;
      }
      if ($el.attr('data-ed11y-tip')) {
        let thisPaint = $el.attr('data-ed11y-tip').split(',');
        thisPaint.forEach( function (item) {
          thisText += ed11y.paints[item][5];
        })
        merge ++;
      }
      let thisContent = '<div class="ed11y-tip ed11y-reset"><span ' +
          'class="ed11y-arrow"></span>' +
          '<button class="ed11y-button ed11y-close-tip" ' +
          'type="button" aria-label="close" ' +
          'onclick="jQuery(this).parent().prev().focus().click(); return false;">' +
          '&times;</button><div class="ed11y-tip-content">' +
          thisText +
          '</div></div>';
      if (merge > 1) {
        $el.next().children('ed11y-tip-content').html(thisText);
      }
      else {
        $el.addClass('ed11y-tip-ready').after(thisContent);
      }
    }

    this.readyTips = function (fullcheck) {
      // This function is VERY expensive.
      // Todo: optimize.
      // For now: throw chunks to the end of the render queue to prevent thread locking.
      window.setTimeout(function() {
        ed11y.paints.forEach( function (el, index) {
          ed11y.paintButton(el, index)
        })
      }, 10)
      window.setTimeout(function() {
        let windowWidth = $(window).width();
        $('button.ed11y-pop').not('[id^="ed11y"]').each(function(i) {
          let $el = $(this);
          // If the button will be offscreen, nudge it left or right to fit.
          let offset = $el.offset();
          let offsetData = 0;
          if (offset.left < 8) {
            // Nudge right
            offsetData = 8 - offset.left;
          }
          else if (offset.left + 40 > windowWidth) {
            // Nudge left
            offsetData = offset.left - windowWidth;
          }
          if (offsetData === 0) {
            $el.data('ed11yTipNudge',offsetData).attr('id', 'ed11y-pop-' + i);
          } else {
            $el.attr('style','transform:translate(' + offsetData + 'px, 0) !important;').data('ed11yTipNudge',offsetData).attr('id', 'ed11y-pop-' + i);
          }
          $el.click(function() {
            ed11y.popThis($el, 'click');
            return false;
          });
          $el.filter('[aria-expanded="false"], .ed11y-hover').not('.ed11y-clicked').mouseenter(function() {
            ed11y.popThis($el, 'hover');
          })
        })
        $('.ed11y-pop.ed11y-hidden').removeClass('ed11y-hidden');
      }, 10);
      if (fullcheck === true) {
        window.setTimeout(function () {
          ed11y.checkRoot.find('img').each(function() {
            let $img = $(this);
            let alt = $img.attr('alt');
            let src = $img.attr('src');
            let width = $img.innerWidth() + 'px';
            let height = $img.innerHeight() + 'px';
            let inject = "<div class='ed11y-container ed11y-reveal-alts ed11y-reset' " +
                "style='width:"+width+" !important;height:"+height+" !important;'>" +
                "<span>" + ed11y.mainToggleIcon + "Alt: " + alt + "</span></div>";
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
                "<li class='" + imgClass  + "'>" +
                "<img src='" + src + "' alt='' class='ed11y-thumbnail'/>Alt: " + alt + "</li>");
          });
        }, 10)
      }
    }

    this.popThis = function ($el, trigger) {
      let isNew = false;
      if ($el.hasClass('ed11y-tip-ready') === false) {
        isNew = true;
        this.readyPop($el, '');
      }
      let $tip = $el.next();
      if (isNew === true) {
        ed11y.watchPop($el, $tip);
      }
      if (trigger === 'click' && ($el.attr('aria-expanded') === 'true' || $el.hasClass('ed11y-hover'))) {
        // Close on click.
        $el.attr('aria-expanded', 'false').addClass('ed11y-clicked').removeClass('ed11y-hover');
        $tip.addClass('ed11y-hidden').removeClass('ed11y-tip-open').attr('style','');
        if (ed11yAllowOverflow) {
          $el.parents('.ed11y-force-overflow').removeClass('ed11y-force-overflow');
        }
      }
      else {
        // Dispatch an event that a tooltip has appeared.
        document.dispatchEvent(new CustomEvent("ed11yPop", {
          detail: { id: $el.attr('id') }
        }));

        if (ed11yAllowOverflow) {
          $el.parents(ed11yAllowOverflow).addClass('ed11y-force-overflow');
        }

        let needToAlign;
        $('.ed11y-tip-open').removeClass('ed11y-tip-open').prev().attr('aria-expanded','false');
        if (trigger === 'click') {
          // Open on click.
          $el.attr('aria-expanded', 'true');
          $tip.removeClass('ed11y-hidden').addClass('ed11y-tip-open');
          needToAlign = true;
        }
        else {
          // Open on hover
          $('.ed11y-hover, .ed11y-tip-open')
              .removeClass('.ed11y-hover ed11y-clicked ed11y-tip-open')
              .attr('aria-expanded', 'false');
          $el.addClass('ed11y-hover').attr('aria-expanded','true');
          needToAlign = true;
        }
        if (needToAlign === true) {
          this.alignTip($el, $tip);
        }
      }
    }

    this.alignTip = function($el, $tip) {
      $tip.attr('style','').removeClass('ed11y-tip-left ed11y-tip-under').find('.ed11y-arrow').css('left','initial');
      let buttonOffset = $el.offset();
      let buttonNudged = $el.data('ed11yTipNudge');
      let buttonPosition = buttonOffset.left + buttonNudged;
      let tipWidth = $tip.width();
      let windowWidth = $(window).width();
      let roomToLeft = buttonPosition - tipWidth - 90;
      let roomToRight = windowWidth - (buttonPosition + tipWidth) - 90;
      if (roomToRight < 0) {
        if (roomToLeft > 0 ) {
          // Go left if there is room.
          $tip.addClass('ed11y-tip-left');
          let nudge = tipWidth - buttonNudged;
          $tip.attr('style', 'transform: translate(-' + nudge + 'px) !important;');
        }
        else {
          // Go under if there is not.
          $tip.addClass('ed11y-tip-under');
          let tipPosition = $tip.offset();
          let tipOffset = tipWidth - 5;
          let arrowOffset = tipWidth;
          if (tipPosition.left < tipWidth) {
            tipOffset = tipPosition.left - 5;
            arrowOffset = buttonPosition + 8;
          }
          $tip.attr('style', 'transform: translate(-' + tipOffset + 'px) !important;');
          $tip.find('.ed11y-arrow').attr('style', 'left: ' + arrowOffset + 'px !important;');
        }
      }
      else {
        $tip.attr('style', 'transform: translate(' + buttonNudged + 'px) !important;');
      }
    }

    this.tipHoverAffordance = function ($el, $tip) {
      if ($tip.is(':hover') === false && $el.is(':hover') === false) {
        window.setTimeout(function () {
          if ($tip.is(':hover') === false && $el.is(':hover') === false) {
            $el.removeClass('ed11y-hover ed11y-clicked').attr('aria-expanded','false');
            if (ed11yAllowOverflow) {
              $el.parents('.ed11y-force-overflow').removeClass('ed11y-force-overflow');
            }
          }
        }.bind($el, $tip), 500);
      }
    }

    this.watchPop = function ($el, $tip) {
      $el.mouseleave(function () {
        ed11y.tipHoverAffordance($el, $tip);
      })
      $tip.mouseleave(function () {
        ed11y.tipHoverAffordance($el, $tip);
      })
      $el.parent().find('a, button').blur(function () {
        if ($el.parent().is(':focus-within') === false) {
          $el.removeClass('ed11y-hover');
          if (ed11yAllowOverflow) {
            $el.parents('.ed11y-force-overflow').removeClass('ed11y-force-overflow');
          }
        }
      })
    }

    this.closeThis = function() {
      $(':focus').parent.prev().click();
    }

    this.mainToggleIcon = "<svg role='img' focusable='false' width='28px' height='28px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

    this.buildPanels = function (onLoad) {
      if (onLoad === true) {
        /* Templated SVG icons from FontAwesome 5 for better cross-browser support and minimize conflicting libraries. */

        let PanelCheckIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' role='img' focusable='false' aria-hidden='true' viewBox='0 0 512 512' ><path fill='#359E56' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'/></svg>";
        let PanelWarningIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' role='img' focusable='false' aria-hidden='true' viewBox='0 0 512 512'><path fill='#d39c00' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z'/></svg>";
        let PanelErrorIcon = "<svg xmlns='http://www.w3.org/2000/svg' role='img' focusable='false' aria-hidden='true' viewBox='0 0 576 512' width='24px' height='24px'><path fill='#d30017' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'></path></svg>";

        // Create a floating button and hidden divs that contain success/warning message.
        this.ed11ycontainer = document.createElement("div");
        this.ed11ycontainer.setAttribute("id", "ed11y-container");
        this.ed11ycontainer.classList.add("class", "ed11y-reset");
        this.ed11ycontainer.innerHTML = "<button id='ed11y-main-toggle' class='ed11y-preload' type='button' aria-expanded='false' title='Accessibility checker'>" + ed11y.mainToggleIcon +
            "<span class='ed11y-sr-only'>Show accessibility scan panel with</span><span class='ed11y-count'></span><span class='ed11y-sr-only'>issues</span></button>" +
            "<div id='ed11y-panel' class='ed11y-panel ed11y-reset'>" +
            "<button type='button' class='ed11y-close-button ed11y-button' title='minimize panel' aria-label='Minimize panel'><span></span></button>" +
            '<button class="ed11y-button ed11y-about" title="About this tool" type="button" ' +
            'aria-label="about" aria-expanded="false">?</button>' +
            "<div id='ed11y-fullcheck-headers' class='ed11y-outline-header ed11y-fullcheck'>" +
            "<div id='ed11y-fullcheck-outline-header' class='ed11y-bold ed11y-fullcheck-header' tabindex='-1'>Headers" +
            "<p>Check that this forms <a href='https://accessibility.princeton.edu/how/content/headings'>a complete outline</a>:</p>" +
            "</div>" +
            "<button type='button' class='ed11y-next-button ed11y-header-button'>Media<span aria-hidden='true'> &raquo;</span></button>" +
            "<ul id='ed11y-outline-list' tabindex='-1' aria-labelledby='ed11y-fullcheck-headers'></ul>" +
            "</div>"
            +
            "<div id='ed11y-fullcheck-images' class='ed11y-outline-header ed11y-fullcheck'>" +
            "<div id='ed11y-image-header' class='ed11y-bold ed11y-fullcheck-header'>Media" +
            "<p>Check <a href='https://accessibility.princeton.edu/how/content/alternative-text'>alt text</a>, " +
            "<a href='https://accessibility.princeton.edu/how/content/images-text'>images of text</a>, " +
            "&amp; <a href='https://webaim.org/techniques/captions/'>captions</a>.</p>" +
            "</div>" +
            "<button type='button' class='ed11y-next-button ed11y-header-button'>Content outline<span aria-hidden='true'> &raquo;</span></button>" +
            "<ul id='ed11y-image-list' tabindex='-1' aria-labelledby='ed11y-fullcheck-outline-header'></ul>" +
            "</div>" +
            "<div id='ed11y-no-errors' role='alert' class='ed11y-panel-header'><div class='ed11y-th-img'>" + PanelCheckIcon + "</div><div class='ed11y-td-msg'><span class='ed11y-checktype'>Quick check</span> found no errors. <br><a href='#' role='button' id='ed11y-tryfull'>Try a full check?</a></div></div>" +
            "<div id='ed11y-warnings' role='alert' class='ed11y-panel-header'><div class='ed11y-th-img'>" + PanelWarningIcon + "</div>" +
            "<div class='ed11y-td-msg'><span class='ed11y-checktype'>Quick check</span> found <span class='ed11y-panelcount'>a potential issue</span>. <a href='#' class='ed11y-jumplink ed11y-small'>Show <span class='ed11y-jumpnext'></span><span aria-hidden='true'> »</span></a></div></div>" +
            "<div id='ed11y-errors-found' role='alert' class='ed11y-panel-header'><div class='ed11y-th-img'>" + PanelErrorIcon + "</div>" +
            "<div class='ed11y-td-msg'><span class='ed11y-checktype'>Quick check</span> found <span class='ed11y-panelcount'>a potential issue</span>. <a href='#' class='ed11y-jumplink ed11y-small'>Show <span class='ed11y-jumpnext'></span> <span aria-hidden='true'> »</span></a></div></div>" +

            "<button type='button' aria-expanded='false' id='ed11y-summary-toggle' class='ed11y-button ed11y-panel-button'>Full check</button>" +
            "<button type='button' id='ed11y-maximize' class='ed11y-button ed11y-panel-button'>Show panel</button>" +
            "<button type='button' id='ed11y-shutpanel' class='ed11y-button ed11y-panel-button'>Hide all</button>"
            +
            "</div>";

        $('body').append(this.ed11ycontainer);

        // Handle main toggle button.
        $("#ed11y-main-toggle").click(function (event) {
          event.preventDefault();
          if ($('.ed11y-panel').hasClass('ed11y-active') !== true) {
            ed11y.checkAll(false, "show");
          } else {
            ed11y.reset();
          }
        });

        this.goto = 0;
        $('.ed11y-jumplink').click(function(event) {
          event.preventDefault();

          // Find our button.
          let $goto = $('button[class^="ed11y"][data-ed11y-tip]').not('#ed11y-container button');
          let gotoCount = $goto.length;
          $goto = $goto.eq(ed11y.goto);
          let gotoOffset = $goto.offset().top - parseInt($('body').css('padding-top')) - 50;

          // Throw an alert if the button or target is hidden.
          let $firstVisible = false;
          let $target;
          let insert = $goto.attr('data-ed11y-inserted');
          if (insert === "before") {
            $target = $goto.parent().next();
          }
          else if (insert === "prepend") {
            $target = $goto.parent().parent();
          }
          else {
            $target = $goto.parent().prev();
          }
          let alertMessage;
          if ($goto.filter(':visible').length === 0 || $target.filter(':visible').length === 0) {
            $firstVisible = $goto.parent().closest(':visible');
            alertMessage = "The element with this issue is not currently visible; it may be hidden or inside a tab or accordion. I will outline its container."
          }
          else if ($goto.closest('[aria-hidden="true"]').length === 1 || $target.filter('[aria-hidden="true"]').length === 1) {
            $firstVisible = $goto.closest('[aria-hidden="true"]').parents(':visible').first();
            alertMessage = "The element with this issue has been marked as hidden from screen readers. It may be in an unopened tab or accordion, so I will outline its container."
          }
          if ($firstVisible) {
            alert(alertMessage);
            $firstVisible.addClass('ed11y-hidden-highlight').prepend('<div tabindex="-1" class="ed11y-sr-only ed11y-hidden-highlight-'+ ed11y.goto +'">Highlighted container</div>');
            gotoOffset = $firstVisible.offset().top - parseInt($('body').css('padding-top')) - 50;
            let thisGoTo = '.ed11y-hidden-highlight-'+ ed11y.goto;
            $(thisGoTo).focus();
          }

          // Go to the button.
          $('html, body').animate({
            scrollTop: (gotoOffset)
          },1);
          ed11y.popThis($goto, 'click');
          $goto.focus();

          // Update the panel
          let ed11yGotoText = 'next';
          if (gotoCount === 1) {
            ed11yGotoText = ''
          }
          else if (gotoCount - 1 === ed11y.goto) {
            ed11y.goto = 0;
            ed11yGotoText = 'first';
          }
          else {
            ed11y.goto++;
          }
          window.setTimeout(function () {
            $('.ed11y-jumpnext').text(ed11yGotoText);
          }, 250);
        })

        $('.ed11y-close-button').click(function(event) {
          event.preventDefault();
          document.getElementById('ed11y-container').classList.add('ed11y-minimized');
        })

        $('.ed11y-about').click(function() {
          if ($(this).hasClass('ed11y-about-ready') !== true) {
            $(this).addClass('ed11y-about-ready')
                .after('<div class="ed11y-about-text">' +
                    ed11y.ed11yAbout + '</div>');
          }
          if ($(this).attr('aria-expanded') === 'false') {
            $(this).attr('aria-expanded', 'true');
          }
          else {
            $(this).attr('aria-expanded', 'false');
          }
          return false;
        })

        $('#ed11y-maximize').click(function(event) {
          event.preventDefault();
          $('#ed11y-container').removeClass('ed11y-minimized');
        });

        $('#ed11y-shutpanel').click(function(event) {
          event.preventDefault();
          $('#ed11y-main-toggle').focus().click();
        })

        $('.ed11y-next-button').click(function(event) {
          event.preventDefault();
          // Todo optional: maybe write next/previous logic when there are more than two
          $(this).parent().siblings('.ed11y-fullcheck').addClass('ed11y-active');
          $(this).parent().removeClass('ed11y-active');
        })

        $("#ed11y-tryfull").click(function(event) {
          event.preventDefault();
          $("#ed11y-summary-toggle").click();
          $(this).attr('style','display: none !important');
        })

        // Handle fullcheck requests.
        $("#ed11y-summary-toggle").click(function () {
          $(this).toggleClass("ed11y-btn-active");
          $(this).attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true'
          });
          if ($(this).attr('aria-expanded') === 'false') {
            // Close and remove
            $(".ed11y-fullcheck").removeClass("ed11y-active");
            $('.ed11y-reveal-alts').remove();
            $('.ed11y-headings-label').attr('style','display: none !important');
            $("#ed11y-image-list li").remove();
            $(".ed11y-full-active").removeClass('ed11y-full-active').addClass('ed11y-full-only');
          }
          else {
            ed11y.resetTips();
            window.setTimeout(function() {
              ed11y.checkFull();
              $('h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]').each(function () {
                // Todo implement an ignore function.
                let $el = $(this);
                if (!$el.find('.ed11y-headings-label').length) {
                  let level;
                  // Match up aria-headers to equivalent <h#> tag.
                  if ($el.attr('aria-level')) {
                    level = +$el.attr('aria-level');
                  }
                  else {
                    level = +$el.prop("tagName").slice(1);
                  }
                  $(this).prepend(" <span class='ed11y-headings-label'>H" + level + "</span> ");
                }
              })
              document.getElementById('ed11y-fullcheck-headers').classList.add('ed11y-active');
              $("#ed11y-outline-list").html('').append(ed11y.headingOutline).focus();
              $('.ed11y-full-only').removeClass('ed11y-full-only').addClass('ed11y-full-active');
              $('.ed11y-headings-label').removeAttr('style');
              $('#ed11y-fullcheck-outline-header').focus();
            }, 0)
          }
        });

        window.addEventListener('resize', function () {
          if ($('#ed11y-summary-toggle').attr('aria-expanded') === 'true') {
            $('.main-container img').each(function() {
              let width = $(this).innerWidth() + 'px';
              let height = $(this).innerHeight() + 'px';
              $(this).prevAll('.ed11y-reveal-alts').css({
                'width': width + ' !important',
                'height': height + ' !important'
              });
            })
          }
          let $tip = $('.ed11y-tip-open');
          if ($tip.length > 0) {
            let $el = $tip.prev();
            ed11y.alignTip($el, $tip);
          }
        });

        // Escape key on main closes panels.
        $(document).keyup(function (escape) {
          if (escape.keyCode === 27) {
            let $openTipButton = $('.ed11y-instance:focus-within, .ed11y-instance-inline:focus-within').children('.ed11y-pop[aria-expanded="true"]');
            if ($openTipButton.length > 0) {
              $openTipButton.focus().click();
            }
            else if ($('.ed11y-fullcheck.ed11y-active').length > 0 && $('.ed11y-fullcheck:focus-within, #ed11y-summary-toggle:focus').length > 0) {
              $('#ed11y-summary-toggle').focus().click();
            }
            else if ($('.ed11y-about[aria-expanded="true"]:focus, .ed11y-about-text:focus-within').length > 0) {
              $('.ed11y-about').focus().click();
            }
            else if ($('#ed11y-container:focus-within').length > 0) {
              $('#ed11y-main-toggle').focus().click();
            }
          }
        });
      }
    }
  }
  // End of Ed11y library.

});
