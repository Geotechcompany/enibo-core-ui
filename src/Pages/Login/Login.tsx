import { FC, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { gql, useMutation } from '@apollo/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";


const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      token
    }
  }
`;

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password is required" }),
});

type LoginInput = z.infer<typeof LoginSchema>;

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State to hold the error message

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: "/administration"};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data && data.authenticate && data.authenticate.token) {
        localStorage.setItem('token', data.authenticate.token);
        setIsLoading(false);
        navigate(from, { replace: true });
      } else {
        setError("Login failed. Please check your credentials.");
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.log("Log error", error)
      setError(`${error.message}. Sign up or try again.` );
      setIsLoading(false);
    },
  });

  const onSubmit = (data: LoginInput) => {
    setIsLoading(true);
    setError(null); // Reset error state
    loginMutation({ variables: data });
  };

  return (
    <section className="flex items-center justify-center h-screen align-middle">
      <Card className="w-[30%]">
        <CardHeader></CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="flex justify-center">
              <Logo />
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>} {/* Display error message */}
            <div className="flex flex-col gap-4">
              <div>
                <Label
                  htmlFor="email"
                  className="text-[#36459C] text-base space-y-2"
                >
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
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Button
                className="w-full uppercase text-base bg-[#36459C] hover:bg-[#253285] h-12"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              
              <Link to="/" className="text-[#36459C] hover:text-[#253285]">
                Forgot Password?
              </Link>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
};

export default Login;