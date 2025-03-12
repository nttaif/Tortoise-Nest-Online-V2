"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyIcon, CheckIcon } from "lucide-react"

export function TestCardInfo() {
  const [copied, setCopied] = useState<string | null>(null)

  const testCards = [
    {
      id: "vcb",
      bank: "Vietcombank",
      cardNumber: "9704000000000018",
      cardName: "NGUYEN VAN A",
      expiryDate: "03/07",
      otp: "OTP",
    },
    {
      id: "tcb",
      bank: "Techcombank",
      cardNumber: "9704000000000010",
      cardName: "NGUYEN VAN B",
      expiryDate: "03/07",
      otp: "OTP",
    },
    {
      id: "mb",
      bank: "MB Bank",
      cardNumber: "9704000000000002",
      cardName: "NGUYEN VAN C",
      expiryDate: "03/07",
      otp: "OTP",
    },
  ]

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Thông tin thẻ ATM test</CardTitle>
        <CardDescription>Sử dụng các thông tin thẻ này để kiểm tra thanh toán trong môi trường test</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {testCards.map((card) => (
          <div key={card.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{card.bank}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(card.cardNumber, `${card.id}-number`)}
                className="h-8 px-2"
              >
                {copied === `${card.id}-number` ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Số thẻ:</p>
                <p className="font-mono">{card.cardNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tên chủ thẻ:</p>
                <p>{card.cardName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Ngày hết hạn:</p>
                <p>{card.expiryDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">OTP:</p>
                <p>{card.otp}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>Lưu ý: Các thẻ này chỉ hoạt động trong môi trường test của MoMo</p>
      </CardFooter>
    </Card>
  )
}

