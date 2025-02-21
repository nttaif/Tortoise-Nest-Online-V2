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
import { AlertCircle, Loader2 } from 'lucide-react'
import { reVerify, verifyCode } from "@/components/common/action"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
      await new Promise(resolve => setTimeout(resolve, 1000)) //Simulate API call
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
      const result =await verifyCode(email, verificationCode);
      if(result.error){
        toast.error(result.error);
        return;
      }else{
        if ('message' in result) {
          toast.success(result.message);
        }
      }
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
            <DialogTitle>Verify account</DialogTitle>
            <DialogDescription>Your account needs to be verified before continuing.</DialogDescription>
          </DialogHeader>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Account: {email} is not verified</AlertTitle>
            <AlertDescription>Please complete the email verification process to continue.</AlertDescription>
          </Alert>
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
              <DialogDescription className="p-4">
              <div className="flex items-start space-x-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <div className="space-y-1">
                <p className="font-medium leading-none">Check your email</p>
                <p className="text-sm text-muted-foreground">
                  We have sent a verification email to your email address. Please check your inbox and enter the code below.
                </p>
              </div>
            </div>
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
