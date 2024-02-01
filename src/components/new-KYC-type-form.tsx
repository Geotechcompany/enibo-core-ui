import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const kycTypeSchema = z.object({
  kycType: z.string().min(3, { message: "KYC Type is required" }),
  kycTypeCode: z.string().min(3, { message: "KYC Type Code is required" }),
  kycTypeName: z.string().min(3, { message: "KYC Type Name is required" }),
  KYCTypeDescription: z.string().min(3, { message: "Description is required" }),
});

type KYCTypeInput = z.infer<typeof kycTypeSchema>;

interface NewKYCTypeFormProps {}

const NewKYCTypeForm: FC<NewKYCTypeFormProps> = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<KYCTypeInput>({
    resolver: zodResolver(kycTypeSchema),
  });

  const onSubmit = (data: KYCTypeInput) => {
    toast({
      title: "KYC Type Created",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3">
        <div className="grid grid-cols-2 gap-4">
        <div>
            <Label htmlFor="kycType" className="mb-2">KYC Type</Label>
            <Controller
                  control={control}
                  name="kycType"
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select KYC Type" className="mt-1"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Individual">
                        Individual
                        </SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
            {errors.kycTypeName && (
              <div className="text-red-500">{errors.kycTypeName.message}</div>
            )}
          </div>
          <div>
            <Label htmlFor="kycTypeCode">KYC Type Code</Label>
            <Input
              id="kycTypeCode"
              type="text"
              {...register("kycTypeCode", { required: true })}
            />
            {errors.kycTypeCode && (
              <div className="text-red-500">{errors.kycTypeCode.message}</div>
            )}
          </div>
        </div>
        <div className="w-2/4 mt-4"> 
            <Label htmlFor="kycTypeName">KYC Type Name</Label>
            <Input
              id="kycTypeName"
              type="text"
              {...register("kycTypeName", { required: true })}
              className="mt-1"
            />
            {errors.kycTypeName && (
              <div className="text-red-500">{errors.kycTypeName.message}</div>
            )}
          </div>
        <div className="w-2/4 mt-4"> 
            <Label htmlFor="KYCTypeDescription">Description</Label>
            <Textarea
              id="KYCTypeDescription"
              {...register("KYCTypeDescription", { required: true })}
              className="mt-1"
            />
            {errors.KYCTypeDescription && (
              <div className="text-red-500">
                {errors.KYCTypeDescription.message}
              </div>
            )}
          </div>
        <div className="flex justify-start mt-8">
          <Button type="submit">Submit</Button>
          <Button variant="outline" className="ml-2">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewKYCTypeForm;
