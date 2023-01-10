# Editora11y

Editoria11y (editorial [ally](https://www.a11yproject.com/)) is a user-friendly accessibility "auto-correct" checker that addresses three critical needs for content authors:

1. It runs automatically. Modern spellcheck works so well because it is always running; put spellcheck behind a button and few users remember to run it!
1. It focuses exclusively on straightforward issues a content author can easily understand and easily fix. Yes; comprehensive testing should be a key part of site creation, but if a tool is going to run automatically, it will drive an author bonkers if it is constantly alerting on code they do not understand and cannot fix.
1. It runs in context. Modern content management systems often assemble pages from many sources. Only the assembled page can be checked for things like the header outline order.

## Versions

* The 1.x branch is quite stable, and has been running in production for years.
* The 2.x branch is in alpha as of August 2022. It should be ready for production use in September.

### Major new features in 2.x
* Tips extensively rewritten; external links to Princeton content removed.
* Content editors can now hide "manual check" alerts.
* When connected to a cloud API, "manual check" alerts can be marked as OK for all users, and results can be sent to a site-wide dashboard.
* Separated the "show tags" feature into "outline" and "alt text" tabs. 
* Added theme variations and the ability to insert custom colors.
* The checker can now scan within shadow components.
* Tooltips are now overlaid on the page rather than inserted next to the element, removing various issues with marking clipped or partially hidden elements.
* Removed jQuery dependency and rewrote tests to cut run time in *half*.

Coming soon: WordPress integration.

## The authoring experience
* When an author is logged in to their site, Editoria11y places a small toggle button at the bottom right of each page with an issue count. Users can press the button to view details of any alerts or access additional tools ("full check"), including visualizers for the document outline and image alt attributes, and the panel's state persists from page to page (open or shut).
* If the page has a *new* issue, a panel automatically slides open with more details.
* If the user minimizes the panel, it will not open automatically on future page visits until the content changes.

Try a [clickable demo of what a logged-in author would see](https://itmaybejj.github.io/editoria11y/).

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
  * Tables without headers and tables with document headers ("Header 3") instead of table headers (<th>)
  * Links to PDFs and other documents, reminding the user to test the download for accessibility or provide an alternate, accessible format
  
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

To make your own implementation, simply call your copy (or a CDN version) of "editoria11y.min.js" as a script, and then define a create a new "Ed11y" instance:

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
      checkRoots : 'main, .footer-content-zone',
      // We have two custom shadow components
      shadowComponents : 'accordion-widget, lightbox-widget',
      // We want the box to open automatically for errors
      alertMode : 'assertive',
      // We wanted to pick our own colors
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
      linkIgnoreStrings: ['(opens in new window)'],
      // Content editors cannot edit these elements
      ignoreElements : 'nav *, #social-block',
      // We don't want to ignore alerts, only fix or mark OK
      allowHide : false,
      allowOK : true,
      // Don't scan while the editor toolbar is open
      doNotRun : ".editor-toolbar",
      // Send a JS event when highlighting tips in this element,
      // so our own JS can open the accordion and show it.
      hiddenHandlers : ".accordion-panel",
    });
  </script>
 ```


### Dealing with alerts on hidden or size-constrained content

Note the "hiddenHandlers" option in the example above.

Many interactive components (tabs, sliders, accordions) hide content. The Editoria11y info panel includes a link to jump directly to an issue. If Editoria11y thinks the issue's tooltip is currently invisible, it will alert the user something is wrong, and then highlight the first visible ancestor -- e.g., the div around an accordion.

You may wish to include custom JS in your theme to open various hidden panels when they contain alerts. 

When the panel first opens, it dispatches a JS event ("ed11yPanelOpened"). At this time, you may wish to run a querySelectorAll for "ed11y-element-result" elements, and open accordions or advance sliders to reveal the alert tip.

When the next/previous buttons are clicked on the panel, if it recognizes the tip is inside a container with one of the listed "hiddenHandlers" selectors you provided in your options list, it will also dispatch an "ed11yShowHidden" event, which includes the ID of the tip that it is about to open. Themes can react to this based on the element's location in the DOM: advance to the relevant carousel slide, open the relevant tab panel, etc.

I can provide code samples on request.

## Contact
Editoria11y is maintained by [John Jameson](https://www.linkedin.com/in/johnwjameson/), and is provided to the community thanks to the [Digital Accessibility](https://accessibility.princeton.edu/) initiatives at Princeton University's [Office of Web Development Services](https://wds.princeton.edu/)

## Acknowledgements
Editoria11y's JavaScript began as a fork of the [Sa11y](https://ryersondmp.github.io/sa11y/) library, which was created by Digital Media Projects, Computing and Communication Services (CCS) at Ryerson University in Toronto, Canada:
- [Adam Chaboryk](https://github.com/adamchaboryk), IT accessibility specialist
- Benjamin Luong, web accessibility assistant
- Arshad Mohammed, web accessibility assistant
- Kyle Padernilla, web accessibility assistant

Sa11y itself began as a fork of [Tota11y by Khan Academy](https://github.com/Khan/tota11y), and uses [FontAwesome icons](https://github.com/FortAwesome/Font-Awesome) and jQuery.
