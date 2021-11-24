import React from "react";
import "./css/login.css";

import shape from "./img/shape.png";

import logo from "./img/logo.png";

//LOG IN
import avatar from "./img/avatar.svg";
import bg from "./img/bg.svg";
import wave from "./img/wave.png";

function login() {

    const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

  return (
    <div>
        <img src={shape} alt className="shape" />
    <header>
      <div className="containerhome">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h3>Borotoy branch</h3>
        </div>
        <div className="linkshome">
          <ul>
            <li>
              <a href="/login">Sign In</a>
            </li>
            <li>
            <a href="/register" >
            <button type="button" className="btn btn-info" style={{backgroundColor:"5bacdf",color:"white"}}>Sign Up</button>

            </a>
            </li>
          </ul>
        </div>
        <div className="overlay" />
        <div className="hamburger-menu">
          <div className="bar" />
        </div>
      </div>
    </header>
     <img className="wave" src={wave} />
  <div className="container">
    <div className="img">
      <img src={bg} />
    </div>
    <div className="login-content">
      <form action="index.html">
        <img src={avatar} />
        <h2 className="title">Welcome</h2>
        <div className="input-div one">
          <div className="i">
            <i className="fas fa-user" />
          </div>
          <div className="div">
           
            <input type="text" className="input" />
          </div>
        </div>
        <div className="input-div pass">
          <div className="i">
            <i className="fas fa-lock" />
          </div>
          <div className="div">
      
            <input type="password" className="input" />
          </div>
        </div>
        <a href="#">Forgot Password?</a>
        <input type="submit" className="btn" defaultValue="Login" />
      </form>
    </div>
    
  </div>
  
    </div>
  );
}

export default login;
