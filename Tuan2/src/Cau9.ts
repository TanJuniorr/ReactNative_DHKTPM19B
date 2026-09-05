// Bài 9: Write a Promise that reads an array after 1 second and filters even numbers.

function filterEvenNumbers(arr: number[]): Promise<number[]> {
  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      const evens = arr.filter((n) => n % 2 === 0);
      resolve(evens);
    }, 1000);
  });
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

filterEvenNumbers(numbers).then((evens) => {
  console.log("Even numbers:", evens); // [2, 4, 6, 8, 10]
});
