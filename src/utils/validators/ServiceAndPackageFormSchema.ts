import z from "zod";

const basePackageFormSchema = z.object({
  name: z.string().nonempty({ error: "Package name is required" }),
  price: z.string().nonempty({ error: "Price is required. eg: 2000.00" }),
});

const addPackageFormSchema = basePackageFormSchema.extend({
  services: z.string().nonempty({ error: "This field is required" }),
  image: z
    .instanceof(File, { message: "Package photo is required" })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type,
        ),
      { message: "Only JPEG, PNG, WEBP and JPG are allowed" },
    ),
});

const updatePackageFormSchema = basePackageFormSchema.extend({
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type,
        ),
      { message: "Only JPEG, PNG, WEBP and JPG are allowed" },
    ),
});

type PackageFormValues = {
  name: string;
  price: string;
  services?: string;
  image?: File;
};

type addPackageFormValues = z.infer<typeof addPackageFormSchema>;

type updatePackageFormValues = z.infer<typeof updatePackageFormSchema>;

export { addPackageFormSchema, updatePackageFormSchema };

export type {
  PackageFormValues,
  addPackageFormValues,
  updatePackageFormValues,
};
