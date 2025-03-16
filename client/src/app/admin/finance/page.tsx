import { Suspense } from "react"
import { TransactionDashboard } from "@/components/admin/finance/transaction-dashboard"
import { TransactionSkeleton } from "@/components/admin/finance/transaction-skeleton"
import { getTransactions } from "@/components/common/action"
import { ITransaction } from "@/types/ITransaction "

export default async function TransactionsPage() {
  // Fetch transactions on the server
  const transactions = await getTransactions() as ITransaction[]
  return (
    <main className="container mx-auto px-4 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Transaction Management</h1>
      <Suspense fallback={<TransactionSkeleton />}>
        <TransactionDashboard initialTransactions={transactions} />
      </Suspense>
    </main>
  )
}

