"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Save, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from '@/components/ui/alert'

interface SaveButtonProps {
  onSave: () => void
  isPending: boolean
  error?: string | null
  disabled?: boolean
  className?: string
}

export function SaveButton({ 
  onSave, 
  isPending, 
  error, 
  disabled = false, 
  className = "" 
}: SaveButtonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* 错误提示 */}
      {error && (
        <Alert variant="destructive" className="animate-in slide-in-from-top-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {/* 保存按钮 */}
      <div className="flex justify-end">
        <Button 
          onClick={onSave}
          disabled={isPending || disabled}
          className="min-w-[120px] transition-all duration-200"
          variant={error ? "destructive" : "default"}
        >
          {isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              保存中...
            </>
          ) : error ? (
            <>
              <AlertCircle className="h-4 w-4 mr-2" />
              重试保存
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              保存配置
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

// 成功状态组件
export function SaveSuccess({ message = "保存成功！" }: { message?: string }) {
  return (
    <Alert className="animate-in slide-in-from-top-2 border-green-200 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800">
        {message}
      </AlertDescription>
    </Alert>
  )
}

// 加载状态指示器
export function SaveLoadingIndicator({ text = "正在保存..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
      <span className="text-blue-800 font-medium">{text}</span>
    </div>
  )
}

// 错误状态组件
export function SaveError({ 
  error, 
  onRetry, 
  onDismiss 
}: { 
  error: string
  onRetry?: () => void
  onDismiss?: () => void 
}) {
  return (
    <Alert variant="destructive" className="animate-in slide-in-from-top-2">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{error}</span>
        <div className="flex gap-2 ml-4">
          {onRetry && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry}
              className="h-7 px-2 text-xs"
            >
              重试
            </Button>
          )}
          {onDismiss && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDismiss}
              className="h-7 px-2 text-xs"
            >
              关闭
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}