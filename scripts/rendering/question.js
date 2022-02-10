import reformatDate from "../utils/date/reformatDate.js";
import capitalizeFirstLetter from "../utils/string/capitalizeFirst.js";

const mainContent = document.querySelector(".main");
const questionTemplate = document.querySelector(".question-template");

export default function renderQuestion(question) {
  const clone = questionTemplate.content.cloneNode(true);

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

  username.textContent = question.user;
  title.textContent = question.question;
  img.src = question.imgUrl;
  date.textContent = reformatDate(question.dateCreated);
  views.textContent = question.views;
  answers.textContent = question.answers;
  votes.textContent = question.votes;

  if (question.description.length > 140) {
    description.textContent = question.description.slice(0, 140) + " ...";
  } else description.textContent = question.description;

  category.textContent = capitalizeFirstLetter(question.category);

  status.textContent = question.status;
  switch (question.status) {
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

  question.tags.forEach((tagname) => {
    const tag = document.createElement("li");
    tag.classList.add("question__tag");
    tag.textContent = tagname;
    tagList.appendChild(tag);
  });

  mainContent.appendChild(clone);
}
