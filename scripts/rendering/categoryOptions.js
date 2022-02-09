import capitalizeFirstLetter from "../utils/string/capitalizeFirst.js";

export default function renderCategoryOptions(questions) {
  const select = document.querySelector("#category-filter");

  const categoryMap = {};

  questions.forEach((question) => {
    if (!categoryMap[question.category]) categoryMap[question.category] = 1;
  });

  const categories = Object.keys(categoryMap);

  for (let category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = capitalizeFirstLetter(category);
    select.appendChild(option);
  }
}
