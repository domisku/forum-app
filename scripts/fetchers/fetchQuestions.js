export default async function fetchQuestions() {
  try {
    const response = await fetch("/DUMMY_DATA.json");
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.error(error.message);
    return;
  }
}
