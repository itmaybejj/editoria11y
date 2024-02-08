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
      let linkText = Ed11y.computeText(el, 0, !!Ed11y.options.linkIgnoreSelector); // returns text or 'noAria';
      let img = el.querySelectorAll('img');
      let hasImg = img.length > 0;
      let document = false;

      if (el.matches(Ed11y.options.documentLinks)) {
        document = true;
      }

      // Create version of text without "open in new window" warnings.
      let linkStrippedText = Ed11y.options.linkIgnoreStrings ? linkText.replace(Ed11y.options.linkIgnoreStrings, '') : linkText;
      linkStrippedText = linkStrippedText.toLowerCase();
      let linkNewWindows = linkStrippedText.replace(Ed11y.M.linkStringsNewWindows,'');
      if (el?.getAttribute('target') === '_blank' && linkText.length === linkNewWindows.length) {
        // Nothing was stripped AND we weren't warned.
        let dismissKey = Ed11y.dismissalKey(linkText);        
        Ed11y.results.push({
          element: el,
          test: 'linkNewWindow',
          content: Ed11y.M.linkNewWindow.tip(),
          position: 'beforebegin',
          dismissalKey: dismissKey,
        });
      }
      
      linkStrippedText = linkStrippedText.replace(/'|"|-|\.|\s+/g, '');

      // Tests to see if this link is empty
      if (linkStrippedText.length === 0) {   
        // already flagged by link test
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
        // Checks if link text is not descriptive.
        let linkTextCheck = function (textContent) {
          // todo later: use regex to find any three-letter TLD followed by a slash.
          // todo later: parameterize TLD list
          let linksUrls = Ed11y.options.linksUrls ? Ed11y.options.linksUrls : Ed11y.M.linksUrls;
          let linksMeaningless = Ed11y.options.linksMeaningless ? Ed11y.options.linksMeaningless : Ed11y.M.linksMeaningless;
          let hit = 'none';

          if (textContent.replace(linksMeaningless, '').length === 0) {
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
        let textCheck = linkTextCheck(linkStrippedText);
        if (textCheck !== 'none') {
          let dismissKey = false;
          let error = false;
          if (!hasImg) {
            error = 'linkTextIsURL';
            dismissKey = Ed11y.dismissalKey(linkText);
          }
          if (textCheck === 'generic') {
            error = 'linkTextIsGeneric';
            dismissKey = Ed11y.dismissalKey(linkText);
          }
          if (error) {
            Ed11y.results.push({
              element: el,
              test: error,
              content: Ed11y.M[error].tip(Ed11y.sanitizeForHTML(linkText)),
              position: 'beforebegin',
              dismissalKey: dismissKey,
            });
          }
        }
      }
      //Warning: Find all PDFs. Although only append warning icon to
      // first PDF on page.
      if (!hasImg && document) {
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