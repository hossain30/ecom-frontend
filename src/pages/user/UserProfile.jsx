import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserMenu from "../../components/userMenu/UserMenu";
import "./stylesh.css";
const UserProfile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //states
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  console.log(form);

  const handleSubmit = async (e) => {
    const { name, phone, address } = form;
    try {
      e.preventDefault();
      const { data } = await axios.put(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/auth/update-profile",
        { name, phone, address },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        setForm({});
        navigate("/login");
      }
    } catch (error) {
      if (error) {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong, please try again."
        );
      }
    }
  };
  //getting user for showing

  const getUser = async () => {
    const userAuth = JSON.parse(localStorage.getItem("auth"));
    try {
      const { data } = await axios.get(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/auth/get-user"
      );

      const { name, email, phone, address } = data.user;
      setForm((prev) => ({
        ...prev,
        name,
        email,
        phone,
        address,
      }));
    } catch (error) {
      if (error)
        toast.error(
          error?.response?.data?.message || "Internal server problem "
        );
    }
  };
  //for showing user details for the first time
  useEffect(() => {
    if (auth?.token) getUser();
  }, [auth?.token]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Layout>
      <div className="container">
        <div className="row mt-3 mb-3">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div
            style={{ backgroundColor: "green", color: "white" }}
            className="col-md-9 "
          >
            <form
              onSubmit={handleSubmit}
              className="userProfile-container mb-3 mt-3"
            >
              <h3 className="text-center">Update</h3>
              <div className="mb-1">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="emailHelp"
                  name="name"
                  value={form.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-1">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  name="email"
                  value={form.email}
                  onChange={(e) => handleChange(e)}
                  disabled
                />
              </div>

              <div className="mb-1">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="phone"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary ">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
