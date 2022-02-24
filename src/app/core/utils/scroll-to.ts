export default function scrollTo(topCoordinate: number) {
  window.scroll({
    left: 0,
    top: topCoordinate,
    behavior: 'smooth',
  });
}
