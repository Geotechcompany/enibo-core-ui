import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { KYCBusiness } from "@/types/global";

export const columns: ColumnDef<KYCBusiness>[] = [
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
    accessorKey: "businessKYCId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KYC ID" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("businessKYCId")}</div>
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
    accessorKey: "legalEntityName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Legal Entity Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("legalEntityName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "legalStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Legal Status" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("legalStatus")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "dateOfIncorporation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date of incorporation" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("dateOfIncorporation")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "registrationNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("registrationNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "natureOfBusiness",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nature Of Business" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("natureOfBusiness")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "entityNationality",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entity Nationality" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("entityNationality")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "entityPinNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pin Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("entityPinNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "entityTaxNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("entityTaxNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "telephoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telephone" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("telephoneNumber")}</div>,
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
