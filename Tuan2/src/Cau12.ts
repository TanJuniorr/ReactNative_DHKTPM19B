// Bài 12: Write an async function that calls simulateTask(2000) and logs the result.

function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
}

async function runTask(): Promise<void> {
  const result = await simulateTask(2000);
  console.log(result); // "Task done"
}

runTask();
