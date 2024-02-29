import { DataTable } from "@/components/datatable/data-table";

import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import queryKycTypesList from "@/components/kyc-type-list/query";
import { columns } from "@/components/kyc-type-list/columns";
import { KYCType } from "@/types/global";
import { DELETE_KYCType } from "@/components/kyc-type-list/mutation";

interface KYCTypesProps {}

const KYCTypes: FC<KYCTypesProps> = () => {
  const [kycTypes, setKycTypes] = useState<KYCType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [sorting] = useState([{ id: "modifiedOn", desc: true }]);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || {
    pathname: "/customers/kyc-types/new-kyc-type",
  };
  const { data, loading: queryLoading, error: queryError,refetch} = useQuery(queryKycTypesList);
  const [DeleteKYCType] = useMutation(DELETE_KYCType);
  useEffect(() => {
    if (data) {
      setKycTypes(data.kycTypes);
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
          // Extracting kyc type IDs from selected array
          const selectedKycTypeIds = selected.map(kycTypesIndex => kycTypes[kycTypesIndex].kycTypeId);
  
          // Deleting selected kyc types
          await Promise.all(
            selectedKycTypeIds.map(async (kycTypeId) => {
              await DeleteKYCType({ variables: { kycTypeId } });
            })
          );
  
          // Filter out deleted items from UI
          const updatedkycTypes = kycTypes.filter(
            (kycType) => !selectedKycTypeIds.includes(kycType.kycTypeId)
          );
          setKycTypes(updatedkycTypes);
          setSelected([]);
          window.location.reload();
        } catch (error) {
          console.error("Error deleting kyc types:", error);
        }
      }
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
              <li className="m-0">
                <Link to="#" className="text-gray-500" aria-current="page">
                  KYC Types
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center justify-between my-4">
          <div className="">
            <h1 className="text-4xl text-[#36459C]">KYC Types</h1>
          </div>
          <div className="">
            <Button
              size="sm"
              className="bg-[#36459C] text-white py-5 px-8"
              onClick={() => navigate(from, { replace: true })}
            >
              <FaPlus className="mr-1 text-white" /> Add new
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
                data={kycTypes} 
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
              className="border-[#36459C]"
              onClick={() => {}}
            >
              Edit
            </Button>
          </div>
          <div className="mr-2">
            <Button
              size="sm"
              variant="outline"
              className="border-[#36459C]"
              onClick={() => {}}
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
export default KYCTypes;

