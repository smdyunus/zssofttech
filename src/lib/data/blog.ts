export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

const genContent = (topic: string): string =>
  `## Introduction\n${topic} has become essential in today's IT landscape. This guide covers everything you need to know.\n\n## Why It Matters\nThe demand for ${topic} professionals continues to grow.\n\n## Key Skills\nMaster essential concepts, practical applications, and industry best practices.\n\n## Career Opportunities\nBuild a rewarding career with competitive salaries in this growing field.\n\n## Getting Started\nNow is the perfect time to begin your journey in ${topic}.`;

export const blogPosts: BlogPost[] = [
  { id: '1', slug: 'mern-stack-career-guide', title: 'MERN Stack: Complete Career Guide 2025', excerpt: 'Everything about MERN stack development, career opportunities, and salary in India.', content: genContent('MERN stack development'), image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=75', category: 'Full Stack', author: 'ZS Soft Tech', date: '2025-01-15', readTime: '10 min', tags: ['MERN', 'React', 'Node.js'] },
  { id: '2', slug: 'java-spring-boot-beginners', title: 'Java Spring Boot for Beginners', excerpt: 'Start your Java Spring Boot journey with this comprehensive guide.', content: genContent('Java Spring Boot'), image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=75', category: 'Backend', author: 'ZS Soft Tech', date: '2025-01-14', readTime: '12 min', tags: ['Java', 'Spring Boot'] },
  { id: '3', slug: 'gen-ai-javascript-guide', title: 'Generative AI with JavaScript', excerpt: 'Build AI applications using JavaScript and modern frameworks.', content: genContent('Gen AI with JavaScript'), image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=75', category: 'AI', author: 'ZS Soft Tech', date: '2025-01-13', readTime: '14 min', tags: ['AI', 'JavaScript'] },
  { id: '4', slug: 'data-science-career-nandyal', title: 'Data Science Career in Nandyal', excerpt: 'How to start a data science career from Nandyal.', content: genContent('Data Science'), image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=75', category: 'Data Science', author: 'ZS Soft Tech', date: '2025-01-12', readTime: '8 min', tags: ['Data Science'] },
  { id: '5', slug: 'selenium-automation-guide', title: 'Selenium Automation Testing Guide', excerpt: 'Master Selenium for automation testing from scratch.', content: genContent('Selenium automation'), image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=75', category: 'Testing', author: 'ZS Soft Tech', date: '2025-01-11', readTime: '15 min', tags: ['Selenium', 'Testing'] },
  { id: '6', slug: 'aws-devops-career', title: 'AWS DevOps Career Path', excerpt: 'Complete roadmap to become an AWS DevOps engineer.', content: genContent('AWS DevOps'), image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=75', category: 'DevOps', author: 'ZS Soft Tech', date: '2025-01-10', readTime: '11 min', tags: ['AWS', 'DevOps'] },
  { id: '7', slug: 'power-bi-dashboards', title: 'Power BI Dashboards for Beginners', excerpt: 'Create stunning dashboards with Power BI.', content: genContent('Power BI'), image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=75', category: 'Analytics', author: 'ZS Soft Tech', date: '2025-01-09', readTime: '9 min', tags: ['Power BI'] },
  { id: '8', slug: 'system-design-interviews', title: 'System Design Interview Prep', excerpt: 'Ace your system design interviews with these tips.', content: genContent('System Design'), image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=75', category: 'Architecture', author: 'ZS Soft Tech', date: '2025-01-08', readTime: '13 min', tags: ['System Design'] },
  { id: '9', slug: 'python-data-analysis', title: 'Python for Data Analysis', excerpt: 'Start data analysis with Python and Pandas.', content: genContent('Python data analysis'), image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=75', category: 'Data Science', author: 'ZS Soft Tech', date: '2025-01-07', readTime: '10 min', tags: ['Python'] },
  { id: '10', slug: 'azure-cloud-fundamentals', title: 'Azure Cloud Fundamentals', excerpt: 'Get started with Microsoft Azure cloud.', content: genContent('Azure cloud'), image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=75', category: 'Cloud', author: 'ZS Soft Tech', date: '2025-01-06', readTime: '12 min', tags: ['Azure'] },
  { id: '11', slug: 'manual-testing-basics', title: 'Manual Testing Basics', excerpt: 'Learn manual testing fundamentals.', content: genContent('Manual testing'), image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=75', category: 'Testing', author: 'ZS Soft Tech', date: '2025-01-05', readTime: '8 min', tags: ['Testing'] },
  { id: '12', slug: 'react-hooks-guide', title: 'React Hooks Complete Guide', excerpt: 'Master React Hooks for modern development.', content: genContent('React Hooks'), image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=75', category: 'Frontend', author: 'ZS Soft Tech', date: '2025-01-04', readTime: '14 min', tags: ['React'] },
  { id: '13', slug: 'docker-kubernetes-beginners', title: 'Docker & Kubernetes for Beginners', excerpt: 'Container orchestration made simple.', content: genContent('Docker Kubernetes'), image: 'https://images.unsplash.com/photo-1612831455747-a470a2c2d595?w=400&q=75', category: 'DevOps', author: 'ZS Soft Tech', date: '2025-01-03', readTime: '15 min', tags: ['Docker'] },
  { id: '14', slug: 'machine-learning-intro', title: 'Machine Learning Introduction', excerpt: 'Start your ML journey with this guide.', content: genContent('Machine Learning'), image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=75', category: 'AI', author: 'ZS Soft Tech', date: '2025-01-02', readTime: '12 min', tags: ['ML'] },
  { id: '15', slug: 'sql-for-analysts', title: 'SQL for Data Analysts', excerpt: 'Essential SQL skills for data analysis.', content: genContent('SQL'), image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=75', category: 'Analytics', author: 'ZS Soft Tech', date: '2025-01-01', readTime: '10 min', tags: ['SQL'] },
  { id: '16', slug: 'it-career-nandyal', title: 'Building IT Career in Nandyal', excerpt: 'How to grow your tech career from Nandyal.', content: genContent('IT career in Nandyal'), image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75', category: 'Career', author: 'ZS Soft Tech', date: '2024-12-30', readTime: '9 min', tags: ['Career'] },
  { id: '17', slug: 'mern-vs-mean-stack', title: 'MERN vs MEAN Stack Comparison', excerpt: 'Which stack is right for your project?', content: genContent('MERN vs MEAN'), image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=75', category: 'Full Stack', author: 'ZS Soft Tech', date: '2024-12-29', readTime: '11 min', tags: ['MERN'] },
  { id: '18', slug: 'api-development-best-practices', title: 'API Development Best Practices', excerpt: 'Build robust and scalable APIs.', content: genContent('API development'), image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=75', category: 'Backend', author: 'ZS Soft Tech', date: '2024-12-28', readTime: '13 min', tags: ['API'] },
  { id: '19', slug: 'placement-preparation-tips', title: 'IT Placement Preparation Tips', excerpt: 'Ace your campus placements with these tips.', content: genContent('Placement preparation'), image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=75', category: 'Career', author: 'ZS Soft Tech', date: '2024-12-27', readTime: '8 min', tags: ['Placements'] },
  { id: '20', slug: 'full-stack-roadmap-2025', title: 'Full Stack Developer Roadmap 2025', excerpt: 'Complete roadmap to become a full stack developer.', content: genContent('Full Stack development'), image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=75', category: 'Full Stack', author: 'ZS Soft Tech', date: '2024-12-26', readTime: '14 min', tags: ['Full Stack'] },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}
