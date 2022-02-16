import navigate, { navigateAndReplace } from "./navigate.js";
import routes from "./routes.js";

export default function connectRouteChangeListener() {
  window.onpopstate = () => {
    if (window.location.pathname === "/edit") {
      history.back();
      return;
    }
    if (routes[window.location.pathname]) {
      routes[window.location.pathname]();
    } else navigate("/404");
  };
}
