// Bài 25: Create a function downloadFile that simulates downloading a file in 3 seconds and logs when done.

function downloadFile(filename: string): Promise<string> {
  console.log(`Starting download: ${filename}...`);
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Download complete: ${filename}`);
    }, 3000);
  });
}

(async () => {
  const result = await downloadFile("report.pdf");
  console.log(result);
})();
