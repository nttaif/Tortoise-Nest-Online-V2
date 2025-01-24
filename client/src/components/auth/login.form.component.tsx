import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import FormInfouserComponents from './form.infouser.components'
import FormInfoUserComponents from './form.infouser.components'

export default function LoginFormComponent() {
  return (
    <div className="w-full max-w-md bg-gray-800 p-8 rounded-md shadow-md text-white">
      <h1 className="text-2xl text-white mb-8 font-bold ">Welcome back TNO </h1>
      <FormInfoUserComponents></FormInfoUserComponents>
      <div className='mt-10' >
      <p className="text-center text-gray-400 mb-6">
        Start your website in seconds. Don’t have an account?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
      </div>
    </div>
  )
}
