import allQuestions from "../pages/allQuestions.js";
import askQuestion from "../pages/askQuestion.js";
import goToEditForm from "./gotToEditForm.js";
import newQuestions from "../pages/newQuestions.js";
import pageNotFound from "../pages/pageNotFound.js";

const routes = {
  "/": allQuestions,
  "/new": newQuestions,
  "/ask": askQuestion,
  "/edit": goToEditForm,
  "/404": pageNotFound,
};

export default routes;
