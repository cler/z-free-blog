import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";

// GET - 获取单个项目
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
    });
    
    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "项目不存在"
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error("获取项目详情失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: "获取项目详情失败"
      },
      { status: 500 }
    );
  }
}

// PUT - 更新项目
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    
    // 检查项目是否存在
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });
    
    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: "项目不存在"
        },
        { status: 404 }
      );
    }
    
    // 检查权限（只有项目创建者或管理员可以修改）
    
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
    
    const project = await prisma.project.update({
      where: { id },
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
        sortOrder: sortOrder || 0
      },
    });
    
    return NextResponse.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error("更新项目失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: "更新项目失败"
      },
      { status: 500 }
    );
  }
}

// DELETE - 删除项目
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    
    // 检查项目是否存在
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });
    
    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: "项目不存在"
        },
        { status: 404 }
      );
    }
    
    // 检查权限（只有项目创建者或管理员可以删除）
    await prisma.project.delete({
      where: { id }
    });
    
    return NextResponse.json({
      success: true,
      message: "项目删除成功"
    });
  } catch (error) {
    console.error("删除项目失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: "删除项目失败"
      },
      { status: 500 }
    );
  }
}