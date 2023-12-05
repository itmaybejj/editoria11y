class Ed11yTestEmbeds {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestEmbeds */

  check () {

    // Check frames, audio and video
    let video = Ed11y.srcMatchesOptions(Ed11y.elements.iframe, Ed11y.options.videoContent);
    video = video ? video.concat(Array.from(Ed11y.elements.video)) : Ed11y.elements.video;
    if (video.length > 0) {
      video.forEach(el => {
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el?.getAttribute('src') !== 'undefined' ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
        Ed11y.results.push({
          element: el,
          test: 'embedVideo',
          content: Ed11y.M.embedVideo.tip(),
          position: 'beforebegin',
          dismissalKey: dismissKey,
        });
      });
    }
  
    let audio = Ed11y.srcMatchesOptions(Ed11y.elements.iframe, Ed11y.options.audioContent);
    audio = audio ? audio.concat(Array.from(Ed11y.elements.audio)) : Ed11y.elements.audio;
    if (audio.length > 0) {
      audio.forEach(el => {
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el?.getAttribute('src') !== 'undefined' ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
        Ed11y.results.push({
          element: el,
          test: 'embedAudio',
          content: Ed11y.M.embedAudio.tip(),
          position: 'beforebegin',
          dismissalKey: dismissKey,
        });
      });
    }
  
    let visualizations = Ed11y.srcMatchesOptions(Ed11y.elements.iframe, Ed11y.options.dataVizContent);
    if (visualizations.length > 0) {
      visualizations.forEach(el => {
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el.getAttribute('src'));
        Ed11y.results.push({
          element: el,
          test: 'embedVisualization',
          content: Ed11y.M.embedVisualization.tip(),
          position: 'beforebegin',
          dismissalKey: dismissKey,
        });
      });
    }
  
    // Warning: Twitter keyboard trap
    let twits = Ed11y.srcMatchesOptions(Ed11y.elements.frame, Ed11y.options.twitterContent);
    if (twits.length > 0) {
      twits.forEach(twit => {
        let numberOfTweets = twit.querySelectorAll('.timeline-TweetList-tweet');
        if (!!numberOfTweets && numberOfTweets > 3) {
          let dismissKey = Ed11y.dismissalKey(twit.getAttribute('src'));
          Ed11y.results.push({
            element: twit,
            test: 'embedTwitter',
            content: Ed11y.M.embedTwitter.tip(),
            position: 'beforebegin',
            dismissalKey: dismissKey,
          });
        }
      });
    }

    if (Ed11y.options.embeddedContent) {
      Ed11y.elements.embed?.forEach((el) => {
        let dismissKey = Ed11y.dismissalKey(el.getAttribute('src') + el.getAttribute('id') + el.getAttribute('class'));
        Ed11y.results.push({
          element: el,
          test: 'embedCustom',
          content: Ed11y.M.embedCustom.tip(),
          position: 'beforebegin',
          dismissalKey: dismissKey,
        });
      });
    }
  
  }
  
}