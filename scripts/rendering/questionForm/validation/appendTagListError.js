import createError from "./createError.js";

export default function appendTaglistError() {
  const input = document.querySelector(`#inputTags`);
  input.classList.add("question-form__input--invalid");

  const error = createError(
    `Please enter a valid taglist (no special symbols), eg.: black, phone, tiger`
  );
  error.setAttribute("for", `inputTags`);
  error.classList.add("question-form__error-label");

  const element = document.querySelector(`#formTagsWrapper`);
  element.after(error);
}
