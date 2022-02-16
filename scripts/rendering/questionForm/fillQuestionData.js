import fetchById from "../../services/fetchById.js";
import convertToYMD from "../../utils/date/convertToYMD.js";

export default async function fillQuestionData(id) {
  const question = await fetchById("questions", id);
  const user = await fetchById("users", question.userId);

  const name = document.querySelector("#inputName");
  const title = document.querySelector("#inputTitle");
  const description = document.querySelector("#inputDescription");
  const category = document.querySelector("#inputCategory");
  const tags = document.querySelector("#inputTags");

  const year = document.querySelector("#inputYear");
  const month = document.querySelector("#inputMonth");
  const day = document.querySelector("#inputDay");

  name.value = user.username;
  title.value = question.title;
  description.value = question.description;
  category.value = question.category;
  tags.value = question.tags.join(", ");

  const { year: y, month: m, day: d } = convertToYMD(question.dateCreated);

  year.value = y;
  month.value = m;
  day.value = d;
}
