import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { ProtectedRoute } from "./components/outlet/Outlet";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import NotFound from "./pages/404/404";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/outlet/AdminRoute";
import UserRoute from "./components/outlet/UserRoute";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";

import Products from "./pages/admin/Products";
import CategoryShow from "./pages/404/categoryShow/CategoryShow";
import EditProduct from "./pages/admin/EditProduct";
import SearchPage from "./components/userMenu/searchPage/SearchPage";
import MoreDetails from "./components/moreDetails/MoreDetails";
import CartPage from "./components/cartPage/CartPage";
import OrderPage from "./pages/orderPage/OrderPage";
import AdminOrderPage from "./pages/admin/AdminOrderPage";
import Users from "./pages/admin/Users";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {/* THIS IS FOR ADMINS ONLY */}
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/all-products" element={<Products />} />
            <Route path="admin/edit-product/:pid" element={<EditProduct />} />
            <Route path="admin/orders" element={<AdminOrderPage />} />
            <Route path="admin/users" element={<Users />} />
          </Route>

          {/* THIS IS FOR USERS ONLY */}
          <Route path="/dashboard" element={<UserRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          {/* global */}
          <Route path="category/:cid" element={<CategoryShow />} />
          <Route path="/searched-products" element={<SearchPage />} />
          <Route path="/more-details/:pid/:cid" element={<MoreDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        {/* FOR AUTH ONLY */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
