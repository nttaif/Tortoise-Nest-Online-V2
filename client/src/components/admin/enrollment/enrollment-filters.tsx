"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

// Client Component for interactive filters
export default function EnrollmentFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams)
    if (searchQuery) {
      params.set("query", searchQuery)
    } else {
      params.delete("query")
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams)

    if (statusFilter) {
      params.set("status", statusFilter)
    } else {
      params.delete("status")
    }

    if (searchQuery) {
      params.set("query", searchQuery)
    } else {
      params.delete("query")
    }

    replace(`${pathname}?${params.toString()}`)
    setIsFiltersOpen(false)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("")
    replace(pathname)
    setIsFiltersOpen(false)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-between">
      <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Search enrollments..."
          className="flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </form>

      <div className="flex gap-2">
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Enrollments</SheetTitle>
              <SheetDescription>Apply filters to narrow down enrollment results</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="status-filter" className="text-sm font-medium">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="search-filter" className="text-sm font-medium">
                  Search
                </label>
                <Input
                  id="search-filter"
                  placeholder="Search by name or course"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              </SheetClose>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

