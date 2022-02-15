import convertToJavascriptTime from "../../utils/date/convertToJavascriptTime.js";

export default function transformData(data) {
  const userId = Math.random();

  const user = {
    id: userId,
    username: data.name,
    status: "train",
    profileImgUrl: "https://picsum.photos/200",
  };

  const question = {
    id: Math.random(),
    userId,
    category: data.category,
    title: data.title,
    description: data.description,
    tags: convertTags(data.tags),
    views: 0,
    answers: 0,
    votes: 0,
    dateCreated: convertToJavascriptTime(+data.year, +data.month, +data.day),
  };

  return [user, question];
}

function convertTags(tags) {
  return tags.split(",").map((tag) => tag.trim());
}
