import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createShippingAddress } from "@/actions/create-shipping-address";
import { CreateShippingAddressSchema } from "@/actions/create-shipping-address/schema";

export const useCreateShippingAddress = () => {
  return useMutation({
    mutationFn: (data: CreateShippingAddressSchema) =>
      createShippingAddress(data),
    onSuccess: () => {
      toast.success("Endereço criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar endereço. Tente novamente.");
    },
  });
};
