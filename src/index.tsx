import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Serve static files from the public directory 
app.use(express.static(path.join(__dirname, '../public')));

// Define interfaces for our data 
interface Project { 
  title: string;
  description: string;
  tech: string[];
  githubLink?: string;
  demoLink?: string;
  features?: string[];
  imageUrl?: string;
  projectNote?: string;
  acknowledgment?: string;
}

interface PageData {
  name: string;
  title: string;
  email: string;
  socialLinks: {
    linkedin: string;
    github: string;
    leetcode: string;
    twitter: string;
    instagram: string;
  };
  bio: string;
  skills: Array<{
    name: string;
    icon: string;
  }>;
  projects: Project[];
}

// Create a function to generate the HTML content
function generateHtml(data: PageData): string {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${data.name}</title>
  <link rel="stylesheet" href="/stylesheets/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script type="text/javascript" src="https://cdn.emailjs.com/dist/email.min.js?v=3.11"></script>
  <script src="/javascripts/clear-cache.js"></script>
  <script src="/javascripts/main.js?v=1.1" defer></script>
  <style>
    /* Additional inline styles to ensure images work well */
    .project-image-container {
      max-width: 100%;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .project-image {
      width: 100%;
      height: auto;
      display: block;
    }
    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    /* Contact form improvements */
    .contact-container {
      display: flex;
      gap: 30px;
      align-items: flex-start;
    }
    .contact-form {
      flex: 2;
      background: #fff;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }
    .contact-info-sidebar {
      flex: 1;
      background: #fff;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }
    .contact-method {
      margin-bottom: 25px;
    }
    /* Form status styling */
    .form-status {
      margin-top: 15px;
      padding: 10px;
      border-radius: 5px;
      font-weight: 500;
    }
    .form-status.success {
      background-color: #e7f7ed;
      color: #28a745;
    }
    .form-status.error {
      background-color: #f8d7da;
      color: #dc3545;
    }
    /* Ensure mobile responsiveness */
    @media (max-width: 768px) {
      .contact-container {
        flex-direction: column;
      }
      .contact-form, .contact-info-sidebar {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="layout">
      <div class="main-content">
        <div class="tab-navigation">
          <button class="tab-button active" data-tab="home">
            <i class="fas fa-home"></i> Home
          </button>
          <button class="tab-button" data-tab="projects">
            <i class="fas fa-code-branch"></i> Projects
          </button>
          <button class="tab-button" data-tab="skills">
            <i class="fas fa-cogs"></i> Skills
          </button>
          <button class="tab-button" data-tab="contact">
            <i class="fas fa-envelope"></i> Contact
          </button>
        </div>

        <div class="tab-content tab-home active">
          <div class="home-banner">
            <img src="/images/profile.jpg" alt="${data.name}" class="profile-image">
            <h1>${data.name}</h1>
            <div class="social-icons">
              <a href="${data.socialLinks.linkedin}" target="_blank" class="social-icon">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="${data.socialLinks.github}" target="_blank" class="social-icon">
                <i class="fab fa-github"></i>
              </a>
              <a href="${data.socialLinks.leetcode}" target="_blank" class="social-icon">
                <i class="fas fa-code"></i>
              </a>
              <a href="${data.socialLinks.twitter}" target="_blank" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="${data.socialLinks.instagram}" target="_blank" class="social-icon">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-building"></i>
                <span>Carnegie Mellon University</span>
              </div>
            </div>
          </div>

          <div class="about-section">
            <h2>About Me</h2>
            ${data.bio.split('\n\n').map(paragraph => 
              `<p>${paragraph}</p>`).join('')}
            <div class="home-cta">
              <button class="cta-button" onclick="document.querySelector('[data-tab=\\'contact\\']').click()">
                Contact Me
              </button>
            </div>
          </div>
        </div>

        <div class="tab-content tab-projects">
          <section>
            <h2>Projects</h2>
            ${data.projects.map((project, index) => `
              <div class="project">
                <h3>(${toRoman(index + 1)}) ${project.title}</h3>
                
                ${project.imageUrl ? 
                  `<div class="project-image-container">
                    <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
                  </div>` : ''}
                
                <p class="project-description">${project.description}</p>
                
                ${project.features ? `
                  <ul class="feature-list">
                    ${project.features.map(feature => 
                      `<li>${feature}</li>`).join('')}
                  </ul>
                ` : ''}
                
                ${project.acknowledgment ? 
                  `<p class="acknowledgment">${project.acknowledgment}</p>` : ''}
                
                ${project.projectNote ? 
                  `<div class="project-note">${project.projectNote}</div>` : ''}
                
                <div class="tech-stack">
                  ${project.tech.map(tech => 
                    `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                <div class="project-links">
                  ${project.githubLink ? 
                    `<a href="${project.githubLink}" target="_blank">GitHub</a>` : ''}
                  ${project.demoLink ? 
                    `<a href="${project.demoLink}" target="_blank">Demo</a>` : ''}
                </div>
              </div>
            `).join('')}
          </section>
        </div>

        <div class="tab-content tab-skills">
          <section class="skills-section">
            <h2>Skills</h2>
            <div class="skills-grid">
              ${data.skills.map(skill => `
                <div class="skill-item">
                  <i class="${skill.icon} skill-icon"></i>
                  <span class="skill-name">${skill.name}</span>
                </div>
              `).join('')}
            </div>
          </section>
        </div>

        <div class="tab-content tab-contact">
          <section class="contact-section">
            <h2>Get In Touch</h2>
            <p class="contact-intro">Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.</p>
            
            <div class="contact-container">
              <form id="contact-form" class="contact-form">
                <div class="contact-form-header">
                  <h3>Send Me a Message</h3>
                  <p>I'll respond to your message as soon as possible</p>
                </div>
                
                <div class="form-group-row">
                  <div class="form-group has-icon">
                    <label for="name">Full Name</label>
                    <i class="fas fa-user"></i>
                    <input type="text" id="name" name="from_name" placeholder="Your full name" required>
                  </div>
                  
                  <div class="form-group has-icon">
                    <label for="email">Email Address</label>
                    <i class="fas fa-envelope"></i>
                    <input type="email" id="email" name="email_id" placeholder="Your email address" required>
                  </div>
                </div>
                
                <div class="form-group has-icon">
                  <label for="subject">Subject</label>
                  <i class="fas fa-tag"></i>
                  <input type="text" id="subject" name="subject" placeholder="What is this regarding?" required>
                </div>
                
                <div class="form-group has-icon">
                  <label for="message">Your Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="Tell me about your project, question, or job opportunity..." required></textarea>
                </div>
                
                <button type="submit" id="submit-button" class="submit-button">
                  <i class="fas fa-paper-plane"></i> Send Message
                </button>
                
                <div id="form-status" class="form-status"></div>
              </form>
              
              <div class="contact-info-sidebar">
                <div class="contact-method">
                  <div class="icon-container">
                    <i class="fas fa-globe"></i>
                  </div>
                  <div class="contact-details">
                    <h3>Social & Web</h3>
                    <p>Connect with me on<br><a href="${data.socialLinks.linkedin}" target="_blank">LinkedIn</a> or <a href="${data.socialLinks.github}" target="_blank">GitHub</a></p>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="icon-container">
                    <i class="fas fa-clock"></i>
                  </div>
                  <div class="contact-details">
                    <h3>Response Time</h3>
                    <p>I typically respond within<br>24-48 business hours</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// Function to convert numbers to Roman numerals
function toRoman(num: number): string {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  let result = '';
  for (const { value, numeral } of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

// Create the main route handler
app.get('/', (req: Request, res: Response) => {
  const pageData: PageData = {
    name: 'Bel Ami Gisage Warakoze',
    title: 'Computer Science Student at Carnegie Mellon University',
    email: 'bgisagew@cmu.edu',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/belamigisagewarakoze',
      github: 'https://github.com/Belami02',
      leetcode: 'https://leetcode.com/bgisagew',
      twitter: 'https://twitter.com/BelGIsage',
      instagram: 'https://www.instagram.com/b___gw/',
    },
    bio: `I'm a sophomore at Carnegie Mellon University, majoring in Computer Science with a minor in Business Administration (Finance). My main interests lie in quantitative finance and building machine learning systems that solve real-world problems.

I grew up in Rwanda, where I first fell in love with math through competitions like PAMO, IMO, Euclid Contest, and Wits. That passion opened doors—eventually earning me a full scholarship to study at CMU, thanks to the Qatar Foundation.

Outside of academics, I keep things balanced. I'm a huge football fan, always down to catch a match with friends, and I never underestimate the power of a good nap. I enjoy reading, watching movies, and trying new experiences whenever I can. These moments help me stay grounded while navigating the intense but exciting world of math, tech and finance.`,

    skills: [
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'JavaScript', icon: 'fab fa-js' },
      { name: 'C/C++', icon: 'fas fa-code' },
      { name: 'R', icon: 'fab fa-r-project' },
      { name: 'React', icon: 'fab fa-react' },
      { name: 'React Native', icon: 'fab fa-react' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'TypeScript', icon: 'fab fa-js-square' },
      { name: 'Flask', icon: 'fas fa-flask' },
      { name: 'FastAPI', icon: 'fas fa-bolt' },
      { name: 'Machine Learning', icon: 'fas fa-brain' },
      { name: 'LLMs & AI', icon: 'fas fa-robot' },
      { name: 'Data Analysis', icon: 'fas fa-chart-bar' },
      { name: 'Research', icon: 'fas fa-search' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'SQLite', icon: 'fas fa-database' },
      { name: 'Azure', icon: 'fab fa-microsoft' },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'Git', icon: 'fab fa-git-alt' },
      { name: 'Linux', icon: 'fab fa-linux' },
      { name: 'Problem Solving', icon: 'fas fa-puzzle-piece' },
      { name: 'Team Collaboration', icon: 'fas fa-users' },
      { name: 'Mathematics', icon: 'fas fa-square-root-alt' },
      { name: 'Cloud', icon: 'fas fa-cloud' }
    ],
    
    projects: [
      {
        title: 'Scheduling System',
        description: 'A comprehensive scheduling system API built with FastAPI and MongoDB ' +
          'that allows users to manage bookings, courses, roles, tutor availabilities, ' +
          'and users. <i>(Note: This was a learning project to study modern API ' +
          'development techniques)</i>',
        features: [
          'Implemented RESTful API endpoints using FastAPI for creating, reading, ' +
          'and deleting resources',
          'Designed and structured MongoDB collections with Pydantic models for ' +
          'data validation',
          'Set up asynchronous database operations using motor for improved performance'
        ],
        tech: ['Python', 'FastAPI', 'MongoDB', 'Motor', 'Pydantic', 'Docker'],
        githubLink: 'https://github.com/Belami02/scheduling-system',
        imageUrl: '/images/scheduling.png'
      },
      {
        title: 'DevFolio',
        description: 'A highly customizable React-based portfolio theme specifically ' +
          'designed for software engineers and developers to showcase their projects ' +
          'and skills.',
        features: [
          'Built a modular component system allowing full customization of layout, ' +
          'colors, and typography',
          'Implemented dark/light mode toggle with theme persistence using local storage',
          'Added GitHub integration to automatically fetch and display repository ' +
          'statistics'
        ],
        tech: ['React', 'JavaScript', 'Tailwind CSS', 'GitHub API', 'Framer Motion', 'EmailJS'],
        githubLink: 'https://github.com/Belami02/portfolio',
        demoLink: 'https://belami02.github.io/portfolio/',
        imageUrl: '/images/portfolio.png'
      },
      {
        title: 'Reconnect',
        description: 'A digital platform built for CMUQ\'s Lifelines hackathon that ' +
          'connects people searching for missing persons, pets, and items through ' +
          'community collaboration.',
        features: [
          'Created a user and posts database with authentication system and post ' +
          'management features',
          'Implemented geolocation integration with interactive maps showing pins of ' +
          'reported locations',
          'Developed community channels/threads for each listing to enable real-time ' +
          'collaboration'
        ],
        tech: ['Reflex', 'Python', 'SQLite', 'JavaScript', 'Geolocation API'],
        githubLink: 'https://github.com/Mohamed-Waiel-Shikfa/LifelinesS25',
        imageUrl: '/images/reconnect.png'
      },
      {
        title: 'TriagerX',
        description: 'An AI-powered issue management system developed by the Eclipse ' +
          'Adoptium working group that won the IBM Center for Advanced Studies Project ' +
          'of the Year 2024 award. This system helps automate GitHub issue triaging by ' +
          'using a Slack chatbot and AI analysis for the AQA Test Tools. The system ' +
          'uses machine learning to look at issue content and history to suggest which ' +
          'team should handle it, making issue management much easier for large ' +
          'open-source projects.',
        features: [
          'Contributed to integrating multiple AI models (ChatGPT, Gemini, LLaMA-3) ' +
          'to improve the core TriagerX system',
          'Built the server using FastAPI and created the Slack interface for the ' +
          'Adoptium team',
          'Developed a chatbot interface that is now used by IBM Runtime Technologies ' +
          'and Eclipse OpenJ9 teams',
          'Collaborated with Diyorbek Ibragimov, George Chkhaidze, Fatima Al Kharaz, ' +
          'and Lujain Hasna.',
        ],
        acknowledgment: 'This work would not have been possible without the mentorship ' +
          'and guidance from industry experts who provided technical direction and ' +
          'support throughout the project lifecycle.' +
          '<br><br>' +
          '<b>Credits:</b> Mentored by <a href="https://www.linkedin.com/in/giasuddin/" ' +
          'target="_blank">Prof. Gias Uddin</a>\'s team at York University, ' +
          '<a href="https://www.linkedin.com/in/lanxia/" target="_blank">Lan Xia</a> ' +
          '(Technical Lead, IBM), <a href="https://www.linkedin.com/in/longyuzhang/" ' +
          'target="_blank">Longyu Zhang</a> (IBM), ' +
          '<a href="https://www.linkedin.com/in/shelley-lambert-6120961/" ' +
          'target="_blank">Shelley Lambert</a> (Red Hat), ' +
          '<a href="https://www.linkedin.com/in/stephenrwalli/" target="_blank">' +
          'Stephen Walli</a> (Microsoft), and ' +
          '<a href="https://www.linkedin.com/in/eduardo-feo/" target="_blank">' +
          'Prof. Eduardo Feo Flushing</a> (CMUQ).',
        projectNote: '<i>Learn more about this project in the <a href="https://lassonde.yorku.ca/' +
          'ibm-recognizes-lassonde-professor-for-project-of-the-year-achievements" ' +
          'target="_blank">IBM TechXchange announcement</a>.</i>',
        tech: ['Python', 'FastAPI', 'Slack API', 'OpenAI API', 'Gemini API', 'Hugging Face', 'LLaMA-3', 'GitHub API', 'Flask'],
        githubLink: 'https://github.com/adoptium/aqa-test-tools',
        imageUrl: '/images/triagerx.png'
      },
      {
        title: 'Euro Prediction',
        description: 'A machine learning-based prediction system for European football ' +
          'championship matches that analyzes historical team performance, player ' +
          'statistics, and match conditions.',
        features: [
          'Built data collection pipelines that scrape and process match data from ' +
          'multiple sources',
          'Implemented ensemble ML models combining gradient boosting and neural ' +
          'networks for prediction',
          'Designed an interactive dashboard to visualize predictions and historical ' +
          'accuracy'
        ],
        tech: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost', 'BeautifulSoup', 'Flask', 'D3.js'],
        githubLink: 'https://github.com/Belami02/euro-prediction',
        imageUrl: '/images/europrediction.png'
      },
      {
        title: 'Rubiks Cube Game',
        description: 'This is an arcade puzzle game, inspired by the Rubiks Cube, that uses isometric projection to display the cube both in 2D and 3D. This project had 2000+ lines of code.',
        features: [
          'Developed for the "Introduction to Programming and Computer Science" course at Carnegie Mellon',
          'Implemented 3D rotation algorithms and color tracking with intuitive controls for cube manipulation',
          'Awarded "Best Interface Award" by Professor Eduardo Feo Flushing'
        ],
        tech: ['Python', 'CMU Graphics Library', 'CSV', 'PIL'],
        githubLink: 'https://github.com/Belami02/rubiks-cube-game-CMU-15112',
        imageUrl: '/images/rubiks.png'
      }
    ]
  };

  const html = generateHtml(pageData);
  res.send(html);
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export the server so it can be closed by the static generator
module.exports = server;