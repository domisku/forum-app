import fetchFromDB from "../services/fetchFromDB.js";
import renderQuestion from "./question.js";

export default async function renderQuestions(questions) {
  if (!questions) return;

  const users = await fetchFromDB("users");

  clearMainContent();

  for (let entry of questions) {
    const author = users.find((user) => user.id === entry.userId);

    renderQuestion(entry, author);
  }
}

function clearMainContent() {
  const mainContent = document.querySelector(".main-content");
  if (mainContent.childElementCount) mainContent.innerHTML = "";
}
