import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/dataTable/datatable-column-header";
import { Entry} from "@/types/global";

 

export const columns: ColumnDef<Entry>[] = [
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
      <DataTableColumnHeader column={column} title="Transaction Id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
    {
        accessorKey: "transactionId",
        accessorFn: (row) => row.transactionId || row.accountId,
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Entry Type" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("transactionId")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("status")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("amount")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "direction",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Direction" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("direction")}</div>,
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
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("updatedAt")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "expiresAt",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Expires At" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("expiresAt")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
];
