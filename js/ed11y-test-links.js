class Ed11yTestLinks {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestLinks */

  check () {
    // Todo: See if there is an alternative to :visible that shows only visually hidden content.
    // Todo: Add test for consecutive links to same href?
    // Todo: parameterize linkIgnore
    // todo: parameterize stopwords as in Sa11y
    Ed11y.allLinks.forEach((el) => {
      // todo: investigate sa11y computation
      let linkText = Ed11y.computeAriaLabel(el);
      let img = el.querySelectorAll('img');
      let href = el.getAttribute('href');
      let hasImg = img.length > 0;
      let document = false;

      // todo: use regex to find any three-letter TLD followed by a slash?
      if (Ed11y.options.documentLinks && href) {
        Ed11y.options.documentLinks.forEach((fileType) => {
          let withQuery = fileType + '?';
          if (href.endsWith(fileType) || fileType.indexOf(withQuery) > -1) {
            document = true;
          }
        });
      }

      // todo: ends with, or contains including a ?
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
      }
      if (el?.getAttribute('target') === '_blank' && !document && linkText.indexOf('tab') === -1 && linkText.indexOf('window') === -1 && linkText.indexOf('external') === -1) {
        // Warn about unwarned new windows before ignoreString strip.
        let dismissKey = Ed11y.dismissalKey(linkText);
        
        //todo mvp
        Ed11y.results.push([el, 'linkNewWindow', Ed11y.M.linkNewWindow.tip(), 'beforebegin', dismissKey]);
      }
      linkText = linkText.replace(Ed11y.M.linkIgnoreStrings,'');
      let linkStrippedText = linkText.replace(/'|"|-|\.|\s+/g, '');

      // Tests to see if this link is empty
      // Todo add to test coverage
      if (linkStrippedText.length === 0) {
        linkStrippedText += Ed11y.computeTitle(el) ? Ed11y.computeTitle(el) : '';
        if (linkStrippedText.length === 0) {
          Ed11y.results.push([el, 'linkNoText', Ed11y.M.linkNoText.tip(), 'beforebegin', false]);
        }
      }
      else {
        // Checks if link text is not descriptive.
        let linkTextCheck = function (textContent) {
          // todo: use regex to find any three-letter TLD followed by a slash.
          // todo: parameterize TLD list
          let stopWords = ['http:/', 'https:/', '.asp', '.htm', '.php', '.edu/', '.com/'];
          let partialStopRegex = /learn|to|more|now|this|page|link|site|website|check|out|view|our|read|\.|,|:|download|form|here|click|>|<|\s/g;
          let hit = 'none';

          if (textContent.replace(partialStopRegex, '').length === 0) {
            // If no partial words were found, then check for total words.
            hit = 'generic';
          }
          else {
            for (let i = 0; i < stopWords.length; i++) {
              if (textContent.indexOf(stopWords[i]) > -1) {
                hit = 'url';
                break;
              }
            }
          }
          return hit;
        };
        let textCheck = linkTextCheck(linkText.trim().toLowerCase());
        if (textCheck !== 'none') {
          let dismissKey = Ed11y.dismissalKey(linkText);
          let error = 'linkTextIsURL';
          if (error === 'generic') {
            error = 'linkTextIsGeneric';
          }
          Ed11y.results.push([el, error, Ed11y.M[error].tip(Ed11y.sanitizeForHTML(linkText)), 'beforebegin', dismissKey]);
        }
      }
      //Warning: Find all PDFs. Although only append warning icon to
      // first PDF on page.
      if (!hasImg && document) {
        let dismissKey = Ed11y.dismissalKey(el?.getAttribute('src'));
        Ed11y.results.push([el, 'linkDocument', Ed11y.M.linkDocument.tip(), 'beforebegin', dismissKey]);
      }
    });
  }
}