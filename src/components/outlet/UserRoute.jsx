import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserRoute = () => {
  const [ok, setOk] = useState(null);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get(
          "https://first-ecom-backend-problem-solved.onrender.com/api/v1/auth/verify-user"
        );

        if (data?.ok === true) {
          setOk(data?.ok);
        } else {
          setOk(data?.ok);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Unauthorized access");
        setOk(false);
      }
    };
    if (auth?.token) verifyUser();
  }, [auth?.token]);
  if (ok === null) {
    return;
  } else {
    return ok === true && auth?.user?.role === "user" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  }
};

export default UserRoute;
