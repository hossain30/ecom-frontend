import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Helmet } from 'react-helmet'
const Layout = ({ children, title }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
