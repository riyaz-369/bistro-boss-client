import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();

  const {
    data: cart = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/carts?email=${user?.email}`);
      return data;
    },
  });
  return [cart, refetch, isLoading];
};

export default useCart;
