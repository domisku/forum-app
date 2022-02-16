import navigate from "../routing/navigate.js";

export default function connectHeaderListeners() {
  const homeLink = document.querySelector(".header__title");
  const headerHome = document.querySelector("#headerHome");
  const hamburgerHome = document.querySelector("#hamburgerHome");

  homeLink.addEventListener("click", goHome);
  headerHome.addEventListener("click", goHome);
  hamburgerHome.addEventListener("click", goHome);
}

function goHome() {
  navigate("/");
}
