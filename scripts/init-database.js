/**
 * 数据库初始化脚本
 * 用于初始化数据库结构和基础数据
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 初始化项目数据
const initialProjects = [
  {
    title: "Z-Free-Blog",
    description: "基于 Next.js 14 的现代化个人博客系统，支持 OSAP 动画、响应式设计和机器学习的内容。",
    previewUrl: "https://z-free-blog.vercel.app",
    repositoryUrl: "https://github.com/username/z-free-blog",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    startDate: "2024-01",
    endDate: "2024-02",
    status: "已完成",
    image: "/images/projects/z-free-blog.jpg",
    featured: true,
    sortOrder: 1
  },
  {
    title: "E-Commerce Platform",
    description: "全栈电商平台，包含用户管理、商品管理、订单管理、支付集成等完整功能。",
    previewUrl: "https://ecommerce-demo.vercel.app",
    repositoryUrl: "https://github.com/username/ecommerce-platform",
    techStack: ["Node.js", "MongoDB", "Express", "Stripe"],
    startDate: "2023-09",
    endDate: "2023-12",
    status: "已完成",
    image: "/images/projects/ecommerce.jpg",
    featured: true,
    sortOrder: 2
  },
  {
    title: "Task Management App",
    description: "团队协作任务管理应用，支持项目管理、任务分配、进度跟踪等功能。",
    previewUrl: "https://taskapp-demo.vercel.app",
    repositoryUrl: "https://github.com/username/task-management",
    techStack: ["Vue.js", "Firebase", "Vuetify", "Socket.io"],
    startDate: "2023-06",
    endDate: "2023-08",
    status: "已完成",
    image: "/images/projects/taskapp.jpg",
    featured: false,
    sortOrder: 3
  },
  {
    title: "AI 聊天机器人",
    description: "基于大语言模型的智能聊天机器人，支持多轮对话、上下文理解和知识问答。",
    previewUrl: "https://ai-chatbot-demo.vercel.app",
    repositoryUrl: "https://github.com/username/ai-chatbot",
    techStack: ["Python", "FastAPI", "OpenAI", "React"],
    startDate: "2024-03",
    endDate: null,
    status: "进行中",
    image: "/images/projects/ai-chatbot.jpg",
    featured: true,
    sortOrder: 4
  },
  {
    title: "数据可视化平台",
    description: "企业级数据可视化平台，支持多种图表类型、实时数据更新和交互式仪表板。",
    previewUrl: "https://dataviz-demo.vercel.app",
    repositoryUrl: "https://github.com/username/data-visualization",
    techStack: ["D3.js", "React", "Node.js", "PostgreSQL"],
    startDate: "2023-01",
    endDate: "2023-05",
    status: "已完成",
    image: "/images/projects/dataviz.jpg",
    featured: false,
    sortOrder: 5
  }
];

async function initializeDatabase() {
  try {
    console.log('🚀 开始初始化数据库...');
    
    // 检查是否已有管理员用户
    const adminUser = await prisma.user.findFirst({
      where: { role: 'admin' }
    });
    
    let userId;
    
    if (!adminUser) {
      console.log('📝 创建管理员用户...');
      // 创建默认管理员用户
      const newAdmin = await prisma.user.create({
        data: {
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
          // 注意：在生产环境中，应该使用加密的密码
          password: 'admin123' // 请在生产环境中更改此密码
        }
      });
      userId = newAdmin.id;
      console.log('✅ 管理员用户创建成功');
    } else {
      userId = adminUser.id;
      console.log('✅ 找到现有管理员用户');
    }
    
    // 检查是否已有项目数据
    const existingProjects = await prisma.project.count();
    
    if (existingProjects === 0) {
      console.log('📝 初始化项目数据...');
      
      // 批量创建项目
      await prisma.project.createMany({
        data: initialProjects.map(project => ({
          ...project,
          userId: userId
        }))
      });
      
      console.log(`✅ 成功创建 ${initialProjects.length} 个项目`);
    } else {
      console.log(`ℹ️  数据库中已存在 ${existingProjects} 个项目，跳过初始化`);
    }
    
    // 检查是否已有首页配置
    const existingConfig = await prisma.homePageConfig.findFirst({
      where: { configName: 'default' }
    });
    
    if (!existingConfig) {
      console.log('📝 创建默认首页配置...');
      
      await prisma.homePageConfig.create({
        data: {
          configName: 'default',
          navTitle: 'Z-Free-Blog',
          navSlogan: '现代化个人博客系统',
          globalTitle: 'Welcome to Z-Free-Blog',
          globalDescription: '基于 Next.js 的现代化个人博客系统',
          personalName: 'Your Name',
          personalTitle: 'Full Stack Developer',
          personalBio: '热爱技术，专注于现代化 Web 开发',
          cardTitle1: '技术博客',
          cardContent1: '分享最新的技术见解和开发经验',
          cardTitle2: '项目展示',
          cardContent2: '展示个人项目和开源贡献',
          cardTitle3: '关于我',
          cardContent3: '了解更多关于我的信息',
          isActive: true
        }
      });
      
      console.log('✅ 默认首页配置创建成功');
    } else {
      console.log('ℹ️  首页配置已存在，跳过初始化');
    }
    
    console.log('🎉 数据库初始化完成！');
    
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 清空数据库
async function clearDatabase() {
  try {
    console.log('🗑️  开始清空数据库...');
    
    // 删除所有项目
    const deletedProjects = await prisma.project.deleteMany({});
    console.log(`✅ 删除了 ${deletedProjects.count} 个项目`);
    
    // 删除所有首页配置（除了默认配置）
    const deletedConfigs = await prisma.homePageConfig.deleteMany({
      where: {
        configName: {
          not: 'default'
        }
      }
    });
    console.log(`✅ 删除了 ${deletedConfigs.count} 个配置`);
    
    console.log('🎉 数据库清空完成！');
    
  } catch (error) {
    console.error('❌ 数据库清空失败:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 命令行参数处理
const command = process.argv[2];

switch (command) {
  case 'init':
    initializeDatabase();
    break;
  case 'clear':
    clearDatabase();
    break;
  default:
    console.log('使用方法:');
    console.log('  node scripts/init-database.js init   # 初始化数据库');
    console.log('  node scripts/init-database.js clear  # 清空数据库');
    process.exit(1);
}