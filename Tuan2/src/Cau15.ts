// Bài 15: Call multiple async functions sequentially using await.

function simulateTask(time: number, label: string): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`${label} done`);
    }, time);
  });
}

async function runSequentially(): Promise<void> {
  console.log("Starting sequential tasks...");

  const result1 = await simulateTask(1000, "Task 1");
  console.log(result1);

  const result2 = await simulateTask(1500, "Task 2");
  console.log(result2);

  const result3 = await simulateTask(500, "Task 3");
  console.log(result3);

  console.log("All tasks completed sequentially.");
}

runSequentially();
