import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Activity, ChevronDown, LogOut } from 'lucide-react'
import React from 'react'

export default function UserMenu() {
  return (
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
  )
}
