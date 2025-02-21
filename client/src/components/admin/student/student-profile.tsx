import { Mail, MapPin, Phone, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StudentProfile() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-primary text-primary-foreground">
      <div className="absolute right-0 top-0 h-full w-2/3">
        <div className="absolute right-0 top-1/4 h-32 w-32 translate-x-1/2 rounded-full bg-orange-400/30" />
        <div className="absolute right-24 top-1/3 h-40 w-40 rounded-full bg-yellow-400/30" />
      </div>
      <div className="relative p-6">
        <h1 className="text-2xl font-bold">Karen Hope</h1>
        <p className="text-sm text-primary-foreground/80">Student</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <User className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-xs text-muted-foreground">Parents</p>
                <p className="font-medium">Justin Hope</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <MapPin className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium">Jakarta, Indonesia</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Phone className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium">+12 345 6789 0</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Mail className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">historia@mail.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

