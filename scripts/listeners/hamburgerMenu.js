import navigate from "../routing/navigate.js";

export default function connectHamburgerListeners() {
  const button = document.querySelector(".hamburger__button");
  const menuList = document.querySelector(".hamburger__list");

  button.addEventListener("click", () => {
    toggleMenu();
  });

  menuList.addEventListener("click", () => {
    toggleMenu();
  });

  function toggleMenu() {
    menuList.classList.toggle("hamburger__list--show");
  }

  const newQuestionsPageLink = document.querySelector("#hamburgerNewQuestions");
  const allQuestionsPageLink = document.querySelector("#hamburgerAllQuestions");
  const askQuestionPageLink = document.querySelector("#hamburgerAskQuestion");

  newQuestionsPageLink.addEventListener("click", () => navigate("/new"));
  allQuestionsPageLink.addEventListener("click", () => navigate("/"));
  askQuestionPageLink.addEventListener("click", () => navigate("/ask"));
}
