export const APP_NAME = "Z-Free-Blog";

export const APP_DESCRIPTION = "A free blog platform for developers";

export const AUTH_SECRET = process.env.NEXTAUTH_SECRET || "CPK0M2rCQF5hRVxpzJrW7l2b1aL/AFweEzArg6AS2Rc=";


export const signInDefaultValues = {
  email: '',
  password: '',
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const DEFAULT_SPECIALTIES = [
  { emoji: '🚀', title: '性能优化', description: '专注于代码优化和用户体验提升' },
  { emoji: '🎨', title: 'UI/UX设计', description: '注重界面美观和交互体验' },
  { emoji: '⚡', title: '快速开发', description: '高效开发流程和项目交付' }
]

export const DEFAULT_HOME_CONFIG = {
  // 全局配置
  globalTitle: "全栈工程师",
  globalDescription: "我专注于现代Web技术栈的开发，包括前端框架、后端服务、数据库设计以及云服务部署",
  // 导航栏配置
  navLogo: "Z-Free-Blog",
  // 视频配置
  videoUrl: "/video/V1.mp4",
  // 个人信息配置
  personalName: "开发者",
  personalTitle: "全栈开发工程师",
  // 卡片1 - 前端技术栈
  cardTitle1: "前端技术栈",
  cardContent1: "React\nNext.js\nTypeScript\nTailwind CSS\nVue.js",
  // 卡片2 - 后端技术栈
  cardTitle2: "后端技术栈",
  cardContent2: "Node.js\nPython\nPostgreSQL\nPrisma\nExpress",
  // 卡片3 - 专业技能
  cardTitle3: "专业技能",
  cardContent3: JSON.stringify([
    { icon: '🚀', title: '性能优化', description: '专注于代码优化和用户体验提升' },
    { icon: '🎨', title: 'UI/UX设计', description: '注重界面美观和交互体验' },
    { icon: '⚡', title: '快速开发', description: '高效开发流程和项目交付' }
  ]),
  
  // 社交媒体配置
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  twitterUrl: "https://twitter.com",
  
  // 主题配置
  theme: "dark"
}


