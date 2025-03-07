"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Course } from "@/types/Courses"

interface EnrollmentFormProps {
  course: Course
  onCancel: () => void
}

export function EnrollmentForm({ course, onCancel }: EnrollmentFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success message
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="text-center py-2 space-y-4">
        <h4 className="font-medium text-green-600">Đăng ký thành công!</h4>
        <p className="text-sm text-muted-foreground">
          Cảm ơn bạn đã đăng ký khóa học. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
        </p>
        <Button variant="outline" size="sm" onClick={onCancel}>
          Đóng
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Họ và tên</Label>
        <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Số điện thoại</Label>
        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Hủy
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
        </Button>
      </div>
    </form>
  )
}

