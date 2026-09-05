// Bài 4: Use .then() and .catch() to handle a Promise that returns a random number.

function getRandomNumber(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const num = Math.random();
    setTimeout(() => {
      if (num >= 0.5) {
        resolve(num);
      } else {
        reject(new Error(`Number too small: ${num}`));
      }
    }, 500);
  });
}

getRandomNumber()
  .then((num) => {
    console.log("Success! Random number:", num);
  })
  .catch((err) => {
    console.error("Failed!", err.message);
  });
