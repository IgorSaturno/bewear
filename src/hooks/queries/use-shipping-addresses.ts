import { useQuery } from "@tanstack/react-query";

import { getShippingAddresses } from "@/actions/get-shipping-addresses";

export const getShippingAddressesQueryKey = () => ["shipping-addresses"];

export const useShippingAddresses = () => {
  return useQuery({
    queryKey: getShippingAddressesQueryKey(),
    queryFn: getShippingAddresses,
  });
};
