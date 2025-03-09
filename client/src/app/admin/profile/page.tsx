import type { Metadata } from "next"
import { getAdminProfile } from "@/types/UserType"
import { ProfileHeader } from "@/components/admin/profile/profile-header"
import { ProfileDetails } from "@/components/admin/profile/profile-details"
import { ProfileActions } from "@/components/admin/profile/profile-actions"

export const metadata: Metadata = {
  title: "Admin Profile",
  description: "View and manage your admin profile",
}

export default async function AdminProfilePage() {
  const user = await getAdminProfile()

  if (!user) {
    return <div className="flex h-[50vh] items-center justify-center">User not found</div>
  }

  return (
    <div className="container mx-auto">
      <div className="grid gap-8">
        <ProfileHeader user={user} />
        <div className="grid gap-8 md:grid-cols-2">
          <ProfileDetails user={user} />
          <ProfileActions user={user} />
        </div>
      </div>
    </div>
  )
}

