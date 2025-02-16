import LoginFormComponent from '@/components/auth/login/login.form.component'
import React from 'react'

export default function login() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
       <div className="w-full max-w-lg bg-white p-8 rounded-md shadow-md text-white ">
          <LoginFormComponent></LoginFormComponent>
        </div>
    </div>
  )
}
