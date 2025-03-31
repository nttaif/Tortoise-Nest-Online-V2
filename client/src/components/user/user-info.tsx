import { formatDate } from "@/lib/utils"
import type { UserType } from "@/types/UserType"

export default function UserInfo({ user }: { user: UserType }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 p-6">
      <div>
        <p className="text-sm text-[#979797] mb-1">Email đăng nhập</p>
        <p>{user.email}</p>
      </div>
      <div>
        <p className="text-sm text-[#979797] mb-1">Họ và tên</p>
        <p>{`${user.firstName} ${user.lastName}`.trim() || "N/A"}</p>
      </div>
      <div>
        <p className="text-sm text-[#979797] mb-1">Nhóm khách hàng</p>
        <p>{user.role}</p>
      </div>
      <div>
        <p className="text-sm text-[#979797] mb-1">Đã kích hoạt</p>
        <p>{user.isActive ? "Đã kích hoạt" : "Chưa kích hoạt"}</p>
      </div>
      <div className="col-span-2">
        <p className="text-sm text-[#979797] mb-1">Ngày tham gia</p>
        <p>{formatDate(user.createdAt)}</p>
      </div>
    </div>
  )
}

