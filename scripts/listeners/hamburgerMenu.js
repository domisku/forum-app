import newQuestions from "../pages/newQuestions.js";
import allQuestions from "../pages/allQuestions.js";
import askQuestion from "../pages/askQuestion.js";

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

  newQuestionsPageLink.addEventListener("click", newQuestions);
  allQuestionsPageLink.addEventListener("click", allQuestions);
  askQuestionPageLink.addEventListener("click", askQuestion);
}
