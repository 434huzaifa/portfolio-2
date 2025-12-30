export interface SiteMetadata {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  siteUrl: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  whatsapp?: string;
}

export interface Hero {
  name: string;
  title: string;
  tagline: string;
  description: string;
  photo?: string;
  showPhoto?: boolean;
  primaryTech: string[];
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
  socialLinks: SocialLinks;
}

export interface About {
  title: string;
  summary: string;
  highlights: string[];
  focus: string[];
}

export interface SkillItem {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  name: string;
  items: (string | SkillItem)[];
  visible?: boolean;
  showInSeeMore?: boolean;
}

export interface Skills {
  title: string;
  categories: SkillCategory[];
}

export interface Position {
  company: string;
  position: string;
  location: string;
  duration: string;
  techStack: string[];
  description: string;
  highlights: string[];
  featured: boolean;
  visible?: boolean;
  showInSeeMore?: boolean;
}

export interface Experience {
  title: string;
  positions: Position[];
}

export interface Project {
  name: string;
  type: string;
  tagline: string;
  description: string;
  thumbnail?: string;
  problem?: string;
  solution?: string;
  techStack: string[];
  features: string[];
  myRole?: string;
  githubLink: { [key: string]: string };
  liveLink: string;
  featured: boolean;
  visible?: boolean;
  showInSeeMore?: boolean;
}

export interface ProjectCategory {
  name: string;
  projects: Project[];
}

export interface Projects {
  title: string;
  categories: ProjectCategory[];
}

export interface Award {
  title: string;
  issuer: string;
  description: string;
  year: string;
  featured: boolean;
}

export interface Awards {
  title: string;
  items: Award[];
  visible: boolean;
}

export interface Education {
  title: string;
  degree: string;
  major: string;
  institution: string;
  location: string;
  visible?: boolean;
  showInSeeMore?: boolean;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Languages {
  title: string;
  items: Language[];
  visible?: boolean;
  showInSeeMore?: boolean;
}

export interface ContactSocialLink {
  url: string;
  label: string;
}

export interface Contact {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  whatsapp?: string;
  location: string;
  socialLinks: {
    github: ContactSocialLink;
    linkedin: ContactSocialLink;
    email: ContactSocialLink;
  };
  availability: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}

export interface Navigation {
  logo: string;
  links: NavigationLink[];
}

export interface PortfolioData {
  siteMetadata: SiteMetadata;
  hero: Hero;
  about: About;
  skills: Skills;
  experience: Experience;
  projects: Projects;
  awards: Awards;
  education: Education;
  languages: Languages;
  contact: Contact;
  sectionOrder: string[];
  navigation: Navigation;
}
