"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Pencil, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { CourseData } from "@/components/courses/SetupNewCourse/course-creation-form"

// Import the toast hook
import { useToast } from "@/hooks/use-toast"

interface CourseCustomizationProps {
    courseData: CourseData
    setCourseData: React.Dispatch<React.SetStateAction<CourseData>>
}

// Add the toast hook inside the CourseCustomization component
export function CourseCustomization({ courseData, setCourseData }: CourseCustomizationProps) {
    const { toast } = useToast()
    const [editingTitle, setEditingTitle] = useState(false)
    const [editingDescription, setEditingDescription] = useState(false)
    const [tempTitle, setTempTitle] = useState(courseData.title)
    const [tempDescription, setTempDescription] = useState(courseData.description)

    const handleTitleSave = () => {
        setCourseData((prev) => ({ ...prev, title: tempTitle }))
        setEditingTitle(false)
        toast({
            title: "Cập nhật tiêu đề thành công",
            description: `Đã cập nhật tiêu đề khóa học thành: ${tempTitle}`,
        })
    }

    const handleDescriptionSave = () => {
        setCourseData((prev) => ({ ...prev, description: tempDescription }))
        setEditingDescription(false)
        toast({
            title: "Cập nhật mô tả thành công",
            description: `Đã cập nhật mô tả khóa học.`,
        })
    }

    // Update the handleImageUpload function
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Create a URL for the uploaded image
        const imageUrl = URL.createObjectURL(file)
        setCourseData((prev) => ({ ...prev, imageUrl }))

        // Show success toast
        toast({
            title: "Upload hình ảnh thành công",
            description: `Đã tải lên hình ảnh: ${file.name}`,
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-sky-500" />
                <h2 className="text-xl font-semibold">Customize your course</h2>
            </div>

            <Card>
                <CardContent className="p-4 space-y-4">
                    <div>
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">Course title</Label>
                            <Button variant="ghost" size="sm" onClick={() => setEditingTitle(!editingTitle)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit title
                            </Button>
                        </div>

                        {editingTitle ? (
                            <div className="mt-2 space-y-2">
                                <Input
                                    value={tempTitle}
                                    onChange={(e) => setTempTitle(e.target.value)}
                                    placeholder="e.g. Advanced Web Development"
                                />
                                <Button size="sm" onClick={handleTitleSave}>
                                    Save
                                </Button>
                            </div>
                        ) : (
                            <p className="mt-2">{courseData.title || "No title"}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4 space-y-4">
                    <div>
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">Course description</Label>
                            <Button variant="ghost" size="sm" onClick={() => setEditingDescription(!editingDescription)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit description
                            </Button>
                        </div>

                        {editingDescription ? (
                            <div className="mt-2 space-y-2">
                                <Textarea
                                    value={tempDescription}
                                    onChange={(e) => setTempDescription(e.target.value)}
                                    placeholder="Describe your course..."
                                    rows={4}
                                />
                                <Button size="sm" onClick={handleDescriptionSave}>
                                    Save
                                </Button>
                            </div>
                        ) : (
                            <p className="mt-2 text-muted-foreground">{courseData.description || "No description"}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4 space-y-4">
                    <div>
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">Course image</Label>
                            {!courseData.imageUrl && (
                                <Label htmlFor="image-upload" className="cursor-pointer">
                                    <div className="flex items-center gap-2 text-sm text-primary">
                                        <Button variant="outline" size="sm"
                                            onClick={() => document.getElementById('image-upload')?.click()}
                                        >
                                            Add an image
                                        </Button>
                                    </div>
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"  // Chỉ chấp nhận file ảnh (png, jpg, jpeg, gif, ...)
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />

                                </Label>
                            )}
                            {courseData.imageUrl && (
                                <Button variant="ghost" size="sm" onClick={() => setCourseData((prev) => ({ ...prev, imageUrl: "" }))}>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit image
                                </Button>
                            )}
                        </div>

                        {courseData.imageUrl ? (
                            <div className="mt-2 relative aspect-video rounded-md overflow-hidden border">
                                <Image
                                    src={courseData.imageUrl || "/placeholder.svg"}
                                    alt="Course image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="mt-2 aspect-video bg-slate-200 rounded-md flex items-center justify-center">
                                <p className="text-muted-foreground text-sm">No image</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

