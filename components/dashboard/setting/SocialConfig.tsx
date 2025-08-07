"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HomePageConfig } from "@/types"

interface SocialConfigProps {
  config: HomePageConfig
  updateConfig: (field: keyof HomePageConfig, value: string | boolean) => void
}

export function SocialConfig({ config, updateConfig }: SocialConfigProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>社交媒体配置</CardTitle>
        <CardDescription>设置社交媒体链接</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub链接</Label>
            <Input
              id="githubUrl"
              value={config.githubUrl || ''}
              onChange={(e) => updateConfig('githubUrl', e.target.value)}
              placeholder="输入GitHub个人主页URL"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitterUrl">Twitter链接</Label>
            <Input
              id="twitterUrl"
              value={config.twitterUrl || ''}
              onChange={(e) => updateConfig('twitterUrl', e.target.value)}
              placeholder="输入Twitter个人主页URL"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn链接</Label>
            <Input
              id="linkedinUrl"
              value={config.linkedinUrl || ''}
              onChange={(e) => updateConfig('linkedinUrl', e.target.value)}
              placeholder="输入LinkedIn个人主页URL"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wechatQr">微信二维码</Label>
            <Input
              id="wechatQr"
              value={config.wechatQr || ''}
              onChange={(e) => updateConfig('wechatQr', e.target.value)}
              placeholder="输入微信二维码图片URL"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}