class Ed11yTestHeadings {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestHeadings */

  check () {
    // Reset panel; we rebuild on each run.
    // todo mvp rewrite to search the whole outline
    Ed11y.panel?.querySelectorAll('#ed11y-outline-list li, .ed11y-headings-label')?.forEach((el) => el.remove());

    let prevLevel = 0;
    let prevEditable = false;
    Ed11y.headingOutline = [];
    let position = 'afterbegin';

    // Test each header level for accessibility issues.
    Ed11y.elements.allH?.filter( el => Ed11y.elementNotHidden(el) )?.forEach((el) => {
      if (!Ed11y.addedNodeReadyToCheck(el)) {
        return;
      }
      let level;
      let alert = [];
      if (el.isContentEditable !== prevEditable) {
        let editableParent = el.closest('[contenteditable]');
        // first in editable zone
        if (editableParent) {
          Ed11y.options.editorHeadingLevel.some(level => {
            if (editableParent.closest(level.selector)) {
              if (level.previousHeading === 'inherit') {
                // Inherit levels
                return true;
              }
              prevLevel = level.previousHeading;
              return true;
            }
          });
        }
        prevEditable = el.isContentEditable;
      }

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
        outlinePrefix += Ed11y.M.errorOutlinePrefixHeadingEmpty;
        error = 'headingEmpty';
        dismissKey = false; // redeclare in case of two errors.
        alert.push({
          element: el,
          test: error,
          content: Ed11y.M.headingEmpty.tip(),
          position: position,
          dismissalKey: dismissKey,
        });
      }
      else if (headingLength > 160) {
        outlinePrefix += Ed11y.M.errorOutlinePrefixHeadingIsLong;
        dismissKey = Ed11y.dismissalKey(level + headingText);
        error = 'headingIsLong';
        alert.push({
          element: el,
          test: error,
          content: Ed11y.M.headingIsLong.tip(),
          position: position,
          dismissalKey: dismissKey,
        });
      }
      if (error !== 'headingEmpty' && prevLevel > 0 && level - prevLevel > 1) {
        dismissKey = Ed11y.dismissalKey(level + headingText);
        outlinePrefix += Ed11y.M.errorOutlinePrefixSkippedLevel;
        error = 'headingLevelSkipped';
        alert.push({
          element: el,
          test: error,
          content: Ed11y.M.headingLevelSkipped.tip(prevLevel, level),
          position: position,
          dismissalKey: dismissKey,
        });
      }
      prevLevel = level;

      if (Ed11y.elements.h?.includes(el)) {
        // Populate heading outline with included heading.
        Ed11y.headingOutline.push([el, level, outlinePrefix, dismissKey]);

        alert?.forEach((result) => {
          Ed11y.results.push(result);
        });
      } else if (!Ed11y.options.headingsOnlyFromCheckRoots) {
        Ed11y.headingOutline.push([el, level, '', dismissKey]);
      }

    });

    // Check for blockquotes used as headings. If it's less than 25
    // characters - it's probably not a blockquote.
    Ed11y.elements.blockquote?.forEach((el) => {
      if (!Ed11y.addedNodeReadyToCheck(el)) {
        return;
      }
      let text = Ed11y.getText(el);
      if (text && text.length < 25) {
        let dismissKey = Ed11y.dismissalKey(text);
        let error = 'blockquoteIsShort';
        let message = Ed11y.M.blockquoteIsShort.tip();
        Ed11y.results.push({
          element: el,
          test: error,
          content: message,
          position: position,
          dismissalKey: dismissKey,
        });
      }
    });
  }

}
