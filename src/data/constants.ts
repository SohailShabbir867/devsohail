// ── Shared Social Links & Site Data ──
// Single source of truth — update URLs here only.

export interface NavItem {
  label: string;
  targetId: string;
  hasDropdown?: boolean;
  subLinks?: { label: string; href: string; external?: boolean }[];
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

export const SOCIAL_LINKS = {
  github:    'https://github.com/SohailShabbir867',
  linkedin:  'https://www.linkedin.com/in/sohail-shabbir-546a12375/',
  facebook:  'https://www.facebook.com/share/1aeJrN99UA/',
  instagram: 'https://www.instagram.com/sohailshabbir04',
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
  'A passionate Full Stack MERN Developer specializing in building scalable web applications with MongoDB, Express.js, React.js, and Node.js, integrating AI into modern web applications alongside high-performance TypeScript Model Context Protocol (MCP) servers.';

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

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home',      targetId: 'home' },
  { label: 'About Me',  targetId: 'about' },
  { label: 'Portfolio', targetId: 'portfolio' },
  { label: 'Contact',   targetId: 'contact' },
  {
    label: 'Blogs',
    targetId: 'blogs',
    hasDropdown: true,
    subLinks: [
      { label: 'All Tech Articles', href: '#blogs' },
      { label: 'DailyBlogs Platform', href: 'https://dailyblogs.website/', external: true },
    ],
  },
];
