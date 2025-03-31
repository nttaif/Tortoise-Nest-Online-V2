import type { Course } from "@/types/Courses";

// The target interface we want to adapt to
export interface CourseViewModel {
    id: string
    title: string
    description: string
    imageUrl: string
    originalPrice: number
    currentPrice: number
    discountPercentage: number | null
    category: string
    isAvailable: boolean
    teacher: {
        id: string
        name: string
        avatar: string
        email: string
        specialties: Array<{ name: string; color: string }>
        experience: number | null
    }
    createdAt: Date
}

// Lớp Adappter chuyển đổi dữ liệu từ Course sang CourseViewModel

export class CourseAdapter {
    // Phương thức chuyển đổi một đối tượng Course 

    static adapt(course: Course): CourseViewModel {

        //
        const discountPercentage = course.discount ? course.discount : null
        const currentPrice = course.discount
            ? course.price - (course.price * course.discount) / 100
            : course.price

        return {
            id: course._id,
            title: course.name,
            description: course.description,
            imageUrl: course.image,
            originalPrice: course.price,
            currentPrice,
            discountPercentage,
            category: course.category,
            isAvailable: course.status,
            teacher: {
                id: course.teacherId._id,
                name: `${course.teacherId.firstName} ${course.teacherId.lastName}`,
                avatar: course.teacherId.avartar,
                email: course.teacherId.email,
                specialties: course.teacherId.major,
                experience: course.teacherId.experienceYears || null,
            },
            createdAt: new Date(course.createdAt),
        }
    }

    static adaptMany(courses: Course[]): CourseViewModel[] {
        return courses.map(this.adapt)
    }
}

