import { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "./multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";

export const newBranchSchema = z.object({
  branchName: z.string().min(3, { message: "Branch name is required" }),
  branchType: z.string().min(3, { message: "Branch type is required" }),
  description: z.string().max(100, { message: "Description is required" }),
  branchCode: z.string().min(3, { message: "Branch code is required" }),
  SWIFTCode: z.string().min(3, { message: "SWIFT code is required" }),
  localBankCode: z.string().min(3, { message: "Local bank code is required" }),
  country: z.string().min(3, { message: "Country is required" }),
  countrySubdivision: z
    .string()
    .min(3, { message: "Country subdivision is required" }),
  streetName: z.string().min(3, { message: "Street name is required" }),
  buildingNumber: z.string().min(3, { message: "Building number is required" }),
  buildingName: z.string().min(3, { message: "Building name is required" }),
  postalAddress: z.string().min(3, { message: "Postal address is required" }),
  AllowedProductTypes: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "At least one product type is required" }),
  email: z.string().email({ message: "Email is required" }),
  isHeadOfficeBranch: z.enum(["yes", "no"], {
    required_error: "You need to select a branch type.",
  }),
  headOfficeBranch: z
    .string()
    .min(3, { message: "Head office branch is required" }),
});

type newBranchInput = z.infer<typeof newBranchSchema>;

interface NewBranchFormProps {}

const NewBranchForm: FC<NewBranchFormProps> = () => {
  const {toast} = useToast();
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    control,
    formState: { errors },
  } = useForm<newBranchInput>({
    resolver: zodResolver(newBranchSchema),
  });

  const watchHeadOfficeCheck = watch("isHeadOfficeBranch");

  const onSubmit = (data: newBranchInput) => {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  useEffect(() => {
    if (watchHeadOfficeCheck === "yes") {
      unregister("headOfficeBranch");
    } else {
      register("headOfficeBranch");
    }
  }, [watchHeadOfficeCheck, unregister, register]);

  return (
    <section className="">
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="grid grid-cols-3 gap-6">
          <div>
            <Label htmlFor="branchName">Branch Name</Label>
            <Input
              id="branchName"
              type="text"
              {...register("branchName", { required: true })}
            />
            {errors.branchName && (
              <span className="text-red-500">{errors.branchName.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="branchTypes">Branch Types</Label>
            <Controller
              control={control}
              name="branchType"
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select ..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL-SERVICE">Full Service</SelectItem>
                    <SelectItem value="LIMITED-SERVICE">Limited Service</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.AllowedProductTypes && (
              <span className="text-red-500">
                {errors.AllowedProductTypes.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="branchCode">Branch Code</Label>
            <Input
              id="branchCode"
              type="text"
              {...register("branchCode", { required: true })}
            />
            {errors.branchCode && (
              <span className="text-red-500">{errors.branchCode.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="SWIFTCode">SWIFT Code</Label>
            <Input
              id="SWIFTCode"
              type="text"
              {...register("SWIFTCode", { required: true })}
            />
            {errors.SWIFTCode && (
              <span className="text-red-500">{errors.SWIFTCode.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="localBankCode">Local Bank Code</Label>
            <Input
              id="localBankCode"
              type="text"
              {...register("localBankCode", { required: true })}
            />
            {errors.localBankCode && (
              <span className="text-red-500">
                {errors.localBankCode.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              {...register("country", { required: true })}
            />
            {errors.country && (
              <span className="text-red-500">{errors.country.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="countrySubdivision">Country Subdivision</Label>
            <Input
              id="countrySubdivision"
              type="text"
              {...register("countrySubdivision", { required: true })}
            />
            {errors.countrySubdivision && (
              <span className="text-red-500">
                {errors.countrySubdivision.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="streetName">Street Name</Label>
            <Input
              id="streetName"
              type="text"
              {...register("streetName", { required: true })}
            />
            {errors.streetName && (
              <span className="text-red-500">{errors.streetName.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="buildingNumber">Building Number</Label>
            <Input
              id="buildingNumber"
              type="text"
              {...register("buildingNumber", { required: true })}
            />
            {errors.buildingNumber && (
              <span className="text-red-500">
                {errors.buildingNumber.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="buildingName">Building Name</Label>
            <Input
              id="buildingName"
              type="text"
              {...register("buildingName", { required: true })}
            />
            {errors.buildingName && (
              <span className="text-red-500">
                {errors.buildingName.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="postalAddress">Postal Address</Label>
            <Input
              id="postalAddress"
              type="text"
              {...register("postalAddress", { required: true })}
            />
            {errors.postalAddress && (
              <span className="text-red-500">
                {errors.postalAddress.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="AllowedProductTypes">Allowed Product Types</Label>
            <Controller
              control={control}
              name="AllowedProductTypes"
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  options={[
                    { value: "CREDIT", label: "CREDIT" },
                    { value: "DEBIT", label: "DEBIT" },
                    { value: "ASSETS", label: "ASSETS" },
                    { value: "LIABILITIES", label: "LIABILITIES" },
                  ]}
                  className="sm:w-[474px]"
                  placeholder="Select allowed product types"
                  selected={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.AllowedProductTypes && (
              <span className="text-red-500">
                {errors.AllowedProductTypes.message}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="isHeadOfficeBranch">Is Head Office Branch</Label>
            <Controller
              name="isHeadOfficeBranch"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select ..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.isHeadOfficeBranch && (
              <span className="text-red-500">
                {errors.isHeadOfficeBranch.message}
              </span>
            )}
          </div>
          <div>
            {watchHeadOfficeCheck === "no" ? (
              <>
                <Label htmlFor="headOfficeBranch">Head Office Branch</Label>
                <Input
                  id="headOfficeBranch"
                  type="text"
                  {...register("headOfficeBranch", { required: true })}
                />
                {errors.headOfficeBranch && (
                  <span className="text-red-500">
                    {errors.headOfficeBranch.message}
                  </span>
                )}
              </>
            ) : null}
          </div>
          
        </div>
        <div className="flex gap-2">
            <Button
              type="submit"
              size="lg"
              className="bg-[#36459C] hover:bg-[#253285]"
            >
              Submit
            </Button>
            <Button  size="lg">
              Cancel
            </Button>
          </div>
      </form>
    </section>
  );
};

export default NewBranchForm;
