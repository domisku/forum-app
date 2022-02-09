import fetchQuestions from "./fetchQuestions.js";

const mainContent = document.querySelector(".main");
const questionTemplate = document.querySelector(".question-template");

main();
async function main() {
  const questions = await fetchQuestions();
  renderCategoryOptions(questions);
  renderQuestions(questions);
  listenForFilterChange(questions);
  renderTagCount(questions);
  renderQuestionsCount(questions);
  renderMemberCount(questions);
  renderHotQuestions(questions);
}

function renderCategoryOptions(questions) {
  const select = document.querySelector("#category-filter");

  const categoryMap = {};

  questions.forEach((question) => {
    if (!categoryMap[question.category]) categoryMap[question.category] = 1;
  });

  const categories = Object.keys(categoryMap);

  for (let category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = capitalizeFirstLetter(category);
    select.appendChild(option);
  }
}

function renderHotQuestions(questions) {
  questions.sort(
    (question, nextQuestion) => nextQuestion.views - question.views
  );

  const hotQuestionList = document.querySelector(".sidebar-right__hot-list");
  const hotQuestionTemplate = document.querySelector(
    ".sidebar-right__hot-item-template"
  );

  let i = 0;
  for (let question of questions) {
    if (i === 5) break;

    const clone = hotQuestionTemplate.content.cloneNode(true);
    const userImg = clone.querySelector(".sidebar-right__hot-img");
    const questionText = clone.querySelector(".sidebar-right__hot-question");

    userImg.src = question.imgUrl;
    questionText.textContent = question.question;

    hotQuestionList.appendChild(clone);

    i++;
  }
}

function renderQuestionsCount(questions) {
  const questionElement = document.querySelector(
    ".sidebar-right__questions .sidebar-right__total"
  );
  questionElement.textContent = questions.length;
}

function renderMemberCount(questions) {
  const membersElement = document.querySelector(
    ".sidebar-right__members .sidebar-right__total"
  );
  const uniqueMembersMap = {};

  questions.forEach((question) => {
    if (!uniqueMembersMap[question.user]) uniqueMembersMap[question.user] = 1;
  });

  const uniqueMembersCount = Object.keys(uniqueMembersMap).length;

  membersElement.textContent = uniqueMembersCount;
}

function renderTagCount(questions) {
  const tagMap = {};

  for (let question of questions) {
    question.tags.forEach((tag) => {
      tagMap[tag] ? tagMap[tag]++ : (tagMap[tag] = 1);
    });
  }

  const sortedTags = Object.entries(tagMap).sort(
    (cur, next) => next[1] - cur[1]
  );

  const tagsList = document.querySelector(".sidebar-right__tags-list");

  if (sortedTags.length > 8) {
    const toggleTagsButton = document.createElement("button");
    toggleTagsButton.textContent = "See more tags";
    toggleTagsButton.classList.add("sidebar-right__button");
    toggleTagsButton.addEventListener("click", (event) => {
      if (event.target.textContent === "See more tags") {
        createTagElements(sortedTags, true);
        toggleTagsButton.textContent = "See less tags";
      } else {
        createTagElements(sortedTags, false);
        toggleTagsButton.textContent = "See more tags";
      }
    });
    tagsList.appendChild(toggleTagsButton);
  }

  createTagElements(sortedTags);
}

function createTagElements(sortedTags, showAll = false) {
  const toggleTagsButton = document.querySelector(".sidebar-right__button");
  const tagsList = document.querySelector(".sidebar-right__tags-list");
  const tagItems = tagsList.querySelectorAll(".sidebar-right__tags-item");

  Array.from(tagItems).forEach((tag) => tag.remove());

  let index = 0;
  for (let [tagName, tagCount] of sortedTags) {
    if (index === 8 && !showAll) break;
    const tagElement = document.createElement("li");
    tagElement.classList.add("sidebar-right__tags-item");
    tagElement.textContent = tagName;
    tagElement.dataset.count = "x " + tagCount;

    toggleTagsButton.insertAdjacentElement("beforebegin", tagElement);
    index++;
  }
}

function listenForFilterChange(questions) {
  const articleFiltersList = document.querySelector(".main-header__list");

  articleFiltersList.addEventListener("click", (event) => {
    if (!event.target.classList.contains("main-header__item")) return;
    const clickedFilter = event.target;
    const articleFilters = Array.from(articleFiltersList.children);
    clearModifiers();
    clickedFilter.classList.add("main-header__item--active");

    switch (clickedFilter.dataset.filterType) {
      case "latest":
        questions.sort(
          (question, nextQuestion) =>
            convertToJavascriptTime(nextQuestion.dateCreated) -
            convertToJavascriptTime(question.dateCreated)
        );
        break;
      case "votes":
        questions.sort(
          (question, nextQuestion) => nextQuestion.votes - question.votes
        );
        break;
      case "unanswered":
        questions.sort(
          (question, nextQuestion) => question.answers - nextQuestion.answers
        );
        break;
      default:
    }

    function clearModifiers() {
      articleFilters.forEach((filter) =>
        filter.classList.remove("main-header__item--active")
      );
    }
    renderQuestions(questions);
  });
}

function renderQuestions(questions) {
  if (!questions) return;

  const articles = mainContent.querySelectorAll(".question");
  articles.forEach((article) => article.remove());

  for (let entry of questions) {
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

    username.textContent = entry.user;
    title.textContent = entry.question;
    img.src = entry.imgUrl;
    date.textContent = reformatDate(entry.dateCreated);
    views.textContent = entry.views;
    answers.textContent = entry.answers;
    votes.textContent = entry.votes;

    if (entry.description.length > 140) {
      description.textContent = entry.description.slice(0, 140) + " ...";
    } else description.textContent = entry.description;

    category.textContent = capitalizeFirstLetter(entry.category);

    status.textContent = entry.status;
    switch (entry.status) {
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

    entry.tags.forEach((tagname) => {
      const tag = document.createElement("li");
      tag.classList.add("question__tag");
      tag.textContent = tagname;
      tagList.appendChild(tag);
    });

    mainContent.appendChild(clone);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function splitDate(date) {
  const splitDate = date.split("-").map((str) => +str);
  const [year, month, day] = splitDate;

  return { year, month, day };
}

function reformatDate(date) {
  const ymd = splitDate(date);

  return `${monthNames[ymd.month - 1]} ${ymd.day}, ${ymd.year}`;
}

function convertToJavascriptTime(date) {
  const ymd = splitDate(date);

  return `${new Date(ymd.year, ymd.month - 1, ymd.day).getTime()}`;
}
