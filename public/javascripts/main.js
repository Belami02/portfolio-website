// Wait for DOM to be fully loaded
console.log('main.js v1.2 loaded');
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  initTabFunctionality();
  initContactForm();
});

// Set up contact form
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get UI elements
    const submitButton = document.getElementById('submit-button');
    const formStatus = document.getElementById('form-status');
    
    // Update UI to show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    
    // Get form data
    const formData = {
      from_name: document.getElementById('name').value,
      email_id: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      // Add a timestamp to help prevent caching issues
      timestamp: new Date().toISOString()
    };
    
    console.log('Sending email with data:', JSON.stringify(formData));
    
    // Send email using EmailJS v3
    emailjs.send('service_8lomhfn', 'template_fyodjdo', formData)
      .then(function(response) {
        console.log('Email sent successfully:', response);
        // Success - update UI
        formStatus.textContent = 'Your message has been sent successfully!';
        formStatus.className = 'form-status success';
        contactForm.reset();
      })
      .catch(function(error) {
        console.error('EmailJS error details:', error);
        // Error - update UI with more specific error message if available
        let errorMessage = 'Sorry, there was an error sending your message. Please try again later.';
        if (error && error.text) {
          errorMessage += ' Error: ' + error.text;
        }
        formStatus.textContent = errorMessage;
        formStatus.className = 'form-status error';
      })
      .finally(function() {
        // Always restore button state
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      });
  });
}

// Initialize tab functionality
function initTabFunctionality() {
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