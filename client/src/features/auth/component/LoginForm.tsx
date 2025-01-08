'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Loader2 } from "lucide-react"

interface LoginFormData {
  email: string
  password: string
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true); 
    try {
      // Handle login logic here
      console.log('Form submitted:', data)
    } catch (error) {
      console.error('Login error:', error)
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
  }
  

  return (
    <div className="h-full flex items-center justify-center p-10 bg-gray-50 shadow-lg ">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Chào mừng quay trở lại với TNO</CardTitle>
          <CardDescription className="text-center">
            Nhập mật khẩu và tài khoản để đăng nhâp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Địa chỉ email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email',
                  },
                })}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={errors.password ? 'border-red-500' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
              
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full flex h-14 justify-center items-center rounded-sm bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
           isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Please wait...
            </>
            ) : (
            'Sign in'
            )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="link" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </Button>
          <div className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Button variant="link" className=" p-0 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

