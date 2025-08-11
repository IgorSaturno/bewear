import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";

import { getUseCartQueryKey } from "../queries/use-cart";

export const updateCartShippingAddressMutationKey = () =>
  ["update-cart-shipping-address"] as const;

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: updateCartShippingAddressMutationKey(),
    mutationFn: updateCartShippingAddress,
    onSuccess: () => {
      toast.success("Endereço vinculado ao carrinho com sucesso!");
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
    onError: () => {
      toast.error("Erro ao vincular endereço ao carrinho. Tente novamente.");
    },
  });
};
