

const useGetProductsByIds = (ids: string[]) => {
//   const products = useQuery(api.products.getProductsByIds,ids.length > 0 ? { ids } : "skip"
//   );
 const products:string[] = []
  return {
    data: products ?? [],
    loading: products === undefined, // Convex returns `undefined` while loading
  };
};

export default useGetProductsByIds;