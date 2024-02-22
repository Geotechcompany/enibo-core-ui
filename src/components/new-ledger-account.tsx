import { FC } from "react";
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
import { Textarea } from "./ui/textarea";
import { Link, useNavigate } from "react-router-dom";

const ledgerAccountSchema = z.object({
  ledgerAccountNumber: z
    .string()
    .min(3, { message: "Ledger Account Number is required" }),
  exportLedgerAccountNumber: z
    .string()
    .min(3, { message: "Export Ledger Account Number is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  ledgerAccountType: z.enum(["Customer", "Internal"]),
  customerAccountNumber: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(3, { message: "Customer Account Number is required" }),
  branchCode: z.string().min(3, { message: "Branch Code is required" }),
  ledgerAccountCategory: z
    .string()
    .min(3, { message: "Ledger Account Category is required" }),
  chartString: z.string().min(3, { message: "Chart String is required" }),
});

type LedgerAccount = z.infer<typeof ledgerAccountSchema>;

interface NewLedgerAccountFormProps {}

const NewLedgerAccountForm: FC<NewLedgerAccountFormProps> = () => {
  const { toast } = useToast();
  const navigate  = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LedgerAccount>({
    resolver: zodResolver(ledgerAccountSchema),
  });

  const onSubmit = (data: LedgerAccount) => {
    try{
    toast({
      title: "Ledger Account Created",
      description: <div className="text-black">
      <div className="text-lg">
        New Ledger Account Created {" "}
        <Link to={`/administration/ledger-management/ledger-accounts`} className="underline text-blue-500">
          {data.ledgerAccountNumber}
        </Link>
         , has been successfully created
      </div>
    </div>,
    });
    reset();
    navigate("/administration/ledger-management/ledger-accounts"); 
  } catch (error) {
    console.error("Error creating ledger account ", error);
    toast({
      title: "Error",
      description: "Failed to create ledger account. Please try again.",
    });
  }
  };
  return (
    <section>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 w-[30%]">
          <div>
            <Label htmlFor="ledgerAccountNumber">Ledger Account Number</Label>
            <Input
              type="text"
              id="ledgerAccountNumber"
              {...register("ledgerAccountNumber")}
            />
            {errors.ledgerAccountNumber && (
              <span className="text-red-500">
                {errors.ledgerAccountNumber.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="exportLedgerAccountNumber">
              Export Ledger Account Number
            </Label>
            <Input
              type="text"
              id="exportLedgerAccountNumber"
              {...register("exportLedgerAccountNumber")}
            />
            {errors.exportLedgerAccountNumber && (
              <span className="text-red-500">
                {errors.exportLedgerAccountNumber.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea  id="description" {...register("description")} />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="ledgerAccountType">Ledger Account Type</Label>
            <Controller
              name="ledgerAccountType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.ledgerAccountType && (
              <span className="text-red-500">
                {errors.ledgerAccountType.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="customerAccountNumber">
              Customer Account Number
            </Label>
            <Controller
              control={control}
              name="customerAccountNumber"
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  selected={value}
                  onChange={onChange}
                  className="w-[451px]"
                  placeholder="Select ..."
                  options={[
                    { label: "A000-5858-88688", value: "A000-5858-88688" },
                    { label: "A000-5757-74744", value: "A000-5757-74744" },
                    { label: "A000-5858-89393", value: "A000-5858-89393" },
                    { label: "A000-5995-75757", value: "A000-5995-75757" },
                    { label: "A000-9499-94944", value: "A000-9499-94944" },
                    { label: "A000-4884-93933", value: "A000-4884-93933" },
                    { label: "A000-3939-39933", value: "A000-3939-39933" },
                    { label: "A000-3329-26622", value: "A000-3329-26622" },
                    { label: "A000-8282-49949", value: "A000-8282-49949" },
                  ]}
                />
              )}
            />
            {errors.customerAccountNumber && (
              <span className="text-red-500">
                {errors.customerAccountNumber.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="branchCode">Branch Code</Label>
            <Input type="text" id="branchCode" {...register("branchCode")} />
            {errors.branchCode && (
              <span className="text-red-500">{errors.branchCode.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="ledgerAccountCategory">
              Ledger Account Category
            </Label>
            <Input
              type="text"
              id="ledgerAccountCategory"
              {...register("ledgerAccountCategory")}
            />
            {errors.ledgerAccountCategory && (
              <span className="text-red-500">
                {errors.ledgerAccountCategory.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="chartString">Chart String</Label>
            <Input type="text" id="chartString" {...register("chartString")} />
            {errors.chartString && (
              <span className="text-red-500">{errors.chartString.message}</span>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="submit">Submit</Button>
          <Button >Cancel</Button>
        </div>
      </form>
    </section>
  );
};

export default NewLedgerAccountForm;
