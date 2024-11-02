import Layout from "../../components/Layout";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container  mt-3">
        <div className="row">
          <div className="col-md-3 mt-3">
            <AdminMenu />
          </div>
          <div
            style={{
              backgroundColor: "teal",
              color: "white",
              fontSize: "25PX",
            }}
            className="col-md-9 mt-3 "
          >
            <p>User Name: {auth?.user?.name}</p>
            <p>User phone: {auth?.user?.phone}</p>
            <p>User email: {auth?.user?.email}</p>
            <p>User address: {auth?.user?.address}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
