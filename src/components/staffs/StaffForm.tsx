"use client";
import { useStaff } from "@/hooks";
import {
  addStaffFormSchema,
  addStaffFormValues,
  StaffFormValues,
  updatedStaffFormSchema,
  updatedStaffFormValues,
} from "@/lib/validators/StaffFormSchema";
import getErrorResponse from "@/services/helpers";
import { IStaff } from "@/types/IStaff";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface IStaffFormProps {
  staffs: IStaff[];
  showStaffFormDialog: boolean;
  setShowStaffFormDialog: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStaff: IStaff | null;
  setSelectedStaff: React.Dispatch<React.SetStateAction<IStaff | null>>;
  staffFormAction: "addStaff" | "updateStaff";
  setStaffFormAction: React.Dispatch<
    React.SetStateAction<"addStaff" | "updateStaff">
  >;
}

const StaffForm = ({
  staffs,
  showStaffFormDialog,
  setShowStaffFormDialog,
  selectedStaff,
  setSelectedStaff,
  staffFormAction,
  setStaffFormAction,
}: IStaffFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const addStaffFormResolver = zodResolver(
    addStaffFormSchema,
  ) as unknown as Resolver<StaffFormValues>;

  const updateStaffFormResolver = zodResolver(
    updatedStaffFormSchema,
  ) as unknown as Resolver<StaffFormValues>;

  const addStaffForm = useForm<StaffFormValues>({
    resolver: addStaffFormResolver,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const updateStaffForm = useForm<StaffFormValues>({
    resolver: updateStaffFormResolver,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (selectedStaff && staffFormAction === "updateStaff") {
      updateStaffForm.reset({
        name: selectedStaff.name || "",
        email: selectedStaff.email || "",
        phone: selectedStaff.phone || "",
      });
    }
  }, [selectedStaff, staffFormAction, updateStaffForm]);

  const { addStaff, updateStaff } = useStaff();

  const form = staffFormAction === "addStaff" ? addStaffForm : updateStaffForm;

  const handleAddOrUpdateStaff = async (
    data: addStaffFormValues | updatedStaffFormValues,
  ) => {
    if (staffFormAction === "addStaff") {
      const addStaffPayload = data as addStaffFormValues;

      await addStaff.mutate(
        {
          name: addStaffPayload.name,
          email: addStaffPayload.email,
          phone: addStaffPayload.phone,
          password: addStaffPayload.password,
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            setTimeout(() => {
              addStaffForm.reset();
              setShowStaffFormDialog(false);
            }, 1000);
          },
          onError: (err) => {
            const error = getErrorResponse(err);
            toast.error(error.message || "Something went wrong");
            console.log(error);
          },
        },
      );
    } else if (staffFormAction === "updateStaff") {
      const updateStaffPayload = data as updatedStaffFormValues;

      await updateStaff.mutate(
        {
          id: String(selectedStaff?.id),
          name: updateStaffPayload.name,
          email: updateStaffPayload.email,
          phone: updateStaffPayload.phone,
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            setTimeout(() => {
              setStaffFormAction("addStaff");
              setSelectedStaff(null);
              updateStaffForm.reset();
              setShowStaffFormDialog(false);
            }, 1000);
          },

          onError: (err) => {
            const error = getErrorResponse(err);
            toast.error(error.message || "Something went wrong");
            console.log(err);
          },
        },
      );
    }
  };

  return (
    <Dialog
      open={showStaffFormDialog}
      onOpenChange={(dialogOpen) => {
        setShowStaffFormDialog(dialogOpen);
        if (!dialogOpen) {
          addStaffForm.reset();
        }
      }}
    >
      {staffs.length > 0 && (
        <DialogTrigger
          className="cursor-pointer"
          asChild
        >
          <Button
            onClick={() => setStaffFormAction("addStaff")}
            className="bg-custom-green w-full cursor-pointer rounded-full px-[50px] font-semibold transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:bg-[#169B4E] hover:shadow-lg"
          >
            <span>
              <Plus />
            </span>
            Add Staff
          </Button>
        </DialogTrigger>
      )}
      <DialogOverlay className="pointer-events-auto fixed inset-0 bg-black/50" />
      <DialogContent className="overflow-x-hidden overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-custom-green text-[18px] font-bold lg:text-xl">
            {staffFormAction === "addStaff"
              ? "Add Staff Name"
              : staffFormAction === "updateStaff" && "Update Staff Info"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 max-h-[50vh] space-y-4 overflow-y-auto md:max-h-[100vh]">
          <Form
            {...(staffFormAction === "addStaff"
              ? addStaffForm
              : updateStaffForm)}
          >
            <form
              onSubmit={form.handleSubmit(handleAddOrUpdateStaff)}
              className="space-y-2 p-1"
            >
              <FormField
                control={
                  staffFormAction === "addStaff"
                    ? addStaffForm.control
                    : updateStaffForm.control
                }
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Full Name"
                        className={`h-12 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]`}
                        type="text"
                        name="name"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={
                  staffFormAction === "addStaff"
                    ? addStaffForm.control
                    : updateStaffForm.control
                }
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter email address"
                        className={`h-12 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]`}
                        name="email"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={
                  staffFormAction === "addStaff"
                    ? addStaffForm.control
                    : updateStaffForm.control
                }
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter email address"
                        className={`h-12 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]`}
                        name="phone"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              {staffFormAction === "addStaff" && (
                <FormField
                  name="password"
                  control={addStaffForm.control}
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
                          {String(addStaffForm.getValues("password")).length >
                            0 && (
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
              )}

              <div className="flex w-full items-center justify-center">
                <Button
                  type="submit"
                  className={`bg-custom-green cursor-pointer rounded-full hover:bg-[#1fc966] ${addStaff.isPending || updateStaff.isPending ? "w-5" : "w-full"} transition-all duration-500 ease-in-out`}
                  disabled={addStaff.isPending}
                >
                  {addStaff.isPending || updateStaff.isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="bg-custom-green w-fit rounded-full p-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-3 border-gray-200 border-t-[#1AB65C]" />
                      </div>
                    </div>
                  ) : staffFormAction === "addStaff" ? (
                    "Add Staff"
                  ) : (
                    staffFormAction === "updateStaff" && "Update Staff Info"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StaffForm;
