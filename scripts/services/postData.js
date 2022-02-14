const baseUrl = "http://localhost:3000";

export default async function postData(collection, data) {
  try {
    const response = await fetch(`${baseUrl}/${collection}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
}
