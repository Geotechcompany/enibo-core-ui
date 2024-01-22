import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "./multi-select";
import { useToast } from "./ui/use-toast";

const transactionTypeSchema = z.object({
  transactionTypeName: z
    .string()
    .min(3, { message: "Transaction Type Name is required" }),
  transactionTypeCode: z
    .string()
    .min(3, { message: "Transaction Type Code is required" }),
  transactionTypeDescription: z
    .string()
    .min(3, { message: "Description is required" }),
  currency: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(3, { message: "Currency is required" }),
});

type TransactionType = z.infer<typeof transactionTypeSchema>;

interface NewTransactionTypeFormProps {}

const NewTransactionTypeForm: FC<NewTransactionTypeFormProps> = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TransactionType>({
    resolver: zodResolver(transactionTypeSchema),
  });

  const onSubmit = (data: TransactionType) => {
    toast({
      title: "Transaction Type Created",
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
        <div className="grid grid-cols-1 gap-4 w-[30%]">
          <div>
            <Label htmlFor="transactionTypeName">Transaction Type Name</Label>
            <Input
              id="transactionTypeName"
              type="text"
              {...register("transactionTypeName", { required: true })}
            />
            {errors.transactionTypeName && (
              <div className="text-red-500">
                {errors.transactionTypeName.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="transactionTypeCode">Transaction Type Code</Label>
            <Input
              id="transactionTypeCode"
              type="text"
              {...register("transactionTypeCode", { required: true })}
            />
            {errors.transactionTypeCode && (
              <div className="text-red-500">
                {errors.transactionTypeCode.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="transactionTypeDescription">Description</Label>
            <Input
              id="transactionTypeDescription"
              type="text"
              {...register("transactionTypeDescription", { required: true })}
            />
            {errors.transactionTypeDescription && (
              <div className="text-red-500">
                {errors.transactionTypeDescription.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Controller
              control={control}
              name="currency"
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  placeholder="Select ..."
                  className="w-[451px]"
                  options={[
                    { value: "KES", label: "KES" },
                    { value: "USD", label: "USD" },
                    { value: "GBP", label: "GBP" },
                    { value: "EUR", label: "EUR" },
                    { value: "JPY", label: "JPY" },
                    { value: "CHF", label: "CHF" },
                  ]}
                  onChange={onChange}
                  selected={value}
                />
              )}
            />
            {errors.currency && (
              <div className="text-red-500">{errors.currency.message}</div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit">Submit</Button>
          <Button variant="outline" className="ml-2">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewTransactionTypeForm;
