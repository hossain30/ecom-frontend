import { useEffect, useState } from "react";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Layout from "../../components/Layout";

import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  // all products
  const [allProducts, setAllProducts] = useState([]);
  console.log(allProducts);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/get-all-products"
      );
      console.log(data.products);

      if (data?.success) {
        setAllProducts(data.products);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error while getting all products"
      );
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Products"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 mt-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-3">
            <div className="row">
              {" "}
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
                          {p?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">{p.category.name}</p>

                      <Link
                        to={`/dashboard/admin/edit-product/${p._id}`}
                        className="btn btn-warning "
                      >
                        Edit
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

export default Products;
