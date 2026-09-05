// Bài 27: Write a function fetchWithRetry(url, retries) that retries up to retries times if the API call fails.

async function fetchWithRetry(url: string, retries: number): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}...`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Success on attempt ${attempt}`);
      return data;
    } catch (error: any) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        throw new Error(`All ${retries} attempts failed. Last error: ${error.message}`);
      }
    }
  }
}

(async () => {
  try {
    const data = await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);
    console.log("Data:", data);
  } catch (error: any) {
    console.error("Final error:", error.message);
  }
})();
