
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const useCartTotal = () => {
    const { cart } = useContext(AuthContext)
    let total = 0;
    cart?.forEach(element => {
        total += element.price;
    });
    return total;
};
