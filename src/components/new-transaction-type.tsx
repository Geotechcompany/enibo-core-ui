import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@apollo/client";
import CREATE_NEW_TRANSACTION_TYPE_MUTATION from "@/Pages/Transactions/TransactionMutation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const transactionTypeSchema = z.object({
  transactionTypeName: z
    .string()
    .min(3, { message: "Transaction Type Name is required" }),
  transactionTypeCode: z
    .string()
    .min(3, { message: "Transaction Type Code is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  currency: z.string().min(1).min(3, { message: "Currency is required" }),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),

  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
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

  const [createTransactionTypeMutation] = useMutation(
    CREATE_NEW_TRANSACTION_TYPE_MUTATION
  );

  const onSubmit = async (data: TransactionType) => {
    try {
      await createTransactionTypeMutation({
        variables: {
          ...data,
          modifiedOn: new Date().toISOString(),
        },
      });
      toast({
        title: "Transaction Type Created",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error("Error creating transaction type:", error);
      toast({
        title: "Error",
        description: "Failed to create transaction type. Please try again.",
      });
    }
  };

  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );
  useEffect(() => {
    setDefaultModifiedOn(new Date().toISOString());
  }, []);
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
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <div className="text-red-500">{errors.description.message}</div>
            )}
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Controller
              control={control}
              name="currency"
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select ..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KES">KES</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.currency && (
              <div className="text-red-500">{errors.currency.message}</div>
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
              defaultValue={defaultModifiedOn} // Set the default value
            />
            {errors.modifiedOn && (
              <span className="text-red-500">{errors.modifiedOn.message}</span>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit">Submit</Button>
          <Button className="ml-2">Cancel</Button>
        </div>
      </form>
    </section>
  );
};

export default NewTransactionTypeForm;
