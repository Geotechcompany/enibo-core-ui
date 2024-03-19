import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { ProductType } from "@/types/global";
import { Badge } from "../ui/badge";


export const columns: ColumnDef<ProductType>[] = [
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
    accessorKey: "productTypeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Type Id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("productTypeId")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "productTypeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Type Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("productTypeName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
    {
        accessorKey: "description",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product Type Description" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "active",
        accessorFn: (row) => row.active ? "Active" : "Inactive",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Active" />
        ),
        cell: ({ row }) => <div className=""><Badge >{row.getValue("active")}</Badge></div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "interestBearing",
        accessorFn: (row) => row.interestBearing ? "Yes" : "No",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Interest Bearing" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("interestBearing")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "fixedInterestRate",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fixed Interest Rate (%)" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("fixedInterestRate")}%</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "effectiveDate",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Effective Date" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("effectiveDate")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "fees",
        accessorFn: (row) => row.fees ? "Yes" : "No",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fees" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("fees")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "feeTypes",
        accessorFn: (row) => row.feeTypes?.map((feeType) => feeType.feeTypeName).join(", "),
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fee Types" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("feeTypes")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
      accessorKey: "riskRating",
      header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Risk Rating" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("riskRating")}</div>,
      enableSorting: true,
      enableHiding: true,
  },
    {
        accessorKey: "prefix",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Prefix" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("prefix")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "numberSchema",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Number Schema" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("numberSchema")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "startingValue",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account Number Starting Value" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("startingValue")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
   
];
