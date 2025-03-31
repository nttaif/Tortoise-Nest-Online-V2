"use client"

import { useState } from "react"
import type { IEnrollment } from "@/types/IEnrollment"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal, CheckCircle, XCircle, Eye } from "lucide-react"
import { getEnrollments } from "@/components/common/action"
import { useToast } from "@/hooks/use-toast"

// Client Component for interactive actions
export default function EnrollmentActions({ enrollment }: { enrollment: IEnrollment }) {
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState<"activate" | "cancel" | null>(null)
  const { toast } = useToast()

  const handleStatusUpdate = async () => {
    if (!action) return

    try {
      const newStatus = action === "activate" ? "active" : "cancelled"
      await getEnrollments()

      toast({
        title: "Status updated",
        description: `Enrollment status changed to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update enrollment status",
        variant: "destructive",
      })
    } finally {
      setOpen(false)
      setAction(null)
    }
  }

  const openDialog = (actionType: "activate" | "cancel") => {
    setAction(actionType)
    setOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>

          {enrollment.enrollmentStatus !== "active" && (
            <DropdownMenuItem onClick={() => openDialog("activate")}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Activate
            </DropdownMenuItem>
          )}

          {enrollment.enrollmentStatus !== "cancelled" && (
            <DropdownMenuItem onClick={() => openDialog("cancel")}>
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{action === "activate" ? "Activate Enrollment" : "Cancel Enrollment"}</AlertDialogTitle>
            <AlertDialogDescription>
              {action === "activate"
                ? "This will activate the student enrollment. Are you sure?"
                : "This will cancel the student enrollment. This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStatusUpdate}>
              {action === "activate" ? "Activate" : "Cancel Enrollment"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

