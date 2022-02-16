import currentPage from "../store/currentPage.js";
import renderHeader from "../utils/UI/renderHeader.js";
import removeOldPage from "../utils/UI/removeOldPage.js";
import { EDIT_QUESTION } from "./pageNameStrings/pageNameStrings.js";
import removeListeners from "../utils/UI/removeListeners.js";
import renderEditForm from "../rendering/questionForm/editForm.js";

export default function editQuestion(id, userId) {
  if (currentPage.index === EDIT_QUESTION) return;
  currentPage.index = EDIT_QUESTION;

  removeListeners();
  removeOldPage();

  renderHeader("Edit Question");
  renderEditForm(id, userId);
}
