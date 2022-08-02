const ed11yLang = {

  // ESLint config:
  /* global Ed11y */
  /* exported ed11yLang */

  en : {

    // Main Panel
    panelCount0 : 'No issues detected.',
    panelCount1 : 'One issue detected.',
    panelCountMultiple: ' issues detected.',
    panelHelp : `
            <p>Assistive devices that can reformat content for people with disabilities need well structured content to work.</p>
            <p>This tool checks for common issues, such as <a href='https://accessibility.princeton.edu/how/content/alternative-text'>missing alternative text</a>, <a href='https://accessibility.princeton.edu/how/content/headings'>jumbled page outlines</a> and <a href='https://accessibility.princeton.edu/how/content/links'>generic link titles</a>, and reminds content creators to check audio and video for closed captioning.</p>
            <p>Note that it <strong>only</strong> checks editorial content; your site's theme needs its own <a href='https://webaim.org/resources/evalquickref/'>accessibility testing</a>.<p>
            <p>Have a bug or feature request? <a href='https://github.com/itmaybejj/editoria11y/issues' class='ed11y-small'>Contact the Editoria11y maintainers</a>.</p>
        `,
    jumpedToInvisibleTip: 'The element with this issue may be hidden. I will outline its nearest visible container',
    jumpedToAriaHiddenTip: 'The element with this issue has an "aria-hidden" attribute and may be invisible or off screen.',

    // Tooltips for heading tests

    headingExample : `
        <ul>
            <li>Heading level 1
                <ul>
                    <li>Heading level 2 (a topic)
                        <ul><li>Heading level 3 (a subtopic)</li></ul></li>
                    <li>Heading level 2 (a new topic)</li>
                </ul>
            </li>
        </ul>`,
    headingLevelSkipped : {
      title: 'Manual check: heading level skipped',
      tip: (prevLevel, level) =>
        `<p>This heading is marked as level ${level}, but the previous was level ${prevLevel}.</p><p>Headings and subheadings create a navigable table of contents for assistive devices. The <em>level numbers</em> show how the headings are related, akin to indents in a nested outline:</p>
            ${Ed11y.M.headingExample}
            <p>Skipping directly to ${level} will make the reader believe they missed ${parseInt(level - 1)}, and whichever topic change it introduced.</p>
            `,
    },

    headingEmpty : {
      title: 'Heading tag without any text',
      tip: () => 
        `<p>Headings and subheadings create a navigable table of contents for assistive devices. "Blank" headings create confusing gaps. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>
            ${Ed11y.M.headingExample}
            <p><strong>To fix:</strong> delete the empty line or provide text for the section label.</p>
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
        '<p>Blockquote formatting tells screen readers that this text should be announced as a quotation. This was flagged because short blockquotes are sometimes actually headings that belong in the page outline. If that is the case here, please use heading formatting instead.</p>',
    },

    // Tooltips for image tests

    // Reusable example for tips:
    altAttributeExample : 
            `<p>Note that it is the <em>meaning</em> that matters. For example, the context would determine which of these best describes a picture of a child kicking a ball:</p>
            <ul>
                <li>Child kicking a ball</li>
                <li>AJ's game-winning kick curved in from the left sideline</li>
                <li>The "medium" ball is the right size for a 9-year-old child</li>
            </ul>`,
        
    altAttributeProvided: (alt) => 
      `<p>This image's alt text is: "<strong>${alt}</strong>"</p>`,

    altMissing : {
      title: 'Image has no alternative text attribute',
      tip: () =>
        `<p>When screen readers encounter an image with no alt attribute, they dictate the url of the image file instead, often one letter at a time.
            Please set this image's alternative text to a concise description of what this image means in this context.</p>
            ${Ed11y.M.altAttributeExample}`,
    },

    altNull : {
      title: 'Manual check: image is marked as decoration',
      tip: () =>
        `<p>This image provides no text alternative. This tells screen readers that it is present only for visual decoration, 
            and should be ignored. If that is incorrect because this image is meaningful for sighted users, please provide a concise description of what this image means in this context.</p> 
            ${Ed11y.M.altAttributeExample}`,
    },

    altURL : {
      title: 'Image\'s text alternative is a URL',
      tip: (alt) =>
        `<p>Please set this image's alternative text to a concise description of what this image means in this context.</p>
            ${Ed11y.M.altAttributeExample}
            ${Ed11y.M.altAttributeProvided(alt)}`
      ,
    },
    altURLLinked : {
      title: 'Linked image\'s text alternative is a URL',
      tip: (alt) =>
        `<p>When a link includes an image, the image's alt text becomes part of the link text announced by screen readers.
            Links should clearly and concisely describe their destination; a URL (usually pronounced by the screen reader one letter at a time) does not.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "aitch tee tee pee colon forward slash forward slash example dot com forward slash aye bee oh you tee you ess</li>
            </ul>
            ${Ed11y.M.altAttributeProvided(alt)}`,
    },

    altImageOf : {
      title: 'Manual check: possibly redundant text in alt',
      tip: (alt) =>
        `<p>Since screen readers automatically announce they are describing an image, 
            words like "image," "photo" or "graphic" are only helpful 
            in a text alternative if they describe what is contained in the image, rather
            than repeating the fact that the image is an image.</p>
            <ul><li>Redundant: "<em>Photo of</em> my new spoon."</li>
            <li>Helpful: "Cracked and faded <em>photo of</em> the first computer."</li></ul>
            ${Ed11y.M.altAttributeProvided(alt)}`
    },
    altImageOfLinked : {
      title: 'Manual check: possibly redundant text in linked image',
      tip: (alt) =>
        `<p>Links should clearly and concisely describe their destination. Since words like "image," "graphic" or "photo" are redundant in text alternatives (screen readers already identify the image as an image), they often indicate that the image's text alternative is describing the image instead of the link.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "Stock photo of five people jumping and high fiving around a conference table, image"</li>
            </ul>
            <hr>
            ${Ed11y.M.altAttributeProvided(alt)}`
    },

    altDeadspace : {
      title: 'Linked image\'s text alternative is unpronouncable',
      tip: (alt) =>
        `<p>This image's alt consists of only silent characters (spaces and quotation marks). It will be announced by screen readers as as part of the link's text, but the description of what the image is will be unintelligible. Please set this image's alternative text to something that describes the link's destination, or provide a <em>completely</em> empty alt (alt="") if the image should not be mentioned at all.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "About us, image: [short confusing silence]"</li>
            </ul>
            ${Ed11y.M.altAttributeProvided(alt)}`,
    },

    altLong : {
      title: 'Manual check: very long alternative text',
      tip: (alt) =>
        `<p>Image text alternatives are announced by screen readers as a single run-on sentence; listeners must listen to the entire alt a second time if they miss something. When more that a few words are needed to describe an image, it is usually better to provide and reference a <em>visible</em> text alternative, an approach that is often preferred by mobile device users and readers with low-vision. For example:</p>
            <ul><li>"Event poster; details provided in caption"</li>
            <li>"Chart showing our issues on this page going to zero; details in table"</li></ul>
            ${Ed11y.M.altAttributeProvided(alt)}
            `,
    },
    altLongLinked : {
      title: 'Manual check: very long alternative text in linked image',
      tip: (alt) =>
        `<p>The alt text on a linked image is used to describe the link destination. Links should be brief, clear and concise, as screen reader users often listen to the list of links on the page to find content of interest. Long alternative text inside a link often indicates that the image's text alternative is describing the image instead rather than the link.</p>
            ${Ed11y.M.altAttributeProvided(alt)}
            `,
    },

    altPartOfLinkWithText : {
      title: 'Manual check: link contains both text and an image',
      tip: (alt) => 
        `<p>When a link includes an image, the image's alt text becomes part of the link.
            This can be confusing if the image's text alternative is adding irrelevant details.</p>
            <ul>
                <li>Confusing: "Link, 'Stock photo of five people jumping and high fiving around a conference table, image', About us</li>
                <li>Ideal: "Link, About us" (image was marked decorative with a blank alt and not announced)</li>
            </ul>
            ${Ed11y.M.altAttributeProvided(alt)}
            `,
    },

    linkNoText : {
      title: 'Link with no accessible text',
      tip: () =>
        `<p>This link is either entirely empty (e.g., a copy paste error of a link around a space character) or wrapped around something with no text alternative (an image with no alt attribute).</p>
            <p>Screen reader users will be confused when they encounter this, hearing either an awkward silence "Link, [...awkward silence]," or the URL, spelled out character by character: "Link, aitch tee tee pee colon forward slash forward slash example dot com"</p>
            <p>To fix: delete this link if it is empty, add alt text to the image that equals the visible title of the link if it is a linked image.</p>`,
    },

    linkTextIsURL : {
      title: 'Link\'s accessible text may be URL',
      tip: (text) => 
        `<p>Readers expect links to clearly and concisely describe their destination, and often skim pages by headings and links. This is especially true of screen reader users, who frequently navigate using automatically generated lists of the links on the page, pulled out of context.</p>
                <ul><li>Concise and meaningful link: <a href="https://www.google.com/search?q=writing+meaningful+links">writing meaningful links</a></strong></li><li>Unhelpful link text: <a href="https://www.google.com/search?q=writing+meaningful+links">https://www.google.com/search?q=writing+meaningful+links</a></li></ul>
                <p>This link's text is: <strong>${text}</strong></p>
                `,
    },

    linkTextIsGeneric : {
      title: 'Manual check: is this link meaningful and concise?',
      tip: (text) => 
        `<p>Readers often skim pages by headings and links, and will miss or ignore links that are meaningless or have their meaning obscured. Meaningless links like "click here," "read more" or "download" expect the reader to stop, go back, and determine what the link does from context. Many readers will not do this, or be frustrated that they have to.</p>
                <p>This is especially true of screen reader users, who navigate using automatically generated lists links pulled out of context.</p>
                <ul><li>Meaningful and concise: "Learn more about <a href="https://www.google.com/search?q=writing+meaningful+links">writing meaningful links"</a></strong></li>
                <li>Not meaningful: "To learn more writing meaningful links, <a href="https://www.google.com/search?q=writing+meaningful+links">click here</a>.</li>
                <li>Not concise: "<a href="https://www.google.com/search?q=writing+meaningful+links">Click here to learn more about writing meaningful links</a>"</li></ul>
                <p>This link's text is: <strong>${text}</strong></p>`
      ,
    },

    linkDocument : {
      title : 'Manual check: is the linked document accessible?',
      tip: () => 
        `<p>This automated checker helps ensure Web pages contain the features assistive technologies need to make content accessible for everybody; things like headings, table headers and image alternative text. It is not able to check linked documents.</p>
                <p>If the linked document cannot be converted to a Web page (something usually preferred by mobile device and screen reader users), please make sure it at least contains structural tags and image alt text. See tips for remediating:
                <ul>
                    <li><a href='https://webaim.org/techniques/word/'>text documents</a></li>
                    <li><a href='https://webaim.org/techniques/powerpoint/'>slideshows</a></li>
                    <li><a href='https://webaim.org/techniques/acrobat/'>documents intended for printers instead of screens (PDF)</a></li>
                </ul>`
      ,
    },

    linkNewWindow : {
      title: 'Manual check: is opening a new window expected?',
      tip: () => 
        `<p>Normally readers can choose to open a link in the same window or a new window. When a link forces the browser to open in a new window without warning, it can be confusing, especially for assistive device users who may not realize a new window has opened and wonder why their browse "back" button is suddenly disabled, or who need many clicks to get back to the previous window.</p>
                <p>There are generally only two situations where it is not confusing or annoying to force a link to open a new window:</p>
                <ul>
                    <li>When the user is in a multi-step form (e.g., a store checkout process), and they would lose their place if they followed a link.</li>
                    <li>When the user is warned by text or an icon with a text-equivalent for screen readers the link will open in a new window.</li>
                </ul>
                `
      ,
    },

    // Tooltips for Text QA

    tableNoHeaderCells : {
      title: 'Table has no header cells',
      tip: () => `
                <p>Tables are announced by screen readers as special objects with horizontal and vertical navigation options. The screen readers rely on table header cells to label the rows and columns as users move about the table. Without them, it is very easy to get lost.</p>
                <p>To fix:</p>
                <ul><li>If this table contains actual tabular information (the rows and columns are meaningful), edit the table's properties and specify whether the first row, column or both contains the labels needed to understand the content cells.</li>
                <li>If this table does not contain tabular information, and was simply used to make "fake" columns, copy and paste the text out of the table and delete the table. Tables used for layout are confusing for screen readers and incompatible with mobile devices and screen magnifiers, since they do not "stack" into a single column like real columned layouts.</li></ul>
            `,
    },

    tableContainsContentHeading : {
      title: 'Content heading inside a table',
      tip: () => 
        `<p>"Table headers" and "content headings" mean different things:</p>
            <ul><li>Table header cells label a <strong>column or row</strong>. In the example below, a table header in position 3 would label cell C.</li><li>Content headings ("Heading 1", "Heading 2") are the chapter titles for the page, labelling all content <strong>until the next heading</strong>, with no respect for columns or rows. A content heading in position 3 would label cells A, B <strong><em>and</em></strong> C.</li></ul>
            <table><tr><th>1</th><th>2</th><th>3</th></tr>
            <tr><td>A</td><td>B</td><td>C</td></table>
            `
    },

    tableEmptyHeaderCell : {
      title: 'Empty table header cell',
      tip: () => `
                <p>Tables are announced by screen readers as special objects with horizontal and vertical navigation options. The screen readers rely on table header cells to label the rows and columns as users move about the table. Without them, it is very easy to get lost.</p>
            `,
    },

    textPossibleList : {
      title: 'Manual check: should this be a list?',
      tip : (text) => 
        `<p>List formatting is more than symbols:</p> 
            <ol><li>Formatted lists reflow elegantly for small screens, maintaining gaps and spacing and line breaks.</li><li>Formatted lists structure content in a navigable way. Screen readers announce how many items are in the list, and users can jump from item to item.</li></ol>
            <p>If the "${text}" in this paragraph indicates it starts a list, please replace the "${text}" with the equivalent list formatting.</p>`,
    },

    textPossibleHeading : {
      title: 'Manual check: should this be a heading?',
      tip : () => 
        `<p>Headings and subheadings create a navigable table of contents for assistive devices. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>
            ${Ed11y.M.headingExample}
            <p>If this all-bold text is functioning visually as a heading, please replace the bold formatting with the appropriately numbered heading.</p>
            `,
    },

    textUppercase : {
      title: 'Manual check: is this uppercase text needed?',
      tip : () => 
        '<p>ALL UPPERCASE TEXT CAN BE MORE DIFFICULT TO READ FOR MANY PEOPLE, AND IS OFTEN INTERPRETED AS SHOUTING.</p>',
    },

    embedVideo : {
      title: 'Manual check: is this video accurately captioned?',
      tip : () => 
        `<p>If a recorded video contains speech or meaningful sounds, it must be captioned.</p>
            <p>Note that machine-generated captions are an excellent start, but must be proofread and edited to identify who is speaking before being considered an equal alternative.</p>`,
    },
    embedAudio : {
      title: 'Manual check: is an accurate transcript provided?',
      tip : () => 
        `<p>If this audio contains speech, a text alternative must be provided, either as content on this page, a link or a download.</p>
            <p>Note that machine-generated transcripts are an excellent start, but must be proofread and edited to identify who is speaking before being considered an equal alternative</p>`,
    },
    embedVisualization : {
      title: 'Manual check: is this visualization accessible?',
      tip : () => 
        `<p>Visualization widgets are often difficult or impossible for assistive devices to operate, and can be difficult to understand for readers with low vision or colorblindness.</p>
            <p>Unless this particular widget has an adjustable font size, high visual contrast, can be operated by a keyboard and can be understood by a screen reader, assume that an alternate format (text description, data table or downloadable spreadsheet) should also be provided.</p>`,
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

