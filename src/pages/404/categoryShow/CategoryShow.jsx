import { useEffect, useState } from "react";
import "./categoryShow.css";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useCart } from "../../../context/CartContext";

const CategoryShow = () => {
  //context
  const [cart, setCart, postCart] = useCart();
  //states
  const [allProducts, setAllProducts] = useState([]);
  const { cid } = useParams();
  const getProductsByCat = async () => {
    console.log(cid);

    try {
      const { data } = await axios.get(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/products-by-cat/${cid}`
      );
      console.log(data);

      if (data?.success) {
        setAllProducts(data.products);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error while getting all products"
      );
    }
  };
  useEffect(() => {
    getProductsByCat();
  }, [cid]);
  return (
    <Layout title={"Products"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3">
            <div className="row">
              {/* Add this row to align cards properly */}
              {allProducts.map((p, i) => (
                <div className="col-md-4 mb-3" key={p._id}>
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={`https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">{p.category.name}</p>
                      <Link to="/more-details" className="btn btn-primary me-3">
                        More Details
                      </Link>
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          postCart(p._id);
                        }}
                        className="btn btn-primary"
                      >
                        Add to cart
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>{" "}
            {/* End of row */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryShow;
