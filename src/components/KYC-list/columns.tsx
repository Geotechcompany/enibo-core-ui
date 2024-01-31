import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { KYC } from "@/types/global";

 

export const columns: ColumnDef<KYC>[] = [
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
    accessorKey: "kycType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KYC Type" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("kycType")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
    {
        accessorKey: "customer",
        accessorFn: (row) => row.business?.legalEntityName || `${row.individual?.firstName + " " + row.individual?.lastName}`,
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("customer")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "riskRating",
        accessorFn: (row) => row.business?.riskRating || row.individual?.riskRating,
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Risk Rating" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("riskRating")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
      accessorKey: "emailAddress",
      accessorFn: (row) => row.business?.emailAddress || row.individual?.emailAddress,
      header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Address" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("emailAddress")}</div>,
      enableSorting: true,
      enableHiding: true,
  },
  {
    accessorKey: "phoneNumber",
    accessorFn: (row) => row.business?.telephoneNumber || row.individual?.phoneNumber,
    header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("phoneNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
},
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: () => (<div></div>),
    cell: () => <div className=""></div>,
    enableSorting: true,
    enableHiding: true,
  },
];
