/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PRODUCT_TYPE_MUTATION,
  UPDATE_PRODUCT_TYPE_MUTATION,
} from "@/Pages/Products/ProductMutation";
import { Link, useNavigate, useParams } from "react-router-dom";
import queryFeeTypesList from "./fee-type-list/query";
import { useProductTypeState } from "@/store/productTypeState";
import queryProductList from "./product-type-list/query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const productTypeSchema = z.object({
  productTypeId: z.string().optional(),
  productTypeName: z
    .string()
    .min(3, { message: "Product Type Name is required" }),
  description: z
    .string()
    .min(3, { message: "Product Type Description is required" }),
  active: z.boolean().optional(),
  interestBearing: z.boolean().optional(),
  fixedInterestRate: z
    .string()
    .min(1, { message: "Fixed Interest Rate is required" }),
  effectiveDate: z.string().min(3, { message: "Effective Date is required" }),
  fees: z.boolean().optional(),
  feeTypes: z.string().min(3, { message: "Fee Types is required" }),
  riskRating: z.string().min(1, { message: "Risk Rating is required" }),
  prefix: z.string().min(1, { message: "Prefix is required" }),
  numberSchema: z.string().min(3, { message: "Number Schema is required" }),
  startingValue: z
    .string()
    .min(1, { message: "Account Number Starting Value is required" }),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),
  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type ProductTypeInput = z.infer<typeof productTypeSchema>;

interface NewProductTypeFormProps {}

