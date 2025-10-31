import {M, State, UI} from "./state.js";
import {dismissOne, reset} from "../render/interface.js";
import {prepareDismissal} from "sa11y/src/js/utils/utils.js";
import {resetClass} from "./utils.js";
import {checkAll} from "./check.js";

export function dismissThis (dismissalType, all = false) {
  // Find the active tip and draw its identifying information from the result list
  let removal = State.openTip;
  let id = removal.tip.dataset.ed11yResult;
  let test = State.results[id].test;

  if (all) {
    State.results.forEach((result) => {
      if (result.test === test && result.dismissalStatus !==dismissalType) {
        dismissOne(dismissalType, test, result.dismissalKey);
      }
    });
  } else {
    let dismissalKey = prepareDismissal(State.results[id].dismissalKey);
    dismissOne(dismissalType, test, dismissalKey);
  }

  // Remove tip and reset borders around element
  resetClass(['ed11y-hidden-highlight', 'ed11y-ring-red', 'ed11y-ring-yellow']);
  removal.tip?.parentNode?.removeChild(removal.tip);
  // TODO EDITING: COMMENT OUT BELOW...SEEMS REDUNDANT?
  //removal.button?.parentNode?.removeChild(removal.button);

  reset();
  State.showPanel = true;
  checkAll();

  let rememberGoto = State.lastOpenTip;

  window.setTimeout(function () {
    if (State.jumpList.length > 0) {
      State.lastOpenTip = (rememberGoto - 1);
      UI.panelJumpNext?.focus();
    } else {
      window.setTimeout(function () {
        UI.panelToggle?.focus();
      }, 100);
    }
  }, 500, rememberGoto);

};

export function toggleShowDismissals () {
  // todo postpone: if user has allowHide but not allowOK or vice versa, this temporarily clears both.
  State.ignoreAll = false;
  State.options.showDismissed = !(State.options.showDismissed);
  reset();
  State.showPanel = true;
  checkAll();

  UI.showDismissed.setAttribute('data-ed11y-pressed', (!!State.options.showDismissed).toString());
  window.setTimeout(function() {
    UI.showDismissed.focus();
  }, 0);
};

export function togglePanel () {
  State.ignoreAll = false;

  if (!State.doubleClickPrevent) {
    // Prevent clicks piling up while scan is running.
    if (State.running !== true) {
      State.running = true;
      // Re-scan each time the panel reopens.
      if (UI.panel.classList.contains('ed11y-shut') === true) {
        State.onLoad = false;
        State.incremental = false;
        State.showPanel = true;
        if (State.dismissedCount > 0 && State.warningCount === 0 && State.errorCount === 0) {
          State.options.showDismissed = false;
          toggleShowDismissals();
        } else {
          checkAll();
        }
        State.options.userPrefersShut = false;
        localStorage.setItem('editoria11yShow', '1');
      }
      else {
        UI.panelToggleTitle.textContent = State.totalCount > 0 ? M.buttonShowAlerts : M.buttonShowNoAlert;
        State.options.showDismissed = false;
        reset();
        State.options.userPrefersShut = true;
        localStorage.setItem('editoria11yShow', '0');
      }
    }
  }
  State.doubleClickPrevent = true;
  window.setTimeout(function () {
    State.doubleClickPrevent = false;
  }, 200);
  return false;
}
