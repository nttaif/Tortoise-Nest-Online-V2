import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/sidebar/sidebar.admin.component";
import { Button } from "@/components/ui/button";
import { Bell, MessageCircle, Moon, Search } from "lucide-react";
import Image from "next/image";
import NavAdminComponent from "@/components/admin/nav/nav.admin.component";
import { auth } from "@/lib/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session =await auth();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full h-auto bg-white">
        <NavAdminComponent />
        {/* Nội dung chính */}
        <div className="p-4 flex-grow">{children}</div>
      </main>
    </SidebarProvider>
  );
}
