"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Course } from "@/types/Courses"
import type { Teacher } from "@/types/Teacher"
import { Plus } from "lucide-react"
import Image from "next/image"
import { courseCategories } from "@/types/Category"
import { UploadImage } from "@/components/common/action"

interface AddCourseDialogProps {
  teachers: Teacher[]
  onAddCourse: (course: Partial<Course>) => void
}

export function AddCourseDialog({ teachers, onAddCourse }: AddCourseDialogProps) {
  const [open, setOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    discount: "",
    category:"",
    status: false,
    teacherId: "",
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: "",
      price: "",
      discount: "",
      category:"",
      status: false,
      teacherId: "",
    })
    setImagePreview("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const courseData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      discount: formData.discount ? Number.parseFloat(formData.discount) : undefined,
      teacherId: teachers.find((t) => t._id === formData.teacherId),
    }
    onAddCourse(courseData)
    setOpen(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>Fill in the course details. Click submit when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  placeholder="Enter course name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher">Teacher</Label>
                <Select
                  value={formData.teacherId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, teacherId: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher._id} value={teacher._id}>
                        {teacher.firstName} {teacher.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter course description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="99.99"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="10"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, discount: e.target.value }))}
                />
              </div>
              
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseCategories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Course Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-lg border">
                  <Image src={imagePreview || "/placeholder.svg"} alt="Course preview" fill className="object-cover" />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, status: checked }))}
              />
              <Label htmlFor="status">Course Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

