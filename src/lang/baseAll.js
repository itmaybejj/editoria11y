export const interfaceStrings = {
  OUTLINE: 'Headings',
  IMAGES: 'Alt text',

  SKIP_TO_ISSUE: 'Go to issue',
  buttonFirstContent: 'Go to first alert',
  MAIN_TOGGLE_LABEL: 'Toggle accessibility tools',
  main_toggle_show_alerts: 'Show accessibility alerts',
  main_toggle_show: 'Show accessibility tools',
  main_toggle_hide_alerts: 'Hide accessibility alerts',
  main_toggle_hide: 'Hide accessibility tools',
  toggleDisabled: 'No content available for Editoria11y to check.',
  PANEL_HEADING: 'Show visualizers',
  buttonToolsActive: 'Hide visualizers',
  PANEL_DISMISS_BUTTON: `Show %(dismissCount) hidden alerts`,
  buttonShowHiddenAlert: 'Show hidden alert',
  buttonHideHiddenAlert: 'Hide hidden alert',
  buttonHideHiddenAlerts: `Hide %(count) hidden alerts`,
  dismissalsHeader: 'Not going to fix this?',

  NO_IMAGES: 'No images found.',
  ALT: 'Alt Text: ',
  MISSING: '(missing!)',
  panelCheckOutline:
    'This shows the heading outline. Check that it matches how the content is organized visually.',
  panelCheckAltText:
    'Check that each image describes what it means in context, and that there are no images of text.',
  DECORATIVE: 'Marked decorative',

  NOT_VISIBLE: 'Note: this content may not be visible. Look for it inside the outlined container.',

  WARNING: 'manual check needed',
  transferFocus: 'Edit this content',
  dismissOkButtonContent: 'Mark OK',
  DISMISS: 'Ignore',
  dismissActions: `Similar alerts`,
  DISMISS_ALL: 'On this page: ignore',
  dismissOkAllButton: 'On this page: mark OK',
  dismissOnSite: 'On all pages: mark OK',
  dismissOkTitle: 'Hides alert for all editors',
  dismissHideTitle: 'Only hides alert for you',
  unDismissOKButton: 'Restore this alert marked as OK',
  unDismissHideButton: 'Restore this ignored alert',
  unDismissNotePermissions: 'This check has been hidden by an administrator',
  reportsLink: 'Open site reports',
  ALERT_CLOSE: 'Close',
  issueContent: 'Content issue',
  issueDeveloper: 'Developer issue',
  issueTemplate: 'Template issue',

/*  EMBED_CUSTOM: `<div class="title" tabindex="-1">Is this embedded content accessible?</div>
		<p>This checker cannot test inside embedded content. Manually check that images inside this embed have alt text, videos have captions, and interactive components can be <a href='https://webaim.org/techniques/keyboard/'>operated by a keyboard</a>.</p>`,*/

	CONTRAST_WARNING:
		'A background image or gradient means this checker is not sure what color is behind this text. Use the color picker below to check manually.',

	LINK_IDENTICAL_NAME:
		`<p><strong {B}>Link text</strong> <strong {C}>%(TEXT)</strong></p>
		<p>Multiple links on this page have the same name. Links should uniquely describe their destination, even when read out of context. Consider ways to reword this link.</p>
		<p>Duplicate links expect the reader be reading slowly and carefully enough to figure out each link's purpose from context. Few readers do this, so they often miss important links.</p>
                <ul>
                <li>Ideal: "Learn about <a href="https://webaim.org/techniques/hypertext/link_text">meaningful links"</a></strong></li>
                <li>Not unique: "Click <a href="https://webaim.org/techniques/hypertext/link_text">here</a> to learn about meaningful links."</li>
                <li>Not concise: "<a href="https://webaim.org/techniques/hypertext/link_text">Click here to learn more about meaningful links</a>"</li>
                </ul>
		`,
	EMBED_GENERAL:
		'Automated checkers cannot test content inside embeds. Make sure someone has checked that all images inside this embed have alt text, videos have captions, text has sufficient contrast, and links and buttons are <a href="https://webaim.org/techniques/keyboard/">keyboard accessible.</a>',
};

