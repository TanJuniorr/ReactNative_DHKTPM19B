// Bài 8: Create a Promise chain: square the number 2, then double it, then add 5.

const startValue = 2;

Promise.resolve(startValue)
  .then((num) => {
    const squared = num * num;
    console.log(`Square: ${num} → ${squared}`);
    return squared;
  })
  .then((num) => {
    const doubled = num * 2;
    console.log(`Double: ${num} → ${doubled}`);
    return doubled;
  })
  .then((num) => {
    const added = num + 5;
    console.log(`Add 5: ${num} → ${added}`);
    return added;
  })
  .then((finalResult) => {
    console.log("Final result:", finalResult); // 13
  });
