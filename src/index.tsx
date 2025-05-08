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
  type: string;
  featured: boolean;
  bullets: string[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

interface Skill {
  name: string;
  icon: string;
  type: string;
}

interface Social {
  platform: string;
  icon: string;
  url: string;
}

interface Service {
  name: string;
  description: string;
  pricing: string;
  features: string[];
}

interface PageData {
  name: string;
  title: string;
  email: string;
  bio: string;
  skills: Skill[];
  projects: Project[];
  services: Service[];
  socials: Social[];
  contactFormUrl: string;
}

// Helper function to get the correct Font Awesome icon with appropriate prefix
function getBrandedIcon(icon: string): string {
  // Icons that should use the 'brands' prefix (fab)
  const brandIcons = ['python', 'js', 'r-project', 'ts', 'react', 'html5', 'node-js', 'docker', 'git-alt', 'linux', 'microsoft'];
  
  // Use 'fab' for brand icons, 'fas' for regular icons
  const prefix = brandIcons.includes(icon) ? 'fab' : 'fas';
  return `<i class="${prefix} fa-${icon}"></i>`;
}

// Create a function to generate the HTML content
function generateHtml(data: PageData): string {
  // Get unique skill categories
  const skillCategories = Array.from(new Set(data.skills.map(skill => skill.type)));

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${data.name} | Portfolio</title>
  <link rel="stylesheet" href="/stylesheets/styles.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <div class="wrapper">
    <div class="layout">
      <div class="main-content">
        <!-- Home Section -->
        <section id="home" class="home-section">
          <div class="home-content">
            <h1>Hello, I'm ${data.name}.</h1>
            <p class="intro">
              I'm a <b>rising junior at Carnegie Mellon University</b>, studying Computer Science with a minor in Business Administration (Finance), supported by a full scholarship from the Qatar Foundation. I'm deeply interested in <b>quantitative finance</b> and <b>machine learning systems</b> that solve real-world problems.
            </p>
            <p>
              I hold honorary awards from international math competitions including <a href="https://www.africanmathunion.org/pamo" target="_blank">PAMO</a>, <a href="https://www.imo-official.org/participant_r.aspx?id=31836" target="_blank">IMO</a>, Euclid, and Wits, which sparked my early passion for problem-solving. Currently, I'm working with Professor Hasan Demirkoparan at CMU on applying machine learning to improve the solution of boundary value problems (BVPs).
            </p>
            <p>
              Outside academics, I enjoy football, reading, and exploring new experiences that keep me grounded and curious.
            </p>
          </div>
          <div class="profile-container">
            <img src="/images/profile.jpg" alt="${data.name}" class="profile-image">
            <div class="social-links">
              ${data.socials.map(social => `
                <a href="${social.url}" target="_blank" class="social-link" title="${social.platform}">
                  <i class="fa-brands fa-${social.icon}"></i>
                </a>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="skills">
          <h2>Skills</h2>
          
          <!-- Skill Category Tabs -->
          <div class="skill-tabs">
            ${skillCategories.map((category, index) => `
              <button class="skill-tab ${index === 0 ? 'active' : ''}" data-category="${category}">${category}</button>
            `).join('')}
          </div>
          
          <!-- Skill Category Content -->
          ${skillCategories.map((category, index) => `
            <div class="skill-content ${index === 0 ? 'active' : ''}" data-category="${category}">
              <div class="skills-grid">
                ${data.skills.filter(skill => skill.type === category).map(skill => `
                  <div class="skill-item">
                    <span class="skill-icon">${getBrandedIcon(skill.icon)}</span>
                    <span class="skill-name">${skill.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </section>

        <!-- Projects Section -->
        <section id="projects">
          <h2>Projects</h2>
          <div class="project-tabs">
            <button class="project-tab active" data-tab="featured">Featured</button>
            <button class="project-tab" data-tab="past">Past Projects</button>
          </div>
          
          <!-- Featured Projects -->
          <div class="projects-grid featured-projects">
            ${data.projects.filter(project => project.featured).map(project => {
              // Determine image path based on project title
              let imagePath = "";
              if (project.title === "TriagerX") {
                imagePath = "/images/triagerx.png";
              } else if (project.title === "Reconnect") {
                imagePath = "/images/reconnect.png";
              } else if (project.title === "Caching Web Proxy") {
                imagePath = "/images/private.png";
              } else if (project.title === "Rubiks Cube Game") {
                imagePath = "/images/rubiks.png";
              }
              
              return `
              <div class="project">
                ${imagePath ? `<img src="${imagePath}" alt="${project.title}" class="project-image">` : ''}
                <h3>${project.title}</h3>
                <div class="project-type">${project.type}</div>
                <div class="project-description">${project.description}</div>
                <ul class="project-bullets">
                  ${project.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
                <div class="project-tech-tags">
                  ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                  `).join('')}
                </div>
                <div class="project-links">
                  ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link github"><i class="fab fa-github"></i> GitHub</a>` : ''}
                  ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="project-link demo"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
              </div>
            `;}).join('')}
          </div>
          
          <!-- Past Projects -->
          <div class="projects-grid past-projects" style="display: none;">
            ${data.projects.filter(project => !project.featured).map(project => {
              // Determine image path based on project title
              let imagePath = "";
              if (project.title === "Scheduling System") {
                imagePath = "/images/scheduling.png";
              } else if (project.title === "DevFolio") {
                imagePath = "/images/portfolio.png";
              } else if (project.title === "Unix Shell") {
                imagePath = "/images/private.png";
              } else if (project.title === "C0VM") {
                imagePath = "/images/private.png";
              } else if (project.title === "Euro Prediction") {
                imagePath = "/images/europrediction.png";
              }
              
              return `
              <div class="project">
                ${imagePath ? `<img src="${imagePath}" alt="${project.title}" class="project-image">` : ''}
                <h3>${project.title}</h3>
                <div class="project-type">${project.type}</div>
                <div class="project-description">${project.description}</div>
                <ul class="project-bullets">
                  ${project.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
                <div class="project-tech-tags">
                  ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                  `).join('')}
                </div>
                <div class="project-links">
                  ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link github"><i class="fab fa-github"></i> GitHub</a>` : ''}
                  ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="project-link demo"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
              </div>
            `;}).join('')}
          </div>
        </section>
        
        <!-- Contact Section -->
        <section id="contact">
          <h2>Contact</h2>
          <div class="contact-content">
            <div class="contact-text">
              <p>I'm currently open to collaboration opportunities, research projects, and discussions about quantitative finance or AI applications. Please connect with me through any of the platforms below.</p>
              <div class="contact-social">
                ${data.socials.map(social => `
                  <a href="${social.url}" target="_blank" class="contact-social-link">
                    <i class="fa-brands fa-${social.icon}"></i>
                    <span>${social.platform}</span>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Project tabs functionality
      const projectTabButtons = document.querySelectorAll('.project-tab');
      const featuredProjects = document.querySelector('.featured-projects');
      const pastProjects = document.querySelector('.past-projects');
      
      projectTabButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remove active class from all buttons
          projectTabButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Show/hide appropriate projects
          if (this.getAttribute('data-tab') === 'featured') {
            featuredProjects.style.display = 'flex';
            pastProjects.style.display = 'none';
          } else {
            featuredProjects.style.display = 'none';
            pastProjects.style.display = 'flex';
          }
        });
      });
      
      // Skills tabs functionality
      const skillTabButtons = document.querySelectorAll('.skill-tab');
      const skillContents = document.querySelectorAll('.skill-content');
      
      skillTabButtons.forEach(button => {
        button.addEventListener('click', function() {
          const category = this.getAttribute('data-category');
          
          // Remove active class from all buttons and contents
          skillTabButtons.forEach(btn => btn.classList.remove('active'));
          skillContents.forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked button and corresponding content
          this.classList.add('active');
          document.querySelector('.skill-content[data-category="' + category + '"]').classList.add('active');
        });
      });
    });
  </script>
