import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockTransactions } from "@/lib/mock-data"

export function RecentSales() {
  return (
    <div className="space-y-8">
      {mockTransactions.slice(0, 5).map((transaction) => (
        <div key={transaction._id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Avatar" />
            <AvatarFallback>{transaction.userId.toString().substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {typeof transaction.userId === "string"
                ? transaction.userId.substring(0, 8)
                : transaction.userId.name || "User"}
            </p>
            <p className="text-sm text-muted-foreground">
              {typeof transaction.courseId === "string"
                ? transaction.courseId.substring(0, 8)
                : transaction.courseId?.name || "Course"}
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

