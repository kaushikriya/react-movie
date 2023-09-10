import { useEffect, useRef, useState } from "react";
import { Movie } from "../../interfaces/movie";

export const usePagination = (data: Movie[] | undefined) => {
  const [totalData, setTotalData] = useState<Movie[]>([]);
  const prevDataRef = useRef<Movie[]>([]);

  useEffect(() => {
    const currentData = data ?? [];
    const previousData = prevDataRef.current ?? [];
    if (JSON.stringify(currentData) !== JSON.stringify(previousData)) {
      const updatedTotalData = [...totalData, ...currentData];
      setTotalData(updatedTotalData);
      prevDataRef.current = currentData;
    }
  }, [data, totalData]);

  return totalData;
};
