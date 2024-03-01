/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { MultiSelect } from "./multi-select";
import { Link, X } from "lucide-react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { KYCType, MandateType, ProductType } from "@/types/global";
import { CREATE_BUSINESS } from "./customer-list/mutation";
import { useNavigate } from "react-router";

const businessRetailSchema = z.object({
  businessKYC: z.string().min(3, { message: "Business KYC is required" }),
  kycType: z
    .string()
    .refine((value) => value === "personal" || value === "joint", {
      message: "Invalid KYC Type",
    }),
  directorKYC: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(3, { message: "Director KYC is required" }),
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
      signingMandateType: z
        .string()
        .min(3, { message: "Signing Mandate Type is required" }),
      minimumPaymentAmount: z
        .string()
        .min(3, { message: "Minimum Payment Amount is required" }),
      maximumPaymentAmount: z
        .string()
        .min(3, { message: "Maximum Payment Amount is required" }),
      maximumDailyLimit: z
        .string()
        .min(3, { message: "Maximum Daily Limit is required" }),
    })
  ),
});

type BusinessRetailInput = z.infer<typeof businessRetailSchema>;

interface NewBusinessRetailFormProps {}

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
      mandateTypeCode
    }
  }
`;

const GET_BUSINESS_KYCS = gql`
  query BusinessKYCs {
    businessKYCs {
      businessKYCId
      kycType
      legalEntityName
      legalStatus
      dateOfIncorporation
      registrationNumber
      natureOfBusiness
    }
  }
