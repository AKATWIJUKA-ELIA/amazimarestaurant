import { getProductsByIds } from "@/lib/actions";
import { useEffect, useState } from "react";
import {Product} from "@/lib/types";

const useGetProductsByIds = (ids: string[]) => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsByIds(ids);
      setProducts(data);
    };

    if (ids.length > 0) {
      fetchProducts();
    }
  }, [ids]);

  return {
    data: products ?? [],
    loading: products === undefined, // Convex returns `undefined` while loading
  };
};

export default useGetProductsByIds;
