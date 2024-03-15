import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { TransactionType } from "@/types/global";

export const columns: ColumnDef<TransactionType>[] = [
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
    accessorKey: "transactionTypeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Type Name" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("transactionTypeName")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "transactionTypeCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Type Code" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("transactionTypeCode")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("description")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "currency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("currency")}</div>,
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
