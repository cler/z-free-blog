"use client";
import React from "react";
import VideoAnimation from "../video-animation";
import PersonalInfoComponent from "../personal-info";
import { HomePageConfig } from "@/types";
import { PersonalInfo } from "@/lib/types/personal-info";

interface VideoProps {
  config?: HomePageConfig | null;
}

export default function Video({ config }: VideoProps) {
  // 服务端已经保证config存在，使用默认值作为fallback
  const videoSrc = config?.videoUrl || "/video/V1.mp4";

  // 从全局配置构建个人信息数据
  const personalInfo: PersonalInfo = {
    title: config?.globalTitle || "开发者",
    subtitle: config?.globalDescription || "全栈开发工程师",
    frontendStack: {
      title: config?.cardTitle1 || "前端技术栈",
      skills: config?.cardContent1 ? 
        config.cardContent1.split('\n').filter(skill => skill.trim()).map(skill => ({
          name: skill.trim(),
          description: ""
        })) : []
    },
    backendStack: {
      title: config?.cardTitle2 || "后端技术栈",
      skills: config?.cardContent2 ? 
        config.cardContent2.split('\n').filter(skill => skill.trim()).map(skill => ({
          name: skill.trim(),
          description: ""
        })) : []
    },
    specialties: {
      title: config?.cardTitle3 || "专业技能",
      items: config?.cardContent3 ? 
        (() => {
          try {
            const parsed = JSON.parse(config.cardContent3);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })() : []
    }
  };

  return (
    <VideoAnimation videoSrc={videoSrc}>
      <PersonalInfoComponent data={personalInfo} />
    </VideoAnimation>
  );
}
