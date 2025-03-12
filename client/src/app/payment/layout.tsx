import type React from "react"
export default function PaymentCallbackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">{children}</div>
}

