import {store as Store} from "../sa11y/src/js/utils/utils.js";

const State = {
  /* Application initial state */
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
  currentPage: window.location.pathname,

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

let localResultCount = Store.getItem('editoria11yResultCount');
console.log(localResultCount);
State.seen = localResultCount !== 'undefined' ? JSON.parse(localResultCount) : {};

// Build list of dismissed alerts
if (State.options.syncedDismissals === false) {
  State.dismissedAlerts = Store.getItem('ed11ydismissed');
  State.dismissedAlerts = State.dismissedAlerts ? JSON.parse(State.dismissedAlerts) : {};
} else {
  State.dismissedAlerts = {};
  State.dismissedAlerts[State.currentPage] = State.options.syncedDismissals;
}

export default State;
