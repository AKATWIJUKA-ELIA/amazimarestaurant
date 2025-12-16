import { useAppDispatch } from "@/hooks";
import { ClearCart } from "@/store/cart";


const useClearCart = ()=>{
        const dispatch = useAppDispatch();
                return dispatch(ClearCart())
        }
export default useClearCart;