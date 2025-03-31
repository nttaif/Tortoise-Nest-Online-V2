"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ITransaction } from "@/types/ITransaction "
import { formatCurrency, formatDateV2 } from "@/lib/utils"

interface TransactionDetailsProps {
  transaction: ITransaction
  onClose: () => void
}

export function TransactionDetails({ transaction, onClose }: TransactionDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const userName =
    typeof transaction.userId === "string"
      ? transaction.userId
      : `${transaction.userId.firstName} ${transaction.userId.lastName}`

  const courseName = typeof transaction.courseId === "string" ? transaction.courseId : transaction.courseId.name

  return (
    <Dialog open={!!transaction} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>Complete information about this transaction</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Transaction #{transaction._id.substring(0, 8)}</h3>
            <Badge className={getStatusColor(transaction.status)}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{formatDateV2(transaction.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-medium">{formatCurrency(transaction.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">{transaction.paymentMethod || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transaction Ref</p>
              <p className="font-medium">{transaction.transactionRef || "N/A"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">User Information</p>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{userName}</p>
                  </div>
                  {typeof transaction.userId !== "string" && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{transaction.userId.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{transaction.userId.address}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Course Information</p>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Course Name</p>
                    <p className="font-medium">{courseName}</p>
                  </div>
                  {typeof transaction.courseId !== "string" && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p className="font-medium">{transaction.courseId.description}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-medium">{formatCurrency(transaction.courseId.price)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{transaction.courseId.category}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

