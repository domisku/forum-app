import routes from "./routes.js";

export default function routeExists(route) {
  if (routes[route]) return true;
  else return false;
}
