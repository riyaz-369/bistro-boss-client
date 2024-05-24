// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useMenu = () => {
  const axiosCommon = useAxiosCommon();
  // const [menu, setMenu] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("http://localhost:5000/menu")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMenu(data);
  //       setLoading(false);
  //     });
  // }, []);

  const {
    data: menu = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const { data } = await axiosCommon("/menu");
      return data;
    },
  });

  return [menu, isLoading, refetch];
};

export default useMenu;
