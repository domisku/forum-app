import filters from "../../store/filters.js";
import resetControls from "./resetControls.js";

export default function resetPagination() {
  const currentPage = document.querySelector(".pagination__current");

  filters.page = 1;
  currentPage.textContent = 1;

  resetControls();
}
