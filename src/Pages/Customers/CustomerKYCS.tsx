import { FC, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";
import queryKycTypesList from "@/components/kyc-type-list/query";
import { useQuery } from "@apollo/client";
import { columns } from "@/components/kyc-type-list/columns";
import { KYCType } from "@/types/global";
import { DataTable } from "@/components/datatable/data-table";
import { Row } from "@tanstack/react-table";

interface CustomerKYCSProps {}

const CustomerKYCS: FC<CustomerKYCSProps> = () => {
  const [kycsTypes, setKycsTypes] = useState<KYCType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [kycType, setKycType] = useState(""); // State to track the selected KYC type

  const handleSubmission = () => {
    if (kycType === "business") {
      window.location.href = "/customers/kyc-types/business-form";
    } else if (kycType === "individual") {
      window.location.href = "/customers/kyc-types/individual-form";
    }
  };

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(queryKycTypesList);

  useEffect(() => {
    if (data) {
      setKycsTypes(data.kycTypes);
    }
    setLoading(queryLoading);
    setError(queryError ? queryError.message : null);
  }, [data, queryLoading, queryError]);

  //void handle delete handle copy and handle edit
  const handleEdit = (selectedRows: Row<KYCType>[]) => {
    console.log("Edit", selectedRows);
  };

  const handleDelete = (selectedRows: Row<KYCType>[]) => {
    console.log("Delete", selectedRows);
  };

  const handleCopy = (selectedRows: Row<KYCType>[]) => {
    console.log("Copy", selectedRows);
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
          <div className="flex items-center justify-between my-4">
            <div className="">
              <h1 className="text-4xl text-[#36459C]">KYC</h1>
            </div>
            <div className="">
              <Button
                size="sm"
                className="bg-[#36459C] text-white py-5 px-8"
                onClick={openModal}
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
                data={kycsTypes}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleCopy={handleCopy}
              />
            )}
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div></div>
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex items-center justify-between my-4 border-b">
                      <h1 className="text-4xl text-[#36459C] mb-2">KYC Type</h1>
                      <IoCloseOutline onClick={closeModal} />
                    </div>
                    <div>
                      <div>
                        <label
                          htmlFor="kycType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          KYC Type:
                        </label>
                        <select
                          id="kycType"
                          name="kycType"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#36459C]"
                          onChange={(e) => setKycType(e.target.value)}
                          value={kycType}
                        >
                          <option value="">Select</option>
                          <option value="business">Business</option>
                          <option value="individual">Individual</option>
                        </select>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <Button
                          type="submit"
                          size="lg"
                          className="bg-[#36459C] hover:bg-[#253285]"
                          onClick={handleSubmission}
                        >
                          Submit
                        </Button>
                        <Button size="lg" onClick={closeModal}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Dialog.Title>
                  <section className="px-4 mt-4"></section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CustomerKYCS;
