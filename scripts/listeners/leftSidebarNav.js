import newQuestions from "../pages/newQuestions.js";
import allQuestions from "../pages/allQuestions.js";
import askQuestion from "../pages/askQuestion.js";

export default function connectLeftSidebarListeners() {
  const newQuestionsPageLink = document.querySelector("#newQuestionsPage");
  const allQuestionsPageLink = document.querySelector("#allQuestionsPage");
  const askQuestionPageLink = document.querySelector("#askQuestionPage");

  newQuestionsPageLink.addEventListener("click", newQuestions);
  allQuestionsPageLink.addEventListener("click", allQuestions);
  askQuestionPageLink.addEventListener("click", askQuestion);
}
