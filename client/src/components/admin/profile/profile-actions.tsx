import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserType } from "@/types/UserType"
import { ProfileForm } from "./profile-form"
import { StatusToggle } from "./status-toggle"
import { AvatarUpload } from "./avatar-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProfileActions({ user }: { user: UserType }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Profile</CardTitle>
                <CardDescription>Update your profile information and settings</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="edit">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="edit">Edit Profile</TabsTrigger>
                        <TabsTrigger value="avatar">Avatar</TabsTrigger>
                        <TabsTrigger value="status">Status</TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit" className="pt-4">
                        <ProfileForm user={user} />
                    </TabsContent>
                    <TabsContent value="avatar" className="pt-4">
                        <AvatarUpload user={user} />
                    </TabsContent>
                    <TabsContent value="status" className="pt-4">
                        <StatusToggle user={user} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}