</body>
</html>`;
}

// Helper function for Roman numerals
function toRoman(num: number): string {
  const romanNumerals: { [key: number]: string } = {
    1: 'I', 4: 'IV', 5: 'V', 9: 'IX',
    10: 'X', 40: 'XL', 50: 'L', 90: 'XC',
    100: 'C', 400: 'CD', 500: 'D', 900: 'CM', 1000: 'M'
  };
  
  let result = '';
  const keys = Object.keys(romanNumerals).map(Number).sort((a, b) => b - a);
  
  for (const key of keys) {
    while (num >= key) {
      result += romanNumerals[key];
      num -= key;
    }
  }
  
  return result;
}

// Define the page data
const pageData: PageData = {
  name: "Bel Ami Gisage Warakoze",
  title: "Computer Science Student",
  email: "belami@example.com",
  bio: "I'm a sophomore at Carnegie Mellon University, majoring in Computer Science with a minor in Business Administration (Finance). My main interests lie in quantitative finance and building machine learning systems that solve real-world problems.",
  socials: [
    { platform: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/belamigisagewarakoze/" },
    { platform: "GitHub", icon: "github", url: "https://github.com/Belami02" },
    { platform: "X", icon: "twitter", url: "https://twitter.com/BelGisage" },
    { platform: "Instagram", icon: "instagram", url: "https://www.instagram.com/b___gw/" },
  ],
  skills: [
    // Programming Languages
    { name: "Python", icon: "python", type: "Programming Languages" },
    { name: "JavaScript", icon: "js", type: "Programming Languages" },
    { name: "C/C++", icon: "c", type: "Programming Languages" },
    { name: "R", icon: "r-project", type: "Programming Languages" },
    { name: "TypeScript", icon: "ts", type: "Programming Languages" },
    { name: "SML", icon: "code", type: "Programming Languages" },
    
    // Frontend
    { name: "React", icon: "react", type: "Frontend" },
    { name: "React Native", icon: "react", type: "Frontend" },
    { name: "HTML/CSS", icon: "html5", type: "Frontend" },
    
    // Backend
    { name: "Node.js", icon: "node-js", type: "Backend" },
    { name: "Flask", icon: "flask", type: "Backend" },
    { name: "FastAPI", icon: "bolt", type: "Backend" },
    
    // Data & AI
    { name: "Machine Learning", icon: "brain", type: "Data & AI" },
    { name: "LLMs & AI", icon: "robot", type: "Data & AI" },
    { name: "Data Analysis", icon: "chart-bar", type: "Data & AI" },
    { name: "Research", icon: "microscope", type: "Data & AI" },
    
    // Databases
    { name: "MongoDB", icon: "database", type: "Databases" },
    { name: "SQLite", icon: "database", type: "Databases" },
    
    // DevOps & Tools
    { name: "Azure", icon: "microsoft", type: "DevOps & Tools" },
    { name: "Docker", icon: "docker", type: "DevOps & Tools" },
    { name: "Git", icon: "git-alt", type: "DevOps & Tools" },
    { name: "Linux", icon: "linux", type: "DevOps & Tools" }
  ],
  projects: [
    {
      title: "TriagerX",
      type: "AI Project",
      featured: true,
      description: "An AI-powered issue management system developed by the Eclipse Adoptium working group that won the IBM Center for Advanced Studies Project of the Year 2024 award.",
      bullets: [
        "Contributed to integrating multiple AI models (ChatGPT, Gemini, LLaMA-3) to improve the core TriagerX system",
        "Built the server using FastAPI and created the Slack interface for the Adoptium team",
        "Developed a chatbot interface that is now used by IBM Runtime Technologies and Eclipse OpenJ9 teams",
        "Collaborated with Diyorbek Ibragimov, George Chkhaidze, Fatima Al Kharaz, and Lujain Hasna"
      ],
      technologies: ["Python", "FastAPI", "Slack API", "OpenAI API", "Gemini API", "Hugging Face", "LLaMA-3", "GitHub API", "Flask"],
      githubUrl: "https://github.com/adoptium/aqa-test-tools"
    },
    {
      title: "Reconnect",
      type: "Hackathon Project",
      featured: true,
      description: "A digital platform built for CMUQ's Lifelines hackathon that connects people searching for missing persons, pets, and items through community collaboration.",
      bullets: [
        "Created a user and posts database with authentication system and post management features",
        "Implemented geolocation integration with interactive maps showing pins of reported locations",
        "Developed community channels/threads for each listing to enable real-time collaboration"
      ],
      technologies: ["Reflex", "Python", "SQLite", "JavaScript", "Geolocation API"],
      githubUrl: "https://github.com/Belami02/LifelinesS25",
      demoUrl: "https://youtu.be/rmGD_IhsRmc"
    },
    {
      title: "Caching Web Proxy",
      type: "15-213: Intro to Computer Systems",
      featured: true,
      description: "A concurrent web proxy server that caches web content to improve load times for repeated requests.",
      bullets: [
        "Developed a concurrent, thread-based server to enable anonymous client-server communication",
        "Implemented an LRU-based cache using a doubly-linked list to associate a request URI with a server response"
      ],
      technologies: ["C", "Git", "Threads", "Networking", "Caching Algorithms"],
    },
    {
      title: "Rubiks Cube Game",
      type: "Game Development",
      featured: true,
      description: "An arcade puzzle game, inspired by the Rubiks Cube, that uses isometric projection to display the cube both in 2D and 3D. This project had 2000+ lines of code.",
      bullets: [
        "Developed for the \"Introduction to Programming and Computer Science\" course at Carnegie Mellon",
        "Implemented 3D rotation algorithms and color tracking with intuitive controls for cube manipulation",
        "Awarded \"Best Interface Award\" by Professor Eduardo Feo Flushing"
      ],
      technologies: ["Python", "CMU Graphics Library", "CSV", "PIL"],
      demoUrl: "https://www.youtube.com/watch?v=6Zqn3_BwyEw"
    },
    {
      title: "Euro Prediction",
      type: "Machine Learning",
      featured: false,
      description: "A machine learning-based prediction system for European football championship matches that analyzes historical team performance, player statistics, and match conditions.",
      bullets: [
        "Built data collection pipelines that scrape and process match data from multiple sources",
        "Implemented ensemble ML models combining gradient boosting and neural networks for prediction",
        "Designed an interactive dashboard to visualize predictions and historical accuracy"
      ],
      technologies: ["Python", "Scikit-learn", "Pandas", "XGBoost", "BeautifulSoup", "Flask", "D3.js"],
      githubUrl: "https://github.com/belamigw/euro-prediction"
    },
    {
      title: "Unix Shell",
      type: "15-213: Intro to Computer Systems",
      featured: false,
      description: "A shell implementation that mimics the Linux shell with job control and signal handling capabilities.",
      bullets: [
        "Developed a shell to mimic the real Linux shell with custom signal handlers and reading and writing to files",
        "Implemented job control to run processes in the foreground or background and switch between them"
      ],
      technologies: ["C", "Git", "Unix", "Process Management", "Signal Handling"],
    },
    {
      title: "C0VM",
      type: "15-122: Principles of Imperative Computation",
      featured: false,
      description: "A virtual machine implementation for the C0 programming language, a subset of C used for teaching.",
      bullets: [
        "Developed a stack-based C0 virtual machine, using the C programming language for executing C0 programs",
        "Translated C0 expressions into instructions, simulating a compiler"
      ],
      technologies: ["C", "Git", "Virtual Machines", "Compilers", "Interpreters"],
    },
    {
      title: "Scheduling System",
      type: "Backend Development",
      featured: false,
      description: "A comprehensive scheduling system API built with FastAPI and MongoDB that allows users to manage bookings, courses, roles, tutor availabilities, and users.",
      bullets: [
        "Implemented RESTful API endpoints using FastAPI for creating, reading, and deleting resources",
        "Designed and structured MongoDB collections with Pydantic models for data validation",
        "Set up asynchronous database operations using motor for improved performance"
      ],
      technologies: ["Python", "FastAPI", "MongoDB", "Motor", "Pydantic", "Docker"],
      githubUrl: "https://github.com/belamigw/scheduling-system"
    },
    {
      title: "DevFolio",
      type: "Web Development",
      featured: false,
      description: "A highly customizable React-based portfolio theme specifically designed for software engineers and developers to showcase their projects and skills.",
      bullets: [
        "Built a modular component system allowing full customization of layout, colors, and typography",
        "Implemented dark/light mode toggle with theme persistence using local storage",
        "Added GitHub integration to automatically fetch and display repository statistics"
      ],
      technologies: ["React", "JavaScript", "Tailwind CSS", "GitHub API", "Framer Motion", "EmailJS"],
      demoUrl: "https://belami02.github.io/portfolio/"
    }
  ],
  services: [], // Empty services as requested
  contactFormUrl: ""
};

// Handle routes
app.get('/', (req: Request, res: Response) => {
  res.send(generateHtml(pageData));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;