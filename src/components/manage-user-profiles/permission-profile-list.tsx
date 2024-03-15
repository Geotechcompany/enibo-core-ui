import React, { HTMLProps } from "react";
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { manageUserInput, manageUserSchema } from "./schema";
import data from "./manage-profiles.json";
import { DataTableColumnHeader } from "../datatable/datatable-column-header";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function ManageInput() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<manageUserInput>({
    resolver: zodResolver(manageUserSchema),
  });

  const onSubmit = handleSubmit((data) => {
    try {
      toast({
        title: "Permission Type Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              New Permission Type{" "}
              <Link
                to={`/administration/user-management/profile-list`}
                className="text-blue-500 underline"
              >
                {data.moduleName}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/user-management/profile-list");
    } catch (error) {
      console.error("Error creating permission type:", error);
      toast({
        title: "Error",
        description: "Failed to create permission type. Please try again.",
      });
    }
  });

  const columns = React.useMemo<ColumnDef<manageUserInput>[]>(
    () => [
      {
        accessorKey: "moduleName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Module Name" />
        ),
        cell: ({ row }) => (
          <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
            <IndeterminateCheckbox
              checked={row.getIsSelected()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
            />{" "}
            {row.getCanExpand() ? (
              <button
                onClick={row.getToggleExpandedHandler()}
                style={{ cursor: "pointer" }}
              >
                {row.getIsExpanded() ? (
                  <i className="ri-arrow-down-s-line"></i>
                ) : (
                  <i className="ri-arrow-right-s-line"></i>
                )}
              </button>
            ) : (
              ""
            )}{" "}
            {row.getValue("moduleName")}
          </div>
        ),
        accessorFn: (row) => row.moduleName,
      },
      {
        accessorKey: "view",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="View" />
        ),
        cell: ({ row }) => (
          <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
            <Input
              type="checkbox"
              placeholder="view"
              {...register("view")}
              className="flex w-4 h-4"
            />
          </div>
        ),
        accessorFn: (row) => row.view,
      },
      {
        accessorKey: "edit",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Edit" />
        ),
        cell: ({ row }) => (
          <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
            <Input
              type="checkbox"
              placeholder="edit"
              {...register("edit")}
              className="flex w-4 h-4"
            />
          </div>
        ),
        accessorFn: (row) => row.edit,
      },
    ],
    []
  );

  const [expanded, setExpanded] = React.useState<ExpandedState>({
    "REF-1": true,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) =>
      row.subRows?.map((subRow) => ({
        ...subRow,
        id: uuid(),
      })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div />
      <form onSubmit={onSubmit}>
        <div className="">
          <table className="w-full border border-collapse">
            <thead className="border">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="p-2 text-left border"
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="pl-2 border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2 mt-4">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => {}}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = "p-2",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current!.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

export default ManageInput;
