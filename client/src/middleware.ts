import { auth } from "./lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  if (session?.user) {
    if (session.user.role === 'Admin') {
      if (!pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url))
      }
    }
    else {
      if (pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }
  }
  else {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)']
}