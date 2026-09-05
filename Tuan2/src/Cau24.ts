// Bài 24: Write an async function postData() that sends a POST request to a test API.

async function postData(): Promise<void> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Hello from TypeScript",
        body: "This is a test post using fetch.",
        userId: 1,
      }),
    });

    const data = await response.json();
    console.log("Post created:", data);
  } catch (error: any) {
    console.error("Error posting data:", error.message);
  }
}

postData();
