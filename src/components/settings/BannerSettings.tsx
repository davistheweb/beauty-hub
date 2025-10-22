"use client";
import { useBanner } from "@/hooks";
import { IBanner } from "@/types/IBanner";
import {
  addBannerFormSchema,
  addBannerFormValues,
  BannerFormValues,
  editBannerFormSchema,
  editBannerFormValues,
} from "@/utils/validators/BannerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CustomUploadIcon } from "../icons";
import { NoDataFoundElement } from "../no-data";
import { Button } from "../ui/button";
import { CardSkeleton } from "../ui/CardSkeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
import { Textarea } from "../ui/textarea";
import BannerCard from "./BannerCard";

export default function BannerSettings({
  setComponentIsUploading,
}: {
  setComponentIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [bannerAction, setBannerAction] = useState<
    "addBanner" | "updateBanner"
  >("addBanner");

  const [updateBannerValues, setUpdateBannerValues] = useState<IBanner | null>(
    null,
  );

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  //Banners Hooks

  const { banners, isLoading, deleteBanner, addBanner, updateBanner } =
    useBanner();

  const addResolver = zodResolver(
    addBannerFormSchema,
  ) as unknown as Resolver<BannerFormValues>;
  const editResolver = zodResolver(
    editBannerFormSchema,
  ) as unknown as Resolver<BannerFormValues>;

  const addBannerForm = useForm<BannerFormValues>({
    resolver: addResolver,
    defaultValues: { title: "", subtitle: "", image: undefined },
  });

  const editBannerForm = useForm<BannerFormValues>({
    resolver: editResolver,
    defaultValues: {
      image: undefined,
      title: "",
      subtitle: "",
    },
  });

  //I used this effect function to setValues when the edit dialog opens

  useEffect(() => {
    if (updateBannerValues && bannerAction === "updateBanner") {
      editBannerForm.reset({
        title: updateBannerValues.title || "",
        subtitle: updateBannerValues.subtitle || "",
        image: undefined,
      });
      setPreviewImage(updateBannerValues.image || null);
    }
  }, [updateBannerValues, bannerAction, editBannerForm]);

  const form = bannerAction === "addBanner" ? addBannerForm : editBannerForm;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // set the file dynamically based on the form type
      const option: { shouldValidate: boolean } = { shouldValidate: true };
      if (bannerAction === "addBanner") {
        addBannerForm.setValue("image", file, { ...option });
      } else {
        editBannerForm.setValue("image", file, { ...option });
      }

      // preview image
      setPreviewImage(URL.createObjectURL(file));
    },
  });

  //I am using this function to handle submission Of adding and editing banner
  const handleAddOREditBannerAction = async (
    data: addBannerFormValues | editBannerFormValues,
  ) => {
    console.log(data);
    if (bannerAction === "addBanner") {
      setComponentIsUploading(true);
      const addBannerFormDataValues = data as addBannerFormValues;

      const formData = new FormData();

      formData.append("title", addBannerFormDataValues.title);
      formData.append("subtitle", addBannerFormDataValues.subtitle);
      formData.append("image", addBannerFormDataValues.image);

      await addBanner.mutate(formData, {
        onSuccess: (data) => {
          toast.success(data.message);
          setComponentIsUploading(false);
          addBannerForm.reset();
          setPreviewImage(null);
        },
        onError: (err) => {
          setComponentIsUploading(false);
          console.log(err);
        },
      });
    } else if (bannerAction === "updateBanner") {
      if (
        editBannerForm.getValues("title").trim() ===
          updateBannerValues?.title &&
        editBannerForm.getValues("subtitle").trim() ===
          updateBannerValues?.subtitle
      )
        return; //I disabled submit if users doesn't change the value
      setComponentIsUploading(true);
      const editBannerFormDataValues = data as editBannerFormValues;

      const formData = new FormData();

      formData.append("id", String(updateBannerValues?.id));

      formData.append("title", editBannerFormDataValues.title);
      formData.append("subtitle", editBannerFormDataValues.subtitle);

      if (editBannerFormDataValues.image) {
        formData.append(
          "image",
          (editBannerFormDataValues.image as File) || undefined,
        );
      }

      await updateBanner.mutate(formData, {
        onSuccess: (data) => {
          toast.success(data.message);
          setComponentIsUploading(false);
          editBannerForm.reset();
          setPreviewImage(null);
          setUpdateBannerValues(null);
          setTimeout(() => {
            setOpenDialog(false);
            setBannerAction("addBanner");
          }, 1200);
        },
        onError: (err) => {
          setComponentIsUploading(false);
          console.log(err);
        },
      });
    }
  };

  return (
    <div className="mt-5 flex h-full w-full flex-col items-center justify-center rounded-2xl">
      <Dialog
        open={openDialog}
        onOpenChange={(diaLogOpen) => {
          setOpenDialog(diaLogOpen);

          if (!diaLogOpen) {
            form.reset();
            setPreviewImage(null);
            setBannerAction("addBanner");
          }
        }}
      >
        {banners.length > 0 && (
          <DialogTrigger
            className="cursor-pointer"
            asChild
          >
            <div className="flex w-full items-center justify-center lg:justify-end">
              {" "}
              <Button
                className="bg-custom-green w-full cursor-pointer rounded-full px-[50px] font-semibold transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:bg-[#169B4E] hover:shadow-lg lg:w-fit"
                suppressHydrationWarning
              >
                <span>
                  <Plus />
                </span>
                Add New Banner
              </Button>
            </div>
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-custom-green text-[18px] font-bold lg:text-2xl">
              {bannerAction === "addBanner"
                ? "Add New Banner"
                : bannerAction === "updateBanner" && "Update Banner"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddOREditBannerAction)}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div
                        {...getRootProps()}
                        className={`flex h-[120px] w-full cursor-pointer items-center justify-center rounded-xl border-[2px] border-dashed border-[#898A8C] transition-all ${
                          isDragActive
                            ? "border-[#1AB65C] bg-[#E9F9EF]"
                            : "border-[#C8C8C8] bg-[#F8F8F8]"
                        }`}
                      >
                        <input {...getInputProps()} />
                        {previewImage ? (
                          <div className="relative h-[110px] w-full overflow-hidden rounded-lg">
                            <Image
                              src={previewImage}
                              alt="preview"
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                        ) : isDragActive ? (
                          <div>
                            <span>Drop Here</span>
                          </div>
                        ) : (
                          <div className="text-muted-foreground flex w-[265px] flex-col items-center justify-center gap-2 text-center text-sm">
                            <span className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#D1F0DE]">
                              <CustomUploadIcon size={15} />
                            </span>
                            <span className="text-center font-normal text-[#5C5A55]">
                              Click to upload or drag and drop PNG or JPG (max,
                              1030x170px)
                            </span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Title"
                        className="h-12 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]"
                        type="text"
                        name="title"
                        disabled={addBanner.isPending || updateBanner.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Message"
                        className="h-[130px] resize-none selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]"
                        name="subtitle"
                        disabled={addBanner.isPending || updateBanner.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full items-center justify-center">
                <Button
                  type="submit"
                  className={`bg-custom-green cursor-pointer rounded-full hover:bg-[#1fc966] ${addBanner.isPending || updateBanner.isPending ? "w-5" : "w-full"} transition-all duration-500 ease-in-out`}
                  disabled={addBanner.isPending || updateBanner.isPending}
                >
                  {addBanner.isPending || updateBanner.isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="bg-custom-green w-fit rounded-full p-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-3 border-gray-200 border-t-[#1AB65C]" />
                      </div>
                    </div>
                  ) : bannerAction === "addBanner" ? (
                    "Upload"
                  ) : (
                    bannerAction === "updateBanner" && "Update"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {!isLoading && !banners.length ? (
        <div className="flex h-[500px] w-full flex-col items-center justify-center">
          <NoDataFoundElement
            title="No Banner Settings Yet!"
            subtitle="Add A new One"
          >
            <Button
              className="bg-custom-green cursor-pointer rounded-full hover:bg-[#169B4E]"
              onClick={() => {
                setOpenDialog((prev) => !prev);
              }}
            >
              <span>
                <Plus />
              </span>
              Add New Banner
            </Button>
          </NoDataFoundElement>
        </div>
      ) : (
        <div className="mt-2 h-full w-full px-1">
          <div className="scrollbar-thin mt-2 grid h-full grid-cols-1 justify-items-center gap-8 overflow-x-hidden px-8 py-3 sm:grid-cols-2 sm:gap-15 md:gap-15 lg:h-[598px] lg:gap-10 lg:overflow-y-auto xl:gap-10">
            {isLoading ? (
              <CardSkeleton />
            ) : (
              banners.map((data, _i: number) => (
                <BannerCard
                  key={_i}
                  imgSrc={data.image}
                  title={data.title}
                  message={data.subtitle}
                  status={data.status}
                  handleDeleteBanner={() => {
                    setComponentIsUploading(true);
                    deleteBanner.mutate(data.id, {
                      onSuccess: (data) => {
                        toast.success(data.message);
                        setComponentIsUploading(false);
                      },
                      onError: (err) => {
                        setComponentIsUploading(false);
                        console.log(err);
                      },
                    });
                  }}
                  handleUpdateBanner={() => {
                    setBannerAction("updateBanner");
                    setOpenDialog((prev) => !prev);
                    if (data) {
                      setUpdateBannerValues(data);
                      console.log(data);
                    }
                  }}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
