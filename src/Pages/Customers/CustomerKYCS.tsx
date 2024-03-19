import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { queryIndividualKYCs } from "@/components/individual-kyc/query";
import { useQuery } from "@apollo/client";
import { columns as individualColumns } from "@/components/individual-kyc/columns";
import { columns as businessColumns } from "@/components/business-kyc/columns";
import { KYCBusiness, KYCIndividual } from "@/types/global";
import { DataTable } from "@/components/datatable/data-table";
import { Row } from "@tanstack/react-table";
import { queryBusinessKYCs } from "@/types/queries";

interface CustomerKYCSProps {}

const CustomerKYCS: FC<CustomerKYCSProps> = () => {
  const [individualKycs, setIndividualKycs] = useState<KYCIndividual[]>([]);
  const [businessKycs, setBusinessKycs] = useState<KYCBusiness[]>([]);
  const navigate = useNavigate();
  const [tab, setTab] = useState<number>(0);

  const { data: individualData } = useQuery(queryIndividualKYCs);
  const { data: businessData } = useQuery(queryBusinessKYCs);

  useEffect(() => {
    if (individualData && businessData) {
      setIndividualKycs(individualData.individualKYCs);
      setBusinessKycs(businessData.businessKYCs);
    }
  }, [individualData, businessData]);

  //void handle delete handle copy and handle edit
  const handleIndividualEdit = (selectedRows: Row<KYCIndividual>[]) => {
    navigate(`/customers/kyc-types/individual-form/${selectedRows[0].original.IndividualKYCId}`);
  };

  const handleIndividualDelete = (selectedRows: Row<KYCIndividual>[]) => {
    console.log("Delete", selectedRows);
  };

  const handleIndividualCopy = (selectedRows: Row<KYCIndividual>[]) => {
    localStorage.setItem("individualKyc", JSON.stringify(selectedRows[0].original));
    navigate("/customers/kyc-types/individual-form");
  };

  const handleBusinessEdit = (selectedRows: Row<KYCBusiness>[]) => {
    navigate(`/customers/kyc-types/business-form/${selectedRows[0].original.businessKYCId}`);
  };

  const handleBusinessDelete = (selectedRows: Row<KYCBusiness>[]) => {
    console.log("Delete", selectedRows);
  };

  const handleBusinessCopy = (selectedRows: Row<KYCBusiness>[]) => {
    localStorage.setItem("businessKyc", JSON.stringify(selectedRows[0].original));
    navigate("/customers/kyc-types/business-form");
  };

  return (
    <>
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
                  <Link to="#">Customer Management</Link>
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
                    Customer KYC
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex my-4">
            <Button
              type="button"
              onClick={() => setTab(0)}
              variant="ghost"
              className={`rounded-none border-b ${
                tab === 0 ? " border-blue-500 bg-accent" : ""
              }`}
            >
              Individual KYC
            </Button>
            <Button
              type="button"
              onClick={() => setTab(1)}
              variant="ghost"
              className={`rounded-none border-b ${
                tab === 1 ? " border-blue-500 bg-accent" : ""
              }`}
            >
              Business KYC
            </Button>
          </div>
          {tab === 0 && (
            <div className="flex items-center justify-between my-2">
              <div className="">
                <h1 className="text-4xl text-[#36459C]">Individual KYC</h1>
              </div>
              <div className="">
                <Button
                  size="sm"
                  className="bg-[#36459C] text-white py-5 px-8"
                  onClick={() => navigate("/customers/kyc-types/individual-form")}
                >
                  <FaPlus className="mr-1 text-white" /> Add
                </Button>
              </div>
            </div>
          )}
          {tab === 1 && (
            <div className="flex items-center justify-between my-2">
              <div className="">
                <h1 className="text-4xl text-[#36459C]">Business KYC</h1>
              </div>
              <div className="">
                <Button
                  size="sm"
                  className="bg-[#36459C] text-white py-5 px-8"
                  onClick={() => navigate("/customers/kyc-types/business-form")}
                >
                  <FaPlus className="mr-1 text-white" /> Add
                </Button>
              </div>
            </div>
          )}
          <div>
            {tab === 0 && (
              <DataTable
                columns={individualColumns}
                data={individualKycs}
                handleEdit={handleIndividualEdit}
                handleDelete={handleIndividualDelete}
                handleCopy={handleIndividualCopy}
              />
            )}
            {tab === 1 && (
              <DataTable
                columns={businessColumns}
                data={businessKycs}
                handleEdit={handleBusinessEdit}
                handleDelete={handleBusinessDelete}
                handleCopy={handleBusinessCopy}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerKYCS;
