import { Link } from "react-router-dom";
import { useSearch } from "../../../context/SearchContext";
import Layout from "../../Layout";
import "./searchPage.css";

const SearchPage = () => {
  //context
  const [values, setValues] = useSearch();
 

  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          {/* Add this row to align cards properly */}
          {values?.result.length >= 1 ? (
            values?.result?.map((p, i) => (
              <div className="col-md-4 mb-3" key={p._id}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={`https://first-ecom-backend-problem-solved.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p?.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">{p.category.name}</p>

                    <Link to="/more-details" className="btn btn-primary me-3">
                      More Details
                    </Link>
                    <Link to="/add-to-cart" className="btn btn-primary">
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center">"No results found"</h1>
          )}
        </div>
        {/* End of row */}
      </div>
    </Layout>
  );
};

export default SearchPage;
