"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HomePageConfig } from "@/types"

interface PersonalConfigProps {
  config: HomePageConfig
  updateConfig: (field: keyof HomePageConfig, value: string | boolean) => void
}

export function PersonalConfig({ config, updateConfig }: PersonalConfigProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>个人信息配置</CardTitle>
        <CardDescription>设置个人介绍相关信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="personalName">姓名</Label>
            <Input
              id="personalName"
              value={config.personalName || ''}
              onChange={(e) => updateConfig('personalName', e.target.value)}
              placeholder="输入姓名"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalTitle">职位/标题</Label>
            <Input
              id="personalTitle"
              value={config.personalTitle || ''}
              onChange={(e) => updateConfig('personalTitle', e.target.value)}
              placeholder="输入职位或标题"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="personalBio">个人简介</Label>
          <textarea
            id="personalBio"
            className="w-full min-h-[100px] px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
            value={config.personalBio || ''}
            onChange={(e) => updateConfig('personalBio', e.target.value)}
            placeholder="输入个人简介"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="personalAvatar">头像URL</Label>
            <Input
              id="personalAvatar"
              value={config.personalAvatar || ''}
              onChange={(e) => updateConfig('personalAvatar', e.target.value)}
              placeholder="输入头像图片URL"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalLocation">所在地</Label>
            <Input
              id="personalLocation"
              value={config.personalLocation || ''}
              onChange={(e) => updateConfig('personalLocation', e.target.value)}
              placeholder="输入所在地"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="personalWebsite">个人网站</Label>
            <Input
              id="personalWebsite"
              value={config.personalWebsite || ''}
              onChange={(e) => updateConfig('personalWebsite', e.target.value)}
              placeholder="输入个人网站URL"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalEmail">联系邮箱</Label>
            <Input
              id="personalEmail"
              type="email"
              value={config.personalEmail || ''}
              onChange={(e) => updateConfig('personalEmail', e.target.value)}
              placeholder="输入联系邮箱"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}