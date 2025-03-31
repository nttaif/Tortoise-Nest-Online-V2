"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, AlertCircle, Clock, XCircle, CreditCard, Wallet, BanknoteIcon } from "lucide-react"
import { mockUser } from "../lib/mock-data"

interface PaymentFormProps {
  onSubmit: (paymentMethod: string) => void
  isProcessing: boolean
  isComplete: boolean
  transactionStatus: "Pending" | "Success" | "Failed" | "Cancel" | null
}

export default function PaymentForm({ onSubmit, isProcessing, isComplete, transactionStatus }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState(mockUser.firstName + " " + mockUser.lastName)
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(paymentMethod)
  }

  const renderStatusIcon = () => {
    switch (transactionStatus) {
      case "Success":
        return <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      case "Failed":
        return <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
      case "Pending":
        return <Clock className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
      case "Cancel":
        return <XCircle className="h-16 w-16 text-gray-500 mx-auto mb-4" />
      default:
        return null
    }
  }

  const renderStatusMessage = () => {
    switch (transactionStatus) {
      case "Success":
        return "Payment successful! You now have access to the course."
      case "Failed":
        return "Payment failed. Please try again or use a different payment method."
      case "Pending":
        return "Payment is being processed. Please wait."
      case "Cancel":
        return "Payment was cancelled."
      default:
        return ""
    }
  }

  if (isComplete) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            {renderStatusIcon()}
            <h3 className="text-2xl font-bold mb-2">
              {transactionStatus === "Success" ? "Thank You!" : "Payment Status"}
            </h3>
            <p className="text-gray-600 mb-6">{renderStatusMessage()}</p>
            {transactionStatus === "Success" && <Button className="w-full md:w-auto">Go to Course</Button>}
            {(transactionStatus === "Failed" || transactionStatus === "Cancel") && (
              <Button className="w-full md:w-auto" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Enter your billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue={mockUser.firstName} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue={mockUser.lastName} readOnly />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={mockUser.email} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue={mockUser.address} />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Select your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            defaultValue="credit-card"
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="credit-card" id="credit-card" className="peer sr-only" />
              <Label
                htmlFor="credit-card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <CreditCard className="mb-3 h-6 w-6" />
                Credit Card
              </Label>
            </div>
            <div>
              <RadioGroupItem value="e-wallet" id="e-wallet" className="peer sr-only" />
              <Label
                htmlFor="e-wallet"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Wallet className="mb-3 h-6 w-6" />
                E-Wallet
              </Label>
            </div>
            <div>
              <RadioGroupItem value="bank-transfer" id="bank-transfer" className="peer sr-only" />
              <Label
                htmlFor="bank-transfer"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <BanknoteIcon className="mb-3 h-6 w-6" />
                Bank Transfer
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === "credit-card" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "e-wallet" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="walletId">E-Wallet ID</Label>
                <Input id="walletId" placeholder="Enter your e-wallet ID" required />
              </div>
            </div>
          )}

          {paymentMethod === "bank-transfer" && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="font-medium mb-2">Bank Transfer Details:</p>
                <p className="text-sm text-gray-600">Bank: Example Bank</p>
                <p className="text-sm text-gray-600">Account Number: 1234567890</p>
                <p className="text-sm text-gray-600">Account Name: Course Platform</p>
                <p className="text-sm text-gray-600">Reference: Please use your email as reference</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Complete Payment"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

