import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { CalendarFields } from "../calendar/schema";

export const columns: ColumnDef<CalendarFields>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center mr-2">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
          className=""
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center mr-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className=""
        />
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "businessCalendarId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Business Calendar ID" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("businessCalendarId")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "businessCalendarName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Business Calendar Name"
      />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("businessCalendarName")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "startOfMonth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Of Month" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("startOfMonth")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "workDays",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Work Days" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("workDays")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "startOfWeek",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Of Week" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("startOfWeek")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "modifiedOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modified On" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("modifiedOn")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
];
