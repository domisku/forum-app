const baseUrl = "http://localhost:3000";

export default async function deleteData(collection, id) {
  try {
    await fetch(`${baseUrl}/${collection}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
