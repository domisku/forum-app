export default function renderQuestionsCount(allQuestions) {
  const questionElement = document.querySelector(
    ".sidebar-right__questions .sidebar-right__total"
  );
  questionElement.textContent = allQuestions.length;
}
