import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import "./style.css";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const [allCats, setAllCats] = useState([]);
  const [CID, setCID] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    shipping: false,
  });
  const [photo, setPhoto] = useState("");
  const [isShipping, setIsShipping] = useState(false);
  const navigate = useNavigate();

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

  //create product
  const createProduct = async (e) => {
    e.preventDefault();
    const { name, description, price, quantity } = form;

    let productData = new FormData();

    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("category", CID);
    productData.append("photo", photo);
    productData.append("shipping", isShipping);
    try {
      const { data } = await axios.post(
        "https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/create-product",
        productData
      );
      console.log(data);

      if (data?.success) {
        toast("Product created successfully");
        navigate("/all-products");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error while creating product"
      );
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    handleChange();
  }, []);
  return (
    <Layout title={'Create Products'}>
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
              {/* dropdown */}
              <div className="dropdown ">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {CID
                    ? allCats.find((c) => c._id === CID)?.name
                    : "Please select a category"}
                </button>
                <ul className="dropdown-menu">
                  {allCats.map((cat, i) => (
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => setCID(cat._id)}
                      >
                        {cat.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={createProduct} className="mb-3 mt-5">
                {/* Upload Photo */}
                <div className="mb-3">
                  <label hidden htmlFor="photo" className="form-label">
                    Upload Photo
                  </label>
                  <input
                    value={form.photo}
                    onChange={(e) => setPhoto(e.target.files[0])}
                    name="photo"
                    type="file"
                    className="form-control"
                    id="photo"
                  />
                </div>

                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}

                {/* Name Input */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Write a Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => handleChange(e)}
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Product Name"
                    required
                  />
                </div>

                {/* Description Input */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Write a Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => handleChange(e)}
                    name="description"
                    className="form-control"
                    id="description"
                    rows="3"
                    placeholder="Product Description"
                    required
                  ></textarea>
                </div>

                {/* Price Input */}
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Write a Price
                  </label>
                  <input
                    value={form.price}
                    onChange={(e) => handleChange(e)}
                    name="price"
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="Price"
                    required
                  />
                </div>

                {/* Quantity Input */}
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Write a Quantity
                  </label>
                  <input
                    value={form.quantity}
                    onChange={(e) => handleChange(e)}
                    name="quantity"
                    type="number"
                    className="form-control"
                    id="quantity"
                    placeholder="Quantity"
                    required
                  />
                </div>
                {/* dropdown */}
                <div className="dropdown ">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => setIsShipping(true)}
                      >
                        Yes
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setIsShipping(false)}
                        className="dropdown-item"
                      >
                        No
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
