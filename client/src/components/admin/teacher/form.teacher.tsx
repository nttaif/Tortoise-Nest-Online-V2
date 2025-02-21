"use client"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { addUser, updateTeacher } from "@/components/common/action"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Teacher } from "@/types/Teacher"
import { Pencil } from "lucide-react"

type FormData = {
  firstName: string
  lastName: string
  role: string
  email: string
  password: string
  major: { name: string; color: string }[];
  educationLevel: string
  experienceYears: number
  publications: string
}
export type MajorOption = {
  name: string;
  color: string;
};
const majors = [
  { name: "Computer Science", color: "#FF5733" },
  { name: "Mathematics", color: "#33FF57" },
  { name: "Physics", color: "#3357FF" },
  { name: "Chemistry", color: "#FF33A8" },
  { name: "Biology", color: "#33A8FF" },
  { name: "Engineering", color: "#A833FF" },
  { name: "Economics", color: "#FFAA33" },
  { name: "Business Administration", color: "#33FFAA" },
] as const

const educationLevels = ["Bachelor's Degree", "Master's Degree", "PhD", "Post-Doctoral"] as const

interface TeacherFormProps {
  mode: "Add" | "Edit"
  initialData?: Teacher
  onSuccess?: () => void
  trigger?: React.ReactNode
}

export default function FormTeacherComponent({ mode = "Add", initialData, onSuccess, trigger }: TeacherFormProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      role: "Teacher",
      email: "",
      password: "",
      major: [],
      educationLevel: "",
      experienceYears: 0,
      publications: "",
    },
  })
  useEffect(() => {
    if (mode === "Edit" && initialData) {
      form.reset({ 
        ...form.getValues(), 
        ...initialData, 
        publications: Array.isArray(initialData.publications) ? initialData.publications.join(", ") : initialData.publications 
      })
    }
  }, [mode, initialData, form])
  const onSubmit = async (data: FormData) => {
    try {
      if (mode === "Add") {
        const add = await addUser(data)
        if ("_id" in add) {
          toast.success("Added teacher successfully")
          form.reset()
        } else {
          toast.error(`Failed to add teacher: ${add.error}`)
        }
      } else {
       
        const update = await updateTeacher(data)
        if ("acknowledged" in update === true) {
          toast.success("Updated teacher successfully")
        } else {
          toast.error(`Failed to update teacher: ${update.error}`)
        }
      }
      setIsOpen(false)
      onSuccess?.()
    } catch (error) {
      toast.error(`An error occurred: ${error}`)
    }
  }

  const defaultTrigger =
  mode === "Add" ? (
    <Button>Add Teacher</Button>
  ) : (
    <Button variant="ghost" size="icon">
      <Pencil className="h-4 w-4" />
    </Button>
  )
  return (
    <div className="p-4">
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              defaultValue="Teacher"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Teacher" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Majors</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {majors.map((major) => (
                      <div key={major.name} className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value.some((m) => m.name === major.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, major])
                            } else {
                              field.onChange(field.value.filter((m) => m.name !== major.name))
                            }
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: major.color }} />
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {major.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Enter years of experience"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publications</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter publications" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{mode === "Add" ? "Add Teacher" : "Save Changes"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  </div>
  )
}

