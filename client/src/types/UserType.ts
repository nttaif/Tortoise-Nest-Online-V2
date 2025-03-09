import { cache } from "react"
export type UserType = {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    avatar: string,
    role: string,
    isActive: boolean,
    createdAt: Date
    updatedAt: Date
    __v: number
}

// This is a mock function that would be replaced with actual data fetching
// Using cache to avoid duplicate requests
export const getAdminProfile = cache(async (): Promise<UserType> => {
    // In a real app, you would fetch this from your API
    return {
        _id: "1234567890",
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "User",
        address: "123 Admin Street, Admin City",
        avatar: "/placeholder.svg?height=200&width=200",
        role: "admin",
        isActive: true,
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-06-15"),
        __v: 0,
    }
})

// Server action to update profile
export async function updateProfile(formData: FormData) {
    // Validate the form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const address = formData.get("address") as string

    if (!firstName || !lastName || !email) {
        return { error: "Missing required fields" }
    }

    // In a real app, you would update the database here
    console.log("Updating profile:", { firstName, lastName, email, address })

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
}

// Server action to toggle active status
export async function toggleActiveStatus(userId: string, isActive: boolean) {
    // In a real app, you would update the database here
    console.log(`Setting user ${userId} active status to ${!isActive}`)

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { success: true, newStatus: !isActive }
}
