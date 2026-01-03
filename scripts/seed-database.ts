import 'dotenv/config';
import { prisma } from '../lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

interface PortfolioData {
  siteMetadata: {
    title: string;
    description: string;
    author: string;
    siteUrl: string;
    language: string;
    theme: string;
  };
  hero: {
    name: string;
    tagline: string;
    description: string;
    ctas: Array<{ text: string; href: string; variant: string }>;
    socialLinks: Array<{ platform: string; url: string; username?: string }>;
  };
  about: {
    title: string;
    description: string;
    highlights: string[];
    focus: string[];
  };
  skills: {
    [category: string]: Array<{ name: string; level: string }>;
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    techStack: string[];
    highlights: string[];
    featured?: boolean;
  }>;
  projects: {
    [category: string]: Array<{
      title: string;
      description: string;
      thumbnail?: string;
      techStack: string[];
      features: string[];
      github?: Array<{ name: string; url: string }> | string;
      featured?: boolean;
    }>;
  };
  awards: Array<{
    title: string;
    issuer: string;
    date: string;
    featured?: boolean;
  }>;
  education: {
    institution: string;
    degree: string;
    field: string;
    duration: string;
  };
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  contact: {
    email: string;
    location: string;
    available: boolean;
    socialLinks: Array<{ platform: string; url: string; username?: string }>;
  };
  navigation: {
    links: Array<{ label: string; href: string }>;
  };
  settings: {
    sectionOrder: string[];
    enabledSections: string[];
  };
}

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Read portfolio data
    const dataPath = path.join(process.cwd(), 'portfolio-data.json');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const data: PortfolioData = JSON.parse(fileContent);

    // Clear existing data (in correct order due to foreign keys)
    console.log('🧹 Clearing existing data...');
    await prisma.navLink.deleteMany();
    await prisma.navigation.deleteMany();
    await prisma.githubLink.deleteMany();
    await prisma.project.deleteMany();
    await prisma.projectCategory.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.skillCategory.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.award.deleteMany();
    await prisma.education.deleteMany();
    await prisma.language.deleteMany();
    await prisma.contact.deleteMany();
    await prisma.about.deleteMany();
    await prisma.hero.deleteMany();
    await prisma.siteMetadata.deleteMany();
    await prisma.settings.deleteMany();
    console.log('✅ Existing data cleared\n');

    // 1. Site Metadata
    console.log('📝 Creating site metadata...');
    await prisma.siteMetadata.create({
      data: data.siteMetadata,
    });
    console.log('✅ Site metadata created');

    // 2. Hero
    console.log('🦸 Creating hero section...');
    await prisma.hero.create({
      data: {
        name: data.hero.name,
        tagline: data.hero.tagline,
        description: data.hero.description,
        ctas: data.hero.ctas,
        socialLinks: data.hero.socialLinks,
      },
    });
    console.log('✅ Hero section created');

    // 3. About
    console.log('ℹ️ Creating about section...');
    await prisma.about.create({
      data: data.about,
    });
    console.log('✅ About section created');

    // 4. Skills with Categories
    console.log('💡 Creating skills and categories...');
    let skillOrder = 0;
    let categoryOrder = 0;
    for (const [categoryName, skills] of Object.entries(data.skills)) {
      const category = await prisma.skillCategory.create({
        data: {
          name: categoryName,
          order: categoryOrder++,
        },
      });

      for (const skill of skills) {
        await prisma.skill.create({
          data: {
            name: skill.name,
            level: skill.level,
            categoryId: category.id,
            order: skillOrder++,
          },
        });
      }
    }
    console.log('✅ Skills and categories created');

    // 5. Experience
    console.log('💼 Creating experience entries...');
    for (let i = 0; i < data.experience.length; i++) {
      const exp = data.experience[i];
      await prisma.experience.create({
        data: {
          company: exp.company,
          position: exp.position,
          duration: exp.duration,
          description: exp.description,
          techStack: exp.techStack,
          highlights: exp.highlights,
          featured: exp.featured || false,
          order: i,
        },
      });
    }
    console.log('✅ Experience entries created');

    // 6. Projects with Categories and GitHub Links
    console.log('🚀 Creating projects, categories, and GitHub links...');
    let projectOrder = 0;
    let projectCategoryOrder = 0;
    for (const [categoryName, projects] of Object.entries(data.projects)) {
      const category = await prisma.projectCategory.create({
        data: {
          name: categoryName,
          order: projectCategoryOrder++,
        },
      });

      for (const proj of projects) {
        const project = await prisma.project.create({
          data: {
            title: proj.title,
            description: proj.description,
            thumbnail: proj.thumbnail,
            techStack: proj.techStack,
            features: proj.features,
            categoryId: category.id,
            featured: proj.featured || false,
            order: projectOrder++,
          },
        });

        // Handle GitHub links (can be array or string)
        if (proj.github) {
          if (Array.isArray(proj.github)) {
            for (const link of proj.github) {
              await prisma.githubLink.create({
                data: {
                  name: link.name,
                  url: link.url,
                  projectId: project.id,
                },
              });
            }
          } else if (typeof proj.github === 'string') {
            await prisma.githubLink.create({
              data: {
                name: 'Repository',
                url: proj.github,
                projectId: project.id,
              },
            });
          }
        }
      }
    }
    console.log('✅ Projects, categories, and GitHub links created');

    // 7. Awards
    console.log('🏆 Creating awards...');
    for (let i = 0; i < data.awards.length; i++) {
      const award = data.awards[i];
      await prisma.award.create({
        data: {
          title: award.title,
          issuer: award.issuer,
          date: award.date,
          featured: award.featured || false,
          order: i,
        },
      });
    }
    console.log('✅ Awards created');

    // 8. Education
    console.log('🎓 Creating education entry...');
    await prisma.education.create({
      data: data.education,
    });
    console.log('✅ Education entry created');

    // 9. Languages
    console.log('🌍 Creating languages...');
    for (let i = 0; i < data.languages.length; i++) {
      const lang = data.languages[i];
      await prisma.language.create({
        data: {
          name: lang.name,
          proficiency: lang.proficiency,
          order: i,
        },
      });
    }
    console.log('✅ Languages created');

    // 10. Contact
    console.log('📧 Creating contact information...');
    await prisma.contact.create({
      data: {
        email: data.contact.email,
        location: data.contact.location,
        available: data.contact.available,
        socialLinks: data.contact.socialLinks,
      },
    });
    console.log('✅ Contact information created');

    // 11. Navigation
    console.log('🧭 Creating navigation...');
    const navigation = await prisma.navigation.create({
      data: {},
    });

    for (let i = 0; i < data.navigation.links.length; i++) {
      const link = data.navigation.links[i];
      await prisma.navLink.create({
        data: {
          label: link.label,
          href: link.href,
          order: i,
          navigationId: navigation.id,
        },
      });
    }
    console.log('✅ Navigation created');

    // 12. Settings
    console.log('⚙️ Creating settings...');
    await prisma.settings.create({
      data: {
        sectionOrder: data.settings.sectionOrder,
        enabledSections: data.settings.enabledSections,
      },
    });
    console.log('✅ Settings created');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n💡 Run "npx prisma studio" to view your data');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
