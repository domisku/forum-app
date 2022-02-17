import {
  EDIT_QUESTION,
  PAGE_NOT_FOUND,
} from "../pages/pageNameStrings/pageNameStrings.js";
import currentPage from "../store/currentPage.js";
import { navigateAndReplace } from "./navigate.js";
import routeExists from "./routeExists.js";
import routes from "./routes.js";

import currentPageProtected from "./currentPageProtected.js";

export default function connectRouteChangeListener() {
  window.onpopstate = () => {
    let currentRoute = window.location.pathname;

    if (routeExists(currentRoute)) {
      if (currentPageProtected()) {
        navigateAndReplace(currentRoute);
        return;
      }
      routes[currentRoute]();
    } else routes["/404"]();
  };
}
