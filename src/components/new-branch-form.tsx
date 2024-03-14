/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BRANCH, UPDATE_BRANCH } from "./branch-list/mutation";
import { Link, useNavigate, useParams } from "react-router-dom";
import queryBranchTypesList from "@/components/branch-types/query";
import { useBranchState } from "@/store/branchstate";
import queryBranchList from "./branch-list/query";
import CountrySelector from "./countries/country-selector";
import { MultiSelect, OptionType } from "./multi-select";
import queryProductList from "./product-type-list/query";

const newBranchSchema = z.object({
  branchId: z.string().optional(),
  branchName: z.string().min(3, { message: "Branch name is required" }),
  branchType: z.string().min(3, { message: "Branch type is required" }),
  description: z.string(),
  branchCode: z.string(),
  SWIFTCode: z
    .string()
    .max(10, { message: "SWIFTCode should be less than 10" }),
  localBankCode: z.string(),
  country: z.string().min(3, { message: "Country is required" }),
  countrySubdivision: z
    .string()
    .min(3, { message: "Country subdivision is required" }),
  streetName: z.string().min(3, { message: "Street name is required" }),
  buildingNumber: z.string(),
  buildingName: z.string().min(3, { message: "Building name is required" }),
  postalAddress: z.string().min(3, { message: "Postal address is required" }),
  email: z.string().email({ message: "Email is required" }),
  phoneNumber: z.string().min(3, { message: "Phone Number is required" }),
  isHeadOfficeBranch: z.enum(["yes", "no"], {
    required_error: "You need to select a branch type.",
  }),
  allowedProductTypes: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "To is required" }),
  headOfficeBranch: z
    .string()
    .min(3, { message: "Head office branch is required" })
    .optional(),
});

type newBranchInput = z.infer<typeof newBranchSchema>;

interface NewBranchFormProps {}

