/* This is intended to make it easier to adapt Editoria11y to other platforms */

// Base container(s) for tests.
let ed11yCheckRoot = "main";

// If any elements match these selectors, Ed11y will not start.
let ed11yNoRun = "#layout-builder";

// Ignore elements in these containers.
//let ed11yContainerIgnore = ".ps-social";
let ed11yContainerIgnore = "";

// jQuery selectors to filter from default queries.
// E.g., to ignore images in a social media feed, add
// ".my-feed-container img" to imageIgnore.
let ed11yImageIgnore = "[aria-hidden] img, [aria-hidden], [role='presentation']";
let ed11yHeaderIgnore = "nav"; // We also need to ignore the Drupal tabs.
let ed11yLinkIgnore = "[aria-hidden], .ed11y-exclude";
let ed11yFullCheckIgnore = "#ed11y-container *";
let ed11yEmbeddedContent = "";
//const ed11yLinkTextIgnore = "span.sr-only"; // Ignore injected text for screen readers.
let ed11yFormsIgnore = "";
let ed11yTableIgnore = "";

// Patterns for links to development environments
const ed11yDevEnvironment = ""

// About this tool
// todo: add link when this has a homepage.
const ed11yAbout = "" +
    "<p><a href='https://itmaybejj.github.io/editoria11y/'>Editoria11y</a>" +
    " is an automated accessibility checker currently being developed by " +
    "Princeton University. Please do take a moment to " +
    "<a href='https://www.drupal.org/project/editoria11y'>request changes " +
    "or report bugs</a>.</p>" +
    "<p>And do note: automated tools can catch some common mistakes, " +
    "but cannot replace old-fashioned proofreading and accessibility " +
    "testing. Please do not assume that a clear result means " +
    "your work is done!</p>";

// Messages for outline Headers.
function ed11yMessageHeadingLevelSkipped(prevLevel, level) {
  return "<div class='ed11ytip-heading'>" +
      "Heading jumped from level " + prevLevel + " to " + level + "</div>" +
      "<p><a href='https://accessibility.princeton.edu/how/content/headings'>" +
      "Headings should form a page outline</a> for screen readers.</p> " +
      "<p>To fix: If this is related to the previous heading, make it " +
      "a <span class='ed11yMessage-bold'>Heading " + parseInt(prevLevel + 1) +
      "</span>. If it starts a new section, make it <span class='ed11yMessage-bold'>" +
      "Heading " + prevLevel + "</span>.</p>";
}
// https://www.w3.org/WAI/test-evaluate/preliminary/#headings

let ed11yMessageHeadingEmpty = "<div class='ed11ytip-heading'>Empty heading</div> " +
    "<p>Even though headings without text aren't visible, they still appear " +
    "in <a href='https://accessibility.princeton.edu/how/content/headings'>" +
    "document outlines</a>, and the vertical gaps they create between " +
    "paragraphs are often larger than the designer intended.</p>" +
    "<p>To fix: edit the page and delete this line, or change its format " +
    "from &quot;Heading&quot; to &quot;Normal&quot;.</p>";

function ed11yMessageHeadingTooLong(headingLength) {
  return "<div class='ed11ytip-heading'>Long " +
  "<span class='ed11yMessage-bold ed11yMessage-red-text'>(" + headingLength +
  " character)</span> heading</div><p>Since " +
  "<a href='https://accessibility.princeton.edu/how/content/headings'>" +
  "headings are used as a page outline</a>, they should be brief, clear, " +
  "informative and unique.</p>";
}

// Messages for links.
let ed11yMessageLinkHasNoText = "<div class='ed11ytip-heading'>Link title not " +
    "found</div> " +
    "<p>Screen readers will either read the entire url of this link, one " +
    "character at a time, or say <span class='ed11yMessage-bold'>&quot;Link: " +
    "[...awkward silence...].&quot;</span></p>" +
    "<p>To fix: delete this link if it is just stray tags wrapped around an " +
    "empty space due to a copy/paste bug, or add alt text if it is a real " +
    "link wrapped around an image or icon.</p>";

let ed11yMessageLinkTextIsURL = "<div class='ed11ytip-heading'>Link may be a " +
    "URL</div>" +
    "<p>Assistive devices expect link titles to be " +
    "<a href='https://accessibility.princeton.edu/how/content/links'>" +
    "&quot;clear and meaningful&quot;</a>, even out of context.</p>" +
    "<p>Note that spelling out a very short URL is OK if the URL itself " +
    "<em>is</em> what you are communicating, e.g., when providing an email " +
    "address.</p>"

