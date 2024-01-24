import React, { ReactNode } from 'react';

interface TableHeadProps {
  children?: ReactNode;
  className?: string;
}

interface Record {
  invoiceNumber: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  pendingBalance: number;
  availableBalance: number;
}

const TableHead: React.FC<TableHeadProps> = ({ children, className }) => (
  <th scope="col" className={`px-6 py-3 ${className}`}>
    {children}
  </th>
);

const ExampleTable: React.FC = () => {
    const records: Record[] = [
        {
          invoiceNumber: '#12345',
          paymentStatus: 'Paid',
          paymentMethod: 'Credit Card',
          totalAmount: 500.00,
          pendingBalance: 0.00,
          availableBalance: 500.00,
        },
        {
          invoiceNumber: '#12346',
          paymentStatus: 'Pending',
          paymentMethod: 'PayPal',
          totalAmount: 300.00,
          pendingBalance: 50.00,
          availableBalance: 250.00,
        },
        {
          invoiceNumber: '#12347',
          paymentStatus: 'Paid',
          paymentMethod: 'Stripe',
          totalAmount: 700.00,
          pendingBalance: 0.00,
          availableBalance: 700.00,
        },
        {
          invoiceNumber: '#12348',
          paymentStatus: 'Pending',
          paymentMethod: 'Bank Transfer',
          totalAmount: 450.00,
          pendingBalance: 75.00,
          availableBalance: 375.00,
        },
        {
          invoiceNumber: '#12349',
          paymentStatus: 'Paid',
          paymentMethod: 'Cash',
          totalAmount: 600.00,
          pendingBalance: 0.00,
          availableBalance: 600.00,
        },
        {
          invoiceNumber: '#12350',
          paymentStatus: 'Pending',
          paymentMethod: 'Credit Card',
          totalAmount: 350.00,
          pendingBalance: 25.00,
          availableBalance: 325.00,
        },
        {
          invoiceNumber: '#12351',
          paymentStatus: 'Paid',
          paymentMethod: 'PayPal',
          totalAmount: 800.00,
          pendingBalance: 0.00,
          availableBalance: 800.00,
        },
        

        // Add more records as needed
        // ...
      ];

  const totalAmount = records.reduce((total, record) => total + record.totalAmount, 0);

  return (
    <div className="relative overflow-x-auto overflow-y-auto max-h-96 shadow-md sm:rounded-lg">
      <div className="sticky top-0 bg-white z-10">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <TableHead className="w-[100px]">Invoice Number</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Posted Balance</TableHead>
              <TableHead className="text-right">Pending Balance</TableHead>
              <TableHead className="text-right">Available Balance</TableHead>
            </tr>
          </thead>
        </table>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {record.invoiceNumber}
              </td>
              <td className="px-6 py-4">
                {record.paymentStatus}
              </td>
              <td className="px-6 py-4">
                {record.paymentMethod}
              </td>
              <td className="px-6 py-4">
                {`$${record.totalAmount.toFixed(2)}`}
              </td>
              <td className="px-6 py-4">
                {`$${record.pendingBalance.toFixed(2)}`}
              </td>
              <td className="px-6 py-4">
                {`$${record.availableBalance.toFixed(2)}`}
              </td>
            </tr>
          ))}

          {/* Total Amount Row */}
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sticky bottom-0 bg-white z-10">
              Total
            </td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4 text-right">
              {`$${totalAmount.toFixed(2)}`}
            </td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExampleTable;