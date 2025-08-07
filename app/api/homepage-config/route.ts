import { NextRequest, NextResponse } from 'next/server'
import { getActiveHomeConfig, updateOrCreateHomeConfig } from '@/lib/actions/homeconfig.action'

export async function GET() {
  try {
    const result = await getActiveHomeConfig()
    
    if (result.success && result.data) {
      return NextResponse.json(result.data)
    } else {
      // 返回默认配置
      const defaultConfig = {
        configName: "default",
        isActive: true,
        primaryColor: "#3b82f6",
        secondaryColor: "#64748b",
        backgroundColor: "#ffffff"
      }
      return NextResponse.json(defaultConfig)
    }
  } catch (error) {
    console.error('获取主页配置失败:', error)
    return NextResponse.json(
      { error: '获取配置失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('保存配置:', body)
    
    // 调用数据库更新函数
    const result = await updateOrCreateHomeConfig(body)
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        data: result.data,
        message: '配置保存成功' 
      })
    } else {
      return NextResponse.json(
        { error: result.message || '保存配置失败' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('保存主页配置失败:', error)
    return NextResponse.json(
      { error: '保存配置失败' },
      { status: 500 }
    )
  }
}