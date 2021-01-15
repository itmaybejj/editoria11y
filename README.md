Editoria11y (editorial [ally](https://www.a11yproject.com/)) is a user-friendly accessibility checker that addresses three critical needs for content authors:

1. It runs automatically. Modern spellcheck works so well because it is always running; put spellcheck behind a button and few users remember to run it!
1. It focuses exclusively on straightforward issues a content author can easily understand and easily fix. Yes; comprehensive testing should be a key part of site creation, but if a tool is going to run automatically, it will drive an author bonkers if it is constantly alerting on code they do not understand and cannot fix.
1. It runs in context. Modern content management systems often assemble pages from many sources. Only the assembled page can be checked for things like the header outline order.

## The authoring experience
* On each page load, Editoria11y places a small toggle button at the bottom right of the screen with an issue count. Users can press the button to view details of any alerts or access additional tools ("full check"), including visualizers for the document outline and image alt attributes, and the panel's state persists from page to page (open or shut).
* If issues are found, a panel slides open with more details. If users minimize the panel, it will only open on future pages if the issues are high priority.
* If the user minimizes the panel, it will not open automatically on future page visits until the content changes.

If you are reading this ReadMe on the [demo site](https://itmaybejj.github.io/editoria11y/), the following items will have triggered an alert:

• A fake list using bullet symbols instead of list elements.

• link with only the text "[click here](https://www.youtube.com/watch?v=DLzxrzFCyOs)."

Try clicking the toggle in the lower righthand corner of the page. Tooltips will appear near these items with explanations of the issue and suggestions for improving the content.

### Issues flagged in the quick check
* Headings
  * Skipped heading levels
  * Empty headings
  * Very long headings
* Text alternatives
  * Images without an alt element
  * Images with an empty alt element (flagged for manual review)
  * Images with a filename as alt text
  * Images with very long alt text
  * Alt text that contains redundant text like "image of" or "photo of"
  * Images in links with alt text that appears to be describing the image instead of the link destination
  * Embedded visualizations that usually require a text alternative
* Meaningful links
  * Links with no text
  * Links titled with a filename 
  * Links only titled with only generic text: “click here,” “learn more,” “download,” etc.
  * Links that open in a new window without an external link icon
* Lists made from asterisks, numbers and letters rather than list elements
* LARGE QUANTITIES OF CAPS LOCK TEXT
* Tables without headers and tables with document headers ("Header 3") instead of table headers (<th>)
  
### Items noted in the full check
Clicking the full check button flips open an expanded panel where the user can see the document outline (headers) and all image alt text.

It also flags some additional items:

* The first link to a PDF on a page, reminding the user to provide an accessible PDF or an alternate format
* Suspiciously short blockquotes that may not be block quotes.
* Embedded videos, reminding the user to add closed captions
* Embedded audio, reminding the user to provide a transcript
* Embedded social media, reminding the user to check their social media content as well
* A custom warning -- same as above, but checking against selectors you provide in the "ed11yCustomEmbeddedContent" variable.

## Installation and configuration

If possible, start with a turnkey implementation:
* [Editoria11y Drupal Module](https://www.drupal.org/project/editoria11y)
* Editoria11y WordPress Plugin (coming soon) 

To install manually:
* Add JS (in this order...)
  * jQuery
  * editoria11y-prefs.js
  * editoria11y.js
* Add CSS
  * editoria11y.css

Should look something like this:

```
<script src="https://code.jquery.com/jquery-3.5.1.min.js">
<link rel="stylesheet" media="screen" href="/css/editoria11y.css">
<script src="/js/editoria11y-prefs.js">
<script src="/js/editoria11y.js">
```

And remember to only call the script for logged-in editors!

Editoria11y's default configuration should work fine on both sites. Do explore the preferences file, though; there are several tweaks to make it play nice with most themes. The most important ones:

* "ed11yCheckRoot." By default Editorially scans the entire page, since themes name their content wrapper various things. If all your content is in, say, `main` or `#content`, provide that selector so site editors don't see alerts for things they can't fix. 
* Some content just does not play nice with this type of tool; embedded social media feeds, for example, or custom "known-good" code with custom aria roles and labels. Add these to the "ed11yContainerIgnore" list. 
* Editorially can be set to disable itself if it detects certain selectors. If have inline editing tools where you don't want tooltips inserted, or certain pages where the tool should not appear, add relevent selectors to the "ed11yNoRun" list.

### Dealing with alerts on hidden or size-constrained content

Many interactive components (tabs, sliders, accordions) hide content. The Editoria11y info panel includes a link to jump directly to an alert. If a user can't see an alert on the page, they can click this link, and it will highlight the container for any hidden alerts -- e.g., the box around the slideshow.m

There are also two helper variables for site administrators:
* If the hidden content should be ignored, add relevant selectors to the "ignore this" lists. E.g., it is not uncommon to have two links, with one hidden from screen readers, so you may want to add something like `a[aria-hidden='true']` to the ed11yLinkIgnore or ed11yContainerIgnore lists.
* If tooltips are getting cut off because a wrapper is set to `visibility:hidden`, add the wrapper's selector to the `ed11yAllowOverflow` list, and Editoria11y will (temporarily) force the container to allow overflow while the tip is open.

## Roadmap

### Beta (January '21)
- MVP features are now complete and all known bugs have been addressed; Drupal 8 module is live.

### 1.0 (February '21)
- Implement any fixes from Beta feedback.

### 1.1 (Spring/Summer '21)
- Drupal 7 Backport
- WordPress port
- Evaluate possible additional tests
  - Flag links to dev and QA environments
  - Form field labels
  - Undeclared language detection based on certain words and characters?
  - Contrast tests?
- Drupal 8 configuration page enhancements
  - Add a variable to control which items are included in the page outline
  - Evaluate adopting content-type config code from Asset Injector
  - Evaluate adding a separate permission to administer Editoria11y
- Optimization and code style improvements

## Contact
Editoria11y is maintained by [John Jameson](jjameson@princeton.edu), and is provided to the community thanks to the [Digital Accessibility](https://accessibility.princeton.edu/) initiatives at Princeton University's [Office of Web Development Services](https://wds.princeton.edu/)

## Acknowledgements
Editoria11y's JavaScript is a fork of the [Sa11y](https://ryersondmp.github.io/sa11y/) library, which was created by Digital Media Projects, Computing and Communication Services (CCS) at Ryerson University in Toronto, Canada:
- [Adam Chaboryk](https://github.com/adamchaboryk), IT accessibility specialist
- Benjamin Luong, web accessibility assistant
- Arshad Mohammed, web accessibility assistant
- Kyle Padernilla, web accessibility assistant

### Key changes in the fork: 
- Tests auto-run on load. This increases its effectiveness as an ambient quality assurance tool, but requires being very choosy about which tests to run, and dropping IE11 support to allow for parallelizing the tests.
- Additional states have been added to the main panel. Rather than open/shut it now has:
  - Shut
  - Shut with notifications for number of detected errors
  - Open
  - Open but minimized (tooltips available but the info panel is hidden) 
- In addition to saving the user's open/shut preference, Editoria11y remembers the number of issues on each page, and overrides their preference if the number has changed since last visit.
- Additional manual tests available in the panel ("full check").
- Selectors and messages have been abstracted into variables to enable creating CMS-native configuration pages.

Sa11y itself is an adaptation of [Tota11y by Khan Academy.](https://github.com/Khan/tota11y), built with [FontAwesome icons](https://github.com/FortAwesome/Font-Awesome) and powered with jQuery.

<div hidden><script src="https://code.jquery.com/jquery-3.5.1.min.js"></script><link rel="stylesheet" media="screen" href="{{ site.baseurl}}/css/editoria11y.css"><script src="{{ site.baseurl}}/demo/editoria11y-prefs.js"></script><script src="{{ site.baseurl}}/js/editoria11y.js"></script></div>