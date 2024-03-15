import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/dataTable/datatable-column-header";
import { ApprovalRule } from "@/types/global";

export const columns: ColumnDef<ApprovalRule>[] = [
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
    accessorKey: "module",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Module" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("module")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "subModule",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sub Module" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("subModule")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("status")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "approvalRule",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approval Rule" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("approvalRule")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "requestedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested By" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("requestedBy")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "requestedOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested On" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("requestedOn")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("note")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "pendingApprovers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pending Approvers" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("pendingApprovers")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "approvedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approved By" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("approvedBy")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "rejectionReason",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rejection Reason" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("rejectionReason")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
];
