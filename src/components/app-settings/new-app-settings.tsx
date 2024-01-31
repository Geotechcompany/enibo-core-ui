import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";


const appSettingsSchema = z.object({
    appsettingID: z.string().min(3, { message: "App Settings ID is required" }),
    appValue: z.string().min(3, { message: "App Value is required" }),
    moduleName: z.string().min(3, { message: "Module Name is required" }),
    description: z.string().min(3, { message: "Description Name is required" }),
    view: z.boolean()
})  

type appSettingsType = z.infer<typeof appSettingsSchema>;

interface NewAppSettingsFormProps {}

const NewAppSettingsForm: FC<NewAppSettingsFormProps> = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<appSettingsType>({
    resolver: zodResolver(appSettingsSchema),
  });

  const onSubmit = (data: appSettingsType) => {
    toast({
      title: "New App Settings Created",
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
            <Label htmlFor="appsettingID">App Settings ID</Label>
            <Input
              id="appsettingID"
              type="text"
              {...register("appsettingID", { required: true })}
            />
            {errors.appsettingID && (
              <div className="text-red-500">
                {errors.appsettingID.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="appValue">App Value</Label>
            <Input
              id="appValue"
              type="text"
              {...register("appValue", { required: true })}
            />
            {errors.appValue && (
              <div className="text-red-500">
                {errors.appValue.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="moduleName">Module Name</Label>
            <Input
              id="moduleName"
              type="text"
              {...register("moduleName", { required: true })}
            />
            {errors.moduleName && (
              <div className="text-red-500">
                {errors.moduleName.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <div className="text-red-500">
                {errors.description.message}
              </div>
            )}
          </div>
          <div className="flex items-center">
            <input
                id="view"
                type="checkbox"
                className=" h-10"
                {...register("view")}
                defaultChecked={false}
            />
            <label className="text-sm ml-4" htmlFor="view">
                View In UI
            </label>
            {errors.view && (
                <div className="text-red-500 ml-2">{errors.view.message}</div>
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

export default NewAppSettingsForm;
