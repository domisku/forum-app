import editQuestion from "../pages/editQuestion.js";
import { navigateAndReplace } from "./navigate.js";

export default function goToEditForm() {
  if (!history.state.id || !history.state.userId) {
    navigateAndReplace("/");
    return;
  } else {
    editQuestion(history.state.id, history.state.userId);
  }
}
