import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { UserType } from "@/types/UserType"

export function ProfileHeader({ user }: { user: UserType }) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4 md:flex-row">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                        <AvatarFallback>
                            {user.firstName.charAt(0)}
                            {user.lastName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <h1 className="text-2xl font-bold">
                            {user.firstName} {user.lastName}
                        </h1>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                                {user.role}
                            </Badge>
                            {user.isActive ? (
                                <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                            ) : (
                                <Badge variant="destructive">Inactive</Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

