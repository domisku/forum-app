import connectLeftSidebarListeners from "./scripts/listeners/leftSidebarNav.js";
import connectHamburgerListeners from "./scripts/listeners/hamburgerMenu.js";
import connectScrollEventListeners from "./scripts/listeners/scrollButton.js";

import renderDynamicContent from "./scripts/rendering/renderDynamicContent.js";
import connectHeaderListeners from "./scripts/listeners/header.js";

import { goToCurrentRoute } from "./scripts/routing/goToCurrentRoute.js";
import connectRouteChangeListener from "./scripts/routing/routeChange.js";

bootstrapApp();

async function bootstrapApp() {
  connectRouteChangeListener();
  connectHeaderListeners();
  connectLeftSidebarListeners();
  connectScrollEventListeners();
  connectHamburgerListeners();
  await renderDynamicContent();

  goToCurrentRoute();
}
