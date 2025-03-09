"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { UserType } from "@/types/UserType"
import { updateProfile } from "@/types/UserType"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const profileSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    address: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfileForm({ user }: { user: UserType }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
        },
    })

    async function onSubmit(data: ProfileFormValues) {
        setIsSubmitting(true)

        const formData = new FormData()
        formData.append("firstName", data.firstName)
        formData.append("lastName", data.lastName)
        formData.append("email", data.email)
        formData.append("address", data.address || "")

        try {
            const result = await updateProfile(formData)

            if (result.error) {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Profile updated",
                    description: "Your profile has been updated successfully.",
                })
                router.refresh()
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter your address" {...field} />
                            </FormControl>
                            <FormDescription>This address will be used for shipping and billing.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </Form>
    )
}

