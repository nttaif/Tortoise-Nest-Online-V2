"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCcw } from "lucide-react"

interface LiveClassFallbackProps {
  onRetry: () => void
  error?: string
}

export default function LiveClassFallback({ onRetry, error }: LiveClassFallbackProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)
    onRetry()
    // Reset retry state after a delay
    setTimeout(() => setIsRetrying(false), 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-600">
          <AlertCircle className="h-5 w-5 mr-2" />
          Video Conference Issue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="mb-6 text-muted-foreground">
            {error ||
              "There was an issue loading the video conference. This could be due to network issues or browser permissions."}
          </p>
          <div className="space-y-4">
            <p className="text-sm">Please try the following:</p>
            <ul className="text-sm text-left list-disc pl-6 space-y-2">
              <li>Check your internet connection</li>
              <li>Make sure your browser has permission to access your camera and microphone</li>
              <li>Try using a different browser (Chrome or Firefox recommended)</li>
              <li>Disable any browser extensions that might be blocking the conference</li>
            </ul>
          </div>
          <Button onClick={handleRetry} className="mt-6" disabled={isRetrying}>
            {isRetrying ? (
              <>
                <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Retry Connection
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

