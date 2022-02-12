import removeHeader from "./removeHeader.js";

export default function renderHeader(title) {
  removeHeader();

  const mainContent = document.querySelector(".main");

  const header = document.createElement("header");
  const headerSection = document.createElement("section");
  const headerTitle = document.createElement("h2");

  header.classList.add("main-header");
  headerSection.classList.add("main-header__top");
  headerTitle.classList.add("main-header__title");

  headerTitle.textContent = title;
  header.style.height = "6.5rem";
  headerSection.style.height = "100%";

  headerSection.appendChild(headerTitle);
  header.appendChild(headerSection);

  mainContent.prepend(header);
}
