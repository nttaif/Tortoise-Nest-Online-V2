import { Toaster } from "sonner";
import '../shared/styles/globals.css';
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          {/* Layout UI */}
          {/* Place children where you want to render a page or nested layout */}
          <Toaster position="top-right" />
          <main>{children}</main>
        </body>
      </html>
    )
  }