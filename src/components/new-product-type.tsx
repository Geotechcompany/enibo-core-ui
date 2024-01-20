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


const productTypeSchema = z.object({
  productTypeCode: z
    .string()
    .min(3, { message: "Product Type Code is required" }),
  productTypeName: z
    .string()
    .min(3, { message: "Product Type Name is required" }),
  productTypeDescription: z
    .string()
    .min(3, { message: "Product Type Description is required" }),
  activeFlag: z.boolean(),
  interestBearing: z.boolean(),
  fixedInterestRate: z
    .number()
    .min(1, { message: "Fixed Interest Rate is required" }),
  effectiveDate: z.string().min(3, { message: "Effective Date is required" }),
  fees: z.boolean(),
  feeTypes: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "Fee Types is required" }),
  riskRating: z.string().min(3, { message: "Risk Rating is required" }),
  prefix: z.string().min(3, { message: "Prefix is required" }),
  numberSchema: z.string().min(3, { message: "Number Schema is required" }),
  accountNumberStartingValue: z
    .number()
    .min(1, { message: "Account Number Starting Value is required" }),
});

type ProductTypeInput = z.infer<typeof productTypeSchema>;

interface NewProductTypeFormProps {}

const NewProductTypeForm: FC<NewProductTypeFormProps> = () => {
  const { toast } = useToast();
  const {
    register,
    unregister,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductTypeInput>({
    resolver: zodResolver(productTypeSchema),
  });

  const watchInterestBearing = watch("interestBearing");
  const watchFees = watch("fees");

  const onSubmit = handleSubmit((data) => {
    toast({
      title: "Product Type Created",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  });

  useEffect(() => {
    if (watchInterestBearing) {
      register("fixedInterestRate");
    } else {
      unregister("fixedInterestRate");
    }
    if (watchFees) {
      register("feeTypes");
    } else {
      unregister("feeTypes");
    }
  }, [register, unregister, watchInterestBearing, watchFees]);

  return (
    <section>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 w-[30%]">
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
              {...register("productTypeDescription")}
            />
            {errors.productTypeDescription && (
              <span className="text-sm text-red-500">
                {errors.productTypeDescription.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                placeholder="Active Flag"
                {...register("activeFlag")}
                className="flex w-4 h-4"
              />
              <Label>Active?</Label>
            </div>
            {errors.activeFlag && (
              <span className="text-sm text-red-500">
                {errors.activeFlag.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                placeholder="Interest Bearing"
                {...register("interestBearing")}
                className="flex w-4 h-4"
              />
              <Label>Is Interest Bearing?</Label>
            </div>
            {errors.interestBearing && (
              <span className="text-sm text-red-500">
                {errors.interestBearing.message}
              </span>
            )}
          </div>
          {watchInterestBearing && (
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
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                placeholder="Fees"
                {...register("fees")}
                className="flex w-4 h-4"
              />
              <Label>Has Fees?</Label>
            </div>
            {errors.fees && (
              <span className="text-sm text-red-500">
                {errors.fees.message}
              </span>
            )}
          </div>
          {watchFees && (
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
          )}

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
              type="number"
              placeholder="Account Number Starting Value"
              {...register("accountNumberStartingValue")}
            />
            {errors.accountNumberStartingValue && (
              <span className="text-sm text-red-500">
                {errors.accountNumberStartingValue.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" size="lg" className="">
            Submit
          </Button>
          <Button variant="outline" size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewProductTypeForm;
