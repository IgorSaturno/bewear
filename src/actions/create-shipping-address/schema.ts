import z from "zod";

export const createShippingAddressSchema = z.object({
  email: z.string().email({ message: "Email inválido." }),
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Nome completo é obrigatório." }),
  cpf: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^\d{11}$/.test(value), { message: "CPF inválido." }),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^\d{10,11}$/.test(value), {
      message: "Celular inválido.",
    }),
  cep: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^\d{8}$/.test(value), { message: "CEP inválido." }),
  address: z.string().trim().min(1, { message: "Endereço é obrigatório." }),
  number: z.string().trim().min(1, { message: "Número é obrigatório." }),
  complement: z.string().optional(),
  district: z.string().trim().min(1, { message: "Bairro é obrigatório." }),
  city: z.string().trim().min(1, { message: "Cidade é obrigatória." }),
  state: z.string().trim().min(1, { message: "Estado é obrigatório." }),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
