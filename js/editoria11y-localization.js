ed11yPanel = "" +
    "<div id='ed11y-panel' class='ed11y-reset ed11y-preload ed11y-panel-shut ed11y-pass'>" +
    "<h1 class='ed11y-sr-only'>Editorially Tools</h1>" +
    "<div id='ed11y-panel-upper'>" +
    "<div id='ed11y-fullcheck-headers' class='ed11y-outline-header ed11y-fullcheck'>" +
    "<div id='ed11y-fullcheck-outline-header' class='ed11y-bold ed11y-fullcheck-header' tabindex='-1'>Headers" +
    "<p>Check that this forms <a href='https://accessibility.princeton.edu/how/content/headings'>a complete outline</a>:</p>" +
    "</div>" +
    "<button type='button' class='ed11y-upper-next-button ed11y-header-button'>Media<span aria-hidden='true'> &raquo;</span></button>" +
    "<ul id='ed11y-outline-list' tabindex='-1' aria-labelledby='ed11y-fullcheck-headers'></ul>" +
    "</div>" +
    "<div id='ed11y-fullcheck-images' class='ed11y-outline-header ed11y-fullcheck'>" +
    "<div id='ed11y-image-header' class='ed11y-bold ed11y-fullcheck-header'>Media" +
    "<p>Check <a href='https://accessibility.princeton.edu/how/content/alternative-text'>alt text</a>, " +
    "<a href='https://accessibility.princeton.edu/how/content/images-text'>images of text</a>, &amp; <a href='https://webaim.org/techniques/captions/'>captions</a>.</p>" +
    "</div>" +
    "<button type='button' class='ed11y-upper-next-button ed11y-header-button'>Content outline<span aria-hidden='true'> &raquo;</span></button>" +
    "<ul id='ed11y-image-list' tabindex='-1' aria-labelledby='ed11y-fullcheck-outline-header'></ul>" +
    "</div>" +
    "</div>" +
    "<div id='ed11y-panel-content'>" +
    "<div class='ed11y-panel-icon'></div>" +
    "<div id='ed11y-panel-text'>" +
    "<span class='ed11y-checkmessage' tabindex='-1'><span class='ed11y-panel-count'>No</span> <span class='ed11y-panel-messagetype'>accessibility errors detected</span>.</span><br>" +
    "<a href='#' class='ed11y-jumplink ed11y-small'>Show <span class='ed11y-jumpnext'>first</span> <span aria-hidden='true'> »</span></a>" +
    "</div>" +
    "</div>" +
    "<div id='ed11y-panel-buttonbar'>" +
    "<button type='button' aria-expanded='false' id='ed11y-summary-toggle' class='ed11y-button ed11y-panel-button' aria-pressed='false'>Show tags</button>" +
    "<button type='button' class='ed11y-button ed11y-about' title='About this tool' aria-label='about' aria-pressed='false'>?</button>" +
    "<button type='button' class='ed11y-minimize ed11y-button' title='Minimize panel' aria-label='Minimize panel' aria-pressed='false'><span></span></button>" +
    "<button type='button' id='ed11y-shutpanel' title='Close panel' class='ed11y-button ed11y-panel-button' aria-label='close panel'>&times;</button>" +
    "<button type='button' id='ed11y-main-toggle' class='ed11y-preload' aria-expanded='false' title='Accessibility checker'><span class='ed11y-toggle-icon'></span><span class='ed11y-sr-only'>Show accessibility scan panel with</span><span class='ed11y-count'></span><span class='ed11y-sr-only'>issues</span></button>" +
    "</div>" +
    "<div aria-live='polite' class='ed11y-sr-only' id='ed11y-aria-live'></div>"
"</div>";

ed11yAbout = "" +
    "<p>Assistive devices like screen readers depend on the invisible structure of the page matching its visual look and feel.</p>" +
    "<p>This tool checks for common structural issues like " +
    "<a href='https://accessibility.princeton.edu/how/content/alternative-text'>missing alternative text</a>, " +
    "<a href='https://accessibility.princeton.edu/how/content/headings'>jumbled page outlines</a> and " +
    "<a href='https://accessibility.princeton.edu/how/content/links'>generic link titles</a>.</p><p>Note that it <span class='ed11y-bold'>only</span> checks editorial content; your site's theme needs its own <a href='https://webaim.org/resources/evalquickref/'>accessibility testing</a>.<p>" +
    "<p><a href='https://github.com/itmaybejj/editoria11y/issues' class='ed11y-small'>Report an issue <span aria-hidden='true'>»</span></a></p>";

ed11yInvisibleTip = "The element with this issue is not currently visible; it may be hidden or inside a tab or accordion. I will outline its container.";
ed11yHiddenTip = "The element with this issue has been marked as hidden from screen readers. It may be in an unopened tab or accordion, so I will outline its container.";

