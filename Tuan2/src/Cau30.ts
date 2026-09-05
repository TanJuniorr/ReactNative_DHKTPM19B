// Bài 30: Use async/await + Promise.allSettled() to handle multiple API calls and display their success/failure status.

async function fetchTodo(id: number): Promise<any> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch todo ${id}`);
  }
  return response.json();
}

function failingTask(): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Simulated failure"));
    }, 500);
  });
}

async function handleMultipleCalls(): Promise<void> {
  const results = await Promise.allSettled([
    fetchTodo(1),
    fetchTodo(2),
    failingTask(),
    fetchTodo(3),
    failingTask(),
  ]);

  console.log("Results:");
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`  [${index + 1}] ✅ Success:`, result.value?.title ?? result.value);
    } else {
      console.log(`  [${index + 1}] ❌ Failed:`, result.reason.message);
    }
  });

  const fulfilled = results.filter((r) => r.status === "fulfilled").length;
  const rejected = results.filter((r) => r.status === "rejected").length;
  console.log(`\nSummary: ${fulfilled} succeeded, ${rejected} failed out of ${results.length} total.`);
}

handleMultipleCalls();
