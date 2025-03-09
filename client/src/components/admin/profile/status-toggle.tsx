"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { UserType } from "@/types/UserType"
import { toggleActiveStatus } from "@/types/UserType"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function StatusToggle({ user }: { user: UserType }) {
    const [isActive, setIsActive] = useState(user.isActive)
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    const handleToggle = async () => {
        setIsPending(true)

        try {
            const result = await toggleActiveStatus(user._id, isActive)

            if (result.success) {
                setIsActive(result.newStatus)

                toast({
                    title: `Account ${result.newStatus ? "Activated" : "Deactivated"}`,
                    description: `Your account is now ${result.newStatus ? "active" : "inactive"}.`,
                })

                router.refresh()
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update account status. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h4 className="font-medium">Account Status</h4>
                    <p className="text-sm text-muted-foreground">
                        {isActive ? "Your account is currently active" : "Your account is currently inactive"}
                    </p>
                </div>
                <Switch checked={isActive} onCheckedChange={handleToggle} disabled={isPending} />
            </div>

            <Alert variant={isActive ? "default" : "destructive"}>
                <div className="flex items-center gap-2">
                    {isActive ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertTitle>{isActive ? "Account Active" : "Account Inactive"}</AlertTitle>
                </div>
                <AlertDescription>
                    {isActive
                        ? "Your account is active and you have full access to all features."
                        : "Your account is inactive. Some features may be limited or unavailable."}
                </AlertDescription>
            </Alert>

            <Button
                variant={isActive ? "destructive" : "default"}
                className="w-full"
                onClick={handleToggle}
                disabled={isPending}
            >
                {isPending ? "Processing..." : isActive ? "Deactivate Account" : "Activate Account"}
            </Button>
        </div>
    )
}

