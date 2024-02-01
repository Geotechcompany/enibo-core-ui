import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { KYCType } from "@/types/global";

 

export const columns: ColumnDef<KYCType>[] = [
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
    accessorKey: "kycTypeCode",
    header: ({ column }) => (
    <DataTableColumnHeader column={column} title="KYC Type Code" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("kycTypeCode")}</div>,
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
    accessorKey: "kycTypeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KYC Type Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("kycTypeName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
   
    {
        accessorKey: "KYCTypeDescription",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("KYCTypeDescription")}</div>,
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
