const baseUrl = "http://localhost:3000";

export default async function postData(collection, data) {
  try {
    await fetch(`${baseUrl}/${collection}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}
