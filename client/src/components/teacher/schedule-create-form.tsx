"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import type { Lesson } from "@/types/Lesson"
import { format, addMinutes } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

// This is a Client Component
interface ScheduleCreateFormProps {
  lessons: Lesson[]
  courseId: string
}

const formSchema = z.object({
  lessonId: z.string().min(1, "Please select a lesson"),
  date: z.date({
    required_error: "Please select a date",
  }),
  startTime: z.string().min(1, "Please select a start time"),
  duration: z.coerce.number().min(15, "Minimum duration is 15 minutes").max(240, "Maximum duration is 4 hours"),
  meetingId: z.string().optional(),
  status: z.enum(["scheduled", "pending"]),
})

type FormValues = z.infer<typeof formSchema>

export default function ScheduleCreateForm({ lessons, courseId }: ScheduleCreateFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lessonId: "",
      date: new Date(),
      startTime: "09:00",
      duration: 60,
      meetingId: "",
      status: "scheduled",
    },
  })

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    try {
      // Combine date and time
      const startDateTime = new Date(values.date)
      const [hours, minutes] = values.startTime.split(":").map(Number)
      startDateTime.setHours(hours, minutes)

      // Calculate end time
      const endDateTime = addMinutes(startDateTime, values.duration)

      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Schedule created",
        description: `Class scheduled for ${format(startDateTime, "PPP")} at ${format(startDateTime, "h:mm a")}`,
      })

      form.reset()
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create schedule. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="lessonId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lesson" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {lessons.map((lesson) => (
                    <SelectItem
                      key={typeof lesson._id === "string" ? lesson._id : "unknown"}
                      value={typeof lesson._id === "string" ? lesson._id : ""}
                    >
                      {lesson.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select the lesson you want to schedule</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Select the date for the class</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input type="time" {...field} className="flex-1" />
                  </FormControl>
                  <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                </div>
                <FormDescription>Select the start time</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" min={15} max={240} step={15} {...field} />
                </FormControl>
                <FormDescription>Class duration in minutes</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="meetingId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting ID (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Custom meeting ID" {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>Leave empty to generate automatically</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Set the initial status of this schedule</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating Schedule..." : "Create Schedule"}
        </Button>
      </form>
    </Form>
  )
}

