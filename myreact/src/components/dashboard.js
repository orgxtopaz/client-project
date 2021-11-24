import React from "react";
import "./css/login.css";



import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes

////TAB
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



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
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      float:"left",
      marginLeft:"-1%",
      marginTop:"30%",

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

function register(){
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

   
     <img className="wave" alt="Logo" src={wave} />
  <div className="container" style={{paddingBottom:"-80%",top:"0px"}}>
    <div className="img">
      <img src={bg} alt="Logo" />
    </div>

{/* TAB */}

<center>
<div className={classes.root} >
    
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
          <Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(0)} />
          <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div className="card" style={{ width: "18rem" }}>
  <img className="card-img-top" src="..." alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </p>
    <a href="#" className="btn btn-primary">
      Go somewhere
    </a>
  </div>
</div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="card" style={{ width: "18rem" }}>
  <img className="card-img-top" src="..." alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </p>
    <a href="#" className="btn btn-primary">
      Go somewhere
    </a>
  </div>
</div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div className="card" style={{ width: "18rem" }}>
  <img className="card-img-top" src="..." alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </p>
    <a href="#" className="btn btn-primary">
      Go somewhere
    </a>
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