// Messages for Headings

ed11yMessageHeadingEmpty = "<div class='ed11y-tip-heading'>Empty heading</div> " +
    "<p>Even though headings without text aren't visible, they still appear " +
    "in <a href='https://accessibility.princeton.edu/how/content/headings'>" +
    "document outlines</a>, and the vertical gaps they create between " +
    "paragraphs are often larger than the designer intended.</p>" +
    "<p>To fix: edit the page and delete this line, or change its format " +
    "from &quot;Heading&quot; to &quot;Normal&quot;.</p>";

// Messages for links.
ed11yMessageLinkHasNoText = "<div class='ed11y-tip-heading'>Link title not " +
    "found</div> " +
    "<p>Screen readers will either read the entire url of this link, one " +
    "character at a time, or say <span class='ed11y-bold'>&quot;Link: " +
    "[...awkward silence...].&quot;</span></p>" +
    "<p>To fix: delete this link if it is just stray tags wrapped around an " +
    "empty space due to a copy/paste bug, or add alt text if it is a real " +
    "link wrapped around an image or icon.</p>";

ed11yMessagelinkTextIsURL = "<div class='ed11y-tip-heading'>Link may be a " +
    "URL</div>" +
    "<p>Assistive devices expect link titles to be " +
    "<a href='https://accessibility.princeton.edu/how/content/links'>" +
    "&quot;clear and meaningful&quot;</a>, even out of context.</p>" +
    "<p>Note that spelling out a very short URL is OK if the URL itself " +
    "<em>is</em> what you are communicating, e.g., when providing an email " +
    "address.</p>"

ed11yMessagelinkTextIsGeneric = "<div class='ed11y-tip-heading'>Manual check " +
    "needed: link title may be generic</div>" +
    "<p>This link appears to be made of common words like " +
    "&quot;click here&quot; or &quot;download&quot;.</p>" +
    "<p>Many users skim for links, and most assistive devices provide lists of link titles, so please check to make sure this link is " +
    "<span class='ed11y-bold'>unique, clear and meaningful</span>, even out of context.</p><p>Compare which words stand out:<br>" +
    "<span class='ed11y-small'>&quot;To learn more about writing effective links, " +
    "<a href='https://accessibility.princeton.edu/how/content/links'>read more</a>.&quot;</span><br>" +
    "<span class='ed11y-small'>&quot;Learn more about <a href='https://accessibility.princeton.edu/how/content/links'>writing effective links</a>.&quot;</span></p>"

// Messages for images
ed11yGeneralAltText = "<div class='ed11y-tip-heading'>Error: Alt text attribute is missing</div>" +
    "<p>All visual elements must provide a text alternative for assistive devices.</p>" +
    "<p>If a blank alt was provided (alt=&quot;&quot;), screen readers would ignore the image. " +
    "But in this case the alt attribute is <span class='ed11y-bold'>missing</span>, so screen readers will dictate the url of the image file, one letter at a time.</p>" +
    "<p>To fix: edit this image and place <a href='https://accessibility.princeton.edu/how/content/alternative-text'>a concise description of its meaning in context</a> " +
    "in its alternative text field.</p>"

ed11yMessageAltUrl = function (altText) {
  return "<div class='ed11y-tip-heading'>Error: alternative text may be a filename</div>" +
      "<p>In the context of a link, an image's alt text should create a " +
      "<a href='https://accessibility.princeton.edu/how/content/links'>clear and meaningful link title</a>.</p>" +
      "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>";
}

ed11yMessageAltDecorative = "<div class='ed11y-tip-heading'>Manual check: image marked as decorative</div><p>All meaningful visual elements must <a href='https://accessibility.princeton.edu/how/content/alternative-text'>provide a text alternative</a>. Images with empty alt attributes are ignored by screen readers; if this image conveys a message to sighted users beyond use as a spacer or background, please add alt text.</p>"

ed11yMessageAltImageOfLinked = function (error, altText) {
  return "<div class='ed11y-tip-heading'>Warning: <span class='ed11y-bold'>&quot" + error[1] + "&quot;</span> found in linked image</div> " +
      "<p>As this image is acting as a link, its alt text should create a <a href='https://accessibility.princeton.edu/how/content/links'>clear and meaningful link title</a> " +
      "rather than describing the image.</p>" +
      "<p class='ed11y-small'>The alt text for this image is: <br><span class='ed11y-bold'>" + altText + "</span></p>";
}
ed11yMessageAltImageOf = function (error, altText) {
  return "<div class='ed11y-tip-heading'>Alt text needs manual review</div><p>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>" +
      "<p>Assistive devices announce that they are describing an image when reading alt text, so  <span class='ed11y-bold'>&quot;" + error[1] + "&quot;</span> may be redundant.</p> " +
      "<p class='ed11y-small'>Reference: <a href='https://accessibility.princeton.edu/how/content/alternative-text'>Alt text should describe an image in context</a>.</p>";
}


