"use client";
import { usePackages } from "@/hooks";
import {
  addPackageFormSchema,
  addPackageFormValues,
} from "@/utils/validators/ServiceAndPackageFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MarkGreenIcon } from "../icons";
import CustomTrashIcon from "../icons/CustomTrashIcon";
import CustomUploadIcon2 from "../icons/CustomUploadIcon2";
import { Button } from "../ui/button";
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
import { Label } from "../ui/label";
interface IAddPackageFormProps {
  showAddPackageModal: boolean;
  setShowAddPackageModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPackageForm = ({
  showAddPackageModal,
  setShowAddPackageModal,
}: IAddPackageFormProps) => {
  const [addServices, setAddedServices] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const addPackageForm = useForm<addPackageFormValues>({
    resolver: zodResolver(addPackageFormSchema),
    defaultValues: {
      name: "",
      price: "",
      services: "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (addServices.length > 0) {
      addPackageForm.clearErrors("services");
    }
  }, [addServices.length, addPackageForm]);

  const { addPackage } = usePackages();

  //   const { fields, append, remove } = useFieldArray({
  //     control: addPackageForm.control,
  //     name: "services",
  //   });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // set the file dynamically based on the form type

      addPackageForm.setValue("image", file, { shouldValidate: true });

      // preview image
      setPreviewImage(URL.createObjectURL(file));
    },
  });

  const handleAddService = () => {
    const currentService = addPackageForm.getValues("services");

    if (currentService.trim() !== "") {
      setAddedServices((prev) => [...prev, currentService]);
      addPackageForm.setValue("services", "");
      addPackageForm.clearErrors(`services`);
    } else {
      addPackageForm.trigger("services");
    }
  };

  const handleRemoveService = (index: number) => {
    setAddedServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPackage = async (data: addPackageFormValues) => {
    const currentServiceInputValue = addPackageForm
      .getValues("services")
      ?.trim();

    const servicesPayload = [...addServices];

    if (currentServiceInputValue)
      servicesPayload.push(currentServiceInputValue);

    const finalPackageValues = {
      ...data,
      services: servicesPayload.map((service) => ({ name: service })),
    };
    console.log(finalPackageValues.services);

    const formData = new FormData();
    formData.append("name", finalPackageValues.name);
    formData.append("price", String(finalPackageValues.price));
    formData.append("image", finalPackageValues.image);
    // formData.append("services", JSON.stringify(finalPackageValues.services));

    finalPackageValues.services.forEach((service, index) => {
      formData.append(`services[${index}][name]`, service.name);
    });

    await addPackage.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        setTimeout(() => {
          addPackageForm.reset();
          setPreviewImage(null);
          setAddedServices([]);
          setShowAddPackageModal(false);
        }, 1000);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  return (
    <Dialog
      open={showAddPackageModal}
      onOpenChange={(modalOpen) => {
        setShowAddPackageModal(modalOpen);
        if (!modalOpen) {
          addPackageForm.reset();
          setPreviewImage(null);
        }
      }}
    >
      <DialogTrigger
        className="cursor-pointer"
        asChild
      >
        <Button className="bg-custom-green w-full cursor-pointer rounded-full px-[50px] font-semibold transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:bg-[#169B4E] hover:shadow-lg">
          <span>
            <Plus />
          </span>
          Add New Package
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-custom-green text-[18px] font-bold lg:text-xl">
            Add a Package
          </DialogTitle>
        </DialogHeader>

        <Form {...addPackageForm}>
          <form
            onSubmit={addPackageForm.handleSubmit(handleAddPackage)}
            className="space-y-2 p-1"
          >
            <FormField
              control={addPackageForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Package Name"
                      className="h-8 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]"
                      type="text"
                      name="name"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={addPackageForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Price (eg: 20000)"
                      className="h-8 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]"
                      name="price"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Label>Services</Label>

            <FormField
              control={addPackageForm.control}
              name={`services`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="space-y-2">
                    {addServices.length > 0 && (
                      <div className="scrollbar-thin flex h-[60px] flex-col overflow-y-auto">
                        {addServices.map((service, _i) => (
                          <div
                            key={_i}
                            className="flex w-full justify-between pb-1"
                          >
                            <span className="flex items-center gap-1 text-[14px] font-normal text-[#5C5A55]">
                              <span>
                                <MarkGreenIcon
                                  size={14}
                                  color="#1AB65C"
                                />
                              </span>
                              {service}
                            </span>
                            <button
                              type="button"
                              className="cursor-pointer"
                              onClick={() => handleRemoveService(_i)}
                            >
                              <CustomTrashIcon
                                color="#FF3333"
                                size={15}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <FormControl>
                      <div>
                        <Input
                          {...field}
                          placeholder="Service name"
                          className="h-8 selection:bg-green-700 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]"
                          name="services.0.name"
                          type="text"
                        />
                        <FormMessage className="text-xs" />
                      </div>
                    </FormControl>
                    <button
                      onClick={handleAddService}
                      type="button"
                      className="text-custom-green flex cursor-pointer items-center gap-1 text-[14px]"
                    >
                      <Plus size={15} />
                      Add Serive
                    </button>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={addPackageForm.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel className="text-[13px]">
                    Upload Service photo
                  </FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={`flex h-[90px] w-full cursor-pointer items-center justify-center rounded-xl border-[2px] border-dashed border-[#898A8C] transition-all ${
                        isDragActive
                          ? "border-[#1AB65C] bg-[#E9F9EF]"
                          : "border-[#C8C8C8] bg-[#F8F8F8]"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {previewImage ? (
                        <div className="relative h-[90px] w-full overflow-hidden rounded-lg">
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
                          <span className="flex h-[35px] w-[35px] items-center justify-center rounded-full">
                            <CustomUploadIcon2 size={25} />
                          </span>
                          <span className="text-center text-xs font-normal text-[#5C5A55]">
                            Upload Your Photo
                          </span>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-center">
              <Button
                type="submit"
                className={`bg-custom-green cursor-pointer rounded-full hover:bg-[#1fc966] ${addPackage.isPending ? "w-5" : "w-full"} transition-all duration-500 ease-in-out`}
                disabled={addPackage.isPending}
              >
                {addPackage.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="bg-custom-green w-fit rounded-full p-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-3 border-gray-200 border-t-[#1AB65C]" />
                    </div>
                  </div>
                ) : (
                  "Add A Package"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPackageForm;
