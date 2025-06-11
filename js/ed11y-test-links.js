class Ed11yTestLinks {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestLinks */

  check () {
    // todo: See if there is an alternative to :visible that shows only visually hidden content.
    // todo later: Add test for consecutive links to same href?
    // todo later: parameterize stopwords as in Sa11y

    Ed11y.elements.a?.forEach((el) => {
      // todo: replace with full accessible name calculation
      let linkText = Ed11y.computeText(el, 0, !!Ed11y.options.linkIgnoreSelector);
      let img = el.querySelectorAll('img');
      let hasImg = img.length > 0;
      let document = el.matches(Ed11y.options.documentLinks);

      if (el?.getAttribute('target') === '_blank') {
        // Nothing was stripped AND we weren't warned.
        if (
          !(
            (Ed11y.options.linkIgnoreSelector &&
              el?.querySelector(Ed11y.options.linkIgnoreSelector))
              || linkText.toLowerCase().match(Ed11y.options.linkStringsNewWindows)
          )
        ) {
          let dismissKey = Ed11y.dismissalKey(linkText);
          Ed11y.results.push({
            element: el,
            test: 'linkNewWindow',
            content: Ed11y.M.linkNewWindow.tip(),
            position: 'beforebegin',
            dismissalKey: dismissKey,
          });
        }
      }

      // Todo: add test for title === textContent. Don't use computedText().

      // Tests to see if this link is empty
      if (
        linkText.replace(/"|'|\?|\.|-|\s+/g, '').length === 0 &&
          !( Ed11y.options.linkIgnoreSelector &&
          el.querySelector(Ed11y.options.linkIgnoreSelector)
          )
      ) {
        // Link with no text at all.
        if (hasImg === false) {
          Ed11y.results.push({
            element: el,
            test: 'linkNoText',
            content: Ed11y.M.linkNoText.tip(),
            position: 'beforebegin',
            dismissalKey: false,
          });
        } else {
          Ed11y.results.push({
            element: el,
            test: 'altEmptyLinked',
            content: Ed11y.M.altEmptyLinked.tip(),
            position: 'beforebegin',
            dismissalKey: false,
          });
        }
      }
      else {
        let linkTextCheck = function (textContent) {
          // Checks if link text is not descriptive.
          let linkStrippedText = textContent.toLowerCase();
          // Create version of text without "open in new window" warnings.

          if (Ed11y.options.linkStringsNewWindows &&
            Ed11y.options.linkStringsNewWindows !== Ed11y.M.linkStringsNewWindows) {
            // don't strip on the default, which is loose.
            linkStrippedText = linkStrippedText.replace(Ed11y.options.linkIgnoreStrings, '');
          }
          if (Ed11y.options.linkIgnoreStrings) {
            linkStrippedText = Ed11y.options.linkIgnoreStrings ?
              linkStrippedText.replace(Ed11y.options.linkIgnoreStrings, '')
              : linkStrippedText;
          }
          if (linkStrippedText.replace(/"|'|\?|\.|-|\s+/g, '').length === 0) {
            // No Text because of stripping out ignoreStrings.
            return 'generic';
          }

          // todo later: use regex to find any three-letter TLD followed by a slash.
          // todo later: parameterize TLD list
          let linksUrls = Ed11y.options.linksUrls ? Ed11y.options.linksUrls : Ed11y.M.linksUrls;
          let linksMeaningless = Ed11y.options.linksMeaningless ? Ed11y.options.linksMeaningless : Ed11y.M.linksMeaningless;
          let hit = 'none';

          if (linkStrippedText.replace(linksMeaningless, '').length === 0) {
            // If no partial words were found, then check for total words.
            hit = 'generic';
          }
          else {
            for (let i = 0; i < linksUrls.length; i++) {
              if (textContent.indexOf(linksUrls[i]) > -1) {
                hit = 'url';
                break;
              }
            }
          }
          return hit;
        };
        let textCheck = linkTextCheck(linkText);
        if (textCheck !== 'none') {
          let error = false;
          if (!hasImg && textCheck === 'url') {
            // Images test will pick this up.
            error = 'linkTextIsURL';
          }
          if (textCheck === 'generic') {
            error = 'linkTextIsGeneric';
            if (linkText.length < 4) {
              // Reinsert ignored link strings.
              linkText = Ed11y.computeText(el, 0);
            }
          }
          if (error) {
            Ed11y.results.push({
              element: el,
              test: error,
              content: Ed11y.M[error].tip(Ed11y.sanitizeForHTML(linkText)),
              position: 'beforebegin',
              dismissalKey: Ed11y.dismissalKey(linkText),
            });
          }
        }
      }
      // Warning: Find all PDFs.
      if ( document ) {
        let dismissKey = Ed11y.dismissalKey(el?.getAttribute('href'));
        Ed11y.results.push(
          {
            element: el,
            test: 'linkDocument',
            content: Ed11y.M.linkDocument.tip(),
            position: 'beforebegin',
            dismissalKey: dismissKey,
          });
      }
    });
  }
}
