// Bài 1: Create a Promise that returns the string "Hello Async" after 2 seconds.

const helloAsync = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});

helloAsync.then((result) => {
  console.log(result); // "Hello Async"
});
