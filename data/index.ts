
interface WebsiteInfo {
  title: string;
  description: string;
  author: string;
  jobTitle: string;
  profileImage: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
}

interface HeroContent {
  subtitle: string;
  title: {
    firstName: string;
    lastName: string;
  };
  description: string;
  ctaText: string;
  contactText: string;
  scrollText: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: string; // Icon name as string
}

interface SocialLink {
  name: string;
  url: string;
  icon: string; // Icon name as string
}

interface ProjectsContent {
  sectionTitle: string;
  subtitle: string;
  description: string;
  filterLabels: {
    all: string;
    featured: string;
  };
  githubUsername: string;
}

interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link?: string;
  featured: boolean;
  githublink?: string;
}

interface Education {
  title: string;
  institution: string;
  duration: string;
  description: string;
}

interface AboutContent {
  sectionTitle: string;
  subtitle: string;
  description: string;
  tabLabels: {
    experience: string;
    education: string;
  };
  skillsTitle: string;
  experienceTitle: string;
  educationTitle: string;
  resumeButtonText: string;
  contactButtonText: string;
}

interface ContactContent {
  sectionTitle: string;
  subtitle: string;
  description: string;
  formLabels: {
    name: string;
    email: string;
    message: string;
    submit: string;
  };
  submittingText: string;
  socialHeading: string;
  contactInfo: {
    title: string;
    email: {
      label: string;
      value: string;
    };
    phone: {
      label: string;
      value: string;
    };
    location: {
      label: string;
      value: string;
    };
  };
  formStatus: {
    success: string;
    error: string;
  };
  emailJs: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
}

interface FooterContent {
  aboutColumn: {
    title: string;
    description: string;
  };
  quickLinks: {
    title: string;
    links: Array<{ label: string; href: string; }>;
  };
  servicesColumn: {
    title: string;
    services: string[];
  };
  legalLinks: Array<{ label: string; href: string; }>;
  copyright: string;
}

interface LegalContent {
  privacy: {
    title: string;
    lastUpdated: string;
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
      listItems?: string[];
    }>;
  };
  terms: {
    title: string;
    lastUpdated: string;
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
      listItems?: string[];
    }>;
  };
  cookies: {
    title: string;
    lastUpdated: string;
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
      listItems?: string[];
    }>;
  };
}

// General website information
export const websiteInfo: WebsiteInfo = {
  title: "Orvith - Creative Developer",
  description: "Portfolio of Orvith, a creative developer specializing in web development, UI/UX design, and more.",
  author: "Sharan",
  jobTitle: "Full Stack Developer",
  profileImage: "/spider.jpg",
  contactEmail: "rajeevansharan@gmail.com",
  contactPhone: "+94 77 299 5460",
  contactLocation: "Jaffna, SriLanka"
};

// Hero section content
export const heroContent: HeroContent = { 
  subtitle: "Welcome to My Portfolio",
  title: {
    firstName: "Rajeevan",
    lastName: "Sharan"
  },
  description: "Passionate about leveraging Software and Full-Stack Development to build scalable, innovative solutions. Currently pursuing a Bachelor of Science in Information Technology at the University of Moratuwa.",
  ctaText: "View Projects",
  contactText: "Contact Me",
  scrollText: "Scroll Down"
};

// Navigation items for sidebar - using icon names as strings
export const navItems: NavItem[] = [
  { name: "Home", href: "#home", icon: "IconHome" },
  { name: "Projects", href: "#projects", icon: "IconBriefcase" },
  { name: "About", href: "#about", icon: "IconUser" },
  { name: "Contact", href: "#contact", icon: "IconMessage" }, 
];

// Social media links - customize your social media URLs here
export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/rajeevansharan", icon: "IconBrandGithub" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/rajeevan-sharan-a1565927b/", icon: "IconBrandLinkedin" },
  { name: "FaceBook", url: "https://www.facebook.com/share/19dpXGBdhc/", icon: "IconBrandFacebook" }
];

// Projects section content
export const projectsContent: ProjectsContent = {
  sectionTitle: "Projects",
  subtitle: "MY LATEST WORK",
  description: "Explore my recent projects showcasing my skills in web development, user experience design, and creative problem-solving.",
  filterLabels: {
    all: "All",
    featured: "Featured"
  },
  githubUsername: "yourusername"
};

