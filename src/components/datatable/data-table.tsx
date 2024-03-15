import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { useEffect, useState } from "react";
import { DataTableActions } from "./data-table-actions";

export interface SortingState {
  id: string;
  desc: boolean;
}
interface RowSelectionState {
  [key: string]: boolean;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorting?: SortingState[];
  onRowSelect?: (ids: number[]) => void;
  handleEdit: (selectedRows: Row<TData>[]) => void;
  handleCopy: (selectedRows: Row<TData>[]) => void;
  handleDelete: (selectedRows: Row<TData>[]) => void;
  children?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  sorting,
  onRowSelect,
  handleEdit,
  handleCopy,
  handleDelete,
  children,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    if (onRowSelect) {
      const selectedRowIds = Object.keys(rowSelection).filter(
        (key) => rowSelection[key]
      );
      const selectedIds = selectedRowIds.map((id) => parseInt(id, 10));
      onRowSelect(selectedIds);
    }
  }, [rowSelection, onRowSelect]);

  return (
    <div className="space-y-4">
      <div className="border-b">
        <Table>
          <TableHeader className="border-b-4">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="p-0"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="pl-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-gray-800">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTableActions
        table={table}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
      > 
        {children}
      </DataTableActions>
      <DataTablePagination table={table} />
    </div>
  );
}
