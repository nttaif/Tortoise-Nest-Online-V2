import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface CourseCardProps {
  image: string
  price: number
  level: string
  lessons: number
  students: number
  title: string
  rating: number
  duration: number
  href: string
}

export function CourseCard({ image, price, level, lessons, students, title, rating, duration, href }: CourseCardProps) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg">
      <div className="relative">
        {/* Course Image */}
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Price Tag */}
        <div className="absolute right-3 top-3">
          <Badge className="bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90">${price.toFixed(2)}</Badge>
        </div>

        {/* Level Badge */}
        <div className="absolute left-3 bottom-3">
          <Badge variant="secondary" className="bg-[#6B7AFF] text-white hover:bg-[#6B7AFF]/90">
            {level}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Course Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span>{lessons} Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            <span>{students} Students</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{title}</h3>

        {/* Rating and Duration */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">({rating}/5)</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 fill-current mr-1" viewBox="0 0 24 24">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
            </svg>
            {duration} Weeks
          </div>
        </div>
      </div>
    </Link>
  )
}

