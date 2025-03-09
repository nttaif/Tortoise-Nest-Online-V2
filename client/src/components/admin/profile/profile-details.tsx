import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserType } from "@/types/UserType"
import { CalendarDays, MapPin, RefreshCw } from "lucide-react"

export function ProfileDetails({ user }: { user: UserType }) {
    // Format dates
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(date))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Your personal information and account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-1">
                    <div className="text-sm font-medium text-muted-foreground">User ID</div>
                    <div className="font-mono text-sm">{user._id}</div>
                </div>

                <div className="grid gap-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Address</span>
                    </div>
                    <div>{user.address || "No address provided"}</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />
                            <span>Created</span>
                        </div>
                        <div>{formatDate(user.createdAt)}</div>
                    </div>

                    <div className="grid gap-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <RefreshCw className="h-4 w-4" />
                            <span>Last Updated</span>
                        </div>
                        <div>{formatDate(user.updatedAt)}</div>
                    </div>
                </div>

                <div className="grid gap-1">
                    <div className="text-sm font-medium text-muted-foreground">Version</div>
                    <div className="text-sm">{user.__v}</div>
                </div>
            </CardContent>
        </Card>
    )
}
