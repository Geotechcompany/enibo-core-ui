import { FC } from "react";
import { Link } from "react-router-dom";

interface AdministrationProps {}

const Administration: FC<AdministrationProps> = () => {
  return (
    <div>
      <div className="mx-4">
        <div className="pt-2">
          <nav className="text-sm text-blue-500" aria-label="Breadcrumb">
            <ol className="inline-flex p-0 m-0 list-none">
              <li className="flex items-center m-0">
                <Link to="#">Dashboard</Link>
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
                  Administration
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="my-4">
          <h1 className="text-4xl text-[#36459C]">Administration</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col px-4 pt-2 border border-l-8 rounded-sm shadow-md border-l-red-500">
            <div className="border-[#36459C] border-b-2 my-2">
              <h3 className="text-base uppercase">Branch Management</h3>
            </div>
            <div className="flex flex-col gap-1">
            <Link to="/administration/branches/branch-types" className="py-1 hover:bg-gray-300">Branch Types</Link>
              <Link to="/administration/branches" className="py-1 hover:bg-gray-300">Manage Branches</Link>
              <Link to="/administration/branch-details" className="py-1 hover:bg-gray-300">Branch Details</Link>
            </div>
          </div>
          <div className="flex flex-col px-4 pt-2 border border-l-8 rounded-sm shadow-md border-l-red-500">
            <div className="border-[#36459C] border-b-2 my-2">
              <h3 className="text-base uppercase">Product Management</h3>
            </div>
            <div className="flex flex-col gap-1 my-2">
              <Link to="/administration/products/product-types" className="py-1 hover:bg-gray-300">Product Types</Link>
              <Link to="/administration/products" className="py-1 hover:bg-gray-300">Manage Products</Link>
            </div>
          </div>
          <div className="flex flex-col px-4 py-2 border border-l-8 rounded-sm shadow-md border-l-red-500">
            <div className="border-[#36459C] border-b-2 my-2">
              <h3 className="text-base uppercase">Customer Management</h3>
            </div>
            <div className="flex flex-col gap-1 my-2">
              <Link to="/customers" className="py-1 hover:bg-gray-300">Manage Customers</Link>
            </div>
          </div>
          <div className="flex flex-col px-4 py-2 border border-l-8 rounded-sm shadow-md border-l-red-500">
            <div className="border-[#36459C] border-b-2 my-2">
              <h3 className="text-base uppercase">Static Data</h3>
            </div>
            <div className="flex flex-col gap-1 my-2">
              <Link to="/administration/branch-types" className="py-1 hover:bg-gray-300">Countries</Link>
              <Link to="/administration/branch-types" className="py-1 hover:bg-gray-300">Currencies</Link>
              <Link to="/administration/static-data/fee-types" className="py-1 hover:bg-gray-300">Fee Types</Link>
              <Link to="/administration/static-data/transaction-types" className="py-1 hover:bg-gray-300">Transaction Types</Link>
              <Link to="/administration/branches" className="py-1 hover:bg-gray-300">Business Calendars</Link>
            </div>
          </div>
          <div className="flex flex-col px-4 py-2 border border-l-8 rounded-sm shadow-md border-l-red-500">
            <div className="border-[#36459C] border-b-2 my-2">
              <h3 className="text-base uppercase">Ledger Management</h3>
            </div>
            <div className="flex flex-col gap-1 my-2">
              <Link to="/administration/ledger-management/ledger-account-categories" className="py-1 hover:bg-gray-300">
                Ledger Account Categories
              </Link>
              <Link to="/administration/ledger-management/ledger-accounts" className="py-1 hover:bg-gray-300">Ledger Accounts</Link>
              <Link to="/administration/ledger-management/ledger-rules" className="py-1 hover:bg-gray-300">Ledger Rules</Link>
            </div>
          </div>
          <div className="flex flex-col px-4 py-2 border border-l-8 rounded-sm shadow-md border-l-red-500">
            <div className="border-[#36459C] border-b-2 my-2">
              <h3 className="text-base uppercase">User Management</h3>
            </div>
            <div className="flex flex-col gap-1 my-2">
              <Link to="/administration/user-details" className="py-1 hover:bg-gray-300">Manage Users</Link>
              <Link to="/administration/branch-types" className="py-1 hover:bg-gray-300">User Profiles</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administration;
