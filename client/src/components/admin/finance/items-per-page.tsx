"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ItemsPerPageProps {
  value: number
  onChange: (value: number) => void
}

export function ItemsPerPage({ value, onChange }: ItemsPerPageProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Show</span>
      <Select value={value.toString()} onValueChange={(val) => onChange(Number.parseInt(val))}>
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={value.toString()} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-sm text-muted-foreground">per page</span>
    </div>
  )
}

