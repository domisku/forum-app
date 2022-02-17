import currentPage from "../store/currentPage.js";
import {
  EDIT_QUESTION,
  PAGE_NOT_FOUND,
} from "../pages/pageNameStrings/pageNameStrings.js";

export default function currentPageProtected() {
  if (
    currentPage.index === EDIT_QUESTION ||
    currentPage.index === PAGE_NOT_FOUND
  ) {
    return true;
  } else return false;
}
