import CountriesTable from "@/components/countries/countries-table";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { FaPlus } from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";

interface CountriesProps {}

const CountriesList: FC<CountriesProps> = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || { pathname: "/administration/countries-list/countries-details-form" };
  
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
                  Country List
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center justify-between my-4" >
          <div className=""><h1 className="text-4xl text-[#36459C]">Country List</h1></div>
          <div className="">
          <Button
            size="sm"           
            className="bg-[#36459C] text-white py-5 px-8"
            onClick={() => navigate(from, { replace: true })}
            disabled
          >
            <FaPlus className="mr-1 text-white" /> New Country
          </Button></div>
        </div>
        <div>
        <CountriesTable />
        </div>
      </div>
    </div>
  );
};

export default CountriesList;
