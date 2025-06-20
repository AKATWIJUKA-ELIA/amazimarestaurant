import { getProductById } from "@/lib/actions";
import { Product } from "@/lib/types"
import { useEffect, useState } from "react";

const useGetProductById = (id: string) => {
        const [product, setProduct] = useState<Product | null>(null);
        useEffect(() => {
            getProductById(id).then((data) => {
              setProduct(data);
            
            });
        }, [id]);

    return {
        data: product, 
        loading: product === null, 
        error: null,
    };
};

export default useGetProductById;