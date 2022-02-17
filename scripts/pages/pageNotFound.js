import currentPage from "../store/currentPage.js";
import renderHeader from "../utils/UI/renderHeader.js";
import removeOldPage from "../utils/UI/removeOldPage.js";
import { PAGE_NOT_FOUND } from "./pageNameStrings/pageNameStrings.js";
import removeListeners from "../utils/UI/removeListeners.js";
import {
  addLoadingSpinner,
  removeLoadingSpinner,
} from "../rendering/createLoadingSpinner.js";
import sleep from "../utils/sleep/sleep.js";
import renderErrorImage from "../rendering/renderErrorImage.js";

export default async function pageNotFound() {
  if (currentPage.index === PAGE_NOT_FOUND) return;
  currentPage.index = PAGE_NOT_FOUND;

  removeListeners();
  removeOldPage();

  addLoadingSpinner();
  await sleep(800);
  renderHeader("Page not found (404)");
  renderErrorImage();
  removeLoadingSpinner();
}