ed11yMessageAltLongLinked = function (text, altText) {
  return "<div class='ed11y-tip-heading'>Linked image's alt text is <span class='ed11y-bold'>" + text.length + " characters</span>.</div> " +
      "<p>The alt text on hyperlinked images should provide a <a href='https://accessibility.princeton.edu/how/content/links'>&quot;concise, clear and meaningful link title&quot;</a>, " +
      "rather than a description of the image.</p>" +
      "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span>.</p>";
}

ed11yMessageAltLinkComplex = function (altText) {
  return "<div class='ed11y-tip-heading'>Please review (may be OK)</div> " +
      "<p>This link contains <span class='ed11y-bold'>both</span> text and an image, which will be combined by screen readers to create a single link title. " +
      "Please make sure the two together still create a " +
      "<a href='https://accessibility.princeton.edu/how/content/links'>&quot;concise, clear and meaningful link title&quot;</a>.</p>" +
      "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>";
}
ed11yMessageAltFilename = function (altText) {
  return "<div class='ed11y-tip-heading'>Error: alt appears to contain a filename</div> " +
      "<p>All visual elements must <a href='https://accessibility.princeton.edu/how/content/alternative-text'>provide a text alternative</a> " +
      "that describes the meaning of the image in context.</p>" +
      "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span></p>";
}

ed11yMessageAltTooLong = function (text, altText) {
  return "<div class='ed11y-tip-heading'>Image's alt text is <span class='ed11y-bold'>" + text.length + " characters</span>.</div> " +
      "<p>Alt text should provide a <a href='https://accessibility.princeton.edu/how/content/alternative-text'>concise description of the meaning of the image in context</a>." +
      "<p>If more than 160 characters are needed to describe an image (e.g., for a graph), the long description should be moved into the page's content or onto a separate page.</p>" +
      "<p class='ed11y-small'>The alt text for this image is: <span class='ed11y-bold'>&quot;" + altText + "&quot;</span>.</p>";
}

ed11yMessageAltDeadspace = "<div class='ed11y-tip-heading'>Error: invalid alt text</div> " +
    "<p>Please add alt text to this image to create a " +
    "<a href='https://accessibility.princeton.edu/how/content/alternative-text'>concise description of the meaning of the image in context</a>, set the alt to nothing at all to mark the image as decorative.</p>";

// QA messages
ed11yMessageQANewTab = "<div class='ed11y-tip-heading'>Link opens in a " +
    "new window</div>" +
    "<p>Opening new tabs or windows without warning can be disorienting, " +
    "especially for users relying on assistive devices.</p> " +
    "<p>Unless certain " +
    "<a href='https://www.w3.org/TR/WCAG20-TECHS/G200.html#G200-description'>" +
    "exceptions related to context-sensitive workflows</a> apply, " +
    "it is better to let the user decide when to open new windows.</p>"

ed11yMessageQAUppercase = "<div class='ed11y-tip-heading'>" +
    "Manual check needed: all-cap text</div>" +
    "<p>Some users find all-cap content somewhat difficult to " +
    "read, some screen readers interpret all-cap words as " +
    "acronyms (and read them one letter at a time!), and many " +
    "users INTERPRET CAPS LOCK AS SHOUTING.</p>" +
    "<p>Unless the all-cap text in this element is an acronym or should be capitalized " +
    "for some similar reason, sentence case is recommended.</p>"

ed11yMessageMissingQATableHeadings = "<div class='ed11y-tip-heading'>Error: " +
    "table has no headers</div> " +
    "<p>Screen reader users rely on " +
    "<a href='https://accessibility.princeton.edu/how/content/tables'>table " +
    "headers</a> to label cells, so they can explore the table without " +
    "having to count rows and columns.</p> " +
    "<p>Note that tables should be used for tabular data only, as they cannot " +
    "reflow for small screens. If this " +
    "<a href='https://accessibility.princeton.edu/how/content/layout-tables'>" +
    "table is only for visual layout</a>, use CSS to create columns instead.</p>"

ed11yMessageQAHeaderInTable = "<div class='ed11y-tip-heading'>Error: heading " +
    "formatting inside table cells</div> " +
    "<p>Label table rows and columns using table headers. Formatting text as " +
    "semantic headings (Heading 2, Heading 3) creates a page outline for " +
    "assistive devices, and users of those devices are not expecting to land " +
    "inside a table when jumping to a heading. </p>"

ed11yMessageEmptyTableHeader = "<div class='ed11y-tip-heading'>Error: Empty " +
    "table header</div>" +
    "<p>Screen reader users rely on " +
    "<a href='https://accessibility.princeton.edu/how/content/tables'>table " +
    "headers</a> to label cells, so they can explore the table without " +
    "having to count rows and columns.</p>";

