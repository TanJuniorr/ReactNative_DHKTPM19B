// Bài 28: Write an async function batchProcess() that processes 5 async tasks at once (use Promise.all).

function processTask(id: number): Promise<string> {
  const time = Math.floor(Math.random() * 2000) + 500;
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Task ${id} completed in ${time}ms`);
    }, time);
  });
}

async function batchProcess(): Promise<void> {
  console.log("Starting batch processing...");
  const start = Date.now();

  const results = await Promise.all([
    processTask(1),
    processTask(2),
    processTask(3),
    processTask(4),
    processTask(5),
  ]);

  const elapsed = Date.now() - start;
  console.log("Results:");
  results.forEach((r) => console.log(` - ${r}`));
  console.log(`Total batch time: ${elapsed}ms`);
}

batchProcess();
