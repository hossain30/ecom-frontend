import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // save to cart
  const postCart = async (pid) => {
    

    try {
      const { data } = await axios.get(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/add-to-cart?pid=${pid}`
      );
      if (data.success) {
        

        toast.success("Product successfully added");
        getFromCart();
      }
    } catch (error) {
      if (error) {
        toast.error(
          error?.response?.data?.message || "Error while adding to cart"
        );
      }
    }
  };
  //get products from cart
  const getFromCart = async () => {


    try {
      const { data } = await axios.get(
        `http://localhost:9000/api/v1/product/get-from-cart`
      );

      if (data.success) {
        setCart(data.products); // New reference
      }
    } catch (error) {
      if (error) {
        toast.error(
          error?.response?.data?.message ||
            "Error while getting products from cart"
        );
      }
    }
  };
  useEffect(() => {
    // if (cart.value) postCart();

    getFromCart();
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart, postCart,getFromCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};
export { CartProvider, useCart };
