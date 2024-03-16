import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { KYCIndividual } from "@/types/global";

export const columns: ColumnDef<KYCIndividual>[] = [
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
    accessorKey: "IndividualKYCId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KYC ID" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("IndividualKYCId")}</div>
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
    accessorKey: "designation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Designation" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("designation")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("firstName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "middleName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Middle Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("middleName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("lastName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("phoneNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Address" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("emailAddress")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "postalAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Postal Address" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("postalAddress")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "physicalAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Physical Address" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("physicalAddress")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("country")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "taxNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("taxNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "idType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Type" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("idType")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "idNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("idNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "sex",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sex" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("sex")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "nationality",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nationality" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("nationality")}</div>,
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
    accessorKey: "modifiedOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modified On" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("modifiedOn")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
];
