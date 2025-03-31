import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ITransaction } from "@/types/ITransaction "
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, Clock } from "lucide-react"

// Server Component
export function TransactionStats({
  transactions,
}: {
  transactions: ITransaction[]
}) {
  const totalAmount = transactions.reduce((sum, transaction) => {
    if (transaction.status === "Success") {
      return sum + transaction.amount
    }
    return sum
  }, 0)

  const pendingAmount = transactions.reduce((sum, transaction) => {
    if (transaction.status === "Pending") {
      return sum + transaction.amount
    }
    return sum
  }, 0)

  const successCount = transactions.filter((t) => t.status === "Success").length
  const pendingCount = transactions.filter((t) => t.status === "Pending").length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
          <p className="text-xs text-muted-foreground">From {successCount} successful transactions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(pendingAmount)}</div>
          <p className="text-xs text-muted-foreground">From {pendingCount} pending transactions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {transactions.length > 0 ? `${Math.round((successCount / transactions.length) * 100)}%` : "0%"}
          </div>
          <p className="text-xs text-muted-foreground">
            {successCount} of {transactions.length} transactions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Failed Transactions</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{transactions.filter((t) => t.status === "Failed").length}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((transactions.filter((t) => t.status === "Failed").length / transactions.length) * 100)}% of
            total
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

