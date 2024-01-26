import { Link } from "react-router-dom";
import DemoTable from "./DetailsTable";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: 'Jan', amount: 150 },
  { name: 'Feb', amount: 120 },
  { name: 'Mar', amount: 160 },
  { name: 'Apr', amount: 180 },
  { name: 'May', amount: 200 },
  { name: 'Jun', amount: 250 },
  { name: 'Jul', amount: 220 },
  { name: 'Aug', amount: 240 },
  { name: 'Sep', amount: 270 },
  { name: 'Oct', amount: 300 },
  { name: 'Nov', amount: 280 },
  { name: 'Dec', amount: 320 },
];

const BranchDetailsPage = () => {

  return (
    <><div className="p-4">
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
            <Link to="/administration/branch-details" className="text-gray-500" aria-current="page">
              Branch Details
            </Link>
          </li>
        </ol>
      </nav>
    </div><div className="flex">
        <div className="mt-8">
          <div className="max-w-full w-full bg-white rounded-lg shadow dark:bg-gray-800 ml-8">
            <div className="flex justify-center py-3">
              <dl>
                <dt className=" text-3xl text-black dark:text-gray-400 pb-1">Branch Name</dt>
                <dd className="leading-none text-base text-gray-900 dark:text-white ml-2">Nyeri county - Kenya</dd>
                <dd className="leading-none text-blue text-underline mt-3 underline underline-offset-8 text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 ml-8">Edit Branch</dd>
              </dl>
            </div>


            <div className="flex justify-center py-3">
              <dl className="border-r pr-4 mr-4">
                <dt className="leading-none text-xl font-bold">5,600</dt>
                <dd className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Transactions</dd>
              </dl>
              <dl>
                <dt className="leading-none text-xl font-bold">+KES1,800,000</dt>
                <dd className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Amount</dd>
              </dl>
            </div>
            <div className="text-sm font-extrabold text-black dark:text-gray-400 mb-1 ml-8">Transaction Amount</div>
            <div className="mt-6">
              <LineChart width={250} height={250} data={data}>
                <CartesianGrid strokeDasharray="1" />
                <XAxis />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="black" dot={{ stroke: 'black' }} />
              </LineChart>
            </div>
          </div>
        </div>


        <div className="max-w-full max-h-96 bg-white  ml-20 flex-1 mt-8 mr-8">
        <div className="grid gap-6 mb-8 md:grid-cols-2">
  <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg">
    <div className="p-4 flex items-center justify-between">
      <div>
        <p className="text-base font-medium dark:text-gray-400">
        Total Active Customer Accounts
        </p>
        <p className="text-2xl font-semibold dark:text-gray-200">
          6389
        </p>
      </div>
      <div className="flex items-center">
      
        <div className="p-3 rounded text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
        <i className="ri-donut-chart-fill" aria-setsize={100}></i>

        </div>
      </div>
    </div>
  </div>
  <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg">
    <div className="p-4 flex items-center justify-between">
      <div>
        <p className=" text-base font-medium dark:text-gray-400">
        Average Deposits Balance
        </p>
        <p className="text-2xl font-semibold dark:text-gray-200">
        Ksh. 23,765.98
        </p>
      </div>
      <div className="flex items-center">
        <div className="p-3 rounded text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
        <i className="ri-line-chart-fill"></i>
        </div>
      </div>
    </div>
  </div>
</div>

        
          <div className=" text-2xl text-black dark:text-gray-400 pb-4">Branch Accounts</div>
          <DemoTable />
        </div>
      </div></>

 
  );
};

export default BranchDetailsPage;

