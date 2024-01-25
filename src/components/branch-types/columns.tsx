import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { BranchTypes } from "./schema";

 

export const columns: ColumnDef<BranchTypes>[] = [
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
    accessorKey: "branchTypeID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch Type ID" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("branchTypeID")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
    {
        accessorKey: "branchTypeName",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch Type Name" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("branchTypeName")}</div>,
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
        accessorKey: "createdBy",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created By" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("createdBy")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("createdAt")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
];
