import { FC } from "react";
import { Link } from "react-router-dom";
import UserProfileForm from "@/components/user-profiles/user-profile-form";
import { Tab } from "@headlessui/react";
import ManageInput from "@/components/manage-user-profiles/permission-profile-list";

interface NewProfileProps {}

const NewProfile: FC<NewProfileProps> = () => {
  return (
    <section className="px-4">
      <div className="pt-2">
        <nav className="text-sm text-blue-500" aria-label="Breadcrumb">
          <ol className="inline-flex p-0 m-0 list-none">
            <li className="flex items-center m-0">
              <Link to="/administration/user-management/profile-list">
                User
              </Link>
              <svg
                className="w-3 h-3 mx-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li className="flex items-center m-0">
              <Link to="#">User Management</Link>
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
                User Profile Details
              </Link>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="">
          <h1 className="text-4xl text-[#36459C]">User Profile Details</h1>
        </div>
      </div>
      <div>
        <Tab.Group defaultIndex={0}>
          <Tab.List className=" w-1/4 bg-gray-500 mb-8 mt-8">
            <Tab className="inline-block w-1/2 p-4 text-gray-900 bg-gray-100 border-r border-gray-200 active focus:bg-gray-500 dark:text-white">
              General Information
            </Tab>

            <Tab className="inline-block w-1/2 p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:bg-gray-500">
              Module Permissions
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <UserProfileForm />
            </Tab.Panel>

            <Tab.Panel>
              <ManageInput />
                 </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

export default NewProfile;
