"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HomePageConfig } from "@/types"

interface NavConfigProps {
  config: HomePageConfig
  updateConfig: (field: keyof HomePageConfig, value: string | boolean) => void
}

export function NavConfig({ config, updateConfig }: NavConfigProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>导航栏配置</CardTitle>
        <CardDescription>设置网站导航栏的显示内容</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="navSlogan">导航栏标语</Label>
          <Input
            id="navSlogan"
            value={config.navSlogan || ''}
            onChange={(e) => updateConfig('navSlogan', e.target.value)}
            placeholder="输入导航栏标语"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="navLogo">导航栏Logo</Label>
          <Input
            id="navLogo"
            value={config.navLogo || ''}
            onChange={(e) => updateConfig('navLogo', e.target.value)}
            placeholder="输入Logo图片URL"
          />
        </div>
      </CardContent>
    </Card>
  )
}