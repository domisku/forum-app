import capitalizeFirstLetter from "../../../utils/string/capitalizeFirst.js";
import createError from "./createError.js";

export default function apppendError(type) {
  const typeCapitalized = capitalizeFirstLetter(type);

  const input = document.querySelector(`#input${typeCapitalized}`);
  input.classList.add("question-form__input--invalid");

  const error = createError(`Please enter a valid ${type}`);
  error.setAttribute("for", `input${typeCapitalized}`);
  error.classList.add("question-form__error-label");

  const element = document.querySelector(`#form${typeCapitalized}Wrapper`);
  element.after(error);
}
