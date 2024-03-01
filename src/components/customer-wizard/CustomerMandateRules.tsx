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
import { MandateType } from "@/types/global";
import { gql, useMutation, useQuery } from "@apollo/client";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/store/state";
import { CREATE_MANDATE_RULE } from "@/types/mutations";

const businessRetailSchema = z.object({
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

const GET_MANDATE_TYPES = gql`
  query MandateTypes {
    mandateTypes {
      mandateTypeId
      mandateTypeName
      mandateTypeCode
    }
  }
`;

interface CustomerMandateRulesProps {}

const CustomerMandateRules: FC<CustomerMandateRulesProps> = () => {
  const [mandateTypes, setMandateTypes] = useState<MandateType[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const {state, setState} = useAppState();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessRetailInput>({
    resolver: zodResolver(businessRetailSchema),
  });
  const [mandateDetails, setMandateDetails] = useState([
    {
      signingMandateType: [],
      signingRule: "",
      minimumPaymentAmount: 0,
      maximumPaymentAmount: 0,
      maximumDailyLimit: 0,
    },
  ]);
  const { data: mandateData } = useQuery(GET_MANDATE_TYPES);
  useEffect(() => {
    if (mandateData && mandateData.mandateTypes) {
      setMandateTypes(mandateData.mandateTypes);
    }
  }, [mandateData]);
  const navigate = useNavigate();
  const [createMandateRule] = useMutation(CREATE_MANDATE_RULE);
  const saveData = async (data: BusinessRetailInput) => {
    console.log(data);
    const rules = await Promise.all(
      data.signingRules.map(async (rule) => {
        const response = await createMandateRule({
          variables:{
            customerId: state.customer,
            mandateType: rule.signingMandateType,
            signingRule: rule.signingRule,
            minimumTransactionAmount: rule.minimumPaymentAmount,
            maximumTransactionAmount: rule.maximumPaymentAmount,
            maximumDailyLimit: rule.maximumDailyLimit,
            modifiedBy: user.id,
              modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
                .toISOString()
                .split(".")[0],
          }
        })
        return response.data.createMandateRule
      })
    )
    setState({
      ...state,
      signingRules: rules
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(saveData)}>
        <div className="flex flex-col px-2 pt-1 pb-4 my-4 border">
          <div className="flex items-center justify-between">
            <h3>SIGNING MANDATE DETAILS</h3>
            <Button
            variant="link"
            onClick={()=> setMandateDetails((prev)=>[
              ...prev,
              { signingMandateType: [], signingRule: "", minimumPaymentAmount: 0, maximumPaymentAmount: 0, maximumDailyLimit: 0 }
            ])}
            >
              Add
            </Button>
          </div>
          {mandateDetails.map((_mandate, index) => (
            <div className="flex items-center justify-center gap-4">
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
                    {errors?.signingRules?.[index]?.maximumDailyLimit?.message}
                  </div>
                )}
              </div>
              <div className="w-[5%] flex justify-center items-end">
                <Button
                  size="icon"
                  className=""
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
        <div className="flex justify-start gap-4">
          <Button>Save</Button>
          <Button
            onClick={() => navigate("/customers/customer-wizard/mandates")}
          >
            Back
          </Button>
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerMandateRules;
