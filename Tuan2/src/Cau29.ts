// Bài 29: Write an async function queueProcess() that processes tasks sequentially in a queue.

function processTask(id: number): Promise<string> {
  const time = Math.floor(Math.random() * 1000) + 500;
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Task ${id} completed in ${time}ms`);
    }, time);
  });
}

async function queueProcess(taskIds: number[]): Promise<void> {
  console.log("Starting queue processing...");
  const start = Date.now();

  for (const id of taskIds) {
    console.log(`Processing task ${id}...`);
    const result = await processTask(id);
    console.log(` - ${result}`);
  }

  const elapsed = Date.now() - start;
  console.log(`All tasks completed sequentially. Total time: ${elapsed}ms`);
}

queueProcess([1, 2, 3, 4, 5]);
