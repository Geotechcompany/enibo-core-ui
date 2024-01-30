import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../datatable/datatable-column-header";
import { UserProfiles } from "./schema";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<UserProfiles>[] = [
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
      accessorKey: "profileName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Profile Name" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("profileName")}</div>,
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

  ];