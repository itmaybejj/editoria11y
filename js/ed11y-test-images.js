class Ed11yTestImages {
  'use strict';

  check = function() {
    // todo: https://ryersondmp.github.io/sa11y/examples/headings-images.html
    // todo: flagging alts referencing position or color?
    // todo: empty alt with figcaption present blows up figure. code in Sa11y. see https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element and https://www.scottohara.me/blog/2019/01/21/how-do-you-figure.html
    Ed11y.checkAltText = () => {

      // Test each image for alternative text.
      Ed11y.AllImages.forEach((el) => {
        let alt = el.getAttribute("alt");
        let src = el.getAttribute("src");
        let parentLink = el.closest('a[href]');
        // todo this is now true/false rather than a length measure

        if (typeof alt !== "string") {
          Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yGeneralAltText]);
        }
        else if (alt.length === 0 && !parentLink) {
          // Empty alt inside a link tested in link checks.
          let dismissalKey = Ed11y.dismissalKey(src);
          Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltDecorative, "decorativeImage", dismissalKey]);
        }

        // If alt attribute is present, further tests are done.
        else {

          // Checks if text is not descriptive.
          let checkAltQuality = function (alt) {
            let altUrl = [".png", ".jpg", ".jpeg", ".gif"];
            let suspiciousWords = ["image of", "graphic of", "picture of", "placeholder", "photo of"];
            let hit = [null, null];
            altUrl.forEach((string) => {
              if (alt.toLowerCase().indexOf(string) >= 0) {
                hit[0] = string;
              }
            })
            suspiciousWords.forEach((string) => {
              if (alt.toLowerCase().indexOf(string) >= 0) {
                hit[1] = string;
              }
            })
            return hit;
          };

          let error = checkAltQuality(alt);
          let altText = Ed11y.sanitizeForHTML(alt);

          // Image fails if a url was found.
          // Todo: add images-in-links to test page coverage.
          if (!!parentLink) {
            if (error[0] !== null) {
              Ed11y.results.push([parentLink, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageAltUrl(altText)]);
            }
            else if (error[1] !== null) {
              // "image of"
              let dismissalKey = Ed11y.dismissalKey(src + altText);
              Ed11y.results.push([parentLink, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltImageOfLinked(error, altText), "AltImageOfLinked", dismissalKey]);
            }
            else if (alt.length > 160) {
              // Image warning if it is a link and contains long alt text.
              let dismissalKey = Ed11y.dismissalKey(src + altText);
              Ed11y.results.push([parentLink, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltLongLinked(alt, altText), "AltLongLinked", dismissalKey]);
            }
                // Warning: link and linked image both contain text.
            // todo: need to remove ignored link text
            else if (alt !== "" && Ed11y.linkText(parentLink.textContent).length > 1) {
              let dismissalKey = Ed11y.dismissalKey(src + altText);
              Ed11y.results.push([parentLink, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltLinkComplex(altText), "AltLinkComplex", dismissalKey]);
            }
          }
          // Now if there is no link...
          else if (error[0] !== null) {
            Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageAltFilename(altText)]);
          }
          else if (error[1] !== null) {
            let dismissalKey = Ed11y.dismissalKey(src + altText);
            Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltImageOf(error, altText),"AltImageOf", dismissalKey]);
          }
          // Alert with deadspace alt.
          else if (alt !== "" && alt.replace(/"|'|\s+/g, "") === "") {
            Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-error-border", 'ed11y-error-btn', ed11yMessageAltDeadspace]);
          }
          // Image error if alt text is too long.
          else if (alt.length > 160) {
            let dismissalKey = Ed11y.dismissalKey(src + altText);
            Ed11y.results.push([el, 'before', 'ed11y-instance-inline', "ed11y-warning-border", 'ed11y-warning-btn', ed11yMessageAltTooLong(alt, altText),"AltTooLong", dismissalKey]);
          }
        }
      });
    };
  }
}