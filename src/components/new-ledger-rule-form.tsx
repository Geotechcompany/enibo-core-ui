import { FC } from "react";
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
import { Textarea } from "./ui/textarea";
import { MultiSelect } from "./multi-select";
import { Link, useNavigate } from "react-router-dom";


const NewLedgerRuleFormSchema = z.object({
  priority: z.string().min(3, { message: "Priority is required" }),
  ruleName: z.string().min(3, { message: "Rule Name is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  transactionType: z
    .string()
    .min(3, { message: "Transaction Type is required" }),
  transactionsDescriptionContains: z
    .string()
    .min(3, { message: "Transactions Description Contains is required" }),
  transactionDescriptionDoesNotContain: z
    .string()
    .min(3, {
      message: "Transaction Description Does Not Contain is required",
    }),
  from: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(3, { message: "From is required" }),
  to: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(3, { message: "To is required" }),
  debitLedgerAccount: z
    .string()
    .min(3, { message: "Debit Ledger Account is required" }),
  creditLedgerAccount: z
    .string()
    .min(3, { message: "Credit Ledger Account is required" }),
});

type NewLedgerRuleFormInput = z.infer<typeof NewLedgerRuleFormSchema>;

interface NewLedgerRuleFormProps {}

const NewLedgerRuleForm: FC<NewLedgerRuleFormProps> = () => {
  const { toast } = useToast();
  const navigate  = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<NewLedgerRuleFormInput>({
    resolver: zodResolver(NewLedgerRuleFormSchema),
  });

  const onSubmit = (data: NewLedgerRuleFormInput) => {
    try{
      toast({
        title: "Ledger Rule Created",
        description: <div className="text-black">
        <div className="text-lg">
          New Ledger Rule Created {" "}
          <Link to={`/administration/ledger-management/ledger-rules`} className="underline text-blue-500">
            {data.ruleName}
          </Link>
           , has been successfully created
        </div>
      </div>,
      });
      reset();
      navigate("/administration/ledger-management/ledger-rules"); 
    } catch (error) {
      console.error("Error creating ledger rule ", error);
      toast({
        title: "Error",
        description: "Failed to create ledger rule. Please try again.",
      });
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 w-[30%]">
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.priority && (
              <span className="text-red-500">{errors.priority.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="ruleName">Rule Name</Label>
            <Input
              id="ruleName"
              type="text"
              placeholder="Rule Name"
              {...register("ruleName")}
            />
            {errors.ruleName && (
              <span className="text-red-500">{errors.ruleName.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="transactionType">
              Corresponding Transaction Type
            </Label>
            <Controller
              name="transactionType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEPOSIT">DEPOSIT</SelectItem>
                    <SelectItem value="WITHDRAWAL">WITHDRAWAL</SelectItem>
                    <SelectItem value="TRANSFER">TRANSFER</SelectItem>
                    <SelectItem value="CHEQUE DEPOSIT">
                      CHEQUE DEPOSIT
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.transactionType && (
              <span className="text-red-500">
                {errors.transactionType.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="transactionsDescriptionContains">
              Transactions Description Contains
            </Label>
            <Input
              id="transactionsDescriptionContains"
              type="text"
              placeholder="Transactions Description Contains"
              {...register("transactionsDescriptionContains")}
            />
            {errors.transactionsDescriptionContains && (
              <span className="text-red-500">
                {errors.transactionsDescriptionContains.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="transactionDescriptionDoesNotContain">
              Transaction Description Does Not Contain
            </Label>
            <Input
              id="transactionDescriptionDoesNotContain"
              type="text"
              placeholder="Transaction Description Does Not Contain"
              {...register("transactionDescriptionDoesNotContain")}
            />
            {errors.transactionDescriptionDoesNotContain && (
              <span className="text-red-500">
                {errors.transactionDescriptionDoesNotContain.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="from">From</Label>
            <Controller
              control={control}
              name="from"
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  onChange={onChange}
                  selected={value}
                  placeholder="Select ..."
                  className="w-[451px]"
                  options={[
                    { label: "Customer", value: "Customer" },
                    { label: "Internal", value: "Internal" },
                  ]}
                />
              )}
            />
            {errors.from && (
              <span className="text-red-500">{errors.from.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="to">To</Label>
            <Controller
              control={control}
              name="to"
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  onChange={onChange}
                  selected={value}
                  placeholder="Select ..."
                  className="w-[451px]"
                  options={[
                    { label: "Customer", value: "Customer" },
                    { label: "Internal", value: "Internal" },
                  ]}
                />
              )}
            />
            {errors.to && (
              <span className="text-red-500">{errors.to.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="debitLedgerAccount">Debit Ledger Account</Label>
            <Controller
              control={control}
              name="debitLedgerAccount"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Debit Ledger Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.debitLedgerAccount && (
              <span className="text-red-500">
                {errors.debitLedgerAccount.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="creditLedgerAccount">Credit Ledger Account</Label>
            <Controller
              control={control}
              name="creditLedgerAccount"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Credit Ledger Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.creditLedgerAccount && (
              <span className="text-red-500">
                {errors.creditLedgerAccount.message}
              </span>
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

export default NewLedgerRuleForm;
