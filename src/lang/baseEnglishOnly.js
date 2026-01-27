export const englishOverrides = {

  // @todo: Outline error explanations currently hidden.
  /*errorOutlinePrefixSkippedLevel: '(flagged for skipped level)',
  errorOutlinePrefixHeadingEmpty: '(empty heading)',
  errorOutlinePrefixHeadingIsLong: '(flagged for length)',*/

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
