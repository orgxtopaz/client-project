import React from 'react'

import "./css/style.css"
import shape from"./img/shape.png"
import person from "./img/person.png";
import logo from "./img/logo.png";
function landingpage() {



        


    return (
        <div>

<main>
  <div className="big-wrapper light">
    <img src={shape} alt="Logo1" className="shape" />
    <header>
      <div className="containerhome">
        <div className="logo">
          <img src={logo} alt="Logo2" />
          <h3>Borotoy branch</h3>
        </div>
        <div className="linkshome">
          <ul>
            <li>
              <a href="/register">Create account</a>
            </li>
            <li>
            <a href="/login" >
            <button type="button" className="btn btn-info" style={{backgroundColor:"5bacdf",color:"white"}}>Sign In</button>

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
    <div className="showcase-area">
      <div className="containerhome">
        <div className="left">
          <div className="big-title">
            <h1>Future is here,</h1>
            <h1>Start Exploring now.</h1>
          </div>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            eius distinctio odit, magni magnam qui ex perferendis vitae!
          </p>
          <div className="cta">
            <a href="/register" >
            <button type="button" className="btn btn-info" style={{backgroundColor:"5bacdf",color:"white"}}>Get Started</button>

            </a>
          </div>
        </div>
        <div className="right">
          <img src={person} alt="Person" className="person" />
        </div>
      </div>
    </div>
    <div className="bottom-area">
      <div className="container">
        <button className="toggle-btn">
          <i className="far fa-moon" />
          <i className="far fa-sun" />
        </button>
      </div>
    </div>
  </div>
</main>






        </div>
    )
    
}


export default landingpage
