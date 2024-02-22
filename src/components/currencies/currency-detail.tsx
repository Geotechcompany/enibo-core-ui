import { zodResolver } from "@hookform/resolvers/zod";
import { FC} from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";


export const newCurrencySchema = z.object({
    currencyCode: z.string().min(3, { message: "Currency Code is required" }),
    currencyDescription: z.string().max(100, { message: "Description is required" }),
    currencySymbol: z.string().max(100, { message: "Symbol is required" }),
    currency: z.string().min(3, { message: "Currency is required" }),
  });


  type NewCurrencyInput = z.infer<typeof newCurrencySchema>;

  interface NewCurrencyProps {}
  
  const NewCurrency: FC<NewCurrencyProps> = () => {
    const { toast } = useToast();
    const navigate  = useNavigate();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<NewCurrencyInput>({
      resolver: zodResolver(newCurrencySchema),
    });
  
    const onSubmit = (data: NewCurrencyInput) => {
      console.log(data);
      try{
        toast({
          title: "Currency Created",
          description: <div className="text-black">
          <div className="text-lg">
            New Currency Created {" "}
            <Link to={`/administration/currencies-list`} className="underline text-blue-500">
              {data.currency}
            </Link>
             , has been successfully created
          </div>
        </div>,
        });
        reset();
        navigate("/administration/currencies-list"); 
      } catch (error) {
        console.error("Error creating currency:", error);
        toast({
          title: "Error",
          description: "Failed to create currency. Please try again.",
        });
      }
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
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                type="text"
                {...register("currency", { required: true })}
                className="mt-1"
              />
              {errors.currency && (
                <span className="text-red-500 mt-1">{errors.currency.message}</span>
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
