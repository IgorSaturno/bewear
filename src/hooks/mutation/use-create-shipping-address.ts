import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createShippingAddress } from "@/actions/create-shipping-address";
import { getShippingAddressesQueryKey } from "@/hooks/queries/use-shipping-addresses";

export const createShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: createShippingAddressMutationKey(),
    mutationFn: createShippingAddress,
    onSuccess: () => {
      toast.success("Endereço criado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: getShippingAddressesQueryKey(),
      });
    },
    onError: () => {
      toast.error("Erro ao criar endereço. Tente novamente.");
    },
  });
};
