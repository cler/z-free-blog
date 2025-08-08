import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";

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

// POST - 初始化项目数据
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    // if (!session?.user?.email) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: "未授权访问"
    //     },
    //     { status: 401 }
    //   );
    // }
    
    // // 检查用户权限（只有管理员可以初始化数据）
    // const user = await prisma.user.findUnique({
    //   where: { email: session.user.email }
    // });
    
    // if (!user) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: "用户不存在"
    //     },
    //     { status: 404 }
    //   );
    // }
    
    // if (user.role !== "admin") {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: "只有管理员可以初始化数据"
    //     },
    //     { status: 403 }
    //   );
    // }
    
    // 检查是否已有项目数据
    const existingProjects = await prisma.project.count();
    
    if (existingProjects > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "数据库中已存在项目数据，请先清空后再初始化"
        },
        { status: 400 }
      );
    }
    
    // 批量创建项目
    const createdProjects = await prisma.project.createMany({
      data: initialProjects.map(project => ({
        ...project,
      }))
    });
    
    return NextResponse.json({
      success: true,
      message: `成功初始化 ${createdProjects.count} 个项目`,
      data: {
        count: createdProjects.count
      }
    });
  } catch (error) {
    console.error("初始化项目数据失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: "初始化项目数据失败"
      },
      { status: 500 }
    );
  }
}

// DELETE - 清空项目数据
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          error: "未授权访问"
        },
        { status: 401 }
      );
    }
    
    // 检查用户权限（只有管理员可以清空数据）
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "用户不存在"
        },
        { status: 404 }
      );
    }
    
    if (user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          error: "只有管理员可以清空数据"
        },
        { status: 403 }
      );
    }
    
    // 删除所有项目
    const deletedProjects = await prisma.project.deleteMany({});
    
    return NextResponse.json({
      success: true,
      message: `成功删除 ${deletedProjects.count} 个项目`,
      data: {
        count: deletedProjects.count
      }
    });
  } catch (error) {
    console.error("清空项目数据失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: "清空项目数据失败"
      },
      { status: 500 }
    );
  }
}