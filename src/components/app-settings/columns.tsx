import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../dataTable/datatable-column-header";
import { Setting } from "@/Pages/AppSettings/AppSettingsList";

export const columns: ColumnDef<Setting>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center mr-2">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="App ID" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "value",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="App Value" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("value")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Module Name" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "view",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="View in UI" />
        ),
        cell: ({ row }) => (
          <div className="">
            {row.getValue("hidden") ? "No" : "Yes"}
          </div>
        ),
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "modifiedBy",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Modified By" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("modifiedBy")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "modifiedOn",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Modified On" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("modifiedOn")}</div>,
        enableSorting: true,
        enableHiding: true,
      },

]