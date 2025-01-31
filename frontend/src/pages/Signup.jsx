import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && email && password !== null) {
      try {
        const response = await fetch("http://localhost:8000/usercreation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        if (!response.ok) {
          console.log("Server error occured");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("Error occured :", error);
      }
    } else {
      alert("Fill all the informations");
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form className="shadow-lg p-5 mb-5 bg-body-tertiary rounded">
          <h2 className="text-bold text-center m-3">Signup</h2>
          <div className="m-3">
            <label className="text-bold" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="m-3">
            <label className="text-bold" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="m-3">
            <label className="text-bold" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="flex-column mb-3">
            <a href="/" className="m-3" style={{ textDecoration: "none" }}>
              Already have an account
            </a>
            <a href="/" className="m-3" style={{ textDecoration: "none" }}>
              Without Register
            </a>
          </div>
          <div className="m-3">
            <button className="btn btn-success w-100" onClick={handleSubmit}>
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
