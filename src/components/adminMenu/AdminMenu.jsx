import { Link } from "react-router-dom";
import "./AdminMenu.css";
const AdminMenu = () => {
  return (
    <div className="">
      <h1 className="text-center">Admin Panel</h1>
      <Link to={"/dashboard/admin/create-category"} className="btn btn-light userBtn">
        Create Category
      </Link>
      <Link to={"/dashboard/admin/create-product"} className="btn btn-light userBtn">
        Create Product
      </Link>
      <Link to={"/dashboard/admin/all-products"} className="btn btn-light userBtn">
        Products
      </Link>
      <Link to={"/dashboard/admin/orders"} className="btn btn-light userBtn">
        Orders
      </Link>
      <Link to={"/dashboard/admin/users"} className="btn btn-light userBtn">
        Users
      </Link>
    </div>
  );
};

export default AdminMenu;
