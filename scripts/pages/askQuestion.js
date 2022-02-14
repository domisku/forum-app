import currentPage from "../store/currentPage.js";
import renderHeader from "../utils/UI/renderHeader.js";
import removeOldPage from "../utils/UI/removeOldPage.js";
import { ASK_QUESTION } from "./pageNameStrings/pageNameStrings.js";
import removeListeners from "../utils/UI/removeListeners.js";

export default function askQuestion() {
  if (currentPage.index === ASK_QUESTION) return;
  currentPage.index = ASK_QUESTION;

  removeListeners();
  removeOldPage();

  renderHeader("Ask a Question");
  renderQuestionForm();
}

function renderQuestionForm() {}
