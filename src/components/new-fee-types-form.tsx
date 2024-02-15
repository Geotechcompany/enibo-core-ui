import { FC } from 'react'
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
import { useMutation } from '@apollo/client';
import CREATE_FEE_TYPE_MUTATION from '@/Pages/FeeTypes/FeeTypesMutation';

const feeTypeSchema = z.object({
  feeCode: z
    .string()
    .min(3, { message: "Fee Code is required" }),
  feeName: z
    .string()
    .min(3, { message: "Fee Name is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  transactionType: z.enum(["Customer", "Internal"]),
  paymentFrequency: z
    .string()
    .min(3, { message: "Payment Frequency is required" }),
  effectiveDate: z.string().min(3, { message: "Effective Date is required" }),
  // fixedRate: z.string().min(3, { message: "Fixed Rate is required" }),
  fixedRate: z.string().min(3, { message: "Fixed Rate is required"}),
});

type FeeTypeInput = z.infer<typeof feeTypeSchema>;

interface NewFeeTypesFormProps {
  
}

const NewFeeTypesForm: FC<NewFeeTypesFormProps> = () => {
    const { toast } = useToast();
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<FeeTypeInput>({
      resolver: zodResolver(feeTypeSchema),
    });
    const [createfeetypeMutation] = useMutation(CREATE_FEE_TYPE_MUTATION);

    const onSubmit = (async (data: FeeTypeInput) => {
        try {
          await createfeetypeMutation({
            variables: {
              feeName: data.feeName,
              description: data.description,
              transactionTypes: [data.transactionType],
              paymentFrequency: data.paymentFrequency,
              effectiveDate: data.effectiveDate,
              fixedRate: data.fixedRate,
              modifiedBy: "", // Replace with actual value
              modifiedOn: new Date().toISOString(), // Replace with actual value
            },
          });
          
          toast({
            title: "Fee Type Created",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {/* Add description here if needed */}
                </code>
              </pre>
            ),
          });
        } catch (error) {
          console.error("Error creating fee type:", error);
          toast({
            title: "Error",
            description: "Failed to create fee type. Please try again.",
          });
        }
      });
      
       
        
  return <section>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 w-[30%]">
            <div>
                <Label htmlFor="feeCode">Fee Code</Label>
                <Input
                    id="feeCode"
                    type="text"
                    placeholder="Fee Code"
                    {...register("feeCode")}
                />
                {errors.feeCode && (
                    <span className="text-red-500">{errors.feeCode.message}</span>
                )}
            </div>
            <div>
                <Label htmlFor="feeName">Fee Name</Label>
                <Input
                    id="feeName"
                    type="text"
                    placeholder="Fee Name"
                    {...register("feeName")}
                />
                {errors.feeName && (
                    <span className="text-red-500">{errors.feeName.message}</span>
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
                <Label htmlFor="transactionType">Corresponding Transaction Type</Label>
                <Controller
                    name="transactionType"
                    control={control}
                    render={({ field: {onChange, value} }) => (
                        <Select
                            onValueChange={onChange}
                            value={value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select ..."/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Customer">Customer</SelectItem>
                                <SelectItem value="Internal">Internal</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.transactionType && (
                    <span className="text-red-500">{errors.transactionType.message}</span>
                )}
            </div>
            <div>
                <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                <Controller
                    name="paymentFrequency"
                    control={control}
                    render={({ field: {onChange, value} }) => (
                        <Select
                            onValueChange={onChange}
                            value={value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select ..."/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Daily">Daily</SelectItem>
                                <SelectItem value="Weekly">Weekly</SelectItem>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                                <SelectItem value="Yearly">Yearly</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.paymentFrequency && (
                    <span className="text-red-500">{errors.paymentFrequency.message}</span>
                )}
            </div>
            <div>
                <Label htmlFor="effectiveDate">Effective Date</Label>
                <Input
                    id="effectiveDate"
                    type="date"
                    placeholder="Effective Date"
                    {...register("effectiveDate")}
                />
                {errors.effectiveDate && (
                    <span className="text-red-500">{errors.effectiveDate.message}</span>
                )}
            </div>
            <div>
                <Label htmlFor="fixedRate">Fixed Rate (%)</Label>
                <Input
                    id="fixedRate"
                    type="text"
                    placeholder="Fixed Rate"
                    {...register("fixedRate")}
                />
                {errors.fixedRate && (
                    <span className="text-red-500">{errors.fixedRate.message}</span>
                )}
            </div>
        </div>
        <div className="flex gap-2 mt-4">
            <Button type="submit">Submit</Button>
            <Button >Cancel</Button>
        </div>
    </form>
  </section>
}

export default NewFeeTypesForm