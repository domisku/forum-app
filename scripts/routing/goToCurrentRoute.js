import routes from "./routes.js";
import navigate, { navigateAndReplace } from "./navigate.js";

export function goToCurrentRoute() {
  const currentRoute = window.location.pathname;

  if (routeExists(currentRoute)) {
    navigate(currentRoute);
  } else navigateAndReplace("/404");
}

function routeExists(route) {
  if (routes[route]) return true;
  else return false;
}
