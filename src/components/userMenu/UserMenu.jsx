import { Link } from "react-router-dom";
import "./userMenu.css";
const UserMenu = () => {
  return (
    <div className="">
      <h1 className="text-center">Dashboard</h1>
      <Link to={"/dashboard/profile"} className="btn btn-light userBtn">
        Profile
      </Link>
      <Link to={"/orders"} className="btn btn-light userBtn">
        Orders
      </Link>
    </div>
  );
};

export default UserMenu;
