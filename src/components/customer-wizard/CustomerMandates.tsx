import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  KYCIndividual, MandateType } from "@/types/global";
import { gql, useMutation, useQuery } from "@apollo/client";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/store/state";
import { CREATE_CUSTOMER, CREATE_MANDATE, CREATE_RETAIL } from "@/types/mutations";

const businessRetailSchema = z.object({
  mandates: z.array(
    z.object({
      signatory: z.string().min(3, { message: "Signatory is required" }),
      mandateType: z.string().min(3, { message: "Mandate Type is required" }),
      category: z.string().min(3, { message: "Category is required" }),
    })
  ),
});

type BusinessRetailInput = z.infer<typeof businessRetailSchema>;

const GET_MANDATE_TYPES = gql`
  query MandateTypes {
    mandateTypes {
      mandateTypeId
      mandateTypeName
      mandateTypeCode
    }
  }
`;

const GET_INDIVIDUAL_KYCS = gql`
  query IndividualKYCs {
  individualKYCs {
    IndividualKYCId
    kycType
    designation
    firstName
    middleName
    lastName
    phoneNumber
    emailAddress
    postalAddress
    physicalAddress
    country
    taxNumber
    idType
    idNumber
    sex
    nationality
    riskRating
    attachDocumentsField
    signature
    modifiedBy
    modifiedOn
  }
}
`;

interface CustomerMandatesProps {}

const CustomerMandates: FC<CustomerMandatesProps> = () => {
  const [mandateTypes, setMandateTypes] = useState<MandateType[]>([]);
  const [individualKYCs, setIndividualKYCs] = useState<KYCIndividual[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const {appState, setAppState} = useAppState();
  const [accountMandates, setAccountMandates] = useState([
    {
      signatory: [],
      mandateType: [],
      category: "",
    },
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessRetailInput>({
    resolver: zodResolver(businessRetailSchema),
  });

  const { data: mandateData } = useQuery(GET_MANDATE_TYPES);
  useEffect(() => {
    if (mandateData && mandateData.mandateTypes) {
      setMandateTypes(mandateData.mandateTypes);
    }
  }, [mandateData]);

  const { data: individualKycData } = useQuery(GET_INDIVIDUAL_KYCS);
  console.log(individualKycData);
  useEffect(() => {
    if (individualKycData && individualKycData.individualKYCs) {
      setIndividualKYCs(individualKycData.individualKYCs);
    }
  }, [individualKycData]);
  const navigate = useNavigate();
  const [createMandate] = useMutation(CREATE_MANDATE);
  const [createRetail] = useMutation(CREATE_RETAIL);
  const [createCustomer] = useMutation(CREATE_CUSTOMER);
  const saveData = async (data: BusinessRetailInput) => {
    console.log(data);
    //loop through mandates and create a new mandate for each and return the new mandates
    const mandates = await Promise.all(
      data.mandates.map(async (mandate) => {
        const response = await createMandate({
          variables: {
            signatory: mandate.signatory,
            mandateType: mandate.mandateType,
            category: mandate.category,
            modifiedBy: user.id,
            modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
              .toISOString()
              .split(".")[0],
          },
        });
        return response.data.createMandate; // Assuming the response contains the data property
      })
    );
    
    if(mandates && mandates.length > 0){
      setAppState({
        ...appState,
        mandates: mandates,
      })
    }

    const retail = await createRetail({
      variables: {
        retailType: appState.customerType,
        individualKyc: appState.individuals[0].kycId,
        productTypes: appState.product.productTypes,
        accountCurrency: appState.product.accountCurrency,
        riskRating: appState.product.riskRating,
        accountMandates: mandates.map((mandate) => mandate.mandateId),
        modifiedBy: user.id,
        modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
          .toISOString()
          .split(".")[0],
      },
    })
    console.log(retail.data.createRetail)
    setAppState({
      ...appState,
      retail: retail.data.createRetail.retailId,
    })
    const customer = await createCustomer({
      variables: {
        customerType: appState.customerType,
        retail: retail.data.createRetail.retailId,
        accountMandates: appState.mandates,
        modifiedBy: user.id,
        modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
          .toISOString()
          .split(".")[0],
      },
    })
    console.log(customer)
    setAppState({
      ...appState,
      customer: customer.data.createCustomer.customerId,
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit(saveData)}>
        <div className="flex flex-col px-2 pt-1 pb-4 my-4 border">
          <div className="flex items-center justify-between">
            <h3>ACCOUNT MANDATES</h3>
            <Button
              variant="link"
              onClick={() =>
                setAccountMandates((prev) => [
                  ...prev,
                  { signatory: [], mandateType: [], category: "" },
                ])
              }
            >
              Add Mandate
            </Button>
          </div>
          {accountMandates.map((_mandate, index) => (
            <div className="flex items-center justify-center gap-4">
              <div className="w-[50%]">
                <Label
                  htmlFor="signatory"
                  className={index > 0 ? "sr-only" : ""}
                >
                  Signatory
                </Label>
                <Controller
                    control={control}
                    name={`mandates.${index}.signatory`}
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Individual KYC" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Map over individualKYCs state to render select options */}
                          {individualKYCs.map((indKyc) => (
                            <SelectItem
                              key={indKyc.IndividualKYCId}
                              value={indKyc.IndividualKYCId}
                            >
                              {`${indKyc.firstName} ${indKyc.lastName} `}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                {errors.mandates?.[index]?.signatory && (
                  <div className="text-red-500">
                    {errors.mandates?.[index]?.signatory?.message}
                  </div>
                )}
              </div>
              <div className="w-[50%]">
                <Label
                  htmlFor="mandateType"
                  className={index > 0 ? "sr-only" : ""}
                >
                  Mandate Type
                </Label>
                <Controller
                  control={control}
                  name={`mandates.${index}.mandateType`}
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Mandate Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Map over mandateTypes state to render select options */}
                        {mandateTypes.map((type) => (
                          <SelectItem
                            key={type.mandateTypeId}
                            value={type.mandateTypeId}
                          >
                            {type.mandateTypeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.mandates?.[index]?.mandateType && (
                  <div className="text-red-500">
                    {errors.mandates?.[index]?.mandateType?.message}
                  </div>
                )}
              </div>
              <div className="w-[50%]">
                <Label
                  htmlFor="category"
                  className={index > 0 ? "sr-only" : ""}
                >
                  Category
                </Label>
                <Controller
                  control={control}
                  name={`mandates.${index}.category`}
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A12345">A</SelectItem>
                        <SelectItem value="B67890">B</SelectItem>
                        <SelectItem value="C13579">C</SelectItem>
                        <SelectItem value="D24680">D</SelectItem>
                        <SelectItem value="E97531">E</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.mandates?.[index]?.category && (
                  <div className="text-red-500">
                    {errors.mandates?.[index]?.category?.message}
                  </div>
                )}
              </div>
              <div className="w-[5%] flex justify-center items-center">
                <Button
                  size="icon"
                  className=""
                  onClick={() => {
                    setAccountMandates((prev) => {
                      const newMandates = [...prev];
                      newMandates.splice(index, 1);
                      return newMandates;
                    });
                  }}
                >
                  <X className="w-4 h-4 text-red-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-start gap-2 mt-4">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            onClick={() => navigate("/customers/customer-wizard/products")}
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/customers/customer-wizard/mandate-rules")}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerMandates;
