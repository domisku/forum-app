import sleep from "../sleep/sleep.js";

let timeout, hideTimeout, timerOn, hideTimerOn;

export default async function showAlert(message) {
  const alertRoot = document.querySelector(".alert-root");

  await rushPreviousAlert();
  async function rushPreviousAlert() {
    if (timerOn) {
      clearTimeout(timeout);
      playRemoveAnimation();
      await sleep(700);
      removeAlert();
      timerOn = false;
    }

    if (hideTimerOn) {
      clearTimeout(hideTimeout);
      await sleep(700);
      removeAlert();
      hideTimerOn = false;
    }
  }

  alertRoot.classList.add("alert-root--show");
  alertRoot.textContent = message;
  alertRoot.addEventListener("click", hideAlert);

  timerOn = true;
  timeout = setTimeout(() => {
    hideAlert();
    timerOn = false;
  }, 4000);

  function hideAlert() {
    playRemoveAnimation();

    hideTimerOn = true;
    hideTimeout = setTimeout(() => {
      removeAlert();
      hideTimerOn = false;
    }, 700);
  }

  function playRemoveAnimation() {
    alertRoot.classList.remove("alert-root--show");
    alertRoot.classList.add("alert-root--hide");
  }

  function removeAlert() {
    alertRoot.classList.remove("alert-root--hide");
    alertRoot.textContent = "";
  }
}
