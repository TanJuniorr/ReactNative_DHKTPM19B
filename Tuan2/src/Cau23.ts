// Bài 23: Write an async function that fetches a list of todos and filters out those that are not completed.

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchCompletedTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await response.json();
  return todos.filter((todo) => todo.completed);
}

(async () => {
  try {
    const completedTodos = await fetchCompletedTodos();
    console.log(`Found ${completedTodos.length} completed todos:`);
    completedTodos.slice(0, 5).forEach((todo) => {
      console.log(` - [${todo.id}] ${todo.title}`);
    });
    console.log("  ...");
  } catch (error: any) {
    console.error("Error:", error.message);
  }
})();
