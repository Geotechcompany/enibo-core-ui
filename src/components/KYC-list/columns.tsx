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
    accessorKey: "kycTypeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KYC Type" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("kycType")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
    {
        accessorKey: "KycTypeName",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="KycTypeName" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("KycTypeName")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "KycTypeDescription",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Kyc Description" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("KycTypeDescription")}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
      accessorKey: "KycTypeCode",
      header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KycTypeCode" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("KycTypeCode")}</div>,
      enableSorting: true,
      enableHiding: true,
  },
  
];
