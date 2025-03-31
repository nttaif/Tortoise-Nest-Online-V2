import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, BookOpenIcon } from "lucide-react"
import { CourseViewModel } from "../adapter/course-adapter"
interface CourseCardProps {
    course: CourseViewModel
}

export function CourseCard({ course }: CourseCardProps) {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    }
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-video overflow-hidden">
                <img
                    src="/images/AboutUs1.png"
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {course.discountPercentage && (
                    <Badge className="absolute right-2 top-2 bg-red-500">{course.discountPercentage}% OFF</Badge>
                )}
                {!course.isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                        <Badge variant="outline" className="text-lg font-semibold text-white">
                            Coming Soon
                        </Badge>
                    </div>
                )}
            </div>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="px-2 py-1">
                        {course.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        {formatDate(course.createdAt)}
                    </div>
                </div>
                <h3 className="mt-2 line-clamp-1 text-xl font-bold">{course.title}</h3>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>

                <div className="mt-4 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={course.teacher.avatar} alt={course.teacher.name} />
                        <AvatarFallback>{course.teacher.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{course.teacher.name}</p>
                        <div className="flex gap-1">
                            {course.teacher.specialties.slice(0, 2).map((specialty, index) => (
                                <Badge key={index} className={specialty.color + " text-white text-xs"}>
                                    {specialty.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
                <div className="flex items-center gap-1">
                    <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                        {course.teacher.experience ? `${course.teacher.experience} years exp.` : "Instructor"}
                    </span>
                </div>
                <div className="text-right">
                    {course.discountPercentage ? (
                        <div>
                            <span className="text-sm text-muted-foreground line-through">{formatPrice(course.originalPrice)}</span>
                            <p className="text-lg font-bold text-primary">{formatPrice(course.currentPrice)}</p>
                        </div>
                    ) : (
                        <p className="text-lg font-bold text-primary">{formatPrice(course.originalPrice)}</p>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}

