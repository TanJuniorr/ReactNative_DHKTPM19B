// Bài 26: Use async/await with setTimeout to simulate a 5-second wait.

function wait(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function simulateLongWait(): Promise<void> {
  console.log("Starting 5-second wait...");
  const start = Date.now();

  await wait(5000);

  const elapsed = Date.now() - start;
  console.log(`Wait complete! Elapsed: ${elapsed}ms`);
}

simulateLongWait();
