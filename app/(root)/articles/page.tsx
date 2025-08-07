export default function ArticlesPage() {

  const articles = [
    {
      id: 1,
      date: '2024.01.15',
      category: '前端开发',
      title: 'Next.js 15 新特性详解与实践',
      excerpt: 'Next.js 15 带来了许多令人兴奋的新特性，包括改进的性能、更好的开发体验和新的API。本文将详细介绍这些新特性，并通过实际案例展示如何在项目中应用...',
      tags: ['Next.js', 'React'],
      readTime: '8 min',
      gradient: 'from-blue-600 via-purple-600 to-indigo-600'
    },
    {
      id: 2,
      date: '2024.01.12',
      category: '技术分享',
      title: 'GSAP动画库实战：打造炫酷的网页动效',
      excerpt: 'GSAP是一个强大的JavaScript动画库，可以帮助我们创建流畅、高性能的网页动画。本文将通过实际案例，展示如何使用GSAP创建各种炫酷的动画效果...',
      tags: ['GSAP', '动画'],
      readTime: '12 min',
      gradient: 'from-purple-600 via-pink-600 to-red-600'
    },
    {
      id: 3,
      date: '2024.01.10',
      category: '生活随笔',
      title: '程序员的2024年度总结与展望',
      excerpt: '回顾2024年的技术成长历程，从学习新技术到参与开源项目，从解决复杂问题到分享技术心得。这一年收获满满，也对未来充满期待...',
      tags: ['年度总结', '感悟'],
      readTime: '6 min',
      gradient: 'from-green-600 via-teal-600 to-cyan-600'
    }
  ];

  return (
    <div>
      {/* 动态视频背景 */}
      <div className="fixed inset-0">
        {/* 背景视频 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.2]"
        >
          <source src="/video/V1.mp4" type="video/mp4" />
        </video>
        
        {/* 视频遮罩层 */}
        <div className="absolute inset-0 bg-black/30"></div>

      </div>

      {/* 主要内容 */}
      <div className="relative z-10 min-h-screen">
        {/* 顶部标题区域 */}
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6 tracking-tight">
                ARTICLES
              </h1>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              探索技术前沿，分享编程智慧，记录成长足迹
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* 左侧边栏 - 重新设计 */}
            <aside className="w-80 flex-shrink-0">
              <div className="sticky top-20 space-y-8">
                {/* 个人简介卡片 - 科技风格 */}
                <div className="relative group">
                  <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-1 bg-slate-900 rounded-full flex items-center justify-center">
                          <span className="text-3xl font-black text-white">Z</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white/90 mb-2">Z-Blog</h3>
                      <p className="text-white/70 mb-6">Code • Create • Inspire</p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="text-2xl font-bold text-blue-400/90">12</div>
                          <div className="text-xs text-white/60">文章</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="text-2xl font-bold text-purple-400/90">8</div>
                          <div className="text-xs text-white/60">标签</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="text-2xl font-bold text-green-400/90">5</div>
                          <div className="text-xs text-white/60">分类</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 分类导航 - 霓虹风格 */}
                <div className="relative group">
                  <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white/90 mb-6 flex items-center">
                      <span className="w-2 h-2 bg-green-400/80 rounded-full mr-3 animate-pulse"></span>
                      文章分类
                    </h4>
                    <ul className="space-y-3">
                      {[
                        { name: '前端开发', count: 5, color: 'blue' },
                        { name: '后端技术', count: 3, color: 'green' },
                        { name: '生活随笔', count: 2, color: 'purple' },
                        { name: '技术分享', count: 2, color: 'pink' }
                      ].map((category, index) => (
                        <li key={index}>
                          <a href="#" className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all duration-300">
                            <span className="text-white/70 group-hover:text-white/90 transition-colors">{category.name}</span>
                            <span className={`px-2 py-1 text-xs rounded-full bg-${category.color}-500/20 text-${category.color}-400 border border-${category.color}-500/30`}>
                              {category.count}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 热门标签 - 发光效果 */}
                <div className="relative group">
                  <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white/90 mb-6 flex items-center">
                      <span className="w-2 h-2 bg-pink-400/80 rounded-full mr-3 animate-pulse"></span>
                      热门标签
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {['React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'Node.js'].map((tag, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-white/10 text-white/80 text-sm rounded-full border border-white/20 hover:border-white/30 hover:text-white/90 hover:shadow-lg hover:shadow-white/10 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:bg-white/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* 右侧主要内容区域 - 未来科技风 */}
            <main className="flex-1">
              <div className="space-y-8">
                {articles.map((article, index) => (
                  <article 
                    key={article.id}
                    className="group relative"
                  >
                    <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-black/30">
                      
                      <div className="p-8">
                        {/* 文章元信息 */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full border border-white/20">
                              {article.date}
                            </span>
                            <span className="text-white/60">•</span>
                            <span className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-xs font-medium">
                              {article.category}
                            </span>
                            <span className="text-white/60">•</span>
                            <span className="text-white/60">{article.readTime}</span>
                          </div>
                          
                          {/* 阅读指示器 */}
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-400">NEW</span>
                          </div>
                        </div>

                        {/* 文章标题 */}
                        <h2 className="text-3xl font-bold text-white/90 mb-4 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 cursor-pointer">
                          {article.title}
                        </h2>

                        {/* 文章摘要 */}
                        <p className="text-white/70 mb-6 leading-relaxed text-lg">
                          {article.excerpt}
                        </p>

                        {/* 底部信息 */}
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-3">
                            {article.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-lg border border-white/20 hover:border-white/30 transition-colors"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          
                          <button className="group/btn flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                            <span className="font-medium">阅读全文</span>
                            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* 悬停时的额外效果 */}
                    </div>
                  </article>
                ))}
              </div>

              {/* 分页 - 科技风格 */}
              <div className="flex justify-center mt-16">
                <nav className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-white/10 text-white/80 rounded-lg border border-white/20 hover:border-white/30 hover:text-white/90 transition-all duration-300 backdrop-blur-sm">
                    ← 上一页
                  </button>
                  
                  {[1, 2, 3].map((page) => (
                    <button 
                      key={page}
                      className={`px-4 py-2 rounded-lg border transition-all duration-300 backdrop-blur-sm ${
                        page === 1 
                          ? 'bg-white/30 text-white border-white/40 shadow-lg shadow-white/10' 
                          : 'bg-white/10 text-white/80 border-white/20 hover:border-white/30 hover:text-white/90 hover:bg-white/20'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button className="px-4 py-2 bg-white/10 text-white/80 rounded-lg border border-white/20 hover:border-white/30 hover:text-white/90 transition-all duration-300 backdrop-blur-sm">
                    下一页 →
                  </button>
                </nav>
              </div>
            </main>
          </div>
        </div>
        
        {/* 底部装饰 */}
        <div className="mt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}