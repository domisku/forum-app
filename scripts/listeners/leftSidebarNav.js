import navigate from "../routing/navigate.js";

export default function connectLeftSidebarListeners() {
  const newQuestionsPageLink = document.querySelector("#newQuestionsPage");
  const allQuestionsPageLink = document.querySelector("#allQuestionsPage");
  const askQuestionPageLink = document.querySelector("#askQuestionPage");

  newQuestionsPageLink.addEventListener("click", () => navigate("/new"));
  allQuestionsPageLink.addEventListener("click", () => navigate("/"));
  askQuestionPageLink.addEventListener("click", () => navigate("/ask"));
}
