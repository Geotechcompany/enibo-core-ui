import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { Branch } from "../branch-list/schema";

 

export const columns: ColumnDef<Branch>[] = [
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
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("branchName")}</div>,
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
        accessorKey: "SWIFTCode",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="SWIFT Code" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("SWIFTCode")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "localBankCode",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Local Bank Code" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("localBankCode")}</div>,
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
        accessorKey: "countrySubdivision",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Country Subdivision" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("countrySubdivision")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "streetName",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Street Name" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("streetName")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "buildingNumber",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Building Number" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("buildingNumber")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "buildingName",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Building Name" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("buildingName")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
];