const NewProductTypeForm: FC<NewProductTypeFormProps> = () => {
  const { productTypeId } = useParams<{ productTypeId: string }>();
  const { state, setState } = useProductTypeState();
  const isCopyMode = !state;
  const formMode = state?.mode;
  console.log(state, formMode, "Form");
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log(isCopyMode, "Copy Mode");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductTypeInput>({
    resolver: zodResolver(productTypeSchema),
  });

  const [createProductTypeMutation] = useMutation(CREATE_PRODUCT_TYPE_MUTATION);
  const [updateProductTypeMutation] = useMutation(UPDATE_PRODUCT_TYPE_MUTATION);

  const [feeTypes, setfeeTypes] = useState<any[]>([]);
  const [interestBearing, setInterestBearing] = useState(false);
  const [active, setActive] = useState(false);

  const handleInterestBearingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInterestBearing(e.target.checked);
  };

  const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.checked);
  };

  const { data: productTypeData, loading: productTypeLoading } = useQuery(
    queryProductList,
    {
      variables: { productTypeId }, // Pass productTypeId as a variable to the query
    }
  );

  const handleCreate = async (data: ProductTypeInput) => {
    console.log(data);
    try {
      await createProductTypeMutation({
        variables: {
          productTypeName: data.productTypeName,
          description: data.description,
          active: data.active || true,
          interestBearing: data.interestBearing || true,
          fixedInterestRate: data.fixedInterestRate,
          effectiveDate: data.effectiveDate,
          fees: data.fees,
          feeTypes: data.feeTypes,
          riskRating: data.riskRating,
          prefix: data.prefix,
          numberSchema: data.numberSchema,
          startingValue: data.startingValue,
          modifiedBy: "tester",
          modifiedOn: data.modifiedOn,
        },
      });
      toast({
        title: "Product Type Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              New Product Type{" "}
              <Link
                to={`/administration/products/product-types`}
                className="text-blue-500 underline"
              >
                {data.productTypeName}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/products/product-types");
    } catch (error: any) {
      const errorMessage =
        (error.graphQLErrors &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.response &&
          error.graphQLErrors[0].extensions.response.body &&
          error.graphQLErrors[0].extensions.response.body.startingValue) ||
        "Unknown error";

      toast({
        title: "Error",
        description: `"Failed, ${errorMessage} Please try again."`,
        variant: "destructive",
      });
    }
  };
  const handleEdit = async (data: ProductTypeInput) => {
    console.log(data);
    try {
      await updateProductTypeMutation({
        variables: {
          productTypeId: data.productTypeId,
          productTypeName: data.productTypeName,
          description: data.description,
          active: data.active,
          interestBearing: data.interestBearing,
          fixedInterestRate: data.fixedInterestRate,
          effectiveDate: data.effectiveDate,
          fees: data.fees,
          feeTypes: data.feeTypes,
          riskRating: data.riskRating,
          prefix: data.prefix,
          numberSchema: data.numberSchema,
          startingValue: data.startingValue,
          modifiedBy: data.modifiedBy,
          modifiedOn: data.modifiedOn,
        },
      });
      toast({
        title: "Product Type Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Product Type{" "}
              <Link
                to={`/administration/products/product-types`}
                className="text-blue-500 underline"
              >
                {data.productTypeName}
              </Link>
              , has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/products/product-types");
    } catch (error: any) {
      const errorMessage =
        (error.graphQLErrors &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.response &&
          error.graphQLErrors[0].extensions.response.body &&
          error.graphQLErrors[0].extensions.response.body.startingValue) ||
        "Unknown error";

      toast({
        title: "Error",
        description: `"Failed, ${errorMessage} Please try again."`,
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: ProductTypeInput) => {
    if (formMode === "ADD" || formMode === "COPY") {
      handleCreate(data);
    } else if (formMode === "EDIT") {
      console.log("edit mode");
      handleEdit(data);
    }
  };

  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );
  useEffect(() => {
    setDefaultModifiedOn(new Date().toISOString());
  }, []);

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(queryFeeTypesList);

  useEffect(() => {
    if (data) {
      setfeeTypes(data.feeTypes);
    }
  }, [data, queryLoading, queryError]);

  const productType = productTypeData?.productTypes.find(
    (productType: { productTypeId: string | undefined }) =>
      productType.productTypeId === productTypeId
  );

  useEffect(() => {
    if (formMode === "COPY" && state) {
      const {
        productTypeName,
        description,
        active,
        interestBearing,
        fixedInterestRate,
        effectiveDate,
        fees,
        feeTypes,
        riskRating,
        prefix,
        numberSchema,
        startingValue,
      } = state;
      setValue("productTypeName", productTypeName);
      setValue("description", description);
      setValue("active", active);
      setValue("interestBearing", interestBearing);
      setValue("fixedInterestRate", fixedInterestRate);
      setValue(
        "effectiveDate",
        effectiveDate ? effectiveDate.split("T")[0] : ""
      ); // Format the effectiveDate here
      setValue("fees", fees);
      setValue("feeTypes", feeTypes.toString());
      setValue("riskRating", riskRating);
      setValue("prefix", prefix);
      setValue("numberSchema", numberSchema);
      setValue("startingValue", startingValue.toString());
    } else if (formMode === "EDIT") {
      if (!productTypeLoading && productType && state) {
        const {
          productTypeId,
          productTypeName,
          description,
          active,
          interestBearing,
          fixedInterestRate,
          effectiveDate,
          fees,
          feeTypes,
          riskRating,
          prefix,
          numberSchema,
          startingValue,
          modifiedBy,
          modifiedOn,
        } = productType;
        setValue("productTypeId", productTypeId);
        setValue("productTypeName", productTypeName);
        setValue("description", description);
        setValue("active", active);
        setValue("interestBearing", interestBearing);
        setValue("fixedInterestRate", fixedInterestRate);
        setValue(
          "effectiveDate",
          effectiveDate ? effectiveDate.split("T")[0] : ""
        ); // Format the effectiveDate here
        setValue("fees", fees);
        setValue("feeTypes", feeTypes);
        setValue("riskRating", riskRating);
        setValue("prefix", prefix);
        setValue("numberSchema", numberSchema);
        setValue("startingValue", startingValue);
        setValue("modifiedBy", modifiedBy || "tester");
        setValue("modifiedOn", modifiedOn || "");
      }
    }
  }, [formMode, productType, productTypeLoading, setValue, setState, state]);

  const cancelForm = () => {
    setState({
      productTypeId: "",
      productTypeName: "",
      description: "",
      active: false,
      interestBearing: false,
      fixedInterestRate: "",
      effectiveDate: "",
      fees: false,
      feeTypes: [""],
      riskRating: "",
      prefix: "",
      numberSchema: "",
      startingValue: 0,
    });
    toast({
      title: "Product Type Form Cancelled",
    });
  };

  return (
    <section>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 w-[30%]">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                placeholder="active"
                checked={active}
                onChange={handleActiveChange}
                className="flex w-4 h-4"
              />
              <label>Active</label>
            </div>
            {errors.active && (
              <span className="text-sm text-red-500">
                {errors.active.message}
              </span>
            )}
          </div>
          <div>
            <Label>Product Type Name</Label>
            <Input
              type="text"
              placeholder="Product Type Name"
              {...register("productTypeName")}
            />
            {errors.productTypeName && (
              <span className="text-sm text-red-500">
                {errors.productTypeName.message}
              </span>
            )}
          </div>
          <div>
            <Label>Product Type Description</Label>
            <Input
              type="text"
              placeholder="Product Type Description"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                placeholder="interestBearing"
                checked={interestBearing}
                onChange={handleInterestBearingChange} // Handle interestBearing checkbox change
                className="flex w-4 h-4"
              />
              <label>Interest Bearing?</label>
            </div>
            {errors.interestBearing && (
              <span className="text-sm text-red-500">
                {errors.interestBearing.message}
              </span>
            )}
          </div>
          <div className="flex w-full gap-2">
            <div className="w-full">
              <Label>Fixed Interest Rate</Label>
              <Input
                type="number"
                placeholder="Fixed Interest Rate"
                {...register("fixedInterestRate")}
              />
              {errors.fixedInterestRate && (
                <span className="text-sm text-red-500">
                  {errors.fixedInterestRate.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <Label>Effective Date</Label>
              <Input
                type="date"
                placeholder="Effective Date"
                {...register("effectiveDate")}
              />
              {errors.effectiveDate && (
                <span className="text-sm text-red-500">
                  {errors.effectiveDate.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
            <input
              type="checkbox"
              placeholder="fees"
              {...register("fees")}
              className="flex w-4 h-4"
            />
            <label>Fees?</label>
            </div>

            {errors.fees && (
              <span className="text-sm text-red-500">
                {errors.fees.message}
              </span>
            )}
          </div>
          <div>
            <Label>Fee Types</Label>
            <Controller
              control={control}
              name="feeTypes"
              render={({ field: { onChange, value } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fee Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {feeTypes.map((type) => (
                      <SelectItem
                        key={type.feeTypeId}
                        value={type.feeTypeId}
                      >
                        {type.feeTypeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.feeTypes && (
              <span className="text-sm text-red-500">
                {errors.feeTypes.message}
              </span>
            )}
          </div>

          <div>
            <Label>Risk Rating</Label>
            <Controller
              control={control}
              name="riskRating"
              render={({ field: { onChange, value } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ..." />
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
              <span className="text-sm text-red-500">
                {errors.riskRating.message}
              </span>
            )}
          </div>
          <div>
            <Label>Prefix</Label>
            <Input type="text" placeholder="Prefix" {...register("prefix")} />
            {errors.prefix && (
              <span className="text-sm text-red-500">
                {errors.prefix.message}
              </span>
            )}
          </div>
          <div>
            <Label>Number Schema</Label>
            <Input
              type="text"
              placeholder="Number Schema"
              {...register("numberSchema")}
            />
            {errors.numberSchema && (
              <span className="text-sm text-red-500">
                {errors.numberSchema.message}
              </span>
            )}
          </div>
          <div>
            <Label>Account Number Starting Value</Label>
            <Input
              type="text"
              placeholder="starting Value"
              {...register("startingValue")}
            />
            {errors.startingValue && (
              <span className="text-sm text-red-500">
                {errors.startingValue.message}
              </span>
            )}
          </div>
          <div className="hidden">
            <Label htmlFor="modifiedBy" className="text-[#36459C] text-base">
              Modified By
            </Label>
            <Input
              {...register("modifiedBy")}
              placeholder="Modified By"
              type="text"
              className="h-12 text-base bg-blue-50"
              autoComplete="false"
              defaultValue={"User"}
            />
            {errors.modifiedBy && (
              <span className="text-red-500">{errors.modifiedBy.message}</span>
            )}
          </div>
          <div className="hidden">
            <Label htmlFor="modifiedOn" className="text-[#36459C] text-base">
              Modified On
            </Label>
            <Input
              {...register("modifiedOn")}
              placeholder="Modified On (YYYY-MM-DDTHH:MM:SSZ)"
              type="text"
              className="h-12 text-base bg-blue-50"
              autoComplete="false"
              defaultValue={defaultModifiedOn}
            />
            {errors.modifiedOn && (
              <span className="text-red-500">{errors.modifiedOn.message}</span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" size="lg" className="">
            Submit
          </Button>
          <Link to={`/administration/products/product-types`}>
            <Button size="lg" onClick={cancelForm}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewProductTypeForm;
