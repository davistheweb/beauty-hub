"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getErrorResponse } from "@/services/helpers";
import { changeProfileAvatar, updateProfile } from "@/services/profile";
import { AppDispatch, RootState } from "@/store";
import { setProfile } from "@/store/utils/adminProfileSlice";
import { ProfileFormValues } from "@/utils/validators/ProfileFormSchema";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormReturn } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { CustomUploadIcon } from "../icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ProfileSettings({
  setComponentIsUploading,
  profileForm,
}: {
  setComponentIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  profileForm: UseFormReturn<ProfileFormValues>;
}) {
  const [isUploading, setIsUploadloading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const adminState = useSelector((state: RootState) => state.admin.profile);

  const handleProfileUpdate = async (data: ProfileFormValues) => {
    if (
      profileForm.getValues("fullName").trim() ===
        adminState?.fullName?.trim() &&
      // profileForm.getValues("email").trim() === adminState.email?.trim() &&
      profileForm.getValues("phoneNumber").trim() ===
        adminState.phoneNumber?.trim()
    ) {
      return;
    }
    setComponentIsUploading(true);
    await updateProfile(data.fullName, data.phoneNumber)
      .then((res) => {
        if (res.status) {
          toast.success(res.data?.message);
          dispatch(
            setProfile({
              ...adminState,
              fullName: res?.data?.data[0].name,
              email: res?.data?.data[0].email,
              phoneNumber: res?.data?.data[0].phone,
            }),
          );
        }
      })
      .catch((err) => {
        const error = getErrorResponse(err);
        toast.error(error?.errorMsg?.message || "Something went wrong");
      })
      .finally(() => setComponentIsUploading(false));
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      console.log(file);

      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

      if (!validTypes.includes(file.type)) {
        toast.error(
          "Can't upload. Use an image in one of these formats: .jpg, .png, .bmp, .jpeg",
        );
        return;
      }

      setIsUploadloading(true);
      setComponentIsUploading(true);
      const formData = new FormData();
      formData.append("avatar", file);

      await changeProfileAvatar(formData)
        .then((res) => {
          if (res.status) {
            console.log(res);
            toast.success(res.data?.message);
            dispatch(
              setProfile({
                ...adminState,
                avatar: res?.data?.data[0].avatar,
              }),
            );
          }
        })
        .catch((err) => {
          const error = getErrorResponse(err);
          toast.error(error?.errorMsg?.message || "Something went wrong");
        })
        .finally(() => {
          setIsUploadloading(false);
          setComponentIsUploading(false);
        });
    },
    [adminState, dispatch, setComponentIsUploading],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
  });

  return (
    <div className="mt-5 w-full rounded-2xl border border-[#E2E8F0] p-4">
      {/* Image */}
      <Label
        {...getRootProps()}
        className="flex h-[100px] w-full cursor-pointer items-center justify-center rounded-xl border-[2px] border-dashed border-[#898A8C] bg-[#7E7E7E0D] xl:h-[132px]"
      >
        <input
          className="hidden"
          {...getInputProps()}
        />
        {isDragActive ? (
          <div>
            <span>Drop Here</span>
          </div>
        ) : isUploading ? (
          <div className="flex h-screen items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#1AB65C]" />
          </div>
        ) : (
          <div className="flex h-max w-[265px] flex-col items-center justify-center gap-3 p-2 py-2">
            <span className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#D1F0DE]">
              <CustomUploadIcon size={15} />
            </span>
            <span className="text-center text-sm font-normal text-[#5C5A55]">
              Click to upload or drag and drop PNG or JPG (max, 1030x170px)
            </span>
          </div>
        )}
      </Label>

      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(handleProfileUpdate)}
          className="mt-5 flex w-full flex-col gap-4 xl:gap-4"
        >
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
                      disabled
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
              className={`bg-custom-green h-[55px] w-full cursor-pointer rounded-full hover:bg-[#16aa53] xl:w-[365px]`}
              disabled={profileForm.formState.isSubmitting}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
