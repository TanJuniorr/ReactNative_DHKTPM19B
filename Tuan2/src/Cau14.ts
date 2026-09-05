// Bài 14: Write an async function that takes a number, waits 1 second, and returns the number × 3.

async function tripleAfterDelay(num: number): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(num * 3);
    }, 1000);
  });
}

(async () => {
  const result = await tripleAfterDelay(7);
  console.log("Result:", result); // 21
})();
