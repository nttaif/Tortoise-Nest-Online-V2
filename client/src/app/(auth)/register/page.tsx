import FormRegisterComponents from '@/components/auth/register/form.register.components'
import React from 'react'

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
           <div className="w-full max-w-lg bg-gray-800 p-8 rounded-md shadow-md text-white outline outline-1 outline-gray-700">
              <FormRegisterComponents></FormRegisterComponents>
            </div>
        </div>
  )
}
