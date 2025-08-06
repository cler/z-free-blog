"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface VideoAnimationProps {
  videoSrc: string;
  children?: React.ReactNode;
  className?: string;
  personalInfoSelector?: string;
}

export default function VideoAnimation({ videoSrc, children, className = '', personalInfoSelector = '.person-info' }: VideoAnimationProps) {
  const vdRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // 初始设置
    gsap.set(vdRef.current, {
      scale: 1.2,
      transformOrigin: "center center",
    });

    // 设置个人信息初始位置（在屏幕下方）
    gsap.set(personalInfoSelector, {
      y: "100vh",
      opacity: 0,
    });

    // 页面加载后自动播放视频
    if (vdRef.current) {
      vdRef.current.onloadeddata = () => {
        vdRef.current?.play();
        
        // 获取视频时长并计算动画时长
        const videoDuration = vdRef.current?.duration || 10;
        const animationDuration = Math.min(videoDuration * 0.3, 5); // 动画时长为视频时长的30%，最大5秒
        const delayTime = Math.min(videoDuration * 0.5, 8); // 延迟时间为视频时长的50%，在后半段开始，最大8秒
        
        // 创建自动播放的时间线
        const tl = gsap.timeline({
          delay: delayTime,
        });


        // 个人信息从下方移动到中心
        tl.to(personalInfoSelector, {
          y: "0",
          opacity: 0.5,
          duration: animationDuration,
          ease: "power2.out",
        })
        .to(".header-box",{
          y: "0",
          duration: animationDuration * 0.6,
          ease: "power2.inOut",
        },"<")
        // 视频缩放效果
        .to(vdRef.current, {
          scale: 1,
          duration: animationDuration * 0.6,
          ease: "power2.inOut",
        }, `-=${animationDuration * 0.3}`)
       
      };
    }
  });

  return (
    <div className={`h-dvh first-vd-wrapper relative overflow-hidden ${className}`}>
      <video
        className="w-full h-full object-cover object-center"
        src={videoSrc}
        muted
        preload="auto"
        playsInline
        ref={vdRef}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}