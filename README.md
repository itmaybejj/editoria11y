# Editora11y

Editoria11y (editorial [ally](https://www.a11yproject.com/)) is a user-friendly accessibility "auto-correct" checker that addresses three critical needs for content authors:

1. It runs automatically. Modern spellcheck works so well because it is always running; put spellcheck behind a button and few users remember to run it!
1. It focuses exclusively on straightforward issues a content author can easily understand and easily fix. Yes; comprehensive testing should be a key part of site creation, but if a tool is going to run automatically on every page, it will do more harm than good if it is alerting on issues editors cannot fix.
1. It runs in context. Modern content management systems often assemble pages from many separately-edited blocks, widgets and elements. Only a fully-assembled "page" can be checked for things like the header outline order.

Try a [clickable demo of what a logged-in author would see](https://itmaybejj.github.io/editoria11y/demo).

## The authoring experience
* When an author is logged in to their site, Editoria11y places a small toggle button at the bottom right of each page with an issue count. Users can press the button to view details of any alerts or access additional tools ("full check"), including visualizers for the document outline and image alt attributes, and the panel's state persists from page to page (open or shut).
* If the page has a *new* issue, a panel automatically slides open with more details.
* If the user minimizes the panel, it will not open automatically on future page visits until the content changes.

### Issues flagged in the quick check
* Headings
  * Skipped heading levels
  * Empty headings
  * Very long headings
  * Suspiciously short blockquotes that may actually be headings
  * All-bold paragraphs with no punctuation that may actually be headings
* Text alternatives
  * Images without an alt element
  * Images with an empty alt element (flagged for manual review)
  * Images with a filename as alt text
  * Images with very long alt text
  * Alt text that contains redundant text like "image of" or "photo of"
  * Video embeds, reminding the user to add closed captions
  * Audio embeds, reminding the user to provide a transcript
  * Social media embeds, reminding the user to provide alt elements
  * Embedded visualizations that usually require a text alternative
* Meaningful links
  * Links with no text
  * Links titled with a filename 
  * Links only titled with only generic text: “click here,” “learn more,” “download,” etc.
  * Links that open in a new window without an external link icon
  * Images in links with alt text that appears to be describing the image instead of the link destination
* General content quality assurance
  * Lists made from asterisks, numbers and letters rather than list elements
  * AVOID LOTS OF CAPS LOCK TEXT
  * Tables without headers
  * Tables with empty header cells
  * Tables with document headers ("Header 3") instead of table headers 
  * Links to PDFs and other documents, reminding the user to test the download for accessibility or provide an alternate, accessible format
  * Suspiciously short blockquotes that may not be block quotes.
  * Embedded videos, reminding the user to add closed captions
  * Embedded audio, reminding the user to provide a transcript
  * Embedded social media, reminding the user to check their social media content as well

### Recent changes
Major changes in version 2.x:
* Content editors can now hide (and restore) "manual check" alerts.
* When connected to a cloud API, "manual check" alerts can be marked as OK for all users, and results can be sent to a site-wide dashboard.
* Additional theme variations and the ability to insert custom colors.
* Tips extensively rewritten; external links to Princeton content removed.
* The checker can now scan within shadow components.
* Removing the jQuery dependency and rewriting tests doubled performance.

[View full change log](https://github.com/itmaybejj/editoria11y/releases).

## Installation and configuration

If possible, use a turnkey integration:
* [Editoria11y Drupal Module](https://www.drupal.org/project/editoria11y)
* [Editoria11y WordPress Plugin](https://github.com/itmaybejj/editoria11y-wp) (will be submitted to WordPress plugin library in early 2023)
* [Editoria11y SquareSpace Injector](https://github.com/itmaybejj/editoria11y-squarespace-inject) (Requires Commerce or Business tier)

To build your own implementation, load a local copy (or a [CDN version](https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@2/dist/editoria11y.min.js)) of "editoria11y.min.js," and then create a new "Ed11y" instance:

```html
  <script src="/PATH/TO/YOUR/COPY/editoria11y.min.js"></script>
  <script>
    const ed11y = new Ed11y({
      // options,
    });           
  </script>
 ```

A complete implementation will only be called for logged-in editors (you don't want your site visitors seeing your checker!) and will have set various custom options. It might look more like this:

```html
  <script src="/PATH/TO/YOUR/COPY/editoria11y.min.js"></script>
  <script>
    const ed11y = new Ed11y({
      // We have two content regions
      checkRoots: 'main, .footer-content-zone',
      
      // We have two custom shadow components
      shadowComponents: 'accordion-widget, lightbox-widget',
      
      // We want the box to open automatically for errors:
      alertMode: 'assertive',
      
      // We wanted to pick our own colors:
      theme : 'darkTheme',
      darkTheme: {
          bg: '#0a2051',
          bgHighlight: '#7b1919',
          text: '#f4f7ff',
          primary: '#4930a0',
          primaryText: '#f4f7ff',
          secondary: '#20160c',
          warning: '#fad859',
          alert: '#b80519',
          button: '#dde8ff',
          focusRing: 'cyan',
          activeTab: '#0a2051',
          tipHeader: '#4930a0',
      },
      
      // We have an external link icon with visually hidden text
      // to delete before checking if the link has text:
      linkIgnoreStrings: ['(opens in new window)'],
      
      // Content editors cannot edit these elements:
      ignoreElements: 'nav *, #social-block',
      
      // We don't want to ignore alerts, only fix or mark OK:
      allowHide: false,
      allowOK: true,
      
      // Don't scan while the editor toolbar is open:
      doNotRun : ".editor-toolbar",

      // If a tooltip is being drawn on an element 
      // that might be invisible, warn the user first:
      checkVisible: true,
      
      // Send a JS event when highlighting tips in this element,
      // so our own JS can open the accordion and show it:
      hiddenHandlers: ".accordion-panel",
    });
  </script>
 ```

 Turnkey integrations often set these variables on the fly -- e.g., loading pages in "assertive" mode when they were recently edited, and switching back to "polite" after several minutes.


### Dealing with alerts on hidden or size-constrained content

Note the `hiddenHandlers` and `checkVisible` options in the example above.

Many interactive components (tabs, sliders, accordions) hide content. The Editoria11y info panel includes next/previous buttons to jump directly to issues. If Editoria11y thinks the issue's tooltip is currently invisible, it will alert the user something is wrong, and then highlight the first visible ancestor -- e.g., the div around an accordion.

If this is incorrect (e.g., your #content container has a height of 0px), you can disable this check by setting `checkVisible` to false.

If it is correct, you may wish to include custom JS in your theme to make those elements visible first.

To do this when the panel first opens (e.g., unfolding accordions) add a JS event listener for `ed11yPanelOpened`, then do a querySelectorAll for relevant `ed11y-element-result` elements.

To do this when jumping to a specific tip (e.g., in a closed tab or the "wrong" carousel slide), listen for the `ed11yShowHidden` event. This is thrown if Editoria11y recognizes a tip is inside a container with one of the listed `hiddenHandlers` selectors provided in the options list. This JS event will include the ID of the tip that it is about to open. Editoria11y will pause briefly after this event, to give your JS time to make the element visible before the tip tries to open.

I can provide code samples on request.

## Contact
Editoria11y is maintained by [John Jameson](https://www.linkedin.com/in/johnwjameson/), and is provided to the community thanks to the [Digital Accessibility](https://accessibility.princeton.edu/) initiatives at Princeton University's [Office of Web Development Services](https://wds.princeton.edu/)

## Acknowledgements
Editoria11y's JavaScript began as a fork of the [Sa11y](https://ryersondmp.github.io/sa11y/) library, which was created by Digital Media Projects, Computing and Communication Services (CCS) at Toronto Metropolitan University. The libraries share most tests, and our teams work together on new features.

Sa11y itself began as a fork of [Tota11y by Khan Academy](https://github.com/Khan/tota11y).

<div hidden><style>.wrapper {margin: auto;min-height: 100vh;}a {font-weight: 500;}a.github {display: inline-block;height: auto;padding: 12px 2px 12px 32px;}header li {width: 11rem;height: auto;}body {font-size: 16px;}header {width: auto;max-width: 192px;}@media print, screen and (max-width: 960px) {header ul {  position: relative;}header {  width: 90vw;  padding-right: 0;}div.wrapper {  width: 100%;}}</div>
