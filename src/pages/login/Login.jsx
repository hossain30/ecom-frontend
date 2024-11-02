import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "./Login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  //context
  const [auth, setAuth] = useAuth();
  //states
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already logged in
    // (auth token exists in localStorage), redirect them to the home page ("/")
    if (auth?.token) navigate("/");
  }, [auth?.auth]);

  const handleSubmit = async (e) => {
    const { email, password } = form;
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data?.success) {
        localStorage.setItem(
          "auth",
          JSON.stringify({ token: data.token, user: data.user })
        );
        setAuth(JSON.parse(localStorage.getItem("auth")));
        toast.success(data?.message);
        setForm(null);
        navigate("/");
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
      <form onSubmit={handleSubmit} className="login-container mb-3 mt-3">
        <h3 className="text-center">Login</h3>

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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Login;