// Fullcheck tests.
ed11yMessageLinkDownload = "<div class='ed11y-tip-heading'>Manual check needed: " +
    "link to document</div>" +
    "<p>Please make sure this document contains structural tags and image alt " +
    "text, or a copy of its content is provided as a Web page. See tips " +
    "for <a href='https://webaim.org/techniques/acrobat/'>tagging PDFs</a>, " +
    "<a href='https://webaim.org/techniques/word/'>text documents</a> and " +
    "<a href='https://webaim.org/techniques/powerpoint/'>slideshows</a>.</p>" +
    "<p>Untagged documents often cannot be read by screen readers, and even " +
    "tagged PDFs and slides may be difficult to read on small screens.</p>";

ed11yMessageFullCheckBlockquote = "<div class='ed11y-tip-heading'>Manual check needed: short &lt;blockquote&gt;</div> " +
    "<p>Blockquote formatting is announced as a quote by assistive " +
    "devices, and should only be used for quotes.</p>" +
    "<p>This was flagged because short blockquotes are often mislabeled " +
    "headings. If that is the case here, please use " +
    "<a href='https://accessibility.princeton.edu/how/content/headings'>heading formatting</a> instead.</p>"

ed11yMessageFullCheckCaptions = "<div class='ed11y-tip-heading'>Manual check: text alternatives</div><p>Please check to make sure " +
    "<span class='ed11y-bold'>all videos provide closed captioning.</span> " +
    "Providing captions for all audio and video content is a mandatory Level A " +
    "requirement. Captions are meant to support people who are D/deaf or " +
    "hard-of-hearing.</p>"

ed11yMessageHeadingTooLong = function (headingLength) {
  return "<div class='ed11y-tip-heading'>Long " +
      "<span class='ed11y-bold'>(" + headingLength +
      " character)</span> heading</div><p>Since " +
      "<a href='https://accessibility.princeton.edu/how/content/headings'>" +
      "headings are used as a page outline</a>, they should be brief, clear, " +
      "informative and unique.</p>";
}
// Messages for outline Headers.
ed11yMessageHeadingLevelSkipped = function (prevLevel, level) {
  return "<div class='ed11y-tip-heading'>" +
      "Heading jumped from level " + prevLevel + " to " + level + "</div>" +
      "<p><a href='https://accessibility.princeton.edu/how/content/headings'>" +
      "Headings should form a page outline</a> for screen readers.</p> " +
      "<p>To fix: If this is related to the previous heading, make it " +
      "a <span class='ed11y-bold'>Heading " + parseInt(prevLevel + 1) +
      "</span>. If it starts a new section, make it <span class='ed11y-bold'>" +
      "Heading " + prevLevel + "</span>.</p>";
}
// QA Tests.
ed11yMessageQAShouldBeList = function (prefix) {
  return "<div class='ed11y-tip-heading'>Possible list item prefix: &quot;" +
      "<span class='ed11y-bold'>" + prefix +
      "</span>&quot;</div>" +
      "<p>List formatting is more than symbols: it tells browsers how to " +
      "group content that breaks over multiple lines, and lets assistive " +
      "devices jump from item to item. If this paragraph starts a list, " +
      "please format it as a 'real' list rather than " +
      "spelling out letters, numbers or symbols.</p>";
}

ed11yMessageQAMayBeHeader = "<div class='ed11y-tip-heading'>Manual check needed: Possible heading</div><p>This whole paragraph is bold. If this is for emphasis, this is fine. If it is acting as a heading or subheading, however, please format it as such so that it can become part of the page outline.</p>";

ed11yMessagePodcast = "<div class='ed11y-tip-heading'>Manual check needed: embedded audio</div><p>Check to make sure a transcript is included or linked for all audio content and/or podcasts. Providing a text alternative for audio is mandatory in the United States, Canada and the European Union.</p>";
ed11yMessageTwitter = "<div class='ed11y-tip-heading'>Manual check needed: embedded social media</div><p>Check to make sure keyboards can get past this component (if more than a few posts are embedded, this may be a keyboard trap.)</p>";
ed11yMessageVisualization = "<div class='ed11y-tip-heading'>Warning: Data visualization</div><p>Widgets like this are often impossible for keyboard or screen readers to navigate, and can present significant difficulties for users with low vision or colorblindness. Unless this particular widget has been tested and shown to be resizable, keyboard navigable and screen reader compatible, you should assume that you also need to provide the information in an alternative (text or table) format.</p>";
ed11yMessageEmbeddedContent = "<div class='ed11y-tip-heading'>Manual check needed</div><p>This tool cannot check this embedded content. Please make sure embedded images have alt text, videos have captions, and interactive components can be <a href='https://webaim.org/techniques/keyboard/'>operated by a keyboard</a>.</p>";