class Ed11yTestQA {
  'use strict';

  check = function () {

    // Detect paragraphs that should be lists: a. A. a) A) * - -- •.
    let activeMatch = "";
    let firstText = "";
    let prefixDecrement = {
      b: "a",
      B: "A",
      2: "1"
    };
    let prefixMatch = /a\.|a\)|A\.|A\)|1\.|1\)|\*\s|-\s|--|•\s|→\s|✓\s|✔\s|✗\s|✖\s|✘\s|❯\s|›\s|»\s/;
    let decrement = function (el) {
      return el.replace(/^b|^B|^2/, function (match) {
        return prefixDecrement[match];
      });
    };
    Ed11y.allP.forEach((p, i) => {

      // Detect possible lists.
      let firstPrefix = "";
      let secondText = false;
      let hit = false;
      if (!firstText) {
        let firstText = Ed11y.getText(p);
        firstPrefix = firstText.substring(0, 2);
      }
      // Grab first two characters.
      if (firstPrefix.length > 0 && firstPrefix !== activeMatch && firstPrefix.match(prefixMatch)) {
        // We have a prefix and a possible hit; check next detected paragraph.
        // Note these paragraphs may not be siblings in the DOM...
        let secondP = Ed11y.allP[i + 1];
        if (!!secondP) {
          secondText = Ed11y.getText(secondP);
          let secondPrefix = decrement(secondText.substring(0, 2));
          if (firstPrefix === secondPrefix) {
            // Note: this will flag <p>1. + <p>1.
            hit = true;
          }
        }
        if (!hit) {
          // Split p by carriage return if present and compare.
          let hasBreak = p?.querySelector("br")?.nextSibling?.nodeValue;
          if (hasBreak) {
            hasBreak = hasBreak.replace(/<\/?[^>]+(>|$)/g, "").trim();
            if (firstPrefix === decrement(hasBreak.substring(0, 2))) {
              hit = true;
            }
          }
        }
        if (hit) {
          let dismissalKey = Ed11y.dismissalKey(firstText);
          let ed11yShouldBeList = ed11yMessageQAShouldBeList(firstPrefix);
          Ed11y.results.push([p, 'prepend', 'ed11y-instance-inline', '', 'ed11y-warning-btn', ed11yShouldBeList, "ShouldBeList", dismissalKey]);
          activeMatch = firstPrefix;
        }
        else {
          activeMatch = "";
        }
      }
      else {

        // Now check for possible header.
        let possibleHeader = p.querySelector('strong, b');
        if (!!possibleHeader) {
          possibleHeader = Ed11y.getText(possibleHeader);
          let maybeSentence = possibleHeader.match(/[.:;"']$/) !== null;
          if (121 > possibleHeader.length > 0 && maybeSentence === false && possibleHeader.length === firstText.length) {
            let dismissalKey = Ed11y.dismissalKey(firstText);
            Ed11y.results.push([p, 'prepend', 'ed11y-instance-inline', "", 'ed11y-warning-btn', ed11yMessageQAMayBeHeader, "QAMayBeHeader", dismissalKey]);
          }
        }
      }

      // Reset for next loop, carry over text query if available.
      firstText = secondText ? "" : secondText;
    });

    // Warning: Detect uppercase. For each element, if it contains more
    // than 4 uppercase words in a row, indicate warning.
    // Uppercase word is anything that is more than 3 characters.
    // Todo check performance of new regex.
    let checkCaps = function (el) {
      let thisText = "";
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
        let dismissalKey = Ed11y.dismissalKey(thisText);
        Ed11y.results.push([el, 'prepend', 'ed11y-instance-inline', 'ed11y-uppercase-warning', 'ed11y-warning-btn', ed11yMessageQAUppercase, "QAUppercase", dismissalKey]);
      }
    }
    Ed11y.allH.forEach((el) => {
      checkCaps(el);
    });
    Ed11y.allP.forEach((el) => {
      checkCaps(el);
    });
    Ed11y.allBlockquote.forEach((el) => {
      checkCaps(el);
    });
    Ed11y.allLists.forEach((el) => {
      checkCaps(el);
    });

    // Check if a table has a table header.
    Ed11y.allTables.forEach((el) => {
      let findTHeaders = el?.querySelectorAll("th");
      let findHeadingTags = el?.querySelectorAll("h1, h2, h3, h4, h5, h6");
      if (!findTHeaders) {
        Ed11y.results.push([el, 'before', 'ed11y-instance', 'ed11y-error-border', 'ed11y-error-btn', ed11yMessageMissingQATableHeadings]);
      }
      else {
        // Make sure all table headers are not empty.
        findTHeaders.forEach((th) => {
          if (Ed11y.getText(th).length < 1 && !Ed11y.computeTitle(th)) {
            Ed11y.results.push([th, 'prepend', 'ed11y-instance', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageEmptyTableHeader]);
          }
        });
      }
      if (!!findHeadingTags) {
        // todo: have results escalate errors over warnings when both present
        findHeadingTags.forEach((h) => {
          Ed11y.results.push([h, 'before', 'ed11y-instance', 'ed11y-error-border', 'ed11y-error-btn', ed11yMessageQAHeaderInTable]);
        });
      }
    });

    // Check frames, audio and video
    let video = Ed11y.srcMatchesOptions(Ed11y.allFrames, Ed11y.options.videoContent);
    video = video.concat(Ed11y.allVideo);
    if (video.length > 0) {
      video.forEach(el => {
        Ed11y.mediaCount++;
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el.hasAttribute('src') ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
        Ed11y.results.push([el, 'before', 'ed11y-instance', "", 'ed11y-warning-btn', ed11yMessageshowCaptions, "captions", dismissKey]);
      })
    }

    let audio = Ed11y.srcMatchesOptions(Ed11y.allFrames, Ed11y.options.audioContent);
    audio = audio.concat(Ed11y.allAudio);
    if (audio.length > 0) {
      audio.forEach(el => {
        Ed11y.mediaCount++;
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el.hasAttribute('src') ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
        Ed11y.results.push([el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessagePodcast, "transcripts", dismissKey]);
      })
    }

    let visualizations = Ed11y.srcMatchesOptions(Ed11y.allFrames, Ed11y.options.dataVizContent);
    if (visualizations.length > 0) {
      visualizations.forEach(el => {
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el.getAttribute('src'));
        Ed11y.results.push([el, 'before', 'ed11y-instance', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageVisualization, "visualization", dismissKey]);
      })
    }

    // Warning: Twitter keyboard trap
    let twits = Ed11y.srcMatchesOptions(Ed11y.allFrames, Ed11y.options.twitterContent);
    if (twits.length > 0) {
      twits.forEach(twit => {
        let numberOfTweets = twit.querySelectorAll(".timeline-TweetList-tweet");
        if (!!numberOfTweets && numberOfTweets > 3) {
          Ed11y.results.push([twit, 'before', 'ed11y-instance', "ed11y-text-warning", 'ed11y-warning-btn', ed11yMessageTwitter]);
        }
      })
    }


    if (Ed11y.options.embeddedContent.length > 1) {
      let embed = Ed11y.srcMatchesOptions(Ed11y.allFrames, Ed11y.options.embeddedContent);
      embed.forEach((el) => {
        Ed11y.results.push([el, 'before', 'ed11y-instance', 'ed11y-warning-border', 'ed11y-warning-btn', ed11yMessageEmbeddedContent]);
      });
    }

  };

}