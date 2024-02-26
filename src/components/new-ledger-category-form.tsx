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
import { gql, useQuery } from "@apollo/client";
import { LedgerCategory } from "@/types/global";
import { Link, useNavigate } from "react-router-dom";

const LedgerCategorySchema = z.object({
  ledgerCategory: z.string().min(3, { message: "Ledger Category is required" }),
  ledgerCategoryDescription: z
    .string()
    .min(3, { message: "Ledger Category Description is required" }),
  categoryNumber: z.string().min(1, { message: "Category Number is required" }),
});

type LedgerCategoryFormInputs = z.infer<typeof LedgerCategorySchema>;

interface NewLedgerCategoryFormProps {}

const GET_ACCOUNT_CATEGORIES = gql`
query AccountCategories {
  accountCategories {
    id
    ledgerCategory
    description
    categoryNumber
    modifiedBy
    modifiedOn
  }
}
`;
const NewLedgerCategoryForm: FC<NewLedgerCategoryFormProps> = () => {
  const { toast } = useToast();
  const [LedgerAccountCategories, setLedgerAccountCategories] = useState<LedgerCategory[]>([]);
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

  const onSubmit = (data: LedgerCategoryFormInputs) => {
    try{
      toast({
        title: "Ledger Category Created",
        description: <div className="text-black">
        <div className="text-lg">
          New Ledger Category Created {" "}
          <Link to={`/administration/ledger-management/ledger-account-categories`} className="underline text-blue-500">
            {data.ledgerCategory}
          </Link>
           , has been successfully created
        </div>
      </div>,
      });
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

  const { data } = useQuery(GET_ACCOUNT_CATEGORIES);
  useEffect(() => {
    if (data && data.accountCategories) {
      setLedgerAccountCategories(data.accountCategories);
    }
  }, [data]);

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
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {LedgerAccountCategories.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.ledgerCategory}
                      </SelectItem>
                    ))}
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
            <Textarea {...register("ledgerCategoryDescription")} />
            {errors.ledgerCategoryDescription && (
              <span className="text-red-500">
                {errors.ledgerCategoryDescription.message}
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
