export default function connectScrollEventListeners() {
  const buttons = document.querySelector(".scroll-buttons");

  let scrolling = false;

  document.addEventListener("scroll", () => {
    if (!scrolling) {
      setTimeout(() => {
        scrolling = false;
        let scrollPosi = window.scrollY;
        if (scrollPosi > 200) {
          buttons.classList.add("scroll-buttons--show");
        } else if (scrollPosi < 200) {
          buttons.classList.remove("scroll-buttons--show");
        }
      }, 300);

      scrolling = true;
    }
  });

  buttons.addEventListener("click", (event) => {
    const pressedButton = event.target.closest("button");
    if (!pressedButton) return;

    if (pressedButton.dataset.direction === "up") {
      window.scroll({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scroll({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  });
}
