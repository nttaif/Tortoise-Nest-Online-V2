export { auth as middleware } from "@/lib/auth"
export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|images|favicon.ico|/|register|ws|$).*)",
    ],
  };