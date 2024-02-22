import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { userProfileSchema } from "./schema";
import { Link, useNavigate } from "react-router-dom";


type UserProfileInput = z.infer<typeof userProfileSchema>;

interface UserProfileFormProps {
  user?: UserProfileInput;
}

const UserProfileForm: FC<UserProfileFormProps> = ({ user }) => {
  const { toast } = useToast();
  const navigate  = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileInput>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: user, 
  });

  const onSubmit = (data: UserProfileInput) => {
    console.log(data);
    try{
      toast({
        title: "Profile Created",
        description: <div className="text-black">
        <div className="text-lg">
          New User Profile {" "}
          <Link to={`/administration/user-management/profile-list`} className="underline text-blue-500">
            {data.profileName}
          </Link>
           , has been successfully created
        </div>
      </div>,
      });
      reset();
      navigate("/administration/user-management/profile-list"); 
    } catch (error) {
      console.error("Error creating user profile:", error);
      toast({
        title: "Error",
        description: "Failed to create user profile. Please try again.",
      });
    }
  };

  return (
    <section className="w-full flex justify-between">
      <form
        className="grid grid-cols-3 gap-8 w-[70%]"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="col-span-1">
          <Label htmlFor="profileName">Profile Name</Label>
          <Input
            id="profileName"
            placeholder="User profile name"
            type="text"
            {...register("profileName", { required: true })}
            className="mt-2"
          />
          {errors.profileName && (
            <span className="text-red-500">{errors.profileName.message}</span> 
          )}

         <div className="mt-4">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            type="text"
            {...register("description")}
            className="mt-2 w-full h-40"
            placeholder="Description text goes here"
           />
          {errors.description && (
            <span className="text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>
        </div>
        <div className="col-span-3 flex gap-2">
          <Button
            type="submit"
            size="lg"
            className="bg-[#36459C] hover:bg-[#253285]"
          >
            Save
          </Button>
          <Button  size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UserProfileForm;

