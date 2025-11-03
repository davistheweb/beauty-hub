import z from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty({ error: "Email is required" })
    .email({ error: "The provided email is invalid" }),
  password: z.string().nonempty({ error: "Password is required" }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
