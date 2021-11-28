import React from "react";
import "./css/login.css";
import "./css/profiledetails.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes

import FileBase64 from "react-file-base64";
import { createItem, getItems } from "../functions";
import { useEffect, useState } from "react";
////TAB
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import bg from "./img/dashboard.svg";
import wave from "./img/wave.svg";

import { useHistory } from "react-router-dom"; // allows us to access our path / route history.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    float: "left",
    marginLeft: "-1%",
    marginTop: "30%",
  },
}));

function Dashboard(props) {


  ///USER ID PER LOG IN 
  const userId = localStorage.getItem("userId");



  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  ///TAB

  // END TAB

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

  
 


  ///AUTHORIZATION

  let history = useHistory();
  if(localStorage.getItem('successLogin')==null){
    history.push("/login")
   }

  const logoutNow =()=>{
    localStorage.removeItem("successLogin")
    localStorage.removeItem("loginToken");
    
  }


  ///FETCHING USER PROFILE
  /////FETCHING THE OFFICIAL ATTENDANCE DATA SPECIFIC


  
    const [profileDetails, setprofileDetails] = useState([]);
    
    const isLoaded = [true];
    useEffect(() => {

      if (isLoaded) {

        Axios.get(`http://localhost:5000/getprofileDetails/${userId}`, 
  
        { headers: { "x-access-token":localStorage.getItem('loginToken') },email:localStorage.getItem("successLogin")}
        
        )
      
        
        .then((res) => {
          // setprofileDetails(response.data.response);
          setprofileDetails(res.data);


  
       
        })
        .catch((error) => {
          console.error(error)
        })
      }else {
        alert("Not Loaded")
      }


      }, isLoaded);

   
      
   



///UPDATING PROFILE DETAILS
const [bio, setBio] = useState([]);
const [fullname, setFullname] = useState([]);
const [item, setItem] = useState({ image: '' });

const updateprofileDetails = (e)=>{
  e.preventDefault();
  console.log(item)

  Axios.put(`http://localhost:5000/updateprofileDetails/${userId}`, 
  
  {
    
    headers: { "x-access-token":localStorage.getItem('loginToken') },
    email:localStorage.getItem("successLogin"),
    bio:bio,
    fullname:fullname,
    image:item.image
 
  }
  
  )

  
  .then((response) => {
    setprofileDetails(response.data);
    alert("Successfully Saved!")
    window.location.reload();


 
  })
  .catch((error) => {
    console.error(error)
  })






}

///END PROFILE DETAILS


  return (
   

    <div>        
   {/* {profileDetails?.map(about => ( */}
   {/* {profileDetails.map(result => (
     <p>{result.fullname}</p>
   ))} */}

  <>
   
      <a href="#" onClick={logoutNow}>
        <i
          className="fa fa-sign-out"
          style={{
            fontSize: "40px",
            float: "left",
            color: "#0dcaf0",
            paddingLeft: "5%",
          }}
        ></i>
      </a>

        


      <img className="wave" alt="Logo" src={wave} />
      <div className="container" style={{ paddingBottom: "-80%", top: "0px" }}>
     
        <div className="img">
          {/* <img src={bg} alt="Logo" /> */}
        </div>
        

        {/* TAB */}

        <center>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="black"
                aria-label="scrollable force tabs example"
              >
                <Tab
                  label="Profile"
                  icon={<PersonPinIcon />}
                  {...a11yProps(0)}
                />
                <Tab
                  label="Experience"
                  icon={<FavoriteIcon />}
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>

              <div className="card cardbg" style={{ width: "22rem" } }>
                <br></br>
                <center>
                  <img
                    src={profileDetails.image}
                    style={{ borderRadius: "50%", width: "46%" }}
                    alt=""
                    className="profileimage"
                  ></img>
                </center>
                <center>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#modalProfile"
                    className="btn btn-light"
                    style={{
                      width: "12%",
                      height: "10%",
                      backgroundImage:
                        "linear-gradient(to right, #ffffff, #ffffff, #ffffff);",
                      
                    }}
                   
                  >
                    <i
                      className="bi bi-pen"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        color: "black",
                    

                      }}
                    ></i>
                  </button>
                </center>

                <div className="card-body">
                  <h5 className="card-title" style={{paddingTop:"3%"}}>{profileDetails.fullname}</h5>
                  <p className="card-text " style={{textAlign:"justify"}}>
                    {profileDetails.bio}
                  </p>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <center>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#modalSocialMedias"
                    className="btn btn-light"
                    style={{
                      width: "12%",
                      height: "10%",
                      backgroundImage:
                        "linear-gradient(to right, #ffffff, #ffffff, #ffffff);",
                    }}
                  >
                    <i
                      className="bi bi-pen"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        color: "black",
                      }}
                    ></i>
                  </button>
                </center>
               <br></br> <br></br>
                <div className="footer-social-icons">
                  <ul
                    className="social-icons"
                    style={{ padding: "0", listStyle: "none" }}
                  >
                    <li
                      style={{
                        verticalAlign: "top",
                        display: "inline",
                        height: "100px",
                      }}
                    >
                      <a
                        href
                        className="social-icon"
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          float: "left",
                        }}
                      >
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li
                      style={{
                        verticalAlign: "top",
                        display: "inline",
                        height: "100px",
                      }}
                    >
                      <a
                        href
                        className="social-icon"
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          float: "left",
                        }}
                      >
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                    <li
                      style={{
                        verticalAlign: "top",
                        display: "inline",
                        height: "100px",
                      }}
                    >
                      <a
                        href
                        className="social-icon"
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          float: "left",
                        }}
                      >
                        <i className="fa fa-telegram" />
                      </a>
                    </li>

                    <li
                      style={{
                        verticalAlign: "top",
                        display: "inline",
                        height: "100px",
                      }}
                    >
                      <a
                        href
                        className="social-icon"
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          float: "left",
                        }}
                      >
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>

                    <li
                      style={{
                        verticalAlign: "top",
                        display: "inline",
                        height: "100px",
                      }}
                    >
                      <a
                        href
                        className="social-icon"
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          float: "left",
                        }}
                      >
                        <i className="fa fa-youtube" />
                      </a>
                    </li>
                    <li
                      style={{
                        verticalAlign: "top",
                        display: "inline",
                        height: "100px",
                      }}
                    >
                      <a
                        href
                        className="social-icon"
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          float: "left",
                        }}
                      >
                        <i className="fab fa-viber viber" />
                      </a>
                    </li>
                    <li
                      style={{
                        verticalAlign: "top",
                        display: "inline",
                        height: "100px",
                      }}
                    >
                      <a
                        href
                        className="social-icon"
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          float: "left",
                        }}
                      >
                        <i className="fab fa-tiktok tiktok" />
                      </a>
                    </li>

                    <li
                      style={{
                        verticalAlign: "top",
                        display: "inline",
                        height: "100px",
                      }}
                    >
                      <a
                        href
                        className="social-icon"
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          float: "left",
                        }}
                      >
                        <i className="fa fa-glide-g" />
                      </a>
                    </li>
                  </ul>
                </div>

                <ul className="list-group list-group-flush"></ul>

                {/* MODAL PROFILE DETAILS */}
                <div
                  className="modal fade"
                  id="modalProfile"
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="myModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">
                          Profile Details
                        </h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <br></br>
                      <form  >
                        <center>
                          <img
                          src={profileDetails.image}
                            style={{ borderRadius: "50%", width: "46%" }}
                            alt=""
                          ></img>
                        </center>
                        <br></br>
                        <br></br>

                        <FileBase64
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) => setItem({ ...item, image: base64 })}

                        />

                      <br></br>
                      <div className="modal-body mx-3">
                        <div className="md-form mb-5">
                          <i className="fas fa-user prefix grey-text" />
                          <input
                            type="text"
                            id="orangeForm-name"
                            className="form-control validate"
                            defaultValue={profileDetails.fullname}
                            onChange={(event) => {
                              setFullname(event.target.value)}}
                          />
                        </div>

                        <div className="md-form mb-4">
                          <i className="bi bi-blockquote-right  prefix grey-text" />
                          <textarea
                           onChange={(event) => {
                            setBio(event.target.value)}}
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            style={{ height: "auto" }}
                            defaultValue={profileDetails.bio}

                          ></textarea>
                        </div>
                      </div>
                      <div className="modal-footer d-flex justify-content-center">
                        <button
                          className="btn btn-deep-orange"
                          style={{ color: "black" }}
                          onClick={updateprofileDetails}
                        >
                          Save
                        </button>
                      </div>

                        
                      </form>

                    
                    </div>
                  </div>
                </div>

                {/* END PROFILE DETAILS */}

                {/* SOCIAL MEDIA MODALS */}

                <div
                  className="modal fade"
                  id="modalSocialMedias"
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="myModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">
                          Social Links
                        </h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      

                      <form action="" >
                        <center>
                          <div className="formsocials">
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                  <i className="bi bi-facebook"></i>
                                </a>
                              </label>
                            </div>
                            <br></br>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="awrawrwa">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                  <i className="bi bi-instagram"></i>
                                </a>
                              </label>
                            </div>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                  <i className="bi bi-telegram"></i>
                                </a>
                              </label>
                            </div>
                            <br></br>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                  <i className="bi bi-linkedin"></i>
                                </a>
                              </label>
                            </div>
                            <br></br>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                  <i className="bi bi-youtube"></i>
                                </a>
                              </label>
                            </div>
                            <br></br>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                  <i className="fab fa-viber"></i>
                                </a>
                              </label>
                            </div>
                            <br></br>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                  <i className="fab fa-tiktok"></i>
                                </a>
                              </label>
                            </div>
                            <br></br>

                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a href="#" style={{ textAlign: "left" }}>
                                  <b>G-Cash</b>
                                </a>
                              </label>
                            </div>
                            <br></br>
                          </div>
                        </center>

                        <div className="modal-footer d-flex justify-content-center">
                          <button
                            className="btn btn-deep-orange"
                            style={{ color: "black" }}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* END SOCIAL MEDIAS */}


              
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>




              <div className="card cardbg" style={{ width: "20rem" }}>
                <center>
                <img
                  className="card-img-top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf6vq9JCbUVqSynuoQmCaMJ63Gf-BvvOSuZh4tGRryUXkgrHVBFyr1fok8SMZiLDC2Rd0&usqp=CAU"
                  alt="Card image cap"
                  style={{ borderRadius: "50%", width: "46%" }}
                />
                </center>
                <div className="card-body">
                  <h5 className="card-title"></h5>

                  <button
                    type="button"
                    className="btn-labeledexperience  btnstyle experienceText"
                    data-toggle="collapse"
                    data-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample" >
                    <span className="btn-labelexperience">
                      <i className="fa fa-hand-pointer-o"></i>
                    </span>
                    Experience{" "}
                  </button>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#experienceModal"
                    className="btn btn-light"
                    style={{
                      width: "15%",
                      height: "10%",
                      backgroundImage:
                        "linear-gradient(to right, #ffffff, #ffffff, #ffffff);",
                    }}
                  >
                    <i
                      className="bi bi-pen"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        color: "black",
                      }}
                    ></i>
                  </button>

                  <div className="collapse" id="collapseExample">
                  
                    <div className="card-header">
                      <span className="title">~Title~</span>{" "}
                     
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        {" "}
                        <p className="card-text" >
                          Smartest Name Card                     

                      </p>
                      </li>
                    </ul>
                    <div className="card-header">
                      <span className="title">~Company~</span>{" "}
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        {" "}
                        <p className="card-text">
                          One Good Team

                      </p>
                      </li>
                    </ul>
                    <div className="card-header">
                      <span className="title">~Website~</span>{" "}
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        {" "}
                        <p className="card-text">
                          https://onegoodcard.com/
                      </p>
                      </li>
                    </ul>
                    <div className="card-header">
                      <span className="title">~Office no.~</span>{" "}
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        {" "}
                        <p className="card-text">
                          +65 61234567
                      </p>
                      </li>
                    </ul>
                    <div className="card-header">
                      <span className="title">~Address~ </span>{" "}
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        {" "}
                        <p className="card-text">
                          73 Ayer Rajah Crescent, #03-28, Singapore 139952 #03-28
                      </p>
                      </li>
                    </ul>

                  </div>
                </div>
              </div>

              <p className="contactText">★━━━━━━━━━━CONTACT━━━━━━━━━━★</p>


              <div className="formsocials-item">
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  value="https://onegoodcard.com/"
                  className="contactText"
                  readOnly

                  style={{width:"50%" }}
                />
                <label htmlFor="wqewqewq" style={{    paddingLeft: "13%"}}>
                  {" "}
                  <a
                    href="#"
                    style={{
                      textAlign: "left",
                      paddingLeft: "3%",
                    }}
                  >
                    <i className="fa fa-globe " style={{fontSize:"1.6rem"}}></i>
                  </a>
                </label>
              </div>
              <div className="formsocials-item">
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  className="contactText"
                  value="hello@onegood.team"
                  readOnly

                  style={{ width:"50%" }}
                />
                <label htmlFor="wqewqewq" style={{    paddingLeft: "13%"}}>
                  {" "}
                  <a
                    href="#"
                    style={{
                      textAlign: "left",
                      paddingLeft: "3%",
                    }}
                  >
                    <i className="fa fa-envelope " style={{fontSize:"1.6rem"}}></i>
                  </a>
                </label>
              </div>

              <div className="formsocials-item">
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  className="contactText"
                  value="+65 81234567"
                  readOnly

                  style={{ width:"50%" }}
                />
                <label htmlFor="wqewqewq" style={{    paddingLeft: "13%"}}>
                  {" "}
                  <a
                    href="#"
                    style={{
                      textAlign: "left",
                      paddingLeft: "3%",
                    }}
                  >
                    <i className="fa fa-phone " style={{fontSize:"1.6rem"}}></i>
                  </a>
                </label>
              </div>

            </TabPanel>
          </div>
            {/* EXPERIENCE MODAL */}
            <div
                  className="modal fade"
                  id="experienceModal"
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="myModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">
                          Edit Experience
                        </h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      

                      <form action="" >
                        <center>
                          <div className="formsocials">
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                  <i>Title</i>
                                </a>
                              </label>
                            </div>
                            <br></br>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="awrawrwa">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                     <i>Company</i>
                                </a>
                              </label>
                            </div>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                     <i>Website</i>
                                </a>
                              </label>
                            </div>
                            <br></br>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "-7%",
                                  }}
                                >
                                 <i>Office No.</i>
                                </a>
                              </label>
                            </div>
                            <br></br>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                 <i>Address</i>
                                </a>
                              </label>
                            </div>
                            <br></br>
                            <p>★━━━━━━━━━━ YOUR CONTACT━━━━━━━━━━★</p>


                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                   <i>Website</i>
                                </a>
                              </label>
                            </div>
                            <br></br>
                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a
                                  href="#"
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "-5%",
                                  }}
                                >
                                          <i>E-Mail</i>
                                </a>
                              </label>
                            </div>
                            <br></br>

                            <div className="formsocials-item">
                              <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                defaultValue=""
                                style={{ paddingLeft: "10%" }}
                              />
                              <label htmlFor="wqewqewq">
                                {" "}
                                <a href="#" style={{ textAlign: "left" }}>
                                  <b>Contact No.</b>
                                </a>
                              </label>
                            </div>
                            <br></br>
                          </div>
                        </center>

                        <div className="modal-footer d-flex justify-content-center">
                          <button
                            className="btn btn-deep-orange"
                            style={{ color: "black" }}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* END EXPERIENCE MODAL */}
        </center>
        {/* TAB END */}
       
      </div>
      </>
    </div>
    
  );
}

export default Dashboard;
