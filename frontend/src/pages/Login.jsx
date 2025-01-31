import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password !== null) {
      try {
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!response.ok) {
          console.log("Check email and password");
          alert("Please check email and password");
        } else {
          const userData = await fetch("http://localhost:8000/getuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          })
            .then((res) => res.json())
            .then((res) => res.data);
          sessionStorage.setItem("userId", userData.userId);
          sessionStorage.setItem("username", userData.username);
          sessionStorage.setItem("userEmail", userData.email);
          sessionStorage.setItem("isAuthenticated", true);
          navigate("/");
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
          <h2 className="text-bold text-center m-3">Login</h2>
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
            <a
              href="/signup"
              className="m-3"
              style={{ textDecoration: "none" }}
            >
              Register new account
            </a>
            <a href="/" className="m-3" style={{ textDecoration: "none" }}>
              Forgot Password?
            </a>
          </div>
          <div className="m-3">
            <button className="btn btn-success w-100" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
