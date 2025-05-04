// Wait for DOM to be fully loaded
console.log('main.js v1.1 loaded');
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  initTabFunctionality();
  setupEmailJS();
});

// Set up EmailJS
function setupEmailJS() {
  console.log('Setting up EmailJS');
  try {
    // Initialize EmailJS with public key
    emailjs.init("n0IOi5QvaLBuY9ehz");
    console.log('EmailJS initialized successfully');
    
    // Add event listener to contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      console.log('Contact form found, adding event listener');
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted');
        
        // Get form and status elements
        const submitButton = document.getElementById('submit-button');
        const formStatus = document.getElementById('form-status');
        
        // Show sending state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        
        // Send email
        console.log('Sending email via EmailJS...');
        emailjs.sendForm('service_8lomhfn', 'template_fyodjdo', this)
          .then(function(response) {
            console.log('Email sent successfully!', response);
            formStatus.textContent = 'Your message has been sent successfully!';
            formStatus.className = 'form-status success';
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          }, function(error) {
            console.error('EmailJS error:', error);
            formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            formStatus.className = 'form-status error';
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          });
      });
    } else {
      console.error('Contact form not found');
    }
  } catch (error) {
    console.error('Error setting up EmailJS:', error);
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