// Static Site Generator for GitHub Pages
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const fetch = require('node-fetch');

const PORT = 3000;
const DIST_DIR = 'dist';
const PUBLIC_DIR = 'public';
const OUTPUT_DIR = 'dist/static';

// Create necessary directories
console.log('Creating output directories...');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Copy all files from public to output directory
console.log('Copying public files...');
copyDirectory(PUBLIC_DIR, OUTPUT_DIR);

// Start the server
console.log('Starting server temporarily...');
const server = require('../dist/index');

// Fetch the HTML content
console.log('Fetching HTML content...');
setTimeout(() => {
  fetch(`http://localhost:${PORT}`)
    .then(response => response.text())
    .then(html => {
      // Write the HTML to index.html
      fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);
      console.log('Created index.html');
      
      // Create a .nojekyll file (needed for GitHub Pages)
      fs.writeFileSync(path.join(OUTPUT_DIR, '.nojekyll'), '');
      console.log('Created .nojekyll file');

      // Stop the server if it's running
      if (server && server.close) {
        server.close();
      } else {
        // If server.close doesn't exist, force exit
        process.exit(0);
      }
    })
    .catch(error => {
      console.error('Error fetching HTML:', error);
      process.exit(1);
    });
}, 2000); // Give the server 2 seconds to start

// Helper function to copy directories recursively
function copyDirectory(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Read all files in the source directory
  const files = fs.readdirSync(source);

  // Copy each file or directory
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    // Check if it's a directory or file
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Recursively copy directory
      copyDirectory(sourcePath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, destPath);
    }
  }
} 