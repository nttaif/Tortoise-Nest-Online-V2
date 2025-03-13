"use client"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { RiArrowDropDownLine, RiMenuLine, RiSearch2Line } from "@remixicon/react"

const components_courses = [
    {
        title: "Tất cả khóa học",
        href: "/courses",
        description: "Xem tất cả các khóa học có sẵn.",
    },
    {
        title: "Công nghệ",
        href: "/courses?category=Technology",
        description: "Các khóa học về công nghệ thông tin và lập trình.",
    },
    {
        title: "Kinh tế",
        href: "/Client/courses?category=Economy",
        description: "Khóa học về kinh tế, tài chính và quản lý.",
    },
    {
        title: "Giáo dục",
        href: "/Client/courses?category=Education",
        description: "Các khóa học về phương pháp giảng dạy và giáo dục.",
    },
]

const components_dashboard = [
    {
        title: "Trở thành giảng viên",
        href: "/become-instructor",
        description: "Hướng dẫn trở thành giảng viên tại Tortoise Nest Online.",
    },
    {
        title: "Trang thông tin cá nhân",
        href: "/profile",
        description: "Quản lý thông tin cá nhân và cài đặt tài khoản.",
    },
    {
        title: "Học tập",
        href: "/learning",
        description: "Truy cập các khóa học đã đăng ký và theo dõi tiến độ.",
    },
    {
        title: "Đánh giá",
        href: "/reviews",
        description: "Xem và viết đánh giá cho các khóa học.",
    },
]

export default function HeaderAuth({ session }) {
    const router = useRouter()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    return (
        <header className="h-24 w-full border-b-2 content-center text-center bg-white">
            <div className="container px-10 min-w-full flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="lg:hidden" size="icon">
                                <RiMenuLine className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <MobileNav />
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/images/logoTortoiseNest.png"
                            width={50}
                            height={50}
                            alt="Tortoise Nest Online Logo"
                            className="object-contain"
                        />
                        <span className="font-bold text-xl text-[#161439]">TORTOISE NEST ONLINE</span>
                    </Link>
                </div>

                <nav className="hidden lg:flex items-center gap-8">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-8">
                            <NavigationMenuItem>
                                <Link href="/" className="text-base font-medium text-[#161439] hover:text-[#0d6efd] transition-colors">
                                    Trang chủ
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-base font-medium text-[#161439] hover:text-[#0d6efd]">
                                    Khóa học
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components_courses.map((item) => (
                                            <ListItem key={item.title} title={item.title} href={item.href}>
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem className="text-base font-medium text-[#161439] hover:text-[#0d6efd]" >
                                    <a href="home/AboutUs">About Us</a>
                                <NavigationMenuContent>
                                   
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-base font-medium text-[#161439] hover:text-[#0d6efd]">
                                    Thông tin thêm
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components_dashboard.map((item) => (
                                            <ListItem key={item.title} title={item.title} href={item.href}>
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center">
                        <div className="relative flex items-center min-w-[500px] border rounded-full overflow-hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-12 px-4 hover:bg-transparent hover:text-[#5751e1]">
                                        Thể loại
                                        <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuRadioItem value="all">Tất cả</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="technology">Công nghệ</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="economy">Kinh tế</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="education">Giáo dục</DropdownMenuRadioItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="h-6 w-px bg-gray-200" />
                            <div className="flex-1 flex items-center">
                                <Input
                                    type="search"
                                    placeholder="Tìm kiếm..."
                                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                                <Button size="icon" className="h-12 w-12 rounded-full bg-[#191e24] hover:bg-[#0a58ca] mr-1">
                                    <RiSearch2Line className="h-5 w-5" />
                                </Button>
                            </div>

                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <RiSearch2Line className="h-5 w-5" />
                    </Button>

                    {session ? (
                        <UserNav session={session} />
                    ) : (
                        <Button
                            onClick={() => router.push("/login")}
                            className="h-12 px-6 rounded-full bg-[#191e24] hover:bg-[#0a58ca] text-[#ffffff] hover:text-white font-medium"
                        >
                            Try for free
                        </Button>
                    )}
                </div>
            </div>
            {/* Mobile Search */}
            {isSearchOpen && (
                <div className="lg:hidden fixed inset-x-0 top-24 bg-white p-4 border-b shadow-sm">
                    <div className="flex items-center gap-2">
                        <Input type="search" placeholder="Tìm kiếm..." className="flex-1" />
                        <Button size="icon" className="bg-[#191e24] hover:bg-[#0a58ca]">
                            <RiSearch2Line className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}

function MobileNav() {
    return (
        <div className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium">
                Trang chủ
            </Link>
            <Accordion type="single" collapsible>
                <AccordionItem value="courses">
                    <AccordionTrigger>Khóa học</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            {components_courses.map((item) => (
                                <Link key={item.title} href={item.href} className="text-sm">
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pages">
                    <AccordionTrigger><a href="/home/AboutUs">About Us</a></AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="dashboard">
                    <AccordionTrigger>Chi tiết thêm</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            {components_dashboard.map((item) => (
                                <Link key={item.title} href={item.href} className="text-sm">
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
function UserNav({ session }) {
    const router = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                        <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(`/Admin/account/id/${session?.user?._id}`)}>
                    Thông tin cá nhân
                </DropdownMenuItem>
                {(session?.user?.role === "Lecturer" || session?.user?.role === "Admin") && (
                    <DropdownMenuItem onClick={() => router.push(`/Admin/dashboard/${session?.user?._id}`)}>
                        Chuyển đến trang giảng viên
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => signOut()}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className,
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                    </a>
                </NavigationMenuLink>
            </li>
        )
    },
)
ListItem.displayName = "ListItem"

