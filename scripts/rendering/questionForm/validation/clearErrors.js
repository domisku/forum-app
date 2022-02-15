export default function clearErrors() {
  const inputs = document.querySelectorAll(".question-form__input--invalid");
  if (!inputs) return;

  inputs.forEach((input) => {
    input.classList.remove("question-form__input--invalid");
  });

  const errorLabels = document.querySelectorAll(".question-form__error-label");
  errorLabels.forEach((label) => {
    label.remove();
  });
}
