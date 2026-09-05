// Bài 19: Create an async function fetchUsers(ids: number[]) that calls fetchUser for each ID.

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

async function fetchUsers(ids: number[]): Promise<User[]> {
  const users: User[] = [];
  for (const id of ids) {
    const user = await fetchUser(id);
    users.push(user);
  }
  return users;
}

(async () => {
  const users = await fetchUsers([1, 2, 3]);
  console.log("Fetched users:");
  users.forEach((u) => console.log(` - ${u.name} (${u.email})`));
})();
