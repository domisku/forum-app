const baseUrl = "http://localhost:3000";

export default async function updateData(collection, data, id) {
  try {
    await fetch(`${baseUrl}/${collection}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}
