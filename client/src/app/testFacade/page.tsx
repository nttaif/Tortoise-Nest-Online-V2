"use client"

import { useState } from "react"
import PaymentForm from "./component/payment-form"
import CourseSummary from "./component/course-summary"
import { mockCourse, mockUser } from "./lib/mock-data"

import { PaymentFacade } from "./lib/facades/payment-facade"

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<"Pending" | "Success" | "Failed" | "Cancel" | null>(null)

  // Tạo một phiên bản duy nhất của PaymentFacade
// Đây là lợi ích chính của mẫu Facade - chỉ cần tương tác với một đối tượng này
// thay vì quản lý trực tiếp tất cả các hệ thống con phức tạp

  const paymentFacade = new PaymentFacade()
  const handlePayment = async (paymentMethod: string) => {
    setIsProcessing(true)
    try {
      const result = await paymentFacade.processPayment({
        userId: mockUser._id,
        courseId: mockCourse._id,
        amount: mockCourse.discount
          ? mockCourse.price - (mockCourse.price * mockCourse.discount) / 100
          : mockCourse.price,
        paymentMethod,
      })

      setTransactionStatus(result.status)
      setIsComplete(true)
    } catch (error) {
      console.error("Payment error:", error)
      setTransactionStatus("Failed")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <PaymentForm
              onSubmit={handlePayment}
              isProcessing={isProcessing}
              isComplete={isComplete}
              transactionStatus={transactionStatus}
            />
          </div>

          <div className="md:col-span-1">
            <CourseSummary course={mockCourse} teacher={mockCourse.teacherId} />
          </div>
        </div>
      </div>
    </main>
  )
}

