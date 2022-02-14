import {
  ALL_QUESTIONS,
  NEW_QUESTIONS,
} from "../../pages/pageNameStrings/pageNameStrings.js";
import currentPage from "../../store/currentPage.js";
import { removeCategoryListener } from "../../listeners/selectedCategoryChange.js";
import { removePerPageListener } from "../../listeners/selectedPerPageChange.js";
import { removeSortListener } from "../../listeners/sortChange.js";
import { removePageChangeListener } from "../../listeners/pagination/pagination.js";

export default function removeListeners() {
  if (currentPage.index === ALL_QUESTIONS) {
    removeCategoryListener();
    removePerPageListener();
    removeSortListener();
    removePageChangeListener();
  } else if (currentPage.index === NEW_QUESTIONS) {
    removePageChangeListener();
  }
}
