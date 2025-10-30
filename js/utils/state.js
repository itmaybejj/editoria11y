const State = {
  /* Application initial state */
  running: false,
  watching: [],
  results: [],
  seen: [],
  totalCount: 0,
  warningCount: 0,
  errorCount: 0,
  dismissedCount: 1,
  options: {},

  /* Panel initial state */
  disabled: false,
  onLoad: true,
  open: false,
  showPanel: false,

  /* Annotations initial state */
  jumpList: [],
  lastOpenTip: -1,
  openTip: {
    button: false,
    tip: false,
  },


  /* *********** */
  /* Theme setup */
  /* *********** */
  theme: {
    vars: {}
  },
}

export default State;
