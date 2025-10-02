"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { resendOtp, verifyOtpCode } from "@/services/Auth";
import { TReoveryStage } from "@/types/TRecoveryStage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const OtpForm = ({
  setRecoveryStage,
  userMail,
}: {
  setRecoveryStage: React.Dispatch<React.SetStateAction<TReoveryStage>>;
  userMail: string;
}) => {
  const [resendOtpCountdown, SetResendOtpCountdown] = useState<number>(30);
  const otpShema = z.object({
    otpCode: z.string().min(5, { error: "Required OTP length is 5" }),
  });

  const form = useForm({
    resolver: zodResolver(otpShema),
    defaultValues: {
      otpCode: "",
    },
  });

  const handelSubmitOTP = async (value: z.infer<typeof otpShema>) => {
    await verifyOtpCode(value.otpCode, userMail)
      .then((res) => {
        if (res.status) setTimeout(() => setRecoveryStage("reset-form"), 1200);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      });
  };

  useEffect(() => {
    if (resendOtpCountdown <= 0) return;
    const reduceTimeOut = setInterval(() => {
      SetResendOtpCountdown((prev) => prev - 1);
      if (resendOtpCountdown === 0) clearInterval(reduceTimeOut);
    }, 1000);

    return () => clearInterval(reduceTimeOut);
  }, [resendOtpCountdown]);

  const handleResendOtp = async () => {
    if (resendOtpCountdown > 0) return;
    resendOtp(userMail)
      .then((res) => {
        if (res.status) {
          toast.success(res?.data?.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handelSubmitOTP)}>
        <div className="mt-3 flex flex-col items-center justify-center gap-10">
          <FormField
            control={form.control}
            name="otpCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={5}
                    {...field}
                  >
                    {Array.from({ length: 5 }, (arr, i) => i).map((i) => (
                      <InputOTPSlot
                        key={i}
                        className="h-[50px] w-[50px] rounded-sm border-1 text-center text-3xl font-normal select-none first:rounded-l-sm data-[active=true]:ring-[0px]"
                        index={i}
                      />
                    ))}
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-center text-xs" />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col items-center justify-center">
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
                "Send"
              )}
            </Button>
            <span className="mt-2 flex justify-end text-center text-sm text-gray-500">
              Didn&apos;t Recieve the code?
              {!resendOtpCountdown ? (
                <button
                  className="text-custom-green ml-1 cursor-pointer"
                  type="button"
                  onClick={handleResendOtp}
                >
                  Resend
                </button>
              ) : (
                <span className="text-custom-green ml-2">
                  0 : {resendOtpCountdown}
                </span>
              )}
            </span>
          </div>
        </div>
      </form>
    </Form>
  );
};
