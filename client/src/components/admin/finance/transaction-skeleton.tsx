import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function TransactionSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-28 mb-2" />
                <Skeleton className="h-3 w-36" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-full md:w-[180px]" />
            <Skeleton className="h-10 w-full md:w-[180px]" />
            <Skeleton className="h-10 w-full md:w-[180px]" />
            <Skeleton className="h-10 w-full md:w-[100px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="p-4">
            <Skeleton className="h-10 w-full mb-4" />
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-16 w-full mb-2" />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

