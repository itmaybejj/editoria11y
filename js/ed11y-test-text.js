class Ed11yTestText {

  // ESLint config
  /* global Ed11y */
  /* exported Ed11yTestText */

  check () {

    /*
     * Detect paragraphs that should be lists: a. A. a) A) * - -- •.
     */

    // Set up checks for types of strings.
    const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, ''); // All numbers but 1.
    const alphabeticMatch = new RegExp(/(^[aA1]|[^\p{Alphabetic}\s])[-\s.)]/, 'u');
    const emojiMatch = new RegExp(/\p{Extended_Pictographic}|[•*]/, 'u');
    const secondTextNoMatch = ['a','A','1'];
    const prefixDecrement = { // Converts to check a / b.
      b: 'a',
      B: 'A',
      2: '1'
    };
    const decrement = function (el) {
      return el.replace(/^b|^B|^2/, function (match) {
        return prefixDecrement[match];
      });
    };

    // Variables to carry in loop.
    let activeMatch = ''; // Carried in loop for second paragraph.
    let firstText = '';   // Text of previous paragraph.
    let lastHitWasEmoji = false;

    // Iterate paragraphs, comparing with previous in loop.
    Ed11y.elements.p?.forEach((p, i) => {
      let secondText = false;
      let hit = false;
      firstText = firstText ? firstText : Ed11y.getText(p).replace('(','');
      let firstPrefix = firstText.substring(0, 2);

      // Grab first two characters.
      const isAlphabetic = firstPrefix.match(alphabeticMatch) !== null;
      const isNumber = firstPrefix.match(numberMatch) !== null;
      const isEmoji = firstPrefix.match(emojiMatch) !== null;

      if (firstPrefix.length > 0 && (firstPrefix !== activeMatch || (lastHitWasEmoji && isEmoji)) && !isNumber && (isAlphabetic || isEmoji)) {
        // We have a prefix and a possible hit; check next detected paragraph.
        let secondP = Ed11y.elements.p[i + 1];
        compareP: if (secondP) {
          secondText = Ed11y.getText(secondP).replace('(','').substring(0, 2);
          if (secondTextNoMatch.includes(secondText?.toLowerCase().trim())) {
            // A sentence. A nother sentence. (A sentence). 1 apple, 1 banana.
            break compareP;
          }
          let secondPrefix = decrement(secondText);
          if (isAlphabetic) {
            // Check for repeats (*,*) or increments(a,b)
            if (firstPrefix !== 'A ' && firstPrefix === secondPrefix) {
              hit = true;
            }
          } else if (isEmoji && !lastHitWasEmoji) {
            // Check for two paragraphs in a row that start with emoji
            if (secondPrefix.match(emojiMatch)) {
              hit = true;
              lastHitWasEmoji = true;
              // This is carried; better miss than have lots of positives.
            }
          }
        }
        if (!hit) {
          // Split p by carriage return if there was a firstPrefix and compare.
          // todo: this fails if the element after the BR has rich formatting.
          let textAfterBreak = p?.querySelector('br')?.nextSibling?.nodeValue;
          if (textAfterBreak) {
            textAfterBreak = textAfterBreak.replace(/<\/?[^>]+(>|$)/g, '').replace('(','').trim().substring(0, 2);
            if (firstPrefix === decrement(textAfterBreak) || (!isAlphabetic && !lastHitWasEmoji && textAfterBreak.match(emojiMatch))) {
              hit = true;
            }
          }
        }
        if (hit) {
          let dismissKey = Ed11y.dismissalKey(firstText);
          const nicePrefix = /[•*-1aA]/.test(firstPrefix) ? firstPrefix.substring(0, 1) : firstPrefix;
          Ed11y.results.push(
            {
              element: p,
              test: 'textPossibleList',
              content: Ed11y.options.langSanitizes ?
                Ed11y.M.textPossibleList.tip(firstPrefix) :
                Ed11y.M.textPossibleList.tip(Ed11y.sanitizeForHTML(nicePrefix)),
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
      if (!(isEmoji && lastHitWasEmoji)) {
        lastHitWasEmoji = false;
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
      if (!Ed11y.addedNodeReadyToCheck(el)) {
        return;
      }
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
        // Make sure table headers are not empty.
        Array.from(findTHeaders).some((th) => {
          if (Ed11y.computeText(th).length < 1) {
            if (th.matches('th + th, tr + tr th')) {
              Ed11y.results.push({
                element: th,
                test: 'tableEmptyHeaderCell',
                content: Ed11y.M.tableEmptyHeaderCell.tip(),
                position: 'afterbegin',
                dismissalKey: false,
              });
              return true;
            } else {
              Ed11y.results.push({
                element: th,
                test: 'tableEmptyHeaderCell',
                content: Ed11y.M.tableEmptyHeaderCell.tip(),
                position: 'afterbegin',
                dismissalKey: Ed11y.dismissalKey(th.closest('tr')?.innerHTML),
              });
            }
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
