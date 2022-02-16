const baseUrl = "http://localhost:3000";

export default async function fetchById(collection, id) {
  try {
    const response = await fetch(`${baseUrl}/${collection}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
