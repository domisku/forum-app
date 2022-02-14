import createMainContentContainer from "./createMainContentContainer.js";
import scrollTo from "./scrollTo.js";

export default function removeOldPage() {
  const mainContent = document.querySelector(".main");
  mainContent.innerHTML = "";

  createMainContentContainer();

  scrollTo(0);
}
