import AdminNavigationCard from "@/components/admin-navigation-card";
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col">
            <AdminNavigationCard
              title="Branch Management"
              urlItems={[
                {
                  name: "Branch Types",
                  url: "/administration/branches/branch-types",
                },
                { name: "Manage Branches", url: "/administration/branches" },
                {
                  name: "Branch Details",
                  url: "/administration/branch-details",
                },
              ]}
            />
            <AdminNavigationCard
              title="Product Management"
              urlItems={[
                {
                  name: "Product Types",
                  url: "/administration/products/product-types",
                },
              ]}
            />
            <AdminNavigationCard
              title="Customer Management"
              urlItems={[
                { name: "Customers", url: "/customers" },
                { name: "KYC Types", url: "/customers/kyc-types" },
                { name: "KYCs", url: "/customers/customer-kycs" },
                {
                  name: "Account Mandate Types",
                  url: "/customers/account-mandate-types",
                },
              ]}
            />
          </div>
          <div className="flex flex-col">
            <AdminNavigationCard
              title="Static Data"
              urlItems={[
                { name: "Countries", url: "/administration/countries" },
                { name: "Currencies", url: "/administration/currencies" },
                { name: "Fee Types", url: "/administration/fee-types" },
                {
                  name: "Transaction Types",
                  url: "/administration/transaction-types",
                },
                {
                  name: "Business Calendars",
                  url: "/administration/business-calendars",
                },
              ]}
            />
            <AdminNavigationCard
              title="Ledger Management"
              urlItems={[
                {
                  name: "Ledger Account Categories",
                  url: "/administration/ledger-account-categories",
                },
                {
                  name: "Ledger Accounts",
                  url: "/administration/ledger-accounts",
                },
                { name: "Ledger Rules", url: "/administration/ledger-rules" },
              ]}
            />
          </div>
          <div className="flex flex-col">
            <AdminNavigationCard
              title="User Management"
              urlItems={[
                { name: "Manage Users", url: "/administration/users" },
                { name: "User Profiles", url: "/administration/user-profiles" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administration;
