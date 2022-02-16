import routes from "./routes.js";

export default async function navigate(pathname, state = {}) {
  window.history.pushState(state, pathname, window.location.origin + pathname);
  await routes[pathname]();
}

export async function navigateAndReplace(pathname, state = {}) {
  window.history.replaceState(
    state,
    pathname,
    window.location.origin + pathname
  );
  await routes[pathname]();
}
