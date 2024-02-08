import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/logo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gql, useMutation } from '@apollo/client';

const isEmailExists = (email: string) => {
    const existingEmails = ['example@example.com', 'test@test.com'];
    return existingEmails.includes(email);
};

export const SIGNUP_MUTATION = gql`
mutation SignUp(
    $email: String!
    $password: String!
    $username: String!
    $firstName: String!
    $middleName: String!
    $lastName: String!
    $phoneNumber: String!
    $employeeNumber: String!
    $branch: String!
    $profile: String!
    $documentAttachment: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createUser(
      email: $email
      password: $password
      username: $username
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      phoneNumber: $phoneNumber
      employeeNumber: $employeeNumber
      branch: $branch
      profile: $profile
      documentAttachment: $documentAttachment
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      id
      email
      username
      firstName
      middleName
      lastName
      phoneNumber
      employeeNumber
      branch
      profile
      documentAttachment
      modifiedBy
      modifiedOn
    }
  }
`;

export const SignupSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }).refine(value => !isEmailExists(value), {
        message: 'Email already exists',
    }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters long' }),
    username: z.string().min(3, { message: 'Username is required' }),
    firstName: z.string().min(3, { message: 'First Name is required' }),
    middleName: z.string().min(3, { message: 'Middle Name is required' }),
    lastName: z.string().min(3, { message: 'Last Name is required' }),
    phoneNumber: z.string().min(3, { message: 'Phone Number is required' }),
    employeeNumber: z.string().min(3, { message: 'Employee Number is required' }),
    branch: z.string().min(3, { message: 'Branch is required' }),
    profile: z.string().min(3, { message: 'Profile is required' }),
    documentAttachment: z.string().min(3, { message: 'Document Attachment is required' }),
    modifiedBy: z.string().min(3, { message: 'Modified By is required' }),
    modifiedOn: z.string().min(3, { message: 'Modified On is required' }),
});

type SignupInput = z.infer<typeof SignupSchema>;

interface SignupProps {}

const Signup: FC<SignupProps> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: zodResolver(SignupSchema),
    });

    const [signUpMutation] = useMutation(SIGNUP_MUTATION);

    const onSubmit = async (data: SignupInput) => {
        setIsLoading(true);
        if (data.password !== data.confirmPassword) {
          setErrorMessage('Passwords do not match');
          setIsLoading(false);
          return;
        }
        try {
          const { data: { createUser } } = await signUpMutation({
            variables: {
              email: data.email,
              password: data.password,
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
            }
          });
          console.log('Sign up successful:', createUser);
          navigate('/');
        } catch (error) {
          console.error('Error signing up:', error);
          setErrorMessage('Error signing up. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      const [defaultModifiedOn, setDefaultModifiedOn] = useState(new Date().toISOString());

    useEffect(() => {
        // Update the defaultModifiedOn state with the current date and time
        setDefaultModifiedOn(new Date().toISOString());
    }, []);

    return (
        <section className="flex items-center justify-center h-screen align-middle bg-gray-300">
    <Card className="w-[70%]">
        <CardHeader></CardHeader>
        <CardContent>
            <form
                 className="grid grid-cols-3 gap-8"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <div className="flex justify-center">
                    <Logo />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Email, Password, Confirm Password */}
                    <div>
                        <Label
                            htmlFor="email"
                            className="text-[#36459C] text-base space-y-2"
                        >
                            Email
                        </Label>
                        <Input
                            {...register('email')}
                            placeholder="Your email"
                            type="email"
                            className="h-12 text-base bg-blue-50"
                            autoComplete="false"
                        />
                        {errors.email && (
                            <span className="text-red-500">{errors.email.message}</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-[#36459C] text-base">
                            Password
                        </Label>
                        <Input
                            {...register('password')}
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
                            {...register('confirmPassword')}
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
                            {...register('username')}
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
                            {...register('firstName')}
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
                            {...register('middleName')}
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
                            {...register('lastName')}
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
                            {...register('phoneNumber')}
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
                            {...register('employeeNumber')}
                            placeholder="Employee Number"
                            type="text"
                            className="h-12 text-base bg-blue-50"
                            autoComplete="false"
                        />
                        {errors.employeeNumber && (
                            <span className="text-red-500">{errors.employeeNumber.message}</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="branch" className="text-[#36459C] text-base">
                            Branch
                        </Label>
                        <Input
                            {...register('branch')}
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
                            {...register('profile')}
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
                        <Label htmlFor="documentAttachment" className="text-[#36459C] text-base">
                            Document Attachment
                        </Label>
                        <Input
                            {...register('documentAttachment')}
                            placeholder="Document Attachment"
                            type="text"
                            className="h-12 text-base bg-blue-50"
                            autoComplete="false"
                        />
                        {errors.documentAttachment && (
                            <span className="text-red-500">{errors.documentAttachment.message}</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="modifiedBy" className="text-[#36459C] text-base">
                            Modified By
                        </Label>
                        <Input
                            {...register('modifiedBy')}
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
                    <div>
                    <Label htmlFor="modifiedOn" className="text-[#36459C] text-base">
                        Modified On
                    </Label>
                    <Input
                        {...register('modifiedOn')}
                        placeholder="Modified On (YYYY-MM-DDTHH:MM:SSZ)"
                        type="text"
                        className="h-12 text-base bg-blue-50"
                        autoComplete="false"
                        defaultValue={defaultModifiedOn}
                    />
                    {errors.modifiedOn && (
                        <span className="text-red-500">{errors.modifiedOn.message}</span>
                    )}
                </div>
                </div>
                {errorMessage && <span className="text-red-500 text-center">{errorMessage}</span>}
                <div className="flex flex-col items-center justify-center">
                    <Button
                        className="w-full uppercase text-base bg-[#36459C] hover:bg-[#253285] h-12"
                        type="submit"
                        disabled={isLoading}
                    >
                        Sign Up
                    </Button>
                    <Link to="/" className="text-[#36459C] hover:text-[#253285]">
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </CardContent>
        <CardFooter></CardFooter>
    </Card>
</section>
    );
};

export default Signup;