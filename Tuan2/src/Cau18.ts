// Bài 18: Write an async function fetchUser(id) that simulates an API call (resolves a user object after 1 second).

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `User_${id}`,
        email: `user${id}@example.com`,
      });
    }, 1000);
  });
}

(async () => {
  const user = await fetchUser(1);
  console.log("Fetched user:", user);
})();
