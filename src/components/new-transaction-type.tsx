import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMutation } from "@apollo/client";
import CREATE_NEW_TRANSACTION_TYPE_MUTATION from "@/Pages/Transactions/TransactionMutation";
import { Link, useNavigate } from "react-router-dom";

const transactionTypeSchema = z.object({
  transactionTypeName: z
    .string()
    .min(3, { message: "Transaction Type Name is required" }),
  transactionTypeCode: z
    .string()
    .min(3, { message: "Transaction Type Code is required" }),
    description: z
    .string()
    .min(3, { message: "Description is required" }),
  currency: z
  .string()
  .min(3, { message: "Currency is required" }),
});

type TransactionType = z.infer<typeof transactionTypeSchema>;

interface NewTransactionTypeFormProps {}

const NewTransactionTypeForm: FC<NewTransactionTypeFormProps> = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TransactionType>({
    resolver: zodResolver(transactionTypeSchema),
  });

  const [createTransactionTypeMutation] = useMutation(CREATE_NEW_TRANSACTION_TYPE_MUTATION);

  const navigate = useNavigate();

  const onSubmit = (async (data: TransactionType) => {
    try {
      await createTransactionTypeMutation({
        variables: {
          transactionTypeName: data.transactionTypeName,
          transactionTypeCode: data.transactionTypeCode,
          description: data.description,
          currency: data.currency,
          modifiedBy: "tester",
          modifiedOn: new Date().toISOString(), 
        },
      });
      toast({
        title: "Transaction Type Created",
        description: <div className="text-black">
        <div className="text-lg">
          New Transaction Type {" "}
          <Link to={`/administration/static-data/transaction-types`} className="underline text-blue-500">
            {data.transactionTypeName}
          </Link>
           , has been successfully created
        </div>
      </div>,
      });
      reset();
      navigate("/administration/static-data/transaction-types"); 
    } catch (error) {
      console.error("Error creating transaction type:", error);
      toast({
        title: "Error",
        description: "Failed to create transaction type. Please try again.",
      });
    }
  });

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
              <div className="text-red-500">
                {errors.description.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
             <Controller
                    name="currency"
                    control={control}
                    render={({ field: {onChange, value} }) => (
                        <Select
                            onValueChange={onChange}
                            value={value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select ..."/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="KES">KES</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="JPY">JPY</SelectItem>
                                <SelectItem value="CHF">CHF</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
            {errors.currency && (
              <div className="text-red-500">{errors.currency.message}</div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit">Submit</Button>
          <Button  className="ml-2">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewTransactionTypeForm;
