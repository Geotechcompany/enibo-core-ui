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


import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_LEDGER_ACCOUNT_CATEGORIES } from "./ledger-categories-list/mutation";

const LedgerCategorySchema = z.object({
  ledgerCategory: z.string().min(3, { message: "Ledger Category is required" }),
  description: z
    .string()
    .min(3, { message: "Ledger Category Description is required" }),
  categoryNumber: z.string().min(1, { message: "Category Number is required" }),
});

type LedgerCategoryFormInputs = z.infer<typeof LedgerCategorySchema>;

interface NewLedgerCategoryFormProps {}


const NewLedgerCategoryForm: FC<NewLedgerCategoryFormProps> = () => {
  const { toast } = useToast();
  const [createAccountCategory] = useMutation(CREATE_LEDGER_ACCOUNT_CATEGORIES);
  const navigate  = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<LedgerCategoryFormInputs>({
    resolver: zodResolver(LedgerCategorySchema),
  });

  const onSubmit = async (data: LedgerCategoryFormInputs) => {
    try {
      const { ledgerCategory, description, categoryNumber } = data;

      // Perform mutation
      const { data: { createAccountCategory: createdCategory } } = await createAccountCategory({
        variables: {
          ledgerCategory,
          description,
          categoryNumber,
          modifiedBy: "tester",
          modifiedOn: new Date(new Date().toString().split("GMT")[0] + " UTC")
          .toISOString()
          .split(".")[0],
        }
      });

      // Show success toast
      toast({
        title: "Ledger Category Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              New Ledger Category Created {" "}
              <Link to={`/administration/ledger-management/ledger-account-categories`} className="underline text-blue-500">
                {createdCategory.ledgerCategory}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });

      // Reset form and navigate
      reset();
      navigate("/administration/ledger-management/ledger-account-categories");
    } catch (error) {
      console.error("Error creating ledger category ", error);
      toast({
        title: "Error",
        description: "Failed to create ledger category. Please try again.",
      });
    }
  };


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
          <div>
            <Label>Ledger Category Description</Label>
            <Textarea {...register("description")} />
            {errors.description && (
              <span className="text-red-500">
                {errors.description.message}
              </span>
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
          <Button type="submit">Submit</Button>
          <Button className="ml-2">Cancel</Button>
        </div>
      </form>
    </section>
  );
};

export default NewLedgerCategoryForm;
