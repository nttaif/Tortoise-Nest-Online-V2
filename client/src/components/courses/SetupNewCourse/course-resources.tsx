"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Attachment, CourseData } from "@/components/courses/SetupNewCourse/course-creation-form"

// Import the toast hook
import { useToast } from "@/hooks/use-toast"

interface CourseResourcesProps {
    attachments: Attachment[]
    setCourseData: React.Dispatch<React.SetStateAction<CourseData>>
}

// Add the toast hook inside the CourseResources component
export function CourseResources({ attachments, setCourseData }: CourseResourcesProps) {
    const { toast } = useToast()
    const [isAddingFile, setIsAddingFile] = useState(false)

    // Update the handleFileUpload function
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const newAttachment: Attachment = {
            id: Date.now().toString(),
            name: file.name,
            url: URL.createObjectURL(file),
        }

        setCourseData((prev) => ({
            ...prev,
            attachments: [...prev.attachments, newAttachment],
        }))

        setIsAddingFile(false)

        // Show success toast
        toast({
            title: "Upload file thành công",
            description: `Đã tải lên tài liệu: ${file.name}`,
        })
    }

    const handleDeleteAttachment = (id: string) => {
        setCourseData((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((attachment) => attachment.id !== id),
        }))

        toast({
            title: "Xóa file thành công",
            description: `Đã xóa tài liệu`,
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-sky-500" />
                <h2 className="text-xl font-semibold">Resources & Attachments</h2>
            </div>

            <Card>
                <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">Course attachments</Label>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add a file
                        </Button>
                        <Input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                            onChange={handleFileUpload}
                        />
                    </div>
                    {attachments.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No attachments yet</p>
                    ) : (
                        <div className="space-y-2">
                            {attachments.map((attachment) => (
                                <div key={attachment.id} className="flex items-center justify-between p-3 bg-slate-100 rounded-md">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm">{attachment.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteAttachment(attachment.id)}>
                                        <X className="h-4 w-4 text-slate-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

