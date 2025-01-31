import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const OrderReq = (props) => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState("");
  const [ordersuccess, setOrdersuccess] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    GetProduct();
  }, []);

  const GetProduct = () => {
    try {
      fetch(`http://localhost:8000/product/${props.productId}`)
        .then((res) => res.json())
        .then((res) => setProduct(res));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = () => {
    try {
      if (
        confirm(
          "Are you continue to place the order for product " +
            product.productName
        )
      ) {
        const productId = product.productId;
        console.log(userId);
        fetch("http://localhost:8000/order", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId,
            quantity,
          }),
        })
          .then((res) => res.json())
          .then((res) => setOrder(res))
          .then(setOrdersuccess(true));
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Error occured in order place", error);
    }
  };

  const handleGotoshop = () => {
    setOrdersuccess(false);
    props.Backfunction("home");
  };

  const handleBack = () => {
    props.Backfunction("home");
  };

  return (
    <>
      {ordersuccess ? (
        <div className="container-fluid mt-5 p-5">
          <h1 className="text-bold m-3 pb-3">
            Thank you , {sessionStorage.getItem("username")} for purchasing the
            products from us!!!
          </h1>
          <div className="flex-colum shadow-lg p-5 mb-5 bg-body-tertiary rounded">
            <div className="container flex-column">
              <h3 className="text-bold m-3 p-2">
                Order ID: <strong>{order.orderId}</strong>
              </h3>
              <h3 className="text-bold m-3 p-2">
                Product Name: <strong>{order.productName}</strong>
              </h3>
              <h3 className="text-bold m-3 p-2">
                Quantity: <strong>{order.quantity}</strong>
              </h3>
              <h3 className="text-bold m-3 p-2">
                Amount: $<strong>{order.amount}</strong>
              </h3>
              <h3 className="text-bold m-3 p-2">
                Order created: <strong>{order.createdAt}</strong>
              </h3>
              <h3 className="text-bold m-3 p-2">
                Expected delivery date:{" "}
                <strong>{order.expected_delivery}</strong>
              </h3>
              <h2 className="text-bold text-center text-success">
                Order placed successfully!!
              </h2>
              <button className="btn btn-primary m-3" onClick={handleGotoshop}>
                Go to Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid mt-5 p-5">
          <h1 className="text-bold m-3">Order Request</h1>
          <div className="container">
            <div className="d-flex shadow-lg p-5 mb-5 bg-body-tertiary rounded">
              <img
                src={product.productImage}
                alt="Product Image"
                className="m-3"
              />
              <div className="container">
                <h1>
                  <strong>{product.productName}</strong>
                </h1>
                <p>{product.productDescription}</p>
                <h3>
                  Ratings: <strong>{product.productRatings}</strong>
                </h3>
                <h3>
                  Price: $<strong>{product.productPrice}</strong>
                </h3>
                <form className="d-flex mt-2 m-2 p-3">
                  <label htmlFor="quantity">
                    <strong>Quantity :</strong>
                  </label>
                  <input
                    className="form-control mx-2 p-1"
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{ width: "100px" }}
                  />
                </form>
                <button
                  className="btn btn-success m-3 w-50 mx-5 mt-5"
                  onClick={handleOrder}
                >
                  Order
                </button>
                <button
                  className="btn btn-danger m-3 w-50 mx-5 mt-5"
                  onClick={handleBack}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderReq;
