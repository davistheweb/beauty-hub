import z from "zod";

export const SecurityFormSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty({ error: "Current Password is required" }),
    newPassword: z
      .string()
      .nonempty({ error: "Password is required" })
      .min(8, { error: "Password must be 8 charaters or more" }),
    confirmNewPassword: z
      .string()
      .nonempty({ error: "Confirm Password is required" }),
  })
  .refine((val) => val.newPassword === val.confirmNewPassword, {
    error: "Password does not match",
    path: ["confirmNewPassword"],
  });

export type SecurityFormValues = z.infer<typeof SecurityFormSchema>;
