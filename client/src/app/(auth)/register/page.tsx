import RegisterFormLayout from '@/components/auth/register/register.form.layout'
import React from 'react'

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
           <div className="w-full max-w-lg bg-white p-8 rounded-md shadow-md text-white">
              <RegisterFormLayout></RegisterFormLayout>
            </div>
        </div>
  )
}
