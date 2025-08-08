'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* 404 大标题 */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
        </div>
        
        {/* 错误信息 */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">
            页面未找到
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            抱歉，您访问的页面不存在或已被移动。
            <br />
            请检查网址是否正确，或返回首页继续浏览。
          </p>
        </div>
        
        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              返回首页
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            返回上页
          </Button>
        </div>
        
        {/* 装饰性元素 */}
        <div className="flex justify-center space-x-2 pt-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full opacity-60 animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}