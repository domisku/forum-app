export default function createError(message) {
  const errorLabel = document.createElement("label");
  errorLabel.textContent = message;
  return errorLabel;
}
