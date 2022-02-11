import filters from "../store/filters.js";

const baseUrl = "http://localhost:3000";

export default async function fetchFromDB(
  collection = "",
  params = "",
  returnHeaders = false
) {
  let fullUrl;
  if (!collection) fullUrl = `${baseUrl}/db`;
  else fullUrl = `${baseUrl}/${collection}?${params}`;

  try {
    const response = await fetch(fullUrl);
    const questions = await response.json();
    if (!returnHeaders) return questions;
    else {
      const link = response.headers.get("Link");
      let regex = /.+rel="next".*page=(.+)&/;
      const lastPage = link.match(regex);
      console.log(lastPage);
      if (lastPage) return { questions, lastPage: +lastPage[1] };
      else return { questions, lastPage: 1 };
    }
  } catch (error) {
    console.error(error.message);
    return;
  }
}
