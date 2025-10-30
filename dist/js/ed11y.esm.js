
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 3.0.0
  * @author undefined
  * @license GPLv2
  * @copyright © 2020 - 2025 Toronto Metropolitan University.
  * @contact undefined
  * GitHub: git+https://itmaybejj@github.com/itmaybejj/editoria11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
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
            ${ed11yLang.en.headingExample}
            <p>This heading skipped from level ${prevLevel} to level ${level}. From a screen reader, this sounds like content is missing.</p>
            <p><strong>To fix:</strong> adjust levels to form an accurate outline, without gaps.</p>
            `,
    },

    headingEmpty : {
      title: 'Heading tag without any text',
      tip: () =>
        `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            ${ed11yLang.en.headingExample}
            <p>Empty headings create confusing gaps in this outline: they could mean the following content is still part of the previous section, or that the text was unpronounceable for some reason.</p>
            <p><strong>To fix:</strong> add text to this heading, or delete this empty line.</p>
            `,
    },

    headingIsLong : {
      title: 'Manual check: long heading',
      tip: () =>
        `<p>Headings should be brief and clear. Assistive devices use them as a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">navigable table of contents</a> for the page. The numbers indicate indents in a nesting relationship:</p>  
            ${ed11yLang.en.headingExample}
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
            ${ed11yLang.en.altAttributeExample}`,
    },

    altNull : {
      title: 'Manual check: image has no alt text',
      tip: () =>
        `<p>Unless this image is purely decorative (a spacer icon or background texture), an alt should probably be provided. Photos in page content <strong>almost always need alt text.</strong> Since many screen reader users can see there is an image present, it can be very confusing to move the cursor across the place on the page where an image is visible, but hear nothing.</p>
        ${ed11yLang.en.altAttributeExample}`,
    },

    altURL : {
      title: 'Image\'s text alternative is a URL',
      tip: (alt) =>
        `This image's alt text is "${alt}," which probably describes the file name, not the contents of the image.
        <p><strong>To fix:</strong> set this image's alternative text to a concise description of what this image means in this context.</p>
        ${ed11yLang.en.altAttributeExample}`
      ,
    },
    altMeaningless : {
      title: 'Alt text is meaningless',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which was flagged for being common placeholder text.</p>
        <p><strong>To fix:</strong> set this image's alternative text to a concise description of what this image means in this context.</p>
        ${ed11yLang.en.altAttributeExample}`
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
            ${ed11yLang.en.altAttributeExample}`,
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
        ${ignoredText ? ed11yLang.en.linkTextIgnored(ignoredText) : ed11yLang.en.linkNoTextExample}
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
            ${ed11yLang.en.headingExample}
            
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

const defaultOptions = {
  // Target area to check
  checkRoot: 'body',

  // Exclusions
  containerIgnore: '.sa11y-ignore',
  contrastIgnore: '.sr-only',
  outlineIgnore: '',
  headerIgnore: '',
  headerIgnoreSpan: '',
  headerIgnoreStrings: '',
  imageIgnore: '',
  linkIgnore: '',
  linkIgnoreSpan: '',
  linkIgnoreStrings: '',

  // Control panel settings
  aboutContent: '',
  panelPosition: 'right',
  showMovePanelToggle: true,
  checkAllHideToggles: false,
  developerChecksOnByDefault: false,

  // Page outline
  showHinPageOutline: false,
  showTitleInPageOutline: true,

  // Image outline
  showImageOutline: true,
  editImageURLofCMS: '',
  relativePathImageSRC: '',
  relativePathImageID: '',
  ignoreEditImageURL: [],
  ignoreEditImageClass: [],

  // Other features
  delayCheck: 0,
  delayCustomCheck: 500,
  detectSPArouting: false,
  doNotRun: '',
  headless: false,
  selectorPath: false,
  shadowComponents: '',
  autoDetectShadowComponents: false,

  // Annotations
  showGoodImageButton: true,
  showGoodLinkButton: true,
  dismissAnnotations: true,
  dismissAll: true,
  ignoreHiddenOverflow: '',
  insertAnnotationBefore: '',

  // Readability
  readabilityPlugin: true,
  readabilityRoot: 'body',
  readabilityIgnore: '',

  // Contrast
  contrastPlugin: true,
  contrastAAA: false,
  contrastAPCA: false,

  // Other plugins
  customChecks: false,
  linksAdvancedPlugin: true,
  formLabelsPlugin: true,
  embeddedContentPlugin: true,
  developerPlugin: true,
  externalDeveloperChecks: false,
  colourFilterPlugin: true,
  exportResultsPlugin: false,

  // Shared properties for some checks
  susAltStopWords: '',
  linkStopWords: '',
  extraPlaceholderStopWords: '',
  imageWithinLightbox: '',

  // All checks
  checks: {
    // Heading checks
    HEADING_SKIPPED_LEVEL: true,
    HEADING_EMPTY_WITH_IMAGE: true,
    HEADING_EMPTY: true,
    HEADING_FIRST: true,
    HEADING_LONG: {
      maxLength: 170,
    },
    HEADING_MISSING_ONE: true,

    // Image checks
    MISSING_ALT_LINK: true,
    MISSING_ALT_LINK_HAS_TEXT: true,
    MISSING_ALT: true,
    IMAGE_DECORATIVE_CAROUSEL: {
      sources: '.carousel',
    },
    LINK_IMAGE_NO_ALT_TEXT: true,
    LINK_IMAGE_TEXT: true,
    IMAGE_FIGURE_DECORATIVE: true,
    IMAGE_DECORATIVE: true,
    LINK_ALT_FILE_EXT: true,
    ALT_FILE_EXT: true,
    LINK_PLACEHOLDER_ALT: true,
    ALT_PLACEHOLDER: true,
    LINK_SUS_ALT: true,
    SUS_ALT: true,
    LINK_IMAGE_LONG_ALT: {
      maxLength: 250,
    },
    IMAGE_ALT_TOO_LONG: {
      maxLength: 250,
    },
    LINK_IMAGE_ALT: {
      dismissAll: true,
    },
    LINK_IMAGE_ALT_AND_TEXT: true,
    IMAGE_FIGURE_DUPLICATE_ALT: true,
    IMAGE_PASS: {
      dismissAll: true,
    },
    ALT_UNPRONOUNCEABLE: true,
    LINK_ALT_UNPRONOUNCEABLE: true,
    ALT_MAYBE_BAD: {
      minLength: 15,
    },
    LINK_ALT_MAYBE_BAD: {
      minLength: 15,
    },

    // Link checks
    DUPLICATE_TITLE: {
      dismissAll: true,
    },
    LINK_EMPTY_LABELLEDBY: true,
    LINK_EMPTY_NO_LABEL: true,
    LINK_STOPWORD: true,
    LINK_STOPWORD_ARIA: true,
    LINK_SYMBOLS: true,
    LINK_CLICK_HERE: true,
    LINK_DOI: {
      dismissAll: true,
    },
    LINK_URL: {
      maxLength: 40,
    },
    LINK_LABEL: {
      dismissAll: true,
    },
    LINK_EMPTY: true,
    LINK_IDENTICAL_NAME: {
      dismissAll: true,
    },
    LINK_NEW_TAB: {
      dismissAll: true,
    },
    LINK_FILE_EXT: true,

    // Form labels checks
    LABELS_MISSING_IMAGE_INPUT: true,
    LABELS_INPUT_RESET: true,
    LABELS_MISSING_LABEL: true,
    LABELS_ARIA_LABEL_INPUT: true,
    LABELS_NO_FOR_ATTRIBUTE: true,
    LABELS_PLACEHOLDER: true,

    // Embedded content checks
    EMBED_AUDIO: {
      sources: '',
    },
    EMBED_VIDEO: {
      sources: '',
    },
    EMBED_DATA_VIZ: {
      sources: '',
    },
    EMBED_UNFOCUSABLE: true,
    EMBED_MISSING_TITLE: true,
    EMBED_GENERAL: true,

    // Quality assurance checks
    QA_BAD_LINK: {
      sources: '',
    },
    QA_STRONG_ITALICS: true,
    QA_IN_PAGE_LINK: true,
    QA_DOCUMENT: {
      sources: '',
      dismissAll: true,
    },
    QA_PDF: {
      dismissAll: true,
    },
    QA_BLOCKQUOTE: true,
    TABLES_MISSING_HEADINGS: true,
    TABLES_SEMANTIC_HEADING: true,
    TABLES_EMPTY_HEADING: true,
    QA_FAKE_HEADING: true,
    QA_FAKE_LIST: true,
    QA_UPPERCASE: true,
    QA_UNDERLINE: true,
    QA_SUBSCRIPT: true,
    QA_NESTED_COMPONENTS: {
      sources: '',
    },
    QA_JUSTIFY: true,
    QA_SMALL_TEXT: true,

    // Meta checks
    META_LANG: true,
    META_SCALABLE: true,
    META_MAX: true,
    META_REFRESH: true,

    // Developer checks
    DUPLICATE_ID: true,
    META_TITLE: true,
    UNCONTAINED_LI: true,
    TABINDEX_ATTR: true,
    HIDDEN_FOCUSABLE: true,
    LABEL_IN_NAME: true,
    BTN_EMPTY: true,
    BTN_EMPTY_LABELLEDBY: true,
    BTN_ROLE_IN_NAME: true,

    // Contrast checks
    CONTRAST_WARNING: {
      dismissAll: true,
    },
    CONTRAST_INPUT: true,
    CONTRAST_ERROR: true,
    CONTRAST_PLACEHOLDER: true,
    CONTRAST_PLACEHOLDER_UNSUPPORTED: true,
    CONTRAST_ERROR_GRAPHIC: true,
    CONTRAST_WARNING_GRAPHIC: {
      dismissAll: true,
    },
    CONTRAST_UNSUPPORTED: {
      dismissAll: true,
    },
  },
};

/* Translation object */
const Lang = {
  langStrings: {},
  addI18n(strings) {
    this.langStrings = strings;
  },
  _(string) {
    return this.translate(string);
  },
  sprintf(string, ...args) {
    let transString = this._(string);
    transString = this.prepHTML(transString);

    if (args && args.length) {
      args.forEach((arg) => {
        transString = transString.replace(/%\([a-zA-z]+\)/, arg);
      });
    }
    return transString;
  },
  translate(string) {
    return this.langStrings[string] || string;
  },
  prepHTML($el) {
    return $el.replaceAll(/<hr>/g, '<hr aria-hidden="true">')
      .replaceAll(/<a[\s]href=/g, '<a target="_blank" rel="noopener noreferrer" href=')
      .replaceAll(/<\/a>/g, `<span class="visually-hidden"> (${Lang._('NEW_TAB')})</span></a>`)
      .replaceAll(/{C}/g, 'class="colour"')
      .replaceAll(/{B}/g, 'class="badge"')
      .replaceAll(/{ALT}/g, `<strong class="badge">${Lang._('ALT')}</strong>`)
      .replaceAll(/{L}/g, `<strong class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></strong>`);
  },
};

const Constants = (function myConstants() {
  /* **************** */
  /* Initialize Roots */
  /* **************** */
  const Root = {};
  function initializeRoot(desiredRoot, desiredReadabilityRoot) {
    Root.areaToCheck = document.querySelector(desiredRoot);
    if (!Root.areaToCheck) {
      Root.areaToCheck = document.querySelector('body');
    }

    // Readability target area to check.
    Root.Readability = document.querySelector(desiredReadabilityRoot);
    if (!Root.Readability) {
      if (!Root.areaToCheck) {
        Root.Readability = document.querySelector('body');
      } else {
        // If desired root area is not found, use the root target area.
        Root.Readability = Root.areaToCheck;

        // Create a warning if the desired readability root is not found.
        const { readabilityDetails, readabilityToggle } = Constants.Panel;
        const readabilityOn = readabilityToggle?.getAttribute('aria-pressed') === 'true';
        if (readabilityDetails && readabilityOn) {
          const note = document.createElement('div');
          note.id = 'readability-alert';
          note.innerHTML = `<hr aria-hidden="true"><p>${Lang.sprintf('MISSING_READABILITY_ROOT',
            Root.areaToCheck.tagName.toLowerCase(), desiredReadabilityRoot)}</p>`;
          readabilityDetails.insertAdjacentElement('afterend', note);
        }
      }
    }
  }

  /* **************** */
  /* Global constants */
  /* **************** */
  const Global = {};
  function initializeGlobal(option) {
    Global.html = document.querySelector('html');
    Global.headless = option.headless;
    Global.panelPosition = option.panelPosition;
    Global.dismissAnnotations = option.dismissAnnotations;
    Global.aboutContent = option.aboutContent;
    Global.contrastAPCA = option.contrastAPCA;
    Global.contrastSuggestions = option.contrastSuggestions;
    Global.contrastAAA = option.contrastAAA;
    Global.shadowDetection = option.shadowComponents.length > 0 || option.autoDetectShadowComponents === true;

    // Toggleable plugins
    Global.developerPlugin = option.developerPlugin;
    Global.colourFilterPlugin = option.colourFilterPlugin;
    Global.checkAllHideToggles = option.checkAllHideToggles;
    Global.exportResultsPlugin = option.exportResultsPlugin;
    Global.readabilityPlugin = option.readabilityPlugin;
    Global.showImageOutline = option.showImageOutline;
    Global.editImageURLofCMS = option.editImageURLofCMS;
    Global.relativePathImageSRC = option.relativePathImageSRC;
    Global.relativePathImageID = option.relativePathImageID;
    Global.ignoreEditImageURL = option.ignoreEditImageURL;
    Global.ignoreEditImageClass = option.ignoreEditImageClass;
    Global.showMovePanelToggle = option.showMovePanelToggle;

    // A11y: Determine scroll behaviour
    let reducedMotion = false;
    if (typeof window.matchMedia === 'function') {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    }
    Global.scrollBehaviour = (!reducedMotion || reducedMotion.matches) ? 'auto' : 'smooth';

    // i18n
    Global.langDirection = (Global.html.getAttribute('dir') === 'rtl') ? 'rtl' : 'ltr';

    // Check for document types.
    const documentSources = option.checks.QA_DOCUMENT.sources;
    const defaultDocumentSources = 'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://drive.google.com/file"], a[href^="https://docs.google."], a[href^="https://sway."]';
    if (documentSources) {
      Global.documentSources = `${defaultDocumentSources}, ${documentSources}`;
    } else {
      Global.documentSources = defaultDocumentSources;
    }

    /* ********************** */
    /* Embedded Content Setup */
    /* ********************** */

    // Video sources.
    const videoSources = option.checks.EMBED_VIDEO.sources;
    const defaultVideoSources = 'video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"]';
    if (videoSources) {
      const videos = videoSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.VideoSources = `${defaultVideoSources}, ${videos.join(', ')}`;
    } else {
      Global.VideoSources = defaultVideoSources;
    }

    // Audio sources.
    const audioSources = option.checks.EMBED_AUDIO.sources;
    const defaultAudioSources = 'audio, [src*="soundcloud.com"], [src*="simplecast.com"], [src*="podbean.com"], [src*="buzzsprout.com"], [src*="blubrry.com"], [src*="transistor.fm"], [src*="fusebox.fm"], [src*="libsyn.com"], [src*="spotify.com"], [src*="podcasts.apple.com"], [src*="castbox.fm"], [src*="megaphone.fm"], [src*="spreaker.com"], [src*="anchor.fm"], [src*="rss.com"], [src*="redcircle.com"]';
    if (audioSources) {
      const audio = audioSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.AudioSources = `${defaultAudioSources}, ${audio.join(', ')}`;
    } else {
      Global.AudioSources = defaultAudioSources;
    }

    // Data viz sources.
    const dataVizSources = option.checks.EMBED_DATA_VIZ.sources;
    const defaultDataVizSources = '[src*="datastudio"], [src*="tableau"], [src*="lookerstudio"], [src*="powerbi"], [src*="qlik"]';
    if (dataVizSources) {
      const data = dataVizSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.VisualizationSources = `${defaultDataVizSources}, ${data.join(', ')}`;
    } else {
      Global.VisualizationSources = defaultDataVizSources;
    }

    // Embedded content all
    Global.AllEmbeddedContent = `${Global.VideoSources}, ${Global.AudioSources}, ${Global.VisualizationSources}`;
  }

  /* *************** */
  /* Panel constants */
  /* *************** */
  const Panel = {};
  function initializePanelSelectors() {
    const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;

    Panel.panel = Sa11yPanel.getElementById('panel');
    Panel.content = Sa11yPanel.getElementById('panel-content');
    Panel.controls = Sa11yPanel.getElementById('panel-controls');

    Panel.outline = Sa11yPanel.getElementById('outline-panel');
    Panel.outlineContent = Sa11yPanel.getElementById('outline-content');
    Panel.outlineList = Sa11yPanel.getElementById('outline-list');
    Panel.outlineHeader = Sa11yPanel.getElementById('outline-header');

    Panel.images = Sa11yPanel.getElementById('images-panel');
    Panel.imagesContent = Sa11yPanel.getElementById('images-content');
    Panel.imagesList = Sa11yPanel.getElementById('images-list');
    Panel.imagesHeader = Sa11yPanel.getElementById('images-header');

    Panel.notifBadge = Sa11yPanel.getElementById('notification-badge');
    Panel.notifCount = Sa11yPanel.getElementById('notification-count');
    Panel.notifText = Sa11yPanel.getElementById('notification-text');
    Panel.status = Sa11yPanel.getElementById('status');

    // Page Issues
    Panel.pageIssues = Sa11yPanel.getElementById('page-issues');
    Panel.pageIssuesList = Sa11yPanel.getElementById('page-issues-list');
    Panel.pageIssuesHeader = Sa11yPanel.getElementById('page-issues-header');
    Panel.pageIssuesContent = Sa11yPanel.getElementById('page-issues-content');

    // Settings panel
    Panel.settings = Sa11yPanel.getElementById('settings-panel');
    Panel.settingsHeader = Sa11yPanel.getElementById('settings-header');
    Panel.settingsContent = Sa11yPanel.getElementById('settings-content');

    // Settings toggles
    Panel.developerToggle = Sa11yPanel.getElementById('developer-toggle');
    Panel.readabilityToggle = Sa11yPanel.getElementById('readability-toggle');
    Panel.themeToggle = Sa11yPanel.getElementById('theme-toggle');
    Panel.developerItem = Sa11yPanel.getElementById('developer-item');
    Panel.readabilityItem = Sa11yPanel.getElementById('readability-item');
    Panel.darkModeItem = Sa11yPanel.getElementById('dark-mode-item');
    Panel.colourPanel = Sa11yPanel.getElementById('panel-colour-filters');
    Panel.colourFilterItem = Sa11yPanel.getElementById('colour-filter-item');
    Panel.colourFilterSelect = Sa11yPanel.getElementById('colour-filter-select');
    Panel.colourFilterIcon = Sa11yPanel.getElementById('filter-icon');

    // Buttons
    Panel.toggle = Sa11yPanel.getElementById('toggle');
    Panel.outlineToggle = Sa11yPanel.getElementById('outline-toggle');
    Panel.imagesToggle = Sa11yPanel.getElementById('images-toggle');
    Panel.settingsToggle = Sa11yPanel.getElementById('settings-toggle');
    Panel.movePanelToggle = Sa11yPanel.getElementById('move-panel');
    Panel.skipButton = Sa11yPanel.getElementById('skip-button');
    Panel.dismissButton = Sa11yPanel.getElementById('dismiss-button');
    Panel.dismissTooltip = Sa11yPanel.getElementById('dismiss-tooltip');
    Panel.skipToPageIssues = Sa11yPanel.getElementById('skip-to-page-issues');
    Panel.exportHTML = Sa11yPanel.getElementById('export-html');
    Panel.exportCSV = Sa11yPanel.getElementById('export-csv');

    // Alerts
    Panel.alert = Sa11yPanel.getElementById('panel-alert');
    Panel.alertText = Sa11yPanel.getElementById('panel-alert-text');
    Panel.alertPreview = Sa11yPanel.getElementById('panel-alert-preview');
    Panel.alertClose = Sa11yPanel.getElementById('close-alert');

    // Readability
    Panel.readability = Sa11yPanel.getElementById('readability-panel');
    Panel.readabilityInfo = Sa11yPanel.getElementById('readability-info');
    Panel.readabilityDetails = Sa11yPanel.getElementById('readability-details');
  }

  /* ***************** */
  /* Readability Setup */
  /* ***************** */
  const Readability = {};
  function initializeReadability(option) {
    if (option.readabilityPlugin) {
      // Set `readabilityLang` property based on language file.
      Readability.Lang = Lang._('LANG_CODE').substring(0, 2);

      // Supported readability languages.
      const supported = [
        'en',
        'fr',
        'es',
        'de',
        'nl',
        'it',
        'sv',
        'fi',
        'da',
        'no',
        'nb',
        'nn',
        'pt',
      ];

      // Turn off readability if page language is not defined.
      const pageLang = Constants.Global.html.getAttribute('lang');
      if (!pageLang) {
        Readability.Plugin = false;
      } else {
        // Turn off readability if page language is not supported.
        const pageLangLowerCase = pageLang.toLowerCase().substring(0, 2);
        if (!supported.includes(pageLangLowerCase) || !supported.includes(Readability.Lang)) {
          Readability.Plugin = false;
        } else {
          Readability.Plugin = true;
        }
      }
    }
  }

  /* **************** */
  /* Exclusions Setup */
  /* **************** */
  const Exclusions = {};
  function initializeExclusions(option) {
    // List of Sa11y's interface components.
    Exclusions.Sa11yElements = ['sa11y-heading-label', 'sa11y-heading-anchor', 'sa11y-annotation', 'sa11y-tooltips', 'sa11y-panel-tooltips', 'sa11y-control-panel', '#sa11y-colour-filters', '#sa11y-colour-filters *'];

    // Global elements to exclude.
    const exclusions = ['style', 'script', 'noscript'];

    // Main container exclusions.
    Exclusions.Container = ['#wpadminbar', '#wpadminbar *', ...exclusions];
    if (option.containerIgnore) {
      const containerSelectors = option.containerIgnore.split(',').map((item) => item.trim());
      Exclusions.Container = Exclusions.Container.concat(
        containerSelectors.flatMap((item) => [`${item} *`, item]),
      );
    }

    // Contrast exclusions
    Exclusions.Contrast = ['link', 'hr', 'option', 'audio', 'audio *', 'video', 'video *', 'input[type="color"]', 'input[type="range"]', 'progress', 'progress *', 'meter', 'meter *', 'iframe', 'svg title', 'svg desc', ...exclusions];
    if (option.contrastIgnore) {
      Exclusions.Contrast = option.contrastIgnore
        .split(',')
        .map(($el) => $el.trim())
        .flatMap(($el) => [$el, `${$el} *`])
        .concat(Exclusions.Contrast);
    }

    // Ignore specific regions for readability module.
    Exclusions.Readability = ['nav li', '[role="navigation"] li', ...exclusions];
    if (option.readabilityIgnore) {
      Exclusions.Readability = option.readabilityIgnore
        .split(',')
        .map(($el) => $el.trim())
        .flatMap(($el) => [$el, `${$el} *`])
        .concat(Exclusions.Readability);
    }

    // Ignore specific headings.
    Exclusions.Headings = option.headerIgnore
      ? option.headerIgnore.split(',').map(($el) => $el.trim())
      : [];

    // Ignore specific classes within headings.
    Exclusions.HeaderSpan = option.headerIgnoreSpan
      ? option.headerIgnoreSpan.split(',').map(($el) => $el.trim())
      : [];

    // Don't add heading label or include in panel.
    Exclusions.Outline = option.outlineIgnore
      ? option.outlineIgnore.split(',').map(($el) => $el.trim())
      : [];

    // Ignore specific images.
    Exclusions.Images = ['[role="presentation"]'];
    if (option.imageIgnore) {
      Exclusions.Images = option.imageIgnore.split(',').map(($el) => $el.trim()).concat(Exclusions.Images);
    }

    // Ignore specific links
    Exclusions.Links = ['.anchorjs-link'];
    if (option.linkIgnore) {
      Exclusions.Links = option.linkIgnore.split(',').map(($el) => $el.trim()).concat(Exclusions.Links);
    }

    // Ignore specific classes within links.
    Exclusions.LinkSpan = option.linkIgnoreSpan
      ? option.linkIgnoreSpan.split(',').map(($el) => $el.trim())
      : [];
  }

  return {
    initializeRoot,
    Root,
    initializeGlobal,
    Global,
    initializePanelSelectors,
    Panel,
    initializeReadability,
    Readability,
    initializeExclusions,
    Exclusions,
  };
}());

const State = {
  version: '3.0.0',
  running: false,
  watching: [],
  results: [],
  seen: [],
  ignoreAll: false,
  totalCount: 0,
  warningCount: 0,
  errorCount: 0,
  dismissedCount: 1,
  dismissedAlerts: {},
  options: {},
  activeRange: false,
  incremental: false,
  interaction: false,
  forceFullCheck: false,
  browserSpeed: 1,
  browserLag: 0,
  loopStop: false,
  currentPage: window.location.pathname,
  elements: [], // to be replaced by Sa11y.
  roots: [],
  oldResults: [],
  headingOutline: [],

  /* Panel initial state */
  once: false,
  disabled: false,
  onLoad: true,
  open: false,
  showPanel: false,
  nextText: '',
  panelAttachTo: document.body,

  /* Annotations initial states */
  jumpList: [],
  lastOpenTip: -1,
  viaJump: false,
  toggledFrom: false,
  scrollPending: false,
  scrollTicking: false,
  openTip: {
    button: false,
    tip: false,
  },
  positionedFrames: [],
  editableHighlight: [],
  recentlyAddedNodes: [],
};

const Theme = {};

const UI$1 = {
  imageAlts: [],
  attachCSS: ()=>{},
};

const M = {};

const Options = (function options() {
  let ed11yLang = {};
  let ed11yDefaults = {

    // Relative or absolute
    //cssUrls: false, // ['/folder/editoria11y.css','/folder/custom.css']
    cssUrls: false,

    // Only check within these containers, e.g. "#main, footer." Default is to look for <main> and fall back to <body>.
    checkRoots: false,
    fixedRoots: false, // Array of specific nodes, overrides previous.
    /* e.g:
    fixedRoots: [
      {
         root: direct domReference
         framePositioner: direct domReference or false
      }
    ]
    */

    // Shadow components inside the checkroot to check within, e.g., 'accordion, spa-content'
    shadowComponents: false,
    autoDetectShadowComponents: true,

    // Containers to globally ignore, e.g., "header *, .card *"
    ignoreElements: false,

    // Provide list of test keys; get from localization file or results object.
    // @todo merge provide translation layer or document change.
    ignoreTests: false, //e.g. ['linkNewWindow', 'textUppercase']

    // Ignore Aria on these elements (Gutenberg labels headings while editing.)
    ignoreAriaOnElements: false, // e.g. 'h1,h2,h3,h4,h5,h6'
    ignoreTextInElements: false, // e.g. '.inner-node-hidden-in-CSS'

    // Disable tests on specific elements
    // Include and modify this entire object in your call
    ignoreByKey: {
      'p': 'table p',
      // 'h': false,
      'img': '[aria-hidden], [aria-hidden] img, ' +
        '[role="presentation"], ' +
        'a[href][aria-label] img, button[aria-label] img, ' +
        'a[href][aria-labelledby] img, button[aria-labelledby] img',
      'a': '[aria-hidden][tabindex]', // disable link text check on properly disabled links
      // 'li': false,
      // 'blockquote': false,
      // 'iframe': false,
      // 'audio': false,
      // 'video': false,
      'table': '[role="presentation"]',
    },

    headingsOnlyFromCheckRoots: false, // Whether the Headings panel shows all headings on page or only from checked content.

    // Set alertModes
    // 'headless': do not draw interface
    // 'userPreference: respect user preference.
    // 'polite': open for new issues.
    // 'assertive': open for any issues.
    // 'active': always open.
    // CMS integrations can switch between polite & headless at runtime.
    alertMode: 'userPreference',
    inlineAlerts: true,
    watchForChanges: true, // true, false, 'checkRoots';

    // This covers CKEditor, TinyMCE and Gutenberg. Being less specific may help performance.
    editableContent: '[contenteditable="true"]:not(.gutenberg__editor [contenteditable]), .gutenberg__editor .interface-interface-skeleton__content',

    // Dismissed alerts
    currentPage: false, // uses window.location.pathname unless a string is provided.
    allowHide: true, // enables end-user ignore button
    allowOK: true,  // enables end-user mark OK button
    syncedDismissals: false, // provide empty or populated object {} to enable sync functions
    reportsURL: false, // Provides a link to site-wide reports
    showDismissed: false, // start panel with dismissed items visible; used when coming directly from a dashboard

    // Hide all alerts if these elements are absent, e.g., ".edit-button"
    // Used to not heckle editors on pages they cannot fix; they can still click a "show hidden" button to check manually.
    ignoreAllIfAbsent: false,
    ignoreAllIfPresent: false,

    // Disable checker altogether if these elements are present or absent, e.g., ".live-editing-toolbar, .frontpage" or ".editable-content"
    preventCheckingIfPresent: false,
    preventCheckingIfAbsent: false,

    // Regex of strings to remove from links before checking to see if link titles are meaningful. E.g.:
    // "\(link is external\)|\(link sends email\)"
    linkIgnoreStrings: false,
    linkIgnoreSelector: false,

    // Disable the "is this element visible" check on themes that have 0-height elements.
    checkVisible: true,

    // Selector list for elements where the tip opening JS should wait for your theme to modify the DOM or CSS before opening the tip.
    hiddenHandlers: '',

    panelPinTo: 'right',
    panelOffsetX: '25px',
    panelOffsetY: '25px',
    panelNoCover: '', // select other buttons to avoid.
    panelAttachTo: document.body,

    // Selector list for elements that hide overflow, truncating buttons.
    constrainButtons: false,

    // Interface
    lang: 'en',
    langSanitizes: false, // Some translation modules will double-escape
    theme: 'sleekTheme',
    sleekTheme: {
      bg: '#eff2ff', // e8f4ff
      bgHighlight: '#7b1919',
      text: '#20160c',
      primary: '#276499', // 276499
      primaryText: '#eff2ff',
      button: 'transparent', // deprecate?
      panelBar: '#1e517c',
      panelBarText: '#fffdf7',
      panelBarShadow: '0 0 0 1px #276499',
      activeTab: '#276499',
      activeTabText: '#fffffe',
      focusRing: '#007aff',
      outlineWidth: '0',
      borderRadius: '3px',
      ok: '#1f5381',
      warning: 'rgb(250, 216, 89)',
      warningText: '#20160c',
      alert: 'rgb(184, 5, 25)',
      alertText: '#f4f7ff',
    },
    darkTheme: {
      bg: '#0a2051',
      bgHighlight: '#7b1919',
      text: '#f4f7ff',
      primary: '#3052a0',
      primaryText: '#f4f7ff',
      button: 'transparent',
      panelBar: '#3052a0',
      panelBarText: '#f4f7ff',
      panelBarShadow: 'inset 0 0 1px, 0 0 0 1px #0a2051',
      activeTab: '#0a2051',
      activeTabText: '#fffffe',
      focusRing: 'cyan',
      outlineWidth: '2px',
      borderRadius: '3px',
      ok: '#0a307a',
      warning: 'rgb(250, 216, 89)',
      warningText: '#20160c',
      alert: 'rgb(184, 5, 25)',
      alertText: '#f4f7ff',
    },
    lightTheme: {
      bg: '#fffffe',
      bgHighlight: '#7b1919',
      text: '#20160c',
      primary: '#0a307a',
      primaryText: '#fffdf7',
      panelBar: '#0a307a',
      panelBarText: '#f4f7ff',
      panelBarShadow: '0 0 0 1px #0a307a',
      button: 'transparent',
      activeTab: '#b9c0cf',
      activeTabText: '#20160c',
      focusRing: '#007aff',
      outlineWidth: '0',
      borderRadius: '3px',
      ok: '#0a307a',
      warning: 'rgb(250, 216, 89)',
      warningText: '#20160c',
      alert: 'rgb(184, 5, 25)',
      alertText: '#f4f7ff',
    },
    // Base z-index for buttons.
    // 1299 maximizes TinyMCE compatibility.
    buttonZIndex: 1299,
    // CSS overrides and additions.

    baseFontSize: 'clamp(14px, 1.5vw, 16px)',
    baseFontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',

    // Test customizations
    embeddedContent: false, // @todo remove in favor of custom checks?
    embeddedContentTitle: '', // @todo test or remove?
    embeddedContentMessage: '', // @todo test or remove?

    linksUrls: false, // get from language pack
    linksMeaningless: false, // get from language pack
    altPlaceholder: false, // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'
    // * Not implemented Yet:
    // ruleset toggling
    // form label tests
    // detectSPArouting: false,

    editLinks: false, // Add links to edit content in tooltips.

    // @todo merge: port this functionality.
    editorHeadingLevel: [
      // Sets previous heading level for contentEditable fields.
      // With 'ignore' set, first heading level is ignored in editable zones.
      // This is ideal for systems with separate backend editing pages.
      // Set to 'inherit' for fields edited in a frontend context.
      /*{
        selector: '.example-inherit',
        previousHeading: 'inherit',
      },
      {
        selector: '.example-l3',
        previousHeading: 3,
      },*/
      {
        selector: '*',
        previousHeading: 0, // Ignores first heading for level skip detection.
      },
    ],

    userPrefersShut: localStorage.getItem('editoria11yShow') === '0',

    customTests: 0,

    // @todo merge do we need the image and button descenders and the tabindex selector? If so should it be in the MR?
    imageIgnore: '[aria-hidden], [aria-hidden] img, [role="presentation"], a[href][aria-label] img, button[aria-label] img, a[href][aria-labelledby] img, button[aria-labelledby] img',
    linkIgnore: '[aria-hidden][tabindex="-1"]',
  };

  function preProcessOptions(options) {
    const sa11yDefaults = defaultOptions;
    ed11yDefaults = {
      ...sa11yDefaults,
      ...ed11yDefaults,
    };

    // @todo MERGE these get destroyed in constants.js
    ed11yDefaults.checks.QA_DOCUMENT.sources = 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']';
    ed11yDefaults.checks.EMBED_VIDEO.sources = 'video, [src*="youtube.com"], [src*="brightcove.com"], [src*="dailymotion.com"], [src*="panopto.com"], [src*="Video"], [src*="video"], [src*="vimeo.com"], [src*="watch"], [src*="wistia.com"], [src*="vidyard.com"], [src*=yuja.com]';


    options = {
      ...ed11yDefaults,
      ...options,
    };
    console.log('merged');
    console.log(options);
    /*
    * Options translation
    * */
    options.headless = options.alertMode === 'headless';
    options.customChecks = options.customTests > 0 && !options.customChecks ? 'listen' : false;

    // Toggleable plugins
    options.developerPlugin = false;
    options.colourFilterPlugin = false;
    options.exportResultsPlugin = false;
    options.showImageOutline = false;
    // @todo merge what are these?
    // Constants.Global.ignoreContentOutsideRoots = option.ignoreContentOutsideRoots;

  //  options.panelPosition = panelPinTo; // Syntax?

    // Check for document types.

    if (options.documentLinks) {
      options.checks.QA_DOCUMENT.sources = options.documentLinks;
    }
    // @todo merge this changed name from linkIgnoreSelector.

    if (options.linkIgnoreSelector) {
      options.linkIgnoreSpan = options.linkIgnoreSelector;
    }

    if (options.panelAttachTo) {
      State.panelAttachTo = options.panelAttachTo; // todo Is this implemented anywhere?
    }


    // @todo Merge ignoreByKey deprecation documentation and conversion. These tests still need overrides:
    // 'p': 'table p',
    //  'table': '[role="presentation"]'

    /* ********************** */
    /* Embedded Content Setup */
    /* ********************** */
    //Constants.Global.AllEmbeddedContent = `${Constants.Global.VideoSources}, ${Constants.Global.AudioSources}, ${Constants.Global.VisualizationSources}`;
    // @todo merge: this means custom embeds needs to be a custom test.

    /* ************** */
    /* Language setup */
    /* ************** */
    // @todo merge how to emulate Sa11y translations?
    ed11yLang = {
      // Fall back to En strings if language or string is unavailable
      ...ed11yLang['en'],
      ...ed11yLang[options.lang]
    };

    /* *********** */
    /* Theme setup */
    /* *********** */
    Theme.push = options[options.theme];
    Theme.baseFontSize = options.baseFontSize;
    Theme.buttonZIndex = options.buttonZIndex;
    Theme.baseFontFamily = options.baseFontFamily;

    let cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`];
    if (!options.cssUrls) {
      const cssLink = document.querySelector('link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]');
      if (cssLink) {
        cssUrls = [cssLink.getAttribute('href')];
      } else {
        console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
      }
    }
    const cssBundle = document.createElement('div');
    cssBundle.classList.add('ed11y-style');
    cssBundle.setAttribute('hidden','');
    cssUrls?.forEach( sheet => {
      const cssLink = document.createElement('link');
      cssLink.setAttribute('rel', 'stylesheet');
      // @todo preload.
      cssLink.setAttribute('media', 'all');
      if (sheet.indexOf('?') < 0) {
        sheet = sheet + '?ver=' + State.version;
      }
      cssLink.setAttribute('href', sheet);
      cssBundle.append(cssLink);
    });
    UI$1.attachCSS = function(appendTo) {
      const link = cssBundle.cloneNode(true);
      appendTo.appendChild(link);
    };

    return options;
  }
  function postProcessOptions(option) {
    // @todo merge: test: does this need descendant selector?
    Constants.Exclusions.Sa11yElements = ['.ed11y-element'];

    // Main container exclusions.
    console.log('Constants: ');
    console.log(Constants);

    // Undo Sa11y overrides in constants.js.
    Constants.Global.documentSources = option.checks.QA_DOCUMENT.sources;
    Constants.Global.videoSources = option.checks.EMBED_VIDEO.sources;
    Constants.Global.AudioSources = option.checks.EMBED_AUDIO.sources;
    Constants.Global.dataVizSources = option.checks.EMBED_DATA_VIZ.sources;
    Constants.Global.AllEmbeddedContent = `${Constants.Global.VideoSources}, ${Constants.Global.AudioSources}, ${Constants.Global.VisualizationSources}`;

    State.currentPage = options.currentPage ? options.currentPage : window.location.currentPage;
    // @todo merge remove wpadminbar from defaults and update wp module.
    /*Exclusions.Container = ['#wpadminbar', '#wpadminbar *', ...exclusions];
    if (option.containerIgnore) {
      const containerSelectors = option.containerIgnore.split(',').map((item) => item.trim());
      Exclusions.Container = Exclusions.Container.concat(
        containerSelectors.flatMap((item) => [`${item} *`, item]),
      );
    }*/

  }

  return {
    preProcessOptions,
    ed11yLang,
    postProcessOptions,
  };
}());

