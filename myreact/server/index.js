
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// import {itemRoutes} from './routes/items.js';
let User = require("./models/user_model");

const app = express();
app.use(express.json({limit: "30mb",extended:true}));
// app.use(express.urlencoded({limit: "30mb",extended:true}));
app.use(cors())
// FOR THE VALIDATIONS
const { body, validationResult } = require("express-validator");

///FOR AUTHORIZATION
const jwt = require('jsonwebtoken');


// app.use('/items',itemRoutes)
app.get('/',(req,res)=>{
    res.send('Hello')
})

// ADD OFFICIAL

app.post(
  "/add",
  [
    body("email")
      .isLength({ min: 1 })
      .withMessage("*Email Address field cannot be blank")
 

      .isEmail()
      .withMessage("*Email Address field should have email domain"),

    body("fullname")
      .isLength({ min: 1 })
      .withMessage("*Full Name field cannot be blank")

  
      .matches(/^[aA-zZ\s]+$/)
      .withMessage("*Full Name field accept characters values only"),

    body("password")
      .isLength({ min: 1 })
      .withMessage("*Password field cannot be blank"),

  ],
  (req, res, next) => {
    try {
      //HERE WE PROCESS THE VALIDATION AND STORE IT ON const errors
      const error = validationResult(req);
      let arrayofErrors = {}; // STORE HERE THE ERROR MESSAGES as an Array

      //MEANS THAT THERE IS AN ERROR EXISTING!
      if (!error.isEmpty()) {
        //EXECUTE  ONLY THE FIRST ERROR
        error.array({ onlyFirstError: true }).forEach((error) => {
          //CONDITIONING / CHECKING IF THE said errors param exist on the arrayofErrors
          if (!arrayofErrors[error.param]) {
            arrayofErrors[error.param] = [];
          }
          //IF THE ERROR PARAMS EXIST.
          arrayofErrors[error.param] = [
            ...arrayofErrors[error.param],
            error.msg,
          ];
        });
        console.log(error);

        //HERE WE SEND BACK ALL OF THE ERRORS TO THE FRONTEND WITH THE STATUS CODE OF 400
        return res.status(400).json(arrayofErrors);

      } else {
        const serial ="123";

        if(req.body.serial==serial){
          const fullname = req.body.fullname;
          const email = req.body.email;
          const password = req.body.password;
          const verified = "false";
          const code = Math.floor(100000 + Math.random() * 900000);

        //    ///SEND CODE TO USER EMAIL REGISTERED!
        const nodemailer = require('nodemailer');


        // Step 1
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "orgxtopazsystem@gmail.com",
            pass: "orgxtopazsystem06+"
          }
        });

          // Step 2
          let mailOptions = {
            from: 'orgxtopazsystem@gmail.com', // TODO: email sender
            to: `${email}`, // TODO: email receiver
            subject: 'Verification Code',
            text: `Verify your Email using this code : ${code}`
          };
  
          // Step 3
          transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
              console.log('Error occurs');
            }
            console.log('Email sent!!!');
          });

          
        const newUser = new User({
          fullname,
          email,  
          password,
          verified,
          code,        
        }); // Instantiate the User in user.model

        newUser
        .save() //PROMISE
        .then((user) => res.json({  email: email, fullname: fullname,user })) // IF TRUE CHECK
        .catch((err) => res.status(400).json("Errors: " + err)); // CATCH THE ERROR

        }else{
          return res.status(400).json({serialError:"Wrong Serial Number"});


        }
   
      }
    } catch (err) {

    }
  }
);



///VERIFY
app.put('/verify',(req,res)=>{

  const email = req.body.email;
  const code = req.body.code;
  const userId = req.body.userId;

  console.log(email)
  console.log(code)
  console.log(userId)

  //CHECKING IF USER EXIST ON DATABASE
  User.findById(userId)

    /// VALIDATING IF THE CODE IS CORRECT
    .then(user => {


      if (user.email == email && user.code == code) {
        //SET VERIFIED TO TRUE USER CAN NOW LOG IN 

        user.verified = true;

        user.save()
        res.json("VERIFIED SUCCESSFULLY!"); // IF ERROR


      } else {
        res.status(400).json("CODE IS WRONG"); // IF ERROR
      }

    }).catch((err) => {
      res.status(400).json(err)

    })


})


///LOG IN
app.post('/login',(req,res)=>{

     const email = req.body.email;
    const password = req.body.password;
  
    //CHECKING IF USER EXIST ON DATABASE
    User.find({ $and: [{ email: { $eq: email } }, { password: { $eq: password } }, { verified: { $eq: "true" } }] })
  
      /// VALIDATING IF USER EXIST
      .then(user => {
  
        if (user.length > 0) {
          const id = user[0].id
  
          const token = jwt.sign({ id }, "jwtSecret", {
            // expiresIn:10000,
          })
         
  
          res.json({ auth: true, token: token, email:user[0].email })
  
        } else {
          res.status(400).json({ auth: false, message: "User didn't exist! Create Account Now" })
        }
  
      })
  

})












mongoose.connect(
"mongodb://orgxtopazsystem:orgxtopazsystem@cluster0-shard-00-00.bpdki.mongodb.net:27017,cluster0-shard-00-01.bpdki.mongodb.net:27017,cluster0-shard-00-02.bpdki.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-dtrgxv-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
); // MONGO DB NEEDED CONFIG.

const connection = mongoose.connection; // CONNECT NOW TO DATABASE / MONGO DB

connection.once("open", () => {
  console.log("MONGO DB CONNECTION ESTABLISHED! HINAMPAK");
});

app.listen(5000, () => {
  console.log("Server is running in port:" + 5000);
});