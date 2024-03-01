import { ChangeEvent, FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import KYCSelector from "./KYCSelector";
import NewKYC from "./NewKYC";
import { useAppState } from "@/store/state";
import NewBKYC from "./NewBKYC";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ValueIcon } from "@radix-ui/react-icons";

interface CustomerKYCProps {}

const CustomerKYC: FC<CustomerKYCProps> = () => {
  const { state, setState } = useAppState();
  const individuals = state.individuals;
  const businesses = state.businesses;

  const [selectedRows, setSelectedRows] = useState<object[]>([]);
  const isAllRowsSelected = selectedRows.length === individuals?.length;

  const handleRowSelect = (row: object) => {
    if (selectedRows.includes(row)) {
      setSelectedRows(selectedRows.filter((r) => r !== row));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };
  const handleSelectAllRows = (event: ChangeEvent<HTMLInputElement>) => {
    const allIndividuals = individuals?.map((individual) => individual) || [];
    if (event.target.checked) {
      setSelectedRows(allIndividuals);
    } else {
      setSelectedRows([]);
    }
  };
  // const retail = {
  //   retailType: "individual",
  //   individualKYC: "individualKYC",
  //   productTypes: "productTypes",
  //   accountCurrency: "accountCurrency",
  //   riskRating: "riskRating",
  //   accountMandates: "accountMandates",
  //   modifiedBy: "modifiedBy",
  //   modifiedOn: "modifiedOn",
  // }
  // const business = {
  //   businessKYC: "businessKYC",
  //   directorsKYC: "directorsKYC",
  //   productTypes: "productTypes",
  //   accountCurrency: "accountCurrency",
  //   riskRating: "riskRating",
  //   accountMandates: "accountMandates",
  //   modifiedBy: "modifiedBy",
  //   modifiedOn: "modifiedOn",
  // }
  // const customer = {
  //   customerType: "individual",
  //   business: "business",
  //   retail: "retail",
  //   accountMandates: "accountMandates",
  // }
  const navigate = useNavigate();
  const saveData = (customer: string) => {
    setState({
      ...state,
      customerType: customer,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {state.customerType === "" && (
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <h3>
              Welcome to the New Customer section! <br />
              To get started, please choose the type of customer you are working
              with
            </h3>
            <div className="flex gap-4">
              <div
                className="flex flex-col items-center gap-2 p-4 text-center border rounded-md"
                onClick={() => saveData("retail")}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="52"
                    height="46"
                    fill="none"
                    viewBox="0 0 52 46"
                  >
                    <path
                      fill="#36459C"
                      d="M20.894 16.175c0 3.25 2.6 5.85 5.85 5.85 3.25 0 5.85-2.6 5.85-5.85 0-3.25-2.6-5.85-5.85-5.85-3.169-.081-5.85 2.6-5.85 5.85Zm8.531 0c0 1.462-1.219 2.6-2.6 2.6s-2.6-1.219-2.6-2.6 1.219-2.6 2.6-2.6 2.6 1.138 2.6 2.6Z"
                    />
                    <path
                      fill="#36459C"
                      d="M7.081 22.756c.407 0 .732-.162.975-.325l5.769-4.55c.731-.569.813-1.544.244-2.275-.569-.731-1.544-.812-2.275-.244L8.869 17.72C10.98 9.43 18.294 3.662 26.825 3.662c8.531 0 15.925 5.77 18.037 14.057.244.893 1.138 1.38 1.95 1.137.894-.244 1.382-1.137 1.138-1.95C45.512 7.156 36.737.331 26.744.331A21.732 21.732 0 0 0 5.7 16.581l-1.869-2.519c-.568-.73-1.543-.893-2.275-.325-.731.57-.893 1.544-.325 2.275l4.55 6.094c.244.325.65.569 1.057.65h.243ZM51.525 33.4l-3.169-6.906c-.162-.407-.487-.732-.975-.894-.406-.163-.894-.081-1.3.081l-6.581 3.25a1.628 1.628 0 0 0-.731 2.194 1.628 1.628 0 0 0 2.194.731l3.168-1.544a18.607 18.607 0 0 1-7.475 9.182v-7.638c0-4.144-3.087-7.556-6.906-7.556h-6.256c-3.819 0-6.907 3.412-6.907 7.637v7.313c-3.412-2.275-6.012-5.606-7.312-9.669-.244-.812-1.219-1.3-2.031-1.056-.813.244-1.3 1.219-1.056 2.031a21.66 21.66 0 0 0 20.637 14.95 21.767 21.767 0 0 0 20.313-13.894l1.38 3.088c.245.569.895.975 1.463.975.244 0 .488-.081.65-.163.894-.325 1.219-1.3.894-2.112Zm-31.688 7.556v-9.1c0-2.437 1.625-4.387 3.657-4.387h1.462v5.606a1.63 1.63 0 0 0 1.625 1.625 1.63 1.63 0 0 0 1.625-1.625v-5.606h1.544c2.031 0 3.656 1.95 3.656 4.306v9.262c-2.112.813-4.306 1.22-6.662 1.22a16.356 16.356 0 0 1-6.907-1.3Z"
                    />
                  </svg>
                </div>
                <h4>Retail</h4>
                <p>We'll need some personal information to complete the KYC</p>
                <div>
                  <ValueIcon />
                </div>
              </div>
              <div
                className="flex flex-col items-center gap-2 p-4 text-center border rounded-md"
                onClick={() => saveData("business")}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="40"
                    fill="none"
                    viewBox="0 0 50 40"
                  >
                    <path
                      fill="#36459C"
                      d="M44.5 10.25h-9.994V8.788a8.357 8.357 0 0 0-8.369-8.37h-2.356a8.357 8.357 0 0 0-8.368 8.37v1.462H5.5c-2.762 0-5.119 2.275-5.119 5.119v19.175c0 2.762 2.275 5.119 5.119 5.119h39c2.763 0 5.119-2.275 5.119-5.12V15.289c0-2.763-2.356-5.038-5.119-5.038ZM19.15 8.788c0-2.6 2.113-4.713 4.713-4.713h2.356c2.6 0 4.712 2.113 4.712 4.713v1.462H19.15V8.788ZM5.5 13.906h39c.813 0 1.462.65 1.462 1.463v4.55H41.17v-1.544c0-.975-.813-1.869-1.869-1.869a1.839 1.839 0 0 0-1.869 1.87v1.543H12.57v-1.544c0-.975-.813-1.869-1.869-1.869a1.839 1.839 0 0 0-1.869 1.87v1.543H4.12v-4.55c0-.813.569-1.463 1.381-1.463Zm39 22.02h-39c-.812 0-1.462-.65-1.462-1.463v-10.97H8.83v1.545c0 .975.813 1.868 1.869 1.868a1.839 1.839 0 0 0 1.869-1.868v-1.544H37.43v1.544c0 .975.813 1.868 1.869 1.868a1.839 1.839 0 0 0 1.869-1.868v-1.544h4.794v10.969c0 .812-.65 1.462-1.463 1.462Z"
                    />
                  </svg>
                </div>
                <h4>Business</h4>
                <p>
                  We'll need information about the company to complete the KYC.
                </p>
                <div>
                  <ValueIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {state.customerType !== "" && (
        <>
          <div>
            <div className="flex items-center justify-between pb-2 items">
              <h3>Account Holder KYC</h3>
              <div className="flex gap-4">
                <KYCSelector listType="retail" />
                {state.customerType === "retail" ? (
                  <NewKYC listType="retail" />
                ) : (
                  <>
                    <NewBKYC listType="retail" />
                  </>
                )}
              </div>
            </div>
            <div>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[2%]">
                      <input
                        type="checkbox"
                        checked={isAllRowsSelected}
                        onChange={handleSelectAllRows}
                      />
                    </TableHead>
                    <TableHead>KYC ID</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>KYC Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {individuals?.map((individual) => (
                    <TableRow key={individual.kycId}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(individual)}
                          onChange={() => handleRowSelect(individual)}
                        />
                      </TableCell>
                      <TableCell>{individual.kycId}</TableCell>
                      <TableCell>{individual.createdBy}</TableCell>
                      <TableCell>{individual.kycType}</TableCell>
                      <TableCell>{individual.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
      {state.customerType === "business" && (
        <>
          <div>
            <div className="flex items-center justify-between pb-2 items">
              <h3>Other KYC</h3>
              <div className="flex gap-4">
                <KYCSelector listType="business" />
                <>
                  <NewKYC listType="business" />
                </>
              </div>
            </div>
            <div>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[2%]">
                      <input
                        type="checkbox"
                        checked={isAllRowsSelected}
                        onChange={handleSelectAllRows}
                      />
                    </TableHead>
                    <TableHead>KYC ID</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>KYC Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businesses?.map((individual) => (
                    <TableRow key={individual.kycId}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(individual)}
                          onChange={() => handleRowSelect(individual)}
                        />
                      </TableCell>
                      <TableCell>{individual.kycId}</TableCell>
                      <TableCell>{individual.createdBy}</TableCell>
                      <TableCell>{individual.kycType}</TableCell>
                      <TableCell>{individual.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
      {state.customerType !== "" && (<div className="flex gap-2">
        <Button>Save</Button>
        <Button onClick={() => navigate("/customers/customer-wizard/products")}>
          Next
        </Button>
      </div>)}
    </div>
  );
};

export default CustomerKYC;
