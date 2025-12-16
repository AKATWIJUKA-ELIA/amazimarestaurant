import { useEffect, useState } from "react";
import getCategories from "@/lib/actions";
import { ProductCategory } from "@/lib/types";

const useGetCategories = () => {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return {
        categories,
        loading,
        error,
    };
};

export default useGetCategories;