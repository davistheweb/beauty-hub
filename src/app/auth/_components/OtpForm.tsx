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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const OtpForm: React.FC = () => {
  const otpShema = z.object({
    otpCode: z.string().min(4, { error: "Required OTP length is 4" }),
  });

  const form = useForm({
    resolver: zodResolver(otpShema),
    defaultValues: {
      otpCode: "",
    },
  });

  const handelSubmitOTP = async (data: z.infer<typeof otpShema>) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
    
    form.reset();
  };

  return (
    <div className="w-full bg-white">
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
                      maxLength={4}
                      {...field}
                    >
                      {Array.from({ length: 4 }).map((E, I) => (
                        <InputOTPSlot
                          key={`${E}--${I}`}
                          className="h-[50px] w-[50px] rounded-sm border-1 text-center text-3xl font-normal select-none first:rounded-l-sm data-[active=true]:ring-[0px]"
                          index={I}
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
                <button className="text-custom-green ml-1 cursor-pointer">
                  Resend
                </button>
              </span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
