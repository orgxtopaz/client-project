import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json({limit: "30mb",extended:true}));
// app.use(express.urlencoded({limit: "30mb",extended:true}));
app.use(cors())
import itemRoutes from './routes/items.js';
app.use('/items',itemRoutes)
app.get('/',(req,res)=>{
    res.send('Hello')
})

mongoose.connect(
  "mongodb://user:user@zigm-shard-00-00.ig66l.mongodb.net:27017,zigm-shard-00-01.ig66l.mongodb.net:27017,zigm-shard-00-02.ig66l.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-80pj7i-shard-0&authSource=admin&retryWrites=true&w=majority",
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