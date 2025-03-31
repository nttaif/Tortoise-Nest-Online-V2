"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { UserType } from "@/types/UserType"
import ButtonClient from "../DesignPattren/button-client"

export default function UserProfile({ user }: { user: UserType }) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [avatar, setAvatar] = useState<string>(user.avatar || "")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatar(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)

    // Simulate upload
    setIsUploading(true)
    setOpen(false)

    toast({
      title: "Đang tải ảnh lên",
      description: "Vui lòng đợi trong giây lát...",
    })

    // Simulate API call
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Thành công",
        description: "Cập nhật ảnh đại diện thành công",
        variant: "default",
      })
    }, 2000)
  }

  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-[#d9d9d9] relative">
        {avatar ? (
          <Image src={avatar || "/placeholder.svg"} alt="Avatar" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#979797]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="mt-10">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="text-[#3721ff] text-sm border border-[#3721ff] px-3 py-1 rounded hover:bg-[#3721ff]/5 transition-colors">
              Sửa ảnh đại diện
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cập nhật ảnh đại diện</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-[#d9d9d9] relative">
                  {avatar ? (
                    <Image src={avatar || "/placeholder.svg"} alt="Avatar preview" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#979797]">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="avatar-upload" className="text-sm text-center mb-2">
                    Chọn ảnh từ máy tính của bạn
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <ButtonClient
                   label={"Thêm ảnh"} 
                    onClick={() =>document.getElementById("avatar-upload")?.click()}
                   /> 
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

