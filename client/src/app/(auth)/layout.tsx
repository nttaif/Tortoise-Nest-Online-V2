import PictureMainAuthComponents from "@/components/auth/picture.main.auth.components";

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen " >
        <div className=" w-[45%]">
        {children}
        </div>
         <div className="w-[55%]" >
            <PictureMainAuthComponents></PictureMainAuthComponents>
         </div>
    </div>
  )
}