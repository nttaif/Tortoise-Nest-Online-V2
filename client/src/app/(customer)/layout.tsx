import PictureMainAuthComponents from "@/components/auth/login/picture.main.auth.components";
import HeaderAuth from "@/components/home/HeaderHome.components";
import { auth } from "@/lib/auth";
import { Toaster } from "sonner";

export default async function LayoutAuth({ children }: { children: React.ReactNode }) {
    const session = await auth()
  return (
    <div>
        <Toaster position="top-right" />
        <HeaderAuth session={session}/>
        <div>{children}</div>
    </div>
  );
}