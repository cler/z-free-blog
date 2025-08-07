"use client"

import React from 'react'
import { useState, useEffect, useRef, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { HomePageConfig } from "@/types"
import { homePageConfigSchema } from "@/lib/validator"

import { 
  VideoConfig, 
  NavConfig, 
  PersonalConfig, 
  SocialConfig, 
  CardsConfig, 
  ThemeConfig 
} from "@/components/dashboard/setting"
import { DEFAULT_SPECIALTIES } from "@/lib/constants"
import { formatError } from '@/lib/utils'



function Setting() {
  const [config, setConfig] = useState<HomePageConfig>({
    configName: "default",
    isActive: true,
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    backgroundColor: "#ffffff"
  })
  const [saving, setSaving] = useState(false)
  const [videoList, setVideoList] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 卡片配置相关状态
  const [frontendTechs, setFrontendTechs] = useState<string[]>(() => {
    const content = config.cardContent1 as string || ''
    return content ? content.split('\n').filter(tech => tech.trim()) : ['']
  })

  const [backendTechs, setBackendTechs] = useState<string[]>(() => {
    const content = config.cardContent2 as string || ''
    return content ? content.split('\n').filter(tech => tech.trim()) : ['']
  })

  const [specialties, setSpecialties] = useState<Array<{emoji: string, title: string, description: string}>>(() => {
    const content = config.cardContent3 as string || ''
    if (content) {
      try {
        return JSON.parse(content)
      } catch {
        return DEFAULT_SPECIALTIES
      }
    }
    return DEFAULT_SPECIALTIES
  })

  // 加载配置数据和视频列表
  useEffect(() => {
    loadConfig()
    loadVideoList()
  }, [])

  const loadConfig = () => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/homepage-config')
        if (response.ok) {
          const data = await response.json()
          setConfig(data)
          
          // 更新卡片状态
          const frontendContent = data.cardContent1 as string || ''
          setFrontendTechs(frontendContent ? frontendContent.split('\n').filter(tech => tech.trim()) : [''])
          
          const backendContent = data.cardContent2 as string || ''
          setBackendTechs(backendContent ? backendContent.split('\n').filter(tech => tech.trim()) : [''])
          
          const specialtiesContent = data.cardContent3 as string || ''
          if (specialtiesContent) {
            try {
              setSpecialties(JSON.parse(specialtiesContent))
            } catch {
              setSpecialties(DEFAULT_SPECIALTIES)
            }
          } else {
            setSpecialties(DEFAULT_SPECIALTIES)
          }
          
          console.log('加载配置数据:', data)
        }
      } catch (error) {
        toast.error('加载配置失败')
      }
    })
  }

  const loadVideoList = async () => {
    try {
      const response = await fetch('/api/videos')
      const videos = await response.json()
      setVideoList(videos)
      console.log('加载视频列表:', videos)
    } catch (error) {
      console.error('加载视频列表失败:', error)
      toast.error('加载视频列表失败')
    }
  }

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 检查文件类型
    if (!file.type.startsWith('video/')) {
      toast.error('请选择视频文件')
      return
    }

    // 检查文件大小 (限制为100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('视频文件大小不能超过100MB')
      return
    }

    setUploading(true)
     try {
       const formData = new FormData()
       formData.append('video', file)

       const response = await fetch('/api/upload/video', {
         method: 'POST',
         body: formData
       })
       const result = await response.json()
       
       if (!response.ok) {
         throw new Error(result.error || '上传失败')
       }
       
       // 上传成功后更新视频列表
       await loadVideoList()
       updateConfig('videoUrl', result.url)
       
       toast.success('视频上传成功')
       console.log('视频上传成功:', result.fileName)
    } catch (error) {
      console.error('视频上传失败:', error)
      toast.error('视频上传失败')
    } finally {
      setUploading(false)
      // 清空文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleVideoSelect = (videoName: string) => {
    updateConfig('videoUrl', `/video/${videoName}`)
    toast.success(`已选择视频: ${videoName}`)
  }

  const saveConfig = async () => {
    setSaving(true)
    try {
      // 更新配置对象中的卡片内容
      const updatedConfig = {
        ...config,
        cardContent1: frontendTechs.join('\n'),
        cardContent2: backendTechs.join('\n'),
        cardContent3: JSON.stringify(specialties)
      }

      // 验证配置数据
      let validatedConfig
      try {
        validatedConfig = homePageConfigSchema.parse(updatedConfig)
      } catch (validationError) {
        toast.error(formatError(validationError))
        return;
      }

      // 保存所有配置
      const response = await fetch('/api/homepage-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedConfig)
      })
      if (!response.ok) throw new Error('保存失败')
      
      // 更新本地状态
      setConfig(updatedConfig)
      
      toast.success('配置保存成功')
    } catch (error) {
      if (error instanceof Error) {
        // 处理 zod 验证错误
        if (error.name === 'ZodError') {
          const zodError = error as any
          const firstError = zodError.errors?.[0]
          toast.error(`验证失败: ${firstError?.message || '数据格式不正确'}`)
        } else {
          toast.error(`保存失败: ${error.message}`)
        }
      } else {
        toast.error('保存配置失败')
      }
      console.error('保存配置失败:', error)
    } finally {
      setSaving(false)
    }
  }

  const updateConfig = (field: keyof HomePageConfig, value: string | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">加载中...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">主页配置</h1>
          <p className="text-muted-foreground mt-2">管理网站主页的各项配置信息</p>
        </div>
        <Button onClick={saveConfig} disabled={saving}>
          {saving ? '保存中...' : '保存配置'}
        </Button>
      </div>

      <Tabs defaultValue="video" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="video">视频配置</TabsTrigger>
          <TabsTrigger value="nav">导航栏</TabsTrigger>
          <TabsTrigger value="personal">个人信息</TabsTrigger>
          <TabsTrigger value="social">社交媒体</TabsTrigger>
          <TabsTrigger value="cards">卡片配置</TabsTrigger>
          <TabsTrigger value="theme">主题设置</TabsTrigger>
        </TabsList>

        {/* 视频配置 */}
        <TabsContent value="video">
          <VideoConfig
            config={config}
            updateConfig={updateConfig}
            videoList={videoList}
            uploading={uploading}
            onVideoUpload={handleVideoUpload}
            onVideoSelect={handleVideoSelect}
            loadVideoList={loadVideoList}
          />
        </TabsContent>

        {/* 导航栏配置 */}
        <TabsContent value="nav">
          <NavConfig config={config} updateConfig={updateConfig} />
        </TabsContent>

        {/* 个人信息配置 */}
        <TabsContent value="personal">
          <PersonalConfig config={config} updateConfig={updateConfig} />
        </TabsContent>

        {/* 社交媒体配置 */}
        <TabsContent value="social">
          <SocialConfig config={config} updateConfig={updateConfig} />
        </TabsContent>

        {/* 卡片配置 */}
        <TabsContent value="cards">
          <CardsConfig 
            config={config} 
            updateConfig={updateConfig}
            frontendTechs={frontendTechs}
            setFrontendTechs={setFrontendTechs}
            backendTechs={backendTechs}
            setBackendTechs={setBackendTechs}
            specialties={specialties}
            setSpecialties={setSpecialties}
          />
        </TabsContent>

        {/* 主题设置 */}
        <TabsContent value="theme">
          <ThemeConfig config={config} updateConfig={updateConfig} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Setting