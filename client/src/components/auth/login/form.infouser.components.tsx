"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import api, { APIError } from "@/apis/common/lib/axios";
import { signIn } from "@/lib/auth";
/**
 * Form validation schema
 */
interface ApiResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  access_token?: string; // Nếu API trả về token sau khi đăng nhập thành công
}
const formSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .max(50, "Username must not exceed 50 characters")
    .email(),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .max(100, "Password must not exceed 100 characters"),
  remember: z.boolean().default(false),
});
type FormSchema = z.infer<typeof formSchema>;
/**
 * SignInCard Component - A clean and focused authentication form
 */
export default function FormInfoUserComponents() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<FormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  /**
   * Handles form submission with enhanced error handling and user feedback
   */
  const onSubmit = async (values: FormSchema) => {
    setIsLoading(true);
    const loadingToast = toast.loading("Authenticating...");
    try {
      
      // const result = await api.post<ApiResponse>("/api/auth/signin",{data: values});
      // console.log(">>>>>>>>>>result", result?.error);
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      if (!result) {
        throw new Error("Authentication service unavailable");
      }
      if (result.error) {
        // Handle specific error cases
        const errorMessage =
          result.error === "CredentialsSignin"
            ? "Invalid username or password"
            : "Authentication failed";

        toast.error(errorMessage, {
          description: "Please check your credentials and try again",
        });

        // Focus password field for better UX
        form.setFocus("password");
        return;
      }

      // Success case
      toast.success("Welcome back!", {
        description: "Successfully signed in",
        duration: 2000,
      });

      // Small delay for better UX
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 500);
    } catch (error) {
      if (error instanceof APIError) {
        if (error.statusCode === 401) {
          toast.error("Login failed", {
            description:  `${error.message}!`,
          });
          form.setFocus("password");
        } else {
          toast.error("Unable to sign in", {
            description: "Please try again later",
          });
        }
      } 
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Field: Email */}
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="name@company.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field: Password */}
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  type="password"
                  placeholder="••••••••"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field: Checkbox Remember */}
        <FormField
          name="remember"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Remember me?</FormLabel>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading || !form.formState.isValid}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
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
  );
}
