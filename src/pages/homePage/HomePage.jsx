import "./HomePage.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ImSpinner } from "react-icons/im";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import prices from "./price";
import { useCart } from "../../context/CartContext";
const HomePage = () => {
  // all products
  const [allProducts, setAllProducts] = useState([]);

  ////categories
  const [allCat, setAllCats] = useState([]);
  //filter by category
  const [check, setCheck] = useState([]);
  //filter by radio
  const [radio, setRadio] = useState([]);
  ///total document count in db
  const [totalDoc, setTotalDoc] = useState(0);
  ////this the page
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //set to cart
  const [cart, setCart, postCart] = useCart();

  //get all product
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(

        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/product-list/${page}`
      );

      setLoading(false);
      if (data?.success) {
        setAllProducts(data.products);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message || "Error while getting all products"
      );
    }
  };

  useEffect(() => {
    if (check.length >= 1 || radio.length >= 1) {
      return;
    } else {
      getAllProducts();
    }
  }, [check, radio]);

  //get products by category and price(filter)
  const getProductsByFilter = async () => {
    try {
      const { data } = await axios.post(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/get-products-by-filter",
        { check, radio }
      );

      if (data?.success) {
        // setAllProducts((prev = [...prev, data.products]));
        setAllProducts(data.products);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Error while getting filtered products"
      );
    }
  };
  useEffect(() => {
    if (check.length >= 1 || radio.length >= 1) getProductsByFilter();
  }, [check, radio]);
  // Get all categories
  const getAllCat = async () => {
    try {
      const { data } = await axios.get(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/category/get-all-category"
      );

      setAllCats(data.categories);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error while getting category"
      );
    }
  };

  useEffect(() => {
    getAllCat();
    getTotalDocCount();
  }, []);

  ////////////// filter by category/////////
  const handleFilter = (isChecked, cid) => {
    let all = [...check];

    if (isChecked) {
      all.push(cid);
    } else {
      all = all.filter((e) => e !== cid);
    }
    setCheck(all);
  };
  ////total products count in db for loading more button
  const getTotalDocCount = async () => {
    try {
      const { data } = await axios.get(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/total-doc"
      );

      setTotalDoc(data.totalDoc);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Error while getting total documents count"
      );
    }
  };
  ////get all products after clicking loadmore button

  const getProductClickingButton = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        // "http://localhost:9000/api/v1/product/get-all-products"
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setAllProducts([...allProducts, ...data.products]);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message || "Error while getting all products"
      );
    }
  };
  useEffect(() => {
    if (page === 1) {
      return;
    } else {
      getProductClickingButton();
    }
  }, [page]);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <img src="public/images/banner.png" />
        </div>
        <div className="row">
          <div className="col-md-3 mt-5">
            <h4 className="text-center">Filter by category</h4>
            <hr />
            {/* this checkbox for filter products */}
            <div>
              {allCat.map((cat, i) => (
                <div key={i} className="form-check">
                  <input
                    onChange={(e) => handleFilter(e.target.checked, cat._id)}
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
            {/* radio for filtering products */}
            <h4 className="text-center mt-3">Filter by Price</h4>
            <hr />
            <div>
              {prices.map((p, i) => (
                <div key={i} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    defaultValue="option2"
                    onClick={() => setRadio(p.array)}
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    {p.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-9 mt-3">
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
                      <Link
                        onClick={() => postCart(p._id)}
                        className="btn btn-primary"
                      >
                        Add to cart
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* End of row */}
          </div>
          {allProducts && allProducts.length < totalDoc && (
            <div
              onClick={() => setPage(page + 1)}
              style={{ cursor: "pointer", width: "120px", margin: "20px auto" }}
              className="text-center btn btn-warning"
            >
              {loading ? (
                "Loading..."
              ) : (
                <div>
                  Load more
                  <ImSpinner />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
