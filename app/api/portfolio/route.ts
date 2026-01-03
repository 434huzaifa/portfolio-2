import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch all data in parallel for better performance
    const [
      siteMetadata,
      hero,
      about,
      skillsData,
      experience,
      projectsData,
      awards,
      education,
      languages,
      contact,
      navigationData,
      settings,
    ] = await Promise.all([
      (prisma.siteMetadata.findFirst as any)(),
      (prisma.hero.findFirst as any)(),
      (prisma.about.findFirst as any)(),
      // Skills with categories
      (prisma.skillCategory.findMany as any)({
        include: {
          skills: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      }),
      // Experience ordered by order field
      (prisma.experience.findMany as any)({
        orderBy: { order: 'asc' },
      }),
      // Projects with categories and GitHub links
      (prisma.projectCategory.findMany as any)({
        include: {
          projects: {
            include: {
              githubLinks: true,
            },
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      }),
      // Awards ordered by order field
      (prisma.award.findMany as any)({
        orderBy: { order: 'asc' },
      }),
      (prisma.education.findFirst as any)(),
      // Languages ordered by order field
      (prisma.language.findMany as any)({
        orderBy: { order: 'asc' },
      }),
      (prisma.contact.findFirst as any)(),
      // Navigation with links
      (prisma.navigation.findFirst as any)({
        include: {
          links: {
            orderBy: { order: 'asc' },
          },
        },
      }),
      (prisma.settings.findFirst as any)(),
    ]);

    // Transform skills data to match JSON format: { "Category Name": [{name, level}] }
    const skills: { [key: string]: Array<{ name: string; level: string }> } = {};
    for (const category of skillsData) {
      skills[category.name] = category.skills.map((skill: any) => ({
        name: skill.name,
        level: skill.level,
      }));
    }

    // Transform projects data to match JSON format: { "Category Name": [{...}] }
    const projects: {
      [key: string]: Array<{
        title: string;
        description: string;
        thumbnail?: string;
        techStack: string[];
        features: string[];
        github?: Array<{ name: string; url: string }> | string;
        featured?: boolean;
      }>;
    } = {};
    for (const category of projectsData) {
      projects[category.name] = category.projects.map((project: any) => {
        const projectObj: any = {
          title: project.title,
          description: project.description,
          thumbnail: project.thumbnail,
          techStack: project.techStack,
          features: project.features,
          featured: project.featured,
        };

        // Add GitHub links if they exist
        if (project.githubLinks && project.githubLinks.length > 0) {
          if (project.githubLinks.length === 1) {
            projectObj.github = project.githubLinks[0].url;
          } else {
            projectObj.github = project.githubLinks.map((link: any) => ({
              name: link.name,
              url: link.url,
            }));
          }
        }

        return projectObj;
      });
    }

    // Transform navigation data
    const navigation = navigationData
      ? {
          links: navigationData.links.map((link: any) => ({
            label: link.label,
            href: link.href,
          })),
        }
      : { links: [] };

    // Construct the response in the same format as portfolio-data.json
    const portfolioData = {
      siteMetadata: siteMetadata || {},
      hero: hero || {},
      about: about || {},
      skills,
      experience: experience || [],
      projects,
      awards: awards || [],
      education: education || {},
      languages: languages || [],
      contact: contact || {},
      navigation,
      settings: settings || {},
    };

    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}