/**
 * Finds elements in the DOM that match the given selector, within the specified root element, and excluding any specified elements.
 * @param {string} selector - The CSS selector to match elements against.
 * @param {string} desiredRoot - The root element to start the search from. Can be one of 'document', 'readability', 'root', or a custom selector for the desired root element.
 * @param {string} exclude - Elements to exclude from the search, specified as a CSS selector (optional).
 * @returns {Array} - An array of elements that match the given selector.
 */
function find(selector, desiredRoot, exclude) {
  let root;
  if (desiredRoot === 'document') {
    root = document;
  } else if (desiredRoot === 'readability') {
    root = Constants.Readability.Root;
    if (!root) root = Constants.Root.areaToCheck;
  } else if (desiredRoot === 'root') {
    root = Constants.Root.areaToCheck;
    if (!root) root = document.body;
  } else if (desiredRoot === 'panel') {
    root = Constants.Panel.panel;
    if (!root) root = document.body;
  } else {
    root = document.querySelector(desiredRoot);
    if (!root) root = document.body;
  }

  const shadowComponents = document.querySelectorAll('[data-sa11y-has-shadow-root]');
  const shadow = shadowComponents ? ', [data-sa11y-has-shadow-root]' : '';

  // Exclusions are returned as an array & need to become a string for selector.
  const exclusions = Constants.Exclusions.Container.join(', ');
  const additionalExclusions = exclude?.join(', ') || '';

  // Ensure no trailing commas.
  const additional = additionalExclusions ? `, ${additionalExclusions}` : '';

  /* Logic yoinked from Editoria11y */
  // 1. Elements array includes web components in the selector to be used as a placeholder.
  const elements = Array.from(root.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`));
  if (shadowComponents.length) {
    // 2. Dive into the each shadow root and collect an array of its results.
    const shadowFind = [];
    elements.forEach((el, i) => {
      if (el && el.matches && el.matches('[data-sa11y-has-shadow-root]') && el.shadowRoot) {
        shadowFind[i] = el.shadowRoot.querySelectorAll(`:is(${selector}):not(${exclusions}${additional})`);
      }
    });
    // 3. Replace the placeholder with any hits found in the shadow root.
    if (shadowFind.length > 0) {
      for (let index = shadowFind.length - 1; index >= 0; index--) {
        if (shadowFind[index]) {
          elements.splice(index, 1, ...shadowFind[index]);
        }
      }
    }
  }
  // 4. Return the cleaned up array, filtering out <slot> placeholders.
  return elements.filter((node) => node.parentNode.tagName !== 'SLOT');
}

/* eslint-disable no-continue */
/* eslint-disable no-use-before-define */

/* Get text content of pseudo elements. */
const wrapPseudoContent$1 = (element, string) => {
  const getAltText = (content) => {
    if (content === 'none') return '';
    const match = content.includes('url(') || content.includes('image-set(')
      ? content.match(/\/\s*"([^"]+)"/) // Content after slash, e.g. url('image.jpg') / "alt text";
      : content.match(/"([^"]+)"/); // Content between quotes, e.g. "alt text";
    return match ? match[1] : '';
  };
  const before = getAltText(window.getComputedStyle(element, ':before').getPropertyValue('content'));
  const after = getAltText(window.getComputedStyle(element, ':after').getPropertyValue('content'));
  return `${before}${string}${after}`;
};

/* Sets treeWalker loop to last node before next branch. */
const nextTreeBranch$1 = (tree) => {
  for (let i = 0; i < 1000; i++) {
    if (tree.nextSibling()) {
      // Prepare for continue to advance.
      return tree.previousNode();
    }
    // Next node will be in next branch.
    if (!tree.parentNode()) {
      return false;
    }
  }
  return false;
};

/* Compute ARIA attributes. */
const computeAriaLabel$1 = (element, recursing = false) => {
  const labelledBy = element.getAttribute('aria-labelledby');
  if (!recursing && labelledBy) {
    return labelledBy
      .split(/\s+/)
      .filter((id) => id.trim()) // Exclude empty IDs.
      .map((id) => {
        const targetElement = document.querySelector(`#${CSS.escape(id)}`);
        return targetElement ? computeAccessibleName(targetElement, '', 1) : '';
      }).join(' ');
  }

  const { ariaLabel } = element;
  if (ariaLabel && ariaLabel.trim().length > 0) {
    return ariaLabel;
  }
  return 'noAria';
};

/**
 * Compute the accessible name of an element.
 * Implements a subset of the W3C Accessible Name algorithm.
 * Based on John Jameson’s Editoria11y library.
 *
 * @param {Element} element Target element.
 * @param {string[]} exclusions CSS selectors to ignore.
 * @param {number} recursing Recursion depth.
 * @returns {string} Accessible name.
 */
const computeAccessibleName = (element, exclusions = [], recursing = 0) => {
  // Return immediately if there is an aria label.
  const ariaLabel = computeAriaLabel$1(element, recursing);
  if (ariaLabel !== 'noAria') return ariaLabel;

  // Textarea with a title.
  if (element.tagName === 'TEXTAREA' && element.hasAttribute('title')) {
    return element.getAttribute('title');
  }

  // Return immediately if there is only a text node.
  let computedText = '';
  if (!element.children.length) {
    computedText = wrapPseudoContent$1(element, element.textContent);
    if (!computedText.trim() && element.hasAttribute('title')) {
      return element.getAttribute('title');
    }
    return computedText;
  }

  // Create tree walker object.
  function createTreeWalker(root, showElement, showText) {
    const acceptNode = (node) => {
      if (showElement && node.nodeType === Node.ELEMENT_NODE) return NodeFilter.FILTER_ACCEPT;
      if (showText && node.nodeType === Node.TEXT_NODE) return NodeFilter.FILTER_ACCEPT;
      return NodeFilter.FILTER_REJECT;
    };
    return document.createTreeWalker(root, NodeFilter.SHOW_ALL, { acceptNode });
  }
  const treeWalker = createTreeWalker(element, true, true);

  // Exclusions
  const alwaysExclude = ['noscript', 'style', 'script', 'video', 'audio'];
  const excludeSelector = [...exclusions, ...alwaysExclude].join(', ');
  const exclude = excludeSelector ? element.querySelectorAll(excludeSelector) : [];

  // Recurse into children.
  let addTitleIfNoName = false;
  let aText = false;
  let count = 0;
  let continueWalker = true;

  while (treeWalker.nextNode() && continueWalker) {
    count += 1;
    const node = treeWalker.currentNode;
    const excluded = Array.from(exclude).some((ex) => ex.contains(node));

    // Matches exclusion.
    if (excluded) {
      continue;
    }

    // Inner nodes with shadowRoots.
    if (node.shadowRoot) {
      const shadowChildren = node.shadowRoot.querySelectorAll('*');
      for (let i = 0; i < shadowChildren.length; i++) {
        const child = shadowChildren[i];
        if (!excludeSelector || !child.closest(excludeSelector)) {
          computedText += computeAccessibleName(child, exclusions, recursing + 1);
        }
      }
    }

    // Return text from text nodes.
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentNode.tagName !== 'SLOT') {
        computedText += ` ${node.nodeValue}`;
      }
      continue;
    }

    if (addTitleIfNoName && !node.closest('a')) {
      if (aText === computedText) computedText += addTitleIfNoName;
      addTitleIfNoName = false;
      aText = false;
    }

    if (node.ariaHidden === 'true' && !(recursing && count < 3)) {
      if (!nextTreeBranch$1(treeWalker)) continueWalker = false;
      continue;
    }

    const aria = computeAriaLabel$1(node, recursing);
    if (aria !== 'noAria') {
      computedText += ` ${aria}`;
      if (!nextTreeBranch$1(treeWalker)) continueWalker = false;
      continue;
    }

    switch (node.tagName) {
      case 'IMG':
        if (node.hasAttribute('alt') && node.role !== 'presentation') {
          computedText += node.getAttribute('alt');
        }
        break;
      case 'SVG':
        if (node.role === 'img' || node.role === 'graphics-document') {
          computedText += computeAriaLabel$1(node);
        } else {
          const title = node.querySelector('title');
          if (title) computedText += title.textContent;
        }
        break;
      case 'A':
        if (node.hasAttribute('title')) {
          addTitleIfNoName = node.getAttribute('title');
          aText = computedText;
        } else {
          addTitleIfNoName = false;
          aText = false;
        }
        computedText += wrapPseudoContent$1(node, '');
        break;
      case 'SLOT': {
        const children = node.assignedNodes?.() || [];
        let slotText = '';
        children.forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            slotText += computeAccessibleName(child);
          } else if (child.nodeType === Node.TEXT_NODE) {
            slotText += child.nodeValue;
          }
        });
        computedText += slotText;
        computedText += wrapPseudoContent$1(node, '');
        break;
      }
      default:
        computedText += wrapPseudoContent$1(node, '');
        break;
    }
  }

  if (addTitleIfNoName && !aText) {
    computedText += ` ${addTitleIfNoName}`;
  }

  // Replace Private Use Area (PUA) unicode characters.
  // https://www.unicode.org/faq/private_use.html
  computedText = computedText.replace(/[\uE000-\uF8FF]/gu, '');

  // If computedText returns blank, fallback on title attribute.
  if (!computedText.trim() && element.hasAttribute('title')) {
    return element.getAttribute('title');
  }

  return computedText;
};

/**
 * Checks if an element is hidden (display: none) based on its attributes and styles.
 * @param {HTMLElement} element The element to check for visibility.
 * @returns {boolean} 'true' if the element is hidden (display: none).
 */
function isElementHidden(element) {
  return element.hidden || getComputedStyle(element).getPropertyValue('display') === 'none';
}

/**
 * Checks if an element is invisible in layout.
 * @param {HTMLElement} element The element to check for visibility.
 * @returns {boolean} `true` if the element is visually hidden or hidden, `false` otherwise.
 */
function isElementVisuallyHiddenOrHidden(element) {
  if ((element.offsetWidth === 0 && element.offsetHeight === 0)
    || (element.clientHeight === 1 && element.clientWidth === 1)) return true;
  return isElementHidden(element);
}

/**
 * Sanitizes an HTML string by replacing special characters with their corresponding HTML entities.
 * @param {string} string The HTML string to sanitize.
 * @returns {string} The sanitized HTML string with special characters replaced by their corresponding entities.
 * @link https://portswigger.net/web-security/cross-site-scripting/preventing
 */
function sanitizeHTML(string) {
  return string.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
}

/**
 * Creates a clone of an element while ignoring specified elements or elements matching a selector.
 * Ignored by default: ['noscript', 'script', 'style', 'audio', 'video', 'form', 'iframe']
 * @param {Element} element The element to clone.
 * @param {Array[]} selectors The selector to match elements to be excluded from the clone. Optional.
 * @returns {Element} The cloned element with excluded elements removed.
 */
function fnIgnore(element, selectors = []) {
  const defaultIgnored = ['noscript', 'script', 'style', 'audio', 'video', 'form', 'iframe'];
  const ignore = [...defaultIgnored, ...selectors].join(', ');
  const clone = element.cloneNode(true);
  const exclude = Array.from(clone.querySelectorAll(ignore));
  exclude.forEach(($el) => {
    $el.parentElement.removeChild($el);
  });
  return clone;
}

/**
 * Retrieves the text content of an HTML element and removes extra whitespaces and line breaks.
 * @param {HTMLElement} element The HTML element to retrieve the text content from.
 * @returns {string} The text content of the HTML element with extra whitespaces and line breaks removed.
 */
function getText(element) {
  const ignore = fnIgnore(element);
  return ignore.textContent.replace(/[\r\n]+/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Removes extra whitespaces and line breaks from a string.
 * @param {string} string The string.
 * @returns {string} String with line breaks and extra white space removed.
 */
function removeWhitespace(string) {
  return string.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Truncate string.
 * @param {*} string The string to truncate.
 * @param {*} maxLength Desired max length of string.
 * @returns Truncated string.
 */
function truncateString(string, maxLength) {
  const truncatedString = string.substring(0, maxLength).trimEnd();
  return string.length > maxLength ? `${truncatedString}...` : string;
}

/**
 * A utility object for handling storage operations using localStorage and sessionStorage.
 * @param  {String} key
 * @param  {string} value
 * @return {String} Return key.
*/
const store = {
  getItem(key) {
    try {
      if (localStorage.getItem(key) === null) {
        return sessionStorage.getItem(key);
      }
      return localStorage.getItem(key);
    } catch (error) {
      // Cookies totally disabled.
      return false;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      sessionStorage.setItem(key, value);
    }
    return true;
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      sessionStorage.removeItem(key);
    }
    return true;
  },
};

/**
 * Generates a unique key for dismissing items.
 * @param {string} string The string to be prepared for dismissal (without special chars).
 * @returns {string} The truncated string with a maximum of 256 characters.
 */
function prepareDismissal(string) {
  return String(string).replace(/([^0-9a-zA-Z])/g, '').substring(0, 256);
}

/**
 * Check if an element's visible text is included in the accessible name.
 * To minimize false positives: iterate through all child nodes of the element, checking for visibility.
 * @param {element} $el The element to test.
 * @returns {boolean}
 */
function isVisibleTextInAccessibleName($el) {
  let text = '';
  const accName = computeAccessibleName($el).toLowerCase();
  const nodes = $el.childNodes;
  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Only return text content if it's not hidden.
      if (!isElementVisuallyHiddenOrHidden(node)) {
        text += node.textContent;
      }
    }
  });

  // Ignore emojis.
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  let visibleText = text.replace(emojiRegex, '');

  // Final visible text.
  visibleText = removeWhitespace(visibleText).toLowerCase();

  // If visible text is just an x character, ignore.
  if (visibleText === 'x') {
    return false;
  }

  // Check if visible text is included in accessible name.
  return visibleText.length !== 0 && !accName.includes(visibleText);
}

/**
 * Standardize the href attribute of a link by removing any trailing slashes and stripping the protocol (http, https) and 'www.' prefix. Used to minimize false positives for link check module.
 * @param {HTMLElement} $el - The element from which to retrieve the href attribute.
 * @returns {string} - The standardized href.
 */
function standardizeHref($el) {
  let href = $el.getAttribute('href');
  href = removeWhitespace(href).toLowerCase();

  // Remove trailing slash if it exists.
  if (href.endsWith('/')) href = href.slice(0, -1);

  // Remove protocol and www., without affecting subdomains.
  href = href.replace(/^https?:\/\/(www\.)?/, '');

  // Remove common file extensions at the end.
  href = href.replace(/\.(html|php|htm|asp|aspx)$/i, '');

  return href;
}

class Ed11yElementAlt extends HTMLElement {
  /* global Ed11y */

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({mode: 'open'});
      let altTextWrapper = document.createElement('div');
      altTextWrapper.classList.add('ed11y-wrapper','ed11y-alt-wrapper');
      let img = UI$1.imageAlts[this.dataset.ed11yImg];
      // img[el, src, altLabel, altStyle]

      let altSpan = document.createElement('span');
      altSpan.textContent = img[2];
      altSpan.classList.add(img[3]);
      altTextWrapper.appendChild(altSpan);
      UI$1.attachCSS(altTextWrapper);
      shadow.appendChild(altTextWrapper);
      this.initialized = true;
    }
  }

}

function alignAlts$1 () {
  // Positions alt label to match absolute, inline or floated images.
  findElements('altMark', 'ed11y-element-alt');
  State.elements.altMark?.forEach((el) => { // @todo merge
    let id = el.dataset.ed11yImg;
    el.style.setProperty('transform', null);
    el.style.setProperty('height', null);
    el.style.setProperty('width', null);

    let img = UI$1.imageAlts[id][0];
    if (img.tagName !== 'IMG') {
      // Mark is placed outside the link in linked images.
      img = img.querySelector('img');
    }
    let markOffset = el.getBoundingClientRect();
    let imgOffset = img.getBoundingClientRect();
    let newOffset = imgOffset.left - markOffset.left;
    let height = getComputedStyle(img).height;
    height = height === 'auto' ? img.offsetHeight : Math.max(img.offsetHeight, parseInt(height));
    el.style.setProperty('transform', `translate(${newOffset}px, 0px)`);
    el.style.setProperty('height', `${height}px`);
    el.style.setProperty('width', `${img.offsetWidth}px`);
  });
}
const showAltPanel = function () {
  // visualize image alts
  let altList = UI$1.panel.querySelector('#ed11y-alt-list');

  if (UI$1.imageAlts.length) {
    altList.innerHTML = '';
    UI$1.imageAlts.forEach((el, i) => {
      // el[el, src, altLabel, altStyle]

      if (State.options.inlineAlerts) {
        // Label images
        const mark = document.createElement('ed11y-element-alt');
        mark.classList.add('ed11y-element');
        mark.dataset.ed11yImg = i.toString();
        mark.setAttribute('id', 'ed11y-alt-' + i);
        mark.setAttribute('tabindex', '-1');
        el[0].insertAdjacentElement('beforebegin', mark);
      }

      // Build alt list in panel
      let userText = document.createElement('span');
      userText.textContent = el[2];
      let li = document.createElement('li');
      li.classList.add(el[3]);
      let img = document.createElement('img');
      img.setAttribute('src', el[1]);
      img.setAttribute('alt', '');

      if (State.options.inlineAlerts) {
        let a = document.createElement('a');
        a.href = '#ed11y-alt-' + i;
        a.classList.add('alt-parent');
        li.append(a);
        a.append(img);
        a.append(userText);
      } else {
        li.classList.add('alt-parent');
        li.append(img);
        li.append(userText);
      }
      altList.append(li);
    });
    alignAlts$1();
  } else {
    const noImages = document.createElement('p');
    const noItalic = document.createElement('em');
    noItalic.textContent = M.noImagesFound;
    noImages.appendChild(noItalic);
    altList.innerHTML = '';
    altList.appendChild(noImages);
  }
};
function visualize () {
  if (!UI$1.panel) {
    return;
  }
  if (State.options.inlineAlerts) {
    findElements('reset', 'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', false);
    State.elements.reset?.forEach((el) => el.remove());
  }
  if (State.visualizing) {
    State.visualizing = false;
    UI$1.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = M.buttonToolsContent;
    UI$1.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'false');
    UI$1.panel.querySelector('#ed11y-visualizers').setAttribute('hidden', 'true');
    return;
  }
  State.visualizing = true;
  UI$1.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = M.buttonToolsActive;
  UI$1.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'true');
  UI$1.panel.querySelector('#ed11y-visualizers').removeAttribute('hidden');
  showAltPanel();
  showHeadingsPanel();
}

