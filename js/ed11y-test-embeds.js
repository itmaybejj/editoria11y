class Ed11yTestEmbeds {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestEmbeds */

  check () {

    // Check frames, audio and video
    let video = Ed11y.srcMatchesOptions(Ed11y.elements.iframe, Ed11y.options.videoContent);
    video = video.concat(Array.from(Ed11y.elements.video));
    if (video.length > 0) {
      video.forEach(el => {
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el?.getAttribute('src') !== 'undefined' ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
        Ed11y.results.push([el, 'embedVideo', Ed11y.M.embedVideo.tip(), 'beforebegin', dismissKey]);
      });
    }
  
    let audio = Ed11y.srcMatchesOptions(Ed11y.elements.iframe, Ed11y.options.audioContent);
    audio = audio.concat(Array.from(Ed11y.elements.audio));
    if (audio.length > 0) {
      audio.forEach(el => {
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el?.getAttribute('src') !== 'undefined' ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
        Ed11y.results.push([el, 'embedAudio', Ed11y.M.embedAudio.tip(), 'beforebegin', dismissKey]);
      });
    }
  
    let visualizations = Ed11y.srcMatchesOptions(Ed11y.elements.iframe, Ed11y.options.dataVizContent);
    if (visualizations.length > 0) {
      visualizations.forEach(el => {
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el.getAttribute('src'));
        Ed11y.results.push([el, 'embedVisualization', Ed11y.M.embedVisualization.tip(), 'beforebegin', dismissKey]);
      });
    }
  
    // Warning: Twitter keyboard trap
    let twits = Ed11y.srcMatchesOptions(Ed11y.elements.frame, Ed11y.options.twitterContent);
    if (twits.length > 0) {
      twits.forEach(twit => {
        let numberOfTweets = twit.querySelectorAll('.timeline-TweetList-tweet');
        if (!!numberOfTweets && numberOfTweets > 3) {
          let dismissKey = Ed11y.dismissalKey(twit.getAttribute('src'));
          Ed11y.results.push([twit, 'embedTwitter', Ed11y.M.embedTwitter.tip(), 'beforebegin', dismissKey]);
        }
      });
    }

    if (Ed11y.options.embeddedContent.length > 1) {
      let embed = Ed11y.srcMatchesOptions(Ed11y.elements.frame, Ed11y.options.embeddedContent);
      embed.forEach((el) => {
        let dismissKey = Ed11y.dismissalKey(el.getAttribute('src'));
        Ed11y.results.push([el, 'embedCustom', Ed11y.M.embedCustom.tip(), 'beforebegin', dismissKey]);
      });
    }
  
  }
  
}