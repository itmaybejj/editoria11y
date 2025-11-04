/* Track values and DOM references */

export const State = {
  version: '3.0.0',
	english: true,
  running: false,
  watching: [],
  results: [],
  seen: [],
  ignore: '',
  ignoreAll: false,
  totalCount: Number,
  warningCount: Number,
  errorCount: Number,
  dismissedCount: Number,
  dismissedAlerts: {},
  activeRange: false,
  incremental: false,
  interaction: false,
  forceFullCheck: false,
  browserSpeed: Number,
  browserLag: Number,
	customTestsRemaining: Number,
	testsRemaining: Number,
  loopStop: false,
  currentPage: window.location.pathname,
  roots: [],
  oldResults: [],
  headingOutline: [],
  elements: { // to be replaced by Sa11y find.
    altMark: [],
    delayedReset: []
  },

  /* Panel initial state */
  once: false,
  disabled: false,
  onLoad: true,
  open: false,
  showPanel: false,
  nextText: '',
  panelAttachTo: document.body,
	visualizing: false,

  /* Annotations initial states */
  jumpList: [],
  lastOpenTip: Number -1,
  viaJump: false,
  toggledFrom: false,
  scrollPending: Number,
  scrollTicking: false,
  openTip: {
    button: false,
    tip: false,
  },
  positionedFrames: [],
  editableHighlight: [],
  recentlyAddedNodes: [],
}

export const Theme = {}

export const UI = {
  editableHighlight: [],
  imageAlts: [],
  attachCSS: ()=>{},
  panel: false,
  message: {},
  panelElement: {},
  panelNoCover: [],
  panelToggle: {},
  panelToggleTitle: {},
  panelCount: {},
  panelJumpNext: {},
  showDismissed: {},
}

export const M = {}
