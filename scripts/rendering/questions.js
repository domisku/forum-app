import fetchFromDB from "../fetchers/fetchFromDB.js";
import renderQuestion from "./question.js";

export default async function renderQuestions(questions) {
  if (!questions) return;

  const users = await fetchFromDB("users");

  const mainContent = document.querySelector(".main");
  const articles = mainContent.querySelectorAll(".question");
  articles.forEach((article) => article.remove());

  for (let entry of questions) {
    const author = users.find((user) => user.userId === entry.userId);

    renderQuestion(entry, author);
  }
}
