import z from "zod";

const PasswordResetFormSchema = z
  .object({
    password: z
      .string()
      .nonempty({ error: "Password is required" })
      .min(8, { error: "Password must be 8 charaters or more" }),
    confirmPassword: z
      .string()
      .nonempty({ error: "Confirm  password is required" }),
  })
  .refine(
    (val) => {
      return val.password === val.confirmPassword;
    },
    { error: "Passwords do not match", path: ["confirmPassword"] },
  );

type PasswordResetFormValues = z.infer<typeof PasswordResetFormSchema>;

export { PasswordResetFormSchema, type PasswordResetFormValues };
