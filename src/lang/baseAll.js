const headingWhy = `<div class="why">
			<p>Tip: headings and subheadings organize content into a nested outline. Screen reader users rely on this outline to understand and explore pages:</p>
				<ul><li>Heading level 1: page titles<ul><li>Heading level 2: major topics<ul><li>Heading level 3: subtopics</li></ul></li></ul></li></ul>
			</div>`;
const imageWhy = `<div class="why">
			<p>Tip: describe what an image means, not just what it contains, when writing an alt. Depending on context, a photo of a child kicking a ball might mean:</p>
				<ul>
						<li>They played in the pouring rain.</li>
						<li>The new team uniforms have cool dragon logos.</li>
						<li>She kicked the game-winning goal from the left sideline!</li>
				</ul>
		</div>`;
const linkedImageWhy = `<div class="why">
    <p>The purpose of alt text is to provide an alternative for what an image means, not what it contains. The meaning of a linked image is the link destination:
				<ul>
					<li>Describing an image: "A magnifying glass"</li>
					<li>Describing a link: "Search"</li>
					</ul>
				</p>
			</div>`

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


	// My style tests.
	HEADING_SKIPPED_LEVEL: `<p>This heading skipped from <strong>level %(prevLevel) to level %(level)</strong>. From a screen reader, this sounds like content is missing.</p>
		<p><strong class="badge">To fix</strong> adjust levels to form an accurate outline, without gaps.</p>${headingWhy}`,

	HEADING_EMPTY: `<p>Empty headings create confusing gaps in the page outline.</p>
		<p><strong class="badge">To fix</strong> Add text to this heading, or delete this empty line.</p>${headingWhy}`,

	HEADING_LONG: `<p><strong class="badge">To fix</strong> Unless this is something of fixed length like the title of a published article, shorten it to help people skim.</p>${headingWhy}`,

	QA_BLOCKQUOTE:
		`<p>Blockquote formatting tells screen readers that the text should be announced as a quotation. This was flagged because short blockquotes are <em>sometimes</em> actually <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">headings</a>. If this is a heading and not a quotation, use heading formatting instead, so this appears in the page outline.</p>${headingWhy}`,

	// Tooltips for image tests =========================

	MISSING_ALT: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.</p>
            <p><strong class="badge">To fix</strong> either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>${imageWhy}`,

	MISSING_ALT_LINK_HAS_TEXT: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.</p>
		<p>This image is part of a link with text. If the visible text is sufficient to describe the link, add an empty alt (alt="") to tell screen readers to ignore this image. Otherwise, provide the title of the linked page as the alt text.</p>`,

	MISSING_ALT_LINK: `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time. This is especially a problem for linked images.</p>
            <p><strong class="badge">To fix</strong> either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>
            `,

	IMAGE_DECORATIVE: `<p>This image has been hidden from screen readers using a blank alt. Only meaningless images like redundant icons and background textures should be hidden like this.</p><p><strong class="badge">To fix</strong> if this image adds value to the page, provide alt text.</p>${imageWhy}`,

	ALT_FILE_EXT: `<p>Screen readers will dictate this url, often one letter at a time. This probably does not provide the same meaning as seeing the image.</p><p><strong class="badge">To fix</strong> either add an empty alt (alt="") if this is a meaningless decoration that should be ignored by screen readers, or add descriptive alt text.</p>${imageWhy}`,

	ALT_PLACEHOLDER: `<p>Provided description of this image: <strong>"%(alt)"</strong></p>
        <p><strong class="badge">To fix</strong> set this image's alternative text to a concise description of what this image means in this context.</p>${imageWhy}`,

	// Machine generated string.
	ALT_MAYBE_BAD: `<p>Provided description of this image: <strong>"%(alt)"</strong></p>
        <p><strong class="badge">To fix</strong> set this image's alternative text to a concise description of what this image means in this context.</p>${imageWhy}`,

	LINK_ALT_MAYBE_BAD: `<p>This image's alt text is "%(alt)," which is probably a placeholder.</p>
	<p><strong class="badge">To fix</strong> set this image's alt text to the name of the link destination.</p>${linkedImageWhy}\``,

	LINK_PLACEHOLDER_ALT: `<p>This image's alt text is "%(alt)," which is probably a placeholder.</p>
						<p><strong class="badge">To fix</strong> set this image's alt text to the name of the link destination.</p>${linkedImageWhy}`,

	LINK_ALT_FILE_EXT: `<p>This image's alt text includes "%(alt)," which is probably a filename.</p>
        <p>When a link is wrapped around an image and there is no other text, the <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination; a URL (usually pronounced by the screen reader one letter at a time) does not.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "H T T P S colon forward slash forward slash example dot com forward slash aye bee oh you tee you ess"</li>
            </ul>`, // @todo after merge: compare with Sa11y's wording.

	SUS_ALT: `<p>This image's alt text includes "%(alt)," which is probably redundant.</p>
		<p><strong class="badge">To fix</strong> reword the alt to briefly convey what the image means.</p>
		<div class="why">
			<p>Tip: screen readers announce they are describing an image when reading alt text, so phrases like "image of" and "photo of" are usually redundant; the screen reader user hears <em>"Image of something, Image."</em></p>
            <p>Note that this is OK if the words refer to content inside the image:</p>
            <ul><li>Not redundant: "<em>A photo in</em> a photo album being shown to the class."</li>
            <li>Redundant: "<em>Photo of</em> a photo in a photo album being show to the class."</li>
            </ul>
		</div>`,

	LINK_SUS_ALT: `<p>This image's alt text includes "%(alt)," which mentions that this image is an image.</p>
        <hr><p>Links should clearly and concisely describe their destination. Since words like "image," "graphic" or "photo" are already redundant in text alternatives (screen readers already identify the image as an image), their presence in a linked image usually means the image's text alternative is <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">describing the image instead of the link</a>.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "Image of five people jumping"</li>
            </ul>`,

	ALT_UNPRONOUNCEABLE: `<p>This image's alt text is "%(alt)," which only contains unpronounceable symbols and/or spaces. Screen readers will announce that an image is present, and then pause awkwardly: "image: ____."</p>
        <p><strong class="badge">To fix</strong> add a descriptive alt, or provide a <em>completely</em> empty alt (alt="") if this is just an icon or spacer, and screen readers should ignore it.</p>${imageWhy}`,

	LINK_IMAGE_NO_ALT_TEXT: `<p>When a link is wrapped around an image, the image's alt text <a href="https://webaim.org/techniques/hypertext/link_text#alt_link">provides the link's title for screen readers</a>.</p>
        <p><strong class="badge">To fix</strong> set this image's alternative text to something that describes the link's destination, or add text next to the image, within the link.</p>`,

	IMAGE_ALT_TOO_LONG: `<p>Image text alternatives are announced by screen readers as a single run-on sentence; listeners must listen to the entire alt a second time if they miss something.</p><p>This image's %(altLength) character alt text is: <em class="ed11y-small">%(ALT_TEXT)</em></p>
            <div class="why"><p>Tip: complicated images that convey more information than fit in a sentence usually need a <strong>visible</strong> caption or alternative that describes or interprets key details. It is OK to refer screen reader users to such text:</p>
            <ul><li>"Poster for the dance on Friday; details follow in caption."</li>
            <li>"Chart showing issues are down 10% this year; details follow in table."</li></ul></div>`,

	LINK_IMAGE_LONG_ALT: `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link">The alt text on a linked image is used to describe the link destination</a>. Links should be brief, clear and concise, as screen reader users often listen to the list of links on the page to find content of interest. Long alternative text inside a link often indicates that the image's text alternative is describing the image instead rather than the link.</p>
        This image's %(altLength) character alt text is: <em>%(ALT_TEXT)</em>`,

	LINK_IMAGE_ALT_AND_TEXT: `<p>Check to make sure this helps describe the link's destination, rather than providing irrelevant or redundant information:</p>
            <p><strong class="badge">Alt</strong> "<em><strong>%(alt)</strong></em>"</p>${linkedImageWhy}`,

	IMAGE_FIGURE_DUPLICATE_ALT:
		'<p>Captions provide context for images, on the assumption that the person has already seen the image. Alt text visually describes an image for people who cannot see it.</p><p><strong>To fix</strong> provide an alt that can replace the visual meaning of the image, so that screen reader users can understand what the caption is describing.</p>',

	LINK_EMPTY: `<p>This link is either a typo (a linked space character), or a linked image with no text alternative.</p>
        <p>Screen readers will either say nothing when they reach this link: <br><em>"Link, [...awkward pause where the link title should be...],"</em><br>or read the URL: <br><em>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</em></p>
        <p><strong class="badge">To fix</strong></p>
        <ul><li>If this a typo, delete it. Note that typo links can be hard to see if they are next to a "real" link: one will be on the text, one on a space.</li><li>If it is a real link, add text to describe where it goes.</li>`,

	LINK_EMPTY_NO_LABEL: `<p>This link is either a typo (a linked space character), or a linked image with no text alternative.</p>
        <p>Screen readers will either say nothing when they reach this link: <br><em>"Link, [...awkward pause where the link title should be...],"</em><br>or read the URL: <br><em>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</em></p>
        <p><strong class="badge">To fix</strong></p>
        <ul><li>If this a typo, delete it. Note that typo links can be hard to see if they are next to a "real" link: one will be on the text, one on a space.</li><li>If it is a real link, add text to describe where it goes.</li>`,

	LINK_URL: `<p><a href="https://webaim.org/techniques/hypertext/link_text">Links should be meaningful and concise</a>. Readers often skim by link titles. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
         <p>A linked URL breaks this pattern; the reader has to read the preceding paragraph to figure out the link's purpose from context.</p>
            <ul>
                <li>Meaningful and concise link: "Tips for writing meaningful links"</li>
                <li>Linked URL, as pronounced by a screen reader: "H T T P S colon forward-slash forward-slash example dot com forward-slash tips forward-slash meaningful-links"</li>
            </ul>`,

	LINK_STOPWORD: `<p>This link's text is: <strong>%(text)</strong></p>
        <p>Readers skim for links. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
                <p>Generic links like "click here," "read more" or "download" expect the reader be reading slowly and carefully enough to figure out each link's purpose from context. Few readers do this, so they often miss generic links.</p>
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
                <p><strong>To fix</strong> set this link back its default target, or add a screen-reader accessible warning (text or an icon with alt text).</p>
                `,

	// Tooltips for Text QA ===============================

	TABLES_MISSING_HEADINGS: `
                <p>To fix:</p>
                <ul><li>If this table contains data that is meaningfully organized by row and column, edit the table's properties and specify whether headers have been placed in the first row, column or both. This lets screen reader users hear the headers repeated while navigating the content.</li>
                <li>If this table does not contain rows and columns of data, but is instead being used for visual layout, remove it. Tables overflow the page rather than reflowing on mobile devices, and should only be used when the horizontal relationships are necessary to understand the content.</li></ul>
            `,

	TABLES_SEMANTIC_HEADING: `
        <p>Table header cells label their specific columns or rows for screen readers.</p>
        <p>Content headings ("Heading 2") label all content <strong>until the next heading</strong>, usually including unrelated rows and columns:</p>
            <p></p>
            <table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">A <strong>table</strong> header in cell 2 labels column 2 alone. <br><br>
            A <strong>content</strong> heading in cell 2 labels cells 3, A, B and C, as well as this text, and the next paragraph.</td></tr>
            <tr><td>A</td><td>B</td><td>C</td></table>
            <p><strong class="badge">To fix</strong> remove this heading formatting. Provide header cells if needed.</p>
            `,

	TABLES_EMPTY_HEADING: `
                <p>When exploring tables, screen readers repeat table header cells as needed to orient users. 
                Without headers, it is very easy to get lost; screen reader users have to count columns and rows and try to remember which columns went with which rows.</p>
                <p><strong class="badge">To fix</strong> make sure each header cell in this table contains text.</p>
            `,

	QA_FAKE_LIST: `<p>List formatting is structural:</p> 
            <ol><li>List formatting preserve indents on overflow.</li>
            <li>Lists are machine-readable. Screen readers can orient their users, announcing this as "list item, 2 of 3."</li></ol>
            <p>&nbsp;&nbsp;&nbsp;3. But this third item is just a sentence with a number in front of it. Its indents do not align, and screen readers do not know it is related to the other items in the list.</p>
            <p><strong class="badge">To fix</strong> if this "%(text)" is part of a list, replace it with list formatting.</p>
            `,

	QA_FAKE_HEADING: `<p><strong class="badge">To fix</strong> if this all-bold line of text introduces a topic, replace the visual-only bold formatting with a heading style.</p>
        <div class="why">
        <p>Tip: headings and subheadings create a navigable table of contents for assistive devices. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>
            <ul><li>Heading level 1<ul><li>Heading level 2: a topic<ul><li>Heading level 3: a subtopic</li></ul></li></ul></li></ul>
        </div>`,

	QA_UPPERCASE: `<p>UPPERCASE TEXT CAN BE MORE DIFFICULT TO READ FOR MANY PEOPLE, AND IS OFTEN INTERPRETED AS SHOUTING.</p>
         <p>Consider using sentence case instead, and using bold text or font changes for visual emphasis, or structural formatting like headings for emphasis that will also be announced by screen readers.</p>`,

	EMBED_VIDEO: `<p>If a recorded video contains speech or meaningful sounds, it must <a href="https://www.w3.org/WAI/media/av/captions/" title="Opens in new window">provide captions</a>.</p>
            <p>Note that automatic, machine-generated captions must be proofread, and speaker identifications must be added, before being considered an equal alternative.</p>`,

	EMBED_AUDIO: `<p>If this audio contains speech, a <a href="https://www.w3.org/WAI/media/av/transcribing/" title="Opens in new window">text alternative</a> must be provided on this page or linked.</p>
            <p>Note that automatic, machine-generated transcripts must be proofread, and speaker identifications must be added, before being considered an equal alternative</p>`,

	EMBED_DATA_VIZ: `<p>Visualization widgets are often difficult or impossible for assistive devices to operate, and can be difficult to understand for readers with low vision or colorblindness.</p>
							<p>Unless this particular widget has high visual contrast, can be operated by a keyboard and described by a screen reader, assume that an alternate format (text description, data table or downloadable spreadsheet) should also be provided.</p>`,

	/* New */
	LABELS_ARIA_LABEL_INPUT:
		'<p>Labeling fields with only a title or placeholder means the label visually disappears as soon as someone starts writing. This makes it difficult for people to review input when there are several fields. Check to make sure a visible field label remains and matches the invisible field title or placeholder.</p><p><strong {B}>Invisible field name:</strong> <strong {C}>%(TEXT)</strong></p>',

	HEADING_EMPTY_WITH_IMAGE:
		`<p>Empty headings create confusing gaps in the page outline.</p>
		<p><strong class="badge">To fix</strong> If this is not a heading, change its format from <strong {C}>Heading %(level)</strong> to <strong>Paragraph</strong>. Otherwise, put the meaning of the image in its alt.</p>${headingWhy}`,


	// Headings
	HEADING_FIRST:
		'The first heading on a page should usually be a Heading 1 or Heading 2. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">heading structure.</a>',
	HEADING_MISSING_ONE:
		'Missing Heading 1. Heading 1 should be the start of the main content area, and is the main heading that describes the overall purpose of the page. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">heading structure.</a>',
	PANEL_HEADING_MISSING_ONE: 'Missing Heading 1!',
	PANEL_NO_HEADINGS: 'No headings found.',

	// Links
	LINK_EMPTY_LABELLEDBY:
		'Link has an <code>aria-labelledby</code> value that is empty or does not match the <code>id</code> value of another element on the page.',
	LINK_STOPWORD_ARIA:
		'Although an accessible name was provided, consider revising the visible link text. Phrases like &quot;<strong {C}>%(ERROR)</strong>&quot; are not meaningful.',
	LINK_TIP:
		'<hr> <strong>Tip!</strong> Use clear and unique link text that describes the destination of the link, typically the page or document title.',
	LINK_CLICK_HERE:
		'The phrase "click" or "click here" places focus on mouse mechanics, when many people do not use a mouse or may be viewing this website on a mobile device. Consider using a different verb that relates to the task.',
	DUPLICATE_TITLE:
		'The <code>title</code> attribute on links and images is meant to provide extra information, and should be <strong>different</strong> than the text or alt text. The title text appears when hovering over an element, but is not accessible with a keyboard or touch input. Consider <a href="https://www.a11yproject.com/posts/title-attributes/">avoiding the title attribute completely.</a>',
	LINK_SYMBOLS:
		'Avoid using symbols as calls to action within link text unless they are hidden from assistive technologies. Screen readers may read the symbols out loud, which can be confusing. Consider removing: <strong {C}>%(ERROR)</strong>',
	LINK_DOI:
		'For web pages or online-only resources, the <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style guide</a> recommends using descriptive links by wrapping the URL or DOI of the work around its title. Longer, less intelligible URLs used as link text might be difficult to comprehend with assistive technology.',
	LINK_FILE_EXT:
		'Link points to a PDF or downloadable file (e.g. MP3, Zip, Word Doc) without warning. Indicate the file type within the link text. If it is a large file, consider including the file size. For example: "Executive Report (PDF, 3MB)"',

	// Images
	LINK_ALT_UNPRONOUNCEABLE:
		'The alt text within this linked image only contains unpronounceable symbols and/or spaces. Screen readers will announce the image and then pause. Ensure the alt text describes the destination of the link. <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>',
	LINK_IMAGE_TEXT:
		'Image is marked as decorative, although the link is using the surrounding text as a descriptive label.',
	LINK_IMAGE_ALT:
		'Image link contains alt text. Does the alt text describe where the link takes you? <strong>Consider using the title of the page it links to as the alt text.</strong> <hr> {L} {ALT} <strong {C}>%(ALT_TEXT)</strong>',
	IMAGE_FIGURE_DECORATIVE:
		'Image is marked as <strong>decorative</strong> and will be ignored by assistive technology. <hr> Although a <strong>caption</strong> was provided, the image should also have alt text in most cases. <ul><li>The alt text should provide a concise description of what is in the image.</li><li>The caption should usually provide context to relate the image back to the surrounding content, or give attention to a particular piece of information.</li></ul> Learn more: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
	IMAGE_DECORATIVE_CAROUSEL:
		'Image is marked as <strong>decorative</strong>, but all images in a carousel or gallery should include descriptive alt text to ensure an equivalent experience for everyone.',
	//IMAGE_PASS: '{ALT} %(ALT_TEXT)',
	// Labels
	LABELS_MISSING_IMAGE_INPUT:
		'Image button is missing alt text. Please add alt text to provide an accessible name. For example: <em>Search</em> or <em>Submit</em>.',
	LABELS_INPUT_RESET:
		'Reset buttons should not be used unless specifically needed because they are easy to activate by mistake. <hr> <strong>Tip!</strong> Learn why <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Reset and Cancel buttons pose usability issues.</a>',
	LABELS_NO_FOR_ATTRIBUTE:
		'There is no label associated with this input. Add a <code>for</code> attribute to the label that matches the <code>id</code> of this input. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
	LABELS_MISSING_LABEL:
		'There is no label associated with this input. Please add an <code>id</code> to this input, and add a matching <code>for</code> attribute to the label.',
	LABELS_PLACEHOLDER:
		'Disappearing placeholder text makes it hard for people to remember what information belongs in a field and to identify and correct validation issues. Instead, consider using a permanently visible hint before the form field. <hr> Learn more: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Placeholders in form fields are harmful.</a>',

	// Embedded content
	EMBED_MISSING_TITLE:
		'Embedded content requires an accessible name that describes its contents. Please provide a unique <code>title</code> or <code>aria-label</code> attribute on the <code>iframe</code> element. Learn more about <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
	EMBED_UNFOCUSABLE:
		'<code>&lt;iframe&gt;</code> with focusable elements should not have <code>tabindex="-1"</code>. The embedded content will not be keyboard accessible.',

	// Quality assurance
	QA_BAD_LINK:
		'Bad link found. Link appears to point to a development environment. <hr> {L} <strong {C}>%(LINK)</strong>',
	QA_STRONG_ITALICS:
		'Bold and italic tags have semantic meaning, and should <strong>not</strong> be used to highlight entire paragraphs. Bolded text should be used to provide strong <strong>emphasis</strong> on a word or phrase. Italics should be used to highlight proper names (i.e. book and article titles), foreign words, quotes. Long quotes should be formatted as a blockquote.',
	QA_DOCUMENT:
		'Unable to check document for accessibility. Linked documents are considered web content and must be made accessible as well. Please manually review this document. <ul><li>Make your <a href="https://support.google.com/docs/answer/6199477?hl=en">Google Workspace document or presentation more accessible.</a></li><li>Make your <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office documents more accessible.</a></li></ul>',
	QA_UNDERLINE:
		'Underlined text can be confused with links. Consider using a different style such as <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> or <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
	QA_SUBSCRIPT:
		'The subscript and superscript formatting options should only be used to change the position of text for typographical conventions or standards. It should <strong>not</strong> solely be used for presentation or appearance purposes. Formatting entire sentences poses readability issues. Appropriate use cases would include displaying exponents, ordinal numbers such as 4<sup>th</sup> instead of fourth, and chemical formulas (e.g. H<sub>2</sub>O).',
	QA_IN_PAGE_LINK:
		'Broken same-page link. The link target does not match any element on this page.',
	QA_NESTED_COMPONENTS:
		'Avoid nesting interactive layout components, such as placing accordions within other accordions, or placing tabs inside accordions and vice versa. This can complicate navigation, increase cognitive overload, and lead to people overlooking content.',
	QA_JUSTIFY:
		'Avoid using justified text, which aligns to both the left and right margins. This can be difficult for some people to read due to the uneven spaces between words. Use left-aligned text for better readability.',
	QA_SMALL_TEXT:
		'Small text is harder to read, particularly for those with low vision. To ensure better readability, avoid using font sizes smaller than the default.',

	// Shared
	ACC_NAME: '<strong {B}>Accessible Name</strong> %(TEXT)',
	ACC_NAME_TIP:
		'<hr><strong>Tip!</strong> The "accessible name" is the final label that gets communicated to people who use assistive technology. This helps them understand the link or button\'s purpose.',
	HIDDEN_FOCUSABLE:
		'Link or button has <code>aria-hidden=&quot;true&quot;</code> but is still keyboard focusable. If you are intending to hide a duplicate link or button, add <code>tabindex=&quot;-1&quot;</code> as well. Otherwise, <code>aria-hidden=&quot;true&quot;</code> should not be used on elements that can receive focus. <hr> Learn more about the <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden attribute.</a>',

	// Developer checks
	DUPLICATE_ID:
		'Found <strong>duplicate ID</strong>. Duplicate ID errors are known to cause problems for assistive technologies when they are trying to interact with content. Please remove or change the following ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
	UNCONTAINED_LI:
		'All <code>&lt;li&gt;</code> list items must be placed inside <code>&lt;ul&gt;</code> unordered or <code>&lt;ol&gt;</code> ordered elements. This structure helps screen readers announce the list and its items accurately.',
	TABINDEX_ATTR: 'Element should not have a <code>tabindex</code> attribute greater than 0.',

	// Meta checks
	META_TITLE:
		'Missing page title! Please provide a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">page title.</a>',
	META_SCALABLE:
		'Remove the <code>user-scalable="no"</code> parameter in the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">viewport meta tag</a> in order to allow zooming.',
	META_MAX:
		'Ensure the <code>maximum-scale</code> parameter in the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">viewport meta tag</a> is not less than 2.',
	META_LANG:
		'Page language not declared! Please <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declare language on HTML tag.</a>',
	META_REFRESH: 'Page should not automatically refresh using a meta tag.',

	// Buttons
	BTN_EMPTY_LABELLEDBY:
		'Button has an <code>aria-labelledby</code> value that is empty or does not match the <code>id</code> value of another element on the page.',

	LABEL_IN_NAME:
		'The visible text for this element appears to be different than the accessible name, which may cause confusion for assistive technologies users. Please review: <hr> <strong {B}>Accessible Name</strong> <strong {C}>%(TEXT)</strong>',

};

