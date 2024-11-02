import { useEffect, useState } from "react";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
const AdminOrderPage = () => {
  //context
  const [auth, setAuth] = useAuth();
  //states
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "shipped",
    "delivered",
    "cancel",
  ]);
  //get full orders
  const getOrders = async () => {
    try {
      console.log("[[[[[[[[[[[[[[[[[[[");

      const { data } = await axios.get(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/admin-orders`
      );
      console.log(data);

      if (data?.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error while getting orders"
      );
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, []);

  const updateStatus = async (value,oid) => {
    console.log(value,oid);
    

    try {


      const { data } = await axios.put(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/status?oid=${oid}&status=${value}`
      );
      console.log(data);

      if (data?.success) {
        getOrders();
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error while updating status"
      );
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {orders.map((o, i) => (
              <>
                <div className="table-div">
                  <table key={i} className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{i + 1}</th>
            
                        <td>
                          <div
                            className="dropdown"
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              className=" dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              {o?.status}
                            </div>
                            <ul className="dropdown-menu">
                              {status.map((s, i) => (
                                <li>
                                  <a
                                    onClick={() => updateStatus(s, o._id)}
                                    className="dropdown-item"
                                  >
                                    {s}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                        <td>{moment(o.createdAt).fromNow()} </td>
                        <td>
                          {o?.payment?.success === true ? "Success" : "Failed"}
                        </td>
                        <td>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="d-flex ">
                  <div>
                    {o?.products.map((cartItem) => (
                      <div className="d-flex gap-3 ">
                        <img
                          style={{ height: "150px", width: "320px" }}
                          src={`https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/product-photo/${cartItem?.productId?._id}`}
                          alt={"vv"}
                        />
                        <div className="d-flex flex-column gap-1">
                          <div>
                            <strong>name:</strong> {cartItem?.productId?.name}
                          </div>
                          <div>
                            <strong>price:</strong> {cartItem?.productId?.price}
                          </div>
                          <div>
                            <strong> description:</strong>
                            {cartItem?.productId?.description}
                          </div>
                          <div>
                            <strong>category:</strong>
                            {cartItem?.productId?.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div>

                h tytnnnnnnnnnnnnnnnnnnnnnnnnn
              </div> */}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrderPage;
