import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email({
    message: "invalid, please insert a valid email and try again."
  }),
  password: z.string().min(8, { message: "invalid, must be 8 or more characters long." }),
});

export const userSchema = z.object({
  code: z.number().optional(),
  name: z.string(),
  lastname: z.string(),
  lastname_2: z.string(),
  curp: z.string(),
  rfc: z.string(),
  nss: z.string(),
  phone: z.string()

});