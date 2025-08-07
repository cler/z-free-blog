import { z } from 'zod'
import { homePageConfigSchema } from '@/lib/validator'

// 从 zod schema 推导出 TypeScript 类型
export type HomePageConfig = z.infer<typeof homePageConfigSchema>

// 其他通用类型定义
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 视频相关类型
export interface VideoFile {
  name: string
  url: string
  size?: number
  duration?: number
  thumbnail?: string
}

export interface UploadResponse {
  success: boolean
  fileName: string
  url: string
  error?: string
}