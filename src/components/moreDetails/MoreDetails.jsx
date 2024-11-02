import { Link, useParams } from "react-router-dom";
import "./MoreDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";
const MoreDetails = () => {
  const [product, setProduct] = useState({});
  const [similerProducts, setSimilerProducts] = useState([]);

  const { pid, cid } = useParams();
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/get-single-product/${pid}`
      );

      if (data?.success) {
        // setProduct({ ...product, ...data.product});
        setProduct(data?.product);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error while getting single product"
      );
    }
  };

  useEffect(() => {
    getSingleProduct();
    getSimilerProducts();
  }, []);
  ///get similer products
  const getSimilerProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/get-similer-products/${pid}/${cid}`
      );

      if (data?.success) {
        // setProduct({ ...product, ...data.product});
        setSimilerProducts(data?.products);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error while getting similer product"
      );
    }
  };
  return (
    <Layout>
      <div className="container-fluid   mt-3 mb-2">
        <div className="row">
          <div className="col-md-4">
            {product && (
              <img
                src={`https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/product-photo/${product?._id}`}
                className="card-img-top"
                alt={product?.name}
              />
            )}
          </div>
          <div style={{ backgroundColor: "aqua" }} className="col-md-6">
            <div className="card" style={{ width: "18rem" }}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{product?.name}</li>
                <li className="list-group-item">{product?.price}</li>
                <li className="list-group-item">{product?.description}</li>
                <li className="list-group-item">{product?.category?.name}</li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="conatiner">
            <div className="row p-5">
              <h1>Similer Products➡️</h1>

              {similerProducts.map((p, i) => (
                <div className="col-md-3 col-12  p-2" key={p._id}>
                  <div className="card" style={{ width: "100%" }}>
                    <img
                      src={`https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">{p.category.name}</p>

                      <Link
                        to={`/more-details/${p._id}/${p.category._id}`}
                        className="btn btn-primary me-3"
                      >
                        More Details
                      </Link>
                      <Link to="/add-to-cart" className="btn btn-primary">
                        Add to cart
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoreDetails;