export const testNames = {
  ALT_FILE_EXT: 'This alt text is a filename, not a description',
  ALT_MAYBE_BAD: 'This alt text is not made of machine-readable words',
  ALT_PLACEHOLDER: 'This alt text is meaningless placeholder text',
  ALT_UNPRONOUNCEABLE: 'This alt text is unpronounceable',
  EMBED_AUDIO: 'Does this audio have a transcript?',
  // EMBED_CUSTOM: 'Is this embedded content accessible?',
  EMBED_DATA_VIZ: 'Is this visualization accessible?',
  EMBED_VIDEO: 'Is this video accurately captioned?',
  HEADING_EMPTY: 'This heading has no text',
  HEADING_LONG: 'Can this heading be shorter?',
  HEADING_SKIPPED_LEVEL: 'This heading is tagged at the wrong level',
  IMAGE_ALT_TOO_LONG: 'Can this alt text be shorter?',
  IMAGE_DECORATIVE: 'Is this image actually meaningless?',
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
  MISSING_ALT: 'Invalid HTML: image has no alt attribute',
  QA_BLOCKQUOTE: 'Should this quote be a heading?',
  QA_FAKE_HEADING: 'Should this bold text be a heading?',
  QA_FAKE_LIST: 'Should this have list formatting?',
  QA_PDF: 'Is the linked document accessible?',
  QA_UPPERCASE: 'Is this uppercase text needed?',
  SUS_ALT: 'Are there redundant words in this alt text?',
  TABLES_EMPTY_HEADING: 'This header cell needs text',
  TABLES_MISSING_HEADINGS: 'This table needs a header row and/or column',
  TABLES_SEMANTIC_HEADING: 'Content headings should not be used inside tables',

  HEADING_EMPTY_WITH_IMAGE: 'This image is used as a heading, so it needs alt text',
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
