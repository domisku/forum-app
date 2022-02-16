import editQuestion from "../pages/editQuestion.js";
import convertToMDY from "../utils/date/convertToMDY.js";
import capitalizeFirstLetter from "../utils/string/capitalizeFirst.js";

const questionTemplate = document.querySelector(".question-template");

export default function renderQuestion(question, author) {
  const mainContentContainer = document.querySelector(".main-content");
  const clone = questionTemplate.content.cloneNode(true);

  mainContentContainer.addEventListener("click", articleClickHandler);

  const article = clone.querySelector(".question");
  const username = clone.querySelector(".question__username");
  const title = clone.querySelector(".question__title");
  const description = clone.querySelector(".question__description");
  const img = clone.querySelector(".question__img");
  const date = clone.querySelector(".question__date");
  const category = clone.querySelector(".question__category");
  const views = clone.querySelector(".question__stats-views-count");
  const answers = clone.querySelector(".question__stats-answers-count");
  const votes = clone.querySelector(".question__stats-votes-count");
  const tagList = clone.querySelector(".question__tags");
  const status = clone.querySelector(".question__status");

  article.id = question.id;
  article.dataset.userId = author.id;
  username.textContent = author.username;
  title.textContent = question.title;
  img.src = author.profileImgUrl;
  date.textContent = convertToMDY(question.dateCreated);
  views.textContent = question.views;
  answers.textContent = question.answers;
  votes.textContent = question.votes;

  if (question.description.length > 140) {
    description.textContent = question.description.slice(0, 140) + " ...";
  } else description.textContent = question.description;

  category.textContent = capitalizeFirstLetter(question.category);

  status.textContent = author.status;
  switch (author.status) {
    case "professor":
      status.classList.add("question__status--professor");
      break;
    case "reviewer":
      status.classList.add("question__status--reviewer");
      break;
    case "train":
      status.classList.add("question__status--train");
      break;
    default:
  }

  if (question.tags[0]) {
    question.tags.forEach((tagname) => {
      const tag = document.createElement("li");
      tag.classList.add("question__tag");
      tag.textContent = tagname;
      tagList.appendChild(tag);
    });
  }

  mainContentContainer.appendChild(clone);
}

function articleClickHandler(event) {
  const article = event.target.closest(".question");

  if (article) {
    editQuestion(+article.id, +article.dataset.userId);
  }
}

export function removeArticlesListener() {
  const mainContentContainer = document.querySelector(".main-content");

  if (mainContentContainer) {
    mainContentContainer.removeEventListener("click", articleClickHandler);
  }
}
