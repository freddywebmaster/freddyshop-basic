import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const useQuery = (query, recoilState) => {
  const [data, setData] = useRecoilState(recoilState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data.length !== 0) return;

    const initFetch = async () => {
      setIsLoading(true);
      const res = await query();
      setData(res);
      setIsLoading(false);
    };

    initFetch();
  }, []);

  return { data, isLoading, setData };
};
