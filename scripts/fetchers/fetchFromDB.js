const baseUrl = "http://localhost:3000";

export default async function fetchFromDB(collection = "", params = "") {
  let fullUrl;
  if (!collection) fullUrl = `${baseUrl}/db`;
  else fullUrl = `${baseUrl}/${collection}?${params}`;

  try {
    const response = await fetch(fullUrl);
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.error(error.message);
    return;
  }
}
