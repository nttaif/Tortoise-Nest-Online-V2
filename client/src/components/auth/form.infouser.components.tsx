'use client';
import React from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'

export default function FormInfoUserComponents() {
  return (
    <div>
    <form method="post" action="/api/auth/signin" className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            height={36}
            id="email"
            type="email"
            placeholder="name@company.com"
            className="w-full mt-3  focus:outline-none focus:ring-2 focus:ring-offset focus:ring-offset-1 focus:ring-offset-[#2563ea] focus:ring-[#2563ea] focus:border-[#2563ea] "
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password <span className="text-red-500">*</span>
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full mt-3  focus:outline-none focus:ring-2 focus:ring-offset focus:ring-offset-1 focus:ring-offset-[#2563ea] focus:ring-[#2563ea] focus:border-[#2563ea]"
            required
          />
        </div>
        <div className="flex items-center place-content-center  justify-between">
          <div>
        <Checkbox id="remember-login" 
          className='mr-2'
        />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
             >
             Remember me?
          </label>
          </div>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
          Sign in to your account
        </Button>
      </form>    
      </div>
  )
}
