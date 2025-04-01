"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, FileSpreadsheet, FileText, FileType } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { generateReportData } from "@/lib/report-utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export function ReportGenerator() {
  const [reportType, setReportType] = useState("courses")
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  })
  const [fileFormat, setFileFormat] = useState("csv")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  // Initialize dates after component mounts to avoid hydration mismatch
  useEffect(() => {
    setDateRange({
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      to: new Date(),
    })
  }, [])

  const reportTypes = [
    { value: "courses", label: "Khóa học" },
    { value: "teachers", label: "Giảng viên" },
    { value: "enrollments", label: "Đăng ký" },
    { value: "transactions", label: "Giao dịch" },
    { value: "summary", label: "Tổng hợp" },
  ]

  const fileFormats = [
    { value: "csv", label: "CSV", icon: FileSpreadsheet },
    { value: "excel", label: "Excel", icon: FileSpreadsheet },
    { value: "pdf", label: "PDF", icon: FileText },
  ]

  const handleGenerateReport = async () => {
    if (!dateRange.from || !dateRange.to) return

    setIsGenerating(true)
    setProgress(0)
    setShowSuccess(false)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate report generation
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)

      // Generate the report data
      const reportData = generateReportData(reportType, {
        from: dateRange.from as Date,
        to: dateRange.to as Date,
      })

      // Create and download the file
      const fileName = `${reportType}-report-${dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "start"}-to-${dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : "end"}`
      downloadReport(reportData, fileName, fileFormat)

      setIsGenerating(false)
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  const downloadReport = (data: any, fileName: string, format: string) => {
    let content = ""
    let mimeType = ""
    let fileExtension = ""

    // In a real application, you would use libraries like xlsx for Excel, jspdf for PDF, etc.
    // For this example, we'll just create a CSV for all formats

    if (format === "csv") {
      mimeType = "text/csv;charset=utf-8;"
      fileExtension = "csv"

      // Create CSV content
      if (Array.isArray(data)) {
        // Get headers
        const headers = Object.keys(data[0] || {}).join(",")
        // Get rows
        const rows = data
          .map((item) =>
            Object.values(item)
              .map((value) => (typeof value === "string" ? `"${value}"` : value))
              .join(","),
          )
          .join("\n")

        content = `${headers}\n${rows}`
      } else {
        content = JSON.stringify(data, null, 2)
      }
    } else if (format === "excel") {
      // In a real app, you would use a library like xlsx
      mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;"
      fileExtension = "xlsx"
      content = JSON.stringify(data, null, 2) // Placeholder
    } else if (format === "pdf") {
      // In a real app, you would use a library like jspdf
      mimeType = "application/pdf;charset=utf-8;"
      fileExtension = "pdf"
      content = JSON.stringify(data, null, 2) // Placeholder
    }

    // Create a download link
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${fileName}.${fileExtension}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tạo báo cáo</CardTitle>
        <CardDescription>Tạo và tải xuống báo cáo theo loại và khoảng thời gian</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Tạo báo cáo</TabsTrigger>
            <TabsTrigger value="scheduled">Báo cáo định kỳ</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Loại báo cáo</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Chọn loại báo cáo" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>Khoảng thời gian</Label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                              </>
                            ) : (
                              format(dateRange.from, "dd/MM/yyyy")
                            )
                          ) : (
                            <span>Chọn ngày</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from || undefined}
                          selected={{
                            from: dateRange.from || undefined,
                            to: dateRange.to || undefined,
                          }}
                          onSelect={(range) => {
                            setDateRange({
                              from: range?.from || null,
                              to: range?.to || null,
                            })
                          }}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-format">Định dạng file</Label>
                  <Select value={fileFormat} onValueChange={setFileFormat}>
                    <SelectTrigger id="file-format">
                      <SelectValue placeholder="Chọn định dạng" />
                    </SelectTrigger>
                    <SelectContent>
                      {fileFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          <div className="flex items-center">
                            <format.icon className="mr-2 h-4 w-4" />
                            <span>{format.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <Label>Đang tạo báo cáo...</Label>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {showSuccess && (
                <Alert className="bg-green-50 border-green-200">
                  <FileType className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Tạo báo cáo thành công</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Báo cáo đã được tạo và tải xuống thành công.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FileText className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Báo cáo định kỳ</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Tính năng báo cáo định kỳ cho phép bạn lên lịch tự động tạo và gửi báo cáo qua email. Tính năng
                      này sẽ sớm được cập nhật.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Hủy</Button>
        <Button
          onClick={handleGenerateReport}
          disabled={isGenerating || !dateRange.from || !dateRange.to}
          className="flex items-center"
        >
          <Download className="mr-2 h-4 w-4" />
          Tạo và tải xuống
        </Button>
      </CardFooter>
    </Card>
  )
}

