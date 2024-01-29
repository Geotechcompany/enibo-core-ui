import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { CurrencyInput } from "./currencies-schema";
import { DataTableColumnHeader } from "../datatable/datatable-column-header";

export const currenciesColumns: ColumnDef<CurrencyInput>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center mr-2">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
      accessorKey: "currencySymbol",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Currency Symbol" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("currencySymbol")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "currencyDescription",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Currency Description" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("currencyDescription")}</div>,
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