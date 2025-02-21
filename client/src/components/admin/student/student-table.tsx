"use client"

import { useState } from "react"
import { MoreHorizontal, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

const students = [
  {
    id: "ID 123456789",
    name: "Samantha William",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "March 25, 2023",
    parentName: "Mana William",
    city: "Jakarta",
    grade: "VI A",
    gradeColor: "bg-orange-500",
  },
  {
    id: "ID 12345254",
    name: "Tony Soap",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "June 25, 2023",
    parentName: "James Soap",
    city: "Phoenix",
    grade: "III A",
    gradeColor: "bg-primary",
  },
  // Add more student data here...
]

export function StudentTable() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedStudents.length === students.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedStudents(students.map((s) => s.id))
                  } else {
                    setSelectedStudents([])
                  }
                }}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Parent Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <Checkbox
                  checked={selectedStudents.includes(student.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedStudents([...selectedStudents, student.id])
                    } else {
                      setSelectedStudents(selectedStudents.filter((id) => id !== student.id))
                    }
                  }}
                />
              </TableCell>
              <TableCell className="flex items-center gap-3">
                <img src={student.avatar || "/placeholder.svg"} alt={student.name} className="h-10 w-10 rounded-full" />
                <span className="font-medium">{student.name}</span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{student.id}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{student.date}</TableCell>
              <TableCell>{student.parentName}</TableCell>
              <TableCell>{student.city}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-100">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-100">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <span className={`rounded px-2 py-1 text-xs font-medium text-white ${student.gradeColor}`}>
                  {student.grade}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <p className="text-sm text-muted-foreground">Showing 1 to 15 of 24 entries</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" disabled>
            {"<"}
          </Button>
          <Button variant="secondary" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="icon">
            {">"}
          </Button>
        </div>
      </div>
    </div>
  )
}

