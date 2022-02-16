import removePagination from "../utils/UI/removePagination.js";
import listenForPaginationChange from "../listeners/pagination/pagination.js";

export default function renderPagination() {
  removePagination();

  const paginationTemplate = document.querySelector("#paginationTemplate");
  const clone = paginationTemplate.content.cloneNode(true);
  const mainContent = document.querySelector(".main");

  mainContent.appendChild(clone);

  listenForPaginationChange();
}
