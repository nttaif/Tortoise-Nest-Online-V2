"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Lock, ArrowLeft } from 'lucide-react'

export default function UnauthorizedPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div 
        className={`max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-30"></div>
            <div className="relative bg-white rounded-full p-3 shadow-md">
              <Lock className="h-8 w-8 text-red-500 animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-gray-900 animate-fadeIn">
              Không có quyền truy cập
            </h1>
            <p className="text-gray-500">
              Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
            </p>
          </div>
          
          <div className="flex items-center p-4 border border-orange-100 rounded-lg bg-orange-50 animate-slideIn">
            <AlertTriangle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
            <p className="text-sm text-orange-700">
              Hệ thống đã ghi nhận yêu cầu truy cập của bạn. Mã lỗi: <span className="font-mono font-medium">401</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 animate-fadeIn delay-300">
            <Button asChild variant="outline" className="flex-1 group">
              <Link href="/login">
                <span className="flex items-center justify-center">
                  <span className="mr-2 group-hover:translate-x-1 transition-transform">Đăng nhập</span>
                </span>
              </Link>
            </Button>
            <Button asChild className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 group">
              <Link href="/">
                <span className="flex items-center justify-center">
                  <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={16} />
                  <span>Quay lại trang chủ</span>
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-gradient"></div>
    </div>
  )
}
