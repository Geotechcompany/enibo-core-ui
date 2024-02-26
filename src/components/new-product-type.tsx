import { FC, useEffect, useState } from "react";
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
import { useMutation } from "@apollo/client";
import CREATE_PRODUCT_TYPE_MUTATION from "@/Pages/Products/ProductMutation";
import { Link, useNavigate } from "react-router-dom";

const productTypeSchema = z.object({
  productTypeName: z
    .string()
    .min(3, { message: "Product Type Name is required" }),
    description: z
    .string()
    .min(3, { message: "Product Type Description is required" }),
  active: z.boolean(),
  interestBearing: z.boolean(),
  fixedInterestRate: z
    .string()
    .min(1, { message: "Fixed Interest Rate is required" }),
  effectiveDate: z.string().min(3, { message: "Effective Date is required" }),
  fees: z.string(),
  feeTypes: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "Fee Types is required" }),
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
  const { toast } = useToast();
  const navigate  = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductTypeInput>({
    resolver: zodResolver(productTypeSchema),
  });

  const [createProductTypeMutation] = useMutation(CREATE_PRODUCT_TYPE_MUTATION);
  const [interestBearing, setInterestBearing] = useState(false);
  const [active, setActive] = useState(false); 

  const handleInterestBearingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestBearing(e.target.checked);
  };

  const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.checked);
  };


  const onSubmit = handleSubmit(async (data: ProductTypeInput) => {
    console.log(data)
    try {
     await createProductTypeMutation({
      variables: {
        productTypeName: data.productTypeName,
        description: data.description,
        active: true,
        interestBearing: true,
        fixedInterestRate: parseFloat(data.fixedInterestRate),
        effectiveDate: data.effectiveDate,
        fees: data.fees,
        feeTypes: [data.feeTypes],
        riskRating: data.riskRating,
        prefix: data.prefix,
        numberSchema: data.numberSchema,
        startingValue: data.startingValue,
        modifiedBy: "tester",
        modifiedOn: data.modifiedOn, 
      },
    })
        toast({
          title: "Product Type Created",
          description: <div className="text-black">
          <div className="text-lg">
            New Product Type {" "}
            <Link to={`/administration/products/product-types`} className="underline text-blue-500">
              {data.productTypeName}
            </Link>
             , has been successfully created
          </div>
        </div>,
        });
        reset();
        navigate("/administration/products/product-types"); 
      } catch (error) {
        console.error("Error creating product type:", error);
        toast({
          title: "Error",
          description: "Failed to create product type. Please try again.",
        });
      }
  });

  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );
  useEffect(() => {
    setDefaultModifiedOn(new Date().toISOString());
  }, []);
  return (
    <section>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
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
          <label>interestBearing?</label>
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
            <Label>Fees</Label>
            <Input type="text" placeholder="fees" {...register("fees")} />
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
                  <MultiSelect
                    onChange={onChange}
                    placeholder="Fee Types"
                    selected={value}
                    className="w-[451px]"
                    options={[
                      { label: "Fee Type 1", value: "fee-type-1" },
                      { label: "Fee Type 2", value: "fee-type-2" },
                      { label: "Fee Type 3", value: "fee-type-3" },
                    ]}
                  />
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
          <Button size="lg">Cancel</Button>
        </div>
      </form>
    </section>
  );
};

export default NewProductTypeForm;
