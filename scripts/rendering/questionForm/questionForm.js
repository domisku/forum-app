import clearErrors from "./validation/clearErrors.js";
import postData from "../../services/postData.js";
import transformData from "./transformData.js";
import validateForm from "./validation/validateForm.js";
import renderDynamicContent from "../renderDynamicContent.js";
import {
  addLoadingSpinner,
  removeLoadingSpinner,
} from "../createLoadingSpinner.js";
import sleep from "../../utils/sleep/sleep.js";
import allQuestions from "../../pages/allQuestions.js";

export default function renderQuestionForm() {
  const mainContent = document.querySelector(".main-content");
  const formTemplate = document.querySelector("#askQuestionTemplate");
  const clone = formTemplate.content.cloneNode(true);

  const inputs = clone.querySelectorAll(".question-form__input");
  inputs.forEach((input) => {
    input.addEventListener("focus", focusInputHandler);
  });

  const form = clone.querySelector(".question-form");
  form.addEventListener("submit", formSubmitHandler);

  const clearButton = clone.querySelector("#resetFormButton");
  clearButton.addEventListener("click", clearFormDataHandler);

  mainContent.appendChild(clone);
}

function focusInputHandler(event) {
  const label = event.target.nextSibling.nextSibling;
  if (label.classList.contains("question-form__label--was-focused")) return;
  label.classList.add("question-form__label--was-focused");
}

function clearFormDataHandler(event) {
  event.preventDefault();
  clearErrors();
  event.target.closest(".question-form").reset();
}

async function formSubmitHandler(event) {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(event.currentTarget));

  if (!validateForm(formData)) return;

  const [user, question] = transformData(formData);

  addLoadingSpinner();

  await postData("questions", question);
  await postData("users", user);

  await sleep(800);

  await renderDynamicContent();

  removeLoadingSpinner();
  allQuestions();
}

export function removeFormListeners() {
  const inputs = clone.querySelectorAll(".question-form__input");
  inputs.forEach((input) => {
    input.removeEventListener("focus", focusInputHandler);
  });

  const form = clone.querySelector(".question-form");
  form.removeEventListener("submit", formSubmitHandler);

  const clearButton = clone.querySelector("#resetFormButton");
  clearButton.removeEventListener("click", clearFormDataHandler);
}
