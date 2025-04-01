import React from "react";
import {
  Settings,
  Laptop,
  HouseIcon,
  AudioWaveform,
  Command,
  LayoutDashboard,
  Ticket,
  Building2,
  Users,
  Book,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { NavMain } from "./nav.main.component";
import UserMenu from "./user.menu.component";
import SidebarHeaderComponent from "./sidebar.header.component";

// Menu items configuration
const data = {
  user: {
    name: "dev",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  orgs: [
    {
      name: "TNO ADMIN",
      logo: HouseIcon,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "General",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
        },
        {
          title: "Finance",
          url: "/admin/finance",
        },
      ],
    },
    {
      title: "Students",
      url: "/admin/students",
      icon: Ticket,
      items: [
        {
          title: "All Student",
          url: "/admin/students",
        },
        {
          title: "Add New Student",
          url: "/admin/students/add",
        },
        {
          title: "Enrollment Management",
          url: "/admin/students/ManageEnrollment",
        },
        
      ],
    },
    {
      title: "Teachers",
      url: "/admin/teachers",
      icon: Building2,
      items: [
        {
          title: "All Teachers",
          url: "/admin/teachers",
        },
        {
          title: "Add New Teacher",
          url: "/admin/teachers/",
        },
        {
          title: "Teacher Deatils",
          url: "/admin/teachers/",
        },
      ],
    },
    {
      title: "Courses",
      url: "/courses",
      icon: Book,
      items: [
        {
          title: "All Courses",
          url: "/admin/courses",
        },
        {
          title: "Lesson Management",
          url: "/admin/lessons",  
        },
        
      ],
    },
    {
      title: "App",
      url: "/profile",
      icon: Users,
      items: [
        {
          title: "Profile",
          url: "/admin/profile",
        },
        {
          title: "Edit Profile",
          url: "/profile/edit",
        },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
      items: [
        {
          title: "Settings",
          url: "/admin/settings",
        },
      ],
    },
  ],
};
export function AppSidebar() {
  return (
    <Sidebar className="h-full min-h-screen">
      {/* Sidebar Header */}
      <SidebarHeader className="h-24 p-0 mb-1">
        <SidebarHeaderComponent/>
      </SidebarHeader>
      {/* Sidebar Content */}
      <SidebarContent className="bg-[#4D44B5] text-white rounded-md">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
