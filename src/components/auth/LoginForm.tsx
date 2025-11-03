"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  LoginFormSchema,
  LoginFormValues,
} from "@/lib/validators/LoginFormSchema";
import { loginAdmin } from "@/services/Auth";
import { getErrorResponse } from "@/services/helpers";
import { storeAccessBearerToken } from "@/services/server";
import { AppDispatch } from "@/store";
import { setProfile } from "@/store/utils/adminProfileSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    await loginAdmin(values.email, values.password)
      .then(async (res) => {
        console.log(res);

        if (res.status) {
          Cookies.remove("cached_bearer_token", { path: "/" });
          await storeAccessBearerToken(res?.data?.data.bearer_token).then(
            () => {
              router.push("/dashboard");
              dispatch(
                setProfile({
                  fullName: res?.data?.data.user.name,
                  email: res?.data?.data.user.email,
                  phoneNumber: res?.data?.data.user.phone,
                  avatar: res?.data.data.user.avatar,
                }),
              );
            },
          );
        }
      })
      .catch((err) => {
        const error = getErrorResponse(err);
        toast.error(error?.message || "Something went wrong");
      });
  };

  return (
    <div className="w-full bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="mt-5 flex flex-col gap-3 md:mt-10 md:gap-10"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email address"
                    type="email"
                    name="email"
                    className="h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none"
                      disabled={form.formState.isSubmitting}
                    />
                    {form.getValues("password").length > 0 && (
                      <span
                        className="absolute top-3.5 right-3 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </span>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
                <span className="mt-2 flex justify-end text-sm">
                  <Link
                    href="/auth/account-recovery"
                    className="text-custom-green"
                  >
                    Forgot Password?
                  </Link>
                </span>
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-center">
            <Button
              type="submit"
              className={`bg-custom-green cursor-pointer rounded-full hover:bg-[#1fc966] ${form.formState.isSubmitting ? "w-5" : "w-full"} transition-all duration-500 ease-in-out`}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="bg-custom-green w-fit rounded-full p-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-3 border-gray-200 border-t-[#1AB65C]" />
                  </div>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
