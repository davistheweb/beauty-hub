import { z } from "zod";

export const bookingStatusSchema = z.object({
  status: z
    .string().nonempty({error:  "Please select a status"})
    .refine(
      (val) => ["pending", "confirmed", "completed", "cancelled"].includes(val),
      {
        message: "Please select a valid status",
      },
    ),
});

export type BookingStatusFormValues = z.infer<typeof bookingStatusSchema>;
