"use client"

import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { HomePageConfig } from "@/types"

interface VideoConfigProps {
  config: HomePageConfig
  updateConfig: (field: keyof HomePageConfig, value: string | boolean) => void
  videoList: string[]
  uploading: boolean
  onVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onVideoSelect: (videoName: string) => void
  loadVideoList: () => void
}

export function VideoConfig({
  config,
  updateConfig,
  videoList,
  uploading,
  onVideoUpload,
  onVideoSelect,
  loadVideoList
}: VideoConfigProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>视频配置</CardTitle>
        <CardDescription>设置主页展示的视频内容</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 视频上传区域 */}
        <div className="space-y-4">
          <Label>视频上传</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={onVideoUpload}
              className="hidden"
              id="video-upload"
            />
            <div className="space-y-2">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-sm text-gray-600">
                <label htmlFor="video-upload" className="cursor-pointer text-blue-600 hover:text-blue-500">
                  点击上传视频文件
                </label>
                <p className="text-xs text-gray-500 mt-1">支持 MP4, AVI, MOV 等格式，最大100MB</p>
              </div>
            </div>
            {uploading && (
              <div className="mt-4">
                <div className="text-sm text-blue-600">上传中...</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* 现有视频选择 */}
        <div className="space-y-4">
          <Label>选择现有视频</Label>
          <Select value={config.videoUrl?.replace('/video/', '') || ''} onValueChange={onVideoSelect}>
            <SelectTrigger>
              <SelectValue placeholder="选择一个视频文件" />
            </SelectTrigger>
            <SelectContent>
              {videoList.map((video) => (
                <SelectItem key={video} value={video}>
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4z" clipRule="evenodd" />
                    </svg>
                    <span>{video}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* 手动输入URL */}
        <div className="space-y-2">
          <Label htmlFor="videoUrl">或手动输入视频URL</Label>
          <Input
            id="videoUrl"
            value={config.videoUrl || ''}
            onChange={(e) => updateConfig('videoUrl', e.target.value)}
            placeholder="输入视频文件URL或路径"
          />
        </div>

        {/* 视频预览 */}
        {config.videoUrl && (
          <div className="space-y-2">
            <Label>视频预览</Label>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="w-full max-w-md mx-auto">
                <video 
                  src={config.videoUrl} 
                  controls 
                  className="w-full rounded"
                  style={{maxHeight: '200px'}}
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement
                    target.style.display = 'none'
                    const errorDiv = target.nextElementSibling as HTMLElement
                    if (errorDiv) errorDiv.style.display = 'block'
                  }}
                  onLoadStart={() => {
                    console.log('开始加载视频:', config.videoUrl)
                  }}
                >
                  您的浏览器不支持视频播放
                </video>
                <div 
                  className="hidden text-center py-8 text-gray-500 bg-gray-100 rounded border-2 border-dashed"
                  style={{display: 'none'}}
                >
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">视频文件无法播放</p>
                  <p className="text-xs text-gray-400 mt-1">请检查文件格式或重新上传</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* 其他视频配置 */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="videoTitle">视频标题</Label>
            <Input
              id="videoTitle"
              value={config.videoTitle || ''}
              onChange={(e) => updateConfig('videoTitle', e.target.value)}
              placeholder="输入视频标题"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="videoPoster">视频封面图</Label>
            <Input
              id="videoPoster"
              value={config.videoPoster || ''}
              onChange={(e) => updateConfig('videoPoster', e.target.value)}
              placeholder="输入视频封面图URL"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}