export const testNames = {
  ALT_FILE_EXT: 'This alt text is a URL, not a description',
  ALT_MAYBE_BAD: 'Is this alt text meaningless?',
  ALT_PLACEHOLDER: 'This alt text is meaningless placeholder text',
  ALT_UNPRONOUNCEABLE: 'This alt text is unpronounceable',
  EMBED_AUDIO: 'Does this audio have a transcript?',
  // EMBED_CUSTOM: 'Is this embedded content accessible?',
  EMBED_DATA_VIZ: 'Is this visualization accessible?',
  EMBED_VIDEO: 'Is this video accurately captioned?',
  HEADING_EMPTY: 'Add text to this heading, or remove it',
  HEADING_LONG: 'Can this heading be shorter?',
  HEADING_SKIPPED_LEVEL: 'This heading is tagged with the wrong level',
  IMAGE_ALT_TOO_LONG: 'Can this alt text be shorter?',
  IMAGE_DECORATIVE: 'Is this image meaningless?',
  LINK_ALT_FILE_EXT: 'Alt text used as a link should not be a URL',
  LINK_ALT_MAYBE_BAD: 'Does this alt text describe the link destination?',
  LINK_EMPTY_NO_LABEL: 'This link needs a label',
  LINK_EMPTY: 'This link needs text',
  LINK_IMAGE_ALT_AND_TEXT: 'Does this alt text make sense as part of this link?',
  LINK_IMAGE_LONG_ALT: 'Can this linked alt text be shorter?',
  LINK_IMAGE_NO_ALT_TEXT: 'This linked image needs alt text',
  LINK_NEW_TAB: 'Does this link open a new window without warning?',
  LINK_PLACEHOLDER_ALT: 'This linked image needs meaningful alt text',
  LINK_STOPWORD: 'Does this link describe its destination?',
  LINK_SUS_ALT: 'Is there redundant text in this linked image?',
  LINK_URL: 'Link text should not be a URL',
  MISSING_ALT_LINK_HAS_TEXT: 'Invalid HTML: image in link missing alt attribute',
  MISSING_ALT_LINK: 'Invalid HTML: linked image missing alt attribute',
  MISSING_ALT: 'Invalid HTML: missing alt text attribute',
  QA_BLOCKQUOTE: 'Is this a quote or a heading?',
  QA_FAKE_HEADING: 'Should this be a heading?',
  QA_FAKE_LIST: 'Should this have list formatting?',
  QA_PDF: 'Is the linked document accessible?',
  QA_UPPERCASE: 'Is this uppercase text needed?',
  SUS_ALT: 'Are there redundant words in this alt text?',
  TABLES_EMPTY_HEADING: 'This header cell needs text',
  TABLES_MISSING_HEADINGS: 'This table needs a header row and/or column',
  TABLES_SEMANTIC_HEADING: 'Content headings should not be used inside tables',

  HEADING_EMPTY_WITH_IMAGE: 'An image used as a heading must have alt text',
  HEADING_FIRST: 'The first heading on a page should usually be a Heading 1 or Heading 2',
  HEADING_MISSING_ONE: 'This page is missing a Heading 1',
  IMAGE_DECORATIVE_CAROUSEL: 'Image in a carousel or gallery marked as decorative',
  LINK_IMAGE_TEXT: 'Manual check: Image inside a link marked as decorative.',
  IMAGE_FIGURE_DECORATIVE: 'Manual check: image in a figure marked as decorative',
  LINK_IMAGE_ALT: 'Manual check: linked image with alt text',
  IMAGE_FIGURE_DUPLICATE_ALT: 'Alt text should not be the same as caption text',
  LINK_ALT_UNPRONOUNCEABLE: 'Linked images need pronounceable alt text',
  DUPLICATE_TITLE: 'Duplicate "title" attributes are redundant', // Contains html
  LINK_EMPTY_LABELLEDBY: 'Link with invalid "aria-labelledby" attribute', // Contains html
  LINK_STOPWORD_ARIA: 'Manual check: link text overridden by ARIA that may not be meaningful', // Contains html
  LINK_SYMBOLS: 'Manual check: are the symbols or emoji in this link meaningful?',
  LINK_CLICK_HERE: 'Manual check: link contains "click here"',
  LINK_DOI: 'APA Style guide recommends using descriptive DOI links',
  LINK_IDENTICAL_NAME:
    'Does this link uniquely describe its destination?',
  LINK_FILE_EXT: 'Link points to a file without warning',
  EMBED_UNFOCUSABLE: 'Frame with tabindex="-1" will not be keyboard accessible.', // Contains html
  EMBED_MISSING_TITLE: 'Frame missing "title" attribute', // Contains value
  EMBED_GENERAL: 'Embedded iframes need manual checks',
  QA_BAD_LINK: 'Manual check: link target may be invalid',
  QA_STRONG_ITALICS: 'Manual check: entire paragraph is emphasized',
  QA_IN_PAGE_LINK: 'Broken same-page link',
  QA_DOCUMENT: 'Manual check: linked document',
  QA_UNDERLINE: 'Only links should be underlined',
  QA_SUBSCRIPT: 'Manual check: use of subscript or superscript as visual formatting',
  QA_NESTED_COMPONENTS: 'Nested interactive layout components',
  QA_JUSTIFY: 'Justified text',
  QA_SMALL_TEXT: 'Small text',
  META_LANG: 'Meta tag for page language missing',
  META_SCALABLE: 'Meta tag prevents user scaling',
  META_MAX: 'Meta tag sets max user scaling',
  META_REFRESH: 'Meta tag automatically refreshes page',
  DUPLICATE_ID: 'Manual check: duplicate ID tag', // Contains value
  META_TITLE: 'Meta tag for page title missing',
  UNCONTAINED_LI: 'Invalid HTML list', // Contains value
  TABINDEX_ATTR: 'Provided tabindex value removes element from reading order',
  HIDDEN_FOCUSABLE: 'Screen readers told not to speak the name of an interactive element',
  LABEL_IN_NAME: 'Visible name different than machine-readable name',
  LABELS_ARIA_LABEL_INPUT: 'Manual check: is there a visible label for this field?',
  LABELS_PLACEHOLDER: 'Manual check: placeholder text in label',
  BTN_EMPTY: 'Button purpose is not machine-readable',
  BTN_EMPTY_LABELLEDBY: 'Button has an invalid ARIA label', // Contains value
  BTN_ROLE_IN_NAME: 'Button name repeats the word "button"',
  CONTRAST_WARNING: 'Does this text have enough contrast?',
  CONTRAST_INPUT: 'Input does not provide enough contrast to be easily legible',
  CONTRAST_ERROR: 'Text does not have enough contrast to be easily legible',
  CONTRAST_PLACEHOLDER: 'Placeholder text does not have enough contrast to be easily legible',
  CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Does this placeholder text have enough contrast?',
  CONTRAST_ERROR_GRAPHIC: 'Graphic or icon does not have enough contrast with the background',
  CONTRAST_WARNING_GRAPHIC: 'Does this graphic or icon have enough contrast?',
};
