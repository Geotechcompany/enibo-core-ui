import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { LedgerAccount } from "@/types/global";

 

export const columns: ColumnDef<LedgerAccount>[] = [
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
    accessorKey: "ledgerAccountNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ledger Account  Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("ledgerAccountNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
    {
        accessorKey: "exportLedgerAccountNumber",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Export Ledger Account Number" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("branchCode")}</div>,
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
        accessorKey: "ledgerAccountType",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ledger Account Type" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("ledgerAccountType")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "customerAccountNumber",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer Account Number" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("customerAccountNumber")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "branchCode",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch Code" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("branchCode")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "ledgerAccountCategory",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ledger Account Category" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("ledgerAccountCategory")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "chartString",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Chart String" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("chartString")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
];
