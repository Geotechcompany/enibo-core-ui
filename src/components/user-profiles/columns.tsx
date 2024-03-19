import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../datatable/datatable-column-header";
import { Checkbox } from "../ui/checkbox";
import { UserProfile } from "@/Pages/Users.tsx/UserProfileList";

export const columns: ColumnDef<UserProfile>[] = [
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Profile Name" />
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
      accessorKey: "permissions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Permissions" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("permissions")}</div>,
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
  ];