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

// Menu items configuration
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  orgs: [
    {
      name: "Wonder CRM",
      logo: HouseIcon,
      plan: "Enterprise",
    },
    {
      name: "One Amo",
      logo: AudioWaveform,
      plan: "Free",
    },
    {
      name: "Another Org",
      logo: Command,
      plan: "Free",
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
      ],
    },
    {
      title: "Tickets",
      url: "/tickets",
      icon: Ticket,
      items: [
        {
          title: "All Tickets",
          url: "/tickets",
        },
        {
          title: "Activities",
          url: "/tickets/activities",
        },
        {
          title: "Ticket Settings",
          url: "/tickets/settings",
        },
      ],
    },
    {
      title: "Organizations",
      url: "/organizations",
      icon: Building2,
      items: [
        {
          title: "All Organizations",
          url: "/organizations",
        },
        {
          title: "Teams",
          url: "/organizations/teams",
        },
        {
          title: "Users",
          url: "/organizations/users",
        },
      ],
    },
    {
      title: "User Management",
      url: "/customers",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/users",
        },
        {
          title: "MORE",
          url: "/",
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
    <Sidebar className="border-r bg-gray-50 h-full min-h-screen">
      {/* Sidebar Header */}
      <SidebarHeader className="p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-b-lg">
        <Card className="bg-transparent shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl font-semibold">
              <Laptop className="mr-2 inline-block" />
              TNO ADMIN
            </CardTitle>
          </CardHeader>
        </Card>
      </SidebarHeader>
      {/* User Menu */}
      <UserMenu/>
      {/* Sidebar Content */}
      <SidebarContent>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      </SidebarContent>
    </Sidebar>
  );
}
