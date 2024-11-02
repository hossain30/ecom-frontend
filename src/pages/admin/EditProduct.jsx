import { useParams } from "react-router-dom";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const EditProduct = () => {
  const [singleProduct, setSingleProduct] = useState({});

  ///form
  const [photo, setPhoto] = useState("");
  const [isShipping, setIsShipping] = useState(false);
  const [allCats, setAllCats] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
  });
  const { pid } = useParams();
  console.log(form.category);

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/get-single-product/${pid}`
      );
      if (data?.success) {
        console.log(data);

        setSingleProduct(data.product);
        const { name, description, category, price, quantity, shipping } =
          data.product;

        setForm({
          name,
          description,
          category: category._id,
          price,
          quantity,
          shipping,
        });
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error while getting single product"
      );
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  //update product
  const HandleupdateProduct = async (e) => {
    e.preventDefault();
    const { name, description, category, price, quantity } = form;
console.log(category);

    let productData = new FormData();

    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("category", category);
    productData.append("photo", photo);
    productData.append("shipping", isShipping); //appemd here
    try {
      const { data } = await axios.put(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/update-product/${pid}`,
        productData
      );
      if (data?.success) {
        console.log(data?.message);
        console.log(data);
        getSingleProduct();
        toast.success("successfully updated");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error while updating single product"
      );
    }
  };
  ///handle change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  ////get all categories
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


  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
            fgtryth
          </div>
          <div className="col-md-9">
            <div
              style={{
                backgroundColor: "green",
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
                    {form.category
                      ? allCats.find((cat) => cat?._id === form?.category)?.name
                      : allCats.find(
                          (cat) => cat._id === singleProduct?.category?._id
                        )?.name}
                  </button>
                  <ul className="dropdown-menu">
                    {allCats.map((cat,i) => (
                      <li key={i}>
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            setForm({ ...form, category: cat._id })
                          }
                        >
                          {cat.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={HandleupdateProduct} className="mb-3 mt-5">
                  {/* Upload Photo */}
                  <div className="mb-3">
                    <label hidden htmlFor="photo" className="form-label">
                      Upload Photo
                    </label>
                    <input
                      onChange={(e) => setPhoto(e.target.files[0])}
                      name="photo"
                      type="file"
                      className="form-control"
                      id="photo"
                    />
                  </div>

                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product-photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/product-photo/${pid}`}
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
                      value={form.name || singleProduct.name}
                      onChange={(e) => handleChange(e)}
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Product Name"
                    />
                  </div>

                  {/* Description Input */}
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Write a Description
                    </label>
                    <textarea
                      value={form.description || singleProduct.description}
                      onChange={(e) => handleChange(e)}
                      name="description"
                      className="form-control"
                      id="description"
                      rows="3"
                      placeholder="Product Description"
                    ></textarea>
                  </div>

                  {/* Price Input */}
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Write a Price
                    </label>
                    <input
                      value={form.price || singleProduct.price}
                      onChange={(e) => handleChange(e)}
                      name="price"
                      type="number"
                      className="form-control"
                      id="price"
                      placeholder="Price"
                    />
                  </div>

                  {/* Quantity Input */}
                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                      Write a Quantity
                    </label>
                    <input
                      value={form.quantity || singleProduct.quantity}
                      onChange={(e) => handleChange(e)}
                      name="quantity"
                      type="number"
                      className="form-control"
                      id="quantity"
                      placeholder="Quantity"
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
                          className="dropdown-item"
                          onClick={() => setIsShipping(false)}
                        >
                          No
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default EditProduct;