let ed11yMessageLinkTextIsGeneric = "<div class='ed11ytip-heading'>Manual check " +
    "needed: link title may be generic</div>" +
    "<p>Many assistive devices help users jump directly from link to link," +
    "meaning their users first encounter links as a list, out of context.</p>" +
    "<p>The checker noticed some common words in this link (e.g. " +
    "&quot;click here&quot; or &quot;download&quot;).</p> " +
    "<p>To fix: make sure this link is " +
    "<a href='https://accessibility.princeton.edu/how/content/links'>unique, " +
    "clear and meaningful</a>.</p>"

// QA Tests.
function ed11yMessageQAShouldBeList(prefix) {
  return "<div class='ed11ytip-heading'>Possible list item prefix: &quot;" +
      "<span class='ed11yMessage-bold ed11yMessage-red-text'>" + prefix +
      "</span>&quot;</div>" +
      "<p><a href='https://accessibility.princeton.edu/how/content/lists'>" +
      "HTML lists structure content</a> for assistive devices. " +
      "If this paragraph is starting a list, " +
      "please use the bullet or number formatting buttons instead " +
      "of writing out plain text list-like prefixes.</p>";
}

let ed11yMessageQANewTab = "<div class='ed11ytip-heading'>Link opens in a " +
    "new window</div>" +
    "<p>Opening new tabs or windows without warning can be disorienting, " +
    "especially for users relying on assistive devices.</p> " +
    "<p>Unless certain " +
    "<a href='https://www.w3.org/TR/WCAG20-TECHS/G200.html#G200-description'>" +
    "exceptions related to context-sensitive workflows</a> apply, " +
    "it is better to let the user decide when to open new windows.</p>"

let ed11yMessageQAUppercase = "<div class='ed11ytip-heading'>Large block of " +
    "uppercase text</div>" +
    "<p>Some users find lengthy segments of capitalized content difficult to " +
    "read, and some screen readers interpret fully capitalized words as " +
    "acronyms and read them one letter at a time.</p>";

//todo: princeton only
let ed11yMessageMissingQATableHeadings = "<div class='ed11ytip-heading'>Error: " +
    "table has no headers</div> " +
    "<p>Screen reader users rely on " +
    "<a href='https://accessibility.princeton.edu/how/content/tables'>table " +
    "headers</a> to label cells, so they can explore the table without " +
    "having to count rows and columns.</p> " +
    "<p>Note that tables should be used for tabular data only, as they cannot " +
    "reflow for small screens. If this " +
    "<a href='https://accessibility.princeton.edu/how/content/layout-tables'>" +
    "table is only for visual layout</a>, use an accessible " +
    "<a href='https://sitebuilder.princeton.edu/layout-themes/layouts-landing-pages'>" +
    "multi-column layout</a> to achieve the same affect.</p>"

let ed11yMessageQAHeaderInTable = "<div class='ed11ytip-heading'>Error: heading " +
    "formatting inside table cells</div> " +
    "<p>Label table rows and columns using table headers. Formatting text as " +
    "semantic headings (Heading 2, Heading 3) creates a page outline for " +
    "assistive devices, and users of those devices are not expecting to land " +
    "inside a table when jumping to a heading. </p>"

let ed11yMessageEmptyTableHeader = "<div class='ed11ytip-heading'>Error: Empty " +
    "table header</div>" +
    "<p>Screen reader users rely on " +
    "<a href='https://accessibility.princeton.edu/how/content/tables'>table " +
    "headers</a> to label cells, so they can explore the table without " +
    "having to count rows and columns.</p>";

// Fullcheck tests.
let ed11yMessageFullCheckPDF = "<div class='ed11ytip-heading'>Warning</div> PDF " +
    "files are considered web content and must be made accessible as well. If " +
    "this file is a form, consider using Google Forms as an accessible " +
    "alternative. If this PDF file is a document, consider converting it into" +
    " a web page instead. Otherwise, please <span class='ed11y-bold'>check " +
    "file for accessibility in Acrobat DC.</span>"

let ed11yMessageFullCheckBlockquote = "<div class='ed11ytip-heading'>Error</div> " +
    "Blockquotes should be used for quotes only. They should never be used as " +
    "headings. Please replace with a semantic heading (e.g. Heading 2 or Heading 3)."

let ed11yMessageFullCheckCaptions = "Please check to make sure " +
    "<span class='ed11y-bold'>all videos provide closed captioning.</span> " +
    "Providing captions for all audio and video content is a mandatory Level A " +
    "requirement. Captions are meant to support people who are D/deaf or " +
    "hard-of-hearing."

// Alt text.
// https://www.w3.org/WAI/test-evaluate/preliminary/#images

// Input.
// https://www.w3.org/WAI/test-evaluate/preliminary/#forms