// Project items
export const projects: Project[] = [
  {
    id: 1,
    title: "Automatic Medicine Dispenser",
    des: "A microcontroller-based device that automates medication management by dispensing accurate doses at scheduled times. It includes temperature monitoring, caregiver notifications, and LED guidance for ease of use.",
    img: "/Project1.jpg",
    iconLists: [],
    link: "",
    featured: false,
    githublink: ""
  },
  {
    id: 2,
    title: "Learning Management System",
    des: "Developed a Learning Management System (LMS) for the Mahapola Port & Maritime Academy to replace its manual system. Built the Administrator and Student Dashboards with features for course management, lecturer/student assignment, and attendance tracking. ",
    img: "/Project2.png",
    iconLists: ["next", "tail", "ts", "boot", ],
    featured: true
    , githublink: ""
  },
  {
    id: 3,
    title: "Personal Contact Book",
    des: "A simple yet comprehensive web application built with Spring Boot for managing personal contacts. Demonstrates Spring Boot concepts including MVC architecture, JPA data persistence, Thymeleaf templating, RESTful endpoints, Dockerized deployment, pagination and responsive web design.",
    img: "/Project3.png",
    iconLists: ["boot" , "html" ,  "bootstrap" , "postgresql"], 
    featured: false
    , githublink: "https://github.com/rajeevansharan/PersonalContactBook"
  },
  {
    id: 4,
    title: "Restaurant Management System",
    des: "Developing a comprehensive restaurant management system to digitize core restaurant operations including menu management, order processing, and user authentication.",
    img: "/Project4.png",
    iconLists: ["boot", "MySql", ],
    featured: false
    , githublink: "https://github.com/rajeevansharan/SimpleRestaurantManagementSystem"
  },
];


// Contact section content
export const contactContent: ContactContent = {
  sectionTitle: "Contact Me",
  subtitle: "GET IN TOUCH",
  description: "Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you. Fill out the form below and I'll get back to you as soon as possible.",
  formLabels: {
    name: "Your Name",
    email: "Your Email",
    message: "Your Message",
    submit: "Send Message"
  },
  submittingText: "Sending...",
  contactInfo: {
    title: "Contact Information",
    email: {
      label: "Email",
      value: "rajeevansharan@gmail.com"
    },
    phone: {
      label: "Phone",
      value: "+94 77 299 5460"
    },
    location: {
      label: "Location",
      value: "Jaffna, SriLanka"
    }
  },
  socialHeading: "Connect",
  formStatus: {
    success: "Your message has been sent successfully!",
    error: "There was an error sending your message. Please try again."
  },
  emailJs: {
    serviceId: "YOUR SERVICE KEY",
    templateId: "YOUR TEMPLATE ID",
    publicKey: "YOUR PUBLIC KEY"
  }
};

// List of skills for the skills section
export const skills = [
  "Java", "Next.js", "TypeScript", "JavaScript", 
  "HTML/CSS", "Tailwind CSS", "Node.js", "Daisy UI", 
  "React", "UI/UX Design", "Figma"
];

// About section content
export const aboutContent: AboutContent = {
  sectionTitle: "About Me",
  subtitle: "MY BACKGROUND",
  description: "I am Rajeevan Sharan. I am passionate about learning and exploring new ideas. I enjoy finding creative ways to solve problems and love building things that can make a positive impact. I am curious, motivated, and always eager to grow.",
  tabLabels: {
    experience: "Experience",
    education: "Education"
  },
  skillsTitle: "My Skills",
  experienceTitle: "Professional Experience",
  educationTitle: "Education",
  resumeButtonText: "Download Resume",
  contactButtonText: "Contact Me"
};

// Education data for the education/experience toggle section
export const educationData: Education[] = [
  {
    title: "Bachelor of Science in Information Technology",
    institution: "University of Moratuwa",
    duration: "2023 - 2027",
    description: ""
  },
  {
    title: "G.C.E. Advanced Level – Mathematics Stream (2AB)",
    institution: "J/Kokuvil Hindu College",
    duration: "2022",
    description: ""
  }
];


// Footer content
export const footerContent: FooterContent = {
  aboutColumn: {
    title: "About",
    description: "I'm Orvith, a creative developer specializing in crafting exceptional digital experiences with modern web technologies."
  },
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#home" },
      { label: "Projects", href: "#projects" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" }
    ]
  },
  servicesColumn: {
    title: "Services",
    services: [
      "Web Development", 
      "UI/UX Design", 
      "API Development",
      "Tech Consultation",
      "Digital Marketing"
    ]
  },
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookies", href: "/cookies" }
  ],
  copyright: `© ${new Date().getFullYear()} All rights reserved.`
};



