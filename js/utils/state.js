/* Track values and DOM references */
export const State = {
  version: '3.0.0',
  running: false,
  watching: [],
  results: [],
  seen: [],
  ignore: '',
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
}

export const Theme = {}

export const UI = {
  editableHighlight: [],
  imageAlts: [],
  attachCSS: ()=>{},
  panel: false,
  message: {},
  panelElement: {},
  panelPin: [],
  panelToggle: {},
  panelToggleTitle: {},
  panelCount: {},
  panelJumpNext: {},
  showDismissed: {},
}

export const M = {}
