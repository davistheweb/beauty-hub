import z from "zod";

const baseStaffFormSchema = z.object({
  name: z.string().nonempty({ error: "Staff Name is required" }),
  email: z
    .string()
    .nonempty({ error: "Email is required" })
    .email({ error: "The provided mail is invalid" }),
  phone: z.string().nonempty({ error: "Phone number is required" }),
});

const addStaffFormSchema = baseStaffFormSchema.extend({
  password: z
    .string()
    .nonempty({ error: "Password is required" })
    .min(8, "Password must be up to 8 charaters or more"),
});

const updatedStaffFormSchema = baseStaffFormSchema.extend({});

type StaffFormValues = {
  name: string;
  email: string;
  phone: string;
  password?: string;
};

type addStaffFormValues = z.infer<typeof addStaffFormSchema>;

type updatedStaffFormValues = z.infer<typeof updatedStaffFormSchema>;

export { addStaffFormSchema, updatedStaffFormSchema };

export type { StaffFormValues, addStaffFormValues, updatedStaffFormValues };
