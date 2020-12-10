# Editoria11y
Editoria11y (editorial accessibility) is a user-friendly accessibility checker that addresses three critical needs for content authors:

1. It runs automatically. Modern spellcheck works so well because it is always running; put spellcheck behind a button and few users remember to run it!
1. It focuses exclusively on straightforward issues a content author can easily understand and easily fix. Comprehensive testing should be a key part of site creation, but if a tool is going to run automatically, it will drive an author bonkers if it is constantly alerting on code they do not understand and cannot fix.
1. It runs in context. Views, Layout Builder, Paragraphs and all the other modules Drupal uses to assemble a page means that tools that run inside CKEditor cannot "see" many of the issues on a typical page.

## The authoring experience
* On each page load Editoria11y places a small toggle button at the bottom right of the screen with an issue count. Users can press the button to view details of any alerts or access additional tools ("full check"), including visualizers for the document outline and image alt attributes, and the panel's state persists from page to page (open or shut).
* If the issues are considered "major," the panel opens automatically.
* If the user minimizes the panel, it will not open automatically on future page visits until the content changes.

## Installation and configuration
* Add JS (in this order please...)
  * jQuery
  * editoria11y-prefs.js
  * editoria11y.js
* Add CSS
  * editoria11y.css

Should look like this:

```
<script src="https://code.jquery.com/jquery-3.5.1.min.js">
<link rel="stylesheet" media="screen" href="/css/editoria11y.css">
<script src="/js/editoria11y-prefs.js">
<script src="/js/editoria11y.js">
```

/core/modules/contextual/js/toolbar/views/VisualView.js?v=8.9.1"></script>

You can directly edit editoria11y-prefs to change various selectors and strings, though I cannot promise things won't change in there until there is a full release.

Otherwise, create your own JS file with these variables to inject some ready-to-go overrides:

#### Root elements to scan (default is `main`)
`let ed11yCustomCheckRoot = ";`

e.g., "main, #footer"

#### Pages not to scan
Editoria11y will not run if it sees any elements on this list:

let ed11yCustomNoRun = "";

e.g., "#an-inline-editing-tool, .a-page-not-to-scan"

#### Elements to ignore on scan
let ed11yCustomContainerIgnore = "";

#### Elements to flag in full view as needing a manual check
let ed11yCustomEmbeddedContent = "";

## Todo

### Alpha
- check line 183 for ignore logic: let $headings = this.checkRoot.find("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]").not(ed11yHeaderIgnore + ed11yContainerIgnore);

### Public Beta (January-February)
- Create JS event hooks for Scan, Jump and Tooltip, and move Princeton-specific code to PS_Core
- Add detection to prevent conflict with other common inline editors
- Evaluate 0-length alt logic
- JS security questions with emitting selectors as variables -- how to sanitize?
- Adopt content-type config code from Asset Injector
- Browser testing on older browsers.
- Evaluate Fullcheck tests (Tableau, data visualization)
- Evaluate the Forms tests
- Clean up panel logic; don't need multiple panels if the text mutates and the SVGs are in the CSS.
- Princeton only: deal with the back-to-top button sitting "under" the Sally button. What to do? Offset the button? Hide the back-to-top button for logged in users?

### Release (Spring)
- Create platform documentation and point warnings to it
- Drupal code style conformance
- Improve visual styling, especially floaty tooltip close and tooltip heading
- Dev environment link checking (optional)
- Implement local language detection (optional)
- move the rest of the errors into the paints function

### Post-release (Summer)
- Clean up variables to allow for overrides (if still needed post-config)
- D7 Port
- Make tips draggable?

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

<link rel="stylesheet" media="screen" href="/css/editoria11y.css | relative_url">
<script src="/js/editoria11y-prefs.js | relative_url"></script>
<script src="/js/editoria11y.js | relative_url"></script>
