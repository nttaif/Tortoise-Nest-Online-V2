"use client"

import { useMemo, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from "recharts"
import { ITransaction } from "@/types/ITransaction "
import { formatCurrency } from "@/lib/utils"

interface TransactionChartsProps {
  transactions: ITransaction[]
}

export function TransactionCharts({ transactions }: TransactionChartsProps) {
  // Process data for status distribution chart
  const statusData = useMemo(() => {
    const statusCounts = {
      success: 0,
      pending: 0,
      failed: 0,
      cancel:0,
    }

    transactions.forEach((transaction) => {
      const status = transaction.status.toLowerCase() as keyof typeof statusCounts
      statusCounts[status]++
    })

    return [
      { name: "Success", value: statusCounts.success, fill: "var(--color-success)" },
      { name: "Pending", value: statusCounts.pending, fill: "var(--color-pending)" },
      { name: "Failed", value: statusCounts.failed, fill: "var(--color-failed)" },
      { name: "Cancel", value: statusCounts.cancel, fill: "var(--color-failed)" },
    ]
  }, [transactions])

  // Process data for revenue over time chart
  const revenueData = useMemo(() => {
    const dateMap = new Map<string, { date: string; amount: number; count: number }>()

    // Sort transactions by date
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )

    // Group by date
    sortedTransactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt)
      const dateStr = date.toISOString().split("T")[0]

      if (!dateMap.has(dateStr)) {
        dateMap.set(dateStr, { date: dateStr, amount: 0, count: 0 })
      }

      const entry = dateMap.get(dateStr)!

      // Only count successful transactions for revenue
      if (transaction.status.toLowerCase() === "success") {
        entry.amount += transaction.amount
      }
      entry.count++
    })

    return Array.from(dateMap.values())
  }, [transactions])

  // Debug revenue data
  useEffect(() => {
    console.log("Revenue Data:", revenueData)
  }, [revenueData])

  // Process data for payment methods chart
  const paymentMethodData = useMemo(() => {
    const methodCounts = new Map<string, number>()

    transactions.forEach((transaction) => {
      const method = transaction.paymentMethod || "Unknown"
      methodCounts.set(method, (methodCounts.get(method) || 0) + 1)
    })

    return Array.from(methodCounts.entries()).map(([name, value]) => ({ name, value }))
  }, [transactions])

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Analytics</CardTitle>
        <CardDescription>Visual representation of transaction data and trends</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="status">Status Distribution</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Trend</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 pt-4">
            {/* Status Distribution Tab */}
            <TabsContent value="status" className="space-y-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { 
                        status: "Success", 
                        count: statusData[0].value, 
                        fill: "var(--color-success)" 
                      },
                      { 
                        status: "Pending", 
                        count: statusData[1].value, 
                        fill: "var(--color-pending)" 
                      },
                      { 
                        status: "Failed", 
                        count: statusData[2].value, 
                        fill: "var(--color-failed)" 
                      },
                      { 
                        status: "Cancel", 
                        count: statusData[3].value, 
                        fill: "var(--color-failed)" 
                      },
                    ]}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Status
                                  </span>
                                  <span className="font-bold text-xs">
                                    {data.status}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Count
                                  </span>
                                  <span className="font-bold text-xs">
                                    {data.count}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      radius={[4, 4, 0, 0]}
                      fill="#8884d8"
                    >
                      {[
                        { status: "Success", count: statusData[0].value, fill: "var(--color-success)" },
                        { status: "Pending", count: statusData[1].value, fill: "var(--color-pending)" },
                        { status: "Failed", count: statusData[2].value, fill: "var(--color-failed)" },
                        { status: "Cancel", count: statusData[3].value, fill: "var(--color-failed)" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
                {statusData.map((entry, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{entry.name}</p>
                          <p className="text-2xl font-bold">{entry.value}</p>
                        </div>
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: entry.fill }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((entry.value / transactions.length) * 100).toFixed(1)}% of total
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Revenue Trend Tab */}
            <TabsContent value="revenue">
              <div className="h-[300px] w-full">
                {revenueData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return date.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })
                        }}
                      />
                      <YAxis 
                        tickFormatter={(value) => {
                          return value.toLocaleString('vi-VN', { 
                            style: 'currency', 
                            currency: 'VND',
                            maximumFractionDigits: 0,
                            notation: 'compact'
                          })
                        }}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Date
                                    </span>
                                    <span className="font-bold text-xs">
                                      {new Date(data.date).toLocaleDateString('vi-VN', { 
                                        year: 'numeric',
                                        month: 'short', 
                                        day: 'numeric' 
                                      })}
                                    </span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Revenue
                                    </span>
                                    <span className="font-bold text-xs">
                                      {formatCurrency(data.amount)}
                                    </span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Transactions
                                    </span>
                                    <span className="font-bold text-xs">
                                      {data.count}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="var(--color-success)" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No revenue data available</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">Total Revenue (Successful Transactions)</p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(
                          transactions
                            .filter(t => t.status.toLowerCase() === 'success')
                            .reduce((sum, t) => sum + t.amount, 0)
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        From {transactions.filter(t => t.status.toLowerCase() === 'success').length} successful transactions
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Payment Methods Tab */}
            <TabsContent value="payment">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value} transactions`, 
                        `Payment Method: ${name}`
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {paymentMethodData.map((entry, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{entry.name}</p>
                          <p className="text-2xl font-bold">{entry.value}</p>
                        </div>
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((entry.value / transactions.length) * 100).toFixed(1)}% of total
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
