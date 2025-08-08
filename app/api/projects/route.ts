import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";

// GET - 获取所有项目
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const status = searchParams.get("status");
    
    const where: any = {};
    
    if (featured === "true") {
      where.featured = true;
    }
    
    if (status) {
      where.status = status;
    }
    
    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { featured: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" }
      ],
    });
    
    return NextResponse.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error("获取项目列表失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: "获取项目列表失败"
      },
      { status: 500 }
    );
  }
}

// POST - 创建新项目
export async function POST(request: NextRequest) {
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
    
    const body = await request.json();
    const {
      title,
      description,
      previewUrl,
      repositoryUrl,
      techStack,
      startDate,
      endDate,
      status,
      image,
      featured,
      sortOrder
    } = body;
    
    // 验证必填字段
    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "项目标题和描述为必填项"
        },
        { status: 400 }
      );
    }
    
    // 查找用户
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
    
    const project = await prisma.project.create({
      data: {
        title,
        description,
        previewUrl,
        repositoryUrl,
        techStack: techStack || [],
        startDate,
        endDate,
        status: status || "进行中",
        image,
        featured: featured || false,
        sortOrder: sortOrder || 0,
      },
    });
    
    return NextResponse.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error("创建项目失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: "创建项目失败"
      },
      { status: 500 }
    );
  }
}