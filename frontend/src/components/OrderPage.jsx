import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = (props) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(props.authentication);
  const userId = isAuthenticated ? sessionStorage.getItem("userId") : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (userId !== null) {
      GetOrders();
    } else {
      navigate("/login");
    }
  }, []);
  const GetOrders = async () => {
    try {
      await fetch(`http://localhost:8000/getorders/${userId}`)
        .then((res) => (res.status === 404 ? setError(true) : res.json()))
        .then((res) => setOrders(res));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTrack = () => {};

  const managePageRendering = () => {
    if (error) {
      return (
        <div>
          <p className="text-bold text-danger text-center">No orders found</p>
          <button
            className="btn btn-outline-primary"
            onClick={() => props.Backfunction("home")}
          >
            Go to shopping
          </button>
        </div>
      );
    } else {
      return (
        <>
          <div className="container row d-flex p-3 mt-3 shadow-sm bg-primary text-light rounded">
            <li
              className="col-2 ps-5"
              style={{
                display: "flex",
                listStyle: "none",
                borderRadius: "15px",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "25px",
              }}
            >
              Order ID
            </li>
            <li
              className="col-3 ps-5"
              style={{
                display: "flex",
                listStyle: "none",
                borderRadius: "15px",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "25px",
              }}
            >
              Product Name
            </li>
            <li
              className="col-2 ps-5"
              style={{
                display: "flex",
                listStyle: "none",
                borderRadius: "15px",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "25px",
              }}
            >
              Quantity
            </li>
            <li
              className="col-3"
              style={{
                display: "flex",
                listStyle: "none",
                borderRadius: "15px",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "25px",
              }}
            >
              Amount
            </li>
          </div>

          {orders.map((order) => (
            <div
              className="container row d-flex p-3 mt-3 shadow-sm bg-body-tertiary rounded"
              key={order.orderId}
            >
              <li
                className="col-2 ps-5"
                style={{
                  display: "flex",
                  listStyle: "none",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "sans-serif",
                  fontSize: "25px",
                }}
              >
                {order.orderId}
              </li>
              <li
                className="col-3 ps-5"
                style={{
                  display: "flex",
                  listStyle: "none",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "sans-serif",
                  fontSize: "25px",
                }}
              >
                {order.productName}
              </li>
              <li
                className="col-2 ps-5"
                style={{
                  display: "flex",
                  listStyle: "none",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "sans-serif",
                  fontSize: "25px",
                }}
              >
                {order.quantity}
              </li>
              <li
                className="col-3"
                style={{
                  display: "flex",
                  listStyle: "none",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "sans-serif",
                  fontSize: "25px",
                }}
              >
                $ {order.amount}
              </li>
              <li className="col-2 ps-5" style={{ listStyle: "none" }}>
                <a className="btn btn-outline-success" onClick={handleTrack}>
                  Track order status
                </a>
              </li>
            </div>
          ))}
        </>
      );
    }
  };
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-bold mt-5 pt-5 px-5 pb-3">Orders</h1>
        {managePageRendering()}
      </div>
    </>
  );
};

export default OrderPage;
