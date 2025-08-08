// 项目数据服务

export interface Project {
  id: string;
  title: string;
  description: string;
  previewUrl?: string;
  repositoryUrl?: string;
  techStack: string[];
  startDate: string;
  endDate?: string;
  status: string;
  image?: string;
  featured: boolean;
  sortOrder: number;
  userId?: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  previewUrl?: string;
  repositoryUrl?: string;
  techStack: string[];
  startDate: string;
  endDate?: string;
  status?: string;
  image?: string;
  featured?: boolean;
  sortOrder?: number;
}

export interface UpdateProjectData extends CreateProjectData {
  id: string;
}

export interface ProjectsResponse {
  success: boolean;
  data?: Project[];
  error?: string;
}

export interface ProjectResponse {
  success: boolean;
  data?: Project;
  error?: string;
}

export interface ProjectActionResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

// 获取所有项目
export async function getProjects(params?: {
  featured?: boolean;
  status?: string;
}): Promise<ProjectsResponse> {
  try {
    const searchParams = new URLSearchParams();
    
    if (params?.featured !== undefined) {
      searchParams.append('featured', params.featured.toString());
    }
    
    if (params?.status) {
      searchParams.append('status', params.status);
    }
    
    const url = `/api/projects${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || '获取项目列表失败');
    }
    
    return result;
  } catch (error) {
    console.error('获取项目列表失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '获取项目列表失败'
    };
  }
}

// 获取单个项目
export async function getProject(id: string): Promise<ProjectResponse> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || '获取项目详情失败');
    }
    
    return result;
  } catch (error) {
    console.error('获取项目详情失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '获取项目详情失败'
    };
  }
}

// 创建项目
export async function createProject(data: CreateProjectData): Promise<ProjectResponse> {
  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || '创建项目失败');
    }
    
    return result;
  } catch (error) {
    console.error('创建项目失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '创建项目失败'
    };
  }
}

// 更新项目
export async function updateProject(id: string, data: CreateProjectData): Promise<ProjectResponse> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || '更新项目失败');
    }
    
    return result;
  } catch (error) {
    console.error('更新项目失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '更新项目失败'
    };
  }
}

// 删除项目
export async function deleteProject(id: string): Promise<ProjectActionResponse> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || '删除项目失败');
    }
    
    return result;
  } catch (error) {
    console.error('删除项目失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '删除项目失败'
    };
  }
}

// 初始化项目数据
export async function initializeProjects(): Promise<ProjectActionResponse> {
  try {
    const response = await fetch('/api/projects/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || '初始化项目数据失败');
    }
    
    return result;
  } catch (error) {
    console.error('初始化项目数据失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '初始化项目数据失败'
    };
  }
}

// 清空项目数据
export async function clearProjects(): Promise<ProjectActionResponse> {
  try {
    const response = await fetch('/api/projects/init', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || '清空项目数据失败');
    }
    
    return result;
  } catch (error) {
    console.error('清空项目数据失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '清空项目数据失败'
    };
  }
}