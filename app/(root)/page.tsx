'use client';

import Header from "@/components/shared/header";
import ProjectList from "@/components/shared/project-list";
import Video from "@/components/shared/video";
import { useHomeConfig } from "@/lib/hooks/useHomeConfig";

export default function Home() {
  const { config, loading } = useHomeConfig();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <main>
      <Header 
        className="-translate-y-full fixed top-0 left-0 right-0 z-50" 
        config={config}
      />
      <Video config={config} />
      <ProjectList />
    </main>
  );
}
