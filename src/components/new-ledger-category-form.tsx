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

const LedgerCategorySchema = z.object({
  ledgerCategory: z.string().min(3, { message: "Ledger Category is required" }),
  ledgerCategoryDescription: z
    .string()
    .min(3, { message: "Ledger Category Description is required" }),
  categoryNumber: z.string().min(1, { message: "Category Number is required" }),
});

type LedgerCategoryFormInputs = z.infer<typeof LedgerCategorySchema>;

interface NewLedgerCategoryFormProps {}

const NewLedgerCategoryForm: FC<NewLedgerCategoryFormProps> = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LedgerCategoryFormInputs>({
    resolver: zodResolver(LedgerCategorySchema),
  });

  const onSubmit = (data: LedgerCategoryFormInputs) => {
    toast({
      title: "Ledger Category Created",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Category 1</SelectItem>
                    <SelectItem value="2">Category 2</SelectItem>
                    <SelectItem value="3">Category 3</SelectItem>
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
          <Button variant="outline" className="ml-2">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewLedgerCategoryForm;
