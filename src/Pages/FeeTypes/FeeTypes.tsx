import { DataTable } from "@/components/datatable/data-table";
import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import feeList from "@/components/fee-type-list/fee.json";
import { columns } from "@/components/fee-type-list/columns";
import { FeeType } from "@/types/global";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

interface FeeProps {}

const FeeTypes: FC<FeeProps> = () => {
  const feeTypes: FeeType[] = feeList;
  //administration/static-data/fee-types/new-fee-type
  const location = useLocation();
  const navigate = useNavigate();
  const from =
    location.state?.from ||
    "/administration/static-data/fee-types/new-fee-type";

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
                <Link to="#">Static Data</Link>
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
              <FaPlus className="mr-1 text-white" />  Add
            </Button>
          </div>
        </div>
        <div>{feeTypes && <DataTable columns={columns} data={feeTypes} />}</div>
      </div>
    </div>
  );
};

export default FeeTypes;
