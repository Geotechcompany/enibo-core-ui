import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../datatable/datatable-column-header";
import { UserDetails } from "./schema";
import { Checkbox } from "../ui/checkbox";

export const userColumns: ColumnDef<UserDetails>[] = [
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
      accessorKey: "username",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Username" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("username")}</div>,
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
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
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
        accessorKey: "employeeNumber",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Employee Number" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("employeeNumber")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "branch",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Branch" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("branch")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "userProfile",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User Profile" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("userProfile")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "documentAttachment",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Document Attachment" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("documentAttachment")}</div>,
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
      {
        accessorKey: "modifiedBy",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Modified By" />
        ),
        cell: ({ row }) => <div className="">{row.getValue("modifiedBy")}</div>,
        enableSorting: true,
        enableHiding: true,
      },
  ];