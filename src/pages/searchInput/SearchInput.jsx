import axios from "axios";
import { useSearch } from "../../context/SearchContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/search-products/${values.keywords}`
      );


      if (data?.success) {
        setValues((prev) => ({
          ...prev,
          result: data.searchedProducts,
        }));
        navigate("/searched-products");
      }
    } catch (error) {
      console.log(error);

      if (error) {
        toast.error(
          error?.response?.data?.message || "Error while searching Products"
        );
      }
    }
  };
  return (
    <form onSubmit={handleSearch} className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder=" Search Products..."
        aria-label="Search"
        onChange={(e) => setValues({ ...values, keywords: e.target.value })}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
