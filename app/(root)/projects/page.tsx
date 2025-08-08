import ProjectList from "@/components/shared/project-list";

export default function ProjectsPage() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
            <ProjectList />
        </div>
      </div>
    </div>
  );
}