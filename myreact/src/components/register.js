import React from "react";
import "./css/login.css";

import shape from "./img/shape.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes
import Axios from "axios"; //allows us to make GET and POST requests from the browser.

import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.


import { useHistory } from "react-router-dom"; // allows us to access our path / route history.
import { useEffect } from "react"; //a hook that GIVES  "side-effects"

//LOG IN
import avatar from "./img/avatar.svg";
import bg from "./img/bg.svg";

//PROMPT POP UP
//IMPORT FOR THE TOASTIFY
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 //CONFIGURING TOASTIFY
 toast.configure();

function Register() {

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


  //  ///HERE ARE THE VARIABLES WHICH GET OR STORE THE DATA THAT IS INPUTED
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serial, setSerial] = useState("");


  const [errorList, setErrorList] = useState([]);

  let history = useHistory();

const register = (e) => {
  e.preventDefault();

  //CHECKIING IF EMAIL EXIST
  console.log(errorList)


    Axios.post('http://localhost:5000/add',
   
    {
    
      fullname: fullname,
      email: email,
      password: password,
      serial: serial
  
     
    })
      .then((res) => {  
     
        let emailToken = res.data.email
        
        ///GETTING THE EMAIL THAT USER USE IN REGISTER AND STORE IT IN LOCALSTORAGE.
        localStorage.setItem("emailToken", emailToken);

        toast.success("Account Created Successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
     
        history.push(`/verify/${res.data.user._id}`)
      }) 
      .catch ((err) => {
                 
          setErrorList(err.response.data);


          if(errorList[27]=='1'){
            console.log(errorList)
         
       

            toast.warning("Email Already Exist!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: true,
            });
        
          }else if(err.response.data.serialError){
          
            toast.error("Wrong Serial Number!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: true,
            });

          }
  
  
      })

    }


    ///IF THE USER SUCCESSFULLY LOG IN , IT CANNOT GO BACK TO THE LOG IN PAGE
    if(localStorage.getItem('successLogin')!=null){
      history.push("/dashboard")
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
      <form >
        <img src={avatar} alt="Logo" />
        <h2 className="title">REGISTER</h2>

        <div className="input-div one">
          <div className="i">
            <i className="fas fa-user" style={{color:"5bacdf"}} />
          </div>
          <div className="div">
           
            <input type="text" className="input" placeholder="Full name"  onChange={(event) => {
                                  setfullname(event.target.value);
                                }} name="fullname" />
                             
          </div>
          
        </div>
             {/* FOR THE ERROR OF PASSWORD */}
             <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.fullname}
                   
                              </small>

        <div className="input-div one">
          <div className="i">
            <i className="fa fa-envelope" />
          </div>
          <div className="div">
           
            <input type="email" className="input" placeholder="Email Address"  onChange={(event) => {
                                  setEmail(event.target.value);
                                }}
                                required
                                name="email" />
                              
          </div>
        </div>
            {/* FOR THE ERROR OF PASSWORD */}
            <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.email}
                   
                              </small>

        <div className="input-div one">
          <div className="i">
            <i className="fas fa-lock" />
          </div>
          <div className="div">
           
            <input type="password" className="input"  placeholder="Password"   onChange={(event) => {
                                  setPassword(event.target.value);
                                }}
                                name="password" />
                                
          </div>
        </div>
          {/* FOR THE ERROR OF PASSWORD */}
          <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.password}
                   
                              </small>

        <div className="input-div pass">
          <div className="i">
            <i className="fa fa-key" />
          </div>
          <div className="div">
      
            <input type="text" className="input"  placeholder="Serial Number"   onChange={(event) => {
                                  setSerial(event.target.value);
                                }}
                                name="serial" />
                               
            <br></br>
            <br></br>
            <br></br>
            <center>
            <button  className="btn btn-info " onClick={register} style={{backgroundColor:"5bacdf",color:"white"}}>Register</button>
            </center>
          </div>
        </div>
       
      </form>
    </div>
    
  </div>
  
    </div>
  );
}

export default Register;
