import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/actions";
import { Product } from "@/lib/types";

const useGetAllProducts = () => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return {
    data: products ?? [],
    isLoading,
  };
};

export default useGetAllProducts;