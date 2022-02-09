export default function renderQuestionsCount(questions) {
  const questionElement = document.querySelector(
    ".sidebar-right__questions .sidebar-right__total"
  );
  questionElement.textContent = questions.length;
}
