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
      let linkText = Ed11y.computeAriaLabel(el); // returns text or 'noAria';
      let img = el.querySelectorAll('img');
      let hasImg = img.length > 0;
      let innerLabel = el.querySelectorAll('[aria-label]:not(img)');
      let document = false;

      if (el.matches(Ed11y.options.documentLinks)) {
        document = true;
      }

      // todo: replace with full accessible name calculation
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
        if (innerLabel.length > 0) {
          innerLabel.forEach(el => {
            linkText += el.getAttribute('aria-label');
          });
        }
        
      }
      
      // Todo replace with accessible name calculation?
      linkText += Ed11y.computeTitle(el) ? Ed11y.computeTitle(el) : '';


      // Create version of text without "open in new window" warnings.
      let linkStrippedText = Ed11y.options.linkIgnoreStrings ? linkText.replace(Ed11y.options.linkIgnoreStrings, '') : linkText;
      linkStrippedText = linkStrippedText.toLowerCase();
      let linkNewWindows = linkStrippedText.replace(Ed11y.M.linkStringsNewWindows,'');
      if (el?.getAttribute('target') === '_blank' && linkText.length === linkNewWindows.length) {
        // Nothing was stripped AND we weren't warned.
        let dismissKey = Ed11y.dismissalKey(linkText);        
        Ed11y.results.push([el, 'linkNewWindow', Ed11y.M.linkNewWindow.tip(), 'beforebegin', dismissKey]);
      }
      
      linkStrippedText = linkStrippedText.replace(/'|"|-|\.|\s+/g, '');

      // Tests to see if this link is empty
      if (linkStrippedText.length === 0) {   
        // already flagged by link test
        if (hasImg === false) {
          Ed11y.results.push([el, 'linkNoText', Ed11y.M.linkNoText.tip(), 'beforebegin', false]);
        } else {
          Ed11y.results.push([el, 'altEmptyLinked', Ed11y.M.altEmptyLinked.tip(), 'beforebegin', false]);
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
            Ed11y.results.push([el, error, Ed11y.M[error].tip(Ed11y.sanitizeForHTML(linkText)), 'beforebegin', dismissKey]);
          }
        }
      }
      //Warning: Find all PDFs. Although only append warning icon to
      // first PDF on page.
      if (!hasImg && document) {
        let dismissKey = Ed11y.dismissalKey(el?.getAttribute('href'));
        Ed11y.results.push([el, 'linkDocument', Ed11y.M.linkDocument.tip(), 'beforebegin', dismissKey]);
      }
    });
  }
}