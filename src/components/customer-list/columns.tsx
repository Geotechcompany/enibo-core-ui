import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { Customer } from "@/types/global";
import { Link } from "react-router-dom";

 

export const columns: ColumnDef<Customer>[] = [
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
    accessorFn: (row) => row.business?.businessKYC || row.retail?.individualKYC,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer ID" />
    ),
    cell: ({ row }) => <div className=""><Link to={`/customers/${row.getValue("id")}`}>{row.getValue("id")}</Link></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "customerType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Type" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("customerType")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
    {
        accessorKey: "customer",
        accessorFn: (row) => row.business?.legalEntityName || `${row.retail?.firstName + " " + row.retail?.lastName}`,
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("customer")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "riskRating",
        accessorFn: (row) => row.business?.riskRating || row.retail?.riskRating,
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Risk Rating" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("riskRating")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
      accessorKey: "accountCurrency",
      accessorFn: (row) => row.business?.accountCurrency || row.retail?.accountCurrency,
      header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("accountCurrency")}</div>,
      enableSorting: true,
      enableHiding: true,
  },
  
  {
    accessorKey: "accountNumber",
    header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Account Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("accountNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
];
