// Bài 3: Write a function that rejects a Promise with the error "Something went wrong" after 1 second.

function failAfterOneSecond(): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

failAfterOneSecond().catch((err) => {
  console.error("Error:", err.message); // "Something went wrong"
});
