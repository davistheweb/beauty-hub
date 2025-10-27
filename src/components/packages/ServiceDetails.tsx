import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePackages } from "@/hooks";
import { IPackage } from "@/types/IPackages";
import getErrorMessage from "@/utils/getErrorMessage";
import {
  addServiceToPackageFormSchema,
  addServiceToPackageFormValues,
} from "@/utils/validators/ServiceAndPackageFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CustomTrashIcon, MarkGreenIcon } from "../icons";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface IServiceDetailsProps {
  openServiceDetailsModal: boolean;
  setOpenServiceDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPackage: IPackage | null;
  setSelectedPackage: React.Dispatch<React.SetStateAction<IPackage | null>>;
  handleUpdatePackage: () => void;
}
export const ServiceDetails = ({
  openServiceDetailsModal,
  setOpenServiceDetailsModal,
  selectedPackage,
  setSelectedPackage,
  handleUpdatePackage,
}: IServiceDetailsProps) => {
  const { addServiceToPackage, deletePackageService } = usePackages();

  const form = useForm<addServiceToPackageFormValues>({
    resolver: zodResolver(addServiceToPackageFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleAddSerivce = async (data: addServiceToPackageFormValues) => {
    await addServiceToPackage.mutate(
      { package_id: selectedPackage?.id as number, name: data.name },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          form.reset();
          setTimeout(() => {
            setOpenServiceDetailsModal((prev) => !prev);
            setSelectedPackage(null);
          }, 1000);
        },
        onError: (err) => {
          const error = getErrorMessage(err);
          toast.error(error.message);
        },
      },
    );
  };

  const handleDeleteService = (id: number) => {
    if (deletePackageService.isPending) {
      toast.error("wait..");
      return;
    }
    const toastID = toast.loading("Deleting Service.....");

    deletePackageService.mutate(id, {
      onSuccess: (data) => {
        toast.dismiss(toastID);
        toast.success(data.data.data);
        setTimeout(() => {
          setOpenServiceDetailsModal((prev) => !prev);
          setSelectedPackage(null);
        }, 1000);
      },
      onError: (err) => {
        const error = getErrorMessage(err);
        toast.dismiss(toastID);
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog
      open={openServiceDetailsModal}
      onOpenChange={(serviceModalOpen) => {
        setOpenServiceDetailsModal(serviceModalOpen);
        if (!serviceModalOpen) {
          setSelectedPackage(null);
        }
      }}
    >
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-custom-green text-[18px] font-bold lg:text-xl">
            Service Details
          </DialogTitle>
        </DialogHeader>

        <div className="relative flex flex-col gap-3 overflow-hidden">
          <div className="space-y-1">
            <h1 className="font-semibold text-[#070500]">
              Customer Information
            </h1>
            <div className="flex h-[180px] flex-col justify-start rounded-[4px] border border-[#E4E4E4] p-2 px-5 lg:h-[150px] lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:px-0">
              <div className="relative h-[170px] w-[200px] overflow-hidden rounded-[10px] border border-[#E4E4E4] lg:h-[100px]">
                <Image
                  src={
                    selectedPackage?.image ||
                    "https:\/\/beauty.literesults.net\/storage\/images\/package\/Afro_Taper_Beard_1759941070.png"
                  }
                  alt="service image"
                  fill
                  className="rounded-lg object-cover"
                  draggable={false}
                  unoptimized
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[14px] font-semibold text-[#070500] md:text-xl">
                  {selectedPackage?.name}
                </h1>
                <p className="text-[15px] font-bold text-[#5C5A55] md:text-xl">
                  ₦{selectedPackage?.price.split(".")[0]}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="font-semibold text-[#070500]">All Serives</h1>
            <ul className="scrollbar-thin flex h-fit max-h-[100px] flex-col gap-1 overflow-y-auto border border-[#E4E4E4] p-3 lg:max-h-[110px]">
              {selectedPackage?.services.map((service, _i) => (
                <li
                  key={_i}
                  className="flex justify-between"
                >
                  <span className="flex items-center gap-1 text-[14px] font-normal text-[#5C5A55]">
                    <span>
                      <MarkGreenIcon
                        size={14}
                        color="#1AB65C"
                      />
                    </span>
                    {service.name}
                  </span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        type="button"
                        className="cursor-pointer"
                      >
                        <CustomTrashIcon
                          color="#FF3333"
                          size={15}
                        />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete the service "
                          {service.name}"
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the review from the server
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteService(service.id)}
                          className="cursor-pointer bg-red-500 hover:bg-red-600"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAddSerivce)}
                className="space-y-2 p-1"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Service Name"
                          className={`h-12 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]`}
                          type="text"
                          name="name"
                          disabled={addServiceToPackage.isPending}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="flex w-full items-center justify-center">
                  <Button
                    type="submit"
                    className={`bg-custom-green cursor-pointer rounded-full hover:bg-[#1fc966] ${addServiceToPackage.isPending ? "w-5" : "w-full"} transition-all duration-500 ease-in-out`}
                    disabled={addServiceToPackage.isPending}
                  >
                    {addServiceToPackage.isPending ? (
                      <div className="flex items-center justify-center">
                        <div className="bg-custom-green w-fit rounded-full p-2">
                          <div className="h-5 w-5 animate-spin rounded-full border-3 border-gray-200 border-t-[#1AB65C]" />
                        </div>
                      </div>
                    ) : (
                      "Add Service"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          {/* Action Buttons  */}
          <div className="relative flex">
            <Button
              onClick={handleUpdatePackage}
              className="text-custom-green h-[40px] w-full cursor-pointer rounded-full border border-[#1AB65C] bg-[#F9FFFB] text-sm font-semibold hover:bg-[#f1faf4]"
            >
              Update Package
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
