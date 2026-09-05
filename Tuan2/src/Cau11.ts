// Bài 11: Convert Exercise 1 into async/await.

async function helloAsync(): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });
}

(async () => {
  const result = await helloAsync();
  console.log(result); // "Hello Async"
})();
