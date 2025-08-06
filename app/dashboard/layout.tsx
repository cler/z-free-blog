import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { PageTitleProvider } from "@/components/dashboard/page-title-context"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


function layout({ children }: { children: React.ReactNode }) {

  return (
    <PageTitleProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </PageTitleProvider>
  )
}

export default layout