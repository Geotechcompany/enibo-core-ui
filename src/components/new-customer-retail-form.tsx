import { FC, useState } from "react";
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
import { X } from "lucide-react";

const customerRetailSchema = z.object({
  individualKYC: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(3, { message: "Individual KYC is required" }),
  productTypes: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(3, { message: "Product Types is required" }),
  accountCurrency: z
    .string()
    .min(3, { message: "Account Currency is required" }),
  riskRating: z.string().min(3, { message: "Risk Rating is required" }),
  mandates: z.array(
    z.object({
      signatory: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .min(3, { message: "Signatory is required" }),
      mandateType: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .min(3, { message: "Mandate Type is required" }),
      category: z.string().min(3, { message: "Category is required" }),
    })
  ),
  signingRules: z.array(
    z.object({
      signingRule: z.string().min(3, { message: "Signing Rule is required" }),
      signingMandateType: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .min(3, { message: "Signing Mandate Type is required" }),
      minimumPaymentAmount: z
        .number()
        .min(3, { message: "Minimum Payment Amount is required" }),
      maximumPaymentAmount: z
        .number()
        .min(3, { message: "Maximum Payment Amount is required" }),
      maximumDailyLimit: z
        .number()
        .min(3, { message: "Maximum Daily Limit is required" }),
    })
  ),
});

type CustomerRetailInput = z.infer<typeof customerRetailSchema>;

interface NewCustomerRetailFormProps {}

const NewCustomerRetailForm: FC<NewCustomerRetailFormProps> = () => {
  const [accountMandates, setAccountMandates] = useState([
    {
      signatory: [],
      mandateType: [],
      category: "",
    },
  ]);
  
  const [mandateDetails, setMandateDetails] = useState([{
    signingMandateType: [],
    signingRule: "",
    minimumPaymentAmount: 0,
    maximumPaymentAmount: 0,
    maximumDailyLimit: 0,
  }]);
  const { toast } = useToast();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerRetailInput>({
    resolver: zodResolver(customerRetailSchema),
  });
  const onSubmit = (data: CustomerRetailInput) => {
    toast({
      title: "Customer Retail Created",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
                <Label htmlFor="individualKYC">Individual KYC</Label>
                <Controller
                  control={control}
                  name="individualKYC"
                  render={({ field: { onChange, value } }) => (
                    <MultiSelect
                      onChange={onChange}
                      selected={value}
                      placeholder="Select Individual KYC"
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
                    <MultiSelect
                      onChange={onChange}
                      selected={value}
                      placeholder="Select Product Types"
                      className="w-full"
                      options={[
                        { value: "A12345", label: "Savings Account" },
                        { value: "B67890", label: "Checking Account" },
                        { value: "C13579", label: "Fixed Deposit" },
                        { value: "D24680", label: "Personal Loan" },
                        { value: "E97531", label: "Home Mortgage" },
                      ]}
                    />
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
            {accountMandates.map((mandate, index) => (
              <div className="flex w-full gap-4">
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
                      <MultiSelect
                        onChange={onChange}
                        selected={value}
                        placeholder="Select Signatory"
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
                      <MultiSelect
                        onChange={onChange}
                        selected={value}
                        placeholder="Select Mandate Type"
                        className="w-full"
                        options={[
                          { value: "A12345", label: "Full Access" },
                          { value: "B67890", label: "Transactional Access" },
                          { value: "C13579", label: "View Only" },
                          { value: "D24680", label: "Limited Access" },
                          { value: "E97531", label: "Payment Authorization" },
                        ]}
                      />
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
                <div className="w-[5%] flex justify-center items-end">
                  
                  <Button
                    variant="outline"
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
            {mandateDetails.map((mandate, index) => (
              <div className="flex gap-4">
                <div className="w-[50%]">
                  <Label htmlFor="signingMandateType">Mandate Type</Label>
                  <Controller
                    control={control}
                    name={`signingRules.${index}.signingMandateType`}
                    render={({ field: { onChange, value } }) => (
                      <MultiSelect
                        onChange={onChange}
                        selected={value}
                        placeholder="Select Mandate Type"
                        className="w-full"
                        options={[
                          { value: "A12345", label: "Full Access" },
                          { value: "B67890", label: "Transactional Access" },
                          { value: "C13579", label: "View Only" },
                          { value: "D24680", label: "Limited Access" },
                          { value: "E97531", label: "Payment Authorization" },
                        ]}
                      />
                    )}
                  />
                  {errors?.signingRules?.[index]?.signingMandateType && (
                    <div className="text-red-500">
                      {errors?.signingRules?.[index]?.signingMandateType?.message}
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
                    type="number"
                    id="minimumPaymentAmount"
                    {...register(`signingRules.${index}.minimumPaymentAmount`)}
                  />
                  {errors?.signingRules?.[index]?.minimumPaymentAmount && (
                    <div className="text-red-500">
                      {errors?.signingRules?.[index]?.minimumPaymentAmount?.message}
                    </div>
                  )}
                </div>
                <div className="w-[50%]">
                  <Label htmlFor="maximumPaymentAmount">
                    Maximum Payment Amount
                  </Label>
                  <Input
                    type="number"
                    id="maximumPaymentAmount"
                    {...register(`signingRules.${index}.maximumPaymentAmount`)}
                  />
                  {errors?.signingRules?.[index]?.maximumPaymentAmount && (
                    <div className="text-red-500">
                      {errors?.signingRules?.[index]?.maximumPaymentAmount?.message}
                    </div>
                  )}
                </div>
                <div className="w-[50%]">
                  <Label htmlFor="maximumDailyLimit">Maximum Daily Limit</Label>
                  <Input
                    type="number"
                    id="maximumDailyLimit"
                    {...register(`signingRules.${index}.maximumDailyLimit`)}
                  />
                  {errors?.signingRules?.[index]?.maximumDailyLimit && (
                    <div className="text-red-500">
                      {errors?.signingRules?.[index]?.maximumDailyLimit?.message}
                    </div>
                  )}
                </div>
                <div className="w-[5%] flex items-end">
                  <Button
                    variant="outline"
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
        <div className="mt-4 ">
          <Button type="submit">Submit</Button>
          <Button variant="outline" className="ml-2">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewCustomerRetailForm;
