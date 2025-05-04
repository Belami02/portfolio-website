# Portfolio Website

A professional portfolio website built with Express.js and TypeScript.

## Setup and Run

1. Install dependencies:
   ```
   npm install
   ```

2. Build the project:
   ```
   npm run build
   ```

3. Start the server:
   ```
   npm start
   ```

4. Visit `http://localhost:3000` in your browser

## EmailJS Setup

This portfolio uses EmailJS to handle contact form submissions. To configure EmailJS:

1. Create an account on [EmailJS](https://www.emailjs.com/) (free tier allows 200 emails/month)

2. Create an Email Service:
   - Click "Add New Service" and connect to your email provider (Gmail, Outlook, etc.)
   - Note the Service ID for later use

3. Create an Email Template:
   - Go to "Email Templates" and click "Create New Template"
   - Design your email template using these dynamic variables in your content:
     - {{name}} - Sender's name
     - {{email}} - Sender's email
     - {{subject}} - Email subject
     - {{message}} - Email message
   - Note the Template ID for later use

4. Update the JavaScript configuration:
   - Open `public/javascripts/main.js`
   - Replace these values with your actual EmailJS credentials:
     ```javascript
     // Replace with your actual EmailJS user ID
     emailjs.init("user_xxxxxxxxxxxxxxxxxxx");
     
     // In the submitForm function:
     emailjs.send('service_xxxxxxxxx', 'template_xxxxxxxxx', templateParams)
     ```
   - Your User ID can be found in Account > API Keys

5. Test the form to ensure it's working correctly

## Customization

- Edit the data in `src/index.tsx` to customize your personal information
- Replace `public/images/profile.jpg` with your own photo
- Add your resume as `public/resume.pdf`
- Modify styles in `public/stylesheets/styles.css`

## Features

- Responsive design for mobile and desktop
- Tabbed interface for easy navigation
- Contact form with EmailJS integration
- Skills showcase with icons
- Project portfolio with images and descriptions

## License

MIT License
