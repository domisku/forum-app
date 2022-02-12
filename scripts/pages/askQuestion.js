import currentPage from "../store/currentPage.js";
import renderHeader from "../utils/UI/renderHeader.js";
import removeOldPage from "../utils/UI/removeOldPage.js";

const ASK_QUESTION = "askQuestion";

export default function askQuestion() {
  if (currentPage.index === ASK_QUESTION) return;
  currentPage.index = ASK_QUESTION;

  removeOldPage();

  renderHeader("Ask a Question");
  renderQuestionForm();
}

function renderQuestionForm() {}
