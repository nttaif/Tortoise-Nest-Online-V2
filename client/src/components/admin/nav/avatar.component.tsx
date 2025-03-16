'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, MessageCircle, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function AvatarComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative w-10 h-10 bg-white border-2 text-sm md:w-16 md:h-16 md:text-base overflow-hidden p-0">
        <Image
          src={"/images/taihocbai.jpg"}
          objectFit="cover"
          layout="fill"
          alt="avatar"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-white border-2 text-sm md:w-16 md:h-16 md:text-base overflow-hidden p-0">
              <Image
                src={"/images/taihocbai.jpg"}
                objectFit="cover"
                layout="fill"
                alt="avatar"
              />
            </div>
            <div>
              <div className="ml-3">
                <div className="font-bold text-xl text-[#4D44B5]">Ngô Thanh Tài</div>
              </div>    
              <div className="ml-3 text-">Admin</div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6" />       
            <div className="ml-3">
              Profile 
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-6 h-6" />       
            <div className="ml-3">
              Message
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6" />       
            <div className="ml-3">
              Setting
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center space-x-3" onClick={ async()=>{await signOut()}}>
            <LogOut className="w-6 h-6" />       
            <div className="ml-3">
              Log out
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
