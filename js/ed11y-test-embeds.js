class Ed11yTestEmbeds {
    'use strict';
  
    check = function () {

      // Check frames, audio and video
      let video = Ed11y.srcMatchesOptions(Ed11y.allFrames, Ed11y.options.videoContent);
      video = video.concat(Ed11y.allVideo);
      if (video.length > 0) {
        video.forEach(el => {
          // Dismiss-able alert. False positive accepted on undefined sources.
          let dismissKey = Ed11y.dismissalKey(el.hasAttribute('src') ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
          Ed11y.results.push([el, "embedVideo", Ed11y.M.embedVideo.tip(), 'beforebegin', dismissKey]);
        })
      }
  
      let audio = Ed11y.srcMatchesOptions(Ed11y.allFrames, Ed11y.options.audioContent);
      audio = audio.concat(Ed11y.allAudio);
      if (audio.length > 0) {
        audio.forEach(el => {
          // Dismiss-able alert. False positive accepted on undefined sources.
          let dismissKey = Ed11y.dismissalKey(el.hasAttribute('src') ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
          Ed11y.results.push([el, "embedAudio", Ed11y.M.embedAudio.tip(), 'beforebegin', dismissKey]);
        })
      }
  
      let visualizations = Ed11y.srcMatchesOptions(Ed11y.allFrames, Ed11y.options.dataVizContent);
      if (visualizations.length > 0) {
        visualizations.forEach(el => {
          // Dismiss-able alert. False positive accepted on undefined sources.
          let dismissKey = Ed11y.dismissalKey(el.getAttribute('src'));
          Ed11y.results.push([el, "embedVisualization", Ed11y.M.embedVisualization.tip(), 'beforebegin', dismissKey]);
        })
      }
  
      // Warning: Twitter keyboard trap
      let twits = Ed11y.srcMatchesOptions(Ed11y.allFrames, Ed11y.options.twitterContent);
      if (twits.length > 0) {
        twits.forEach(twit => {
          let numberOfTweets = twit.querySelectorAll(".timeline-TweetList-tweet");
          if (!!numberOfTweets && numberOfTweets > 3) {
            Ed11y.results.push([el, "embedTwitter", Ed11y.M.embedTwitter.tip(), 'beforebegin', dismissKey]);
          }
        })
      }

      if (Ed11y.options.embeddedContent.length > 1) {
        let embed = Ed11y.srcMatchesOptions(Ed11y.allFrames, Ed11y.options.embeddedContent);
        embed.forEach((el) => {
            Ed11y.results.push([el, "embedCustom", Ed11y.M.embedCustom.tip(), 'beforebegin', dismissKey]);
        });
      }
  
    };
  
  }