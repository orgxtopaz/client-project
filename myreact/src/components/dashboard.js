import React from "react";
import "./css/login.css";
import "./css/profiledetails.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes

import FileBase64 from 'react-file-base64';
import { createItem, getItems } from '../functions';
import { useEffect, useState } from 'react';
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

import bg from "./img/bg.svg";
import wave from "./img/wave.png";

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

  function register() {
    alert("ss");
  }

  // PROFILE DETAILS FUNCTION

  const [item, setItem] = useState({ title: "", image: "" });
  const [items, setItems] = useState([]);
  const onSubmitHandler = async (e) => {
    console.log(item);
    e.preventDefault();
    if (item.title === "") {
      alert("Please add title!");
    } else if (item.image === "") {
      alert("Please add image!");
    } else {
      const result = await createItem(item);

      setItems([...items, result]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getItems();
      console.log("fetch data;m", result);
      setItems(result);
    };
    fetchData();
  }, []);

  ///END PROFILE DETAILS FUNCTION

  return (
    <div>
      <a href="/">
        <i
          className="bi bi-caret-left-square-fill"
          style={{
            fontSize: "40px",
            float: "left",
            color: "#38d39f",
            paddingLeft: "5%",
          }}
        ></i>
      </a>

      <img className="wave" alt="Logo" src={wave} />
      <div className="container" style={{ paddingBottom: "-80%", top: "0px" }}>
        <div className="img">
          <img src={bg} alt="Logo" />
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
                textColor="primary"
                aria-label="scrollable force tabs example"
              >
                <Tab
                  label="Profile"
                  icon={<PersonPinIcon />}
                  {...a11yProps(0)}
                />
                <Tab label="About" icon={<FavoriteIcon />} {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <div className="card" style={{ width: "18rem" }}>
                <br></br>
                <center>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf6vq9JCbUVqSynuoQmCaMJ63Gf-BvvOSuZh4tGRryUXkgrHVBFyr1fok8SMZiLDC2Rd0&usqp=CAU"
                    style={{ borderRadius: "50%", width: "46%" }}
                    alt=""
                  ></img>
                </center>
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#modalRegisterForm"
                  className="btn btn-light"
                  style={{
                    width: "15%",
                    height: "10%",
                    backgroundImage:
                      "linear-gradient(to right, #ffffff, #ffffff, #ffffff);",
                    marginLeft: "10%",
                  }}
                >
                  <i
                    className="bi bi-pen"
                    style={{ fontSize: "100%", float: "left", color: "black" }}
                  ></i>
                </button>

                <div className="card-body">
                  <h5 className="card-title">Alan Running</h5>
                  <p className="card-text text-muted">
                    The Alan Walker emblem is composed of two stylized
                    intertwined letters, “A” and “W”
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <button
                    type="button"
                    className="btn"
                    style={{ width: "100%" }}
                  >
                    <i
                      className="bi bi-facebook"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        paddingLeft: "5%",
                        color: "black",
                      }}
                    ></i>
                    <i
                      className="bi bi-instagram"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        paddingLeft: "5%",
                        color: "black",
                      }}
                    ></i>
                    <i
                      className="bi bi-tiktok"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        paddingLeft: "5%",
                        color: "black",
                      }}
                    ></i>
                    <i
                      className="bi bi-telegram"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        paddingLeft: "5%",
                        color: "black",
                      }}
                    ></i>
                    <i
                      className="bi bi-linkedin"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        paddingLeft: "5%",
                        color: "black",
                      }}
                    ></i>
                    <i
                      className="bi bi-youtube"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        paddingLeft: "5%",
                        color: "black",
                      }}
                    ></i>
                    <i
                      className="fab fa-viber"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        paddingLeft: "5%",
                        color: "black",
                      }}
                    ></i>
                    <i
                      className="fa fa-globe"
                      style={{
                        fontSize: "100%",
                        float: "left",
                        paddingLeft: "5%",
                        color: "black",
                      }}
                    ></i>
                    <img
                      src="https://img.icons8.com/plasticine/100/000000/gcash.png"
                      style={{ width: "10%", marginLeft: "1%" }}
                    />
                  </button>
                </ul>

                <ul className="list-group list-group-flush">
                  <p>-------Contact---------</p>
                  <a href="#" style={{ textAlign: "left", paddingLeft: "3%" }}>
                    <i className="fa fa-globe"></i>
                    <span> Some longer sample text</span>
                  </a>
                  <a href="#" style={{ textAlign: "left", paddingLeft: "3%" }}>
                    <i className="fa fa-globe"></i>
                    <span> Some longer sample text</span>
                  </a>
                </ul>

                {/* MODAL PROFILE DETAILS */}
                <div
                  className="modal fade"
                  id="modalRegisterForm"
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
                      <form action="" onSubmit={onSubmitHandler}>
            
                  <center>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf6vq9JCbUVqSynuoQmCaMJ63Gf-BvvOSuZh4tGRryUXkgrHVBFyr1fok8SMZiLDC2Rd0&usqp=CAU"
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
                    

                    </form>

                      <br></br>
                      <div className="modal-body mx-3">
                        <div className="md-form mb-5">
                          <i className="fas fa-user prefix grey-text" />
                          <input
                            type="text"
                            id="orangeForm-name"
                            className="form-control validate"
                            defaultValue="Alan Running"
                          />
                        </div>

                        <div className="md-form mb-4">
                          <i className="bi bi-blockquote-right  prefix grey-text" />
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            style={{height:"auto"}}
                            defaultValue="The Alan Walker emblem is composed of two stylized intertwined letters, “A” and “W”"
                          ></textarea>
                        </div>
                      </div>
                      <div className="modal-footer d-flex justify-content-center">
                        <button className="btn btn-deep-orange" style={{color:"black"}}>Save</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* END PROFILE DETAILS */}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src="..." alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text"></p>
                </div>
              </div>
            </TabPanel>
          </div>
        </center>
        {/* TAB END */}
      </div>
    </div>
  );
}

export default Dashboard;
