class Ed11yTestImages {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestImages */

  check () {
    // todo postpone: https://ryersondmp.github.io/sa11y/examples/headings-images.html
    // todo postpone: flagging alts referencing position or color?
    // todo beta: empty alt with figcaption present blows up figure. code in Sa11y. see https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element and https://www.scottohara.me/blog/2019/01/21/how-do-you-figure.html

    Ed11y.imageAlts = [];

    // Test each image for alternative text.
    Ed11y.elements.img.forEach((el) => {

      let alt = el.getAttribute('alt');
      let altLabel = Ed11y.M.altLabelPrefix;
      let src = el.getAttribute('src');
      let error = false;
      let dismissable = true;
      let parentLink = Ed11y.parentLink(el);

      // todo mvp this is now true/false rather than a length measure
      if (typeof alt !== 'string') {
        // No alt attribute at all.
        error = 'altMissing';
        dismissable = false;
        // todo parameterize
        altLabel += Ed11y.M.errorAltMissing;
      }
      else if ((!!Ed11y.options.altPlaceholder && alt.indexOf(Ed11y.options.altPlaceholder) !== -1) || (alt.length === 0 && !parentLink)) {
        // Empty alt not part of link. Link test will not flag this if the link has other text.
        error = 'altNull';
        altLabel += Ed11y.M.errorAltNull;
      }
      else {
        altLabel += alt;
        const altLower = alt.toLowerCase();

        if (Ed11y.M.meaninglessAlt.includes(altLower.trim())) {
          error = 'altMeaningless';
          dismissable = false;
        } else {
          // Check if alt text is descriptive.
          // todo parameterize
          let altUrl = ['.png', '.jpg', '.jpeg', '.gif'];
          // todo localize
          let suspiciousWords = Ed11y.M.suspiciousWords;
          let check = [null, null];

          altUrl.forEach((string) => {
            if (altLower.indexOf(string) >= 0) {
              check[0] = 'URL';
            }
          });

          suspiciousWords.forEach((string) => {
            const suspiciousWord = altLower.indexOf(string);
            if (suspiciousWord > -1 && suspiciousWord < 6) {
              // photo of, a photo of, the photo is
              check[1] = string;
            }
          });

          if (check[0] === 'URL') {
            error = 'altURL';
            dismissable = false;
          }
          else if (check[1] !== null) {
            error = 'altImageOf';
          }
          // Alert with deadSpace alt.
          else if (!parentLink && alt !== '' && alt.replace(/"|'|\?|\.|-|\s+/g, '') === '') {
            error = 'altDeadspace';
            dismissable = false;
          }
          // Image error if alt text is too long.
          else if (alt.length > 160) {
            error = 'altLong';
          }
        }

        // If there is a parent link...
        if (parentLink !== null) {
          el = parentLink;
          // If we don't already have an error, check for mixed text
          if (!error && alt !== '' && Ed11y.linkText(parentLink.textContent).length > 1) {
            // todo: need to remove ignored link text
            error = 'altPartOfLinkWithText';
          } else {
            // Return the linked version of the message.
            error = error ? error + 'Linked' : error;
          }

        }
      }
      // Return results
      let altStyle = 'pass';

      if (error) {
        let message = Ed11y.M[error].tip(Ed11y.sanitizeForHTML(alt));
        let baseSrc = src ? src.split('?')[0] : 'nosrc_';
        dismissable = dismissable ? Ed11y.dismissalKey(baseSrc + alt) : false;
        Ed11y.results.push({
          element: el,
          test: error,
          content: message,
          position: 'beforebegin',
          dismissalKey: dismissable,
        });
        altStyle = dismissable === false ? 'ed11y-error' : 'ed11y-warning';
      }
      Ed11y.imageAlts.push([el, src, altLabel, altStyle]);

    });

  }

}
