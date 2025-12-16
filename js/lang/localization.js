const ed11yLang = {

  // ESLint config:
  /* global Ed11y */
  /* exported ed11yLang */

  strings : {

    // Main Panel =========================================
    OUTLINE: 'Headings',
		IMAGES: 'Alt text',

		// Extended English strings with translated fallback.
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

		// Visualization
    NO_IMAGES: 'No images found.',
		ALT: 'Alt Text: ',
    MISSING: '(missing!)',
		panelCheckOutline: '<p class="ed11y-small">This shows the <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">heading outline</a>. Check that it matches how the content is organized visually.</p>', // Shown for EN only.
		panelCheckAltText: '<p class="ed11y-small">Check that each image <a href="https://www.w3.org/WAI/tutorials/images/informative/">describes what it means in context</a>, and that there are no images of text.</p>', // Shown for EN only.
    DECORATIVE: 'Marked decorative',
    /* @todo: Outline error explanations currently hidden.
		errorOutlinePrefixSkippedLevel: '(flagged for skipped level) ',
    errorOutlinePrefixHeadingEmpty: '(empty heading) ',
    errorOutlinePrefixHeadingIsLong: '(flagged for length) ',
    */

    // Errors and alerts ==================================
    NOT_VISIBLE: 'Note: this content may not be visible. Look for it inside the outlined container.',
		SUS_ALT_STOPWORDS: ['image', 'graphic', 'picture', 'photo', 'thumbnail', 'icon', 'placeholder','spacer','tbd','todo', 'copyright', 'courtesy of'], // todo Ed11y test use to catch these at the end as well as the beginning.

		// Strings used in tests ==============================

		// @todo after merge Add courtesy of, copyright, and photo by to Sa11y.
    // suspiciousWords: ['image of','graphic of','picture of','photo of','photograph of','placeholder','spacer','tbd','todo', 'copyright', 'courtesy of', 'photo by'],
    // badEndingForAlt: ['photo', 'image', 'photograph', 'picture'],
		// @todo after merge Compare Sa11y test.
    //linksUrls: ['http:/', 'https:/', '.asp', '.htm', '.php', '.edu/', '.com/'],
		// @todo after merge Compare Sa11y test performance
    //linksMeaningless: /(learn|to|more|now|this|page|link|site|website|check|out|view|our|read|download|form|here|click|"|'|\?|\.|-|,|:|>|<|\s)+/g,
    //linkStringsNewWindows: /window|\stab|download/g,

    // Tooltips ======================================

    WARNING: 'manual check needed',
    //ERROR: 'alert',
    //ALERT_TEXT: 'Issue',
    //toggleAriaLabel: `Accessibility %(label)`,
    transferFocus: 'Edit this content', // @todo translate
    dismissOkButtonContent: 'Mark OK', //@todo translate
		DISMISS: 'Ignore',
    dismissActions: `Similar alerts`, // 2.3.10 // @todo translate
		DISMISS_ALL: 'Ignore similar alerts on this page', // 2.3.10
    dismissOkAllButton: 'Similar alerts on this page are OK', // @todo translate
		dismissOnSite: 'Mark OK on all pages', // @todo translate
    dismissOkTitle: 'Hides alert for all editors',  // @todo translate
    dismissHideTitle: 'Only hides alert for you',  // @todo translate
    undismissOKButton: 'Restore this alert marked as OK',  // @todo translate
    undismissHideButton: 'Restore this ignored alert', // @todo translate
    undismissNotePermissions: 'This check has been hidden by an administrator', // @todo translate
    reportsLink: 'Open site reports', // @todo translate
    ALERT_CLOSE: 'Close',
    panelHelpTitle: 'About this tool', // @todo translate
    panelHelp: `
    <p><a href="https://editoria11y.princeton.edu/">Editoria11y</a> checks for common accessibility needs, such as image alternative text, meaningful heading outlines and well-named links.</p>
    <p>Many alerts are "manual checks." Manual checks can be dismissed:</p>
    <ul>
        <li>"Mark as checked and OK" hides the alert for all editors.</li>
        <li>"Ignore this manual check" leaves the tip visible to other editors.</li>
    </ul>
    <p>Dismissed alerts can be found via the "Show hidden alerts" toggle.</p>
    <p>If an incorrect alert is appearing on many pages, site administrators can tell the checker to ignore particular elements and page regions.</p>
    <p>And remember that automated checkers cannot replace <a href='https://webaim.org/resources/evalquickref/'> proofreading and testing for accessibility</a>.</p>
    <p><br><a href='https://github.com/itmaybejj/editoria11y/issues' class='ed11y-small'>Report bugs & request changes <span aria-hidden="true">&raquo;</span></a></p>
    `,
		issueContent: 'Content issue',
		issueDeveloper: 'Developer issue',
		issueTemplate: 'Template issue',

		NEW_WINDOW_PHRASES: ['external', 'download', 'new tab', 'new window', 'pop-up', 'pop up', 'opens new tab', 'opens new window'],


		// Tooltips for heading tests =========================
  },
	testNames: {
		ALT_FILE_EXT_TEST_NAME: 'This image needs meaningful alt text, not a URL',
		ALT_MAYBE_BAD_TEST_NAME: 'Is this alt text meaningless?',
		ALT_PLACEHOLDER_TEST_NAME: 	'This image needs meaningful alt text, not a placeholder',
		ALT_UNPRONOUNCEABLE_TEST_NAME: 'This image\'s alt text is unpronounceable',
		EMBED_AUDIO_TEST_NAME:	'Does this audio have a transcript?',
		EMBED_CUSTOM_TEST_NAME: 'Is this embedded content accessible?',
		EMBED_DATA_VIZ_TEST_NAME: 'Is this visualization accessible?',
		EMBED_VIDEO_TEST_NAME: 'Is this video accurately captioned?',
		HEADING_EMPTY_TEST_NAME: 'Add text to this heading, or remove it',
		HEADING_LONG_TEST_NAME: 'Can this heading be shortened?',
		HEADING_SKIPPED_LEVEL_TEST_NAME: 'Was a heading level skipped?',
		IMAGE_ALT_TOO_LONG_TEST_NAME: 'Can this alternative text be shortened?',
		IMAGE_DECORATIVE_TEST_NAME: 'Is this image meaningless?',
		LINK_ALT_FILE_EXT_TEST_NAME:	'This linked image\'s alt text should not be a URL',
		LINK_ALT_MAYBE_BAD_TEST_NAME: 'Does this alt text describe the link destination?',
		LINK_EMPTY_NO_LABEL_TEST_NAME: 'This link needs a label',
		LINK_EMPTY_TEST_NAME: 'This link needs text',
		LINK_IMAGE_ALT_AND_TEXT_TEST_NAME: 'Does this alt text make sense inside this link?', // 2.3.10.
		LINK_IMAGE_LONG_ALT_TEST_NAME: 'Can this linked alt text be shortened?',
		LINK_IMAGE_NO_ALT_TEXT_TEST_NAME: 'This linked image needs alt text',
		LINK_NEW_TAB_TEST_NAME: 'Does this link open a new window without warning?',
		LINK_PLACEHOLDER_ALT_TEST_NAME: 'This linked image needs meaningful alt text',
		LINK_STOPWORD_TEST_NAME: 'Does this link describe its destination?',
		LINK_SUS_ALT_TEST_NAME: 'Is there redundant text in this linked image?',
		LINK_URL_TEST_NAME: 'Is this link text a URL?',
		MISSING_ALT_LINK_HAS_TEXT_TEST_NAME: 'Image in link with text has no alternative text attribute', // Off by default in Editoria11y.
		MISSING_ALT_LINK_TEST_NAME: 'This linked image needs an alt text attribute',
		MISSING_ALT_TEST_NAME: 'This image has no alt text attribute',
		QA_BLOCKQUOTE_TEST_NAME : 'Is this a quote or a heading?',
		QA_FAKE_HEADING_TEST_NAME: 'Should this be a heading?',
		QA_FAKE_LIST_TEST_NAME: 'Should this have list formatting?',
		QA_PDF_TEST_NAME: 'Is the linked document accessible?',
		QA_UPPERCASE_TEST_NAME: 'Is this uppercase text needed?',
		SUS_ALT_TEST_NAME: 'Are there redundant words in this alt text?',
		TABLES_EMPTY_HEADING_TEST_NAME: 'This header cell needs text',
		TABLES_MISSING_HEADINGS_TEST_NAME: 'This table needs a header row or column',
		TABLES_SEMANTIC_HEADING_TEST_NAME: 'Content headings should not be used inside tables',

		// New
		// @todo These are only synced, not displayed.
		HEADING_EMPTY_WITH_IMAGE_TEST_NAME: 'This image used as a heading needs alt text',
		HEADING_FIRST_TEST_NAME: 'The first heading on a page should usually be a Heading 1 or Heading 2',
		HEADING_MISSING_ONE_TEST_NAME: 'Missing Heading 1',
		IMAGE_DECORATIVE_CAROUSEL_TEST_NAME: 'Image in a carousel or gallery marked as decorative',
		LINK_IMAGE_TEXT_TEST_NAME: 'Manual check: Image is marked as decorative, although the link is using the surrounding text as a descriptive label.',
		IMAGE_FIGURE_DECORATIVE_TEST_NAME: 'Manual check: image in a figure marked as decorative',
		LINK_IMAGE_ALT_TEST_NAME: 'Manual check: linked image link contains alt text',
		IMAGE_FIGURE_DUPLICATE_ALT_TEST_NAME: 'Alt is the same as caption text',
		LINK_ALT_UNPRONOUNCEABLE_TEST_NAME: 'Alt text in linked image is unpronounceable.',
		DUPLICATE_TITLE_TEST_NAME: 'Duplicate title attribute',
		LINK_EMPTY_LABELLEDBY_TEST_NAME: 'Link invalid aria-labelledby attribute',
		LINK_STOPWORD_ARIA_TEST_NAME: 'Manual check: link text overridden by ARIA that may not be meaningful',
		LINK_SYMBOLS_TEST_NAME: 'Manual check: are the symbols or emoji in this link meaningful?',
		LINK_CLICK_HERE_TEST_NAME: 'Manual check: link contains "click here"',
		LINK_DOI_TEST_NAME: 'APA Style guide recommends using descriptive DOI links',
		LINK_IDENTICAL_NAME_TEST_NAME: 'Manual check: link has identical text as another link but points to a different page',
		LINK_FILE_EXT_TEST_NAME: 'Link points to a file without warning',
		EMBED_UNFOCUSABLE_TEST_NAME: 'Frame with tabindex="-1" will not be keyboard accessible.',
		EMBED_MISSING_TITLE_TEST_NAME: 'Frame missing title attribute',
		EMBED_GENERAL_TEST_NAME: 'Manual check: iframe content',
		QA_BAD_LINK_TEST_NAME: 'Manual check: link target may be invalid',
		QA_STRONG_ITALICS_TEST_NAME: 'Manual check: entire paragraph is emphasized',
		QA_IN_PAGE_LINK_TEST_NAME: 'Broken same-page link',
		QA_DOCUMENT_TEST_NAME: 'Manual check: linked document',
		QA_UNDERLINE_TEST_NAME: 'Underlined text',
		QA_SUBSCRIPT_TEST_NAME: 'Manual check: use of subscript or superscript as visual formatting',
		QA_NESTED_COMPONENTS_TEST_NAME: 'Nested interactive layout components',
		QA_JUSTIFY_TEST_NAME: 'Justified text',
		QA_SMALL_TEXT_TEST_NAME: 'Small text',
		META_LANG_TEST_NAME: 'Meta tag for page language missing',
		META_SCALABLE_TEST_NAME: 'Meta tag prevents user scaling',
		META_MAX_TEST_NAME: 'Meta tag sets max user scaling',
		META_REFRESH_TEST_NAME: 'Meta tag automatically refreshes page',
		DUPLICATE_ID_TEST_NAME: 'Manual check: duplicate ID',
		META_TITLE_TEST_NAME: 'Meta tag for page title missing',
		UNCONTAINED_LI_TEST_NAME: 'Invalid HTML list',
		TABINDEX_ATTR_TEST_NAME: 'Provided tabindex value removes element from reading order',
		HIDDEN_FOCUSABLE_TEST_NAME: 'Screen readers told not to speak the name of an interactive element',
		LABEL_IN_NAME_TEST_NAME: 'Visible name different than machine-readable name',
		LABELS_ARIA_LABEL_INPUT_TEST_NAME: 'Manual check: is there a visible label for this field?',
		LABELS_PLACEHOLDER_TEST_NAME: 'Manual check: placeholder text in label',
		BTN_EMPTY_TEST_NAME: 'Button purpose is not machine-readable',
		BTN_EMPTY_LABELLEDBY_TEST_NAME: 'Button has an invalid ARIA label',
		BTN_ROLE_IN_NAME_TEST_NAME: 'Button name repeats the word "button"',
		CONTRAST_WARNING_TEST_NAME: 'Does this text have enough contrast?',
		CONTRAST_INPUT_TEST_NAME: 'Input does not provide enough contrast to be easily legible',
		CONTRAST_ERROR_TEST_NAME: 'Text does not have enough contrast to be easily legible',
		CONTRAST_PLACEHOLDER_TEST_NAME: 'Placeholder text does not have enough contrast to be easily legible',
		CONTRAST_PLACEHOLDER_UNSUPPORTED_TEST_NAME: 'Does this placeholder text have enough contrast?',
		CONTRAST_ERROR_GRAPHIC_TEST_NAME: 'Graphic or icon does not have enough contrast with the background',
		CONTRAST_WARNING_GRAPHIC_TEST_NAME: 'Does this graphic or icon have enough contrast?',
	},
	tests: {
		// todo: update Drupal localization file.
		HEADING_SKIPPED_LEVEL: `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            <p>This heading skipped from level %(prevLevel) to level %(level). From a screen reader, this sounds like content is missing.</p>
            <p><strong>To fix:</strong> adjust levels to form an accurate outline, without gaps.</p>
            `,

		HEADING_EMPTY: `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            <p>Empty headings create confusing gaps in this outline: they could mean the following content is still part of the previous section, or that the text was unpronounceable for some reason.</p>
            <p><strong>To fix:</strong> add text to this heading, or delete this empty line.</p>
            `,

		HEADING_LONG: `<p>Headings should be brief and clear. Assistive devices use them as a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for the page. The numbers indicate indents in a nesting relationship:</p>  
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            <p><strong>To fix:</strong> shorten this heading if possible, or remove the heading style if it was only applied to this text to provide visual emphasis.</p>
            `,

		QA_BLOCKQUOTE: '<p>Blockquote formatting tells screen readers that the text should be announced as a quotation. This was flagged because short blockquotes are <em>sometimes</em> actually <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">headings</a>. If this is a heading and not a quotation, use heading formatting instead, so this appears in the page outline.</p>',

		// Tooltips for image tests =========================

		MISSING_ALT: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.</p>
            <p><strong>To fix:</strong> either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>
            <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

		MISSING_ALT_LINK_HAS_TEXT: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.</p>
		<p>This image is part of a link with text. If the visible text is sufficient to describe the link, add an empty alt (alt="") to tell screen readers to ignore this image. Otherwise, provide the title of the linked page as the alt text.</p>`,

		MISSING_ALT_LINK: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time. This is especially a problem for linked images.</p>
            <p><strong>To fix:</strong> either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>
            `,

		IMAGE_DECORATIVE: `<p>Unless this image is purely decorative (a spacer icon or background texture), an alt should probably be provided. Photos in page content <strong>almost always need alt text.</strong> Since many screen reader users can see there is an image present, it can be very confusing to move the cursor across the place on the page where an image is visible, but hear nothing.</p>
        <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

		ALT_FILE_EXT: `This image's alt text is "%(alt)," which probably describes the file name, not the contents of the image.
        <p><strong>To fix:</strong> set this image's alternative text to a concise description of what this image means in this context.</p>
        <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`
		,

		ALT_PLACEHOLDER: `<p>This image's alt text is "%(alt)," which was flagged for being common placeholder text.</p>
        <p><strong>To fix:</strong> set this image's alternative text to a concise description of what this image means in this context.</p>
        <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`
		,

		// Machine generated string.
		ALT_MAYBE_BAD: `<p>This image's alt text is "%(alt)," which was flagged as containing a suspicious number of characters that may not form words.</p>
        <p><strong>To fix:</strong> if this is placeholder text, set this image's alternative text to a concise description of what this image means in this context.</p>
        <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`
		,

		LINK_ALT_MAYBE_BAD: `<p>When a link includes an image, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="opens in new tab">the image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination, even out of context.</p>
           <p>This image's alt text is "%(alt)," which may not describe this link.</p>`
		,

		LINK_PLACEHOLDER_ALT: `<p>When a link includes an image, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="opens in new tab">the image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination, even out of context.</p>
           <p>This image's alt text is "%(alt)," which probably does not describe this link.</p>`
		,

		LINK_ALT_FILE_EXT: `<p>This image's alt text is "%(alt)," which is probably a filename.</p>
        <p>When a link is wrapped around an image and there is no other text, the <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination; a URL (usually pronounced by the screen reader one letter at a time) does not.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "H T T P S colon forward slash forward slash example dot com forward slash aye bee oh you tee you ess"</li>
            </ul>`, // @todo after merge: compare with Sa11y's wording.

		SUS_ALT: `<p>This image's alt text is "%(alt)," which mentions that this image is an image.</p>
        <p>Screen readers announce they are describing an image when reading alt text, so 
            phrases like "image of" and "photo of" are usually redundant in alt text; the screen reader user hears "image: image of something."</p>
            <p>Note that this is OK if the format is referring to the <strong>content</strong> of the image:</p>
            <ul><li>Format is redundant: "<em>photo of</em> a VHS tape"</li>
            <li>Format is relevant: "<em>photo of</em> a VHS tape in a photo album being discussed in a history class"</li></ul>`,

		LINK_SUS_ALT: `<p>This image's alt text is "%(alt)," which mentions that this image is an image.</p>
        <hr><p>Links should clearly and concisely describe their destination. Since words like "image," "graphic" or "photo" are already redundant in text alternatives (screen readers already identify the image as an image), their presence in a linked image usually means the image's text alternative is <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">describing the image instead of the link</a>.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "Image of five people jumping"</li>
            </ul>`,

		ALT_UNPRONOUNCEABLE: `<p>This image's alt text is "%(alt)," which only contains unpronounceable symbols and/or spaces. Screen readers will announce that an image is present, and then pause awkwardly: "image: ____."</p>
        <p><strong>To fix:</strong> add a descriptive alt, or provide a <em>completely</em> empty alt (alt="") if this is just an icon or spacer, and screen readers should ignore it.</p>
            <p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

		LINK_IMAGE_NO_ALT_TEXT: `<p>When a link is wrapped around an image, the image's alt text <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">provides the link's title for screen readers</a>.</p>
        <p><strong>To fix:</strong> set this image's alternative text to something that describes the link's destination, or add text next to the image, within the link.</p>`,

		IMAGE_ALT_TOO_LONG: `<p>Image text alternatives are announced by screen readers as a single run-on sentence; listeners must listen to the entire alt a second time if they miss something. If this cannot be reworded to something succinct, it is better to use the alt to reference a <em>visible</em> <a href="https://www.w3.org/WAI/tutorials/images/complex/">text alternative for complex images</a>. For example:</p>
            <ul><li>"Event poster; details follow in caption"</li>
            <li>"Chart showing our issues going to zero; details follow in table"</li></ul>
            This image's alt text is: <em>%(alt)</em>
            `,

		LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">The alt text on a linked image is used to describe the link destination</a>. Links should be brief, clear and concise, as screen reader users often listen to the list of links on the page to find content of interest. Long alternative text inside a link often indicates that the image's text alternative is describing the image instead rather than the link.</p>
        This image's alt text is: <em>%(alt)</em>`,

		LINK_IMAGE_ALT_AND_TEXT: `<p>Screen readers will <a href="https://www.w3.org/WAI/tutorials/images/functional/">include the image's alt text when describing this link</a>.</p>
            <p>Check that the combined text is concise and meaningful:<br>"<em><strong>%(alt)</strong></em>"</p>
            <p></p>
            <ul>
                <li>Keep alts that add relevant meaning:<br>"Buy (A Tigers v. Falcons ticket)."</li>
                <li>Edit unhelpful or irrelevant alts:<br>"Buy (A piece of paper with team logos on it)."</li>
                <li>Remove unnecessary alts:<br>"Buy Tigers v. Falcons tickets (A Tigers v. Falcons ticket)."</li>
            </ul>
        `,

		LINK_EMPTY:
			`<p>This link is either a typo (a linked space character), or a linked image with no text alternative.</p>
        <p>Screen readers will either say nothing when they reach this link: <br><em>"Link, [...awkward pause where the link title should be...],"</em><br>or read the URL: <br><em>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</em></p>
        <p><strong>To fix:</strong></p>
        <ul><li>If this a typo, delete it. Note that typo links can be hard to see if they are next to a "real" link: one will be on the text, one on a space.</li><li>If it is a real link, add text to describe where it goes.</li>`,

		LINK_EMPTY_NO_LABEL:
			`<p>This link is either a typo (a linked space character), or a linked image with no text alternative.</p>
        <p>Screen readers will either say nothing when they reach this link: <br><em>"Link, [...awkward pause where the link title should be...],"</em><br>or read the URL: <br><em>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</em></p>
        <p><strong>To fix:</strong></p>
        <ul><li>If this a typo, delete it. Note that typo links can be hard to see if they are next to a "real" link: one will be on the text, one on a space.</li><li>If it is a real link, add text to describe where it goes.</li>`,

		LINK_URL: `<p>This link's text is:<br> <strong>%(text)</strong></p>
        <p><a href="https://webaim.org/techniques/hypertext/link_text">Links should be meaningful and concise</a>. Readers often skim by link titles. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
         <p>A linked URL breaks this pattern; the reader has to read the preceding paragraph to figure out the link's purpose from context.</p>
            <ul>
                <li>Meaningful and concise link: "Tips for writing meaningful links"</li>
                <li>Linked URL, as pronounced by a screen reader: "H T T P S colon forward-slash forward-slash example dot com forward-slash tips forward-slash meaningful-links"</li>
            </ul>`,

		LINK_STOPWORD: `<p>This link's text is: <strong>%(text)</strong></p>
        <p>Readers skim for links. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
                <p>Generic links like "click here," "read more" or "download" expect the reader be reading slowly and carefully enough to figure out each link's purpose from context. Few readers do this, so click-through rates on meaningless links are extremely poor.</p>
                <ul>
                <li>Ideal: "Learn about <a href="https://webaim.org/techniques/hypertext/link_text">meaningful links"</a></strong></li>
                <li>Not meaningful: "Click <a href="https://webaim.org/techniques/hypertext/link_text">here</a> to learn about meaningful links."</li>
                <li>Not concise: "<a href="https://webaim.org/techniques/hypertext/link_text">Click here to learn more about meaningful links</a>"</li>
                </ul>
                `,

		QA_PDF: `<p>Many mobile and assistive device users struggle to read content in PDFs. PDFs generally do not allow for changing font sizes, and often contain features that are incompatible with screen readers.</p>
        <p>Ideally make the content of this linked PDF available on a Web page or in an editable document, and only link to this PDF as a "printable" alternative. If this PDF is the only way you are providing to access this content, you will need to <a href='https://webaim.org/techniques/acrobat/' target='_blank'>manually check that the PDF is well-structured</a>, with headings, lists and table headers, and provides alt text for its images.</p>`,

		LINK_NEW_TAB: `<p>Readers can always choose to open a link a new window. When a link forces open a new window, it can be confusing and annoying, especially for assistive device users who may wonder why their browser's "back" button is suddenly disabled.</p>
                <p>There are two general exceptions:</p>
                <ul>
                    <li>When the user is filling out a form, and opening a link in the same window would cause them to lose their work.</li>
                    <li>When the user is clearly warned a link will open a new window.</li>
                </ul>
                <p><strong>To fix:</strong> set this link back its default target, or add a screen-reader accessible warning (text or an icon with alt text).</p>
                `,

		// Tooltips for Text QA ===============================

		TABLES_MISSING_HEADINGS: `
                <p>To fix:</p>
                <ul><li>If this table contains data that is meaningfully organized by row and column, edit the table's properties and specify whether headers have been placed in the first row, column or both. This lets screen reader users hear the headers repeated while navigating the content.</li>
                <li>If this table does not contain rows and columns of data, but is instead being used for visual layout, remove it. Tables overflow the page rather than reflowing on mobile devices, and should only be used when the horizontal relationships are necessary to understand the content.</li></ul>
            `,

		TABLES_SEMANTIC_HEADING: `<p>To fix: remove heading formatting. Use row and column headers instead.</p>
        <p>Content headings ("Heading 1", "Heading 2") form a navigable table of contents for screen reader users,  
        labelling all content <strong>until the next heading</strong>. Table headers label specific columns or rows within a table.</p> 
            <p></p>
            <table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">To illustrate: a <strong>table</strong> header in cell 2 would only label its column: cell B. <br><br>
            A <strong>content</strong> heading in cell 2 would label all subsequent text, reading from left to right: cells 3, A, B and C, as well as this text!</td></tr>
            <tr><td>A</td><td>B</td><td>C</td></table>
            `,

		TABLES_EMPTY_HEADING: `
                <p>When exploring tables, screen readers repeat table header cells as needed to orient users. 
                Without headers, it is very easy to get lost; screen reader users have to count columns and rows and try to remember which columns went with which rows.</p>
                <p><strong>To fix:</strong> make sure each header cell in this table contains text.</p>
            `,

		QA_FAKE_LIST: `<p>List formatting is structural:</p> 
            <ol><li>List formatting indents and reflows on overflow. Text aligns vertically with the line above it.</li>
            <li>Lists are machine-readable. Screen readers can orient their users, announcing this as "list item, 2 of 3."</li></ol>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;3. But this third item is just a sentence with a number in front of it. It wraps incorrectly, and screen readers do not know it is related to the other items in the list.</p>
            <p><strong>To fix:</strong> if this "%(text)" is part of a list, replace it with list formatting.</p>
            `,

		QA_FAKE_HEADING: `<p>If this all-bold line of text is functioning as a heading for the following text rather than a visual emphasis, replace the bold formatting with the appropriately numbered heading. Otherwise, dismiss this alert.</p>
        <p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">navigable table of contents</a> for assistive devices. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li><li>Heading level 2: a new topic</li></ul></li></ul>
            `,

		QA_UPPERCASE: `<p>UPPERCASE TEXT CAN BE MORE DIFFICULT TO READ FOR MANY PEOPLE, AND IS OFTEN INTERPRETED AS SHOUTING.</p>
         <p>Consider using sentence case instead, and using bold text or font changes for visual emphasis, or structural formatting like headings for emphasis that will also be announced by screen readers.</p>`,

		EMBED_VIDEO: `<p>If a recorded video contains speech or meaningful sounds, it must <a href="https://www.w3.org/WAI/media/av/captions/" title="Opens in new window">provide captions</a>.</p>
            <p>Note that automatic, machine-generated captions must be proofread, and speaker identifications must be added, before being considered an equal alternative.</p>`,

		EMBED_AUDIO: `<p>If this audio contains speech, a <a href="https://www.w3.org/WAI/media/av/transcribing/" title="Opens in new window">text alternative</a> must be provided on this page or linked.</p>
            <p>Note that automatic, machine-generated transcripts must be proofread, and speaker identifications must be added, before being considered an equal alternative</p>`,

		EMBED_DATA_VIZ: `<p>Visualization widgets are often difficult or impossible for assistive devices to operate, and can be difficult to understand for readers with low vision or colorblindness.</p>
							<p>Unless this particular widget has high visual contrast, can be operated by a keyboard and described by a screen reader, assume that an alternate format (text description, data table or downloadable spreadsheet) should also be provided.</p>`,

			EMBED_CUSTOM: '<p>This checker cannot test inside embedded content. Check to sure images inside this embed have alt text, videos have captions, and interactive components can be <a href=\'https://webaim.org/techniques/keyboard/\'>operated by a keyboard</a>.</p>',

		/* New */
		LABELS_ARIA_LABEL_INPUT: '<p>Labeling fields with only a title or placeholder means the label visually disappears as soon as someone starts writing. This makes it difficult for people to review input when there are several fields. Check to make sure a visible field label remains and matches the invisible field title or placeholder.</p><p><strong {B}>Invisible field name:</strong> <strong {C}>%(TEXT)</strong></p>',
		}
};

export default ed11yLang;
