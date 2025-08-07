import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('video') as File
    
    if (!file) {
      return NextResponse.json({ error: '没有找到视频文件' }, { status: 400 })
    }
    
    // 检查文件类型
    if (!file.type.startsWith('video/')) {
      return NextResponse.json({ error: '请上传视频文件' }, { status: 400 })
    }
    
    // 检查文件大小 (100MB)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json({ error: '文件大小不能超过100MB' }, { status: 400 })
    }
    
    // 生成安全的文件名
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${originalName}`
    
    // 保存文件到 public/video 目录
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = join(process.cwd(), 'public', 'video', fileName)
    
    await writeFile(filePath, buffer)
    
    return NextResponse.json({ 
      success: true, 
      fileName,
      url: `/video/${fileName}`
    })
  } catch (error) {
    console.error('视频上传失败:', error)
    return NextResponse.json({ error: '视频上传失败' }, { status: 500 })
  }
}