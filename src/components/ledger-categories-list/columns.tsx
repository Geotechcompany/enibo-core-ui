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
    accessorKey: "ledgerCategory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ledger Category" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("ledgerCategory")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "ledgerCategoryDescription",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ledger Category Description"
      />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("ledgerCategoryDescription")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "categoryNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("categoryNumber")}</div>,
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
