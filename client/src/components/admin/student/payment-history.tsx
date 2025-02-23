"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const allPayments = [
  {
    id: "#12345678",
    date: "03 March 2023, 13:45 PM",
    amount: "$ 50,036",
    status: "Complete",
  },
  {
    id: "#12345679",
    date: "07 May 2023, 13:45 PM",
    amount: "$ 40,010",
    status: "Canceled",
  },
  {
    id: "#12345680",
    date: "05 Apr 2023, 13:45 PM",
    amount: "$ 30,050",
    status: "Complete",
  },
  {
    id: "#12345681",
    date: "10 June 2023, 13:45 PM",
    amount: "$ 20,070",
    status: "Canceled",
  },
  {
    id: "#12345682",
    date: "03 March 2023, 13:45 PM",
    amount: "$ 50,036",
    status: "Complete",
  },
  {
    id: "#12345683",
    date: "07 May 2023, 13:45 PM",
    amount: "$ 40,010",
    status: "Canceled",
  },
  {
    id: "#12345684",
    date: "05 July 2023, 13:45 PM",
    amount: "$ 30,050",
    status: "Complete",
  },
  {
    id: "#12345685",
    date: "10 June 2023, 13:45 PM",
    amount: "$ 20,070",
    status: "Canceled",
  },
  {
    id: "#12345686",
    date: "03 March 2023, 13:45 PM",
    amount: "$ 50,036",
    status: "Complete",
  },
]

export function PaymentHistory() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalItems = allPayments.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentPayments = allPayments.slice(startIndex, endIndex)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment Number</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      payment.status === "Complete" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant={currentPage === 1 ? "secondary" : "outline"} size="sm" onClick={() => setCurrentPage(1)}>
              1
            </Button>
            <Button variant={currentPage === 2 ? "secondary" : "outline"} size="sm" onClick={() => setCurrentPage(2)}>
              2
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

