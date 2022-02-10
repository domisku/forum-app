import renderQuestions from "../rendering/questions.js";
import capitalizeFirstLetter from "../utils/string/capitalizeFirst.js";

export default function listenForSelectedCategoryChange(questions) {
  const select = document.querySelector("#category-filter");
  const heading = document.querySelector(".main-header__title");

  select.addEventListener("change", () => {
    renderQuestions(questions);

    let selectedOption = select.options[select.selectedIndex].value;

    if (selectedOption === "all") selectedOption = "All Questions";

    heading.textContent = capitalizeFirstLetter(selectedOption);
  });
}
