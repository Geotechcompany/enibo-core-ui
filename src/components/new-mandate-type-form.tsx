import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";

const mandateTypeSchema = z.object({
  mandateTypeCode: z.string().min(3, { message: "MANDATE Type Code is required" }),
  mandateTypeName: z.string().min(3, { message: "MANDATE Type Name is required" }),
  mandateTypeDescription: z.string().min(3, { message: "Description is required" }),
});

type MandateTypeInput = z.infer<typeof mandateTypeSchema>;

interface NewMandateTypeFormProps {}

const NewMandateTypeForm: FC<NewMandateTypeFormProps> = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MandateTypeInput>({
    resolver: zodResolver(mandateTypeSchema),
  });

  const onSubmit = (data: MandateTypeInput) => {
    toast({
      title: "Mandate Type Created",
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mandateTypeCode">Mandate Type Code</Label>
            <Input
              id="mandateTypeCode"
              type="text"
              {...register("mandateTypeCode", { required: true })}
              className="mt-1"
            />
            {errors.mandateTypeCode && (
              <div className="text-red-500">{errors.mandateTypeCode.message}</div>
            )}
          </div>
          <div>
            <Label htmlFor="mandateTypeName">Mandate Type Name</Label>
            <Input
              id="mandateTypeName"
              type="text"
              {...register("mandateTypeName", { required: true })}
              className="mt-1"
            />
            {errors.mandateTypeName && (
              <div className="text-red-500">{errors.mandateTypeName.message}</div>
            )}
          </div>
          <div>
            <Label htmlFor="mandateTypeDescription">Description</Label>
            <Textarea
              id="mandateTypeDescription"
              {...register("mandateTypeDescription", { required: true })}
              className="mt-1"
            />
            {errors.mandateTypeDescription && (
              <div className="text-red-500">
                {errors.mandateTypeDescription.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit">Submit</Button>
          <Button  className="ml-2">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewMandateTypeForm;
