// Bài 20: Add a timeout: if the API call takes more than 2 seconds, throw an error.

interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number, delay: number = 1000): Promise<User> {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `User_${id}`,
        email: `user${id}@example.com`,
      });
    }, delay);
  });
}

function timeout(ms: number): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Timeout: exceeded ${ms}ms`));
    }, ms);
  });
}

async function fetchUserWithTimeout(id: number, delay: number = 1000): Promise<User> {
  return Promise.race([fetchUser(id, delay), timeout(2000)]);
}

(async () => {
  try {
    // This should succeed (1s < 2s timeout)
    const user1 = await fetchUserWithTimeout(1, 1000);
    console.log("Success:", user1);

    // This should fail (3s > 2s timeout)
    const user2 = await fetchUserWithTimeout(2, 3000);
    console.log("Success:", user2);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
})();
