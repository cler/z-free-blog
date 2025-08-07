"use client"

import React, { useState, useEffect, useRef, useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HomePageConfig } from "@/types"
import { Plus, Minus } from "lucide-react"
interface CardsConfigProps {
  config: HomePageConfig
  updateConfig: (field: keyof HomePageConfig, value: string | boolean) => void
  frontendTechs: string[]
  setFrontendTechs: (techs: string[]) => void
  backendTechs: string[]
  setBackendTechs: (techs: string[]) => void
  specialties: Array<{emoji: string, title: string, description: string}>
  setSpecialties: (specialties: Array<{emoji: string, title: string, description: string}>) => void
}

export function CardsConfig({ 
  config, 
  updateConfig, 
  frontendTechs, 
  setFrontendTechs, 
  backendTechs, 
  setBackendTechs, 
  specialties, 
  setSpecialties 
}: CardsConfigProps) {

  // 使用ref来保存最新的updateConfig函数
  const updateConfigRef = useRef(updateConfig)
  updateConfigRef.current = updateConfig

  // 同步前端技术栈到config
  useEffect(() => {
    updateConfigRef.current('cardContent1', frontendTechs.join('\n'))
  }, [frontendTechs])

  // 同步后端技术栈到config
  useEffect(() => {
    updateConfigRef.current('cardContent2', backendTechs.join('\n'))
  }, [backendTechs])

  // 同步专业特长到config
  useEffect(() => {
    updateConfigRef.current('cardContent3', JSON.stringify(specialties))
  }, [specialties])

  // 添加前端技术
  const addFrontendTech = () => {
    if (frontendTechs.length < 5) {
      setFrontendTechs([...frontendTechs, ''])
    }
  }

  // 删除前端技术
  const removeFrontendTech = (index: number) => {
    if (frontendTechs.length > 3) {
      setFrontendTechs(frontendTechs.filter((_, i) => i !== index))
    }
  }

  // 更新前端技术
  const updateFrontendTech = (index: number, value: string) => {
    const newTechs = [...frontendTechs]
    newTechs[index] = value
    setFrontendTechs(newTechs)
  }

  // 添加后端技术
  const addBackendTech = () => {
    if (backendTechs.length < 5) {
      setBackendTechs([...backendTechs, ''])
    }
  }

  // 删除后端技术
  const removeBackendTech = (index: number) => {
    if (backendTechs.length > 3) {
      setBackendTechs(backendTechs.filter((_, i) => i !== index))
    }
  }

  // 更新后端技术
  const updateBackendTech = (index: number, value: string) => {
    const newTechs = [...backendTechs]
    newTechs[index] = value
    setBackendTechs(newTechs)
  }

  // 添加专业特长
  const addSpecialty = () => {
    if (specialties.length < 5) {
      setSpecialties([...specialties, { emoji: '', title: '', description: '' }])
    }
  }

  // 删除专业特长
  const removeSpecialty = (index: number) => {
    if (specialties.length > 3) {
      setSpecialties(specialties.filter((_, i) => i !== index))
    }
  }

  // 更新专业特长
  const updateSpecialty = (index: number, field: 'emoji' | 'title' | 'description', value: string) => {
    const newSpecialties = [...specialties]
    newSpecialties[index][field] = value
    setSpecialties(newSpecialties)
  }



  return (
    <div className="space-y-6">
      {/* 前端技术栈卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>前端技术栈</CardTitle>
          <CardDescription>设置前端技术栈展示内容（3-5项）</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="card1Title">卡片标题</Label>
              <Input
                id="card1Title"
                value={config.cardTitle1 as string || '前端技术栈'}
                onChange={(e) => updateConfig('cardTitle1', e.target.value)}
                placeholder="输入卡片标题"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card1Icon">卡片图标</Label>
              <Input
                id="card1Icon"
                value={config.cardIcon1 as string || ''}
                onChange={(e) => updateConfig('cardIcon1', e.target.value)}
                placeholder="输入图标URL或图标名称"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>技术列表</Label>
            <div className="space-y-2">
              {frontendTechs.map((tech, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={tech}
                    onChange={(e) => updateFrontendTech(index, e.target.value)}
                    placeholder={`前端技术 ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFrontendTech(index)}
                    disabled={frontendTechs.length <= 3}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFrontendTech}
                disabled={frontendTechs.length >= 5}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加技术项 ({frontendTechs.length}/5)
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card1Link">卡片链接</Label>
            <Input
              id="card1Link"
              value={config.cardLink1 as string || ''}
              onChange={(e) => updateConfig('cardLink1', e.target.value)}
              placeholder="输入卡片跳转链接（可选）"
            />
          </div>
        </CardContent>
      </Card>

      {/* 后端技术栈卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>后端技术栈</CardTitle>
          <CardDescription>设置后端技术栈展示内容（3-5项）</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="card2Title">卡片标题</Label>
              <Input
                id="card2Title"
                value={config.cardTitle2 as string || '后端技术栈'}
                onChange={(e) => updateConfig('cardTitle2', e.target.value)}
                placeholder="输入卡片标题"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card2Icon">卡片图标</Label>
              <Input
                id="card2Icon"
                value={config.cardIcon2 as string || ''}
                onChange={(e) => updateConfig('cardIcon2', e.target.value)}
                placeholder="输入图标URL或图标名称"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>技术列表</Label>
            <div className="space-y-2">
              {backendTechs.map((tech, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={tech}
                    onChange={(e) => updateBackendTech(index, e.target.value)}
                    placeholder={`后端技术 ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBackendTech(index)}
                    disabled={backendTechs.length <= 3}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addBackendTech}
                disabled={backendTechs.length >= 5}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加技术项 ({backendTechs.length}/5)
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card2Link">卡片链接</Label>
            <Input
              id="card2Link"
              value={config.cardLink2 as string || ''}
              onChange={(e) => updateConfig('cardLink2', e.target.value)}
              placeholder="输入卡片跳转链接（可选）"
            />
          </div>
        </CardContent>
      </Card>

      {/* 专业特长卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>专业特长</CardTitle>
          <CardDescription>设置专业特长展示内容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="card3Title">卡片标题</Label>
              <Input
                id="card3Title"
                value={config.cardTitle3 as string || '专业特长'}
                onChange={(e) => updateConfig('cardTitle3', e.target.value)}
                placeholder="输入卡片标题"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card3Icon">卡片图标</Label>
              <Input
                id="card3Icon"
                value={config.cardIcon3 as string || ''}
                onChange={(e) => updateConfig('cardIcon3', e.target.value)}
                placeholder="输入图标URL或图标名称"
              />
            </div>
          </div>
          <div className="space-y-4">
            <Label>专业特长卡片列表</Label>
            <div className="space-y-4">
              {specialties.map((specialty, index) => (
                <Card key={index} className="p-4 border-2 border-dashed border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-gray-500">表情包</Label>
                          <Input
                            value={specialty.emoji}
                            onChange={(e) => updateSpecialty(index, 'emoji', e.target.value)}
                            placeholder="🚀"
                            className="text-center text-lg"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-gray-500">标题</Label>
                          <Input
                            value={specialty.title}
                            onChange={(e) => updateSpecialty(index, 'title', e.target.value)}
                            placeholder="特长标题"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-gray-500">描述</Label>
                          <Input
                            value={specialty.description}
                            onChange={(e) => updateSpecialty(index, 'description', e.target.value)}
                            placeholder="特长描述"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSpecialty(index)}
                      disabled={specialties.length <= 3}
                      className="mt-6"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSpecialty}
                disabled={specialties.length >= 5}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加特长卡片 ({specialties.length}/5)
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card3Link">卡片链接</Label>
            <Input
              id="card3Link"
              value={config.cardLink3 as string || ''}
              onChange={(e) => updateConfig('cardLink3', e.target.value)}
              placeholder="输入卡片跳转链接（可选）"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}