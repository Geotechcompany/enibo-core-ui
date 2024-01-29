import { zodResolver } from "@hookform/resolvers/zod";
import { FC} from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";


export const newCurrencySchema = z.object({
    currencyCode: z.string().min(3, { message: "Currency Code is required" }),
    currencyDescription: z.string().max(100, { message: "Description is required" }),
    currencySymbol: z.string().max(100, { message: "Symbol is required" }),
    country: z.string().min(3, { message: "Country is required" }),
  });


  type NewCurrencyInput = z.infer<typeof newCurrencySchema>;

  interface NewCurrencyProps {}
  
  const NewCurrency: FC<NewCurrencyProps> = () => {
    const { toast } = useToast();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<NewCurrencyInput>({
      resolver: zodResolver(newCurrencySchema),
    });
  
    const onSubmit = (data: NewCurrencyInput) => {
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
            <Label htmlFor="currencyCode">Currency Code</Label>
            <Input
              id="currencyCode"
              type="text"
              {...register("currencyCode", { required: true })}
              className="mt-1"
            />
            {errors.currencyCode && (
              <span className="text-red-500">{errors.currencyCode.message}</span>
            )}
          </div>
  
          <div className="flex gap-4">
            <div className="flex flex-col">
              <Label htmlFor="currencyDescription">Currency Description</Label>
              <Input
                id="currencyDescription"
                type="text"
                {...register("currencyDescription", { required: true })}
                className="mt-1"
              />
              {errors.currencyDescription && (
                <span className="text-red-500 mt-1">{errors.currencyDescription.message}</span>
              )}
            </div>
  
            <div className="flex flex-col">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                {...register("country", { required: true })}
                className="mt-1"
              />
              {errors.country && (
                <span className="text-red-500 mt-1">{errors.country.message}</span>
              )}
            </div>
          </div>
  
          <div className="flex gap-2">
            <Button
              type="submit"
              size="lg"
              className="bg-[#36459C] hover:bg-[#253285]"
            >
              Submit
            </Button>
        </div>
      </form>
    </section>
  );
};

export default NewCurrency;
