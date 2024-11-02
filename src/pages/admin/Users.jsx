import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/adminMenu/AdminMenu";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/auth/get-users`
      );
      console.log(data);

      if (data?.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error while getting users"
      );
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <th scope="row">{u.name}</th>
                      <th scope="row">{u.email}</th>
                      <th scope="row">{u.phone}</th>
                      <th scope="row">{u.address}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
