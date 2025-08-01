import Video from "@/components/shared/video";

export default function Home() {
  return (
    <>
      <Video />
      {/* 可以在这里添加其他页面内容 */}
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">继续探索</h2>
          <p className="text-lg text-gray-600">向下滚动查看更多内容</p>
        </div>
      </div>
    </>
  );
}
