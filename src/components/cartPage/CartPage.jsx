import "./CartPage.css";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Layout from "../../components/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart, postCart, getFromCart] = useCart();


  ///states
  ///////client token for payment
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //delete single cart
  const deleteProduct = async (cartId) => {
    try {
      const { data } = await axios.delete(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/delete-from-cart?cartId=${cartId}`
      );

      if (data?.success) {
        getFromCart(/*  */);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error while deleting product"
      );
    }
  };
  //delete full cart
  const deleteFullProduct = async () => {
    try {
      const { data } = await axios.delete(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/delete-from-cart-all`
      );

      if (data?.success) {
        getFromCart(/*  */);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Error while deleting full cart product"
      );
    }
  };

  ///total price count
  const totalPrice = () => {
    let total = 0;
    cart.map((p) => (total += p?.productId?.price));

    return total.toLocaleString("en-US", {
      currency: "USD",
      style: "currency",
    });
  };

  const getClientToken = async () => {
    try {
      const { data } = await axios.get(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/braintree/token`
      );

      setClientToken(data.clientToken);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  ///payment
  const handlePayment = async () => {
    setLoading(true);
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/braintree/payment`,
        {
          cart,
          nonce,
        }
      );

      setLoading(false);

      if (data.success) {
        toast.success("Successfully paid");
        //delete full cart
        deleteFullProduct();
      }
    } catch (error) {
      setLoading(false);

      toast.error(error?.response?.data?.message || "failed payment");
    }
  };

  useEffect(() => {
    if (auth?.token) getClientToken();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <h3 className="text-center">Hello {auth?.user?.name}</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h4>You have {cart?.length} products in your cart</h4>
              {cart?.map((p, i) => (
                <div key={i} className="row mb-2 card flex-row p-3">
                  <div className="col-md-4 ">
                    <img
                      src={`https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/product-photo/${p?.productId?._id}`}
                      className="card-img-top"
                      //here productId is the _id of all each products
                      //I populated these productId so I get full product
                      //in
                      alt={p?.productId?.name}
                      height={"100px"}
                      width={"100px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>name: {p?.productId?.name}</p>
                    <p>description: {p?.productId?.description}</p>
                    <p>
                      price:
                      {p?.productId?.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                    <p>quantity: {p?.productId?.quantity}</p>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center mt-4">
              <div className="box">
                <h1>Cart Summary</h1>
                <h5>Total | Checkout | Payment</h5>
                <h2>Total: {totalPrice()} </h2>
                <h2>Current Address</h2>
                <h5>{auth?.user?.address}</h5>
                <Link
                  to={"/dashboard/profile"}
                  className="btn btn-outline-warning"
                >
                  Change Address
                </Link>
              </div>
              {!clientToken || !cart ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    disabled={loading || !instance || !auth?.user?.address}
                    onClick={handlePayment}
                    className="btn btn-warning"
                  >
                    {loading ? "processing..." : "Make payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
