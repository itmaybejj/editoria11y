const ed11yLang = {

  // ESLint config:
  /* global Ed11y */
  /* exported ed11yLang */

  en : {

    // Main Panel =========================================
    toggleAccessibilityTools: 'Toggle accessibility tools',
    toggleDisabled: 'Editorially is disabled.',
    panelCount0 : 'No issues detected.',
    panelCountAllDismissed : 'All issues hidden.',
    panelCount1 : 'One issue detected.',
    panelCountMultiple: ' issues detected.',
    panelCountBase: '<span class=\'count\'>No</span> <span class=\'content-type\'>issues detected</span>.',
    panelControls: 'Editorially panel controls',
    buttonIssuesContent: 'Issues',
    buttonOutlineContent: 'Outline',
    buttonAltsContent: 'Alt Text',
    buttonAboutTitle: 'About this tool',
    buttonPrevContent: 'Previous',
    buttonFirstContent: 'First',
    buttonNextContent: 'Next',
    buttonShowHiddenAlert: 'Show 1 hidden alert',
    buttonShowHiddenAlerts: (count) => `Show ${count} hidden alerts`,
    panelCheckOutline: '<p>Check that this forms <a href=\'https://accessibility.princeton.edu/how/content/headings\'>a complete outline</a>:</p>',
    panelCheckAltText: '<p>Check <a href=\'https://accessibility.princeton.edu/how/content/alternative-text\'>alt text</a>, <a href=\'https://accessibility.princeton.edu/how/content/images-text\'>images of text</a>, &amp; <a href=\'https://webaim.org/techniques/captions/\'>captions</a>.</p>',
    panelHelp : `
    <p>Assistive technologies and search engines rely on well-structured content. <a href="https://itmaybejj.github.io/editoria11y/">Editoria11y</a> checks for common needs, such as image alternative text, meaningful heading outlines and well-named links. It is meant to supplement <a href='https://webaim.org/resources/evalquickref/'>testing the design and code</a>.</p>
    <p><a href='https://github.com/itmaybejj/editoria11y/issues' class='ed11y-small'>Report bugs & request changes <span aria-hidden="true">&raquo;</span></a></p>
    `,
    altLabelPrefix: 'Alt text: ',
    errorAltMissing: '(missing!)',
    errorAltNull: '(none; image marked as decorative)',
    errorOutlinePrefixSkippedLevel: '(flagged for skipped level) ',
    errorOutlinePrefixHeadingEmpty: '(empty heading) ',
    errorOutlinePrefixHeadingIsLong: '(flagged for length) ',

    // Errors and alerts ==================================

    consoleNotSupported: 'This browser can not run Editoria11y.',
    jumpedToInvisibleTip: 'The marked item may not be visible. Look for it inside the outlined container.',
    jumpedToAriaHiddenTip: 'The item with this issue may be invisible or off screen.',

    // Strings used in tests ==============================

    suspiciousWords: ['image of','graphic of','picture of','photo of','placeholder','spacer','tbd','todo'],
    meaninglessAlt: ['alt','chart','decorative','image','graphic','photo','placeholder','placeholder image','spacer','tbd','todo','to do'],
    // 'alt', 'image', 'photo', 'decorative', 'placeholder', 'placeholder image', 'spacer'
    linksUrls: ['http:/', 'https:/', '.asp', '.htm', '.php', '.edu/', '.com/'],
    linksMeaningless: /(learn|to|more|now|this|page|link|site|website|check|out|view|our|read|download|form|here|click|"|'|\?|\.|-|,|:|>|<|\s)+/g,
    linkStringsNewWindows: /window|\stab|download/g,

    // Tooltips base ======================================

    toggleManualCheck: 'manual check needed',
    toggleAlert: 'alert',
    toggleAriaLabel: (resultID, label) => `Accessibility issue ${resultID}, ${label}`,
    dismissOkButtonContent: 'Mark as checked and OK',
    dismissHideButtonContent: 'Hide alert',
    dismissOkSyncedButtonContent: 'Mark OK for all users',
    dismissHideSyncedButtonContent: 'Hide alert for me',
    undismissOKButton: 'Restore this alert marked as OK',
    undismissHideButton: 'Restore this hidden alert',
    undismissNotePermissions: 'This alert has been hidden by an administrator',
    elementDismissalHelpOK : `
    "OK" dismisses this for everyone, on this page.
    `,
    elementDismissalHelpHide : `
    "Hide" dismisses this for you, on this page.
    `,
    elementDismissalHelpAll : 'Site-wide changes can be made in Editoria11y\'s settings.',

    // Tooltips for heading tests =========================

    headingExample : `
        <ul>
            <li>Heading level 1
                <ul>
                    <li>Heading level 2: a topic
                        <ul><li>Heading level 3: a subtopic</li></ul></li>
                    <li>Heading level 2: a new topic</li>
                </ul>
            </li>
        </ul>`,

    headingLevelSkipped : {
      title: 'Manual check: was a heading level skipped?',
      tip: (prevLevel, level) =>
        `<p>Headings and subheadings are the page's table of contents. The <em>numbers</em> indicate indents, in a nesting relationship:</p>
            ${Ed11y.M.headingExample}
            <p>This heading skipped from level ${prevLevel} to level ${level}. From a screen reader, this sounds like content is missing.</p>
            <p>To fix: adjust levels to form an accurate outline, without gaps.</p>
            `,
    },

    headingEmpty : {
      title: 'Heading tag without any text',
      tip: () =>
        `<p>Headings and subheadings create a navigable table of contents for assistive devices. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>
            ${Ed11y.M.headingExample}
            <p>"Blank" headings create confusing gaps in this outline: they could mean the following content is still part of the previous section, or that the text was unpronounceable for some reason.</p>
            <p><strong>To fix:</strong> add text to this heading, or remove it.</p>
            `,
    },

    headingIsLong : {
      title: 'Manual check: long heading',
      tip: () =>
        `<p>Headings should be brief and clear. Assistive devices use them to create a navigable table of contents for the page. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>  
            ${Ed11y.M.headingExample}
            <p><strong>To fix:</strong> shorten this heading if possible, or remove the heading style if it was only applied to this text to provide visual emphasis.</p>
            `,
    },

    blockquoteIsShort : {
      title: 'Manual check: is this a blockquote?',
      tip: () =>
        '<p>Blockquote formatting tells screen readers that the text should be announced as a quotation. This was flagged because short blockquotes are sometimes actually headings. If this is a heading and not a quotation, use heading formatting instead, so this appears in the page outline.</p>',
    },

    // Tooltips for image tests =========================

    altAttributeExample :
            `<p>Note that a good alt conveys what an image <strong>communicates</strong>, not what it <strong>contains</strong>. A picture of a child kicking a ball might have been selected because of the setting, the child, the kick or the ball:</p>
            <ul>
                <li>Child happily kicking a ball on a summer day</li>
                <li>A.J. playing in the new team uniform</li>
                <li>A.J.'s game-winning kick curved in from the left sideline!</li>
                <li>The "medium" ball is the right size for this 9-year-old child</li>
            </ul>`,

    altAttributeProvided: (alt) =>
      `<p>This image's alt text is: <strong>"${alt}"</strong></p>`,

    altMissing : {
      title: 'Image has no alternative text attribute',
      tip: () =>
        `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.
            To fix: either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>
            ${Ed11y.M.altAttributeExample}`,
    },

    altNull : {
      title: 'Manual check: image has no alt text',
      tip: () =>
        `<p>Screen readers assume images with empty alt text are only for decoration (spacers and backgrounds), and do not mention they exist. If this image is meaningful, an alt should be provided.</p>
            ${Ed11y.M.altAttributeExample}`,
    },

    altURL : {
      title: 'Image\'s text alternative is a URL',
      tip: (alt) =>
        `${Ed11y.M.altAttributeProvided(alt)}
        <p>To fix: set this image's alternative text to a concise description of what this image means in this context.</p>
        ${Ed11y.M.altAttributeExample}`
      ,
    },
    altMeaningless : {
      title: 'Alt text is meaningless',
      tip: (alt) =>
        `${Ed11y.M.altAttributeProvided(alt)}
        <p>To fix: set this image's alternative text to a concise description of what this image means in this context.</p>
        ${Ed11y.M.altAttributeExample}`
      ,
    },
    altMeaninglessLinked : {
      title: 'Linked alt text is meaningless',
      tip: (alt) =>
        `${Ed11y.M.altAttributeProvided(alt)}
         <p>When a link includes an image, the image's alt text becomes part of the link text announced by screen readers.
            Links should clearly and concisely describe their destination; a URL (usually pronounced by the screen reader one letter at a time) does not.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "H T T P S colon forward slash forward slash example dot com forward slash aye bee oh you tee you ess</li>
            </ul>`
      ,
    },

    altURLLinked : {
      title: 'Linked image\'s text alternative is a URL',
      tip: (alt) =>
        `${Ed11y.M.altAttributeProvided(alt)}
        <p>When a link includes an image, the image's alt text becomes part of the link text announced by screen readers.
            Links should clearly and concisely describe their destination; a URL (usually pronounced by the screen reader one letter at a time) does not.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "H T T P S colon forward slash forward slash example dot com forward slash aye bee oh you tee you ess</li>
            </ul>`,
    },

    altImageOf : {
      title: 'Manual check: possibly redundant text in alt',
      tip: (alt) =>
        `${Ed11y.M.altAttributeProvided(alt)}
        <p>Screen readers <strong>announce</strong> they are describing an image when reading alt text, so 
            phrases like "image of" and "photo of" are usually redundant, sounding like "this image's alt is the alt of an image."</p>
            <p>Note that sometimes the phrase is not redundant and should be kept, because the image is an image of an image:</p>
            <ul><li>Redundant: "image of a VHS tape"</li>
            <li>Relevant: "image of a VHS tape being shown in history class"</li></ul>`
    },
    altImageOfLinked : {
      title: 'Manual check: possibly redundant text in linked image',
      tip: (alt) =>
        `${Ed11y.M.altAttributeProvided(alt)}
        <hr><p>Links should clearly and concisely describe their destination. Since words like "image," "graphic" or "photo" are redundant in text alternatives (screen readers already identify the image as an image), they often indicate that the image's text alternative is describing the image instead of the link.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "Stock photo of five people jumping and high fiving around a conference table, image"</li>
            </ul>`
    },

    altDeadspace : {
      title: 'Image\'s text alternative is unpronounceable',
      tip: (alt) =>
        `${Ed11y.M.altAttributeProvided(alt)}
        <p>To fix: add a descriptive alt, or provide a <em>completely</em> empty alt (alt="") to tell screen readers to ignore this image.</p>
            ${Ed11y.M.altAttributeExample}`,
    },

    altEmptyLinked : {
      title: 'Linked Image has no alt text',
      tip: () =>
        `<p>When a link is wrapped around an image, the image's alt text provides the link's title for screen readers</p>
        <p>To fix: set this image's alternative text to something that describes the link's destination, or add text to the link.</p>
            <ul>
                <li>Good linked alt: "Meaningful link tips"</li>
                <li>Bad linked alt: "Three happy dogs rolling in the grass"</li>
            </ul>
            `,
    },

    altLong : {
      title: 'Manual check: very long alternative text',
      tip: (alt) =>
        `<p>Image text alternatives are announced by screen readers as a single run-on sentence; listeners must listen to the entire alt a second time if they miss something. It is usually better to provide and reference a <em>visible</em> text alternative for complex images that need long descriptions. For example:</p>
            <ul><li>"Event poster; details provided in caption"</li>
            <li>"Chart showing our issues going to zero; details follow in table"</li></ul>
            ${Ed11y.M.altAttributeProvided(alt)}
            `,
    },

    altLongLinked : {
      title: 'Manual check: very long alternative text in linked image',
      tip: (alt) =>
        `<p>The alt text on a linked image is used to describe the link destination. Links should be brief, clear and concise, as screen reader users often listen to the list of links on the page to find content of interest. Long alternative text inside a link often indicates that the image's text alternative is describing the image instead rather than the link.</p>
        ${Ed11y.M.altAttributeProvided(alt)}`,
    },

    altPartOfLinkWithText : {
      title: 'Manual check: link contains both text and an image',
      tip: (alt) =>
        `<p>When a link includes an image, screen readers speak the image's alt text as part of the link.
            This can be confusing if the image's alt describes the image rather than the link.</p>
            <p>E.g., for a card-style link with both text and a stock photo, compare:</p>
            <ul>
                <li>"Link, five people jumping and high fiving around a conference table, image, about us"</li>
                <li>"Link, about us"</li>
            </ul>
            ${Ed11y.M.altAttributeProvided(alt)}
            <p>If this link is clearer without this alt, it may be better to use a blank alt, to tell screen readers to ignore the image.</p>
            `,
    },

    linkNoText : {
      title: 'Link with no accessible text',
      tip: () =>
        `<p>This link is either invisible and empty (e.g., a linked space character), or wrapped around something with no text alternative (an image with no alt attribute).</p>
            <p>Screen readers will either pause with an uninformative silence when they reach this link: <br>"Link, [...awkward pause where the link title should be...],"<br>or spell out the URL, character by character: <br>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</p>
            <p>To fix: add text if this should be a link, or delete it if it should not.</p>`,
    },

    linkTextIsURL : {
      title: 'Manual check: is this link text a URL?',
      tip: (text) =>
        `<p>This link's text is:<br> <strong>${text}</strong></p>
        <p>Links should be meaningful and concise. Readers often skim by link titles. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
         <p>A linked URL breaks this pattern; the reader has to read the preceding paragraph to figure out the link's purpose from context.</p>
            <ul>
                <li>Meaningful and concise link: "Tips for writing meaningful links"</li>
                <li>Linked URL, as pronounced by a screen reader: "H T T P S colon forward-slash forward-slash example dot com forward-slash tips forward-slash meaningful-links"</li>
            </ul>`,
    },

    linkTextIsGeneric : {
      title: 'Manual check: is this link meaningful and concise?',
      tip: (text) =>
        `<p>This link's text is: <strong>${text}</strong></p>
        <p>Readers skim for links. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
                <p>Generic links like "click here," "read more" or "download" expect the reader be reading slowly and carefully, such that they figure out each link's purpose from context for themselves. Few readers do this, so click-through rates on meaningless links are extremely poor.</p>
                <ul><li>Not meaningful: "<a href="https://www.google.com/search?q=writing+meaningful+links">Click here</a> to learn about meaningful links."</li>
                <li>Not concise: "<a href="https://www.google.com/search?q=writing+meaningful+links">Click here to learn about meaningful links</a>"</li>
                <li>Ideal: "Learn about <a href="https://www.google.com/search?q=writing+meaningful+links">meaningful links"</a></strong></li></ul>
                `
      ,
    },

    linkDocument : {
      title : 'Manual check: is the linked document accessible?',
      tip: () =>
        `<p>This automated checker helps ensure <strong><em>websites</em></strong> contain the features needed for accessible content, things like heading structure and text alternatives for images and audio. <strong>It is not able to help you check the documents you link.</strong></p>
        <p>Most mobile and assistive device users prefer to read text on Web pages, where content reflows to fit the screen. If the document linked here cannot be converted to a Web page, make sure the document is well structured (headings, lists, table headers) and provides alt text for its images.</p>
        <ul>
            <li>Tips for <a href='https://webaim.org/techniques/word/'>MS Word</a> &amp; <a href="https://support.google.com/docs/answer/6199477?hl=en&ref_topic=6039805">Google Docs</a></li>
            <li><a href='https://webaim.org/techniques/powerpoint/'>Slideshows</a> &amp; <a href='https://support.microsoft.com/en-us/office/make-your-excel-documents-accessible-to-people-with-disabilities-6cc05fc5-1314-48b5-8eb3-683e49b3e593'>Spreadsheets</a>
            <li><a href='https://webaim.org/techniques/acrobat/'>Documents formatted for print instead of screens (PDF)</a></li>
        </ul>`
      ,
    },

    linkNewWindow : {
      title: 'Manual check: is opening a new window expected?',
      tip: () =>
        `<p>Readers can always choose to open a link a new window. When a link forces open a new window, it can be confusing and annoying, especially for assistive device users who may wonder why their browser's "back" button is suddenly disabled.</p>
                <p>There are two general exceptions:</p>
                <ul>
                    <li>When the user is filling out a form, and opening a link in the same window would cause them to lose their work.</li>
                    <li>When the user is clearly warned a link will open a new window.</li>
                </ul>
                <p>To fix: set this link back its default target, or add a screen-reader accessible warning (text or an icon with alt text).</p>
                `
      ,
    },

    // Tooltips for Text QA ===============================

    tableNoHeaderCells : {
      title: 'Table has no header cells',
      tip: () => `
                <p>Tables are announced by screen readers as navigable data sets. Screen readers repeat row and column headers as needed to orient users while reading content cells.</p>
                <p>To fix:</p>
                <ul><li>If this table contains information that is meaningfully organized by row and column, edit the table's properties and specify whether the headers are in the first row, column or both.</li>
                <li>If this table does not contain rows and columns of data, but is simply being used for visual layout, it would be best to remove it. Tables overflow the page rather than reflowing the text to fit on mobile devices, and should only be used when horizontal relationships are necessary to understand the content.</li></ul>
            `,
    },

    tableContainsContentHeading : {
      title: 'Content heading inside a table',
      tip: () =>
        `<p>Content headings ("Heading 1", "Heading 2") form a navigable table of contents for screen reader users,  
        labelling all content <strong>until the next heading</strong>. Table headers label specific columns or rows within a table.</p> 
            <p></p>
            <table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">To illustrate: a <strong>table</strong> header in cell 2 would only label its column: cell B. <br><br>
            A <strong>content</strong> heading in cell 2 would label all subsequent text, reading from left to right: cells 3, A, B and C, as well as this text!</td></tr>
            <tr><td>A</td><td>B</td><td>C</td></table>
            <p>To fix: remove heading formatting on text inside table cells.</p>
            `
    },

    tableEmptyHeaderCell : {
      title: 'Empty table header cell',
      tip: () => `
                <p>When exploring tables, screen readers repeat table header cells as needed to orient users. 
                Without headers, it is very easy to get lost; screen reader users have to count columns and rows and try to remember which columns went with which rows.</p>
                <p>To fix: make sure each header cell in this table contains text.</p>
            `,
    },

    textPossibleList : {
      title: 'Manual check: should this have list formatting?',
      tip : (text) =>
        `<p>List formatting is structural:</p> 
            <ol><li>List formatting indents and reflows on overflow. Text aligns vertically with the line above it.</li>
            <li>Lists are machine-readable. Screen readers can orient their users, announcing this as "list item, 2 of 3."</li></ol>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;3. But this third item is just a sentence with a number in front of it. It wraps incorrectly, and screen readers do not know it is related to the other items in the list.</p>
            <p>To fix: if this "${text}" is part of a list, replace it with list formatting.</p>
            `,
    },

    textPossibleHeading : {
      title: 'Manual check: should this be a heading?',
      tip : () =>
        `<p>Headings and subheadings create a navigable table of contents for assistive devices. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>
            ${Ed11y.M.headingExample}
            <p>If this all-bold text is functioning visually as a heading, replace the bold formatting with the appropriately numbered heading.</p>
            `,
    },

    textUppercase : {
      title: 'Manual check: is this uppercase text needed?',
      tip : () =>
        `<p>UPPERCASE TEXT CAN BE MORE DIFFICULT TO READ FOR MANY PEOPLE, AND IS OFTEN INTERPRETED AS SHOUTING.</p>
         <p>Consider using sentence case instead, and using bold text or font changes for visual emphasis, or structural formatting like headings for emphasis that will also be announced by screen readers.</p>`,
    },

    embedVideo : {
      title: 'Manual check: is this video accurately captioned?',
      tip : () =>
        `<p>If a recorded video contains speech or meaningful sounds, it must provide captioning.</p>
            <p>Note that automatic, machine-generated captions must be proofread, and speaker identifications must be added, before being considered an equal alternative.</p>`,
    },

    embedAudio : {
      title: 'Manual check: is an accurate transcript provided?',
      tip : () =>
        `<p>If this audio contains speech, a text alternative must be provided on this page or linked.</p>
            <p>Note that automatic, machine-generated transcripts must be proofread, and speaker identifications must be added, before being considered an equal alternative</p>`,
    },

    embedVisualization : {
      title: 'Manual check: is this visualization accessible?',
      tip : () =>
        `<p>Visualization widgets are often difficult or impossible for assistive devices to operate, and can be difficult to understand for readers with low vision or colorblindness.</p>
            <p>Unless this particular widget has high visual contrast, can be operated by a keyboard and described by a screen reader, assume that an alternate format (text description, data table or downloadable spreadsheet) should also be provided.</p>`,
    },

    embedTwitter : {
      title: 'Manual check: is this embed a keyboard trap?',
      tip : () =>
        `<p>If embedded feeds are set to show a high number of items, keyboard users may have to click the tab key dozens or hundreds of times to exit the component.</p>
            <p>Check to make sure only a small number of items auto-load immediately or while scrolling. Having additional items load on request ("show more") is fine.</p>`,
    },

    embedCustom : {
      title: 'Manual check: is this embedded content accessible?',
      tip : () =>
        '<p>Please make sure images inside this embed have alt text, videos have captions, and interactive components can be <a href=\'https://webaim.org/techniques/keyboard/\'>operated by a keyboard</a>.</p>',
    }

  },
};

