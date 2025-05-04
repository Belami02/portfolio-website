// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initTabFunctionality();
  initEmailJS();
});

// Initialize EmailJS
function initEmailJS() {
  // Initialize with your public key
  emailjs.init("n0IOi5QvaLBuY9ehz");
  
  // Get the contact form and add event listener
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', submitForm);
  }
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

// Contact form submission with EmailJS
function submitForm(event) {
  event.preventDefault();
  
  // Get form elements
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');
  
  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  formStatus.textContent = '';
  
  // Prepare parameters for template
  const templateParams = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  // Send email using EmailJS with your provided Service ID and Template ID
  emailjs.send('service_8lomhfn', 'template_fyodjdo', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      
      // Show success message
      formStatus.textContent = 'Your message has been sent successfully!';
      formStatus.className = 'form-status success';
      
      // Reset form
      document.getElementById('contact-form').reset();
      
      // Restore button state
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    })
    .catch(function(error) {
      console.log('FAILED...', error);
      
      // Show error message
      formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
      formStatus.className = 'form-status error';
      
      // Restore button state
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    });
} 