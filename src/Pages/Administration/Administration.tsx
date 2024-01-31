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
              title="Approval Management"
              urlItems={[
                {
                  name: "Approvals",
                  url: "/administration/approvals",
                },      
                {
                  name: "Approval Rules",
                  url: "",
                },
              ]}
            />
          </div>
          <div className="flex flex-col">
            <AdminNavigationCard
              title="Static Data"
              urlItems={[
                { name: "Countries", url: "/administration/countries-list" },
                { name: "Currencies", url: "/administration/currencies-list" },
                { name: "Fee Types", url: "/administration/static-data/fee-types" },
                {
                  name: "Transaction Types",
                  url: "/administration/static-data/transaction-types",
                },
                {
                  name: "Business Calendars",
                  url: "/administration/static-data/calendar-list",
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
                { name: "Users", url: "/administration/user-details"},
                { name: "User Profiles", url: "/administration/user-management/profile-list" },
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
            <AdminNavigationCard
              title="App Settings"
              urlItems={[
                { name: "App Settings list", url: "/app-settings" },

              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administration;
