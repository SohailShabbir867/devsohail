// ── Shared Social Links & Site Data ──
// Single source of truth — update URLs here only.

export interface NavItem {
  label: string;
  targetId: string;
  hasDropdown?: boolean;
  subLinks?: { label: string; href: string; external?: boolean }[];
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
  firstName: 'Sohail',
  lastName:  'Shabbir',
  name:      'Sohail Shabbir',
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
