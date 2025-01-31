import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import OrderReq from "./OrderReq";
import { useNavigate } from "react-router-dom";
import OrderPage from "./OrderPage";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState("home");
  var [filteredproducts] = products;
  const [searchterms, setSearchterms] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated")
  );
  const navigate = useNavigate();

  filteredproducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchterms.toLowerCase())
  );
  useEffect(() => {
    if (sessionStorage.getItem("isAuthenticated") === null) {
      setIsAuthenticated("false");
    }
    GetAllproducts();
  }, [isAuthenticated, state]);

  const GetAllproducts = async () => {
    try {
      await fetch("http://localhost:8000/")
        .then((response) => response.json())
        .then((response) => setProducts(response));
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleOrder = (productId) => {
    // e.preventDefault();
    if (sessionStorage.getItem("isAuthenticated") === "true") {
      setIsAuthenticated("true");
      setState("orderreq");
      setProductId(productId);
    } else {
      setIsAuthenticated("false");
      console.log("You need to login");
      navigate("/login");
    }
  };

  const handleCart = () => {
    if (confirm("Are you want to add to cart")) {
      console.log("Added to cart");
    }
  };

  const funcOrder = (orderreq) => {
    console.log(orderreq);
    setState(orderreq);
  };

  const managePageRendering = (page) => {
    setState(page);
  };

  const renderStatus = () => {
    switch (state) {
      case "home":
        return (
          <>
            <div className="container my-5 ">
              <div className="row">
                <form className="d-flex w-50 mt-5 p-3">
                  <input
                    className="form-control me-2"
                    type="search"
                    value={searchterms}
                    onChange={(e) => setSearchterms(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-primary" type="submit">
                    Search
                  </button>
                </form>
              </div>

              <div className="row">
                <h3 className="text-bold mt-1 p-3">Latest Products</h3>
              </div>
              {error && (
                <p className="text-danger p-3 m-3">Server error occured</p>
              )}
            </div>
            <div className="container">
              <div className="row">
                {filteredproducts.map((product) => (
                  <div className="col-4" key={product.productId}>
                    <div
                      className="card shadow-sm mt-3"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={product.productImage}
                        className="card-img-top"
                        style={{ height: "50%" }}
                        alt="Product Image"
                        onClick={() => handleOrder(product.productId)}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text">
                          {product.productDescription}
                        </p>
                        <p className="card-text">
                          <strong>${product.productPrice}</strong>
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <a
                            className="btn btn-primary mx-2"
                            onClick={() => handleOrder(product.productId)}
                          >
                            Order
                          </a>
                          <a className="btn btn-warning" onClick={handleCart}>
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "orderreq":
        return <OrderReq productId={productId} Backfunction={funcOrder} />;

      case "orderpage":
        return (
          <OrderPage
            authentication={isAuthenticated}
            Backfunction={funcOrder}
          />
        );
    }
  };
  return (
    <>
      <Navbar
        authentication={isAuthenticated}
        ManagePage={managePageRendering}
      />
      {renderStatus()}
    </>
  );
};

export default Home;
