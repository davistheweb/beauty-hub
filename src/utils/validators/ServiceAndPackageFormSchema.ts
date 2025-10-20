import z from "zod";

const addPackageFormSchema = z.object({
  name: z.string().nonempty({ error: "Package name is required" }),
  price: z.number({ error: "Price is required. eg: 2000.00" }),
  services: z
    .array(
      z.object({
        name: z.string().nonempty({ error: "This field is required" }),
      }),
    )
    .min(1, "At least, One Service is required!"),
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

type addPackageFormValues = z.infer<typeof addPackageFormSchema>;

export { addPackageFormSchema };

export type { addPackageFormValues };
