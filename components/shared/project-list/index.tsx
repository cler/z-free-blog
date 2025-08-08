"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  AiOutlineGithub,
  AiOutlineEye,
  AiOutlineClose,
  AiOutlineCalendar,
} from "react-icons/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { Project, getProjects } from "@/lib/services/projects";

// 项目数据现在从 API 获取

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
    Python: "bg-yellow-500 text-white",
    FastAPI: "bg-teal-600 text-white",
    OpenAI: "bg-emerald-600 text-white",
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

      // 降低触发阈值，当内容宽度接近容器宽度时就启用滚动
      // 或者当技术栈数量超过3个时强制启用滚动效果
      if (elWidth > parentWidth - 20 || techStack.length > 3) {
        gsap.to(el, {
          x: -(Math.max(elWidth - parentWidth + 16, 50)), // 确保至少有50px的滚动距离
          duration: Math.max(techStack.length * 0.9, 3), // 最小动画时长3秒
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // 加载项目数据
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
      startTransition(async() => {
          const response = await getProjects({ featured: true });
          if (response.success && response.data) {
            setProjects(response.data);
          } else {
            console.error('Failed to load projects:', response.error);
          }
      });
  };

  const handlePreview = (project: Project) => {
    setSelectedProject(project);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedProject(null);
  };

  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">加载项目中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12 relative z-50">
        <h2 className="text-3xl font-bold text-white mb-4">我的项目作品</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          这里展示了我开发的一些项目，涵盖了前端、后端、全栈开发等不同领域的技术实践。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {projects.map((project) => {
          return (
            <Card
              key={project.id}
              className="relative overflow-hidden max-w-[350px] w-full border border-gray-200"
            >
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
              <CardFooter className="pt-4">
                <div className="flex space-x-2 w-full">
                  <Button
                    onClick={() => handlePreview(project)}
                    className="flex-1"
                    variant="default"
                  >
                    <AiOutlineEye className="mr-2" />
                    预览
                  </Button>
                  <Button
                    asChild
                    className="flex-1"
                    variant="outline"
                  >
                    <Link
                      href={project.repositoryUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiOutlineGithub className="mr-2" />
                      源码
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* 预览模态框 */}
      {isPreviewOpen && selectedProject && (
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
