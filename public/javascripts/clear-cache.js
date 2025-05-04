// This script forces the browser to clear cached resources
console.log('Cache clearing script loaded');

// Force refresh of cached files
function clearCache() {
  console.log('Clearing cache...');
  
  // Add a timestamp to force reload of main.js
  const script = document.createElement('script');
  script.src = '/javascripts/main.js?v=' + new Date().getTime();
  script.defer = true;
  
  // Remove any existing main.js script
  const existingScripts = document.querySelectorAll('script[src*="main.js"]');
  existingScripts.forEach(s => s.parentNode.removeChild(s));
  
  // Add the new script
  document.head.appendChild(script);
  
  console.log('Cache cleared, new script loaded');
}

// Execute immediately
clearCache(); 