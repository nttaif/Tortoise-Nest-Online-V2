"use client"

import type React from "react"

import { useState } from "react"
import { DollarSign, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CourseData } from "@/components/courses/SetupNewCourse/course-creation-form"

interface CoursePricingProps {
  price: number
  setCourseData: React.Dispatch<React.SetStateAction<CourseData>>
}

export function CoursePricing({ price, setCourseData }: CoursePricingProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempPrice, setTempPrice] = useState(price.toString())

  const handleSave = () => {
    const newPrice = Number.parseFloat(tempPrice)
    if (isNaN(newPrice) || newPrice < 0) return

    setCourseData((prev) => ({ ...prev, price: newPrice }))
    setIsEditing(false)
  }

  // Format price in VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-sky-500" />
        <h2 className="text-xl font-semibold">Sell your course</h2>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Course price</Label>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit price
              </Button>
            </div>

            {isEditing ? (
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <span className="bg-slate-100 px-3 py-2 rounded-l-md border border-r-0">VND</span>
                  <Input
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                    type="number"
                    min="0"
                    step="1000"
                    className="rounded-l-none"
                  />
                </div>
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            ) : (
              <p className="mt-2">{price > 0 ? formatPrice(price) : "No price"}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

