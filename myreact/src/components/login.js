import React from "react";
import "./css/login.css";

import shape from "./img/shape.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes


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
	if(this.value === ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

function login(){
  alert("ss")
}

  return (
    <div>
        <a href="/">
        <i
          className="bi bi-caret-left-square-fill"
          style={{ fontSize: "40px" ,float:"left",color:"#38d39f",paddingLeft:"5%"}}
        ></i>
     </a>

    <img src={shape} alt="Logo" className="shape" />
   
     <img className="wave" alt="Logo" src={wave} />
  <div className="container" style={{paddingBottom:"-80%",top:"0px"}}>
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
           
            <input type="email" className="input" placeholder="Email Address" />
          </div>
        </div>

        <div className="input-div pass">
          <div className="i">
            <i className="fa fa-key" />
          </div>
          <div className="div">
      
            <input type="password" className="input"  placeholder="Password"/>
            <br></br>
            <br></br>
            <br></br>
            <center>
            <button type="button" className="btn btn-info " onClick={login} style={{backgroundColor:"5bacdf",color:"white"}}>Log in</button>
            </center>
          </div>
        </div>
       
      </form>
    </div>
    
  </div>
  
    </div>
  );
}

export default login;
