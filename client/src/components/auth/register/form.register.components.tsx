"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputWithOutline } from "@/components/ui/input"
import { toast } from "sonner"
import React from "react"
import { signUp } from "@/components/common/action"
import { useRouter } from "next/navigation"

const FormSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.string().email({ message: "Invalid email format." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character.",
      })
      .refine((value) => !/\s/.test(value), {
        message: "Password must not contain spaces.",
      }),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  })

export default function FormRegisterComponents() {
  const router = useRouter();
  React.useEffect(() => {
    console.log("Form component loaded")
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      
     const result = await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
     });
     if(!result?.error){
      toast.success(
        "Registration Successful",
        {
        description: "There was an error submitting your registration.",
      })
      router.push("/login");
     }else{
      toast.error(
        "Registration failed",
        {
        description: "There was an error submitting your registration.",
      })
     }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error(
        "Registration failed",
        {
        description: "There was an error submitting your registration.",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => {
            console.log("Form valid, submitting:", data)
            onSubmit(data)
          },
          (errors) => {
            console.error("Form validation failed:", errors)
            toast.error("Validation Error",{
              description: "Please check the form for errors",
            })
          },
        )}
        className="w-full space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <b>First Name</b> <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <InputWithOutline placeholder="Enter your first name" {...field} />
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
                <FormLabel>
                  <b>Last Name</b> <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <InputWithOutline placeholder="Enter your last name" {...field} />
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
              <FormLabel>
                <b>Email</b> <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <InputWithOutline placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <b>Password</b> <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <InputWithOutline placeholder="Enter your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <b>Re-password</b> <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <InputWithOutline placeholder="Confirm your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="h-[0.1px] my-8 bg-gray-200 border-0"></hr>
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
          Create new account
        </Button>
      </form>
    </Form>
  )
}

