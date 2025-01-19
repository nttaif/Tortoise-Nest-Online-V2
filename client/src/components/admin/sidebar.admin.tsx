import React from "react";
import {
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  User2,
  Activity,
  Laptop,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Menu items configuration
const menuConfig = {
  management: [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Users", url: "/users", icon: User2 },
  ],
  settings: [
    { title: "Search", url: "#", icon: Search },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};

export function AppSidebar() {
  const renderMenuItems = (
    items: { title: string; url: string; icon: React.ComponentType<{ className?: string }> }[]
  ) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          asChild
          className="group flex items-center space-x-3 px-4 py-2 hover:bg-blue-100 rounded-md transition-all"
        >
          <a href={item.url} className="flex items-center space-x-3">
            <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
              {item.title}
            </span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

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
      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="flex-grow text-left font-medium text-gray-700">
                Admin
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="start"
            className="w-56 shadow-lg rounded-lg"
          >
            <DropdownMenuItem className="flex items-center space-x-2">
              <Activity className="mr-2 h-4 w-4 text-blue-500" />
              <span>Activities</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center space-x-2">
              <LogOut className="mr-2 h-4 w-4 text-red-500" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sidebar Content */}
      <SidebarContent>
        {/* Management Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-gray-500 font-semibold">
            MANAGEMENT
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(menuConfig.management)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-gray-500 font-semibold">
            SETTINGS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(menuConfig.settings)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
