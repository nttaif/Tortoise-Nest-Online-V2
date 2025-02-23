"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number
  pageSize: number
  totalItems: number
}

export function Pagination({ currentPage, pageSize, totalItems }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(totalItems / pageSize)

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("current", pageNumber.toString())
    return `?${params.toString()}`
  }

  // Generate array of page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    // Calculate start and end of visible pages
    let start = Math.max(currentPage - 1, 2)
    let end = Math.min(currentPage + 1, totalPages - 1)

    // Adjust if we're near the start or end
    if (currentPage <= 2) {
      end = 4
    }
    if (currentPage >= totalPages - 1) {
      start = totalPages - 3
    }

    // Add ellipsis if needed
    if (start > 2) {
      pages.push(-1) // -1 represents ellipsis
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) {
      pages.push(-1)
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <PaginationUI>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          </PaginationItem>
        )}

        {getPageNumbers().map((pageNumber, i) => (
          <PaginationItem key={i}>
            {pageNumber === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={createPageURL(pageNumber)} isActive={pageNumber === currentPage}>
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationUI>
  )
}

