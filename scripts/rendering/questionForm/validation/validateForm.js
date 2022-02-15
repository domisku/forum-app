import entryIsDate from "../../../utils/date/entryIsDate.js";
import appendDateError from "./appendDateError.js";
import appendTaglistError from "./appendTagListError.js";
import apppendError from "./appendError.js";
import clearErrors from "./clearErrors.js";
import isFormValid from "../../../store/isFormValid.js";

export default function validateForm(formData) {
  clearErrors();
  isFormValid.valid = true;

  const { year, month, day, tags } = formData;

  validateEmptyFields(formData);
  validateDate(year, month, day);
  validateTags(tags);

  return isFormValid.valid;
}

function validateEmptyFields(formData) {
  for (let entry in formData) {
    if (
      !formData[entry] &&
      !entryIsDate(entry) &&
      entry.toString() !== "tags"
    ) {
      apppendError(entry.toString());
      isFormValid.valid = false;
    }
  }
}

function validateDate(year, month, day) {
  const dateBoolean = [];

  if (+year > 2100 || +year < 1970 || year === "") {
    dateBoolean.push(true);
  } else dateBoolean.push(false);

  if (+month > 12 || +month < 1 || month === "") {
    dateBoolean.push(true);
  } else dateBoolean.push(false);

  if (+day > 31 || +day < 1 || day === "") {
    dateBoolean.push(true);
  } else dateBoolean.push(false);

  if (dateBoolean.some((bool) => bool === true)) {
    appendDateError(...dateBoolean);
    isFormValid.valid = false;
  }
}

function validateTags(tags) {
  if (/[^\w\s,]/g.test(tags)) {
    appendTaglistError();
    isFormValid.valid = false;
  }
}
