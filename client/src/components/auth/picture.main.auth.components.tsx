import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";

export default function PictureMainAuthComponents() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500 px-4">
      <div className="w-full max-w-3xl bg-blue-500 text-white outline-none space-y-6">
        <CardHeader>
          <div className="flex items-center">
            <Avatar className="w-12 h-12">
              <AvatarImage
                className="rounded-full"
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="ml-3 text-xl font-semibold">TNO</h1>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left">
            Mở rộng kiến thức của bạn cùng với các giảng viên của TNO
          </CardTitle>
          <CardDescription className="text-gray-300 text-center md:text-left mb-6 leading-relaxed">
            Hàng triệu người dùng, hàng triệu học viên đã tin tưởng sử dụng dịch vụ học trực tuyến
            của chúng tôi. Đăng nhập tài khoản của bạn và tiếp tục với khóa học còn dang dở.
          </CardDescription>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0">
            <div className="flex -space-x-4">
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-500"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User 1"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-500"
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User 2"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-500"
                src="https://randomuser.me/api/portraits/men/65.jpg"
                alt="User 3"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-500"
                src="https://randomuser.me/api/portraits/women/12.jpg"
                alt="User 4"
              />
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-300 mx-4"></div>
            <p className="text-sm font-medium text-gray-200 text-center md:text-left">
              Hơn <span className="text-white font-bold">15.7k</span> người dùng đã tham gia
            </p>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
