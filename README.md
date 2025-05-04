# Personal Portfolio Website

A modern, responsive portfolio website built with Express.js, TypeScript, and designed for deployment on GitHub Pages.

## Features

- Responsive design that works on desktop and mobile
- Interactive tab navigation system
- Contact form with EmailJS integration
- Dynamic project showcase
- GitHub Pages deployment support

## Setup and Local Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Belami02/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

- `public/` - Static assets (images, CSS, client-side JavaScript)
- `src/` - Server-side TypeScript code
- `scripts/` - Build and deployment scripts

## Deployment to GitHub Pages

### Automatic Deployment (GitHub Actions)

This project includes a GitHub Actions workflow that automatically deploys your site to GitHub Pages when you push to the main branch.

### Manual Deployment

1. Build the static site:
   ```bash
   npm run build:static
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Customization

To customize the website content:

1. Edit the `pageData` object in `src/index.tsx` to update:
   - Personal information
   - Skills
   - Projects
   - Contact details

2. Modify CSS in `public/stylesheets/styles.css` to change the design

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web server framework
- **EmailJS** - Email service for the contact form
- **GitHub Pages** - Free hosting service
- **GitHub Actions** - CI/CD automation


