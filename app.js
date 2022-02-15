import connectLeftSidebarListeners from "./scripts/listeners/leftSidebarNav.js";
import connectHamburgerListeners from "./scripts/listeners/hamburgerMenu.js";
import connectScrollEventListeners from "./scripts/listeners/scrollButton.js";

import renderDynamicContent from "./scripts/rendering/renderDynamicContent.js";
import askQuestion from "./scripts/pages/askQuestion.js";

bootstrapApp();

async function bootstrapApp() {
  connectLeftSidebarListeners();
  connectScrollEventListeners();
  connectHamburgerListeners();
  await renderDynamicContent();

  // allQuestions();
  askQuestion();
}
