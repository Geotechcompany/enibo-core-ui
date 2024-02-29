import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { LedgerCategory } from "@/types/global";

export const columns: ColumnDef<LedgerCategory>[] = [
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
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "ledgerCategory",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ledger Category"
      />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("ledgerCategory")}</div>
    ),
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
    accessorKey: "categoryNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CategoryNumber" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("categoryNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  
  },
  {
    accessorKey: "modifiedOn",
    header: ({ column }) => (
    <DataTableColumnHeader column={column} title="modifiedOn" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("modifiedOn")}</div>,
    enableSorting: true,
    enableHiding: true,
   
  },  
];
