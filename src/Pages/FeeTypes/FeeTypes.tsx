import { DataTable } from "@/components/dataTable/data-table";
import { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { columns } from "@/components/fee-type-list/columns";
import { FeeType } from "@/types/global";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import queryFeeTypesList from "@/components/fee-type-list/query";
import { DELETE_FEE_TYPE_LIST } from "@/components/fee-type-list/mutation";
import { toast } from "@/components/ui/use-toast";
import { Row } from "@tanstack/react-table";
import DeleteWarning from "@/components/deleteWarning";

interface FeeProps {}

const FeeTypes: FC<FeeProps> = () => {
  const [feeTypes, setFeeTypes] = useState<FeeType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sorting] = useState([{ id: "modifiedOn", desc: true }]);

  const location = useLocation();
  const navigate = useNavigate();
  const from =
    location.state?.from ||
    "/administration/static-data/fee-types/new-fee-type";
  const {
    data,
    loading: queryLoading,
    error: queryError,
    refetch,
  } = useQuery(queryFeeTypesList);

  useEffect(() => {
    if (data) {
      setFeeTypes(data.feeTypes);
    }
    setLoading(queryLoading);
    refetch();
    setError(queryError ? queryError.message : null);
  }, [data, queryLoading, queryError, refetch]);
  const [deleteFeeType] = useMutation(DELETE_FEE_TYPE_LIST);

  const handleCopy = (selectedRows: Row<FeeType>[]) => {
    localStorage.setItem("feeTypes", JSON.stringify(selectedRows[0].original));
    navigate("/administration/static-data/fee-types/new-fee-type");
  };

  const deleteRows = async (selectedRows: Row<FeeType>[]) => {
    const deletePromises = selectedRows.map((row) => {
      //this is the mutation function
      return deleteFeeType({
        variables: {
          feeTypeId: row.original.feeTypeId,
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

  const handleDelete = async (selectedRows: Row<FeeType>[]) => {
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

  const handleEdit = (selectedRows: Row<FeeType>[]) => {
    navigate(`/edit-fee-type/${selectedRows[0].original.feeTypeId}`);
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
                <Link to="/administration">Static Data</Link>
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
                  Fee Types
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center justify-between my-4">
          <div className="">
            <h1 className="text-4xl text-[#36459C]">Fee Types</h1>
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
              data={feeTypes}
              sorting={sorting}
              handleCopy={handleCopy}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeTypes;
