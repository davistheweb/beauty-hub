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
  ProfileFormSchema,
  ProfileFormValues,
} from "@/utils/validators/ProfileFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomUploadIcon from "../icons/CustomUploadIcon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ProfileSettings() {
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const handleProfileUpdate = async (data: ProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <div className="mt-5 w-full rounded-2xl border border-[#E2E8F0] p-4">
      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(handleProfileUpdate)}
          className="mt-3 flex w-full flex-col gap-4 xl:gap-4"
        >
          {/* Image */}
          <FormField
            name="profileImage"
            control={profileForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="profileImage"
                  className="flex h-[100px] w-full cursor-pointer items-center justify-center rounded-xl border-[2px] border-dashed border-[#898A8C] bg-[#7E7E7E0D] xl:h-[132px]"
                >
                  <div className="flex h-max w-[265px] flex-col items-center justify-center gap-3 p-2 py-2">
                    <span className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#D1F0DE]">
                      <CustomUploadIcon size={15} />
                    </span>
                    <span className="text-center text-sm font-normal text-[#5C5A55]">
                      Click to upload or drag and drop PNG or JPG (max,
                      1030x170px)
                    </span>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="hidden h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none"
                    placeholder="Full name"
                    type="file"
                    accept="image/*"
                    name="profileImage"
                    id="profileImage"
                    disabled={profileForm.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="fullName"
            control={profileForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none"
                    placeholder="Full name"
                    type="text"
                    name="fullName"
                    disabled={profileForm.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full flex-col gap-4 py-3 xl:h-[110px] xl:flex-row xl:items-center xl:justify-between xl:gap-[24px]">
            <FormField
              name="email"
              control={profileForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Addreess</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      className="h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]"
                      type="email"
                      name="email"
                      disabled={profileForm.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phoneNumber"
              control={profileForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Phone Number"
                      className="h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]"
                      type="text"
                      name="phoneNumber"
                      disabled={profileForm.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-center xl:justify-start">
            <Button
              className={`bg-custom-green ${profileForm.formState.isSubmitting ? "w-4" : "h-[55px] w-full xl:w-[365px]"} cursor-pointer rounded-full hover:bg-[#16aa53]`}
              disabled={profileForm.formState.isSubmitting}
            >
              {profileForm.formState.isSubmitting ? (
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
