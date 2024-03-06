import { FC, useEffect, useState } from "react";
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

import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_LEDGER_ACCOUNT_CATEGORIES,
  UPDATE_LEDGER_ACCOUNT_CATEGORIES,
} from "./ledger-categories-list/mutation";
import { useLedgerState } from "@/store/ledger";
import queryaccountcategoriesList from "./ledger-categories-list/query";

const LedgerCategorySchema = z.object({
  ledgerCategory: z.string().min(3, { message: "Ledger Category is required" }),
  description: z
    .string()
    .min(3, { message: "Ledger Category Description is required" }),
  categoryNumber: z.string().min(1, { message: "Category Number is required" }),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),

  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type LedgerCategoryFormInputs = z.infer<typeof LedgerCategorySchema>;

interface NewLedgerCategoryFormProps {}

const NewLedgerCategoryForm: FC<NewLedgerCategoryFormProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { state, setState } = useLedgerState();
  const isCopyMode = !state;
  const formMode = state?.mode;
  console.log(state, formMode, "Form");
  const { toast } = useToast();
  const [updateLedgerAccountCategoriesMutation] = useMutation(
    UPDATE_LEDGER_ACCOUNT_CATEGORIES
  );
  const [createledgerAccountCategories] = useMutation(
    CREATE_LEDGER_ACCOUNT_CATEGORIES
  );
  const navigate = useNavigate();
  console.log(isCopyMode, "Copy Mode");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm<LedgerCategoryFormInputs>({
    resolver: zodResolver(LedgerCategorySchema),
  });
  const {
    data: LedgerAccountCategoriesData,
    loading: LedgerAccountCategoriesLoading,
  } = useQuery(queryaccountcategoriesList, {
    variables: { id }, //
  });
  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );
  const [isFormModified, setIsFormModified] = useState(false);
  const handleEdit = async (data: LedgerCategoryFormInputs) => {
    try {
      await updateLedgerAccountCategoriesMutation({
        variables: {
          ledgerCategory: data.ledgerCategory,
          description: data.description,
          categoryNumber: data.categoryNumber,
          modifiedBy: data.modifiedBy,
          modifiedOn: data.modifiedOn,
        },
      });
      toast({
        title: "Ledger Category Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Ledger Category{" "}
              <Link
                to={`/administration/ledger-management/ledger-account-categories`}
                className="text-blue-500 underline"
              >
                {data.ledgerCategory}
              </Link>
              , has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/ledger-management/ledger-account-categories");
    } catch (error: any) {
      const errorMessage =
        error.graphQLErrors?.[0]?.extensions?.response?.body?.message ||
        "Unknown error";
      toast({
        title: "Error",
        description: `"Failed ${errorMessage}. Please try again."`,
        variant: "destructive",
      });
    }
  };

  const handleCreate = async (data: LedgerCategoryFormInputs) => {
    try {
      const {
        ledgerCategory,
        description,
        categoryNumber,
        modifiedBy,
        modifiedOn,
      } = data;

      await createledgerAccountCategories({
        variables: {
          ledgerCategory: ledgerCategory,
          description: description || "N/A",
          categoryNumber: categoryNumber,
          modifiedBy,
          modifiedOn,
        },
      });
      toast({
        title: "Ledger Category Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              ledger Category{" "}
              <Link
                to={`/administration/ledger-management/ledger-account-categories`}
                className="text-blue-500 underline"
              >
                {data.ledgerCategory}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });
      reset();
      setState({
        ledgerCategory: "",
        description: "",
        categoryNumber: "",
      });
      navigate("/administration/ledger-management/ledger-account-categories");
    } catch (error: any) {
      const errorMessage =
        error.graphQLErrors?.[0]?.extensions?.response?.body?.message ||
        "Unknown error";

      toast({
        title: "Error",
        description: `Failed ${errorMessage}. Please try again.`,
        variant: "destructive",
      });
    }
  };
  const onSubmit = async (data: LedgerCategoryFormInputs) => {
    if (formMode === "ADD" || formMode === "COPY") {
      handleCreate(data);
    } else if (formMode === "EDIT") {
      console.log("edit mode");
      handleEdit(data);
    }
  };

  useEffect(() => {
    setDefaultModifiedOn(new Date().toISOString());
  }, []);

  const cancelForm = () => {
    setState({
      ledgerCategory: "",
      description: "",
      categoryNumber: "",
    });
    toast({
      title: "Form Cancelled",
    });
  };
  const LedgerAccountCategories =
    LedgerAccountCategoriesData?.accountCategories.find(
      (LedgerAccountCategories: { id: string | undefined }) =>
        LedgerAccountCategories.id === id
    );

  useEffect(() => {
    if (formMode === "COPY" && state) {
      const { ledgerCategory, description, categoryNumber } = state;

      setValue("ledgerCategory", ledgerCategory);
      setValue("categoryNumber", categoryNumber);
      setValue("description", description);
    } else if (formMode === "EDIT") {
      if (!LedgerAccountCategoriesLoading && LedgerAccountCategories) {
        const {
          ledgerCategory,
          description,
          categoryNumber,
          modifiedBy,
          modifiedOn,
        } = LedgerAccountCategories;

        setValue("ledgerCategory", ledgerCategory || "");
        setValue("description", description || "");
        setValue("categoryNumber", categoryNumber || "");
        setValue("modifiedBy", modifiedBy || "");
        setValue("modifiedOn", modifiedOn || new Date().toISOString());
      }
    }
  }, [
    formMode,
    reset,
    setValue,
    state,
    setState,
    LedgerAccountCategories,
    LedgerAccountCategoriesLoading,
  ]);

  useEffect(() => {
    const handleFormChange = () => {
      setIsFormModified(true);
    };

    window.addEventListener("input", handleFormChange);

    return () => {
      window.removeEventListener("input", handleFormChange);
    };
  }, []);
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 w-[30%]">
          <div>
            <Label>Ledger Category</Label>
            <Controller
              control={control}
              name="ledgerCategory"
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales </SelectItem>
                    <SelectItem value="Internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.ledgerCategory && (
              <span className="text-red-500">
                {errors.ledgerCategory.message}
              </span>
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
              defaultValue={defaultModifiedOn}
            />
            {errors.modifiedOn && (
              <span className="text-red-500">{errors.modifiedOn.message}</span>
            )}
          </div>
          <div>
            <Label>Ledger Category Description</Label>
            <Textarea {...register("description")} />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div>
            <Label>Category Number</Label>
            <Input {...register("categoryNumber")} />
            {errors.categoryNumber && (
              <span className="text-red-500">
                {errors.categoryNumber.message}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            size="lg"
            className="bg-[#36459C] hover:bg-[#253285]"
            disabled={!isFormModified}
          >
            {formMode === "EDIT" ? "Update" : "Submit"}
          </Button>
          <Link
            to={`/administration/ledger-management/ledger-account-categories`}
          >
            <Button size="lg" onClick={cancelForm}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewLedgerCategoryForm;
