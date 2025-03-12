"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Lấy thông tin từ URL callback của MoMo
    const resultCode = searchParams.get("resultCode")
    const orderId = searchParams.get("orderId")
    const message = searchParams.get("message") || ""

    if (resultCode === "0") {
      setStatus("success")
      setMessage("Thanh toán thành công! Bạn đã có thể truy cập khóa học.")
      // Cập nhật trạng thái thanh toán (nếu cần)
      // Lưu ý: Việc cập nhật trạng thái chính thức nên được thực hiện ở IPN handler
      // Đây chỉ là cập nhật UI cho người dùng
    } else {
      setStatus("error")
      setMessage(`Thanh toán thất bại: ${message}`)
    }
  }, [searchParams])

  const handleGoToCourses = () => {
    router.push("/courses")
  }

  const handleTryAgain = () => {
    router.back()
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Kết quả thanh toán</CardTitle>
          <CardDescription>{status === "loading" ? "Đang xử lý kết quả thanh toán..." : ""}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          {status === "loading" && (
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 text-green-500" />
              <p className="text-center text-green-600 font-medium">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-16 h-16 text-red-500" />
              <p className="text-center text-red-600 font-medium">{message}</p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          {status === "success" && <Button onClick={handleGoToCourses}>Xem khóa học</Button>}

          {status === "error" && <Button onClick={handleTryAgain}>Thử lại</Button>}
        </CardFooter>
      </Card>
    </div>
  )
}

