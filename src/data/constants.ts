// ── Shared Social Links & Site Data ──
// Single source of truth — update URLs here only.

export interface NavItem {
  label: string;
  targetId: string;
}

export interface AboutHighlight {
  id: string;
  title: string;
  description?: string;
  isInfoList?: boolean;
}

export interface InfoItem {
  label: string;
  value: string;
  href?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  date: string;
  summary: string;
  highlights: string[];
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  focusTag: string;
  projectHighlight: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  featured?: boolean;
}

export const SOCIAL_LINKS = {
  github:    'https://github.com/SohailShabbir867',
  linkedin:  'https://www.linkedin.com/in/sohail-shabbir-546a12375/',
  facebook:  'https://www.facebook.com/share/1aeJrN99UA/',
  instagram: 'https://www.instagram.com/sohailshabbir04',
  whatsapp:  'https://wa.me/923291729925',
  tiktok:    'https://www.tiktok.com/@sohail.shabeer4',
  email:     'mailto:sohailshabbir2005@gmail.com',
};

export const SITE_DATA = {
  brandFirst:  'Dev',
  brandSecond: 'Sohail',
  firstName:   'Sohail',
  lastName:    'Shabbir',
  name:        'Sohail Shabbir',
  email:     'sohailshabbir2005@gmail.com',
  phone:     '+92 329 1729925',
  location:  'Rahim Yar Khan, Pakistan',
  domain:    'https://devsohail.tech',
  cv:        'https://drive.google.com/file/d/1kcXV6ug3PhmZGFPTqi37Az63yUPnpKi4/view?usp=sharing',
  blogSite:  'https://dailyblogs.website/',
};

export const STATS = [
  { value: '2+',  label: 'Years Experience' },
  { value: '10+', label: 'MERN Projects'    },
  { value: '30+', label: 'Happy Clients'    },
];

export const ROLES = [
  'Full Stack MERN Developer',
  'TypeScript MCP Server Engineer',
  'React.js & Node.js Developer',
  'AI & Web Integration Developer',
  'MongoDB & Express Architect',
  'UI/UX & Frontend Engineer',
];

export const ABOUT_INTRO =
  'Building scalable MERN web apps, AI integrations, and TypeScript MCP servers.';

export const ABOUT_HIGHLIGHTS: AboutHighlight[] = [
  {
    id: 'who-am-i',
    title: 'Who Am I?',
    description:
      'I am Sohail Shabbir, a Full Stack MERN Developer based in Rahim Yar Khan, Pakistan, focused on building fast, scalable, and user-centric web products with MongoDB, Express.js, React.js, and Node.js.',
  },
  {
    id: 'ai-mcp',
    title: 'AI & TypeScript MCP Architecture',
    description:
      'I integrate practical AI workflows into modern web platforms and engineer high-performance TypeScript Model Context Protocol (MCP) servers alongside clean REST APIs and real-time backends.',
  },
  {
    id: 'personal-details',
    title: 'Personal Details',
    isInfoList: true,
  },
];

export const ABOUT_INFO_ITEMS: InfoItem[] = [
  { label: 'Name',    value: 'Sohail Shabbir' },
  { label: 'Email',   value: 'sohailshabbir2005@gmail.com', href: 'mailto:sohailshabbir2005@gmail.com' },
  { label: 'Phone',   value: '+92 329 1729925',            href: 'tel:+923291729925' },
  { label: 'Country', value: 'Pakistan' },
  { label: 'City',    value: 'Rahim Yar Khan' },
];

export const EDUCATION_INTRO =
  'My formal academic foundation in Software Engineering and Computer Science — building core expertise in full-stack development, problem solving, and system architecture.';

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'BS in Software Engineering',
    institution: 'The Islamia University of Bahawalpur',
    date: '2025 – Present',
    summary:
      'Specializing in Full Stack MERN Development (MongoDB, Express.js, React.js, Node.js), REST APIs, and database management while actively participating in coding competitions, hackathons, and developer workshops.',
    highlights: [
      'Specializing in Full Stack MERN Development — MongoDB, Express.js, React.js, Node.js.',
      'Building real-world projects using the MERN stack with REST APIs and database management.',
      'Actively participating in coding competitions, hackathons, and developer workshops.',
    ],
    featured: true,
  },
  {
    degree: 'Intermediate in ICS',
    institution: 'Punjab College of Science Zahir Peer',
    date: '2023 – 2025',
    summary:
      'Studied Mathematics, Physics, and Computer Science for engineering preparation, achieving strong academic results and actively engaging in science clubs.',
    highlights: [
      'Studied Mathematics and Physics for engineering preparation.',
      'Achieved high grades and actively engaged in science clubs.',
    ],
  },
  {
    degree: 'Matriculation in Science',
    institution: 'Government High School Jajjah Abbasina',
    date: '2019 – 2021',
    summary:
      'Focused on Computer Science and general sciences, participating in technology fairs and inter-school academic competitions.',
    highlights: [
      'Focused on Computer Science and general sciences.',
      'Participated in technology fairs and inter-school competitions.',
    ],
  },
];

export const EXPERIENCE_INTRO =
  'Selected work across full-stack engineering and frontend product development.';

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'blizon-technologies',
    role: 'Software Engineer',
    company: 'Blizon Technologies',
    focusTag: 'Full-Stack & AI',
    projectHighlight: 'C17 Speed-to-Lead',
    featured: true,
    summary:
      'Contributing to full-stack web applications, business automation systems, and AI-powered solutions with scalable backend integrations and efficient workflows.',
    responsibilities: [
      'Developed full-stack web application features using React.js, Next.js, TypeScript, and Node.js.',
      'Built and integrated REST APIs using Express.js and connected applications with MongoDB and Supabase.',
      'Contributed to the development of C17, a Speed-to-Lead platform featuring lead management, inbox, dashboards, and workflow automation.',
      'Worked on dashboard development, role-based access control (RBAC), and database integrations.',
      'Explored AI-powered automation and integrations to streamline business workflows.',
      'Collaborated with team members to implement features, troubleshoot issues, and improve application functionality.',
    ],
    technologies: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Supabase',
      'PostgreSQL',
      'Git',
      'REST APIs',
    ],
  },
  {
    id: 'revona-technologies',
    role: 'Frontend Developer',
    company: 'Revona Technologies',
    focusTag: 'Frontend & UI',
    projectHighlight: 'E-Mechanics Platform',
    summary:
      'Building responsive, user-friendly React web applications with reusable UI components, REST API integrations, and performance-focused interfaces.',
    responsibilities: [
      'Developed responsive and interactive user interfaces using React.js, JavaScript, and Tailwind CSS.',
      'Built reusable frontend components and maintained clean, structured code.',
      'Integrated RESTful APIs to connect frontend applications with backend services.',
      'Worked on the E-Mechanics platform, contributing to frontend functionality and UI improvements.',
      'Collaborated with the development team to fix bugs, improve usability, and deliver features.',
    ],
    technologies: [
      'React.js',
      'JavaScript',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
      'REST APIs',
      'Git',
      'GitHub',
    ],
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home',       targetId: 'home' },
  { label: 'About Me',   targetId: 'about' },
  { label: 'Skills',     targetId: 'skills' },
  { label: 'Experience', targetId: 'experience' },
  { label: 'Hobbies',    targetId: 'hobbies' },
  { label: 'Portfolio',  targetId: 'portfolio' },
  { label: 'Contact',    targetId: 'contact' },
];
