export default function createMainContentContainer() {
  const mainContent = document.querySelector(".main");

  const mainContentContainer = document.createElement("div");
  mainContentContainer.classList.add("main-content");

  mainContent.appendChild(mainContentContainer);
}
