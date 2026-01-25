export const englishOverrides = {
  panelCheckOutline:
    '<p class="ed11y-small">This shows the <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">heading outline</a>. Check that it matches how the content is organized visually.</p>', // Shown for EN only.
  panelCheckAltText:
    '<p class="ed11y-small">Check that each image <a href="https://www.w3.org/WAI/tutorials/images/informative/">describes what it means in context</a>, and that there are no images of text.</p>', // Shown for EN only.
  DECORATIVE: 'Marked decorative',
  // @todo: Outline error explanations currently hidden.
  errorOutlinePrefixSkippedLevel: '(flagged for skipped level',
  errorOutlinePrefixHeadingEmpty: '(empty heading)',
  errorOutlinePrefixHeadingIsLong: '(flagged for length)',

  SUS_ALT_STOPWORDS: [
    'image',
    'graphic',
    'picture',
    'photo',
    'thumbnail',
    'icon',
    'placeholder',
    'spacer',
    'tbd',
    'todo',
    'copyright',
    'courtesy of',
  ], // todo Ed11y test use to catch these at the end as well as the beginning.

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

  NEW_WINDOW_PHRASES: [
    'external',
    'download',
    'new tab',
    'new window',
    'pop-up',
    'pop up',
    'opens new tab',
    'opens new window',
  ],
};
