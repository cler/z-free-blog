"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/dashboard/nav-documents"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "仪表板",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "生命周期",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "数据分析",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "项目管理",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "团队管理",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "捕获",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "活跃提案",
          url: "#",
        },
        {
          title: "已归档",
          url: "#",
        },
      ],
    },
    {
      title: "提案",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "活跃提案",
          url: "#",
        },
        {
          title: "已归档",
          url: "#",
        },
      ],
    },
    {
      title: "提示词",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "活跃提案",
          url: "#",
        },
        {
          title: "已归档",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "设置",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "获取帮助",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "搜索",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "数据库",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "报告",
      url: "#",
      icon: IconReport,
    },
    {
      name: "文档助手",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Z-Free-Blog</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
