import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/dataTable/datatable-column-header";
import { LedgerRule } from "@/types/global";

 

export const columns: ColumnDef<LedgerRule>[] = [
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
    <DataTableColumnHeader column={column} title="Rule Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
},
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("priority")}</div>,
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
        accessorKey: "transactionType",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Transaction Type" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("transactionType")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "contains",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Transactions Description Contains" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("contains")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "doesNotContain",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Transaction Description Does Not Contain" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("doesNotContain")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "from",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="From" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("from")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "to",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="To" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("to")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "debitAccount",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Debit Ledger Account" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("debitAccount")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "creditAccount",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Credit Ledger Account" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("creditAccount")}</div>,
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
    }
];
