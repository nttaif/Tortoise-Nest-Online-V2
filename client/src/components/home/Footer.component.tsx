'use client'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiMailFill, RiMapPin2Fill, RiPhoneFill, RiTwitterFill } from '@remixicon/react'
import Image from 'next/image'
import Link from "next/link"

const exploreItems = ["Gallery", "News & Articles", "FAQ's", "Sign In/Registration", "Coming Soon", "Contacts"];
const linksItems = ["About", "Courses", "Instructor", "Events", "Instructor Profile"];
const contactItems = [
    { icon: RiPhoneFill, label: "Phone" },
    { icon: RiMailFill, label: "Email" },
    { icon: RiMapPin2Fill, label: "Address" }
];
const socialIcons = [RiTwitterFill, RiFacebookFill, RiLinkedinFill, RiInstagramFill];

export default function FooterAuth() {
    return (
        <div className='relative w-full py-16 bg-gray-900 text-white text-center md:text-left'>
            <Image 
                src="/images/imageFooter.png" 
                alt="Footer Background" 
                layout="fill" 
                objectFit="cover" 
                quality={100}
                className="z-0"
            />
            <div className='relative container mx-auto flex flex-col md:flex-row flex-wrap justify-center text-center md:text-left gap-12 px-6'>
                <div className='w-full md:w-1/5 flex flex-col items-center md:items-start'>
                    <Link href="/" className="flex items-center justify-center md:justify-start gap-3">
                        <Image src="/images/logoTortoiseNest.png" width={100} height={100} alt="Logo" className="object-contain" />
                        <span className="font-bold text-xl">TORTOISE NEST ONLINE</span>
                    </Link>
                    <p className='mt-4 text-lg font-bold text-center md:text-left'>Get 26,000+ best online courses from us</p>
                    <div className='flex gap-3 mt-4 justify-center md:justify-start'>
                        {socialIcons.map((Icon, idx) => (
                            <Button key={idx} className='bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#00c7c4]'>
                                <Icon className='fill-white' />
                            </Button>
                        ))}
                    </div>
                </div>
                <div className='w-full md:w-1/5 flex flex-col items-center md:items-start mt-6'>
                    <p className='text-xl font-bold mb-4'>Explore</p>
                    <ul className='space-y-4'>
                        {exploreItems.map((item, idx) => (
                            <li key={idx} className='text-gray-400 cursor-pointer hover:text-[#00c7c4]'>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className='w-full md:w-1/5 flex flex-col items-center md:items-start mt-6'>
                    <p className='text-xl font-bold mb-4'>Links</p>
                    <ul className='space-y-4'>
                        {linksItems.map((item, idx) => (
                            <li key={idx} className='text-gray-400 cursor-pointer hover:text-[#00c7c4]'>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className='w-full md:w-1/5 flex flex-col items-center md:items-start mt-6'>
                    <p className='text-xl font-bold mb-4'>Contact</p>
                    <ul className='space-y-4'>
                        {contactItems.map((contact, idx) => (
                            <li key={idx} className='flex items-center gap-3 text-gray-400'>
                                <Button className='bg-gray-700 w-8 h-8 flex items-center justify-center hover:bg-[#00c7c4]'>
                                    <contact.icon className='fill-white' />
                                </Button>
                                {contact.label}
                            </li>
                        ))}
                    </ul>
                    <div className='mt-4 flex items-center w-full'>
                        <Input placeholder='Your email address' className='w-full px-4 py-2 bg-white text-gray-900' />
                    </div>
                </div>
                <div className='w-full'>
                <hr className='my-8 border-gray-700' />
                <p className='text-center'>© {new Date().getFullYear()} Created by Tortoise Team</p>
                </div>
            </div>
        </div>
    )
}
