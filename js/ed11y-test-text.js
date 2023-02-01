class Ed11yTestText {
  
  // ESLint config 
  /* global Ed11y */
  /* exported Ed11yTestText */

  check () {

    // Detect paragraphs that should be lists: a. A. a) A) * - -- •.
    let activeMatch = '';
    let firstText = '';
    let prefixDecrement = {
      b: 'a',
      B: 'A',
      2: '1'
    };
    let prefixMatch = /a\.|a\)|A\.|A\)|1\.|1\)|\*\s|-\s|--|•\s|→\s|✓\s|✔\s|✗\s|✖\s|✘\s|❯\s|›\s|»\s/;
    let decrement = function (el) {
      return el.replace(/^b|^B|^2/, function (match) {
        return prefixDecrement[match];
      });
    };
    Ed11y.elements.p?.forEach((p, i) => {

      // Detect possible lists.
      let firstPrefix = '';
      let secondText = false;
      let hit = false;
      if (!firstText) {
        firstText = Ed11y.getText(p);
        firstPrefix = firstText.substring(0, 2);
      }
      // Grab first two characters.
      if (firstPrefix.length > 0 && firstPrefix !== activeMatch && firstPrefix.match(prefixMatch)) {
        // We have a prefix and a possible hit; check next detected paragraph.
        // Note these paragraphs may not be siblings in the DOM...
        let secondP = Ed11y.elements.p[i + 1];
        if (secondP) {
          secondText = Ed11y.getText(secondP).substring(0, 2);
          let secondPrefix = decrement(secondText);
          if (firstPrefix === secondPrefix) {
            // Note: this will flag <p>1. + <p>1.
            hit = true;
          }
        }
        if (!hit) {
          // Split p by carriage return if present and compare.
          // todo: this is not detected if the element after the BR has rich formatting
          let hasBreak = p?.querySelector('br')?.nextSibling?.nodeValue;
          if (hasBreak) {
            hasBreak = hasBreak.replace(/<\/?[^>]+(>|$)/g, '').trim().substring(0, 2);
            if (firstPrefix === decrement(hasBreak)) {
              hit = true;
            }
          }
        }
        if (hit) {
          let dismissKey = Ed11y.dismissalKey(firstText);
          Ed11y.results.push([p, 'textPossibleList', Ed11y.M.textPossibleList.tip(firstPrefix), 'afterbegin', dismissKey]);
          activeMatch = firstPrefix;
        }
        else {
          activeMatch = '';
        }
      }
      else {
        // Now check for possible heading.
        let possibleHeading = p.querySelector('strong:not(table strong), b:not(table b)');
        // Exclude paragraphs with links, then check if strong length equals p length.
        if (possibleHeading && !p.querySelector('a')) {
          possibleHeading = Ed11y.getText(possibleHeading);
          let length = possibleHeading.length;
          let maybeSentence = possibleHeading.match(/[.:;?!"']/) !== null;
          if (121 > length && length > 5 && length === firstText.length && maybeSentence === false) {
            let dismissKey = Ed11y.dismissalKey(possibleHeading);
            Ed11y.results.push([p, 'textPossibleHeading', Ed11y.M.textPossibleHeading.tip(), 'afterbegin', dismissKey]);
          }
        }
      }

      // Reset for next loop, carry over text query if available.
      firstText = secondText ? '' : secondText;
    });

    // Warning: Detect uppercase. For each element, if it contains more
    // than 4 uppercase words in a row, indicate warning.
    // Uppercase word is anything that is more than 3 characters.
    // Todo check performance of new regex.
    let checkCaps = function (el) {
      let thisText = '';
      if (el.tagName === 'LI') {
        // Prevent recursion through nested lists.
        el.childNodes.forEach((node) => {
          if (node.nodeType === 3) {
            thisText += node.textContent;
          }
        });
      }
      else {
        thisText = Ed11y.getText(el);
      }
      let uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      let detectUpperCase = thisText.match(uppercasePattern);

      if (detectUpperCase && detectUpperCase[0].length > 10) {
        let dismissKey = Ed11y.dismissalKey(thisText);
        let parentClickable = el.closest('a, button');
        if (parentClickable) {
          Ed11y.results.push([parentClickable, 'textUppercase', Ed11y.M.textUppercase.tip(), 'beforebegin', dismissKey]);
        } else {
          Ed11y.results.push([el, 'textUppercase', Ed11y.M.textUppercase.tip(), 'afterbegin', dismissKey]);
        }
      }
    };
    Ed11y.elements.h?.forEach((el) => {
      checkCaps(el);
    });
    Ed11y.elements.p?.forEach((el) => {
      checkCaps(el);
    });
    Ed11y.elements.blockquote?.forEach((el) => {
      checkCaps(el);
    });
    Ed11y.elements.li?.forEach((el) => {
      checkCaps(el);
    });

    // Check if a table has a table header.
    Ed11y.elements.table.forEach((el) => {
      let findTHeaders = el.querySelectorAll('th');
      let findHeadingTags = el.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (findTHeaders.length === 0) {
        Ed11y.results.push([el, 'tableNoHeaderCells', Ed11y.M.tableNoHeaderCells.tip(), 'beforebegin', false]);
      }
      else {
        // Make sure all table headers are not empty.
        findTHeaders.forEach((th) => {
          if (Ed11y.getText(th).length < 1 && !Ed11y.computeTitle(th)) {
            Ed11y.results.push([th, 'tableEmptyHeaderCell', Ed11y.M.tableEmptyHeaderCell.tip(), 'afterbegin', false]);
          }
        });
      }
      if (findHeadingTags) {
        findHeadingTags.forEach((h) => {
          Ed11y.results.push([h, 'tableContainsContentHeading', Ed11y.M.tableContainsContentHeading.tip(), 'beforebegin', false]);
        });
      }
    });

  }

}