const NewBranchForm: FC<NewBranchFormProps> = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const { state, setState } = useBranchState();
  const [productTypes, setProductTypes] = useState<OptionType[]>([]);
  const isCopyMode = !state;
  const formMode = state?.mode;
  console.log(state, formMode, "Form");
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log(isCopyMode, "Copy Mode");

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
  const { data: productTypesData } = useQuery(queryProductList);

  const watchHeadOfficeCheck = watch("isHeadOfficeBranch");
  const [branchTypes, setBranchTypes] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);

  const handleEdit = async (data: newBranchInput) => {
    try {
      const newProductType = data.allowedProductTypes.map(
        (productType: OptionType) => {
          return productType.value;
        }
      );
      const input = {
        branchId: data.branchId,
        branchName: data.branchName,
        branchType: data.branchType,
        description: data.description,
        branchCode: data.branchCode,
        phoneNumber: data.phoneNumber,
        swiftCode: data.SWIFTCode,
        localBankCode: data.localBankCode,
        country: data.country,
        countrySubdivision: data.countrySubdivision,
        streetName: data.streetName,
        buildingNumber: data.buildingNumber,
        buildingName: data.buildingName,
        postalAddress: data.postalAddress,
        allowedProductTypes: newProductType,
        email: data.email,
        isHeadOfficeBranch: data.isHeadOfficeBranch === "yes" ? true : false,
        headOfficeBranch: data.headOfficeBranch ? data.headOfficeBranch : "N/A",
      };
      const response = await updateBranchMutation({
        variables: input,
      });

      reset();
      navigate("/administration/branches");

      toast({
        title: "Branch Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Branch{" "}
              <Link
                to={`/administration/branches`}
                className="text-blue-500 underline"
              >
                {response.data.updateBranch.branchName}
              </Link>
              , has been successfully updated
            </div>
          </div>
        ),
      });
    } catch (error: any) {
      const errorMessage =
        (error.graphQLErrors &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.response &&
          error.graphQLErrors[0].extensions.response.body &&
          error.graphQLErrors[0].extensions.response.body.branchName) ||
        "Unknown error";

      toast({
        title: "Error",
        description: `"Failed ${errorMessage}. Please try again."`,
        variant: "destructive",
      });
    }
  };

  const handleCreate = async (data: newBranchInput) => {
    try {
      const newProductType = data.allowedProductTypes.map(
        (productType: OptionType) => {
          return productType.value;
        }
      );
      const input = {
        branchId: data.branchId,
        branchName: data.branchName,
        branchType: data.branchType,
        description: data.description || "N/A",
        branchCode: data.branchCode,
        phoneNumber: data.phoneNumber,
        swiftCode: data.SWIFTCode,
        localBankCode: data.localBankCode,
        country: data.country,
        countrySubdivision: data.countrySubdivision,
        streetName: data.streetName,
        buildingNumber: data.buildingNumber,
        buildingName: data.buildingName,
        postalAddress: data.postalAddress,
        allowedProductTypes: newProductType,
        email: data.email,
        isHeadOfficeBranch: data.isHeadOfficeBranch === "yes" ? true : false,
        headOfficeBranch: data.headOfficeBranch ? data.headOfficeBranch : "N/A",
      };

      const response = await createBranchMutation({
        variables: input,
      });
      reset();
      navigate("/administration/branches");

      toast({
        title: "Branch Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              New Branch{" "}
              <Link
                to={`/administration/branches`}
                className="text-blue-500 underline"
              >
                {response.data.createBranch.branchName}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });
    } catch (error: any) {
      const errorMessage =
        (error.graphQLErrors &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.response &&
          error.graphQLErrors[0].extensions.response.body &&
          error.graphQLErrors[0].extensions.response.body.branchName) ||
        "Unknown error";

      console.log(errorMessage, "ERR CHECK");
      toast({
        title: "Error",
        description: `"Failed, ${errorMessage} Please try again."`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (productTypesData) {
      setProductTypes(
        productTypesData.productTypes.map(
          (productType: {
            productTypeId: string;
            productTypeName: string;
          }) => ({
            value: productType.productTypeId,
            label: productType.productTypeName,
          })
        )
      );
    }
  }, [productTypesData]);

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
    if (formMode === "ADD" || formMode === "COPY") {
      handleCreate(data);
    } else if (formMode === "EDIT") {
      console.log("edit mode");
      handleEdit(data);
    }
  };

  const branch = branchData?.branches.find(
    (branch: { branchId: string | undefined }) => branch.branchId === branchId
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
      setValue("headOfficeBranch", headOfficeBranch || "");
    } else if (formMode === "EDIT") {
      if (!branchLoading && branch) {
        const {
          branchId,
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
        setValue("isHeadOfficeBranch", isHeadOfficeBranch ? "yes" : "no");
        setValue(
          "headOfficeBranch",
          headOfficeBranch ? headOfficeBranch : "N/A"
        );
      }
    } else return;
  }, [formMode, reset, setValue, state, setState, branchLoading, branch]);

  const cancelForm = () => {
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
    });
  };

  useEffect(() => {
    if (branchData) {
      setBranches(branchData.branches);
    }
  }, [branchData, branchLoading]);

  return (
    <>
      <div></div>
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
                <span className="text-red-500">
                  {errors.branchName.message}
                </span>
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
                      <SelectValue
                        placeholder="Select Branch Type"
                        defaultValue={value}
                      />
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
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="branchCode">Branch Code</Label>
              <Input
                id="branchCode"
                type="number"
                {...register("branchCode", { required: true })}
              />
              {errors.branchCode && (
                <span className="text-red-500">
                  {errors.branchCode.message}
                </span>
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
                type="number"
                {...register("localBankCode", { required: true })}
              />
              {errors.localBankCode && (
                <span className="text-red-500">
                  {errors.localBankCode.message}
                </span>
              )}
            </div>
            <div>
              <Label>Allowed Product Types</Label>
              <Controller
                name="allowedProductTypes"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    options={productTypes}
                    onChange={onChange}
                    selected={value}
                    placeholder="Select..."
                    className="w-full"
                  />
                )}
              />
              {errors.allowedProductTypes && (
                <span className="text-red-500">
                  {errors.allowedProductTypes.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <CountrySelector control={control} name="country" />
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
                <span className="text-red-500">
                  {errors.streetName.message}
                </span>
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
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="+254722XXXXXX"
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <span className="text-red-500">
                  {errors.phoneNumber.message}
                </span>
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
                  <Controller
                    control={control}
                    name="headOfficeBranch"
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches
                            .filter((branch) => !branch.isHeadOfficeBranch) // Filter out branches where isHeadOfficeBranch is false
                            .map((branch) => (
                              <SelectItem
                                key={branch.branchName}
                                value={branch.branchName}
                              >
                                {branch.branchName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
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
          {/* {errorMessage && (
          <span className="text-center text-red-500">{errorMessage}</span>
        )} */}
          <div className="flex gap-2">
            <Button
              type="submit"
              size="lg"
              className="bg-[#36459C] hover:bg-[#253285]"
            >
              Submit
            </Button>
            <Link to={`/administration/branches`}>
              <Button size="lg" onClick={cancelForm}>
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewBranchForm;
