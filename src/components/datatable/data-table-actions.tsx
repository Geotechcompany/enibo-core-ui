
import { Row, Table } from "@tanstack/react-table";
import { Button } from "../ui/button";

interface DataTableActionsProps<TData> {
    table: Table<TData>;
    onEdit: (id: string) => void;
    onCopy: (selectedRows: Row<TData>[]) => void;
    onDelete: (selectedRows: Row<TData>[]) => void;
}

export function DataTableActions<TData> ({table, onEdit, onCopy, onDelete}: DataTableActionsProps<TData>) {
    console.log(table.getSelectedRowModel().flatRows);
    const selectedRows = table.getFilteredSelectedRowModel().rows;
  return (<div>
    <div className="flex items-center my-4">
          <div className="mr-2">
            <Button
              size="sm"
              variant="outline"
              className={`${table.getFilteredSelectedRowModel().rows.length !== 1 ? "hidden" : "border-[#36459C] "}`}
              onClick={()=> onEdit(table.getSelectedRowModel().flatRows[0].original.id)}
            >
              Edit
            </Button>
          </div>
          <div className="mr-2">
            <Button
              size="sm"
              variant="outline"
              className={`${table.getFilteredSelectedRowModel().rows.length !== 1 ? "hidden" : "border-[#36459C] "}`}
              onClick={()=> onCopy(selectedRows)}
            >
              Copy
            </Button>
          </div>
          <div className="mr-2">
            <Button
              size="sm"
              variant="outline"
              className={`${table.getFilteredSelectedRowModel().rows.length  === 0 ? "hidden" : "border-[#36459C] "}`}
              onClick={()=>onDelete(selectedRows)}
            >
              Delete
            </Button>
          </div>
        </div>
  </div>)
}
