import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarNavigation } from './SidebarNavigation'
import { MainHeader } from './MainHeader'

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNavigation />
        <main className="flex-1 overflow-hidden">
          <MainHeader />
          <div className="h-[calc(100vh-4rem)] overflow-y-auto space-y-4 p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}