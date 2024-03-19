import { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CREATE_APP_SETTING, UPDATE_APP_SETTING } from "@/types/mutations";
import {  useMutation, useQuery } from "@apollo/client";
import { querySetting } from "@/types/queries";

const appSettingsSchema = z.object({
  appValue: z.string().min(3, { message: "App Value is required" }),
  moduleName: z.string().min(3, { message: "Module Name is required" }),
  description: z.string().min(3, { message: "Description Name is required" }),
  view: z.boolean(),
});

type appSettingsType = z.infer<typeof appSettingsSchema>;

interface NewAppSettingsFormProps {}

const NewAppSettingsForm: FC<NewAppSettingsFormProps> = () => {
  // check if setting id stored in local storage
  const storedSetting = localStorage.getItem("settings");
  const isCopyMode = storedSetting ? true : false;
  //get id from url with react router dom
  const { id } = useParams();
  // if there is id, it means we are in create mode
  const isEditMode = id ? true : false;

  // console.log(data);
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<appSettingsType>({
    resolver: zodResolver(appSettingsSchema),
  });
  const { data } = useQuery(querySetting, {
    variables: {
      settingId: id ? id : "",
    },
  });

  useEffect(() => {
    if (isEditMode) {
      if (data) {
        const { name, value, description, hidden } = data.setting;
        console.log(name, value, description, hidden);
        setValue("appValue", value);
        setValue("moduleName", name);
        setValue("description", description);
        setValue("view", hidden);
      }
    }
    if (isCopyMode) {
      const storedSettingString = localStorage.getItem("settings");
      if (storedSettingString !== null) {
        const { name, value, description, hidden } = JSON.parse(storedSettingString);
        setValue("appValue", value);
        setValue("moduleName", name);
        setValue("description", description);
        setValue("view", hidden);
      }
    }

  },[data, isEditMode, setValue, isCopyMode, storedSetting])

  const [createAppSetting] = useMutation(CREATE_APP_SETTING);
  const [updateAppSetting] = useMutation(UPDATE_APP_SETTING);

  const handleCreate = async (data: appSettingsType) => {
    try {
      const result = await createAppSetting({
        variables: {
          value: data.appValue,
          name: data.moduleName,
          description: data.description,
          hidden: data.view,
          modifiedBy: "Admin",
        },
      });
      toast({
        title: "App Settings Created",
        description: (
          <div className="text-black">
            <div className="text-lg">
              New App Settings{" "}
              <Link
                to={`/administration/app-settings`}
                className="text-blue-500 underline"
              >
                {result.data.createSetting.id}
              </Link>
              , has been successfully created
            </div>
          </div>
        ),
      });
      reset();
      localStorage.removeItem("settings");
      navigate("/administration/app-settings");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.graphQLErrors?.[0]?.extensions?.response?.body?.message ||
        "Unknown error";
      toast({
        title: "Error",
        description: `Failed ${errorMessage}. Please try again.`,
        variant: "destructive",
      });
    }
  }

  const handleEdit = async (data: appSettingsType) => {
    try {
      const result = await updateAppSetting({
        variables: {
          updateSettingId: id,
          value: data.appValue,
          name: data.moduleName,
          description: data.description,
          hidden: data.view,
          modifiedBy: "Admin",
        },
      });
      toast({
        title: "App Settings Updated",
        description: (
          <div className="text-black">
            <div className="text-lg">
              App Settings{" "}
              <Link
                to={`/administration/app-settings`}
                className="text-blue-500 underline"
              >
                {result.data.updateSetting.id}
              </Link>
              , has been successfully updated
            </div>
          </div>
        ),
      });
      reset();
      navigate("/administration/app-settings");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.graphQLErrors?.[0]?.extensions?.response?.body?.message ||
        "Unknown error";
      toast({
        title: "Error",
        description: `Failed ${errorMessage}. Please try again.`,
        variant: "destructive",
      });
    }
  }

  const onSubmit = async (data: appSettingsType) => {
    if (isEditMode) {
      handleEdit(data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 w-[30%]">
          <div>
            <Label htmlFor="appValue">App Value</Label>
            <Input
              id="appValue"
              type="text"
              {...register("appValue", { required: true })}
            />
            {errors.appValue && (
              <div className="text-red-500">{errors.appValue.message}</div>
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
              <div className="text-red-500">{errors.moduleName.message}</div>
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
              <div className="text-red-500">{errors.description.message}</div>
            )}
          </div>
          <div className="flex items-center">
            <input
              id="view"
              type="checkbox"
              className="h-10 "
              {...register("view")}
              defaultChecked={false}
            />
            <label className="ml-4 text-sm" htmlFor="view">
              View In UI
            </label>
            {errors.view && (
              <div className="ml-2 text-red-500">{errors.view.message}</div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit">Submit</Button>
          <Button
            className="ml-2"
            type="button"
            onClick={() => navigate("/administration/app-settings")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NewAppSettingsForm;
