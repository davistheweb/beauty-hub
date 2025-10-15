import z from "zod";

export const ProfileFormSchema = z.object({
  fullName: z.string().nonempty({ error: "Full Name is required" }),
  email: z
    .email({ error: "Email is required" })
    .nonempty({ error: "Invalid Email" }),
  phoneNumber: z.string().nonempty({ error: "Phone number is required" }),
  profileImage: z
    .any()
    .refine(
      (files) => !files || (files instanceof FileList && files.length > 0),
      {
        error: "Image is required",
      },
    )
    .optional(),
});

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;
