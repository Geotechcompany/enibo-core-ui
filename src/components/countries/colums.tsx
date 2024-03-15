import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Country } from "./schema";
import { DataTableColumnHeader } from "../dataTable/datatable-column-header";

export const columns: ColumnDef<Country>[] = [
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Country ID" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Country Name" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Country Code" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("code")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
        accessorKey: "flag",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Country Flag" />
        ),
        cell: ({ row }) => (
          <div className="">
            <img
              src={row.getValue("flag")}
              alt="Country Flag"
              className="h-3 w-5"
            />
          </div>
        ),
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
    },
  ];