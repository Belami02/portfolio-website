// Alternative EmailJS implementation
// To use this file, change the script import in index.tsx from "main.js" to "contact-alternative.js"

console.log('contact-alternative.js v1.0 loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded - alternative implementation');
  
  // Initialize tab functionality
  initTabNavigation();
  
  // Initialize EmailJS with public key
  initEmailJS();
});

// Initialize EmailJS
function initEmailJS() {
  try {
    // Make sure EmailJS is loaded
    if (typeof emailjs !== 'undefined') {
      // Initialize EmailJS - using v3 API
      emailjs.init("n0IOi5QvaLBuY9ehz");
      console.log("EmailJS initialized successfully (alternative implementation)");
      
      // Set up the contact form
      setupContactForm();
    } else {
      console.error("EmailJS SDK not loaded. Please check your internet connection.");
      showFormError("Email service not available. Please try again later or contact directly via email.");
    }
  } catch (error) {
    console.error("Error initializing EmailJS:", error);
    showFormError("Email service initialization failed. Please try again later.");
  }
}

// Set up contact form handlers
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) {
    console.error("Contact form not found in the DOM");
    return;
  }

  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Add auto-clearing of status messages when user starts typing
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      const formStatus = document.getElementById('form-status');
      if (formStatus && formStatus.textContent) {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }
    });
  });
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');
  
  // Update UI to show loading state
  setSubmitButtonLoading(true);
  clearFormStatus();
  
  // Collect form data using form values directly
  const formData = {
    from_name: form.elements['from_name'].value,
    email_id: form.elements['email_id'].value,
    subject: form.elements['subject'].value,
    message: form.elements['message'].value,
    timestamp: new Date().toISOString()
  };
  
  console.log("Sending email with parameters:", JSON.stringify(formData));
  
  // First approach: Using send() method with parameters
  emailjs.send('service_8lomhfn', 'template_fyodjdo', formData)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      showFormSuccess("Your message has been sent successfully!");
      form.reset();
    })
    .catch(function(error) {
      console.error('FAILED...', error);
      
      // If first approach fails, try alternative approach
      console.log("First approach failed, trying alternative sendForm method...");
      tryAlternativeMethod(form);
    });
}

// Try alternative approach if the first one fails
function tryAlternativeMethod(form) {
  // Second approach: Using sendForm() method
  emailjs.sendForm('service_8lomhfn', 'template_fyodjdo', form)
    .then(function(response) {
      console.log('SUCCESS (alternative method)!', response.status, response.text);
      showFormSuccess("Your message has been sent successfully!");
      form.reset();
    })
    .catch(function(error) {
      console.error('FAILED (alternative method)...', error);
      let errorMessage = "Sorry, there was an error sending your message.";
      
      if (error && error.text) {
        errorMessage += " Error: " + error.text;
      }
      
      showFormError(errorMessage);
    })
    .finally(function() {
      setSubmitButtonLoading(false);
    });
}

// Show success message
function showFormSuccess(message) {
  const formStatus = document.getElementById('form-status');
  if (formStatus) {
    formStatus.textContent = message;
    formStatus.className = 'form-status success';
  }
  setSubmitButtonLoading(false);
}

// Show error message
function showFormError(message) {
  const formStatus = document.getElementById('form-status');
  if (formStatus) {
    formStatus.textContent = message;
    formStatus.className = 'form-status error';
  }
  setSubmitButtonLoading(false);
}

// Clear form status
function clearFormStatus() {
  const formStatus = document.getElementById('form-status');
  if (formStatus) {
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }
}

// Set button loading state
function setSubmitButtonLoading(isLoading) {
  const submitButton = document.getElementById('submit-button');
  if (submitButton) {
    submitButton.disabled = isLoading;
    submitButton.innerHTML = isLoading ? 
      '<i class="fas fa-spinner fa-spin"></i> Sending...' : 
      '<i class="fas fa-paper-plane"></i> Send Message';
  }
}

// Initialize tab navigation functionality
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Hide all tab contents except the active one
  tabContents.forEach(content => {
    if (!content.classList.contains('active')) {
      content.style.display = 'none';
    }
  });
  
  // Add click event listeners to all tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });
      
      // Add active class to the clicked button
      this.classList.add('active');
      
      // Show the corresponding tab content
      const tabName = this.getAttribute('data-tab');
      const activeContent = document.querySelector('.tab-' + tabName);
      if (activeContent) {
        activeContent.classList.add('active');
        activeContent.style.display = 'block';
        
        // Trigger animation
        activeContent.animate([
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 300,
          easing: 'ease-out',
          fill: 'forwards'
        });
      }
    });
  });
  
  // Make sure the initial tab is correctly shown
  const activeTab = document.querySelector('.tab-button.active');
  if (activeTab) {
    // Trigger a click on the active tab to ensure proper initialization
    activeTab.click();
  } else if (tabButtons.length > 0) {
    // If no active tab is set, activate the first one
    tabButtons[0].click();
  }
} 