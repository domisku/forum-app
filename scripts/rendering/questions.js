import fetchFromDB from "../fetchers/fetchFromDB.js";
import renderQuestion from "./question.js";

export default async function renderQuestions(questions) {
  if (!questions) return;

  const users = await fetchFromDB("users");

  for (let entry of questions) {
    const author = users.find((user) => user.userId === entry.userId);

    renderQuestion(entry, author);
  }
}
