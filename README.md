*This project is in development; I do not recommend using it in production until January 2021*

Editoria11y (editorial [ally](https://www.a11yproject.com/)) is a user-friendly accessibility checker that addresses three critical needs for content authors:

1. It runs automatically. Modern spellcheck works so well because it is always running; put spellcheck behind a button and few users remember to run it!
1. It focuses exclusively on straightforward issues a content author can easily understand and easily fix. Yes; comprehensive testing should be a key part of site creation, but if a tool is going to run automatically, it will drive an author bonkers if it is constantly alerting on code they do not understand and cannot fix.
1. It runs in context. Views, Layout Builder, Paragraphs and all the other modules Drupal uses to assemble a page means that tools that run inside CKEditor cannot "see" many of the issues on a typical page.

## The authoring experience
* On each page load, Editoria11y places a small toggle button at the bottom right of the screen with an issue count. Users can press the button to view details of any alerts or access additional tools ("full check"), including visualizers for the document outline and image alt attributes, and the panel's state persists from page to page (open or shut).
* If issues are found, a panel slides open with more details. If users minimize the panel, it will only open on future pages if the issues are high priority.
* If the user minimizes the panel, it will not open automatically on future page visits until the content changes.

If you are on the demo site, you will see these example issues highlighted:

• A fake list using bullet symbols instead of list elements.

• link with only the text "[click here](https://www.youtube.com/watch?v=DLzxrzFCyOs)."

### Issues flagged in the quick check
* Headings
  * Skipped heading levels
  * Empty headings
  * Very long headings
* Image alt text
  * Images with no alt text (pending: a configuration option to allow empty alts on decorative images)
  * Images with a filename as alt text
  * Images with very long alt text
  * Alt text that contains redundant text like "image of" or "photo of"
  * Linked images without alt text when the link has no text (meaning the link has no accessible text)
  * Linked images with alt text when the link also has text (warning the author that the text of a link should be about the link, and not have lots of extra detail)
* Links
  * Links with no text
  * Links with a filename as their accessible text
  * Links with only generic text: "click here," "learn more," "download," etc.
* Structure
  * Fake lists
  * More than three words of CAPS LOCK TEXT in a row
  * Tables without headers
  * Tables with document headers (&lt;h2&gt;) instead of table headers (&lt;th&gt;)
  
### Items noted in the full check
Clicking the full check button flips open an expanded panel where the user can see the document outline (headers) and all image alt text.

It also flags some additional items that need manual checks and may be OK as is:

* The first link to a PDF on a page, reminding the user to provide an accessible PDF or an alternate format
* Suspiciously short blockquotes that might be fake headings
* Embedded videos, reminding the user to add closed captions
* Embedded audio, reminding the user to provide a transcript (pending)
* Certain complex embedded content (e.g., social media and data visualization) that often present accessibility problems
* A custom warning -- same as above, but checking against selectors you provide in the "ed11yCustomEmbeddedContent" variable.

## Installation and configuration

If possible, start with a turnkey implementation:
* [Editoria11y Drupal Module](https://www.drupal.org/project/editoria11y)
* Editoria11y WordPress Plugin (coming soon) 

To install manually:
* Add JS (in this order please...)
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

Remember to only call the script for logged-in editors!

I don't recommend editing the Editoria11y-prefs file yet; a lot is still changing in there. Stick to declaring your own custom overrides of the following variables in your own JS file. For example, this page uses the following:

```
  let ed11yCustomCheckRoot = 'body';
  let ed11yCustomContainerIgnore = '.project-tagline';
```

### Root elements to scan (default is `main`)
`let ed11yCustomCheckRoot = ";`

e.g., "main, #footer"

### Elements to ignore on scan

`let ed11yCustomContainerIgnore = "";`

### Pages not to scan

`let ed11yCustomNoRun = "";`

e.g., "#an-inline-editing-tool, .a-page-not-to-scan"

Editoria11y will not run if it sees any elements on this list.

### Elements to flag in full view as needing a manual check

`let ed11yCustomEmbeddedContent = "";`

## Spring 2021 todo list

### Public Beta (January-February)
- fail gracefully if checkroot is not found
- tip-under alignment under inline tooltips
- check ignore logic in headings
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

<div hidden>
<script>
  let ed11yCustomCheckRoot = 'body';
  let ed11yCustomContainerIgnore = '.project-tagline';
</script>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script><link rel="stylesheet" media="screen" href="{{ site.baseurl}}/css/editoria11y.css"><script src="{{ site.baseurl}}/js/editoria11y-prefs.js"></script><script src="{{ site.baseurl}}/js/editoria11y.js"></script></div>