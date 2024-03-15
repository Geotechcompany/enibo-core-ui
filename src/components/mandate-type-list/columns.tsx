import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/dataTable/datatable-column-header";
import { MandateType } from "@/types/global";

 

export const columns: ColumnDef<MandateType>[] = [
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
    accessorKey: "mandateTypeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mandate Type Id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("mandateTypeId")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "mandateTypeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mandate Type Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("mandateTypeName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "mandateTypeDescription",
    header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("mandateTypeDescription")}</div>,
    enableSorting: true,
    enableHiding: true,
},
    {
      accessorKey: "mandateTypeCode",
      header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mandate Type Code" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("mandateTypeCode")}</div>,
      enableSorting: true,
      enableHiding: true,
  },
  {
    accessorKey: "modifiedOn",
    header: ({ column }) => (
    <DataTableColumnHeader column={column} title="ModifiedOn" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("modifiedOn")}</div>,
    enableSorting: true,
    enableHiding: true,
},
];
