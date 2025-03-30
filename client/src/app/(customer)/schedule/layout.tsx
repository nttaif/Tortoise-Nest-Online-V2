import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default async function LayoutSchedule({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
    <div>
        <Toaster position="top-right" />
        <div className='z-50 top-0 sticky' >
        </div>
        <div>{children}</div>
    </div>
    </SessionProvider>
  );
}