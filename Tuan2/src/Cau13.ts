// Bài 13: Handle errors using try/catch with async/await.

function failingTask(): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

async function handleError(): Promise<void> {
  try {
    await failingTask();
  } catch (error: any) {
    console.error("Caught error:", error.message);
  }
}

handleError();
