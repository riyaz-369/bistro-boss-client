import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin = [], isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      // console.log("checking is admin", user);
      const { data } = await axiosSecure(`/users/admin/${user?.email}`);
      return data;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
