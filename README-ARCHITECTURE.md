# 项目架构重构说明

## 概述

本次重构将原本耦合在一起的视频组件进行了模块化拆分，提高了代码的可维护性和可复用性。

## 新的架构结构

### 1. 数据层 (Data Layer)

#### 类型定义
- `lib/types/personal-info.ts` - 个人信息相关的TypeScript类型定义

#### 数据管理
- `lib/data/personal-info.ts` - 个人信息数据和API模拟
- `lib/hooks/usePersonalInfo.ts` - 个人信息数据获取的自定义Hook

### 2. 组件层 (Component Layer)

#### 核心组件
- `components/shared/video-animation/index.tsx` - 视频播放和GSAP动画逻辑
- `components/shared/personal-info/index.tsx` - 个人信息展示组件
- `components/shared/video/index.tsx` - 主视频组件（组合其他组件）

## 组件说明

### VideoAnimation 组件

**功能：**
- 视频播放控制
- GSAP动画逻辑
- 响应式布局容器

**Props：**
```typescript
interface VideoAnimationProps {
  videoSrc: string;        // 视频文件路径
  children?: React.ReactNode; // 子组件内容
  className?: string;      // 额外的CSS类名
}
```

### PersonalInfoComponent 组件

**功能：**
- 个人信息展示
- 技能栈展示
- 专业特长展示

**Props：**
```typescript
interface PersonalInfoComponentProps {
  data: PersonalInfo;      // 个人信息数据
  className?: string;      // 额外的CSS类名
}
```

### usePersonalInfo Hook

**功能：**
- 异步获取个人信息数据
- 加载状态管理
- 错误处理

**返回值：**
```typescript
{
  data: PersonalInfo | null;  // 个人信息数据
  loading: boolean;           // 加载状态
  error: string | null;       // 错误信息
}
```

## 重构优势

### 1. 关注点分离
- **数据层**：专注于数据获取和管理
- **视频动画层**：专注于视频播放和动画效果
- **展示层**：专注于UI渲染

### 2. 可复用性
- `VideoAnimation` 组件可以用于其他视频场景
- `PersonalInfoComponent` 可以在其他页面复用
- 数据层可以轻松扩展为真实的API调用

### 3. 可维护性
- 每个组件职责单一，易于理解和修改
- 类型安全，减少运行时错误
- 模块化结构，便于团队协作

### 4. 可测试性
- 每个组件可以独立测试
- 数据层可以轻松mock
- Hook可以单独测试

## 使用示例

### 基本使用
```tsx
import Video from '@/components/shared/video';

export default function HomePage() {
  return <Video />;
}
```

### 自定义使用
```tsx
import VideoAnimation from '@/components/shared/video-animation';
import PersonalInfoComponent from '@/components/shared/personal-info';
import { usePersonalInfo } from '@/lib/hooks/usePersonalInfo';

export default function CustomPage() {
  const { data, loading, error } = usePersonalInfo();
  
  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error: {error}</div>;
  
  return (
    <VideoAnimation videoSrc="/video/custom-video.mp4">
      <PersonalInfoComponent data={data} />
    </VideoAnimation>
  );
}
```

## 扩展建议

### 1. 真实API集成
将 `lib/data/personal-info.ts` 中的模拟API替换为真实的后端API调用。

### 2. 缓存策略
在 `usePersonalInfo` Hook中添加缓存机制，避免重复请求。

### 3. 错误边界
添加React Error Boundary来处理组件级别的错误。

### 4. 性能优化
- 使用 `React.memo` 优化组件渲染
- 添加懒加载机制
- 视频预加载优化

### 5. 国际化
添加多语言支持，将硬编码的文本提取到语言文件中。