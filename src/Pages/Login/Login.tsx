import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import Logo from "@/components/logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginInput = z.infer<typeof LoginSchema>;

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = (data: LoginInput) => {
    console.log(data);
    setIsLoading(true);
    //set timeout to simulate api call
    setTimeout(() => {
      setIsLoading(false);
      navigate(from, { replace: true });
    }, 2000);
  };

  return (
    <section className="flex items-center justify-center h-screen align-middle bg-gray-300">
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
                Login
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
