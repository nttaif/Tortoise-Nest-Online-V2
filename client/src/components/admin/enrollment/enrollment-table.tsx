import type { IEnrollment } from "@/types/IEnrollment"
import { formatDateV2 } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EnrollmentStatusBadge from "./enrollment-status-badge"
import EnrollmentActions from "./enrollment-actions"

// Server Component that receives data from parent
export default function EnrollmentTable({
  enrollments,
}: {
  enrollments: IEnrollment[]
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Enrolled On</TableHead>
            <TableHead>Transaction</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No enrollments found.
              </TableCell>
            </TableRow>
          ) : (
            enrollments.map((enrollment) => (
              <TableRow key={enrollment._id}>
                <TableCell className="font-medium">
                  {typeof enrollment.userId === "string"
                    ? enrollment.userId
                    : `${enrollment.userId.firstName} ${enrollment.userId.lastName}`}
                </TableCell>
                <TableCell>
                  {typeof enrollment.courseId === "string" ? enrollment.courseId : enrollment.courseId.name}
                </TableCell>
                <TableCell>
                  <EnrollmentStatusBadge status={enrollment.enrollmentStatus} />
                </TableCell>
                <TableCell>{formatDateV2(enrollment.createdAt)}</TableCell>
                <TableCell>
                  {enrollment.transactionId ? (
                    typeof enrollment.transactionId === "string" ? (
                      enrollment.transactionId
                    ) : (
                      <EnrollmentStatusBadge
                        status={enrollment.transactionId.status.toLowerCase() as any}
                        isTransaction={true}
                      />
                    )
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <EnrollmentActions enrollment={enrollment} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

