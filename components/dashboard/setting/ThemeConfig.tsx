"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { HomePageConfig } from "@/types"

interface ThemeConfigProps {
  config: HomePageConfig
  updateConfig: (field: keyof HomePageConfig, value: string | boolean) => void
}

export function ThemeConfig({ config, updateConfig }: ThemeConfigProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>主题设置</CardTitle>
        <CardDescription>设置网站的主题颜色配置</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">主色调</Label>
            <div className="flex gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={config.primaryColor || '#3b82f6'}
                onChange={(e) => updateConfig('primaryColor', e.target.value)}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                value={config.primaryColor || '#3b82f6'}
                onChange={(e) => updateConfig('primaryColor', e.target.value)}
                placeholder="#3b82f6"
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">辅助色</Label>
            <div className="flex gap-2">
              <Input
                id="secondaryColor"
                type="color"
                value={config.secondaryColor || '#64748b'}
                onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                value={config.secondaryColor || '#64748b'}
                onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                placeholder="#64748b"
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">背景色</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={config.backgroundColor || '#ffffff'}
                onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                value={config.backgroundColor || '#ffffff'}
                onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="configName">配置名称</Label>
          <Input
            id="configName"
            value={config.configName || 'default'}
            onChange={(e) => updateConfig('configName', e.target.value)}
            placeholder="输入配置方案名称"
          />
        </div>
      </CardContent>
    </Card>
  )
}