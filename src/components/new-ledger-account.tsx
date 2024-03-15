import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MultiSelect, OptionType } from "./multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_LEDGER_ACCOUNT,
  UPDATE_LEDGER_ACCOUNT,
} from "@/types/mutations";
import { ledgerAccountQuery } from "@/types/queries";
import queryaccountcategoriesList from "./ledger-categories-list/query";
import { LedgerCategory } from "@/types/global";

const ledgerAccountSchema = z.object({
  ledgerAccountNumber: z
    .string()
    .min(3, { message: "Ledger Account Number is required" }),
  exportLedgerAccountNumber: z
    .string()
    .min(3, { message: "Export Ledger Account Number is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  ledgerAccountType: z.enum(["Customer", "Internal"]),
  customerAccountNumber: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  branchCode: z.string().min(3, { message: "Branch Code is required" }),
  ledgerAccountCategory: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  chartString: z.string().min(3, { message: "Chart String is required" }),
});

type LedgerAccount = z.infer<typeof ledgerAccountSchema>;

interface NewLedgerAccountFormProps {}

const NewLedgerAccountForm: FC<NewLedgerAccountFormProps> = () => {
 
  const storedAccount = localStorage.getItem("ledgerAccount");
  const [accountLabels, setAccountLabels] = useState<OptionType[]>([]);
  
  const isCopyMode = storedAccount ? true : false;
  const { id } = useParams();
  const isEditMode = id ? true : false;
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data } = useQuery(queryaccountcategoriesList);
  
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<LedgerAccount>({
    resolver: zodResolver(ledgerAccountSchema),
  });
  
  const [createLedgerAccount] = useMutation(CREATE_LEDGER_ACCOUNT);
  const [updateLedgerAccount] = useMutation(UPDATE_LEDGER_ACCOUNT);

  const handleCreate = async (data: LedgerAccount) => {
    try {
      const result = await createLedgerAccount({
        variables: {
          accountNumber: data.ledgerAccountNumber,
          ledgerAccountNumber: data.ledgerAccountNumber,
          exportAccountNumber: data.exportLedgerAccountNumber,
          description: data.description,
          customerAccountNumber: data.customerAccountNumber[0].value,
          branchId: data.branchCode,
          accountCategoryId: data.ledgerAccountCategory[0].value,
          chartString: data.chartString,
          normalBalance: "CREDIT",
        },
      });
      toast({
        title: "Ledger Rule Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              New Ledger Rule Created{" "}
              <Link
                to={`/administration/ledger-management/ledger-accounts`}
                className="text-blue-500 underline"
              >
                {result.data.createLedgerAccount.id}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });
      reset();
      localStorage.removeItem("ledgerAccount");
      navigate("/administration/ledger-management/ledger-accounts");
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.graphQLErrors?.[0]?.extensions?.response?.body?.message ||
        "Unknown error";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (data: LedgerAccount) => {
    try {
      const result = await updateLedgerAccount({
        variables: {
          updateLedgerAccountId: id,
          accountNumber: data.ledgerAccountNumber,
          ledgerAccountNumber: data.ledgerAccountNumber,
          exportAccountNumber: data.exportLedgerAccountNumber,
          description: data.description,
          customerAccountNumber: data.customerAccountNumber[0].value,
          branchId: data.branchCode,
          accountCategoryId: data.ledgerAccountCategory[0].value,
          chartString: data.chartString,
          normalBalance: "CREDIT",
        },
      });
      toast({
        title: "Ledger Rule Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              New Ledger Rule Updated{" "}
              <Link
                to={`/administration/ledger-management/ledger-accounts`}
                className="text-blue-500 underline"
              >
                {result.data.updateLedgerAccount.id}
              </Link>
              , has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/ledger-management/ledger-accounts");
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.graphQLErrors?.[0]?.extensions?.response?.body?.message ||
        "Unknown error";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: LedgerAccount) => {
    if (isEditMode) {
      handleEdit(data);
    } else {
      handleCreate(data);
    }
  };

  const { data: accountData } = useQuery(ledgerAccountQuery, {
    variables: {
      accountNumber: id ? id : "",
    },
  });
  
  useEffect(() => {
    if (data) {
      console.log(data);
      const newAccountCategories = data.accountCategories.map(
        (category: LedgerCategory) => {
          return {
            label: category.ledgerCategory,
            value: category.id,
          };
        }
      );
      console.log(newAccountCategories);
      setAccountLabels([...newAccountCategories]);
    }
  },[data, accountLabels]);

  useEffect(() => {
    if (isEditMode) {
      if (accountData) {
        console.log(accountData);
        const {
          account_number,
          export_account_number,
          description,
          customer_account_number,
          branch_id,
          chart_string,
          account_category,
        } = accountData.ledgerAccount;
        const categoryLabel = [
          {
            label: account_category.ledgerCategory,
            value: account_category.id,
          },
        ];
        const customerLabel = [{
          label: customer_account_number,
          value: customer_account_number,
        
        }]
        setValue("ledgerAccountNumber", account_number);
        setValue("exportLedgerAccountNumber", export_account_number);
        setValue("description", description);
        setValue("customerAccountNumber", customerLabel);
        setValue("branchCode", branch_id);
        setValue("ledgerAccountCategory", categoryLabel);
        setValue("chartString", chart_string);
      }
    }
    if (isCopyMode) {
      const storedLedgerAccount = localStorage.getItem("ledgerAccount");
      if (storedLedgerAccount !== null) {
        const {
          account_number,
          export_account_number,
          description,
          customer_account_number,
          branch_id,
          chart_string,
          account_category,
        } = JSON.parse(storedLedgerAccount);
        const categoryLabel = [
          {
            label: account_category.ledgerCategory,
            value: account_category.id,
          }
        ];
        const newCustomerAccountNumber = [{
          label: customer_account_number,
          value: customer_account_number,
        }]
        setValue("ledgerAccountNumber", account_number);
        setValue("exportLedgerAccountNumber", export_account_number);
        setValue("description", description);
        setValue("customerAccountNumber", newCustomerAccountNumber);
        setValue("branchCode", branch_id);
        setValue("ledgerAccountCategory", categoryLabel);
        setValue("chartString", chart_string);
      }
    }
  }, [data, isEditMode, isCopyMode, setValue, accountData, storedAccount]);
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
            <Textarea id="description" {...register("description")} />
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
                  selected={value || []}
                  onChange={onChange}
                  className="w-[451px]"
                  placeholder="Select ..."
                  selectLimit={1}
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
            <Controller
              name="ledgerAccountCategory"
              control={control}
              render={({ field: { onChange, value } }) => (
                <MultiSelect
                  selected={value}
                  onChange={onChange}
                  className="w-[451px]"
                  placeholder="Select ..."
                  selectLimit={1}
                  options={accountLabels}
                />
              )}
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
          <Button type="button" onClick={()=> navigate("/administration/ledger-management/ledger-accounts")}>Cancel</Button>
        </div>
      </form>
    </section>
  );
};

export default NewLedgerAccountForm;
