export default function renderErrorImage() {
  const mainContent = document.querySelector(".main-content");
  const image = document.createElement("img");
  image.src = "/assets/404.jpg";
  image.alt = "Broken phone showing error 404";
  image.classList.add("error-image");

  mainContent.appendChild(image);
}
