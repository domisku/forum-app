import validateForm from "./validation/validateForm.js";
import renderDynamicContent from "../renderDynamicContent.js";
import {
  addLoadingSpinner,
  removeLoadingSpinner,
} from "../createLoadingSpinner.js";
import sleep from "../../utils/sleep/sleep.js";
import allQuestions from "../../pages/allQuestions.js";
import showAlert from "../../utils/UI/alert.js";
import deleteData from "../../services/deleteData.js";
import updateData from "../../services/updateData.js";
import transformEditedData from "./transformEditedData.js";
import fillQuestionData from "./fillQuestionData.js";
import { navigateAndReplace } from "../../routing/navigate.js";

export default async function renderEditForm(id, userId) {
  const mainContent = document.querySelector(".main-content");
  const formTemplate = document.querySelector("#askQuestionTemplate");
  const clone = formTemplate.content.cloneNode(true);
  const buttonsWrapper = clone.querySelector(".question-form__buttons-wrapper");

  const labels = clone.querySelectorAll(".question-form__label");
  labels.forEach((label) => {
    label.classList.add("question-form__label--was-focused");
  });

  const dateLabels = clone.querySelectorAll(".question-form__date-label");
  dateLabels.forEach((dateLabel) => {
    dateLabel.classList.add("question-form__label--was-focused");
  });

  const form = clone.querySelector(".question-form");
  form.dataset.id = id;
  form.dataset.userId = userId;
  form.addEventListener("submit", formSubmitHandler);

  const clearButton = clone.querySelector("#resetFormButton");
  clearButton.remove();

  const deleteButton = document.createElement("button");
  deleteButton.className =
    "question-form__button question-form__button--delete";
  deleteButton.textContent = "Delete";
  deleteButton.dataset.id = id;
  deleteButton.addEventListener("click", deleteQuestionHandler);

  buttonsWrapper.appendChild(deleteButton);

  mainContent.appendChild(clone);

  addLoadingSpinner();
  await sleep(800);
  await fillQuestionData(id, clone);
  removeLoadingSpinner();
}

async function deleteQuestionHandler(event) {
  event.preventDefault();
  const id = event.target.dataset.id;

  addLoadingSpinner();
  await deleteData("questions", id);
  await sleep(800);
  await renderDynamicContent();
  removeLoadingSpinner();
  await navigateAndReplace("/");

  showAlert("Your question was deleted!");
}

async function formSubmitHandler(event) {
  event.preventDefault();

  const id = event.target.dataset.id;
  const userId = event.target.dataset.userId;

  const formData = Object.fromEntries(new FormData(event.currentTarget));

  if (!validateForm(formData)) return;

  const [user, question] = transformEditedData(formData);

  addLoadingSpinner();
  await updateData("questions", question, id);
  await updateData("users", user, userId);
  await sleep(800);
  await renderDynamicContent();
  removeLoadingSpinner();
  await navigateAndReplace("/");
  showAlert("Your question was updated successfully!");
}

export function removeFormListeners() {
  const form = document.querySelector(".question-form");
  if (form) {
    form.removeEventListener("submit", formSubmitHandler);
  }

  const deleteButton = document.querySelector(".question-form__button--delete");
  if (deleteButton) {
    deleteButton.removeEventListener("click", deleteQuestionHandler);
  }
}
