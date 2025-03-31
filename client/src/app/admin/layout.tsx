import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/sidebar/sidebar.admin.component";
import NavAdminComponent from "@/components/admin/nav/nav.admin.component";
import { auth } from "@/lib/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session =await auth();
  if(session?.user.role!=="Admin"){
    
  }
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
