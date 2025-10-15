"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SecurityFormSchema,
  SecurityFormValues,
} from "@/utils/validators/SecurityFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState<boolean>(false);

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(SecurityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handlePasswordUpdate = async (data: SecurityFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <div className="mt-5 h-[500px] w-full rounded-2xl border border-[#E2E8F0] p-4">
      <Form {...securityForm}>
        <form
          onSubmit={securityForm.handleSubmit(handlePasswordUpdate)}
          className="mt-5 flex w-full flex-col gap-2 xl:gap-7"
        >
          <FormField
            name="currentPassword"
            control={securityForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative xl:w-max">
                    <Input
                      {...field}
                      placeholder="Current Password"
                      type={showCurrentPassword ? "text" : "password"}
                      name="password"
                      className="h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]"
                      disabled={securityForm.formState.isSubmitting}
                    />
                    {securityForm.getValues("currentPassword").length > 0 && (
                      <span
                        className="absolute top-3.5 right-3 cursor-pointer text-gray-500"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                      >
                        {showCurrentPassword ? (
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

          <div className="flex w-full flex-col gap-4 py-3 xl:h-[110px] xl:flex-row xl:items-center xl:justify-between xl:gap-[24px]">
            <FormField
              name="newPassword"
              control={securityForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="New Password"
                        type={showNewPassword ? "text" : "password"}
                        name="password"
                        className="h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]"
                        disabled={securityForm.formState.isSubmitting}
                      />
                      {securityForm.getValues("newPassword").length > 0 && (
                        <span
                          className="absolute top-3.5 right-3 cursor-pointer text-gray-500"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                        >
                          {showNewPassword ? (
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
              name="confirmNewPassword"
              control={securityForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Confirm Password"
                        type={showConfirmNewPassword ? "text" : "password"}
                        name="password"
                        className="h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]"
                        disabled={securityForm.formState.isSubmitting}
                      />
                      {securityForm.getValues("confirmNewPassword").length >
                        0 && (
                        <span
                          className="absolute top-3.5 right-3 cursor-pointer text-gray-500"
                          onClick={() =>
                            setShowConfirmNewPassword((prev) => !prev)
                          }
                        >
                          {showConfirmNewPassword ? (
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
          </div>
          <div className="flex w-full items-center justify-center xl:justify-start">
            <Button
              className={`bg-custom-green ${securityForm.formState.isSubmitting ? "w-4" : "h-[55px] w-full xl:w-[365px]"} cursor-pointer rounded-full hover:bg-[#16aa53]`}
              disabled={securityForm.formState.isSubmitting}
            >
              {securityForm.formState.isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="bg-custom-green w-fit rounded-full p-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-3 border-gray-200 border-t-[#1AB65C]" />
                  </div>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
