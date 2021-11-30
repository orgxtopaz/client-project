import React from "react";
import "./css/login.css";

import shape from "./img/shape.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.

//LOG IN
import avatar from "./img/avatar.svg";
import bg from "./img/login.svg";

//IMPORT FOR THE TOASTIFY
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//CONFIGURING TOASTIFY
toast.configure();

function Login() {
  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  let history = useHistory();

  function loginNow(e) {
    e.preventDefault();

    const data = {
      password: password,
      email: email,
    };

    Axios.post('https://jetcardsystem-server.herokuapp.com/login', data

   )
   
    
    
   

      .then((res) => {
        //IF AUTH IS = TRUE comes from the backend!
        if (res.data.auth) {
          console.log(res.data);
          localStorage.setItem("successLogin", res.data.email);
          localStorage.setItem("loginToken", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("fullname", res.data.fullname);

          toast.success("Login Successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: true,
          });

          history.push(`/dashboard`);
        }
      })
      .catch((err) => {
        toast.error("User doesn't Exist!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });

      });
  }

  ///IF THE USER SUCCESSFULLY LOG IN , IT CANNOT GO BACK TO THE LOG IN PAGE
  if (localStorage.getItem("successLogin") != null) {
    history.push("/dashboard");
  }

  return (
    <div>
      <a href="/">
        <i
          className="bi bi-caret-left-square-fill"
          style={{
            fontSize: "40px",
            float: "left",
            color: "#0dcaf0",
            paddingLeft: "5%",
          }}
        ></i>
      </a>
      <br></br>
      <br></br>

      <img src={shape} alt="Logo" className="shape" />

      <div className="container" style={{ paddingBottom: "-80%", top: "0px" }}>
        <div className="img">
          <img src={bg} alt="Logo" />
        </div>
        <div className="login-content">
          <form action="index.html">
            <img src={avatar} alt="Logo" />
            <h2 className="title">Welcome</h2>

            <div className="input-div one">
              <div className="i">
                <i className="fa fa-envelope" />
              </div>
              <div className="div">
                <input
                  type="email"
                  className="input"
                  placeholder="Email Address"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className="input-div pass">
              <div className="i">
                <i className="fa fa-key" />
              </div>
              <div className="div">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  required
                />
                <br></br>
                <br></br>
                <br></br>
                <center>
                  <button
                    type="button"
                    className="btn btn-info "
                    onClick={loginNow}
                    style={{ backgroundColor: "5bacdf", color: "white" }}
                  >
                    Log in
                  </button>
                </center>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
