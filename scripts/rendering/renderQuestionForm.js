import postData from "../services/postData.js";

export default function renderQuestionForm() {
  const mainContent = document.querySelector(".main-content");
  const formTemplate = document.querySelector("#askQuestionTemplate");
  const clone = formTemplate.content.cloneNode(true);

  const inputs = clone.querySelectorAll(".question-form__input");
  inputs.forEach((input) => {
    input.addEventListener("focus", (event) => {
      const label = event.target.nextSibling.nextSibling;
      if (label.classList.contains("question-form__label--was-focused")) return;
      label.classList.add("question-form__label--was-focused");
    });
  });

  const form = clone.querySelector(".question-form");
  form.addEventListener("submit", formSubmitHandler);

  const clearButton = clone.querySelector("#resetFormButton");
  clearButton.addEventListener("click", clearFormDataHandler);

  function clearFormDataHandler(event) {
    event.preventDefault();
    event.target.closest(".question-form").reset();
  }

  function formSubmitHandler(event) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));
    console.log(formData);
    const [user, question] = transformData(formData);

    postData("questions", question);
    postData("users", user);
  }

  mainContent.appendChild(clone);
}

function transformData(data) {
  const userId = Math.random();

  const user = {
    id: userId,
    username: data.name,
    status: "train",
    profileImgUrl: "https://picsum.photos/200",
  };

  const question = {
    id: Math.random(),
    userId,
    category: data.category,
    title: data.title,
    description: data.description,
    tags: convertTags(data.tags),
    views: 0,
    answers: 0,
    votes: 0,
    dateCreated: convertToJavascriptTime(data.year, data.month, data.day),
  };

  return [user, question];
}

function convertTags(tags) {
  return tags.split("-").map((tag) => tag.trim());
}
