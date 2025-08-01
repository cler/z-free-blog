import { PersonalInfo } from '../types/personal-info';

export const personalInfoData: PersonalInfo = {
  title: '我是一个全栈开发工程师',
  subtitle: '专注于现代Web技术栈，致力于构建高性能、用户友好的应用程序',
  frontendStack: {
    title: '前端技术栈',
    skills: [
      { name: 'React / Next.js', description: '现代化前端框架' },
      { name: 'TypeScript', description: '类型安全的JavaScript' },
      { name: 'Tailwind CSS', description: '实用优先的CSS框架' },
      { name: 'GSAP', description: '高性能动画库' },
      { name: '响应式设计', description: '移动端优先' }
    ]
  },
  backendStack: {
    title: '后端技术栈',
    skills: [
      { name: 'Node.js / Express', description: '服务端JavaScript' },
      { name: 'Python / Django', description: '快速开发框架' },
      { name: 'PostgreSQL / MongoDB', description: '数据库管理' },
      { name: 'RESTful API', description: '接口设计' },
      { name: '云服务部署', description: 'AWS / Vercel' }
    ]
  },
  specialties: {
    title: '专业特长',
    items: [
      {
        icon: '🚀',
        title: '性能优化',
        description: '专注于代码优化和用户体验提升'
      },
      {
        icon: '🎨',
        title: 'UI/UX设计',
        description: '注重界面美观和交互体验'
      },
      {
        icon: '⚡',
        title: '快速开发',
        description: '高效的开发流程和项目交付'
      }
    ]
  }
};

// 模拟API调用
export async function getPersonalInfo(): Promise<PersonalInfo> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  return personalInfoData;
}