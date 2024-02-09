import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@apollo/client";
import SIGNUP_MUTATION from "../UserList/UserList";
import { useNavigate } from "react-router-dom";

const isEmailExists = (email: string) => {
  const existingEmails = ["example@example.com", "test@test.com"];
  return existingEmails.includes(email);
};

export const userDetailsSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .refine((value) => !isEmailExists(value), {
      message: "Email already exists",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm Password must be at least 8 characters long" }),
  username: z.string().min(3, { message: "Username is required" }),
  firstName: z.string().min(3, { message: "First Name is required" }),
  middleName: z.string().min(3, { message: "Middle Name is required" }),
  lastName: z.string().min(3, { message: "Last Name is required" }),
  phoneNumber: z.string().min(3, { message: "Phone Number is required" }),
  employeeNumber: z.string().min(3, { message: "Employee Number is required" }),
  branch: z.string().min(3, { message: "Branch is required" }),
  profile: z.string().min(3, { message: "Profile is required" }),
  documentAttachment: z
    .string()
    .min(3, { message: "Document Attachment is required" }),
  modifiedBy: z.string().min(3, { message: "Modified By is required" }),
  modifiedOn: z.string().min(3, { message: "Modified On is required" }),
});

type UserDetailsInput = z.infer<typeof userDetailsSchema>;

interface UserDetailsFormProps {
  user?: UserDetailsInput;
}

const UserDetailsForm: FC<UserDetailsFormProps> = ({ user }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetailsInput>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: user,
  });

  const [signUpMutation] = useMutation(SIGNUP_MUTATION);

  const onSubmit = async (data: UserDetailsInput) => {
    setIsLoading(true);
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const {
        data: { createUser },
      } = await signUpMutation({
        variables: {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          username: data.username,
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          employeeNumber: data.employeeNumber,
          branch: data.branch,
          profile: data.profile,
          documentAttachment: data.documentAttachment,
          modifiedBy: data.modifiedBy,
          modifiedOn: data.modifiedOn,
        },
      });
      console.log("Sign up successful:", createUser);
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("Error signing up. Please try again.");
    } finally {
      setIsLoading(false);
    }

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

  const onCancel = () => {
    navigate("/administration");
  };

  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );

  useEffect(() => {
    // Update the defaultModifiedOn state with the current date and time
    setDefaultModifiedOn(new Date().toISOString());
  }, []);

  return (
    <section className="w-full flex justify-between">
      <form
        className="grid grid-cols-4 gap-8 w-[90%]"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="col-span-1">
          <Label htmlFor="username" className="text-[#36459C] text-base">
            Username
          </Label>
          <Input
            {...register("username")}
            placeholder="Username"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
        <div className="col-span-1">
          <Label htmlFor="email" className="text-[#36459C] text-base space-y-2">
            Email
          </Label>
          <Input
            {...register("email")}
            placeholder="Your email"
            type="email"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="col-span-1">
          <Label htmlFor="phoneNumber" className="text-[#36459C] text-base">
            Phone Number
          </Label>
          <Input
            {...register("phoneNumber")}
            placeholder="Phone Number"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.phoneNumber && (
            <span className="text-red-500">{errors.phoneNumber.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="text-[#36459C] text-base">
            Password
          </Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="text-[#36459C] text-base">
            Confirm Password
          </Label>
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message!}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="username" className="text-[#36459C] text-base">
            Username
          </Label>
          <Input
            {...register("username")}
            placeholder="Username"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="firstName" className="text-[#36459C] text-base">
            First Name
          </Label>
          <Input
            {...register("firstName")}
            placeholder="First Name"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="middleName" className="text-[#36459C] text-base">
            Middle Name
          </Label>
          <Input
            {...register("middleName")}
            placeholder="Middle Name"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.middleName && (
            <span className="text-red-500">{errors.middleName.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="lastName" className="text-[#36459C] text-base">
            Last Name
          </Label>
          <Input
            {...register("lastName")}
            placeholder="Last Name"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="phoneNumber" className="text-[#36459C] text-base">
            Phone Number
          </Label>
          <Input
            {...register("phoneNumber")}
            placeholder="Phone Number"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.phoneNumber && (
            <span className="text-red-500">{errors.phoneNumber.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="employeeNumber" className="text-[#36459C] text-base">
            Employee Number
          </Label>
          <Input
            {...register("employeeNumber")}
            placeholder="Employee Number"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.employeeNumber && (
            <span className="text-red-500">
              {errors.employeeNumber.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="branch" className="text-[#36459C] text-base">
            Branch
          </Label>
          <Input
            {...register("branch")}
            placeholder="Branch"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.branch && (
            <span className="text-red-500">{errors.branch.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="profile" className="text-[#36459C] text-base">
            Profile
          </Label>
          <Input
            {...register("profile")}
            placeholder="Profile"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.profile && (
            <span className="text-red-500">{errors.profile.message}</span>
          )}
        </div>
        <div>
          <Label
            htmlFor="documentAttachment"
            className="text-[#36459C] text-base"
          >
            Copy of Employee ID
          </Label>
          <Input
            {...register("documentAttachment")}
            id="documentAttachment"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
          />
          {errors.documentAttachment && (
            <span className="text-red-500">
              {errors.documentAttachment.message}
            </span>
          )}
        </div>
        <div className="hidden">
          <Label htmlFor="modifiedBy" className="text-[#36459C] text-base">
            Modified By
          </Label>
          <Input
            {...register("modifiedBy")}
            placeholder="Modified By"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
            defaultValue={"User"}
          />
          {errors.modifiedBy && (
            <span className="text-red-500">{errors.modifiedBy.message}</span>
          )}
        </div>
        <div className="hidden">
          <Label htmlFor="modifiedOn" className="text-[#36459C] text-base">
            Modified On
          </Label>
          <Input
            {...register("modifiedOn")}
            placeholder="Modified On (YYYY-MM-DDTHH:MM:SSZ)"
            type="text"
            className="h-12 text-base bg-blue-50"
            autoComplete="false"
            defaultValue={defaultModifiedOn} // Set the default value
          />
          {errors.modifiedOn && (
            <span className="text-red-500">{errors.modifiedOn.message}</span>
          )}
        </div>
        {errorMessage && (
          <span className="text-red-500 text-center">{errorMessage}</span>
        )}
        <div className="col-span-3 flex gap-2">
          <Button
            type="submit"
            size="lg"
            className="bg-[#36459C] hover:bg-[#253285]"
            disabled={isLoading}
          >
            Submit
          </Button>
          <Button onClick={onCancel} size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UserDetailsForm;
