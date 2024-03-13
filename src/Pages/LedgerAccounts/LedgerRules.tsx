import { DataTable } from "@/components/datatable/data-table";
import { columns } from "@/components/ledger-rules-list/columns";
import { Button } from "@/components/ui/button";
import { LedgerRule } from "@/types/global";
import { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { queryLedgerRules } from "@/types/queries";
import { toast } from "@/components/ui/use-toast";
import DeleteWarning from "@/components/deleteWarning";
import { Row } from "@tanstack/react-table";
import { DELETE_LEDGER_RULE } from "@/types/mutations";

interface LedgerRulesProps {}

const LedgerRules: FC<LedgerRulesProps> = () => {
  const { data } = useQuery(queryLedgerRules);
  const [ledgerRules, setLedgerRules] = useState<LedgerRule[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || {
    pathname: "/administration/ledger-management/ledger-rules/new-ledger-rule",
  };

  useEffect(() => {
    if (data) {
      setLedgerRules(data.ledgerRules);
    }
  }, [data]);

  const handleEdit = (id: string) => {
    navigate(`/administration/ledger-management/ledger-rules/${id}`);
  };

  const handleCopy = (selectedRows: Row<LedgerRule>[]) => {
    localStorage.setItem(
      "ledgerRule",
      JSON.stringify(selectedRows[0].original)
    );
    navigate(from, { replace: true });
  };
  const [deleteLedgerRule] = useMutation(DELETE_LEDGER_RULE);

  const deleteRows = async (selectedRows: Row<LedgerRule>[]) => {
    const deletePromises = selectedRows.map((row) => {
      return deleteLedgerRule({
        variables: {
          deleteLedgerRuleId: row.original.id,
        },
      });
    });

    const result = await Promise.all(deletePromises);

    if (result) {
      window.location.reload();
      toast({
        title: "Record deleted successfully",
        description: `${selectedRows.length} record(s) deleted successfully`,
      });
    }
  };

  const handleDelete = async (selectedRows: Row<LedgerRule>[]) => {
    try {
      toast({
        title: "Are you sure? The operation is irreversible",
        description: (
          <DeleteWarning handleDeletion={() => deleteRows(selectedRows)} />
        ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error during deletion",
      });
    }
  };
  return (
    <div>
      <div className="mx-4">
        <div className="pt-2">
          <nav className="text-sm text-blue-500" aria-label="Breadcrumb">
            <ol className="inline-flex p-0 m-0 list-none">
              <li className="flex items-center m-0">
                <Link to="/administration">Administration</Link>
                <svg
                  className="w-3 h-3 mx-3 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </li>
              <li className="flex items-center m-0">
                <Link to="#">Ledger Management</Link>
                <svg
                  className="w-3 h-3 mx-3 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </li>
              <li className="m-0">
                <Link to="#" className="text-gray-500" aria-current="page">
                  Ledger Rules
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center justify-between my-4">
          <div className="">
            <h1 className="text-4xl text-[#36459C]">Ledger Rules</h1>
          </div>
          <div className="">
            <Button
              size="sm"
              className="bg-[#36459C] px-8 py-5 text-white"
              onClick={() => navigate(from, { replace: true })}
            >
              <FaPlus className="mr-1 text-white" /> Add
            </Button>
          </div>
        </div>
        <div>
          {ledgerRules && (
            <DataTable
              columns={columns}
              data={ledgerRules}
              handleCopy={handleCopy}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LedgerRules;
