import { FC } from "react";
import { Link } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", amount: 150 },
  { name: "Feb", amount: 120 },
  { name: "Mar", amount: 160 },
  { name: "Apr", amount: 180 },
  { name: "May", amount: 200 },
  { name: "Jun", amount: 250 },
  { name: "Jul", amount: 220 },
  { name: "Aug", amount: 240 },
  { name: "Sep", amount: 270 },
  { name: "Oct", amount: 300 },
  { name: "Nov", amount: 280 },
  { name: "Dec", amount: 320 },
];

interface CustomerSummaryProps {}

const CustomerSummary: FC<CustomerSummaryProps> = () => {
  return (
    <div className="mx-4 ">
      <div className="py-4">
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
            <li className="m-0">
              <Link
                to="/administration/branch-details"
                className="text-gray-500"
                aria-current="page"
              >
                Customer Summary
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="flex justify-between gap-8 my-4">
        <div className="w-[80%] flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-semibold">Accounts</h3>
          </div>
          <div className="flex border shadow-lg">
            <div className="flex flex-col w-1/3 gap-0 p-4 border-r">
              <h2 className="mb-0 responsive-h3">234 456733 09877 900</h2>
              <p className="" style={{margin: "0"}}>Current Account</p>
            </div>
            <div className="flex flex-col w-1/3 gap-0 p-4 border-r">
              <h2 className="mb-0 responsive-h3">KES 1,743.66</h2>
              <p className="" style={{margin: "0"}}>Available</p>
            </div>
            <div className="flex flex-col w-1/3 gap-0 p-4">
              <h2 className="mb-0 responsive-h3">1,743</h2>
              <p className="" style={{margin: "0"}}>Transactions</p>
            </div>
          </div>
          <div className="flex border shadow-lg">
            <div className="flex flex-col w-1/3 gap-0 p-4 border-r">
              <h2 className="mb-0 responsive-h3">234 456733 09877 900</h2>
              <p className="" style={{margin: "0"}}>Current Account</p>
            </div>
            <div className="flex flex-col w-1/3 gap-0 p-4 border-r">
              <h2 className="mb-0 responsive-h3">KES 1,743.66</h2>
              <p className="" style={{margin: "0"}}>Available</p>
            </div>
            <div className="flex flex-col w-1/3 gap-0 p-4">
              <h2 className="mb-0 responsive-h3">1,743</h2>
              <p className="" style={{margin: "0"}}>Transactions</p>
            </div>
          </div>
          <div className="flex border shadow-lg">
            <div className="flex flex-col w-1/3 gap-0 p-4 border-r">
              <h2 className="mb-0 responsive-h3">234 456733 09877 900</h2>
              <p className="" style={{margin: "0"}}>Current Account</p>
            </div>
            <div className="flex flex-col w-1/3 gap-0 p-4 border-r">
              <h2 className="mb-0 responsive-h3">KES 1,743.66</h2>
              <p className="" style={{margin: "0"}}>Available</p>
            </div>
            <div className="flex flex-col w-1/3 gap-0 p-4">
              <h2 className="mb-0 responsive-h3">1,743</h2>
              <p className="" style={{margin: "0"}}>Transactions</p>
            </div>
          </div>
          <div className="flex border shadow-lg">
            <div className="flex flex-col w-1/3 gap-0 p-4 border-r">
              <h2 className="mb-0 responsive-h3">234 456733 09877 900</h2>
              <p className="" style={{margin: "0"}}>Current Account</p>
            </div>
            <div className="flex flex-col w-1/3 gap-0 p-4 border-r">
              <h2 className="mb-0 responsive-h3">KES 1,743.66</h2>
              <p className="" style={{margin: "0"}}>Available</p>
            </div>
            <div className="flex flex-col w-1/3 gap-0 p-4">
              <h2 className="mb-0 responsive-h3">1,743</h2>
              <p className="" style={{margin: "0"}}>Transactions</p>
            </div>
          </div>
          
        </div>
        <div className="flex flex-col w-[20%] max-w-[20%] bg-white border rounded-lg shadow dark:bg-gray-800 h-full">
          <div className="flex justify-center py-6 border">
            <dl className="text-center">
              <dt className="mb-2 text-3xl text-black dark:text-gray-400">
                Customer Name
              </dt>
              <dd className="mb-2 text-base leading-none text-gray-900 dark:text-white">
                Nairobi county - Kenya
              </dd>
              <dd className="leading-none text-blue-600 underline text-blue text-underline underline-offset-8 hover:text-blue-700 dark:hover:text-blue-500">
                Edit Customer
              </dd>
            </dl>
          </div>

          <div className="flex justify-center border">
            <dl className="flex flex-col justify-center w-full p-4 text-center border-r">
              <dt className="text-xl font-bold leading-none">5,600</dt>
              <dd className="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">
                Transactions
              </dd>
            </dl>
            <dl className="flex flex-col justify-center w-full p-4 text-center">
              <dt className="text-xl font-bold leading-none">+KES1,800,000</dt>
              <dd className="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">
                Amount
              </dd>
            </dl>
          </div>
          <div className="py-4 text-sm font-extrabold text-left text-black border dark:text-gray-400">
            <div className="pl-8">
              <h4>Transaction Volumes</h4>
              <h2>
                00 <span>00%</span>
              </h2>
            </div>
            <div className="w-full mt-2">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart width={280} height={280} data={data}>
                  <CartesianGrid strokeDasharray="1" />
                  <XAxis hide={true} />
                  <YAxis hide={true} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="black"
                    dot={{ stroke: "black" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSummary;
