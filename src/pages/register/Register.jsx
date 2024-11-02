import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "./Register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Register = () => {
  //context
  const [auth, setAuth] = useAuth();
  //states
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already logged in
    // (auth token exists in localStorage), redirect them to the home page ("/")
    if (auth?.token) navigate("/");
  }, [auth?.auth]);

  const handleSubmit = async (e) => {
    const { name, email, password, cPassword, phone, address } = form;
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/auth/register",
        { name, email, password, cPassword, phone, address },
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="register-container mb-3 mt-3">
        <h3 className="text-center">Registration</h3>
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
          />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cPassword"
            name="cPassword"
            value={form.cPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="password"
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Register;
