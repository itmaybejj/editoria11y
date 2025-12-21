/* Track values and DOM references */

export const State = {
  version: '3.0.0',
  english: true,
  running: false,
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
  customTestTimeout: 0,
  loopStop: false,
  oldResults: [],
  roots: [],
  headingOutline: [],
  headingOutlineOverrides: [],
  elements: {
    // to be replaced by Sa11y find.
    altMark: [],
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
  disabled: false,
  onLoad: true,
  open: false,
  showPanel: false,
  showDismissed: false,
  nextText: '',
  panelAttachTo: document.body,
  visualizing: false,

  /* Annotations initial states */
  jumpList: [],
  lastOpenTip: Number - 1,
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

export const Theme = {};

export const UI = {
  editableHighlight: [],
  imageAlts: [],
  attachCSS: () => {},
  panel: false,
  message: {},
  panelElement: {},
  panelNoCover: [],
  panelToggle: {},
  panelToggleTitle: {},
  panelCount: {},
  panelJumpNext: {},
  panelShowDismissed: {},
};

export const Results = [];
