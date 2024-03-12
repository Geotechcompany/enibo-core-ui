/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CREATE_NEW_TRANSACTION_TYPE_MUTATION,
  UPDATE_TRANSACTION_TYPE_MUTATION,
} from "@/Pages/Transactions/TransactionMutation";
import { useTransactionTypeState } from "@/store/transactionTypesState";
import queryTransactionTypesList from "./transaction-type-list/query";
import CurrencySelector from "./currencies/currency-selector";

const transactionTypeSchema = z.object({
  transactionTypeId: z.string().optional(),
  transactionTypeName: z
    .string()
    .min(3, { message: "Transaction Type Name is required" }),
  transactionTypeCode: z
    .string()
    .min(3, { message: "Transaction Type Code is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  currency: z.string().min(3, { message: "Currency is required" }),
  modifiedBy: z.string().optional(),
  modifiedOn: z.string().optional(),
});

type TransactionType = z.infer<typeof transactionTypeSchema>;

interface NewTransactionTypeFormProps {}

const NewTransactionTypeForm: FC<NewTransactionTypeFormProps> = () => {
  const { transactionTypeId } = useParams<{ transactionTypeId: string }>();
  const { state, setState } = useTransactionTypeState();
  const isCopyMode = !state;
  const formMode = state?.mode;
  console.log(state, formMode, "Form");
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log(isCopyMode, "Copy Mode");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<TransactionType>({
    resolver: zodResolver(transactionTypeSchema),
  });

  const [createTransactionTypeMutation] = useMutation(
    CREATE_NEW_TRANSACTION_TYPE_MUTATION
  );
  const [updateTransactionTypeMutation] = useMutation(
    UPDATE_TRANSACTION_TYPE_MUTATION
  );

  const { data: transactionData, loading: transactionLoading } = useQuery(
    queryTransactionTypesList,
    {
      variables: { transactionTypeId },
    }
  );

  const handleCreate = async (data: TransactionType) => {
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
        description: (
          <div className="text-black">
            <div className="text-lg">
              New Transaction Type{" "}
              <Link
                to={`/administration/static-data/transaction-types`}
                className="underline text-blue-500"
              >
                {data.transactionTypeName}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/static-data/transaction-types");
    } catch (error: any) {
      const errorMessage =
        (error.graphQLErrors &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.response &&
          error.graphQLErrors[0].extensions.response.body &&
          error.graphQLErrors[0].extensions.response.body
            .transactionTypeCode) ||
        "Unknown error";

      toast({
        title: "Error",
        description: `"Failed, ${errorMessage} Please try again."`,
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (data: TransactionType) => {
    try {
      await updateTransactionTypeMutation({
        variables: {
          transactionTypeId: data.transactionTypeId,
          transactionTypeName: data.transactionTypeName,
          transactionTypeCode: data.transactionTypeCode,
          description: data.description,
          currency: data.currency,
          modifiedBy: "tester",
          modifiedOn: new Date().toISOString(),
        },
      });
      toast({
        title: "Transaction Type Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Transaction Type{" "}
              <Link
                to={`/administration/static-data/transaction-types`}
                className="underline text-blue-500"
              >
                {data.transactionTypeName}
              </Link>
              , has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/static-data/transaction-types");
    } catch (error: any) {
      const errorMessage =
        (error.graphQLErrors &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.response &&
          error.graphQLErrors[0].extensions.response.body &&
          error.graphQLErrors[0].extensions.response.body
            .transactionTypeCode) ||
        "Unknown error";

      toast({
        title: "Error",
        description: `"Failed, ${errorMessage} Please try again."`,
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: TransactionType) => {
    if (formMode === "ADD" || formMode === "COPY") {
      handleCreate(data);
    } else if (formMode === "EDIT") {
      console.log("edit mode");
      handleEdit(data);
    }
  };

  const transactionType = transactionData?.transactionTypes.find(
    (transactionType: { transactionTypeId: string | undefined }) =>
      transactionType.transactionTypeId === transactionTypeId
  );

  useEffect(() => {
    if (formMode === "COPY" && state) {
      const {
        transactionTypeName,
        transactionTypeCode,
        description,
        currency,
      } = state;
      setValue("transactionTypeName", transactionTypeName);
      setValue("transactionTypeCode", transactionTypeCode);
      setValue("description", description);
      setValue("currency", currency);
    } else if (formMode === "EDIT") {
      if (!transactionLoading && transactionType) {
        const {
          transactionTypeId,
          transactionTypeName,
          transactionTypeCode,
          description,
          currency,
        } = transactionType;
        setValue("transactionTypeId", transactionTypeId);
        setValue("transactionTypeName", transactionTypeName || "");
        setValue("transactionTypeCode", transactionTypeCode || "");
        setValue("description", description || "");
        setValue("currency", currency || "");
      }
      console.log(transactionType, "TRANSACTION TYPE");
    } else return;
  }, [
    formMode,
    setState,
    setValue,
    state,
    transactionType,
    transactionLoading,
  ]);

  const cancelForm = () => {
    setState({
      transactionTypeId: "",
      transactionTypeCode: "",
      transactionTypeName: "",
      description: "",
      currency: "",
      modifiedBy: "",
      modifiedOn: "",
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
              type="number"
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
            <Label htmlFor="currency">Select Currency</Label>
            <CurrencySelector control={control} name="currency" />
            {errors.currency && (
              <div className="text-red-500">{errors.currency.message}</div>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <Button
            type="submit"
            size="lg"
            className="bg-[#36459C] hover:bg-[#253285]"
          >
            Submit
          </Button>
          <Link to={`/administration/static-data/transaction-types`}>
            <Button size="lg" onClick={cancelForm}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewTransactionTypeForm;
