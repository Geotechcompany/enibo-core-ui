import { DataTable } from "@/components/datatable/data-table";
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
import { useFeeState } from "@/store/feestate";

interface FeeProps {}

const feeTypes: FC<FeeProps> = () => {
  const { setState} = useFeeState();
  const [feeTypes, setfeeTypes] = useState<FeeType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sorting] = useState([{ id: "modifiedOn", desc: true }])


  const location = useLocation();
  const navigate = useNavigate();
  const from =
    location.state?.from ||
    "/administration/static-data/fee-types/new-fee-type";
    const { data, loading: queryLoading, error: queryError, refetch } = useQuery(queryFeeTypesList);
    
    useEffect(() => {
      if (data) {
        setfeeTypes(data.feeTypes);
      }
      setLoading(queryLoading);
      refetch();
      setError(queryError ? queryError.message : null);
    }, [data, queryLoading, queryError, refetch]);
    const [deleteFeeType] = useMutation(DELETE_FEE_TYPE_LIST);
    const [selected, setSelected] = useState<number[]>([]);
   const handleDelete = async () => {
  if (selected.length) {
    try {
      toast({
        title: "Confirm deletion",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Confirm deletion of selected record/s
            </div>
            <div className="flex justify-end mt-4">
              <Button
                size={"sm"}
                variant={"outline"}
                className="text-[#253285] border-[#253285] font-bold py-1 px-4 rounder mr-2"
                onClick={() => {
                  // Code to uncheck selected records
                  setSelected([]);
                  window.location.reload();
                  toast({}).dismiss();
                }}
              >
                Cancel
              </Button>
              <Button
                size={"sm"}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 rounded"
                onClick={async () => {
                  try {
                    // Extracting feeTypeIds from selected rows
                    const selectedFeeTypeIds = selected.map(
                      (selectedIndex) => feeTypes[selectedIndex].feeTypeId
                    );
                    // Deleting selected feeTypes
                    await Promise.all(
                      selectedFeeTypeIds.map(async (feeTypeId) => {
                        await deleteFeeType({ variables: { feeTypeId: feeTypeId } });
                      })
                    );

                    // Filter out deleted items from UI
                    const updatedfeeTypes = feeTypes.filter(
                      (feeType) => !selectedFeeTypeIds.includes(feeType.feeTypeId)
                    );
                    setfeeTypes(updatedfeeTypes);
                    setSelected([]);
                    toast({}).dismiss();
                    window.location.reload();
                  } catch (error) {
                    console.error("Error deleting fee types:", error);
                  }
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        ),
      });
    } catch (error) {
      console.error("Error showing confirmation toast:", error);
    }
  }
};

  

  
    const handleRedirect = (mode: string) => {
      if (mode === "ADD") {
        navigate(from, { replace: true })
        setState({
          feeTypeId:"",
          feeTypeName: "",
          description:"",
          transactionTypes:[""],
          paymentFrequency:"",
          effectiveDate:"",
          fixedRate:0.00,
          mode: "ADD",
        });
      } else if (mode === "EDIT") {
        if (selected.length === 1) {
          navigateToEditPage();
        }
        setState({
          feeTypeId:"",
          feeTypeName: "",
          description:"",
          transactionTypes:[""],
          paymentFrequency:"",
          effectiveDate:"",
          fixedRate:0.00,
          mode: "EDIT",
        });
      } else if (mode === "COPY") {
        if (selected.length === 1) {
          const selectedRecord = feeTypes[selected[0]];
          setState({
            feeTypeId: selectedRecord.feeTypeId,
            feeTypeName: selectedRecord.feeTypeName,
           description: selectedRecord.description,
           transactionTypes: selectedRecord.transactionTypes,
           paymentFrequency: selectedRecord.paymentFrequency,
           effectiveDate: new Date(selectedRecord.effectiveDate).toISOString().split('T')[0], // Format the date here

            fixedRate: selectedRecord.fixedRate,
            mode: "COPY",
          })
          navigate(`/edit-fee-type/${selectedRecord.feeTypeId}`,  {
            state: {
              from: from,
              feeTypeName: selectedRecord,
              description: selectedRecord.description,
              transactionTypes: selectedRecord.transactionTypes,
            },
          });
        }
      }
    }
  
  
    const navigateToEditPage = () => {
      if (selected.length === 1) {
        const selectedRecord = feeTypes[selected[0]];
        const feeTypeName = selectedRecord.feeTypeName;
        navigate(`/edit-fee-type/${selectedRecord.feeTypeId}`, {
          state: { from: from, feeTypes: selectedRecord, feeTypeName: feeTypeName},
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
              onClick={()=>handleRedirect("ADD")}
            >
              <FaPlus className="mr-1 text-white" />  Add
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
              onClick={()=>handleRedirect("EDIT")}
            >
              Edit
            </Button>
          </div>
          <div className="mr-2">
            <Button
              size="sm"
              variant="outline"
              className={`${selected.length !== 1 ? "hidden" : "border-[#36459C] "}`}
              onClick={()=>handleRedirect("COPY")}
            >
              Copy
            </Button>
          </div>

          <div className="mr-2">
            <Button
              size="sm"
              variant="outline"
              className={`${
                selected.length === 0 ? "hidden" : "border-[#36459C] "
              }`}
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


export default feeTypes;
