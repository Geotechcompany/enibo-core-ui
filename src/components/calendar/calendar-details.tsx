import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { Link, useNavigate } from "react-router-dom";


export const newCalendarSchema = z.object({
    businessCalendarId: z.string().min(3, { message: "Business Calendar ID is required" }),
    businessCalendarName: z.string().min(3, { message: "Business Calendar Name is required" }),
    startOfMonth: z.string().min(3, { message: "Start Of Month is required" }),
    workDays: z.string().min(3, { message: "Work Days is required" }),
    startOfWeek: z.string().min(3, { message: "Start Of Week is required" }),
    modifiedOn: z.string().min(3, { message: "Modified On is required" }),
  });
  
  type NewCalendarInput = z.infer<typeof newCalendarSchema>;
  
  interface NewCalendarProps {}
  
  const NewCalendar: FC<NewCalendarProps> = () => {
    const { toast } = useToast();
    const navigate  = useNavigate();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<NewCalendarInput>({
      resolver: zodResolver(newCalendarSchema),
    });
  
    const onSubmit = (data: NewCalendarInput) => {
      console.log(data);
      try{
        toast({
          title: "App Settings Created",
          description: <div className="text-black">
          <div className="text-lg">
            New Calendar Detail {" "}
            <Link to={`/administration/countries-list`} className="underline text-blue-500">
              {data.businessCalendarName}
            </Link>
             , has been successfully created
          </div>
        </div>,
        });
        reset();
        navigate("/administration/countries-list"); 
      } catch (error) {
        console.error("Error creating calendar detail:", error);
        toast({
          title: "Error",
          description: "Failed to create calendar detail. Please try again.",
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
            <Label htmlFor="businessCalendarId">Business Calendar ID</Label>
            <Input
              id="businessCalendarId"
              type="text"
              {...register("businessCalendarId", { required: true })}
            />
            {errors.businessCalendarId && (
              <span className="text-red-500">{errors.businessCalendarId.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="businessCalendarName">Business Calendar Name</Label>
            <Input
              id="businessCalendarName"
              type="text"
              {...register("businessCalendarName", { required: true })}
            />
            {errors.businessCalendarName && (
              <span className="text-red-500">{errors.businessCalendarName.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="startOfMonth">Start Of Month</Label>
            <Input
              id="startOfMonth"
              type="text"
              {...register("startOfMonth", { required: true })}
            />
            {errors.startOfMonth && (
              <span className="text-red-500">{errors.startOfMonth.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="workDays">Work Days</Label>
            <Input
              id="workDays"
              type="text"
              {...register("workDays", { required: true })}
            />
            {errors.workDays && (
              <span className="text-red-500">{errors.workDays.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="startOfWeek">Start Of Week</Label>
            <Input
              id="startOfWeek"
              type="text"
              {...register("startOfWeek", { required: true })}
            />
            {errors.startOfWeek && (
              <span className="text-red-500">{errors.startOfWeek.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="modifiedOn">Modified On</Label>
            <Input
              id="modifiedOn"
              type="text"
              {...register("modifiedOn", { required: true })}
            />
            {errors.modifiedOn && (
              <span className="text-red-500">{errors.modifiedOn.message}</span>
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
            <Button  size="lg">
              Cancel
            </Button>
          </div>
        </form>
      </section>
    );
  };
  
  export default NewCalendar;