import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Import the Textarea component
import { useToast } from "../ui/use-toast";

export const newBranchTypeSchema = z.object({
  branchName: z.string().min(3, { message: "Branch name is required" }),
  description: z.string().max(100, { message: "Description is required" }),
});

type newBranchInput = z.infer<typeof newBranchTypeSchema>;

interface NewBranchTypesProps {}

const NewBranchTypes: FC<NewBranchTypesProps> = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newBranchInput>({
    resolver: zodResolver(newBranchTypeSchema),
  });

  const onSubmit = (data: newBranchInput) => {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <section className="w-1/2"> 
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div>
          <Label htmlFor="branchName">Branch Name</Label>
          <Input
            id="branchName"
            type="text"
            {...register("branchName", { required: true })}
          />
          {errors.branchName && (
            <span className="text-red-500">{errors.branchName.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            size="lg"
            className="bg-[#36459C] hover:bg-[#253285]"
          >
            Submit
          </Button>
          <Button variant="outline" size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewBranchTypes;