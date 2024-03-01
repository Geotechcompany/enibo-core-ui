import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_LEDGER_CATEGORIES } from "@/components/ledger-categories-list/mutation";
import queryaccountcategoriesList from "@/components/ledger-categories-list/query";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";
import { useLedgerState } from "@/store/ledger";


export const LedgerCategorySchema = z.object({
  ledgerCategory: z.string().min(3, { message: "Ledger Category is required" }),
  description: z.string().min(3, { message: "Ledger Category Description is required" }),
  categoryNumber: z.string().min(1, { message: "Category Number is required" }),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),
  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type LedgerCategoryFormInputs = z.infer<typeof LedgerCategorySchema>;

interface NewLedgerCategoryFormProps {}


const NewLedgerCategoryForm: FC<NewLedgerCategoryFormProps> = () => {
  const { state } = useLedgerState();
  const { ledgerCategory } = useParams<{ ledgerCategory: string }>();
  const  isCopyMode  = !state;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isFormModified, setIsFormModified] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    control,
  } = useForm<LedgerCategoryFormInputs>({
    resolver: zodResolver(LedgerCategorySchema),
  });

  const { data: ledgerCategoryData, loading: ledgerCategoryLoading } = useQuery(queryaccountcategoriesList, {
    variables: { ledgerCategory }, // Pass as a variable to the query
  });

  const [updateLedgerAccountsCategoryMutation] = useMutation(UPDATE_LEDGER_CATEGORIES);

  const onSubmit = async (data: LedgerCategoryFormInputs) => {
    try {
      const { ledgerCategory, description, categoryNumber } = data;
      await updateLedgerAccountsCategoryMutation({
        variables: {
          ledgerCategory,
          description,
          categoryNumber,
          modifiedBy: "tester",
          modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
            .toISOString()
            .split(".")[0],
        },
      });
      // Show success toast
      toast({
        title: "Ledger Category Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              Ledger Category {data.ledgerCategory}, has been successfully updated
            </div>
          </div>
        ),
      });

      // Reset form and navigate
      reset();
      navigate("/administration/ledger-management/ledger-account-categories");
    } catch (error) {
      console.error("Error updating ledger category ", error);
      toast({
        title: "Error",
        description: "Failed to update ledger category. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (!ledgerCategoryLoading && ledgerCategoryData && ledgerCategoryData.LedgerAccountCategories) {
      const foundLedgerCategory = ledgerCategoryData.LedgerAccountCategories.find(
        (category: { ledgerCategory: string | undefined }) =>
          category.ledgerCategory === ledgerCategory
      );
      if (foundLedgerCategory) {
        const { ledgerCategory, categoryNumber, description, modifiedBy, modifiedOn } = foundLedgerCategory;
        setValue("ledgerCategory", ledgerCategory);
        setValue("description", description || "");
        setValue("categoryNumber", categoryNumber || "");
        setValue("modifiedBy", modifiedBy || "");
        setValue("modifiedOn", modifiedOn || new Date().toISOString());
      }
    }
  }, [ledgerCategory, ledgerCategoryLoading, ledgerCategoryData, setValue]);
  
  

  useEffect(() => {
    const handleFormChange = () => {
      setIsFormModified(true);
    };

    window.addEventListener("input", handleFormChange);

    return () => {
      window.removeEventListener("input", handleFormChange);
    };
  }, []);
  useEffect(() => {
    if (!isCopyMode && state) {
      const { ledgerCategory, description , categoryNumber } = state;

      setValue("ledgerCategory", ledgerCategory);
      setValue("description", description);
      setValue("categoryNumber", categoryNumber);

    }
  }, [])
  return (
    <section className="px-4">
    <div className="pt-2">
      <nav className="text-sm text-blue-500" aria-label="Breadcrumb">
        <ol className="inline-flex p-0 m-0 list-none">
          <li className="flex items-center m-0">
            <Link to="/administration">Administration</Link>
            <svg
              className="w-3 h-3 mx-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>
          <li className="flex items-center m-0">
            <Link to="/administration/ledger-management/ledger-account-categories">Ledger Accounts</Link>
            <svg
              className="w-3 h-3 mx-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>
          <li className="m-0">
            <Link to="#" className="text-gray-500" aria-current="page">
             Edit Ledger Account Category Details
            </Link>
          </li>
        </ol>
      </nav>
    </div>
    <div className="flex items-center justify-between my-4">
      <div className="">
        <h1 className="text-4xl text-[#36459C]">
         Edit Ledger Account Category Details
        </h1>
      </div>
    </div>
   <form
     className="flex flex-col gap-8"
     onSubmit={handleSubmit(onSubmit)}
     autoComplete="off"
   >
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
            {errors.ledgerCategory && <span className="text-red-500">{errors.ledgerCategory.message}</span>}
          </div>
          <div>
            <Label>Ledger Category Description</Label>
            <Textarea {...register("description")} />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>
          <div>
            <Label>Category Number</Label>
            <Input {...register("categoryNumber")} />
            {errors.categoryNumber && <span className="text-red-500">{errors.categoryNumber.message}</span>}
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit" size="lg" className="bg-[#36459C] hover:bg-[#253285]" disabled={!isFormModified}>
            Update
          </Button>
          <Link to={`/administration/ledger-management/ledger-account-categories`}>
            <Button size="lg">Cancel</Button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewLedgerCategoryForm;
