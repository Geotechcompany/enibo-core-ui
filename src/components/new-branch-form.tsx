/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { useMutation, useQuery } from "@apollo/client";
import {CREATE_BRANCH, UPDATE_BRANCH} from "./branch-list/mutation";
import { Link, useNavigate, useParams } from "react-router-dom";
import queryBranchTypesList from "@/components/branch-types/query";
import { useBranchState } from "@/store/branchstate";
import queryBranchList from "./branch-list/query";
// import queryBranchList from "@/components/branch-list/query";



export const newBranchSchema = z.object({
  branchId: z.string().optional(),
  branchName: z.string().min(3, { message: "Branch name is required" }),
  branchType: z.string().min(3, { message: "Branch type is required" }),
  description: z.string(),
  branchCode: z.string(),
  SWIFTCode: z.string().optional(),
  localBankCode: z.string(),
  country: z.string().min(3, { message: "Country is required" }),
  countrySubdivision: z
    .string()
    .min(3, { message: "Country subdivision is required" }),
  streetName: z.string().min(3, { message: "Street name is required" }),
  buildingNumber: z.string(),
  buildingName: z.string().min(3, { message: "Building name is required" }),
  postalAddress: z.string().min(3, { message: "Postal address is required" }),
  // AllowedProductTypes: z
  //   .array(z.object({ value: z.string(), label: z.string() }))
  //   .min(1, { message: "At least one product type is required" }).optional(),
  email: z.string().email({ message: "Email is required" }),
  phoneNumber: z.string().min(3, { message: "Phone Number is required" }),
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
  const { branchId } = useParams<{ branchId: string }>();
  const { state, setState } = useBranchState();
  const isCopyMode = !state;
  const formMode = state?.mode
  console.log(state, formMode, "Form")
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log(isCopyMode, "Copy Mode");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<newBranchInput>({
    resolver: zodResolver(newBranchSchema),
  });

  const [createBranchMutation] = useMutation(CREATE_BRANCH);
  const [updateBranchMutation] = useMutation(UPDATE_BRANCH);

  const { data: branchData, loading: branchLoading } = useQuery(
    queryBranchList,
    {
      variables: { branchId }, // Pass branchId as a variable to the query
    }
  );

  const watchHeadOfficeCheck = watch("isHeadOfficeBranch");
  const [branchTypes, setBranchTypes] = useState<any[]>([]);
  // const [branches, setBranches] = useState<any[]>([]);  


  const handleEdit = async (data: newBranchInput) => {
    try {
      console.log(data, 
        "Checking")
        const input = {
          branchId: data.branchId,
          branchName: data.branchName,
          branchType: data.branchType,
          description: data.description,
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


  const handleCreate = async (data: newBranchInput) => {
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
          headOfficeBranch: data.headOfficeBranch ? data.headOfficeBranch : "N/A",
        }
        console.log(input);
      const response = await createBranchMutation({
        variables: input
      });

      console.log("Created Branch Data:", response);
      reset();
      navigate("/administration/branches"); 
    
      toast({
        title: "Branch Created",
        description: <div className="text-black">
        <div className="text-lg">
          New Branch{" "}
          <Link to={`/administration/branches`} className="underline text-blue-500">
            {data.branchName}
          </Link>
          , has been successfully created
        </div>
      </div>,
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

  const onSubmit = async (data: newBranchInput) => {
    if(formMode  === "ADD" || formMode === "COPY") {
     handleCreate(data);
    } else if(formMode === "EDIT") {
     console.log('edit mode')
     handleEdit(data);
    }
 };

 const branch = branchData?.branches.find(
  (branch: { branchId: string | undefined }) =>
    branch.branchId === branchId
);

useEffect(() => {
  if (formMode === "COPY" && state) {
    const {
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
    } = state;
    setValue("branchName", branchName);
    setValue("branchType", branchType);
    setValue("description", description);
    setValue("phoneNumber", phoneNumber);
    setValue("branchCode", branchCode);
    setValue("SWIFTCode", SWIFTCode);
    setValue("localBankCode", localBankCode);
    setValue("country", country);
    setValue("countrySubdivision", countrySubdivision);
    setValue("streetName", streetName);
    setValue("buildingNumber", buildingNumber);
    setValue("buildingName", buildingName);
    setValue("postalAddress", postalAddress);
    setValue("email", email);
    setValue("isHeadOfficeBranch", isHeadOfficeBranch ? "yes" : "no");
    setValue("headOfficeBranch", headOfficeBranch  || "");
  } else if (formMode === "EDIT") {
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
      setValue("isHeadOfficeBranch", isHeadOfficeBranch || false);
      setValue("headOfficeBranch", headOfficeBranch || "N/A");

    }
  } else return;
  
}, [formMode, reset, setValue, state, setState, branchLoading, branch]);
  
const cancelForm = () =>{
  setState({
    branchId: "",
    branchName: "",
    branchType: "",
    description: "",
    phoneNumber: "",
    branchCode: "",
    SWIFTCode: "",
    localBankCode: "",
    country: "",
    countrySubdivision: "",
    streetName: "",
    buildingNumber: "",
    buildingName: "",
    postalAddress: "",
    email: "",
    isHeadOfficeBranch: false,
    headOfficeBranch: "",
 });
  toast({
    title: "Branch Form Cancelled",
  })
}


return (
  <><div>
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
              type="number"
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
              type="number"
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
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="+254722XXXXXX"
              {...register("phoneNumber", { required: true })} />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber.message}</span>
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
          >
           Submit
          </Button>
          <Link to={`/administration/branches`}>
            <Button
              size="lg"
              onClick={cancelForm}
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </section></>
);
};

export default NewBranchForm;
