import navigate, { navigateAndReplace } from "./navigate.js";
import routeExists from "./routeExists.js";

export function goToCurrentRoute() {
  const currentRoute = window.location.pathname;

  if (routeExists(currentRoute)) {
    navigate(currentRoute);
  } else navigateAndReplace("/404");
}
