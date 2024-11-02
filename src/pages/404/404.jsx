import React from "react";
import { Link } from "react-router-dom";
import "./404.css";
import Layout from "../../components/Layout";

const NotFound = () => {
  return (
    <Layout title={"404 Page"}>
      <div className="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="home-button">
          Go to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
