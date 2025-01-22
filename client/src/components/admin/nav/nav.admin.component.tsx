import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Bell, MessageCircle, Moon, Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import AvatarComponent from './avatar.component'

export default function NavAdminComponent() {
  return (
    <div className="w-full h-24 rounded-md bg-[#E6EBEE] flex items-center justify-between px-4">
    {/* Nhóm bên trái */}
    <div className="flex items-center space-x-4">
      <SidebarTrigger className="bg-white p-2" />
      <div className="text-xs font-bold sm:text-lg">ROUTER TITLE</div>
    </div>

    {/* Nhóm bên phải */}
    <div className="flex items-center space-x-4">
      <Button className="w-10 h-10 bg-white border-2 text-sm md:w-16 md:h-16 md:text-base">
        <Search className="text-[#A098AE]" />
      </Button>
      <Button className="w-10 h-10 bg-white border-2 text-sm md:w-16 md:h-16 md:text-base">
        <Moon className="text-[#A098AE]" />
      </Button>
      <Button className="w-10 h-10 bg-white border-2 text-sm md:w-16 md:h-16 md:text-base">
        Zoom
      </Button>
      <Button className="w-10 h-10 bg-white border-2 text-sm md:w-16 md:h-16 md:text-base">
        <MessageCircle className="text-[#A098AE]" />
      </Button>
      <Button className="w-10 h-10 bg-white border-2 text-sm md:w-16 md:h-16 md:text-base">
        <Bell className="text-[#A098AE]" />
      </Button>
      <AvatarComponent/>
      
    </div>
  </div>
  )
}
