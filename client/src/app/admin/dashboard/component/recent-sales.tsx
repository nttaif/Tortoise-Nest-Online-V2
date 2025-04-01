"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"
import { ITransaction } from "@/types/ITransaction "
import { getTransactions } from "@/components/common/action"

export function RecentSales() {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const data = await getTransactions()

        if (data) {
          setTransactions(data as ITransaction[])
        } else {
          setError("Không thể tải dữ liệu giao dịch gần đây")
        }
      } catch (err) {
        console.error("Error fetching transactions:", err)
        setError("Đã xảy ra lỗi khi tải dữ liệu giao dịch gần đây")
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu giao dịch gần đây...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        <p>{error}</p>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-muted-foreground">Không có giao dịch gần đây</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {transactions.slice(0, 5).map((transaction) => (
        <div key={transaction._id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Avatar" />
            <AvatarFallback>
              {typeof transaction.userId === "string"
                ? transaction.userId.substring(0, 2).toUpperCase()
                : transaction.userId.lastName?.substring(0, 2).toUpperCase() || "UN"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {typeof transaction.userId === "string"
                ? transaction.userId.substring(0, 8)
                : transaction.userId.lastName || "Người dùng"}
            </p>
            <p className="text-sm text-muted-foreground">
              {typeof transaction.courseId === "string"
                ? transaction.courseId.substring(0, 8)
                : transaction.courseId.name || "Khóa học"}
            </p>
          </div>
          <div
            className={`ml-auto font-medium ${
              transaction.status === "Success"
                ? "text-green-500"
                : transaction.status === "Failed"
                  ? "text-red-500"
                  : "text-yellow-500"
            }`}
          >
            ${transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}

