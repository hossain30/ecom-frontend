import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = () => {
  const [ok, setOk] = useState(null);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const { data } = await axios.get(
          "https://first-ecom-backend-problem-solved.onrender.com/api/v1/auth/verify-admin"
        );
        setOk(data?.ok);
      } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        setOk(false); // Setting to false to handle redirection if verification fails
      }
    };

    verifyAdmin();
  }, []);

  // While `ok` is null (loading), don't render anything
  if (ok === null) return null;

  // If `ok` is true, render the Outlet; otherwise, redirect to login or a 403 page
  return ok === true && auth?.user?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
