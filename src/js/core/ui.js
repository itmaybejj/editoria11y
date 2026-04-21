import version from '../version.js';

export const UI = {
  editableHighlight: {},
  // Mark adoption registry. Populated by drawResult, consulted by the
  // patched pushResult, swept for orphans after each run. Lets us reuse
  // an existing button/tip/highlight across rechecks when the same
  // (element, test) pair produces a result in the new run.
  // See docs/race-condition-plan.md.
  marks: new WeakMap(), // Element -> Map<test, MarkEntry>
  markRegistry: new Set(), // iterable view of live MarkEntry
  imageAlts: [],
  attachCSS: () => {},
  panel: false,
  message: {},
  panelElement: {},
  panelInitial: 1,
  panelNoCover: [],
  panelToggle: {},
  panelToggleTitle: {},
  panelCount: {},
  panelJumpNext: {},
  panelShowDismissed: {},
  theme: {},

  version: version,
  english: true,
  running: false,
  runGen: 0,
  watching: [],
  seen: [],
  ignore: '',
  ignoreAll: false,
  totalCount: 1,
  warningCount: 1,
  errorCount: 1,
  dismissedCount: 1,
  dismissedAlerts: {},
  activeRange: false,
  inlineAlerts: false,
  incremental: false,
  interaction: false,
  forceFullCheck: false,
  browserSpeed: 1,
  browserLag: 1,
  customTestsRemaining: 0,
  testsRemaining: 0,
  customTestTimeout: 0,
  loopStop: false,
  oldResults: [],
  results: [],
  dismissKeys: {},
  roots: [],
  headingOutlineOverrides: [],
  altMarks: new Set(),
  elements: {
    // to be replaced by Sa11y find.
    delayedReset: [],
  },
  splitConfiguration: {
    active: false,
    showDev: false,
    contentOptions: {},
    devChecks: [],
    devOptions: {},
    devResults: [],
  },

  /* Panel initial state */
  once: false,
  bodyStyle: false,
  disabled: false,
  onLoad: true,
  showPanel: false,
  showDismissed: false,
  nextText: '',
  panelAttachTo: document.body,
  visualizing: false,

  /* Annotations initial states */
  jumpList: [],
  openJumpPosition: Number - 1,
  viaJump: false,
  toggledFrom: false,
  scrollPending: 0,
  scrollTicking: false,
  tipOpen: false,
  openTip: {
    button: {},
    tip: {},
  },
  positionedFrames: [],
  recentlyAddedNodes: new WeakMap(),
};
