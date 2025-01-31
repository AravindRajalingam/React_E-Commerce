import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(props.authentication);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    sessionStorage.clear();
    console.log("Session storage cleared");
    setIsAuthenticated(false);
    handleState("home");
  };
  const handleState = (page) => {
    props.ManagePage(page);
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top ">
        <div className="container-fluid mx-5">
          <a className="navbar-brand " href="/">
            RKSA Mart
          </a>
          <button
            // className="navbar-toggler"
            // type="button"
            // data-bs-toggle="collapse"
            // data-bs-target="#navbarNav"
            // aria-controls="navbarNav"
            // aria-expanded="false"
            // onClick={() => setIsOpen(!isOpen)}
            // aria-label="Toggle navigation"
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <div className=" d-flex justify-content-end w-100">
              <ul className="navbar-nav">
                <li className="nav-item p-2">
                  <a
                    className="nav-link text-white mx-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleState("home")}
                  >
                    Home
                  </a>
                </li>

                <li className="nav-item p-2">
                  <a
                    className="nav-link text-white mx-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleState("home")}
                  >
                    Coupons
                  </a>
                </li>

                <li className="nav-item dropdown p-2">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/products"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Products
                  </Link>
                  <ul
                    className="dropdown-menu bg-dark text-light"
                    aria-labelledby="navbarDropdown"
                  >
                    <h6>Top Categories for you</h6>
                    <li>
                      <Link className="dropdown-item text-light" to="/">
                        Mobiles
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-light" to="/">
                        Computers
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-light" to="/">
                        Books
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-light" to="/">
                        Fashion
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider bg-light" />
                    </li>
                    <h6>Other Products</h6>
                    <li>
                      <Link className="dropdown-item text-light" to="/">
                        Baby Products
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-light" to="/">
                        Toys & Games
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-light" to="/">
                        Furniture
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-light" to="/">
                        Home & Electronics
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-light" to="/">
                        Home & Kitchen
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-light" to="/">
                        Grocery & Gourmet
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item p-2">
                  <a
                    className="nav-link text-white mx-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleState("orderpage")}
                  >
                    Orders
                  </a>
                </li>
                <li className="nav-item p-2">
                  <Link to="/cart" className="nav-link text-white mx-3">
                    Cart
                  </Link>
                </li>

                {isAuthenticated ? (
                  <>
                    <li className="nav-item p-2">
                      <Link
                        to="/"
                        className="nav-link text-white mx-3"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                    <li className="nav-item p-2">
                      <Link to="/orders" className="nav-link text-white mx-3">
                        Profile
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item p-2">
                    <Link to="/login" className="nav-link text-white mx-3">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
