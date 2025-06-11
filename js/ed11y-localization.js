const ed11yLang = {

  // ESLint config:
  /* global Ed11y */
  /* exported ed11yLang */

  en : {

    // Main Panel =========================================
    toggleAccessibilityTools: 'Toggle accessibility tools',
    toggleDisabled: 'No content available for Editoria11y to check.',
    panelCount0 : 'No issues detected.',
    panelCountAllDismissed : 'All issues hidden.',
    panelCount1 : 'One issue detected.',
    panelCountMultiple: ' issues detected.',
    panelCountBase: '<span class=\'count\'>No</span> <span class=\'content-type\'>issues detected</span>.',
    panelControls: 'Editorially',
    buttonToolsContent: 'Check headings & alt text', // todo Drupal
    buttonToolsActive: 'Hide headings & alt text',
    buttonOutlineContent: 'Headings',
    buttonAltsContent: 'Alt Text',
    buttonFirstContent: 'Go to first alert',
    buttonNextContent: 'Go to next alert',
    buttonPrevContent: 'Go to previous alert',
    buttonShowHiddenAlert: 'Show hidden alert',
    buttonHideHiddenAlert: 'Hide hidden alert',
    buttonShowHiddenAlerts: (count) => `Show ${count} hidden alerts`,
    buttonHideHiddenAlerts: (count) => `Hide ${count} hidden alerts`,
    buttonShowAlerts: 'Show accessibility alerts',
    buttonShowNoAlert: 'Show accessibility checker',
    buttonHideChecker: 'Hide accessibility checker',
    buttonHideAlerts: 'Hide accessibility alerts',
    panelCheckOutline: '<p class="ed11y-small">This shows the <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">heading outline</a>. Check that it matches how the content is organized visually.</p>',
    panelCheckAltText: '<p class="ed11y-small">Check that each image <a href="https://www.w3.org/WAI/tutorials/images/informative/" target="_blank" title="Opens in new tab">describes what it means in context</a>, and that there are no images of text.</p>',
    noImagesFound: 'No images found.',
    altLabelPrefix: 'Alt text: ',
    errorAltMissing: '(missing!)',
    errorAltNull: '(none; image marked as decorative)',
    errorOutlinePrefixSkippedLevel: '(flagged for skipped level) ',
    errorOutlinePrefixHeadingEmpty: '(empty heading) ',
    errorOutlinePrefixHeadingIsLong: '(flagged for length) ',

    // Errors and alerts ==================================

    consoleNotSupported: 'This browser can not run Editoria11y.',
    jumpedToInvisibleTip: 'Note: this content may not be visible. Look for it inside the outlined container.',
    jumpedToAriaHiddenTip: 'The item with this issue may be invisible or off screen.',

    // Strings used in tests ==============================

    suspiciousWords: ['image of','graphic of','picture of','photo of','photograph of','placeholder','spacer','tbd','todo', 'copyright', 'courtesy of', 'photo by'],
    meaninglessAlt: ['alt','chart','decorative','image','graphic','photo','placeholder','placeholder image','spacer','tbd','todo','to do'],
    badEndingForAlt: ['photo', 'image', 'photograph', 'picture'],
    linksUrls: ['http:/', 'https:/', '.asp', '.htm', '.php', '.edu/', '.com/'],
    linksMeaningless: /(learn|to|more|now|this|page|link|site|website|check|out|view|our|read|download|form|here|click|"|'|\?|\.|-|,|:|>|<|\s)+/g,
    linkStringsNewWindows: /window|\stab|download/g,

    // Tooltips ======================================

    toggleManualCheck: 'manual check needed',
    toggleAlert: 'alert',
    issue: 'Issue',
    toggleAriaLabel: (label) => `Accessibility ${label}`,
    transferFocus: 'Edit this content',
    dismissOkButtonContent: 'Mark as OK',
    dismissHideButtonContent: 'Mark as ignored',
    dismissActions: (count) => `${count} similar issues`, // 2.3.10
    dismissHideAllButton: 'Ignore all like this', // 2.3.10
    dismissOkAllButton: 'Mark all like this as OK', // 2.3.10
    dismissOkTitle: 'Hides this alert for all editors',
    dismissHideTitle: 'Hides this alert for you',
    undismissOKButton: 'Restore this alert marked as OK',
    undismissHideButton: 'Restore this hidden alert',
    undismissNotePermissions: 'This alert has been hidden by an administrator',
    reportsLink: 'Open site reports in new tab',
    closeTip: 'Close',
    panelHelpTitle: 'About this tool',
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

    // todo: update Drupal localization file.
    headingLevelSkipped : {
      title: 'Manual check: was a heading level skipped?',
      tip: (prevLevel, level) =>
        `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            ${Ed11y.M.headingExample}
            <p>This heading skipped from level ${prevLevel} to level ${level}. From a screen reader, this sounds like content is missing.</p>
            <p><strong>To fix:</strong> adjust levels to form an accurate outline, without gaps.</p>
            `,
    },

    headingEmpty : {
      title: 'Heading tag without any text',
      tip: () =>
        `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            ${Ed11y.M.headingExample}
            <p>Empty headings create confusing gaps in this outline: they could mean the following content is still part of the previous section, or that the text was unpronounceable for some reason.</p>
            <p><strong>To fix:</strong> add text to this heading, or delete this empty line.</p>
            `,
    },

    headingIsLong : {
      title: 'Manual check: long heading',
      tip: () =>
        `<p>Headings should be brief and clear. Assistive devices use them as a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">navigable table of contents</a> for the page. The numbers indicate indents in a nesting relationship:</p>  
            ${Ed11y.M.headingExample}
            <p><strong>To fix:</strong> shorten this heading if possible, or remove the heading style if it was only applied to this text to provide visual emphasis.</p>
            `,
    },

    blockquoteIsShort : {
      title: 'Manual check: is this a blockquote?',
      tip: () =>
        '<p>Blockquote formatting tells screen readers that the text should be announced as a quotation. This was flagged because short blockquotes are <em>sometimes</em> actually <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">headings</a>. If this is a heading and not a quotation, use heading formatting instead, so this appears in the page outline.</p>',
    },

    // Tooltips for image tests =========================

    altAttributeExample :
            `<p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative" target="_blank" title="Opens in new tab">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

    altMissing : {
      title: 'Image has no alternative text attribute',
      tip: () =>
        `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.</p>
            <p><strong>To fix:</strong> either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>
            ${Ed11y.M.altAttributeExample}`,
    },

    altNull : {
      title: 'Manual check: image has no alt text',
      tip: () =>
        `<p>Unless this image is purely decorative (a spacer icon or background texture), an alt should probably be provided. Photos in page content <strong>almost always need alt text.</strong> Since many screen reader users can see there is an image present, it can be very confusing to move the cursor across the place on the page where an image is visible, but hear nothing.</p>
        ${Ed11y.M.altAttributeExample}`,
    },

    altURL : {
      title: 'Image\'s text alternative is a URL',
      tip: (alt) =>
        `This image's alt text is "${alt}," which probably describes the file name, not the contents of the image.
        <p><strong>To fix:</strong> set this image's alternative text to a concise description of what this image means in this context.</p>
        ${Ed11y.M.altAttributeExample}`
      ,
    },
    altMeaningless : {
      title: 'Alt text is meaningless',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which was flagged for being common placeholder text.</p>
        <p><strong>To fix:</strong> set this image's alternative text to a concise description of what this image means in this context.</p>
        ${Ed11y.M.altAttributeExample}`
      ,
    },
    altMeaninglessLinked : {
      title: 'Linked alt text is meaningless',
      tip: (alt) =>
        `<p>When a link includes an image, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" target="_blank" title="opens in new tab">the image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination, even out of context.</p>
           <p>This image's alt text is "${alt}," which probably does not describe this link.</p>`
      ,
    },

    altURLLinked : {
      title: 'Linked image\'s text alternative is a URL',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which is probably a filename.</p>
        <p>When a link is wrapped around an image and there is no other text, the <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" target="_blank" title="Opens in new tab">image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination; a URL (usually pronounced by the screen reader one letter at a time) does not.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "H T T P S colon forward slash forward slash example dot com forward slash aye bee oh you tee you ess</li>
            </ul>`,
    },

    altImageOf : {
      title: 'Manual check: possibly redundant text in alt',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which mentions that this image is an image.</p>
        <p>Screen readers announce they are describing an image when reading alt text, so 
            phrases like "image of" and "photo of" are usually redundant in alt text; the screen reader user hears "image: image of something."</p>
            <p>Note that this is OK if the format is referring to the <strong>content</strong> of the image:</p>
            <ul><li>Format is redundant: "<em>photo of</em> a VHS tape"</li>
            <li>Format is relevant: "<em>photo of</em> a VHS tape in a photo album being discussed in a history class"</li></ul>`
    },
    altImageOfLinked : {
      title: 'Manual check: possibly redundant text in linked image',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which mentions that this image is an image.</p>
        <hr><p>Links should clearly and concisely describe their destination. Since words like "image," "graphic" or "photo" are already redundant in text alternatives (screen readers already identify the image as an image), their presence in a linked image usually means the image's text alternative is <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opens in new tab" target="_blank">describing the image instead of the link</a>.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "Image of five people jumping"</li>
            </ul>`
    },

    altDeadspace : {
      title: 'Image\'s text alternative is unpronounceable',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which only contains unpronounceable symbols and/or spaces. Screen readers will announce that an image is present, and then pause awkwardly: "image: ____."</p>
        <p><strong>To fix:</strong> add a descriptive alt, or provide a <em>completely</em> empty alt (alt="") if this is just an icon or spacer, and screen readers should ignore it.</p>
            ${Ed11y.M.altAttributeExample}`,
    },

    altEmptyLinked : {
      title: 'Linked Image has no alt text',
      tip: () =>
        `<p>When a link is wrapped around an image, the image's alt text <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opens in new tab" target="_blank">provides the link's title for screen readers</a>.</p>
        <p><strong>To fix:</strong> set this image's alternative text to something that describes the link's destination, or add text next to the image, within the link.</p>`,
    },

    altLong : {
      title: 'Manual check: very long alternative text',
      tip: (alt) =>
        `<p>Image text alternatives are announced by screen readers as a single run-on sentence; listeners must listen to the entire alt a second time if they miss something. If this cannot be reworded to something succinct, it is better to use the alt to reference a <em>visible</em> <a href="https://www.w3.org/WAI/tutorials/images/complex/" title="Opens in new tab" target="_blank">text alternative for complex images</a>. For example:</p>
            <ul><li>"Event poster; details follow in caption"</li>
            <li>"Chart showing our issues going to zero; details follow in table"</li></ul>
            This image's alt text is: <em>${alt}</em>
            `,
    },

    altLongLinked : {
      title: 'Manual check: very long alternative text in linked image',
      tip: (alt) =>
        `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opens in new tab" target="_blank">The alt text on a linked image is used to describe the link destination</a>. Links should be brief, clear and concise, as screen reader users often listen to the list of links on the page to find content of interest. Long alternative text inside a link often indicates that the image's text alternative is describing the image instead rather than the link.</p>
        This image's alt text is: <em>${alt}</em>`,
    },

    altPartOfLinkWithText : {
      title: 'Manual check: link contains both text and an image',
      tip: (alt) =>
        `<p>Screen readers will <a href="https://www.w3.org/WAI/tutorials/images/functional/" title="Opens in new tab" target="_blank">include the image's alt text when describing this link</a>.</p>
            <p>Check that the combined text is concise and meaningful:<br>"<em><strong>${alt}</strong></em>"</p>
            <p></p>
            <ul>
                <li>Keep alts that add relevant meaning:<br>"Buy (A Tigers v. Falcons ticket)."</li>
                <li>Edit unhelpful or irrelevant alts:<br>"Buy (A piece of paper with team logos on it)."</li>
                <li>Remove unnecessary alts:<br>"Buy Tigers v. Falcons tickets (A Tigers v. Falcons ticket)."</li>
            </ul>
        `, // 2.3.10.
    },

    linkNoTextExample: '<p>Screen readers will either say nothing when they reach this link: <br><em>"Link, [...awkward pause where the link title should be...],"</em><br>or read the URL: <br><em>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</em></p>',
    linkTextIgnored: (ignoredText) => `
    <p>Screen readers will only read the text of the link type indicator on this link:<br>
    <em>"<strong>${ignoredText}</strong>"</em></p>
    `,

    linkNoText : {
      title: 'Link with no accessible text',
      tip: (ignoredText) =>
        `<p>This link is either a typo (a linked space character), or a linked image with no text alternative.</p>
        ${ignoredText ? Ed11y.M.linkTextIgnored(ignoredText) : Ed11y.M.linkNoTextExample}
        <p><strong>To fix:</strong></p>
        <ul><li>If this a typo, delete it. Note that typo links can be hard to see if they are next to a "real" link: one will be on the text, one on a space.</li><li>If it is a real link, add text to describe where it goes.</li>`,
    },

    linkTextIsURL : {
      title: 'Manual check: is this link text a URL?',
      tip: (text) =>
        `<p>This link's text is:<br> <strong>${text}</strong></p>
        <p><a href="https://webaim.org/techniques/hypertext/link_text" title="Opens in new tab" target="_blank">Links should be meaningful and concise</a>. Readers often skim by link titles. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
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
                <p>Generic links like "click here," "read more" or "download" expect the reader be reading slowly and carefully enough to figure out each link's purpose from context. Few readers do this, so click-through rates on meaningless links are extremely poor.</p>
                <ul>
                <li>Ideal: "Learn about <a href="https://webaim.org/techniques/hypertext/link_text" title="Opens in new tab" target="_blank">meaningful links"</a></strong></li>
                <li>Not meaningful: "Click <a href="https://webaim.org/techniques/hypertext/link_text" title="Opens in new tab" target="_blank">here</a> to learn about meaningful links."</li>
                <li>Not concise: "<a href="https://webaim.org/techniques/hypertext/link_text" title="Opens in new tab" target="_blank">Click here to learn more about meaningful links</a>"</li>
                </ul>
                `
      ,
    },

    linkDocument : {
      title : 'Manual check: is the linked document accessible?',
      tip: () =>
        `<p>Many mobile and assistive device users struggle to read content in PDFs. PDFs generally do not allow for changing font sizes, and often contain features that are incompatible with screen readers.</p>
        <p>Ideally make the content of this linked PDF available on a Web page or in an editable document, and only link to this PDF as a "printable" alternative. If this PDF is the only way you are providing to access this content, you will need to <a href='https://webaim.org/techniques/acrobat/' target='_blank' title="Opens in new tab">manually check that the PDF is well-structured</a>, with headings, lists and table headers, and provides alt text for its images.</p>`,
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
                <p><strong>To fix:</strong> set this link back its default target, or add a screen-reader accessible warning (text or an icon with alt text).</p>
                `
      ,
    },

    // Tooltips for Text QA ===============================

    tableNoHeaderCells : {
      title: 'Table has no header cells',
      tip: () => `
                <p>To fix:</p>
                <ul><li>If this table contains data that is meaningfully organized by row and column, edit the table's properties and specify whether headers have been placed in the first row, column or both. This lets screen reader users hear the headers repeated while navigating the content.</li>
                <li>If this table does not contain rows and columns of data, but is instead being used for visual layout, remove it. Tables overflow the page rather than reflowing on mobile devices, and should only be used when the horizontal relationships are necessary to understand the content.</li></ul>
            `,
    },

    tableContainsContentHeading : {
      title: 'Content heading inside a table',
      tip: () =>
        `<p>To fix: remove heading formatting. Use row and column headers instead.</p>
        <p>Content headings ("Heading 1", "Heading 2") form a navigable table of contents for screen reader users,  
        labelling all content <strong>until the next heading</strong>. Table headers label specific columns or rows within a table.</p> 
            <p></p>
            <table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">To illustrate: a <strong>table</strong> header in cell 2 would only label its column: cell B. <br><br>
            A <strong>content</strong> heading in cell 2 would label all subsequent text, reading from left to right: cells 3, A, B and C, as well as this text!</td></tr>
            <tr><td>A</td><td>B</td><td>C</td></table>
            `
    },

    tableEmptyHeaderCell : {
      title: 'Empty table header cell',
      tip: () => `
                <p>When exploring tables, screen readers repeat table header cells as needed to orient users. 
                Without headers, it is very easy to get lost; screen reader users have to count columns and rows and try to remember which columns went with which rows.</p>
                <p><strong>To fix:</strong> make sure each header cell in this table contains text.</p>
            `,
    },

    textPossibleList : {
      title: 'Manual check: should this have list formatting?',
      tip : (text) =>
        `<p>List formatting is structural:</p> 
            <ol><li>List formatting indents and reflows on overflow. Text aligns vertically with the line above it.</li>
            <li>Lists are machine-readable. Screen readers can orient their users, announcing this as "list item, 2 of 3."</li></ol>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;3. But this third item is just a sentence with a number in front of it. It wraps incorrectly, and screen readers do not know it is related to the other items in the list.</p>
            <p><strong>To fix:</strong> if this "${text}" is part of a list, replace it with list formatting.</p>
            `,
    },

    textPossibleHeading : {
      title: 'Manual check: should this be a heading?',
      tip : () =>
        `<p>If this all-bold line of text is functioning as a heading for the following text rather than a visual emphasis, replace the bold formatting with the appropriately numbered heading. Otherwise, dismiss this alert.</p>
        <p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" title="Opens in new tab" target="_blank">navigable table of contents</a> for assistive devices. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>
            ${Ed11y.M.headingExample}
            
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
        `<p>If a recorded video contains speech or meaningful sounds, it must <a href="https://www.w3.org/WAI/media/av/captions/" title="Opens in new window" target="_blank">provide captions</a>.</p>
            <p>Note that automatic, machine-generated captions must be proofread, and speaker identifications must be added, before being considered an equal alternative.</p>`,
    },

    embedAudio : {
      title: 'Manual check: is an accurate transcript provided?',
      tip : () =>
        `<p>If this audio contains speech, a <a href="https://www.w3.org/WAI/media/av/transcribing/" target="_blank" title="Opens in new window">text alternative</a> must be provided on this page or linked.</p>
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

