"use client";

import React, { useState } from "react";
import {
  AiOutlineGithub,
  AiOutlineEye,
  AiOutlineClose,
  AiOutlineCalendar,
} from "react-icons/ai";
import { ShineBorder } from "@/components/magicui/shine-border";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Project {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
  repositoryUrl: string;
  techStack: string[];
  startDate: string;
  endDate?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Z-Free-Blog",
    description:
      "基于 Next.js 15 开发的现代化个人博客系统，支持 GSAP 动画、响应式设计和优雅的用户界面。",
    previewUrl: "http://localhost:3001",
    repositoryUrl: "https://github.com/username/z-free-blog",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    startDate: "2024-01",
    endDate: "2024-02",
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description:
      "全栈电商平台，包含用户管理、商品管理、订单处理、支付集成等完整功能。",
    previewUrl: "https://example-ecommerce.com",
    repositoryUrl: "https://github.com/username/ecommerce-platform",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    startDate: "2023-09",
    endDate: "2023-12",
  },
  {
    id: "3",
    title: "Task Management App",
    description:
      "团队协作任务管理应用，支持项目管理、任务分配、进度跟踪和实时通讯。",
    previewUrl: "https://example-taskapp.com",
    repositoryUrl: "https://github.com/username/task-management",
    techStack: ["Vue.js", "Firebase", "Vuetify", "Socket.io"],
    startDate: "2023-06",
    endDate: "2023-08",
  },
];

const getTechStackColor = (tech: string) => {
  const colors: { [key: string]: string } = {
    "Next.js": "bg-black text-white",
    React: "bg-blue-500 text-white",
    TypeScript: "bg-blue-600 text-white",
    "Tailwind CSS": "bg-cyan-500 text-white",
    GSAP: "bg-green-500 text-white",
    "Node.js": "bg-green-600 text-white",
    MongoDB: "bg-green-700 text-white",
    Express: "bg-gray-600 text-white",
    Stripe: "bg-purple-600 text-white",
    "Vue.js": "bg-green-500 text-white",
    Firebase: "bg-orange-500 text-white",
    Vuetify: "bg-blue-400 text-white",
    "Socket.io": "bg-gray-800 text-white",
  };
  return colors[tech] || "bg-gray-500 text-white";
};

const TechStackMarquee = ({ techStack }: { techStack: string[] }) => {
  const marqueeContent = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!marqueeContent.current) return;
      const el = marqueeContent.current;
      const parent = el.parentElement;
      if (!parent) return;

      const elWidth = el.scrollWidth;
      const parentWidth = parent.offsetWidth;

      if (elWidth > parentWidth) {
        gsap.to(el, {
          x: -(elWidth - parentWidth + 16),
          duration: techStack.length * 0.9,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }
    },
    { dependencies: [techStack] }
  );

  return (
    <div className="relative flex w-full overflow-hidden">
      <div ref={marqueeContent} className="flex flex-nowrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className={`inline-block shrink-0 px-3 py-1 rounded-full text-sm font-medium ${getTechStackColor(
              tech
            )}`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

function ProjectList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = (project: Project) => {
    setSelectedProject(project);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedProject(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">我的项目作品</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          这里展示了我开发的一些项目，涵盖了前端、后端、全栈开发等不同领域的技术实践。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => {
          return (
            <Card
              key={project.id}
              className="relative overflow-hidden max-w-[350px] w-full"
            >
              <BorderBeam duration={8} size={100} />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AiOutlineCalendar className="mr-2" />
                      <span className="text-sm text-gray-600">
                        {project.startDate}
                        {project.endDate && ` - ${project.endDate}`}
                      </span>
                    </div>
                  </div>

                  <TechStackMarquee techStack={project.techStack} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 预览模态框 */}
      {showPreview && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl h-5/6 flex flex-col">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedProject.previewUrl}
                </p>
              </div>
              <button
                onClick={closePreview}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
            </div>

            {/* iframe 预览区域 */}
            <div className="flex-1 p-4">
              <iframe
                src={selectedProject.previewUrl}
                className="w-full h-full border rounded-lg"
                title={`${selectedProject.title} 预览`}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>

            {/* 模态框底部 */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <a
                    href={selectedProject.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <AiOutlineEye className="mr-2" />
                    在新窗口打开
                  </a>
                  <a
                    href={selectedProject.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <AiOutlineGithub className="mr-2" />
                    查看源码
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full ${getTechStackColor(
                        tech
                      )}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
