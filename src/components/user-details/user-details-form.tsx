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
import { Link, useNavigate } from "react-router-dom";

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
    reset,
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
      await signUpMutation({
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
      toast({
        title: "New User Created",
        description: <div className="text-black">
        <div className="text-lg">
          New User {" "}
          <Link to={`/administration/user-details`} className="underline text-blue-500">
            {data.username}
          </Link>
           , has been successfully created
        </div>
      </div>,
      });
      reset();
      navigate("/administration/user-details");
    } catch (error) {
      console.error("Error creating new user:", error);
      toast({
        title: "Error",
        description: "Failed to create new user. Please try again.",
      });
    }
  };

  const onCancel = () => {
    navigate("/administration");
  };

  const [defaultModifiedOn, setDefaultModifiedOn] = useState(
    new Date().toISOString()
  );

  useEffect(() => {
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
          <Label htmlFor="username" className="text-base">
            Username
          </Label>
          <Input
            {...register("username")}
            placeholder="Username"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
        <div className="col-span-1">
          <Label htmlFor="email" className="text-base space-y-2">
            Email
          </Label>
          <Input
            {...register("email")}
            placeholder="Your email"
            type="email"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="col-span-1">
          <Label htmlFor="phoneNumber" className="text-base">
            Phone Number
          </Label>
          <Input
            {...register("phoneNumber")}
            placeholder="Phone Number"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.phoneNumber && (
            <span className="text-red-500">{errors.phoneNumber.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="text-base">
            Password
          </Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="text-base">
            Confirm Password
          </Label>
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message!}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="firstName" className="text-base">
            First Name
          </Label>
          <Input
            {...register("firstName")}
            placeholder="First Name"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="middleName" className="text-base">
            Middle Name
          </Label>
          <Input
            {...register("middleName")}
            placeholder="Middle Name"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.middleName && (
            <span className="text-red-500">{errors.middleName.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="lastName" className="text-base">
            Last Name
          </Label>
          <Input
            {...register("lastName")}
            placeholder="Last Name"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="employeeNumber" className="text-base">
            Employee Number
          </Label>
          <Input
            {...register("employeeNumber")}
            placeholder="Employee Number"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.employeeNumber && (
            <span className="text-red-500">
              {errors.employeeNumber.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="branch" className="text-base">
            Branch
          </Label>
          <Input
            {...register("branch")}
            placeholder="Branch"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.branch && (
            <span className="text-red-500">{errors.branch.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="profile" className="text-base">
            Profile
          </Label>
          <Input
            {...register("profile")}
            placeholder="Profile"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.profile && (
            <span className="text-red-500">{errors.profile.message}</span>
          )}
        </div>
        <div>
          <Label
            htmlFor="documentAttachment"
            className="text-base"
          >
            Copy of Employee ID
          </Label>
          <Input
            {...register("documentAttachment")}
            id="documentAttachment"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
          />
          {errors.documentAttachment && (
            <span className="text-red-500">
              {errors.documentAttachment.message}
            </span>
          )}
        </div>
        <div className="hidden">
          <Label htmlFor="modifiedBy" className="text-base">
            Modified By
          </Label>
          <Input
            {...register("modifiedBy")}
            placeholder="Modified By"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
            defaultValue={"User"}
          />
          {errors.modifiedBy && (
            <span className="text-red-500">{errors.modifiedBy.message}</span>
          )}
        </div>
        <div className="hidden">
          <Label htmlFor="modifiedOn" className="text-base">
            Modified On
          </Label>
          <Input
            {...register("modifiedOn")}
            placeholder="Modified On (YYYY-MM-DDTHH:MM:SSZ)"
            type="text"
            className="h-12 text-base"
            autoComplete="false"
            defaultValue={defaultModifiedOn}
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
