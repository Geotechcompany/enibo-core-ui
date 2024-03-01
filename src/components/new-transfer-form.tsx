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
import AccountSelect from "./account-select";

const transactionFormInputSchema = z.object({
  status: z.string({
    required_error: "Status is required",
  }),
  effective_at: z.coerce.date({
    required_error: "Effective date is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  transaction_type: z.string({
    required_error: "Transaction type is required",
  }),
  amount: z.coerce.number({
    required_error: "Amount is required",
  }),
  origin_account_id: z.string({
    required_error: "Account is required",
  }),
  destination_account_id: z.string({
    required_error: "Account is required",
  }),
});

const accounts = [
  {
    label: "Account 1",
    value: "1234567890",
    id: "1",
    name: "Account 1",
    account_owner: "John Doe",
    account_number: "1234567890",
    account_type: "Savings",
    bank_id: "1",
    normal_balance: "debit",
    balances: "100000",
    entries: [],
    transactions: [],
    createdAt: "2021-09-07T07:00:00.000Z",
    updatedAt: "2021-09-07T07:00:00.000Z",
    expiresAt: "2021-09-07T07:00:00.000Z",
  },
  {
    label: "Account 1",
    value: "0987654321",
    id: "2",
    name: "Account 2",
    account_owner: "Jane Doe",
    account_number: "0987654321",
    account_type: "Savings",
    bank_id: "2",
    normal_balance: "debit",
    balances: "100000",
    entries: [],
    transactions: [],
    createdAt: "2021-09-07T07:00:00.000Z",
    updatedAt: "2021-09-07T07:00:00.000Z",
    expiresAt: "2021-09-07T07:00:00.000Z",
  },
  {
    label: "Account 1",
    value: "87838388383",
    id: "3",
    name: "Account 3",
    account_owner: "John Doe",
    account_number: "87838388383",
    account_type: "Savings",
    bank_id: "1",
    normal_balance: "debit",
    balances: "100000",
    entries: [],
    transactions: [],
    createdAt: "2021-09-07T07:00:00.000Z",
    updatedAt: "2021-09-07T07:00:00.000Z",
    expiresAt: "2021-09-07T07:00:00.000Z",
  },
  {
    label: "Account 1",
    value: "09876539934321",
    id: "4",
    name: "Account 4",
    account_owner: "Jane Doe",
    account_number: "09876539934321",
    account_type: "Savings",
    bank_id: "2",
    normal_balance: "debit",
    balances: "100000",
    entries: [],
    transactions: [],
    createdAt: "2021-09-07T07:00:00.000Z",
    updatedAt: "2021-09-07T07:00:00.000Z",
    expiresAt: "2021-09-07T07:00:00.000Z",
  },
];

type TransactionFormInput = z.infer<typeof transactionFormInputSchema>;

interface NewTransferFormProps {}

const NewTransferForm: FC<NewTransferFormProps> = () => {
  const { toast } = useToast();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormInput>({
    resolver: zodResolver(transactionFormInputSchema),
  });

  const onSubmit = (data: TransactionFormInput) => {
    console.log(data);
    toast({
      title: "Transfer Created",
      description: "Transfer has been created successfully",
    });
  };
  return (
    <section className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between gap-4">
          <div className="w-full h-full p-2 border">
            <div>
              <h1 className="text-gray-500 responsive-h3">
                1. Choose an origin account
              </h1>
            </div>
            <div className="w-full my-2">
              <Label htmlFor="ledger_entries" className="sr-only">
                Account
              </Label>
              <Controller
                name="origin_account_id"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <AccountSelect
                    className="w-full h-10"
                    options={accounts}
                    selected={value}
                    placeholder="Select account..."
                    onChange={onChange}
                  />
                )}
              />
              {errors.origin_account_id && (
                <span className="text-sm text-red-500">
                  {errors.origin_account_id.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full h-full p-2 border">
            <div>
              <h1 className="text-gray-500 responsive-h3">
                2. Choose a destination account
              </h1>
            </div>
            <div className="w-full my-2">
              <Label htmlFor="ledger_entries" className="sr-only">
                Account
              </Label>
              <Controller
                name="destination_account_id"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <AccountSelect
                    className="w-full h-10"
                    options={accounts}
                    selected={value}
                    placeholder="Select account..."
                    onChange={onChange}
                  />
                )}
              />
              {errors.destination_account_id && (
                <span className="text-sm text-red-500">
                  {errors.destination_account_id.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full h-auto p-2 border">
            <div>
              <h1 className="text-gray-500 responsive-h3">3. Transfer data</h1>
            </div>
            <div className="w-full my-2">
              <Label htmlFor="ledger_entries">Amount</Label>
              <Input
                type="number"
                placeholder="Amount"
                {...register("amount")}
              />
              {errors.amount && (
                <span className="text-sm text-red-500">
                  {errors.amount.message}
                </span>
              )}
            </div>
            <div className="w-full my-2">
              <Label htmlFor="transaction_type">Transaction Type</Label>
              <Controller
                name="transaction_type"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="deposit">Deposit</SelectItem>
                      <SelectItem value="withdrawal">Withdrawal</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.transaction_type && (
                <span className="text-sm text-red-500">
                  {errors.transaction_type.message}
                </span>
              )}
            </div>
            <div className="w-full my-2">
              <Label htmlFor="effective_at">Effective Date</Label>
              <Input
                type="date"
                placeholder="Effective Date"
                {...register("effective_at")}
              />
              {errors.effective_at && (
                <span className="text-sm text-red-500">
                  {errors.effective_at.message}
                </span>
              )}
            </div>
            <div className="w-full my-2">
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                placeholder="Transfer description"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="w-full my-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="posted">Posted</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <span className="text-sm text-red-500">
                  {errors.status.message}
                </span>
              )}
            </div>
            <div className="w-full my-2">
              <Button type="submit" className="w-full">
                Create Transfer
              </Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export { NewTransferForm };
