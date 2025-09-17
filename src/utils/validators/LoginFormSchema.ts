import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().nonempty({ error: "Password is required" }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
