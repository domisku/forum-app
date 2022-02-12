import newQuestions from "../pages/newQuestions.js";
import allQuestions from "../pages/allQuestions.js";

export default function connectLeftSidebarListeners() {
  const newQuestionsPageLink = document.querySelector("#newQuestionsPage");
  const allQuestionsPageLink = document.querySelector("#allQuestionsPage");

  newQuestionsPageLink.addEventListener("click", newQuestions);
  allQuestionsPageLink.addEventListener("click", allQuestions);
}
