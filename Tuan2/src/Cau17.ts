// Bài 17: Use for await...of to iterate over an array of Promises.

function simulateTask(time: number, label: string): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`${label} done in ${time}ms`);
    }, time);
  });
}

async function iteratePromises(): Promise<void> {
  const tasks: Promise<string>[] = [
    simulateTask(1000, "Task 1"),
    simulateTask(2000, "Task 2"),
    simulateTask(500, "Task 3"),
  ];

  for await (const result of tasks) {
    console.log("Completed:", result);
  }

  console.log("All promises iterated.");
}

iteratePromises();
