import { Suspense } from "react"
import { notFound } from "next/navigation"
import UserProfile from "@/components/user/user-profile"
import UserInfo from "@/components/user/user-info"
import { Skeleton } from "@/components/ui/skeleton"

async function getUser(id: string) {
  const mockUser = {
    _id: id,
    email: "user@gmail.com",
    firstName: "Name",
    lastName: "",
    address: "",
    avatar: "",
    role: "Customer",
    isActive: true,
    createdAt: new Date("2021-01-26T20:55:12"),
    updatedAt: new Date(),
    __v: 0,
  }

  return mockUser
}

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-72 h-96 p-8 border-r border-[#dbdbdb]">
        <div className="space-y-4">
          <p className="font-medium">Quay lại trang chủ</p>
          <button className="w-full flex items-center justify-start gap-2 px-4 py-2 border border-[#dbdbdb] rounded-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Tài khoản
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="border border-[#dbdbdb] rounded-md">
          <div className="p-6">
            <h1 className="text-xl font-medium mb-8">Tổng quan</h1>
            <Suspense fallback={<ProfileSkeleton />}>
              <UserProfile user={user} />
            </Suspense>
          </div>

          <div className="border-t border-[#dbdbdb]">
            <Suspense fallback={<InfoSkeleton />}>
              <UserInfo user={user} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="flex items-start gap-4 mb-8">
      <Skeleton className="w-24 h-24 rounded-full" />
      <div className="mt-10">
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  )
}

function InfoSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 p-6">
      {[...Array(5)].map((_, i) => (
        <div key={i}>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-32" />
        </div>
      ))}
    </div>
  )
}

