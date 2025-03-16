import type { IEnrollment } from "@/types/IEnrollment"
import { formatDateV2 } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import EnrollmentStatusBadge from "./enrollment-status-badge"
import EnrollmentActions from "./enrollment-actions"

// Server Component optimized for mobile
export default function MobileEnrollmentList({
  enrollments,
}: {
  enrollments: IEnrollment[]
}) {
  if (enrollments.length === 0) {
    return <div className="text-center p-4">No enrollments found.</div>
  }

  return (
    <div className="space-y-4">
      {enrollments.map((enrollment) => (
        <Card key={enrollment._id}>
          <CardContent className="pt-6 pb-2">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {typeof enrollment.courseId === "string" ? enrollment.courseId : enrollment.courseId.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Student:{" "}
                    {typeof enrollment.userId === "string"
                      ? enrollment.userId
                      : `${enrollment.userId.firstName} ${enrollment.userId.lastName}`}
                  </p>
                </div>
                <EnrollmentStatusBadge status={enrollment.enrollmentStatus} />
              </div>

              <div className="text-sm">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Enrolled On:</span>
                  <span>{formatDateV2(enrollment.createdAt)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Transaction:</span>
                  <span>
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
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-0">
            <EnrollmentActions enrollment={enrollment} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

