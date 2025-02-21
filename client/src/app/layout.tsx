import { Toaster } from "sonner";
import '../shared/styles/globals.css';
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className={inter.className}>
          {/* Layout UI */}
          {/* Place children where you want to render a page or nested layout */}
          <Toaster position="top-right" />
          <main>{children}</main>
        </body>
      </html>
    )
  }