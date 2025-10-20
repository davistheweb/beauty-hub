import z from "zod";

const baseBannerSchema = z.object({
  title: z.string().trim().nonempty({ message: "Banner Title is required" }),
  subtitle: z.string().trim().nonempty({ message: "Subtitle is required" }),
});

export const addBannerFormSchema = baseBannerSchema.extend({
  image: z
    .instanceof(File, { message: "Banner photo is required" })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type,
        ),
      { message: "Only JPEG, PNG, WEBP and JPG are allowed" },
    ),
});

export const editBannerFormSchema = baseBannerSchema.extend({
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

export type BannerFormValues = {
  title: string;
  subtitle: string;
  image?: File;
};

export type addBannerFormValues = z.infer<typeof addBannerFormSchema>;
export type editBannerFormValues = z.infer<typeof editBannerFormSchema>;