function updatePanel () {

  pauseObservers();
  // Stash old values for incremental updates.
  countAlerts();
  if (State.incremental) {
    // Check for a change in the result counts.
    if (State.forceFullCheck || newIncrementalResults()) {
      State.forceFullCheck = false;
      /*if (State.options.alertMode === 'assertive' && State.totalCount > 0 && (State.warningCount > oldWarnings || State.errorCount > oldErrors)) {
        console.warn('forced open');
        State.showPanel = true;
      }*/
      resetResults(true);
    } else {
      // Todo: commented out in 2.3.11:
      // Reconnect map
      State.results = State.oldResults;
      window.setTimeout(function() {
        if ( !State.alignPending ) {
          alignButtons();
          alignPanel$1();
          State.alignPending = false;
        }
        State.running = false;
      },0);
      resumeObservers();
      return;
    }
  } else {
    if (State.totalCount > 0) {
      // Record what has been seen at this route.
      // We do not do this on incremental updates.
      // Todo question: should we not do this at all for contentEditable?
      State.seen[encodeURI(State.options.currentPage)] = State.totalCount;
      localStorage.setItem('editoria11yResultCount', JSON.stringify(State.seen));
    } else {
      delete State.seen[encodeURI(State.options.currentPage)];
    }
  }

  if (State.options.alertMode !== 'headless') {
    // Not headless; draw the interface.

    if (!State.bodyStyle) {
      paintReady();
    }

    if (State.onLoad === true) {
      State.onLoad = false;

      if (!State.options.inlineAlerts) {
        // todo move to incremental check or timeout; no need to do on load.
        State.oldResultString = `${State.errorCount} ${State.warningCount}`;
        State.results.forEach(result => {
          State.oldResultString += result.test + result.element.outerHTML;
        });
      }

      // Create the panel DOM on load.

      UI$1.panelElement = document.createElement('ed11y-element-panel');
      UI$1.panelElement.classList.add('ed11y-preload');
      document.body.appendChild(UI$1.panelElement);
      UI$1.panel = UI$1.panelElement.shadowRoot.getElementById('ed11y-panel');
      UI$1.attachCSS(UI$1.panel);
      UI$1.panelToggle = UI$1.panel.querySelector('#ed11y-toggle');
      UI$1.panelToggleTitle = UI$1.panel.querySelector('#ed11y-toggle .ed11y-sr-only');
      UI$1.panelCount = UI$1.panel.querySelector('.toggle-count');
      UI$1.panelJumpNext = UI$1.panel.querySelector('.ed11y-jump.next');
      UI$1.panelJumpNext.addEventListener('click', jumpTo);
      UI$1.showDismissed = UI$1.panel.querySelector('#ed11y-show-hidden');
      UI$1.message = UI$1.panel.querySelector('#ed11y-message');
      window.setTimeout(()=> {
        UI$1.panelElement.classList.remove('ed11y-preload');
      },0, UI$1.panel);
      UI$1.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = M.buttonToolsContent;
      UI$1.panel.querySelector('#ed11y-headings-tab .summary-title').textContent = M.buttonOutlineContent;
      UI$1.panel.querySelector('#ed11y-headings-tab .details-title').innerHTML = M.panelCheckOutline;
      UI$1.panel.querySelector('#ed11y-alts-tab .summary-title').textContent = M.buttonAltsContent;
      UI$1.panel.querySelector('#ed11y-alts-tab .details-title').innerHTML = M.panelCheckAltText;
      UI$1.panel.querySelector('.jump-next.ed11y-sr-only').textContent = M.buttonFirstContent;

      UI$1.panel.setAttribute('aria-label', M.panelControls);
      if (State.options.reportsURL) {
        let reportLink = document.createElement('a');
        reportLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 61 29 32 64 32l384 0c35 0 64 29 64 64l0 320c0 35-29 64-64 64L64 480c-35 0-64-29-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
        reportLink.setAttribute('id' , 'ed11y-reports-link');
        reportLink.setAttribute('href', State.options.reportsURL);
        reportLink.setAttribute('target', '_blank');
        reportLink.setAttribute('aria-label', M.reportsLink);
        reportLink.querySelector('.ed11y-sr-only').textContent = M.reportsLink;
        UI$1.showDismissed.insertAdjacentElement('beforebegin', reportLink);
      }


      // Decide whether to open the panel on load.
      if (State.ignoreAll ||
        (!State.options.inlineAlerts && State.totalCount > 75)
      ) {
        State.showPanel = false;
      } else if (State.options.alertMode === 'active' ||
        !State.options.userPrefersShut ||
        State.options.showDismissed
      ) {
        // Show always on load for active mode or by user preference.
        State.showPanel = true;
      } else if (
        State.totalCount > 0 &&
        !State.ignoreAll &&
        ( State.options.alertMode === 'assertive' ||
          State.options.alertMode === 'polite' &&
          State.seen[encodeURI(State.options.currentPage)] !== State.totalCount
        )
      ) {
        // Show sometimes for assertive/polite if there are new items.
        State.showPanel = true;
      }
    }

    // Now we can open or close the panel.
    if (!State.showPanel) {
      // Close panel.
      reset();
    } else {
      // Ignore issue count if this resulted from a user action.

      State.open = true;
      UI$1.panel.classList.remove('ed11y-shut');
      UI$1.panel.classList.add('ed11y-active');
      UI$1.panelToggle.setAttribute('aria-expanded', 'true');
      UI$1.panelToggleTitle.textContent = State.totalCount > 0 ? M.buttonHideAlerts : M.buttonHideChecker;
      // Prepare show hidden alerts button.
      if (State.dismissedCount === 0) {
        // Reset show hidden default option when irrelevant.
        UI$1.showDismissed.setAttribute('hidden', '');
        UI$1.showDismissed.setAttribute('data-ed11y-pressed', 'false');
        State.options.showDismissed = false;
      } else if (State.dismissedCount === 1) {
        UI$1.showDismissed.querySelector('.ed11y-sr-only').textContent = State.options.showDismissed ? M.buttonHideHiddenAlert : M.buttonShowHiddenAlert;
        UI$1.showDismissed.dataset.ed11yPressed = `${State.options.showDismissed}`;
        UI$1.showDismissed.removeAttribute('hidden');
      } else {
        UI$1.showDismissed.querySelector('.ed11y-sr-only').textContent = State.options.showDismissed ? M.buttonHideHiddenAlerts(State.dismissedCount) : M.buttonShowHiddenAlerts(State.dismissedCount);
        UI$1.showDismissed.dataset.ed11yPressed = `${State.options.showDismissed}`;
        UI$1.showDismissed.removeAttribute('hidden');
      }

      window.setTimeout(function () {
        if (!State.ignoreAll) {
          requestAnimationFrame(() => showResults());
        }
      }, 0);
    }
    // Update buttons.
    if (State.totalCount > 0 || (State.options.showDismissed && State.dismissedCount > 0)) {
      UI$1.panelToggleTitle.textContent = State.open ? M.buttonHideAlerts : M.buttonShowAlerts;
      UI$1.panelJumpNext.removeAttribute('hidden');
      if (State.errorCount > 0) {
        // Errors
        UI$1.panel.classList.remove('ed11y-warnings', 'ed11y-pass');
        UI$1.panel.classList.add('ed11y-errors');
        document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.alert);
        document.documentElement.style.setProperty('--ed11y-activeColor', '#fff');
        document.documentElement.style.setProperty('--ed11y-activeBorder', '#fff7');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#def');
      }
      else if (State.warningCount > 0) {
        // Warnings
        UI$1.panel.classList.remove('ed11y-errors', 'ed11y-pass');
        UI$1.panel.classList.add('ed11y-warnings');
        document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.warning);
        document.documentElement.style.setProperty('--ed11y-activeColor', '#111');
        document.documentElement.style.setProperty('--ed11y-activeBorder', '#947605');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#947605');
      } else {
        // Issues present but dismissed.
        UI$1.panel.classList.remove('ed11y-errors', 'ed11y-warnings');
        UI$1.panel.classList.add('ed11y-pass');
        document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.panelBar);
        document.documentElement.style.setProperty('--ed11y-activeColor', Theme.panelBarText);
        document.documentElement.style.setProperty('--ed11y-activeBorder', Theme.panelBarText + '44');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', Theme.panelBarText + '88');
      }
      // todo postpone: aria alert on load?
      /*window.setTimeout(function () {
        //announce.textContent = text;
      }, 1500);*/
      if (State.dismissedCount > 0 && State.totalCount === 0) {
        UI$1.panelCount.textContent = State.dismissedCount;
      } else {
        UI$1.panelCount.textContent = State.totalCount > 99 ? '99+' : State.totalCount;
      }
    } else {
      UI$1.panelJumpNext.setAttribute('hidden', '');
      document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.panelBar);
      document.documentElement.style.setProperty('--ed11y-activeColor', Theme.panelBarText);
      document.documentElement.style.setProperty('--ed11y-activeBorder', Theme.panelBarText + '44');
      document.documentElement.style.setProperty('--ed11y-activePanelBorder', Theme.panelBarText + '88');

      UI$1.panelCount.style.display = 'display: none;';
      UI$1.panel.classList.remove('ed11y-warnings', 'ed11y-errors');
      UI$1.panel.classList.add('ed11y-pass');

      if (State.dismissedCount > 0) {
        UI$1.panelCount.textContent = 'i';
        if (State.open) {
          UI$1.panelToggleTitle.textContent = M.buttonHideChecker;
        } else {
          UI$1.panelToggleTitle.textContent = State.dismissedCount > 1 ?
            M.buttonShowHiddenAlerts(State.dismissedCount) :
            M.buttonShowHiddenAlert;
        }
      } else {
        // todo 3.x: move these inline and just change the class.
        UI$1.panelToggleTitle.textContent = State.open ? M.buttonHideChecker : M.buttonShowNoAlert;
      }
    }
    UI$1.panelToggle.classList.remove('disabled');
    UI$1.panelToggle.removeAttribute('aria-disabled');
    alignPanel$1();
    UI$1.panel.classList.remove('ed11y-preload');
  }

  window.setTimeout(() => {
    if (State.options.watchForChanges) {
      State.elements.editable?.forEach(editable => {
        if (!editable.matches('.drag-observe')) {
          editable.classList.add('drag-observe');
          editable.addEventListener('drop', () => {
            // This event does not bubble.
            State.forceFullCheck = true;
          });
        }
      });
      if (State.options.watchForChanges === 'checkRoots') {
        State.roots?.forEach((root) => {
          startObserver( root );
        });
      } else {
        startObserver( document.body );
      }
      resumeObservers(); // on recheck.
    }
  }, 0);

  resumeObservers();
  State.running = false;
}
function showResults () {
  buildJumpList();
  // Announce that buttons have been placed.
  document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
  alignButtons();
  if (!State.options.inlineAlerts) {
    checkEditableIntersects();
    intersectionObservers();
  }
}
// Place markers on elements with issues
function drawResult(result, index) {
  /* old array to new object map:
    // [0] element
    // [1] test
    // [2] content
    // [3] position
    // [4] dismissalKey
    // [5] dismissalStatus
    */
  let mark = document.createElement('ed11y-element-result');
  mark.classList.add('ed11y-element');
  let location;
  let position = 'beforebegin';
  mark.setAttribute('id', 'ed11y-result-' + index);
  mark.setAttribute('data-ed11y-result', index);
  mark.setAttribute('data-ed11y-open', 'false');
  if (!State.options.inlineAlerts) {
    location = State.panelAttachTo;
    position = 'beforeend';
    mark.classList.add('ed11y-editable-result');
  } else {
    location = result.element.closest('a, button, [role="button"], [role="link"]');
    if (!location && result.element.shadowRoot) {
      // Must insert outside shadow DOM root.
      location = result.element;
      position = 'beforebegin';
      while (location.parentElement && location.parentElement.shadowRoot) {
        location = location.parentElement;
      }
    }
    if (!location) {
      location = result.element;
      position = result.position;
    }
  }
  location.insertAdjacentElement(position, mark);

  const shadow = mark.attachShadow({ mode: 'open' });

  // Create mark.wrapper with type class
  mark.resultID = mark.dataset.ed11yResult;
  mark.result = State.results[mark.resultID];

  mark.wrapper = document.createElement('div');

  mark.dismissable = mark.result.dismissalKey !== false;
  mark.dismissed = !!mark.result.dismissalStatus;
  mark.wrapper.classList.add('ed11y-wrapper', 'ed11y-result-wrapper');
  mark.wrapper.classList.add('ed11y-result');

  // Create tooltip toggle
  // @todo abstract out.
  mark.toggle = document.createElement('button');
  mark.toggle.setAttribute('class', 'toggle');
  let label = mark.dismissable ? M.toggleManualCheck : M.toggleAlert;
  mark.toggle.setAttribute('aria-label', M.toggleAriaLabel(label));
  mark.toggle.setAttribute('aria-expanded', 'false');
  mark.toggle.setAttribute('aria-haspopup', 'dialog');
  mark.toggle.setAttribute('data-ed11y-result', mark.dataset.ed11yResult);
  mark.toggle.setAttribute('data-ed11y-ready', 'false');
  mark.toggle.setAttribute('data-ed11y-race', 'false');
  if (!State.options.inlineAlerts) {
    mark.toggle.style.setProperty('font-size', '16px');
  }
  if (mark.dismissed) {
    mark.toggle.innerHTML = '<svg aria-hidden="true" width="10" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>';
    mark.toggle.classList.add('dismissed');
    if (mark.result.dismissalStatus !== 'ok') {
      mark.toggle.classList.add('notok');
    } else {
      mark.toggle.classList.add('ok');
    }
  } else if (mark.dismissable) {
    mark.toggle.classList.add('dismissable');
  }
  mark.wrapper.appendChild(mark.toggle);
  mark.toggle.addEventListener('click', mark.toggleClick);
  mark.toggle.addEventListener('focus', mark.handleFocus);
  mark.toggle.addEventListener('mouseover', mark.handleHover);
  mark.tipNeedsBuild = true;

  UI$1.attachCSS(mark.wrapper);

  shadow.appendChild(mark.wrapper);

  State.jumpList.unshift(mark);
  State.results[index].toggle = mark;
}

function buildJumpList () {

  State.jumpList = [];
  pauseObservers();

  // Initial alignment to get approximate Y position order for jump list.
  State.results.forEach((result, i) => {

    let top = result.element.getBoundingClientRect().top;
    if (!top) {
      const visibleParent = firstVisibleParent(result.element);
      if (visibleParent) {
        top = visibleParent.getBoundingClientRect().top;
      }
    }
    top = top + window.scrollY;
    if (State.options.fixedRoots) {
      const root = result.element.closest('[data-ed11y-root]');
      // Todo: it might be faster to associate this with the element finder.
      State.results[i].fixedRoot = root.dataset.ed11yRoot;
    }
    State.results[i].scrollableParent = closestScrollable(result.element);
    if (State.results[i].scrollableParent) {
      // Group these together.
      top = top * 0.000001;
    }
    State.results[i].sortPos = top;
  });
  // Sort from bottom to top so focus order after insert is top to bottom.
  State.results.sort((a, b) => b.sortPos - a.sortPos);

  State.results?.forEach(function (result, i) {
    if (!State.results[i].dismissalStatus || State.options.showDismissed) {
      drawResult(result, i);
    }
  });
  State.jumpList.forEach((el, i) => {
    el.dataset.ed11yJumpPosition = `${i}`;
    const newLabel = `${el.shadowRoot.querySelector('.toggle').getAttribute('aria-label')}, ${i + 1} / ${State.jumpList.length - 1}`;
    el.shadowRoot.querySelector('.toggle').setAttribute('aria-label', newLabel);
  });
  let tipsPainted = new CustomEvent('ed11yResultsPainted');
  document.dispatchEvent(tipsPainted);
  resumeObservers();
}

function dismissalKey (text) {
  return String(text).replace(/([^0-9a-zA-Z])/g, '').substring(0, 512);
}
function toggleShowDismissals () {
  // todo postpone: if user has allowHide but not allowOK or vice versa, this temporarily clears both.
  State.ignoreAll = false;
  State.options.showDismissed = !(State.options.showDismissed);
  reset();
  State.showPanel = true;
  checkAll();

  UI$1.showDismissed.setAttribute('data-ed11y-pressed', (!!State.options.showDismissed).toString());
  window.setTimeout(function() {
    UI$1.showDismissed.focus();
  }, 0);
}
function alignHighlights() {

  if (State.options.fixedRoots && UI$1.editableHighlight.length > 0) {
    State.positionedFrames = [];

    State.options.fixedRoots.forEach((root) => {
      if (root['framePositioner']) {
        State.positionedFrames.push(root['framePositioner'].getBoundingClientRect());
      }
    });
  }

  UI$1.editableHighlight.forEach((el) => {

    if (!State.results[el.resultID]) {
      State.interaction = true;
      State.forceFullCheck = true;
      UI$1.editableHighlight = [];
      return false;
    }

    const framePositioner = State.results[el.resultID].fixedRoot && State.positionedFrames[State.results[el.resultID].fixedRoot] ?
      State.positionedFrames[State.results[el.resultID].fixedRoot] : { top: 0, left: 0 };

    let targetOffset = el.target.getBoundingClientRect();
    if (!visible(el.target)) {
      // Invisible target.
      const firstVisibleParent$1 = firstVisibleParent(el.target);
      targetOffset = firstVisibleParent$1 ? firstVisibleParent$1.getBoundingClientRect() : targetOffset;
    }

    // @todo why is setProperty failing?
    console.log('has set property?');
    console.log(el.highlight);

    el.highlight.style.setProperty('width', targetOffset.width + 6 + 'px');
    el.highlight.style.setProperty('top', targetOffset.top + framePositioner.top + window.scrollY - 3 + 'px');
    el.highlight.style.setProperty('left', targetOffset.left + framePositioner.left - 3 + 'px');
    el.highlight.style.setProperty('height', targetOffset.height + 6 + 'px');
  });
}
function editableHighlighter (resultID, show, firstVisible) {

  if (!show) {
    UI$1.editableHighlight[resultID]?.highlight.style.setProperty('opacity', '0');
    return;
  }
  const result = State.results[resultID];
  let el = UI$1.editableHighlight[resultID]?.highlight;
  if (!el) {
    el = document.createElement('ed11y-element-highlight');
    el.classList.add('ed11y-element');
    UI$1.editableHighlight[resultID] = {highlight: el, resultID: resultID};
    el.style.setProperty('position', 'absolute');
    el.style.setProperty('pointer-events', 'none');
    State.panelAttachTo.appendChild(el);
  }
  UI$1.editableHighlight[resultID].target = firstVisible ? firstVisible : result.element;
  const zIndex = result.dismissalKey ? 'calc(var(--ed11y-buttonZIndex, 9999) - 2)' : 'calc(var(--ed11y-buttonZIndex, 9999) - 1)';
  el.style.setProperty('z-index', zIndex);
  const outline = result.dismissalKey ?
    '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-warning, #fad859), 0 0 0 3px var(--ed11y-warning, #fad859), 0 0 0 4px var(--ed11y-primary)'
    : '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-alert, #b80519), 0 0 0 3px var(--ed11y-alert, #b80519), 0 0 1px 3px';
  el.style.setProperty('box-shadow', outline);
  el.style.setProperty('border-radius', '3px');
  el.style.setProperty('top', '0');
  el.style.setProperty('left', '0');
  alignHighlights();
  el.style.setProperty('opacity', '1');
}
function resetResults(incremental) {
  State.jumpList = [];
  State.openTip = {
    button: false,
    tip: false,
  };
  State.lastOpenTip = -1;
  resetClass([
    'ed11y-ring-red',
    'ed11y-ring-yellow',
    'ed11y-hidden-highlight',
    'ed11y-warning-inline',
    'ed11y-warning-block',
    'ed11y-error-block',
    'ed11y-error-inline',
  ]);
  // Reset insertions into body content.
  if (incremental) {
    findElements$1('reset', 'ed11y-element-highlight', false);
  } else {
    findElements$1('reset', 'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', false);
  }
  State.elements.reset?.forEach((el) => el.remove());

  // Flicker prevention -- leave old tip in place for 100ms.
  findElements$1('delayedReset', 'ed11y-element-result, ed11y-element-tip', false);
  const delayedReset = State.elements.delayedReset;

  window.setTimeout(()=> {
    delayedReset?.forEach((el) => el.remove());
  }, 100, delayedReset);

  if (UI$1.panelJumpNext) {
    UI$1.panelJumpNext.querySelector('.ed11y-sr-only').textContent = M.buttonFirstContent;
  }
  // Reset insertions into body content.
}
function resetPanel() {
  // Reset main panel.
  State.visualizing = true; // so visualize function removes visualizers.
  visualize();
  if (State.totalCount === 0 && State.dismissedCount > 0) {
    UI$1.panelCount.textContent = 'i';
    UI$1.panelToggleTitle.textContent = State.dismissedCount === 1 ?
      M.buttonShowHiddenAlert :
      M.buttonShowHiddenAlerts(State.dismissedCount);
  }
  if (!State.options.showDismissed && UI$1.showDismissed) {
    UI$1.showDismissed.setAttribute('data-ed11y-pressed', 'false');
    UI$1.showDismissed.querySelector('.ed11y-sr-only').textContent = State.dismissedCount === 1 ?
      M.buttonShowHiddenAlert : M.buttonShowHiddenAlerts(State.dismissedCount);
  }
  UI$1.panel?.classList.add('ed11y-shut');
  UI$1.panel?.classList.remove('ed11y-active');
  UI$1.panelToggle?.setAttribute('aria-expanded', 'false');
}
function reset () {
  pauseObservers();
  resetResults();
  resetPanel();
  State.incremental = false;
  State.running = false;
  State.showPanel = false;
  State.open = false;
}

