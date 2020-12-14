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

      ed11y.loadGlobals();

      setTimeout(function () {
        // Don't trigger tests until page has had time to settle.
        if ($(ed11yNoRun).length === 0) {
          ed11y.checkAll(true, ed11y.ed11yStart);
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
          this.checkAltText(),
          this.buildPanels(onLoad),
          this.checkHeaders(),
          this.checkQA()
        ]).then();
        this.checkLinkText()
        // todo beta: address race condition between alts and links so they can run async
        //this.checkLabels();
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
      if (onLoad === true && showPanel === 'hide' && this.errorCount > 0) {
        // Determine if panel should open automatically.
        const ed11ySeen = localStorage.getItem("ed11ySeen");
        const ed11ySeenParsed = ed11ySeen ? JSON.parse(ed11ySeen) : {};
        const ed11yPage = btoa(encodeURIComponent(window.location.pathname));
        if (ed11ySeenParsed[ed11yPage] === totalFound) {
          // User has already seen these errors, panel will not open.
          showPanel = "seen";
        }
        else {
          // User has not seen these errors; force open panel.
          showPanel = "show";
          ed11ySeenParsed[ed11yPage] = totalFound;
          localStorage.setItem('ed11ySeen', JSON.stringify(ed11ySeenParsed));
        }
      }
      else if (onLoad === true && totalFound === 0) {
        showPanel = "pass";
      }

      // Now we can open or close the panel.
      if (showPanel === "hide") {
        ed11y.reset();
      }
      else if (showPanel === "show") {
        // Delaying paint takes ~2% off script run time.
        this.checkRoot.find('.ed11y-instance, .ed11y-instance-inline').removeAttr('hidden');
        this.paints.forEach( function (el) {
          if (el[2] === 'after') {
            el[0].addClass(el[1]).after(el[3]);
          }
          else {
            el[0].addClass(el[1]).prepend(el[3]);
          }
        })
        this.readyTips();
        $('.ed11y-minimized').removeClass('ed11y-minimized');
        document.getElementById("ed11y-panel").classList.add("ed11y-active");
      }
      $('.ed11y-preload').removeClass('ed11y-preload');
    }

    // Show a warning/error count on the toggle button.
    this.updateCount = function (checkType) {
      let totalCount = this.errorCount + this.warningCount;
      $('.ed11y-count').text(totalCount).show();
      if (totalCount > 1) {
        $('.ed11y-jumpnext').text('first');
      }
      $('.ed11y-checktype').text(checkType === 'quick' ? 'Quick check' : 'Full check');
      $('.ed11y-panelcount').text(totalCount === 1 ? 'one potential issue' : totalCount + ' issues');
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
      else {
        $('.ed11y-count').hide();
        $('#ed11y-errors-found, #ed11y-warnings').removeClass('ed11y-active');
        $('#ed11y-no-errors').addClass('ed11y-active');
      }
    }

    // Resets all changes made by the tool. Removing outlines and additional spans.
    this.reset = function () {
      this.clearEverything();
      this.showingAltText = false;
      this.showingHeaders = false;
      this.showingLinkText = false;
      //this.showingLabels = false;
      this.showingQA = false;
      this.noErrors = true; //Reset page to "no errors" instead of refreshing page.
      this.anyWarning = false;
      this.showingFull = false;
    };

    this.clearEverything = function () {

      // Remove error outlines.
      this.checkRoot.find(".ed11y-text-warning").removeClass("ed11y-text-warning");
      this.checkRoot.find(".ed11y-link-text-warning").removeClass("ed11y-link-text-warning");
      this.checkRoot.find(".ed11y-error-border").removeClass("ed11y-error-border");
      this.checkRoot.find(".ed11y-warning-border").removeClass("ed11y-warning-border");
      this.checkRoot.find(".ed11y-headings-fail").removeClass("ed11y-headings-fail");
      this.checkRoot.find(".ed11y-link-text-fail").removeClass("ed11y-link-text-fail");
      this.checkRoot.find(".ed11y-uppercase-warning").contents().unwrap();

      // Remove buttons and highlights.
      this.checkRoot.find(".ed11y-instance").not('#ed11y-panel .ed11y-instance').remove();
      this.checkRoot.find(".ed11y-instance-inline, .ed11y-pop, .ed11y-headings-label, .ed11y-reveal-formatting").remove();

      // Remove and reset panels and active items.
      $(".ed11y-error-message, .ed11y-pass-message, .ed11y-warning-message, .ed11y-fullcheck li").remove();
      $("#ed11y-main-toggle").attr("aria-expanded", "false").removeClass("ed11y-toggle-active");
      $(".ed11y-active").removeClass("ed11y-active");
      $("#ed11y-summary-toggle").attr('aria-expanded','false').removeClass("ed11y-btn-active");
    }

    /*================== HEADING STRUCTURE MODULE ===================*/

    this.checkHeaders = function () {
      if (this.showingHeaders) {
        this.clearEverything();
        this.showingHeaders = false;
      }
      else {
        this.outlineHeaders();
        this.showingHeaders = true;
      }
    };

    this.outlineHeaders = function () {
      // Reset panel; we rebuild on each run.
      $("#ed11y-outline-list li, .ed11y-headings-label").remove();

      // Only fetch headers within the content area.
      let $headings = this.checkRoot.find("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]").not(this.headerIgnore);
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
        let tippyIcon = "";
        let headingLength = $el.text().trim().length;
        if (level - prevLevel > 1 && i !== 0) {
          headingError = 'warning';
          outlinePrefix = '(flagged for skipped level) ';
          let ed11yHeadingLevelSkipped = ed11y.ed11yMessageHeadingLevelSkipped(prevLevel,level);
          tippyIcon = '<div class="ed11y-instance"><button type="button" class="ed11y-link-warning-btn ed11y-pop" data-ed11y-tip="' + ed11yHeadingLevelSkipped + '" >' + ed11y.WarningIcon + '</button></div>';
          $el.addClass("ed11y-link-text-warning");
        }
        else if ($el.text().trim().length < 1) {
          this.warningCount++;
          headingError = 'warning';
          outlinePrefix = '(empty heading)';
          tippyIcon = '<div class="ed11y-instance"><button type="button" class="ed11y-link-warning-btn ed11y-pop" data-ed11y-tip="' + this.ed11yMessageHeadingEmpty + '" >' + ed11y.WarningIcon + '</button></div>';
          $el.addClass("ed11y-link-text-warning");
        }
        else if ($el.text().trim().length > 160) {
          this.warningCount++;
          headingError = 'warning';
          outlinePrefix = '(flagged for length) ';
          let ed11yHeadingTooLong = this.ed11yMessageHeadingTooLong(headingLength);
          tippyIcon = '<div class="ed11y-instance"><button type="button" class="ed11y-link-warning-btn ed11y-pop" data-ed11y-tip="' + ed11yHeadingTooLong + '" >' + ed11y.WarningIcon + '</button></div>';
        }

        prevLevel = level;
        let liClass = "ed11y-outline-" + level;
        let liPrefix = "";
        //If the heading error is within a hyperlink, make sure to
        // append button after anchor tag.
        if (headingError !== "") {
          $el.addClass("ed11y-link-text-" + headingError);
          if ($el.closest("a").length > 0) {
            $el.closest('a').after(tippyIcon);
          }
          else {
            $el.before(tippyIcon);
          }
          // Outline element if there is an error.
          if (headingError === 'fail') {
            liClass += " ed11y-red-text";
            liPrefix = "<span class='ed11y-sr-only'> Error:</span> ";
          }
          else {
            liClass += " ed11y-text-warning";
            liPrefix = "<span class='ed11y-sr-only'> Warning: </span> ";
          }
        }
        if (outlinePrefix) {
          outlinePrefix = "<span class='ed11y-small'><em>" + outlinePrefix +
              "</em></span>";
        }
        this.headingOutline += "<li class='" + liClass + "'>" +
            "<span class='ed11y-small'>" + level + "</span> " +
            liPrefix + outlinePrefix + $el.text() +
            "</li>";

      });
    };

    /*======================== INPUTS MODULE =======================*/
    // todo Beta: test and implement module.

    /*================== ALTERNATIVE TEXT MODULE ====================*/

    // Toggles the outline of images.
    this.checkAltText = function () {
      if (this.showingAltText) {
        this.clearEverything();
        this.showingAltText = false;
      } else {
        this.outlineAltText();
        this.showingAltText = true;
      }
    };

    this.outlineAltText = function () {

      let $images = this.checkRoot.find("img").not(ed11y.imageIgnore);
      /* Example: Find all images within the main content area only, and exclude images containing a path.*/

      // Test each image for alternative text.
      $images.each((i, el) => {
        let $el = $(el);
        // todo alpha: check on 0 length (check header code)
        let text = $el.attr("alt");
        let ed11yMessage = "";

        if ($el.parents('a[href]').length && (!text)) {
          // Link fails if image alt is empty.
          if (text.length === 0 && $el.parents("a").text().trim().length > 1) {
            //Image contains both hyperlink
            $el.addClass("ed11y-error-border");
            // Todo beta: handle blank alts?
            // Todo: this should not be flagged if the image has other text and this has a blank alt
            let missingAltLinkButHasTextError = "<div class='ed11y-tip-heading'>Error: missing alt text.</div><p>All visual elements must <a href='https://accessibility.princeton.edu/how/content/alternative-text'>provide a text alternative</a>.</p>"
            $el.closest("a").addClass('ed11y-exclude').before('<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + missingAltLinkButHasTextError + '" >' + ed11y.ErrorIcon + '</button></div>');
          }
          else {
            $el.addClass("ed11y-error-border");
            let missingAltLinkError = "<div class='ed11y-tip-heading'>Error: image and link have no text</div>" +
                "<p>All visual elements must <a href='https://accessibility.princeton.edu/how/content/alternative-text'>provide a text alternative</a>. " +
                "This is critically important when the image's alternative text serves as the link title -- this link will be read by assistive devices as &quot;Link: [awkward silence]&quot;.</p>"
            $el.closest('a').addClass('ed11y-exclude').before('<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + missingAltLinkError + '" >' + ed11y.ErrorIcon + '</button></div>');
          }
        }
        else if (!text) {
          // Todo: an empty alt may be ok...
          // Checks to see if image contains an alt attribute. If not, then image fails.
          this.errorCount++;
          $el.addClass("ed11y-error-border");
          let generalAltText = "<div class='ed11y-tip-heading'>Error: missing alt text.</div><p>All visual elements must <a href='https://accessibility.princeton.edu/how/content/alternative-text'>provide a text alternative</a>.</p>"
          $el.before('<div hidden class="ed11y-instance"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + generalAltText + '" >' + ed11y.ErrorIcon + '</button></div>');
        }

        // If alt attribute is present, further tests are done.
        else {
          let altText = text.replace(/'/g, "&#39;"); //replace apostrophe with HTML ascii to prevent breaking popover.
          let error = this.containsAltTextStopWords(altText);

          // Image fails if a url was found.
          if ($el.parents().is("a[href]")) {
            if (error[0] !== null) {
              this.errorCount++;
              $el.addClass("ed11y-error-border");
              ed11yMessage = "<div class='ed11y-tip-heading'>Error: alternative text may be a file name" +
                  "<p>In the context of a link, an image's alt text should create a " +
                  "<a href='https://accessibility.princeton.edu/how/content/links'>clear and meaningful link title</a>.</p>" +
                  "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>";
              $el.closest('a').addClass('ed11y-exclude').before('<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + ed11yMessage + '" >' + ed11y.ErrorIcon + '</button></div>');
            } else if (error[1] !== null) {
              // "image of"
              this.errorCount++;
              $el.addClass("ed11y-error-border");
              ed11yMessage = "<div class='ed11y-tip-heading'>Error: <span class='ed11y-red-text ed11y-bold'>&quot" + error[1] + "&quot;</span> found in linked image</div> " +
                  "<p>As this image is acting as a link, its alt text should create a <a href='https://accessibility.princeton.edu/how/content/links'>clear and meaningful link title</a> " +
                  "rather than describing the image.</p>" +
                  "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>";

              $el.closest('a').addClass('ed11y-exclude').before('<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + ed11yMessage + '" >' + ed11y.ErrorIcon + '</button></div>');
            }
            else if (text.replace(/'|"|-|\.|\s+/g, "").length === 0 && $el.parents("a").text().replace(/"|'|\s+/g, "").length === 0) {
              // Whitespace, empty or meaningless
              this.errorCount++;
              $el.addClass("ed11y-error-border");
              ed11yMessage = "<div class='ed11y-tip-heading'><p>Error: link has no text</div> Please add alt text to this image to create a <a href='https://accessibility.princeton.edu/how/content/links'>clear and meaningful link title</a>.</p>"
              $el.closest('a').addClass('ed11y-exclude').before('<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + ed11yMessage + '" >' + ed11y.ErrorIcon + '</button></div>');
            }
            else if (text.length > 160) {
              // Image warning if it is a link and contains long alt text.
              this.warningCount++;
              $el.addClass("ed11y-warning-border");
              ed11yMessage = "<div class='ed11y-tip-heading'>Linked image's alt text is <span class='ed11y-bold'>"+text.length+" characters</span>.</div> " +
                  "<p>The alt text on hyperlinked images should provide a <a href='https://accessibility.princeton.edu/how/content/links'>&quot;concise, clear and meaningful link title&quot;</a>, " +
                  "rather than a description of the image.</p>" +
                  "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span>.</p>";
              $el.closest('a').addClass('ed11y-exclude').before('<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + ed11yMessage + '" >' + ed11y.ErrorIcon + '</button></div>');
            }
            // Image warning if it is a link, contains alt text AND surrounding link text.
            else if (text !== "" && $el.parents("a").text().trim().length > 1) {
              this.warningCount++;
              $el.addClass("ed11y-warning-border");
              ed11yMessage = "<div class='ed11y-tip-heading'>Please review (may be OK)</div> " +
                  "<p>This link contains <span class='ed11y-bold'>both</span> text and an image, which will be combined by screen readers to create a single link title. " +
                  "Please make sure the two together still create a " +
                  "<a href='https://accessibility.princeton.edu/how/content/links'>&quot;concise, clear and meaningful link title&quot;</a>.</p>" +
                  "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>"
              $el.closest('a').addClass('ed11y-exclude').before('<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-warning-btn ed11y-pop" data-ed11y-tip="' + ed11yMessage + '" >' + ed11y.WarningIcon + '</button></div>');
            }
          }
          // Now if there is no link...
          else if (error[0] !== null) {
            this.errorCount++;
            $el.addClass("ed11y-error-border");
            ed11yMessage = "<div class='ed11y-tip-heading'>Error: alt appears to contain a filename</div> " +
                "<p>All visual elements must <a href='https://accessibility.princeton.edu/how/content/alternative-text'>provide a text alternative</a> " +
                "that describes the meaning of the image in context.</p>" +
                "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>"
            $el.before('<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + ed11yMessage + '" >' + ed11y.ErrorIcon + '</button></div>');
          }
          else if (error[1] !== null) {
            this.warningCount++;
            $el.addClass("ed11y-warning-border");
            ed11yMessage = "<p>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>" +
                "<p>Assistive devices announce that they are describing an image when reading alt text, so  <span class='ed11y-bold'>&quot;" + error[1] + "&quot;</span> may be redundant.</p> " +
                "<p class='ed11y-small'>Reference: <a href='https://accessibility.princeton.edu/how/content/alternative-text'>Alt text should describe an image in context</a>.</p>";
            $el.before('<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-warning-btn ed11y-pop" data-ed11y-tip="' + ed11yMessage + '" >' + ed11y.WarningIcon + '</button></div>');
          }
          // Alert with deadspace alt.
          else if (text !== "" && text.replace(/"|'|\s+/g, "") === "") {
            this.errorCount++;
            $el.addClass("ed11y-error-border");
            ed11yMessage = "<div class='ed11y-tip-heading'>Error: invalid alt text</div> " +
                "<p>Please add alt text to this image to create a " +
                "<a href='https://accessibility.princeton.edu/how/content/alternative-text'>concise description of the meaning of the image in context</a>.</p>"
            $el.before('<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + ed11yMessage + '" >' + ed11y.ErrorIcon + '</button></div>');
          }
          // Image error if alt text is too long.
          else if (text.length > 160) {
            this.warningCount++;
            $el.addClass("ed11y-warning-border");
            ed11yMessage = "<div class='ed11y-tip-heading'>Image's alt text is <span class='ed11y-bold'>"+text.length+" characters</span>.</div> " +
                "<p>Alt text should provide a <a href='https://accessibility.princeton.edu/how/content/alternative-text'>concise description of the meaning of the image in context</a>." +
                "<p>If more than 160 characters are needed to describe an image (e.g., for a graph), the long description should be moved into the page's content or onto a separate page.</p>" +
                "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span>.</p>";
            $el.before('<div hidden class="ed11y-instance"><button type="button" class="ed11y-warning-btn ed11y-pop" data-ed11y-tip="' + ed11yMessage + '" >' + ed11y.WarningIcon + '</button></div>');
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
      if (this.showingLinkText) {
        this.clearEverything();
        this.showingLinkText = false;
      }
      else {
        this.outlineLinkText();
        this.showingLinkText = true;
      }
    };

    this.outlineLinkText = function () {

      // Todo Beta: compare performance of checking attributes/CSS instead of :visible,
      //  See if :visible offers a false negative on empty links.
      let $links = this.checkRoot.find("a[href]").not(this.linkIgnore).filter(":visible");
      let newWindowWarned = false;

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
        if ($el.find('img').length > 0) {
          linktext = $el.find('img').attr('alt');
        }
        let linkStrippedText = linktext.replace(/\s+/g, '');
        //$el.ignore(ed11yLinkTextIgnore).text().trim();
        let hasarialabelledby = $el.attr("aria-labelledby");
        let hasarialabel = $el.attr("aria-label");

        // error is any words that are making this link text inaccessible.
        let error = this.containsLinkTextStopWords(linktext.trim());

        // Tests to see if this link is empty
        // Todo Beta: is there a false negative if the link contains an empty span?

        if ($el.children().length === 0 && linkStrippedText.length === 0) {
          this.errorCount++;
          this.paints.push([$el,"ed11y-link-text-fail",'prepend','<div class="ed11y-instance-inline">' +
          '<button type="button" class="ed11y-error-text-btn ed11y-pop" data-ed11y-tip="' + this.ed11yMessageLinkHasNoText + '" >' + ed11y.ErrorIcon + '</button></div>']);
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
          this.paints.push([$el,"ed11y-link-text-warning",'prepend','<div class="ed11y-instance-inline">' +
          '<button type="button" class="ed11y-link-warning-btn ed11y-pop" data-ed11y-tip="' + stopWordMessage + '" >' + ed11y.WarningIcon + '</button></div>']);
        }
        if (newWindowWarned === false && $el.attr('target') === '_blank' && href.indexOf('.pdf') === -1 && href.indexOf('.doc') === -1 && linktext.indexOf('tab') === -1 && linktext.indexOf('window') === -1) {
          // Warn about unwarned new windows.
          this.warningCount++;
          this.paints.push([$el,'ed11y-link-text-warning','prepend','<div class="ed11y-instance-inline">' +
          '<button type="button" class="ed11y-link-warning-btn ed11y-pop" ' +
          'data-ed11y-tip="' + this.ed11yMessageQANewTab + '" >' +
          ed11y.WarningIcon + '</button></div>']);
          newWindowWarned = true;
        }
      });
    };

    // Checks if text is not descriptive and returns the word(s) that are making the text inaccessible.
    // stopWords will flag hyperlinks in link titles.
    // partialStopWords looks for links entirely made of generic words.
    // Note that this was extensively rewritten.
    this.containsLinkTextStopWords = function (textContent) {
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
      if (this.showingQA) {
        this.clearEverything();
        this.showingQA = false;
      }
      else {
        this.outlineQA();
        this.showingQA = true;
      }
    };

    this.outlineQA = function () {
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
            ed11yShouldBeList = '<div class="ed11y-instance-inline">' +
                '<button type="button" class="ed11y-link-warning-btn ed11y-pop" ' +
                'data-ed11y-tip="' + ed11yShouldBeList + '" >' +
                ed11y.WarningIcon + '</button></div>';
            ed11y.paints.push([$first,'','prepend',ed11yShouldBeList]);
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
      // than 4 uppercase words than indicate warning.
      // Uppercase word is anything that is more than 3 characters.
      this.checkRoot.find('h1, h2, h3, h4, h5, h6, p, li:not([class^="ed11y"]), span, blockquote').each(function () {
        let $this = $(this);
        let uppercasePattern = /(?!<a[^>]*?>)(\b[A-Z]['!:A-Z\s]{15,}|\b[A-Z]{15,}\b)(?![^<]*?<\/a>)/g;
        let detectUpperCase = $this.text().match(uppercasePattern);

        if (detectUpperCase && detectUpperCase[0].length > 10) {
          ed11y.warningCount++;
          let beforePattern = "<span class='ed11y-uppercase-warning'>" +
              '<div hidden class="ed11y-instance-inline"><button type="button" class="ed11y-link-warning-btn ed11y-pop" data-ed11y-tip="' + ed11y.ed11yMessageQAUppercase + '" >' + ed11y.WarningIcon + '</button></div>';
          let afterPattern = "</span>"
          $(this).html($(this).html().replace(uppercasePattern, beforePattern + "$1" + afterPattern));
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
          $el.addClass("ed11y-error-border");
          $el.before('<div hidden class="ed11y-instance"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + ed11y.ed11yMessageMissingQATableHeadings + '" >' + ed11y.ErrorIcon + '</button></div>');
        }
        else {
          // Make sure all table headers are not empty.
          findTHeaders.each((i, th) => {
            let $th = $(th);
            if ($th.text().trim().length < 1) {
              $th.addClass("ed11y-error-border");
              $th.append('<div hidden class="ed11y-instance"><button type="button" class="ed11y-error-text-btn ed11y-pop" data-ed11y-tip="' + ed11y.ed11yMessageEmptyTableHeader + '" >' + ed11y.ErrorIcon + '</button></div>');
            }
          });
        }
        if (findHeadingTags.length > 0) {
          findHeadingTags.addClass("ed11y-headings-fail");
          findHeadingTags.parent().addClass("ed11y-error-border");
          findHeadingTags.before('<div hidden class="ed11y-instance"><button type="button" class="ed11y-error-btn ed11y-pop" data-ed11y-tip="' + ed11y.ed11yMessageQAHeaderInTable + '" >' + ed11y.ErrorIcon + '</button></div>');
        }
      });

    }


    /*================== FULL CHECK MODULE ===================*/

    this.checkFull = function () {
      if (!this.showingFull) {
        this.outlineFull();
        this.showingFull = true;
      }
    };

    this.outlineFull = function () {

      let mediaCount = 0;

      //Warning: Find all PDFs. Although only append warning icon to first PDF on page.
      var checkPDF = $("a[href$='.pdf']").not(this.linkIgnore).first();
      if (checkPDF.length > 0) {
        this.warningCount++;
        checkPDF.addClass("ed11y-text-warning");
        checkPDF.has("img").removeClass("ed11y-text-warning");
        checkPDF.after('<div class="ed11y-instance-inline"><button type="button" class="ed11y-link-warning-btn ed11y-pop" data-ed11y-tip-lazyloaded="true" data-ed11y-tip="' + ed11y.ed11yMessageFullCheckPDF + '" >' + ed11y.WarningIcon + '</button></div>');
      }

      //Check for blockquotes used as headings. If it's less than 25 characters - it's probably not a quote.
      let $blockquotes = this.checkRoot.find("blockquote").not(this.containerIgnore);
      $blockquotes.each((i, el) => {
        let $el = $(el);
        if ($el.text().trim().length < 25 ) {
          this.errorCount++;
          $el.addClass("ed11y-error-border")
          $el.before('<div class="ed11y-instance"><button type="button" class="ed11y-error-text-btn ed11y-pop" data-ed11y-tip-lazyloaded="true" data-ed11y-tip="' + ed11y.ed11yMessageFullCheckPDF + '" >' + ed11y.ErrorIcon + '</button></div>');
        }
      });

      //Warn users to provide captions for videos.
      let $findVideos = $("video, iframe[src*='youtube.com'], iframe[src*='vimeo.com'], iframe[src*='kaltura.com']").not('[aria-hidden="true"]').not(this.containerIgnore);
      $findVideos.each((i, el) => {
        let $el = $(el);
        this.warningCount++;
        mediaCount++;
        $el.addClass("ed11y-warning-border");
        $el.before('<div class="ed11y-instance"><button type="button" class="ed11y-warning-btn ed11y-pop" data-ed11y-tip-lazyloaded="true" data-ed11y-tip="' + ed11y.ed11yMessageFullCheckCaptions + '" >' + ed11y.WarningIcon + '</button></div>');
      });

      //Warning: Make sure all podcasts have captions.
      // Todo Post-release rewrite to include more providers
      var soundcloudWarning = $('audio, iframe[src*="soundcloud.com"]').not(this.containerIgnore).first();
      if (soundcloudWarning.length > 0) {
        this.warningCount++;
        mediaCount++;
        soundcloudWarning.addClass("ed11y-warning-border");
        SoundCloudMessage = "<div class='ed11y-tip-heading'><p>Warning</div> Please ensure to provide a <span class='ed11y-bold'>transcript for all podcasts.</span> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts are meant to support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel.</p>"
        soundcloudWarning.before('<div class="ed11y-instance"><button type="button" class="ed11y-warning-btn ed11y-pop" data-ed11y-tip-lazyloaded="true" data-ed11y-tip="' + SoundCloudMessage + '" >' + ed11y.WarningIcon + '</button></div>');
      }

      //Warning: Check Google Data Studio widget.
      // Todo Beta rewrite to include Tableau
      var dataStudioWarning = $('iframe[src*="datastudio.google.com"]').not(this.containerIgnore).first();
      if (dataStudioWarning.length > 0) {
        this.warningCount++;
        dataStudioWarning.addClass("ed11y-warning-border");
        dataStudioWarningMessage = "<div class='ed11y-tip-heading'><p>Error</div> Google Data Studio widgets can be problematic for people who use a keyboard to navigate and people who have difficulty perceiving visual content. Please <span class='ed11y-bold'>provide a text alternative</span> immediately below the Data Studio frame.</p>"
        dataStudioWarning.before('<div class="ed11y-instance"><button type="button" class="ed11y-warning-btn ed11y-pop" data-ed11y-tip-lazyloaded="true" data-ed11y-tip="' + dataStudioWarningMessage + '" >' + ed11y.WarningIcon + '</button></div>');
      }

      //Warning: Discourage use of Twitter timelines.
      // Todo Post-release rewrite to include other platforms
      let $twitterWarning = $('[id^=twitter-widget]').not(this.containerIgnore);
      $twitterWarning.each((i, el) => {
        let $el = $(el);
        var numberofTweets = $el.contents().find(".timeline-TweetList-tweet").length;
        if (numberofTweets > 3) {
          this.warningCount++;
          $el.addClass("ed11y-text-warning");
          twittererror = "<div class='ed11y-tip-heading'>Warning</div><p>The default Twitter timeline may cause accessibility issues for keyboard users. Secondly, the inline scrolling of the Twitter timeline may cause usability issues for mobile. It's recommended to add the following data attributes to the embed code. </p><hr aria-hidden='true' class='ed11y-tip-tool-hr'><span class='ed11y-bold'>It's recommended to:</span><ul><li>Add <kbd>data-tweet-limit=&#34;2&#34;</kbd> to limit the amount of tweets.</li><li>Add <kbd>data-chrome=&#34;nofooter noheader&#34;</kbd> to remove the widget's header and footer.</li></ul>"
          $el.before('<div class="ed11y-instance"><button type="button" class="ed11y-link-warning-btn ed11y-pop" data-ed11y-tip-lazyloaded="true" data-ed11y-tip="' + twittererror + '" >' + ed11y.WarningIcon + '</button></div>');
        }
      });

      // Princeton only
      // Todo Beta: create config so this can be removed from module. heeeeere
      if (ed11yEmbeddedContentWarning.length > 1) {
        let $embeddedWarning = this.checkRoot.find(ed11yEmbeddedContentWarning);
        $embeddedWarning.each((i, el) => {
          let $el = $(el);
          ed11y.warningCount++;
          ed11yMessage = "<p>Note: this tool cannot check embedded " +
              "content. Please make sure your social media content " +
              "follows the <a href='https://accessibility.princeton.edu/policy/social-media'>" +
              "University Social Media Guidelines</a> " +
              "regarding alt text and captioning.</p>";
          $el.addClass("ed11y-warning-border").before('' +
              '<div class="ed11y-instance"><button type="button" class="ed11y-warning-btn ed11y-pop" data-ed11y-tip-lazyloaded="true" data-ed11y-tip="' + ed11yMessage + '" >' + ed11y.WarningIcon + '</button></div>');
        })
      }

      if (mediaCount > 0) {
        $('#ed11y-image-list').prepend("" +
            "<li>There are <span class='ed11y-red-text'>" + mediaCount + "</span> multimedia elements on this page. " +
            "Please make sure each provides closed captions (for video) or a transcript (for audio).</li>");
      }

      this.updateCount('full');
      this.readyTips();
    } // End of fullCheck()

    this.loadGlobals = function () {

      // Get user preference for panel open or shut.
      let ed11yStart = localStorage.getItem("ed11yStatus");
      ed11y.ed11yStart = ed11yStart ? ed11yStart : "show";

      // Look for a content container
      if (typeof(ed11yCheckRoot) !== 'string' || $(ed11yCheckRoot).length === 0) {
        if ($('main').length !== 0) {
          ed11yCheckRoot = 'main';
        }
        else if ($('[role="main"]')) {
          ed11yCheckRoot = '[role="main"]'
        }
        else {
          ed11yCheckRoot = 'body';
        }
      }

      let separator =", ";
      if (ed11yImageIgnore.length > 1) {
        ed11yImageIgnore += separator;
      }
      this.imageIgnore = ed11yImageIgnore + "[aria-hidden] img, [aria-hidden], [role='presentation']";
      if (ed11yLinkIgnore.length > 0) {
        ed11yLinkIgnore += separator;
      }
      this.linkIgnore = ed11yLinkIgnore + "[aria-hidden], .ed11y-exclude";
      if (ed11yContainerIgnore.length > 0) {
        let containerSelectors = ed11yContainerIgnore.split(',');
        for (let i = 0; i < containerSelectors.length; i++) {
          containerSelectors[i] = containerSelectors[i] + " *, " + containerSelectors[i];
        }
        ed11yContainerIgnore = containerSelectors.join();
        this.linkIgnore += separator + ed11yContainerIgnore;
        if (ed11yHeaderIgnore.length > 0) {
          this.headerIgnore += separator + ed11yContainerIgnore;
        }
        else {
          this.headerIgnore = ed11yContainerIgnore;
        }
        if (ed11yImageIgnore.length > 0) {
          this.imageIgnore += separator + ed11yContainerIgnore;
        }
        else {
          this.imageIgnore = ed11yContainerIgnore;
        }
        this.containerIgnore = ed11yContainerIgnore;

        // About this tool
        this.ed11yAbout = "" +
            "<p><a href='https://itmaybejj.github.io/editoria11y/'>Editoria11y</a>" +
            " is an automated accessibility checker currently being developed by " +
            "Princeton University. Please do take a moment to " +
            "<a href='https://www.drupal.org/project/editoria11y'>request changes " +
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
            "character at a time, or say <span class='ed11yMessage-bold'>&quot;Link: " +
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
            "&quot;click here&quot; or &quot;download&quot;. Since many users skim " +
            "by links, and most assistive devices navigate pages by a list of link " +
            "titles, please check to make sure this link is " +
            "<a href='https://accessibility.princeton.edu/how/content/links'>unique, " +
            "clear and meaningful</a>, even out of context.</p>"

        this.ed11yMessageQANewTab = "<div class='ed11y-tip-heading'>Link opens in a " +
            "new window</div>" +
            "<p>Opening new tabs or windows without warning can be disorienting, " +
            "especially for users relying on assistive devices.</p> " +
            "<p>Unless certain " +
            "<a href='https://www.w3.org/TR/WCAG20-TECHS/G200.html#G200-description'>" +
            "exceptions related to context-sensitive workflows</a> apply, " +
            "it is better to let the user decide when to open new windows.</p>"

        this.ed11yMessageQAUppercase = "<div class='ed11y-tip-heading'>Large block of " +
            "uppercase text</div>" +
            "<p>Some users find lengthy segments of capitalized content difficult to " +
            "read, and some screen readers interpret fully capitalized words as " +
            "acronyms and read them one letter at a time.</p>";

        //todo: princeton only
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
        this.ed11yMessageFullCheckPDF = "<div class='ed11y-tip-heading'>Warning</div><p>PDF " +
            "files are considered web content and must be made accessible as well. If " +
            "this file is a form, consider using Google Forms as an accessible " +
            "alternative. If this PDF file is a document, consider converting it into" +
            " a web page instead. Otherwise, please <span class='ed11y-bold'>check " +
            "file for accessibility in Acrobat DC.</span></p>"

        // Not implemented yet.
        /*this.ed11yMessageFullCheckBlockquote = "<div class='ed11y-tip-heading'>Error</div> " +
            "Blockquotes should be used for quotes only. They should never be used as " +
            "headings. Please replace with a semantic heading (e.g. Heading 2 or Heading 3)."*/

        this.ed11yMessageFullCheckCaptions = "<div class='ed11y-tip-heading'>Manual check</div>Please check to make sure " +
            "<span class='ed11y-bold'>all videos provide closed captioning.</span> " +
            "Providing captions for all audio and video content is a mandatory Level A " +
            "requirement. Captions are meant to support people who are D/deaf or " +
            "hard-of-hearing."

        /* Templated SVG icons from FontAwesome 5 for better cross-browser support and minimize conflicting libraries. */
        ed11y.ErrorIcon = "<svg xmlns='http://www.w3.org/2000/svg' role='img' focusable='false' aria-hidden='true' viewBox='0 0 576 576' width='24px' height='24px'><path fill='#ffffff' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'></path></svg><span class='ed11y-sr-only'>Error</span>";
        ed11y.WarningIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='28px' height='28px' role='img' focusable='false' aria-hidden='true' viewBox='0 0 512 512'><path fill='#505050' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z'/></svg><span class='ed11y-sr-only'>Warning</span>";

      }
    }
    this.ed11yMessageHeadingTooLong = function(headingLength) {
      return "<div class='ed11y-tip-heading'>Long " +
          "<span class='ed11yMessage-bold ed11yMessage-red-text'>(" + headingLength +
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
          "a <span class='ed11yMessage-bold'>Heading " + parseInt(prevLevel + 1) +
          "</span>. If it starts a new section, make it <span class='ed11yMessage-bold'>" +
          "Heading " + prevLevel + "</span>.</p>";
    }
    // QA Tests.
    this.ed11yMessageQAShouldBeList = function(prefix) {
      return "<div class='ed11y-tip-heading'>Possible list item prefix: &quot;" +
          "<span class='ed11yMessage-bold ed11yMessage-red-text'>" + prefix +
          "</span>&quot;</div>" +
          "<p>List formatting is more than symbols: it tells browsers how to " +
          "group content that breaks over multiple lines, and lets assistive " +
          "devices jump from item to item. If this paragraph starts a list, " +
          "please format it as a 'real' list rather than " +
          "spelling out letters, numbers or symbols.</p>";
    }

    this.readyTips = function () {
      $('button.ed11y-pop').not('ed11y-pop-ready').each(function(i) {
        let $el = $(this);
        $(this).attr('id', 'ed11y-pop-' + i).attr('aria-expanded','false').addClass('ed11y-pop-ready');
        $(this).click(function() {
          ed11y.popThis($el, 'click');
          return false;
        });
        $(this).filter('[aria-expanded="false"], .ed11y-hover').mouseenter(function() {
          ed11y.popThis($el, 'hover');
        })
        $(this).filter('[aria-expanded="false"], .ed11y-hover').focus(function() {
          ed11y.popThis($el, 'hover');
        })
        //$(this).addClass('ed11y-tip-ready').attr('data-ed11y-tip',  '<button class="ed11y-tip-closer ed11y-close-button ed11y-button" type="button" onClick="jQuery(this).closest(&#34;[id^=&#39;tippy&#39;]&#34;).siblings(&#39;button&#39;).focus().click();"><span class="aria-hidden">&times;</span><span class="ed11y-sr-only">close</span></button>' + $(this).attr('data-ed11y-tip'));
      })
    }

    this.popThis = function ($el, trigger) {
      let isNew = false;
      if ($el.hasClass('ed11y-tip-ready') === false) {
        isNew = true;
        let thisContent = '<div class="ed11y-tip ed11y-reset"><span ' +
            'class="ed11y-arrow"></span>' +
            '<button class="ed11y-button ed11y-close-tip" ' +
            'type="button" aria-label="close" ' +
            'onclick="jQuery(this).parent().prev().focus().click(); return false;">' +
            '&times;</button>' +
            $el.attr('data-ed11y-tip') +
            '</div>';
        $el.addClass('ed11y-tip-ready').after(thisContent);
      }
      let $tip = $el.next();
      if (isNew === true) {
        ed11y.watchPop($el, $tip);
      }
      if (trigger === 'click' && ($el.attr('aria-expanded') === 'true' || $el.hasClass('ed11y-hover'))) {
        // Close on click.
        $el.attr('aria-expanded', 'false').removeClass('ed11y-hover');
        $tip.addClass('ed11y-hidden ed11y-clicked').removeClass('ed11y-tip-open').attr('style','');
      }
      else {
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
          $el.addClass('ed11y-hover');
          needToAlign = true;
        }
        if (needToAlign === true) {
          $tip.attr('style','').removeClass('ed11y-tip-left ed11y-tip-under').find('.ed11y-arrow').css('left','initial');
          let buttonPosition = $el.offset();
          let tipWidth = $tip.width();
          let windowWidth = $(window).width();
          let roomToLeft = buttonPosition.left - tipWidth - 90;
          let roomToRight = windowWidth - (buttonPosition.left + tipWidth) - 90;
          if (roomToRight < 0) {
            if (roomToLeft > 0 ) {
              // Go left if there is room.
              $tip.addClass('ed11y-tip-left');
              $tip.css('transform', 'translate(-' + tipWidth + 'px)');
            }
            else {
              // Go under if there is not.
              $tip.addClass('ed11y-tip-under');
              let tipPosition = $tip.offset();
              if (tipPosition.left + 400 > windowWidth) {
                let offset = tipPosition.left - 10;
                $tip.css('transform', 'translate(-' + offset + 'px)');
                $tip.find('.ed11y-arrow').css('left', buttonPosition.left + 'px');
              }
              else {
                //$tip.find('.ed11y-arrow').css('left', buttonPosition.left + 'px');
              }
              //$tip.addClass('ed11y-tip-under');
            }
          }
        }
      }
    }

    this.tipHoverAffordance = function ($el, $tip) {
      if ($tip.is(':hover') === false && $el.is(':hover') === false) {
        window.setTimeout(function () {
          if ($tip.is(':hover') === false && $el.is(':hover') === false) {
            $el.removeClass('ed11y-hover');
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
        }
      })
    }

    this.closeThis = function() {
      $(':focus').parent.prev().click();
    }

    this.buildPanels = function (onLoad) {
      if (onLoad === true) {
        /* Templated SVG icons from FontAwesome 5 for better cross-browser support and minimize conflicting libraries. */

        var MainToggleIcon = "<svg role='img' focusable='false' width='28px' height='28px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";
        let PanelCheckIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' role='img' focusable='false' aria-hidden='true' viewBox='0 0 512 512' ><path fill='#359E56' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'/></svg>";
        let PanelWarningIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' role='img' focusable='false' aria-hidden='true' viewBox='0 0 512 512'><path fill='#d39c00' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z'/></svg>";
        let PanelErrorIcon = "<svg xmlns='http://www.w3.org/2000/svg' role='img' focusable='false' aria-hidden='true' viewBox='0 0 576 512' width='24px' height='24px'><path fill='#d30017' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'></path></svg>";

        // States of the outlines, used to toggle the outlines.
        this.showingHeaders = false;
        this.showingLinkText = false;
        //this.showingLabels = false;
        this.showingAltText = false;
        this.showingQA = false;


        // Create a floating button and hidden divs that contain success/warning message.
        this.ed11ycontainer = document.createElement("div");
        this.ed11ycontainer.setAttribute("id", "ed11y-container");
        this.ed11ycontainer.classList.add("class", "ed11y-reset");
        this.ed11ycontainer.innerHTML = "<button id='ed11y-main-toggle' type='button' aria-expanded='false'>" + MainToggleIcon +
            "<span class='ed11y-sr-only'>Show accessibility scan panel with</span><span class='ed11y-count ed11y-preload'></span><span class='ed11y-sr-only'>issues</span></button>" +
            "<div id='ed11y-panel' class='ed11y-panel ed11y-reset'>" +
            "<button type='button' class='ed11y-close-button ed11y-button' aria-label='minimize panel'><span></span></button>" +
            '<button class="ed11y-button ed11y-about" type="button" ' +
            'aria-label="about" aria-expanded="false">?</button>' +
            "<div id='ed11y-fullcheck-headers' class='ed11y-outline-header ed11y-fullcheck'>" +
            "<div id='ed11y-fullcheck-outline-header' class='ed11y-bold ed11y-instance ed11y-fullcheck-header'>Headers" +
            "<p>Check that this <a href='https://accessibility.princeton.edu/how/content/headings'>makes a good page outline</a>.</p>" +
            "</div>" +
            "<button type='button' class='ed11y-next-button ed11y-header-button'>Media<span aria-hidden='true'> &raquo;</span></button>" +
            "<ul id='ed11y-outline-list' tabindex='-1' aria-labelledby='ed11y-fullcheck-headers'></ul>" +
            "</div>"
            +
            "<div id='ed11y-fullcheck-images' class='ed11y-outline-header ed11y-fullcheck'>" +
            "<div id='ed11y-image-header' class='ed11y-bold ed11y-instance ed11y-fullcheck-header'>Media" +
            "<p>Check <a href='https://accessibility.princeton.edu/how/content/alternative-text'>alt text</a>, " +
            "<a href='https://accessibility.princeton.edu/how/content/images-text'>images of text</a>, " +
            "&amp; <a href='https://accessibility.princeton.edu/policy/video'>captions</a>.</p>" +
            "</div>" +
            "<button type='button' class='ed11y-next-button ed11y-header-button'>Content outline<span aria-hidden='true'> &raquo;</span></button>" +
            "<ul id='ed11y-image-list' tabindex='-1' aria-labelledby='ed11y-fullcheck-outline-header'></ul>" +
            "</div>" +
            "<div id='ed11y-no-errors' role='alert' class='ed11y-panel-header'><div class='ed11y-th-img'>" + PanelCheckIcon + "</div><div class='ed11y-td-msg'><span class='ed11y-checktype'>Quick check</span> found no accessibility errors. Nicely done.</div></div>" +
            "<div id='ed11y-warnings' role='alert' class='ed11y-panel-header'><div class='ed11y-th-img'>" + PanelWarningIcon + "</div>" +
            "<div class='ed11y-td-msg'><span class='ed11y-checktype'>Quick check</span> found <span class='ed11y-panelcount'>a potential issue</span>. <a href='#' class='ed11y-jumplink ed11y-small'>Show <span class='ed11y-jumpnext'></span><span aria-hidden='true'> »</span></a></div></div>" +
            "<div id='ed11y-errors-found' role='alert' class='ed11y-panel-header'><div class='ed11y-th-img'>" + PanelErrorIcon + "</div>" +
            "<div class='ed11y-td-msg'><span class='ed11y-checktype'>Quick check</span> found <span class='ed11y-panelcount'>a potential issue</span>. <a href='#' class='ed11y-jumplink ed11y-small'>Show <span class='ed11y-jumpnext'></span> <span aria-hidden='true'> »</span></a></div></div>" +

            "<button type='button' aria-expanded='false' id='ed11y-summary-toggle' class='ed11y-button ed11y-panel-button'>Full check</button>" +
            "<button type='button' id='ed11y-maximize' class='ed11y-button ed11y-panel-button'>Show panel</button>" +
            "<button type='button' id='ed11y-shutpanel' class='ed11y-button ed11y-panel-button'>Hide all<span class='ed11y-count' aria-hidden='true'></span></button>"
            +
            "</div>";

        $(ed11yCheckRoot).last().append(this.ed11ycontainer);

        this.goto = 0;
        $('.ed11y-jumplink').click(function(event) {
          event.preventDefault();
          // Princeton only
          // todo Beta: rewrite into an event so users can have their own function
          document.querySelector('body').classList.add('no-stick');
          let $goto = $('button[class^="ed11y"][data-ed11y-tip]').not('#ed11y-container button');
          let gotoOffset = $goto.eq(ed11y.goto).offset().top - parseInt($('body').css('padding-top')) - 50;
          $('html, body').animate({
            scrollTop: (gotoOffset)
          },1);
          $('#header').removeClass('stuck');
          ed11y.popThis($goto.eq(ed11y.goto), 'click');
          $goto.eq(ed11y.goto).focus();
          let ed11yGotoText = 'next';
          if ($goto.length - 1 === ed11y.goto) {
            ed11y.goto = 0;
            ed11yGotoText = 'first';
          }
          else {
            ed11y.goto++;
          }
          window.setTimeout(function () {
            // todo Beta: create JS event and move to PS-Core
            $('#header').removeClass('stuck');
            $('.ed11y-jumpnext').text(ed11yGotoText);
          }, 500);
        })

        $('.ed11y-close-button').click(function(event) {
          event.preventDefault();
          document.getElementById('ed11y-container').classList.add('ed11y-minimized');
        })

        $('.ed11y-about').click(function() {
          if ($(this).hasClass('ed11y-about-ready') !== true) {
            $(this).addClass('ed11y-about-ready')
                .after('<div class="ed11y-about-text">' +
                    this.ed11yAbout + '</div>');
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

        $("#ed11y-summary-toggle").click(function () {
          $(this).toggleClass("ed11y-btn-active");
          $(this).attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true'
          });
          if ($(this).attr('aria-expanded') === 'false') {
            // Close and remove
            $(".ed11y-fullcheck").removeClass("ed11y-active");
            $('.ed11y-reveal-formatting').remove();
            $('.ed11y-headings-label').hide();
            $("#ed11y-image-list li").remove();
            $(".ed11y-full-active").removeClass('ed11y-full-active').addClass('ed11y-full-only');
          }
          else {
            ed11y.checkFull();
            $('h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]').each(function () {
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
                // todo Beta: create JS event and move to PS-Core
                $('body').addClass('no-stick');
                $('#header').removeClass('stuck');
              }
            })
            document.getElementById('ed11y-fullcheck-headers').classList.add('ed11y-active');
            $('.ed11y-full-only').removeClass('ed11y-full-only').addClass('ed11y-full-active');
            $("#ed11y-outline-list").html('').append(ed11y.headingOutline).focus();
            $('.ed11y-headings-label').show();
            $('.main-container img').each(function() {
              let alt = $(this).attr('alt');
              let src = $(this).attr('src');
              let width = $(this).innerWidth() + 'px';
              let height = $(this).innerHeight() + 'px';
              let inject = "<div class='ed11y-container ed11y-reveal-formatting' " +
                  "style='width:"+width+";height:"+height+";'>" +
                  "<span>"+MainToggleIcon+"Image alt text: "+alt+"</span></div>";
              if ($(this).prev().hasClass('ed11y-instance-inline') === true) {
                $(this).prev().before(inject);
              }
              else {
                $(this).before(inject);
              }
              let imgClass = "";
              if ($(this).hasClass('ed11y-error-border')) {
                imgClass = " ed11y-error-border";
              } else if ($(this).hasClass('ed11y-warning-border')) {
                imgClass = " ed11y-warning-border";
              }
              $('#ed11y-image-list').append("" +
                  "<li class='" + imgClass  + " ed11y-text-warning'>" +
                  "<img src='" + src + "' alt='' class='ed11y-thumbnail'/>Alt: " + alt + "</li>");
            });
          }
        });

        // todo Beta: also reposition tips.
        window.addEventListener('resize', function () {
          if ($('#ed11y-summary-toggle').attr('aria-expanded') === 'true') {
            $('.main-container img').each(function() {
              let width = $(this).innerWidth() + 'px';
              let height = $(this).innerHeight() + 'px';
              $(this).prevAll('.ed11y-reveal-formatting').css({
                'width': width,
                'height': height
              });
            })
          }
        });

        // Handle main toggle button.
        $("#ed11y-main-toggle").click(function (event) {
          event.preventDefault();
          // todo Beta move to PS-core
          document.querySelector('body').classList.add('no-stick');
          if ($('.ed11y-panel').hasClass('ed11y-active') !== true) {
            localStorage.setItem("ed11yStatus", "show");
            ed11y.checkAll(false, "show");
          } else {
            localStorage.setItem("ed11yStatus", "hide");
            ed11y.reset();
          }
        });

        // Escape key on main closes panels.
        // Todo Release: should only close out the focused item not everything?
        $(document).keyup(function (escape) {
          if (escape.keyCode === 27 && $('#ed11y-main-toggle').attr('aria-expanded') === "true") {
            if ($('.ed11y-tip-ready[aria-expanded="true"]:focus').length > 0) {
              $(':focus').click();
            }
            else if ($('.ed11y-tip-box :focus').length > 0) {
              $(':focus').parents('.ed11y-tip-content').children('.ed11y-tip-closer').click();
            }
            else {
              localStorage.setItem("ed11yStart", "hide");
              ed11y.checkAll(false, "hide");
            }
          }
        });
      }
    }
  }
  // End of Ed11y library.

});
