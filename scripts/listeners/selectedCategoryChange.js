import renderQuestions from "../rendering/questions.js";

export default function listenForSelectedCategoryChange(questions) {
  const select = document.querySelector("#category-filter");

  select.addEventListener("change", () => {
    renderQuestions(questions);
  });
}
