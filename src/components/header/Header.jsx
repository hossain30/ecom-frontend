import "./Header.css";
import { GiShoppingBag } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import SearchInput from "../../pages/searchInput/SearchInput";
import { useCart } from "../../context/CartContext";
const Header = () => {
  //context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();


  //states
  const [allCat, setAllCats] = useState([]);
  // Get all categories
  const getAllCat = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/v1/category/get-all-category"
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
  }, []);

  return (
    <>
      <nav
        style={{ zIndex: "555" }}
        className="navbar navbar-expand-lg bg-body-tertiary position-sticky top-0 "
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <GiShoppingBag size={24} /> Ecommerce App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/category"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                  {allCat.map((c, i) => (
                    <li key={i}>
                      <Link className="dropdown-item" to={`/category/${c._id}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {auth?.token ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/category"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/dashboard/${
                          auth?.user?.role === "admin" ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          localStorage.removeItem("auth");
                          setAuth(null);
                        }}
                        className="dropdown-item"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}

              <Link
                to="/cart"
                type="button"
                class="btn  position-relative"
              >
                Cart
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart?.length}
                </span>
              </Link>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/cart">
                </Link>
              </li> */}
            </ul>
            {/* search input */}
            <SearchInput />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
