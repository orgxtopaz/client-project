import React from "react";
import "./css/login.css";

import shape from "./img/shape.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes

import { useHistory } from "react-router-dom"; // allows us to access our path / route history.
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import { useParams } from "react-router-dom"; // returns: an object of key/value pairs of URL parameters
import Axios from "axios"; //allows us to make GET and POST requests from the browser.

//LOG IN
import avatar from "./img/avatar.svg";
import bg from "./img/verify.svg";

//IMPORT FOR THE TOASTIFY
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 //CONFIGURING TOASTIFY
 toast.configure();

function Verify() {

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



///CHEKING THE AUTHORIZE
//STORING/GETTING EMAIL OF THE USER WHICH IS STORED ON LOCALSTORAGE
const userEmail=localStorage.getItem('emailToken')
const [code, setCode] = useState("");
let {userId} = useParams()

let history = useHistory();


const verifyaccount =(e)=>{
  e.preventDefault();

  console.log(userId)
  const data ={
      code: code,
      email: userEmail,
      userId:userId
  }
  
  Axios.put("https://jstapsproxy.herokuapp.com/http://jstaps.herokuapp.com/verify",data,
  {  
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    Connection: 'Keep-Alive',
 
    }
  }
  
  
  )

  .then(res =>{

    toast.success("Email Verified Successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: true,
    });
   history.push("/login") //GOINF BACK TO LOG IN PAGE
 
  })
  .catch(err =>{

      toast.error("Wrong Verification Code!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });

  })

}



if(localStorage.getItem("emailToken")==null){
history.push("/")
}


  return (
    <div>
        <a href="/">
        <i
          className="bi bi-caret-left-square-fill"
          style={{ fontSize: "40px" ,float:"left",color:"#0dcaf0",paddingLeft:"5%"}}
        ></i>
     </a>
     <br></br>
     <br></br>
     

    <img src={shape} alt="Logo" className="shape" />
   
  <div className="container" style={{paddingBottom:"-80%",top:"0px"}}>
    <div className="img">
      <img src={bg} alt="Logo" />
    </div>
    <div className="login-content">
      <form action="index.html">
        <img src={avatar} alt="Logo" />
        <h2 className="title">VERIFY</h2>

       

        <div className="input-div one">
          <div className="i">
            <i className="fa fa-envelope" />
          </div>
          <div className="div">
           
            <input type="email" className="input" value={userEmail} readOnly placeholder="Email Address" />
          </div>
        </div>

        <div className="input-div pass">
          <div className="i">
            <i className="fa fa-key" />
          </div>
          <div className="div">
      
            <input type="text" className="input"  placeholder="Code" onChange={(event) => {
                                  setCode(event.target.value)}}/>
            <br></br>
            <br></br>
            <br></br>
            <center>
            <button type="button" className="btn btn-info " onClick={verifyaccount} style={{backgroundColor:"5bacdf",color:"white"}}>Verify</button>
            </center>
          </div>
        </div>
       
      </form>
    </div>
    
  </div>
  
    </div>
  );
}

export default Verify;
