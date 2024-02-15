import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { FeeType } from "@/types/global";
import { DataTableColumnHeader } from "../datatable/datatable-column-header";

export const columns: ColumnDef<FeeType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
    {
        accessorKey: "feeCode",
        header: "Fee Code",
        cell: ({ row }) => <div className="">{row.getValue("feeCode")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "feeName",
        header: "Fee Name",
        cell: ({ row }) => <div className="">{row.getValue("feeName")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "transactionType",
        header: "Corresponding Transaction Type",
        cell: ({ row }) => <div className="">{row.getValue("transactionType")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "paymentFrequency",
        header: "Payment Frequency",
        cell: ({ row }) => <div className="">{row.getValue("paymentFrequency")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "effectiveDate",
        header: "Effective Date",
        cell: ({ row }) => <div className="">{row.getValue("effectiveDate")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "fixedRate",
        header: "Fixed Rate (%)",
        cell: ({ row }) => <div className="">{row.getValue("fixedRate")}</div>,
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
