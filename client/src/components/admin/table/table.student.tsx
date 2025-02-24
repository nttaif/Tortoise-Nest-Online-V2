"use client"
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Printer, ReceiptEuroIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {GraduationCap} from "lucide-react";
import { Input } from "@/components/ui/input"

const data: Teacher[] = [
  {
    id: "123456711",
    name: "Long",
    fees: 316,
    action: "Good",
    image:"/images/taihocbai.jpg",
  },
  {
    id: "1234567546",
    name:"Tai",
    fees: 242,
    action: "Bad",
    image:"/images/taihocbai.jpg",
  },
  {
    id: "1234567811",
    name:"Nhan",
    fees: 837,
    action: "Good",
    image:"/images/taihocbai.jpg",
  },
  {
    id: "1234567985",
    name:"Vi",
    fees: 874,
    action: "Good",
    image:"/images/taihocbai.jpg",
  },
  {
    id: "1234561356",
    name:"Quynh",
    fees: 721,
    action: "Good",
    image:"/images/taihocbai.jpg",
  },
]

export type Teacher = {
  id: string
  name: string
  fees: number
  action:string
  image:string
}

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <div className="flex items-center space-x-2 gap-2 font-semibold text-[#303972]">
          <img
            src={teacher.image}
            alt={teacher.name}
            className="w-10 h-10 rounded-full"
          />
          <span>{teacher.name}</span>
        </div>
      );
    },
  },  

  {
    accessorKey:"id",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
      ID <ArrowUpDown/>
      </Button>
    ),
    cell:({ row }) => {
      const id = parseFloat(row.getValue("id"))
      return <div className="font-semibold text-[#4D44B5]">ID {id}</div>
    }
  },

  {
    accessorKey: "class",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Class <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div>
          {[
            { title: "Class", value: "VII B", icon: <GraduationCap color="white" />, color: "#fb7d5b" },
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full`} style={{ backgroundColor: item.color }}>
                {item.icon}
              </div>
              <div className="p-3">
                <h2 className="text-[#a098ae]">{item.title}</h2>
                <p className="text-base font-semibold text-[#4D44B5]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
    ),
  },

  {
    accessorKey: "fees",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fees <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const fees = parseFloat(row.getValue("fees"))
      return <div className="font-semibold text-[#303972]">$ {fees.toFixed(2)}</div>
    },
  },
  
  {
    accessorKey: "action",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Action<ArrowUpDown />
      </Button>
    ),
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <div className="flex items-center ">
            {[
              {icon: <Printer color="gray"/>},
            ].map((item) => (
              <div className={`w-10 h-10 flex items-center justify-center`}>
                {item.icon}
              </div>
            ))}
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
              <DropdownMenuItem>Option 3</DropdownMenuItem>
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      )
    },
  },
]

export function StudentTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}
                    className="text-[#4D44B5] bg-[#4d44b51a]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader >
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}
                    className={`
                      px-6 py-2
                      ${
                        cell.column.id === "action" ? "text-center" : 
                        "text-left"
                      }
                    `}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
