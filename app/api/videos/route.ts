import { NextRequest, NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const videoDir = join(process.cwd(), 'public', 'video')
    const files = await readdir(videoDir)
    
    // 过滤出视频文件
    const videoFiles = files.filter(file => {
      const ext = file.toLowerCase().split('.').pop()
      return ['mp4', 'avi', 'mov', 'webm', 'mkv'].includes(ext || '')
    })
    
    return NextResponse.json(videoFiles)
  } catch (error) {
    console.error('获取视频列表失败:', error)
    return NextResponse.json({ error: '获取视频列表失败' }, { status: 500 })
  }
}