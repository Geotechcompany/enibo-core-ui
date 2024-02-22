import { FC, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { X } from "lucide-react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { KYCType, MandateType, ProductType } from "@/types/global";
import {  CREATE_RETAIL } from "./customer-list/mutation";

const customerRetailSchema = z.object({
  jointKYC: z.array(z.object({ value: z.string(), label: z.string() })),
  individualKYC: z.string(),
  kycType: z
    .string()
    .refine((value) => value === "personal" || value === "joint", {
      message: "Invalid KYC Type",
    }),
  productTypes: z.string().min(3, { message: "Product Types is required" }),
  accountCurrency: z
    .string()
    .min(3, { message: "Account Currency is required" }),
  riskRating: z.string().min(3, { message: "Risk Rating is required" }),
  mandates: z.array(
    z.object({
      signatory: z.string().min(3, { message: "Signatory is required" }),
      mandateType: z.string().min(3, { message: "Mandate Type is required" }),
      category: z.string().min(3, { message: "Category is required" }),
    })
  ),
  signingRules: z.array(
    z.object({
      signingRule: z.string().min(3, { message: "Signing Rule is required" }),
      signingMandateType: z.string().min(3, { message: "Signing Mandate Type is required" }),
      minimumPaymentAmount: z
        .string()
        .min(3, { message: "Minimum Payment Amount is required" }),
      maximumPaymentAmount: z
        .string()
        .min(3, { message: "Maximum Payment Amount is required" }),
      maximumDailyLimit: z
        .string()
        .min(3, { message: "Maximum Daily Limit is required" }),
        
        modifiedBy: z.string().min(3, { message: "Modified By is required" }),
        modifiedOn: z.string().min(3, { message: "Modified On is required" }),
    })
  ),
});

type CustomerRetailInput = z.infer<typeof customerRetailSchema>;

interface NewCustomerRetailFormProps {}

const GET_PRODUCT_TYPES = gql`
  query ProductTypes {
    productTypes {
      productTypeId
      productTypeName
    }
  }
`;
const GET_KYC_TYPES = gql`
  query kycType {
    kycTypes {
      kycTypeId
      kycTypeName
    }
  }
`;
const GET_MANDATE_TYPES = gql`
  query MandateTypes {
    mandateTypes {
      mandateTypeId
      mandateTypeName
    }
  }
`;
const GET_INDIVIDUAL_KYCS = gql`
  query IndividualKYCs {
    individualKYCs {
      individualKYCId
      kycType
      designation
      firstName
      middleName
      lastName
    }
  }
`;

const NewCustomerRetailForm: FC<NewCustomerRetailFormProps> = () => {
  const [kycType, setKycType] = useState("");
  const [mandateTypes, setMandateTypes] = useState<MandateType[]>([]);
  const [ProductTypes, setProductTypes] = useState<ProductType[]>([]);
  const [individualKYCs, setIndividualKYCs] = useState<any[]>([]);
  const [KYCType, setKycTypes] = useState<KYCType[]>([]);

  const handleKycTypeChange = (value: string) => {
    setKycType(value);
  };

  const [accountMandates, setAccountMandates] = useState([
    {
      signatory: [],
      mandateType: [],
      category: "",
    },
  ]);

  const [mandateDetails, setMandateDetails] = useState([
    {
      signingMandateType: [],
      signingRule: "",
      minimumPaymentAmount: 0,
      maximumPaymentAmount: 0,
      maximumDailyLimit: 0,
    },
  ]);
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerRetailInput>({
    resolver: zodResolver(customerRetailSchema),
  });
  const { data: mandateData } = useQuery(GET_MANDATE_TYPES);

  useEffect(() => {
    if (mandateData && mandateData.mandateTypes) {
      setMandateTypes(mandateData.mandateTypes);
    }
  }, [mandateData]);

  const { data: kycData } = useQuery(GET_KYC_TYPES); // Execute the query
  useEffect(() => {
    if (kycData && kycData.kycTypes) {
      setKycTypes(kycData.kycTypes);
    }
  }, [kycData]);

  const { data } = useQuery(GET_PRODUCT_TYPES);
  useEffect(() => {
    if (data && data.productTypes) {
      setProductTypes(data.productTypes);
    }
  }, [data]);

  const { data: individualKycData } = useQuery(GET_INDIVIDUAL_KYCS);
  useEffect(() => {
    if (individualKycData && individualKycData.individualKYCs) {
      setIndividualKYCs(individualKycData.individualKYCs);
    }
  }, [individualKycData]);
  const getDesignation = (kycType: string, individualKYCs: any[], selectedIndividualKYC: string) => {
    if (kycType === "personal") {
      const selectedKYC = individualKYCs.find(kyc => kyc.kycType === selectedIndividualKYC);
      return selectedKYC ? selectedKYC.designation : "";
    } else {
      return "";
    }
  };
 // Refs for firstName, middleName, and lastName input fields
 const firstNameRef = useRef<HTMLInputElement>(null);
 const middleNameRef = useRef<HTMLInputElement>(null);
 const lastNameRef = useRef<HTMLInputElement>(null);
 const [createRetail] = useMutation(CREATE_RETAIL);

  const onSubmit = async (data: CustomerRetailInput) => {
    try {
      const variables = {
        retailType: data.kycType === "personal" ? "Personal" : "Joint",
        designation: getDesignation(data.kycType, individualKYCs, data.individualKYC),
        firstName: firstNameRef.current?.value || "", // Extract firstName from ref
        middleName: middleNameRef.current?.value || "", // Extract middleName from ref
        lastName: lastNameRef.current?.value || "", // Extract lastName from ref
        individualKyc: data.individualKYC,
        productTypes: data.productTypes,
        accountCurrency: data.accountCurrency,
        riskRating: data.riskRating,
        accountMandates: JSON.stringify(data.mandates), // Convert to JSON string
      
      };

      // Execute mutation
      await createRetail({ variables });

      // Handle success
      toast({
        title: "Customer Retail Created",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });

    } catch (err) {
      // Handle error
      console.error("Error creating customer retail:", err);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex flex-col px-2 pt-1 pb-4 my-4 border">
            <div>
              <h3>PERSONAL DETAILS</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="kycType">KYC Type</Label>
                <Controller
                  control={control}
                  name="kycType"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={(val) => {
                        handleKycTypeChange(val);
                        onChange(val);
                      }}
                      value={value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select KYC Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="joint">Joint</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.kycType && (
                  <div className="text-red-500">{errors.kycType.message}</div>
                )}
              </div>
              <div>
                {kycType === "personal" && (
                  <>
                    <Label htmlFor="individualKYC">Individual KYC</Label>
                    <Controller
                      control={control}
                      name="individualKYC"
                      render={({ field: { onChange, value } }) => (
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select IndividualKYC Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* Map over KYCType state to render select options */}
                            {KYCType.map((type) => (
                              <SelectItem
                                key={type.kycTypeId}
                                value={type.kycTypeId}
                              >
                                {type.kycTypeName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </>
                )}
                {kycType === "joint" && (
                  <>
                    <Label htmlFor="individualKYC">Individual KYC</Label>
                    <Controller
                      control={control}
                      name="individualKYC"
                      render={({ field: { onChange, value } }) => (
                        <Select onValueChange={onChange} value={value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select KYC Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* Map over KYCType state to render select options */}
                            {KYCType.map((type) => (
                              <SelectItem
                                key={type.kycTypeId}
                                value={type.kycTypeId}
                              >
                                {type.kycTypeName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </>
                )}
                {errors.individualKYC && (
                  <div className="text-red-500">
                    {errors.individualKYC.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col px-2 pt-1 pb-4 my-4 border">
            <div>
              <h3>ACCOUNT DETAILS</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="productTypes">Product Types</Label>
                <Controller
                  control={control}
                  name="productTypes"
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Map over productTypes state to render select options */}
                        {ProductTypes.map((type) => (
                          <SelectItem
                            key={type.productTypeId}
                            value={type.productTypeId}
                          >
                            {type.productTypeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.productTypes && (
                  <div className="text-red-500">
                    {errors.productTypes.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col px-2 pt-1 pb-4 my-4 border">
            <div className="flex items-center justify-between">
              <h3>ACCOUNT MANDATES</h3>
              <Button
                variant="link"
                className="bg-[#36459C] text-white px-4 py-2 rounded hover:bg-blue-700 "
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
              <div className="flex w-full gap-4">
                <div className="w-[50%]">
                  <Label
                    htmlFor="signatory"
                    className={index > 0 ? "sr-only" : ""}
                  >
                    Signatory KYC
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
                              key={indKyc.kycType}
                              value={indKyc.kycType}
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
                <div className="w-[5%] relative justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    className="mt-4"
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
          <div className="flex flex-col px-2 pt-1 pb-4 my-4 border">
            <div className="flex items-center justify-between">
              <h3>SIGNING MANDATE DETAILS</h3>
              <Button
                variant="link"
                className="bg-[#36459C] text-white px-4 py-2 rounded hover:bg-blue-700 "
                onClick={() =>
                  setMandateDetails((prev) => [
                    ...prev,
                    {
                      signingMandateType: [],
                      signingRule: "",
                      minimumPaymentAmount: 0,
                      maximumPaymentAmount: 0,
                      maximumDailyLimit: 0,
                    },
                  ])
                }
              >
                Add Mandate Detail
              </Button>
            </div>
            {mandateDetails.map((_mandate, index) => (
              <div className="flex w-full gap-4">
                <div className="w-[50%]">
                  <Label
                    htmlFor="signingMandateType"
                    className={index > 0 ? "sr-only" : ""}
                  >
                    Signing Mandate Type
                  </Label>
                  <Controller
                    control={control}
                    name={`signingRules.${index}.signingMandateType`}
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

                  {errors.signingRules?.[index]?.signingMandateType && (
                    <div className="text-red-500">
                      {
                        errors.signingRules?.[index]?.signingMandateType
                          ?.message
                      }
                    </div>
                  )}
                </div>
                <div className="w-[50%]">
                  <Label
                    htmlFor="signingRule"
                    className={index > 0 ? "sr-only" : ""}
                  >
                    Signing Rule
                  </Label>
                  <Controller
                    control={control}
                    name={`signingRules.${index}.signingRule`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder="Enter Signing Rule"
                      />
                    )}
                  />
                  {errors.signingRules?.[index]?.signingRule && (
                    <div className="text-red-500">
                      {errors.signingRules?.[index]?.signingRule?.message}
                    </div>
                  )}
                </div>
                <div className="w-[50%]">
                  <Label
                    htmlFor="minimumPaymentAmount"
                    className={index > 0 ? "sr-only" : ""}
                  >
                    Minimum Payment Amount
                  </Label>
                  <Controller
                    control={control}
                    name={`signingRules.${index}.minimumPaymentAmount`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder="Enter Minimum Payment Amount"
                      />
                    )}
                  />
                  {errors.signingRules?.[index]?.minimumPaymentAmount && (
                    <div className="text-red-500">
                      {
                        errors.signingRules?.[index]?.minimumPaymentAmount
                          ?.message
                      }
                    </div>
                  )}
                </div>
                <div className="w-[50%]">
                  <Label
                    htmlFor="maximumPaymentAmount"
                    className={index > 0 ? "sr-only" : ""}
                  >
                    Maximum Payment Amount
                  </Label>
                  <Controller
                    control={control}
                    name={`signingRules.${index}.maximumPaymentAmount`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder="Enter Maximum Payment Amount"
                      />
                    )}
                  />
                  {errors.signingRules?.[index]?.maximumPaymentAmount && (
                    <div className="text-red-500">
                      {
                        errors.signingRules?.[index]?.maximumPaymentAmount
                          ?.message
                      }
                    </div>
                  )}
                </div>
                <div className="w-[50%]">
                  <Label
                    htmlFor="maximumDailyLimit"
                    className={index > 0 ? "sr-only" : ""}
                  >
                    Maximum Daily Limit
                  </Label>
                  <Controller
                    control={control}
                    name={`signingRules.${index}.maximumDailyLimit`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder="Enter Maximum Daily Limit"
                      />
                    )}
                  />
                  {errors.signingRules?.[index]?.maximumDailyLimit && (
                    <div className="text-red-500">
                      {errors.signingRules?.[index]?.maximumDailyLimit?.message}
                    </div>
                  )}
                </div>
                <div className="w-[5%] relative justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    className="mt-4"
                    onClick={() => {
                      setMandateDetails((prev) => {
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
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <Button
            type="button"
            onClick={() => window.history.back()}
            variant="outline"
          >
            Cancel
          </Button>
          <Button type="submit">Create Customer Retail</Button>
        </div>
      </form>
    </section>
  );
};

export default NewCustomerRetailForm;
