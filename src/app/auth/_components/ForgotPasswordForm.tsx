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
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ForgotPasswordForm() {
  const ForgotPasswordFormSchema = z.object({
    email: z.string().email("Account email is required"),
  });

  type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordFormSchema>;

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleLogin = async (values: ForgotPasswordFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    form.reset();
  };

  return (
    <div className="w-full bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="mt-5 flex flex-col gap-10 md:mt-10"
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col items-center justify-center gap-3">
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
    </div>
  );
}
