import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import FormInfouserComponents from './form.infouser.components'
import FormInfoUserComponents from './form.infouser.components'

export default function LoginFormComponent() {
  return (
    <div className="w-full max-w-md bg-gray-800 p-8 rounded-md  text-white  ">
      <h1 className="text-2xl text-white mb-8 font-bold ">Welcome back TNO </h1>
      <FormInfoUserComponents></FormInfoUserComponents>
      <div className='mt-10' >
      <p className="text-center text-gray-400 text-sm mb-6">
        Bạn mới đến trang TNO lần đầu tiên. Sao không thử đồng hành cùng với nhau nhỉ?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Tạo tài khoản
        </a>
      </p>
      </div>
    </div>
  )
}
