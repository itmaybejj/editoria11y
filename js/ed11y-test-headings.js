class Ed11yTestHeadings {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestHeadings */

  check () {
    // Reset panel; we rebuild on each run.
    // todo mvp rewrite to search the whole outline
    Ed11y.panel?.querySelectorAll('#ed11y-outline-list li, .ed11y-headings-label')?.forEach((el) => el.remove());
    
    let prevLevel = 0;
    Ed11y.headingOutline = [];
    let position = 'afterbegin';

    // Test each header level for accessibility issues.
    Ed11y.elements.h?.filter( el => Ed11y.elementNotHidden(el) )?.forEach((el, i) => {
      let level;
      let alert = [];

      // Match aria-headers to <h#> level.
      if (el.hasAttribute('aria-level')) {
        // Plus forces numerical type
        level = +el.getAttribute('aria-level');
      }
      else {
        level = +el.tagName.slice(1);
      }
      // Sanitized.
      level = parseInt(level);
      let error = '';
      let outlinePrefix = '';
      let headingText = Ed11y.computeText(el);
      let headingLength = headingText.length;
      let dismissKey = false;
      if (headingLength < 1) {
        // todo: let image merge up into shared alert.
        let headingSubText = el.querySelector('img')?.getAttribute('alt');
        if (!headingSubText || headingSubText.length === 0) {
          outlinePrefix += Ed11y.M.errorOutlinePrefixHeadingEmpty;
          error = 'headingEmpty';
          dismissKey = false; // redeclare in case of two errors.
          alert.push([el, error, Ed11y.M.headingEmpty.tip(), position, dismissKey]);
        }
      }
      else if (headingLength > 160) {
        outlinePrefix += Ed11y.M.errorOutlinePrefixHeadingIsLong;
        dismissKey = Ed11y.dismissalKey(level + headingText);
        error = 'headingIsLong',
        alert.push([el, error, Ed11y.M.headingIsLong.tip(), position, dismissKey]);
      }
      if (level - prevLevel > 1 && i !== 0) {
        dismissKey = Ed11y.dismissalKey(level + headingText);
        outlinePrefix += Ed11y.M.errorOutlinePrefixSkippedLevel;
        error = 'headingLevelSkipped';
        alert.push([el, error, Ed11y.M.headingLevelSkipped.tip(prevLevel, level), position, dismissKey]);
      }
      prevLevel = level;

      if (error !== '') {
        // Only mark errors if they are within the scanned area.
        if (el.closest(Ed11y.options.checkRoots) !== null || (Ed11y.options.shadowComponents && el.getRootNode()?.host?.matches(Ed11y.options.shadowComponents) !== undefined)) {          
          alert.forEach((result) => {
            Ed11y.results.push(result);
          });
        } else {
          outlinePrefix = '';
        }
      }
      Ed11y.headingOutline.push([el, level, outlinePrefix, dismissKey]);
    });

    // Check for blockquotes used as headings. If it's less than 25
    // characters - it's probably not a blockquote.
    Ed11y.elements.blockquote?.forEach((el) => {
      let text = Ed11y.getText(el);
      if (text.length < 25) {
        let dismissKey = Ed11y.dismissalKey(text);
        let error = 'blockquoteIsShort';
        let message = Ed11y.M.blockquoteIsShort.tip();
        Ed11y.results.push([el, error, message, position, dismissKey]);
      }
    });
  }

}
