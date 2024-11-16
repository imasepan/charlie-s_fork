// tests/testUtils.ts
import fs from 'fs';
import path from 'path';

// Define the directory where test package files are stored
const uploadsDir = path.join(__dirname, '../uploads');

// Function to clean up test package files
export function cleanTestPackageFiles() {
  const files = fs.readdirSync(uploadsDir);
  files.forEach((file) => {
    if (file.endsWith('test-package.zip')) {
      fs.unlinkSync(path.join(uploadsDir, file));
      console.log(`Deleted: ${file}`);
    }
  });
  console.log('Cleanup completed.');
}
