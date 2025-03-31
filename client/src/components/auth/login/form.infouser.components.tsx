"use client"
import React, { useState, useEffect } from "react"
import { Button } from "../../ui/button"
import { Checkbox } from "../../ui/checkbox"
import { Input } from "../../ui/input"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { APIError } from "@/apis/common/lib/axios"
import { authenticate } from "@/components/common/action"
import { FacebookIcon, GithubIcon, GoogleIcon } from "../../../../public/icon/icon"
import { VerifyAccountDialog } from "./verify.account.dialog"
import { ValidationContext } from "@/components/DesignPattren/Strategy/validation-context"
import { FormValidationStrategy } from "@/components/DesignPattren/Strategy/validation-strategy"

interface FormData {
  username: string
  password: string
  remember: boolean
}

export default function FormInfoUserComponents() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const validationContext = React.useMemo(() => new ValidationContext(new FormValidationStrategy()), [])

  const form = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  })

  const validateForm = (data: Partial<FormData>): boolean => {
    const result = validationContext.validate(data)
    setValidationErrors(result.errors)
    setIsFormValid(result.isValid)
    return result.isValid
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      validateForm(value as FormData)
    })
    return () => subscription.unsubscribe()
  }, [form.watch])


  const onSubmit = async (values: FormData) => {
    // Validate form using strategy pattern
    if (!validateForm(values)) {
      return
    }

    setIsLoading(true)
    const loadingToast = toast.loading("Authenticating...")
    try {
      const result = await authenticate(values.username, values.password)
      if (!result) {
        throw new Error("Authentication service unavailable")
      }
      if (result.error) {
        // Handle specific error cases
        if (result.error === "Account is not activity") {
          toast.error("Account is not activity", {
            description: "Please contact admin to active your account",
          })
          setIsVerifyDialogOpen(true)
        }
        if (result.error === "Username or password invalid") {
          toast.error("Username or password invalid", {
            description: "Please check your credentials and try again",
          })
          return
        }
        if (result.error === "User not found") {
          toast.error("User not found", {
            description: "Please check your credentials and try again",
          })
          return
        }
        if (result.error === "InvalidCredentials") {
          toast.error("Invalid credentials", {
            description: "Please check your credentials and try again",
          })
          return
        }

        // Focus password field for better UX
        form.setFocus("password")
        return
      }

      // Success case
      toast.success("Welcome back!", {
        description: "Successfully signed in",
        duration: 2000,
      })

      // Small delay for better UX
      setTimeout(() => {
        router.push(callbackUrl)
        router.refresh()
      }, 500)
    } catch (error) {
      if (error instanceof APIError) {
        if (error.statusCode === 401) {
          toast.error("Login failed", {
            description: `${error.message}!`,
          })
          form.setFocus("password")
        } else {
          toast.error("Unable to sign in", {
            description: "Please try again later",
          })
        }
      }
    } finally {
      setIsLoading(false)
      toast.dismiss(loadingToast)
    }
  }

  return (
    <Form {...form}>
      <VerifyAccountDialog
        isOpen={isVerifyDialogOpen}
        onClose={() => setIsVerifyDialogOpen(false)}
        email={form.getValues("username")}
      />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Field: Email */}
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} placeholder="name@company.com" />
              </FormControl>
              {validationErrors.username && <FormMessage>{validationErrors.username}</FormMessage>}
            </FormItem>
          )}
        />

        {/* Field: Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} type="password" placeholder="••••••••" />
              </FormControl>
              {validationErrors.password && <FormMessage>{validationErrors.password}</FormMessage>}
            </FormItem>
          )}
        />

        {/* Field: Checkbox Remember */}
        <FormField
          name="remember"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Remember me?</FormLabel>
            </FormItem>
          )}
        />
        <hr className="h-[0.1px] my-8 bg-gray-200 border-0 "></hr>
        <div className="flex flex-col p-2 gap-4 w-full max-w-sm mx-auto">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 bg-white text-black hover:bg-[#FFFCFC] w-full"
          >
            <GoogleIcon />
            <span className="text-sm sm:text-base">Login with Google</span>
          </Button>

          <Button className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600">
            <FacebookIcon />
            <span className="text-sm sm:text-base">Login with Facebook</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-[#FFFCFC]"
          >
            <GithubIcon />
            <span className="text-sm sm:text-base">Login with Github</span>
          </Button>
        </div>
        <Button type="submit" disabled={isLoading || !isFormValid} className="w-full bg-blue-500 hover:bg-blue-600">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  )
}