`;

const NewBusinessRetailForm: FC<NewBusinessRetailFormProps> = () => {
  const [ProductTypes, setProductTypes] = useState<ProductType[]>([]);
  const [mandateTypes, setMandateTypes] = useState<MandateType[]>([]);
  const [businessKYCs, setbusinessKYCs] = useState<any[]>([]);
  const [KYCType, setKycTypes] = useState<KYCType[]>([]);
  const navigate  = useNavigate();
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
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusinessRetailInput>({
    resolver: zodResolver(businessRetailSchema),
  });
 
  const { data } = useQuery(GET_PRODUCT_TYPES);
  useEffect(() => {
    if (data && data.productTypes) {
      setProductTypes(data.productTypes);
    }
  }, [data]);
  const { data: mandateData } = useQuery(GET_MANDATE_TYPES);
  useEffect(() => {
    if (mandateData && mandateData.mandateTypes) {
      setMandateTypes(mandateData.mandateTypes);
    }
  }, [mandateData]);

  const { data: businessKycData } = useQuery(GET_BUSINESS_KYCS);
  useEffect(() => {
    if (businessKycData && businessKycData.businessKYCs) {
      setbusinessKYCs(businessKycData.businessKYCs);
    }
  }, [businessKycData]);

  const { data: kycData } = useQuery(GET_KYC_TYPES); // Execute the query
  useEffect(() => {
    if (kycData && kycData.kycTypes) {
      setKycTypes(kycData.kycTypes);
    }
  }, [kycData]);
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
 const [createRetail] = useMutation(CREATE_BUSINESS);
 const onSubmit = async (data: BusinessRetailInput) => {
  try {
    await createRetail({
      variables: {
      retailType: data.kycType === "personal" ? "Personal" : "Joint",
      designation: getDesignation(data.kycType, businessKYCs, data.businessKYC),
      firstName: firstNameRef.current?.value || "",
      middleName: middleNameRef.current?.value || "", 
      lastName: lastNameRef.current?.value || "", 
      individualKyc: data.businessKYC,
      productTypes: data.productTypes,
      accountCurrency: data.accountCurrency,
      riskRating: data.riskRating,
      accountMandates: JSON.stringify(data.mandates), 
    },
  });

  toast({
    title: "Customer Retail Created",
    description: <div className="text-black">
    <div className="text-lg">
      New Customer Retail {" "}
      <Link to={`/customers`} className="text-blue-500 underline">
        {data.businessKYC}
      </Link>
       , has been successfully created
    </div>
  </div>,
  });
  reset();
  navigate("/customers"); 
} catch (error) {
  console.error("Error creating customer retail", error);
  toast({
    title: "Error",
    description: "Failed to create customer retail. Please try again.",
  });
}
};
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex flex-col px-2 pt-1 pb-4 my-4 border">
            <div>
              <h3>BUSINESS DETAILS</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessKYC">Business KYC</Label>
                <Controller
                  control={control}
                  name="businessKYC"
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business KYC Type" />
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
                {errors.businessKYC && (
                  <div className="text-red-500">
                    {errors.businessKYC.message}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="directorKYC">Directors KYC</Label>
                <Controller
                  control={control}
                  name="directorKYC"
                  render={({ field: { onChange, value } }) => (
                    <MultiSelect
                      onChange={onChange}
                      selected={value}
                      placeholder="Select Directors KYC"
                      className="w-full"
                      options={[
                        { value: "A12345", label: "John Doe - A12345" },
                        { value: "B67890", label: "Jane Smith - B67890" },
                        { value: "C13579", label: "Robert Johnson - C13579" },
                        { value: "D24680", label: "Emily Davis - D24680" },
                        { value: "E97531", label: "Michael Wilson - E97531" },
                      ]}
                    />
                  )}
                />
                {errors.directorKYC && (
                  <div className="text-red-500">
                    {errors.directorKYC.message}
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
              <div>
                <Label htmlFor="accountCurrency">Account Currency</Label>
                <Controller
                  control={control}
                  name="accountCurrency"
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Account Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.accountCurrency && (
                  <div className="text-red-500">
                    {errors.accountCurrency.message}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="riskRating">Risk Rating</Label>
                <Controller
                  control={control}
                  name="riskRating"
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.riskRating && (
                  <div className="text-red-500">
                    {errors.riskRating.message}
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
              <div className="flex gap-4">
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
                          <SelectValue placeholder="Select Business KYC" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Map over individualKYCs state to render select options */}
                          {businessKYCs.map((indKyc) => (
                            <SelectItem
                              key={indKyc.businessKYCId}
                              value={indKyc.businessKYCId}
                            >
                              {`${indKyc.legalEntityName} - ${indKyc.registrationNumber} `}
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
                <div className="w-[5%] flex items-end">
                  <Button
                    size="icon"
                    className="mb-6"
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
            <div>
              <h3>SIGNING MANDATE DETAILS</h3>
            </div>
            {mandateDetails.map((_mandate, index) => (
              <div className="flex gap-4">
                <div className="w-[50%]">
                  <Label htmlFor="signingMandateType">Mandate Type</Label>
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
                  {errors?.signingRules?.[index]?.signingMandateType && (
                    <div className="text-red-500">
                      {
                        errors?.signingRules?.[index]?.signingMandateType
                          ?.message
                      }
                    </div>
                  )}
                </div>
                <div className="w-[50%]">
                  <Label htmlFor="signingRule">Signing Rule</Label>
                  <Input
                    type="text"
                    id="signingRule"
                    {...register(`signingRules.${index}.signingRule`)}
                  />
                  {errors?.signingRules?.[index]?.signingRule && (
                    <div className="text-red-500">
                      {errors?.signingRules?.[index]?.signingRule?.message}
                    </div>
                  )}
                </div>
                <div className="w-[50%]">
                  <Label htmlFor="minimumPaymentAmount">
                    Minimum Payment Amount
                  </Label>
                  <Input
                    type="text"
                    id="minimumPaymentAmount"
                    {...register(`signingRules.${index}.minimumPaymentAmount`)}
                  />
                  {errors?.signingRules?.[index]?.minimumPaymentAmount && (
                    <div className="text-red-500">
                      {
                        errors?.signingRules?.[index]?.minimumPaymentAmount
                          ?.message
                      }
                    </div>
                  )}
                </div>
                <div className="w-[50%]">
                  <Label htmlFor="maximumPaymentAmount">
                    Maximum Payment Amount
                  </Label>
                  <Input
                    type="text"
                    id="maximumPaymentAmount"
                    {...register(`signingRules.${index}.maximumPaymentAmount`)}
                  />
                  {errors?.signingRules?.[index]?.maximumPaymentAmount && (
                    <div className="text-red-500">
                      {
                        errors?.signingRules?.[index]?.maximumPaymentAmount
                          ?.message
                      }
                    </div>
                  )}
                </div>
                <div className="w-[50%]">
                  <Label htmlFor="maximumDailyLimit">Maximum Daily Limit</Label>
                  <Input
                    type="text"
                    id="maximumDailyLimit"
                    {...register(`signingRules.${index}.maximumDailyLimit`)}
                  />
                  {errors?.signingRules?.[index]?.maximumDailyLimit && (
                    <div className="text-red-500">
                      {
                        errors?.signingRules?.[index]?.maximumDailyLimit
                          ?.message
                      }
                    </div>
                  )}
                </div>
                <div className="w-[5%] flex items-end">
                  <Button
                    size="icon"
                    className="mb-6"
                    onClick={() => {
                      setMandateDetails((prev) => {
                        const newMandateRules = [...prev];
                        newMandateRules.splice(index, 1);
                        return newMandateRules;
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
        <div className="mt-4">
          <Button type="submit">Submit</Button>
          <Button className="ml-2">Cancel</Button>
        </div>
      </form>
    </section>
  );
};

export default NewBusinessRetailForm;
