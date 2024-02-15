import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// import { MultiSelect } from "./multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";

import { useMutation } from "@apollo/client";
import { XIcon } from "lucide-react";
import {CREATE_BRANCH} from "./branch-list/mutation";



export const newBranchSchema = z.object({
  branchName: z.string().min(3, { message: "Branch name is required" }),
  branchType: z.string().min(3, { message: "Branch type is required" }),
  description: z.string().max(10, { message: "Description is required" }),
  branchCode: z.string().min(3, { message: "Branch code is required" }),
  SWIFTCode: z.string().min(3, { message: "SWIFT code is required" }).optional(),
  localBankCode: z.string().min(3, { message: "Local bank code is required" }),
  country: z.string().min(3, { message: "Country is required" }),
  countrySubdivision: z
    .string()
    .min(3, { message: "Country subdivision is required" }),
  streetName: z.string().min(3, { message: "Street name is required" }),
  buildingNumber: z.string().min(3, { message: "Building number is required" }),
  buildingName: z.string().min(3, { message: "Building name is required" }),
  postalAddress: z.string().min(3, { message: "Postal address is required" }),
  // AllowedProductTypes: z
  //   .array(z.object({ value: z.string(), label: z.string() }))
  //   .min(1, { message: "At least one product type is required" }).optional(),
  email: z.string().email({ message: "Email is required" }),
  isHeadOfficeBranch: z.enum(["yes", "no"], {
    required_error: "You need to select a branch type.",
  }),
  headOfficeBranch: z
    .string()
    .min(3, { message: "Head office branch is required" }).optional(),
});

type newBranchInput = z.infer<typeof newBranchSchema>;

interface NewBranchFormProps {}

const NewBranchForm: FC<NewBranchFormProps> = () => {
  const { toast } = useToast();
  // const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  const [createBranchMutation] = useMutation(CREATE_BRANCH);

  const watchHeadOfficeCheck = watch("isHeadOfficeBranch");

  const onSubmit = async (data: newBranchInput) => {
    // setIsLoading(true);
    try {
      console.log(data, 
        "Checking")
        // const newProductType =  data.AllowedProductTypes!.map(
        //   (item) => item.value
        // ) 
        const input = {
          branchName: data.branchName,
          branchType: data.branchType,
          description: data.description,
          branchCode: data.branchCode,
          SWIFTCode: data.SWIFTCode,
          localBankCode: data.localBankCode,
          country: data.country,
          countrySubdivision: data.countrySubdivision,
          streetName: data.streetName,
          buildingNumber: data.buildingNumber,
          buildingName: data.buildingName,
          postalAddress: data.postalAddress,
          // AllowedProductTypes: newProductType,
          email: data.email,
          isHeadOfficeBranch: data.isHeadOfficeBranch === "yes" ? true : false,
          headOfficeBranch: data.headOfficeBranch || "",
        }
        console.log(input);
      const response = await createBranchMutation({
        variables: input
      });

      console.log("Created Branch Data:", response);

      toast({
        title: "Branch Created",
        description: "The branch has been successfully created.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error creating branch:", error);
      setErrorMessage("Error creating branch. Please try again later.");
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (watchHeadOfficeCheck === "yes") {
      unregister("headOfficeBranch");
    } else {
      register("headOfficeBranch");
    }
  }, [watchHeadOfficeCheck, unregister, register]);

  return (
    <><div>
      {Object.keys(errors).length > 0 && (
        <div className="mt-6 text-white bg-red-600 border-4 border-red-700 alert-start">
          <div className="flex items-center justify-between px-4 py-2 bg-red-700">
            <div>
              <p>The following errors have occurred:</p>
            </div>

            <div className="cursor-pointer">
              <XIcon className="w-6 h-6 text-white alert-close" />
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="flex flex-col gap-2">
              {Object.entries(errors).map(([index, error]) => (
                <div className="flex flex-col gap-y-6 sm:gap-x-8" key={index}>
                  <p>&bull; {error.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
  
    </div><section className="">
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
                {...register("branchName", { required: true })} />
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
                      <SelectItem key={1} value="62ae49bd-b2f5-4daf-b7e2-6b8f16785edc">Full Service</SelectItem>
                      <SelectItem key={2} value="62ae49bd-b2f5-4daf-b7e2-6b8f16785edc">Limited Service</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
              {errors.branchType && (
                <span className="text-red-500">
                  {errors.branchType.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                {...register("description", { required: true })} />
              {errors.description && (
                <span className="text-red-500">{errors.description.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="branchCode">Branch Code</Label>
              <Input
                id="branchCode"
                type="text"
                {...register("branchCode", { required: true })} />
              {errors.branchCode && (
                <span className="text-red-500">{errors.branchCode.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="SWIFTCode">SWIFT Code</Label>
              <Input
                id="SWIFTCode"
                type="text"
                {...register("SWIFTCode", { required: true })} />
              {errors.SWIFTCode && (
                <span className="text-red-500">{errors.SWIFTCode.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="localBankCode">Local Bank Code</Label>
              <Input
                id="localBankCode"
                type="text"
                {...register("localBankCode", { required: true })} />
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
                {...register("country", { required: true })} />
              {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="countrySubdivision">Country Subdivision</Label>
              <Input
                id="countrySubdivision"
                type="text"
                {...register("countrySubdivision", { required: true })} />
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
                {...register("streetName", { required: true })} />
              {errors.streetName && (
                <span className="text-red-500">{errors.streetName.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="buildingNumber">Building Number</Label>
              <Input
                id="buildingNumber"
                type="text"
                {...register("buildingNumber", { required: true })} />
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
                {...register("buildingName", { required: true })} />
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
                {...register("postalAddress", { required: true })} />
              {errors.postalAddress && (
                <span className="text-red-500">
                  {errors.postalAddress.message}
                </span>
              )}
            </div>
            {/* <div>
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
                    onChange={onChange} />
                )} />
              {errors.AllowedProductTypes && (
                <span className="text-red-500">
                  {errors.AllowedProductTypes.message}
                </span>
              )}
            </div> */}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                {...register("email", { required: true })} />
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
                )} />
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
                    {...register("headOfficeBranch", { required: true })} />
                  {errors.headOfficeBranch && (
                    <span className="text-red-500">
                      {errors.headOfficeBranch.message}
                    </span>
                  )}
                </>
              ) : null}
            </div>

          </div>
          {errorMessage && (
            <span className="text-center text-red-500">{errorMessage}</span>
          )}
          <div className="flex gap-2">
            <Button
              type="submit"
              size="lg"
              className="bg-[#36459C] hover:bg-[#253285]"
            >
             Submit
            </Button>
            <Button size="lg">
              Cancel
            </Button>
          </div>
        </form>
      </section></>
  );
};

export default NewBranchForm;
