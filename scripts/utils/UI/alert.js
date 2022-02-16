export default function showAlert(message) {
  const alertRoot = document.querySelector(".alert-root");
  alertRoot.classList.add("alert-root--show");
  alertRoot.textContent = message;
  alertRoot.addEventListener("click", hideAlert);

  setTimeout(() => hideAlert(), 4000);

  function hideAlert() {
    alertRoot.classList.remove("alert-root--show");
    alertRoot.classList.add("alert-root--hide");
    setTimeout(() => alertRoot.classList.remove("alert-root--hide"), 700);
  }
}
