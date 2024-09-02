import { z } from "zod";
import validator from "validator";

export const userLoginSchema = z.object({
  email: z.string().email({
    message: "invalid, please insert a valid email and try again."
  }).refine(validator.isEmail),
  password: z.string().min(8, { message: "invalid, must be 8 or more characters long." }),
});

export const paramsIdentifySchema = z.object({
  userId: z.number().refine(validator.isNumeric)
});

export const resetPasswordSchema = z.object({
  email: z.string().refine(validator.isEmail)
})

export const userSchema = z.object({
  code: z.number(),
  name: z.string().optional(),
  lastname: z.string().optional(),
  lastname_2: z.string().optional(),
  curp: z.string().optional(),
  rfc: z.string().optional(),
  nss: z.string().optional(),
  phone: z.string().refine(validator.isMobilePhone).nullable(),
  cellphone: z.string().refine(validator.isMobilePhone).nullable(),
  email: z.string().refine(validator.isEmail),
  gender: z.enum(['N/E', 'Masculino', 'Femenino', 'otro']).default('N/A'),
  marital_status: z.enum(['N/E', 'Soltero', 'Casado', 'Divorciado', 'Separado', 'Viudo']).default('N/A'),
  id_suburb: z.number(),
  id_state: z.number(),
  id_municipality: z.number(),
  blood_type: z.enum(['N/E', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).default('N/E'),
  union_registration: z.string().datetime().nullable().default(null),
  system_registration: z.string().datetime().nullable().default(new Date()),
  photo: z.string().nullable().default(null),
  signature: z.string().optional().nullable(),
  id_company: z.number(),
  is_deleted: z.number().default(0),
  id_country: z.number().default(1),
  password: z.string().refine(validator.isStrongPassword),
  address: z.string().optional(),
  ext: z.string().optional(),
  ins: z.string().optional()
});
