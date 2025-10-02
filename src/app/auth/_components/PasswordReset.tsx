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
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function PasswordReset({ userMail }: { userMail: string }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConformPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const PasswordResetFormSchema = z
    .object({
      password: z.string().nonempty({ error: "Password is required" }),
      confirmPassword: z
        .string()
        .nonempty({ error: "Confirm  password is required" }),
    })
    .refine(
      (val) => {
        return val.password === val.confirmPassword;
      },
      { error: "Passwords do not match", path: ["confirmPassword"] },
    );

  type PasswordResetFormValues = z.infer<typeof PasswordResetFormSchema>;

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(PasswordResetFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handlePasswordReset = async (values: PasswordResetFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    form.reset();
  };

  return (
    <div className="w-full bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePasswordReset)}
          className="mt-5 flex flex-col gap-5 md:mt-10 md:gap-10"
        >
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
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Confirm Password"
                      type={showConformPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none"
                    />
                    {form.getValues("confirmPassword").length > 0 && (
                      <span
                        className="absolute top-3.5 right-3 cursor-pointer text-gray-500"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConformPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </span>
                    )}
                    <FormMessage />
                  </div>
                </FormControl>
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
