"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserType } from "@/types/UserType"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Upload, X } from "lucide-react"

export function AvatarUpload({ user }: { user: UserType }) {
    const [avatar, setAvatar] = useState<string>(user.avatar)
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return

        // Check file type
        if (!selectedFile.type.startsWith("image/")) {
            toast({
                title: "Invalid file type",
                description: "Please select an image file.",
                variant: "destructive",
            })
            return
        }

        // Check file size (max 5MB)
        if (selectedFile.size > 5 * 1024 * 1024) {
            toast({
                title: "File too large",
                description: "Please select an image smaller than 5MB.",
                variant: "destructive",
            })
            return
        }

        setFile(selectedFile)

        // Create a preview
        const reader = new FileReader()
        reader.onload = (event) => {
            setAvatar(event.target?.result as string)
        }
        reader.readAsDataURL(selectedFile)
    }

    const handleUpload = async () => {
        if (!file) return

        setIsUploading(true)

        try {
            // In a real app, you would upload the file to your server or a storage service
            // For this example, we'll just simulate a delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            toast({
                title: "Avatar updated",
                description: "Your profile picture has been updated successfully.",
            })

            router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload avatar. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsUploading(false)
        }
    }

    const resetAvatar = () => {
        setAvatar(user.avatar)
        setFile(null)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32">
                    <AvatarImage src={avatar} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback className="text-2xl">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => document.getElementById("avatar-upload")?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Select Image
                    </Button>
                    {file && (
                        <Button variant="outline" size="sm" onClick={resetAvatar}>
                            <X className="mr-2 h-4 w-4" />
                            Reset
                        </Button>
                    )}
                </div>
                <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            {file && (
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>
                    <Button className="w-full" onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Upload Avatar"}
                    </Button>
                </div>
            )}

            <div className="rounded-md bg-muted p-4">
                <h4 className="mb-2 text-sm font-medium">Avatar Guidelines</h4>
                <ul className="list-inside list-disc text-sm text-muted-foreground">
                    <li>Image should be square for best results</li>
                    <li>Maximum file size: 5MB</li>
                    <li>Supported formats: JPEG, PNG, GIF</li>
                </ul>
            </div>
        </div>
    )
}

