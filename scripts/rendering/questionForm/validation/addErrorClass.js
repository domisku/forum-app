export default function addErrorClass(inputElArray) {
  inputElArray.forEach((input) =>
    input.classList.add("question-form__input--invalid")
  );
}
