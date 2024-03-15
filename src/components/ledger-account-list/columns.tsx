import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/dataTable/datatable-column-header";
import { LedgerAccount } from "@/types/global";
import { Link } from "react-router-dom";

export const columns: ColumnDef<LedgerAccount>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="mr-2 flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className=""
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="mr-2 flex items-center justify-center">
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
    accessorKey: "ledger_account_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ledger Account  Number" />
    ),
    cell: ({ row }) => (
      <div className="">
        <Link
          to={`/administration/ledger-management/ledger-accounts/${row.getValue("ledger_account_number")}`}
        >
          {row.getValue("ledger_account_number")}
        </Link>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "export_account_number",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Export Ledger Account Number"
      />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("export_account_number")}</div>
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
    accessorKey: "account_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ledger Account Type" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("account_type")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "customer_account_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Account Number" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("customer_account_number")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "branch_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch Code" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("branch_id")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountCategoryId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ledger Account Category" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("accountCategoryId")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "chart_string",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chart String" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("chart_string")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
];
