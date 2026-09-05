// Bài 10: Use .finally() to log "Done" when a Promise finishes (success or failure).

function riskyOperation(): Promise<string> {
  return new Promise<string>((resolve) => {
    const success = Math.random() > 0.5;
    setTimeout(() => {
      if (success) {
        resolve("Operation succeeded!");
      } else {
        reject(new Error("Operation failed!"));
      }
    }, 1000);
  });
}

riskyOperation()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err.message);
  })
  .finally(() => {
    console.log("Done");
  });
