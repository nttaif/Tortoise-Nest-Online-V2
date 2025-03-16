"use client"

import { useState } from "react"
import { TransactionList } from "./transaction-list"
import { TransactionFilters } from "./transaction-filters"
import { TransactionStats } from "./transaction-stats"
import { TransactionCharts } from "./transaction-charts"
import type { ITransaction } from "@/types/ITransaction "

interface TransactionDashboardProps {
  initialTransactions: ITransaction[]
}

export function TransactionDashboard({ initialTransactions }: TransactionDashboardProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>(initialTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>(initialTransactions)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Apply filters function
  const applyFilters = (
    searchTerm: string,
    status: string,
    dateFrom: Date | undefined,
    dateTo: Date | undefined,
    perPage: number,
  ) => {
    let filtered = [...transactions]

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter((transaction) => {
        // Search by transaction ID
        if (transaction._id.toLowerCase().includes(searchLower)) return true

        // Search by user
        if (typeof transaction.userId === "string") {
          if (transaction.userId.toLowerCase().includes(searchLower)) return true
        } else {
          const fullName = `${transaction.userId.firstName} ${transaction.userId.lastName}`.toLowerCase()
          if (fullName.includes(searchLower) || transaction.userId.email.toLowerCase().includes(searchLower))
            return true
        }

        // Search by course
        if (typeof transaction.courseId === "string") {
          if (transaction.courseId.toLowerCase().includes(searchLower)) return true
        } else {
          if (transaction.courseId.name.toLowerCase().includes(searchLower)) return true
        }

        return false
      })
    }

    // Filter by status
    if (status && status !== "all") {
      filtered = filtered.filter((transaction) => transaction.status.toLowerCase() === status.toLowerCase())
    }

    // Filter by date range
    if (dateFrom) {
      const fromDate = new Date(dateFrom)
      fromDate.setHours(0, 0, 0, 0)
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt)
        return transactionDate >= fromDate
      })
    }

    if (dateTo) {
      const toDate = new Date(dateTo)
      toDate.setHours(23, 59, 59, 999)
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt)
        return transactionDate <= toDate
      })
    }

    // Update filtered transactions
    setFilteredTransactions(filtered)

    // Update items per page
    setItemsPerPage(perPage)
  }

  return (
    <div className="space-y-6">
      <TransactionStats transactions={filteredTransactions} />
      <div className="grid grid-cols-1 gap-6">
        <TransactionFilters onApplyFilters={applyFilters} />
        <TransactionCharts transactions={filteredTransactions} />
        <TransactionList
          transactions={filteredTransactions}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(value) => setItemsPerPage(value)}
        />
      </div>
    </div>
  )
}

