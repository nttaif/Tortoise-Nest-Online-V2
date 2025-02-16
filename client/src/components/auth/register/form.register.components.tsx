"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input, InputWithOutline } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { MailOpen } from 'lucide-react'
import { FacebookIcon, GoogleIcon, GithubIcon } from '../../../../public/icon/icon'

const FormSchema = z
  .object({
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
    Repassword: z.string(),
  })
  .refine((data) => data.password === data.Repassword, {
    message: "Passwords do not match.",
    path: ["Repassword"],
  });
  export default function FormRegisterComponents() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues: {
          email: "",
          password: "",
          Repassword: "",
        },
      })
     
      function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel><b>Email</b> <span className="text-red-500">*</span> </FormLabel>
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
              <FormLabel><b>Password</b> <span className="text-red-500">*</span> </FormLabel>
              <FormControl>
                <InputWithOutline  placeholder="Enter your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="Repassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel><b>Re-password</b> <span className="text-red-500">*</span> </FormLabel>
              <FormControl>
                <InputWithOutline  placeholder="Enter your Re-password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr className="h-[0.1px] my-8 bg-gray-200 border-0 "></hr>
        <div className="flex flex-col p-2 gap-4 w-full max-w-sm mx-auto">
            <Button variant="outline" className="flex items-center justify-center gap-2 bg-white text-black hover:bg-[#FFFCFC] w-full">
              <GoogleIcon  />
              <span className="text-sm sm:text-base">Sign up with Google</span>
            </Button>

            <Button className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600">
              <FacebookIcon  />
              <span className="text-sm sm:text-base">Sign up with Facebook</span>
            </Button>

            <Button variant="outline" className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-[#FFFCFC]">
              <GithubIcon  />
              <span className="text-sm sm:text-base">Sign up with Github</span>
            </Button>
          </div>
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                 Create new account 
       </Button>
      </form>
    </Form>
  )
}
