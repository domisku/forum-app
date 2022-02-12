import createMainContentContainer from "./createMainContentContainer.js";

export default function removeOldPage() {
  const mainContent = document.querySelector(".main");
  mainContent.innerHTML = "";

  createMainContentContainer();
}
