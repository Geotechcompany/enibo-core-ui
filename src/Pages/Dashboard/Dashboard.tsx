import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";
import ExampleTable from "../Branches/DetailsTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

export const branchDummyData = {
  name: "Sample Branch",
  activeCustomers: 500,
  transactionVolume: {
    labels: [
      "2024-01-01",
      "2024-01-02",
      "2024-01-03",
      "2024-01-04",
      "2024-01-05",
      "2024-01-06",
      "2024-01-07",
    ],
    values: [1000, 1200, 900, 1100, 1300, 950, 1050],
  },
  totalBalancesByRisk: {
    High: 20000,
    Medium: 15000,
    Low: 30000,
  },
  activeAccountsByProductType: {
    Savings: 200,
    Current: 150,
    Loan: 100,
  },
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [selectedRiskRating, setSelectedRiskRating] = useState<string>("High");

  const handleRiskRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRiskRating(e.target.value);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1 max-w-full mt-4 ml-10 mr-8 bg-white max-h-96">
          <div className="flex justify-between p-2">
            <dl className="justify-start ">
              <dt className="pb-1 text-4xl text-black dark:text-gray-400">
                 Nairobi Branch
              </dt>
              {/* <dd className="ml-2 text-lg leading-none text-blue-900 dark:text-white">
                Nairobi Branch - Kenya
              </dd> */}
            </dl>
            <div className="flex items-center justify-end gap-4">
              <Button>
                <Link to="/new-transfer">New Transfer</Link>
              </Button>
              <input
                type="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={(e) => handleDateChange(new Date(e.target.value))}
                className="p-1 border border-gray-400 rounded-md"
              />
            </div>
          </div>

          <div className="flex items-stretch justify-center gap-6 mb-8">
            <div className="ml-20 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="flex items-center justify-between p-4 md:w-72">
                <div>
                  <p className="text-base font-medium dark:text-gray-400">
                    Total Transactions
                  </p>
                  <p className="text-2xl font-semibold dark:text-gray-200">
                    5,600
                  </p>
                </div>
                <div className="flex items-center pl-5">
                  <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded dark:text-orange-100 dark:bg-orange-500">
                    <i className="ri-donut-chart-fill" aria-setsize={100}></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="flex items-center justify-between p-4 md:w-72">
                <div>
                  <p className="text-base font-medium dark:text-gray-400">
                    Total Amount
                  </p>
                  <p className="text-2xl font-semibold dark:text-gray-200">
                    KES100,800,000
                  </p>
                </div>
                <div className="flex items-center ml-5">
                  <div className="p-3 mr-4 text-green-500 bg-green-100 rounded dark:text-green-100 dark:bg-green-500">
                    <i className="ri-line-chart-fill"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="flex items-center justify-between p-4 mr-">
                <div>
                  <p className="text-base font-medium dark:text-gray-400">
                    Total Active Customer Accounts
                  </p>
                  <p className="text-2xl font-semibold dark:text-gray-200">
                    6389
                  </p>
                </div>
                <div className="flex items-center ml-5">
                  <div className="p-3 pl-5 mr-4 text-orange-500 bg-orange-100 rounded dark:text-orange-100 dark:bg-orange-500">
                    <i className="ri-donut-chart-fill" aria-setsize={100}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid flex-1 gap-8 mb-8">
            <div className="flex justify-start mt-8">
              <div className="mr-20 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="p-4">
                  <h2 className="mb-2 text-xl font-semibold">
                    Total Active Accounts By Product Type
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div style={{ width: 600, height: 250 }}>
                      <ResponsiveContainer>
                        <BarChart
                          layout="vertical"
                          data={[
                            {
                              name: "Savings",
                              value:
                                branchDummyData.activeAccountsByProductType
                                  .Savings,
                            },
                            {
                              name: "Loan",
                              value:
                                branchDummyData.activeAccountsByProductType
                                  .Loan,
                            },
                            {
                              name: "Current",
                              value:
                                branchDummyData.activeAccountsByProductType
                                  .Current,
                            },
                          ]}
                        >
                          <XAxis hide axisLine={true} type="number" />
                          <YAxis
                            yAxisId={0}
                            dataKey={"name"}
                            type="category"
                            axisLine={true}
                            tickLine={false}
                          />
                          <YAxis
                            orientation="right"
                            yAxisId={1}
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => value.toLocaleString()}
                            mirror
                            // tick={{
                            //   transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`
                            // }}
                          />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#4d577c" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-baseline justify-end">
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="p-4">
                  <h2 className="mb-2 text-xl font-semibold">
                    Total Balances By Risk Rating
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <PieChart width={500} height={250}>
                        <Pie
                          dataKey="value"
                          data={[
                            {
                              name: "High",
                              value: branchDummyData.totalBalancesByRisk.High,
                            },
                            {
                              name: "Medium",
                              value: branchDummyData.totalBalancesByRisk.Medium,
                            },
                            {
                              name: "Low",
                              value: branchDummyData.totalBalancesByRisk.Low,
                            },
                          ]}
                          cx={150}
                          cy={120}
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          label
                          animationBegin={0}
                          animationDuration={1000}
                        >
                          {data.map((_entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Legend />
                      </PieChart>
                    </div>
                    <div className="relative">
                      <div className="absolute pr-2 -top-10 -right-3">
                        <select
                          value={selectedRiskRating}
                          onChange={handleRiskRatingChange}
                          className="p-2 border rounded-md"
                        >
                          {Object.keys(branchDummyData.totalBalancesByRisk).map(
                            (rating) => (
                              <option key={rating} value={rating}>
                                {rating}
                              </option>
                            )
                          )}
                        </select>
                        <p className="ml-4 font-semibold">
                          Balance: {"$20000"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="p-4">
              <h2 className="mb-4 text-xl font-semibold">
                Total Balances By Risk Rating
              </h2>
              <BarChart
                data={Object.entries(branchDummyData.totalBalancesByRisk)}
                width={500}
                height={250}
              >
                <XAxis
                  dataKey="0"
                  label={{
                    value: "Risking Rate",
                    position: "insideBottom",
                    offset: -10,
                  }}
                />
                <YAxis
                  label={{
                    value: "Total Balance",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="1">
                  {Object.entries(branchDummyData.totalBalancesByRisk).map(
                    (_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Bar>
              </BarChart>
            </div>
          </div> */}
          <div className="pb-4 text-2xl text-black dark:text-gray-400">
            Recent Live Transactions
          </div>
          <ExampleTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
