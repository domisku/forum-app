export default function connectHamburgerListeners() {
  const button = document.querySelector(".hamburger__button");
  const menuList = document.querySelector(".hamburger__list");

  button.addEventListener("click", () => {
    menuList.classList.toggle("hamburger__list--show");
  });
}
