"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'
import { reVerify } from "@/components/common/action"
import { toast } from "sonner"

interface VerifyAccountDialogProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export function VerifyAccountDialog({ isOpen, onClose, email }: VerifyAccountDialogProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handleRequestCode = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to request verification code
      const result = await reVerify(email);
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setStep(2)
    } catch (error) {
      console.error("Failed to request verification code:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setStep(3)
    } catch (error) {
      console.error("Failed to verify code:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Account Verification Required</DialogTitle>
              <DialogDescription>
                Your account needs to be verified. We&apos;ll send a verification code to {email}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleRequestCode} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending code...
                  </>
                ) : (
                  "Send verification code"
                )}
              </Button>
            </DialogFooter>
          </>
        )
      case 2:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Enter Verification Code</DialogTitle>
              <DialogDescription>
                We&apos;ve sent a verification code to {email}. Please enter it below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  placeholder="Enter code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setStep(1)} variant="outline">
                Back
              </Button>
              <Button onClick={handleVerifyCode} disabled={isLoading || !verificationCode}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </DialogFooter>
          </>
        )
      case 3:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Account Verified!</DialogTitle>
              <DialogDescription>
                Your account has been successfully verified. You can now sign in.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onClose}>
                Close
              </Button>
            </DialogFooter>
          </>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {renderStep()}
      </DialogContent>
    </Dialog>
  )
}
