import splitByComma from "../../utils/string/splitByComma.js";
import convertToJavascriptTime from "../../utils/date/convertToJavascriptTime.js";

export default function transformEditedData(data) {
  const user = {
    username: data.name,
  };

  const question = {
    category: data.category,
    title: data.title,
    description: data.description,
    tags: splitByComma(data.tags).filter((tag) => tag.trim() !== ""),
    dateCreated: convertToJavascriptTime(+data.year, +data.month, +data.day),
  };

  return [user, question];
}
