import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const CategoryCategory = () => {
  const [auth, setAuth] = useAuth();
  const [form, setForm] = useState("");
  const [allCats, setAllCats] = useState([]);
  const [catId, setCatId] = useState("");
  const [catForm, setCatForm] = useState("");

  console.log(catId);

  // Save category to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/category/create-category",
        { name: form } // send the form value
      );
      if (data?.success) {
        toast.success(data?.message);
        setForm(""); // Clear the form input
        getAllCat(); // Refresh the category list
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error while creating category"
      );
    }
  };

  // Get all categories
  const getAllCat = async () => {
    try {
      const { data } = await axios.get(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/category/get-all-category"
      );
      setAllCats(data.categories);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error while getting category"
      );
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);

  ///update category
  const handleUpdate = async (e) => {
    try {
      const { data } = await axios.put(
        `hhttps://first-ecom-backend-problem-solved.onrender.com/api/v1/category/update-category/${catId}`,
        { name: catForm }
      );
      if (data?.success) {
        toast.success("category updated successfully");
        //upadte honeke baad page render karneke liye
        getAllCat();
        setCatForm("");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error while updating category"
      );
    }
  };

  ///delete category
  const handleDelete = async (cid) => {
    console.log(cid);

    try {
      const { data } = await axios.delete(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/category/delete-category/${cid}`
      );
      if (data?.success) {
        toast.success("category deleted successfully");

        //upadte honeke baad page render karneke liye
        getAllCat();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error while updating category"
      );
    }
  };
  return (
    <Layout title={"Create Category"}>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3 mt-3">
            <AdminMenu />
          </div>
          <div
            style={{
              backgroundColor: "teal",
              color: "white",
              fontSize: "25px",
            }}
            className="col-md-9 mb-3 mt-3"
          >
            <div className="row">
              <h1 className="text-center mb-4">Manage Category</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="categoryName" className="form-label">
                    Enter new category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    value={form} // Set value from state
                    onChange={(e) => setForm(e.target.value)} // Update state
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>

              <table className="table mb-3 mt-3">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allCats.map((cat, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{cat.name}</td>
                      <td>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#editModal" // Modal id here
                          className="btn btn-primary"
                          onClick={() => setCatId(cat._id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal for editing category */}
        <div className="modal fade" id="editModal" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <input
                  value={catForm}
                  type="text"
                  onChange={(e) => setCatForm(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleUpdate}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryCategory;
