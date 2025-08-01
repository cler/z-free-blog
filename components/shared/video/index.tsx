"use client";
import React from "react";
import VideoAnimation from "../video-animation";
import PersonalInfoComponent from "../personal-info";
import { usePersonalInfo } from "@/lib/hooks/usePersonalInfo";

export default function Video() {
  const { data: personalInfo, loading, error } = usePersonalInfo();

  if (loading) {
    return (
      <div className="h-dvh flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  if (error || !personalInfo) {
    return (
      <div className="h-dvh flex items-center justify-center bg-gray-900">
        <div className="text-red-400 text-xl">加载失败: {error}</div>
      </div>
    );
  }

  return (
    <VideoAnimation videoSrc="/video/V1.mp4">
      <PersonalInfoComponent data={personalInfo} />
    </VideoAnimation>
  );
}
