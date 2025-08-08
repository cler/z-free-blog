"use client";

import React, { useState, useEffect } from "react";
import {
  AiOutlineGithub,
  AiOutlineEye,
  AiOutlineClose,
  AiOutlineCalendar,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/magicui/border-beam";
import { 
  Project,
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  initializeProjects,
  clearProjects,
  CreateProjectData
} from "@/lib/services/projects";
import { toast } from "sonner";



const techStackOptions = [
  "React",
  "Next.js",
  "Vue.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "GSAP",
  "Firebase",
  "Stripe",
  "Socket.io",
  "Python",
  "Django",
  "Flask",
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
    JavaScript: "bg-yellow-500 text-black",
    PostgreSQL: "bg-blue-700 text-white",
    Python: "bg-blue-800 text-white",
    Django: "bg-green-800 text-white",
    Flask: "bg-gray-700 text-white",
  };
  return colors[tech] || "bg-gray-500 text-white";
};

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    "进行中": "bg-blue-100 text-blue-800",
    "已完成": "bg-green-100 text-green-800",
    "暂停": "bg-yellow-100 text-yellow-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<CreateProjectData>>({
    title: "",
    description: "",
    previewUrl: "",
    repositoryUrl: "",
    techStack: [],
    startDate: "",
    endDate: "",
    status: "进行中",
  });
  const [selectedTech, setSelectedTech] = useState("");
  const [loading, setLoading] = useState(true);

  // 加载项目数据
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      if (response.success && response.data) {
        setProjects(response.data);
      } else {
        console.error('Failed to load projects:', response.error);
        toast.error(response.error || '加载项目失败');
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
      toast.error('加载项目失败');
    } finally {
      setLoading(false);
    }
  };

  // 初始化项目数据
  const handleInitializeProjects = async () => {
    if (!confirm('确定要初始化项目数据吗？这将添加示例项目到数据库中。')) {
      return;
    }
    
    try {
      const response = await initializeProjects();
      if (response.success) {
        toast.success(response.message || '初始化成功');
        await loadProjects();
      } else {
        toast.error(response.error || '初始化失败');
      }
    } catch (error) {
      console.error('Failed to initialize projects:', error);
      toast.error('初始化项目数据失败');
    }
  };

  // 清空项目数据
  const handleClearProjects = async () => {
    if (!confirm('确定要清空所有项目数据吗？此操作不可恢复！')) {
      return;
    }
    
    try {
      const response = await clearProjects();
      if (response.success) {
        toast.success(response.message || '清空成功');
        await loadProjects();
      } else {
        toast.error(response.error || '清空失败');
      }
    } catch (error) {
      console.error('Failed to clear projects:', error);
      toast.error('清空项目数据失败');
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      previewUrl: "",
      repositoryUrl: "",
      techStack: [],
      startDate: "",
      endDate: "",
      status: "进行中",
    });
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setIsDialogOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("确定要删除这个项目吗？")) {
      try {
        const response = await deleteProject(id);
        if (response.success) {
          toast.success('项目删除成功');
          await loadProjects();
        } else {
          toast.error(response.error || '删除项目失败');
        }
      } catch (error) {
        console.error('Failed to delete project:', error);
        toast.error('删除项目失败');
      }
    }
  };

  const handleSaveProject = async () => {
    if (!formData.title || !formData.description) {
      toast.error("请填写项目标题和描述");
      return;
    }

    try {
      let response;
      if (editingProject) {
        // 编辑现有项目
        response = await updateProject(editingProject.id, formData as CreateProjectData);
      } else {
        // 新增项目
        response = await createProject(formData as CreateProjectData);
      }
      
      if (response.success) {
        toast.success(editingProject ? '项目更新成功' : '项目创建成功');
        await loadProjects();
        setIsDialogOpen(false);
        setEditingProject(null);
        // 重置表单
        setFormData({
          title: "",
          description: "",
          previewUrl: "",
          repositoryUrl: "",
          techStack: [],
          startDate: "",
          endDate: "",
          status: "进行中",
        });
      } else {
        toast.error(response.error || '保存项目失败');
      }
    } catch (error) {
      console.error('Failed to save project:', error);
      toast.error('保存项目失败');
    }
  };

  const handleAddTechStack = () => {
    if (selectedTech && !formData.techStack?.includes(selectedTech)) {
      setFormData({
        ...formData,
        techStack: [...(formData.techStack || []), selectedTech],
      });
      setSelectedTech("");
    }
  };

  const handleRemoveTechStack = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack?.filter((t) => t !== tech) || [],
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">项目管理</h1>
          <p className="text-gray-600 mt-2">
            管理和展示您的项目作品，包括新增、编辑和删除项目。
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleInitializeProjects}>
            初始化数据
          </Button>
          <Button variant="outline" onClick={handleClearProjects}>
            清空数据
          </Button>
          <Button onClick={loadProjects} variant="outline">
            刷新
          </Button>
          <Button onClick={handleAddProject} className="flex items-center gap-2">
            <AiOutlinePlus className="w-4 h-4" />
            新增项目
          </Button>
        </div>
      </div>

      {/* 项目统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              总项目数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              进行中
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {projects.filter((p) => p.status === "进行中").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              已完成
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {projects.filter((p) => p.status === "已完成").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 项目列表 */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">加载中...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="relative overflow-hidden">
              <BorderBeam duration={8} size={100} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge
                      className={`mt-2 ${getStatusColor(project.status)}`}
                      variant="secondary"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditProject(project)}
                    >
                      <AiOutlineEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <AiOutlineDelete className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {project.description}
                </CardDescription>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <AiOutlineCalendar className="mr-2" />
                    {project.startDate}
                    {project.endDate && ` - ${project.endDate}`}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech, index) => (
                      <Badge
                        key={index}
                        className={`text-xs ${getTechStackColor(tech)}`}
                        variant="secondary"
                      >
                        {tech}
                      </Badge>
                    ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <AiOutlineEye className="w-3 h-3" />
                      预览
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <AiOutlineGithub className="w-3 h-3" />
                      源码
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}

      {/* 新增/编辑项目对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "编辑项目" : "新增项目"}
            </DialogTitle>
            <DialogDescription>
              填写项目的基本信息，包括标题、描述、技术栈等。
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                项目标题
              </Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="col-span-3"
                placeholder="输入项目标题"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                项目描述
              </Label>
              <textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="col-span-3 min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入项目描述"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="previewUrl" className="text-right">
                预览链接
              </Label>
              <Input
                id="previewUrl"
                value={formData.previewUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, previewUrl: e.target.value })
                }
                className="col-span-3"
                placeholder="https://example.com"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="repositoryUrl" className="text-right">
                仓库链接
              </Label>
              <Input
                id="repositoryUrl"
                value={formData.repositoryUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, repositoryUrl: e.target.value })
                }
                className="col-span-3"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                开始时间
              </Label>
              <Input
                id="startDate"
                value={formData.startDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="col-span-3"
                placeholder="2024-01"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                结束时间
              </Label>
              <Input
                id="endDate"
                value={formData.endDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="col-span-3"
                placeholder="2024-02（可选）"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                项目状态
              </Label>
              <Select
                value={formData.status || "进行中"}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as Project["status"] })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择项目状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="进行中">进行中</SelectItem>
                  <SelectItem value="已完成">已完成</SelectItem>
                  <SelectItem value="暂停">暂停</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">技术栈</Label>
              <div className="col-span-3 space-y-3">
                <div className="flex gap-2">
                  <Select value={selectedTech} onValueChange={setSelectedTech}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="选择技术栈" />
                    </SelectTrigger>
                    <SelectContent>
                      {techStackOptions.map((tech) => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={handleAddTechStack}
                    disabled={!selectedTech}
                  >
                    添加
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack?.map((tech, index) => (
                    <Badge
                      key={index}
                      className={`${getTechStackColor(tech)} cursor-pointer`}
                      onClick={() => handleRemoveTechStack(tech)}
                    >
                      {tech} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              取消
            </Button>
            <Button type="button" onClick={handleSaveProject}>
              {editingProject ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}