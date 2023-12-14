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
    let prefixMatch = new RegExp(/([aA1]|[^\p{Alphabetic}\s])[-\s.)]/, 'u');
    let emojiMatch = new RegExp(/\p{Emoji}/, 'u');
    let decrement = function (el) {
      return el.replace(/^b|^B|^2/, function (match) {
        return prefixDecrement[match];
      });
    };

    let lastHitWasEmoji = false;
    Ed11y.elements.p?.forEach((p, i) => {

      // Detect possible lists.
      let firstPrefix = '';
      let secondText = false;
      let hit = false;
      if (!firstText) {
        firstText = Ed11y.getText(p).replace('(','');
        firstPrefix = firstText.substring(0, 2);
      }
      // Grab first two characters.
      let matchWasntEmoji = firstPrefix.match(prefixMatch);
      if (firstPrefix.length > 0 && firstPrefix !== activeMatch && (matchWasntEmoji || firstPrefix.match(emojiMatch))) {
        // We have a prefix and a possible hit; check next detected paragraph.
        let secondP = Ed11y.elements.p[i + 1];
        compareP: if (secondP) {
          secondText = Ed11y.getText(secondP).replace('(','').substring(0, 2);
          if (secondText === 'A') {
            // A sentence. A nother sentence.
            break compareP;
          }
          let secondPrefix = decrement(secondText);
          if (matchWasntEmoji) {
            // Check for repeats (*,*) or increments(a,b)
            lastHitWasEmoji = false;
            if (firstPrefix !== 'A ' && firstPrefix === secondPrefix) {
              hit = true;
            }
          } else if (!lastHitWasEmoji) {
            // Check for two paragraphs in a row that start with emoji
            if (secondPrefix.match(emojiMatch)) {
              hit = true;
            }
            // It was an emoji match.
            lastHitWasEmoji = hit;
          }
        }
        if (!hit) {
          // Split p by carriage return if there was a firstPrefix and compare.
          // todo: this is not detected if the element after the BR has rich formatting
          let textAfterBreak = p?.querySelector('br')?.nextSibling?.nodeValue;
          if (textAfterBreak) {
            textAfterBreak = textAfterBreak.replace(/<\/?[^>]+(>|$)/g, '').replace('(','').trim().substring(0, 2);
            if (firstPrefix === decrement(textAfterBreak) || (!matchWasntEmoji && !lastHitWasEmoji && textAfterBreak.match(emojiMatch))) {
              hit = true;
            }
          }
        }
        if (hit) {
          let dismissKey = Ed11y.dismissalKey(firstText);
          Ed11y.results.push(
            {
              element: p,
              test: 'textPossibleList',
              content: Ed11y.M.textPossibleList.tip(firstPrefix),
              position: 'afterbegin',
              dismissalKey: dismissKey,
            });
          activeMatch = firstPrefix;
        }
        else {
          // TODO: we could add a check for multiple emoji within the paragraph now.
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
            Ed11y.results.push({
              element: p,
              test: 'textPossibleHeading',
              content: Ed11y.M.textPossibleHeading.tip(),
              position: 'afterbegin',
              dismissalKey: dismissKey,
            });
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
          Ed11y.results.push(
            {
              element: parentClickable,
              test: 'textUppercase',
              content: Ed11y.M.textUppercase.tip(),
              position: 'beforebegin',
              dismissalKey: dismissKey,
            });
        } else {
          Ed11y.results.push({
            element: el,
            test: 'textUppercase',
            content: Ed11y.M.textUppercase.tip(),
            position: 'afterbegin',
            dismissalKey: dismissKey,
          });
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
        Ed11y.results.push({
          element: el,
          test: 'tableNoHeaderCells',
          content: Ed11y.M.tableNoHeaderCells.tip(),
          position: 'beforebegin',
          dismissalKey: false,
        });
      }
      else {
        // Make sure all table headers are not empty.
        findTHeaders.forEach((th) => {
          if (Ed11y.computeText(th).length < 1) {
            Ed11y.results.push({
              element: th,
              test: 'tableEmptyHeaderCell',
              content: Ed11y.M.tableEmptyHeaderCell.tip(),
              position: 'afterbegin',
              dismissalKey: false,
            });
          }
        });
      }
      if (findHeadingTags) {
        findHeadingTags.forEach((h) => {
          Ed11y.results.push({
            element: h,
            test: 'tableContainsContentHeading',
            content: Ed11y.M.tableContainsContentHeading.tip(),
            position: 'beforebegin',
            dismissalKey: false,
          });
        });
      }
    });

  }

}