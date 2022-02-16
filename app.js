import connectLeftSidebarListeners from "./scripts/listeners/leftSidebarNav.js";
import connectHamburgerListeners from "./scripts/listeners/hamburgerMenu.js";
import connectScrollEventListeners from "./scripts/listeners/scrollButton.js";

import renderDynamicContent from "./scripts/rendering/renderDynamicContent.js";
import allQuestions from "./scripts/pages/allQuestions.js";
import connectHeaderListeners from "./scripts/listeners/header.js";

bootstrapApp();

async function bootstrapApp() {
  connectHeaderListeners();
  connectLeftSidebarListeners();
  connectScrollEventListeners();
  connectHamburgerListeners();
  await renderDynamicContent();

  allQuestions();
}
