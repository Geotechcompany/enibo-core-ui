import { FC, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "@/components/branch-types/columns";
import { DELETE_BRANCH_TYPE } from "@/components/branch-types/mutation";
import queryBranchTypesList from "@/components/branch-types/query";
import { BranchTypes } from "@/types/global";
import EditBranchTypes from "./EditBranch";

interface BranchesProps {}

const BranchType: FC<BranchesProps> = () => {
  const [branchTypes, setBranchTypes] = useState<BranchTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sorting] = useState([{ id: "modifiedOn", desc: true }]);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || {
    pathname: "/administration/branches/new-branch-type",
  };

  const { data, loading: queryLoading, error: queryError, refetch } = useQuery(
    queryBranchTypesList
  );
  const [deleteBranchType] = useMutation(DELETE_BRANCH_TYPE);
  const [selected, setSelected] = useState<number[]>([]);

  
  useEffect(() => {
    if (data) {
      setBranchTypes(data.branchTypes);
    }
    refetch();
    setLoading(queryLoading);
    setError(queryError ? queryError.message : null);
  }, [data, queryLoading, queryError, refetch]);

  const handleDelete = async () => {
    if (selected.length) {
      // Show confirmation dialog
      if (window.confirm(`Confirm deletion of selected record/s`)) {
        try {
          // Extracting branch type IDs from selected array
          const selectedBranchTypeIds = selected.map(branchTypeIndex => branchTypes[branchTypeIndex].branchTypeId);
  
          // Deleting selected branch types
          await Promise.all(
            selectedBranchTypeIds.map(async (branchTypeId) => {
              await deleteBranchType({ variables: { branchTypeId } });
            })
          );
  
          // Filter out deleted items from UI
          const updatedBranchTypes = branchTypes.filter(
            (branchType) => !selectedBranchTypeIds.includes(branchType.branchTypeId)
          );
          setBranchTypes(updatedBranchTypes);
          setSelected([]);
          window.location.reload();
        } catch (error) {
          console.error("Error deleting branch types:", error);
        }
      }
    }
  };

  const handleEdit = async () => {
    if (selected.length === 1) {
      navigateToEditPage();
    }
  };


  const navigateToEditPage = () => {
    const selectedRecord = branchTypes[selected[0]];

    <Route
    path="/edit-branch-type"
    element={<EditBranchTypes branchTypeName={selectedRecord?.branchTypeName || ""} />}
  />
        const branchName = selectedRecord.branchTypeName;
  
    navigate("/edit-branch-type", { state: { branchType: selectedRecord, branchName } });
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
                  Branch Types List
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center justify-between my-4">
          <div className="">
            <h1 className="text-4xl text-[#36459C]">Branch Types</h1>
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
              data={branchTypes}
              sorting={sorting}
              onRowSelect={setSelected}
            />
          )}
        </div>
        <div className="flex items-center my-4">
          <div className="mr-2">
            <Button
              size="sm"
              variant="outline"
              className={`${selected.length !== 1 ? "hidden" : "border-[#36459C] "}`}
              onClick={handleEdit}
            >
              Edit
            </Button>
          </div>
          <div className="mr-2">
            <Button
              size="sm"
              variant="outline"
              className={`${selected.length !== 1 ? "hidden" : "border-[#36459C] "}`}
              // onClick={handleCopy}
            >
              Copy
            </Button>
          </div>
          <div className="mr-2">
            <Button
              size="sm"
              variant="outline"
              className={`${selected.length  === 0 ? "hidden" : "border-[#36459C] "}`}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchType;