// Bài 21: Use fetch to get data from a public API.

async function fetchTodo(): Promise<void> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await response.json();
    console.log("Fetched todo:", data);
  } catch (error: any) {
    console.error("Error fetching:", error.message);
  }
}

fetchTodo();
