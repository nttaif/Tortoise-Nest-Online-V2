import React from 'react'
import FormRegisterComponents from './form.register.components'

export default function RegisterFormLayout() {
  return (
    <div className="w-full max-w-md bg-gray-800 p-8 rounded-md flex items-center justify-center flex-col text-white  ">
          <h1 className="text-2xl text-white mb-8 font-bold">Welcome back TNO </h1>
          <FormRegisterComponents></FormRegisterComponents>
          <div className='mt-10' >
          <p className="text-center text-gray-400 text-sm mb-6">
            Chúng ta đã từng hợp tác với nhau rồi nhỉ, chào mừng bạn quay lại{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Đăng nhập tài khoản
            </a>
          </p>
          </div>
        </div>
  )
}
