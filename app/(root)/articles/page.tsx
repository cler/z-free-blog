import React from 'react';

export default function ArticlesPage() {
  return (
    <>
      {/* 博客主要内容区域 - 左右布局 */}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 py-8">
            {/* 左侧边栏 */}
            <aside className="w-80 flex-shrink-0">
              <div className="sticky top-20">
                {/* 个人简介卡片 */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      Z
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Z-Blog</h3>
                    <p className="text-gray-600 text-sm mb-4">分享技术，记录生活</p>
                    <div className="flex justify-center space-x-4 text-sm text-gray-500">
                      <span>文章 12</span>
                      <span>标签 8</span>
                      <span>分类 5</span>
                    </div>
                  </div>
                </div>

                {/* 分类导航 */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">文章分类</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">前端开发 (5)</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">后端技术 (3)</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">生活随笔 (2)</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">技术分享 (2)</a></li>
                  </ul>
                </div>

                {/* 热门标签 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">热门标签</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 cursor-pointer transition-colors">React</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full hover:bg-green-200 cursor-pointer transition-colors">Next.js</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full hover:bg-purple-200 cursor-pointer transition-colors">TypeScript</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full hover:bg-yellow-200 cursor-pointer transition-colors">JavaScript</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full hover:bg-pink-200 cursor-pointer transition-colors">CSS</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full hover:bg-indigo-200 cursor-pointer transition-colors">Node.js</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* 右侧主要内容区域 */}
            <main className="flex-1">
              {/* 文章列表 */}
              <div className="space-y-6">
                {/* 文章卡片示例 */}
                <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>2024年1月15日</span>
                      <span className="mx-2">•</span>
                      <span>前端开发</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                      Next.js 15 新特性详解与实践
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      Next.js 15 带来了许多令人兴奋的新特性，包括改进的性能、更好的开发体验和新的API。本文将详细介绍这些新特性，并通过实际案例展示如何在项目中应用...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Next.js</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">React</span>
                      </div>
                      <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">阅读更多 →</a>
                    </div>
                  </div>
                </article>

                <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>2024年1月12日</span>
                      <span className="mx-2">•</span>
                      <span>技术分享</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                      GSAP动画库实战：打造炫酷的网页动效
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      GSAP是一个强大的JavaScript动画库，可以帮助我们创建流畅、高性能的网页动画。本文将通过实际案例，展示如何使用GSAP创建各种炫酷的动画效果...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">GSAP</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">动画</span>
                      </div>
                      <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">阅读更多 →</a>
                    </div>
                  </div>
                </article>

                <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>2024年1月10日</span>
                      <span className="mx-2">•</span>
                      <span>生活随笔</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                      程序员的2024年度总结与展望
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      回顾2024年的技术成长历程，从学习新技术到参与开源项目，从解决复杂问题到分享技术心得。这一年收获满满，也对未来充满期待...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded">年度总结</span>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">感悟</span>
                      </div>
                      <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">阅读更多 →</a>
                    </div>
                  </div>
                </article>
              </div>

              {/* 分页 */}
              <div className="flex justify-center mt-12">
                <nav className="flex space-x-2">
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">上一页</button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded">1</button>
                  <button className="px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">2</button>
                  <button className="px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">3</button>
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">下一页</button>
                </nav>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}