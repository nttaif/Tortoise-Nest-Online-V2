"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, ArrowRight, Receipt, CreditCard } from "lucide-react"
import Image from "next/image"
import type { Course } from "@/types/Courses"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { getCourseById } from "@/lib/courses"
import {updateEnrollment, updateTransaction } from "@/components/common/action"
import { ITransaction } from "@/types/ITransaction "
import { IEnrollment } from "@/types/IEnrollment"

interface PaymentResult {
  status: "success" | "error" | "pending"
  message: string
  orderId?: string
  transId?: string
  amount?: number
  paymentMethod?: string
  courseId?: string
  paymentDate?: string
}

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function processPaymentResult() {
      try {
        // Lấy thông tin từ URL callback của MoMo
        const resultCode = searchParams.get("resultCode")
        const orderId = searchParams.get("orderId") || ""
        const message = searchParams.get("message") || ""
        const transId = searchParams.get("transId") || ""
        const amount = searchParams.get("amount") ? Number.parseInt(searchParams.get("amount") || "0", 10) : 0
        const extraData = searchParams.get("extraData") || ""

        // Trích xuất courseId từ orderId (giả sử orderId có dạng ORDER_timestamp_courseId)
        const courseId = extractCourseIdFromOrderId(orderId)

        let status: "success" | "error" | "pending" = "pending"
        let statusMessage = message

        if (resultCode === "0") {
          status = "success"
          statusMessage = "Thanh toán thành công! Bạn đã có thể truy cập khóa học."
          const updateTransactions = await updateTransaction(extractTransactionIdFromOrderId(orderId),{status:"Success",transactionRef:transId}) as ITransaction
          const updateEnrollments = await updateEnrollment(localStorage.getItem('EnrollmentID') as string,{enrollmentStatus:"active",transactionId: extractTransactionIdFromOrderId(orderId)}) as IEnrollment
          localStorage.setItem('EnrollmentID','');
        } else if (resultCode === "1006") {
          status = "pending"
          const updateTransactions = await updateTransaction(extractTransactionIdFromOrderId(orderId),{status:"Cancel",transactionRef:transId}) as ITransaction
          localStorage.setItem('EnrollmentID','');
          statusMessage = "Giao dịch đã bị hủy bởi người dùng."
        } else {
          status = "error"
          const updateTransactions = await updateTransaction(extractTransactionIdFromOrderId(orderId),{status:"Failed",transactionRef:transId}) as ITransaction
          localStorage.setItem('EnrollmentID','');
          statusMessage = `Thanh toán thất bại: ${message}`
        }

        // Tạo ngày thanh toán
        const paymentDate = new Date().toLocaleString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })

        setPaymentResult({
          status,
          message: statusMessage,
          orderId,
          transId,
          amount,
          courseId,
          paymentDate,
        })

        // Nếu có courseId, lấy thông tin khóa học
        if (courseId) {
          try {
            const response = await getCourseById(courseId) as Course
              setCourse(response)
          } catch (error) {
            console.error("Error fetching course:", error)
          }
        }
      } catch (error) {
        console.error("Error processing payment result:", error)
        setPaymentResult({
          status: "error",
          message: "Đã xảy ra lỗi khi xử lý kết quả thanh toán.",
        })
      } finally {
        setLoading(false)
      }
    }

    processPaymentResult()
  }, [searchParams])

  const handleGoToCourses = () => {
    router.push("/courses")
  }

  const handleGoToCourse = () => {
    if (course) {
      router.push(`/courses/${course._id}`)
    }
  }

  const handleTryAgain = () => {
    router.back()
  }

  // Hiển thị trạng thái thanh toán
  const renderPaymentStatus = () => {
    if (!paymentResult) return null

    const statusConfig = {
      success: {
        icon: <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-500" />,
        title: "Thanh toán thành công",
        color: "bg-green-50 border-green-200",
        textColor: "text-green-700",
      },
      pending: {
        icon: <Clock className="w-12 h-12 md:w-16 md:h-16 text-amber-500" />,
        title: "Đang xử lý",
        color: "bg-amber-50 border-amber-200",
        textColor: "text-amber-700",
      },
      error: {
        icon: <XCircle className="w-12 h-12 md:w-16 md:h-16 text-red-500" />,
        title: "Thanh toán thất bại",
        color: "bg-red-50 border-red-200",
        textColor: "text-red-700",
      },
    }

    const config = statusConfig[paymentResult.status]

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`h-full p-4 md:p-6 rounded-lg border ${config.color} flex flex-col items-center justify-center space-y-3`}
      >
        {config.icon}
        <h3 className={`font-semibold text-base md:text-lg ${config.textColor}`}>{config.title}</h3>
        <p className={`text-center ${config.textColor} text-xs md:text-sm`}>{paymentResult.message}</p>

        {paymentResult.status === "success" && (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 mt-2">
            Giao dịch hoàn tất
          </Badge>
        )}
      </motion.div>
    )
  }

  // Hiển thị thông tin khóa học
  const renderCourseInfo = () => {
    if (!course) return null
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="h-full"
      >
        <div className="border rounded-lg overflow-hidden bg-card h-full flex flex-col">
          <div className="relative w-full h-32 md:h-40">
            {course.image ? (
              <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No image</div>
            )}

            {course.discount && course.discount > 0 && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-500 hover:bg-green-600">-{course.discount}%</Badge>
              </div>
            )}
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-medium text-base md:text-lg line-clamp-1">{course.name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2 flex-grow">{course.description}</p>

            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <div className="relative w-5 h-5 rounded-full overflow-hidden mr-1">
                  <Image
                    src={course.teacherId?.avartar || "/placeholder.svg"}
                    alt={course.teacherId?.lastName}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs text-muted-foreground">{course.teacherId?.lastName}</span>
              </div>
            </div>

            <div className="mt-2 flex items-baseline">
              <span className="text-sm md:text-base font-semibold">
                {course.discount
                  ? (course.price - (course.price * course.discount) / 100).toLocaleString("vi-VN")
                  : course.price.toLocaleString("vi-VN")}{" "}
                VNĐ
              </span>
              {course.discount && course.discount > 0 && (
                <span className="ml-2 text-xs line-through text-muted-foreground">
                  {course.price.toLocaleString("vi-VN")} VNĐ
                </span>
              )}
            </div>

            {paymentResult?.status === "success" && (
              <div className="mt-3">
                <Button variant="default" size="sm" className="w-full text-xs md:text-sm" onClick={handleGoToCourse}>
                  Bắt đầu học ngay <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // Hiển thị thông tin giao dịch
  const renderTransactionDetails = () => {
    if (!paymentResult) return null

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full mt-6 space-y-4"
      >
        <div className="flex items-center">
          <Receipt className="mr-2 h-5 w-5 text-primary" />
          <h3 className="font-medium text-base">Chi tiết giao dịch</h3>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          {paymentResult.orderId && (
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm">Mã đơn hàng</p>
              <p className="font-medium text-sm">{paymentResult.orderId}</p>
            </div>
          )}

          {paymentResult.transId && (
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm">Mã giao dịch</p>
              <p className="font-medium text-sm">{paymentResult.transId}</p>
            </div>
          )}

          {paymentResult.amount && (
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm">Số tiền</p>
              <p className="font-medium text-sm">{paymentResult.amount.toLocaleString("vi-VN")} VNĐ</p>
            </div>
          )}

          {paymentResult.paymentDate && (
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm">Thời gian</p>
              <p className="font-medium text-sm">{paymentResult.paymentDate}</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <p className="text-muted-foreground text-sm">Phương thức</p>
            <div className="flex items-center">
              <CreditCard className="mr-1 h-3 w-3" />
              <p className="font-medium text-sm">MoMo</p>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen py-10">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="text-center pb-0">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Đang xử lý thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-primary/30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
            <p className="text-center text-muted-foreground">Vui lòng đợi trong giây lát...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardHeader className="pb-0 pt-6">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {paymentResult?.status === "success"
                ? "Thanh toán thành công"
                : paymentResult?.status === "pending"
                  ? "Giao dịch đang xử lý"
                  : "Thanh toán thất bại"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Grid layout cho status và course info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-full">{renderPaymentStatus()}</div>
              {course && <div className="h-full">{renderCourseInfo()}</div>}
            </div>

            {/* Chi tiết giao dịch */}
            {renderTransactionDetails()}
          </CardContent>
          <CardFooter className="flex justify-center gap-4 pb-6">
            {paymentResult?.status === "success" && !course && (
              <Button variant="default" className="w-full max-w-md" onClick={handleGoToCourses}>
                Xem tất cả khóa học
              </Button>
            )}

            {paymentResult?.status === "error" && (
              <Button variant="default" className="w-full max-w-md" onClick={handleTryAgain}>
                Thử lại
              </Button>
            )}

            {paymentResult?.status === "pending" && (
              <Button variant="default" className="w-full max-w-md" onClick={handleGoToCourses}>
                Xem tất cả khóa học
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

// Hàm trích xuất courseId từ orderId
function extractCourseIdFromOrderId(orderId: string): string {
  const parts = orderId.split("_");
  return parts[parts.length - 2];
}
function extractTransactionIdFromOrderId(orderId: string): string {
  const parts = orderId.split("_");
  // Giả sử orderId có dạng: ORDER_timestamp_courseId_idTransaction,
  // phần tử cuối cùng chính là idTransaction
  return parts[parts.length - 1];
}
