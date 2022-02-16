let timeout, hideTimeout;

export default function showAlert(message) {
  const alertRoot = document.querySelector(".alert-root");

  (function rushPreviousAlert() {
    if (timeout) {
      clearTimeout(timeout);
      hideAlert();
    } else if (hideTimeout) {
      clearTimeout(hideTimeout);
      alertRoot.classList.remove("alert-root--hide");
    }
  })();

  alertRoot.classList.add("alert-root--show");
  alertRoot.textContent = message;
  alertRoot.addEventListener("click", hideAlert);

  timeout = setTimeout(() => hideAlert(), 4000);

  function hideAlert() {
    alertRoot.classList.remove("alert-root--show");
    alertRoot.classList.add("alert-root--hide");
    hideTimeout = setTimeout(
      () => alertRoot.classList.remove("alert-root--hide"),
      700
    );
  }
}
