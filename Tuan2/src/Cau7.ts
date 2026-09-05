// Bài 7: Use Promise.race() to return whichever Promise resolves first.

function simulateTask(time: number, label: string): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`${label} finished in ${time}ms`);
    }, time);
  });
}

Promise.race([
  simulateTask(3000, "Slow Task"),
  simulateTask(1000, "Fast Task"),
  simulateTask(2000, "Medium Task"),
]).then((winner) => {
  console.log("Winner:", winner); // "Fast Task finished in 1000ms"
});
