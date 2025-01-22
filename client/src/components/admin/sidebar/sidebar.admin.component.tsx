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
          url: "/dashboard",
        },
        {
          title: "Finance",
          url: "/finance",
        },
      ],
    },
    {
      title: "Students",
      url: "/students",
      icon: Ticket,
      items: [
        {
          title: "All Student",
          url: "/students",
        },
        {
          title: "Add New Student",
          url: "/students/add",
        },
      ],
    },
    {
      title: "Teachers",
      url: "/teachers",
      icon: Building2,
      items: [
        {
          title: "All Teachers",
          url: "/teachers",
        },
        {
          title: "Add New Teacher",
          url: "teachers/add",
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
          url: "/profile",
        },
        {
          title: "Edit Profile",
          url: "/profile/edit",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Settings",
          url: "/settings",
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
