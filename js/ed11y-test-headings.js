class Ed11yTestHeadings {
  'use strict';

  /*================== HEADING STRUCTURE MODULE ===================*/

  check = function () {
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
      let severity = "";
      let outlinePrefix = "";
      let ed11yTip = "";
      let headingText = Ed11y.getText(el);
      let headingLength = headingText.length;
      let dismissKey = false;
      if (level - prevLevel > 1 && i !== 0) {
        headingError = "headingLevelSkipped";
        dismissKey = level + headingText;
        outlinePrefix = '(flagged for skipped level) ';
        severity = "alert";
        ed11yTip = Ed11y.M.headingLevelSkipped(prevLevel, level);
      }
      if (headingLength < 1) {
        // todo: let image merge up into shared alert.
        let headingSubText = el.querySelector('img')?.getAttribute('alt');
        if (!headingSubText || headingSubText.length === 0) {
          headingError = "headingEmpty";
          outlinePrefix = '(empty heading)';
          ed11yTip = Ed11y.M.headingEmpty();
        }
      }
      else if (headingLength > 160) {
        outlinePrefix = '(flagged for length) ';
        dismissKey = level + headingText;
        headingError = "headingIsLong";
        ed11yTip = Ed11y.M.headingIsLong(headingLength);
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
        if (!(Ed11y.options.headerIgnore !== "" && el?.closest(Ed11y.options.headerIgnore))) {
            Ed11y.results.push([el, headingError, ed11yTip, dismissKey]);
          // Outline element if there is an error.
          liClass += " ed11y-text-warning";
          liPrefix = "<span class='ed11y-sr-only'> Warning: </span> ";
        }
      }
      if (outlinePrefix) {
        outlinePrefix = "<span class='ed11y-small'><em>" + outlinePrefix +
            "</em></span>";
      }
      // todo mvp: is this the golden ignore check? also build and test outline ignore
      if (!(Ed11y.options.outlineIgnore !== "" && el?.closest(Ed11y.options.outlineIgnore))) {
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
      }
    });

  };

}