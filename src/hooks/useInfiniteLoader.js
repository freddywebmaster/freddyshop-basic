import { useState, useEffect } from "react";

export const useInfiniteLoader = (array, pageItems) => {
  const totalItems = array.length;

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const getMore = () => {
    const data = [];
    const result = list.concat(data);

    const ind = pageItems * page;

    array.map((item, i) => {
      if (i >= ind) return;

      return data.push(item);
    });

    setPage(page + 1);

    console.log(data);
    console.log(result);
    setList(data);
  };

  const setFirstItems = async () => {
    setPage(2);
    const data = [];
    await array.map((item, i) => {
      if (i >= pageItems) return;
      return data.push(item);
    });
    console.log(data);
    setList(data);
  };

  useEffect(() => {
    setFirstItems();
  }, [array]);

  useEffect(() => {
    if (list.length >= totalItems - 1) {
      setIsEnd(true);
    } else {
      setIsEnd(false);
    }
  }, [page, array]);

  return {
    getMore,
    isEnd,
    list
  };
};
