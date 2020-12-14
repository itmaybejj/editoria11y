/* User preferences */

// Base container(s) for tests.
let ed11yCheckRoot = "";

// If any elements match these selectors, Ed11y will not start.
let ed11yNoRun = "";

// Ignore elements in these containers.
// Drupal: "#layout-builder, #quickedit-entity-toolbar";
let ed11yContainerIgnore = "";

// jQuery selectors to filter from default queries.
// E.g., to ignore images in a social media feed, add
// ".my-feed-container img" to imageIgnore.
let ed11yImageIgnore = "";
let ed11yHeaderIgnore = ""; // We also need to ignore the Drupal tabs.
let ed11yLinkIgnore = "";
let ed11yEmbeddedContentWarning = "";

// These tests are not enabled yet.
// let ed11yFormsIgnore = "";
// let ed11yTableIgnore = "";
// const ed11yDevEnvironment = ""