/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_BRANCH } from "@/components/branch-list/mutation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import queryBranchList from "@/components/branch-list/query";
import queryBranchTypesList from "@/components/branch-types/query";




export const newBranchSchema = z.object({
  branchId: z.string(),
  branchName: z.string(),
  branchType: z.string(),
  description: z.string(),
  branchCode: z.string(),
  SWIFTCode: z.string().optional(),
  localBankCode: z.string(),
  country: z.string(),
  countrySubdivision: z
    .string(),
  streetName: z.string(),
  buildingNumber: z.string(),
  buildingName: z.string(),
  postalAddress: z.string(),
  // AllowedProductTypes: z
  //   .array(z.object({ value: z.string(), label: z.string() }))
  //   .min(1, { message: "At least one product type is required" }).optional(),
  email: z.string(),
  phoneNumber: z.string(),
  isHeadOfficeBranch: z.enum(["yes", "no"]),
  headOfficeBranch: z
    .string().optional(),
});

type newBranchInput = z.infer<typeof newBranchSchema>;

interface NewBranchFormProps {}

const UpdateBranchForm: FC<NewBranchFormProps> = () => {
    const { branchId } = useParams<{ branchId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFormModified, setIsFormModified] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<newBranchInput>({
    resolver: zodResolver(newBranchSchema),
  });

  const [updateBranchMutation] = useMutation(UPDATE_BRANCH);

  const watchHeadOfficeCheck = watch("isHeadOfficeBranch");
  const [branchTypes, setBranchTypes] = useState<any[]>([]);
  
  const { data: branchData, loading: branchLoading } = useQuery(
    queryBranchList,
    {
      variables: { branchId }, // Pass branchTypeId as a variable to the query
    }
  );

  const onSubmit = async (data: newBranchInput) => {
    try {
      console.log(data, 
        "Checking")
        const input = {
          branchId: data.branchId,
          branchName: data.branchName,
          branchType: data.branchType,
          description: data.description || "N/A",
          branchCode: data.branchCode,
          phoneNumber: data.phoneNumber,
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
          headOfficeBranch: data.headOfficeBranch,
        }
        console.log(input);
      const response = await updateBranchMutation({
        variables: input
      });

      console.log("Updated Branch Data:", response);
      reset();
      navigate("/administration/branches"); 
    
      toast({
        title: "Branch Updated",
        description: (
            <div className="text-black">
              <div className="text-lg">
                Branch {data.branchName}, has been successfully updated
              </div>
            </div>
          ),
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

  const branch = branchData?.branches.find(
    (branch: { branchId: string | undefined }) =>
      branch.branchId === branchId
  );

  useEffect(() => {
    if (!branchLoading && branch) {
      const {branchId,
        branchName,
        branchType,
        description,
        phoneNumber,
        branchCode,
        SWIFTCode,
        localBankCode,
        country,
        countrySubdivision,
        streetName,
        buildingNumber,
        buildingName,
        postalAddress,
        email,
        isHeadOfficeBranch,
        headOfficeBranch,
      } = branch;
      setValue("branchId", branchId);
      setValue("branchName", branchName || "");
      setValue("branchType", branchType || "");
      setValue("description", description || "");
      setValue("phoneNumber", phoneNumber || "");
      setValue("branchCode", branchCode || "");
      setValue("SWIFTCode", SWIFTCode || "");
      setValue("localBankCode", localBankCode || "");
      setValue("country", country || "");
      setValue("countrySubdivision", countrySubdivision || "");
      setValue("streetName", streetName || "");
      setValue("buildingNumber", buildingNumber || "");
      setValue("buildingName", buildingName || "");
      setValue("postalAddress", postalAddress || "");
      setValue("email", email || "");
      setValue("isHeadOfficeBranch", isHeadOfficeBranch || true);
      setValue("headOfficeBranch", headOfficeBranch || "");



    }
  }, [branch, branchLoading, setValue]);

  useEffect(() => {
    const handleFormChange = () => {
      setIsFormModified(true);
    };

    window.addEventListener("input", handleFormChange);

    return () => {
      window.removeEventListener("input", handleFormChange);
    };
  }, []);

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(queryBranchTypesList);


  useEffect(() => {
    if (data) {
      setBranchTypes(data.branchTypes);
      // setBranches(data.branches);
    }
  }, [data, queryLoading, queryError]);


  return (
    <section className="w-1/2 px-4">
    <div className="flex items-center justify-between my-4">
     <div className=""><h1 className="text-4xl text-[#36459C]"> Edit Branch</h1></div>
   </div>
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
                defaultValue={branch?.branchName}
                />
              {errors.branchName && (
                <span className="text-red-500">{errors.branchName.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="branchTypes">Branch Types</Label>
              <Controller
                  defaultValue={branch?.branchTypeName}
                  control={control}
                  name="branchType"
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Branch Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {branchTypes.map((type) => (
                          <SelectItem
                            key={type.branchTypeId}
                            value={type.branchTypeId}
                          >
                            {type.branchTypeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                {...register("description", { required: true })}
                defaultValue={branch?.description} />
            </div>
            <div>
              <Label htmlFor="branchCode">Branch Code</Label>
              <Input
                id="branchCode"
                type="number"
                {...register("branchCode", { required: true })}
                defaultValue={branch?.branchCode} />
            </div>
            <div>
              <Label htmlFor="SWIFTCode">SWIFT Code</Label>
              <Input
                id="SWIFTCode"
                type="text"
                {...register("SWIFTCode", { required: true })}
                defaultValue={branch?.SWIFTCode} />
            </div>
            <div>
              <Label htmlFor="localBankCode">Local Bank Code</Label>
              <Input
                id="localBankCode"
                type="number"
                {...register("localBankCode", { required: true })}
                defaultValue={branch?.localBankCode} />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                {...register("country", { required: true })}
                defaultValue={branch?.country} />
            </div>
            <div>
              <Label htmlFor="countrySubdivision">Country Subdivision</Label>
              <Input
                id="countrySubdivision"
                type="text"
                {...register("countrySubdivision", { required: true })}
                defaultValue={branch?.countrySubdivision} />
            </div>
            <div>
              <Label htmlFor="streetName">Street Name</Label>
              <Input
                id="streetName"
                type="text"
                {...register("streetName", { required: true })}
                defaultValue={branch?.streetName} />
            </div>
            <div>
              <Label htmlFor="buildingNumber">Building Number</Label>
              <Input
                id="buildingNumber"
                type="text"
                {...register("buildingNumber", { required: true })}
                defaultValue={branch?.buildingNumber} />
            </div>
            <div>
              <Label htmlFor="buildingName">Building Name</Label>
              <Input
                id="buildingName"
                type="text"
                {...register("buildingName", { required: true })}
                defaultValue={branch?.buildingName} />
            </div>
            <div>
              <Label htmlFor="postalAddress">Postal Address</Label>
              <Input
                id="postalAddress"
                type="text"
                {...register("postalAddress", { required: true })}
                defaultValue={branch?.postalAddress} />
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
                {...register("email", { required: true })}
                defaultValue={branch?.email} />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="+254722XXXXXX"
                {...register("phoneNumber", { required: true })}
                defaultValue={branch?.phoneNumber} />
            </div>
            <div>
              <Label htmlFor="isHeadOfficeBranch">Is Head Office Branch</Label>
              <Controller
                defaultValue={branch?.isHeadOfficeBranch || true}
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
                    {...register("headOfficeBranch", { required: true })}
                    defaultValue={branch?.isHeadOfficeBranch || false} />
                  {/* <Controller
                  control={control}
                  name="headOfficeBranch"
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((type) => (
                          <SelectItem
                            key={type.branchId}
                            value={type.branchId}
                          >
                            {type.branchName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                /> */}
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
              disabled={!isFormModified}
              >
                Update
            </Button>
            <Button size="lg">
              Cancel
            </Button>
          </div>
        </form>
      </section>
  );
};

export default UpdateBranchForm;
