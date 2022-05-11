class Ed11yTestImages {
  'use strict';
  
  check = function() {
    // todo: https://ryersondmp.github.io/sa11y/examples/headings-images.html
    // todo: flagging alts referencing position or color?
    // todo: empty alt with figcaption present blows up figure. code in Sa11y. see https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element and https://www.scottohara.me/blog/2019/01/21/how-do-you-figure.html

    Ed11y.imageAlts = [];

    // Test each image for alternative text.
    Ed11y.AllImages.forEach((el) => {

      let alt = el.getAttribute("alt");
      let src = el.getAttribute("src");
      let error = false;
      let dismissable = true;
      let parentLink = Ed11y.parentLink(el);
      
      // todo this is now true/false rather than a length measure
      if (typeof alt !== "string") {
        // No alt attribute at all.
        error = 'altMissing';
        dismissable = false;
      }
      else if (alt.length === 0 && !parentLink) {
        // Empty alt not part of link. 
        error = 'altNull';
      }
      else {
        // Check if alt text is descriptive.
        // todo parameterize
        let altUrl = [".png", ".jpg", ".jpeg", ".gif"];
        // todo localize
        let suspiciousWords = ["image of", "graphic of", "picture of", "placeholder", "photo of"];
        let check = [null, null];
        
        altUrl.forEach((string) => {
          if (alt.toLowerCase().indexOf(string) >= 0) {
            check[0] = 'URL';
          }
        })
        
        suspiciousWords.forEach((string) => {
          if (alt.toLowerCase().indexOf(string) >= 0) {
            check[1] = string;
          }
        })

        if (check[0] === 'URL') {
          error = 'altURL';
          dismissable = false;
        }
        else if (check[1] !== null) {
          error = 'altImageOf';
        }
        // Alert with deadspace alt.
        else if (alt !== "" && alt.replace(/"|'|\s+/g, "") === "") {
          error = 'altDeadspace'
          dismissable = false;
        }
        // Image error if alt text is too long.
        else if (alt.length > 160) {
          error = 'altLong';
        }

        Ed11y.imageAlts.push([el, alt, src, error]);

        // If there is a parent link...
        if (!!parentLink) {
          el = parentLink;
          // If we don't already have an error, check for mixed text
          if (!error && Ed11y.linkText(parentLink.textContent).length > 1) {
            // todo: need to remove ignored link text
            error = 'altPartOfLinkWithText';
          } else {
            // Return the linked version of the message
            error = error ? error + 'Linked' : error;
          }
          
        }
      }
      // Return results
      if (error) {
        let message = Ed11y.M[error].tip(Ed11y.sanitizeForHTML(alt));
        let baseSrc = src.split('?')[0];
        dismissable = dismissable ? Ed11y.dismissalKey(baseSrc + alt) : false;
        Ed11y.results.push([el, error, message, 'beforebegin', dismissable]); 
      }

    });
    
  }

}