function paintReady () {

  if (!State.options.cssUrls) {
    const cssLink = document.querySelector('link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]');
    if (cssLink) {
      State.options.cssUrls = [cssLink.getAttribute('href')];
    } else {
      console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
      State.options.cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`];
    }
  }

  for (const [key, value] of Object.entries(Theme)) {
    document.documentElement.style.setProperty('--ed11y-' + key, value);
  }

  // May be redundant, but preloads unbundled files.
  if (document.querySelector('body')) {
    // May be redundant, but preloads unbundled files.
    UI$1.attachCSS(document.querySelector('body'));
  }


  State.roots.forEach((root) => {
    // Shadow elements don't inherit styles, so they need their own copy.
    if (State.options.shadowComponents) {
      root.querySelectorAll(State.options.shadowComponents)?.forEach((shadowHost) => {
        if (shadowHost.shadowRoot) {
          UI$1.attachCSS(shadowHost.shadowRoot);
        }
      });
    }
  });
  State.bodyStyle = true;
}
function togglePanel () {
  State.ignoreAll = false;

  if (!State.doubleClickPrevent) {
    // Prevent clicks piling up while scan is running.
    if (State.running !== true) {
      State.running = true;
      // Re-scan each time the panel reopens.
      if (UI$1.panel.classList.contains('ed11y-shut') === true) {
        State.onLoad = false;
        State.incremental = false;
        State.showPanel = true;
        if (State.dismissedCount > 0 && State.warningCount === 0 && State.errorCount === 0) {
          State.options.showDismissed = false;
          toggleShowDismissals();
        } else {
          checkAll();
        }
        State.options.userPrefersShut = false;
        localStorage.setItem('editoria11yShow', '1');
      }
      else {
        UI$1.panelToggleTitle.textContent = State.totalCount > 0 ? M.buttonShowAlerts : M.buttonShowNoAlert;
        State.options.showDismissed = false;
        reset();
        State.options.userPrefersShut = true;
        localStorage.setItem('editoria11yShow', '0');
      }
    }
  }
  State.doubleClickPrevent = true;
  window.setTimeout(function () {
    State.doubleClickPrevent = false;
  }, 200);
  return false;
}
function showHeadingsPanel () {
  // Visualize the document outline

  let panelOutline = UI$1.panel.querySelector('#ed11y-outline');

  if (State.headingOutline.length) {
    panelOutline.innerHTML = '';
    State.headingOutline.forEach((el, i) => {
      // Todo: draw these in editable mode.
      if (State.options.inlineAlerts) {
        const mark = document.createElement('ed11y-element-heading-label');
        mark.classList.add('ed11y-element', 'ed11y-element-heading');
        mark.dataset.ed11yHeadingOutline = i.toString();
        mark.setAttribute('id', 'ed11y-heading-' + i);
        mark.setAttribute('tabindex', '-1');
        // Array: el, level, outlinePrefix
        el[0].insertAdjacentElement('afterbegin', mark);
        UI$1.attachCSS(mark.shadowRoot);
      }
      let level = el[1];
      let leftPad = 10 * level - 10;
      let li = document.createElement('li');
      li.classList.add('level' + level);
      li.style.setProperty('margin-left', leftPad + 'px');
      let levelPrefix = document.createElement('strong');
      levelPrefix.textContent = `H${level}: `;
      let userText = document.createElement('span');
      userText.textContent = computeText(el[0]);
      let link = document.createElement('a');
      if (State.options.inlineAlerts) {
        link.setAttribute('href', '#ed11y-heading-' + i);
        li.append(link);
        link.append(levelPrefix);
        link.append(userText);
      } else {
        li.append(levelPrefix);
        li.append(userText);
      }
      if (el[2]) { // Has an error message
        let type = !el[3] ? 'ed11y-error' : 'ed11y-warning';
        li.classList.add(type);
        let message = document.createElement('em');
        message.classList.add('ed11y-small');
        message.textContent = ' ' + el[2];
        if (State.options.inlineAlerts) {
          link.append(message);
        } else {
          li.append(message);
        }
      }
      panelOutline.append(li);
    });
  } else {
    panelOutline.innerHTML = '<p><em>No heading structure found.</em></p>';
  }
}

class Ed11yElementResult extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      this.open = false;
      this.racing = false;
      this.style.setProperty('outline', '0px solid transparent');

      this.initialized = true;
    }
  }

  handleHover(event) {
    event.preventDefault();
    let host = this.getRootNode().host;
    if (!this.classList.contains('intersecting') && host.open !== true && host.racing === false) {
      this.open = true;
      host.racing = true;
      host.toggleTip(true);
      State.toggledFrom = this;
      window.setTimeout(function () {
        host.racing = false;
      }, 250, host);
    }
  }

  handleFocus() {
    let host = this.getRootNode().host;
    if (this.getRootNode().host.classList.contains('ed11y-offscreen')) {
      host.result.element.scrollIntoView();
      alignButtons();
    }
  }

  toggleClick(event) {
    event.preventDefault();
    let host = this.getRootNode().host;
    // Todo: extremely fast clicks throw TypeError: e is null
    if (host.racing === false) {
      host.racing = true;
      State.toggledFrom = this;
      let stateChange = host.getAttribute('data-ed11y-open') === 'false' ? 'open' : 'close';
      host.setAttribute('data-ed11y-action', stateChange);
      if (stateChange === 'open') {
        window.setTimeout(function () {
          let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
          activeTip?.shadowRoot.querySelector('.title').focus();
        }, 500);
      }
      window.setTimeout(function () {
        host.racing = false;
      }, 250, host);
    }

  }

  closeOtherTips() {
    if (State.openTip.button) {
      State.openTip.button.setAttribute('data-ed11y-action', 'close');
    }
  }

  buildTip() {
    this.tipNeedsBuild = false;

    let tip = document.createElement('ed11y-element-tip');
    tip.result = this.result;
    tip.setAttribute('data-ed11y-result', this.resultID);
    tip.classList.add('ed11y-element');
    tip.style.setProperty('opacity', '0');
    State.panelAttachTo.insertAdjacentElement('beforeend', tip);
    this.tip = tip;
  }

  toggleTip(changeTo) {
    if (this.tipNeedsBuild) {
      this.buildTip();
    }
    this.toggle.setAttribute('aria-expanded', changeTo);
    let highlightOutline = this.dismissable ? 'ed11y-ring-yellow' : 'ed11y-ring-red';
    if (State.options.inlineAlerts) {
      resetClass([
        'ed11y-hidden-highlight',
        'ed11y-ring-red',
        'ed11y-ring-yellow',
        'ed11y-warning-block',
        'ed11y-error-block',
        'ed11y-warning-inline',
        'ed11y-error-inline',
      ]);
    } else {
      editableHighlighter(this.resultID, changeTo);
    }
    if (changeTo === true) {
      this.tip.style.setProperty('opacity', '0');
      // Allow for themes to reveal hidden tips
      document.dispatchEvent(new CustomEvent('ed11yPop', {
        detail: {
          id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result'),
          result: this.result,
          tip: this.tip
        }
      }));
      this.closeOtherTips();
      this.tip.setAttribute('data-ed11y-action', 'open');
      if (State.options.inlineAlerts) {
        this.result.element.classList.add(highlightOutline);
        // Removed in 2.3.6; Todo: confirm not needed and delete.
        /*if (this.result.element.style.outline.indexOf('alert') === -1 ) {
          // Set property unless alert is already set.
          const display = window.getComputedStyle(this.result.element).getPropertyValue('display');
          let outlineClass;
          if (display.indexOf('inline') === -1 || this.result.element.tagName === 'IMG') {
            outlineClass = this.result.dismissalKey ?
              'ed11y-warning-block'
              : 'ed11y-error-block';
          } else {
            outlineClass = this.result.dismissalKey ?
              'ed11y-warning-inline'
              : 'ed11y-error-inline';
          }
          this.result.element.classList.add(outlineClass);
        }*/
      }
      requestAnimationFrame(()=>alignTip(this.toggle, this.tip, 4, true));
      if (!State.jumpList) {
        buildJumpList();
      }
      State.lastOpenTip = Number(this.getAttribute('data-ed11y-jump-position'));
      State.openTip = {
        button: this,
        tip: this.tip,
      };
      this.result.highlight?.style.setProperty('opacity', '1');
    } else {
      // Allow for themes to restore original DOM/CSS
      document.dispatchEvent(new CustomEvent('ed11yShut', {
        detail: { id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result') }
      }));
      this.tip.setAttribute('data-ed11y-action', 'shut');
      this.result.highlight?.style.setProperty('opacity', '0');
      State.openTip = {
        button: false,
        tip: false,
      };
    }
    this.setAttribute('data-ed11y-open', changeTo);
    this.open = changeTo;
  }


  static get observedAttributes() { return ['data-ed11y-action']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (this.initialized) {
      switch (attr) {
      case 'data-ed11y-action':
        if (newValue !== 'false') {
          let changeTo = newValue === 'open';
          this.setAttribute('data-ed11y-action', 'false');
          this.toggleTip(changeTo);
        }
        break;
      }
    }
  }
}

class Ed11yElementPanel extends HTMLElement {

  constructor() {
    super();
  }

  // todo mvp parameterize
  template() {
    // TODO: CHANGE FROM VISIBILITY TO WIDTH TOGGLES SO FOCUS WORKS
    // Todo: details summary language params
    // todo: don't switch both label and aria-expanded on show hidden
    return `
    <div class='ed11y-buttonbar'>
      <button id='ed11y-show-hidden' data-ed11y-pressed='false' hidden>
        <svg aria-hidden="true" class="shown" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="9 0 640 512"><path fill="Currentcolor" d="M288 32c-81 0-146 37-193 81C49 156 17 208 3 244c-3 8-3 17 0 25C17 304 49 356 95 399C142.5 443 207 480 288 480s146-37 193-81c47-44 78-95 93-131c3-8 3-17 0-25c-15-36-46-88-93-131C434 69 369 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35-29 64-64 64c-7 0-14-1-20-3c-6-2-12 2-12 7c.3 7 1 14 3 21c14 51 66 82 118 68s82-66 68-118c-11-42-48-69-89-71c-6-.2-9 6-7 12c2 6 3 13 3 20z"/></svg>
        <svg aria-hidden="true" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="39 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>
        <span class="ed11y-sr-only"></span>
      </button>
      <button id='ed11y-visualize' data-ed11y-pressed="false" class='ed11y-panel-fa'>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 10 512 512"><path fill="Currentcolor" d="M152 38c10 9 11 24 2 34l-72 80c-4 5-11 8-17 8s-13-2-18-7L7 113C-2 104-2 88 7 79s25-9 34 0l22 22 55-61c9-10 24-11 34-2zm0 160c10 9 11 24 2 34l-72 80c-4 5-11 8-17 8s-13-2-18-7L7 273c-9-9-9-25 0-34s25-9 35 0l22 22 55-61c9-10 24-11 34-2zM224 96c0-18 14-32 32-32l224 0c18 0 32 14 32 32s-14 32-32 32l-224 0c-18 0-32-14-32-32zm0 160c0-18 14-32 32-32l224 0c18 0 32 14 32 32s-14 32-32 32l-224 0c-18 0-32-14-32-32zM160 416c0-18 14-32 32-32l288 0c18 0 32 14 32 32s-14 32-32 32l-288 0c-18 0-32-14-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
        <span class="ed11y-sr-only"></span>
      </button>
      <div id='ed11y-visualizers' class="content" hidden>
          <details id="ed11y-headings-tab">
              <summary>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M0 96C0 78 14 64 32 64l384 0c18 0 32 14 32 32s-14 32-32 32L32 128C14 128 0 114 0 96zM64 256c0-18 14-32 32-32l384 0c18 0 32 14 32 32s-14 32-32 32L96 288c-18 0-32-14-32-32zM448 416c0 18-14 32-32 32L32 448c-18 0-32-14-32-32s14-32 32-32l384 0c18 0 32 14 32 32z"></path></svg> <span class="summary-title"></span>
              </summary>
              <div class="details">
                  <span class="details-title"></span>
                  <ul id='ed11y-outline'></ul>
              </div>
          </details>
          <details id="ed11y-alts-tab">
            <summary>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 576 512"><path fill="currentColor" d="M160 80l352 0c9 0 16 7 16 16l0 224c0 8.8-7.2 16-16 16l-21 0L388 179c-4-7-12-11-20-11s-16 4-20 11l-52 80-12-17c-5-6-12-10-19-10s-15 4-19 10L176 336 160 336c-9 0-16-7-16-16l0-224c0-9 7-16 16-16zM96 96l0 224c0 35 29 64 64 64l352 0c35 0 64-29 64-64l0-224c0-35-29-64-64-64L160 32c-35 0-64 29-64 64zM48 120c0-13-11-24-24-24S0 107 0 120L0 344c0 75 61 136 136 136l320 0c13 0 24-11 24-24s-11-24-24-24l-320 0c-49 0-88-39-88-88l0-224zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg> <span class="summary-title"></span>
            </summary>
            <div class="details">
                <span class="details-title"></span>
                <ul id='ed11y-alt-list'></ul>
            </div>
        </details>
        </div>
      <button type='button' id='ed11y-toggle'><span class="ed11y-sr-only">Show alerts</span><span class="ed11y-toggle-circle"><span class='icon'><svg class="errors-icon" xmlns="http://www.w3.org/2000/svg" width="10" aria-hidden="true" viewBox="0 0 448 512"><path fill="currentColor" d="M64 32C64 14 50 0 32 0S0 14 0 32L0 64 0 368 0 480c0 18 14 32 32 32s32-14 32-32l0-128 64-16c41-10 85-5 123 13c44.2 22 96 25 142 7l35-13c13-5 21-17 21-30l0-248c0-23-24-38-45-28l-10 5c-46 23-101 23-147 0c-35-18-75-22-114-13L64 48l0-16z"></path></svg><svg class="pass-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="-.75 -3.5 10.1699 19.1777"><path fill="currentColor" d="M3.7031,10.5527c-.3633-.6562-.6426-1.1387-.8379-1.4473l-.3105-.4863-.2344-.3574c-.5117-.7969-1.0449-1.4551-1.5996-1.9746.3164-.2617.6113-.3926.8848-.3926.3359,0,.6348.123.8965.3691s.5918.7148.9902,1.4062c.4531-1.4727,1.0293-2.8691,1.7285-4.1895.3867-.7188.7314-1.2021,1.0342-1.4502s.7041-.3721,1.2041-.3721c.2656,0,.5938.041.9844.123-1.0039.8086-1.8066,1.7695-2.4082,2.8828s-1.3789,3.0762-2.332,5.8887Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="close-icon" viewBox="0 0 384 512"><path fill="currentColor" d="M343 151c13-13 13-33 0-46s-33-13-45 0L192 211 87 105c-13-13-33-13-45 0s-13 33 0 45L147 256 41 361c-13 13-13 33 0 45s33 13 45 0L192 301 297 407c13 13 33 13 45 0s13-33 0-45L237 256 343 151z"></path></svg></span></span></button>
      <button class='ed11y-jump next' data-ed11y-goto='0' aria-haspopup="dialog"><svg class="hover-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" viewBox="0 -15 90 120"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m30 00 50 50-50 50" stroke-width="18"></path></svg><span class='toggle-count'></span><span class='jump-next ed11y-sr-only'></span></button>
     </div>
    </div>
    <div id="ed11y-message" aria-live="polite"></div>
    `;
  }

  connectedCallback() {
    if (!this.initialized) {

      this.style.setProperty('outline', '0');
      this.classList.add('ed11y-element');
      const shadow = this.attachShadow({mode: 'open'});
      const wrapper = document.createElement('aside');
      wrapper.setAttribute('id', 'ed11y-panel');
      //!!wrapper.setAttribute('aria-label', M.panelControls);
      wrapper.classList.add('ed11y-wrapper', 'ed11y-panel-wrapper', 'ed11y-pass', 'ed11y-preload');
      wrapper.innerHTML = this.template();
      shadow.appendChild(wrapper);
      const panelTabs = wrapper.querySelectorAll('.ed11y-buttonbar button');
      panelTabs.forEach(tab => {
        // todo: syntax could be shrunk now that these aren't tabs.
        tab.addEventListener('click', this.handleBarClick);
      });
      const altDetails = wrapper.querySelector('#ed11y-alts-tab');
      const headingDetails = wrapper.querySelector('#ed11y-headings-tab');
      altDetails.addEventListener('toggle', () => {
        if (altDetails.open && headingDetails.open) {
          headingDetails.removeAttribute('open');
        }
      });
      headingDetails.addEventListener('toggle', () => {
        if (altDetails.open && headingDetails.open) {
          altDetails.removeAttribute('open');
        }
      });
      this.initialized = true;
    }
  }
/*
  // @todo move out.
  jumpTo(event) {
    // Handle jump
    event.preventDefault();
    State.toggledFrom = event.target.closest('button');
    if (!State.open) {
      togglePanel();
      window.setTimeout(function() {
        jumpTo(1);
      },500);
    } else {
      jumpTo(1);
    }
  }
*/

  handleBarClick(event) {
    event.preventDefault();
    UI$1.message.textContent = '';
    let id = event.currentTarget.getAttribute('id');
    switch (id) {
    case 'ed11y-toggle':
      togglePanel();
      break;
    case 'ed11y-show-hidden':
      toggleShowDismissals();
      break;
    case 'ed11y-visualize':
      if (!State.open) {
        togglePanel();
      }
      visualize();
      break;
    }
  }
}

class Ed11yElementHeadingLabel extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({mode: 'open'});
      let wrapper = document.createElement('div');
      wrapper.classList.add('ed11y-wrapper', 'ed11y-heading-wrapper');
      let i = this.dataset.ed11yHeadingOutline;
      let result = State.headingOutline[i];
      wrapper.innerHTML = 'H' + result[1];
      let issues = !!result[2];
      wrapper.classList.add('issue' + issues);
      let fontSize = Math.max(52 - 8 * result[1], 12);
      wrapper.style.setProperty('font-size', fontSize + 'px');
      shadow.appendChild(wrapper);
      this.initialized = true;
    }
  }
}

const Elements = (function myElements() {
  const Found = {};
  function initializeElements(option) {
    // Since 4.0.0: For performance, we filter elements instead of dozens of querySelectors on the DOM.
    Found.Everything = find('*', 'root', Constants.Exclusions.Sa11yElements);

    Found.Contrast = Found.Everything.filter(($el) => {
      const matchesSelector = Constants.Exclusions.Contrast.some((exclusion) => $el.matches(exclusion));
      return !matchesSelector && !Constants.Exclusions.Contrast.includes($el);
    });

    Found.Images = Found.Everything.filter(($el) => $el.tagName === 'IMG'
      && !Constants.Exclusions.Images.some((selector) => $el.matches(selector)));

    Found.Links = Found.Everything.filter(($el) => ($el.tagName === 'A' || $el.tagName === 'a')
      && $el.hasAttribute('href')
      && !$el.matches('[role="button"]') // Exclude links with [role="button"]
      && !Constants.Exclusions.Links.some((selector) => $el.matches(selector)));

    // We want headings from the entire document for the Page Outline.
    Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      'document',
      Constants.Exclusions.Headings,
    );
    Found.HeadingOne = find(
      'h1, [role="heading"][aria-level="1"]',
      'document',
      Constants.Exclusions.Headings,
    );

    // Excluded via headerIgnore.
    Found.ExcludedHeadings = Found.Headings.filter((heading) => Constants.Exclusions.Headings.some((exclusion) => heading.matches(exclusion)));

    // Excluded via outlineIgnore.
    Found.ExcludedOutlineHeadings = Found.Headings.filter((heading) => Constants.Exclusions.Outline.some((exclusion) => heading.matches(exclusion)));

    // Merge both headerIgnore and outlineIgnore.
    Found.OutlineIgnore = Elements.Found.ExcludedOutlineHeadings.concat(Elements.Found.ExcludedHeadings);

    // Quality assurance module.
    Found.Paragraphs = Found.Everything.filter(($el) => $el.tagName === 'P'
      && !$el.closest('table'));

    Found.Lists = Found.Everything.filter(($el) => $el.tagName === 'LI');

    Found.Blockquotes = Found.Everything.filter(($el) => $el.tagName === 'BLOCKQUOTE');

    Found.Tables = Found.Everything.filter(($el) => $el.tagName === 'TABLE' && !$el.matches('[role="presentation"]') && !$el.matches('[role="none"]'));

    Found.StrongItalics = Found.Everything.filter(($el) => ['STRONG', 'EM'].includes($el.tagName));

    Found.Subscripts = Found.Everything.filter(($el) => ['SUP', 'SUB'].includes($el.tagName));

    const badLinkSources = option.checks.QA_BAD_LINK.sources;
    Found.CustomErrorLinks = badLinkSources.length
      ? Found.Links.filter(($el) => badLinkSources.split(',').some((selector) => $el.matches(selector.trim()))) : [];

    // Readability.
    const readabilityExclusions = ($el) => Constants.Root.Readability.contains($el)
      && !Constants.Exclusions.Readability.some((selector) => $el.matches(selector));
    Found.Readability = [
      ...Found.Paragraphs.filter(readabilityExclusions),
      ...Found.Lists.filter(readabilityExclusions),
    ];

    // Developer checks.
    const nestedSources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
    Found.NestedComponents = nestedSources
      ? Found.Everything.filter(($el) => $el.matches(nestedSources)) : [];

    Found.TabIndex = Found.Everything.filter(($el) => $el.hasAttribute('tabindex')
      && $el.getAttribute('tabindex') !== '0'
      && !$el.getAttribute('tabindex').startsWith('-'));

    Found.Svg = Found.Everything.filter(($el) => $el.tagName === 'svg');

    Found.Buttons = Found.Everything.filter(($el) => $el.tagName === 'BUTTON' || $el.matches('[role="button"]'));

    Found.Inputs = Found.Everything.filter(($el) => ['INPUT', 'SELECT', 'TEXTAREA', 'METER', 'PROGRESS'].includes($el.tagName));

    Found.Labels = Found.Everything.filter(($el) => $el.tagName === 'LABEL');

    // iFrames.
    Found.iframes = Found.Everything.filter(($el) => ['IFRAME', 'AUDIO', 'VIDEO'].includes($el.tagName));
    Found.Videos = Found.iframes.filter(($el) => $el.matches(Constants.Global.VideoSources));
    Found.Audio = Found.iframes.filter(($el) => $el.matches(Constants.Global.AudioSources));
    Found.Visualizations = Found.iframes.filter(($el) => $el.matches(Constants.Global.VisualizationSources));
    Found.EmbeddedContent = Found.iframes.filter(($el) => !$el.matches(Constants.Global.AllEmbeddedContent));

    // Query select <HTML> given that the lang may change on an SPA.
    const html = document.querySelector('html');
    Found.Language = html.getAttribute('lang');
  }

  /* ************* */
  /*  Annotations  */
  /* ************* */
  const Annotations = {};
  function initializeAnnotations() {
    Annotations.Array = find('sa11y-annotation', 'document');
    Annotations.Array.forEach((annotation, i) => {
      annotation.setAttribute('data-sa11y-position', i);
    });
  }

  return {
    initializeElements,
    Found,
    initializeAnnotations,
    Annotations,
  };
}());

class Ed11yElementTip extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized && this.result) {
      this.renderOnce();
    }
  }
  renderOnce() {
    this.initialized = true;
    this.open = true;
    this.style.setProperty('opacity', '0');
    this.style.setProperty('outline', '0px solid transparent');
    const shadow = this.attachShadow({mode: 'open'});

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('role', 'dialog');

    this.dismissable = this.result.dismissalKey !== false;
    this.dismissed = !!this.result.dismissalStatus;
    this.wrapper.classList.add('ed11y-tip-wrapper', 'ed11y-wrapper');
    this.wrapper.setAttribute('aria-label',
      `${M.issue}
        ${Number.parseInt(this.result.toggle.dataset.ed11yJumpPosition) + 1}`);

    this.addEventListener('mouseover', this.handleHover);

    UI.attachCSS(this.wrapper);

    this.tip = document.createElement('div');
    this.tip.classList.add('tip');

    let content = document.createElement('div');
    content.classList.add('content');
    this.heading = document.createElement('div');
    this.heading.classList.add('title');
    this.heading.setAttribute('tabindex', '-1');
    this.heading.innerHTML = Ed11y.M[this.result.test].title;
    content.append(this.heading);
    const alertBox = document.createElement('div');
    alertBox.classList.add('ed11y-tip-alert');
    this.heading.insertAdjacentElement('afterbegin', alertBox);

    let innerContent = document.createElement('div');
    innerContent.innerHTML = this.result.content;
    content.append(innerContent);

    if (!Ed11y.options.inlineAlerts || Ed11y.options.editLinks) {
      const editBar = document.createElement('div');

      if (!Ed11y.options.inlineAlerts) {
        editBar.classList.add('ed11y-tip-dismissals');
        const transferFocus = document.createElement('button');
        const transferIcon = document.createElement('span');
        transferIcon.classList.add('ed11y-transfer-icon');
        transferIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 256 512"><path fill="currentColor" d="M0 29C-1 47 12 62 29 64l8 1C71 67 96 95 96 128L96 224l-32 0c-18 0-32 14-32 32s14 32 32 32l32 0 0 96c0 33-26 61-59 64l-8 1C12 450-1 465 0 483s17 31 35 29l8-1c34-3 64-19 85-43c21 24 51 40 85 43l8 1c18 2 33-12 35-29s-12-33-29-35l-8-1C186 445 160 417 160 384l0-96 32 0c18 0 32-14 32-32s-14-32-32-32l-32 0 0-96c0-33 26-61 59-64l8-1c18-2 31-17 29-35S239-1 221 0l-8 1C179 4 149 20 128 44c-21-24-51-40-85-43l-8-1C17-1 2 12 0 29z"/></svg>';
        transferFocus.textContent = M.transferFocus;
        transferFocus.prepend(transferIcon);
        transferFocus.classList.add('dismiss', 'ed11y-transfer-focus');
        editBar.append(transferFocus);
        transferFocus.addEventListener('click', function(){Ed11y.transferFocus();});
      } else {
        editBar.classList.add('ed11y-custom-edit-links');
        editBar.append(Ed11y.options.editLinks.cloneNode(true));
      }
      content.append(editBar);
    }

    // Draw dismiss or restore buttons
    if (this.dismissable) {

      const buttonBar = document.createElement('div');
      buttonBar.classList.add('ed11y-tip-dismissals');

      const dismissIcon = document.createElement('span');
      dismissIcon.classList.add('ed11y-dismiss-icon');
      dismissIcon.innerHTML = '<svg aria-hidden="true" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>';

      // Dismissal Key is set in [5] if alert has been dismissed.
      if (Ed11y.options.showDismissed && this.dismissed) {

        // Check if user has permission to reset this alert.
        let okd = Ed11y.dismissedAlerts[Ed11y.options.currentPage][this.result.test][this.result.dismissalKey] === 'ok';
        if ((okd && Ed11y.options.allowOK) || (!okd)) {
          // User can restore this alert.
          const undismissButton = document.createElement('button');
          const unDismissIcon = document.createElement('span');
          unDismissIcon.classList.add('ed11y-dismiss-icon');
          unDismissIcon.innerHTML = '<svg aria-hidden="true" class="shown" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="-30 0 640 512"><path fill="Currentcolor" d="M288 32c-81 0-146 37-193 81C49 156 17 208 3 244c-3 8-3 17 0 25C17 304 49 356 95 399C142.5 443 207 480 288 480s146-37 193-81c47-44 78-95 93-131c3-8 3-17 0-25c-15-36-46-88-93-131C434 69 369 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35-29 64-64 64c-7 0-14-1-20-3c-6-2-12 2-12 7c.3 7 1 14 3 21c14 51 66 82 118 68s82-66 68-118c-11-42-48-69-89-71c-6-.2-9 6-7 12c2 6 3 13 3 20z"/></svg>';
          undismissButton.classList.add('dismiss');
          undismissButton.textContent = okd ? M.undismissOKButton : M.undismissHideButton;
          undismissButton.prepend(unDismissIcon);
          buttonBar.append(undismissButton);
          undismissButton.addEventListener('click', function(){Ed11y.dismissThis('reset');});
        } else {
          const undismissNote = document.createElement('div');
          undismissNote.classList.add('dismissed-note');
          undismissNote.textContent = M.undismissNotePermissions;
          buttonBar.append(undismissNote);
        }
      } else {

        const pageActions = document.createElement('details');
        const pageActionsSummary = document.createElement('summary');
        const othersLikeThis = Ed11y.results.filter(el => el.test === this.result.test).length;
        const showPageActions = othersLikeThis > 3 && Ed11y.options.allowHide && Ed11y.options.allowOK;

        if (showPageActions) {
          pageActions.classList.add('ed11y-bulk-actions', 'dismiss');
          pageActionsSummary.textContent = M.dismissActions(othersLikeThis);
          pageActions.appendChild(pageActionsSummary);
          buttonBar.appendChild(pageActions);
        }

        if (Ed11y.options.allowOK) {
          const check = document.createElement('span');
          check.setAttribute('aria-hidden', 'true');
          check.textContent = '✓';

          const OkButton = document.createElement('button');
          OkButton.classList.add('dismiss');
          if (Ed11y.options.syncedDismissals) {
            OkButton.setAttribute('title', M.dismissOkTitle);
          }
          OkButton.textContent = M.dismissOkButtonContent;
          buttonBar.prepend(OkButton);

          if (showPageActions) {
            const OkAllButton = OkButton.cloneNode(true);
            OkAllButton.textContent = M.dismissOkAllButton;
            OkAllButton.prepend(check.cloneNode(true));
            pageActions.append(OkAllButton);
            OkAllButton.addEventListener('click', function(){Ed11y.dismissThis('ok', true);});
          }

          OkButton.prepend(check);

          OkButton.addEventListener('click', function(){Ed11y.dismissThis('ok');});
        }

        if (Ed11y.options.allowHide) {
          const ignoreButton = document.createElement('button');
          ignoreButton.classList.add('dismiss');
          // todo parameterize
          if (Ed11y.options.syncedDismissals) {
            ignoreButton.setAttribute('title', M.dismissHideTitle);
          }
          ignoreButton.textContent = M.dismissHideButtonContent;
          ignoreButton.prepend(dismissIcon.cloneNode(true));
          buttonBar.prepend(ignoreButton);
          ignoreButton.addEventListener('click', function(){Ed11y.dismissThis('hide');});

          if (showPageActions) {
            const ignoreAllButton = document.createElement('button');
            ignoreAllButton.classList.add('dismiss');
            ignoreAllButton.textContent = M.dismissHideAllButton;
            ignoreAllButton.prepend(dismissIcon.cloneNode(true));
            pageActionsSummary.insertAdjacentElement('afterend', ignoreAllButton);
            ignoreAllButton.addEventListener('click', function(){Ed11y.dismissThis('hide', true);});
          }
        }
      }


      content.append(buttonBar);
    }
    this.tip.append(content);

    this.navBar = document.createElement('div');
    this.navBar.classList.add('ed11y-tip-header');
    this.count = document.createElement('div');
    this.count.classList.add('ed11y-tip-count');
    this.count.textContent = `${M.issue} ${Number.parseInt(this.result.toggle.dataset.ed11yJumpPosition) + 1} / ${Ed11y.jumpList.length}`;
    this.navBar.append(this.count);
    if (Ed11y.jumpList.length > 1) {
      this.prev = document.createElement('button');
      this.prev.classList.add('ed11y-tip-prev');
      this.prev.setAttribute('aria-label', M.buttonPrevContent);
      this.prev.setAttribute('title', M.buttonPrevContent);
      this.prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 -10 30 120"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="m40 100,-50 -50 50-50 50"></path></svg>';
      this.prev.addEventListener('click', (event) => {
        event.preventDefault();
        Ed11y.jumpTo(-1);
      });
      this.navBar.append(this.prev);

      this.next = document.createElement('button');
      this.next.classList.add('ed11y-tip-next');
      this.next.setAttribute('aria-label', M.buttonNextContent);
      this.next.setAttribute('title', M.buttonNextContent);
      this.next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 120 120" width="10"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="m30 00 50 50-50 50"></path></svg>';
      this.next.addEventListener('click', (event) => {
        event.preventDefault();
        Ed11y.jumpTo(1);
      });
      this.navBar.append(this.next);
    }
    this.help = document.createElement('details');
    this.help.classList.add('button');
    this.helpContent = document.createElement('div');
    this.helpContent.classList.add('ed11y-tip-help-content');
    this.helpContent.innerHTML = M.panelHelp;
    this.help.append(this.helpContent);
    this.helpToggle = document.createElement('summary');
    this.helpToggle.textContent = '?';
    this.helpToggle.setAttribute('aria-label', M.panelHelpTitle);
    this.helpToggle.setAttribute('title', M.panelHelpTitle);
    this.help.insertAdjacentElement('afterbegin', this.helpToggle);
    this.navBar.append(this.help);

    let closeButton = document.createElement('button');
    closeButton.setAttribute('aria-label',M.closeTip);
    closeButton.setAttribute('title',M.closeTip);
    closeButton.classList.add('close');
    closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 384 512"><path fill="currentColor" d="M343 151c13-13 13-33 0-46s-33-13-45 0L192 211 87 105c-13-13-33-13-45 0s-13 33 0 45L147 256 41 361c-13 13-13 33 0 45s33 13 45 0L192 301 297 407c13 13 33 13 45 0s13-33 0-45L237 256 343 151z"/></svg>';
    this.navBar.append(closeButton);
    this.tip.append(this.navBar);

    let arrow = document.createElement('div');
    arrow.classList.add('arrow');
    closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      if(this.open) {
        // todo this needs to be part of the shadow DOM query I think
        let toggle = document.querySelector('ed11y-element-result[data-ed11y-open="true"]');
        if (Ed11y.toggledFrom) {
          Ed11y.toggledFrom.focus();
        }
        // todo postpone: track if this tip was opened by the next button. If so, transfer focus back to it instead
        toggle?.setAttribute('data-ed11y-action', 'shut');
        this.setAttribute('data-ed11y-action', 'shut');
      }
    });
    document.addEventListener('click', (event) => {
      // Close tip when mouse is clicked outside it.
      if(this.open && !event.target.closest('ed11y-element-tip, ed11y-element-result, ed11y-element-panel')) {
        let toggle = document.querySelector('ed11y-element-result[data-ed11y-open="true"]');
        toggle?.setAttribute('data-ed11y-action', 'shut');
        this.setAttribute('data-ed11y-action', 'shut');
      }
    });
    shadow.appendChild(this.wrapper);
    let focusLoopLeft = document.createElement('div');
    focusLoopLeft.setAttribute('tabIndex', '0');
    let focusLoopRight = document.createElement('div');
    focusLoopRight.setAttribute('tabindex', '0');
    this.wrapper.appendChild(focusLoopLeft);
    this.wrapper.appendChild(arrow);
    this.wrapper.appendChild(this.tip);
    this.wrapper.appendChild(focusLoopRight);
    let focusables = this.wrapper.querySelectorAll('a, button, [tabindex="0"]');
    let count = focusables.length;
    focusables[0].addEventListener('focus', () => {
      focusables[count - 2].focus();
    });
    focusables[count - 1].addEventListener('focus', () => {
      focusables[1].focus();
    });
    this.initialized = true;
    this.rendering = false;
  }

  toggleTip(changeTo) {
    if (changeTo) {
      this.wrapper.classList.add('open');
      Ed11y.alertOnInvisibleTip(this.result.toggle, this.result.element);
    } else {
      this.wrapper.classList.remove('open');
    }
    this.setAttribute('data-ed11y-open',changeTo);
  }

  static get observedAttributes() { return ['data-ed11y-action']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (!this.initialized && this.result) {
      this.renderOnce();
    }
    if (this.initialized) {
      switch (attr) {
      case 'data-ed11y-action':
        if (newValue !== 'false') {
          let changeTo = newValue === 'open';
          this.open = changeTo;
          this.setAttribute('data-ed11y-action', 'false');
          this.toggleTip(changeTo);
        }
        break;
      }
    }
  }
}

function checkHeaders(results, option, headingOutline) {
  let prevLevel;
  let prevHeadingText = '';
  Elements.Found.Headings.forEach(($el, i) => {
    // Get accessible name of heading.
    const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
    const stringMatchExclusions = option.headerIgnoreStrings
      ? accName.replace(option.headerIgnoreStrings, '') : accName;
    const removeWhitespace$1 = removeWhitespace(stringMatchExclusions);
    const headingText = sanitizeHTML(removeWhitespace$1);

    // Check if heading is within root target area.
    const rootContainsHeading = Constants.Root.areaToCheck.contains($el);
    const rootContainsShadowHeading = Constants.Root.areaToCheck.contains($el.getRootNode().host);
    const isWithinRoot = rootContainsHeading || rootContainsShadowHeading;

    // Determine heading level.
    const level = parseInt($el.getAttribute('aria-level') || $el.tagName.slice(1), 10);
    const headingLength = removeWhitespace$1.length;
    const maxHeadingLength = option.checks.HEADING_LONG.maxLength || 160;

    // Default.
    let type = null;
    let content = null;
    let developer = null;
    let dismissAll = null;
    let margin = null;

    // Rulesets.
    if (headingLength === 0) {
      if ($el.querySelectorAll('img').length) {
        const alt = $el.querySelector('img')?.getAttribute('alt');
        if ($el.querySelector('img') && (!alt || alt.trim() === '')) {
          if (option.checks.HEADING_EMPTY_WITH_IMAGE) {
            type = option.checks.HEADING_EMPTY_WITH_IMAGE.type || 'error';
            content = Lang.sprintf(option.checks.HEADING_EMPTY_WITH_IMAGE.content || 'HEADING_EMPTY_WITH_IMAGE', level);
            developer = option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
            dismissAll = option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll ? 'HEADING_EMPTY_WITH_IMAGE' : false;
            margin = '-15px 30px';
          }
        }
      } else if (option.checks.HEADING_EMPTY) {
        type = option.checks.HEADING_EMPTY.type || 'error';
        content = Lang.sprintf(option.checks.HEADING_EMPTY.content || 'HEADING_EMPTY', level);
        developer = option.checks.HEADING_EMPTY.developer || false;
        dismissAll = option.checks.HEADING_EMPTY.dismissAll ? 'HEADING_EMPTY' : false;
        margin = '0';
      }
    } else if (level - prevLevel > 1 && i !== 0) {
      if (option.checks.HEADING_SKIPPED_LEVEL) {
        type = option.checks.HEADING_SKIPPED_LEVEL.type || 'error';
        content = Lang.sprintf(option.checks.HEADING_SKIPPED_LEVEL.content || 'HEADING_SKIPPED_LEVEL', prevLevel, level, truncateString(headingText, 60), truncateString(prevHeadingText, 60), prevLevel + 1);
        developer = option.checks.HEADING_SKIPPED_LEVEL.developer || false;
        dismissAll = option.checks.HEADING_SKIPPED_LEVEL.dismissAll ? 'HEADING_SKIPPED_LEVEL' : false;
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      if (option.checks.HEADING_FIRST) {
        type = option.checks.HEADING_FIRST.type || 'error';
        content = Lang.sprintf(option.checks.HEADING_FIRST.content || 'HEADING_FIRST');
        developer = option.checks.HEADING_FIRST.developer || false;
        dismissAll = option.checks.HEADING_FIRST.dismissAll ? 'HEADING_FIRST' : false;
      }
    } else if (headingLength > maxHeadingLength) {
      if (option.checks.HEADING_LONG) {
        type = option.checks.HEADING_LONG.type || 'warning';
        content = Lang.sprintf(option.checks.HEADING_LONG.content || 'HEADING_LONG', maxHeadingLength, headingLength);
        developer = option.checks.HEADING_LONG.developer || false;
        dismissAll = option.checks.HEADING_LONG.dismissAll ? 'HEADING_LONG' : false;
      }
    }

    // Create results object.
    if (content && type) {
      results.push({
        element: $el,
        type,
        content,
        dismiss: prepareDismissal(`H${level + headingText}`),
        dismissAll,
        isWithinRoot,
        developer,
        margin,
      });
    }

    // Reset level and text.
    prevLevel = level;
    prevHeadingText = headingText;

    // Create an object for heading outline panel.
    headingOutline.push({
      element: $el,
      headingLevel: level,
      text: headingText,
      index: i,
      type,
      dismiss: prepareDismissal(`H${level + headingText}`),
      isWithinRoot,
    });
  });

  // Missing Heading 1
  if (option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
    results.push({
      type: option.checks.HEADING_MISSING_ONE.type || 'warning',
      content: Lang.sprintf(option.checks.HEADING_MISSING_ONE.content || 'HEADING_MISSING_ONE'),
      dismiss: 'MISSINGH1',
      developer: option.checks.HEADING_MISSING_ONE.developer || false,
    });
  }
  return { results, headingOutline };
}

function checkLinkText(results, option) {
  // List of partial alt stop words.
  const linkStopWords = option.linkStopWords
    ? [...Lang._('PARTIAL_ALT_STOPWORDS'), ...option.linkStopWords.split(',').map((word) => word.trim())]
    : Lang._('PARTIAL_ALT_STOPWORDS');

  // Utility function to strip all space and special chars except forward slash.
  const stripSpecialCharacters = (string) => string.replace(/[^\w\s./]/g, '').replace(/\s+/g, ' ').trim();

  // Utility function to check if text contains stop words.
  const checkStopWords = (textContent, stopWords) => {
    const testTextContent = textContent.replace(/\./g, '').toLowerCase();
    let matchedWord = null;
    stopWords.forEach((word) => {
      if (testTextContent.length === word.length && testTextContent.indexOf(word.toLowerCase()) >= 0) {
        matchedWord = word;
      }
    });
    return matchedWord;
  };

  // Check for stop words.
  const containsLinkTextStopWords = (textContent) => {
    const hit = [null, null, null, null];

    hit[0] = checkStopWords(textContent, linkStopWords);

    // When link text contains "click".
    Lang._('CLICK').forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'i'); // Word boundary.
      if (regex.test(textContent)) {
        hit[1] = word;
      }
      return false;
    });

    // Flag citations/references. Check if link text matches a publication source.
    const doi = [
      'doi.org/',
      'dl.acm.org/',
      'link.springer.com/',
      'pubmed.ncbi.nlm.nih.gov/',
      'scholar.google.com/',
      'ieeexplore.ieee.org/',
      'researchgate.net/publication/',
      'sciencedirect.com/science/article/',
    ];
    doi.forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[2] = word;
      }
      return false;
    });

    // URL starts with.
    ['www.', 'http'].forEach((word) => {
      if (textContent.toLowerCase().startsWith(word)) {
        hit[3] = word;
      }
      return false;
    });

    // Flag link containing these typical URL endings.
    const urlEndings = ['.edu/', '.com/', '.net/', '.org/', '.us/', '.ca/', '.de/', '.icu/', '.uk/', '.ru/', '.info/', '.top/', '.xyz/', '.tk/', '.cn/', '.ga/', '.cf/', '.nl/', '.io/', '.fr/', '.pe/', '.nz/', '.pt/', '.es/', '.pl/', '.ua/'];
    urlEndings.forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[3] = word;
      }
      return false;
    });

    return hit;
  };

  const seen = {};
  Elements.Found.Links.forEach(($el) => {
    const href = standardizeHref($el);

    // Link text based on COMPUTED ACCESSIBLE NAME.
    const accName = computeAccessibleName($el, Constants.Exclusions.LinkSpan);
    const stringMatchExclusions = option.linkIgnoreStrings
      ? accName.replace(option.linkIgnoreStrings, '') : accName;
    const linkText = removeWhitespace(stringMatchExclusions);

    // Ignore special characters (except forward slash).
    const stripSpecialChars = stripSpecialCharacters(linkText);
    const error = containsLinkTextStopWords(stripSpecialChars);

    // Match special characters exactly 1 character in length.
    const specialCharPattern = /[^a-zA-Z0-9]/g;
    const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);

    // HTML symbols used as call to actions.
    const htmlSymbols = /([<>↣↳←→↓«»↴]+)/;
    const matches = linkText.match(htmlSymbols);
    const matchedSymbol = matches ? matches[1] : null;

    // Attributes.
    const titleAttr = $el.getAttribute('title');
    const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
    const negativeTabindex = $el.getAttribute('tabindex') === '-1';

    // Has ARIA.
    const hasAria = $el.querySelector(':scope [aria-labelledby], :scope [aria-label]') || $el.getAttribute('aria-labelledby') || $el.getAttribute('aria-label');
    const hasAriaLabelledby = $el.querySelector(':scope [aria-labelledby]') || $el.getAttribute('aria-labelledby');

    // New tab or new window.
    // Evaluate $el.textContent in addition to accessible name to bypass `linkIgnoreSpan` prop.
    const containsNewWindowPhrases = Lang._('NEW_WINDOW_PHRASES').some((pass) => linkText.toLowerCase().includes(pass) || getText($el).toLowerCase().includes(pass));

    // If visible label contains word "click" (regardless of accessible name).
    const containsClickPhrase = Lang._('CLICK').some((pass) => {
      const regex = new RegExp(`\\b${pass}\\b`, 'i'); // Word boundary.
      return regex.test($el.textContent);
    });

    // Link that points to a file type and indicates as such.
    const defaultFileTypes = ['pdf', 'doc', 'docx', 'word', 'mp3', 'ppt', 'text', 'pptx', 'txt', 'exe', 'dmg', 'rtf', 'windows', 'macos', 'csv', 'xls', 'xlsx', 'mp4', 'mov', 'avi', 'zip'];
    const fileTypes = defaultFileTypes.concat(Lang._('FILE_TYPE_PHRASES'));
    // Evaluate $el.textContent in addition to accessible name to bypass `linkIgnoreSpan` prop.
    const containsFileTypePhrases = fileTypes.some((pass) => linkText.toLowerCase().includes(pass) || getText($el).toLowerCase().includes(pass));
    const fileTypeMatch = $el.matches(`
          a[href$='.pdf'],
          a[href$='.doc'],
          a[href$='.docx'],
          a[href$='.zip'],
          a[href$='.mp3'],
          a[href$='.txt'],
          a[href$='.exe'],
          a[href$='.dmg'],
          a[href$='.rtf'],
          a[href$='.pptx'],
          a[href$='.ppt'],
          a[href$='.xls'],
          a[href$='.xlsx'],
          a[href$='.csv'],
          a[href$='.mp4'],
          a[href$='.mov'],
          a[href$='.avi']
        `);

    // Remove whitespace and special characters to improve accuracy and minimize false positives.
    const linkTextTrimmed = linkText.replace(/'|"|-|\.|\s+/g, '').toLowerCase();

    // Don't overlap with Alt Text module.
    if (!$el.querySelectorAll('img').length) {
      // Has aria-hidden.
      if (ariaHidden) {
        if (!negativeTabindex) {
          // If negative tabindex.
          if (option.checks.HIDDEN_FOCUSABLE) {
            results.push({
              element: $el,
              type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
              content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKHIDDENFOCUS${href + linkTextTrimmed}`),
              dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? 'LINK_HIDDEN_FOCUSABLE' : false,
              developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
            });
          }
        }
      } else if ((href || href === '') && linkText.length === 0) {
        // Empty hyperlinks.
        if (hasAriaLabelledby) {
          // Has ariaLabelledby attribute but empty accessible name.
          if (option.checks.LINK_EMPTY_LABELLEDBY) {
            results.push({
              element: $el,
              type: option.checks.LINK_EMPTY_LABELLEDBY.type || 'error',
              content: Lang.sprintf(option.checks.LINK_EMPTY_LABELLEDBY.content || 'LINK_EMPTY_LABELLEDBY'),
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKEMPTYLABELLEDBY${href}`),
              dismissAll: option.checks.LINK_EMPTY_LABELLEDBY.dismissAll ? 'LINK_EMPTY_LABELLEDBY' : false,
              developer: option.checks.LINK_EMPTY_LABELLEDBY.developer || true,
            });
          }
        } else if ($el.children.length) {
          // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
          if (option.checks.LINK_EMPTY_NO_LABEL) {
            results.push({
              element: $el,
              type: option.checks.LINK_EMPTY_NO_LABEL.type || 'error',
              content: Lang.sprintf(option.checks.LINK_EMPTY_NO_LABEL.content || 'LINK_EMPTY_NO_LABEL'),
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKEMPTYNOLABEL${href}`),
              dismissAll: option.checks.LINK_EMPTY_NO_LABEL.dismissAll ? 'LINK_EMPTY_NO_LABEL' : false,
              developer: option.checks.LINK_EMPTY_NO_LABEL.developer || false,
            });
          }
        } else if (option.checks.LINK_EMPTY) {
          // Completely empty <a></a>
          results.push({
            element: $el,
            type: option.checks.LINK_EMPTY.type || 'error',
            content: Lang.sprintf(option.checks.LINK_EMPTY.content || 'LINK_EMPTY'),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKEMPTY${href}`),
            dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
            developer: option.checks.LINK_EMPTY.developer || false,
          });
        }
      } else if (error[0] !== null) {
        // Contains stop words.
        if (option.checks.LINK_STOPWORD) {
          results.push({
            element: $el,
            type: option.checks.LINK_STOPWORD.type || 'error',
            content: option.checks.LINK_STOPWORD.content
              ? Lang.sprintf(option.checks.LINK_STOPWORD.content, error[0])
              : Lang.sprintf('LINK_STOPWORD', error[0]) + Lang.sprintf('LINK_TIP'),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKSTOPWORD${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_STOPWORD.dismissAll ? 'LINK_STOPWORD' : false,
            developer: option.checks.LINK_STOPWORD.developer || false,
          });
        }
      } else if (error[2] !== null) {
        // Contains DOI URL in link text.
        if (linkText.length > 8) {
          if (option.checks.LINK_DOI) {
            results.push({
              element: $el,
              type: option.checks.LINK_DOI.type || 'warning',
              content: Lang.sprintf(option.checks.LINK_DOI.content || 'LINK_DOI'),
              inline: true,
              dismiss: prepareDismissal(`LINKDOI${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_DOI.dismissAll ? 'LINK_DOI' : false,
              developer: option.checks.LINK_DOI.developer || false,
            });
          }
        }
      } else if (error[3] !== null) {
        // Contains URL in link text.
        if (linkText.length > (option.checks.LINK_URL.maxLength || 40)) {
          if (option.checks.LINK_URL) {
            results.push({
              element: $el,
              type: option.checks.LINK_URL.type || 'warning',
              content: option.checks.LINK_URL.content
                ? Lang.sprintf(option.checks.LINK_URL.content)
                : Lang.sprintf('LINK_URL') + Lang.sprintf('LINK_TIP'),
              inline: true,
              dismiss: prepareDismissal(`LINKURLNAME${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_URL.dismissAll ? 'LINK_URL' : false,
              developer: option.checks.LINK_URL.developer || false,
            });
          }
        }
      } else if (hasAria) {
        // Computed accessible name,
        const sanitizedText = sanitizeHTML(linkText);

        // General warning for visible non-descript link text, regardless of ARIA label.
        const excludeSpan = fnIgnore($el, Constants.Exclusions.LinkSpan);
        const visibleLinkText = option.linkIgnoreStrings
          ? getText(excludeSpan).replace(option.linkIgnoreStrings, '') : getText(excludeSpan);
        const cleanedString = stripSpecialCharacters(visibleLinkText);
        const stopword = checkStopWords(cleanedString, linkStopWords);
        if (option.checks.LINK_STOPWORD_ARIA && stopword !== null) {
          results.push({
            element: $el,
            type: option.checks.LINK_STOPWORD_ARIA.type || 'warning',
            content: option.checks.LINK_STOPWORD_ARIA.content
              ? Lang.sprintf(option.checks.LINK_STOPWORD_ARIA.content, stopword, sanitizedText)
              : Lang.sprintf('LINK_STOPWORD_ARIA', stopword, sanitizedText) + Lang.sprintf('LINK_TIP'),
            inline: true,
            dismiss: prepareDismissal(`LINKSTOPWORDARIA${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_STOPWORD_ARIA.dismissAll ? ' LINK_STOPWORD_ARIA' : false,
            developer: option.checks.LINK_STOPWORD_ARIA.developer || true,
          });
        } else if (option.checks.LINK_LABEL) {
          // If the link has any ARIA, append a "Good" link button.
          results.push({
            element: $el,
            type: option.checks.LINK_LABEL.type || 'good',
            content: option.checks.LINK_LABEL.content
              ? Lang.sprintf(option.checks.LINK_LABEL.content, sanitizedText)
              : `${Lang.sprintf('ACC_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKGOOD${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_LABEL.dismissAll ? 'LINK_LABEL' : false,
            developer: option.checks.LINK_LABEL.developer || true,
          });
        }

        // Button must have visible label as part of their accessible name.
        const isVisibleTextInAccessibleName$1 = isVisibleTextInAccessibleName($el);
        if (option.checks.LABEL_IN_NAME && isVisibleTextInAccessibleName$1 && $el.textContent.length !== 0) {
          results.push({
            element: $el,
            type: option.checks.LABEL_IN_NAME.type || 'warning',
            content: Lang.sprintf(option.checks.LABEL_IN_NAME.content || 'LABEL_IN_NAME', sanitizedText),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKLABELNAME${href + linkTextTrimmed}`),
            dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? 'BTN_LABEL_IN_NAME' : false,
            developer: option.checks.LABEL_IN_NAME.developer || true,
          });
        }
      } else if (matchedSymbol) {
        // If link contains a special character used as a CTA.
        if (option.checks.LINK_SYMBOLS) {
          results.push({
            element: $el,
            type: option.checks.LINK_SYMBOLS.type || 'warning',
            content: Lang.sprintf(option.checks.LINK_SYMBOLS.content || 'LINK_SYMBOLS', matchedSymbol),
            inline: true,
            dismiss: prepareDismissal(`LINKSYMBOL${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_SYMBOLS.dismissAll ? 'LINK_SYMBOLS' : false,
            developer: option.checks.LINK_SYMBOLS.developer || false,
          });
        }
      } else if (isSingleSpecialChar) {
        // Link is ONLY a period, comma, or special character.
        if (option.checks.LINK_EMPTY) {
          results.push({
            element: $el,
            type: option.checks.LINK_EMPTY.type || 'error',
            content: Lang.sprintf(option.checks.LINK_EMPTY.content || 'LINK_EMPTY'),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKCHAR${href}`),
            dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
            developer: option.checks.LINK_EMPTY.developer || false,
          });
        }
      }

      // Uses "click here" in the link text or accessible name.
      if (error[1] !== null || containsClickPhrase) {
        if (option.checks.LINK_CLICK_HERE) {
          results.push({
            element: $el,
            type: option.checks.LINK_CLICK_HERE.type || 'warning',
            content: option.checks.LINK_CLICK_HERE.content
              ? Lang.sprintf(option.checks.LINK_CLICK_HERE.content)
              : Lang.sprintf('LINK_CLICK_HERE') + Lang.sprintf('LINK_TIP'),
            inline: true,
            dismiss: prepareDismissal(`LINKCLICKHERE${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_CLICK_HERE.dismissAll ? 'LINK_CLICK_HERE' : false,
            developer: option.checks.LINK_CLICK_HERE.developer || false,
          });
        }
      }

      // Link's title attribute is the same as the link text.
      if (getText($el).length !== 0 && titleAttr?.toLowerCase() === linkText.toLowerCase()) {
        if (option.checks.DUPLICATE_TITLE) {
          results.push({
            element: $el,
            type: option.checks.DUPLICATE_TITLE.type || 'warning',
            content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || 'DUPLICATE_TITLE'),
            inline: true,
            dismiss: prepareDismissal(`LINKDUPLICATETITLE${href + linkTextTrimmed}`),
            dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? 'DUPLICATE_TITLE' : false,
            developer: option.checks.DUPLICATE_TITLE.developer || false,
          });
        }
      }
    }

    if (option.linksAdvancedPlugin) {
      if (linkTextTrimmed.length !== 0) {
        // Links with identical accessible names have equivalent purpose.
        if (seen[linkTextTrimmed] && !seen[href]) {
          const ignored = $el.ariaHidden === 'true' && $el.getAttribute('tabindex') === '-1';
          const hasAttributes = $el.hasAttribute('role') || $el.hasAttribute('disabled');
          if (option.checks.LINK_IDENTICAL_NAME && !hasAttributes && !ignored) {
            const sanitizedText = sanitizeHTML(linkText);
            results.push({
              element: $el,
              type: option.checks.LINK_IDENTICAL_NAME.type || 'warning',
              content: option.checks.LINK_IDENTICAL_NAME.content
                ? Lang.sprintf(option.checks.LINK_IDENTICAL_NAME.content, sanitizedText)
                : `${Lang.sprintf('LINK_IDENTICAL_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
              inline: true,
              dismiss: prepareDismissal(`LINKSEEN${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_IDENTICAL_NAME.dismissAll ? 'LINK_IDENTICAL_NAME' : false,
              developer: option.checks.LINK_IDENTICAL_NAME.developer || false,
            });
          }
        } else {
          seen[linkTextTrimmed] = true;
          seen[href] = true;
        }

        // Link opens in new tab without warning.
        if ($el.getAttribute('target')?.toLowerCase() === '_blank' && !fileTypeMatch && !containsNewWindowPhrases) {
          if (option.checks.LINK_NEW_TAB) {
            results.push({
              element: $el,
              type: option.checks.LINK_NEW_TAB.type || 'warning',
              content: Lang.sprintf(option.checks.LINK_NEW_TAB.content || 'LINK_NEW_TAB'),
              inline: true,
              dismiss: prepareDismissal(`LINKNEWTAB${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_NEW_TAB.dismissAll ? 'LINK_NEW_TAB' : false,
              developer: option.checks.LINK_NEW_TAB.developer || false,
            });
          }
        }

        // Link points to file (non HTML resource) without warning.
        if (fileTypeMatch && !containsFileTypePhrases) {
          if (option.checks.LINK_FILE_EXT) {
            results.push({
              element: $el,
              type: option.checks.LINK_FILE_EXT.type || 'warning',
              content: Lang.sprintf(option.checks.LINK_FILE_EXT.content || 'LINK_FILE_EXT'),
              inline: true,
              dismiss: prepareDismissal(`LINKEXT${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_FILE_EXT.dismissAll ? 'LINK_FILE_EXT' : false,
              developer: option.checks.LINK_FILE_EXT.developer || false,
            });
          }
        }
      }
    }
  });
  return results;
}

function checkImages(results, option) {
  const containsAltTextStopWords = (alt) => {
    const altUrl = [
      '.avif',
      '.png',
      '.jpg',
      '.jpeg',
      '.webp',
      '.gif',
      '.tiff',
      '.svg',
      '.heif',
      '.heic',
      'http',
    ];

    const hit = [null, null, null];
    altUrl.forEach((word) => {
      if (alt.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        hit[0] = word;
      } else {
        // Checking for image dimensions in alt text.
        const imageDimensions = /\b\d{2,6}\s*x\s*\d{2,6}\b/;
        const match = alt.toLowerCase().match(imageDimensions);
        if (match) {
          [hit[0]] = match;
        }
      }
    });

    const susAltWordsOverride = (option.susAltStopWords) ? option.susAltStopWords.split(',').map((word) => word.trim()) : Lang._('SUS_ALT_STOPWORDS');
    susAltWordsOverride.forEach((word) => {
      const susWord = alt.toLowerCase().indexOf(word);
      if (susWord > -1 && susWord < 6) {
        hit[1] = word;
      }
    });

    Lang._('PLACEHOLDER_ALT_STOPWORDS').forEach((word) => {
      if (alt.length === word.length && alt.toLowerCase().indexOf(word) >= 0) {
        hit[2] = word;
      }
    });

    // Additional placeholder stopwords to flag as an error.
    const { extraPlaceholderStopWords } = option;
    if (extraPlaceholderStopWords.length) {
      const array = extraPlaceholderStopWords.split(',').map((word) => word.trim());
      array.forEach((word) => {
        const susWord = alt.toLowerCase().indexOf(word);
        if (susWord > -1 && susWord < 6) {
          hit[2] = word;
        }
      });
    }

    return hit;
  };

  Elements.Found.Images.forEach(($el) => {
    const alt = (computeAriaLabel$1($el) === 'noAria') ? $el.getAttribute('alt') : computeAriaLabel$1($el);

    // If selectors passed via prop, it will treat that image as an unlinked image.
    const link = $el.closest(option.imageWithinLightbox
      ? `a[href]:not(${option.imageWithinLightbox})`
      : 'a[href]');

    // Image's source for key.
    const src = ($el.getAttribute('src')) ? $el.getAttribute('src') : $el.getAttribute('srcset');

    // Process link text exclusions.
    const linkSpanExclusions = link
      ? fnIgnore(link, Constants.Exclusions.LinkSpan).textContent : '';
    const stringMatchExclusions = option.linkIgnoreStrings
      ? linkSpanExclusions.replace(option.linkIgnoreStrings, '') : linkSpanExclusions;
    const linkTextLength = link
      ? removeWhitespace(stringMatchExclusions).length : 0;

    // Has aria-hidden.
    if ($el.getAttribute('aria-hidden') === 'true') {
      return;
    }

    // Ignore tracking pixels without explicit aria-hidden or nullified alt.
    if ($el.height < 2 && $el.width < 2 && (isElementHidden($el) || alt === '')) {
      return;
    }

    if (link && link.getAttribute('aria-hidden') === 'true') {
      // If linked image has aria-hidden, but is still focusable.
      const unfocusable = link.getAttribute('tabindex') === '-1';
      if (option.checks.HIDDEN_FOCUSABLE && !unfocusable) {
        results.push({
          element: $el,
          type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
          content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
          dismiss: prepareDismissal(`IMGHIDDENFOCUSABLE${src}`),
          dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll
            ? 'LINK_HIDDEN_FOCUSABLE' : false,
          developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
        });
      }
      return;
    }

    // If alt is missing.
    if (alt === null) {
      if (link) {
        const rule = (linkTextLength === 0)
          ? option.checks.MISSING_ALT_LINK
          : option.checks.MISSING_ALT_LINK_HAS_TEXT;
        const conditional = linkTextLength === 0
          ? 'MISSING_ALT_LINK' : 'MISSING_ALT_LINK_HAS_TEXT';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'error',
            content: Lang.sprintf(rule.content || conditional),
            dismiss: prepareDismissal(`${conditional + src + linkTextLength}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (option.checks.MISSING_ALT) {
        // General failure message if image is missing alt.
        results.push({
          element: $el,
          type: option.checks.MISSING_ALT.type || 'error',
          content: Lang.sprintf(option.checks.MISSING_ALT.content || 'MISSING_ALT'),
          dismiss: prepareDismissal(`IMGNOALT${src}`),
          dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
          developer: option.checks.MISSING_ALT.developer || false,
        });
      }
    } else {
      // If image has alt.
      const sanitizedAlt = sanitizeHTML(alt);
      const altText = removeWhitespace(sanitizedAlt);
      const error = containsAltTextStopWords(altText);
      const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');
      const titleAttr = $el.getAttribute('title');
      const decorative = (alt === '');

      // Figure elements.
      const figure = $el.closest('figure');
      const figcaption = figure?.querySelector('figcaption');
      const figcaptionText = (figcaption) ? figcaption.textContent.trim() : '';

      // Maximum alt text length
      const maxAltCharactersLinks = option.checks.LINK_IMAGE_LONG_ALT.maxLength || 250;
      const maxAltCharacters = option.checks.IMAGE_ALT_TOO_LONG.maxLength || 250;

      // If aria-label or aria-labelledby returns empty or invalid.
      if (option.checks.MISSING_ALT) {
        if (hasAria && altText === '') {
          results.push({
            element: $el,
            type: option.checks.MISSING_ALT.type || 'error',
            content: Lang.sprintf(option.checks.MISSING_ALT.content || 'MISSING_ALT'),
            dismiss: prepareDismissal(`IMGNOALTARIA${src}`),
            dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
            developer: option.checks.MISSING_ALT.developer || false,
          });
          return;
        }
      }

      // Decorative images.
      if (decorative) {
        const carouselSources = option.checks.IMAGE_DECORATIVE_CAROUSEL.sources;
        const carousel = carouselSources ? $el.closest(carouselSources) : '';
        if (carousel) {
          const numberOfSlides = carousel.querySelectorAll('img');
          const rule = (numberOfSlides.length === 1)
            ? option.checks.IMAGE_DECORATIVE
            : option.checks.IMAGE_DECORATIVE_CAROUSEL;
          const conditional = (numberOfSlides.length === 1)
            ? 'IMAGE_DECORATIVE'
            : 'IMAGE_DECORATIVE_CAROUSEL';
          if (rule) {
            results.push({
              element: $el,
              type: rule.type || 'warning',
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(conditional + src),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (link) {
          const rule = (linkTextLength === 0)
            ? option.checks.LINK_IMAGE_NO_ALT_TEXT
            : option.checks.LINK_IMAGE_TEXT;
          const conditional = linkTextLength === 0
            ? 'LINK_IMAGE_NO_ALT_TEXT' : 'LINK_IMAGE_TEXT';
          if (rule) {
            results.push({
              element: $el,
              type: rule.type || (linkTextLength === 0 ? 'error' : 'good'),
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(`${conditional + src + linkTextLength}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (figure) {
          const rule = (figcaption && figcaptionText.length)
            ? option.checks.IMAGE_FIGURE_DECORATIVE
            : option.checks.IMAGE_DECORATIVE;
          const conditional = figcaption && figcaptionText.length
            ? 'IMAGE_FIGURE_DECORATIVE' : 'IMAGE_DECORATIVE';
          if (rule) {
            results.push({
              element: $el,
              type: rule.type || 'warning',
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(`${conditional + src + figcaptionText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (option.checks.IMAGE_DECORATIVE) {
          results.push({
            element: $el,
            type: option.checks.IMAGE_DECORATIVE.type || 'warning',
            content: Lang.sprintf(option.checks.IMAGE_DECORATIVE.content || 'IMAGE_DECORATIVE'),
            dismiss: prepareDismissal(`DECIMAGE${src}`),
            dismissAll: option.checks.IMAGE_DECORATIVE.dismissAll ? 'IMAGE_DECORATIVE' : false,
            developer: option.checks.IMAGE_DECORATIVE.developer || false,
          });
        }
        return;
      }

      // Alt is unpronounceable.
      const unpronounceable = (link)
        ? option.checks.LINK_ALT_UNPRONOUNCEABLE : option.checks.ALT_UNPRONOUNCEABLE;
      if (unpronounceable) {
        if (alt.replace(/"|'|\?|\.|-|\s+/g, '') === '' && linkTextLength === 0) {
          const condition = (link) ? 'LINK_ALT_UNPRONOUNCEABLE' : 'ALT_UNPRONOUNCEABLE';
          results.push({
            element: $el,
            type: unpronounceable.type || 'error',
            content: Lang.sprintf(unpronounceable.content || condition, altText),
            dismiss: prepareDismissal(`UNPRONOUNCEABLE${src}`),
            dismissAll: unpronounceable.dismissAll ? 'ALT_UNPRONOUNCEABLE' : false,
            developer: unpronounceable.developer || false,
          });
          return;
        }
      }

      // Potentially contains auto-generated placeholder text.
      const maybeBadAlt = (link)
        ? option.checks.LINK_ALT_MAYBE_BAD : option.checks.ALT_MAYBE_BAD;
      const isTooLongSingleWord = new RegExp(`^\\S{${maybeBadAlt.minLength || 15},}$`);
      const containsNonAlphaChar = /[^\p{L}\-,.!?]/u.test(alt);

      // Alt text quality.
      if (error[0] !== null) {
        // Has stop words.
        const rule = (link)
          ? option.checks.LINK_ALT_FILE_EXT
          : option.checks.ALT_FILE_EXT;
        const conditional = (link) ? 'LINK_ALT_FILE_EXT' : 'ALT_FILE_EXT';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'error',
            content: Lang.sprintf(rule.content || conditional, error[0], altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (error[2] !== null) {
        // Placeholder words.
        const rule = (link)
          ? option.checks.LINK_PLACEHOLDER_ALT
          : option.checks.ALT_PLACEHOLDER;
        const conditional = (link) ? 'LINK_PLACEHOLDER_ALT' : 'ALT_PLACEHOLDER';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'error',
            content: Lang.sprintf(rule.content || conditional, altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (error[1] !== null) {
        // Suspicious words.
        const rule = (link)
          ? option.checks.LINK_SUS_ALT
          : option.checks.SUS_ALT;
        const conditional = (link) ? 'LINK_SUS_ALT' : 'SUS_ALT';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'warning',
            content: Lang.sprintf(rule.content || conditional, error[1], altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (maybeBadAlt && (isTooLongSingleWord.test(alt) && containsNonAlphaChar)) {
        // Alt text is a single word greater than 15 characters that is potentially auto-generated.
        const conditional = (link) ? 'LINK_ALT_MAYBE_BAD' : 'ALT_MAYBE_BAD';
        results.push({
          element: $el,
          type: maybeBadAlt.type || 'warning',
          content: Lang.sprintf(maybeBadAlt.content || conditional, altText),
          dismiss: prepareDismissal(`${conditional + src + altText}`),
          dismissAll: maybeBadAlt.dismissAll ? conditional : false,
          developer: maybeBadAlt.developer || false,
        });
      } else if (link
        ? alt.length > maxAltCharactersLinks
        : alt.length > maxAltCharacters) {
        // Alt is too long.
        const rule = (link)
          ? option.checks.LINK_IMAGE_LONG_ALT
          : option.checks.IMAGE_ALT_TOO_LONG;
        const conditional = (link) ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG';
        const truncated = truncateString(altText, 600);
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'warning',
            content: Lang.sprintf(rule.content || conditional, alt.length, truncated),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (link) {
        const rule = (linkTextLength === 0)
          ? option.checks.LINK_IMAGE_ALT
          : option.checks.LINK_IMAGE_ALT_AND_TEXT;
        const conditional = (linkTextLength === 0) ? 'LINK_IMAGE_ALT' : 'LINK_IMAGE_ALT_AND_TEXT';

        if (rule) {
          // Has both link text and alt text.
          const linkAccName = computeAccessibleName(link);
          const removeWhitespace$1 = removeWhitespace(linkAccName);
          const sanitizedText = sanitizeHTML(removeWhitespace$1);

          const tooltip = (linkTextLength === 0)
            ? Lang.sprintf('LINK_IMAGE_ALT', altText)
            : `${Lang.sprintf('LINK_IMAGE_ALT_AND_TEXT', altText, sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`;

          results.push({
            element: $el,
            type: rule.type || 'warning',
            content: rule.content
              ? Lang.sprintf(rule.content, altText, sanitizedText)
              : tooltip,
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (figure) {
        // Figure element has same alt and caption text.
        const duplicate = !!figcaption && (figcaptionText.toLowerCase() === altText.trim().toLowerCase());
        if (duplicate) {
          if (option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
            results.push({
              element: $el,
              type: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.type || 'warning',
              content: Lang.sprintf(option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content || 'IMAGE_FIGURE_DUPLICATE_ALT', altText),
              dismiss: prepareDismissal(`FIGDUPLICATE${src}`),
              dismissAll: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll ? 'IMAGE_FIGURE_DUPLICATE_ALT' : false,
              developer: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false,
            });
          }
        } else if (option.checks.IMAGE_PASS) {
          // Figure has alt text!
          results.push({
            element: $el,
            type: option.checks.IMAGE_PASS.type || 'good',
            content: Lang.sprintf(option.checks.IMAGE_PASS.content || 'IMAGE_PASS', altText),
            dismiss: prepareDismissal(`FIGIMGPASS${src + altText}`),
            dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
            developer: option.checks.IMAGE_PASS.developer || false,
          });
        }
      } else if (option.checks.IMAGE_PASS) {
        if (!$el.closest('button, [role="button"]')) {
          // Image has alt text!
          results.push({
            element: $el,
            type: option.checks.IMAGE_PASS.type || 'good',
            content: Lang.sprintf(option.checks.IMAGE_PASS.content || 'IMAGE_PASS', altText),
            dismiss: prepareDismissal(`IMAGEPASS${src + altText}`),
            dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
            developer: option.checks.IMAGE_PASS.developer || false,
          });
        }
      }

      // Image's title attribute is the same as the alt.
      // Since this is extra, it's okay if it overlaps "good" annotation.
      if (titleAttr?.toLowerCase() === alt.toLowerCase()) {
        if (option.checks.DUPLICATE_TITLE) {
          results.push({
            element: $el,
            type: option.checks.DUPLICATE_TITLE.type || 'warning',
            content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || 'DUPLICATE_TITLE'),
            inline: true,
            dismiss: prepareDismissal(`ALTDUPLICATETITLE${altText}`),
            dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? 'DUPLICATE_TITLE' : false,
            developer: option.checks.DUPLICATE_TITLE.developer || false,
          });
        }
      }
    }
  });
  return results;
}

function checkLabels(results, option) {
  if (option.formLabelsPlugin) {
    Elements.Found.Inputs.forEach(($el) => {
      // Ignore completely hidden elements.
      const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
      const negativeTabindex = $el.getAttribute('tabindex') === '-1';
      const hidden = isElementHidden($el);
      if (hidden || (ariaHidden && negativeTabindex)) {
        return;
      }

      // Compute accessible name on input.
      const computeName = computeAccessibleName($el);
      const inputName = removeWhitespace(computeName);

      // Get attributes.
      const alt = $el.getAttribute('alt');
      const type = $el.getAttribute('type');
      const hasTitle = $el.getAttribute('title');
      const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');

      // Pass: Ignore if it's a submit or hidden button.
      if (type === 'submit' || type === 'button' || type === 'hidden') {
        return;
      }

      // Error: Input with type="image" without accessible name or alt.
      if (type === 'image') {
        if (option.checks.LABELS_MISSING_IMAGE_INPUT && (!alt || alt.trim() === '') && !hasAria && !hasTitle) {
          results.push({
            element: $el,
            type: option.checks.LABELS_MISSING_IMAGE_INPUT.type || 'error',
            content: Lang.sprintf(option.checks.LABELS_MISSING_IMAGE_INPUT.content || 'LABELS_MISSING_IMAGE_INPUT'),
            dismiss: prepareDismissal(`INPUTIMAGE${type + inputName}`),
            dismissAll: option.checks.LABELS_MISSING_IMAGE_INPUT.dismissAll ? 'LABELS_MISSING_IMAGE_INPUT' : false,
            developer: option.checks.LABELS_MISSING_IMAGE_INPUT.developer || true,
          });
        }
        return;
      }

      // Warning: to remove reset buttons.
      if (type === 'reset') {
        if (option.checks.LABELS_INPUT_RESET) {
          results.push({
            element: $el,
            type: option.checks.LABELS_INPUT_RESET.type || 'warning',
            content: Lang.sprintf(option.checks.LABELS_INPUT_RESET.content || 'LABELS_INPUT_RESET'),
            dismiss: prepareDismissal(`INPUTRESET${type + inputName}`),
            dismissAll: option.checks.LABELS_INPUT_RESET.dismissAll ? 'LABELS_INPUT_RESET' : false,
            developer: option.checks.LABELS_INPUT_RESET.developer || false,
          });
        }
        return;
      }

      // Uses ARIA or title attribute. Warn them to ensure there's a visible label.
      if (hasAria || hasTitle) {
        if (inputName.length === 0) {
          if (option.checks.LABELS_MISSING_LABEL) {
            results.push({
              element: $el,
              type: option.checks.LABELS_MISSING_LABEL.type || 'error',
              content: Lang.sprintf(option.checks.LABELS_MISSING_LABEL.content || 'LABELS_MISSING_LABEL'),
              dismiss: prepareDismissal(`INPUTMISSING${type + inputName}`),
              dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
              developer: option.checks.LABELS_MISSING_LABEL.developer || true,
            });
          }
        } else if (option.checks.LABELS_ARIA_LABEL_INPUT) {
          const sanitizedText = sanitizeHTML(inputName);
          results.push({
            element: $el,
            type: option.checks.LABELS_ARIA_LABEL_INPUT.type || 'warning',
            content: option.checks.LABELS_ARIA_LABEL_INPUT.content
              ? Lang.sprintf(option.checks.LABELS_ARIA_LABEL_INPUT.content, sanitizedText)
              : `${Lang.sprintf('LABELS_ARIA_LABEL_INPUT', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
            dismiss: prepareDismissal(`INPUTARIA${type + inputName}`),
            dismissAll: option.checks.LABELS_ARIA_LABEL_INPUT.dismissAll ? 'LABELS_ARIA_LABEL_INPUT' : false,
            developer: option.checks.LABELS_ARIA_LABEL_INPUT.developer || true,
          });
        }
        return;
      }

      // Implicit label: <label>First name: <input type="text"/><label>
      const closestLabel = $el.closest('label');
      const labelName = (closestLabel) ? removeWhitespace(computeAccessibleName(closestLabel)) : '';
      if (closestLabel && labelName.length) {
        return;
      }

      // Check to see if each label has a matching for and it attribute.
      const id = $el.getAttribute('id');
      if (id) {
        // Find labels without a match.
        if (!Elements.Found.Labels.some((label) => label.getAttribute('for') === id)) {
          if (option.checks.LABELS_NO_FOR_ATTRIBUTE) {
            results.push({
              element: $el,
              type: option.checks.LABELS_NO_FOR_ATTRIBUTE.type || 'error',
              content: Lang.sprintf(option.checks.LABELS_NO_FOR_ATTRIBUTE.content || 'LABELS_NO_FOR_ATTRIBUTE', id),
              dismiss: prepareDismissal(`INPUTNOFOR${type + inputName}`),
              dismissAll: option.checks.LABELS_NO_FOR_ATTRIBUTE.dismissAll ? 'LABELS_NO_FOR_ATTRIBUTE' : false,
              developer: option.checks.LABELS_NO_FOR_ATTRIBUTE.developer || true,
            });
          }
        }
      } else if (option.checks.LABELS_MISSING_LABEL) {
        // No id!
        results.push({
          element: $el,
          type: option.checks.LABELS_MISSING_LABEL.type || 'error',
          content: Lang.sprintf(option.checks.LABELS_MISSING_LABEL.content || 'LABELS_MISSING_LABEL'),
          dismiss: prepareDismissal(`INPUTNOID${type + inputName}`),
          dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
          developer: option.checks.LABELS_MISSING_LABEL.developer || true,
        });
      }

      // Avoid using placeholder attributes.
      if (option.checks.LABELS_PLACEHOLDER && $el.placeholder && $el.placeholder !== 0) {
        results.push({
          element: $el,
          type: option.checks.LABELS_PLACEHOLDER.type || 'warning',
          content: Lang.sprintf(option.checks.LABELS_PLACEHOLDER.content || 'LABELS_PLACEHOLDER'),
          dismiss: prepareDismissal(`INPUTPLACEHOLDER${type + inputName}`),
          dismissAll: option.checks.LABELS_PLACEHOLDER.dismissAll ? 'LABELS_PLACEHOLDER' : false,
          developer: option.checks.LABELS_PLACEHOLDER.developer || true,
        });
      }
    });
  }
  return results;
}

function checkQA(results, option) {
  /* *********************************************************** */
  /*  Error: Find all links pointing to development environment. */
  /* *********************************************************** */
  if (option.checks.QA_BAD_LINK) {
    Elements.Found.CustomErrorLinks.forEach(($el) => {
      results.push({
        element: $el,
        type: option.checks.QA_BAD_LINK.type || 'error',
        content: Lang.sprintf(option.checks.QA_BAD_LINK.content || 'QA_BAD_LINK', $el),
        inline: true,
        dismiss: prepareDismissal($el.tagName + $el.textContent),
        dismissAll: option.checks.QA_BAD_LINK.dismissAll ? 'QA_BAD_LINK' : false,
        developer: option.checks.QA_BAD_LINK.developer || false,
      });
    });
  }

  /* *********************************************************** */
  /*  Warning: Excessive bolding or italics.                     */
  /* *********************************************************** */
  if (option.checks.QA_STRONG_ITALICS) {
    Elements.Found.StrongItalics.forEach(($el) => {
      const text = getText($el);
      if (text.length !== 0 && text.length > 400) {
        results.push({
          element: $el.parentNode,
          type: option.checks.QA_STRONG_ITALICS.type || 'warning',
          content: Lang.sprintf(option.checks.QA_STRONG_ITALICS.content || 'QA_STRONG_ITALICS'),
          dismiss: prepareDismissal($el.tagName + $el.textContent),
          dismissAll: option.checks.QA_STRONG_ITALICS.dismissAll ? 'QA_STRONG_ITALICS' : false,
          developer: option.checks.QA_STRONG_ITALICS.developer || false,
        });
      }
    });
  }

  /* ************************************************************** */
  /*  Warning: Additional link checks.                              */
  /* ************************************************************** */
  Elements.Found.Links.forEach(($el) => {
    if ($el.hasAttribute('href')) {
      const href = $el.getAttribute('href');

      // Has file extension.
      const hasExtension = $el.matches(Constants.Global.documentSources);
      const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');

      // Check for broken same-page links.
      if (option.checks.QA_IN_PAGE_LINK) {
        const hasText = getText($el).length !== 0;
        const ignored = $el.ariaHidden === 'true' && $el.getAttribute('tabindex') === '-1';
        const hasAttributes = $el.hasAttribute('role')
          || $el.hasAttribute('aria-haspopup')
          || $el.hasAttribute('aria-expanded')
          || $el.hasAttribute('onclick')
          || $el.hasAttribute('disabled')
          || $el.closest('nav, [role="navigation"]');

        if ((href.startsWith('#') || href === '') && hasText && !ignored && !hasAttributes) {
          const targetId = href.substring(1);
          const ariaControls = $el.getAttribute('aria-controls');
          const targetElement = document.getElementById(targetId)
            || document.getElementById(decodeURIComponent(targetId))
            || document.getElementById(encodeURIComponent(targetId))
            || document.getElementById(ariaControls)
            || document.querySelector(`a[name="${targetId}"]`);

          // If reference ID doesn't exist.
          if (!targetElement) {
            results.push({
              element: $el,
              type: option.checks.QA_IN_PAGE_LINK.type || 'error',
              content: Lang.sprintf(option.checks.QA_IN_PAGE_LINK.content || 'QA_IN_PAGE_LINK'),
              inline: true,
              dismiss: prepareDismissal(`QAINPAGE${href}`),
              dismissAll: option.checks.QA_IN_PAGE_LINK.dismissAll ? 'QA_IN_PAGE_LINK' : false,
              developer: option.checks.QA_IN_PAGE_LINK.developer || false,
            });
          }
        }
      }

      // Manually inspect documents & PDF for accessibility.
      if (option.checks.QA_DOCUMENT && hasExtension) {
        results.push({
          element: $el,
          type: option.checks.QA_DOCUMENT.type || 'warning',
          content: Lang.sprintf(option.checks.QA_DOCUMENT.content || 'QA_DOCUMENT'),
          inline: true,
          dismiss: prepareDismissal(`DOC${href}`),
          dismissAll: option.checks.QA_DOCUMENT.dismissAll ? 'QA_DOCUMENT' : false,
          developer: option.checks.QA_DOCUMENT.developer || false,
        });
      } else if (option.checks.QA_PDF && hasPDF) {
        results.push({
          element: $el,
          type: option.checks.QA_PDF.type || 'warning',
          content: Lang.sprintf(option.checks.QA_PDF.content || 'QA_PDF'),
          inline: true,
          dismiss: prepareDismissal(`PDF${href}`),
          dismissAll: option.checks.QA_PDF.dismissAll ? 'QA_PDF' : false,
          developer: option.checks.QA_PDF.developer || false,
        });
      }
    }
  });

  /* *************************************************************** */
  /*  Warning: Find blockquotes used as headers.                     */
  /* *************************************************************** */
  if (option.checks.QA_BLOCKQUOTE) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const text = getText($el);
      if (text.length !== 0 && text.length < 25) {
        const sanitizedText = sanitizeHTML(text);
        results.push({
          element: $el,
          type: option.checks.QA_BLOCKQUOTE.type || 'warning',
          content: Lang.sprintf(option.checks.QA_BLOCKQUOTE.content || 'QA_BLOCKQUOTE', sanitizedText),
          dismiss: prepareDismissal(`BLOCKQUOTE${sanitizedText}`),
          dismissAll: option.checks.QA_BLOCKQUOTE.dismissAll ? 'QA_BLOCKQUOTE' : false,
          developer: option.checks.QA_BLOCKQUOTE.developer || false,
        });
      }
    });
  }

  /* *************************************************************** */
  /*  Errors: Check HTML tables for issues.                          */
  /* *************************************************************** */
  Elements.Found.Tables.forEach(($el) => {
    if (isElementHidden($el) === false) {
      const tableHeaders = $el.querySelectorAll('th');
      const semanticHeadings = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const key = prepareDismissal(`TABLE${$el.textContent}`);
      if (option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
        results.push({
          element: $el,
          type: option.checks.TABLES_MISSING_HEADINGS.type || 'error',
          content: Lang.sprintf(option.checks.TABLES_MISSING_HEADINGS.content || 'TABLES_MISSING_HEADINGS'),
          dismiss: key,
          dismissAll: option.checks.TABLES_MISSING_HEADINGS.dismissAll ? 'TABLES_MISSING_HEADINGS' : false,
          developer: option.checks.TABLES_MISSING_HEADINGS.developer || false,
        });
      }
      if (option.checks.TABLES_SEMANTIC_HEADING && semanticHeadings.length > 0) {
        semanticHeadings.forEach((heading) => {
          results.push({
            element: heading,
            type: option.checks.TABLES_SEMANTIC_HEADING.type || 'error',
            content: Lang.sprintf(option.checks.TABLES_SEMANTIC_HEADING.content || 'TABLES_SEMANTIC_HEADING'),
            dismiss: key,
            dismissAll: option.checks.TABLES_SEMANTIC_HEADING.dismissAll ? 'TABLES_SEMANTIC_HEADING' : false,
            developer: option.checks.TABLES_SEMANTIC_HEADING.developer || false,
          });
        });
      }
      tableHeaders.forEach((th) => {
        if (option.checks.TABLES_EMPTY_HEADING && th.textContent.trim().length === 0) {
          results.push({
            element: th,
            type: option.checks.TABLES_EMPTY_HEADING.type || 'error',
            content: Lang.sprintf(option.checks.TABLES_EMPTY_HEADING.content || 'TABLES_EMPTY_HEADING'),
            position: 'afterbegin',
            dismiss: key,
            dismissAll: option.checks.TABLES_EMPTY_HEADING.dismissAll ? 'TABLES_EMPTY_HEADING' : false,
            developer: option.checks.TABLES_EMPTY_HEADING.developer || false,
          });
        }
      });
    }
  });

  /* ****************************************************************** */
  /*  Warning: Detect fake headings                                     */
  /* ****************************************************************** */
  if (option.checks.QA_FAKE_HEADING) {
    const addResult = (element, sanitizedText) => {
      results.push({
        element,
        type: option.checks.QA_FAKE_HEADING.type || 'warning',
        content: Lang.sprintf(option.checks.QA_FAKE_HEADING.content || 'QA_FAKE_HEADING', sanitizedText),
        dismiss: prepareDismissal(`BOLD${sanitizedText}`),
        inline: true,
        dismissAll: option.checks.QA_FAKE_HEADING.dismissAll ? 'QA_FAKE_HEADING' : false,
        developer: option.checks.QA_FAKE_HEADING.developer || false,
      });
    };

    // To minimize false positives/number of warnings...
    const isPreviousElementAHeading = (p) => {
      const previousElement = p.previousElementSibling;
      if (!previousElement) return false;
      const headingTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
      return headingTags.includes(previousElement.tagName);
    };

    // Find large text as heading.
    const ignoreParents = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote, table';
    const computeLargeParagraphs = (p) => {
      const size = getComputedStyle(p).fontSize.replace('px', '');
      const getText$1 = getText(p);
      const maybeSentence = getText$1.match(/[.;?!"]/) === null;
      const typicalHeadingLength = getText$1.length >= 4 && getText$1.length <= 120;

      if (size >= 24 && !p.closest(ignoreParents) && typicalHeadingLength && maybeSentence && !isPreviousElementAHeading(p)) {
        const sanitizedText = sanitizeHTML(getText$1);
        addResult(p, sanitizedText);
      }
    };

    // Find bolded text as headings.
    const computeBoldTextParagraphs = (p) => {
      const startsWithBold = /^<\s*(strong|b)(\s+[^>]*)?>/i.test(p.innerHTML.trim());

      if (startsWithBold && !p.closest(ignoreParents)) {
        const possibleHeading = p.querySelector('strong, b');
        const possibleHeadingText = getText(possibleHeading);

        // Conditions
        const notASentence = possibleHeadingText.match(/[.:;?!"']/) === null;
        const typicalHeadingLength = possibleHeadingText.length >= 3 && possibleHeadingText.length <= 120;

        if (typicalHeadingLength && notASentence) {
          // Be a little forgiving if it's a small paragraph.
          const nonHeadingTextLength = fnIgnore(p, ['strong', 'b']).textContent.trim().length;
          if (nonHeadingTextLength !== 0 && nonHeadingTextLength <= 250) {
            return;
          }

          const sanitizedText = sanitizeHTML(possibleHeadingText);
          addResult(possibleHeading, sanitizedText);
        }
      }
    };

    Elements.Found.Paragraphs.forEach((p) => {
      computeLargeParagraphs(p);
      computeBoldTextParagraphs(p);
    });
  }

  /* *************************************************************** */
  /*  Warning: Detect paragraphs that should be lists.               */
  /*  Thanks to John Jameson from PrincetonU for this ruleset!       */
  /* *************************************************************** */
  if (option.checks.QA_FAKE_LIST) {
    const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, ''); // All numbers but 1.
    const alphabeticMatch = new RegExp(/(^[aA1αаΑ]|[^\p{Alphabetic}\s])[-\s.)]/, 'u');
    const emojiMatch = new RegExp(/\p{Extended_Pictographic}/, 'u');
    const secondTextNoMatch = ['a', 'A', 'α', 'Α', 'а', 'А', '1'];
    const specialCharsMatch = /[([{#]/;
    const prefixDecrement = {
      2: '1',
      b: 'a',
      B: 'A',
      β: 'α',
      Β: 'Α',
      б: 'а',
      Б: 'А',
    };
    const decrement = (element) => element.replace(/^b|^B|^б|^Б|^β|^В|^2/, (match) => prefixDecrement[match]);

    // Variables to carry in loop.
    let activeMatch = ''; // Carried in loop for second paragraph.
    let firstText = ''; // Text of previous paragraph.
    let lastHitWasEmoji = false;

    Elements.Found.Paragraphs.forEach((p, i) => {
      let secondText = false;
      let hit = false;
      firstText = firstText || getText(p).replace('(', '');
      const firstPrefix = firstText.substring(0, 2);

      // Grab first two characters.
      const isAlphabetic = firstPrefix.match(alphabeticMatch);
      const isNumber = firstPrefix.match(numberMatch);
      const isEmoji = firstPrefix.match(emojiMatch);
      const isSpecialChar = specialCharsMatch.test(firstPrefix.charAt(0));

      if (
        firstPrefix.length > 0
        && firstPrefix !== activeMatch
        && !isNumber
        && (isAlphabetic || isEmoji || isSpecialChar)
      ) {
        // We have a prefix and a possible hit; check next detected paragraph.
        const secondP = Elements.Found.Paragraphs[i + 1];
        if (secondP) {
          secondText = getText(secondP).replace('(', '').substring(0, 2);
          if (secondTextNoMatch.includes(secondText?.toLowerCase().trim())) {
            // A sentence. Another sentence. (A sentence). 1 apple, 1 banana.
            return;
          }
          const secondPrefix = decrement(secondText);
          if (isAlphabetic) {
            // Check for repeats (*,*) or increments(a,b)
            if (firstPrefix !== 'A ' && firstPrefix === secondPrefix) {
              hit = true;
            }
          } else if (isEmoji && !lastHitWasEmoji) {
            // Check for two paragraphs in a row that start with emoji.
            if (secondPrefix.match(emojiMatch)) {
              hit = true;
              lastHitWasEmoji = true;
              // This is carried; better miss than have lots of positives.
            }
          }
        }
        if (!hit) {
          // Split p by carriage return if there was a firstPrefix and compare.
          let textAfterBreak = p?.querySelector('br')?.nextSibling?.nodeValue;
          if (textAfterBreak) {
            textAfterBreak = textAfterBreak.replace(/<\/?[^>]+(>|$)/g, '').trim().substring(0, 2);
            const checkForOtherPrefixChars = specialCharsMatch.test(textAfterBreak.charAt(0));
            if (checkForOtherPrefixChars
              || firstPrefix === decrement(textAfterBreak)
              || (!lastHitWasEmoji && textAfterBreak.match(emojiMatch))) {
              hit = true;
            }
          }
        } if (hit) {
          results.push({
            element: p,
            type: option.checks.QA_FAKE_LIST.type || 'warning',
            content: Lang.sprintf(option.checks.QA_FAKE_LIST.content || 'QA_FAKE_LIST', firstPrefix),
            dismiss: prepareDismissal(`LIST${p.textContent}`),
            dismissAll: option.checks.QA_FAKE_LIST.dismissAll ? 'QA_FAKE_LIST' : false,
            developer: option.checks.QA_FAKE_LIST.developer || false,
          });
          activeMatch = firstPrefix;
        } else {
          activeMatch = '';
        }
      }
      // Reset for next loop, carry over text query if available.
      firstText = secondText ? '' : secondText;
    });
  }

  /* **************************************** */
  /*  Warning: Detect uppercase text.         */
  /* **************************************** */
  if (option.checks.QA_UPPERCASE) {
    const checkCaps = ($el) => {
      let thisText = '';
      if ($el.tagName === 'LI') {
        // Prevent recursion through nested lists.
        $el.childNodes.forEach((node) => {
          if (node.nodeType === 3) {
            thisText += node.textContent;
          }
        });
      } else {
        thisText = getText($el);
      }

      // Patterns
      const uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      const detectUpperCase = thisText.match(uppercasePattern);

      if (detectUpperCase && detectUpperCase[0].length > 10) {
        results.push({
          element: $el,
          type: option.checks.QA_UPPERCASE.type || 'warning',
          content: Lang.sprintf(option.checks.QA_UPPERCASE.content || 'QA_UPPERCASE'),
          dismiss: prepareDismissal(`UPPERCASE${thisText}`),
          dismissAll: option.checks.QA_UPPERCASE.dismissAll ? 'QA_UPPERCASE' : false,
          developer: option.checks.QA_UPPERCASE.developer || false,
        });
      }
    };
    Elements.Found.Paragraphs.forEach(($el) => checkCaps($el));
    Elements.Found.Headings.forEach(($el) => checkCaps($el));
    Elements.Found.Lists.forEach(($el) => checkCaps($el));
    Elements.Found.Blockquotes.forEach(($el) => checkCaps($el));
  }

  /* ************************************************************** */
  /*  Various checks: underlines, justify-aligned, and small text.  */
  /* ************************************************************** */
  // Check underlined text. Created by Brian Teeman!
  const addUnderlineResult = ($el) => {
    results.push({
      element: $el,
      type: option.checks.QA_UNDERLINE.type || 'warning',
      content: Lang.sprintf(option.checks.QA_UNDERLINE.content || 'QA_UNDERLINE'),
      inline: true,
      dismiss: prepareDismissal(`UNDERLINE${$el.textContent}`),
      dismissAll: option.checks.QA_UNDERLINE.dismissAll ? 'QA_UNDERLINE' : false,
      developer: option.checks.QA_UNDERLINE.developer || false,
    });
  };

  const addJustifyResult = ($el) => {
    results.push({
      element: $el,
      type: option.checks.QA_JUSTIFY.type || 'warning',
      content: Lang.sprintf(option.checks.QA_JUSTIFY.content || 'QA_JUSTIFY'),
      dismiss: prepareDismissal(`JUSTIFIED${$el.textContent}`),
      dismissAll: option.checks.QA_JUSTIFY.dismissAll ? 'QA_JUSTIFY' : false,
      developer: option.checks.QA_JUSTIFY.developer || false,
    });
  };

  const addSmallTextResult = ($el) => {
    results.push({
      element: $el,
      type: option.checks.QA_SMALL_TEXT.type || 'warning',
      content: Lang.sprintf(option.checks.QA_SMALL_TEXT.content || 'QA_SMALL_TEXT'),
      dismiss: prepareDismissal(`SMALL${$el.textContent}`),
      dismissAll: option.checks.QA_SMALL_TEXT.dismissAll ? 'QA_SMALL_TEXT' : false,
      developer: option.checks.QA_SMALL_TEXT.developer || false,
    });
  };

  const computeStyle = ($el) => {
    const style = getComputedStyle($el);
    const { textDecorationLine, textAlign, fontSize } = style;

    /* Check: Underlined text. */
    const interactive = 'a[href], button, abbr, [role="link"], [role="button"], [tabindex="0"], [onclick]';
    if (
      option.checks.QA_UNDERLINE
      && ($el.closest('u') || textDecorationLine === 'underline')
      && !$el.closest(interactive)
      && !$el.matches(interactive)
    ) {
      addUnderlineResult($el);
    }

    /* Check: Font size is greater than 0 and less than 10. */
    const defaultSize = option.checks.QA_SMALL_TEXT.fontSize || 10;
    const computedFontSize = parseFloat(fontSize);

    // Compare with parent element's font size.
    const parentFontSize = $el.parentElement
      ? parseFloat(getComputedStyle($el.parentElement).fontSize)
      : null;
    const isInherited = parentFontSize === computedFontSize;

    // Ensure the font size is specific to the element, not inherited.
    const withinRange = !isInherited && computedFontSize > 1 && computedFontSize <= defaultSize;
    if (option.checks.QA_SMALL_TEXT && withinRange) {
      addSmallTextResult($el);
    }

    /* Check: Check if text is justify-aligned. */
    const parentJustify = $el.parentElement
      ? getComputedStyle($el.parentElement).textAlign
      : null;
    const justifyInherited = parentJustify === textAlign;
    if (option.checks.QA_JUSTIFY && textAlign === 'justify' && !justifyInherited) {
      addJustifyResult($el);
    }
  };

  // Loop through all elements within the root area.
  if (option.checks.QA_UNDERLINE || option.checks.QA_JUSTIFY || option.checks.QA_SMALL_TEXT) {
    for (let i = 0; i < Elements.Found.Everything.length; i++) {
      const $el = Elements.Found.Everything[i];

      // Filter only text nodes.
      const textString = Array.from($el.childNodes)
        .filter((node) => node.nodeType === 3)
        .map((node) => node.textContent)
        .join('');
      const text = textString.trim();

      // Only if there's text!
      if (text.length !== 0) {
        computeStyle($el);
      }
    }
  }

  /* **************************************************** */
  /*  Find inappropriate use of <sup> and <sub> tags.     */
  /* **************************************************** */
  if (option.checks.QA_SUBSCRIPT) {
    Elements.Found.Subscripts.forEach(($el) => {
      const text = getText($el);
      if (text.length >= 80) {
        results.push({
          element: $el,
          type: option.checks.QA_SUBSCRIPT.type || 'warning',
          content: Lang.sprintf(option.checks.QA_SUBSCRIPT.content || 'QA_SUBSCRIPT'),
          inline: true,
          dismiss: prepareDismissal($el.tagName + text),
          dismissAll: option.checks.QA_SUBSCRIPT.dismissAll ? 'QA_SUBSCRIPT' : false,
          developer: option.checks.QA_SUBSCRIPT.developer || false,
        });
      }
    });
  }

  /* ****************************************** */
  /*  Find double nested layout components.     */
  /* ****************************************** */
  if (option.checks.QA_NESTED_COMPONENTS) {
    Elements.Found.NestedComponents.forEach(($el) => {
      const sources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
      const component = $el.querySelector(sources);
      if (component) {
        results.push({
          element: $el,
          type: option.checks.QA_NESTED_COMPONENTS.type || 'warning',
          content: Lang.sprintf(option.checks.QA_NESTED_COMPONENTS.content || 'QA_NESTED_COMPONENTS'),
          dismiss: prepareDismissal(`NESTED${$el.textContent}`),
          dismissAll: option.checks.QA_NESTED_COMPONENTS.dismissAll ? 'QA_NESTED_COMPONENTS' : false,
          developer: option.checks.QA_NESTED_COMPONENTS.developer || false,
        });
      }
    });
  }

  return results;
}

var styles = "[data-sa11y-overflow]{overflow:auto!important}[data-sa11y-error]{outline:5px solid var(--sa11y-error)!important;outline-offset:2px}[data-sa11y-warning]:not([data-sa11y-error]){outline:5px solid var(--sa11y-warning)!important;outline-offset:2px}[data-sa11y-pulse-border]{animation:pulse 1s 2;box-shadow:0;outline:5px solid var(--sa11y-focus-color)!important}[data-sa11y-pulse-border]:focus,[data-sa11y-pulse-border]:hover{animation:none}@keyframes pulse{0%{box-shadow:0 0 0 5px var(--sa11y-focus-color)}50%{box-shadow:0 0 0 12px var(--sa11y-pulse-color)}to{box-shadow:0 0 0 5px var(--sa11y-pulse-color)}}h1[data-sa11y-pulse-border],h2[data-sa11y-pulse-border],h3[data-sa11y-pulse-border],h4[data-sa11y-pulse-border],h5[data-sa11y-pulse-border],h6[data-sa11y-pulse-border],img[data-sa11y-pulse-border]{animation:pulse-scale 1s 2}@keyframes pulse-scale{0%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(1.02)}to{opacity:1;transform:scale(1)}}@media (prefers-reduced-motion:reduce){[data-sa11y-pulse-border]{animation:none!important}}@media (forced-colors:active){[data-sa11y-error-inline],[data-sa11y-error],[data-sa11y-good],[data-sa11y-pulse-border],[data-sa11y-warning-inline],[data-sa11y-warning]{forced-color-adjust:none}}";

/* ************************************************************ */
/*  Auto-detect shadow DOM or process provided web components.  */
/* ************************************************************ */
const addStyleUtilities = (component) => {
  const CSSUtils = component.shadowRoot.querySelectorAll('.sa11y-css-utilities');
  if (CSSUtils.length === 0) {
    const style = document.createElement('style');
    style.setAttribute('class', 'sa11y-css-utilities');
    style.textContent = styles;
    component.shadowRoot.appendChild(style);
  }
};

function findShadowComponents(option) {
  if (option.autoDetectShadowComponents) {
    // Elements to ignore.
    const ignore = Constants.Exclusions.Sa11yElements;

    // Search all elements.
    const root = document.querySelector(option.checkRoot);
    const search = (root)
      ? Array.from(root.querySelectorAll(`*:not(${ignore})`))
      : Array.from(document.body.querySelectorAll(`*:not(${ignore})`));

    // Query for open shadow roots & inject CSS utilities into every shadow DOM.
    search.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        component.setAttribute('data-sa11y-has-shadow-root', '');
        addStyleUtilities(component);
      }
    });
  } else if (option.shadowComponents) {
    const providedShadow = document.querySelectorAll(option.shadowComponents);
    providedShadow.forEach((component) => {
      component.setAttribute('data-sa11y-has-shadow-root', '');
      addStyleUtilities(component);
    });
  }
}

function disable() {
  if (State.open && !State.closedByDisable) {
    State.closedByDisable = true;
  }
  State.disabled = true;
  reset();
  document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.panelBar);
  document.documentElement.style.setProperty('--ed11y-activeColor', Theme.panelBarText);
  document.documentElement.style.setProperty('--ed11y-activeBorder', Theme.panelBarText + '44');
  document.documentElement.style.setProperty('--ed11y-activePanelBorder', 'transparent');
  if (UI$1.panelToggle) {
    UI$1.panel?.classList.remove('ed11y-errors', 'ed11y-warnings');
    UI$1.panelCount.textContent = 'i';
    UI$1.panelJumpNext.setAttribute('hidden', '');
    UI$1.panelToggle.classList.add('disabled');
    UI$1.panelToggle.querySelector('.ed11y-sr-only').textContent = M.toggleDisabled;
  }
}
const checkRunPrevent = function() {
  let preventCheck = State.options.preventCheckingIfPresent ?
    document.querySelector(State.options.preventCheckingIfPresent) :
    false;
  if (preventCheck) {
    console.warn(`Editoria11y is disabled because an element matched the "preventCheckingIfPresent" parameter:  "${State.options.preventCheckingIfPresent}"` );
  } else if (!preventCheck && !!State.options.preventCheckingIfAbsent) {
    preventCheck = document.querySelector(`:is(${State.options.preventCheckingIfAbsent})`) === null;
    if (preventCheck) {
      console.warn(`Editoria11y is disabled because no elements matched the "preventCheckingIfAbsent" parameter: "${State.options.preventCheckingIfAbsent}"`);
    }
  }
  return preventCheck;
};

function makeItSo () {
  if (State.once) {
    console.error('double init');
    return;
  }
  State.once = true;

  //Need to evaluate if "load" event took place for bookmarklet version. Otherwise, only call Sa11y once page has loaded.
  const documentLoadingCheck = (callback) => {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  };

  // Once document has fully loaded.
  documentLoadingCheck(() => {
    if (checkRunPrevent()) {
      return false;
    }
    customElements.define('ed11y-element-alt', Ed11yElementAlt);
    customElements.define('ed11y-element-result', Ed11yElementResult);
    customElements.define('ed11y-element-heading-label',
      Ed11yElementHeadingLabel);
    customElements.define('ed11y-element-panel', Ed11yElementPanel);
    customElements.define('ed11y-element-tip', Ed11yElementTip);

    State.running = true;
    let localResultCount = store.getItem('editoria11yResultCount');
    State.seen = localResultCount && localResultCount !== 'undefined' ?
      JSON.parse(localResultCount) : {};

    // Build list of dismissed alerts
    if (State.options.syncedDismissals === false) {
      State.dismissedAlerts = localStorage.getItem('ed11ydismissed');
      State.dismissedAlerts = State.dismissedAlerts ? JSON.parse(State.dismissedAlerts) : {};
    } else {
      State.dismissedAlerts = {};
      State.dismissedAlerts[State.options.currentPage] = State.options.syncedDismissals;
    }

    // Create test class objects
    /*Ed11y.testEmbeds = new Ed11yTestEmbeds;
    Ed11y.testHeadings = new Ed11yTestHeadings;
    Ed11y.testImages = new Ed11yTestImages;
    Ed11y.testLinks = new Ed11yTestLinks;
    Ed11y.testText = new Ed11yTestText;
*/
    // Convert the container ignore user option to a CSS :not selector.
    State.ignore = State.options.ignoreElements ? `:not(${State.options.ignoreElements})` : '';

    if (!State.options.checkRoots) {
      State.options.checkRoots = document.querySelector('main') !== null ? 'main' : 'body';
    }

    // Run tests
    checkAll();
    window.addEventListener('resize', function () { windowResize(); });

  });
}
// Toggles the outline of all headers, link texts, and images.
function checkAll() {
  if (State.openTip.button) {
    return false;
  }
  State.disabled = false;

  if ( !checkRunPrevent() ) {

    // Check for ignoreAll elements.
    State.ignoreAll = State.options.ignoreAllIfAbsent && document.querySelector(`:is(${State.options.ignoreAllIfAbsent})`) === null;
    if (!State.ignoreAll && !!State.options.ignoreAllIfPresent) {
      State.ignoreAll = document.querySelector(`:is(${State.options.ignoreAllIfPresent})`) !== null;
    }

    if ( State.incremental ) {
      State.oldResults = State.results;
    }
    // Reset counts
    State.results = [];
    State.elements = [];
    State.mediaCount = 0;

    State.customTestsRunning = false;

    let roots = [];
    if (State.options.fixedRoots) {
      State.options.fixedRoots.forEach(root => {roots.push(root.fixedRoot);});
    } else {
      roots = document.querySelectorAll(`:is(${State.options.checkRoots})`);
    }

    if (roots.length === 0) {
      // Todo parameterize for translation.
      if (State.onLoad) {
        console.warn('Check Editoria11y configuration; specified root element not found');
      }
      disable();
      return;
    } else {
      State.roots = [];
      roots.forEach((el, i) => {
        if (el.shadowRoot) {
          State.roots[i] = el.shadowRoot;
          el.setAttribute('data-ed11y-has-shadow-root', 'true');
          detectShadow(el.shadowRoot);
        } else {
          State.roots[i] = el;
          detectShadow(el);
        }
        if (State.options.fixedRoots) {
          el.dataset.ed11yRoot = `${i}`;
        }
      });


      buildElementList();

      Constants.initializeRoot(false, false, roots);

      // Find all web components on the page.
      findShadowComponents(State.options);

      // Find and cache elements.
      Elements.initializeElements(State.options);

      State.headingOutline = [];
      // Ruleset checks
      checkHeaders(State.results, State.options, State.headingOutline);
      checkLinkText(State.results, State.options);
      checkImages(State.results, State.options);
      checkLabels(State.results, State.options);
      checkQA(State.results, State.options);
      console.log(State.results);
      /*{
"element": {},
"type": "error",
"content": "Empty heading found! To fix, delete this line or change its format from <strong class=\"colour\">Heading 4</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>.",
"dismiss": "H4",
"dismissAll": false,
"isWithinRoot": true,
"developer": false,
"margin": "0",
"dismissalStatus": false,
"scrollableParent": false,
"sortPos": 5495.38330078125
}
content
dismissalKey
dismissalStatus
element
position
scrollableParent
sortPos
test
toggle

      * */
      // @todo merge temporary values.
      State.results.forEach((result) => {
        result.position = 'beforebegin';
        result.dismissalKey = result.dismiss;
        result.test = 'altNull';
      });

      /*let queue = [
        'testLinks',
        'testImages',
        'testHeadings',
        'testText',
        'testEmbeds',
      ];
      queue.forEach((test) => {
        window.setTimeout(function (test) {
          Ed11y[test].check();
        }, 0, test);
      });*/

      if (State.options.customTests > 0) {
        // Pause
        State.customTestsRunning = true;
        State.customTestsFinished = 0;
        document.addEventListener('ed11yResume', function () {
          State.customTestsFinished++;
          if (State.customTestsFinished === State.options.customTests) {
            State.customTestsRunning = false;
            window.requestAnimationFrame(() => updatePanel());
          }
        });
        window.setTimeout(function() {
          if (State.customTestsRunning === true) {
            State.customTestsRunning = false;
            if (UI$1.panelToggle) {
              UI$1.panelToggle.querySelector('.ed11y-sr-only').textContent = M.toggleAccessibilityTools;
            }
            window.requestAnimationFrame(() => updatePanel());
            console.error('Editoria11y was told to wait for custom tests, but no tests were returned.');
          }
        }, 1000);
        window.setTimeout(function() {
          let customTests = new CustomEvent('ed11yRunCustomTests');
          document.dispatchEvent(customTests);
        },0);
      }
    }

    if (!State.customTestsRunning) {
      window.setTimeout(function () {
        if (UI$1.panelToggle) {
          UI$1.panelToggle.querySelector('.ed11y-sr-only').textContent = M.toggleAccessibilityTools;
        }
        updatePanel();
      }, 0);
    }

  }
  else {
    disable();
  }
}
function countAlerts () {

  State.errorCount = 0;
  State.warningCount = 0;
  State.dismissedCount = 0;

  // Review results array to remove dismissed or ignored items

  State.dismissedCount = 0;
  for (let i = State.results.length - 1; i >= 0; i--) {

    let test = State.results[i].test;

    if (State.options.ignoreTests &&
      State.options.ignoreTests.includes(test)) {
      // Would be faster to skip test, but this is easy and reliable.
      State.results.splice(i, 1);
      continue;
    }

    // todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
    /*if (State.incremental && Ed11y.oldResults.length > 0) {
      // Don't flag new issues in the active range while people are typing.
    }*/

    let dismissKey = dismissalKey(State.results[i].dismissalKey);
    // We run the user provided dismissal key through the text sanitization to support legacy data with special characters.
    if (dismissKey !== false && State.options.currentPage in State.dismissedAlerts && test in State.dismissedAlerts[State.options.currentPage] && dismissKey in State.dismissedAlerts[State.options.currentPage][test]) {
      // Remove result if it has been marked OK or ignored, increment dismissed match counter.
      State.dismissedCount++;
      State.results[i].dismissalStatus = State.dismissedAlerts[State.options.currentPage][test][dismissKey];
    } else if (State.results[i].dismissalKey) {
      State.warningCount++;
      State.results[i].dismissalStatus = false;
    } else {
      State.errorCount++;
      State.results[i].dismissalStatus = false;
    }
  }

  State.totalCount = State.errorCount + State.warningCount;

  // Dispatch event for synchronizers.
  if (!State.incremental) {
    window.setTimeout(function () {
      let syncResults = new CustomEvent('ed11yResults');
      document.dispatchEvent(syncResults);
    }, 0);
  }

  if (State.ignoreAll) {
    State.dismissedCount = State.totalCount + State.dismissedCount;
    State.errorCount = 0;
    State.warningCount = 0;
    State.totalCount = 0;
  }

}

function buildElementList () {

  // Note: as of 3/28/25 this is as performant as Sa11y's filter() approach.
  if (typeof State.options.editableContent === 'string') {
    findElements$1('editable', State.options.editableContent, false);
  } else {
    State.elements.editable = State.options.editableContent;
  }
  if (State.options.inlineAlerts && State.elements.editable.length > 0) {
    State.options.inlineAlerts = false;
    console.warn('Editable content detected; Editoria11y inline alerts disabled');
  }
  //Ed11y.findElements('p', 'p');
  //Ed11y.findElements('h', 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]');
  findElements$1('allH', 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]', State.options.fixedRoots ? State.options.headingsOnlyFromCheckRoots : false);
  findElements$1('img', 'img');
  //findElements('a', 'a[href]');
  //findElements('li', 'li');
  //findElements('blockquote', 'blockquote');
  //findElements('iframe', 'iframe');
  //findElements('audio', 'audio');
  //findElements('video', 'video');
  //findElements('table', 'table');

  if (State.options.embeddedContent) ;
  if (State.options.panelNoCover) {
    // Moves panel off conflicting widgets.
    findElements$1('panelPin', State.options.panelNoCover, false);
  }
}

/*=============== Utilities ================*/

function flattenText(text) {
  return text.replace(/[\n\r]+|\s{2,}/g, ' ').trim();
}

// Handle aria-label or labelled-by. Latter "wins" and can self-label.
function computeAriaLabel(element, recursing = 0) {
  if (State.options.ignoreAriaOnElements && element.matches(State.options.ignoreAriaOnElements)) {
    return 'noAria';
  }
  if (State.options.ignoreTextInElements && element.matches(State.options.ignoreTextInElements)) {
    return '';
  }

  const labelledBy = element.getAttribute('aria-labelledby');
  if (!recursing && labelledBy) {
    const target = labelledBy.split(/\s+/);
    if (target.length > 0) {
      let returnText = '';
      target.forEach((x) => {
        const targetSelector = document.querySelector(`#${CSS.escape(x)}`);
        returnText += (!targetSelector) ? '' : computeText(targetSelector, 1);
      });
      return returnText;
    }
  }
  if (element.hasAttribute('aria-label') && element.getAttribute('aria-label').trim().length > 0) {
    return element.getAttribute('aria-label');
  }
  return 'noAria';
}

function wrapPseudoContent(el, string) {
  // Get quoted content, avoid inserting URL references.
  // Hat tip Adam Chaboryk

  const getAltText = (content) => {
    if (content === 'none') return '';
    const match = content.includes('url(') || content.includes('image-set(')
      ? content.match(/\/\s*"([^"]+)"/) // Content after slash, e.g. url('image.jpg') / "alt text";
      : content.match(/"([^"]+)"/); // Content between quotes, e.g. "alt text";
    return match ? match[1] : '';
  };
  const before = getAltText(window.getComputedStyle(el, ':before').getPropertyValue('content'));
  const after = getAltText(window.getComputedStyle(el, ':after').getPropertyValue('content'));
  return `${before}${string}${after}`;

}

// Sets treeWalker loop to last node before next branch.
function nextTreeBranch(tree) {
  for (let i = 0; i < 1000; i++) {
    if (tree.nextSibling()) {
      // Prepare for continue to advance.
      return tree.previousNode();
    }
    // Next node will be in next branch.
    if (!tree.parentNode()) {
      return false;
    }
  }
  return false;
}

// Subset of the W3C accessible name algorithm.
function computeText(el, recursing = 0, excludeLinkClasses = false) {

  // Return immediately if there is an aria label.
  let hasAria = computeAriaLabel(el, recursing);
  if (hasAria !== 'noAria') {
    return hasAria;
  }

  // Return immediately if there is only a text node.
  let computedText = '';
  if (el.shadowRoot) {
    const shadowChildren = el.shadowRoot.querySelectorAll('*');
    shadowChildren.forEach(child => {
      computedText += computeText(child);
    });
  }
  if (!el.children.length) {
    // Skip treeWalker, only contents are text.
    computedText += wrapPseudoContent(el, el.textContent);
    if (!computedText.trim() && el.hasAttribute('title')) {
      computedText = el.getAttribute('title');
    }
    return recursing ? computedText : computedText.replace(/[\n\r]+|\s{2,}/g, ' ').trim();
  }

  // Otherwise, recurse into children.
  let treeWalker = document.createTreeWalker(
    el,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
  );

  let addTitleIfNoName = false;
  let aText = false;
  let count = 0;

  walker: while (treeWalker.nextNode()) {
    count++;

    // todo: Sa11y excludes
    if (treeWalker.currentNode.nodeType === Node.TEXT_NODE) {
      if (treeWalker.currentNode.parentNode.tagName !== 'SLOT') {
        computedText += ` ${treeWalker.currentNode.nodeValue}`;
      }
      continue;
    }

    // Jump over ignored link text containers.
    // e.g., "(link opens in new window)"
    if (treeWalker.currentNode.matches('.ed11y-element') || (excludeLinkClasses && treeWalker.currentNode.matches(State.options.linkIgnoreSelector))) {
      if (!nextTreeBranch(treeWalker)) {
        break walker;
      }
      continue;
    }

    // Inner nodes with shadowRoots.
    if (treeWalker.currentNode.shadowRoot) {
      const shadowChildren = treeWalker.currentNode.shadowRoot.querySelectorAll('*');
      shadowChildren.forEach(child => {
        computedText += computeText(child);
      });
      continue;
    }

    // Use link title as text if there was no text in the link.
    // Todo: in theory this could attach the title to the wrong node.
    if (addTitleIfNoName && !treeWalker.currentNode.closest('a')) {
      if (aText === computedText) {
        computedText += addTitleIfNoName;
      }
      addTitleIfNoName = false;
      aText = false;
    }

    if (treeWalker.currentNode.hasAttribute('aria-hidden') && !(recursing && count < 3)) {
      // Ignore elements and children, except when directly aria-referenced.
      // W3C name calc 2 is more complicated than this, but this is good enough.
      if (!nextTreeBranch(treeWalker)) {
        break walker;
      }
      continue;
    }

    let aria = computeAriaLabel(treeWalker.currentNode, recursing);
    if (aria !== 'noAria') {
      computedText += ' ' + aria;
      if (!nextTreeBranch(treeWalker)) {
        break walker;
      }
      continue;
    }

    switch (treeWalker.currentNode.tagName) {
      case 'STYLE':
      case 'NOSCRIPT':
        // Skip style elements
        if (!nextTreeBranch(treeWalker)) {
          break walker;
        }
        continue;
      case 'IMG':
        if (treeWalker.currentNode.hasAttribute('alt') &&
          !treeWalker.currentNode.matches('[role="presentation"]')) {
          computedText += treeWalker.currentNode.getAttribute('alt');
        }
        continue;
      case 'SVG':
      case 'svg':
        if (treeWalker.currentNode.getAttribute('role') === 'img' && treeWalker.currentNode.hasAttribute('alt')) {
          computedText += wrapPseudoContent(treeWalker.currentNode, treeWalker.currentNode.getAttribute('alt'));
          if (!nextTreeBranch(treeWalker)) {
            break walker;
          }
        }
        continue;
      case 'A':
        if (treeWalker.currentNode.hasAttribute('title')) {
          addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
          aText = computedText;
        } else {
          // Reset
          addTitleIfNoName = false;
          aText = false;
        }
        computedText += wrapPseudoContent(treeWalker.currentNode, '');
        break;
      case 'INPUT':
        computedText += wrapPseudoContent(treeWalker.currentNode, '');
        if (treeWalker.currentNode.hasAttribute('title')) {
          addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
        }
        break;
      case 'SLOT':
        if (treeWalker.currentNode.assignedNodes()) {
          // Slots have specific shadow DOM methods.
          const children = treeWalker.currentNode.assignedNodes();
          children?.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
              computedText += computeText(child);
            } else if (child.nodeType === Node.TEXT_NODE) {
              computedText += flattenText(child.nodeValue);
            }
          });
        }
        computedText += wrapPseudoContent(treeWalker.currentNode, '');
        break;
      default:
        // Other tags continue as-is.
        computedText += wrapPseudoContent(treeWalker.currentNode, '');
        break;
    }
  }
  // At end of loop, add last title element if need be.
  if (addTitleIfNoName && !aText) {
    computedText += ' ' + addTitleIfNoName;
  }

  computedText = wrapPseudoContent(el, computedText);

  if (!computedText.trim() && el.hasAttribute('title')) {
    return el.getAttribute('title');
  }

  return recursing ? computedText : computedText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

}


function resetClass(classes) {
  classes?.forEach((el) => {
    let thisClass = el;
    findElements$1('reset', `.${thisClass}`);
    State.elements.reset?.forEach(el => {
      el.classList.remove(thisClass);
    });
  });
}

function visibleElement(el) {
  // Checks if this element is visible. Used in parent iterators.
  // false is definitely invisible, true requires continued iteration to tell.
  // Todo postpone: Check for offscreen?
  if (el) {
    if (!el.checkVisibility({
      opacityProperty: true,
      visibilityProperty: true,
    })) {
      return false;
    }
    let style = window.getComputedStyle(el);
    return !(el.closest('.sr-only, .visually-hidden') ||
      style.getPropertyValue('z-index') < 0 ||
      (style.getPropertyValue('overflow') === 'hidden' &&
        ( el.offsetWidth < 10 ||
          el.offsetHeight < 10 )
      )
    );
  }
}
function visible(el) {
  // Recurse element and ancestors to make sure it is visible
  if (!visibleElement(el)) {
    // Element is hidden
    return false;
  } else {
    // Element is not known to be hidden.
    let parents = parents(el);
    let visibleParent = (parent) => visibleElement(parent);
    return parents.every(visibleParent);
  }
}
function firstVisibleParent(el) {
  let parent = el.parentElement;
  if (parent) {
    // Parent exists
    if (!visibleElement(parent)) {
      // Recurse
      parent = firstVisibleParent(parent);
      return parent;
    } else {
      // Element is visible
      return parent;
    }
  } else {
    // No visible parents.
    return false;
  }
}
function raceCrash() {
  // A marked element disappeared while we were jumping to it.
  if (State.loopStop) {
    return;
  }
  State.loopStop = true;
  reset();
  State.showPanel = true;
  checkAll();
  window.setTimeout(function() {
    if (State.results.length > 0 && State.loopStop) {
      jumpTo(1); // todo
      State.loopStop = false;
    }
  },100, State.loopStop);
}

function jumpTo(dir = 1) {
  if (!State.open) {
    return false;
  }
  State.viaJump = true;
  // Determine target result.
  let goMax = State.jumpList.length - 1;
  let goNum = State.lastOpenTip + dir;
  if (goNum < 0) {
    // Reached end of loop or dismissal pushed us out of loop
    State.nextText = M.buttonFirstContent; // todo
    goNum = goMax;
  } else if (goNum > goMax) {
    goNum = 0;
    State.nextText = M.buttonNextContent;
  } else {
    State.nextText = M.buttonNextContent;
  }
  State.lastOpenTip = goNum;
  window.setTimeout(function () {
    UI$1.panelJumpNext.querySelector('.ed11y-sr-only').textContent = State.nextText;
  }, 250);

  resetClass(['ed11y-hidden-highlight']);
  if (!State.jumpList) {
    buildJumpList(); // todo
  }
  // Find next or first result in the dom ordered list of results.
  let goto = State.jumpList[goNum];
  let result = goto.getAttribute('data-ed11y-result');
  let gotoResult = State.results[result];
  const target = gotoResult.element;

  // First of two scrollTo calls, to trigger any scroll based events.
  let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
  let scrollTarget = State.options.inlineAlerts ? goto : target;
  if (goto.dataset.ed11yHiddenResult || !(visible(scrollTarget))) {
    scrollTarget = firstVisibleParent(target);
  }
  if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
    scrollTarget.scrollIntoView({ block: scrollPin, behavior: 'instant' });
  } else {
    raceCrash();
    return false;
  }

  // Open the button
  goto.setAttribute('data-ed11y-action','open');
  State.scrollPending = 2;
  updateTipLocations();
}

function detectShadow (container) {
  if (State.options.autoDetectShadowComponents) {
    const select = !State.ignore ? '*:not(.ed11y-element)' : `*:not(${State.options.ignore}, .ed11y-element)`;
    let search = [];
    if (container.shadowRoot && container.shadowRoot.mode === 'open') {
      if (!container.matches('[data-ed11y-has-shadow-root]')) {
        container.setAttribute('data-ed11y-has-shadow-root', 'true');
        UI$1.attachCSS(container.shadowRoot);
        UI$1.attachCSS(container);
      }
      search = container.shadowRoot.querySelectorAll(select);
    } else {
      search = container.querySelectorAll(select);
    }
    search?.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        detectShadow(component);
      }
    });
  } else if (State.options.shadowComponents) {
    const providedShadow = container.querySelectorAll(State.options.shadowComponents);
    providedShadow.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        if (!container.matches('[data-ed11y-has-shadow-root]')){
          component.setAttribute('data-ed11y-has-shadow-root', 'true');
          UI$1.attachCSS(component.shadowRoot);
          UI$1.attachCSS(component);
        }
        detectShadow(component);
      } else {
        console.warn(`Editoria11y: A specified shadow host has no shadowRoot: ${component.tagName}`);
      }
    });
  }
}
const diveShadow = function (container, select, selector) {
  if (container.matches(selector)) {
    return([container]);
  } else {
    let inners = container.shadowRoot.querySelectorAll(select);
    if (typeof(inners) === 'object' && inners.length > 0) {
      // Replace shadow host with inner elements.
      inners.forEach(inner => {
        for (let innerIndex = inners - 1; innerIndex >= 0; innerIndex--) {
          let innerInner = diveShadow(inner, select, selector);
          if (innerInner.length > 0) {
            inners.splice(innerIndex, 1, ...innerInner);
          } else {
            inners.splice(innerIndex, 1);
          }
        }
      });
      return (Array.from(inners).filter((el) => el.matches(selector)));
    }
  }
  return [];
};

// QuerySelectAll non-ignored elements within checkroots, with recursion into shadow components
function findElements$1 (key, selector, rootRestrict = true) { // @todo merge replace.

  // Todo beta: function and parameter to auto-detect shadow components.
  let shadowSelector = State.options.autoDetectShadowComponents ?
    '[data-ed11y-has-shadow-root]' :
    State.options.shadowComponents ?
      State.options.shadowComponents : false;

  // Concatenate global and specific ignores
  let ignore = '';
  if (State.options.ignoreElements) {
    ignore = State.options.ignoreByKey[key] ? `:not(${State.options.ignoreElements}, ${State.options.ignoreByKey[key]})` : `:not(${State.options.ignoreElements})`;
  } else {
    ignore = State.options.ignoreByKey[key] ? `:not(${State.options.ignoreByKey[key]})` : '';
  }

  // Initialize or reset elements array.
  State.elements[key] = [];

  const select = `:is(${selector}${shadowSelector ? ', ' + shadowSelector : ''})${ignore}`;

  if (rootRestrict && State.roots) {
    // Add array of elements matching selector, excluding the provided ignore list.
    // Todo this can dupe
    State.roots.forEach(root => {
      State.elements[key] = State.elements[key].concat(Array.from(root.querySelectorAll(select)));
    });
  } else {
    State.elements[key] = State.elements[key].concat(Array.from(document.querySelectorAll(select)));
  }

  // The initial search may be a mix of elements ('p') and placeholders for shadow hosts ('custom-p-element').
  // Repeat the search inside each placeholder, and replace the placeholder with its search results.
  if (shadowSelector) {
    for (let index = State.elements[key].length - 1; index >= 0; index--) {
      if (State.elements[key][index].matches(shadowSelector)) {
        // Dive into the shadow root and collect an array of its results.
        let inners = diveShadow(State.elements[key][index], select, selector);
        if (inners.length > 0) {
          State.elements[key].splice(index, 1, ...inners);
        } else {
          State.elements[key].splice(index, 1);
        }
      }
    }
  }
}

const nudgeMark = function (el, x, y) {
  // TODO: THESE CAN NUDGE OUT OF THE OVERFLOW AREA OF THE CONTENTEDITABLE CONTAINER
  if (el.style.transform) {
    const computedStyle = window.getComputedStyle(el);
    let matrix = computedStyle.getPropertyValue('transform');
    matrix = matrix.split(',');
    el.style.transform = `translate(${parseFloat(matrix[4]) + x}px, ${parseFloat(matrix[5]) + y}px)`;
  } else {
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
};

function alignButtons() {
  if (!State.jumpList || State.jumpList.length === 0 || (State.openTip.button && State.scrollPending === 0)) { // todo always false?
    return;
  }
  State.alignPending = true;

  // Reading and writing in a loop creates paint thrashing.
  // We iterate the array for reads, then iterate for writes.

  if (State.options.fixedRoots) {
    State.positionedFrames.length = 0;

    State.options.fixedRoots.forEach((root) => {
      if (root['framePositioner']) {
        State.positionedFrames.push(root['framePositioner'].getBoundingClientRect());
      }
    });
  }

  // Used for crude intersection detection.
  let previousNudgeTop = 0;
  let previousNudgeLeft = 0;
  const scrollTop = window.scrollY;
  if (!State.options.inlineAlerts) {
    // Compute based on target position.

    State.jumpList.forEach((mark, i) => {
      if (!mark.result.element.isConnected) {
        // Something broke; rebuild jumpList on next loop.
        State.forceFullCheck = true;
        State.interaction = true;
        mark.style.display = 'none';
      }
      let targetOffset = mark.result.element.getBoundingClientRect();

      let top = targetOffset.top + scrollTop;
      //let rightBound = window.innerWidth;
      if (!visible(mark.result.element)) {
        // Invisible target.
        const firstVisibleParent = firstVisibleParent(mark.result.element);
        targetOffset = firstVisibleParent ? firstVisibleParent.getBoundingClientRect() : targetOffset;
        top = targetOffset.top + scrollTop;
      }
      let left = targetOffset.left;

      // TD TD different?
      if (mark.result.element.tagName === 'IMG') {
        top = top + 10;
        left = left + 10;
      } else {
        left = State.options.inlineAlerts ? left - 34 : left;
      }

      // Add iframe positon to calculated position
      if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
        top = top + State.positionedFrames[mark.result.fixedRoot].top;
        left = left + State.positionedFrames[mark.result.fixedRoot].left;
      }

      // TD TD different?
      if (mark.result.element.tagName === 'IMG') {
        top = top + 10;
        left = left + 10;
      } else {
        left = State.options.inlineAlerts ? left - 34 : left;
      }
      if (mark.result.scrollableParent) {
        // Bump alerts that would be X-position out of a scroll zone.
        State.jumpList[i].bounds = mark.result.scrollableParent.getBoundingClientRect();
        if (left < State.jumpList[i].bounds.left) {
          left = State.jumpList[i].bounds.left;
        } else if (left + 40 > State.jumpList[i].bounds.right) {
          left = State.jumpList[i].bounds.right - 40;
        }
      } else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
        // Bump alerts that would x-position out of an iframe.
        State.jumpList[i].bounds = State.positionedFrames[mark.result.fixedRoot];
        if (left < State.jumpList[i].bounds.left) {
          left = State.jumpList[i].bounds.left;
        } else if (left + 40 > State.jumpList[i].bounds.right) {
          left = State.jumpList[i].bounds.right - 40;
        }
      }
      State.jumpList[i].targetOffset = targetOffset;
      State.jumpList[i].markTop = top;
      State.jumpList[i].markLeft = left;
    });
  } else {
    // Compute based on self position.

    // Clear old transforms first. Batch write first...
    State.jumpList.forEach((mark) => {
      // Reset positions.
      mark.style.setProperty('transform', null);
      mark.style.setProperty('top', 'initial');
      mark.style.setProperty('left', 'initial');
      if (mark.style.transform) {
        const computedStyle = window.getComputedStyle(mark);
        let matrix = computedStyle.getPropertyValue('transform');
        matrix = matrix.split(',');
        mark.xOffset = parseFloat(matrix[4]);
        mark.yOffset = parseFloat(matrix[5]);
      }
      else {
        mark.xOffset = 0;
        mark.yOffset = 0;
      }
    });
    // ...then batch read new positions.
    State.jumpList.forEach((mark) => {
      mark.markOffset = mark.getBoundingClientRect();
      mark.markLeft = mark.markOffset.left;
      mark.markTop = mark.markOffset.top;
    });
  }


  // Check for overlaps, then write out transforms.
  State.jumpList.forEach((mark, i) => {

    // Now check for any needed nudges
    let nudgeTop = 10;
    let nudgeLeft = mark.result.element.tagName === 'IMG' ? 10 : -34;
    // Detect tip that overlaps with previous result.
    if (mark.markTop + scrollTop < 0) {
      // Offscreen to top.
      nudgeTop = (-1 * (mark.markTop + scrollTop)) - 6;
    }
    if (
      (i > 0 && overlap(mark.markLeft, mark.markTop, State.jumpList[i - 1].markLeft, State.jumpList[i - 1].markTop)) ||
      (i > 1 && overlap(mark.markLeft, mark.markTop, State.jumpList[i - 2].markLeft, State.jumpList[i - 2].markTop)) ||
      (i > 2 && overlap(mark.markLeft, mark.markTop, State.jumpList[i - 3].markLeft, State.jumpList[i - 3].markTop))
    ) {
      // todo postpone: compute actual overlap? We're bouncing by the full amount no matter what which adds too much gapping.
      nudgeTop = nudgeTop + 14 + previousNudgeTop;
      nudgeLeft = 14 + previousNudgeLeft;
    }

    let constrainLeft = 0;
    let constrainRight = window.innerWidth;

    if (mark.result.scrollableParent) {
      const constrained = mark.result.scrollableParent.getBoundingClientRect();
      constrainLeft = constrained.left;
      constrainRight = constrainLeft + constrained.width;
    } else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
      constrainLeft = State.positionedFrames[mark.result.fixedRoot].left;
      constrainRight = State.positionedFrames[mark.result.fixedRoot].right;
    }

    let needNudge = false;
    if (mark.markLeft + nudgeLeft - constrainLeft < 44) {
      // Offscreen to left. push to the right.
      nudgeLeft = 44 - mark.markLeft + nudgeLeft + constrainLeft;
      needNudge = true;
    }
    else if (mark.markLeft + nudgeLeft + 80 > constrainRight ) {
      needNudge = true;
      // Offscreen to right. push to the left
      nudgeLeft = constrainRight - nudgeLeft - mark.markLeft - 100;
    }
    else if (nudgeTop !== 0) {
      needNudge = true;
    }
    if (!State.options.inlineAlerts) {
      if (needNudge) {
        mark.style.transform = `translate(${mark.markLeft + nudgeLeft}px, ${mark.markTop + nudgeTop}px)`;
      } else {
        mark.style.transform = `translate(${mark.markLeft}px, ${mark.markTop}px)`;
      }

    } else {
      nudgeMark(mark, nudgeLeft, nudgeTop);
    }
    mark.nudgeLeft = nudgeLeft;
    mark.nudgeTop = nudgeTop;
    previousNudgeTop = nudgeTop;
    previousNudgeLeft = nudgeLeft;
  });

  // Last pass: check for elements offscreen within scrollable areas.
  if (!State.options.inlineAlerts) {
    // Alerts have to be positioned relative to viewport.
    State.jumpList.forEach(mark => {

      if (mark.result.scrollableParent) {
        // Hide alerts outside a scroll zone.
        if (!!mark.bounds && (mark.targetOffset.top - mark.bounds.top < 0 || mark.targetOffset.top - mark.bounds.bottom > 0 ) && !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')) {
          // Tip has exited scrollable parent. Visually hide.
          mark.classList.add('ed11y-offscreen');
          mark.style.transform = 'translate(0px, -50px)';
          mark.style.pointerEvents = 'none';
          if (mark.getAttribute('data-ed11y-open') === 'true') {
            mark.setAttribute('data-ed11y-action', 'shut');
          }
        }
        else {
          mark.classList.remove('ed11y-offscreen');
          mark.style.pointerEvents = 'auto';
        }
      } else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
        if (!!mark.bounds && (mark.targetOffset.top < -40 || mark.targetOffset.top + mark.bounds.top - mark.bounds.bottom > -10 ) && !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')) {
          // Tip has exited scrollable parent. Visually hide.
          mark.classList.add('ed11y-offscreen');
          mark.style.transform = 'translate(0px, -50px)';
          mark.style.pointerEvents = 'none';
          if (mark.getAttribute('data-ed11y-open') === 'true') {
            mark.setAttribute('data-ed11y-action', 'shut');
          }
        }
        else {
          mark.classList.remove('ed11y-offscreen');
          mark.style.pointerEvents = 'auto';
        }
      }
      else {
        mark.classList.remove('ed11y-offscreen');
        mark.style.pointerEvents = 'auto';
      }

    });
  }
  State.jumpList?.forEach(mark => {
    // Now make visible.
    // todo: Edge still flickers on redraw.
    mark.classList.remove('ed11y-preload');
  });

}


function alignTip (button, toolTip, recheck = 0, reveal = false) {
  if (!toolTip) {
    return;
  }

  let arrow = toolTip.shadowRoot.querySelector('.arrow');
  let tip = arrow.nextElementSibling;
  let loopCount = recheck - 1;

  // Various hiddenHandlers may cause element to animate open.
  if (recheck > 0) {
    window.setTimeout(function () {
      requestAnimationFrame(()=>alignTip(button, toolTip, loopCount, reveal));
    }, 200 / loopCount, button, toolTip, loopCount, reveal);
  }
  if (reveal) {
    window.setTimeout(() => {
      toolTip.style.setProperty('opacity', '1');
      // 140 seems to be the minimum to not flash.
    }, 140, toolTip, tip);
  }

  const mark = button.getRootNode().host;
  const resultNum = button.dataset.ed11yResult;
  const result = State.results[resultNum];

  // Find button on page
  const scrollTop = window.scrollY;
  let leftAdd = State.options.inlineAlerts ? window.scrollX : 0;

  let buttonOffset = button.getBoundingClientRect();
  let buttonSize = buttonOffset.width;
  let buttonLeft = buttonOffset.left + leftAdd;
  let buttonTop = buttonOffset.top + scrollTop;

  let containTop = scrollTop;
  let containLeft = 0;
  let containWidth = window.innerWidth;
  let containBottom = window.innerHeight + scrollTop;
  let absoluteBottom = containBottom;

  if (!State.options.inlineAlerts && result.scrollableParent) {
    let bounds = result.scrollableParent.getBoundingClientRect();
    if (bounds.width > 0) {
      //buttonTop = buttonTop + result.scrollableParent.scrollTop;
      containLeft = Math.max(0, bounds.left);
      containWidth = Math.min(containWidth, bounds.width - 30);
      containBottom = bounds.bottom + scrollTop;
      containTop = bounds.top + scrollTop;
      absoluteBottom = bounds.top + result.scrollableParent.scrollHeight;
    }
  } else if (mark.dataset.ed11yHiddenResult === 'true' || !(visible(mark) || buttonOffset.top === 0 && buttonOffset.left === 0)) {
    // ruh roh invisible button
    // todo: use the not-inline drawing pattern for invisible targets?
    const firstVisibleParent = firstVisibleParent(mark.result.element);
    if (firstVisibleParent) {
      buttonOffset = firstVisibleParent.getBoundingClientRect();
      buttonLeft = buttonOffset.left;
      buttonTop = buttonOffset.top;
    } else {
      tip.style.setProperty('max-width', 'none');
    }
    // Estimate from font when it can't be measured.
    buttonSize = window.innerWidth > 800 ? 38 : 33;
  }
  // Set wrapper for CSS.
  //tip.closest('.ed11y-wrapper').style.setProperty('width', buttonSize + 'px');
  //tip.closest('.ed11y-wrapper').style.setProperty('height', buttonSize + 'px');
  document.documentElement.style.setProperty('--ed11y-buttonWidth', buttonSize + 'px');
  tip.style.setProperty('max-width', `min(${containWidth > 280 ? containWidth : 280}px, 90vw)`);
  const containRight = Math.min(window.innerWidth, containLeft + containWidth);
  toolTip.style.setProperty('top', buttonOffset.top + scrollTop + 'px');
  toolTip.style.setProperty('left', buttonOffset.left + leftAdd + 'px');
  const tipWidth = tip.offsetWidth;
  const tipHeight = tip.offsetHeight;

  let direction = 'under';

  // Default to displaying under
  if (buttonTop === 0 && buttonLeft === 0) {
    direction = 'whompWhomp';
  } else if (buttonTop + tipHeight + scrollTop + buttonSize + 22 > containBottom) {
    // It won't fit under. Look elsewhere.
    if ( containRight > buttonSize + tipWidth + buttonLeft + 30 &&
      containTop + tipHeight + 30 < containBottom ) {
      direction = 'right';
    } else if (buttonTop - tipHeight - 15 > containTop) {
      direction = 'above';
    } else if ( containLeft < buttonLeft - (buttonSize + tipWidth + 30) &&
      containTop + tipHeight + 30 < containBottom) {
      direction = 'left';
    } else if (buttonTop + tipHeight + buttonSize > absoluteBottom) {
      // It REALLY doesn't fit below.
      direction = 'above';
    }
    // Back to default.
  } // else: under.
  arrow.dataset.direction = direction;

  let nudgeX = 0;
  let nudgeY = 0;

  const align = function(container, alignTo, size, direction) {
    let over = container - (alignTo + size + buttonSize);
    if (over < 0) {
      if (direction === 'horizontal' && alignTo + over < 0) {
        // Prevent left edge overshoot.
        return Math.max(0 - alignTo, 4 - size);
      }
      return Math.max(over, buttonSize + 10 - size);
    }
    return 0;

  };

  switch (direction) {
    case 'under':
      nudgeX = align(containRight, buttonLeft, tipWidth, 'horizontal');
      arrow.style.setProperty('top', buttonSize + 'px');
      arrow.style.setProperty('right', 'auto');
      arrow.style.setProperty('bottom', 'auto');
      arrow.style.setProperty('left', buttonSize / 2 - 10 + 'px');
      tip.style.setProperty('top', buttonSize + 10 + 'px');
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', 'auto');
      tip.style.setProperty('left', '-4px');
      break;
    case 'above':
      nudgeX = align(containRight, buttonLeft, tipWidth, 'horizontal');
      arrow.style.setProperty('top', 'auto');
      arrow.style.setProperty('right', 'auto');
      arrow.style.setProperty('bottom', '2px');
      arrow.style.setProperty('left', buttonSize / 2 - 10 + 'px');
      tip.style.setProperty('top', 'auto');
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', '12px');
      tip.style.setProperty('left', '-4px');
      break;
    case 'right':
      nudgeY = align(containBottom, buttonTop, tipHeight, 'vertical');
      arrow.style.setProperty('top', buttonSize / 2 - 10 + 'px');
      arrow.style.setProperty('right', 'auto');
      arrow.style.setProperty('bottom', 'auto');
      arrow.style.setProperty('left', buttonSize + 'px');
      tip.style.setProperty('top', '-4px');
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', 'auto');
      tip.style.setProperty('left', buttonSize + 10 + 'px');
      break;
    case 'left':
      nudgeY = align(containBottom, buttonTop, tipHeight, 'vertical');
      arrow.style.setProperty('top', buttonSize / 2 - 10 + 'px');
      arrow.style.setProperty('right', '0');
      arrow.style.setProperty('bottom', 'auto');
      arrow.style.setProperty('left', 'auto');
      tip.style.setProperty('top', '-4px');
      tip.style.setProperty('right', '10px');
      tip.style.setProperty('bottom', 'auto');
      tip.style.setProperty('left', 'auto');
      break;
    case 'whompWhomp':
      nudgeY = align(containBottom, buttonTop, tipHeight, 'horizontal');
      arrow.style.setProperty('top', '0');
      arrow.style.setProperty('right', '0');
      arrow.style.setProperty('bottom', '0');
      arrow.style.setProperty('left', '0');
      tip.style.setProperty('top', `calc(50vh - ${tipWidth / 2}px)`);
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', 'auto');
      tip.style.setProperty('left', `calc(50vh - ${tipHeight / 2}px)`);
      break;
  }
  if (nudgeX || nudgeY) {
    tip.style.setProperty('transform', `translate(${nudgeX}px, ${nudgeY}px)`);
  } else {
    tip.style.setProperty('transform', 'none');
  }
  alignHighlights();
}

function updateTipLocations () {
  if (!State.scrollTicking && State.scrollPending > 0 && !State.running && State.jumpList && State.open) {
    State.scrollTicking = true;
    alignButtons();
    if (State.openTip.tip) {
      alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
    }
    State.scrollPending --;
  }
  State.scrollTicking = false;
  if (State.scrollPending > 0) {
    requestAnimationFrame(() => updateTipLocations());
  }
}

const scrollableElem = function(el) {
  let overflowing = el.clientHeight && el.clientHeight < el.scrollHeight;
  if (overflowing) {
    const styles = window.getComputedStyle(el);
    overflowing = styles.overflowY !== 'visible';
  }
  return overflowing;
};

function closestScrollable(el) {
  if (State.options.constrainButtons && el.closest(State.options.constrainButtons)) {
    return el.closest(State.options.constrainButtons);
  }

  let parent = el.parentElement;
  if (parent && parent.tagName !== 'BODY') {
    // Parent exists
    if (scrollableElem(parent)) {
      // Return if scrollable found.
      return parent;
    } else {
      // Element is not scrollable, recurse
      parent = closestScrollable(parent);
      // Return if scrollable found.
      return parent;
    }
  } else {
    // No scrollable parents.
    return false;
  }
}
const overlap = function(rect1Left, rect1Top, rect2Left, rect2Top, size = 17) {
  // Yes this looks like intersect const, but it's math not browser offsets.
  return !(rect1Left + size < rect2Left ||
    rect1Left > rect2Left + size ||
    rect1Top + size < rect2Top ||
    rect1Top > rect2Top + size);
};

// Applies parameters and avoids other widgets.
function alignPanel$1() {
  if (!UI$1.panelElement) {
    return false;
  }
  if (State.options.panelPinTo === 'left') {
    UI$1.panel.classList.add('ed11y-pin-left');
  }
  let xMost = 0;
  let yMost = 0;
  if (State.elements.panelPin) { // todo
    State.elements.panelPin.forEach(el => {
      let bounds = el.getBoundingClientRect();
      if (State.options.panelPinTo === 'right') {
        xMost = window.innerWidth - bounds.left > xMost && bounds.left > window.innerWidth / 3 ? window.innerWidth - bounds.left : xMost;
      } else {
        xMost = bounds.right > xMost && xMost + bounds.right < window.innerWidth / 3 ? xMost + bounds.right : xMost;
      }
      yMost = bounds.height > yMost && bounds.height + yMost < window.innerHeight / 2 ? yMost + bounds.height : yMost;
    });
  }
  if (xMost > 0 && xMost < window.innerWidth - 240) {
    // push off horizontal
    UI$1.panelElement.style.setProperty(State.options.panelPinTo, xMost + 10 + 'px');
    UI$1.panelElement.style.setProperty('bottom', State.options.panelOffsetY);
  } else if (xMost > 0 && xMost > window.innerWidth - 240 && yMost > 0) {
    // push off vertical
    UI$1.panelElement.style.setProperty(State.options.panelPinTo, State.options.panelOffsetX);
    UI$1.panelElement.style.setProperty('bottom', `calc(${State.options.panelOffsetY} + ${yMost}px)`);
  } else {
    // no push
    UI$1.panelElement.style.setProperty(State.options.panelPinTo, State.options.panelOffsetX);
    UI$1.panelElement.style.setProperty('bottom', State.options.panelOffsetY);
  }
}

function windowResize() {
  if (UI$1.panel?.classList.contains('ed11y-active') === true) {
    alignAlts();
    alignButtons();
  }
  if (State.openTip.button) {
    alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
  }
  alignPanel();
}
function pauseObservers() {
  State.watching?.forEach(observer => {
    observer.observer.disconnect();
  });
}function resumeObservers() {
  State.watching?.forEach(observer => {
    observer.observer.observe(observer.root, observer.config);
  });
}
function intersectionObservers() {

  State.elements.editable?.forEach(editable => {
    editable.addEventListener('scroll', function() {
      // Align tips when scrolling editable container.
      if (State.openTip.button) {
        State.scrollPending = State.scrollPending < 2 ? State.scrollPending + 1 : State.scrollPending;
        requestAnimationFrame(() => updateTipLocations());
      }
    });
  });

  document.addEventListener('scroll', function() {
    // Trigger on scrolling other containers, unless it will flicker a tip.
    if (!State.options.inlineAlerts && !State.openTip.button) {
      State.scrollPending = State.scrollPending < 2 ? State.scrollPending + 1 : State.scrollPending;
      requestAnimationFrame(() => updateTipLocations());
    } else if (State.openTip.button) {
      alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
    }
  }, true);

  document.addEventListener('selectionchange', function() {
  });
}

/**
 * Hide tips that are in front of text currently being edited.
 * */
function checkEditableIntersects (focusKnown = false) {
  if (!focusKnown && !document.querySelector('[contenteditable]:focus, [contenteditable] :focus')) {
    //Reset classes to measure.
    State.jumpList?.forEach((el) => {
      el.classList.remove('intersecting');
    });
    return;
  }
  {
    // Range isn't on a node we can measure.
    State.jumpList?.forEach((el) => {
      el.classList.remove('intersecting');
    });
    return;
  }
}

/*
Set up mutation observer for added nodes.
*/
function startObserver (root) {

  // We don't want to nest or duplicate observers.
  if (typeof root.closest === 'function') {
    // It's a normal tag.
    if (root.closest('[data-editoria11y-observer]')) {
      // We're already being watched.
      return;
    } else {
      root.dataset.editoria11yObserver = 'true';
    }
  } else {
    // Match has DOM traversal issues.
    if (typeof root.host !== 'function' ||
      root.host.dataset.editoria11yObserver !== undefined) {
      // Already watching or something is weird.
      return;
    } else {
      // Observe host instead.
      root.host.dataset.editoria11yObserver = 'true';
    }
  }

  // Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: true, characterData: true };

  const logNode = function (node) {
    /*
    * Newly inserted tables and headings should not be flagged as empty
    * before the user has a chance to edit them. This is crude, but it
    * delays flagging.
    * */
    if (!node || node.nodeType !== 1 || !node.isConnected || node.closest('script, link, head, .ed11y-wrapper, .ed11y-style, .ed11y-element')) {
      return 0;
    }
    if (State.options.inlineAlerts) {
      return 1;
    }
    if (!node.matches('[contenteditable] *')) {
      return 0;
    }
    if (State.options.inlineAlerts) {
      return true;
    }
    const searchList = 'table, h1, h2, h3, h4, h5, h6, blockquote';
    if (!State.options.inlineAlerts &&
      !node.matches(node.matches(searchList)) &&
      node.matches('[contenteditable] *')) {
      if (node.matches('table *')) {
        node = node.closest('table');
      } else if (!node.matches(searchList)) {
        node = node.querySelector(searchList);
      }
    }
    if (node && node.matches(searchList)) {
      State.recentlyAddedNodes.set(node, Date.now());
      return 0;
    }
    return 1;
  };

  // Create an observer instance linked to the callback function
  const callback = (mutationList) => {
    let align = 0;
    for (const mutation of mutationList) {
      if (mutation.type === 'characterData' &&
        mutation.target.parentElement &&
        mutation.target.parentElement.matches('[contenteditable] *')) {
        return;
      } else if (mutation.type === 'childList') {
        // Recheck if there are relevant node changes.
        if (mutation.removedNodes.length > 0) {
          align += 1;
        } else if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            align += logNode(node);
          });
        }
      }
    }
    // These are debounced
    if (!align) {
      return;
    }
    window.setTimeout(function () {
      State.alignPending = false;
    },0);
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);
  // Start observing the target node for configured mutations
  observer.observe(root, config);
  State.watching.push({
    observer: observer,
    root: root,
    config: config,
  });
  document.addEventListener('readystatechange', () => {
    window.setTimeout(function () {
      State.scrollPending++;
      updateTipLocations();
    }, 100);
  });
  window.setTimeout(function () {
    State.scrollPending++;
    updateTipLocations();
  }, 1000);
}

class Ed11y$1 {

  constructor(options) {

    State.version = '3.0.0';
    State.options = Options.preProcessOptions(options);
    // Initialize global constants and exclusions.
    Constants.initializeGlobal(State.options);
    Constants.initializeReadability(State.options);
    Constants.initializeExclusions(State.options);
    Options.postProcessOptions(State.options);

    Object.assign(M, ed11yLang['en'], ed11yLang[State.options.lang]);

    Object.assign(Theme, State.options[State.options.theme]);
    Theme.baseFontSize = State.options.baseFontSize;
    Theme.buttonZIndex = State.options.buttonZIndex;
    Theme.baseFontFamily = State.options.baseFontFamily;

    if (State.options.currentPage === false) {
      State.options.currentPage = window.location.pathname;
    }

    if (!State.options.linkStringsNewWindows) {
      State.options.linkStringsNewWindows = M.linkStringsNewWindows;
    }

    window.addEventListener('keydown', () => {
      State.interaction = true;
    });
    window.addEventListener('click', () => {
      State.interaction = true;
    });

    // Move toggles when something expands or collapses.
    const mightExpand = document.querySelectorAll('[aria-expanded], [aria-controls]');
    mightExpand?.forEach(expandable => {
      expandable.addEventListener('click', () => {
        window.setTimeout(() => {
          windowResize();
        }, 333);
      });
    });

    // Escape key closes panels.
    const escapeWatch = function (event) {
      if (event.keyCode === 27) {
        if (event.target.closest('ed11y-element-panel') && UI$1.panelToggle.getAttribute('aria-expanded') === 'true') {
          UI$1.panelToggle.focus();
          UI$1.panelToggle.click();
        } else if (event.target.hasAttribute('data-ed11y-open')) {
          if (State.openTip.button) {
            State.toggledFrom.focus();
            State.openTip.button.shadowRoot.querySelector('button').click();
          }
        }
      }
    };
    document.addEventListener('keyup', function (event) {escapeWatch(event); });


    if (CSS.supports('selector(:has(body))')) {
      makeItSo();
    } else {
      console.warn(M.consoleNotSupported);
    }

    this.checkAll = checkAll();
  }
}

export { Ed11y$1 as Ed11y, Lang, checkAll };
