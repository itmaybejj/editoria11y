class Ed11yTestLinks {
  'use strict';

  check = function () {
    // Todo: See if there is an alternative to :visible that shows only visually hidden content.
    // Todo: Add test for consecutive links to same href?
    // Todo: parameterize linkIgnore
    // todo: parameterize stopwords as in Sa11y

    Ed11y.allLinks.forEach((el) => {
      // todo: investigate sa11y computation
      let linkText = Ed11y.computeAriaLabel(el);
      let img = el.querySelectorAll('img');
      let hasImg = img.length > 0;
      // todo: test downloadmatch
      let downloadMatch = false;
      // todo parameter
      ed11yDownloadLinks.forEach((string) => {
        let withQuery = string + "?";
        if (linkText.lastIndexOf(string) === 0 || linkText.indexOf(withQuery) > -1) {
          return true;
        }
      });
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
      if (el?.getAttribute('target') === '_blank' && downloadMatch === false && linkText.indexOf('tab') === -1 && linkText.indexOf('window') === -1 && linkText.indexOf('external') === -1) {
        // Warn about unwarned new windows before ignoreString strip.
        let dismissalKey = Ed11y.dismissalKey(linkText);
        Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-link-text-warning", 'ed11y-warning-btn', ed11yMessageQANewTab, "QANewTab", dismissalKey]);
      }
      linkText = linkText.replace(ed11yIgnoreLinkStrings,"");
      let linkStrippedText = linkText.replace(/'|"|-|\.|\s+/g, '');

      // Tests to see if this link is empty
      // Todo add to test coverage
      if (linkStrippedText.length === 0) {
        linkStrippedText += !!Ed11y.computeTitle(el) ? Ed11y.computeTitle(el) : "";
        if (linkStrippedText.length === 0) {
          if (hasImg) {
            Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageLinkHasNoText]);
          }
          else {
            Ed11y.results.push([el, 'before', 'ed11y-inline-block', "ed11y-link-text-fail", 'ed11y-error-btn', ed11yMessageLinkHasNoText]);
          }
        }
      }
      else {
        // Checks if link text is not descriptive.
        let linkTextCheck = function (textContent) {
          // todo: use regex to find any three-letter TLD followed by a slash.
          // todo: parameterize TLD list
          let stopWords = ["http:/", "https:/", ".asp", ".htm", ".php", ".edu/", ".com/"];
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
        let error = linkTextCheck(linkText.trim());
        if (error !== "none") {
          let dismissalKey = Ed11y.dismissalKey(linkText);
          let stopWordMessage = "";
          if (error === "url") {
            // Url
            stopWordMessage = ed11yMessagelinkTextIsURL;
          }
          else if (error === "generic") {
            stopWordMessage = ed11yMessagelinkTextIsGeneric;
          }
          Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-link-text-warning", 'ed11y-warning-btn', stopWordMessage, "LinkTextIsGeneric", dismissalKey]);
        }
      }
      //Warning: Find all PDFs. Although only append warning icon to
      // first PDF on page.
      if (!hasImg && downloadMatch > 0) {
        let dismissalKey = Ed11y.dismissalKey(el?.getAttribute("src"));
        el.classList.add('ed11y-text-warning');
        Ed11y.results.push([el, 'after', 'ed11y-instance-inline', "", 'ed11y-warning-btn', ed11yMessageLinkDownload, "LinkDownload", dismissalKey]);
      }
    });
  };
}