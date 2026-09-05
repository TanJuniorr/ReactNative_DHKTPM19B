// Bài 16: Call multiple async functions in parallel using Promise.all().

function simulateTask(time: number, label: string): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`${label} done in ${time}ms`);
    }, time);
  });
}

async function runInParallel(): Promise<void> {
  console.log("Starting parallel tasks...");

  const results = await Promise.all([
    simulateTask(1000, "Task 1"),
    simulateTask(2000, "Task 2"),
    simulateTask(1500, "Task 3"),
  ]);

  results.forEach((r) => console.log(" -", r));
  console.log("All tasks completed in parallel.");
}

runInParallel();
