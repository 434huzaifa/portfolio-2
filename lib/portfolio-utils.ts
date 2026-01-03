import { z } from 'zod';
import { PortfolioData } from './types';

// Zod schemas for validation
const SocialLinksSchema = z.object({
  github: z.string().url('GitHub URL must be valid'),
  linkedin: z.string().url('LinkedIn URL must be valid'),
  email: z.string().email('Email must be valid'),
  whatsapp: z.string().url('WhatsApp URL must be valid').optional(),
});

const HeroSchema = z.object({
  name: z.string().min(1, 'Hero name is required'),
  title: z.string().min(1, 'Hero title is required'),
  tagline: z.string().min(1, 'Hero tagline is required'),
  description: z.string().min(1, 'Hero description is required'),
  photo: z.string().optional(),
  showPhoto: z.boolean().optional(),
  primaryTech: z.array(z.string()).min(1, 'At least one primary tech is required'),
  cta: z.object({
    primary: z.object({
      text: z.string().min(1, 'Primary CTA text is required'),
      link: z.string().min(1, 'Primary CTA link is required'),
    }),
    secondary: z.object({
      text: z.string().min(1, 'Secondary CTA text is required'),
      link: z.string().min(1, 'Secondary CTA link is required'),
    }),
  }),
  socialLinks: SocialLinksSchema,
});

const AboutSchema = z.object({
  title: z.string().min(1, 'About title is required'),
  summary: z.string().min(1, 'About summary is required'),
  highlights: z.array(z.string()).min(1, 'At least one highlight is required'),
  focus: z.array(z.string()).min(1, 'At least one focus area is required'),
});

const SkillItemSchema = z.union([
  z.string(),
  z.object({
    name: z.string().min(1, 'Skill name is required'),
    icon: z.string().optional(),
  }),
]);

const SkillCategorySchema = z.object({
  name: z.string().min(1, 'Skill category name is required'),
  items: z.array(SkillItemSchema).min(1, 'At least one skill item is required'),
  visible: z.boolean().optional(),
  showInSeeMore: z.boolean().optional(),
});

const SkillsSchema = z.object({
  title: z.string().min(1, 'Skills title is required'),
  categories: z.array(SkillCategorySchema).min(1, 'At least one skill category is required'),
});

const PositionSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position title is required'),
  location: z.string().min(1, 'Location is required'),
  duration: z.string().min(1, 'Duration is required'),
  techStack: z.array(z.string()),
  description: z.string().min(1, 'Position description is required'),
  highlights: z.array(z.string()),
  featured: z.boolean(),
  visible: z.boolean().optional(),
  showInSeeMore: z.boolean().optional(),
});

const ExperienceSchema = z.object({
  title: z.string().min(1, 'Experience title is required'),
  positions: z.array(PositionSchema),
});

const ProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  type: z.string().min(1, 'Project type is required'),
  tagline: z.string().min(1, 'Project tagline is required'),
  description: z.string().min(1, 'Project description is required'),
  thumbnail: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  techStack: z.array(z.string()).min(1, 'At least one tech stack item is required'),
  features: z.array(z.string()),
  myRole: z.string().optional(),
  githubLink: z.record(z.string(), z.string()),
  liveLink: z.string().min(1, 'Live link must be a valid URL').optional(),
  featured: z.boolean(),
  visible: z.boolean().optional(),
  showInSeeMore: z.boolean().optional(),
});

const ProjectCategorySchema = z.object({
  name: z.string().min(1, 'Project category name is required'),
  projects: z.array(ProjectSchema),
});

const ProjectsSchema = z.object({
  title: z.string().min(1, 'Projects title is required'),
  categories: z.array(ProjectCategorySchema),
});

const AwardSchema = z.object({
  title: z.string().min(1, 'Award title is required'),
  organization: z.string().min(1, 'Award organization is required'),
  date: z.string().min(1, 'Award date is required'),
  description: z.string().optional(),
  link: z.string().url('Award link must be valid URL').optional(),
  category: z.string().optional(),
  visible: z.boolean().optional(),
  showInSeeMore: z.boolean().optional(),
});

const AwardsSchema = z.object({
  title: z.string().min(1, 'Awards title is required'),
  items: z.array(AwardSchema),
  visible: z.boolean().optional(),
});

const EducationSchema = z.object({
  title: z.string().min(1, 'Education title is required'),
  degree: z.string().min(1, 'Degree is required'),
  major: z.string().min(1, 'Major is required'),
  institution: z.string().min(1, 'Institution is required'),
  location: z.string().min(1, 'Location is required'),
  visible: z.boolean().optional(),
  showInSeeMore: z.boolean().optional(),
});

const LanguageSchema = z.object({
  language: z.string().min(1, 'Language name is required'),
  proficiency: z.string().min(1, 'Proficiency level is required'),
});

const LanguagesSchema = z.object({
  title: z.string().min(1, 'Languages title is required'),
  items: z.array(LanguageSchema),
  visible: z.boolean().optional(),
  showInSeeMore: z.boolean().optional(),
});

const ContactSchema = z.object({
  title: z.string().min(1, 'Contact title is required'),
  subtitle: z.string().optional(),
  email: z.string().email('Contact email must be valid'),
  phone: z.string().min(1, 'Contact phone is required'),
  location: z.string().min(1, 'Contact location is required'),
  whatsapp: z.string().url('WhatsApp URL must be valid').optional(),
});

const SiteMetadataSchema = z.object({
  title: z.string().min(1, 'Site title is required'),
  description: z.string().min(1, 'Site description is required'),
  author: z.string().min(1, 'Author name is required'),
  keywords: z.array(z.string()),
  siteUrl: z.string().url('Site URL must be valid'),
});

const NavigationSchema = z.object({
  logo: z.string().min(1, 'Navigation logo is required'),
  links: z.array(
    z.object({
      label: z.string().min(1, 'Link label is required'),
      href: z.string().min(1, 'Link href is required'),
    })
  ),
});

const PortfolioDataSchema = z.object({
  siteMetadata: SiteMetadataSchema,
  hero: HeroSchema,
  about: AboutSchema,
  skills: SkillsSchema,
  experience: ExperienceSchema,
  projects: ProjectsSchema,
  awards: AwardsSchema,
  education: EducationSchema,
  languages: LanguagesSchema,
  contact: ContactSchema,
  sectionOrder: z.array(z.string()).min(1, 'At least one section is required'),
  navigation: NavigationSchema,
});

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  data?: any;
}

export function validatePortfolioData(data: any): ValidationResult {
  try {
    const result = PortfolioDataSchema.safeParse(data);
    
    if (result.success) {
      return {
        isValid: true,
        errors: [],
        data: result.data,
      };
    } else {
      const errors = result.error.issues.map((err: any) => {
        const path = err.path.join(' → ');
        return `${path}: ${err.message}`;
      });
      
      console.error('Portfolio Data Validation Errors:', errors);
      
      return {
        isValid: false,
        errors,
      };
    }
  } catch (error) {
    console.error('Unexpected validation error:', error);
    return {
      isValid: false,
      errors: ['Unexpected validation error occurred'],
    };
  }
}

export function getVisibleItems<T extends { visible?: boolean }>(items: T[]): T[] {
  return items.filter(item => item.visible !== false);
}

export function getSeeMoreItems<T extends { showInSeeMore?: boolean }>(items: T[]): T[] {
  return items.filter(item => item.showInSeeMore === true);
}
