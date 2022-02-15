import addErrorClass from "./addErrorClass.js";
import createError from "./createError.js";

export default function appendDateError(
  yearError = false,
  monthError = false,
  dayError = false
) {
  let message, badInputs;
  const yearInput = document.querySelector("#inputYear");
  const monthInput = document.querySelector("#inputMonth");
  const dayInput = document.querySelector("#inputDay");

  if (yearError && monthError && dayError) {
    message = "Please enter valid year (yyyy), month (mm) and day (dd)";
    badInputs = [yearInput, monthInput, dayInput];
  } else if (yearError && monthError) {
    message = "Please enter valid year (yyyy) and month (mm)";
    badInputs = [yearInput, monthInput];
  } else if (monthError && dayError) {
    message = "Please enter valid month (mm) and day (dd)";
    badInputs = [monthInput, dayInput];
  } else if (yearError && dayError) {
    message = "Please enter valid year (yyyy) and day (dd)";
    badInputs = [yearInput, dayInput];
  } else if (yearError) {
    message = "Please enter a valid year (yyyy)";
    badInputs = [yearInput];
  } else if (monthError) {
    message = "Please enter a valid month (mm)";
    badInputs = [monthInput];
  } else if (dayError) {
    message = "Please enter a valid day (dd)";
    badInputs = [dayInput];
  }

  addErrorClass(badInputs);

  const element = document.querySelector("#formDateWrapper");
  const error = createError(message);
  error.classList.add("question-form__error-label");
  element.after(error);
}
