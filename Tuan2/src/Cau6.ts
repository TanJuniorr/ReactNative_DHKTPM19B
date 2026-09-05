// Bài 6: Use Promise.all() to run 3 simulated Promises in parallel and print the result.

function simulateTask(time: number, label: string): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`${label} done in ${time}ms`);
    }, time);
  });
}

Promise.all([
  simulateTask(1000, "Task 1"),
  simulateTask(2000, "Task 2"),
  simulateTask(1500, "Task 3"),
]).then((results) => {
  console.log("All tasks completed:");
  results.forEach((r) => console.log(" -", r));
});
