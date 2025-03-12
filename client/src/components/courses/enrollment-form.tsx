"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Course } from "@/types/Courses"
import { CreditCard, Landmark, Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentFormProps {
  course: Course
  onCancel: () => void
}

export function PaymentForm({ course, onCancel }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const { toast } = useToast()

  // Tính toán giá cuối cùng sau khi áp dụng giảm giá
  const calculateFinalPrice = () => {
    if (course.discount) {
      const final_price = course.price - (course.price * course.discount) / 100
      return final_price
    }
    return course.price
  }

  // Cập nhật hàm handleSubmit để hiển thị lỗi chi tiết
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorDetails(null)

    try {
      if (paymentMethod === "momo") {
        // Gọi API để tạo yêu cầu thanh toán MoMo
        console.log("Sending payment request to MoMo with data:", {
          courseId: course._id,
          courseName: course.name,
          amount: calculateFinalPrice(),
        })

        const response = await fetch("/api/payment/momo/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course._id,
            courseName: course.name,
            amount: calculateFinalPrice(),
          }),
        })

        console.log("Response status:", response.status)

        // Kiểm tra nếu response không phải là JSON
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text()
          console.error("API returned non-JSON response:", text)
          throw new Error("API trả về định dạng không hợp lệ. Vui lòng kiểm tra logs.")
        }

        const data = await response.json()
        console.log("Payment response data:", data)

        if (data.success && data.paymentUrl) {
          // Chuyển hướng đến trang thanh toán MoMo
          window.location.href = data.paymentUrl
          return
        } else {
          // Hiển thị thông tin lỗi chi tiết nếu có
          if (data.errorDetail) {
            setErrorDetails(JSON.stringify(data.errorDetail, null, 2))
          }
          throw new Error(data.message || "Không thể tạo yêu cầu thanh toán")
        }
      } else {
        // Xử lý các phương thức thanh toán khác
        toast({
          title: "Phương thức thanh toán chưa được hỗ trợ",
          description: "Hiện tại chúng tôi chỉ hỗ trợ thanh toán qua MoMo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Lỗi thanh toán",
        description:
          error instanceof Error ? error.message : "Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Chọn phương thức thanh toán</h3>

        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
          <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="momo" id="momo" />
            <Label htmlFor="momo" className="flex items-center gap-3 cursor-pointer flex-1">
              <div className="h-6 w-6 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#ae2070] flex items-center justify-center text-white text-xs font-bold">
                  M
                </div>
              </div>
              <div>
                <p className="font-medium">Ví MoMo</p>
                <p className="text-sm text-muted-foreground">Thanh toán qua ví điện tử MoMo</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 transition-colors opacity-60">
            <RadioGroupItem value="card" id="card" disabled />
            <Label htmlFor="card" className="flex items-center gap-3 cursor-not-allowed flex-1">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Thẻ tín dụng/ghi nợ</p>
                <p className="text-sm text-muted-foreground">Sắp ra mắt</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 transition-colors opacity-60">
            <RadioGroupItem value="bank" id="bank" disabled />
            <Label htmlFor="bank" className="flex items-center gap-3 cursor-not-allowed flex-1">
              <Landmark className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Chuyển khoản ngân hàng</p>
                <p className="text-sm text-muted-foreground">Sắp ra mắt</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 transition-colors opacity-60">
            <RadioGroupItem value="other_ewallet" id="other_ewallet" disabled />
            <Label htmlFor="other_ewallet" className="flex items-center gap-3 cursor-not-allowed flex-1">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Ví điện tử khác</p>
                <p className="text-sm text-muted-foreground">Sắp ra mắt</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="pt-4">
        <div className="space-y-1 mb-4">
          <p className="text-sm text-muted-foreground">
            Khóa học: <span className="font-medium text-foreground">{course.name}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            {course.discount ? (
              <>
                <span className="line-through">{course.price.toLocaleString("vi-VN")} VNĐ</span>
                <span className="font-medium text-foreground ml-2">
                  {calculateFinalPrice().toLocaleString("vi-VN")} VNĐ
                </span>
                <span className="ml-2 text-green-600">(-{course.discount}%)</span>
              </>
            ) : (
              <span className="font-medium text-foreground">{course.price.toLocaleString("vi-VN")} VNĐ</span>
            )}
          </p>
        </div>
      </div>

      {errorDetails && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm font-medium text-red-800 mb-2">Chi tiết lỗi:</p>
          <pre className="text-xs text-red-700 overflow-auto max-h-40 p-2 bg-red-100 rounded">{errorDetails}</pre>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Hủy
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting || !paymentMethod}>
          {isSubmitting ? "Đang xử lý..." : "Xác nhận thanh toán"}
        </Button>
      </div>
    </form>
  )
}

