import React from "react";
import Image from "next/image";
interface AuthLayoutProps{
    children : React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({children}) =>{
    return(
      <div className="bg-white" >
        <div className="h-[800px] container mx-auto content-center flex bg-white">
          <div className="main-content-left w-[40%] content-center max-md:hidden max-md:w-0 ">
            <Image className="m-auto" src="/images/imageform.png" width={700} height={700} alt="Your Company"/>
          </div>
          <div className="main-content-right w-[60%] max-md:w-full ">
            {children}
          </div>
        </div>
        </div>
    );
};
export default AuthLayout;