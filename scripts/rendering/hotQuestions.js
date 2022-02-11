import fetchFromDB from "../fetchers/fetchFromDB.js";

export default async function renderHotQuestions(users) {
  const questions = await fetchFromDB(
    "questions",
    "_sort=views&_order=desc&_limit=5"
  );

  const hotQuestionList = document.querySelector(".sidebar-right__hot-list");
  const hotQuestionTemplate = document.querySelector(
    ".sidebar-right__hot-item-template"
  );

  let i = 0;
  for (let question of questions) {
    if (i === 5) break;

    const author = users.find((user) => user.userId === question.userId);

    const clone = hotQuestionTemplate.content.cloneNode(true);
    const userImg = clone.querySelector(".sidebar-right__hot-img");
    const questionText = clone.querySelector(".sidebar-right__hot-question");

    userImg.src = author.profileImgUrl;
    questionText.textContent = question.title;

    hotQuestionList.appendChild(clone);

    i++;
  }
}
