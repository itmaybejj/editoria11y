/* User preferences */

// Base container(s) for tests.
let ed11yCheckRoot = "";

// Alert modes.
// "polite" never automatically pops open the panel.
// "assertive" pops open the panel if there are errors the user has not seen.
// CMS integrations can pick mode on load based on context.
let ed11yAlertMode = "polite";

// If any elements match these selectors, Ed11y will not start.
let ed11yNoRun = "";

// Ignore elements in these containers.
// Nav and toolbar can move into link and header ignore to help performance.
let ed11yContainerIgnore = "";

// Flag these elements with a warning in Full Check.
let ed11yEmbeddedContentWarning = "";

// Headers to ignore in the page outline.
let ed11yOutlineIgnore = "";

// Additional selectors to ignore in specific tests.
// E.g., to just ignore images in a social media feed, add
// ".my-feed-container img" to imageIgnore.
let ed11yImageIgnore = "";
let ed11yHeaderIgnore = "";
let ed11yLinkIgnore = "";

// Programmatically generated strings to remove from link text before testing.
// Provide pipe-separated strings: opens in new window|opens in new tab.
// e.g.: let ed11yIgnoreLinkStrings = /\(link is external\)|\(link sends email\)/g;
let ed11yIgnoreLinkStrings = "";

let ed11yAllowOverflow = "";

let ed11yHiddenHandlers = "";

let ed11yDownloadLinks = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', 'https://docs.google'];

// Outline is ignoring hidden containers.
// These tests are not enabled yet.
// let ed11yFormsIgnore = "";
// let ed11yTableIgnore = "";
// Patterns for links to development environments
// const ed11yDevEnvironment = ""