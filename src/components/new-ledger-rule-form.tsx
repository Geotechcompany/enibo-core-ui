import { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message"
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_LEDGER_RULE, UPDATE_LEDGER_RULE } from "@/types/mutations";
import { queryLedgerRule } from "@/types/queries";

const NewLedgerRuleFormSchema = z.object({
  priority: z.string().min(1, { message: "Priority is required" }),
  ruleName: z.string().min(3, { message: "Rule Name is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  transactionType: z
    .string()
    .min(3, { message: "Transaction Type is required" }),
  transactionsDescriptionContains: z
    .string()
    .min(3, { message: "Transactions Description Contains is required" }),
  transactionDescriptionDoesNotContain: z.string().min(3, {
    message: "Transaction Description Does Not Contain is required",
  }),
  from: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "From is required" }),
  to: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "To is required" }),
  debitLedgerAccount: z
    .string()
    .min(1, { message: "Debit Ledger Account is required" }),
  creditLedgerAccount: z
    .string()
    .min(1, { message: "Credit Ledger Account is required" }),
});

type NewLedgerRuleFormInput = z.infer<typeof NewLedgerRuleFormSchema>;

interface NewLedgerRuleFormProps {}

const NewLedgerRuleForm: FC<NewLedgerRuleFormProps> = () => {
  const storedRule = localStorage.getItem("ledgerRule");
  const isCopyMode = storedRule ? true : false;
  const { id } = useParams();
  const isEditMode = id ? true : false;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<NewLedgerRuleFormInput>({
    resolver: zodResolver(NewLedgerRuleFormSchema),
  });

  const { data } = useQuery(queryLedgerRule, {
    variables: {
      ledgerRuleId: id ? id : "",
    },
  });

  useEffect(() => {
    if (isEditMode) {
      if (data) {
        const {
          priority,
          name,
          description,
          transactionType,
          contains,
          doesNotContain,
          from,
          to,
          debitAccount,
          creditAccount,
        } = data.ledgerRule;
        const fromLabel = [{
          label: from,
          value: from
        }]
        const toLabel = [{
          label: to,
          value: to
        }]
        setValue("priority", priority);
        setValue("ruleName", name);
        setValue("description", description);
        setValue("transactionType", transactionType);
        setValue(
          "transactionsDescriptionContains",
          contains
        );
        setValue(
          "transactionDescriptionDoesNotContain",
          doesNotContain
        );
        setValue("from", fromLabel);
        setValue("to", toLabel);
        setValue("debitLedgerAccount", debitAccount);
        setValue("creditLedgerAccount", creditAccount);
      }

      if (isCopyMode) {
        const storedSettingString = localStorage.getItem("ledgerRule");
        if (storedSettingString !== null) {
          console.log(storedSettingString)
          const {
            priority,
            name,
            description,
            transactionType,
            contains,
            doesNotContain,
            from,
            to,
            debitLedgerAccount,
            creditLedgerAccount,
          } = JSON.parse(storedSettingString);
          const fromLabel = [{
            label: from,
            value: from
          }]
          const toLabel = [{
            label: to,
            value: to
          }]
          setValue("priority", priority);
          setValue("ruleName", name);
          setValue("description", description);
          setValue("transactionType", transactionType);
          setValue(
            "transactionsDescriptionContains",
            contains
          );
          setValue(
            "transactionDescriptionDoesNotContain",
            doesNotContain
          );
          setValue("from", fromLabel);
          setValue("to", toLabel);
          setValue("debitLedgerAccount", debitLedgerAccount);
          setValue("creditLedgerAccount", creditLedgerAccount);
        }
      }
    }
  }, [data, isEditMode, setValue, isCopyMode, storedRule]);

  const [createLedgerRule] = useMutation(CREATE_LEDGER_RULE);
  const [updateLedgerRule] = useMutation(UPDATE_LEDGER_RULE);
  const handleCreate = async (data: NewLedgerRuleFormInput) => {
    try {
      const result = await createLedgerRule({
        variables: {
          priority: data.priority,
          name: data.ruleName,
          description: data.description,
          transactionType: data.transactionType,
          contains: data.transactionsDescriptionContains,
          doesNotContain:
            data.transactionDescriptionDoesNotContain,
          from: data.from[0].value,
          to: data.to[0].value,
          debitAccount: data.debitLedgerAccount,
          creditAccount: data.creditLedgerAccount,
          modifiedBy: user.id
        },
      });

      toast({
        title: "Ledger Rule Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              New Ledger Rule Created{" "}
              <Link
                to={`/administration/ledger-management/ledger-rules`}
                className="text-blue-500 underline"
              >
                {result.data.createLedgerRule.id}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });
      reset();
      localStorage.removeItem("ledgerRule");
      navigate("/administration/ledger-management/ledger-rules");
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

  const handleEdit = async (data: NewLedgerRuleFormInput) => {
    try {
      const result = await updateLedgerRule({
        variables: {
          updateLedgerRuleId: id,
          priority: data.priority,
          name: data.ruleName,
          description: data.description,
          transactionType: data.transactionType,
          contains: data.transactionsDescriptionContains,
          doesNotContain:
            data.transactionDescriptionDoesNotContain,
          from: data.from[0].value,
          to: data.to[0].value,
          debitAccount: data.debitLedgerAccount,
          creditAccount: data.creditLedgerAccount,
          modifiedBy: user.id
        },
      });
      toast({
        title: "Ledger Rule Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Ledger Rule{" "}
              <Link
                to={`/administration/ledger-management/ledger-rules`}
                className="text-blue-500 underline"
              >
                {result.data.updateLedgerRule.id}
              </Link>
              , has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/ledger-management/ledger-rules");
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

  const onSubmit = (data: NewLedgerRuleFormInput) => {
    console.log(data)
    if (isEditMode) {
      handleEdit(data);
    } else {
      handleCreate(data);
    }
  };
  return (
    <section>
       <ErrorMessage
        errors={errors}
        name="multipleErrorInput"
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p key={type}>{message}</p>
          ))
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 w-[30%]">
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Controller
              control={control}
              name="priority"
              render={({ field:{onChange, value} }) => (
                <Select 
                onValueChange={onChange}
                value={value}
                >
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
              render={({ field: {onChange, value} }) => (
                <Select 
                onValueChange={onChange}
                value={value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Debit Ledger Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="122">1</SelectItem>
                    <SelectItem value="2222">2</SelectItem>
                    <SelectItem value="3222">3</SelectItem>
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
              render={({ field: {onChange, value} }) => (
                <Select 
                onValueChange={onChange}
                value={value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Credit Ledger Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1222">1</SelectItem>
                    <SelectItem value="2222">2</SelectItem>
                    <SelectItem value="3222">3</SelectItem>
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
          <Button className="ml-2" type="button" onClick={()=>navigate("/administration/ledger-management/ledger-rules")}>Cancel</Button>
        </div>
      </form>
    </section>
  );
};

export default NewLedgerRuleForm;
