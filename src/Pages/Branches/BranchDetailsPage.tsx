import { Link } from "react-router-dom";
import DemoTable from "./DetailsTable";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
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

const BranchDetailsPage = () => {
  return (
    <>
      <div className="p-4">
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
                Branch Details
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="flex">
        <div className="mt-8">
          <div className="w-full max-w-full ml-8 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex justify-center py-3">
              <dl>
                <dt className="pb-1 text-3xl text-black  dark:text-gray-400">
                  Branch Name
                </dt>
                <dd className="ml-2 text-base leading-none text-gray-900 dark:text-white">
                  Nyeri county - Kenya
                </dd>
                <dd className="mt-3 ml-8 leading-none text-blue-600 underline text-blue text-underline underline-offset-8 hover:text-blue-700 dark:hover:text-blue-500">
                  Edit Branch
                </dd>
              </dl>
            </div>

            <div className="flex justify-center py-3">
              <dl className="pr-4 mr-4 border-r">
                <dt className="text-xl font-bold leading-none">5,600</dt>
                <dd className="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  Transactions
                </dd>
              </dl>
              <dl>
                <dt className="text-xl font-bold leading-none">
                  +KES1,800,000
                </dt>
                <dd className="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  Amount
                </dd>
              </dl>
            </div>
            <div className="mb-1 ml-8 text-sm font-extrabold text-black dark:text-gray-400">
              Transaction Amount
            </div>
            <div className="mt-6">
              <LineChart width={250} height={250} data={data}>
                <CartesianGrid strokeDasharray="1" />
                <XAxis />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="black"
                  dot={{ stroke: "black" }}
                />
              </LineChart>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-full mt-8 ml-20 mr-8 bg-white max-h-96">
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-base font-medium dark:text-gray-400">
                    Total Active Customer Accounts
                  </p>
                  <p className="text-2xl font-semibold dark:text-gray-200">
                    6389
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded dark:text-orange-100 dark:bg-orange-500">
                    <i className="ri-donut-chart-fill" aria-setsize={100}></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-base font-medium  dark:text-gray-400">
                    Average Deposits Balance
                  </p>
                  <p className="text-2xl font-semibold dark:text-gray-200">
                    Ksh. 23,765.98
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="p-3 mr-4 text-green-500 bg-green-100 rounded dark:text-green-100 dark:bg-green-500">
                    <i className="ri-line-chart-fill"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-4 text-2xl text-black  dark:text-gray-400">
            Branch Accounts
          </div>
          <DemoTable />
        </div>
      </div>
    </>
  );
};

export default BranchDetailsPage;
