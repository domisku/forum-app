const mainContent = document.querySelector(".main");
const questionTemplate = document.querySelector(".question-template");

renderQuestions();

async function fetchData() {
  try {
    const response = await fetch("/DUMMY_DATA.json");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
    return;
  }
}

async function renderQuestions() {
  const data = await fetchData();
  if (!data) return;

  for (let entry of data) {
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

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

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

function reformatDate(date) {
  const splitDate = date.split("-").map((str) => +str);
  const [year, month, day] = splitDate;

  return `${monthNames[month - 1]} ${day}, ${year}`;
}
