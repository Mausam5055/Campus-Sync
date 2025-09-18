import React from 'react'
import { NavLink } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { GraduationCap } from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { navigationData } from './navigationData'

export const SidebarNavigation: React.FC = () => {
  const { user } = useAuth()
  
  const userData = {
    name: user?.name || "Student",
    email: user?.email || "student@university.edu", 
    avatar: "/placeholder.svg",
  }

  const role = user?.role ?? "student"
  const exclude = new Set(["Fitness","Pomodoro","Tasks","Expenses","Music Player","Notes","Calculators","Dashboard"])
  const adminExclude = new Set([...exclude, "Timetable"])
  
  let navItems = navigationData.navMain
  if (role === "admin") {
    navItems = navigationData.navMain.filter((item) => !adminExclude.has(item.title))
  } else if (role === "teacher") {
    navItems = navigationData.navMain.filter((item) => !exclude.has(item.title))
  }

  // Filter subitems based on roles and remove roles property
  const filteredNavItems = navItems.map(item => {
    const filteredSubItems = item.items?.filter((subItem: any) => !subItem.roles || subItem.roles.includes(role))
      .map((subItem: any) => ({ title: subItem.title, url: subItem.url }))
    
    return {
      ...item,
      items: filteredSubItems
    }
  }).filter(item => {
    // Hide items that have role restrictions and user doesn't have access
    if ((item as any).roles && !(item as any).roles.includes(role)) {
      return false
    }
    // Hide items that have subitems but none are accessible to current role
    if (item.items && item.items.length === 0 && (item as any).items?.length > 0) {
      return false
    }
    return true
  })

  return (
    <Sidebar variant="inset" className="scrollbar-hide">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CampusSync</span>
                  <span className="truncate text-xs">Student Portal</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="scrollbar-hide">
        <NavMain items={filteredNavItems} />
        <NavProjects projects={navigationData.projects} />
        <NavSecondary items={navigationData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}