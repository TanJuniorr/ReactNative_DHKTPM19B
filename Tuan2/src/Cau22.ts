// Bài 22: Call the API multiple times and log the results.

async function fetchTodo(id: number): Promise<any> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return response.json();
}

async function fetchMultipleTodos(): Promise<void> {
  try {
    const ids = [1, 2, 3, 4, 5];
    const promises = ids.map((id) => fetchTodo(id));
    const todos = await Promise.all(promises);

    console.log("Fetched todos:");
    todos.forEach((todo) => {
      console.log(` - [${todo.completed ? "✓" : "✗"}] ${todo.title}`);
    });
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

fetchMultipleTodos();
