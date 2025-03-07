import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function CourseListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden h-full flex flex-col">
            <Skeleton className="aspect-video w-full" />
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent className="flex-grow">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

