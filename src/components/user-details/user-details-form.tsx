import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";

export const userDetailsSchema = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  firstName: z.string().min(2, { message: "First Name is required" }),
  middleName: z.string(),
  lastName: z.string().min(2, { message: "Last Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phoneNumber: z.string().min(10, { message: "Valid phone number is required" }),
  employeeNumber: z.string().min(3, { message: "Employee Number is required" }),
  branch: z.string().min(3, { message: "Branch is required" }),
  userProfile: z.string().min(3, { message: "User Profile is required" }),
  documentAttachment: z.object({
    fileName: z.string(),
    fileSize: z.number(),
    fileType: z.string(),
    fileContent: z.string(),
  }),
});

type UserDetailsInput = z.infer<typeof userDetailsSchema>;

interface UserDetailsFormProps {
  user?: UserDetailsInput;
}

const UserDetailsForm: FC<UserDetailsFormProps> = ({ user }) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetailsInput>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: user, 
  });

  const onSubmit = (data: UserDetailsInput) => {
    console.log(data);
    toast({
      title: "You submitted the following user details:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <section className="w-full flex justify-between">
      <form
        className="grid grid-cols-3 gap-8 w-[70%]"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="col-span-1">
          <Label htmlFor="username">Full Name</Label>
          <Input
            id="username"
            placeholder="Name"
            type="text"
            {...register("username", { required: true })}
            className="mt-2"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span> 
          )}
        </div>
        <div className="col-span-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="johndoe@gmail.com"
          type="email"
          {...register("email", { required: true })}
          className="mt-2"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="col-span-1">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          {...register("phoneNumber", { required: true })}
          className="mt-2"
        />
        {errors.phoneNumber && (
          <span className="text-red-500">{errors.phoneNumber.message}</span>
        )}
      </div>
      <div className="col-span-1">
        <Label htmlFor="employeeNumber">Employee Number</Label>
        <Input
          id="employeeNumber"
          type="text"
          {...register("employeeNumber", { required: true })}
          className="mt-2"
        />
        {errors.employeeNumber && (
          <span className="text-red-500">
            {errors.employeeNumber.message}
          </span>
        )}
      </div><div className="col-span-1">
        <Label htmlFor="branch">Branch</Label>
        <select
          id="branch"
          {...register("branch", { required: true })}
          className="block w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 mt-2"

        >
          <option value="branch1">Branch 1</option>
          <option value="branch2">Branch 2</option>
          
        </select>
        {errors.branch && (
          <span className="text-red-500">{errors.branch.message}</span>
        )}
      </div>
      <div className="col-span-1">
        <Label htmlFor="userProfile">Roles</Label>
        <select
          id="userProfile"
          {...register("userProfile", { required: true })}
          className="block w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 mt-2"
        >
          <option value="role1">Role 1</option>
          <option value="role2">Role 2</option>
          
        </select>
        {errors.userProfile && (
          <span className="text-red-500">
            {errors.userProfile.message}
          </span>
        )}
      </div>
        <div className="col-span-1">
          <Label htmlFor="documentAttachment">Copy of Employee ID</Label>
          <Input
            id="documentAttachment"
            type="file"
            {...register("documentAttachment")}
            className="w-full p-2 h-40 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-center" 
            placeholder="Drop here to attach or upload\nMax size: 5GB"
          />
          {errors.documentAttachment && (
            <span className="text-red-500">
              {errors.documentAttachment.message}
            </span>
          )}
        </div>

        <div className="col-span-3 flex gap-2">
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

export default UserDetailsForm;

