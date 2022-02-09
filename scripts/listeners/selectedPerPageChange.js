import renderQuestions from "../rendering/questions.js";

export default function listenForSelectedPerPageChange(questions) {
  const select = document.querySelector("#count-filter__select");

  select.addEventListener("change", () => {
    renderQuestions(questions);
  });
}
