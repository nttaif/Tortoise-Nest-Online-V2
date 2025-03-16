import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Server Component for displaying status badges
export default function EnrollmentStatusBadge({
  status,
  isTransaction = false,
}: {
  status: string
  isTransaction?: boolean
}) {
  // Define styles based on status
  let variant: "default" | "secondary" | "destructive" | "outline" = "default"

  if (isTransaction) {
    // Transaction statuses
    switch (status.toLowerCase()) {
      case "success":
        variant = "default"
        break
      case "pending":
        variant = "secondary"
        break
      case "failed":
      case "cancel":
        variant = "destructive"
        break
      default:
        variant = "outline"
    }
  } else {
    // Enrollment statuses
    switch (status) {
      case "active":
        variant = "default"
        break
      case "pending":
        variant = "secondary"
        break
      case "cancelled":
        variant = "destructive"
        break
      default:
        variant = "outline"
    }
  }

  return (
    <Badge
      variant={variant}
      className={cn(
        "capitalize",
        status === "pending" && "bg-amber-500 hover:bg-amber-600",
        status === "active" && "bg-green-500 hover:bg-green-600",
        status === "success" && "bg-green-500 hover:bg-green-600",
      )}
    >
      {status}
    </Badge>
  )
}

