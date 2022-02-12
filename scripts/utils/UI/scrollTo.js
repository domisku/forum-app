export default function scrollTo(topCoordinate) {
  window.scroll({
    left: 0,
    top: topCoordinate,
    behavior: "smooth",
  });
}
