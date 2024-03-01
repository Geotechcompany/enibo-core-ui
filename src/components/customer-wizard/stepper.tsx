import { CheckCircledIcon, ValueIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { useLocation } from "react-router-dom";

interface StepperProps {}

const Stepper: FC<StepperProps> = () => {
  const location = useLocation();
  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-blue-600"
      : "text-gray-400 disabled:cursor-not-allowed";
  };
  return (
    <>
      <nav className="flex items-center w-full border rounded-sm">
        <div className="flex flex-col w-full">
          <div className="px-4 py-1 m-0 font-light text-center border-b">
            <h3>New Customer</h3>
          </div>
          <div className="w-full">
            <ul className="flex flex-col items-start w-full m-0">
              <li className={`flex px-4 py-1 m-0 text-left border-l-2 w-full ${location.pathname === "/customers/customer-wizard" ? "bg-[#F6F6F6]": ""}`}>
                <a
                  href="/customers/customer-wizard"
                  className={`flex gap-2 justify-center items-center text-base ${getLinkClass("/customers/customer-wizard")}`}
                >
                  {location.pathname === "/customers/customer-wizard" ? <CheckCircledIcon /> : <ValueIcon />}
                  Customer KYC
                </a>
              </li>
              <li className={`flex px-4 py-1 m-0 text-left border-l-2 w-full ${location.pathname === "/customers/customer-wizard/products" ? "bg-[#F6F6F6]": ""}`}>
                <a
                  href="/customers/customer-wizard/products"
                  className={`flex gap-2 justify-center items-center text-base ${getLinkClass("/customers/customer-wizard/products")}`}
                >
                  {location.pathname === "/customers/customer-wizard/products" ? <CheckCircledIcon /> : <ValueIcon />}
                  Products
                </a>
              </li>
              <li className={`flex px-4 py-1 m-0 text-left border-l-2 w-full ${location.pathname === "/customers/customer-wizard/mandates" ? "bg-[#F6F6F6]": ""}`}>
                <a
                  href="/customers/customer-wizard/mandates"
                  className={`flex gap-2 justify-center items-center text-base ${getLinkClass("/customers/customer-wizard/mandates")}`}
                >
                  {location.pathname === "/customers/customer-wizard/mandates" ? <CheckCircledIcon /> : <ValueIcon />}
                  Mandates
                </a>
              </li>
              <li className={`flex px-4 py-1 m-0 text-left border-l-2 w-full ${location.pathname === "/customers/customer-wizard/mandate-rules" ? "bg-[#F6F6F6]": ""}`}>
                <a
                  href="/customers/customer-wizard/mandate-rules"
                  className={`flex gap-2 justify-center items-center text-base ${getLinkClass("/customers/customer-wizard/mandate-rules")}`}
                >
                  {location.pathname === "/customers/customer-wizard/mandate-rules" ? <CheckCircledIcon /> : <ValueIcon />}
                  Mandate Rules
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Stepper;
