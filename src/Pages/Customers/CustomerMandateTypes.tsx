import { DataTable } from "@/components/datatable/data-table";
import { Button } from "@/components/ui/button";
import { MandateType } from "@/types/global";
import { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import queryMandateList from "@/components/mandate-type-list/query";
import { columns } from "@/components/mandate-type-list/columns";
import { DELETE_MANDATE_TYPE } from "@/types/mutations";
import { useToast } from "@/components/ui/use-toast";
import { Row } from "@tanstack/react-table";
import DeleteWarning from "@/components/deleteWarning";

interface CustomerMandateTypesProps {}

const CustomerMandateTypes: FC<CustomerMandateTypesProps> = () => {
  const { toast } = useToast();
  const [MandateTypes, setMandateTypes] = useState<MandateType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sorting] = useState([{ id: "modifiedOn", desc: true }]);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || {
    pathname: "/customers/account-mandate-types/new-mandate-type",
  };

  const {
    data,
    loading: queryLoading,
    error: queryError,
    refetch,
  } = useQuery(queryMandateList);

  useEffect(() => {
    if (data) {
      setMandateTypes(data.mandateTypes);
    }
    refetch();
    setLoading(queryLoading);
    setError(queryError ? queryError.message : null);
  }, [data, queryLoading, queryError, refetch]);

  const [deleteMandateType] = useMutation(DELETE_MANDATE_TYPE);

  const deleteRows = async (selectedRows: Row<MandateType>[]) => {
    const deletePromises = selectedRows.map((row) => {
      //this is the mutation function
      return deleteMandateType({
        variables: {
          mandateTypeId: row.original.mandateTypeId,
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

  const handleDelete = async (selectedRows: Row<MandateType>[]) => {
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

  const handleEdit = (selectedRows: Row<MandateType>[]) => {
    navigate(`/edit-mandate-types/${selectedRows[0].original.mandateTypeId}`);
  };

  const handleCopy = (selectedRows: Row<MandateType>[]) => {
    localStorage.setItem(
      "mandateType",
      JSON.stringify(selectedRows[0].original)
    );
    navigate("/customers/account-mandate-types/new-mandate-type");
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
              <li className="m-0">
                <Link to="#" className="text-gray-500" aria-current="page">
                  Mandate Types
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center justify-between my-4">
          <div className="">
            <h1 className="text-4xl text-[#36459C]">Mandate Types</h1>
          </div>
          <div className="">
            <Button
              size="sm"
              className="bg-[#36459C] text-white py-5 px-8"
              onClick={() => navigate(from, { replace: true })}
            >
              <FaPlus className="mr-1 text-white" /> Add
            </Button>
          </div>
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <DataTable
              columns={columns}
              data={MandateTypes}
              sorting={sorting}
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

export default CustomerMandateTypes;
