import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { User, MapPin, Phone, Mail } from 'lucide-react';
import React from 'react';

const teacherData = {
    name: "Nhan OPO",
    subject: "History Teacher",
    avatar: "/images/avatar.png",
    details: [
        { icon: User, label: "Parents", value: "Justin Hope" },
        { icon: MapPin, label: "Address", value: "Jakarta, Indonesia" },
        { icon: Phone, label: "Phone", value: "+12 345 6789 0" },
        { icon: Mail, label: "Email", value: "Historia@mail.com" }
    ]
};
export default function DetailTeacherComponent() {
    return (
        <Card className="min-w-screen mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-40 relative bg-[#4d44b5] p-6 rounded-t-2xl"></div>

            <CardContent className="p-6 flex flex-col gap-4 text-gray-700">
                <div className="p-6 relative flex flex-col items-center sm:items-start">
                    <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-8 border-white absolute -top-20 sm:-top-28">
                        <AvatarImage src={teacherData.avatar} alt={teacherData.name} />
                    </Avatar>
                    <div className="mt-16 sm:mt-10 text-center sm:text-left">
                        <h2 className="text-[#303972] text-xl sm:text-2xl font-bold">{teacherData.name}</h2>
                        <p className="text-[#4d44b5] font-bold">{teacherData.subject}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between gap-4 text-[#303972] px-2 sm:px-4">
                    {teacherData.details.map((item, index) => (
                        <div key={index} className="w-full sm:w-auto">
                            <ul>
                                <li className="flex items-center space-x-2">
                                    <span className="bg-[#fb7d5b] p-3 rounded-full">
                                        <item.icon className="text-white" size={20} />
                                    </span>
                                    <div>
                                        <p className="text-sm text-gray-500">{item.label}:</p>
                                        <p className="font-semibold">{item.value}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
