export default function renderHotQuestions(questions) {
  const questionsCopy = [...questions];

  questionsCopy.sort(
    (question, nextQuestion) => nextQuestion.views - question.views
  );

  const hotQuestionList = document.querySelector(".sidebar-right__hot-list");
  const hotQuestionTemplate = document.querySelector(
    ".sidebar-right__hot-item-template"
  );

  let i = 0;
  for (let question of questionsCopy) {
    if (i === 5) break;

    const clone = hotQuestionTemplate.content.cloneNode(true);
    const userImg = clone.querySelector(".sidebar-right__hot-img");
    const questionText = clone.querySelector(".sidebar-right__hot-question");

    userImg.src = question.imgUrl;
    questionText.textContent = question.question;

    hotQuestionList.appendChild(clone);

    i++;
  }
}
