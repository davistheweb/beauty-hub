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
import { sendOtpViaMail } from "@/services/Auth";
import { TReoveryStage } from "@/types";
import maskMail from "@/utils/maskMail";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { AuthWrapper } from "./AuthWrapper";
import { OtpForm } from "./OtpForm";
import PasswordReset from "./PasswordReset";

export default function AccountRecovery() {
  const [recoveryStage, setRecoveryStage] =
    useState<TReoveryStage>("email-form");
  const [userMail, setUserMail] = useState<string>("");

  
  const ForgotPasswordFormSchema = z.object({
    email: z.email({ error: "Account's email is required" }),
  });

  type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordFormSchema>;

  const email_form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    await sendOtpViaMail(values.email)
      .then((res) => {
        if (res.status) {
          setUserMail(res?.data?.data?.email);
          toast.success(res?.data?.message);

          email_form.reset();
          setTimeout(() => setRecoveryStage("otp-form"), 1100);
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong",
        );
      });
  };

  const recoveryFormTitle = `${
    recoveryStage === "email-form"
      ? "Reset your password"
      : recoveryStage === "otp-form"
        ? "Enter OTP"
        : (recoveryStage === "reset-form" && "Confirm New Password") || "Login"
  }`;

  const recoveryFormSubtitle = `${
    recoveryStage === "email-form"
      ? "Don't worry, We'll send you reset instructions"
      : recoveryStage === "otp-form"
        ? `A 5 digits code has been sent to your email <span style='color: #1AB65C;'>${maskMail(userMail)}</span> to verify account.`
        : (recoveryStage === "reset-form" &&
            "Please ensure your new password is distinct from any you have used before.") ||
          "Login into your account"
  }`;

  return (
    <AuthWrapper
      formTitle={recoveryFormTitle}
      formSubtitle={recoveryFormSubtitle}
    >
      <div className="w-full bg-white">
        {recoveryStage === "email-form" ? (
          <Form {...email_form}>
            <form
              onSubmit={email_form.handleSubmit(handleForgotPassword)}
              className="mt-5 flex flex-col gap-10 md:mt-10"
            >
              <FormField
                name="email"
                control={email_form.control}
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
                        disabled={email_form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full flex-col items-center justify-center gap-3">
                <Button
                  type="submit"
                  className={`bg-custom-green cursor-pointer rounded-full hover:bg-[#1fc966] ${email_form.formState.isSubmitting ? "w-5" : "w-full"} transition-all duration-500 ease-in-out`}
                  disabled={email_form.formState.isSubmitting}
                >
                  {email_form.formState.isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="bg-custom-green w-fit rounded-full p-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-3 border-gray-200 border-t-[#1AB65C]" />
                      </div>
                    </div>
                  ) : (
                    "Send"
                  )}
                </Button>
                <span className="mt-2 flex justify-end text-center text-sm">
                  <Link
                    href="/auth/login"
                    className="text-custom-green"
                  >
                    I remember my password
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        ) : recoveryStage === "otp-form" ? (
          <OtpForm
            setRecoveryStage={setRecoveryStage}
            userMail={userMail}
          />
        ) : (
          recoveryStage === "reset-form" && (
            <PasswordReset userMail={userMail} />
          )
        )}
      </div>
    </AuthWrapper>
  );
}
